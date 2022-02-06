import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'

const createCategory = asyncHandler(async (req, res) => {
    const {name, isDisabled} = req.body;

    const newCategory = await Category.create({
        name,
        isDisabled
    })

    if (newCategory) {
        return res.status(201).json({
            id: newCategory._id,
            name: newCategory.name,
            isDisabled: newCategory.isDisabled
        })
    } else {
        res.status(400)
        throw new Error('Could not save to database')
    }

})

export default createCategory;