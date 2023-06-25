'use client'
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './body.css' 

interface SignUpFormProps {
  onSubmit: (formData: SignUpFormData) => void;
}

export interface SignUpFormData {
  id: string;
  username: string;
  password: string;
  address: string;
  age: number;
  image_url: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<SignUpFormData>({
    id: '',
    username: '',
    password: '',
    address: '',
    age: 0,
    image_url: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formId">
        <Form.Label className={styles.zzz}>아이디</Form.Label>
        <Form.Control
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formUsername">
        <Form.Label className={styles.zzz}>이름</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPasswordCheck">
        <Form.Label>비밀번호확인</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAddress">
        <Form.Label>주소</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAge">
        <Form.Label>생년월일</Form.Label>
        <Form.Control
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </Form.Group>

      {/* <Form.Group controlId="formImageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          name="image_url"
          value={formData.image_url}
          onChange={handleChange}
          required
        />
      </Form.Group> */}

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUpForm;
