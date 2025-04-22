import express from 'express';
import {
  signup,
  login,
  updateEmail,
  updateFullname,
  updateUsername,
  updatePassword,
  getUserInfo
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/update-email', updateEmail);
router.put('/update-fullname', updateFullname);
router.put('/update-username', updateUsername);
router.put('/update-password', updatePassword);
router.get('/user/:username', getUserInfo);

export default router;
