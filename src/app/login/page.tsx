'use client'
import { useState, useEffect, useRef } from 'react';
import { Container, Form, Button, ButtonGroup, FormCheck } from 'react-bootstrap';
import styles from './login.module.css';
import { useRouter } from 'next/navigation';
import CustomAlert from '../msg/page';
import { Dialog  } from '@mui/material';

async function getData (id:any ,password:any, e: React.FormEvent<HTMLFormElement>) {
  return new Promise(async (resolve, reject) => {
    const formData:any = {
      id : id,
      password : password
    };
    const params = new URLSearchParams(formData).toString();

    await fetch(`/api/user/login?${params}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer <token>' + process.env.token
      }
    })
    // axios.get('/api/user/login', await formData)
      .then(async (data) => {
        let result = await data.json()
        console.log('data',result.data);
        if (result.token) {
          localStorage.setItem('token', result.token);
        }
        resolve(await result.data);
      })
      .catch((error) => {
        console.log('error',error)
        reject(error);
        // 오류 처리 로직 작성
      });
    });
}

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showAlert = (message: string) => {
    setMessage(message);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  
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

  const loginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      showAlert("아이디를 입력하세요.")
      if ($INPUT_ID.current) {
        $INPUT_ID.current.focus();
      }
      return false;
    }
    if (!password) {
      showAlert("비밀번호를 입력하세요.")
      if ($INPUT_PW.current) {
        $INPUT_PW.current.focus();
      }
      return false;
    }
    await getData(id, password, e)
    .then(async (res) => {
      let result: any = await res;
      console.log('result', result);
      if (result.length > 0) {
        showAlert('굿')
      } else {
        showAlert('아이디없음')
      }
    }).catch((err) => {
      console.log('error', err);
    })
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
  function signup () {
    router.push('/signup')
  }
  return (
    <>
    <Container className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>로그인</h1>
        <Form className={styles.form} onSubmit={loginSubmit}>
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
      <CustomAlert open={open} handleClose={handleClose} message={message} />
      <ButtonGroup aria-label="Basic example" className={styles.subinfo}>
        <Button variant="light" onClick={signup}>회원가입</Button>
        <Button variant="light">Id/Pw찾기</Button>
      </ButtonGroup>
    </Container>
    </>
  );
};

export default LoginPage;
