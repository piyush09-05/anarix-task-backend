import { Router } from 'express';
import Booking from '../Models/Booking';
import Event from '../Models/Event';
import { validateBooking } from '../middlewares/middleware';
import mongoose from 'mongoose';

import { generateTicketHTML } from '../util/generateTicket';

const router = Router();

router.post('/bookings', validateBooking, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { userId, eventId, quantity } = req.body;

        if (quantity > 15) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).send({ message: 'Cannot book more than 15 tickets per request.' });
        }

        const event = await Event.findById(eventId).session(session);
        if (!event) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).send({ message: 'Event not found.' });
        }

      

        if (quantity > event.availableTickets) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).send({ message: 'Not enough tickets available.' });
        }

        event.bookedTickets += quantity;
        event.availableTickets -= quantity;
        await event.save({ session });

        const booking = new Booking({ userId, eventId, quantity });
        await booking.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).send(booking);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error('Error booking tickets:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

router.delete('/bookings/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).send({ message: 'Booking not found.' });
        }

        const event = await Event.findById(booking.eventId);
        if (event) {
            event.bookedTickets -= booking.quantity;
            await event.save();
        }

        await Booking.findByIdAndDelete(id);
        res.status(200).send({ message: 'Booking canceled.' });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json({bookings});
    } catch (error) {
        console.error("Error fetching bookings: ", error);
        res.status(500).send("Internal Server Errro")
    }
})

router.post('/print-ticket', async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId).populate('eventId');
        if (!booking) {
            return res.status(404).send({ message: 'Booking not found.' });
        }

        const event = booking.eventId;
        const html = generateTicketHTML(booking, event);

        res.status(200).send({
            json: {
                event,
                booking
            },
            html
        });
    } catch (error) {
        console.error('Error printing ticket:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;
