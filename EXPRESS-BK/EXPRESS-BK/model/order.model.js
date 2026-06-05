import mongoose, { Types } from "mongoose"

const orderItemSchema=mongoose.Schema(
    {   
       productID:Number,
       name:String,
       price:Number,
       qty:Number
}
);


const customerSchema=mongoose.Schema(
    {  
       name:String,
       email:String,
       address:String
    }
);


const orderSchema=mongoose.Schema(
    {   
      customer:customerSchema,
      items:[orderItemSchema],
      total:Number,
      status:{
        type:String,
        default:"Pending"
      },
      paymentstatus:{
        type:String,
        default:"Pending"
      },
      paymentIntentId:String
},
{
    timestamps:true
}
);

export default mongoose.model('order',orderSchema)