import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  File_Name: { type: String, required: true },
  Classification: { type: String, required: true },
  Fake: { type: String, required: true },
  Motion_Anomaly: { type: String, required: true },
  Time: { type: String, required: true },
}, { _id: false }); // Avoid creating automatic _id for subdocuments

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  result: { type: [resultSchema], default: [] }, // Now storing array of objects
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
