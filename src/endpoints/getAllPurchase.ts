import { Request, Response } from "express";
import { connection } from "../data/connection";
import { purchase } from "../types";


export default async function getAllPurchases(req: Request, res: Response): Promise<void> {

    try {
        const user_id = req.params.user_id

        if(!user_id){
         res.statusCode = 404
         throw "Purchase List Not Found!"
        }

        const result: purchase[] = await connection.raw(`
            SELECT * FROM labecommerce_purchases
            JOIN labecommerce_products
            ON products_id = labecommerce_products.id 
            WHERE user_id = "${user_id}";
            `)
        res.status(201).send(result[0])
      
    } catch (error) {
        res.status(500).send("Unexpected server error")
    } 
}