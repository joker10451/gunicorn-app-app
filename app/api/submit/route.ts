import { NextRequest, NextResponse } from "next/server"

const LEADGID_URL = "https://api.leadgid.com/universal/v1/ru/applications"

function getToken() {
  return process.env.LEADGID_TOKEN || ""
}

function sanitize(s: unknown): string {
  return typeof s === "string" ? s.trim() : ""
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const firstName = sanitize(body.first_name)
    const lastName = sanitize(body.last_name)
    const phone = sanitize(body.phone)

    if (!firstName) {
      return NextResponse.json({ error: "Укажите имя" }, { status: 400 })
    }
    if (!lastName) {
      return NextResponse.json({ error: "Укажите фамилию" }, { status: 400 })
    }
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      return NextResponse.json({ error: "Укажите корректный телефон" }, { status: 400 })
    }
    if (!body.pers_data_consent) {
      return NextResponse.json({ error: "Необходимо согласие на обработку данных" }, { status: 400 })
    }

    const token = getToken()
    if (!token) {
      return NextResponse.json({ error: "Сервис не настроен (нет токена)" }, { status: 500 })
    }

    const payload = {
      first_name: firstName,
      last_name: lastName,
      patronymic: sanitize(body.patronymic) || undefined,
      phone,
      email: sanitize(body.email) || undefined,
      birth_date: sanitize(body.birth_date) || undefined,
      gender: sanitize(body.gender) || undefined,
      region: sanitize(body.region) || undefined,
      city: sanitize(body.city) || undefined,
      loan_city: sanitize(body.loan_city) || undefined,
      amount: body.amount ? Number(body.amount) : undefined,
      term: body.term ? Number(body.term) : undefined,
      purpose: sanitize(body.purpose) || undefined,
      pers_data_consent: true,
      subid1: sanitize(body.subid1) || undefined,
      subid2: sanitize(body.subid2) || undefined,
      subid3: sanitize(body.subid3) || undefined,
      subid4: sanitize(body.subid4) || undefined,
      subid5: sanitize(body.subid5) || undefined,
      subid6: sanitize(body.subid6) || undefined,
    }

    const res = await fetch(LEADGID_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ACCOUNT-TOKEN": token,
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.message || `LeadGid: статус ${res.status}` },
        { status: res.status >= 400 && res.status < 500 ? res.status : 502 }
      )
    }

    const uuid = data?.data?.id || data?.id || null

    return NextResponse.json({ ok: true, uuid, raw: data })
  } catch (err) {
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
