'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Sparkles, 
  Globe, 
  BookOpen,
  Lightbulb,
  MapPin,
  Info,
  TrendingUp
} from 'lucide-react';

interface AISearchResult {
  city: string;
  country: string;
  summary: string;
  basicInfo: {
    population: string;
    area: string;
  };
  highlights: string[];
  culturalInfo: {
    language: string;
    currency: string;
    bestTimeToVisit: string;
    timezone: string;
    religion: string;
    foodCulture: string;
    famousFor: string[];
  };
  travelTips: string[];
  learningPoints: string[];
  recommendedActivities: string[];
}

interface SimpleCulturalLearningProps {
  onBack: () => void;
}

const SimpleCulturalLearning: React.FC<SimpleCulturalLearningProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [searchResult, setSearchResult] = useState<AISearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 인기 도시 목록
  const popularCities = [
    { name: 'Tokyo', nameKo: '도쿄', emoji: '🗾' },
    { name: 'Paris', nameKo: '파리', emoji: '🗼' },
    { name: 'New York', nameKo: '뉴욕', emoji: '🗽' },
    { name: 'Bangkok', nameKo: '방콕', emoji: '🏛️' },
    { name: 'London', nameKo: '런던', emoji: '🎡' },
    { name: 'Sydney', nameKo: '시드니', emoji: '🦘' },
    { name: 'Rome', nameKo: '로마', emoji: '🏛️' },
    { name: 'Dubai', nameKo: '두바이', emoji: '🏝️' },
  ];

  const handleSearch = async (city: string) => {
    if (!city.trim()) return;

    setIsLoading(true);
    setSelectedCity(city);

    try {
      const response = await fetch('/api/gemini/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ city }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResult(data);
      } else {
        // Mock 데이터 사용 (API 실패 시)
        setSearchResult(getMockData(city));
      }
    } catch (error) {
      console.error('검색 오류:', error);
      // Mock 데이터 사용
      setSearchResult(getMockData(city));
    } finally {
      setIsLoading(false);
    }
  };

  const getMockData = (city: string): AISearchResult => {
    const mockData: Record<string, AISearchResult> = {
      'Tokyo': {
        city: 'Tokyo',
        country: '일본',
        summary: '도쿄는 일본의 수도이자 세계에서 가장 큰 메트로폴리탄 지역 중 하나입니다. 전통과 현대가 조화롭게 공존하는 도시입니다.',
        basicInfo: {
          population: '약 1,400만명',
          area: '2,194km²'
        },
        highlights: [
          '세계 최대 규모의 도시권',
          '전통과 현대의 완벽한 조화',
          '미슐랭 스타 레스토랑의 천국'
        ],
        culturalInfo: {
          language: '일본어',
          currency: '엔(¥)',
          bestTimeToVisit: '봄(3-5월), 가을(9-11월)',
          timezone: 'UTC+9 (한국과 동일)',
          religion: '신토, 불교',
          foodCulture: '스시, 라멘, 덴푸라 등 정교한 요리 문화',
          famousFor: ['스시', '라멘', '벚꽃', '아니메']
        },
        travelTips: [
          '교통카드(Suica/Pasmo)를 구매하세요',
          '실내에서는 신발을 벗는 것이 예의입니다',
          '팁 문화가 없으니 팁을 주지 마세요'
        ],
        recommendedActivities: [
          '센소지 절에서 전통 문화 체험하기',
          '시부야 스크램블 교차로 건너기',
          '츠키지 시장에서 신선한 스시 맛보기'
        ],
        learningPoints: [
          '일본의 예절 문화 이해하기',
          '간단한 일본어 인사말 배우기',
          '젓가락 사용법 익히기'
        ]
      },
      'Paris': {
        city: 'Paris',
        country: '프랑스',
        summary: '파리는 예술과 낭만의 도시로, 에펠탑과 루브르 박물관 등 세계적인 명소가 가득합니다.',
        basicInfo: {
          population: '약 220만명',
          area: '105km²'
        },
        highlights: [
          '세계 예술과 문화의 중심지',
          '미식의 천국',
          '낭만적인 도시 풍경'
        ],
        culturalInfo: {
          language: '프랑스어',
          currency: '유로(€)',
          bestTimeToVisit: '봄(4-6월), 초가을(9-10월)',
          timezone: 'UTC+1 (한국보다 8시간 늦음)',
          religion: '가톨릭',
          foodCulture: '세계 최고 수준의 요리와 와인 문화',
          famousFor: ['에펠탑', '루브르', '크루아상', '와인']
        },
        travelTips: [
          '박물관 패스를 구매하면 줄을 서지 않아도 됩니다',
          '간단한 프랑스어 인사를 하면 더 친절한 대접을 받습니다',
          '일요일에는 많은 상점이 문을 닫습니다'
        ],
        recommendedActivities: [
          '에펠탑에서 야경 감상하기',
          '루브르 박물관에서 모나리자 보기',
          '센강에서 유람선 타기'
        ],
        learningPoints: [
          '프랑스 예술사 이해하기',
          '프랑스 요리 문화 배우기',
          '기본 프랑스어 표현 익히기'
        ]
      }
    };

    return mockData[city] || {
      city,
      country: '정보 없음',
      summary: `${city}는 매력적인 여행지입니다.`,
      basicInfo: {
        population: '정보 없음',
        area: '정보 없음'
      },
      highlights: ['역사적 명소', '현지 문화', '맛있는 음식'],
      culturalInfo: {
        language: '현지 언어',
        currency: '현지 통화',
        bestTimeToVisit: '봄, 가을',
        timezone: '정보 없음',
        religion: '다양한 종교',
        foodCulture: '현지 특색 음식',
        famousFor: ['관광 명소', '전통 음식', '문화 체험']
      },
      travelTips: ['현지 문화를 존중하세요', '기본 인사말을 배우세요', '교통 패스를 활용하세요'],
      recommendedActivities: ['가족 친화적 활동', '문화 체험', '교육적 견학'],
      learningPoints: ['현지 역사 이해하기', '전통 문화 체험하기', '언어 기초 배우기']
    };
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-yellow-500" />
            AI 세계문화 탐색
          </h1>
          <Button onClick={onBack} variant="outline">
            ← 돌아가기
          </Button>
        </div>
        <p className="text-gray-600">
          AI가 도와주는 스마트한 세계 문화 학습
        </p>
      </div>

      {/* 검색 섹션 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            도시 검색
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="도시 이름을 입력하세요 (예: Tokyo, Paris, New York)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
            />
            <Button 
              onClick={() => handleSearch(searchQuery)}
              disabled={isLoading}
            >
              {isLoading ? '검색 중...' : 'AI 검색'}
            </Button>
          </div>

          {/* 인기 도시 퀵 버튼 */}
          <div className="flex flex-wrap gap-2">
            {popularCities.map((city) => (
              <Button
                key={city.name}
                variant="outline"
                size="sm"
                onClick={() => handleSearch(city.name)}
                className="hover:scale-105 transition-transform"
              >
                {city.emoji} {city.nameKo}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 검색 결과 */}
      {searchResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {searchResult.city}
              </span>
              <Badge variant="secondary">{searchResult.country}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* 요약 */}
            <div className="mb-6">
              <p className="text-gray-700">{searchResult.summary}</p>
            </div>

            {/* 탭 콘텐츠 */}
            <Tabs defaultValue="highlights" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="highlights">하이라이트</TabsTrigger>
                <TabsTrigger value="culture">문화 정보</TabsTrigger>
                <TabsTrigger value="tips">여행 팁</TabsTrigger>
                <TabsTrigger value="activities">추천 활동</TabsTrigger>
                <TabsTrigger value="learning">학습 포인트</TabsTrigger>
              </TabsList>

              <TabsContent value="highlights" className="mt-4">
                <div className="space-y-2">
                  {searchResult.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5" />
                      <p>{highlight}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="culture" className="mt-4">
                <div className="space-y-4">
                  {/* 기본 정보 섹션 */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-semibold mb-1 text-blue-800">인구</p>
                      <p className="text-blue-700">{searchResult.basicInfo.population}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1 text-blue-800">면적</p>
                      <p className="text-blue-700">{searchResult.basicInfo.area}</p>
                    </div>
                  </div>

                  {/* 문화 정보 섹션 */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold mb-1">언어</p>
                      <p className="text-gray-600">{searchResult.culturalInfo.language}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">화폐</p>
                      <p className="text-gray-600">{searchResult.culturalInfo.currency}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">시차</p>
                      <p className="text-gray-600">{searchResult.culturalInfo.timezone}</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">종교</p>
                      <p className="text-gray-600">{searchResult.culturalInfo.religion}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold mb-1">최적 여행 시기</p>
                      <p className="text-gray-600">{searchResult.culturalInfo.bestTimeToVisit}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold mb-1">음식 문화</p>
                      <p className="text-gray-600">{searchResult.culturalInfo.foodCulture}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold mb-2">유명한 것들</p>
                      <div className="flex flex-wrap gap-2">
                        {searchResult.culturalInfo.famousFor.map((item, index) => (
                          <Badge key={index} variant="outline">{item}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tips" className="mt-4">
                <div className="space-y-3">
                  {searchResult.travelTips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5" />
                      <p>{tip}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="activities" className="mt-4">
                <div className="space-y-3">
                  {searchResult.recommendedActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Globe className="w-5 h-5 text-purple-500 mt-0.5" />
                      <p>{activity}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="learning" className="mt-4">
                <div className="space-y-3">
                  {searchResult.learningPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <BookOpen className="w-5 h-5 text-green-500 mt-0.5" />
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SimpleCulturalLearning;