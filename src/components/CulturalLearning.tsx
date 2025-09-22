'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DestinationInfoCard } from '@/components/DestinationInfoCard';
import { City, Country } from '@/types';
import { EDUCATIONAL_CITIES, CITIES_BY_CONTINENT, CITIES_BY_THEME } from '@/data/educationalDatabase';

interface CulturalLearningProps {
  onBack?: () => void;
}

// 간소화된 학습용 타입
interface LearningCity {
  name: string;
  nameKo: string;
  country: string;
}

interface LearningCountry {
  name: string;
  nameKo: string;
  flag: string;
}

// 대륙별 이모지 매핑
const CONTINENT_EMOJIS: Record<string, string> = {
  '아시아': '🏯',
  '유럽': '🏰',
  '북미': '🗽',
  '남미': '🏛️',
  '아프리카': '🦁',
  '오세아니아': '🦘'
};

// 주제별 이모지 매핑
const THEME_EMOJIS: Record<string, string> = {
  '경제 중심지': '💼',
  '역사와 전통': '🏛️',
  '현대 문화': '🎭',
  '자연과 환경': '🌿',
  '기술과 혁신': '💡',
  '예술과 창조': '🎨',
  '한류와 K-문화': '🇰🇷',
  '고대 문명': '🏺',
  '스마트시티': '🌐',
  '아랍과 이슬람': '🕌',
  '라틴 문화': '💃',
  '다양성과 포용': '🌈'
};

