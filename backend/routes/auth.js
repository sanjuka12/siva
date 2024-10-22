import express from "express";
import { register, login, secret } from "../controllers/auth.js";
import { requireSignin, isAdmin } from "../middlewares/auth.js";
import { getUsersCount,getUsers,getUserDetailsByEmail, updateUserData, getUserByEmail,updateUserDetails } from '../controllers/userController.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users",getUsers);
router.get('/user/:email', getUserDetailsByEmail); //new profile page in mobile app
router.put('/update/:email', updateUserData);// new to update health profile in report page
router.get('/health/:email', getUserByEmail);//new autofill health profile in report page in mobile app
router.put('/user_profile/:email', updateUserDetails);//update dateof birth and gender in mobile app


router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ user: req.user });
});

router.get("/admin-check", requireSignin, isAdmin, (req, res) => {
  res.json({ user: req.user, isAdmin: true });
});

router.get("/secret", requireSignin, isAdmin, secret);
router.get('/users/count', getUsersCount);

export default router;
