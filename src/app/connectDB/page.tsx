'use client'
import { useEffect } from 'react';
import { connectToDatabase, getUsers, closeConnection } from '@utils/connectDB';

export default function HomePage() {
  useEffect(() => {
    async function fetchData() {
      try {
        await connectToDatabase();
        const users = await getUsers();
        console.log('사용자 데이터:', users);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
      } finally {
        await closeConnection();
      }
    }
    fetchData();
  }, []);

  return <div>...</div>;
}
