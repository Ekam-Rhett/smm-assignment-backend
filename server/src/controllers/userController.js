import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'


const registerUser = asyncHandler (async (req, res) => {
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
});



const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({email});

    if (user && await user.matchPassword(password)) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400)
        throw new Error("Invalid email or password")
    }

})






export {registerUser, loginUser};