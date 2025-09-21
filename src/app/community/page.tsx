'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CommunityGallery from '@/components/CommunityGallery';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="bg-white/20 hover:bg-white/30 border-white text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로
              </Button>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <span className="text-5xl animate-bounce">🌍</span>
              여행 계획 커뮤니티
              <span className="text-5xl animate-bounce delay-200">✨</span>
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              다른 여행자들의 멋진 여행 계획을 둘러보고 영감을 받아보세요!
              좋아요, 공유하기를 통해 여행 아이디어를 나눠요.
            </p>
          </div>
        </div>
      </div>

      {/* 커뮤니티 갤러리 */}
      <div className="container mx-auto px-4 py-8">
        <CommunityGallery />
      </div>

      {/* 하단 안내 */}
      <div className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-center text-green-800 flex items-center justify-center gap-2">
                <span className="text-2xl">💡</span>
                여행 계획을 공유하고 싶으신가요?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 mb-4">
                홈페이지에서 여행 계획을 만들면 자동으로 커뮤니티에 공유됩니다!
              </p>
              <Link href="/">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <span className="text-xl mr-2">✈️</span>
                  여행 계획 만들러 가기
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}