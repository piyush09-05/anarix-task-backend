import { Request, Response, NextFunction } from 'express';
import { BookingSchema, EventSchema } from '../schema';

export const validateBooking = (req: Request, res: Response, next: NextFunction) => {
    const parsed = BookingSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).send({ message: 'Invalid booking data', errors: parsed.error.format() });
    }
    req.body = parsed.data; 
    next();
};

export const validateEvent = (req: Request, res: Response, next: NextFunction) => {
    const parsed = EventSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).send({ message: 'Invalid event data', errors: parsed.error.format() });
    }
    req.body = parsed.data;
    next();
};

