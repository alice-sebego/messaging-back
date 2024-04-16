import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from './Model/message';

@Injectable()
export class MessageService {
    constructor(@InjectModel('Message') private readonly messageModel: Model<IMessage>) {}

    async getMessages(): Promise<IMessage[]> {
        return await this.messageModel.find().exec();
    }
    
    async createMessage(message: IMessage): Promise<IMessage>  {
        const createdMessage = new this.messageModel(message);
        return await createdMessage.save();
    }

    async deleteMessage(id: string) :Promise<IMessage> {
       return await this.messageModel.findByIdAndDelete(id);
    }

    async getMessagesByUser(userId: string): Promise<IMessage[]> {
        //return await this.messageModel.find({ sender: userId}).populate( "sender receiver").populate("receiver").exec();
        return await this.messageModel
          .find({ $or: [{ senderId: userId }, { receiverId: userId }] })
          .exec();
    }

}
