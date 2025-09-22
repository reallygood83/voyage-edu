// 실시간 여행 데이터 조회 API 서비스
import { City } from '@/types';

export interface FlightPrice {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  price: number;
  currency: string;
  airline: string;
  duration: string;
  stops: number;
  stopoverCities?: string[];
  departureTime: string;
  arrivalTime: string;
}

export interface HotelPrice {
  city: string;
  name: string;
  rating: number;
  pricePerNight: number;
  currency: string;
  location: string;
  amenities: string[];
  imageUrl?: string;
}

export interface ActivityPrice {
  name: string;
  price: number;
  duration: string;
  category: string;
  description: string;
  location?: string;
  recommendedTime?: string;
}

// 실제 API 연동 대신 현실적인 가격 데이터를 생성하는 함수
export class TravelPriceService {
  
  // 항공료 조회 (실제 시장 가격 기반)
  static async getFlightPrices(
    origin: string,
    destination: string,
    departureDate: string,
    returnDate: string,
    passengers: number = 1
  ): Promise<FlightPrice[]> {
    
    // 실제 항공료 기본 가격 테이블 (KRW) - 출발지별 목적지 가격
    const baseFlightPrices: Record<string, Record<string, number>> = {
      'Seoul': {
        'Tokyo': 250000, 'Paris': 850000, 'London': 900000, 'New York': 1200000,
        'Sydney': 750000, 'Beijing': 200000, 'Bangkok': 350000, 'Rome': 950000,
        'Berlin': 900000, 'Barcelona': 950000, 'Los Angeles': 1300000, 'San Francisco': 1400000,
        'Nice': 900000, 'Lyon': 950000, 'Shanghai': 300000, 'Guangzhou': 400000,
        'Edinburgh': 950000, 'Manchester': 950000, 'Munich': 900000, 'Frankfurt': 850000,
        'Milan': 950000, 'Venice': 1000000, 'Madrid': 950000, 'Seville': 1000000,
        'Melbourne': 800000, 'Brisbane': 900000, 'Phuket': 400000, 'Chiang Mai': 450000
      },
      'Tokyo': {
        'Seoul': 250000, 'Paris': 800000, 'London': 850000, 'New York': 1100000,
        'Sydney': 600000, 'Beijing': 350000, 'Bangkok': 450000, 'Rome': 900000,
        'Berlin': 850000, 'Barcelona': 900000
      },
      'Beijing': {
        'Seoul': 200000, 'Tokyo': 350000, 'Paris': 750000, 'London': 800000,
        'New York': 1000000, 'Sydney': 650000, 'Bangkok': 400000
      },
      'Bangkok': {
        'Seoul': 350000, 'Tokyo': 450000, 'Paris': 650000, 'London': 700000,
        'New York': 900000, 'Sydney': 500000, 'Beijing': 400000
      }
    };

    const getBasePrice = (from: string, to: string): number => {
      // 출발지별 가격표가 있으면 사용, 없으면 Seoul 기준으로 조정
      const fromPrices = baseFlightPrices[from];
      if (fromPrices && fromPrices[to]) {
        return fromPrices[to];
      }
      
      // Seoul 기준 가격을 기본값으로 사용
      const seoulPrices = baseFlightPrices['Seoul'];
      return seoulPrices[to] || 800000; // 기본값
    };

    // 날짜별 가격 변동 (성수기/비수기)
    const getPriceMultiplier = (date: string): number => {
      const month = new Date(date).getMonth() + 1;
      // 성수기: 7-8월(여름휴가), 12-1월(겨울휴가)
      if ([7, 8, 12, 1].includes(month)) return 1.4;
      // 어깨철: 4-6월, 9-11월
      if ([4, 5, 6, 9, 10, 11].includes(month)) return 1.1;
      // 비수기: 2-3월
      return 0.8;
    };

    const basePrice = getBasePrice(origin, destination);
    const priceMultiplier = getPriceMultiplier(departureDate);
    
    // 목적지별 정확한 비행시간 데이터
    const getFlightDuration = (destination: string, stops: number): string => {
      const directFlightTimes: Record<string, string> = {
        'Tokyo': '직항 (2시간 20분)',
        'Beijing': '직항 (2시간 15분)',
        'Bangkok': '직항 (5시간 50분)',
        'Paris': '직항 (12시간)',
        'London': '직항 (11시간 20분)',
        'New York': '직항 (14시간)',
        'Sydney': '직항 (10시간)',
        'Rome': '직항 (12시간 30분)',
        'Berlin': '직항 (11시간 30분)',
        'Barcelona': '직항 (12시간 30분)'
      };

      if (stops === 0) {
        return directFlightTimes[destination] || '직항 (10-12시간)';
      } else {
        // 경유 시 2-4시간 추가
        const directTime = directFlightTimes[destination];
        if (directTime) {
          const hours = parseInt(directTime.match(/(\d+)시간/)?.[1] || '10');
          return `경유 (${hours + 2}-${hours + 4}시간)`;
        }
        return '경유 (12-16시간)';
      }
    };

    // 경유지 정보 설정
    const getStopoverInfo = (destination: string, stops: number): string[] => {
      if (stops === 0) return [];
      
      const stopoverOptions: Record<string, string[]> = {
        'Tokyo': ['Osaka'],
        'Beijing': ['Shanghai'],
        'Bangkok': ['Hong Kong'],
        'Paris': ['Frankfurt', 'Amsterdam'],
        'London': ['Frankfurt', 'Amsterdam'],
        'New York': ['Vancouver', 'Los Angeles'],
        'Sydney': ['Singapore', 'Hong Kong'],
        'Rome': ['Frankfurt', 'Vienna'],
        'Berlin': ['Frankfurt', 'Vienna'],
        'Barcelona': ['Frankfurt', 'Paris']
      };
      
      return stopoverOptions[destination] ? [stopoverOptions[destination][0]] : ['Hong Kong'];
    };

    // 출발/도착 시간 생성
    const generateFlightTimes = (destination: string, stops: number): { departure: string, arrival: string } => {
      const departureHours = [8, 10, 14, 18, 22]; // 일반적인 출발 시간들
      const randomDeparture = departureHours[Math.floor(Math.random() * departureHours.length)];
      
      // 목적지별 기본 비행시간 (시간)
      const baseDurations: Record<string, number> = {
        'Tokyo': 2.3,
        'Beijing': 2.25,
        'Bangkok': 5.8,
        'Paris': 12,
        'London': 11.3,
        'New York': 14,
        'Sydney': 10,
        'Rome': 12.5,
        'Berlin': 11.5,
        'Barcelona': 12.5
      };
      
      const baseDuration = baseDurations[destination] || 10;
      const totalDuration = stops === 0 ? baseDuration : baseDuration + 3; // 경유 시 3시간 추가
      
      const arrivalHour = (randomDeparture + totalDuration) % 24;
      
      return {
        departure: `${randomDeparture.toString().padStart(2, '0')}:${Math.floor(Math.random() * 6) * 10}`,
        arrival: `${Math.floor(arrivalHour).toString().padStart(2, '0')}:${Math.floor(Math.random() * 6) * 10}`
      };
    };

    // 항공사별 가격 옵션 생성
    const airlines = [
      { name: '대한항공', multiplier: 1.2, stops: 0 },
      { name: '아시아나항공', multiplier: 1.1, stops: 0 },
      { name: '에어프랑스', multiplier: 1.0, stops: 1 },
      { name: '루프트한자', multiplier: 0.9, stops: 1 },
      { name: '저비용항공', multiplier: 0.7, stops: 1 }
    ];

    return airlines.map(airline => {
      const flightTimes = generateFlightTimes(destination, airline.stops);
      return {
        origin,
        destination,
        departureDate,
        returnDate,
        price: Math.round(basePrice * priceMultiplier * airline.multiplier * passengers),
        currency: 'KRW',
        airline: airline.name,
        duration: getFlightDuration(destination, airline.stops),
        stops: airline.stops,
        stopoverCities: getStopoverInfo(destination, airline.stops),
        departureTime: flightTimes.departure,
        arrivalTime: flightTimes.arrival
      };
    });
  }

