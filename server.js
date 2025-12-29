const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDb = require("./config/db")

// Routes
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const jobRoutes = require("./routes/jobRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")
const aiRoutes = require("./routes/aiRoutes")

// Load env
dotenv.config()
console.log("OPENAI KEY LOADED:", !!process.env.OPENAI_API_KEY)

// Connect DB
connectDb()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/jobs", jobRoutes)
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/ai", aiRoutes)

// Health check
app.get("/", (req, res) => {
  res.send("Smart Job Tracker API running")
})

// Start server
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
