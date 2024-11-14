import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Projects from './page'
import useProjectsStore from '@/stores/project-store'
import { useRouter } from 'next/navigation'

// Mock the dependencies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}))

vi.mock('@/stores/project-store', () => ({
  default: vi.fn(),
}))

vi.mock('@/infrastructure/repositories/project-repository', () => ({
  deleteProject: vi.fn(),
}))

// Mock project data
const mockProjects = [
  {
    id: '1',
    title: 'Test Project 1',
    description: 'Test Description 1',
  },
  {
    id: '2',
    title: 'Test Project 2',
    description: 'Test Description 2',
  },
]

describe('Projects Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks()
    
    // Setup default store mock
    vi.mocked(useProjectsStore).mockReturnValue({
      projects: mockProjects,
      deleteProject: vi.fn(),
    })
  })

  it('renders loading spinner when projects is null', () => {
    vi.mocked(useProjectsStore).mockReturnValue({
      projects: null,
      deleteProject: vi.fn(),
    })

    render(<Projects />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('renders projects list when projects are available', () => {
    render(<Projects />)
    
    expect(screen.getByText('Test Project 1')).toBeInTheDocument()
    expect(screen.getByText('Test Project 2')).toBeInTheDocument()
    expect(screen.getByText('Test Description 1')).toBeInTheDocument()
    expect(screen.getByText('Test Description 2')).toBeInTheDocument()
    expect(screen.getAllByTestId('project-card')).toHaveLength(2)
  })

  it('renders empty state message when projects is empty array', () => {
    vi.mocked(useProjectsStore).mockReturnValue({
      projects: [],
      deleteProject: vi.fn(),
    })

    render(<Projects />)
    
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
  })

  it('navigates to update page when modify button is clicked', () => {
    const mockPush = vi.fn()
    
    // @ts-ignore
    vi.mocked(useRouter).mockImplementation(() => ({
      push: mockPush,
    }))

    render(<Projects />)
    
    const modifyButtons = screen.getAllByText('Modifier')
    fireEvent.click(modifyButtons[0])
    
    expect(mockPush).toHaveBeenCalledWith('/projects/update/1')
  })

  it('opens delete modal when delete button is clicked', () => {
    render(<Projects />)
    
    const deleteButtons = screen.getAllByText('Supprimer')
    fireEvent.click(deleteButtons[0])
    
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})