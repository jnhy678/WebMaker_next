import { GetServerSideProps } from 'next';
import jwt, { JwtPayload } from "jsonwebtoken";

type User = {
    id: number;
    username: string;
  };

type ProtectedPageProps = {
    user: User;
  };

export const userInfo: GetServerSideProps<ProtectedPageProps> = async ({ req, res }) => {
    // 서버 측에서 JWT를 확인하고 사용자 정보를 가져오는 로직
    const jwtCookie = req.cookies.jwt;
  
    if (!jwtCookie) {
      res.writeHead(302, { Location: '/login' });
      res.end();
      return { props: {} as ProtectedPageProps };
    }
  
    try {
      const decoded = jwt.verify(jwtCookie, 'temp_gilhyeon') as JwtPayload;
      const user: User = decoded.user;
  
      return { props: { user } };
    } catch (error) {
      const decoded = jwt.verify(jwtCookie, 'temp_gilhyeon') as JwtPayload;
      const user: User = decoded.user;

      res.writeHead(302, { Location: '/login' });
      res.end();
      return { props: { user } };
    }
  };
  
  export default userInfo;