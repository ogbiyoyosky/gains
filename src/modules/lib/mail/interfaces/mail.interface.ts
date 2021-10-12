export interface IMailPayload {
    recipients: string[],
    subject: string,
    from?: string,
    body?: string;
    template?: string | Buffer 
}


export interface EmailSender<T> {
    send(payload: T) : Promise<void>
}

export type providerType = "consoler" | "mailtrap" 