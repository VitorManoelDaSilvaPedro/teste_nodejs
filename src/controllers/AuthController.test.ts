import axios from "axios";
import server from "../../server";

import AuthController from "./AuthController";

const authController = new AuthController();

beforeAll((done) => {
    server.on("listening", () => {
        done();
    })
});

afterAll((done) => {
    server.close(() => {
        done();
    });
})

describe("Testes 2e2 das rotas de autenticação!", () => {

    it("AuthController deve estar definido!", () => {
        expect(AuthController).toBeDefined()
    });

    it("O método auth deve estar definido!", () => {
        expect(authController.auth).toBeDefined();
    });

    it("Se um e-mail inválido for enviado, deve retornar um erro { error: 'E-mail inválido!' } com status 400!", async () => {
        
            const resultado = await axios.post("http://localhost:4000/auth", {
                email: "vitorgmail.com",
                senha: "12345678"
            }, {
                validateStatus: (status) => {
                    return (status >= 200 && status < 300) || status === 400;
                }
            });

            expect(resultado.status).toBe(400)
            expect(resultado.data.error).toBe("E-mail inválido!")

    });

    it("Se um e-mail não for enviado, deve retornar um erro { error: 'E-mail obrigatório!' } com status 400!", async () => {
        
        const resultado = await axios.post("http://localhost:4000/auth", {
            email: "",
            senha: "12345678"
        }, {
            validateStatus: (status) => {
                return (status >= 200 && status < 300) || status === 400;
            }
        });

        expect(resultado.status).toBe(400)
        expect(resultado.data.error).toBe("E-mail é obrigatório!")

    });

    it("Se a senha não for enviado, deve retornar um erro { error: 'Senha obrigatória!' } com status 400!", async () => {
        
        const resultado = await axios.post("http://localhost:4000/auth", {
            email: "vitor@gmail.com",
            senha: ""
        }, {
            validateStatus: (status) => {
                return (status >= 200 && status < 300) || status === 400;
            }
        });

        expect(resultado.status).toBe(400)
        expect(resultado.data.error).toBe("A senha é obrigatória!")

    });

    it("Se a senha for enviada com menos de 8 caracters, deve retornar um erro { error: 'A senha deve ter no mínimo 8 caracteres!' } com status 400!", async () => {
        
        const resultado = await axios.post("http://localhost:4000/auth", {
            email: "vitor@gmail.com",
            senha: "1234567"
        }, {
            validateStatus: (status) => {
                return (status >= 200 && status < 300) || status === 400;
            }
        });

        expect(resultado.status).toBe(400)
        expect(resultado.data.error).toBe("A senha deve ter no mínimo 8 caracteres!")

    });

    it("Caso as credenciais tenham sido enviadas corretamente e não estão corretas, deve fazer a validação da senha e e-mail e retornar { error: 'E-mail e/ou senha inválidos!' }", async () => {
        
        const resultado = await axios.post("http://localhost:4000/auth", {
            email: "vitor@gmail.com",
            senha: "12345679"
        }, {
            validateStatus: (status) => {
                return (status >= 200 && status < 300) || status === 400;
            }
        });

        expect(resultado.status).toBe(400)
        expect(resultado.data.error).toBe("E-mail e/ou senha inválidos!")

    });

    it("Caso as credenciais tenham sido enviadas corretamente e estão corretas, deve fazer a validação da senha e e-mail, caso validar, retornar { status: 'sendCode' }", async () => {
        
        const resultado = await axios.post("http://localhost:4000/auth", {
            email: "vitor@gmail.com",
            senha: "12345678"
        }, {
            validateStatus: (status) => {
                return (status >= 200 && status < 300) || status === 400;
            }
        });

        expect(resultado.status).toBe(200)
        expect(resultado.data.status).toBe("sendCode")

    });

});