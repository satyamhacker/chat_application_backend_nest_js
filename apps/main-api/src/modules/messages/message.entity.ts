import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';
import { ChatGroup } from '../chats/chat-group.entity';

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    content: string;

    @CreateDateColumn()
    sentAt: Date;

    @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
    sender: User;

    @ManyToOne(() => ChatGroup, (group) => group.messages, { onDelete: 'CASCADE' })
    group: ChatGroup;
}