import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'


const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const userExists = await User.findOne({email})

        if (userExists) {
            res.status(400);
            throw new Error("User already exisits")
        }

        const newUser = await User.create({
            name,
            email,
            password
        })

        if (newUser) {
            return res.status(201).json({
               user_id: newUser._id,
               name: newUser.name,
               email: newUser.email,
               message: "Successfully registered"
            })
        } else {
            res.status(400);
            throw new Error("Error occured while saving to database")
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            "error": "Something went wrong!",
            "errorInfo": `${err.message}`
        })
    }
};

export default registerUser;