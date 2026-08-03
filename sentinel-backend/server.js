const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Local or Atlas)
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai_sentinel';
mongoose.connect(mongoURI)
  .then(() => console.log('🛡️ Sentinel DB Connected Successfully'))
  .catch(err => console.error('DB Connection Error:', err));

// Define Database Schema for AI Threat Logs
const ThreatLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  payloadSample: String,
  matchedVectors: [String],
  anomalyWeight: Number,
  verdict: String,
  latencyMs: Number,
  lockdownTriggered: Boolean
});

const ThreatLog = mongoose.model('ThreatLog', ThreatLogSchema);

// API Endpoint to save a new threat log
app.post('/api/logs', async (req, res) => {
  try {
    const newLog = new ThreatLog(req.body);
    await newLog.save();
    res.status(201).json({ success: true, logId: newLog._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to write to database' });
  }
});

// API Endpoint to fetch historical logs for your Dashboard
app.get('/api/logs', async (req, res) => {
  try {
    const logs = await ThreatLog.find().sort({ timestamp: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Sentinel Security Server active on port ${PORT}`));
