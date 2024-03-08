import authUser from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import express from "express";

const UserController = {
  registerUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if name, email, and password are provided
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
      }

      // Check if email is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }

      // Check if password meets security requirements (e.g., minimum length)
      const minPasswordLength = 6;
      if (password.length < minPasswordLength) {
        return res.status(400).json({ error: `Password must be at least ${minPasswordLength} characters long` });
      }

      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(409).json({ error: 'User already exists' });
      }

      // Create a new user
      let user = await User.create({
        name,
        email,
        password,
      });

      // Return a more secure response without sensitive information
      const sanitizedUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        // You might not want to expose admin status or the token in the response
      };

      return res.status(201).json({
        user: sanitizedUser,
        message: 'User registered successfully',
      });
    } catch (error) {
      // Handle unexpected errors
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //login user

  LoginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Check if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      let user;
      try {
        user = await User.findOne({ email });

        // If user not found, send a specific error message
        if (!user) {
          return res.status(401).json({ error: "Email not found" });
        }

        // Compare the password
        if (await user.comparePassword(password)) {
          return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            token: await user.generateJWT(),
          });
        } else {
          return res.status(401).json({ error: "Invalid email or password" });
        }
      } catch (innerError) {
        // Handle any unexpected errors during user retrieval or password comparison
        console.error("Error during login:", innerError);
        return res.status(500).json({ error: "An unexpected error occurred during login" });
      }
    } catch (error) {
      // Handle any error that reaches this level, including validation errors
      console.error("Error in loginUser:", error);
      next(error);
    }
  },


  userProfile: async (req, res, next) => {
    try {
      const userId = req.user._id;  // Assuming req.user._id is correct (it was req.User._id in the original function)
      
      // Check if userId is valid
      if (!userId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      let user;
      try {
        user = await User.findById(userId);

        // If user not found, send a specific error message
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          admin: user.admin,
        });
      } catch (innerError) {
        // Handle unexpected errors during user retrieval
        console.error("Error during userProfile:", innerError);
        return res.status(500).json({ error: "An unexpected error occurred during user retrieval" });
      }
    } catch (error) {
      // Handle any error that reaches this level, including validation errors
      console.error("Error in userProfile:", error);
      next(error);
    }
  },

  //upload photo
  uploadReferencePhoto: async (req, res, next) => {
    try {
      const photoData = await readFileSync(req.file.path);

      await User.findByIdAndUpdate(req.userId, {
        $set: {
          referencePhoto: {
            contentType: req.file.mimetype,
            data: photoData,
          },
        },
      });

      res.json({ message: "Reference photo uploaded successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Error uploading reference photo" });
    } finally {
      await unlinkSync(req.file.path);
    }
  },
};
const router= express.Router();

//define all the end points for tha api and reffernce that to its logic
router.post('/register',UserController.registerUser);
router.post('/login',UserController.LoginUser);
router.get("/profile",UserController.userProfile);
router.post("/upload-reference-photo", UserController.uploadReferencePhoto);

export default router;
