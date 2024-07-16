import express from 'express'
import roomService from "../service/roomService.js"

const roomController = express.Router();

roomController.get('/rooms',roomService.getRooms)
roomController.post('/create-room',roomService.createRoom)
roomController.post('/book-room',roomService.bookRoom)
roomController.get('/bookings',roomService.getBookings)
roomController.get('/room-bookings',roomService.getRoomsWithBookings)
roomController.get('/customer-counts',roomService.getCustomerCounts)

export default roomController
