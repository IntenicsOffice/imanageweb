import { NextResponse } from "next/server";


export async function POST(req, { params }) {

    const data = await req.formData();
    const status = data.get("code");
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (status === "PAYMENT_SUCCESS") {
        return NextResponse.redirect(`${baseUrl}success`, { status: 302 });
    } else {
        return NextResponse.redirect(`${baseUrl}failure`, { status: 302 });

    }

}