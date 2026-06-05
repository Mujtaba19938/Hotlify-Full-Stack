import express from 'express'

// Reservation Controller
import {
  getAllReservations,
  getReservations,
  groupReservations,
  getReservationByID,
  getReservationByKeyword,
  addReservation,
  updateReservation,
  deleteReservation
} from '../controller/reservationController.js'

import {
  getAllProduct,
  getProducts,
  getProductbyID,
  getProductbyKeyword,
  addProduct,
  groupProduct,
  updateProduct,
  deleteProduct
} from '../controller/productController.js'

import {
  getAllCustomer,
  updateCustomer
} from '../controller/customerController.js'

import { addCustomer } from '../controller/registerController.js'
import { authLogin } from '../controller/signinController.js'
import { addOrder } from '../controller/orderController.js'

// Room Controller
import {
  getAllRooms,
  getRooms,
  groupRoom,
  getRoombyID,
  getRoombyKeyword,
  addRoom,
  updateRoom,
  deleteRoom
} from '../controller/roomController.js'

// Guest Controller
import {
  getAllGuests,
  getGuests,
  groupGuest,
  getGuestbyID,
  getGuestbyKeyword,
  addGuest,
  updateGuest,
  deleteGuest
} from '../controller/guestController.js'

// Booking Controller
import {
  getAllBookings,
  getBookings,
  groupBooking,
  getBookingbyID,
  getBookingbyKeyword,
  addBooking,
  updateBooking,
  deleteBooking
} from '../controller/bookingController.js'

import fs from 'fs'
import path from 'path'

// middleware
import upload from '../middleware/upload.js'

const router = express.Router()

// ================= PRODUCT ROUTES =================

router.get('/products/:page/:pagesize/:sortby/:cat', getAllProduct)

router.get('/getProducts', getProducts)

router.get('/productbyid/:id', getProductbyID)

router.get('/groupProduct', groupProduct)

router.get('/productbykeyword/:keyword', getProductbyKeyword)

router.post('/addproduct', upload.single('image'), addProduct)

router.post('/updateproduct', updateProduct)

router.post('/deleteproduct', deleteProduct)

// ================= ROOM ROUTES =================

router.get('/rooms/:page/:pagesize/:sortby/:type', getAllRooms)

router.get('/getRooms', getRooms)

router.get('/roombyid/:id', getRoombyID)

router.get('/groupRoom', groupRoom)

router.get('/roombykeyword/:keyword', getRoombyKeyword)

router.post('/addroom', upload.single('image'), addRoom)

router.post('/updateroom', upload.single('image'),updateRoom)

router.post('/deleteroom', deleteRoom)

// ================= GUEST ROUTES =================

router.get('/guests/:page/:pagesize/:sortby/:keyword', getAllGuests)

router.get('/getGuests', getGuests)

router.get('/guestbyid/:id', getGuestbyID)

router.get('/groupGuest', groupGuest)

router.get('/guestbykeyword/:keyword', getGuestbyKeyword)

router.post('/addguest', upload.single('image'), addGuest)

router.post('/updateguest', updateGuest)

router.post('/deleteguest', deleteGuest)

// ================= CUSTOMER ROUTES =================

router.get('/customers', getAllCustomer)

router.get('/addcustomer/:name/:email/:pwd/:address', addCustomer)

router.post('/updatecustomer', updateCustomer)

// ================= LOGIN ROUTES =================

router.get('/authlogin/:uname/:pwd', authLogin)

// ================= ORDER ROUTES =================

router.post('/addorder', addOrder)

// ================= RESERVATION ROUTES =================

router.get(
  '/reservations/:page/:pagesize/:sortby/:status',
  getAllReservations
)

router.get('/getReservations', getReservations)

router.get('/reservationbyid/:id', getReservationByID)

router.get('/groupReservations', groupReservations)

router.get(
  '/reservationbykeyword/:keyword',
  getReservationByKeyword
)

router.post('/addreservation', addReservation)

router.post('/updatereservation', updateReservation)

router.post('/deletereservation', deleteReservation)

// ================= BOOKING ROUTES =================

router.get(
  '/bookings/:page/:pagesize/:sortby/:status',
  getAllBookings
)

router.get('/getBookings', getBookings)

router.get('/bookingbyid/:id', getBookingbyID)

router.get('/groupBooking', groupBooking)

router.get('/bookingbykeyword/:keyword', getBookingbyKeyword)

router.post('/addbooking', addBooking)

router.post('/updatebooking', updateBooking)

router.post('/deletebooking', deleteBooking)
// ================= IMAGE ROUTE =================

router.get('/images/:imageName', (req, res) => {

  const imageName = req.params.imageName

  const imagePath = path.join('uploads', path.basename(imageName))

  const readStream = fs.createReadStream(imagePath)

  // Without this handler a missing file emits an unhandled 'error' event
  // that crashes the whole process. Respond 404 instead.
  readStream.on('error', () => {
    if (!res.headersSent) {
      res.status(404).send({ success: false, message: 'image not found' })
    }
  })

  readStream.pipe(res)

})

export default router