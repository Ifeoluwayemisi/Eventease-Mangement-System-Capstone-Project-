import Event from "../models/event.js";
import { Op } from 'sequelize';


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
      organizerId
    } = req.body;


    const image = req.file ? req.file.filename : null;

    const Newevent = await Event.create({
      title,
      eventType,
      clientName,
      description,
      date,
      time,
      location,
      guestLimit,
      image,
      organizerId
    });

    if (!Newevent) {
      return res.status(400).json({
        status: false,
        message: 'Could not create the event',
        data: [],
      });
    }

    res.status(201).json({ status: true, message: 'Event created', data: Newevent });


  } catch (error) {
    console.error("Event creation error");
    res.status(500).json({ status: false, message: 'Server error, try again.', error: error.message });
  }
};


//get event number
export const getNumberEvent = async (req, res) => {
  try{
    const count = await Event.count();
    res.json({ numberEvents: count});
  }
  catch (error)
  { 
    res.status(500).json({ error: error.message});
  }
};

//get upcoming event

export const getUpcomingEvent = async (req, res) => {
  try 
  {
    const Today = new Date()
    const count = await Event.count({
      where: {
        date: {
          [Op.gt]: Today
        }
      }
    });
    res.json({ upcomingEvents: count });
  } catch (error)
  { 
    res.status(500).json({ error: ' Error counting upcoming events'});
  }

};

 // Get all events with pagination
export const getAllEvent = async (req, res) => {
  try {
    // Parse pagination query parameters
    const page = parseInt(req.query.page) || 1; // default to page 1
    const limit = parseInt(req.query.limit) || 10; // default to 10 items per page
    const offset = (page - 1) * limit;

    // Get total count and paginated events
    const { count, rows } = await Event.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']], // optional: newest first
    });

    return res.status(200).json({
      status: true,
      message: "Events fetched successfully.",
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


// get a particular event
export const getEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findByPk(Number(id));
  if (!event) {
    return res.status(400).json({
      status: false,
      message: "Could not get the event. ",
      data: [],
    });
  }

  return res.status(200).json({
    status: true,
    message: "Event retrieved successfully. ",
    data: event,
  });
};

// Update an event
export const updateEvent = async (req, res) => {
  try {
    // Get the event ID from params
    const { id } = req.params;

    // Check if event exists
    const event = await Event.findByPk(Number(id));
    if (!event) {
      return res.status(404).json({
        status: false,
        message: "Event not found.",
        data: [],
      });
    }

    // Update the event with new data from req.body
    await event.update(req.body);

    // Return success response
    return res.status(200).json({
      status: true,
      message: "Event updated successfully.",
      data: event,
    });
  } catch (error) {
    // Catch any error that occurs and respond with 500
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
    // Get the event ID from URL params
    const { id } = req.params;

    // Look for the event
    const event = await Event.findByPk(Number(id));

    // If event not found, return 404
    if (!event) {
      return res.status(404).json({
        status: false,
        message: "Event not found.",
        data: [],
      });
    }

    // Delete the event
    await event.destroy();

    // Return success response
    return res.status(200).json({
      status: true,
      message: "Event deleted successfully.",
      data: [],
    });

  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({
      status: false,
      message: "Server error while deleting event.",
      error: error.message,
    });
  }
};