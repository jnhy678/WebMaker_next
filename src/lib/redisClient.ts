
import axios from 'axios';

export const setRedisValue = (key: string, value: string) => {
	// pages/api/persistStore에 API를 만들어 줄 것이기 때문에 아래 경로
  axios.post(`http://localhost:4000/api/persistStore`, { key, value });
};
// IP를 받아서 key를 ip+key로 만들어주는 함수
export const getRedisValue = async (key: 'user-storage', ip: string) => {
  const { data } = await axios.get(
		// pages/api/persistStore에 API를 만들어 줄 것이기 때문에 아래 경로
    `http://localhost:4000/api/persistStore?key=${ip + key}`
  );
  if (data) return data;
};