import {sql} from "../configs/db.js";

//CRUD operations (if finished build, test in POSTMAN*)
export const getProducts = async(req, res) => {
    try {
        const products = await sql `
            SELECT * FROM products
            ORDER BY created_at DESC
        `;
        console.log("products fetched successfully", products);
        res.status(200).json({success: true, data: products});
    }
    catch(error) {
        console.log("Error getProducts function", error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const createProduct = async(req, res) => {
    const {name, price, image} = req.body;

    const priceNumber = parseFloat(price)

    if (!name || !price || !image) {
        return res.status(400).json({success: false, message: "Missing required fields, All fields are required"});
    }

    try {
        const createdProduct = await sql `
            INSERT INTO products (name, price, image)
            VALUES (${name}, ${priceNumber}, ${image})
            RETURNING *
            `
        console.log("new product added: ", createdProduct);
        res.status(201).json({success: true, data: createdProduct[0]});
    }
    catch (error) {
        console.log("Error createProduct function", error);
        res.status(500).json({success: false, message: "Internal server error"});        
    }
}

export const getProduct = async(req, res) => {
    const {id} = req.params;

    try {
        const product = await sql `
            SELECT * FROM products
            WHERE id = ${id}
        `

        if(product.length === 0) {
            return res.status(404).json({success: false, message: "Product not found"});
        }

        console.log("product fetched successfully", product);
        res.status(200).json({success: true, data: product[0]});
    }
    catch(error) {
        console.log("Error getProduct function", error)
        res.status(500).json({success: false, message: "Internal server error"});        

    }
}

export const updateProduct = async(req, res) => {
    const {id} = req.params;
    const {name, price, image} = req.body;

    try {
        const updatedProduct = await sql `
            UPDATE products
            SET name = ${name}, price = ${price}, image = ${image}
            WHERE id = ${id}
            RETURNING *
        `
        if(updatedProduct.length === 0) {
            return res.status(404).json({success: false, message: "Product not found"});
        }
        console.log("product updated successfully", updatedProduct)
        res.status(200).json({success: true, data: updatedProduct[0]})
    }
    catch (error) {
        console.log("Error updateProduct function", error)
        res.status(500).json({success: false, message: "Internal server error"});       
    }
}

export const deleteProduct = async(req, res) => {
    const {id} = req.params;

    try {
        const deletedProduct = await sql `
            DELETE FROM products 
            WHERE id = ${id}
            RETURNING*
        `
        if(deletedProduct.length === 0) {
            return res.status(404).json({success: false, message: "Product not found"});
        }
        console.log("product deleted successfully", deletedProduct)
        res.status(200).json({success: true, data: deletedProduct[0]})
    }
    catch (error) {
        console.log("Error deleteProduct function", error)
        res.status(500).json({success: false, message: "Internal server error"});  
    }
}