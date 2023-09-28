import UsuarioService from "./AuthService";

const usuarioService = new UsuarioService();

describe("Testes de integração de UsuarioService!", () => {

    it("A class UsuarioService deve estar definida!", () => {
        expect(UsuarioService).toBeDefined();
    });

    describe("Conjunto de testes do método execute()!", () => {
        it("O método execute deve estar definido!", () => {
            expect(usuarioService.execute).toBeDefined();
        });

        it("Caso o e-mail não existir, devo retornar uma exceção!", async () => {
            expect(usuarioService.execute("teste@gmail.com", "123")).rejects.toThrow("E-mail e/ou senha inválidos!");
        });

        it("Caso a senha estiver incorreta, devo retornar uma exceção!", async () => {
            expect(usuarioService.execute("vitor@gmail.com", "1234567")).rejects.toThrow("E-mail e/ou senha inválidos!");
        });

        it("Caso as credenciais estejam corretas, deve retornar um json com {status: 'sendCode'", async () => {
            const resultadoAutenticacao = await usuarioService.execute("vitor@gmail.com", "12345678");
            expect(resultadoAutenticacao.status).toBe("sendCode")
        })
    });

    
})