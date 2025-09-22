'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  requirement: string;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  showAnimation?: boolean;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ 
  achievement, 
  showAnimation = false 
}) => {
  return (
    <Card className={`
      transition-all duration-500 transform hover:scale-105 
      ${achievement.unlocked 
        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-3 border-yellow-400 shadow-xl' 
        : 'bg-gray-50 border-2 border-gray-300 shadow-md opacity-70'
      }
      ${showAnimation ? 'animate-bounce' : ''}
    `}>
      <CardContent className="p-4 text-center">
        <div className={`text-6xl mb-3 ${achievement.unlocked ? 'animate-wiggle' : 'grayscale'}`}>
          {achievement.icon}
        </div>
        
        <h3 className={`text-lg font-bold mb-2 ${
          achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
        }`}>
          {achievement.title}
        </h3>
        
        <p className={`text-sm mb-3 ${
          achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {achievement.description}
        </p>
        
        {achievement.unlocked ? (
          <div className="space-y-2">
            <Badge variant="achievement" className="text-sm px-3 py-1 animate-pulse">
              🏆 획득! +{achievement.points}점
            </Badge>
            <div className="text-xs text-gray-500">
              {achievement.requirement}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <Badge variant="outline" className="text-sm px-3 py-1">
              🔒 미획득
            </Badge>
            <div className="text-xs text-gray-400">
              조건: {achievement.requirement}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// 미리 정의된 업적들
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_explorer',
    title: '첫 탐험가',
    description: '첫 번째 나라를 선택했어요!',
    icon: '🗺️',
    points: 10,
    unlocked: false,
    requirement: '나라 1개 선택'
  },
  {
    id: 'city_explorer',
    title: '도시 탐험가', 
    description: '3개 이상의 도시를 선택했어요!',
    icon: '🏙️',
    points: 20,
    unlocked: false,
    requirement: '도시 3개 이상 선택'
  },
  {
    id: 'plan_master',
    title: '계획의 달인',
    description: '완벽한 여행 계획을 세웠어요!',
    icon: '📋',
    points: 30,
    unlocked: false,
    requirement: '여행 계획 완료'
  },
  {
    id: 'designer',
    title: '디자이너',
    description: '멋진 홍보 자료를 만들었어요!',
    icon: '🎨',
    points: 25,
    unlocked: false,
    requirement: '홍보 자료 제작'
  },
  {
    id: 'culture_learner',
    title: '문화 탐구자',
    description: '세계 문화 학습을 시작했어요!',
    icon: '📚',
    points: 15,
    unlocked: false,
    requirement: '문화 학습 페이지 방문'
  },
  {
    id: 'travel_expert',
    title: '여행 전문가',
    description: '모든 단계를 완료했어요!',
    icon: '👑',
    points: 50,
    unlocked: false,
    requirement: '모든 단계 완료'
  }
];

export default AchievementBadge;