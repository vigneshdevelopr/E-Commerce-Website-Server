import express from 'express';
import dotenv from 'dotenv';
import { createConnection } from './Database/MongoConnect.js';
import { UserRouter } from './Routes/Users.js';
import { AuthRouter } from './Routes/Auth.js';
import { ProductRouter } from './Routes/Product.js';
import { CartRouter } from './Routes/Cart.js';
import { OrderRouter } from './Routes/Orders.js';
import { PaymentRouter } from './Routes/Payment.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;
//Middleware
app.use(express.json())
app.use(cors());
createConnection();
app.use('/users', UserRouter)
app.use('/auth', AuthRouter) 
app.use('/products', ProductRouter)
app.use('/cart', CartRouter)
app.use('/orders', OrderRouter)
app.use('/checkout', PaymentRouter)


//HomePage Call:
app.get('/',(req, res)=>{
    res.status(200).json([{message: 'Welcome to EliteEmporium Server !'},{Description: 'Only Developer can Know the endpoints for this server to Check or use the Databases'}])
})

//App Listenings:
app.listen(port, (req,res)=>{
    console.log(`Your App is listening on ${port}`)
})





