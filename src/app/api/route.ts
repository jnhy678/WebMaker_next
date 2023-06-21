import { NextRequest, NextResponse } from "next/server";
// import { bodyParser } from '@tinyhttp/body-parser';

// export const middleware = [
//   bodyParser(), // Add the bodyParser middleware to parse the request body
// ];


export async function POST(req: NextRequest)  {
        console.log('post',req);
    return await NextResponse.json(req.body);
}

// export async function POST(req: NextRequest, res: NextResponse)  {
//     console.log('post',req.body);
// }