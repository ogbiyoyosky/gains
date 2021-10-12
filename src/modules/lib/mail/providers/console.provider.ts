import { EmailSender, IMailPayload } from "../interfaces/mail.interface";

export class Consoler implements EmailSender<IMailPayload> {

    async send({ recipients, subject, body }: IMailPayload) {
        console.log(`SENDING A MAIL ${recipients}`, );
        console.log(`MAIL SUBJECT ${subject}`, );
        console.log(`MAIL BODY ${body}`, );
    }
}