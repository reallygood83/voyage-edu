import type { Metadata } from 'next';
import { Inter, Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap'
});

const notoSansKR = Noto_Sans_KR({ 
  subsets: ['latin'], 
  variable: '--font-noto-sans-kr',
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: '🌍 Voyage Edu - 세계 문화 여행 상품 만들기',
  description: '초등학생을 위한 재미있고 교육적인 세계 문화 여행 상품 제작 플랫폼! 실제 데이터로 나만의 여행 계획을 세워보세요.',
  keywords: ['초등교육', '세계문화', '여행교육', '문화학습', '교육플랫폼'],
  authors: [{ name: 'Voyage Edu Team' }],
  openGraph: {
    title: '🌍 Voyage Edu - 세계 문화 여행 상품 만들기',
    description: '초등학생을 위한 재미있고 교육적인 세계 문화 여행 상품 제작 플랫폼!',
    type: 'website',
    locale: 'ko_KR',
  },
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    themeColor: '#3b82f6',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKR.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" 
        />
      </head>
      <body className="font-sans antialiased bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
        <AuthProvider>
          <div className="relative">
            {children}
            
            {/* 접근성 개선을 위한 skip 링크 */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
            >
              메인 콘텐츠로 바로 가기
            </a>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}