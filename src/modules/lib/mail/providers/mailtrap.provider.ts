import { Injectable, Logger } from "@nestjs/common";
import { EmailSender, IMailPayload } from "../interfaces/mail.interface";
import * as nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";
import * as dotenv from "dotenv"

dotenv.config()

@Injectable()

export class Mailtrap implements EmailSender<IMailPayload>{
    private mailConnection : Mail;


    private mailConfig: SMTPTransport.Options = {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    }

    async send({ recipients, subject, template, body }: IMailPayload) {
  
        try {
            this.getConnectionInstance().sendMail({
                to: recipients , 
                subject, 
                text: body,
                html: template
            })
        } catch (error) {
            Logger.error({error}, error.message)
        }
    }

    getConnectionInstance() {
        this.mailConnection = nodemailer.createTransport(this.mailConfig);
        return this.mailConnection;
    }
}