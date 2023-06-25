'use client'
import React, { FC, useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button  } from 'react-bootstrap';
import ProtectedPage from '@components/logon/page';
import useConfirm from '@api/user/confirm/page';
// const router = HistoryRouter();

type User = {
  id: number;
  username: string;
};

const Main: FC = () => {
    const router = useRouter();
    const { user, loading, isAuthenticated } = useConfirm();
    const convertedUser: User = user ?? { id: 0, username: '' };
    const test = useCallback(() => {
      router.push('/login');
    }, [router]);

    function signup () {
      router.push('/signup');
    }
  
    useEffect(() => {
      // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
      if (!loading && !isAuthenticated) {
        // router.push('/login');
        console.log('not')
      }
    }, [loading, isAuthenticated, router]);
  
    if (loading) {
      return <p>로딩 중...</p>;
    }
    
    return (
      <>
        <h2>안녕하세요</h2>
        <button onClick={test}>로그인</button>
          <ProtectedPage user={convertedUser}/>
        
        <Button variant="secondary" onClick={signup}>회원가입</Button>
      </>
    );
  };

export default Main;