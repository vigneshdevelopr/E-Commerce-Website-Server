import express from 'express';
import dotenv from 'dotenv';
import { createConnection } from './Database/MongoConnect.js';
import { UserRouter } from './Routes/Users.js';
import { AuthRouter } from './Routes/Auth.js';
dotenv.config();

const app = express();
const port = process.env.PORT;
//Middleware
app.use(express.json())
createConnection();
app.use('/users', UserRouter)
app.use('/auth', AuthRouter)


//HomePage Call:
app.get('/',(req, res)=>{
    res.status(200).json([{message: 'Welcome to EliteEmporium Server !'},{Description: 'Only Developer can Know the endpoints for this server to Check or use the Databases'}])
})

//App Listenings:
app.listen(port, (req,res)=>{
    console.log(`Your App is listening on ${port}`)
})





