//Creating Static Data for Rooms and Bookings
const rooms = [
    {
        id: 1,
        name: 'Conference Room',
        numberOfSeats: 20,
        amenities: ['Projector', 'Whiteboard', 'WiFi'],
        pricePerHour: 50
    },
    {
        id: 2,
        name: 'Meeting Room',
        numberOfSeats: 10,
        amenities: ['TV Screen', 'Conference Phone', 'WiFi'],
        pricePerHour: 30
    },
    {
        id: 3,
        name: 'Workshop Room',
        numberOfSeats: 30,
        amenities: ['Stage', 'Microphones', 'Sound System', 'WiFi'],
        pricePerHour: 75
    },
    {
        id: 4,
        name: 'Private Office',
        numberOfSeats: 4,
        amenities: ['Desk', 'Office Chairs', 'WiFi'],
        pricePerHour: 20
    },
    {
        id: 5,
        name: 'Training Room',
        numberOfSeats: 25,
        amenities: ['Computers', 'Projector', 'Whiteboard', 'WiFi'],
        pricePerHour: 60
    }
];
const bookings = [
    {
        id: 1,
        customerName: 'Jitender Kumar M',
        date: '2024-07-15',
        startTime: '11:00',
        endTime: '12:00',
        roomName:"Conference Room"
    },
    {
        id: 2,
        customerName: 'Harish S',
        date: '2024-07-15',
        startTime: '14:00',
        endTime: '15:00',
        roomName:"Meeting Room"
    },
    {
        id: 3,
        customerName: 'Gokul K',
        date: '2024-07-16',
        startTime: '09:00',
        endTime: '11:00',
        roomName:'WorkShop Room'
    },
    {
        id: 4,
        customerName: 'Jitender Kumar M',
        date: '2024-07-16',
        startTime: '11:00',
        endTime: '12:00',
        roomId: 1
    }
];



//1)Creating a Room
const createRoom = (req, res) => {
    try {
        req.body.id = rooms.length ? rooms[rooms.length - 1].id + 1 : 1; //Calculating Room ID
        rooms.push(req.body); //Pushing the Room Details
        res.status(201).send({
            message: `Room ${req.body.id} Created Successfully`
        });

    }
    catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            error: error.message
        })
    }
}


//Getting the list of Rooms
const getRooms = (req, res) => {
    try {
        res.status(200).send({
            message: 'Data of Rooms Fetched SuccessFully',
            data: rooms
        })
    }
    catch (error) {
        res.status(500).send({
            message: 'Internal Server Error' || error.message
        })
    }
}


//2. Booking a Room
const bookRoom = (req, res) => {

    try {
        const { roomName, date, startTime, endTime } = req.body;

        const roomExists = rooms.some(room => room.name === roomName);//Check Whether Such Room Exists
        if (!roomExists) {
            return res.status(404).send({
                message: `No room found with Name - ${roomName}`
            });
        }

        //Checks for the Conflict if Bookings for Same Room at Same Date and Time
        const isRoomBooked = bookings.some(booking =>
            booking.roomName === roomName &&
            booking.date === date &&
            ((startTime >= booking.startTime && startTime < booking.endTime) ||
                (endTime > booking.startTime && endTime <= booking.endTime) ||
                (startTime <= booking.startTime && endTime >= booking.endTime))
        );
        if (isRoomBooked) {
            return res.status(400).send({
                message: "Room is already booked for the given date and time."
            });
        }
        req.body.id = bookings.length ? bookings[bookings.length - 1].id + 1 : 1;

        bookings.push(req.body); //Booked a Room
        res.status(201).send({
            message: `Room booked successfully for ${req.body.customerName}`,
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Internal Server Error', error: error.message || error.message
        })
    }
}


// 3)List all Rooms with Booked Data 
const getRoomsWithBookings = (req, res) => {
    try {
        const roomsWithBookingDetails = rooms.map(room => {
            const roomBookings = bookings.filter(booking => booking.roomId === room.id);

            const detailedBookings = roomBookings.map(booking => ({
                roomName: room.name,
                bookedStatus: true,
                customerName: booking.customerName,
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime
            }));

            if (detailedBookings.length === 0) {//If there is no Booking for the Room
                return [{
                    roomName: room.name,
                    bookedStatus: false,
                    customerName: null,
                    date: null,
                    startTime: null,
                    endTime: null
                }];
            }
            return detailedBookings;
        }).flat();

        res.status(200).send({
            message: 'Data of Rooms with Booking Details Fetched Successfully',
            data: roomsWithBookingDetails
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Internal Server Error' || error.message
        })
    }
}

//4)List all customers with booked Data
const getBookings = (req, res) => {
    try {
        res.status(200).send({
            message: 'Data of Bookings Fetched SuccessFully',
            data: bookings
        })
    }
    catch (error) {
        res.status(500).send({
            message: 'Internal Server Error' || error.message
        })
    }
}

//5)List how many times a customer has booked the room

const getCustomerCounts = (req,res)=>{
    try {
        // Creating an object to store booking details and counts by customer name
        const customerBookingDetails = {};

        // Iterate over the bookings to fill in the booking details
        bookings.forEach(booking => {
            const room = rooms.find(room => room.id === booking.roomId);
            const roomName = room ? room.name : "Unknown Room";

            if (!customerBookingDetails[booking.customerName]) {
                customerBookingDetails[booking.customerName] = {
                    customerName: booking.customerName,
                    bookings: [],
                    bookingCount: 0
                };
            }

            customerBookingDetails[booking.customerName].bookings.push({
                roomName: roomName,
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime,
                bookingId: booking.id,
                bookingDate: new Date().toISOString().split('T')[0], // Assuming current date as booking date
                bookingStatus: "Confirmed" // Assuming all bookings have a status of confirmed
            });

            customerBookingDetails[booking.customerName].bookingCount++;
        });
        const customerBookingsArray = Object.values(customerBookingDetails);

        res.status(200).send({
            message: 'Customer Booking Data Fetched Successfully',
            data: customerBookingsArray,
        });
    } 
    catch (error) {
        res.status(500).send({
            message: 'Internal Server Error',
            error: error.message || error.message
        });
    }
}

export default {
    createRoom,
    getRooms,
    bookRoom,
    getBookings,
    getRoomsWithBookings,
    getCustomerCounts
}