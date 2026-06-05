import mongoose from "mongoose"

const productSchema=mongoose.Schema(
    {        
productName: String,
productLine: String,
productScale: String,
productVendor: String,
productDescription: String,
quantityInStock:Number,
buyPrice:Number,
MSRP:String,
image:String,
productID:Number
},
{
    timestamps:true
}
)

export default mongoose.model('product',productSchema)