import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import passport from 'passport'
import {registerUser, loginUser, userData} from '../controllers/userController.js'
const router = express.Router();



router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/data').get(passport.authenticate('jwt', {session: false}), userData)


export default router