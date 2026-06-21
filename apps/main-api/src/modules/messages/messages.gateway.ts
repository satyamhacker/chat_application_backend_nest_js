import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

// CORS enable kar rahe hain taaki frontend connect kar sake
@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server!: Server;

    private readonly logger = new Logger(MessagesGateway.name);


    // Jab bhi koi user connect hoga
    handleConnection(client: Socket) {
        this.logger.log(`User connected: ${client.id}`);
    }

    // Jab koi user disconnect hoga
    handleDisconnect(client: Socket) {
        this.logger.log(`User disconnected: ${client.id}`);
    }

    // Frontend jab 'sendMessage' event emit karega
    @SubscribeMessage('sendMessage')
    handleMessage(
        @MessageBody() payload: { groupId: string; message: string; senderId: string },
        @ConnectedSocket() client: Socket,
    ) {
        this.logger.log(
            `New message from ${payload.senderId} in group ${payload.groupId}: ${payload.message}`,
        );

        // Yahan hum aage chalkar DB mein message save karne ki service call karenge
        // this.messagesService.saveMessage(...)

        // Ab is message ko group ke sabhi connected users ko bhej do (Broadcast)
        this.server.emit(`group_${payload.groupId}`, payload);

        // Client ko acknowledgment bhejte hain ki message chala gaya
        return { status: 'Message Sent!' };
    }
}

