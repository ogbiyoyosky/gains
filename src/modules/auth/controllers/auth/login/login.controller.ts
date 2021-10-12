import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { LoginService } from 'src/modules/auth/services/auth/login/login.service';
import { TokenAuthService } from 'src/modules/auth/services/token-auth/token-auth.service';
import { SuccessResponse } from 'src/shared/utils/response.utils';

@Controller('api/login')
export class LoginController {
    constructor(private readonly loginUserService: LoginService, private readonly tokenAuthService: TokenAuthService, ){}

    @Post()
    @HttpCode(200)
    public async loginUser(@Body() data: LoginDto) {
        const { message, jwtData } = await this.loginUserService.execute(data);

        return SuccessResponse(message, jwtData);
    }

    @Get('tokens/:token')
    @HttpCode(200)
    public async loginViaToken( @Param() token) {
        const { message, jwtData } = await this.tokenAuthService.execute(token);
        return SuccessResponse(message, jwtData);
    }
    
}
