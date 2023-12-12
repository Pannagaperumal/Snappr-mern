import express from "express";
import { registerUser,LoginUser , userProfile ,uploadReferencePhoto } from "../controllers/UserControllers.js";
import authGuard from "../middleware/authMiddleware.js";

const router= express.Router();

//define all the end points for tha api and reffernce that to its logic
router.post('/register',registerUser);
router.post('/login',LoginUser);
router.get("/profile",authGuard,userProfile);
router.post("/upload-reference-photo", uploadReferencePhoto);

export default router;  