import mongoose from 'mongoose';

const healthLogSchema = new mongoose.Schema({
  customerEmail: { type: String, required: true, lowercase: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  weight: { type: Number, required: true },
  height: { type: Number, default: 165 },
  bmi: { type: Number, required: true },
  steps: { type: Number, default: 0 },
  water: { type: Number, default: 0 }, // Liters
  createdAt: { type: Date, default: Date.now }
});

const HealthLog = mongoose.model('HealthLog', healthLogSchema);
export default HealthLog;