  // 호텔 가격 조회
  static async getHotelPrices(
    city: string,
    checkIn: string,
    checkOut: string,
    guests: number = 2
  ): Promise<HotelPrice[]> {
    
    // 도시별 호텔 기본 가격 (1박당, KRW)
    const basePrices: Record<string, number> = {
      'Tokyo': 120000,
      'Paris': 180000,
      'London': 200000,
      'New York': 250000,
      'Sydney': 150000,
      'Beijing': 80000,
      'Bangkok': 60000,
      'Rome': 140000,
      'Berlin': 100000,
      'Barcelona': 120000
    };

    const basePrice = basePrices[city] || 120000;
    
    // 호텔 등급별 옵션
    const hotelTypes = [
      { 
        name: '럭셔리 호텔', 
        rating: 5, 
        multiplier: 3.0,
        amenities: ['수영장', '스파', '피트니스센터', '24시간 룸서비스', '공항셔틀']
      },
      { 
        name: '프리미엄 호텔', 
        rating: 4, 
        multiplier: 2.0,
        amenities: ['피트니스센터', '비즈니스센터', '무료WiFi', '조식포함']
      },
      { 
        name: '스탠다드 호텔', 
        rating: 3, 
        multiplier: 1.0,
        amenities: ['무료WiFi', '에어컨', '24시간 프런트데스크']
      },
      { 
        name: '부티크 호텔', 
        rating: 4, 
        multiplier: 1.5,
        amenities: ['무료WiFi', '레스토랑', '독특한 디자인', '현지 체험']
      },
      { 
        name: '게스트하우스', 
        rating: 2, 
        multiplier: 0.4,
        amenities: ['무료WiFi', '공용주방', '세탁시설']
      }
    ];

    return hotelTypes.map(hotel => ({
      city,
      name: `${city} ${hotel.name}`,
      rating: hotel.rating,
      pricePerNight: Math.round(basePrice * hotel.multiplier),
      currency: 'KRW',
      location: `${city} 중심가`,
      amenities: hotel.amenities,
      imageUrl: `/api/placeholder/hotel-${hotel.rating}star`
    }));
  }

