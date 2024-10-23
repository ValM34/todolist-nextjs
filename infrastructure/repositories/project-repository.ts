"use server";
import {PrismaClient} from '@prisma/client';
import {createProjectSchema} from '@/validators/project';
import {getUser} from "@/utils/auth";

const prisma = new PrismaClient();

export async function createProject(data: Pick<Project, "title" | "description">) {
    const email = (await getUser())!.email;
    const verifyData = createProjectSchema.safeParse(data);
    if (!verifyData.success) throw new Error('An error occurred while creating project...');

    try {
        await prisma.project.create({
            data: {
                title: verifyData.data.title,
                description: verifyData.data.description,
                userFk: email as string
            }
        });
    } catch (e) {
        console.log(e)
        throw new Error('An error occurred while creating project...');
    }
}

export async function findProjectsBy(criteria: { [key: string]: any }[]): Promise<Project[] | undefined> {
    if(!criteria) return [];
    //declaration des criteres de recherche formattés -> Retrait de undefined de la liste
    let formatedCriteria = {};

    //Parcours de la liste des criteres et on retire les criteres avec des valeurs undefined
    criteria.forEach((criterion) => {
        //Si la valeur de la clé n'est pas undefined, on l'ajoute à la liste des criteres formattés
        if (!Object.values(criterion).includes(undefined)) {
            formatedCriteria = {...formatedCriteria, ...criterion};
        }
    });

    /*
    formatedCriteria = criteria
    .filter(criterion => !Object.values(criterion).includes(undefined))
    .reduce((acc, criterion) => Object.assign(acc, criterion), {});
    */

    //Si la liste des criteres formattés est vide, on retourne un tableau vide
    if (Object.keys(formatedCriteria).length === 0) return [];

    try {
        return await prisma.project.findMany({
            where: formatedCriteria
        });
    } catch (e) {
        console.error('An error occurred while finding projects...')
        return [];
    }
}

export async function getOneProjectById(id: string): Promise<Project | undefined> {
    try {
        const project = await prisma.project.findUnique({
            where: {
                id,
            },
        });
        if (!project) {
            throw new Error('An error occurred while finding project...');
        }
        return project;
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
        throw new Error('An error occurred while deleting project...');
    }
}
