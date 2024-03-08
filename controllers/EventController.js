import Event from '../models/Event.js';
import User from '../models/User.js';
import express from 'express';

const EventController = {
    // Create Event
    createEvent: async (req, res) => {
        const event = new Event(req.body);
        await event.save();
        res.status(201).send(event);
    },

    // Update Event
    updateEvent: async (req, res) => {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).send(event);
    },

    // Delete Event
    deleteEvent: async (req, res) => {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).send({message: 'Event deleted'});
    },

    // Assign Photographer to Event
    assignPhotographer: async (req, res) => {
        const eventId = req.body.eventId;
        const photographerEmail = req.body.photographerEmail;

        try {
            const event = await Event.findOne({event_id:eventId});
            const photographer = await User.findOne({ email: photographerEmail });

            if (!event) {
                return res.status(404).send({ message: 'Event not found' });
            }

            if (!photographer) {
                return res.status(404).send({ message: 'Photographer not found' });
            }

            if (!photographer.photographer) {
                return res.status(400).send({ message: 'User is not a photographer' });
            }

            event.photographers = photographer;
            await event.save();

            res.status(200).send(event);
        } catch (error) {
            res.status(500).send({ message: 'Internal server error' });
        }
    },

    getAllEvents : async (req, res) => {
        try {
            const events = await Event.find();
            res.status(200).send(events);
        } catch (error) {
            res.status(500).send({ message: 'Internal server error' });
        }
    }

};


const router = express.Router();
router.post('/create', EventController.createEvent);
router.put('/update/:id', EventController.updateEvent);
router.delete('/delete/:id', EventController.deleteEvent);
router.put('/assign/:eventId/photographer/:photographerId', EventController.assignPhotographer);
router.get('/all', EventController.getAllEvents);

export default router;