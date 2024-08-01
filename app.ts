import express from "express";
import connectDB from "./util/db";

import eventRoutes from "./routes/eventRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import { validateBooking } from "./middlewares/middleware";
import mongoose from "mongoose";
import Event from "./Models/Event";
import Booking from "./Models/Booking";

import dotenv from 'dotenv';
dotenv.config();


const app : express.Application = express();

app.get("/", (req,res) => {
    res.send("Hello World!!!")
})

app.post('/bookings', validateBooking, async (req, res) => {
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

app.use(express.json());

app.use(eventRoutes);
app.use(bookingRoutes);

const PORT = 3000;
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Failed to connect to the database. Server not started.');
    }
});

export default app;