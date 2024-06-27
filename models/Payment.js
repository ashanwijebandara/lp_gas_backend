const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    name: String,
    cardNumber: String,
    cvv: String,
    address: String,
    state: String, 
    zip: String,
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
    },
});


const PaymentModel = mongoose.model("payment",PaymentSchema)
module.exports = PaymentModel