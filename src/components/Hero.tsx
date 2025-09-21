'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { LoginModal } from '@/components/auth/LoginModal';

const Hero = () => {
  const { user } = useAuth();
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['탐험하고', '배우고', '만들고', '공유하세요'];
  const [isVisible, setIsVisible] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  const features = [
    { icon: "🎓", title: "교육적 체험", desc: "실제 데이터로 배워요" },
    { icon: "🤝", title: "문화 이해", desc: "세계 문화를 알아가요" },
    { icon: "💡", title: "창의적 사고", desc: "나만의 아이디어를 펼쳐요" },
    { icon: "🎨", title: "디자인 능력", desc: "멋진 작품을 만들어요" }
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white py-16 px-4 overflow-hidden">
      {/* 배경 애니메이션 요소들 */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 text-6xl opacity-30 animate-bounce">✈️</div>
        <div className="absolute top-20 right-20 text-5xl opacity-25 animate-pulse">🌍</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-25 animate-pulse">🗺️</div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-30 animate-bounce delay-1000">🧳</div>
        <div className="absolute top-1/2 left-5 text-3xl opacity-20 animate-pulse delay-500">🏔️</div>
        <div className="absolute top-1/3 right-5 text-3xl opacity-20 animate-pulse delay-700">🏖️</div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="inline-block animate-bounce">🌍</span>
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              세계 문화 여행 상품
            </span>
            <br />
            <span className="text-white">만들기</span>
          </h1>
          
          <div className="text-2xl md:text-3xl mb-8 h-16 flex items-center justify-center">
            <span>세계를 </span>
            <span className="inline-block min-w-[140px] font-bold text-yellow-300 mx-2 transition-all duration-500 transform hover:scale-110">
              {words[currentWord]}
            </span>
          </div>
          
          <p className="text-lg md:text-xl max-w-4xl mx-auto mb-10 opacity-95 leading-relaxed">
            🎉 <strong>초등학생 여러분!</strong> 세계 여러 나라의 문화를 탐험하고,<br className="hidden md:block" /> 
            나만의 특별한 여행 상품을 만들어보세요!<br className="hidden md:block" />
            실제 데이터를 활용해 진짜 여행 전문가처럼 계획을 세워봐요! 🚀
          </p>

          {/* 시작하기 버튼들 */}
          <div className="mb-12 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="xl" 
                variant="fun"
                className="text-xl px-12 py-6 shadow-2xl border-4 border-white/30"
                onClick={() => document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="text-2xl mr-3">🚀</span>
                지금 시작하기!
              </Button>
              
              {!user && (
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-4 bg-white/20 hover:bg-white/30 border-2 border-white text-white backdrop-blur-md"
                  onClick={() => setShowLoginModal(true)}
                >
                  <span className="text-xl mr-2">👤</span>
                  로그인하고 저장하기
                </Button>
              )}
            </div>
            
            {!user && (
              <p className="text-sm text-white/80">
                💾 로그인하면 여행 계획을 저장하고 업적을 모을 수 있어요!
              </p>
            )}
          </div>

          {/* 기능 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`bg-white/20 backdrop-blur-md border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 ${
                  isVisible ? 'animate-slide-up' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3 transform hover:scale-125 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-white">{feature.title}</h3>
                  <p className="text-sm text-white/90">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 재미있는 통계 */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Badge variant="achievement" className="text-lg py-2 px-4">
              🌟 195개국 탐험 가능
            </Badge>
            <Badge variant="achievement" className="text-lg py-2 px-4">
              🏙️ 1000개 이상 도시
            </Badge>
            <Badge variant="achievement" className="text-lg py-2 px-4">
              🎨 무한한 창의력
            </Badge>
          </div>
        </div>
      </div>
      
      {/* 로그인 모달 */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default Hero;