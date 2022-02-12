import express from 'express';
import protect from '../middlewares/authMiddleware.js'; // This import is being used by passport.authenticate method
import passport from 'passport'
import {registerUser, loginUser, userData, updateProfie} from '../controllers/userController.js'
const router = express.Router();



router.route('/signup').post(registerUser);
router.route('/login1').post(loginUser);
router.route('/profile').get(passport.authenticate('jwt', {session: false}), userData);
router.route('/updateprofile').post(passport.authenticate('jwt', {session: false}), updateProfie);

export default router