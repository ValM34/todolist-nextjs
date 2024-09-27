export interface ITaskRepo {
  create(task: any): Promise<any>;
  getTasksByProjectIdAndUserId(projectId: string, userId: string): Promise<any>;
  getTaskByIdAndUserId(taskId: string, userId: string): Promise<any>;
  update(task: UpdateTask, userId: string): Promise<any>;
  delete(taskId: string, userId: string): Promise<boolean>;
}
