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
            throw new Error("Could not save to database");
        }
    } else {
        res.status(201);
        throw new Error('Not valiad categoryId provided');
    }
});


const deleteService = asyncHandler(async (req, res) => {
    const { serviceId } = req.body;

    if (!serviceId) {
        res.status(400);
        throw new Error("serviceId is not provided");
    }

    const deletedService = await Service.findByIdAndDelete(serviceId);
    if (deletedService) {
        res.status(201).json({
            serviceId: deletedService._id,
            message: "Successfully deleted"
        });
    } else {
        res.status(400);
        throw new Error("Could not find service or could not be deleted");
    }
});


const updateService = asyncHandler(async (req, res) => {
    const {serviceId, categoryId, supplierServiceId, name, serviceType, retailPrice, quantity, quality, denyLinkDuplicates, isActive} = req.body;
    const service = await Service.findById(serviceId);

    
    if (!serviceId) {
        res.status(400);
        throw new Error('No serviceId provided');
    }

    if (categoryId) {
        const category = await Category.findById(categoryId);
        if (!category) {
            res.status(201);
            throw new Error('Not valiad categoryId provided');
        }


        if (!service) {
            res.status(400);
            throw new Error('Service not found')
        }
    }
    

    if (categoryId) service.categoryId = categoryId;
    if (isActive) service.isActive = isActive;
    if (supplierServiceId) service.supplierServiceId = supplierServiceId;
    if (name) service.name = name;
    if (serviceType) service.serviceType = serviceType;
    if (retailPrice) service.retailPrice = retailPrice;
    if (quantity) service.quantity = quantity;
    if (quality) service.quality = quality;
    if (denyLinkDuplicates) service.denyLinkDuplicates = denyLinkDuplicates;
    

    const updatedService = await service.save();

    if  (!updatedService) {
        res.status(400);
        throw new Error("Could not update to database")
    }

    return res.status(201).json({
        updatedService,
        message: "Service updated"
    })
    
});



export  {getServices, createService, updateService,  deleteService};