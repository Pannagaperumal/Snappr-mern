import express from 'express';
import EventController from '../controllers/EventController.js';
const router = express.Router();


// Route to create an event
router.post('/create', EventController.createEvent);

// Route to update an event
router.put('/update/:id', EventController.updateEvent);

// Route to delete an event
router.delete('/delete/:id', EventController.deleteEvent);

// Route to assign a photographer to an event
router.put('/assign/:eventId/photographer/:photographerId', EventController.assignPhotographer);

// Route to get all events
router.get('/all', EventController.getAllEvents);

export default router;