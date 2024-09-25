export interface IProjectRepo {
  findProjectByIdAndUserId(id: string, userId: string): Promise<Project>;
  update(project: UpdateProject, userId: string): Promise<Project>;
  delete(id: string, userId: string): Promise<boolean>;
}
