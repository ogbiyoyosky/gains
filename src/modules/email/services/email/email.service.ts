import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from '../../entities/email.entity';

@Injectable()
export class EmailService {
    constructor( @InjectRepository(Email)private readonly emailRepo: Repository<Email>) {}

    async findByEmail(email: string): Promise<Email | undefined> {
        const emailEntity = await this.emailRepo.findOne({ where: { emailAddress: email }, relations: ['user'] });
        if (!emailEntity) return undefined
    
        return emailEntity;
    }

    async save(email: Email): Promise<Email> {
        return await this.emailRepo.save(email);
    }

    async update(email: Email, data) {
        return await this.emailRepo.save({ ...email,...data });
    }


}
