'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WikipediaService, DestinationInfo } from '@/services/wikipediaService';
import { City } from '@/types';

interface DestinationInfoCardProps {
  city: City;
  isExpanded?: boolean;
}

export const DestinationInfoCard: React.FC<DestinationInfoCardProps> = ({ 
  city, 
  isExpanded = false 
}) => {
  const [info, setInfo] = useState<DestinationInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDestinationInfo();
  }, [city]);

  const loadDestinationInfo = async () => {
    setLoading(true);
    try {
      const data = await WikipediaService.getDestinationInfo(city.name, city.country);
      setInfo(data);
    } catch (error) {
      console.error('Failed to load destination info:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </CardContent>
      </Card>
    );
  }

  if (!info) return null;

  return (
    <Card className="border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="text-2xl flex items-center gap-3">
          <span className="text-3xl">📍</span>
          {city.nameKo} ({city.name})
        </CardTitle>
        <div className="flex gap-2 mt-2">
          <Badge variant="secondary">🌍 {city.country}</Badge>
          {info.population && <Badge variant="outline">👥 {info.population}</Badge>}
          {info.timezone && <Badge variant="outline">🕐 {info.timezone}</Badge>}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* 도시 요약 정보 */}
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">{info.summary}</p>
        </div>

        {isExpanded ? (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">🌟 개요</TabsTrigger>
              <TabsTrigger value="culture">🎭 문화</TabsTrigger>
              <TabsTrigger value="travel">✈️ 여행정보</TabsTrigger>
              <TabsTrigger value="korea">🇰🇷 한국관계</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              {info.geography && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-900">🗺️ 지리적 특성</h4>
                  <p className="text-sm text-gray-700">{info.geography}</p>
                </div>
              )}
              
              {info.climate && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-green-900">🌤️ 기후 조건</h4>
                  <p className="text-sm text-gray-700">{info.climate}</p>
                </div>
              )}

              {info.bestSeasons && info.bestSeasons.length > 0 && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-yellow-900">📅 최적 여행 시기</h4>
                  <div className="flex flex-wrap gap-2">
                    {info.bestSeasons.map((season, idx) => (
                      <Badge key={idx} className="bg-yellow-200 text-yellow-900">
                        {season}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="culture" className="space-y-4 mt-4">
              {info.culture && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-purple-900">🎨 문화적 특색</h4>
                  <p className="text-sm text-gray-700">{info.culture}</p>
                </div>
              )}

              {info.famousFor && info.famousFor.length > 0 && (
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-pink-900">⭐ 유명한 것들</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {info.famousFor.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-pink-500">▸</span>
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {info.localFood && info.localFood.length > 0 && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-orange-900">🍴 현지 음식</h4>
                  <div className="flex flex-wrap gap-2">
                    {info.localFood.map((food, idx) => (
                      <Badge key={idx} variant="outline" className="border-orange-300">
                        {food}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {info.festivals && info.festivals.length > 0 && (
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-red-900">🎉 주요 축제</h4>
                  <div className="space-y-1">
                    {info.festivals.map((festival, idx) => (
                      <p key={idx} className="text-sm text-gray-700">• {festival}</p>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="travel" className="space-y-4 mt-4">
              {info.mustVisit && info.mustVisit.length > 0 && (
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-indigo-900">📸 필수 방문지</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {info.mustVisit.map((place, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-indigo-500">📍</span>
                        <span className="text-sm">{place}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {info.currency && (
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-teal-900">💰 통화</h4>
                  <p className="text-sm text-gray-700">{info.currency}</p>
                </div>
              )}

              {info.language && info.language.length > 0 && (
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-cyan-900">🗣️ 언어</h4>
                  <p className="text-sm text-gray-700">{info.language.join(', ')}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="korea" className="space-y-4 mt-4">
              {info.relationWithKorea && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-blue-900">🤝 대한민국과의 관계</h4>
                  <p className="text-sm text-gray-700">{info.relationWithKorea}</p>
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-gray-900">✈️ 교통 정보</h4>
                <p className="text-sm text-gray-700">
                  서울에서 {city.nameKo}까지의 이동 정보와 비자 요건 등을 확인하세요.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-green-900">📚 교육적 가치</h4>
                <p className="text-sm text-gray-700">
                  {city.nameKo} 여행을 통해 다른 문화를 체험하고, 글로벌 시민의식을 함양할 수 있습니다.
                  현지 문화와 한국 문화를 비교하며 다양성을 이해하는 기회가 됩니다.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          // 간단한 정보만 표시
          <div className="space-y-3">
            {info.bestSeasons && info.bestSeasons.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-semibold">여행 추천 시기:</span>
                <div className="flex gap-1">
                  {info.bestSeasons.slice(0, 2).map((season, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {season}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {info.famousFor && info.famousFor.length > 0 && (
              <div className="flex items-start gap-2">
                <span className="text-gray-600 font-semibold">유명:</span>
                <span className="text-sm text-gray-700">
                  {info.famousFor.slice(0, 3).join(', ')}
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};