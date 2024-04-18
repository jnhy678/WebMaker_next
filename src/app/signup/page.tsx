'use client'
import SignUpForm, {SignUpFormData} from './body/page';
import { useRouter } from 'next/navigation';
// import axios from 'axios';

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const handleSignUp = async (formData: SignUpFormData) => {
    // 회원가입 처리 로직
    console.log(formData);
    await fetch('/api/user/login',{
    // axios.post('/api/user/login', formData ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer tokentemp' 
      }, 
      body: JSON.stringify(formData)
    })
      // .then((response) => response.json())
      .then(async (data) => {
        if (!data) {
          console.log('error?');
        }
        console.log('data',data);
        //회원가입성공은 메인으로
        router.push('/main')
      })
      .catch((error) => {
        console.log('error',error)
        // 오류 처리 로직 작성
      });
    
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-5">
        <h2 className="text-center mb-4">회원가입</h2>
        <SignUpForm onSubmit={handleSignUp} />
      </div>
    </div>
  );
};

export default SignUpPage;
