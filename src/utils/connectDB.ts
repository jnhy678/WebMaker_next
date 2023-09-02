import mysql from 'mysql2/promise';

let connection: any;
const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined;
// MariaDB 연결 설정 및 연결 수립
export async function connectToDatabase() {
  try {
    if (connection) {
      console.log('MariaDB 연결확인.');
      return;
    }

    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: port,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    
    console.log('MariaDB 연결 성공');
  } catch (error) {
    console.error('MariaDB 연결 실패:', error);
    throw error;
  }
}

// 예시: 사용자 데이터 조회
export async function getUsers() {
  try {
    const [rows] = await connection.query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error('쿼리 실행 실패:', error);
    throw error;
  }
}

// 연결 종료
export async function closeConnection() {
  await connection.end();
  console.log('MariaDB 연결 종료');
}
