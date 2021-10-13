import { Controller, Delete, Get, HttpCode, Param, Query, Req, UseGuards } from '@nestjs/common';
import { query } from 'express';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { SuccessResponse } from '../../../../shared/utils/response.utils';
import { ConfirmEmailService } from '../../services/confirm-email/confirm-email.service';
import { EmailService } from '../../services/email/email.service';
import { RemoveEmailService } from '../../services/remove-email/remove-email.service';

@Controller('/api/emails')
export class EmailController { constructor(private readonly confirmEmailService: ConfirmEmailService, private readonly removeEmailService: RemoveEmailService, private readonly emailService: EmailService) {}
    @Get('confirm/:token')
    @HttpCode(200)
    public async verifyEmail(@Param() token ) {
        await this.confirmEmailService.execute(token);

        return SuccessResponse("Email Successfully verified");
    }

    @Delete('/:id')
    @HttpCode(204)
    @UseGuards(AuthGuard)
    public async deleteEmail(@Param() id, @Req() req  ) {
        await this.removeEmailService.execute(id, req.user);

        return SuccessResponse("Email successfully removed");
    }

    
    @Get()
    @HttpCode(200)
    @UseGuards(AuthGuard)
    public async fetchEmails(@Query() { query }, @Req() req  ) {
        const queryValue =  query == 'active' ? true : false;

        const emails = await this.emailService.fetchUserEmails(req.user, queryValue, query );

        return SuccessResponse("Email Successfully fetched", emails);
    }
}
