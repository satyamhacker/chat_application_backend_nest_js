import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatGroup } from './chat-group.entity';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ChatGroup])],
    controllers: [ChatsController],
    providers: [ChatsService],
    exports: [ChatsService],
})
export class ChatsModule { }

