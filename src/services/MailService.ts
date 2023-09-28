import dotenv from "dotenv";

dotenv.config()

import { SendEmailNodeMailer } from "./helpers/SendMailNodeMailer";


class MailService {

    private userName: string;
    private password: string;
    private host: string;
    private port: string;

    constructor() {
        this.userName = process.env.SMTP_USERNAME as string;
        this.password = process.env.SMTP_PASSWORD as string;
        this.host = process.env.SMTP_HOST as string;
        this.port = process.env.PORT as string;
    }

    async execute(from: string, to: string, subject: string, html: string){
        if(!from || !to || !subject || !html || !this.userName || !this.password || !this.host || !this.port) {
            throw new Error("Ocorreu um erro no envio do e-mail, por favor, contate o suporte!");
        }

        const sendEmail = await SendEmailNodeMailer(this.host, this.port, this.userName, this.password, from, to, subject, html);
        return sendEmail;
    }


}

export default MailService;