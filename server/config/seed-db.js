/* initializing the data in the database */
import { pool } from './database.js';

async function dropTables() {
    await pool.query('DROP TABLE IF EXISTS reviews;');
    await pool.query('DROP TABLE IF EXISTS restaurants;');
}

//creating a table for the restaurants
async function createTables() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS restaurants (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            address VARCHAR(255),
            photo VARCHAR(255)
        );
    `);

    //creating a table for the reviews
    await pool.query(`
        CREATE TABLE IF NOT EXISTS reviews (
            id SERIAL PRIMARY KEY,
            rating INTEGER NOT NULL,
            content TEXT NOT NULL,
            restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE
        );
    `);
}

async function insertData() {
    const restaurants = [
        { name: 'Restaurant A', phone: '123-456-7890', address: '123 Main St', photo: 'url_to_photo' },
        { name: 'Restaurant B', phone: '987-654-3210', address: '456 Elm St', photo: 'url_to_photo' },
    ];

    for (const restaurant of restaurants) {
        await pool.query(`
            INSERT INTO restaurants (name, phone, address, photo)
            VALUES ($1, $2, $3, $4);
        `, [restaurant.name, restaurant.phone, restaurant.address, restaurant.photo]);
    }

    // inserting reviews into the database
    const reviews = [
        { rating: 5, content: 'Excellent food!', restaurant_id: 1 },
        { rating: 4, content: 'Great service!', restaurant_id: 1 },
        { rating: 3, content: 'Average experience.', restaurant_id: 2 },
        { rating: 5, content: 'Loved the ambiance!', restaurant_id: 2 },
    ];

    for (const review of reviews) {
        await pool.query(`
            INSERT INTO reviews (rating, content, restaurant_id)
            VALUES ($1, $2, $3);
        `, [review.rating, review.content, review.restaurant_id]);
    }
}

// setting up the database by calling the functions
async function setup() {
    await dropTables();
    await createTables();
    await insertData();
}

setup().catch(err => console.error(err));
// catch an error if there is one