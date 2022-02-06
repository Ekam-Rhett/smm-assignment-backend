import express from "express";
import protect from '../middlewares/authMiddleware.js'; // This import is being used by passport.authenticate method
import passport from 'passport'
import  { getServices, createService, deleteService } from "../controllers/serviceController.js";
const router = express.Router();



router.route('/all/:showDisabled?').get(getServices);
router.route('/create').post(passport.authenticate('jwt', {session: false}), createService);
router.route('/delete').post(passport.authenticate('jwt', {session: false}), deleteService);



export default router;