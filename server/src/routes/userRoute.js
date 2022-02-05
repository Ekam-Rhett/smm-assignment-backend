import express from 'express';
import protect from '../middlewares/authMiddleware.js';
import passport from 'passport'
import {registerUser, loginUser} from '../controllers/userController.js'
const router = express.Router();



router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/data').get(passport.authenticate('jwt', {session: false}), (req, res) =>{
    res.json(req.user)
})


export default router