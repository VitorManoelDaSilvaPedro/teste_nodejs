import { SendEmailNodeMailer } from "./SendMailNodeMailer";

describe("Testes de envio de e-mail com o nodemailer!", () => {
    it("A função execute deve estar definida!", () => {
        expect(SendEmailNodeMailer).toBeDefined();
    });
})