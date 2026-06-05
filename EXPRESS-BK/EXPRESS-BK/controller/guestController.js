import Guest from "../model/guest.model.js";

// Get All Guests with Pagination, Sorting, Filtering
const getAllGuests = async (req, res) => {
  const page = parseInt(req.params.page) || 1;
  const pagesize = parseInt(req.params.pagesize) || 5;
  const sortby = req.params.sortby || "guestNumber";
  const keyword = req.params.keyword || "";

  const skip = (page - 1) * pagesize;

  try {
    const guests = await Guest.find({
      $or: [
        { firstName: { $regex: new RegExp(keyword, "i") } },
        { lastName: { $regex: new RegExp(keyword, "i") } },
        { email: { $regex: new RegExp(keyword, "i") } },
        { phone: { $regex: new RegExp(keyword, "i") } },
        { nationality: { $regex: new RegExp(keyword, "i") } },
      ],
    })
      .skip(skip)
      .limit(pagesize)
      .sort({ [sortby]: 1 });

    res.json({ guests });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "record not found due to",
      err,
    });
  }
};

// Get All Guests
const getGuests = async (req, res) => {
  try {
    const guests = await Guest.find();

    res.json({ guests });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "record not found due to",
      err,
    });
  }
};

// Group Guests by Nationality
const groupGuest = async (req, res) => {
  try {
    const guests = await Guest.aggregate([
      {
        $group: {
          _id: "$nationality",
          noofguests: { $sum: 1 },
        },
      },
      {
        $sort: { noofguests: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.json({ guests });
  } catch (err) {
    console.log("RECORD NOT FOUND DUE TO", err);
  }
};

// Get Guest by Guest Number
const getGuestbyID = async (req, res) => {
  const id = req.params.id;

  try {
    const guests = await Guest.find({ guestNumber: id });

    res.json(guests);
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "record not found due to",
      err,
    });
  }
};

// Search Guest by Keyword
const getGuestbyKeyword = async (req, res) => {
  const keyword = req.params.keyword;

  try {
    const data = await Guest.find({
      $or: [
        {
          firstName: { $regex: new RegExp(keyword, "i") },
        },
        {
          lastName: { $regex: new RegExp(keyword, "i") },
        },
        {
          email: { $regex: new RegExp(keyword, "i") },
        },
        {
          phone: { $regex: new RegExp(keyword, "i") },
        },
        {
          nationality: { $regex: new RegExp(keyword, "i") },
        },
        {
          idCardNumber: { $regex: new RegExp(keyword, "i") },
        },
        {
          passportNumber: { $regex: new RegExp(keyword, "i") },
        },
      ],
    });

    res.json(data);
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "record not found due to",
      err,
    });
  }
};

// Add Guest
const addGuest = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      nationality,
      idCardNumber,
      passportNumber,
      preferences,
      emergencyContactName,
      emergencyContactPhone,
      status,
    } = req.body;

    // Auto Generate Guest Number
    const totalGuests = await Guest.countDocuments();

    const autoGuestNumber = totalGuests + 1001;

    const filename = req.file
      ? "Guest-" + req.file.originalname
      : "default.jpg";

    const guest1 = {
      guestNumber: autoGuestNumber,
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      nationality,
      idCardNumber,
      passportNumber,
      preferences,
      emergencyContactName,
      emergencyContactPhone,
      profileImage: filename,
      status,
    };

    const guest = new Guest(guest1);

    await guest.save();

    return res.status(200).send({
      success: true,
      message: "guest record has been saved",
      guestNumber: autoGuestNumber,
    });

  } catch (err) {

    return res.status(400).send({
      success: false,
      message: "guest record has not been saved due to",
      err,
    });

  }
};

// Update Guest
const updateGuest = async (req, res) => {
  try {
    const {
      guestNumber,
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      nationality,
      idCardNumber,
      passportNumber,
      preferences,
      emergencyContactName,
      emergencyContactPhone,
      status,
    } = req.body;

    const guest1 = {
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      nationality,
      idCardNumber,
      passportNumber,
      preferences,
      emergencyContactName,
      emergencyContactPhone,
      status,
    };

    await Guest.updateMany(
      { guestNumber: guestNumber },
      { $set: guest1 }
    );

    return res.status(200).send({
      success: true,
      message: "guest record has been updated",
    });

  } catch (err) {

    return res.status(400).send({
      success: false,
      message: "guest record has not been updated due to",
      err,
    });

  }
};

// Delete Guest
const deleteGuest = async (req, res) => {
  try {
    const { guestNumber } = req.body;

    await Guest.deleteMany({ guestNumber: guestNumber });

    return res.status(200).send({
      success: true,
      message: "guest record has been deleted",
    });

  } catch (err) {

    return res.status(400).send({
      success: false,
      message: "guest record has not been deleted due to",
      err,
    });

  }
};

export {
  getAllGuests,
  getGuests,
  groupGuest,
  getGuestbyID,
  getGuestbyKeyword,
  addGuest,
  updateGuest,
  deleteGuest,
};