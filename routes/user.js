const express = require("express");

const EmployeeModel =require('../models/Employee')
const bcrypt = require('bcrypt');


const router = express.Router();



router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await EmployeeModel.findOne({ email });

        if (user) {
            
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                res.json({ message: "Success" ,data: user });
            } else {
                console.log("Password comparison failed.");
                res.json({ message: "The password is incorrect" });
            }
        } else {
            res.json({ message: "No record exists for this email" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "An error occurred during login" });
    }
});


 router.post("/signup",async(req,res,next) =>{
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.name;
    try{
        const user =  EmployeeModel.findOne(req.body.email);
    if(!user){
        return res.status(400).json({message:"email exist"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newuser = new EmployeeModel({
        name:username,
        email:email,
        password:hashedPassword
    })
    const result = await newuser.save();
    res.json({ message: "Signed" });
    res.status(201).send(result);
    }catch(error)
    {next(error)}
    
}) ; 

router.delete("/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        const deletedUser = await EmployeeModel.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.get("/", async (req, res) => {
    try {
        const users = await EmployeeModel.find();
        const usersWithOrders = await Promise.all(
            users.map(async (user) => {
                const populatedUser = await EmployeeModel
                    .findById(user._id)
                    .populate('savedorders', 'name count price');
                return {
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    },
                    savedorders: populatedUser.savedorders
                };
            })
        );
        res.status(200).json(usersWithOrders);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router; 


