import Guest from "../models/guest.js";
import Event from "../models/event.js";

// Create a guest
export const createGuest = async (req, res) => {
  try {
    const { name, email, phoneNumber, guestType, eventId } = req.body;

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ status: false, message: 'Event not found' });
    }

    const guest = await Guest.create({ name, email, phoneNumber, guestType, eventId });

    res.status(201).json({ status: true, message: 'Guest created', data: guest });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Get paginated guests for a specific event
export const getGuestsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ status: false, message: 'Event not found' });
    }

    const { count, rows: guests } = await Guest.findAndCountAll({
      where: { eventId },
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({
      status: true,
      message: `Guests from event ${eventId}`,
      data: guests,
      pagination: {
        totalGuests: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Get a single guest
export const getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findByPk(req.params.guestId);

    if (!guest) {
      return res.status(404).json({ status: false, message: "Guest not found" });
    }

    res.status(200).json({ status: true, data: guest });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Update a guest
export const updateGuest = async (req, res) => {
  try {
    const guest = await Guest.findByPk(req.params.guestId);
    if (!guest) {
      return res.status(404).json({ status: false, message: "Guest not found" });
    }

    await guest.update(req.body);

    res.status(200).json({ status: true, message: "Guest updated", data: guest });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

// Delete a guest
export const deleteGuest = async (req, res) => {
  try {
    const guest = await Guest.findByPk(req.params.guestId);
    if (!guest) {
      return res.status(404).json({ status: false, message: "Guest not found" });
    }

    await guest.destroy();

    res.status(200).json({ status: true, message: "Guest deleted" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
