import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToMany } from 'typeorm';
import { Message } from '../messages/message.entity';
import { ChatGroup } from '../chats/chat-group.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    passwordHash: string; // Phase 3 mein yahan @Exclude() lagayenge

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Message, (message) => message.sender)
    messages: Message[];

    @ManyToMany(() => ChatGroup, (group) => group.members)
    groups: ChatGroup[];
}