const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const parseDevice = require('./utils/parseDevice');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

let cachedConnection = null;

async function connectDB() {
  if (cachedConnection) return cachedConnection;
  cachedConnection = await mongoose.connect(process.env.MONGO_URI);
  return cachedConnection;
}

app.get('/', (req, res) => {
  res.json({ message: 'Hello World! Your analytics backend is running! 🚀' });
});

app.post('/api/analytics/track', async (req, res) => {
  try {
    await connectDB();
    const Visitor = require('./models/Visitor');
    const PageView = require('./models/PageView');

    const { visitorId, page, device } = req.body;

    if (!visitorId || !page) {
      return res.status(400).json({ error: 'visitorId and page are required' });
    }

    const readableDevice = parseDevice(device);

    let visitor = await Visitor.findOne({ visitorId });

    if (visitor) {
      visitor.totalVisits += 1;
      visitor.lastSeen = new Date();
      visitor.device = readableDevice;
      await visitor.save();
    } else {
      visitor = await Visitor.create({
        visitorId,
        device: readableDevice,
      });
    }

    await PageView.create({
      visitorId,
      page,
    });

    res.json({ success: true, message: 'Visit tracked!' });
  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/api/analytics/stats', async (req, res) => {
  try {
    await connectDB();
    const Visitor = require('./models/Visitor');
    const PageView = require('./models/PageView');

    const totalVisitors = await Visitor.countDocuments();
    const totalPageViews = await PageView.countDocuments();

    const topPages = await PageView.aggregate([
      { $group: { _id: '$page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const recentVisitors = await Visitor.find()
      .sort({ lastSeen: -1 })
      .limit(10);

    const visitorsByDevice = await Visitor.aggregate([
      { $group: { _id: '$device', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const dailyVisits = await PageView.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $limit: 30 },
    ]);

    res.json({
      totalVisitors,
      totalPageViews,
      topPages,
      recentVisitors,
      visitorsByDevice,
      dailyVisits,
    });
  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.delete('/api/analytics/clear', async (req, res) => {
  try {
    await connectDB();
    const Visitor = require('./models/Visitor');
    const PageView = require('./models/PageView');

    await Visitor.deleteMany({});
    await PageView.deleteMany({});

    res.json({ success: true, message: 'All analytics data cleared!' });
  } catch (error) {
    console.error('Clear error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
