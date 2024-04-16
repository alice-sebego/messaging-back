import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";
import { MessageService } from "./message.service";

@WebSocketGateway(
    {
        cors: {
            origin: '*',
            credentials: false,
        },
    },
)
export class MessageGateway {
    @WebSocketServer() server: Server;

    constructor(private readonly messageService: MessageService){}

    @SubscribeMessage( 'send_msg' )
    handleMessage(client: any, data: any): void{
        const msg = this.messageService.createMessage(data);
        this.server.emit('new_msg', msg); 
         
    }

}

/**
 * TODO : gérer les erreurs de manière appropriée dans méthode handleMessage(), 
 *  en cas d'échec de la création du message
 */

