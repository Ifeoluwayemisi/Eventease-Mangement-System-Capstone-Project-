import Event from "../models/event.js";
import { Op } from "sequelize";

// Create a new event
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      eventType,
      clientName,
      description,
      date,
      time,
      location,
      guestLimit,
      organizerId,
    } = req.body;

    const image = req.file ? req.file.filename : null;

    const newEvent = await Event.create({
      title,
      eventType,
      clientName,
      description,
      date,
      time,
      location,
      guestLimit,
      image,
      organizerId,
    });

    if (!newEvent) {
      return res.status(400).json({
        status: false,
        message: "Could not create the event",
        data: [],
      });
    }

    return res.status(201).json({
      status: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error("Event creation error:", error);
    return res.status(500).json({
      status: false,
      message: "Server error, try again.",
      error: error.message,
    });
  }
  console.log('Request body:', req.body);

};

// Get total number of events
export const getNumberEvent = async (req, res) => {
  try {
    const count = await Event.count();
    return res.status(200).json({ numberEvents: count });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get number of upcoming events
export const getUpcomingEvent = async (req, res) => {
  try {
    const today = new Date();
    const count = await Event.count({
      where: {
        date: {
          [Op.gt]: today,
        },
      },
    });
    return res.status(200).json({ upcomingEvents: count });
  } catch (error) {
    return res.status(500).json({
      error: "Error counting upcoming events",
    });
  }
};

// Get all events with pagination
export const getAllEvent = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Event.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      status: true,
      message: "Events fetched successfully",
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalEvents: count,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error while fetching events.",
      error: error.message,
    });
  }
};

// Get a single event by ID
export const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(Number(id));
    if (!event) {
      return res.status(404).json({
        status: false,
        message: "Event not found.",
        data: [],
      });
    }

    return res.status(200).json({
      status: true,
      message: "Event retrieved successfully.",
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error while retrieving event.",
      error: error.message,
    });
  }
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(Number(id));

    if (!event) {
      return res.status(404).json({
        status: false,
        message: "Event not found.",
        data: [],
      });
    }

    await event.update(req.body);

    return res.status(200).json({
      status: true,
      message: "Event updated successfully.",
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error while updating event.",
      error: error.message,
    });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(Number(id));

    if (!event) {
      return res.status(404).json({
        status: false,
        message: "Event not found.",
        data: [],
      });
    }

    await event.destroy();

    return res.status(200).json({
      status: true,
      message: "Event deleted successfully.",
      data: [],
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Server error while deleting event.",
      error: error.message,
    });
  }
};
