// Next severless Function
import { NextRequest, NextResponse } from 'next/server';
import redisClient from '@utils/connectRedis';

  export async function GET(req: NextRequest)  {
      const datas = await req.json();
      const data = await redisClient.get(datas.key as string);
      return await NextResponse.json(data);
  }

  export async function POST(req: NextRequest)  {
      const datas = await req.json();
      await redisClient.del([datas.key]);
      const data = await redisClient.set(datas.key as string, datas.value, { 'EX': 18000 });
      return await NextResponse.json(data);
  }