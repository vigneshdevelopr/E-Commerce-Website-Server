import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        title:{type: String, required: true,},
        description:{type: String, required: true,},
        image:{type: String, required: true},
        category:{type: Array, required: true},
        size:{type: String},
        color:{type: String},
        price:{type: String},
       
    },{timestamps: true}
)
module.exports = mongoose.model("Product", productSchema)

export {productSchema}