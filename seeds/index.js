const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            author: '61fc47f95c63d3cbd1f33652',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/10489597',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas reprehenderit aut eum porro dignissimos animi similique ea, inventore fugit, ipsa beatae, nam cum id nihil delectus nobis amet exercitationem repellat!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [-123.116838, 49.279862]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/za7e/image/upload/v1644348618/YelpCamp/bve4n5mj2bakfzbatcrb.jpg',
                    filename: 'YelpCamp/bve4n5mj2bakfzbatcrb'
                },
                {
                    url: 'https://res.cloudinary.com/za7e/image/upload/v1644348369/YelpCamp/pbck0tdw9m8wgdv8u0kp.jpg',
                    filename: 'YelpCamp/pbck0tdw9m8wgdv8u0kp'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})