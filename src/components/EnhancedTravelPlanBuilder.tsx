'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { City, TravelPlan } from '@/types';
import { TravelPriceService, FlightPrice, HotelPrice, ActivityPrice } from '@/lib/travelApi';

interface EnhancedTravelPlanBuilderProps {
  selectedCities: City[];
  travelPlan: TravelPlan | null;
  onPlanUpdate: (plan: TravelPlan) => void;
  onNext: () => void;
  onBack: () => void;
}

interface DailySchedule {
  day: number;
  date: string;
  city: string;
  activities: {
    time: string;
    activity: string;
    duration: string;
    cost?: number;
    location?: string;
  }[];
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  accommodation: string;
  dailyBudget: number;
  notes: string;
}

interface BudgetBreakdown {
  flights: number;
  accommodation: number;
  food: number;
  transport: number;
  activities: number;
  miscellaneous: number;
  total: number;
}

const EnhancedTravelPlanBuilder: React.FC<EnhancedTravelPlanBuilderProps> = ({
  selectedCities,
  travelPlan,
  onPlanUpdate,
  onNext,
  onBack
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // 기본 여행 정보
  const [tripInfo, setTripInfo] = useState({
    startDate: '',
    endDate: '',
    travelers: 2,
    accommodationLevel: 'standard' as 'budget' | 'standard' | 'premium',
    mealLevel: 'standard' as 'budget' | 'standard' | 'premium',
    includeActivities: true
  });

  // 실시간 가격 데이터
  const [flightPrices, setFlightPrices] = useState<FlightPrice[]>([]);
  const [hotelOptions, setHotelOptions] = useState<Record<string, HotelPrice[]>>({});
  const [activityOptions, setActivityOptions] = useState<Record<string, ActivityPrice[]>>({});
  
  // 예산 정보
  const [budgetBreakdown, setBudgetBreakdown] = useState<BudgetBreakdown>({
    flights: 0,
    accommodation: 0,
    food: 0,
    transport: 0,
    activities: 0,
    miscellaneous: 0,
    total: 0
  });

  // 상세 일정
  const [dailySchedules, setDailySchedules] = useState<DailySchedule[]>([]);
  
  // 선택된 옵션들
  const [selectedFlight, setSelectedFlight] = useState<FlightPrice | null>(null);
  const [selectedHotels, setSelectedHotels] = useState<Record<string, HotelPrice>>({});
  const [selectedActivities, setSelectedActivities] = useState<Record<string, ActivityPrice[]>>({});

  const steps = [
    '📅 여행 기본 정보',
    '✈️ 항공편 선택',
    '🏨 숙박 선택',
    '🎯 활동 선택',
    '📋 상세 일정',
    '💰 예산 확인'
  ];

  // 여행 일수 계산
  const getTripDays = () => {
    if (!tripInfo.startDate || !tripInfo.endDate) return 0;
    return Math.ceil((new Date(tripInfo.endDate).getTime() - new Date(tripInfo.startDate).getTime()) / (1000 * 60 * 60 * 24));
  };

  // 실시간 가격 데이터 로드
  const loadPriceData = async () => {
    if (!tripInfo.startDate || !tripInfo.endDate || selectedCities.length === 0) return;
    
    setLoading(true);
    try {
      // 항공료 조회
      const flights = await TravelPriceService.getFlightPrices(
        'Seoul',
        selectedCities[0].name,
        tripInfo.startDate,
        tripInfo.endDate,
        tripInfo.travelers
      );
      setFlightPrices(flights);

      // 호텔 옵션 조회
      const hotels: Record<string, HotelPrice[]> = {};
      for (const city of selectedCities) {
        hotels[city.name] = await TravelPriceService.getHotelPrices(
          city.name,
          tripInfo.startDate,
          tripInfo.endDate,
          tripInfo.travelers
        );
      }
      setHotelOptions(hotels);

      // 활동 옵션 조회
      const activities: Record<string, ActivityPrice[]> = {};
      for (const city of selectedCities) {
        activities[city.name] = await TravelPriceService.getActivityPrices(city.name);
      }
      setActivityOptions(activities);

      // 예산 자동 계산
      const budget = await TravelPriceService.calculateTotalBudget({
        origin: 'Seoul',
        destinations: selectedCities,
        departureDate: tripInfo.startDate,
        returnDate: tripInfo.endDate,
        travelers: tripInfo.travelers,
        accommodationLevel: tripInfo.accommodationLevel,
        mealLevel: tripInfo.mealLevel,
        includeActivities: tripInfo.includeActivities
      });

      setBudgetBreakdown(budget);

    } catch (error) {
      console.error('가격 데이터 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 스마트 시간 배분 계산
  const calculateTimeAllocation = (totalHours: number, activityCount: number) => {
    const baseAllocations = {
      breakfast: 1,
      lunch: 1.5,
      dinner: 1.5,
      rest: 1,
      transport: 0.5
    };
    
    const fixedTime = Object.values(baseAllocations).reduce((sum, time) => sum + time, 0);
    const availableTime = totalHours - fixedTime;
    const timePerActivity = Math.max(1, availableTime / Math.max(1, activityCount - 3)); // 식사 3끼 제외
    
    return {
      activityTime: Math.round(timePerActivity * 10) / 10,
      availableTime,
      fixedTime
    };
  };

  // 자동 활동 시간 생성
  const generateActivityTimes = (startTime: string, activities: any[], cityActivities: ActivityPrice[]) => {
    let currentTime = new Date(`2024-01-01 ${startTime}`);
    const generatedActivities = [];

    // 조식
    generatedActivities.push({
      time: currentTime.toTimeString().slice(0, 5),
      activity: '호텔 조식',
      duration: '1시간',
      cost: 0,
      location: '호텔'
    });
    currentTime.setHours(currentTime.getHours() + 1);

    // 선택된 활동들을 시간대별로 배치
    const timeAllocation = calculateTimeAllocation(12, cityActivities.length + 3); // 12시간 활동 시간, 식사 3끼 포함
    
    cityActivities.forEach((activity, index) => {
      // 적절한 시간 간격 유지
      if (index > 0) {
        currentTime.setMinutes(currentTime.getMinutes() + 30); // 이동 시간
      }

      generatedActivities.push({
        time: currentTime.toTimeString().slice(0, 5),
        activity: activity.name,
        duration: activity.duration,
        cost: activity.price,
        location: `${activity.category} 장소`
      });

      // 활동 시간만큼 시간 증가
      const durationHours = parseFloat(activity.duration) || 2;
      currentTime.setHours(currentTime.getHours() + durationHours);
    });

    // 점심 시간 (12:30-14:00 사이로 조정)
    const lunchTime = new Date(`2024-01-01 12:30`);
    generatedActivities.push({
      time: lunchTime.toTimeString().slice(0, 5),
      activity: '현지 특색 점심',
      duration: '1.5시간',
      cost: Math.round(budgetBreakdown.food / getTripDays() / tripInfo.travelers * 0.4), // 점심은 일일 식비의 40%
      location: '현지 레스토랑'
    });

    // 저녁 시간
    const dinnerTime = new Date(`2024-01-01 19:00`);
    generatedActivities.push({
      time: dinnerTime.toTimeString().slice(0, 5),
      activity: '전통 요리 체험 저녁',
      duration: '1.5시간',
      cost: Math.round(budgetBreakdown.food / getTripDays() / tripInfo.travelers * 0.5), // 저녁은 일일 식비의 50%
      location: '추천 레스토랑'
    });

    // 시간순으로 정렬
    return generatedActivities.sort((a, b) => a.time.localeCompare(b.time));
  };

  // 상세 일정 생성 (개선된 버전)
  const generateDailySchedules = () => {
    const days = getTripDays();
    const schedules: DailySchedule[] = [];
    
    for (let i = 0; i < days; i++) {
      const date = new Date(tripInfo.startDate);
      date.setDate(date.getDate() + i);
      
      const cityIndex = Math.floor(i / Math.ceil(days / selectedCities.length));
      const currentCity = selectedCities[cityIndex] || selectedCities[0];
      
      // 해당 도시의 선택된 활동들
      const cityActivities = selectedActivities[currentCity.name] || [];
      
      // 스마트 시간 배분으로 활동 생성
      const activities = generateActivityTimes('08:00', [], cityActivities);
      
      schedules.push({
        day: i + 1,
        date: date.toISOString().split('T')[0],
        city: currentCity.name,
        activities,
        meals: {
          breakfast: '호텔 조식 또는 현지 카페',
          lunch: `${currentCity.name} 현지 특색 요리`,
          dinner: `${currentCity.name} 전통 요리 체험`
        },
        accommodation: selectedHotels[currentCity.name]?.name || `${currentCity.name} ${tripInfo.accommodationLevel === 'budget' ? '게스트하우스' : tripInfo.accommodationLevel === 'premium' ? '프리미엄 호텔' : '스탠다드 호텔'}`,
        dailyBudget: Math.round(budgetBreakdown.total / days / tripInfo.travelers),
        notes: `${currentCity.name}에서의 ${i + 1}일차 일정입니다. 날씨와 현지 상황에 따라 유연하게 조정하세요.`
      });
    }
    
    setDailySchedules(schedules);
  };

  // 기본 정보 단계
  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            출발일
          </label>
          <Input
            type="date"
            value={tripInfo.startDate}
            onChange={(e) => setTripInfo(prev => ({ ...prev, startDate: e.target.value }))}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            도착일
          </label>
          <Input
            type="date"
            value={tripInfo.endDate}
            onChange={(e) => setTripInfo(prev => ({ ...prev, endDate: e.target.value }))}
            min={tripInfo.startDate || new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          여행자 수
        </label>
        <Input
          type="number"
          min="1"
          max="10"
          value={tripInfo.travelers}
          onChange={(e) => setTripInfo(prev => ({ ...prev, travelers: parseInt(e.target.value) || 1 }))}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            숙박 수준
          </label>
          <div className="space-y-2">
            {[
              { value: 'budget', label: '🏠 게스트하우스 (저예산)', desc: '1박 4-8만원' },
              { value: 'standard', label: '🏨 스탠다드 호텔', desc: '1박 8-15만원' },
              { value: 'premium', label: '✨ 프리미엄 호텔', desc: '1박 20만원 이상' }
            ].map(option => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="accommodation"
                  value={option.value}
                  checked={tripInfo.accommodationLevel === option.value}
                  onChange={(e) => setTripInfo(prev => ({ ...prev, accommodationLevel: e.target.value as any }))}
                  className="text-blue-600"
                />
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            식사 수준
          </label>
          <div className="space-y-2">
            {[
              { value: 'budget', label: '🍜 로컬 푸드', desc: '1일 2-4만원' },
              { value: 'standard', label: '🍽️ 일반 레스토랑', desc: '1일 4-8만원' },
              { value: 'premium', label: '🍾 고급 레스토랑', desc: '1일 10만원 이상' }
            ].map(option => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="meal"
                  value={option.value}
                  checked={tripInfo.mealLevel === option.value}
                  onChange={(e) => setTripInfo(prev => ({ ...prev, mealLevel: e.target.value as any }))}
                  className="text-blue-600"
                />
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {tripInfo.startDate && tripInfo.endDate && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">📊 여행 정보 요약</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-blue-600 font-medium">여행 기간</span>
              <div>{getTripDays()}일</div>
            </div>
            <div>
              <span className="text-blue-600 font-medium">방문 도시</span>
              <div>{selectedCities.length}개 도시</div>
            </div>
            <div>
              <span className="text-blue-600 font-medium">여행자</span>
              <div>{tripInfo.travelers}명</div>
            </div>
            <div>
              <span className="text-blue-600 font-medium">예상 예산</span>
              <div className="text-lg font-bold text-blue-800">
                {loading ? '계산중...' : `${(budgetBreakdown.total / tripInfo.travelers).toLocaleString()}원/인`}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          이전 단계
        </Button>
        <Button 
          onClick={() => {
            loadPriceData();
            setCurrentStep(1);
          }}
          disabled={!tripInfo.startDate || !tripInfo.endDate}
        >
          다음: 항공편 선택
        </Button>
      </div>
    </div>
  );

  // 항공편 선택 단계
  const renderFlightSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">✈️ 항공편 선택</h3>
        <p className="text-gray-600">서울 ↔ {selectedCities[0]?.name} 항공편을 선택해주세요</p>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">항공료 검색 중...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {flightPrices.map((flight, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-all ${
                selectedFlight?.airline === flight.airline ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedFlight(flight)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="font-bold text-lg">{flight.airline}</div>
                      <Badge variant={flight.stops === 0 ? "default" : "secondary"}>
                        {flight.stops === 0 ? '직항' : '경유'}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {flight.duration} • {flight.origin} → {flight.destination}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {flight.departureDate} ~ {flight.returnDate}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {flight.price.toLocaleString()}원
                    </div>
                    <div className="text-sm text-gray-500">
                      {tripInfo.travelers}명 기준
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <Button onClick={() => setCurrentStep(0)} variant="outline">
          이전
        </Button>
        <Button 
          onClick={() => setCurrentStep(2)}
          disabled={!selectedFlight}
        >
          다음: 숙박 선택
        </Button>
      </div>
    </div>
  );

  // 예산 확인 단계
  const renderBudgetSummary = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">💰 예산 확인</h3>
        <p className="text-gray-600">실제 가격 기반으로 계산된 여행 예산입니다</p>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              총 {budgetBreakdown.total.toLocaleString()}원
            </div>
            <div className="text-lg text-gray-600 mt-2">
              1인당 {Math.round(budgetBreakdown.total / tripInfo.travelers).toLocaleString()}원
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: '✈️ 항공료', amount: budgetBreakdown.flights, color: 'bg-blue-500' },
              { label: '🏨 숙박비', amount: budgetBreakdown.accommodation, color: 'bg-green-500' },
              { label: '🍽️ 식비', amount: budgetBreakdown.food, color: 'bg-yellow-500' },
              { label: '🚌 교통비', amount: budgetBreakdown.transport, color: 'bg-purple-500' },
              { label: '🎯 활동비', amount: budgetBreakdown.activities, color: 'bg-pink-500' },
              { label: '💡 기타', amount: budgetBreakdown.miscellaneous, color: 'bg-gray-500' }
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{item.amount.toLocaleString()}원</div>
                  <div className="text-sm text-gray-500">
                    ({Math.round((item.amount / budgetBreakdown.total) * 100)}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-800 mb-2">💡 예산 절약 팁</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 비수기(2-3월, 5-6월)에 여행하면 30% 이상 절약 가능</li>
          <li>• 경유 항공편 선택 시 직항 대비 20-30% 저렴</li>
          <li>• 게스트하우스나 부티크 호텔로 숙박비 절약</li>
          <li>• 현지 대중교통 이용 시 택시 대비 70% 절약</li>
        </ul>
      </div>

      <div className="flex justify-between">
        <Button onClick={() => setCurrentStep(currentStep - 1)} variant="outline">
          이전
        </Button>
        <Button 
          onClick={() => {
            const finalPlan: TravelPlan = {
              id: Date.now().toString(),
              title: `${selectedCities.map(c => c.name).join(', ')} 여행`,
              description: `${getTripDays()}일간의 ${selectedCities.map(c => c.name).join(' → ')} 여행`,
              duration: `${getTripDays()}일`,
              budget: budgetBreakdown.total,
              budgetBreakdown,
              dailySchedules,
              selectedFlight: selectedFlight || undefined,
              selectedHotels,
              selectedActivities,
              travelers: tripInfo.travelers,
              startDate: tripInfo.startDate,
              endDate: tripInfo.endDate,
              cities: selectedCities.map(c => c.name),
              accommodationLevel: tripInfo.accommodationLevel,
              mealLevel: tripInfo.mealLevel,
              createdAt: new Date().toISOString()
            };
            onPlanUpdate(finalPlan);
            onNext();
          }}
          className="bg-green-600 hover:bg-green-700"
        >
          여행 계획 완료! 🎉
        </Button>
      </div>
    </div>
  );

  // 호텔 선택 단계
  const renderHotelSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">🏨 숙박 선택</h3>
        <p className="text-gray-600">각 도시별 숙박시설을 선택해주세요</p>
      </div>

      {selectedCities.map(city => (
        <div key={city.name} className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            📍 {city.name} 숙박
          </h4>
          
          {hotelOptions[city.name] ? (
            <div className="grid gap-4">
              {hotelOptions[city.name].map((hotel, index) => (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all ${
                    selectedHotels[city.name]?.name === hotel.name ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedHotels(prev => ({ ...prev, [city.name]: hotel }))}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h5 className="font-bold text-lg">{hotel.name}</h5>
                          <div className="flex">
                            {[...Array(hotel.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400">⭐</span>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">📍 {hotel.location}</p>
                        <div className="flex flex-wrap gap-1">
                          {hotel.amenities.map((amenity, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xl font-bold text-blue-600">
                          {hotel.pricePerNight.toLocaleString()}원
                        </div>
                        <div className="text-sm text-gray-500">1박 기준</div>
                        <div className="text-xs text-gray-400 mt-1">
                          총 {Math.ceil(getTripDays() / selectedCities.length)}박 예상
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              숙박 옵션을 불러오는 중...
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-between">
        <Button onClick={() => setCurrentStep(1)} variant="outline">
          이전
        </Button>
        <Button 
          onClick={() => setCurrentStep(3)}
          disabled={selectedCities.some(city => !selectedHotels[city.name])}
        >
          다음: 활동 선택
        </Button>
      </div>
    </div>
  );

  // 활동 선택 단계
  const renderActivitySelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">🎯 활동 선택</h3>
        <p className="text-gray-600">각 도시에서 경험하고 싶은 활동을 선택해주세요</p>
      </div>

      {selectedCities.map(city => (
        <div key={city.name} className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
            🌟 {city.name} 활동
          </h4>
          
          {activityOptions[city.name] ? (
            <div className="grid gap-3">
              {activityOptions[city.name].map((activity, index) => {
                const isSelected = selectedActivities[city.name]?.some(a => a.name === activity.name);
                return (
                  <Card 
                    key={index}
                    className={`cursor-pointer transition-all ${
                      isSelected ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
                    }`}
                    onClick={() => {
                      setSelectedActivities(prev => {
                        const cityActivities = prev[city.name] || [];
                        if (isSelected) {
                          return {
                            ...prev,
                            [city.name]: cityActivities.filter(a => a.name !== activity.name)
                          };
                        } else {
                          return {
                            ...prev,
                            [city.name]: [...cityActivities, activity]
                          };
                        }
                      });
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-bold">{activity.name}</h5>
                            <Badge variant="secondary">{activity.category}</Badge>
                            {isSelected && <Badge variant="default" className="bg-green-600">선택됨</Badge>}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                          <div className="text-xs text-gray-500">
                            ⏱️ 소요시간: {activity.duration}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-lg font-bold text-green-600">
                            {activity.price.toLocaleString()}원
                          </div>
                          <div className="text-xs text-gray-500">1인 기준</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              활동 옵션을 불러오는 중...
            </div>
          )}

          {selectedActivities[city.name] && selectedActivities[city.name].length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <h6 className="font-medium text-green-800 mb-2">
                선택된 활동 ({selectedActivities[city.name].length}개)
              </h6>
              <div className="text-sm text-green-700">
                총 비용: {selectedActivities[city.name].reduce((sum, activity) => sum + activity.price, 0).toLocaleString()}원/인
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="flex justify-between">
        <Button onClick={() => setCurrentStep(2)} variant="outline">
          이전
        </Button>
        <Button onClick={() => {
          generateDailySchedules();
          setCurrentStep(4);
        }}>
          다음: 상세 일정
        </Button>
      </div>
    </div>
  );

  // 상세 일정 관리 단계
  const renderDetailedSchedule = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">📋 상세 일정 관리</h3>
        <p className="text-gray-600">일차별 상세 일정을 확인하고 수정해주세요</p>
      </div>

      <div className="space-y-6">
        {dailySchedules.map((schedule, dayIndex) => (
          <Card key={dayIndex} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="flex justify-between items-center">
                <div>
                  <div className="text-lg">Day {schedule.day} - {schedule.city}</div>
                  <div className="text-sm opacity-90">{schedule.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90">일일 예산</div>
                  <div className="text-lg font-bold">{schedule.dailyBudget.toLocaleString()}원</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    ⏰ 활동 일정
                  </h5>
                  <div className="space-y-3">
                    {schedule.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="font-mono text-sm font-medium text-blue-600 min-w-[60px]">
                          {activity.time}
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={activity.activity}
                            onChange={(e) => {
                              const newSchedules = [...dailySchedules];
                              newSchedules[dayIndex].activities[actIndex].activity = e.target.value;
                              setDailySchedules(newSchedules);
                            }}
                            className="w-full bg-white border border-gray-200 rounded px-3 py-1 text-sm"
                          />
                        </div>
                        <div className="text-sm text-gray-600 min-w-[80px]">
                          {activity.duration}
                        </div>
                        <div className="text-sm font-medium text-green-600 min-w-[80px] text-right">
                          {activity.cost ? `${activity.cost.toLocaleString()}원` : '무료'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h6 className="font-medium text-gray-700 mb-2">🍽️ 식사</h6>
                    <div className="space-y-1 text-sm">
                      <div>조식: {schedule.meals.breakfast}</div>
                      <div>중식: {schedule.meals.lunch}</div>
                      <div>석식: {schedule.meals.dinner}</div>
                    </div>
                  </div>
                  <div>
                    <h6 className="font-medium text-gray-700 mb-2">🏨 숙박</h6>
                    <div className="text-sm">{schedule.accommodation}</div>
                  </div>
                  <div>
                    <h6 className="font-medium text-gray-700 mb-2">📝 메모</h6>
                    <textarea
                      value={schedule.notes}
                      onChange={(e) => {
                        const newSchedules = [...dailySchedules];
                        newSchedules[dayIndex].notes = e.target.value;
                        setDailySchedules(newSchedules);
                      }}
                      placeholder="특별한 메모사항을 입력하세요..."
                      className="w-full text-sm border border-gray-200 rounded px-2 py-1 h-16 resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    일일 활동 시간: {schedule.activities.reduce((total, act) => {
                      const duration = parseInt(act.duration) || 1;
                      return total + duration;
                    }, 0)}시간
                  </div>
                  <div className="text-sm font-medium text-green-600">
                    일일 비용: {schedule.activities.reduce((total, act) => total + (act.cost || 0), 0).toLocaleString()}원
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 mb-2">💡 일정 관리 팁</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 각 활동 시간을 클릭하여 직접 수정할 수 있습니다</li>
          <li>• 이동 시간을 고려하여 여유있게 일정을 계획하세요</li>
          <li>• 식사 시간과 휴식 시간을 적절히 배치하세요</li>
          <li>• 날씨나 현지 상황에 따라 대체 계획을 준비하세요</li>
        </ul>
      </div>

      <div className="flex justify-between">
        <Button onClick={() => setCurrentStep(3)} variant="outline">
          이전
        </Button>
        <Button onClick={() => setCurrentStep(5)}>
          다음: 예산 확인
        </Button>
      </div>
    </div>
  );

  // 단계별 렌더링
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderBasicInfo();
      case 1: return renderFlightSelection();
      case 2: return renderHotelSelection();
      case 3: return renderActivitySelection();
      case 4: return renderDetailedSchedule();
      case 5: return renderBudgetSummary();
      default: return renderBasicInfo();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              🎯 실제 데이터 기반 여행 계획 수립
            </h2>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {currentStep + 1}/{steps.length}
            </Badge>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">진행률</span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
            <Progress value={((currentStep + 1) / steps.length) * 100} className="h-2" />
          </div>

          <div className="flex flex-wrap gap-2">
            {steps.map((step, index) => (
              <Badge 
                key={index}
                variant={index <= currentStep ? "default" : "secondary"}
                className={`${index === currentStep ? 'ring-2 ring-blue-300' : ''}`}
              >
                {step}
              </Badge>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          {renderCurrentStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedTravelPlanBuilder;