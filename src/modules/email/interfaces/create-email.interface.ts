import { User } from "../../user/entities/user.entity";

export interface CreateEmailData {
    email: string;
    user: User
    isVerified?: boolean;
}