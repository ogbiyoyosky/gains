import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UserFactory } from '../../factories/user.factor';
import { UserService } from '../user/user.service';

@Injectable()
export class CreateUserService {
    constructor(private readonly userService: UserService){}
    public async execute(data: CreateUserDto) {
        if (await this.isExistingUserName(data.userName)) throw new ConflictException("Username Already exist");
        const userAttribute = UserFactory.createNew(data)
        
        return await this.userService.save(userAttribute)
    }


    private async isExistingUserName(userName: string): Promise<boolean> {
        const user = await this.userService.findByUserName(userName);

        return user ? true : false;
    }
}
