import { Injectable } from "@nestjs/common";
import { EmailSender, IMailPayload, providerType } from "../interfaces/mail.interface";

@Injectable()
export class MailContext implements EmailSender<IMailPayload> {

    constructor(provider, strategy) {
        this.provider = provider;
        this.strategy = strategy;
    }

    private strategy: EmailSender<IMailPayload>;
    private provider: providerType;


    public async send(payload:IMailPayload ) {
        if(!this.provider) throw new Error("Please select a provider");
       
        return this.strategy.send(payload);
    }
}