import { NextRequest, NextResponse } from "next/server";
import {db} from '@src/utils/schemas/user.schema'
import { connectDB, getDB } from '@src/utils/connectDB'
import jwt from "jsonwebtoken";
// const db = getDB();
const User = db.User;
export async function GET(req: NextRequest)  {
    // const url = req.nextUrl.clone();
    // const dataBody = await req.json()
    // console.log('GET body', dataBody);
    console.log('get !!')
    const temp = await User.find();
    console.log(await temp)

    // const temp = User.find();
    //     return await NextResponse.json(temp);
    // if (dataBody) {
    //     const res = User.findById(dataBody.id)
    //     return await NextResponse.json(res);
    // } else {
    //     const res = User.find();
    //     return await NextResponse.json(res);
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
        
        User.create({dataBody})
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
