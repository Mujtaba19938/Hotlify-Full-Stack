import { Booking } from "../model/booking.model.js";

// Get All Bookings with Pagination, Sorting, Filtering
const getAllBookings = async (req, res) => {
  const page = parseInt(req.params.page) || 1;
  const pagesize = parseInt(req.params.pagesize) || 5;
  const sortby = req.params.sortby || "guestName";
  const status = req.params.status || "";

  const skip = (page - 1) * pagesize;

  try {
    const bookings = await Booking.find({
      status: { $regex: new RegExp(status, "i") },
    })
      .populate("room")
      .skip(skip)
      .limit(pagesize)
      .sort({ [sortby]: 1 });

    res.json({ bookings });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "record not found due to",
      err,
    });
  }
};

// Get All Bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("room");

    res.json({ bookings });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "record not found due to",
      err,
    });
  }
};

// Group Bookings by Status
const groupBooking = async (req, res) => {
  try {
    const bookings = await Booking.aggregate([
      {
        $group: {
          _id: "$status",
          totalBookings: { $sum: 1 },
        },
      },
      {
        $sort: { totalBookings: -1 },
      },
    ]);

    res.json({ bookings });
  } catch (err) {
    console.log("RECORD NOT FOUND DUE TO", err);
  }
};

// Get Booking By ID
const getBookingbyID = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await Booking.findById(id).populate("room");

    res.json(booking);
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "record not found due to",
      err,
    });
  }
};

// Search Booking By Keyword
const getBookingbyKeyword = async (req, res) => {
  const keyword = req.params.keyword;

  try {
    const data = await Booking.find({
      $or: [
        {
          guestName: { $regex: new RegExp(keyword, "i") },
        },
        {
          status: { $regex: new RegExp(keyword, "i") },
        },
      ],
    }).populate("room");

    res.json(data);
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "record not found due to",
      err,
    });
  }
};

// Add Booking
const addBooking = async (req, res) => {
  try {
    const {
      room,
      guestName,
      checkInDate,
      checkOutDate,
      status,
    } = req.body;

    const booking = new Booking({
      room,
      guestName,
      checkInDate,
      checkOutDate,
      status,
    });

    await booking.save();

    return res.status(200).send({
      success: true,
      message: "booking record has been saved",
      booking,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "booking record has not been saved due to",
      err,
    });
  }
};

// Update Booking
const updateBooking = async (req, res) => {
  try {
    const {
      id,
      room,
      guestName,
      checkInDate,
      checkOutDate,
      status,
    } = req.body;

    const bookingData = {
      room,
      guestName,
      checkInDate,
      checkOutDate,
      status,
    };

    await Booking.findByIdAndUpdate(
      id,
      { $set: bookingData },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "booking record has been updated",
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "booking record has not been updated due to",
      err,
    });
  }
};

// Delete Booking
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.body;

    await Booking.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      message: "booking record has been deleted",
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "booking record has not been deleted due to",
      err,
    });
  }
};

export {
  getAllBookings,
  getBookings,
  groupBooking,
  getBookingbyID,
  getBookingbyKeyword,
  addBooking,
  updateBooking,
  deleteBooking,
};