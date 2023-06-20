'use client'
import React, { FC, useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button  } from 'react-bootstrap';
// const router = HistoryRouter();

const Main: FC = () => {
    const router = useRouter();
  
    const test = useCallback(() => {
      router.push('/login');
    }, [router]);
  
    return (
      <>
        <h2>안녕하세요</h2>
        <button onClick={test}>클릭</button>
        
        <Button variant="secondary">회원가입</Button>
      </>
    );
  };

export default Main;