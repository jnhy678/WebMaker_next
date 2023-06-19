import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest)  {
    
    return await NextResponse.json({
            title: "Hello World",
            'good' : true
        });
}

export async function POST(req: NextRequest, res: NextResponse)  {

}