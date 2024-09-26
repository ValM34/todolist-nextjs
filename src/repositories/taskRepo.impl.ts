import { ITaskRepo } from "@/src/repositories/taskRepo.interface";
import Task from "@/models/task";

export class TaskRepoImpl implements ITaskRepo {
  public async create(task: any): Promise<any> {
    try {
      const taskCreated = await Task.create({ task });
      return taskCreated;
    } catch {
      return null;
    }
  }

  public async getTasksByProjectIdAndUserId(projectId: string, userId: string): Promise<any> {
    try {
      const taskResponse = await Task.find({ project: projectId, user: userId });
      return taskResponse;
    } catch {
      return null;
    }
  }

  public async getTaskByIdAndUserId(taskId: string, userId: string): Promise<any> {
    try {
      const taskResponse = await Task.find({ _id: taskId, user: userId });
      return taskResponse[0];
    } catch {
      return null;
    }
  }

  public async update(task: UpdateTask, userId: string): Promise<any> {
    try {
      const taskUpdated = await Task.findOneAndUpdate({ _id: task._id, user: userId }, task, {
        new: true,
        runValidators: true,
      });
      return taskUpdated;
    } catch {
      return null;
    }
  }

  public async delete(taskId: string, userId: string): Promise<boolean> {
    try {
      await Task.findOneAndDelete({ _id: taskId, user: userId });
      return true;
    } catch {
      return false;
    }
  }
}

export const taskRepo = new TaskRepoImpl();
