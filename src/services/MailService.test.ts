import MailService from "./MailService";

const mailService = new MailService();

describe("E-mail service!", () => {

    it("O service deve existir!", () => {
        expect(MailService).toBeDefined();
    });

    describe("Conjunto de testes do método execute!", () => {
        it("O método execute deve estar definido!", () => {
            expect(mailService.execute).toBeDefined();
        });

        it("Caso todos os dados obrigatórios não estiverem definidos devo retornar uma exceção!", async () => {
            expect(mailService.execute("email@email.com", "contato@vitormanoel.com.br", "", "<></>")).rejects.toThrow();
        });
    });

});