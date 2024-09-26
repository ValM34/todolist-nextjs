export interface IProjectRepo {
  create(project: NewProject, userId: string): Promise<any>;
  getProjectByIdAndUserId(id: string, userId: string): Promise<Project> | null;
  getProjectsByUserId(userId: string): Promise<any>;
  update(project: UpdateProject, userId: string): Promise<Project> | null;
  delete(id: string, userId: string): Promise<boolean>;
}
