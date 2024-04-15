import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from './Model/message';

@Injectable()
export class MessageService {
    constructor(@InjectModel('Message') private readonly messageModel: Model<IMessage>) {}

    
}