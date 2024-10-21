"use server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createTask(data: Omit<Task, "id" | "createdAt" | "updatedAt" | "score">){
  try {
    await prisma.task.create({
      data: {
        title: data.title,
        status: data.status,
        emergency: data.emergency,
        importance: data.importance,
        projectId: data.projectId,
        description: data.description,
      }
    });
  } catch (e) {
    throw new Error('An error occurred while creating task...');
  }
}

export async function getAllTasksByProjectId(projectId: string): Promise<Task[] | undefined> {
  try {
    const tasksList = await prisma.task.findMany({
      where: {
        projectId
      }
    });

    return tasksList as Task[];
  } catch(e) {
    throw new Error('An error occurred while finding tasks:...');
  }
}

export async function getOneTaskById(id: string): Promise<Task | undefined> {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    });
    if(!task) {
      throw new Error('An error occurred while finding task...');
    }

    return task as Task;
  } catch(e) {
    throw new Error('An error occurred while finding task...');
  }
}

export async function update(data: Omit<Task, "updatedAt" | "createdAt" | "score">) {
  try {
    await prisma.task.update({
      where: {
        id: data.id
      },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        importance: data.importance,
        emergency: data.emergency,
        projectId: data.projectId
      }
    })
  } catch(e) {
    throw new Error('An error occurred while updating task...');
  }
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({
      where: {
        id
      },
    })
  } catch(e) {
    throw new Error('An error occurred while deleting task...');
  }
}
