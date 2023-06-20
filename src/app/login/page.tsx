'use client'
import { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, ButtonGroup, FormCheck } from 'react-bootstrap';
import styles from './login.module.css';
import { useRouter } from 'next/navigation';

async function getData (id:any ,password:any, e: React.FormEvent<HTMLFormElement>) {
  new Promise(async (resolve, reject) => {

  console.log('id:', id);
  console.log('Password:', password);
  const formData = new FormData(e.currentTarget);
  const formObject = Object.fromEntries(formData.entries());

  await fetch('/api', formObject)
    .then((response) => response.json())
    .then((data) => {
      console.log('data',data);
      alert(data);
      
      resolve(true);
    })
    .catch((error) => {
      console.log('error',error)
      // 오류 처리 로직 작성
    });
  });
}

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  
  const $INPUT_ID = useRef<HTMLInputElement>(null);
  const $INPUT_PW = useRef<HTMLInputElement>(null);
  const $BTN_LOGIN = useRef<HTMLButtonElement>(null);
  const $CHK_AUTO_LOGIN = useRef<HTMLFormElement>(null);

  //Id
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handleIdKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      $INPUT_PW.current?.focus();
    }
  };
  
  //Password
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      $BTN_LOGIN.current?.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getData(id, password, e)
    .then((res) => {
      router.push('/main')
    });
  };

  const autoLogin = (e: React.FormEvent<HTMLInputElement>) => {
    const checkValue = e.currentTarget.checked.toString();
    console.log('autoLogin',checkValue);
    sessionStorage.setItem('autoLogin',checkValue);
  }

  useEffect(() => {
    if ($INPUT_ID.current) {
      $INPUT_ID.current.focus();
    }
   
    // if ($CHK_AUTO_LOGIN.current) {
      const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('autoLogin') : null;
      console.log('accessToken',accessToken);
      if (accessToken === 'true') {
        // 로그인로직
        alert('Access token 자동로그인')
      }
    // }
  }, [])

  return (
    <>
    <Container className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>로그인</h1>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <Form.Group controlId="id">
            <Form.Control
              ref={$INPUT_ID}
              type="id"
              placeholder="아이디"
              value={id}
              onChange={handleIdChange}
              className={styles.input}
              name="id"
              onKeyDown={handleIdKeyDown}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              ref={$INPUT_PW}
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
              className={styles.input}
              name="password"
              onKeyDown={handlePasswordKeyDown}
            />
          </Form.Group>
          <Button variant="secondary" type="submit" className={styles.button}>
            로그인
          </Button>
          <FormCheck type="switch" id="auto-login" label="자동로그인" 
          className={styles.auto} onChange={autoLogin}/>
        </Form>
      </div>
      <ButtonGroup aria-label="Basic example" className={styles.subinfo}>
        <Button variant="light">회원가입</Button>
        <Button variant="light">Id/Pw찾기</Button>
      </ButtonGroup>
    </Container>
    </>
  );
};

export default LoginPage;
