import { gerarCodigo } from "./AuthHelper";

describe("Testes do helper de autenticação!", () => {
    it("A função gerarCodigo deve estar definida!", () => {
        expect(gerarCodigo).toBeDefined();
    });

    it("A função gerarCodigo deve retornar uma string com 6 caracteres!", () => {
        expect(gerarCodigo().length).toBe(6);
    })
})