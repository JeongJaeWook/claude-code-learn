/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // GitHub Pages 배포용 정적 내보내기
  basePath: '/claude-code-learn', // GitHub Pages 서브 패스 적용
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
