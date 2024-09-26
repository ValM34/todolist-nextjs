import { ITaskRepo } from "@/src/repositories/taskRepo.interface";
import { taskRepo } from "@/src/repositories/taskRepo.impl";
import { projectRepo } from "@/src/repositories/projectRepo.impl";

export class TaskService {
  constructor(private readonly taskRepo: ITaskRepo) {} // pourquoi on le met dans le constructor ?

  async create(task: any) {
    const project = await projectRepo.getProjectByIdAndUserId(task.project, task.user);
    if (!project) {
      return null;
    }
    return await this.taskRepo.create(task);
  }

  async getTasksByProjectIdAndUserId(projectId: string, userId: string) {
    return await this.taskRepo.getTasksByProjectIdAndUserId(projectId, userId);
  }

  async getTaskByIdAndUserId(taskId: string, userId: string) {
    return await this.taskRepo.getTaskByIdAndUserId(taskId, userId);
  }

  async update(task: UpdateTask, userId: string) {
    return await this.taskRepo.update(task, userId);
  }

  async delete(taskId: string, userId: string) {
    return await this.taskRepo.delete(taskId, userId);
  }
}

export const taskService = new TaskService(taskRepo);