import pkg from 'pg'; // importing the pg module
const { Pool } = pkg; // Destructure to get the Pool class
import dotenv from 'dotenv';

dotenv.config(); // loading the environment variables

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING, // using the CONNECTION_STRING from the .env file
});

export { pool }; // exporting the pool
