import connectDb from "@/lib/db"
import Settings from "@/model/settings.model"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { message, ownerId } = await req.json()

    if (!message || !ownerId) {
      return NextResponse.json(
        { message: "Message and owner ID is required" },
        { status: 400 }
      )
    }

    await connectDb()

    const setting = await Settings.findOne({ ownerId })

    if (!setting) {
      return NextResponse.json(
        { message: "Chat Bot is not configured yet." },
        { status: 400 }
      )
    }

    const KNOWLEDGE = `
business name - ${setting.businessName || "not provided"}
support email - ${setting.supportEmail || "not provided"}
knowledge - ${setting.knowledge || "not provided"}
`

    const prompt = `
You are a premium, enterprise-grade AI assistant that represents THIS specific business.
You are not a general chatbot.
You are the official digital assistant of the business described below.

... (rest of the prompt same as before)
---------------------
BUSINESS INFORMATION
---------------------

${KNOWLEDGE}

---------------------
CUSTOMER QUESTIONS
---------------------

${message}

-------------- 
ANSWER
--------------
`

    // ===== OPENROUTER INTEGRATION =====
    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [
          { role: "user", content: prompt }
        ],
      }),
    })

    const data = await aiRes.json()

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response."

    const response = NextResponse.json({ reply }, { status: 200 })
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type")

    return response
  } catch (error) {
    console.error("CHAT API ERROR:", error)
    const response = NextResponse.json(
      { message: `chat error ${error}` },
      { status: 500 }
    )
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type")
    return response
  }
}

export const OPTIONS = async () => {
  return NextResponse.json(null, {
    status: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}