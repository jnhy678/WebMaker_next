/** @type {import('next').NextConfig} */
const dotenv = require('dotenv');

// .env 파일 로드
dotenv.config();

const nextConfig = {
    experimental: {
      appDir: true
    },
    api: {
      bodyParser: true
      // bodyParser: {
      //   sizeLimit: '1mb', // 요청 바디 크기 제한 설정 (옵션)
      // },
    },
    env: {
      DB_HOST: process.env.MYSQL_HOST,
      DB_PORT: process.env.MYSQL_PORT,
      DB_USER: process.env.MYSQL_USER,
      DB_PASSWORD: process.env.MYSQL_PASSWORD,
      DB_DATABASE: process.env.MYSQL_DATABASE,
    },
}

module.exports = nextConfig
