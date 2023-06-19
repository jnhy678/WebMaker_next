'use client'
import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import styles from './login.module.css';
import Router, { useRouter } from 'next/router';

async function getData (id:any ,password:any, e: React.FormEvent<HTMLFormElement>) {
  const router = useRouter();
  console.log('id:', id);
  console.log('Password:', password);
  // 폼 데이터 수집
  const formData = new FormData(e.currentTarget);
  console.log('formData:', formData);
  const formObject = Object.fromEntries(formData.entries());
  console.log('formObject:',  JSON.stringify(formObject));
  // Fetch API를 사용하여 서버로 폼 데이터 전송
  
  // const respones = await fetch('/ssr', { cache: 'no-store' });
  
  // fetch('/api/form', {
  //   method: 'POST',
  //   body: JSON.stringify(formObject),
  //   // body: formData,
  //   headers: {
  //     'Content-Type': 'multipart/form-data; boundary=' ,
  //     // 'Content-Type': 'content/json'
  //   },
  // })
  // const data = await respones.json();
  // console.log('data:', data);

  await fetch('/api/test', formObject)
    .then((response) => response.json())
    .then((data) => {
      console.log('data',data);
    //   // 폼 제출 완료 후 처리할 로직 작성
    //   router.push('/main')
    })
    .catch((error) => {
      console.log('error',error)
      // 오류 처리 로직 작성
    });
}

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    router.push('/main')
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getData(id, password, e);
    
  };

  return (
    <Container className={styles.container}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>로그인</h1>
        <Form className={styles.form} onSubmit={handleSubmit}>
          <Form.Group controlId="id">
            <Form.Control
              type="id"
              placeholder="아이디"
              value={id}
              onChange={handleIdChange}
              className={styles.input}
              name="id"
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
              className={styles.input}
              name="password"
            />
          </Form.Group>
          <Button type="submit" className={styles.button}>
            로그인
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default LoginPage;
