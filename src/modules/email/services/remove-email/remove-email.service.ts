import { ForbiddenException, Injectable, Logger, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user/user.service';
import { validateEmailForGmail } from 'src/shared/utils/email.utils';
import { getConnection } from 'typeorm';
import { EmailService } from '../email/email.service';


@Injectable()
export class RemoveEmailService {
    constructor(private readonly emailService: EmailService, private readonly userService: UserService, private readonly logger: Logger ){}

    public async execute({ id }, user) {
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        const email = await this.emailService.findById(id);

        if(!email) throw new NotFoundException("Email not found");

        if(email.user.id !== user.id) throw new ForbiddenException("Invalid email");
        const isGmail = validateEmailForGmail(email.emailAddress);
    

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            await queryRunner.manager.remove(email);
            if(isGmail) {
                await this.userService.update(email.user, {verifiedCount: email.user.verifiedCount - 1}) 
            }
            await queryRunner.commitTransaction();
            
        } catch (error) {
            this.logger.error({ error }, error.message);
            await queryRunner.rollbackTransaction();
            throw new ServiceUnavailableException('Unable to process request at the moment')

        }
       
        

       

        


    } 
}
