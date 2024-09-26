import { IProjectRepo } from "@/src/repositories/projectRepo.interface";
import { projectRepo } from "@/src/repositories/projectRepo.impl";

export class ProjectService {
  constructor(private readonly projectRepo: IProjectRepo) {}

  public async create(project: any, userId: string) {
    return await this.projectRepo.create(project, userId);
  }

  public async getProjectByIdAndUserId(id: string, userId: string) {
    return await this.projectRepo.getProjectByIdAndUserId(id, userId);
  }

  public async getProjectsByUserId(userId: string) {
    return await this.projectRepo.getProjectsByUserId(userId);
  }

  public async update(project: UpdateProject, userId: string) {
    return await this.projectRepo.update(project, userId);
  }

  public async delete(id: string, userId: string) {
    return await this.projectRepo.delete(id, userId);
  }
}

export const projectService = new ProjectService(projectRepo);