export default function CulturalLearning({ onBack }: CulturalLearningProps) {
  const [selectedCity, setSelectedCity] = useState<LearningCity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [customCity, setCustomCity] = useState<LearningCity | null>(null);
  const [activeTab, setActiveTab] = useState<'database' | 'continent' | 'theme' | 'search'>('database');
  const [selectedContinent, setSelectedContinent] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  // 검색 기능
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newCity: LearningCity = {
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
  const handleCitySelect = (city: LearningCity) => {
    setSelectedCity(city);
    setCustomCity(null);
  };

  // 대륙별 도시 필터링
  const getCitiesByContinent = (continent: string) => {
    return CITIES_BY_CONTINENT[continent as keyof typeof CITIES_BY_CONTINENT] || [];
  };

  // 주제별 도시 필터링
  const getCitiesByTheme = (theme: string) => {
    return CITIES_BY_THEME[theme as keyof typeof CITIES_BY_THEME] || [];
  };

  // 교육 데이터베이스에서 도시 검색
  const searchInEducationalDatabase = (query: string) => {
    const searchTerm = query.toLowerCase().trim();
    return EDUCATIONAL_CITIES.filter(city => 
      city.nameKo.toLowerCase().includes(searchTerm) ||
      city.name.toLowerCase().includes(searchTerm) ||
      city.countryKo.toLowerCase().includes(searchTerm)
    );
  };

  // LearningCity를 City 타입으로 변환하는 함수 (Enhanced Education Service 최적화)
  const convertToCity = (learningCity: LearningCity): City => {
    // 확장된 국가별 국가 코드 및 영어 국가명 매핑
    const countryInfoMap: Record<string, { code: string; englishName: string }> = {
      '일본': { code: 'JP', englishName: 'Japan' },
      '프랑스': { code: 'FR', englishName: 'France' }, 
      '미국': { code: 'US', englishName: 'United States' },
      '태국': { code: 'TH', englishName: 'Thailand' },
      '호주': { code: 'AU', englishName: 'Australia' },
      '이탈리아': { code: 'IT', englishName: 'Italy' },
      '영국': { code: 'GB', englishName: 'United Kingdom' },
      '한국': { code: 'KR', englishName: 'South Korea' },
      '중국': { code: 'CN', englishName: 'China' },
      '이집트': { code: 'EG', englishName: 'Egypt' },
      '브라질': { code: 'BR', englishName: 'Brazil' },
      '전 세계': { code: 'WORLD', englishName: 'World' }
    };
    
    const countryInfo = countryInfoMap[learningCity.country] || { code: 'XX', englishName: learningCity.country };
    
    console.log('학습 도시 변환 (Enhanced Education Service):', {
      input: learningCity,
      countryInfo,
      willUseService: 'EnhancedEducationService.getEnhancedDestinationInfo',
      educationalData: 'Rich offline educational content available'
    });
    
    return {
      id: `${learningCity.name}-${learningCity.country}`,
      name: learningCity.name,
      nameKo: learningCity.nameKo,
      country: countryInfo.englishName,
      countryCode: countryInfo.code,
      latitude: 0,
      longitude: 0,
    };
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* 혁신적인 헤더 - 프로그램의 독특함 강조 */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 p-8 md:p-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-4 text-6xl animate-pulse">
              <span>🌍</span>
              <span>✈️</span>
              <span>📚</span>
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
                🎓 AI 기반 세계문화 교육 플랫폼
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-blue-100">
                여행 + 교육 = 혁신적인 학습 경험
              </p>
              <p className="text-lg text-purple-100 max-w-3xl mx-auto leading-relaxed">
                🚀 <strong>세계 최초</strong> - 여행 계획과 문화 교육이 통합된 스마트 러닝 시스템으로 
                <br />💡 <strong>80개 도시</strong>의 체계적 문화 데이터와 AI 분석을 통해 
                <br />🎯 <strong>맞춤형 교육</strong>을 제공합니다
              </p>
            </div>
            
            {/* 핵심 특징 하이라이트 */}
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl mb-2">🎯</div>
                <h3 className="font-bold text-lg">맞춤형 학습</h3>
                <p className="text-sm text-blue-100">대륙별·주제별 체계적 분류</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl mb-2">🤖</div>
                <h3 className="font-bold text-lg">AI 문화 분석</h3>
                <p className="text-sm text-blue-100">실시간 정보 + 교육적 해석</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-3xl mb-2">🌐</div>
                <h3 className="font-bold text-lg">글로벌 네트워크</h3>
                <p className="text-sm text-blue-100">80개 도시 문화 데이터베이스</p>
              </div>
            </div>

            {onBack && (
              <Button 
                onClick={onBack}
                variant="outline"
                className="mt-6 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                ← 메인으로 돌아가기
              </Button>
            )}
          </div>
        </div>
        
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl"></div>
      </div>

      {/* 혁신적인 학습 방법 소개 */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* 학습 방법 가이드 */}
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3 text-emerald-800">
              <span className="text-3xl">🎓</span>
              4가지 스마트 학습법
            </CardTitle>
            <p className="text-emerald-700">당신에게 맞는 학습 방식을 선택하세요!</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg border border-emerald-100">
                <span className="text-2xl">📚</span>
                <div>
                  <h4 className="font-bold text-emerald-800">큐레이션 교육</h4>
                  <p className="text-sm text-emerald-600">전문가가 선별한 80개 핵심 도시</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg border border-emerald-100">
                <span className="text-2xl">🌍</span>
                <div>
                  <h4 className="font-bold text-emerald-800">대륙별 탐험</h4>
                  <p className="text-sm text-emerald-600">지리적 맥락으로 체계적 학습</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg border border-emerald-100">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-bold text-emerald-800">주제별 심화</h4>
                  <p className="text-sm text-emerald-600">관심사 기반 맞춤 학습</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/70 rounded-lg border border-emerald-100">
                <span className="text-2xl">🔍</span>
                <div>
                  <h4 className="font-bold text-emerald-800">AI 자유 탐색</h4>
                  <p className="text-sm text-emerald-600">궁금한 도시 즉시 분석</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 학습 성과 미리보기 */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3 text-purple-800">
              <span className="text-3xl">🏆</span>
              학습 성과 미리보기
            </CardTitle>
            <p className="text-purple-700">이런 것들을 배울 수 있어요!</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-4 bg-white/70 rounded-lg border border-purple-100">
                <div className="text-3xl mb-2">🌡️</div>
                <div className="text-sm font-semibold text-purple-800">기후 & 지리</div>
                <div className="text-xs text-purple-600">날씨 패턴 분석</div>
              </div>
              <div className="text-center p-4 bg-white/70 rounded-lg border border-purple-100">
                <div className="text-3xl mb-2">🎭</div>
                <div className="text-sm font-semibold text-purple-800">문화 & 전통</div>
                <div className="text-xs text-purple-600">고유 문화 탐구</div>
              </div>
              <div className="text-center p-4 bg-white/70 rounded-lg border border-purple-100">
                <div className="text-3xl mb-2">🏛️</div>
                <div className="text-sm font-semibold text-purple-800">역사 & 명소</div>
                <div className="text-xs text-purple-600">필수 관광지</div>
              </div>
              <div className="text-center p-4 bg-white/70 rounded-lg border border-purple-100">
                <div className="text-3xl mb-2">🇰🇷</div>
                <div className="text-sm font-semibold text-purple-800">한국과의 관계</div>
                <div className="text-xs text-purple-600">교류 & 접근성</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm font-bold text-orange-800">AI 실시간 분석</div>
              <div className="text-xs text-orange-600">위키피디아 + 교육 DB 융합</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 강화된 선택 영역 */}
      <Card className="border-2 border-blue-200 shadow-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-3 text-blue-800">
              <span className="text-3xl">🚀</span>
              학습 시작하기
            </CardTitle>
            <Badge variant="secondary" className="text-lg px-4 py-2 bg-blue-100 text-blue-800">
              {EDUCATIONAL_CITIES.length}개 도시 준비완료
            </Badge>
          </div>
          <p className="text-blue-700 mt-2">
            원하는 학습 방식을 선택하고 세계 문화 여행을 시작하세요!
          </p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'database' | 'continent' | 'theme' | 'search')}>
            <TabsList className="grid w-full grid-cols-4 h-16 bg-white/70 backdrop-blur-sm border border-blue-200">
              <TabsTrigger value="database" className="flex flex-col items-center gap-1 h-14 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                <span className="text-lg">📚</span>
                <span className="text-sm font-medium">교육 도시</span>
              </TabsTrigger>
              <TabsTrigger value="continent" className="flex flex-col items-center gap-1 h-14 data-[state=active]:bg-emerald-500 data-[state=active]:text-white">
                <span className="text-lg">🌍</span>
                <span className="text-sm font-medium">대륙별</span>
              </TabsTrigger>
              <TabsTrigger value="theme" className="flex flex-col items-center gap-1 h-14 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                <span className="text-lg">🎯</span>
                <span className="text-sm font-medium">주제별</span>
              </TabsTrigger>
              <TabsTrigger value="search" className="flex flex-col items-center gap-1 h-14 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                <span className="text-lg">🔍</span>
                <span className="text-sm font-medium">AI 검색</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="database" className="space-y-6 mt-6">
              <div className="grid gap-6">
                {/* 교육 콘텐츠 강조 */}
                <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-200 rounded-xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">💎</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-emerald-800 mb-2">🎓 프리미엄 교육 도시 컬렉션</h3>
                      <p className="text-emerald-700 mb-3">
                        교육 전문가가 엄선한 <strong>80개 글로벌 도시</strong>의 체계적인 문화 학습 콘텐츠를 제공합니다.
                      </p>
                      <div className="grid md:grid-cols-3 gap-3 mt-4">
                        <div className="bg-white/70 border border-emerald-100 rounded-lg p-3 text-center">
                          <div className="text-2xl mb-1">📊</div>
                          <div className="text-sm font-semibold text-emerald-800">체계적 분류</div>
                          <div className="text-xs text-emerald-600">지리·문화·역사·관계</div>
                        </div>
                        <div className="bg-white/70 border border-emerald-100 rounded-lg p-3 text-center">
                          <div className="text-2xl mb-1">✨</div>
                          <div className="text-sm font-semibold text-emerald-800">고품질 정보</div>
                          <div className="text-xs text-emerald-600">전문가 검증 완료</div>
                        </div>
                        <div className="bg-white/70 border border-emerald-100 rounded-lg p-3 text-center">
                          <div className="text-2xl mb-1">⚡</div>
                          <div className="text-sm font-semibold text-emerald-800">즉시 학습</div>
                          <div className="text-xs text-emerald-600">클릭 한 번으로 시작</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 도시 선택 그리드 - 향상된 디자인 */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-800">🌟 학습 가능한 도시들</h4>
                    <div className="text-sm text-gray-600">
                      총 <span className="font-bold text-blue-600">{EDUCATIONAL_CITIES.length}개</span> 도시
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {EDUCATIONAL_CITIES.map((city) => {
                      const learningCity: LearningCity = {
                        name: city.name,
                        nameKo: city.nameKo,
                        country: city.countryKo
                      };
                      const isSelected = selectedCity?.name === city.name;
                      return (
                        <Button
                          key={city.name}
                          onClick={() => handleCitySelect(learningCity)}
                          variant={isSelected ? "default" : "outline"}
                          className={`h-auto p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-md ${
                            isSelected 
                              ? "bg-blue-500 text-white border-blue-500 shadow-lg" 
                              : "hover:border-blue-300 hover:bg-blue-50"
                          }`}
                        >
                          <span className="text-sm font-bold">{city.nameKo}</span>
                          <span className="text-xs opacity-70">{city.countryKo}</span>
                          {isSelected && <span className="text-xs">✅ 선택됨</span>}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="continent" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.keys(CITIES_BY_CONTINENT).map((continent) => (
                    <Button
                      key={continent}
                      onClick={() => {
                        setSelectedContinent(continent);
                        setSelectedTheme('');
                      }}
                      variant={selectedContinent === continent ? "default" : "outline"}
                      className="h-auto p-4 flex flex-col items-center gap-2"
                    >
                      <span className="text-2xl">{CONTINENT_EMOJIS[continent]}</span>
                      <span className="text-sm font-medium">{continent}</span>
                      <span className="text-xs text-gray-500">
                        {getCitiesByContinent(continent).length}개 도시
                      </span>
                    </Button>
                  ))}
                </div>
                
                {selectedContinent && (
                  <Card className="border border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-3">
                        <span className="text-2xl">{CONTINENT_EMOJIS[selectedContinent]}</span>
                        {selectedContinent} 지역 도시들
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {getCitiesByContinent(selectedContinent).map((cityName) => {
                          const cityData = EDUCATIONAL_CITIES.find(c => c.name === cityName);
                          if (!cityData) return null;
                          const learningCity: LearningCity = {
                            name: cityData.name,
                            nameKo: cityData.nameKo,
                            country: cityData.countryKo
                          };
                          return (
                            <Button
                              key={cityName}
                              onClick={() => handleCitySelect(learningCity)}
                              variant={selectedCity?.name === cityName ? "default" : "outline"}
                              className="h-auto p-3 flex flex-col items-center gap-1"
                            >
                              <span className="text-sm font-medium">{cityData.nameKo}</span>
                              <span className="text-xs text-gray-500">{cityData.countryKo}</span>
                            </Button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="theme" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.keys(CITIES_BY_THEME).map((theme) => (
                    <Button
                      key={theme}
                      onClick={() => {
                        setSelectedTheme(theme);
                        setSelectedContinent('');
                      }}
                      variant={selectedTheme === theme ? "default" : "outline"}
                      className="h-auto p-4 flex flex-col items-center gap-2"
                    >
                      <span className="text-2xl">{THEME_EMOJIS[theme] || '🏙️'}</span>
                      <span className="text-sm font-medium text-center">{theme}</span>
                      <span className="text-xs text-gray-500">
                        {getCitiesByTheme(theme).length}개 도시
                      </span>
                    </Button>
                  ))}
                </div>
                
                {selectedTheme && (
                  <Card className="border border-purple-200 bg-purple-50">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-3">
                        <span className="text-2xl">{THEME_EMOJIS[selectedTheme] || '🏙️'}</span>
                        {selectedTheme} 관련 도시들
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {getCitiesByTheme(selectedTheme).map((cityName) => {
                          const cityData = EDUCATIONAL_CITIES.find(c => c.name === cityName);
                          if (!cityData) return null;
                          const learningCity: LearningCity = {
                            name: cityData.name,
                            nameKo: cityData.nameKo,
                            country: cityData.countryKo
                          };
                          return (
                            <Button
                              key={cityName}
                              onClick={() => handleCitySelect(learningCity)}
                              variant={selectedCity?.name === cityName ? "default" : "outline"}
                              className="h-auto p-3 flex flex-col items-center gap-1"
                            >
                              <span className="text-sm font-medium">{cityData.nameKo}</span>
                              <span className="text-xs text-gray-500">{cityData.countryKo}</span>
                            </Button>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="search" className="space-y-6 mt-6">
              {/* AI 검색 특징 강조 */}
              <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🤖</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-orange-800 mb-2">🔍 AI 기반 자유 탐색</h3>
                    <p className="text-orange-700 mb-3">
                      <strong>전 세계 어떤 도시든</strong> 입력하면 AI가 실시간으로 문화 정보를 분석하여 교육적 콘텐츠를 생성합니다.
                    </p>
                    <div className="grid md:grid-cols-2 gap-3 mt-4">
                      <div className="bg-white/70 border border-orange-100 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">🌐</span>
                          <span className="text-sm font-semibold text-orange-800">실시간 검색</span>
                        </div>
                        <div className="text-xs text-orange-600">위키피디아 + AI 분석</div>
                      </div>
                      <div className="bg-white/70 border border-orange-100 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl">⚡</span>
                          <span className="text-sm font-semibold text-orange-800">즉시 생성</span>
                        </div>
                        <div className="text-xs text-orange-600">3초 내 결과 제공</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="border-2 border-orange-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">🌍 전 세계 도시 검색</h4>
                      <p className="text-sm text-gray-600">궁금한 도시 이름을 입력하고 AI 문화 분석을 받아보세요!</p>
                    </div>
                    
                    <form onSubmit={handleSearch} className="flex gap-3">
                      <Input
                        placeholder="예: 서울, New York, Paris, Mumbai, Cairo, 상파울루..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 text-lg h-12 border-2 border-orange-200 focus:border-orange-400"
                      />
                      <Button 
                        type="submit" 
                        disabled={!searchQuery.trim()}
                        className="h-12 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold"
                      >
                        🔍 AI 분석
                      </Button>
                    </form>
                    
                    {/* 검색 제안 */}
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-600 mb-3">💡 인기 검색어:</p>
                      <div className="flex flex-wrap gap-2">
                        {['뉴욕', '런던', '카이로', '리우데자네이루', '뭄바이', '이스탄불', '시드니', '방콕'].map((suggestion) => (
                          <Button
                            key={suggestion}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSearchQuery(suggestion);
                              const newCity: LearningCity = {
                                name: suggestion,
                                nameKo: suggestion,
                                country: '전 세계'
                              };
                              setCustomCity(newCity);
                              setSelectedCity(newCity);
                            }}
                            className="text-xs hover:bg-orange-100 hover:border-orange-300"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {searchQuery && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-700">검색 결과:</h4>
                      {(() => {
                        const results = searchInEducationalDatabase(searchQuery);
                        if (results.length > 0) {
                          return (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {results.map((city) => {
                                const learningCity: LearningCity = {
                                  name: city.name,
                                  nameKo: city.nameKo,
                                  country: city.countryKo
                                };
                                return (
                                  <Button
                                    key={city.name}
                                    onClick={() => {
                                      handleCitySelect(learningCity);
                                      setCustomCity(null);
                                    }}
                                    variant={selectedCity?.name === city.name ? "default" : "outline"}
                                    className="h-auto p-3 flex flex-col items-center gap-1"
                                  >
                                    <span className="text-sm font-medium">{city.nameKo}</span>
                                    <span className="text-xs text-gray-500">{city.countryKo}</span>
                                  </Button>
                                );
                              })}
                            </div>
                          );
                        } else {
                          return (
                            <div className="text-center py-8">
                              <div className="text-4xl mb-2">🤔</div>
                              <p className="text-gray-500">검색 결과가 없습니다.</p>
                              <p className="text-sm text-gray-400 mt-1">
                                교육 데이터베이스에 등록된 도시를 검색해보세요.
                              </p>
                              <Button
                                onClick={() => {
                                  const newCity: LearningCity = {
                                    name: searchQuery.trim(),
                                    nameKo: searchQuery.trim(),
                                    country: '전 세계'
                                  };
                                  setCustomCity(newCity);
                                  setSelectedCity(newCity);
                                }}
                                variant="outline"
                                className="mt-3"
                              >
                                📍 "{searchQuery}" 일반 검색으로 시도하기
                              </Button>
                            </div>
                          );
                        }
                      })()}
                    </div>
                  )}
                  
                  {customCity && (
                    <div className="mt-4">
                      <Badge variant="secondary" className="text-lg py-2 px-4">
                        📍 일반 검색 결과: {customCity.nameKo}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-2">
                        교육 데이터베이스에 없는 도시입니다. 일반적인 정보를 제공합니다.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 강화된 학습 가이드 */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200 rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            💡 스마트 학습 가이드
          </h3>
          <p className="text-lg text-gray-700">각 도시를 선택하면 4개 탭으로 체계적인 문화 학습이 시작됩니다!</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 개요 탭 */}
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-200 rounded-xl p-6 hover:scale-105 transition-transform duration-200 shadow-lg">
            <div className="text-center">
              <div className="text-4xl mb-3">🌍</div>
              <h4 className="text-lg font-bold text-green-800 mb-3">개요 & 지리</h4>
              <div className="space-y-2 text-sm text-green-700">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">📍</span>
                  <span>지리적 위치와 특성</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">🌡️</span>
                  <span>기후 조건과 날씨</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">📅</span>
                  <span>최적 여행 시기</span>
                </div>
              </div>
            </div>
          </div>

          {/* 문화 탭 */}
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-200 rounded-xl p-6 hover:scale-105 transition-transform duration-200 shadow-lg">
            <div className="text-center">
              <div className="text-4xl mb-3">🎭</div>
              <h4 className="text-lg font-bold text-purple-800 mb-3">문화 & 전통</h4>
              <div className="space-y-2 text-sm text-purple-700">
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">🏛️</span>
                  <span>문화적 특색과 전통</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">⭐</span>
                  <span>유명한 것들과 명소</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-600">🍽️</span>
                  <span>현지 음식과 축제</span>
                </div>
              </div>
            </div>
          </div>

          {/* 여행정보 탭 */}
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 border-2 border-blue-200 rounded-xl p-6 hover:scale-105 transition-transform duration-200 shadow-lg">
            <div className="text-center">
              <div className="text-4xl mb-3">✈️</div>
              <h4 className="text-lg font-bold text-blue-800 mb-3">여행 정보</h4>
              <div className="space-y-2 text-sm text-blue-700">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">🎯</span>
                  <span>필수 방문지 명소</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">💰</span>
                  <span>통화와 언어 정보</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">💡</span>
                  <span>실용적인 여행 팁</span>
                </div>
              </div>
            </div>
          </div>

          {/* 한국관계 탭 */}
          <div className="bg-gradient-to-br from-red-100 to-rose-100 border-2 border-red-200 rounded-xl p-6 hover:scale-105 transition-transform duration-200 shadow-lg">
            <div className="text-center">
              <div className="text-4xl mb-3">🇰🇷</div>
              <h4 className="text-lg font-bold text-red-800 mb-3">한국과의 관계</h4>
              <div className="space-y-2 text-sm text-red-700">
                <div className="flex items-center gap-2">
                  <span className="text-red-600">🤝</span>
                  <span>교류와 외교관계</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-600">🛫</span>
                  <span>한국에서의 접근성</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-600">📚</span>
                  <span>교육적 가치와 의미</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 추가 특징 */}
        <div className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl">⚡</div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-orange-800 mb-2">🚀 특별한 학습 경험</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 text-orange-700">
                  <span className="text-orange-600">🤖</span>
                  <span><strong>AI 증강 정보:</strong> 실시간 데이터 + 교육적 해석</span>
                </div>
                <div className="flex items-center gap-2 text-orange-700">
                  <span className="text-orange-600">🎯</span>
                  <span><strong>맞춤형 학습:</strong> 한국인 관점 특화 콘텐츠</span>
                </div>
                <div className="flex items-center gap-2 text-orange-700">
                  <span className="text-orange-600">📊</span>
                  <span><strong>체계적 분류:</strong> 4단계 구조화된 정보</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 선택된 도시 정보 */}
      {selectedCity && (
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-3">
                <span className="text-2xl">📖</span>
                선택된 학습 도시: {selectedCity.nameKo} 
                {selectedCity.country !== '전 세계' && (
                  <Badge variant="outline" className="ml-2">
                    {selectedCity.country}
                  </Badge>
                )}
              </CardTitle>
              <p className="text-gray-600">
                아래에서 자세한 문화 정보를 탐색해보세요!
              </p>
            </CardHeader>
          </Card>

          {/* 디버깅 정보 표시 */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <p className="text-sm text-blue-700">
                🔍 검색 정보: {selectedCity.name} ({selectedCity.country})
              </p>
              <p className="text-xs text-blue-600 mt-1">
                {EDUCATIONAL_CITIES.find(c => c.name === selectedCity.name) 
                  ? "교육 데이터베이스에서 풍부한 문화 자료를 불러왔습니다!" 
                  : "일반 정보를 바탕으로 교육적 자료를 생성하는 중입니다..."
                }
              </p>
            </CardContent>
          </Card>

          <DestinationInfoCard 
            city={convertToCity(selectedCity)} 
            isExpanded={true}
          />
        </div>
      )}

      {/* 선택된 도시가 없을 때 매력적인 안내 */}
      {!selectedCity && (
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 border-3 border-dashed border-blue-300 rounded-3xl shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-purple-100/30"></div>
          <div className="relative z-10 text-center py-16 px-8">
            <div className="space-y-6">
              <div className="animate-bounce">
                <div className="text-8xl mb-4">🚀</div>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  🌟 세계 문화 여행을 시작하세요!
                </h3>
                <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                  위의 <strong>4가지 학습 방법</strong> 중 하나를 선택하여 
                  <br />원하는 도시의 상세한 문화 정보를 탐험해보세요
                </p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
                <div className="bg-white/70 backdrop-blur-sm border border-blue-200 rounded-xl p-4 hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">📚</div>
                  <div className="text-sm font-semibold text-blue-800">큐레이션 교육</div>
                  <div className="text-xs text-blue-600">{EDUCATIONAL_CITIES.length}개 핵심 도시</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-xl p-4 hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">🌍</div>
                  <div className="text-sm font-semibold text-emerald-800">대륙별 탐험</div>
                  <div className="text-xs text-emerald-600">6개 대륙 체계 학습</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm border border-purple-200 rounded-xl p-4 hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-sm font-semibold text-purple-800">주제별 심화</div>
                  <div className="text-xs text-purple-600">12개 테마 분류</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm border border-orange-200 rounded-xl p-4 hover:scale-105 transition-transform">
                  <div className="text-3xl mb-2">🔍</div>
                  <div className="text-sm font-semibold text-orange-800">AI 자유 탐색</div>
                  <div className="text-xs text-orange-600">실시간 분석 생성</div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-xl p-4 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">💡</span>
                  <span className="text-sm font-medium text-orange-800">
                    <strong>팁:</strong> 각 도시마다 4개 탭(개요·문화·여행정보·한국관계)으로 체계적 학습 가능!
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 배경 장식 */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-blue-300/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-4 left-4 w-32 h-32 bg-purple-300/20 rounded-full blur-3xl"></div>
        </div>
      )}
    </div>
  );
}