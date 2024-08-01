import { Schema, model, Document } from 'mongoose';

interface IEvent extends Document {
    name: string;
    date: Date;
    availableTickets: number;
    bookedTickets: number;
    
}

const eventSchema = new Schema<IEvent>({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    availableTickets: { type: Number, required: true},
    bookedTickets: { type: Number, default: 0 },

});

const Event = model<IEvent>('Event', eventSchema);

export default Event;



