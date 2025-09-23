'use client';

import React, { useState } from 'react';
import { City } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CityCardProps {
  city: City;
  isSelected: boolean;
  onToggle: () => void;
}

const CityCard = ({ city, isSelected, onToggle }: CityCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 도시별 대표 이모지 매핑
  const getCityEmoji = (cityName: string) => {
    const emojiMap: { [key: string]: string } = {
      '서울': '🏢',
      '부산': '🌊',
      '도쿄': '🗼',
      '오사카': '🍜',
      '파리': '🗼',
      '런던': '🎡',
      '뉴욕': '🗽',
      '로스앤젤레스': '🌴',
      '베이징': '🏮',
      '상하이': '🏗️',
      '방콕': '🛕',
      '싱가포르': '🌆',
    };
    return emojiMap[cityName] || '🏙️';
  };

  return (
    <Card
      className={cn(
        "relative cursor-pointer transition-all duration-300 hover:shadow-2xl border-3 z-10",
        "transform hover:scale-105 hover:-translate-y-2 active:scale-95",
        isSelected
          ? "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white border-white shadow-2xl ring-4 ring-blue-300"
          : "bg-white hover:bg-blue-50 text-gray-800 border-blue-200 hover:border-blue-400"
      )}
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6 relative overflow-hidden">
        {/* 선택 표시 */}
        <div className="absolute top-4 right-4 z-20">
          <div
            className={cn(
              "w-8 h-8 rounded-full border-3 flex items-center justify-center transition-all duration-200",
              isSelected
                ? "bg-white border-white shadow-lg scale-110"
                : "border-gray-400 bg-white/80"
            )}
          >
            {isSelected && (
              <span className="text-blue-500 text-lg font-bold animate-bounce">✓</span>
            )}
          </div>
        </div>

        {/* 도시 정보 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className={cn(
              "text-4xl transition-all duration-300",
              isHovered ? "animate-bounce" : ""
            )}>
              {getCityEmoji(city.nameKo)}
            </span>
            <div>
              <h4 className={cn(
                "text-xl font-bold leading-tight",
                isSelected ? "text-white" : "text-gray-800"
              )}>
                {city.nameKo}
              </h4>
              <p className={cn(
                "text-sm",
                isSelected ? "text-white/90" : "text-gray-600"
              )}>
                {city.name}
              </p>
            </div>
          </div>

          {/* 위치 정보 또는 커스텀 표시 */}
          <div className="flex gap-2 flex-wrap">
            {city.isCustom ? (
              <Badge 
                variant="outline"
                className={cn(
                  "text-xs",
                  isSelected 
                    ? "bg-yellow-400 text-yellow-900 border-yellow-300" 
                    : "bg-yellow-100 text-yellow-800 border-yellow-400"
                )}
              >
                ⭐ 내가 추가한 도시
              </Badge>
            ) : (
              <Badge 
                variant={isSelected ? "secondary" : "outline"}
                className={cn(
                  "text-xs",
                  isSelected ? "bg-white/20 text-white border-white/30" : ""
                )}
              >
                📍 {city.latitude?.toFixed(1) || 0}°N, {city.longitude?.toFixed(1) || 0}°E
              </Badge>
            )}
            
            {city.description && (
              <Badge 
                variant="outline"
                className={cn(
                  "text-xs max-w-32 truncate",
                  isSelected ? "bg-white/20 text-white border-white/30" : "text-gray-600"
                )}
                title={city.description}
              >
                📝 {city.description}
              </Badge>
            )}
          </div>

          {/* 선택 상태 메시지 */}
          {isSelected && (
            <div className="mt-4 p-3 bg-white/20 rounded-lg border border-white/30">
              <p className="text-white text-sm font-semibold text-center">
                🎉 선택완료! 멋진 선택이에요!
              </p>
            </div>
          )}
        </div>

        {/* 배경 장식 */}
        <div className={cn(
          "absolute -bottom-2 -right-2 text-6xl transition-all duration-300",
          isSelected ? "text-white/10 rotate-12" : "text-gray-200",
          isHovered ? "scale-110 rotate-6" : ""
        )}>
          {getCityEmoji(city.nameKo)}
        </div>

        {/* 선택 효과 */}
        {isSelected && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        )}
      </CardContent>
    </Card>
  );
};

export default CityCard;