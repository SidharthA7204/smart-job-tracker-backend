const Job = require("../models/Job")

exports.getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user._id

    const totalJobs = await Job.countDocuments({ user: userId })

    const statusCounts = await Job.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ])

    const recentJobs = await Job.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("company position status createdAt")

    res.json({
      totalJobs,
      statusCounts,
      recentJobs,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
exports.getJobsTimeline = async (req, res) => {
  try {
    const userId = req.user._id

    const timeline = await Job.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ])

    res.json(timeline)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
