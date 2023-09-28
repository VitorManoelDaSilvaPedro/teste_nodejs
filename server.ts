import Express, { Response, Request } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import cors from "cors";


import routes from "./routes";
import { specs } from "./swaggerOptions";

dotenv.config()

const server = Express();

server.use(cors())
server.use(Express.json());
server.use(routes);

server.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
const serverInstance = server.listen(process.env.PORT);

export default serverInstance;