/** @type {import('next').NextConfig} */
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
}

module.exports = nextConfig
