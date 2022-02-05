import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'


const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const userExists = await User.findOne({email})

        if (userExists) {
            return res.status(400).json({
                error: "User already exisits"
            })
        }


        return res.status(200).json({
            name,
            email
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            "error": "Something went wrong!",
            "errorInfo": `${err}`
        })
    }
};

export default registerUser;