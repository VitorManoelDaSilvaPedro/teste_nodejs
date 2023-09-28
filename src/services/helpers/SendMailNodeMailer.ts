import nodemailer from "nodemailer";

export const SendEmailNodeMailer = async (host: string, port: string, username: string, password: string, from: string, to: string, subject: string, html: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host,
            port: Number(port),
            secure: true,
            auth: {
                user: username,
                pass: password
            },
            authMethod: "PLAIN"
        });

        const info = await transporter.sendMail({
            from,
            to,
            subject,
            html
        });

        return info;

    } catch (err: any) {
        throw new Error("Ocorreu um erro ao enviar e-mail, por favor, contate o suporte!");
    }
}