import Event from "../models/event.js";
import { Op } from 'sequelize';


// Create a new event
export const createEvent = async (req, res) => {
  const { title, date, location, description, } = req.body;

  const Event = await Event.create({ title, date, location, description, organizerId});

  if (!Event) {
    return res.status(400).json({
      status: false,
      message: "Could not create an Event. Try again.",
      data: null,
    });
  }

  return res.status(201).json({
    status: true,
    message: "Event was created successfully. ",
    data: Event,
  });
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

  //get all Events
export const getAllEvent = async (req, res) => {
  const LIMIT = 10;
  const page = parseInt(req.query.page) || 1;
  const offset = (page - 1) * LIMIT;
  const Events = await Event.findAndCountAll({ limit: LIMIT, offset });
  // const Events = await Event.findAll();

  if (Events.count === 0) {
    return res.status(400).json({
      status: false,
      message: "Could not get the events.",
      data: [],
    });
  }

  return res.status(200).json({
    status: true,
    message: "Events retrieved successfully. ",
    data: {
      Events: Events.rows,
      total: Events.count,
      pages: Math.ceil(Events.count / LIMIT),
      page,
    },
  });
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

// update an event
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findByPk(Number(id));

  if (!event) {
    return res.status(400).json({
      status: false,
      message: "Could not get the event. ",
      data: [],
    });
  }

  await event.update(req.body);

  return res.status(200).json({
    status: true,
    message: "Event updated successfully. ",
    data: Event,
  });

 
};

// delete an event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findByPk(Number(id));
  await event.destroy();

  return res.status(200).json({
    status: true,
    message: "Event deleted successfully. ",
    data: [],
  });
};
