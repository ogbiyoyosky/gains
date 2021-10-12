import { Body, Controller, Get, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common';
import { RequestHandler } from '@nestjs/common/interfaces';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { SuccessResponse } from 'src/shared/utils/response.utils';
import { AddEmailDto } from '../../dto/add-email.dto';
import { AddEmailService } from '../../services/add-email/add-email.service';
import { ConfirmEmailService } from '../../services/confirm-email/confirm-email.service';

@UseGuards(AuthGuard)
@Controller('api')
export class AddEmailController {
    constructor(private readonly addEmailService: AddEmailService, private readonly confirmEmailService: ConfirmEmailService) {}

    @Post('/add-email')
    @HttpCode(201)
    public async addEmailAddress(@Body() data: AddEmailDto, @Req() request ) {
        await this.addEmailService.execute(data, request.user);

        return SuccessResponse("Please check your email to verify");
    }

    
}
