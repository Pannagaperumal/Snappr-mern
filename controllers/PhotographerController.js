import Photographer from "../models/Photographer.js";
import express from "express";
// import nodemailer from "nodemailer";

const router = express.Router();

const PhotographerController = {
  // Create endpoint for creating photographer and sending setup password email
  create:async (req, res) => {
    try {
      const { name, id, contactNumber, email } = req.body;
  
      // Validate the email address before proceeding
      if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
      }
  
      // Create a photographer without saving to the database
      const photographer = new Photographer({ name, id, contactNumber, email });
  
      // Send setup password email
    //   const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'ps.pannaga@deepcognition.ai',
    //       pass: 'Panna@123',
    //     },
    //   });
  
    //   const mailOptions = {
    //     from: 'ps.pannaga@deepcognition.ai',
    //     to: email,
    //     subject: 'Setup Password',
    //     text: 'Please set up your password by clicking on the following link: <link>',
    //   };
  
    //   await transporter.sendMail(mailOptions);
  
      // Save the photographer to the database
      photographer.save();
  
      res.status(201).json({
        message: 'Photographer created successfully. Setup password email sent.',
      });
    } catch (error) {
      console.error('Error in createPhotographer:', error);
  
      // Handle specific errors
      if (error.code === 11000) {
        // Duplicate key error (unique constraint violation)
        return res.status(400).json({ error: 'Email or ID already exists' });
      }
  
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  //   router.get('/photographers/:id/events'),
  get_events: async (req, res) => {
    try {
      const photographerId = req.params.id;

      // Find the photographer by ID
      const photographer = await Photographer.findOne({ id: photographerId });

      if (!photographer) {
        return res.status(404).json({ error: "Photographer not found" });
      }

      // Retrieve the assigned events
      const assignedEvents = photographer.assignedEvents;

      res.json({ photographerId, assignedEvents });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }, // router.delete('/photographers/:id')
  delete: async (req, res) => {
    try {
      const photographerId = req.params.id;

      // Find and delete the photographer by ID
      const result = await Photographer.findOneAndDelete({
        id: photographerId,
      });

      if (!result) {
        return res.status(404).json({ error: "Photographer not found" });
      }

      res.json({ message: "Photographer deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

router.post("/photographers/create", PhotographerController.create);
router.get("/photographers/:id/events", PhotographerController.get_events);
router.delete("/photographers/:id", PhotographerController.delete);

export default router;