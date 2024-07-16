# Room Booking API

This project provides an API for managing room bookings. It allows you to create rooms, book rooms, list all rooms with their booking details, get all bookings, and fetch customer booking counts. The application is built using Express.js and provides several endpoints for interaction.

## Table of Contents
- Installation
- Usage
- API Endpoints
  - Create Room
  - Get Rooms
  - Book Room
  - Get All Bookings
  - Get Rooms with Bookings
  - Get Customer Booking Counts
- Static Data
- Error Handling

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/MR-JK004/Hall-Booking-API.git
   cd Hall-Booking-API
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

The server will start running on `http://localhost:8000` or the port specified in your environment variables.

## Usage

Use a tool like Postman or curl to interact with the API endpoints listed below.

## API Endpoints

### Create Room

- **Endpoint:** `POST /room/create-room`
- **Description:** Creates a new room.
- **Request Body:**
  ```json
  {
    "name": "Training Room",
    "numberOfSeats": 25,
    "amenities": ["Computers", "Projector", "Whiteboard", "WiFi"],
    "pricePerHour": 60
  }
  ```
- **Response:**
  - **201 Created:** Room created successfully.
  - **500 Internal Server Error:** Internal server error occurred.

### Get Rooms

- **Endpoint:** `GET /room/rooms`
- **Description:** Retrieves a list of all rooms.
- **Response:**
  - **200 OK:** List of rooms fetched successfully.
  - **500 Internal Server Error:** Internal server error occurred.

### Book Room

- **Endpoint:** `POST /room/book-room`
- **Description:** Books a room.
- **Request Body:**
  ```json
  {
    "customerName": "John Doe",
    "date": "2024-07-17",
    "startTime": "10:00",
    "endTime": "11:00",
    "roomName": "Conference Room"
  }
  ```
- **Response:**
  - **201 Created:** Room booked successfully.
  - **400 Bad Request:** Room is already booked for the given date and time.
  - **404 Not Found:** No room found with the specified name.
  - **500 Internal Server Error:** Internal server error occurred.

### Get All Bookings

- **Endpoint:** `GET /room/bookings`
- **Description:** Retrieves a list of all bookings.
- **Response:**
  - **200 OK:** List of bookings fetched successfully.
  - **500 Internal Server Error:** Internal server error occurred.

### Get Rooms with Bookings

- **Endpoint:** `GET /room/room-bookings`
- **Description:** Retrieves a list of all rooms with their booking details.
- **Response:**
  - **200 OK:** List of rooms with booking details fetched successfully.
  - **500 Internal Server Error:** Internal server error occurred.

### Get Customer Booking Counts

- **Endpoint:** `GET /room/customer-counts`
- **Description:** Retrieves the count of bookings for each customer.
- **Response:**
  - **200 OK:** Customer booking data fetched successfully.
  - **500 Internal Server Error:** Internal server error occurred.

## Static Data

The application uses static data for rooms and bookings, defined in `roomService.js`:

### Rooms
```
const rooms = [
  { id: 1, name: 'Conference Room', numberOfSeats: 20, amenities: ['Projector', 'Whiteboard', 'WiFi'], pricePerHour: 50 },
  { id: 2, name: 'Meeting Room', numberOfSeats: 10, amenities: ['TV Screen', 'Conference Phone', 'WiFi'], pricePerHour: 30 },
  { id: 3, name: 'Workshop Room', numberOfSeats: 30, amenities: ['Stage', 'Microphones', 'Sound System', 'WiFi'], pricePerHour: 75 },
  { id: 4, name: 'Private Office', numberOfSeats: 4, amenities: ['Desk', 'Office Chairs', 'WiFi'], pricePerHour: 20 },
  { id: 5, name: 'Training Room', numberOfSeats: 25, amenities: ['Computers', 'Projector', 'Whiteboard', 'WiFi'], pricePerHour: 60 }
];
```

### Bookings
```
const bookings = [
  { id: 1, customerName: 'Jitender Kumar M', date: '2024-07-15', startTime: '11:00', endTime: '12:00', roomName: "Conference Room" },
  { id: 2, customerName: 'Harish S', date: '2024-07-15', startTime: '14:00', endTime: '15:00', roomName: "Meeting Room" },
  { id: 3, customerName: 'Gokul K', date: '2024-07-16', startTime: '09:00', endTime: '11:00', roomName: 'Workshop Room' },
  { id: 4, customerName: 'Jitender Kumar M', date: '2024-07-16', startTime: '11:00', endTime: '12:00', roomId: 1 }
];
```

## Error Handling

Each endpoint handles errors gracefully and returns appropriate HTTP status codes along with error messages.

- **500 Internal Server Error:** Occurs when there's an issue processing the request on the server.

Make sure to handle these errors in your client applications to provide a smooth user experience.
