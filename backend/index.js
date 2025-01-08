import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const dbURI = 'mongodb://localhost:27017/genuine_vision'; // Added database name

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Add MongoDB connection error handling
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

const userSchema = new mongoose.Schema({
    username: { 
      type: String, 
      required: true,
      unique: true 
    },
    fullname: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true,
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
});

const User = mongoose.model('User', userSchema);

// Signup
app.post('/api/signup', async (req, res) => {
  try {
    console.log('Received signup request:', req.body);
    
    const { username, fullname, email, password } = req.body;

    // Validate required fields
    if (!username || !fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if username exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      console.log('Username already exists:', username);
      return res.status(400).json({ 
        success: false, 
        message: 'Username already taken' 
      });
    }

    // Check if email exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      console.log('Email already exists:', email);
      return res.status(400).json({ 
        success: false, 
        message: 'Email already in use' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      fullname,
      email,
      password: hashedPassword
    });

    // Save user
    try {
      await newUser.save();
      console.log('User saved successfully:', username);
      
      res.status(201).json({
        success: true,
        message: 'User registered successfully'
      });
    } catch (saveError) {
      console.error('Error saving user:', saveError);
      res.status(500).json({
        success: false,
        message: 'Error saving user to database'
      });
    }

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error.message
    });
  }
});

//lOGIN CODE
app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find user by username
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // Compare password
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (!isValidPassword) {
        return res.status(400).json({
          success: false,
          message: 'Invalid credentials'
        });
      }
  
      // Return user data (excluding password)
      res.json({
        success: true,
        user: {
          username: user.username,
          fullname: user.fullname,
          email: user.email
        }
      });
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({
        success: false,
        message: 'Error during login'
      });
    }
  });

  // Update Email
app.put('/api/update-email', async (req, res) => {
  try {
    const { username, newEmail } = req.body;

    // Check if email already exists
    const existingEmail = await User.findOne({ email: newEmail });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: 'Email already taken'
      });
    }

    // Find and update user
    const updatedUser = await User.findOneAndUpdate(
      { username }, 
      { email: newEmail },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Email updated successfully',
      user: {
        username: updatedUser.username,
        email: updatedUser.email,
        fullname: updatedUser.fullname
      }
    });

  } catch (error) {
    console.error('Update email error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating email'
    });
  }
});

// Update fullname route
app.put('/api/update-fullname', async (req, res) => {
  try {
    const { username, newFullname } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { username }, 
      { fullname: newFullname },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Full name updated successfully',
      user: {
        username: updatedUser.username,
        fullname: updatedUser.fullname,
        email: updatedUser.email
      }
    });

  } catch (error) {
    console.error('Update fullname error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating full name'
    });
  }
});

// Update username route
app.put('/api/update-username', async (req, res) => {
  try {
    const { currentUsername, newUsername } = req.body;

    // Validate inputs
    if (!currentUsername || !newUsername) {
      return res.status(400).json({
        success: false,
        message: 'Both current and new username are required'
      });
    }

    // Check if new username already exists
    const existingUsername = await User.findOne({ username: newUsername });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: 'Username already taken'
      });
    }

    // Find and update user
    const updatedUser = await User.findOneAndUpdate(
      { username: currentUsername },
      { username: newUsername },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      message: 'Username updated successfully',
      user: {
        username: updatedUser.username,
        fullname: updatedUser.fullname,
        email: updatedUser.email
      }
    });

  } catch (error) {
    console.error('Update username error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating username'
    });
  }
});

// Update password route
app.put('/api/update-password', async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;

    // Find user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { password: hashedPassword },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating password'
    });
  }
});

// Get current user info route
app.get('/api/user/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne(
      { username },
      { password: 0 } // Exclude password from the response
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        username: user.username,
        fullname: user.fullname,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Fetch user info error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user information'
    });
  }
});

// Basic route to test API
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

app.listen(port, () => {
    console.log('Server running on port ' + port);
});