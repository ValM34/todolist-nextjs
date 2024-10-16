"use server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createProject(data: Omit<Project, "_id" | "createdAt" | "updatedAt">){

  try {
    await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        ownerId: data.ownerId,
      }
    });
  } catch (e) {
    console.error('An error occurred while creating project:', e);
    throw e;
  }
}

export async function getAllProjectsByOwnerId(ownerId: string): Promise<Project[] | undefined> {
  try {
    const projectsList = await prisma.project.findMany({
      where: {
        ownerId
      }
    });

    return projectsList;
  } catch(e) {
    console.error('An error occurred while finding projects:', e);
  }
}

export async function getOneProjectById(id: string): Promise<Project | undefined> {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });
    if(!project) {
      throw new Error('An error occurred while finding project');
    }

    return project;
  } catch(e) {
    console.error('An error occurred while finding project:', e);
  }
}

export async function update(data: Pick<Project, "id" | "title" | "description">) {
  try {
    await prisma.project.update({
      where: {
        id: data.id
      },
      data: {
        title: data.title,
        description: data.description
      }
    })
  } catch(e) {
    console.error('An error occurred while updating project:', e);
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: {
        id
      },
    })
  } catch(e) {
    console.error('An error occurred while deleting project:', e);
  }
}
