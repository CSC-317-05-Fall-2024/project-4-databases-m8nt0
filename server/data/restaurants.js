import { pool } from '../config/database.js'; // allowing us to connect to the database

// aquiring all the restaurants from the database
const getRestaurants = async () => {
    const result = await pool.query('SELECT * FROM restaurants;');
    return result.rows; // Ensure this returns an array
};

// aquiring a specific restaurant from the database
const getRestaurant = async (id) => {
    const result = await pool.query('SELECT * FROM restaurants WHERE id = $1;', [id]);
    return result.rows[0]; // Return the first row (the restaurant)
};

// creating a new restaurant in the database
const createRestaurant = async (newRestaurant) => {
    const { name, phone, address, photo } = newRestaurant;
    const result = await pool.query(
        'INSERT INTO restaurants (name, phone, address, photo) VALUES ($1, $2, $3, $4) RETURNING *;',
        [name, phone, address, photo || '/images/default-restaurant.jpg']
    );
    return result.rows[0]; // Return the created restaurant
};

// deleting a restaurant
const deleteRestaurant = async (id) => {
    await pool.query('DELETE FROM restaurants WHERE id = $1;', [id]);
};

// a review for a specific restaurant
const getReviewsForRestaurant = async (id) => {
    const result = await pool.query('SELECT * FROM reviews WHERE restaurant_id = $1;', [id]);
    return result.rows; // returning the reviews for the specific restaurant
};

export { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant, getReviewsForRestaurant };
