import express from "express";
import protect from '../middlewares/authMiddleware.js'; // This import is being used by passport.authenticate method
import passport from 'passport'
import createService from "../controllers/serviceController.js";
const router = express.Router();



router.route('/create').post(passport.authenticate('jwt', {session: false}), createService);



export default router;