const { ReturnDocument } = require('mongodb')
const Job = require('../models/Job')

// Create a new job applicatio
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      user: req.user._id,
      company: req.body.company,
      position: req.body.position,
      status: req.body.status,
      appliedDate: req.body.appliedDate,
      notes: req.body.notes,
    })

    res.status(201).json({ job })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get all job applications for the authenticated user
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id })
      .sort({ createdAt: -1 })

    res.status(200).json({ jobs })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
// Update a job application
exports.updateJob = async (req, res) => {
  try{
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body, 
      { new: true }
    )
    if(!job){
      return res.status(404).json({ message: 'Job not found' })
    }
    return res.status(200).json({ job})
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete a job application
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete(
      { _id: req.params.id, user: req.user._id }
    )
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    } 
    return res.status(200).json({ message: 'Job deleted successfully' })

  }
  catch (error) {
    res.status(500).json({ message: error.message })
  } 
}
// Get job statistics
// Get job statistics for dashboard
exports.getJobStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ])

    res.status(200).json({ stats })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
