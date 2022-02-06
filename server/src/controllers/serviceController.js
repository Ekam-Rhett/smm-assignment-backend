import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';
import Service from '../models/serviceModel.js';



const getServices = asyncHandler(async (req, res) => {
    let allServices;
    const showDisabled = (req.params.showDisabled === "true") ? true : false;

    if (showDisabled) {
        allServices = await Service.find();
    } else {
        allServices = await Service.find({isActive: true});
    }

    if (allServices) {
        return res.status(201).json({
            showDisabled,
            services: allServices
        });
    } else {
        res.status(400);
        throw new Error("Could not fetch services");
    }
});



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
});


const deleteService = asyncHandler(async (req, res) => {
    const { serviceId } = req.body;

    if (!serviceId) {
        res.status(400)
        throw new Error("serviceId is not provided")
    }

    const deletedService = await Service.findByIdAndDelete(serviceId);
    if (deletedService) {
        res.status(201).json({
            serviceId: deletedService._id,
            message: "Successfully deleted"
        })
    } else {
        res.status(400)
        throw new Error("Could not find service or could not be deleted")
    }
})




export  {getServices, createService, deleteService};