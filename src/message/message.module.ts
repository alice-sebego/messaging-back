import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './Schema/MessageSchema';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Message', schema: MessageSchema }])],
    providers: [MessageService],
    controllers: [MessageController],
})
export class MessageModule {}
