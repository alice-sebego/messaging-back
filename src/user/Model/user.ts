import * as bcrypt from 'bcrypt';

export interface IUser {
  _id: string;
  username: string;
  password: string;
  connected: boolean;
  role: string;
  messages: string[];
  picture: string;

  comparePassword(password: string): Promise<boolean>;
}

export const UserModel = {
  comparePassword: async function (
    this: IUser,
    password: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  },
};
