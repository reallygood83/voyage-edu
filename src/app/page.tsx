'use client';

import React, { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import CountrySelector from '@/components/CountrySelector';
import EnhancedTravelPlanBuilder from '@/components/EnhancedTravelPlanBuilder';
import PromotionalMaterials from '@/components/PromotionalMaterials';
import { Country, City, TravelPlan } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProgressTracker from '@/components/gamification/ProgressTracker';
import AchievementBadge, { ACHIEVEMENTS } from '@/components/gamification/AchievementBadge';
import AchievementSystem from '@/components/gamification/AchievementSystem';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { UserMenu } from '@/components/auth/UserMenu';
import { WelcomeMessage } from '@/components/auth/WelcomeMessage';

export default function Home() {
  const { user, userProfile, loading, addPoints, addAchievement } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [activeTab, setActiveTab] = useState<'search' | 'plan' | 'promote'>('search');
  const [showHelp, setShowHelp] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

  // 단계 진행률 계산
  const getCurrentStep = () => {
    if (activeTab === 'search') return 1;
    if (activeTab === 'plan') return 2;
    if (activeTab === 'promote') return 3;
    return 1;
  };

  const stepNames = ['🌍 국가/도시 검색', '✈️ 여행 계획', '📢 홍보 자료'];

  // 인증된 사용자의 업적 체크 및 포인트 지급
  const checkAchievements = async () => {
    if (!user || !userProfile) {
      // 비로그인 사용자는 로컬 업적만 추적
      let newUnlocked = [...unlockedAchievements];
      let newPoints = userPoints;
      
      if (selectedCountry && !newUnlocked.includes('first_explorer')) {
        newUnlocked.push('first_explorer');
        newPoints += 10;
      }
      
      if (selectedCities.length >= 3 && !newUnlocked.includes('city_explorer')) {
        newUnlocked.push('city_explorer');
        newPoints += 20;
      }
      
      if (travelPlan && !newUnlocked.includes('plan_master')) {
        newUnlocked.push('plan_master');
        newPoints += 30;
      }
      
      if (activeTab === 'promote' && !newUnlocked.includes('designer')) {
        newUnlocked.push('designer');
        newPoints += 25;
      }
      
      if (activeTab === 'promote' && travelPlan && !newUnlocked.includes('travel_expert')) {
        newUnlocked.push('travel_expert');
        newPoints += 50;
      }
      
      setUnlockedAchievements(newUnlocked);
      setUserPoints(newPoints);
      return;
    }

    // 로그인 사용자는 Firebase에 업적 저장
    if (selectedCountry && !userProfile.achievements.includes('first_explorer')) {
      await addAchievement('first_explorer');
      await addPoints(10);
    }
    
    if (selectedCities.length >= 3 && !userProfile.achievements.includes('city_explorer')) {
      await addAchievement('city_explorer');
      await addPoints(20);
    }
    
    if (travelPlan && !userProfile.achievements.includes('plan_master')) {
      await addAchievement('plan_master');
      await addPoints(30);
    }
    
    if (activeTab === 'promote' && !userProfile.achievements.includes('designer')) {
      await addAchievement('designer');
      await addPoints(25);
    }
    
    if (activeTab === 'promote' && travelPlan && !userProfile.achievements.includes('travel_expert')) {
      await addAchievement('travel_expert');
      await addPoints(50);
    }
  };

  // 단계 변경 시 업적 체크
  React.useEffect(() => {
    checkAchievements();
  }, [selectedCountry, selectedCities, travelPlan, activeTab]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50">
      <Hero />
      
      <div id="main-content" className="container mx-auto px-4 py-8">
        {/* 상단 사용자 정보 */}
        <div className="flex justify-between items-center mb-8">
          {user && userProfile ? (
            <UserMenu />
          ) : (
            <div className="flex items-center gap-4">
              <Badge variant="achievement" className="text-lg py-2 px-4">
                🏆 {userPoints}포인트
              </Badge>
              <span className="text-lg font-semibold text-gray-700">
                👋 안녕하세요, 여행가님!
              </span>
            </div>
          )}
        </div>

        {/* 비로그인 사용자에게 로그인 안내 */}
        {!user && !loading && (
          <div className="mb-8">
            <WelcomeMessage />
          </div>
        )}

        {/* 진행률 트래커 */}
        <div className="mb-12">
          <ProgressTracker 
            currentStep={getCurrentStep()}
            totalSteps={3}
            stepNames={stepNames}
          />
        </div>

        {/* Tab Navigation - 개선된 디자인 */}
        <div className="flex justify-center mb-8">
          <Card className="p-2 bg-white/80 backdrop-blur-sm border-2">
            <div className="flex gap-2">
              <Button
                onClick={() => setActiveTab('search')}
                variant={activeTab === 'search' ? 'default' : 'ghost'}
                size="lg"
                className="text-lg px-8 py-4"
              >
                🌍 국가/도시 검색
              </Button>
              <Button
                onClick={() => setActiveTab('plan')}
                variant={activeTab === 'plan' ? 'default' : 'ghost'}
                size="lg"
                className="text-lg px-8 py-4"
                disabled={selectedCities.length === 0}
              >
                ✈️ 여행 계획
              </Button>
              <Button
                onClick={() => setActiveTab('promote')}
                variant={activeTab === 'promote' ? 'default' : 'ghost'}
                size="lg"
                className="text-lg px-8 py-4"
                disabled={!travelPlan}
              >
                📢 홍보 자료
              </Button>
            </div>
          </Card>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto">
          {activeTab === 'search' && (
            <CountrySelector
              selectedCountry={selectedCountry}
              selectedCities={selectedCities}
              onCountrySelect={setSelectedCountry}
              onCitiesSelect={setSelectedCities}
              onNext={() => setActiveTab('plan')}
            />
          )}
          
          {activeTab === 'plan' && (
            <EnhancedTravelPlanBuilder
              selectedCities={selectedCities}
              travelPlan={travelPlan}
              onPlanUpdate={setTravelPlan}
              onNext={() => setActiveTab('promote')}
              onBack={() => setActiveTab('search')}
            />
          )}
          
          {activeTab === 'promote' && (
            <PromotionalMaterials
              travelPlan={travelPlan!}
              onBack={() => setActiveTab('plan')}
            />
          )}
        </div>

        {/* 업적 및 게임화 시스템 */}
        <div className="mt-12">
          <AchievementSystem 
            unlockedAchievements={user && userProfile ? userProfile.achievements : unlockedAchievements}
            totalPoints={user && userProfile ? userProfile.points : userPoints}
          />
        </div>
      </div>

      {/* 도움말 버튼 */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setShowHelp(!showHelp)}
          variant="secondary"
          size="lg"
          className="rounded-full shadow-2xl text-lg p-4 border-4 border-white/50"
        >
          💡 도움말
        </Button>
        
        {/* 도움말 팝업 */}
        {showHelp && (
          <Card className="absolute bottom-20 right-0 w-80 p-4 bg-white border-2 border-yellow-300 shadow-2xl">
            <h3 className="font-bold text-lg mb-3 text-yellow-800">🌟 도움말</h3>
            <div className="space-y-2 text-sm">
              <p>• 첫 번째 단계: 가고 싶은 나라와 도시를 선택해주세요</p>
              <p>• 두 번째 단계: 여행 일정과 예산을 계획해보세요</p>
              <p>• 세 번째 단계: 멋진 홍보 자료를 만들어보세요</p>
              <p className="font-semibold text-yellow-700">🏆 업적을 완료하면 포인트를 얻을 수 있어요!</p>
            </div>
            <Button 
              onClick={() => setShowHelp(false)}
              variant="outline"
              size="sm"
              className="w-full mt-3"
            >
              닫기
            </Button>
          </Card>
        )}
      </div>
    </main>
  );
}