import { Schema, model, Document, Types } from 'mongoose';

interface IBooking extends Document {
    userId: string;
    eventId: Types.ObjectId;
    quantity: number;
}

const bookingSchema = new Schema<IBooking>({
    userId: { type: String, required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    quantity: { type: Number, required: true }
});

const Booking = model<IBooking>('Booking', bookingSchema);

export default Booking;
