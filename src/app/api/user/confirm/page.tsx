'use client'
import { useEffect, useState } from 'react';

const useConfirm = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 사용자 인증 상태를 확인하고 사용자 정보를 가져오는 비동기 함수
    const checkAuthStatus = async () => {
      try {
        // 인증 API를 호출하여 사용자 인증 상태 확인
        const response = await fetch('/api/user/confirm', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 다른 필요한 헤더 정보를 추가할 수도 있습니다.
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setUser(undefined);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
        setUser(undefined);
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  return { user, loading, isAuthenticated };
};
export default useConfirm;
