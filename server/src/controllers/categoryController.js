import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';


const getCategories = asyncHandler(async (req, res) => {

    const showAll = req.params.showAll;
    console.log(showAll)
    let allCategories;
    if (showAll === "true") {
        console.log(1)
        allCategories = await Category.find();
    } else {
        console.log(2)
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