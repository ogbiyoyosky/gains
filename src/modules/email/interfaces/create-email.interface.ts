import { User } from "src/modules/user/entities/user.entity";

export interface CreateEmailData {
    email: string;
    user: User
    isVerified?: boolean;
}