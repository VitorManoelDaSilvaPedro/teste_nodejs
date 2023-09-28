import Router, { Request, Response } from "express";

import AuthController from "./src/controllers/AuthController";

const authController = new AuthController();
const routes = Router();

routes.get("/", (Req: Request, Res: Response) => Res.json({status: true}))

routes.post("/auth", authController.auth);
routes.post("/token", authController.token);

export default routes;