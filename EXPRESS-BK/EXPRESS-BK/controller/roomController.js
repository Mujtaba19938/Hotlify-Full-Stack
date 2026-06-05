import Room from "../model/room.model.js";

// Get All Rooms with Pagination, Sorting, Filtering
const getAllRooms = async (req, res) => {
  const page = parseInt(req.params.page) || 1;
  const pagesize = parseInt(req.params.pagesize) || 5;
  const sortby = req.params.sortby || "roomNumber";
  const type = req.params.type || "";

  const skip = (page - 1) * pagesize;

  try {
    const rooms = await Room.find({
      roomType: { $regex: new RegExp(type, "i") },
    })
      .skip(skip)
      .limit(pagesize)
      .sort({ [sortby]: 1 });

    res.json({ rooms });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "record not found due to",
      err,
    });
  }
};

// Get All Rooms
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.json({ rooms });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "record not found due to",
      err,
    });
  }
};

// Group Rooms by Room Type
const groupRoom = async (req, res) => {
  try {
    const rooms = await Room.aggregate([
      {
        $group: {
          _id: "$roomType",
          noofrooms: { $sum: 1 },
        },
      },
      {
        $sort: { noofrooms: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.json({ rooms });
  } catch (err) {
    console.log("RECORD NOT FOUND DUE TO", err);
  }
};

// Get Room by Room Number
const getRoombyID = async (req, res) => {
  const id = req.params.id;

  try {
    const rooms = await Room.find({ roomNumber: id });

    res.json(rooms);
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "record not found due to",
      err,
    });
  }
};

// Search Room by Keyword
const getRoombyKeyword = async (req, res) => {
  const keyword = req.params.keyword;

  try {
    const data = await Room.find({
      $or: [
        {
          roomType: { $regex: new RegExp(keyword, "i") },
        },
        {
          status: { $regex: new RegExp(keyword, "i") },
        },
        {
          description: { $regex: new RegExp(keyword, "i") },
        },
        {
          currentGuestName: { $regex: new RegExp(keyword, "i") },
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

const addRoom = async (req, res) => {
  try {
    const {
      roomType,
      price,
      status,
      description,
      currentGuestName,
      checkInDate,
      checkOutDate,
    } = req.body;

    // Auto Generate Room Number
    const totalRooms = await Room.countDocuments();

    const autoRoomNumber = totalRooms + 101;

    const filename = req.file
      ? req.file.originalname
      : "default.jpg";

    const room1 = {
      roomNumber: autoRoomNumber,
      roomType,
      price,
      status,
      isAvailable: status === "available" ? true : false,
      currentGuestName,
      checkInDate,
      checkOutDate,
      description,
      image: filename,
    };

    const room = new Room(room1);

    await room.save();

    return res.status(200).send({
      success: true,
      message: "room record has been saved",
      roomNumber: autoRoomNumber,
    });

  } catch (err) {

    return res.status(400).send({
      success: false,
      message: "room record has not been saved due to",
      err,
    });

  }
};

// Update Room
const updateRoom = async (req, res) => {
  try {
    const {
      roomNumber,
      roomType,
      price,
      status,
      description,
      currentGuestName,
      checkInDate,
      checkOutDate,
    } = req.body;

   const filename = req.file
      ? req.file.originalname
      : "default.jpg";

    const room1 = {
      roomType,
      price,
      status,
      isAvailable: status === "available" ? true : false,
      currentGuestName,
      checkInDate,
      checkOutDate,
      description,
      image:filename 
    };

    await Room.updateMany(
      { roomNumber: roomNumber },
      { $set: room1 }
    );

    return res.status(200).send({
      success: true,
      message: "room record has been updated",
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "room record has not been updated due to",
      err,
    });
  }
};

// Delete Room
const deleteRoom = async (req, res) => {
  try {
    const { roomNumber } = req.body;

    await Room.deleteMany({ roomNumber: roomNumber });

    return res.status(200).send({
      success: true,
      message: "room record has been deleted",
    });
  } catch (err) {
    return res.status(400).send({
      success: false,
      message: "room record has not been deleted due to",
      err,
    });
  }
};

export {
  getAllRooms,
  getRooms,
  groupRoom,
  getRoombyID,
  getRoombyKeyword,
  addRoom,
  updateRoom,
  deleteRoom,
};