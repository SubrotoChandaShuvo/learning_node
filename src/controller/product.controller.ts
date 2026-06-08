import type { IncomingMessage, ServerResponse } from "http";
import { insetProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productController = async (
    req: IncomingMessage,
    res: ServerResponse,
) => {
    // console.log("Request" , req);
    const url = req.url;
    const method = req.method;

    // Get all products
    // /products=> /products/1 => ['', 'products', '1']

    const urlParts = url?.split("/");
    // console.log(urlParts);
    const id =
        urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
    // console.log("This is the actual id: ",id);

    if (url === "/products" && method === "GET") {
        // const products = {
        //     id: 1,
        //     name: "Product 1",
        //     price: 100,
        // };

        try {
            const products = readProduct(); // [{},{},{}]
            return sendResponse(
                res,
                200,
                true,
                "Products retrieved successfully",
                products,
            );
        } catch (error) {
            return sendResponse(res, 500, false, "Failed to retrieve products");
        }
        // res.writeHead(200, {
        //     "Content-Type": "application/json",
        // });
        // res.end(
        //     JSON.stringify({
        //         message: "Products retrieved successfully",
        //         data: products,
        //     }),
        // );
    } else if (method === "GET" && id !== null) {
        // Get a single product by id
        const products = readProduct();
        const product = products.find((p: IProduct) => p.id === id);
        // console.log(product);
        if (!product) {
            return sendResponse(res, 404, false, "Product not found");
        }

        try {
            return sendResponse(
                res,
                200,
                true,
                "Product retrieved successfully",
                product,
            );
        } catch (error) {
            return sendResponse(res, 500, false, "Failed to retrieve product");
        }
    } else if (method === "POST" && url === "/products") {
        // Created product by POST method
        const body = await parseBody(req);
        // console.log("Body ", body);
        const products = readProduct();
        const newProduct = {
            id: Date.now(), // Generate a unique ID for the product
            ...body, // Spread the properties from the request body
        };
        products.push(newProduct);
        // console.log("New Product ", products);
        // console.log(newProduct);
        insetProduct(products);

        // Create a new product
        // res.writeHead(200, {
        //     "Content-Type": "application/json",
        // });
        // res.end(
        //     JSON.stringify({
        //         message: "Product created successfully",
        //         data: newProduct,
        //     }),
        // );
        try {
            return sendResponse(
                res,
                201,
                true,
                "Product created successfully",
                newProduct,
            );
        } catch (error) {
            return sendResponse(res, 500, false, "Failed to create product");
        }

    } else if (method === "PUT" && id !== null) {
        const body = await parseBody(req);
        const products = readProduct();

        const index = products.findIndex((p: IProduct) => p.id === id);
        // console.log("Index ", index);
        if (index === -1) {
            // res.writeHead(404, {
            //     "Content-Type": "application/json",
            // });
            // return res.end(
            //     JSON.stringify({
            //         message: "Product not found",
            //         data: null,
            //     }),
            // );
            return sendResponse(res, 404, false, "Product not found");
        }
        // console.log(products[index]);
        products[index] = {
            id: products[index].id,
            ...body,
        };
        insetProduct(products);

        // res.writeHead(200, {
        //     "Content-Type": "application/json",
        // });
        // res.end(
        //     JSON.stringify({
        //         message: "Product updated successfully",
        //         data: products[index],
        //     }),
        // );
        try {
            return sendResponse(
                res,
                200,
                true,
                "Product updated successfully",
                products[index],
            );
        } catch (error) {
            return sendResponse(res, 500, false, "Failed to update product");
        }
    } else if (method === "DELETE" && id !== null) {
        const products = readProduct();
        const index = products.findIndex((p: IProduct) => p.id === id);
        if (index === -1) {
            // res.writeHead(404, {
            //     "Content-Type": "application/json",
            // });
            // return res.end(
            //     JSON.stringify({
            //         message: "Product not found",
            //         data: null,
            //     }),
            // );
            return sendResponse(res, 404, false, "Product not found");
        }

        const deletedProduct = products.splice(index, 1);
        // console.log(products);
        insetProduct(products);

        sendResponse(res, 200, true, "Product deleted successfully");
    }
};
