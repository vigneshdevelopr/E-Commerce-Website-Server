import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        userIdx:{type: String, required: true,},
        cartProducts:[
            {
                ProductId: {type: String},
                quantity:{type: Number, default: 1},

            }
        ],
        amount: {type: Number, required: true},
        address:{type: Object, required: true},
        status: {type: String, default: 'Pending'}
        
       
    },{timestamps: true}
)
module.exports = mongoose.model("Product", orderSchema)

export {orderSchema}