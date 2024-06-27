
const express = require("express");

const PaymentModel = require("../models/Payment");


const router = express.Router();

router.get("/", async (req, res) => { 
    try {
        const result = await PaymentModel.find(); 
        res.status(200).json(result);
        console.log(result);
    } catch (err) {
        res.status(500).json(err);
    }
}); 
 


// Create a new order

router.post("/",async (req, res) => {
    console.log(req.body) 
     
    const payment = new PaymentModel ({
        
        name: req.body.name,
        cvv:req.body.cvv,
        cardNumber: req.body.number,
        address:req.body.address,
        zip:req.body.zip,
        
        userOwner: req.body.userOwner,
        
    });
    

    try {
        const result = await payment.save();  
        res.status(201).json({ payment: result }); 
    } catch (err) { 
        res.status(500).json(err);
    }
    
});
module.exports = router;