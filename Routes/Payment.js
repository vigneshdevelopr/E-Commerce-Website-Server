import express from 'express';
import Stripe from 'stripe'

const stripe = new Stripe(process.env.stripeSecretKey);

const router = express.Router();
router.post('/payment', (req, res)=>{
 stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency:"INR",
        },(stripeErr, stripeRes)=>{
            if(stripeErr){
                return res.status(500).json(stripeErr)
            }else{
                return res.status(200).json(stripeRes)
            }
        })
        
    
    
})

router.get('/payment', (req, res)=>{
    return res.status(200).send("hey this is a payment")
})

export const PaymentRouter = router;