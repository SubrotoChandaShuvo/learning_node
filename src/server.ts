import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routeHandler } from "./routes/route";

const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
    // console.log(req.url);  // '/', '/user', '/product'
    // console.log(req.method);  // 'GET', 'POST', 'PUT', 'DELETE'

    routeHandler(req, res);
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
