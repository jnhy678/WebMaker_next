'use client'
import { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Modal } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';
import styles from './body.css';

interface SignUpFormProps {
  onSubmit: (formData: SignUpFormData) => void;
}

export interface SignUpFormData {
  id: string;
  username: string;
  password: string;
  age: number;
  address: string;
  address2: string;
  phoneNum: string;
  route: string;
  jop: string;
  jumin: string;
  image_url: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const [showPostcode, setShowPostcode] = useState(false);
  const [chkpw, setChkpw] = useState<string>('');
  const [formData, setFormData] = useState<SignUpFormData>({
    id: '',
    username: '',
    password: '',
    age: 0,
    address: '',
    address2: '',
    phoneNum: '',
    jop: '',
    route: '',
    jumin: '',
    image_url: '',
  });

  useEffect(()=> {
    console.log(formData)
  },[formData.id])

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

  const handleAddress = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = ''; 

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    setFormData({ ...formData, address: fullAddress });
    setShowPostcode(false);
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
          value={chkpw}
          onChange={(e) => setChkpw(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAddress">
        <Form.Label>주소</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <Button variant="outline-secondary" onClick={() => setShowPostcode(true)}>주소 검색</Button>
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formAddress2">
        <Form.Label>나머지주소</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={formData.address2}
          onChange={handleChange}
          
        />
      </Form.Group>
      {showPostcode && (
        <Modal show={showPostcode} onHide={() => setShowPostcode(false)}>
          <Modal.Header closeButton>
            <Modal.Title>주소 검색</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DaumPostcode onComplete={handleAddress} />
          </Modal.Body>
        </Modal>
      )}

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

      <Button variant="primary" type="submit" onClick={() => console.log('버튼')}>
        회원가입
      </Button>
    </Form>
  );
};

export default SignUpForm;
