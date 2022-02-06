import express from "express";
import protect from '../middlewares/authMiddleware.js'; // This import is being used by passport.authenticate method
import passport from 'passport'
import  { createCategory, getCategories } from "../controllers/categoryController.js";
const router = express.Router();


router.route('/create').post(passport.authenticate('jwt', {session: false}), createCategory);
router.route('/all/:showAll?').get(getCategories)

export default router;