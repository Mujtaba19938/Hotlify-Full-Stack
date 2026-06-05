import Reservation from "../model/reservation.model.js";

// Get All Reservations with Pagination, Sorting, Filtering
const getAllReservations = async (req, res) => {
  const page = parseInt(req.params.page) || 1;
  const pagesize = parseInt(req.params.pagesize) || 5;
  const sortby = req.params.sortby || "guestName";
  const status = req.params.status || "";

  const skip = (page - 1) * pagesize;

  try {
    const reservations = await Reservation.find({
      reservationStatus: { $regex: new RegExp(status, "i") },
    })
      .skip(skip)
      .limit(pagesize)
      .sort({ [sortby]: 1 });

    res.json({ reservations });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Record not found due to",
      err,
    });
  }
};

// Get All Reservations
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();

    res.json({ reservations });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Record not found due to",
      err,
    });
  }
};

// Group Reservations by Room Type
const groupReservations = async (req, res) => {
  try {
    const reservations = await Reservation.aggregate([
      {
        $group: {
          _id: "$roomType",
          totalReservations: { $sum: 1 },
        },
      },
      {
        $sort: { totalReservations: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.json({ reservations });
  } catch (err) {
    console.log("RECORD NOT FOUND DUE TO", err);
  }
};

// Get Reservation by ID
const getReservationByID = async (req, res) => {
  const id = req.params.id;

  try {
    const reservation = await Reservation.findById(id);

    res.json(reservation);
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Record not found due to",
      err,
    });
  }
};

// Search Reservation by Keyword
const getReservationByKeyword = async (req, res) => {
  const keyword = req.params.keyword;

  try {
    const data = await Reservation.find({
      $or: [
        {
          guestName: { $regex: new RegExp(keyword, "i") },
        },
        {
          guestEmail: { $regex: new RegExp(keyword, "i") },
        },
        {
          guestPhone: { $regex: new RegExp(keyword, "i") },
        },
        {
          roomType: { $regex: new RegExp(keyword, "i") },
        },
        {
          reservationStatus: { $regex: new RegExp(keyword, "i") },
        },
        {
          paymentStatus: { $regex: new RegExp(keyword, "i") },
        },
      ],
    });

    res.json(data);
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Record not found due to",
      err,
    });
  }
};

// Add Reservation
const addReservation = async (req, res) => {
  try {
    const {
      guestName,
      guestEmail,
      guestPhone,
      roomType,
      roomNumber,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      reservationStatus,
      totalAmount,
      paymentStatus,
      specialRequests,
    } = req.body;

    const reservation = new Reservation({
      guestName,
      guestEmail,
      guestPhone,
      roomType,
      roomNumber,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      reservationStatus,
      totalAmount,
      paymentStatus,
      specialRequests,
    });

    await reservation.save();

    return res.status(200).send({
      success: true,
      message: "Reservation has been saved",
      reservation,
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "Reservation has not been saved due to",
      err,
    });
  }
};

// Update Reservation
const updateReservation = async (req, res) => {
  try {
    const {
      id,
      guestName,
      guestEmail,
      guestPhone,
      roomType,
      roomNumber,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      reservationStatus,
      totalAmount,
      paymentStatus,
      specialRequests,
    } = req.body;

    await Reservation.findByIdAndUpdate(
      id,
      {
        guestName,
        guestEmail,
        guestPhone,
        roomType,
        roomNumber,
        checkInDate,
        checkOutDate,
        numberOfGuests,
        reservationStatus,
        totalAmount,
        paymentStatus,
        specialRequests,
      },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: "Reservation has been updated",
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "Reservation has not been updated due to",
      err,
    });
  }
};

// Delete Reservation
const deleteReservation = async (req, res) => {
  try {
    const { id } = req.body;

    await Reservation.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      message: "Reservation has been deleted",
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "Reservation has not been deleted due to",
      err,
    });
  }
};

export {
  getAllReservations,
  getReservations,
  groupReservations,
  getReservationByID,
  getReservationByKeyword,
  addReservation,
  updateReservation,
  deleteReservation,
};