  // 현지 활동/체험 가격 조회
  static async getActivityPrices(city: string): Promise<ActivityPrice[]> {
    
    const cityActivities: Record<string, ActivityPrice[]> = {
      'Tokyo': [
        { name: '도쿄 시티투어', price: 80000, duration: '8시간', category: '관광', description: '아사쿠사, 시부야, 하라주쿠 등 주요 명소 투어' },
        { name: '스시 만들기 체험', price: 65000, duration: '3시간', category: '요리체험', description: '전문 셰프와 함께하는 스시 만들기' },
        { name: '디즈니랜드 입장권', price: 85000, duration: '10시간', category: '테마파크', description: '도쿄 디즈니랜드 1일 이용권' }
      ],
      'Paris': [
        { name: '루브르 박물관 투어', price: 45000, duration: '4시간', category: '문화', description: '전문 가이드와 함께하는 루브르 박물관 투어' },
        { name: '에펠탑 전망대', price: 35000, duration: '2시간', category: '관광', description: '에펠탑 꼭대기 전망대 입장' },
        { name: '세느강 크루즈', price: 25000, duration: '1.5시간', category: '관광', description: '세느강을 따라 파리 시내 관광' }
      ],
      // 기본 활동들
      'default': [
        { name: '시내 관광투어', price: 50000, duration: '6시간', category: '관광', description: '주요 명소를 둘러보는 시내 투어' },
        { name: '현지 요리 체험', price: 40000, duration: '3시간', category: '요리체험', description: '현지 전통 요리 만들기 체험' },
        { name: '문화유적 투어', price: 35000, duration: '4시간', category: '문화', description: '역사적 문화유적 탐방' }
      ]
    };

    return cityActivities[city] || cityActivities['default'];
  }

