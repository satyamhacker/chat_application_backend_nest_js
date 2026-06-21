import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { NotificationProcessor } from './notification.processor';
import { CleanupService } from './cleanup.service';

@Module({
    providers: [
        MessagesGateway,
        NotificationProcessor,
        CleanupService,
    ],
})
export class MessagesModule { }

