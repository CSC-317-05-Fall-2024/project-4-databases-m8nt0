import express from 'express';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant, getReviewsForRestaurant } from '../data/restaurants.js';

//allowing us to create routes with express
const router = express.Router();

// getting all the restaurants from the database
router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants();
        console.log('Fetched restaurants:', restaurants);
        res.render('restaurants', { restaurants });
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).send('Internal Server Error');
    }
});

// getting a specific restaurant with reviews from the database
router.get('/restaurants/:id', async (req, res) => {
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

// creating a new restaurant in the database
router.post('/restaurants', async (req, res) => {
    const newRestaurant = await createRestaurant(req.body);
    res.status(201).json(newRestaurant);
});

// deleting a restaurant from the database
router.delete('/restaurants/:id', async (req, res) => {
    await deleteRestaurant(req.params.id);
    res.status(204).send(); // nothing to send back
});

export { router as backendRouter };