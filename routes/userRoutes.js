import express from "express";

// Import the user controller
import UserController from "../controllers/userController.js";

// Create a router instance
const router = express.Router();

// Public Routes 

// Route to add a new user
router.post('/add', UserController.addUser);

// Route to update an existing user
router.post('/update', UserController.updateUser);

// Route to get details of all users
router.get('/all', UserController.userDetails);

// Route to get counts of users
router.get('/counts', UserController.getCounts);

// Export the router
export { router };
