import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  Guest from '../models/guest.js'; 
import  Event  from '../models/event.js';// Make sure your models are correctly imported
// import sendEmail from '../utils/sendEmail'; // Adjust this import path as needed

dotenv.config();

// Create a new guest
export const createGuest = async (req, res) => {
  try {
    const { email, password, name, phoneNumber } = req.body;

    const checkEmail = await Guest.findOne({ where: { email } });

    if (checkEmail) {
      return res.status(409).json({
        status: false,
        message: "Email has been used",
        data: [],
      });
    }

    const hashed_password = bcrypt.hashSync(password, 10);

    const guest = await Guest.create({ email, name, phoneNumber, password: hashed_password });

    if (!guest) {
      return res.status(400).json({
        status: false,
        message: "Could not create the guest",
        data: [],
      });
    }

    sendEmail(email, "Welcome to Eventease", "Thank you for signing up!");

    const guestData = guest.toJSON();
    delete guestData.password;

    return res.status(201).json({
      status: true,
      message: "Guest created successfully",
      data: guestData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Login as a guest
export const loginGuest = async (req, res) => {
  try {
    const { email, password } = req.body;

    const guest = await Guest.findOne({ where: { email } });

    if (!guest) {
      return res.status(404).json({
        status: false,
        message: "Invalid email or password",
        data: [],
      });
    }

    const comparePassword = bcrypt.compareSync(password, guest.password);

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

    let token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    payload.token = token;

    return res.status(200).json({
      status: true,
      message: "Guest login successful",
      data: payload,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Get guest profile
export const guestProfile = async (req, res) => {
  const { guestId } = req.params;

  try {
    const guest = await Guest.findByPk(guestId, {
      include: Event, // This pulls the associated Event
    });

    if (!guest) {
      return res.status(404).json({
        status: false,
        message: "Guest not found.",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Guest with event info retrieved successfully.",
      data: guest,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error while retrieving guest.",
      error: error.message,
    });
  }
};

// Get all guests for an event
export const getAllGuest = async (req, res) => {
  const { eventId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Guest.findAndCountAll({
      where: { eventId },
      include: {
        model: Event,
        attributes: ['title', 'date', 'location'],
      },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      status: true,
      message: "Guests with event info retrieved successfully.",
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalGuests: count,
      data: rows,
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error while fetching guests.",
      error: error.message,
   });
 }
};

// Get checked-in guest count by event
export const getCheckedInGuestbyEvents = async (req, res) => {
  try {
    const { eventId } = req.params;

    const checkedInCount = await Guest.count({
      where: {
        eventId,
        checkedIn: true,
      },
    });

    res.json({ eventId, checkedInCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: 'Error fetching checked-in guests',
      error: error.message,
    });
  }
};

// Get a single guest
export const getGuest = async (req, res) => {
  try {
    const { guestId } = req.params;
    const guest = await Guest.findByPk(Number(guestId));

    if (!guest) {
      return res.status(404).json({
        status: false,
        message: "Could not get the guest",
        data: [],
      });
    }

    const guestData = guest.toJSON();
    delete guestData.password;

    return res.status(200).json({
      status: true,
      message: "Guest retrieved successfully",
      data: guestData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Update a guest
export const updateGuest = async (req, res) => {
  try {
    const { guestId } = req.params;
    const guest = await Guest.findByPk(Number(guestId));

    if (!guest) {
      return res.status(404).json({
        status: false,
        message: "Guest not found",
        data: [],
      });
    }

    await guest.update(req.body);

    const guestData = guest.toJSON();
    delete guestData.password;

    return res.status(200).json({
      status: true,
      message: "Guest updated successfully",
      data: guestData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete a guest
export const deleteGuest = async (req, res) => {
  try {
    const { guestId } = req.params;
    const guest = await Guest.findByPk(Number(guestId));

    if (!guest) {
      return res.status(404).json({
        status: false,
        message: "Guest not found",
        data: [],
      });
    }

    await guest.destroy();

    return res.status(200).json({
      status: true,
      message: "Guest deleted successfully",
      data: [],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};