import { NextResponse } from "next/server";

export const POST = () => {
    console.log('hello from the server');

    return NextResponse.json({ success: true })

}