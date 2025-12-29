const express = require("express")
const protect = require("../middleware/authMiddleware")
const {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  getJobStats,
} = require("../controllers/jobController")

const router = express.Router()

// ⚠️ static routes FIRST
router.get("/stats", protect, getJobStats)

// then general routes
router.post("/", protect, createJob)
router.get("/", protect, getJobs)
router.put("/:id", protect, updateJob)
router.delete("/:id", protect, deleteJob)

module.exports = router 