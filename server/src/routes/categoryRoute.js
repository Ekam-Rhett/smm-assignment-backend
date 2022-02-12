import express from "express";
import protect from '../middlewares/authMiddleware.js'; // This import is being used by passport.authenticate method
import passport from 'passport'
import  { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categoryController.js";
const router = express.Router();


router.route('/all/:showAll?').get(getCategories);
router.route('/create').post(passport.authenticate('jwt', {session: false}), createCategory);
router.route('/delete').post(passport.authenticate('jwt', {session: false}), deleteCategory);
router.route('/update').post(passport.authenticate('jwt', {session: false}), updateCategory);

export default router;








