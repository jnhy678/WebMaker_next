import { NextRequest, NextResponse } from "next/server";
// import {db} from '@src/utils/schemas/user.schema'
// import { connectDB, getDB } from '@src/utils/connectDB'
import jwt from "jsonwebtoken";
// const db = getDB();
// const User = db.User;
export async function GET(req: NextRequest, res: NextResponse)  {
    try {
        const params = req.nextUrl.searchParams;
        console.log('get queryparams : ', params)
        const resUrl = 'http://localhost:3000/api/users/login?' + params.toString();
        console.log('resUrl' ,resUrl)
        const response = await fetch(resUrl);
        const result = await response.json();
        console.log('login result : ', result)
        const user = result[0];
        if (user) {
            const username = user['username'] || 'unknownName';
            const token = jwt.sign({ username }, 'kiryeo', { expiresIn: '3m' });
            return res = new NextResponse(
                JSON.stringify({
                    status: "success",
                    data: await user,
                    token: token,
                }),{
                    status:201,
                    headers: { "Content-Type": "application/json" },
                }
            )
        } else {
            return res = new NextResponse(
                JSON.stringify({
                    status: "failed",
                    message: 'Invalid credentials'
                }),{
                    status:401,
                    headers: { "Content-Type": "application/json" },
                }
            )
        }
    } catch (error) {
        console.error(error);
        res = NextResponse.json({ error: 'An error occurred.' })
    }
    // try {
    //     return res = await fetch('http://localhost:3000/api/users')
    //     .then((result) => {
    //         console.log(result.json());
    //         return new NextResponse(
    //             JSON.stringify({
    //                 status: "success",
    //                 // data: { user: { ...user, password: undefined } },
    //                 data: result,
    //             }),
    //             {
    //                 status: 201,
    //                 headers: { "Content-Type": "application/json" },
    //             }
    //         )
    //     })
    //     // res.json();
    // } catch (error) {
    //     console.error(error);
    // }
}

export async function POST(req: NextRequest , res: NextResponse)  {
    try {
        const url = req.nextUrl.clone();
        const reqs = await req.json();
        const dataBody: { [key: string]: any } = await reqs.body;
        const header = req.headers
        
        await console.log('body', await reqs, await header);
        for (const key of Object.keys(dataBody))  {
            const data = dataBody[key];
            if (!dataBody.id) {
                console.log('err',key + '가 없습니다')
                url.pathname = `/404`;
                return NextResponse.rewrite(url);
            }   
            if (!dataBody.username) {
                console.log('err',key + '가 없습니다')
                url.pathname = `/404`;
                return NextResponse.rewrite(url);
            }   
            if (!dataBody.password) {
                console.log('err',key + '가 없습니다')
                url.pathname = `/404`;
                return NextResponse.rewrite(url);
            }   
        }
        
        // User.create({dataBody})
        await fetch('localhost:3000/api/users',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer tokentemp' 
            }, 
            body: JSON.stringify(dataBody)
        })
        .then(async (data: any) => {
            console.log('됨' , data);
            return new NextResponse(
                JSON.stringify({
                    status: "success",
                    // data: { user: { ...user, password: undefined } },
                    data: data,
                }),
                {
                    status: 201,
                    headers: { "Content-Type": "application/json" },
                }
            );
        })
        .catch(async (error: any) => {
            console.log('error ㅠㅠ', error)
            if (error) {
              return console.log(400, "failed validations", error);
            }
        
            if (error.code === "P2002") {
              return console.log(409, "user with that email already exists");
            }
        
            return console.log(500, error.message);
        })
    } catch (error) {
        console.log('error', error);
    }
}
