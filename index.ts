import express from "express";
import connectDB from "./util/db";

import eventRoutes from "./routes/eventRoutes";
import bookingRoutes from "./routes/bookingRoutes";

import dotenv from 'dotenv';
dotenv.config();


const app : express.Application = express();

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