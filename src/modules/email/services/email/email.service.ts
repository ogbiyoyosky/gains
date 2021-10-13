import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';
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

    async findById(id: string): Promise<Email | undefined> {
        const emailEntity = await this.emailRepo.findOne({ where: { id }, relations: ['user'] });
        if (!emailEntity) return undefined
    
        return emailEntity;
    }

    async save(email: Email): Promise<Email> {
        return await this.emailRepo.save(email);
    }

    async update(email: Email, data) {
        return await this.emailRepo.save({ ...email,...data });
    }

    async deleteEmail(id) {
        return await this.emailRepo.delete({ id });
    }

    async fetchUserEmails(user: User, isVerified: boolean, query ) : Promise<Email[]>{ 
        if((query == 'inactive') || (query ==  'active')) {

            return await this.emailRepo.createQueryBuilder('user_email')
            .leftJoinAndSelect('user_email.user','emails')
            .where('user_email.user = :userId',{ userId: user.id })
            .andWhere('user_email.isVerified = :isVerified', { isVerified })
            .getMany()
        }
        return await this.emailRepo.find({ where: {user}, relations: ['user'] })
        
    }


}
