import express from 'express';

const router = express.Router();
//Endpoints:
router.get('/', (req, res)=>{
    res.status(200).json({message: 'User Router Endpoint'})
})
router.post('/cart', (req, res)=>{
    const AddNewUser = req.body.username;
    res.status(200).json({AddNewUser});
    console.log(AddNewUser);
})

export const CartRouter = router;