export interface IUserRepo {
  create(user: NewUser): Promise<any>;
  get(id: string): Promise<any>;
  getByEmail(email: string): Promise<any>;
  update(user: UpdateUser, id: string): Promise<any>;
}
