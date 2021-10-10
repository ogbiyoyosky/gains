import { Exclude, Expose } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hashString } from "../utils/string.utils";

@Entity("users")
export class User {
    @Expose({name: 'uuid'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar',{ unique: true })
    userName: string;

    @Column('varchar')
    password: string;

    @Column('boolean',{default: false})
    isVerified: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hashString(this.password);
    }

}