import { IProjectRepo } from "@/src/repositories/projectRepo.interface";
// import dbConnect from '@/lib/db-connect';
import Project from '@/models/project';
import Task from '@/models/task';
import mongoose from 'mongoose';

export class ProjectRepoImpl implements IProjectRepo {
  constructor() {
    // dbConnect();
  }

  public async create(project: any, userId: string) {
    try {
      const projectCreated = await Project.create({ ...project, user: userId });
      return projectCreated;
    } catch {
      return null;
    }
  }

  public async getProjectByIdAndUserId(id: string, userId: string) {
    try {
      const projectResponse = await Project.find({ _id: id, user: userId });
      return projectResponse[0];
    } catch {
      return null;
    }
  }

  public async getProjectsByUserId(userId: string): Promise<any> {
    try {
      const projectResponse = await Project.find({ user: userId });
      return projectResponse;
    } catch {
      return null;
    }
  }

  public async update(project: UpdateProject, userId: string) {
    try {
      const projectUpdated = await Project.findOneAndUpdate({ _id: project._id, user: userId }, project, {
        new: true,
        runValidators: true,
      });
      return projectUpdated;
    } catch {
      return null;
    }
  }

  public async delete(id: string, userId: string) {
    const session = await mongoose.startSession();
    try {
      await session.withTransaction(async () => {
        await Task.deleteMany({
          project: id,
          user: userId
        }, { session });
        await Project.findOneAndDelete({
          _id: id,
          user: userId
        }, { session });
      });
      await session.commitTransaction();
      await session.endSession();
      return true;
    } catch {
      await session.endSession();
      return false;
    }
  }
}

export const projectRepo = new ProjectRepoImpl();