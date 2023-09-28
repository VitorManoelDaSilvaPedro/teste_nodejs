import { Request, Response } from "express";
import { AuthSchemaValidator, TokenSchemaValidate } from "./schemas/AuthSchema";
import AuthService from "../services/AuthService";

const authService = new AuthService();

class AuthController {

        /**
     * @swagger
     * /auth:
     *   post:
     *     summary: Faz a autenticação do usuário
     *     consumes: ["application/json"]
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *                 email:
     *                     type: string
     *                     example: vitor@gmail.com
     *                 senha:
     *                     type: string
     *                     example: 12345678
     *     responses:
     *       200:
     *         description: A confirmação de envio do código
     *         content:
     *           application/json:
     *               schema:
     *                  type: object
     *                  properties:
     *                      status:
     *                          type: string
     *                          example: sendCode
     *       500:
     *         description: Some server error
     *       400:
     *         description: Bad Request (YUP)
     *         content:
     *           application/json:
     *               schema:
     *                  type: object
     *                  properties:
     *                      error:
     *                          type: string
     *                          example: E-mail e/ou senha inválidos!
     */

    async auth(Req: Request, Res: Response){
        
        try {
            await AuthSchemaValidator.validate(Req.body);

            const retornoService = await authService.execute(Req.body.email, Req.body.senha)
            Res.json(retornoService);

        } catch (err: any) {
            Res.status(400).json({ error: err.message });
        }
    }

        /**
     * @swagger
     * /token:
     *   post:
     *     summary: Faz a validação do token e gera um JWT caso for válido
     *     consumes: ["application/json"]
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *                 token:
     *                     type: string
     *                     example: 201462
     *                 email:
     *                     type: string
     *                     example: vitor@gmail.com
     *     responses:
     *       200:
     *         description: O JWT gerado do usuário
     *         content:
     *           application/json:
     *               schema:
     *                  type: object
     *                  properties:
     *                      jwt:
     *                          type: string
     *                          example: codigo JWT
     *       500:
     *         description: Some server error
     *       400:
     *         description: Bad Request (YUP)
     *         content:
     *           application/json:
     *               schema:
     *                  type: object
     *                  properties:
     *                      error:
     *                          type: string
     *                          example: Código inválido!
     */

    async token(Req: Request, Res: Response){
        
        try {
            await TokenSchemaValidate.validate(Req.body);

            const retornoService = await authService.finalizarLogin(Req.body.email, Req.body.token)
            Res.json(retornoService);

        } catch (err: any) {
            Res.status(400).json({ error: err.message });
        }
    }

}

export default AuthController;