import { Email } from "../entities/email.entity";
import { CreateEmailData } from "../interfaces/create-email.interface";



export class EmailFactory {
    static createNew(data: CreateEmailData): Email {
    const user = new Email();

    user.emailAddress = data.email;
    user.user = data.user

    return user

    }
}