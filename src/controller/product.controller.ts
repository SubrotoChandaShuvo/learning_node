import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";

export const productController = (
    req: IncomingMessage,
    res: ServerResponse,
) => {
    const url = req.url;
    const method = req.method;

    // Get all products
    // /products=> /products/1 => ['', 'products', '1']

    const urlParts = url?.split("/");;
    // console.log(urlParts);
    const id = urlParts && urlParts[1]==="products" ? Number(urlParts[2]) : null;
    // console.log("This is the actual id: ",id);


    if (url === "/products" && method === "GET") {
        // const products = {
        //     id: 1,
        //     name: "Product 1",
        //     price: 100,
        // };
        const products = readProduct();

        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(
            JSON.stringify({
                message: "Products retrieved successfully",
                data: products,
            }),
        );
    }
    else if(method === "GET" && id!==null){

    }
};
