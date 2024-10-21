"use server";
import { PrismaClient } from '@prisma/client';
import { getTokenByCookiesAndDecode } from '@/utils/get-owner-id';
import { createProjectSchema } from '@/validators/project';

const prisma = new PrismaClient();

export async function createProject(data: Pick<Project, "title" | "description">){
  const owner = await getTokenByCookiesAndDecode();
  if(!owner) throw new Error();
  const verifyData = createProjectSchema.safeParse(data);
  if(!verifyData.success) throw new Error('An error occurred while creating project...');

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: owner.email as string
      }
    })
    await prisma.project.create({
      data: {
        title: verifyData.data.title,
        description: verifyData.data.description,
        ownerId: user?.id as string
      }
    });
  } catch (e) {
    throw new Error('An error occurred while creating project...');
  }
}

export async function getAllProjectsByOwnerId(): Promise<Project[] | undefined> {
  const owner = await getTokenByCookiesAndDecode();
  if(!owner) throw new Error();
  try {
    const projectsList = await prisma.project.findMany({
      where: {
        ownerId: owner.ownerId as string
      }
    });
    return projectsList;
  } catch(e) {
    throw new Error('An error occurred while finding projects...');
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
      throw new Error('An error occurred while finding project...');
    }
    return project;
  } catch(e) {
    throw new Error('An error occurred while finding project...');
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
    throw new Error('An error occurred while deleting project...');
  }
}

export async function deleteProject(id: string) {
  try {
    const projectDeleted = await prisma.project.delete({
      where: {
        id
      },
    })
  } catch(e) {
    throw new Error('An error occurred while deleting project...');
  }
}
