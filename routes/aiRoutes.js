
const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")
const { analyzeJobAndSave } = require("../controllers/aiController")

// ✅ THIS MUST BE A FUNCTION
router.post("/analyze-job/:jobId", protect, analyzeJobAndSave)

module.exports = router
