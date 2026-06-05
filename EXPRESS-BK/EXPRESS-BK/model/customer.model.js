import mongoose from "mongoose"

const customerSchema=mongoose.Schema(
    {        
customerNumber:Number,
customerName:String,
contactLastName:String,
contactFirstName:String,
phone:String,
addressLine1:String,
addressLine2:String,
city:String,
state:String,
postalCode:String,
country:String,
salesRepEmployeeNumber:String,
creditLimit:String,
email:String,
file:String,
pwd:String,
type:String
},
{
    timestamps:true
}
)

export default mongoose.model('customer',customerSchema)