const express = require("express")
const protect = require("../middleware/authMiddleware")
const {
  getDashboardSummary,
  getJobsTimeline,
} = require("../controllers/dashboardController")

const router = express.Router()

router.get("/summary", protect, getDashboardSummary)
router.get("/timeline", protect, getJobsTimeline)

module.exports = router
