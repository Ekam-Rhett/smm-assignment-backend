import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/jwt/generateToken.js';


const registerUser = asyncHandler (async (req, res) => {
    const {name, email, password} = req.body;

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400);
        throw new Error("User already exists")
    }

    const newUser = await User.create({
        name,
        email,
        password
    })

    if (newUser) {
        return res.status(201).json({
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id),
            message: "Successfully registered"
        })
    } else {
        res.status(400);
        throw new Error("Could not save to database")
    }
});



const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    
    const user = await User.findOne({email});

    if (user && await user.matchPassword(password)) {
        res.status(201).json({
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message: "Successfully authenticated"
        })
    } else {
        res.status(400)
        throw new Error("Invalid email or password")
    }

})




export {registerUser, loginUser};