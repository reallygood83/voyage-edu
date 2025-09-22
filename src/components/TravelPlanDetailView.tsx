'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Heart, 
  Eye, 
  Share2, 
  Calendar, 
  MapPin, 
  Plane, 
  Clock, 
  DollarSign,
  Users,
  Star,
  ArrowLeft,
  Hotel,
  UtensilsCrossed,
  Camera,
  Download,
  Bookmark
} from 'lucide-react';
import { TravelPlan } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CommunityPlan extends TravelPlan {
  id: string;
  author: string;
  likes: number;
  views: number;
  isLiked: boolean;
  rating: number;
  createdAt: string;
  tags: string[];
}

interface TravelPlanDetailViewProps {
  plan: CommunityPlan;
  onBack: () => void;
  onLike: (planId: string) => void;
  onShare: (planId: string) => void;
}

export default function TravelPlanDetailView({ 
  plan, 
  onBack, 
  onLike, 
  onShare 
}: TravelPlanDetailViewProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeImageTab, setActiveImageTab] = useState('itinerary');

  // 여행 일수 계산
  const getTripDays = () => {
    const start = new Date(plan.startDate);
    const end = new Date(plan.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 가격 포맷팅
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW'
    }).format(price);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleDownloadPlan = () => {
    const planData = {
      title: plan.title,
      cities: plan.cities,
      duration: `${getTripDays()}일`,
      dates: `${formatDate(plan.startDate)} - ${formatDate(plan.endDate)}`,
      budget: plan.totalBudget ? formatPrice(plan.totalBudget) : 'N/A',
      travelers: plan.travelers || 2,
      author: plan.author,
      tags: plan.tags,
      downloadDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(planData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${plan.title}_여행계획.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* 헤더 영역 */}
      <div className="flex items-start justify-between mb-6">
        <Button 
          onClick={onBack}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          커뮤니티로 돌아가기
        </Button>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleBookmark}
            className={isBookmarked ? "bg-yellow-50 border-yellow-300" : ""}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-yellow-400 text-yellow-400" : ""}`} />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDownloadPlan}
          >
            <Download className="w-4 h-4" />
            계획 다운로드
          </Button>
        </div>
      </div>

      {/* 메인 정보 카드 */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-10"></div>
        <CardHeader className="relative z-10 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                {plan.title}
              </CardTitle>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">여행지</p>
                    <p className="text-lg">{plan.cities?.join(' → ') || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">기간</p>
                    <p className="text-lg">{getTripDays()}일</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">인원</p>
                    <p className="text-lg">{plan.travelers || 2}명</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">예산</p>
                    <p className="text-lg font-semibold">
                      {plan.totalBudget ? formatPrice(plan.totalBudget) : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 작성자 정보 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                      {plan.author.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">{plan.author}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(plan.createdAt)} 작성
                    </p>
                  </div>
                </div>

                {/* 평점 */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${
                        i < Math.floor(plan.rating) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="ml-2 text-lg font-semibold">{plan.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-2 mt-4">
            {plan.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent className="relative z-10">
          {/* 상호작용 버튼 */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onLike(plan.id)}
                className={`flex items-center gap-2 ${plan.isLiked ? 'text-red-500' : 'text-gray-600'}`}
              >
                <Heart className={`w-5 h-5 ${plan.isLiked ? 'fill-red-500' : ''}`} />
                <span className="font-medium">{plan.likes}</span>
              </Button>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Eye className="w-5 h-5" />
                <span className="font-medium">{plan.views}</span>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onShare(plan.id)}
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              공유하기
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 상세 여행 정보 탭 */}
      <Card>
        <CardContent className="p-6">
          <Tabs value={activeImageTab} onValueChange={setActiveImageTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="itinerary" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                상세 일정
              </TabsTrigger>
              <TabsTrigger value="flight" className="flex items-center gap-2">
                <Plane className="w-4 h-4" />
                항공편
              </TabsTrigger>
              <TabsTrigger value="hotel" className="flex items-center gap-2">
                <Hotel className="w-4 h-4" />
                숙박
              </TabsTrigger>
              <TabsTrigger value="activities" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                활동
              </TabsTrigger>
            </TabsList>

            <TabsContent value="itinerary" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">📅 일정표</h3>
                
                {plan.dailySchedules && plan.dailySchedules.length > 0 ? (
                  <div className="space-y-4">
                    {plan.dailySchedules.map((schedule, dayIndex) => (
                      <Card key={dayIndex} className="border border-blue-200 bg-blue-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-blue-800 mb-3">
                            Day {dayIndex + 1} - {schedule.date}
                          </h4>
                          <div className="space-y-2">
                            {schedule.activities.map((activity, actIndex) => (
                              <div 
                                key={actIndex} 
                                className="flex items-start gap-3 p-3 bg-white rounded-lg border border-blue-100"
                              >
                                <div className="text-blue-600 font-medium min-w-[60px]">
                                  {activity.time}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium">{activity.activity}</p>
                                  <p className="text-sm text-gray-600">{activity.location}</p>
                                  {activity.cost && (
                                    <p className="text-sm text-green-600 font-medium">
                                      {formatPrice(activity.cost)}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">상세 일정 정보가 없습니다.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="flight" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">✈️ 항공편 정보</h3>
                
                {plan.selectedFlight ? (
                  <Card className="border border-green-200 bg-green-50">
                    <CardContent className="p-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-green-800 mb-2">출발편</h4>
                          <div className="space-y-1 text-sm">
                            <p><strong>항공사:</strong> {plan.selectedFlight.airline}</p>
                            <p><strong>출발:</strong> {plan.selectedFlight.departureTime}</p>
                            <p><strong>도착:</strong> {plan.selectedFlight.arrivalTime}</p>
                            <p><strong>가격:</strong> {formatPrice(plan.selectedFlight.price)}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-800 mb-2">여행 날짜</h4>
                          <div className="space-y-1 text-sm">
                            <p><strong>출발일:</strong> {formatDate(plan.startDate)}</p>
                            <p><strong>귀국일:</strong> {formatDate(plan.endDate)}</p>
                            <p><strong>여행 기간:</strong> {getTripDays()}일</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center py-8">
                    <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">항공편 정보가 없습니다.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="hotel" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">🏨 숙박 정보</h3>
                
                {plan.selectedHotels && Object.keys(plan.selectedHotels).length > 0 ? (
                  <div className="grid gap-4">
                    {Object.entries(plan.selectedHotels).map(([cityName, hotel]) => (
                      <Card key={cityName} className="border border-purple-200 bg-purple-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">
                            📍 {cityName}
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p><strong>호텔명:</strong> {hotel.name}</p>
                              <p><strong>등급:</strong> ⭐ {hotel.rating}</p>
                              <p><strong>위치:</strong> {hotel.location}</p>
                            </div>
                            <div>
                              <p><strong>1박 요금:</strong> {formatPrice(hotel.pricePerNight)}</p>
                              <p><strong>총 숙박료:</strong> {formatPrice(hotel.pricePerNight * getTripDays())}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Hotel className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">숙박 정보가 없습니다.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="activities" className="mt-6">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">🎯 주요 활동</h3>
                
                {plan.selectedActivities && Object.keys(plan.selectedActivities).length > 0 ? (
                  <div className="grid gap-4">
                    {Object.entries(plan.selectedActivities).map(([cityName, activities]) => (
                      <Card key={cityName} className="border border-orange-200 bg-orange-50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-orange-800 mb-3">
                            📍 {cityName} 활동
                          </h4>
                          <div className="grid md:grid-cols-2 gap-3">
                            {activities.map((activity, index) => (
                              <div 
                                key={index}
                                className="p-3 bg-white rounded-lg border border-orange-100"
                              >
                                <p className="font-medium">{activity.name}</p>
                                <p className="text-sm text-gray-600">{activity.category}</p>
                                <p className="text-sm text-orange-600 font-medium">
                                  {formatPrice(activity.price)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Camera className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">활동 정보가 없습니다.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 예산 요약 */}
      {plan.budgetBreakdown && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-600" />
              예산 분석
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Plane className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-blue-600">항공료</p>
                <p className="text-lg font-semibold">
                  {formatPrice(plan.budgetBreakdown.flight)}
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Hotel className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-purple-600">숙박비</p>
                <p className="text-lg font-semibold">
                  {formatPrice(plan.budgetBreakdown.accommodation)}
                </p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                <UtensilsCrossed className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-orange-600">식사비</p>
                <p className="text-lg font-semibold">
                  {formatPrice(plan.budgetBreakdown.meals)}
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <Camera className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-green-600">활동비</p>
                <p className="text-lg font-semibold">
                  {formatPrice(plan.budgetBreakdown.activities)}
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-700">총 예산</span>
                <span className="text-2xl font-bold text-green-600">
                  {formatPrice(plan.budgetBreakdown.total)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 교육적 가치 섹션 */}
      <Card className="bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-2 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎓 교육적 가치
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-800">🌍 지리 학습</h4>
              <p className="text-gray-700">
                {plan.cities?.join(', ')} 지역의 지리적 특성과 위치 관계를 이해할 수 있습니다.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-red-800">🎭 문화 체험</h4>
              <p className="text-gray-700">
                현지 문화와 전통을 직접 체험하며 다양성을 배울 수 있습니다.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-800">💰 경제 교육</h4>
              <p className="text-gray-700">
                여행 예산 관리를 통해 경제적 사고력을 기를 수 있습니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}