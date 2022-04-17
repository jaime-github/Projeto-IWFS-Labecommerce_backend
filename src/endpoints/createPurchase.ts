import { Request, Response } from "express";
import { connection } from "../data/connection";

export default async function createPurchases(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { user_id, products_id, quantity } = req.body;

    if (!user_id || !products_id || !quantity) {
      res.statusCode = 422;
      throw "'user_id', 'products_id' and 'quantity'are required!";
    }
    const price = await connection.raw(`
            SELECT price FROM labecommerce_products WHERE id = "${products_id}";
     `);
    if (!price[0][0].price) {
      throw new Error("Error in get price");
    }
    const total_price: number = quantity * price[0][0].price;

    await connection.raw(`
            INSERT INTO labecommerce_purchases
                ( user_id, products_id, quantity, total_price)
            VALUES (
                "${user_id}",
                "${products_id}",
                ${quantity},
                ${total_price}
            );           
            `);

    res.status(201).send("Success in create purchase!");
  } catch (error) {
    if (error instanceof Error) {
      res.send({ error, message: error.message });
    } else {
      res.send({ message: "Unexpected error" });
    }
  }
}
