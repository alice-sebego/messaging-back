import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './Model/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async register(user: IUser): Promise<IUser> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    const defaultUser: IUser = {
      ...user,
      connected: false,
      role: 'noob',
      messages: [],
    };

    const newUser = new this.userModel(defaultUser);
    return await newUser.save();
  }

  async login(username: string, password: string): Promise<IUser> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    user.connected = true;
    await user.save();
    return user;
  }

  async findConnected(): Promise<IUser[]> {
    return await this.userModel.find({ connected: true }).exec();
  }

  async disconnect(userId: string): Promise<IUser> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.connected = false;
    await user.save();
    return user;
  }

  async getUsers(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }

  async getUserById(userId: string): Promise<IUser> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(userId: string, updatedUser: IUser): Promise<IUser> {
    const user = await this.userModel.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}