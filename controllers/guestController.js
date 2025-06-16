import Guest from "../models/guest.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

// Create a new guest
export const createGuest = async (req, res) => {
  const { email, password, name, phoneNumber } = req.body;

  const checkEmail = await Guest.findOne({ where: { email } });

  if (checkEmail) {
    return res.status(404).json({
      status: false,
      message: "Email has been used",
      data: [],
    });
  }

  const hashed_password = bcrypt.hashSync(password, 10);

  const guest = await Guest.create({ email, name ,phoneNumber, password: hashed_password });
  
  if (!guest) {
    return res.status(400).json({
      status: false,
      message: "Could not create the guest",
      data: [],
    });
  }

  sendEmail(email, "Welcome to Book Reviews", "Thank you for signing up!");

  return res.status(201).json({
    status: true,
    message: "guest created successfully",
    data: guest,
  });
};

// login as a guest
export const loginGuest = async (req, res) => {
  const { email, password } = req.body;

  const guest = await Guest.findOne({ where: { email } });

  if (!guest) {
    return res.status(404).json({
      status: false,
      message: "Invalid email or password",
      data: [],
    });
  }

  const comparePassword = await bcrypt.compareSync(password, guest.password);

  if (!comparePassword) {
    return res.status(400).json({
      status: false,
      message: "Invalid email or password",
      data: [],
    });
  }

  let payload = {
    id: guest.id,
    email: guest.email,
    name: guest.name,
  };
  let token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  payload.token = token;

  return res.status(201).json({
    status: true,
    message: "guest login successfully",
    data: payload,
  });
};

// get guest profile
export const guestProfile = async (req, res) => {
  return res.status(200).json({
    status: true,
    message: "guest profile retrieved successfully",
    data: req.guest,
  });
};

//get all guests
export const getAllGuest = async (req, res) => {
  const eventId = Number(req.params.eventId);

  const checkEvent = await Guests.findByPk(eventId);

  const { title, date } = req.query;
  
  const LIMIT = 10;
  
  const page = parseInt(req.query.page) || 1;
  
  const offset = (page - 1) * LIMIT;
    
  if (!checkEvent) {
    return res.status(404).json({
      status: false,
      message: "Could not find the event",
      data: [],
    });
  }

  const where = { eventId };
  if (title) {
    where.title = title;
  }

  if (date) {
    where.date = date;
  }

  const Guests = await Guests.findAndCountAll({ limit: LIMIT, offset });

  if (!Guests) {
    return res.status(400).json({
      status: false,
      message: "Could not any guest",
      data: [],
    });
  }

  return res.status(200).json({
    status: true,
    message: "Guests have been retrieved successfully",
    data: Guests,
  });
};

export const getCheckedInGuestbyEvents = async (req, res) => {
  try{
    const { eventId } = req.params;
    const checkedInCount = await Guest.count({
      where: {
        eventId,
        checkedIn: true
      }
    });
    
    res.json({ eventId, checkedInCount});
  }
  
  catch (error) {
    res.status(500).json({ error: 'Error fetching checked-in guests'});

  }
};


// get a single guest
export const getGuest = async (req, res) => {
  const { guestId } = req.params;
  const guest = await Guest.findByPk(Number(guestId));
  if (!guest) {
    return res.status(404).json({
      status: false,
      message: "Could not get the guest",
      data: [],
    });
  }

  return res.status(200).json({
    status: true,
    message: "guest retrieved successfully",
    data: guest,
  });
};

// update a guest
export const updateGuest = async (req, res) => {
  const { guestId } = req.params;
  const guest = await Guest.findByPk(Number(guestId));

  if (!guest) {
    return res.status(400).json({
      status: false,
      message: "Could not get the guest",
      data: [],
    });
  }

  await guest.update(req.body);

  return res.status(200).json({
    status: true,
    message: "guest updated successfully",
    data: guest,
  });

};

// delete a guest
export const deleteGuest = async (req, res) => {
  const { guestId } = req.params;
  const guest = await Guest.findByPk(Number(userId));
  await guest.destroy();

  return res.status(200).json({
    status: true,
    message: "guest deleted successfully",
    data: [],
  });
};
