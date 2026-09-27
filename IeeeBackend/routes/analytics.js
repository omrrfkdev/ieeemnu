const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const PageView = require('../models/PageView');

router.post('/track', async (req, res) => {
  try {
    const { visitorId, page, device } = req.body;

    if (!visitorId || !page) {
      return res.status(400).json({ error: 'visitorId and page are required' });
    }

    let visitor = await Visitor.findOne({ visitorId });

    if (visitor) {
      visitor.totalVisits += 1;
      visitor.lastSeen = new Date();
      if (device) visitor.device = device;
      await visitor.save();
    } else {
      visitor = await Visitor.create({
        visitorId,
        device: device || 'Unknown',
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

router.get('/stats', async (req, res) => {
  try {
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

module.exports = router;
