exports.analyzeJobAndSave = async (req, res) => {
  try {
    const { jobId } = req.params

    const Job = require("../models/job")
    const OpenAI = require("openai")

    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(404).json({ message: "Job not found" })
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Respond ONLY in JSON." },
        {
          role: "user",
          content: `
Analyze this job:
Position: ${job.position}
Company: ${job.company}

Return:
{
 "matchPercentage": number,
 "suggestions": string[]
}
          `,
        },
      ],
    })

    const clean = response.choices[0].message.content
      .replace(/```json|```/g, "")
      .trim()

    const parsed = JSON.parse(clean)

    job.aiScore = parsed.matchPercentage
    job.aiSuggestions = parsed.suggestions
    await job.save()

    res.json(job)
  } catch (error) {
    console.error("AI ERROR:", error)
    res.status(500).json({ message: "AI job analysis failed" })
  }
}
