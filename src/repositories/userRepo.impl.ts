import { IUserRepo } from "@/src/repositories/userRepo.interface";
import User from "@/models/user";

export class UserRepoImpl implements IUserRepo {
  async create(user: NewUser): Promise<any> {
    console.log(user);
    try {
      const userCreated = await User.create({ ...user });
      return userCreated;
    } catch {
      return null;
    }
  }

  async get(id: string): Promise<any> {
    try {
      const userResponse = await User.find({ _id: id });
      return userResponse[0];
    } catch {
      return null;
    }
  }

  async getByEmail(email: string): Promise<any> {
    try {
      const user = await User.find({ email });
      return user[0];
    } catch {
      return null;
    }
  }

  async update(user: UpdateUser, id: string): Promise<any> {
    try {
      const userUpdated = await User.findOneAndUpdate({ _id: id }, user, {
        new: true,
        runValidators: true,
      });
      return userUpdated;
    } catch {
      return null;
    }
  }
}

export const userRepo = new UserRepoImpl();
