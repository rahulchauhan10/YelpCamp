const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected!")
});


const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // your user id
            author: '61014a32027da63284606fc3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime in earum unde beatae inventore reiciendis quia blanditiis! Nemo, reiciendis consectetur unde, minus quis omnis magni explicabo accusantium dolorum saepe quasi.',
            price,
            geometry: {
                type: "Point", 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/rahul-enterprize/image/upload/v1627715582/YelpCamp/lzplj6c5bxbyyoc2hh5s.jpg',
                  filename: 'YelpCamp/lzplj6c5bxbyyoc2hh5s'
                },
                {
                  url: 'https://res.cloudinary.com/rahul-enterprize/image/upload/v1627715583/YelpCamp/dex3coety246nsbj5t9m.jpg',
                  filename: 'YelpCamp/dex3coety246nsbj5t9m'
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close()
});

