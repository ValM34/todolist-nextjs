import { IProjectRepo } from "@/src/repositories/projectRepo.interface";
import dbConnect from '@/lib/db-connect';
import Project from '@/models/project';
import Task from '@/models/task';
import mongoose from 'mongoose';

export class ProjectRepoImpl implements IProjectRepo {
  constructor() {
    // dbConnect();
  }

  public async findProjectByIdAndUserId(id: string, userId: string) {
    const projectResponse = await Project.find({ _id: id, user: userId });
    const project = projectResponse[0];

    return project;
  }

  public async update(project: UpdateProject, userId: string) {
    const projectUpdated = await Project.findOneAndUpdate({ _id: project._id, user: userId }, project, {
      new: true,
      runValidators: true,
    });

    return projectUpdated;
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