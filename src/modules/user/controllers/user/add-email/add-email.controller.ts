import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { SuccessResponse } from 'src/shared/utils/response.utils';

@UseGuards(AuthGuard)
@Controller('api/add-email')
export class AddEmailController {
    @Post()
    @HttpCode(201)
    public async addEmailAddress() {
       // const user = await this.createUserService.execute(data);

        return SuccessResponse("Please check your email to verify");
    }
}
