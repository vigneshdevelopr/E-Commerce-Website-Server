import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        userIdx:{type: String, required: true,},
        cartProducts:[
            {
                ProductId: {type: String},
                quantity:{type: Number, default: 1},

            }
        ]
        
       
    },{timestamps: true}
)
const Cart = mongoose.model("Cart", cartSchema)

export {Cart};