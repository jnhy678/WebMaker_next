import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import UserScgema from '@src/utils/schemas/user'

const secret = 'your_secret_key';

export async function GET(req: any, res: NextResponse) {
  try {
    // JWT 토큰을 요청 헤더에서 추출
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return await NextResponse.json({ message: '인증되지 않은 요청입니다.' });
    }

    // JWT 토큰을 검증하고 해독
    const decoded = jwt.verify(token, secret) as { user: { id: string; username: string } };

    // 보호된 데이터를 생성하거나 가져오는 로직
    const protectedData = {
      message: '보호된 데이터입니다.',
      user: decoded.user,
    };
    return await NextResponse.json(protectedData);
  } catch (error) {
    console.error(error);
    return await NextResponse.json({ message: '오류가 발생했습니다.' });
  }
};
