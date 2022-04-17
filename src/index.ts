import app from "./app"
import createProducts from "./endpoints/createProducts"
import createPurchases from "./endpoints/createPurchase"
import createUser from "./endpoints/createUser"
import getAllProducts from "./endpoints/getAllProducts"
import getAllPurchases from "./endpoints/getAllPurchase"
import getAllUsers from "./endpoints/getAllUsers"

app.get('/users', getAllUsers)
app.get('/products', getAllProducts)
app.get("/users/:user_id/purchases", getAllPurchases)
app.post('/users', createUser)
app.post('/products', createProducts)
app.post('/purchases', createPurchases)