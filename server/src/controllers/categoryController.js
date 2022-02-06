import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';


const getCategories = asyncHandler(async (req, res) => {
    let allCategories;
    const showAll = (req.params.showAll === "true") ? true : false;
    
    if (showAll) {
        allCategories = await Category.find();
    } else {
        allCategories = await Category.find({isDisabled: false});
    }
    
    if (allCategories) {
        return res.status(201).json({
            showAll,
            categories: allCategories
        });
    } else {
        res.status(400);
        throw new Error("Could not fetch categories");
    }
});

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

});



export {getCategories, createCategory};