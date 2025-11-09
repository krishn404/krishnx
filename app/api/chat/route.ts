// app/api/chat/route.ts
import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const krishnaKantContext = `
Krishna Kant Maharshi is a software engineer and full-stack developer with a strong focus on engineering productivity, modern web development, and AI-powered tools. He blends technical precision with creative flair, also working as a freelance graphic designer and video editor.

Professional Profile:
- Full-stack developer experienced in building scalable and user-focused applications using React, Next.js, Node.js, and TypeScript
- Specialized in improving developer workflows, writing clean and maintainable code, and debugging complex systems
- Passionate about building internal tools, AI integrations, and automation to streamline productivity
- Creative thinker with hands-on skills in visual design, motion graphics, and content creation for brand storytelling

Technical Skills:
- Programming Languages: JavaScript, TypeScript, Python, Java, HTML5, CSS3
- Frameworks & Libraries: React.js, Next.js, Node.js, Express.js, Tailwind CSS
- Tools & Platforms: Git, GitHub, VS Code, Postman, Vercel, Firebase, Google Cloud Platform
- Creative Tools: Photoshop, Canva, CapCut, Adobe Premiere Pro, Sora (AI video)

Projects:
1. GitFriend – AI GitHub Assistant  
   [https://gitfriend.xyz]  
   Built with Next.js, TypeScript, Firebase, and OpenAI (Groq). Offers AI-powered troubleshooting, dynamic README generation, Gitmoji support, and cloud file system. Integrates GitHub via Octokit API.

2. FitWell – AI Fitness & Wellness Platform  
   [https://fit-well.vercel.app]  
   Delivers personalized fitness plans and wellness guidance using OpenAI. Built with React, Tailwind CSS, and conversational UX.

3. The BlackBombay House – Full Stack website for Music Production house based in Mumbai  
   [https://blackbombayhouse.com]  
   A real-time AI document editor using Gemini API. Supports smart editing, content generation, and export in PDF/DOCX formats.

4. Linkslide – LinkedIn Carousel Generator  
   [https://linkslide.vercel.app]  
   Users can design and export carousels for social sharing. Custom templates and export-ready visuals.

5. Retrova – Polaroid Photo Effect Tool  
   [https://retrova.vercel.app]  
   A fun photo editor that adds retro filters, frames, and typography overlays. Built with Next.js and TypeScript.

Experience:
- Codemod (Remote, California) — Codemod Trainee (Oct – Nov 2024)  
   Built automated code transformations for Slate.js; contributed to open source; documented refactoring patterns for large-scale JS migrations.

- Spanco Web Tech (Kota) — Front-End Developer (May – Jul 2024)  
   Developed scalable web UIs and implemented automated testing frameworks. Improved release quality and contributed to technical documentation and system issue triage.

Education:
- Bachelor of Computer Applications  
  Career Point University, Kota (2022 – Present)  
  Focused on software engineering, operating systems, DSA, DBMS, networks, and full-stack web development.

Certifications:
- GitHub Professional Certificate (GitHub, 2024)  
- Codemod Kickstart (Codemod, 2024)  
- React Essentials (LinkedIn, 2024)  
- Postman API Fundamentals (Postman, 2024)

Creative Work:
- Freelance graphic designer and video editor  
- Proficient in Adobe Premiere Pro, Photoshop, CapCut, Canva, and AI tools like Sora  
- Works on brand visuals, promo videos, social media content, and UI animation  
- Actively seeking freelance and part-time creative opportunities

Interests:
- Building AI-powered productivity tools
- Exploring creative tech crossovers in design and code
- Participating in hackathons and open-source projects
- Continuously learning new tools and workflows
`

// Initialize Gemini AI
let genAI: GoogleGenerativeAI | null = null

try {
  if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  }
} catch (error) {
  console.error("Failed to initialize Gemini AI:", error)
}

export async function POST(req: Request) {
  console.log("=== API Route Called ===")
  
  try {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured")
      return NextResponse.json(
        { error: "API key not configured. Please contact support." },
        { status: 500 }
      )
    }

    if (!genAI) {
      console.error("Gemini AI not initialized")
      return NextResponse.json(
        { error: "AI service not initialized. Please try again." },
        { status: 500 }
      )
    }

    // Parse request body
    let body
    try {
      body = await req.json()
      console.log("Parsed body:", body)
    } catch (jsonError) {
      console.error("JSON parse error:", jsonError)
      return NextResponse.json(
        { error: "Invalid request format. Please try again." },
        { status: 400 }
      )
    }

    // Extract and validate question
    const { question } = body

    console.log("Question received:", question)
    console.log("Question type:", typeof question)
    console.log("Question length:", question?.length)

    // Validation
    if (!question) {
      console.log("No question provided")
      return NextResponse.json(
        { error: "Please provide a question." },
        { status: 400 }
      )
    }

    if (typeof question !== "string") {
      console.log("Question is not a string")
      return NextResponse.json(
        { error: "Question must be a text string." },
        { status: 400 }
      )
    }

    const trimmedQuestion = question.trim()

    if (trimmedQuestion.length === 0) {
      console.log("Question is empty after trimming")
      return NextResponse.json(
        { error: "Please provide a valid question." },
        { status: 400 }
      )
    }

    if (trimmedQuestion.length < 2) {
      console.log("Question too short:", trimmedQuestion.length)
      return NextResponse.json(
        { error: "Question is too short. Please be more specific." },
        { status: 400 }
      )
    }

    console.log("Validation passed. Processing question:", trimmedQuestion)

    // Generate AI response
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

    const prompt = `You are "Krishnai", an AI assistant trained to answer questions strictly about Krishna Kant Maharshi, a software engineer and creative professional.

Use the following context to answer questions in a clear, helpful, and professional tone. If the user's question is not about Krishna Kant, reply with:
"I'm only trained to answer questions about Krishna Kant Maharshi."

Context:
${krishnaKantContext}

User's Question:
"${trimmedQuestion}"

Provide a helpful, concise answer based on the context above.`

    console.log("Calling Gemini API...")

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    console.log("Response generated successfully")
    console.log("Response length:", text.length)

    return NextResponse.json({ 
      answer: text,
      success: true 
    })

  } catch (error: any) {
    console.error("=== Error in API Route ===")
    console.error("Error name:", error?.name)
    console.error("Error message:", error?.message)
    console.error("Error stack:", error?.stack)
    
    // Handle specific Gemini API errors
    if (error?.message?.includes("API key")) {
      return NextResponse.json(
        { error: "API key error. Please contact support." },
        { status: 500 }
      )
    }

    if (error?.message?.includes("quota") || error?.message?.includes("rate limit")) {
      return NextResponse.json(
        { error: "Service is temporarily busy. Please try again in a moment." },
        { status: 429 }
      )
    }

    // Generic error
    return NextResponse.json(
      { 
        error: "Sorry, something went wrong. Please try again later.",
        details: process.env.NODE_ENV === "development" ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use POST." },
    { status: 405 }
  )
}
