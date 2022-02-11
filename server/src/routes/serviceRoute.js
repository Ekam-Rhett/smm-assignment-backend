import express from "express";
import protect from '../middlewares/authMiddleware.js'; // This import is being used by passport.authenticate method
import passport from 'passport'
import  { adminServices, createService, deleteService, publicServices, updateService, } from "../controllers/serviceController.js";
const router = express.Router();


router.route('/admin/create').post(passport.authenticate('jwt', {session: false}), createService);
router.route('/admin/delete').post(passport.authenticate('jwt', {session: false}), deleteService);
router.route('/admin/update').post(passport.authenticate('jwt', {session: false}), updateService);
router.route('/admin/:showDisabled?').get(passport.authenticate('jwt', {session: false}), adminServices);

router.route('/public').get(publicServices);


export default router;

