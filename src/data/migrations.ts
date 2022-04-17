import { connection } from "./connection"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }
const createTables = () => connection
   .raw(`
      CREATE TABLE IF NOT EXISTS labecommerce_users (
         id INT PRIMARY KEY AUTO_INCREMENT,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL
      );     
      CREATE TABLE IF NOT EXISTS labecommerce_products (
         id INT PRIMARY KEY AUTO_INCREMENT,
         name VARCHAR(255) NOT NULL,
         price INT NOT NULL,
         image TEXT NOT NULL
      );     
      CREATE TABLE IF NOT EXISTS labecommerce_purchases (
         id INT PRIMARY KEY AUTO_INCREMENT,
         user_id INT,
         FOREIGN KEY(user_id) REFERENCES labecommerce_users(id),
         products_id INT,
         FOREIGN KEY(products_id) REFERENCES labecommerce_products(id),
         quantity INT NOT NULL,
         total_price INT NOT NULL
      );    
      `)
   .then(() => { console.log("Tabelas criadas") })
   .catch(printError)

const closeConnection = () => { connection.destroy() }

createTables()

   .finally(closeConnection)