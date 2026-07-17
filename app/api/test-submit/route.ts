import { NextRequest, NextResponse } from "next/server"

const LEADGID_URL = "https://api.leadgid.com/universal/v1/ru/test-applications"
const LEADGID_TOKEN = process.env.LEADGID_TOKEN || ""

export async function POST(req: NextRequest) {
  if (!LEADGID_TOKEN) {
    return NextResponse.json({ error: "Токен не настроен" }, { status: 500 })
  }

  const body = await req.json()

  const res = await fetch(LEADGID_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-ACCOUNT-TOKEN": LEADGID_TOKEN,
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return NextResponse.json(data, { status: res.status })
}
