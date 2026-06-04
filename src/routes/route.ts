import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;

    // if (url === "/" && method === "GET") {
    //     // console.log("This is root route");
    //     res.writeHead(200, { "Content-Type": "text/plain" });
    //     res.end("This is root route");
    // }
    // else{
    //     res.writeHead(404, { "Content-Type": "text/plain" });
    //     res.end("Route not found");
    // }

    if (url === "/" && method === "GET") {
        // console.log("This is root route");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "This is root route" }));
    } else if (url?.startsWith("/products")) {
        productController(req, res);
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
    }
};
