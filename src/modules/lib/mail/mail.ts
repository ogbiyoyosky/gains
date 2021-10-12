import { EmailSender, IMailPayload, providerType } from "./interfaces/mail.interface";
import providers from './index'
import { MailContext } from "./context/mail.context";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Mail implements EmailSender<IMailPayload> {
    
    private provider: providerType;
    
    public setProvider(providerName : providerType) {
        this.provider = providerName;
    }

    public async send(payload:IMailPayload ) {
        
        const selectedImplemention =  providers[this.provider];

        const context = new MailContext(this.provider, selectedImplemention);

        return context.send(payload)
      
    }
}