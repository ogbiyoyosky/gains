import { Exclude, Expose } from "class-transformer";
import { User } from "../../user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("user_emails")
export class  Email {
    @Expose({name: 'uuid'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.emails)
    user: User;

    @Column('varchar',{ unique: true })
    emailAddress: string

    @Column('boolean',{default: false})
    isVerified: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

}