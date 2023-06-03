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
module.exports = mongoose.model("Product", cartSchema)

export {cartSchema}