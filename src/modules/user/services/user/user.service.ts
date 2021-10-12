import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService {
    constructor( @InjectRepository(User)private readonly userRepo: Repository<User>) {}

    async findByUserId(id: string): Promise<User | undefined> {
        const user = await this.userRepo.findOne({ where: { id } });
        if (!user) return undefined
    
        return user;
    }


    async findByUserName(userName: string): Promise<User | undefined> {
        const user = await this.userRepo.findOne({ where: { userName } });
        if (!user) return undefined
    
        return user;
    }

    async save(user: User): Promise<User> {
        return await this.userRepo.save(user);
    }
}
