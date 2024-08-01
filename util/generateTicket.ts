export const generateTicketHTML = (booking: any, event: any): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ticket</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .ticket {
                border: 1px solid #ddd;
                background: #fff;
                padding: 20px;
                border-radius: 5px;
                max-width: 600px;
                margin: 0 auto;
            }
            .ticket h1 {
                text-align: center;
            }
            .details {
                margin-bottom: 20px;
            }
            .details div {
                margin-bottom: 10px;
            }
            .details label {
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="ticket">
            <h1>Event Ticket</h1>
            <div class="details">
                <div><label>Event Name:</label> ${event.name}</div>
                <div><label>Event Date:</label> ${new Date(event.date).toLocaleDateString()}</div>
                <div><label>Booked By:</label> ${booking.userId}</div>
                <div><label>Quantity:</label> ${booking.quantity}</div>
                <div><label>Booking ID:</label> ${booking._id}</div>
            </div>
        </div>
    </body>
    </html>
    `;
};
