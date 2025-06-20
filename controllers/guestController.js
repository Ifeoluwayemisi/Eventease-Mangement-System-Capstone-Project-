import Guest from '../models/guest.js';
// import Event from '../models/event.js';

export const getGuestsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const guests = await Guest.findAll({ where: { eventId } });

    res.status(200).json(guests);
  } catch (err) {
    console.error('Error fetching guests by event:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
