import bcrypt from "bcrypt";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import MailService from "./MailService";
import InMemoryUsuarioRepository from "../repositories/in-memory/InMemoryUsuarioRepository";

import { gerarCodigo } from "./helpers/AuthHelper";

dotenv.config()

const mailService = new MailService();
const inMemoryUsuarioRepository = new InMemoryUsuarioRepository();

class AuthService {

    async execute(email: string, senha: string){

        const dadosUsuario = inMemoryUsuarioRepository.getByEmail(email);

        if(!dadosUsuario) {
            throw new Error("E-mail e/ou senha inválidos!");
        }

        const comparacaoDeSenha = await bcrypt.compare(senha, dadosUsuario.senha);

        if(!comparacaoDeSenha) {
            throw new Error("E-mail e/ou senha inválidos!")
        }

        const codigo = gerarCodigo();
        inMemoryUsuarioRepository.salvarToken(email, codigo);

        if(process.env.ENVIRONMENT === "production") {

            //só enviar e-mails em produção

            const resultado = await mailService.execute(
                "naoresponda@xgrow.com.br", 
                "vitormanoelacd777@gmail.com", 
                "Chegou seu código de acesso", 
                `<b>Olá, ${dadosUsuario.nome}!<b/>
                <br/>
    
                <p>Chegou seu código de acesso!</p>
    
                <br/>
    
                <b>${codigo}</b>
    
                <br/><br/>
    
                Atenciosamente,<br/>
                XGrow
                `  
            )
        }


        

        return { status: "sendCode" };
    }

    async finalizarLogin(emailUsuario: string, token: string) {

        const dadosUsuario = inMemoryUsuarioRepository.getByEmail(emailUsuario);

        if(!dadosUsuario) {
            throw new Error("E-mail inválido!");
        }

        const { id, nome, email } = dadosUsuario;

        if(dadosUsuario.token && dadosUsuario.token === token){
            const token = JWT.sign({id, nome, email}, process.env.JWT_KEY as string);
            inMemoryUsuarioRepository.salvarToken(email, "")
            return { jwt: token };
        }

        throw new Error("Token não encontrado!");
    }

}

export default AuthService;