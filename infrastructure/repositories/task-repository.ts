'use server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { updateTaskSchema } from '@/validators';

const prisma = new PrismaClient();

export async function createTask(
  data: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'score'>
) {
  try {
    await prisma.task.create({
      data: {
        title: data.title,
        status: data.status,
        emergency: data.emergency,
        importance: data.importance,
        projectId: data.projectId,
        description: data.description,
      },
    });
  } catch (e) {
    throw new Error('An error occurred while creating task...');
  }
}

export async function findTasksBy(
  criteria: { [key: string]: any }[]
): Promise<Task[] | undefined> {
  // console.log(criteria);
  // console.log(criteria.every((c) => Object.keys(c).length !== 0));
  // criteria = [{ id: 2 }, {}];
  // console.log(criteria);
  // console.log(criteria.every((c) => Object.keys(c).length !== 0));
  // criteria = [{ id: 2 }, { id: 3 }];
  // console.log(criteria);
  // console.log(criteria.every((c) => Object.keys(c).length !== 0));
  // Est ce que criteria est sous la forme : [ {}, ...]
  // criteria.every((c) => Object.keys(c).length !== 0)
  // Si criteria = [{}] => false
  // Si criteria = [{id: 1}, {}] => false
  // Si criteria = [{id: 1}, {id: 2}] => true
  if (!criteria || criteria.length === 0 || !criteria.every((c) => Object.keys(c).length !== 0)) return [];
  console.log('post return');
  let formatedCriteria = {};
  criteria.forEach((criterion) => {
    if (!Object.values(criterion).includes(undefined)) {
      formatedCriteria = { ...formatedCriteria, ...criterion };
    }
  });
  if (Object.keys(formatedCriteria).length === 0) return [];
  console.log('before try');
  try {
    console.log('try');
    const tasksList = await prisma.task.findMany({
      where: formatedCriteria,
    });

    return tasksList as Task[];
  } catch (e) {
    console.error('An error occurred while finding tasks...');
    return [];
  }
}
// criteria: { [key: string]: any }): Promise<Task | undefined>
// getOneTaskById
export async function findOneTaskById(id: string): Promise<Task | null> {
  try {
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new Error('An error occurred while finding task...');
    }

    return task as Task;
  } catch (e) {
    throw new Error('An error occurred while finding task...');
  }
}

export async function updateTask(
  data: Omit<Task, 'updatedAt' | 'createdAt' | 'score'>
) {
  try {
    await prisma.task.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        importance: data.importance,
        emergency: data.emergency,
        projectId: data.projectId,
      },
    });
  } catch (e) {
    throw new Error('An error occurred while updating task...');
  }
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({
      where: {
        id,
      },
    });
  } catch (e) {
    throw new Error('An error occurred while deleting task...');
  }
}
