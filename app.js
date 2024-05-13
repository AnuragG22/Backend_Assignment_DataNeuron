import dotenv from 'dotenv';
import express from 'express';
import { router } from './routes/userRoutes.js';
import pkg from 'body-parser';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
const bodyParser = pkg;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Retrieve port from environment variables
const port = process.env.PORT;

// Start the server
app.listen(port, async () => {
  console.log(`Server Listening at ${port}`);
});

// Load user routes
app.use("/api/user", router);
