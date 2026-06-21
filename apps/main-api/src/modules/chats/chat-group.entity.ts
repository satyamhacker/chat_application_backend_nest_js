import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { Message } from '../messages/message.entity';

@Entity('chat_groups')
export class ChatGroup {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @ManyToMany(() => User, (user) => user.groups)
    @JoinTable() // Ye junction table banayega 'chat_groups_users'
    members: User[];

    @OneToMany(() => Message, (message) => message.group)
    messages: Message[];
}