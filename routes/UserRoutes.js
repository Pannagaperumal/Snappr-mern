import express from "express";
import { UserController } from "../controllers/UserControllers.js";
import authGuard from "../middleware/authMiddleware.js";

const router= express.Router();

//define all the end points for tha api and reffernce that to its logic
router.post('/register',UserController.registerUser);
router.post('/login',UserController.LoginUser);
router.get("/profile",authGuard,UserController.userProfile);
router.post("/upload-reference-photo", UserController.uploadReferencePhoto);

export default router;  