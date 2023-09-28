import { Usuario } from "../../models/Usuario";

class InMemoryUsuarioRepository {

    private usuarios: Usuario[] = [];

    constructor() {
        this.usuarios = [
            {
                id: "b9311f41-f66f-4761-b2a2-7777f3a96cd0",
                nome: "Vitor",
                email: "vitor@gmail.com",
                senha: "$2b$12$PsuO84ORV7EwY3ufJsC67efMkPY/Tr53vh.hMQMo/Gf.TPl2HVWNC"
            }
        ]
    }

    getByEmail(email: string){
        const usuario = this.usuarios.find((usuario) => usuario.email === email);

        if(!usuario) {
            return null;
        }

        return usuario;
    }

    salvarToken(email: string, token: string) {
        const index = this.usuarios.findIndex((usuario) => usuario.email === email);

        this.usuarios[index].token = token;

        console.log(this.usuarios[index])
    }

}

export default InMemoryUsuarioRepository;