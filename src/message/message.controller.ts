import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { IMessage } from './Model/message';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  async getMessages(): Promise<IMessage[]> {
    return this.messageService.getMessages();
  }

  @Post()
  async createMessage(@Body() message: IMessage): Promise<IMessage> {
    return this.messageService.createMessage(message);
  }

  @Delete(':id')
  async deleteMessage(@Param('id') id: string): Promise<IMessage> {
    return this.messageService.deleteMessage(id);
  }

  @Get('user/:userId')
  async getMessagesByUser(
    @Param('userId') userId: string,
  ): Promise<IMessage[]> {
    return this.messageService.getMessagesByUser(userId);
  }
}
