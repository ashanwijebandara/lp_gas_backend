const express = require("express");

const EmployeeModel = require("../models/Employee");
const orderModel = require("../models/Orders");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await orderModel.find();
        res.status(200).json(result);
        console.log(result);
    } catch (err) {
        res.status(500).json(err);
    }
});



// Create a new order

router.post("/", async (req, res) => {
    console.log(req.body)


    const order = new orderModel({

        name: req.body.name,
        size: req.body.size,
        count: req.body.count,
        userOwner: req.body.userOwner,
        price: req.body.price,
    });


    try {
        const result = order.save();
        res.status(201).json({ order })
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get order by id
router.get("/:orderId", async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// place a order

router.put("/", async (req, res, next) => {
    const order = await orderModel.findById(req.body.orderId)
    const user = await EmployeeModel.findById(req.body.userID)
    try {
        if (!user.savedorders) {
            user.savedorders = [];
        }

        user.savedorders.push(order);
        await user.save();

        res.status(201).json({ savedorders: user.savedorders });
    } catch (err) {
        next(err);
        res.status(500).json(err);
    }
})

//Get orders of user

router.get("/savedorders/:userId", async (req, res) => {
    try {
        const user = await EmployeeModel.findById(req.params.userId)
            .populate('savedorders', 'name count price');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const orders = user.savedorders.map(order => ({
            name: order.name,
            count: order.count,
            size: order.size,
            price: order.price
        }));

        res.status(200).json({ savedorders: orders });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})



//delete a order by id
router.delete("/:orderId", async (req, res) => {
    const orderId = req.params.orderId;

    try {

        const deletedOrder = await orderModel.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }


        const user = await EmployeeModel.findById(deletedOrder.userOwner);
        if (user) {
            user.savedorders = user.savedorders.filter(savedOrderId => savedOrderId.toString() !== orderId);
            await user.save();
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete("/savedorders/:userId/:orderId", async (req, res) => {
    const userId = req.params.userId;
    const orderId = req.params.orderId;

    try {
        const user = await EmployeeModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.savedorders) {
            return res.status(404).json({ message: 'Saved orders not found for this user' });
        }

        const orderIndex = user.savedorders.findIndex(order => order && order.toString() === orderId);
        if (orderIndex === -1) {
            return res.status(404).json({ message: 'Order not found for this user' });
        }
        user.savedorders.splice(orderIndex, 1);

        await user.save();
        const deletedOrder = await orderModel.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router; 
