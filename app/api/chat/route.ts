// app/api/chat/route.ts
import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

const krishnaKantContext = `
Krishna Kant Maharshi is a front-end developer passionate about creating responsive and user-friendly web applications using modern JavaScript frameworks.

Professional Profile:
- Front-end developer with hands-on experience in React, Next.js, and Tailwind CSS
- Skilled in building web applications with a strong focus on UI/UX and performance
- Experience in contributing to both academic and production-grade projects
- Constant learner, with a keen interest in AI and modern web technologies

Technical Skills:
- Programming Languages: JavaScript, HTML5, CSS3
- Frontend Development: React.js, Next.js, Tailwind CSS, Bootstrap
- Backend Basics: Node.js, Express.js
- Tools & Platforms: VS Code, Git, GitHub, NPM, Postman, Vercel, Chrome DevTools

Projects:
1. Genxie (https://genxie.vercel.app)
   - Document generator powered by AI (Gemini API)
   - Allows users to generate, edit, and export documents in PDF/DOCX formats
   - Built with React and Tailwind CSS

2. GitFriend (https://gitfriend.xyz)
   - AI-powered Git and GitHub helper with dynamic README generation
   - Helps developers understand and manage Git repositories
   - Uses Octokit and Groq API for data fetching and AI support

3. Linkslide (https://linkslide.vercel.app)
   - LinkedIn carousel generator with customizable templates
   - Users can edit slides and export as PDFs
   - Built using React and Tailwind CSS

4. Retrova (https://retrova.vercel.app)
   - Polaroid effect generator for digital photos
   - Users can add filters, Polaroid-style frames, and custom text
   - Built with Next.js, React, TypeScript, and Tailwind CSS

Experience:
- Front-End Developer at Spanco Web Tech (May – July 2024)
   - Built responsive WordPress theme pages
   - Collaborated with cross-functional teams to implement features and optimize performance

- Codemod Trainee at Codemod (Oct – Nov 2024)
   - Worked with Slate and ast-grep for code refactoring
   - Gained experience in large-scale automated code transformations

Education:
- Bachelor of Computer Applications, Career Point University, Kota (2022 – Present)
   - Studied subjects like OS, Data Structures, DBMS, OOP, Networks, and Web Development
   - Applied academic concepts through real-world projects

Certifications:
- React Essentials (LinkedIn, 2024)
- Codemod Kickstart (Codemod, 2024)
- Postman API Fundamentals (Postman, 2024)
- GitHub Professional Certificate (GitHub, 2024)

Personal Interests:
- Enjoys designing clean, interactive interfaces
- Interested in open-source contributions and AI applications in web dev
- Passionate about continuous learning and side projects
- Also participates in hackathons
`;

export async function POST(req: Request) {
  try {
    const { question } = await req.json()

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Invalid request: question is required" }, { status: 400 })
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

    const prompt = `
You are an expert assistant. Answer the user's question strictly based on the following context about Krishna Kant. If the question is unrelated to Krishna Kant, politely respond that you're only trained to answer questions about him.

Context:
${krishnaKantContext}

User Question:
${question}
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ answer: text })
  } catch (error) {
    console.error("Error processing chat request:", error)
    return NextResponse.json({ error: "Failed to generate a response" }, { status: 500 })
  }
}
