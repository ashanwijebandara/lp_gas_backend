const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const orderRouter = require("./routes/order");
const userRouter = require("./routes/user");
const paymentRouter = require('./routes/payment')


 
const app =express()


app.use(express.json()) 
app.use(cors())

const dbUrl = "mongodb+srv://test_user:D803jMp9AalcQyxE@cluster0.szxkpy2.mongodb.net/lp-web?retryWrites=true&w=majority";
// mongodb+srv://<username>:<password>@cluster0.szxkpy2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect(dbUrl)
    .then(() => { 
        console.log('Connected to MongoDB'); 
    }) 
    .catch((err) => {
        console.log('Connection to MongoDB failed');
        console.log(err);
    } 
);

app.use("/orders",orderRouter);
app.use("/user",userRouter);  
app.use("/payment",paymentRouter);



 

app.use(express.json())
app.listen(3001,() =>{
    console.log("server is running")
})
 