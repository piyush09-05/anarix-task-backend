


Event Booking System
This project is a ticket booking system implemented with Express.js, TypeScript, and MongoDB using Mongoose. It allows users to create events, book tickets, manage bookings, and print tickets. The system ensures data consistency with transaction handling and type safety using Zod.


Endpoints
1. Create Event
Endpoint: POST /api/events
Description: Creates a new event.
Request Body:

  {
    "name": "Music Concert",
    "date": "2024-08-10T19:00:00Z",
    "totalTickets": 100
  }

Response Body:

  {
  "_id": "event_id",
  "name": "Music Concert",
  "date": "2024-08-10T19:00:00Z",
  "availableTickets": 100,
  "bookedTickets": 0,
  "__v": 0
 }


2. Retrieve Events
Endpoint: GET /api/events
Description: Retrieves a list of all events.

Response:

[
  {
    "_id": "event_id",
    "name": "Music Concert",
    "date": "2024-08-10T19:00:00Z",
    "totalTickets": 100,
    "bookedTickets": 0,
    "__v": 0
  },
  ...
]

3. Retrieve Event Details
Endpoint: GET /api/events/:id
Description: Retrieves details of a specific event by its ID.
Parameters:
id: The ID of the event.

Response:
{
  "_id": "event_id",
  "name": "Music Concert",
  "date": "2024-08-10T19:00:00Z",
  "totalTickets": 100,
  "bookedTickets": 0,
  "__v": 0
}

4. Book Tickets
Endpoint: POST /api/bookings
Description: Books tickets for an event.


Request Body:
{
  "userId": "user_id",
  "eventId": "event_id",
  "quantity": 2
}
Response:
{
  "_id": "booking_id",
  "userId": "user_id",
  "eventId": "event_id",
  "quantity": 2,
  "__v": 0
}


5. Cancel Booking
Endpoint: DELETE /api/bookings/:id
Description: Cancels a booking by its ID.
Parameters:
id: The ID of the booking.

Response:
{
  "message": "Booking canceled."
}


6. Print Ticket
Endpoint: POST /api/print-ticket
Description: Generates a printable format of a ticket for a specific booking.

Request:
{
  "bookingId": "booking_id"
}

Response:
{
  "json": {
    "event": {
      "_id": "event_id",
      "name": "Music Concert",
      "date": "2024-08-10T19:00:00Z",
      "totalTickets": 100,
      "bookedTickets": 2
    },
    "booking": {
      "_id": "booking_id",
      "userId": "user_id",
      "eventId": "event_id",
      "quantity": 2
    }
  },
  "html": "<!DOCTYPE html>...</html>" // HTML string for ticket
}


Setup
1. Install Dependencies
2. nodemon index.ts


  
