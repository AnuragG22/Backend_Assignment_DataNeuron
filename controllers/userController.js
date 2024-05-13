import { Users, Counts } from "../config/connectdb.js";

// Controller handling user-related operations
class UserController {
  // Function to add a new user
  static addUser = async (req, res) => {
    try {
      // Check if user count exists
      const counts = await Counts.findOne({ where: { id: 1 } });
      if (counts) {
        const exist = counts.dataValues;
        exist.AddCount += 1;
        // Update user count
        await Counts.update(exist, { where: { id: 1 } });
      } else {
        // If user count doesn't exist, create a new count record
        const count = {
          AddCount: 1,
          updateCount: 0,
        };
        await Counts.create(count);
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      res.send({
        status: "failed",
        message: "Unable to increment!!",
        error: error,
      });
    }

    // Extract user data from request body
    const { Fname, Lname, Email, Password } = req.body;
    // Check if all required fields are provided
    if (!(Fname && Lname && Email && Password)) {
      res.send({ status: "Failed", Message: "All fields are required!!" });
    }
    try {
      // Check if user already exists
      const exist = await Users.findOne({ where: { Email: Email } });
      if (exist) {
        res.send({ status: "Failed", Message: "User Already Exist!!" });
      } else {
        // Create a new user
        const newUser = {
          Fname: Fname,
          Lname: Lname,
          Email: Email,
          Password: Password,
        };
        await Users.create(newUser);
        // Retrieve the newly created user
        const user = await Users.findOne({ where: { Email: Email } });
        res.send({
          status: "Success",
          Message: "User successfully added!!",
          user: user,
        });
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      res.send({ status: "failed", message: "Unable to Add!!", error: error });
    }
  };

  // Function to update an existing user
  static updateUser = async (req, res) => {
    try {
      // Increment update count
      const counts = await Counts.findOne({ where: { id: 1 } });
      if (counts) {
        const exist = counts.dataValues;
        exist.UpdateCount += 1;
        // Update user count
        await Counts.update(exist, { where: { id: 1 } });
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      res.send({ status: "failed", message: "Unable to Increment!!", error: error });
    }
    
    // Extract user data from request body
    const { Email, Fname, Lname, Password } = req.body;
    // Check if all required fields are provided
    if (!(Email && Fname && Lname && Password)) {
      res.send({ status: "Failed", Message: "All fields are required!!" });
    }
    try {
      // Find the user to update
      const user = await Users.findOne({ where: { Email: Email } });
      if (!user) {
        // If user not found, send error response
        res.send({ status: "Failed", Message: "User not found!!" });
      } else {
        // Update user data
        await Users.update(
          {
            Fname: Fname,
            Lname: Lname,
            Password: Password,
          },
          {
            where: { Email: Email },
          }
        );

        // Retrieve the updated user
        const updatedUser = await Users.findOne({ where: { Email: Email } });
        res.send({
          status: "Success",
          Message: "User successfully updated!!",
          user: updatedUser,
        });
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      res.send({
        status: "failed",
        message: "Unable to update user!!",
        error: error,
      });
    }
  };

  // Function to get all user details
  static userDetails = async (req, res) => {
    try {
      // Retrieve all users
      const allUsers = await Users.findAll();
      res.send({ status: "success", users: allUsers });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.send({ status: "failed", message: "Not Found!!", error: error });
    }
  };

  // Function to get counts of users
  static getCounts = async (req, res) => {
    try {
      // Retrieve counts of users
      const allCount = await Counts.findAll();
      res.send({ status: "success", allCount: allCount });
    } catch (error) {
      // Handle errors
      console.error(error);
      res.send({ status: "failed", message: "Not Found!!", error: error });
    }
  };
}

// Export UserController class
export default UserController;
