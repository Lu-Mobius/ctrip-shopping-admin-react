/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // rewrites()可以重新定义请求路径
  async rewrites() {
    return [
      {
        source: `/api/:path*`,
        // 启动mock服务，执行这个代码
        // destination: `http://localhost:3000/api/:path*`,
        // 连接本地的nodejs服务，执行这个代码
        destination: `http://127.0.0.1:4523/m1/2574886-0-default/api/:path*`,



      },
    ]
  }
}


module.exports = nextConfig