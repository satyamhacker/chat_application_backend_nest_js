import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatGroup } from './chat-group.entity';
import { User } from '../users/users.entity';

@Injectable()
export class ChatsService {
    private readonly logger = new Logger(ChatsService.name);

    constructor(
        @InjectRepository(ChatGroup)
        private readonly chatGroupRepo: Repository<ChatGroup>,
        private readonly dataSource: DataSource,
    ) { }

    // 🔥 ACID Transaction Flow
    async createGroup(
        name: string,
        description: string | undefined,
        creator: User,
    ): Promise<ChatGroup> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Step 1: Create the new Chat Group
            const group = new ChatGroup();
            group.name = name;
            group.description = description ?? '';
            await queryRunner.manager.save(group);


            // Step 2: Add the creator as the first member (Populating Many-to-Many)
            group.members = [creator];
            await queryRunner.manager.save(group);

            await queryRunner.commitTransaction();
            this.logger.log(`Group created successfully: ${group.id}`);

            return group;
        } catch (error: any) {
            this.logger.error(
                `Transaction failed, rolling back. Error: ${error?.message ?? error}`,
            );
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException('Could not create the chat group');
        } finally {
            await queryRunner.release();
        }
    }

    async getTopGroups(): Promise<ChatGroup[]> {
        return this.chatGroupRepo
            .createQueryBuilder('group')
            .leftJoinAndSelect('group.members', 'member')
            .take(10)
            .getMany();
    }
}

