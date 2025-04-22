import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Signup
export const signup = async (req, res) => {
  try {
    const { username, fullname, email, password } = req.body;

    if (!username || !fullname || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ success: false, message: 'Username already taken' });

    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ success: false, message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, fullname, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Signup error', error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ success: false, message: 'Invalid credentials' });

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
    res.status(500).json({ success: false, message: 'Error during login' });
  }
};

// Update Email
export const updateEmail = async (req, res) => {
  try {
    const { username, newEmail } = req.body;

    const existingEmail = await User.findOne({ email: newEmail });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: 'Email already taken' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { email: newEmail },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      message: 'Email updated successfully',
      user: {
        username: updatedUser.username,
        fullname: updatedUser.fullname,
        email: updatedUser.email
      }
    });
  } catch (error) {
    console.error('Update email error:', error);
    res.status(500).json({ success: false, message: 'Error updating email' });
  }
};

// Update Fullname
export const updateFullname = async (req, res) => {
  try {
    const { username, newFullname } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { fullname: newFullname },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
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
    res.status(500).json({ success: false, message: 'Error updating full name' });
  }
};

// Update Username
export const updateUsername = async (req, res) => {
  try {
    const { currentUsername, newUsername } = req.body;

    if (!currentUsername || !newUsername) {
      return res.status(400).json({
        success: false,
        message: 'Both current and new username are required'
      });
    }

    const existingUsername = await User.findOne({ username: newUsername });
    if (existingUsername) {
      return res.status(400).json({ success: false, message: 'Username already taken' });
    }

    const updatedUser = await User.findOneAndUpdate(
      { username: currentUsername },
      { username: newUsername },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
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
    res.status(500).json({ success: false, message: 'Error updating username' });
  }
};

// Update Password
export const updatePassword = async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate({ username }, { password: hashedPassword });

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({ success: false, message: 'Error updating password' });
  }
};

// Get User Info
export const getUserInfo = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }, { password: 0 });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
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
    res.status(500).json({ success: false, message: 'Error fetching user information' });
  }
};