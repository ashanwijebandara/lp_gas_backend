const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        name:{type:String,required:true,},
        size:{type:String,required:true,},
        count:{type:Number,required:true,},
        userOwner:{type:mongoose.Schema.Types.ObjectId,
                    ref:"employee"},
        price:{type:Number,}, 
        
    }
)
 
const OrderModel = mongoose.model("order",orderSchema)
module.exports = OrderModel;

