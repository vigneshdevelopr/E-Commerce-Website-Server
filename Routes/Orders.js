import express from 'express';

const router = express.Router();
//Endpoints:
router.get('/', (req, res)=>{
    res.status(200).json({message: 'User Router Endpoint'})
})
router.post('/orders', (req, res)=>{
    
})

export const OrderRouter = router;