// seed.js
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import Guest from './models/guest.js';
import Event from './models/event.js';
import Checkin from './models/checkin.js';

dotenv.config();

const seedData = async () => {
  try {
    await sequelize.sync({ force: true }); // ⚠️ force: true will drop all tables

    const guests = await Guest.bulkCreate([
      { name: 'Ada Lovelace', email: 'ada@tech.com' },
      { name: 'Alan Turing', email: 'alan@code.com' },
      { name: 'Grace Hopper', email: 'grace@navy.mil' },
      { name: 'Linus Torvalds', email: 'linus@linux.org' },
    ]);

    const events = await Event.bulkCreate([
      {
        title: 'AI Developers Conference',
        location: 'Lagos',
        date: new Date(Date.now() + 86400000),
      },
      {
        title: 'Cybersecurity Bootcamp',
        location: 'Abuja',
        date: new Date(Date.now() + 2 * 86400000),
      },
      {
        title: 'Open Source Summit',
        location: 'Port Harcourt',
        date: new Date(Date.now() + 3 * 86400000),
      },
    ]);

    console.log('\n Guests created:');
    guests.forEach((g) => console.log(`ID: ${g.id}, Name: ${g.name}`));

    console.log('\nEvents created:');
    events.forEach((e) => console.log(`ID: ${e.id}, Title: ${e.title}`));

    process.exit();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
