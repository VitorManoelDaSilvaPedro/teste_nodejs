import InMemoryUsuarioRepository from "./InMemoryUsuarioRepository";

const inMemoryUsuarioRepository = new InMemoryUsuarioRepository();

describe("Testes unitários de usuário repository", () => {
    it("A classe InMemoryUsuarioRepository tem que estar criada!", () => {
        expect(InMemoryUsuarioRepository).toBeDefined();
    });

    describe("Grupo de testes unitários do método getByEmail!", () => {
        it("O método getByEmail deve estar definido em InMemoryUsuarioRepository!", () => {
            expect(inMemoryUsuarioRepository.getByEmail).toBeDefined()
        });

        it("Caso não encontrar um e-mail, deve retornar null!", () => {
            expect(inMemoryUsuarioRepository.getByEmail("teste@gmail.com")).toBe(null);
        });

        it("Caso existir um usuário com o e-mail, retornar o objeto do usuário!", () => {
            const retorno = inMemoryUsuarioRepository.getByEmail("vitor@gmail.com");
            expect(retorno?.email).toBe("vitor@gmail.com");
        });
    })
    

    
})