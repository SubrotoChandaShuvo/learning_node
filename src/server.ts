import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routeHandler } from "./routes/route";
import config from "./config";

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    // console.log(req.url);  // '/', '/user', '/product'
    // console.log(req.method);  // 'GET', 'POST', 'PUT', 'DELETE'

    routeHandler(req, res);
});

server.listen(config.port, () => {
    console.log(`The Server is running on port ${config.port}`);
});
