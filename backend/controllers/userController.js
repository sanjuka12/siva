
import User from "../models/user.js"; // Assuming User model

export const getUsersCount = async (req, res) => {
    try {
        const count = await User.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Error fetching user count:', error);
        res.status(500).json({ message: 'Error fetching user count' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
      }
    };

    export const getUserDetailsByEmail = async (req, res) => {
      const { email } = req.params;
  
      try {
          const user = await User.findOne({ email }, 'firstName lastName gender dateOfBirth status');
          
          if (!user) {
              return res.status(404).json({ message: 'User not found' });
          }
  
          res.json({
              firstName: user.firstName,
              lastName: user.lastName,
              gender: user.gender,
              dateOfBirth: user.dateOfBirth,
              status: user.status
          });
      } catch (error) {
          console.error('Error fetching user details:', error);
          res.status(500).json({ message: 'Internal server error' });
      }
  };


  //new health profile updates in mobile app

  export const getUserByEmail = async (req, res) => {
    try {
      const email = req.params.email; // Get the email from the request params
      const user = await User.findOne({ email: email }); // Fetch user from the database by email
    
      if (!user) {
        return res.status(404).json({ message: 'User not found' }); // Return 404 if user not found
      }
    
      // Respond with the user data, default values if fields are empty
      res.status(200).json({
        bloodGroup: user.bloodGroup || '--',
        weight: user.weight || '--',
        heartRate: user.heartRate || '--',
      });
    } catch (error) {
      // Handle any errors
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  //new for healthpage in reportpage mobile app
  
// Function to update user data by ID
export const updateUserData = async (req, res) => {
    const userEmail = req.params.email; // Get user email from URL parameters
    const { bloodGroup, weight, heartRate } = req.body; // Get data from request body
  
    try {
      const user = await User.findOneAndUpdate(
        { email: userEmail }, // Find user by email
        { bloodGroup, weight, heartRate },
        { new: true, runValidators: true } // Return the updated document
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user); // Send back the updated user data
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };


//new function to update in profile page


export const updateUserDetails = async (req, res) => {
  const { email } = req.params;
  const { gender, dateOfBirth } = req.body; 

  try {
    
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        gender,
        dateOfBirth: new Date(dateOfBirth), 
      },
      { new: true } 
    );

   
    if (updatedUser) {
      return res.status(200).json({
        message: 'User details updated successfully',
        user: updatedUser,
      });
    } else {
      
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    
    console.error("Update User Error:", error); 
    return res.status(500).json({ 
      message: 'Failed to update user details', 
      error: error.message 
    });
  }
};


  
  
