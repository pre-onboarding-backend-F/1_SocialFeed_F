import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { PostRole } from '../../commons/enums/post-role.enum';
import { BaseEntity } from 'src/commons/base.entity';

@Entity()
export class Post extends BaseEntity {
    @Column({ type: 'enum', enum: PostRole })
    type: PostRole;

    @Column()
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

    @ManyToOne(() => User)
    user: User;
}