  // 교통비 조회 (현지 교통비)
  static getLocalTransportCosts(city: string, days: number): {
    publicTransport: number;
    taxi: number;
    rental: number;
  } {
    const baseCosts: Record<string, any> = {
      'Tokyo': { publicTransport: 8000, taxi: 15000, rental: 45000 },
      'Paris': { publicTransport: 6000, taxi: 12000, rental: 40000 },
      'London': { publicTransport: 10000, taxi: 18000, rental: 50000 },
      'default': { publicTransport: 5000, taxi: 10000, rental: 35000 }
    };

    const costs = baseCosts[city] || baseCosts['default'];
    
    return {
      publicTransport: costs.publicTransport * days,
      taxi: costs.taxi * days,
      rental: costs.rental * days
    };
  }

  // 식비 추정
  static getFoodCosts(city: string, days: number, mealLevel: 'budget' | 'standard' | 'premium' = 'standard'): number {
    const dailyFoodCosts: Record<string, Record<string, number>> = {
      'Tokyo': { budget: 25000, standard: 45000, premium: 80000 },
      'Paris': { budget: 30000, standard: 55000, premium: 100000 },
      'London': { budget: 35000, standard: 60000, premium: 110000 },
      'default': { budget: 20000, standard: 40000, premium: 70000 }
    };

    const costs = dailyFoodCosts[city] || dailyFoodCosts['default'];
    return costs[mealLevel] * days;
  }

  // 총 예상 비용 계산
  static async calculateTotalBudget(params: {
    origin: string;
    destinations: City[];
    departureDate: string;
    returnDate: string;
    travelers: number;
    accommodationLevel: 'budget' | 'standard' | 'premium';
    mealLevel: 'budget' | 'standard' | 'premium';
    includeActivities: boolean;
  }) {
    const { destinations, departureDate, returnDate, travelers, accommodationLevel, mealLevel, includeActivities } = params;
    
    const tripDays = Math.ceil((new Date(returnDate).getTime() - new Date(departureDate).getTime()) / (1000 * 60 * 60 * 24));
    
    let totalBudget = {
      flights: 0,
      accommodation: 0,
      food: 0,
      transport: 0,
      activities: 0,
      miscellaneous: 0,
      total: 0
    };

    // 항공료 계산
    for (const destination of destinations) {
      const flights = await this.getFlightPrices(params.origin, destination.name, departureDate, returnDate, travelers);
      totalBudget.flights += flights[2]?.price || 0; // 중간 가격대 선택
    }

    // 숙박비 계산
    for (const destination of destinations) {
      const hotels = await this.getHotelPrices(destination.name, departureDate, returnDate, travelers);
      const levelIndex = accommodationLevel === 'budget' ? 4 : accommodationLevel === 'standard' ? 2 : 1;
      totalBudget.accommodation += (hotels[levelIndex]?.pricePerNight || 120000) * Math.ceil(tripDays / destinations.length);
    }

    // 식비 계산
    for (const destination of destinations) {
      totalBudget.food += this.getFoodCosts(destination.name, Math.ceil(tripDays / destinations.length), mealLevel) * travelers;
    }

    // 교통비 계산
    for (const destination of destinations) {
      const transport = this.getLocalTransportCosts(destination.name, Math.ceil(tripDays / destinations.length));
      totalBudget.transport += transport.publicTransport * travelers;
    }

    // 활동비 계산
    if (includeActivities) {
      for (const destination of destinations) {
        const activities = await this.getActivityPrices(destination.name);
        totalBudget.activities += activities.slice(0, 2).reduce((sum, activity) => sum + activity.price, 0) * travelers;
      }
    }

    // 기타비용 (전체 비용의 10% 정도로 추정)
    const subtotal = totalBudget.flights + totalBudget.accommodation + totalBudget.food + totalBudget.transport + totalBudget.activities;
    totalBudget.miscellaneous = Math.round(subtotal * 0.1);
    totalBudget.total = subtotal + totalBudget.miscellaneous;

    return totalBudget;
  }
}