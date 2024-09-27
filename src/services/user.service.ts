import { userRepo } from "@/src/repositories/userRepo.impl";
import { IUserRepo } from "@/src/repositories/userRepo.interface";
import bcrypt from 'bcryptjs';

export class UserService {
  constructor(private readonly userRepo: IUserRepo) {}

  async create(user: NewUser) {
    const isUserExiste = await this.userRepo.getByEmail(user.email);
    if(isUserExiste) return null;
    return await this.userRepo.create(user);
  }

  async get(id: string) {
    return await this.userRepo.get(id);
  }

  async update(user: UpdateUser, id: string) {
    return await this.userRepo.update(user, id);
  }
}

export const userService = new UserService(userRepo);
