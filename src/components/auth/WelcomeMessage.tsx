'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LoginModal } from './LoginModal';

export const WelcomeMessage: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <Card className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border-2 border-blue-300 shadow-lg">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              🌟 안녕하세요, 꿈꾸는 여행가님!
            </h2>
            <p className="text-lg text-gray-700">
              로그인하시면 나만의 여행 계획을 저장하고 <br/>
              멋진 업적도 모을 수 있어요! 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6">
              <Button 
                onClick={() => setShowLoginModal(true)}
                size="lg"
                className="text-lg px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg transform hover:scale-105 transition-all"
              >
                🚀 로그인하고 시작하기
              </Button>
              
              <div className="text-sm text-gray-600">
                또는 로그인 없이 둘러보기
              </div>
            </div>

            {/* 로그인 혜택 미리보기 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-2xl mb-1">💾</div>
                <div className="text-sm font-medium">계획 저장</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-2xl mb-1">🏆</div>
                <div className="text-sm font-medium">업적 수집</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-sm font-medium">기록 관리</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
};