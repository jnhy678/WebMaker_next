import { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'

type User = {
  id: number;
  username: string;
};

type ProtectedPageProps = {
  user: User;
};

const ProtectedPage = ({ user }: ProtectedPageProps) => {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogout = () => {
    // 로그아웃: 쿠키에서 JWT 제거
    Cookies.remove('jwt');
    
    router.push('/login')
  };

  const fetchData = async () => {
    try {
      // 서버에 보호된 데이터 요청: JWT를 헤더에 포함
      const response = await fetch('/api/protected', {
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        setMessage('데이터를 가져오지 못했습니다.');
      }
    } catch (error) {
      setMessage('오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <h1>보호된 페이지</h1>
      <p>사용자: {user.username} (ID: {user.id})</p>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={fetchData}>데이터 가져오기</button>
      <p>{message}</p>
    </div>
  );
};

export default ProtectedPage;