import { z } from 'zod';


export const EventSchema = z.object({
    name: z.string(),
    date: z.string(), 
    availableTickets: z.number().int().positive(),
});


export const BookingSchema = z.object({
    userId: z.string(),
    eventId: z.string(),
    quantity: z.number().int().positive().max(15),
});
