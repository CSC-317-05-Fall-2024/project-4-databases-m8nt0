// Add your server code here.

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { backendRouter } from './routes/api.js';
import { getRestaurants, getRestaurant, getReviewsForRestaurant } from './data/restaurants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;  // Change to 3001 becuase on my end a different port was assigned with the default port.

// parse urls, ex. like images for the new resturant
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// deafult initialization to allow static files to appear on the client side.
app.use(express.static('public'));

// The EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// Routes the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for the attractions page
app.get('/attractions', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

// The ejs to render the page
app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants();
        console.log('Fetched restaurants:', restaurants);
        res.render('restaurants', { restaurants });
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/restaurants/:id', async (req, res) => {
    try {
        const restaurant = await getRestaurant(req.params.id);
        const reviews = await getReviewsForRestaurant(req.params.id); // Fetch reviews for the restaurant
        if (restaurant) {
            res.render('restaurant-details', { ...restaurant, reviews }); // Pass reviews to the template
        } else {
            res.status(404).send('Restaurant not found');
        }
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        res.status(500).send('Internal Server Error');
    }
});

// The ejs to render the apge
app.get('/new-restaurant', (req, res) => {
  res.render('new-restaurant-form');
});

app.use('/api', backendRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
