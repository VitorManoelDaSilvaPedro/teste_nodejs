import { string, object } from "yup";

export const AuthSchemaValidator = object().shape({
    email: string().email("E-mail inválido!").required("E-mail é obrigatório!"),
    senha: string().required("A senha é obrigatória!").min(8, "A senha deve ter no mínimo 8 caracteres!")
})

export const TokenSchemaValidate = object().shape({
    token: string().min(6, "O token enviado tem 6 dígitos, por favor, tente novamente!").required("O token é obrigatório!")
})