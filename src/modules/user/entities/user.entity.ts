import { Exclude, Expose } from "class-transformer";
import { Email } from "../../email/entities/email.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { compareStringViaHash, hashString } from "../utils/string.utils";

@Entity("users")
export class User {
    @Expose({name: 'uuid'})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Exclude()
    @Column('varchar',{ unique: true })
    userName: string;

    @Column({ type: 'varchar' })
    password: string;

    @Exclude()
    @Column('int',{default: 0})
    verifiedCount: number;

    @OneToMany(() => Email, email => email.user)
    emails: Email[]

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hashString(this.password);
    }

    async comparePassword(password: string): Promise<boolean> {
        return await compareStringViaHash(this.password, password)
    }

    
    @Expose({ name: 'isVerifed' })
    get isVerified(): boolean {
        return this.verifiedCount > 0
    }

}