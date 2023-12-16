import express from "express";
import { registerUser,LoginUser , userProfile ,uploadReferencePhoto } from "../controllers/UserControllers.js";
import authGuard from "../middleware/authMiddleware.js";

import upload from "../utils/multer.js"


const router= express.Router();

//define all the end points for tha api and reffernce that to its logic
router.post('/register',upload.single('reffphoto'),registerUser);
router.post('/login',LoginUser);
router.get("/profile",authGuard,userProfile);
router.post("/upload-reference-photo", uploadReferencePhoto);

export default router;  
/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user with details and photo.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - name: name
 *         in: formData
 *         type: string
 *         required: true
 *       - name: email
 *         in: formData
 *         type: string
 *         required: true
 *       - name: password
 *         in: formData
 *         type: string
 *         required: true
 *       - name: photo
 *         in: formData
 *         type: file
 *     responses:
 *       201:
 *         description: User registration successful
 *         schema:
 *           $ref: '#/definitions/User'
 *       500:
 *         description: Internal Server Error
 *
 * /users/login:
 * post:
 *     summary: Register a new user
 *     description: Endpoint to login the  user with details.
 *     consumes:
 *       - json data
 *     parameters:
 *       - name: email
 *         in: formData
 *         type: string
 *         required: true
 *       - name: password
 *         in: formData
 *         type: string
 *         required: true
 *     responses:
 *       201:
 *         description: User login successful
 *         schema:
 *           $ref: '#/definitions/User'
 *       500:
 *         description: Internal Server Error
 */