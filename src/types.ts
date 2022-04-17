export type user = {
   id: number
   name: string
   email: string
   password: string
}

export type products = {
   id: number
   name: string
   price: number
   image: string
}

export type purchase = {
   user_id: number,
   products_id: number, 
   quantity: number, 
   total_price: number
} 