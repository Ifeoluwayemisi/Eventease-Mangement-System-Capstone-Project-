// seed.js
import sequelize from './config/database.js';
import Guest from './models/guest.js';
import Event from './models/event.js';
import Checkin from './models/checkin.js';

async function seedDatabase() {
  try {
    await sequelize.sync({ force: true }); // Clears all existing data and recreates tables

    const guest1 = await Guest.create({
      name: 'Jane Doe',
      email: 'jane@example.com'
    });

    const guest2 = await Guest.create({
      name: 'John Smith',
      email: 'john@example.com'
    });

    const event1 = await Event.create({
      name: 'Dev Launch Event',
      location: 'Conference Hall A',
      date: new Date()
    });

    console.log('Guests and Event created');
    console.log({ guest1, guest2, event1 });

    process.exit(); // Exit after seeding
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();
