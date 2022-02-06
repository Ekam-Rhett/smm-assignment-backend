import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';
import Service from '../models/serviceModel.js';










const createService = asyncHandler(async (req, res) => {
    const {categoryId, supplierServiceId, name, serviceType, retailPrice, quantity, quality, denyLinkDuplicates} = req.body;

    const category = await Category.findById(categoryId);
    console.log(category);

    if (category) {
        const newService = await Service.create({
            categoryId,
            supplierServiceId,
            name,
            serviceType,
            retailPrice,
            quantity,
            quality,
            denyLinkDuplicates
        });
    
        if (newService) {
            return res.status(201).json({
                newService
            })
        } else {
            res.status(400);
            throw new Error("Could not save to database")
        }
    } else {
        res.status(201);
        throw new Error('Not valiad categoryId provided')
    }


})

export default createService;