import { Router } from 'express';
import Event from '../Models/Event';
import { validateEvent } from '../middlewares/middleware';

import mongoose from 'mongoose';

const router = Router();

router.post('/events', validateEvent, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, date, availableTickets } = req.body;

        
        const event = new Event({ name, date, availableTickets });
        await event.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).send(event);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error creating event:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

router.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).send(events);
    } catch (error) {
        console.error('Error retrieving events:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

router.get('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).send({ message: 'Event not found.' });
        }

        res.status(200).send(event);
    } catch (error) {
        console.error('Error retrieving event:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;
