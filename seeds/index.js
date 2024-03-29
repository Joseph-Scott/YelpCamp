const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: '62d53a0ca171a50c0edd65da',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae veritatis natus qui eos, dolorum, harum, atque ullam exercitationem corrupti voluptates aut earum vero perspiciatis iste ipsum asperiores magni minus inventore?',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dtts7knhk/image/upload/v1659611672/YelpCamp/rkucmbpzsoczmnw2zjfq.jpg',
          filename: 'YelpCamp/rkucmbpzsoczmnw2zjfq'
        },
        {
          url: 'https://res.cloudinary.com/dtts7knhk/image/upload/v1659611674/YelpCamp/cs6crbozko1jmney3yny.jpg',
          filename: 'YelpCamp/cs6crbozko1jmney3yny'
        }
      ]
    });
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
});