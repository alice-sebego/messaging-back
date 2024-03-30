import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './Model/user';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async registerUser(@Body() user: IUser): Promise<IUser> {
    return await this.userService.register(user);
  }

  @Post('login')
  async loginUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<IUser> {
    return await this.userService.login(username, password);
  }

  @Get('connected')
  async getConnectedUsers(): Promise<IUser[]> {
    return await this.userService.findConnected();
  }

  @Put(':userId/disconnect')
  async disconnectUser(@Param('userId') userId: string): Promise<IUser> {
    return await this.userService.disconnect(userId);
  }

  @Get()
  async getUsers(): Promise<IUser[]> {
    return await this.userService.getUsers();
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updatedUser: IUser,
  ): Promise<IUser> {
    return await this.userService.updateUser(userId, updatedUser);
  }
}
