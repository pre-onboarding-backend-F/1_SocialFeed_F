import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { PostRole } from '../../commons/post-role.enum';

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'enum', enum: PostRole })
    type: PostRole;

    @Column({ nullable: false })
    title: string;

    @Column()
    content: string;

    @Column()
    hashtags: string;

    @Column({ default: 0 })
    viewCount: number;

    @Column({ default: 0 })
    likeCount: number;

    @Column({ default: 0 })
    shareCount: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User)
    user: User;
}
