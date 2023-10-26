import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Min } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    account: string;

    @Min(10)
    @Column({ nullable: false })
    password: string;

    @Column()
    refreshToken: string;

    @Column()
    signUpCode: number;

    @Column({ default: false })
    isCertify: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
