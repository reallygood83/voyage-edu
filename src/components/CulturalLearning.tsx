'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DestinationInfoCard } from '@/components/DestinationInfoCard';
import { City, Country } from '@/types';

interface CulturalLearningProps {
  onBack?: () => void;
}

// 인기 학습 도시 데이터
const POPULAR_DESTINATIONS: Array<{country: Country, cities: City[]}> = [
  {
    country: { name: 'Japan', nameKo: '일본', flag: '🇯🇵' },
    cities: [
      { name: 'Tokyo', nameKo: '도쿄', country: '일본' },
      { name: 'Osaka', nameKo: '오사카', country: '일본' },
      { name: 'Kyoto', nameKo: '교토', country: '일본' }
    ]
  },
  {
    country: { name: 'France', nameKo: '프랑스', flag: '🇫🇷' },
    cities: [
      { name: 'Paris', nameKo: '파리', country: '프랑스' },
      { name: 'Lyon', nameKo: '리옹', country: '프랑스' },
      { name: 'Nice', nameKo: '니스', country: '프랑스' }
    ]
  },
  {
    country: { name: 'United States', nameKo: '미국', flag: '🇺🇸' },
    cities: [
      { name: 'New York', nameKo: '뉴욕', country: '미국' },
      { name: 'Los Angeles', nameKo: '로스앤젤레스', country: '미국' },
      { name: 'San Francisco', nameKo: '샌프란시스코', country: '미국' }
    ]
  },
  {
    country: { name: 'Thailand', nameKo: '태국', flag: '🇹🇭' },
    cities: [
      { name: 'Bangkok', nameKo: '방콕', country: '태국' },
      { name: 'Chiang Mai', nameKo: '치앙마이', country: '태국' },
      { name: 'Phuket', nameKo: '푸켓', country: '태국' }
    ]
  },
  {
    country: { name: 'Australia', nameKo: '호주', flag: '🇦🇺' },
    cities: [
      { name: 'Sydney', nameKo: '시드니', country: '호주' },
      { name: 'Melbourne', nameKo: '멜버른', country: '호주' },
      { name: 'Brisbane', nameKo: '브리즈번', country: '호주' }
    ]
  },
  {
    country: { name: 'Italy', nameKo: '이탈리아', flag: '🇮🇹' },
    cities: [
      { name: 'Rome', nameKo: '로마', country: '이탈리아' },
      { name: 'Florence', nameKo: '피렌체', country: '이탈리아' },
      { name: 'Venice', nameKo: '베니스', country: '이탈리아' }
    ]
  }
];

export default function CulturalLearning({ onBack }: CulturalLearningProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [customCity, setCustomCity] = useState<City | null>(null);
  const [activeTab, setActiveTab] = useState<'popular' | 'search'>('popular');

  // 검색 기능
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newCity: City = {
        name: searchQuery.trim(),
        nameKo: searchQuery.trim(),
        country: '전 세계'
      };
      setCustomCity(newCity);
      setSelectedCity(newCity);
      setActiveTab('search');
    }
  };

  // 도시 선택
  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setCustomCity(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 헤더 */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl flex items-center justify-center gap-3">
            <span className="text-4xl">🌍</span>
            세계 문화 학습
            <span className="text-4xl">📚</span>
          </CardTitle>
          <p className="text-lg text-gray-600 mt-2">
            전 세계 도시들의 지리, 기후, 문화적 특색을 배워보세요!
          </p>
          {onBack && (
            <Button 
              onClick={onBack}
              variant="outline"
              className="mt-4 mx-auto"
            >
              ← 메인으로 돌아가기
            </Button>
          )}
        </CardHeader>
      </Card>

      {/* 검색 및 선택 영역 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">🔍 학습할 도시 선택</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'popular' | 'search')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="popular">🏆 인기 도시</TabsTrigger>
              <TabsTrigger value="search">🔍 직접 검색</TabsTrigger>
            </TabsList>
            
            <TabsContent value="popular" className="space-y-6 mt-6">
              <div className="grid gap-6">
                {POPULAR_DESTINATIONS.map((dest) => (
                  <Card key={dest.country.name} className="border border-gray-200">
                    <CardHeader className="bg-gray-50">
                      <CardTitle className="text-lg flex items-center gap-3">
                        <span className="text-2xl">{dest.country.flag}</span>
                        {dest.country.nameKo}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-3 gap-3">
                        {dest.cities.map((city) => (
                          <Button
                            key={city.name}
                            onClick={() => handleCitySelect(city)}
                            variant={selectedCity?.name === city.name ? "default" : "outline"}
                            className="justify-start"
                          >
                            {city.nameKo}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="search" className="space-y-6 mt-6">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSearch} className="flex gap-3">
                    <Input
                      placeholder="도시 이름을 입력하세요 (예: 런던, 베이징, 상파울루)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" disabled={!searchQuery.trim()}>
                      🔍 검색
                    </Button>
                  </form>
                  
                  {customCity && (
                    <div className="mt-4">
                      <Badge variant="secondary" className="text-lg py-2 px-4">
                        📍 검색 결과: {customCity.nameKo}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 학습 가이드 */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-3">
            <span className="text-2xl">💡</span>
            학습 가이드
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-800">🌟 개요 탭에서 배우기:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• 지리적 위치와 특성</li>
                <li>• 기후 조건과 날씨</li>
                <li>• 최적 여행 시기</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-800">🎭 문화 탭에서 배우기:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• 문화적 특색과 전통</li>
                <li>• 유명한 것들과 명소</li>
                <li>• 현지 음식과 축제</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-800">✈️ 여행정보 탭에서 배우기:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• 필수 방문지와 관광명소</li>
                <li>• 통화와 언어 정보</li>
                <li>• 실용적인 여행 팁</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-red-800">🇰🇷 한국관계 탭에서 배우기:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• 한국과의 관계와 교류</li>
                <li>• 한국에서의 접근성</li>
                <li>• 교육적 가치와 의미</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 선택된 도시 정보 */}
      {selectedCity && (
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="text-2xl">📖</span>
                선택된 학습 도시: {selectedCity.nameKo}
              </CardTitle>
              <p className="text-gray-600">
                아래에서 자세한 문화 정보를 탐색해보세요!
              </p>
            </CardHeader>
          </Card>

          <DestinationInfoCard 
            city={selectedCity} 
            isExpanded={true}
          />
        </div>
      )}

      {/* 선택된 도시가 없을 때 안내 */}
      {!selectedCity && (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              학습할 도시를 선택해주세요
            </h3>
            <p className="text-gray-500">
              위에서 도시를 선택하면 상세한 문화 정보를 볼 수 있습니다.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}