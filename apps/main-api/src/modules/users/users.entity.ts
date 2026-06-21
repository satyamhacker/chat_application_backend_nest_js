import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { Message } from '../messages/message.entity';
import { ChatGroup } from '../chats/chat-group.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ unique: true })
    username!: string;

    @Column({ unique: true })
    email!: string;

    @Exclude()
    @Column()
    passwordHash!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => Message, (message) => message.sender)
    messages!: Message[];

    @ManyToMany(() => ChatGroup, (group) => group.members)
    groups!: ChatGroup[];

    @BeforeInsert()
    async hashPassword() {
        if (!this.passwordHash) return;
        // If someone already inserted a bcrypt hash, keep it.
        if (this.passwordHash.startsWith('$2a$') || this.passwordHash.startsWith('$2b$')) {
            return;
        }
        const salt = await bcrypt.genSalt(10);
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    }
}
