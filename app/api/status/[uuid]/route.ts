import { NextRequest, NextResponse } from "next/server"

const LEADGID_TOKEN = process.env.LEADGID_TOKEN || ""

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await params

  if (!uuid || uuid.length < 5) {
    return NextResponse.json({ error: "Некорректный UUID" }, { status: 400 })
  }

  if (!LEADGID_TOKEN) {
    return NextResponse.json({ error: "Токен не настроен" }, { status: 500 })
  }

  const headers = { "X-ACCOUNT-TOKEN": LEADGID_TOKEN }

  let res = await fetch(
    `https://api.leadgid.com/universal/v1/ru/applications/${uuid}`,
    { headers }
  )

  if (res.status === 404) {
    res = await fetch(
      `https://api.leadgid.com/universal/v1/ru/test-applications/status/${uuid}`,
      { headers }
    )
  }

  if (!res.ok) {
    return NextResponse.json(
      { error: `LeadGid: статус ${res.status}`, status: res.status },
      { status: 502 }
    )
  }

  const data = await res.json()
  return NextResponse.json({ ok: true, data })
}
