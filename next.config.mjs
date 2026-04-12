/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.VERCEL ? undefined : 'export', // Vercel에서는 서버리스 모드, GitHub Pages에서는 정적 파일 내보내기
  basePath: process.env.VERCEL ? '' : '/claude-code-learn', // Vercel은 루트(/), GH Pages는 저장소명
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
