import { Request, Response } from "express";
import { connection } from "../data/connection";


export default async function createUser(
   req: Request,
   res: Response
): Promise<void> {
   try {
      const { name, email, password } = req.body
      if (!name || !email || !password) {
         res.statusCode = 422
         throw "'name','email' and 'password' are required!"
      }

      await connection('labecommerce_users').insert({name,email,password})
      res.status(201).end("User created!")
   } catch (error:any) {
      if (typeof error === "string") {
         res.send(error)
      } else {

         console.log(error.sqlMessage || error.message);
         res.status(500).send("Ops! Unexpected error!")
      }

   }
}