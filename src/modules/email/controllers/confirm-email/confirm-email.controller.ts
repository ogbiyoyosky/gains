import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { SuccessResponse } from 'src/shared/utils/response.utils';
import { ConfirmEmailService } from '../../services/confirm-email/confirm-email.service';

@Controller('/api/emails')
export class ConfirmEmailController { constructor(private readonly confirmEmailService: ConfirmEmailService) {}
    @Get('confirm/:token')
    @HttpCode(200)
    public async verifyEmail(@Param() token ) {
        await this.confirmEmailService.execute(token);

        return SuccessResponse("Email Successfully verified");
    }
}
