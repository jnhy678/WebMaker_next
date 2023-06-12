'use client'
import { useState } from 'react';
import styles from './login.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 로그인 처리 로직 작성
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
      <h1 className={styles.title}>로그인</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={handleEmailChange}
            className={styles.input}
            />
            <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
            />
            <button type="submit" className={styles.button}>
            로그인
            </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
