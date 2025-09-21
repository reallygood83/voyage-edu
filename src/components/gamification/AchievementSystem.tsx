'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AchievementBadge, { ACHIEVEMENTS, type Achievement } from './AchievementBadge';

interface AchievementSystemProps {
  unlockedAchievements: string[];
  totalPoints: number;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({
  unlockedAchievements,
  totalPoints
}) => {
  const [newlyUnlocked, setNewlyUnlocked] = useState<string[]>([]);
  
  // 업적 상태 업데이트
  const achievementsWithStatus = ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    unlocked: unlockedAchievements.includes(achievement.id)
  }));

  const unlockedCount = unlockedAchievements.length;
  const totalAchievements = ACHIEVEMENTS.length;
  const completionPercentage = Math.round((unlockedCount / totalAchievements) * 100);

  const getPlayerLevel = (points: number) => {
    if (points >= 100) return { level: 5, title: '여행 마스터', icon: '👑', color: 'from-purple-400 to-pink-500' };
    if (points >= 75) return { level: 4, title: '탐험 전문가', icon: '🌟', color: 'from-yellow-400 to-orange-500' };
    if (points >= 50) return { level: 3, title: '모험가', icon: '🎒', color: 'from-green-400 to-blue-500' };
    if (points >= 25) return { level: 2, title: '탐험가', icon: '🗺️', color: 'from-blue-400 to-purple-500' };
    return { level: 1, title: '초보 여행자', icon: '🌱', color: 'from-gray-400 to-gray-600' };
  };

  const playerLevel = getPlayerLevel(totalPoints);
  const nextLevelPoints = [25, 50, 75, 100, 150][playerLevel.level - 1] || 150;
  const progressToNextLevel = Math.min(100, (totalPoints / nextLevelPoints) * 100);

  return (
    <div className="space-y-6">
      {/* 플레이어 레벨 및 포인트 */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-3 border-indigo-200 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <span className="text-4xl animate-bounce">{playerLevel.icon}</span>
            <div>
              <div className="text-lg">레벨 {playerLevel.level}</div>
              <div className={`text-sm bg-gradient-to-r ${playerLevel.color} bg-clip-text text-transparent font-bold`}>
                {playerLevel.title}
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {totalPoints} 포인트
            </div>
            <div className="text-sm text-gray-600">
              다음 레벨까지: {nextLevelPoints - totalPoints} 포인트
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-3 border-2 border-indigo-100">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>레벨 진행률</span>
              <span>{Math.round(progressToNextLevel)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full bg-gradient-to-r ${playerLevel.color} transition-all duration-1000`}
                style={{ width: `${progressToNextLevel}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 업적 현황 요약 */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-3 border-green-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <span className="text-2xl">🏆</span>
            업적 현황
            <Badge variant="achievement" className="text-base">
              {unlockedCount}/{totalAchievements}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-semibold text-gray-700">완료율</span>
            <span className="text-2xl font-bold text-green-600">{completionPercentage}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
            <div 
              className="h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 shadow-lg"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          
          <div className="mt-4 text-center">
            {completionPercentage === 100 ? (
              <div className="text-green-600 font-bold animate-bounce">
                🎉 모든 업적 달성! 완벽해요! 🎉
              </div>
            ) : (
              <div className="text-gray-600 text-sm">
                {totalAchievements - unlockedCount}개의 업적이 더 기다리고 있어요!
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 업적 목록 */}
      <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-3 border-orange-200 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <span className="text-2xl animate-wiggle">🏅</span>
            나의 업적들
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievementsWithStatus.map((achievement) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                showAnimation={newlyUnlocked.includes(achievement.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 격려 메시지 */}
      <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-3 border-pink-200 shadow-xl">
        <CardContent className="text-center py-6">
          <div className="text-4xl mb-3">
            {totalPoints >= 100 ? '🌟' : totalPoints >= 50 ? '💪' : totalPoints >= 25 ? '🚀' : '🌱'}
          </div>
          <p className="text-lg font-semibold text-gray-800 mb-2">
            {totalPoints >= 100 
              ? '와! 정말 대단해요! 여행 계획의 달인이에요!' 
              : totalPoints >= 50 
              ? '절반 이상 완료! 계속 열심히 해보세요!' 
              : totalPoints >= 25 
              ? '좋은 시작이에요! 더 많은 업적을 달성해보세요!' 
              : '첫 번째 업적을 달성해보세요!'}
          </p>
          <p className="text-sm text-gray-600">
            여행 계획을 세우면서 재미있게 학습하고 있어요! 🎒✨
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementSystem;