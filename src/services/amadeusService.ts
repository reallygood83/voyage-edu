'use client';

import { StandardizedFlight } from '@/types';

// Amadeus API 인터페이스 정의
export interface AmadeusFlightOffer {
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  numberOfBookableSeats: number;
  itineraries: AmadeusItinerary[];
  price: AmadeusPrice;
  pricingOptions: AmadeusPricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: AmadeusTravelerPricing[];
}

export interface AmadeusItinerary {
  duration: string;
  segments: AmadeusSegment[];
}

export interface AmadeusSegment {
  departure: AmadeusEndpoint;
  arrival: AmadeusEndpoint;
  carrierCode: string;
  number: string;
  aircraft: AmadeusAircraft;
  operating?: AmadeusOperating;
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

export interface AmadeusEndpoint {
  iataCode: string;
  terminal?: string;
  at: string;
}

export interface AmadeusAircraft {
  code: string;
}

export interface AmadeusOperating {
  carrierCode: string;
}

export interface AmadeusPrice {
  currency: string;
  total: string;
  base: string;
  fees: AmadeusFee[];
  grandTotal: string;
}

export interface AmadeusFee {
  amount: string;
  type: string;
}

export interface AmadeusPricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}

export interface AmadeusTravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: AmadeusPrice;
  fareDetailsBySegment: AmadeusFareDetails[];
}

export interface AmadeusFareDetails {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  class: string;
  includedCheckedBags: AmadeusCheckedBags;
}

export interface AmadeusCheckedBags {
  quantity: number;
}



// 항공사 코드 매핑
const AIRLINE_NAMES: Record<string, string> = {
  'KE': '대한항공',
  'OZ': '아시아나항공',
  'AF': '에어프랑스',
  'LH': '루프트한자',
  'BA': '영국항공',
  'JL': '일본항공',
  'NH': 'ANA',
  'TG': '타이항공',
  'SQ': '싱가포르항공',
  'QF': '콴타스항공',
  'EK': '에미레이트항공',
  'QR': '카타르항공',
  'TK': '터키항공',
  'DL': '델타항공',
  'UA': '유나이티드항공',
  'AA': '아메리칸항공'
};

// 공항 코드 매핑
const AIRPORT_CODES: Record<string, string> = {
  'Seoul': 'ICN',
  'Tokyo': 'NRT',
  'Beijing': 'PEK',
  'Bangkok': 'BKK',
  'Paris': 'CDG',
  'London': 'LHR',
  'New York': 'JFK',
  'Sydney': 'SYD',
  'Rome': 'FCO',
  'Berlin': 'BER',
  'Barcelona': 'BCN',
  'Madrid': 'MAD',
  'Amsterdam': 'AMS',
  'Frankfurt': 'FRA',
  'Zurich': 'ZUR',
  'Vienna': 'VIE',
  'Prague': 'PRG',
  'Budapest': 'BUD',
  'Warsaw': 'WAW',
  'Stockholm': 'ARN'
};

export class AmadeusService {
  private static readonly BASE_URL = 'https://test.api.amadeus.com/v2';
  private static accessToken: string | null = null;
  private static tokenExpiry: number = 0;

  // 액세스 토큰 획득
  private static async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: process.env.NEXT_PUBLIC_AMADEUS_API_KEY || '',
          client_secret: process.env.NEXT_PUBLIC_AMADEUS_API_SECRET || ''
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get access token');
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // 1분 여유

      if (!this.accessToken) {
        throw new Error('No access token received');
      }

      return this.accessToken;
    } catch (error) {
      console.error('Error getting Amadeus access token:', error);
      throw error;
    }
  }

  // 항공편 검색
  static async searchFlights(params: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    children?: number;
    infants?: number;
    travelClass?: 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';
    nonStop?: boolean;
    maxPrice?: number;
    currencyCode?: string;
  }): Promise<StandardizedFlight[]> {
    try {
      const token = await this.getAccessToken();
      
      const originCode = AIRPORT_CODES[params.origin] || params.origin;
      const destinationCode = AIRPORT_CODES[params.destination] || params.destination;

      const searchParams = new URLSearchParams({
        originLocationCode: originCode,
        destinationLocationCode: destinationCode,
        departureDate: params.departureDate,
        adults: params.adults.toString(),
        currencyCode: params.currencyCode || 'KRW',
        max: '10' // 최대 10개 결과
      });

      if (params.returnDate) {
        searchParams.append('returnDate', params.returnDate);
      }
      if (params.children) {
        searchParams.append('children', params.children.toString());
      }
      if (params.infants) {
        searchParams.append('infants', params.infants.toString());
      }
      if (params.travelClass) {
        searchParams.append('travelClass', params.travelClass);
      }
      if (params.nonStop) {
        searchParams.append('nonStop', 'true');
      }
      if (params.maxPrice) {
        searchParams.append('maxPrice', params.maxPrice.toString());
      }

      const response = await fetch(`${this.BASE_URL}/shopping/flight-offers?${searchParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Amadeus API error: ${response.status}`);
      }

      const data = await response.json();
      return this.transformFlightOffers(data.data || [], params.origin, params.destination);
    } catch (error) {
      console.error('Error searching flights:', error);
      // Fallback to mock data if API fails
      return this.getMockFlights(
        params.origin, 
        params.destination, 
        params.departureDate, 
        params.returnDate || params.departureDate, 
        params.adults
      );
    }
  }

  // Amadeus 응답을 표준화된 형식으로 변환
  private static transformFlightOffers(
    offers: AmadeusFlightOffer[], 
    origin: string, 
    destination: string
  ): StandardizedFlight[] {
    return offers.map(offer => {
      const outbound = offer.itineraries[0];
      const firstSegment = outbound.segments[0];
      const lastSegment = outbound.segments[outbound.segments.length - 1];
      
      const airlineCode = firstSegment.carrierCode;
      const airline = AIRLINE_NAMES[airlineCode] || airlineCode;
      
      const stops = outbound.segments.length - 1;
      const stopoverCities = stops > 0 
        ? outbound.segments.slice(0, -1).map(seg => seg.arrival.iataCode)
        : [];

      return {
        id: offer.id,
        airline,
        airlineCode,
        flightNumber: `${firstSegment.carrierCode}${firstSegment.number}`,
        origin,
        destination,
        departureDate: firstSegment.departure.at.split('T')[0],
        returnDate: offer.itineraries[1]?.segments[0]?.departure.at.split('T')[0],
        departureTime: this.formatTime(firstSegment.departure.at),
        arrivalTime: this.formatTime(lastSegment.arrival.at),
        duration: this.formatDuration(outbound.duration),
        stops,
        stopoverCities,
        price: Math.round(parseFloat(offer.price.grandTotal)),
        currency: offer.price.currency,
        cabin: offer.travelerPricings[0]?.fareDetailsBySegment[0]?.cabin || 'ECONOMY',
        availableSeats: offer.numberOfBookableSeats,
        baggage: {
          checkedBags: offer.travelerPricings[0]?.fareDetailsBySegment[0]?.includedCheckedBags?.quantity || 0,
          carryOn: true
        },
        cancellationPolicy: 'Standard',
        isRefundable: offer.pricingOptions.fareType.includes('PUBLISHED')
      };
    });
  }

  // 시간 포맷팅
  private static formatTime(isoString: string): string {
    const date = new Date(isoString);
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }

  // 기간 포맷팅
  private static formatDuration(isoDuration: string): string {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?/);
    if (!match) return isoDuration;
    
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    
    if (hours > 0 && minutes > 0) {
      return `${hours}시간 ${minutes}분`;
    } else if (hours > 0) {
      return `${hours}시간`;
    } else {
      return `${minutes}분`;
    }
  }

  // API 실패 시 사용할 목업 데이터
  public static getMockFlights(
    origin: string, 
    destination: string, 
    departureDate: string, 
    returnDate: string, 
    passengers: number
  ): StandardizedFlight[] {
    const params = { origin, destination, departureDate, returnDate, adults: passengers };
    const basePrice = this.getBasePrice(params.origin, params.destination);
    const priceMultiplier = this.getPriceMultiplier(params.departureDate);
    
    const mockFlights: StandardizedFlight[] = [
      {
        id: 'mock-1',
        airline: '대한항공',
        airlineCode: 'KE',
        flightNumber: 'KE123',
        origin: params.origin,
        destination: params.destination,
        departureDate: params.departureDate,
        returnDate: params.returnDate,
        departureTime: '09:00',
        arrivalTime: '14:30',
        duration: '5시간 30분',
        stops: 0,
        stopoverCities: [],
        price: Math.round(basePrice * priceMultiplier * 1.2 * params.adults),
        currency: 'KRW',
        cabin: 'ECONOMY',
        availableSeats: 9,
        baggage: { checkedBags: 1, carryOn: true },
        cancellationPolicy: 'Standard',
        isRefundable: true
      },
      {
        id: 'mock-2',
        airline: '아시아나항공',
        airlineCode: 'OZ',
        flightNumber: 'OZ456',
        origin: params.origin,
        destination: params.destination,
        departureDate: params.departureDate,
        returnDate: params.returnDate,
        departureTime: '13:15',
        arrivalTime: '18:45',
        duration: '5시간 30분',
        stops: 0,
        stopoverCities: [],
        price: Math.round(basePrice * priceMultiplier * 1.1 * params.adults),
        currency: 'KRW',
        cabin: 'ECONOMY',
        availableSeats: 15,
        baggage: { checkedBags: 1, carryOn: true },
        cancellationPolicy: 'Standard',
        isRefundable: true
      },
      {
        id: 'mock-3',
        airline: '에어프랑스',
        airlineCode: 'AF',
        flightNumber: 'AF789',
        origin: params.origin,
        destination: params.destination,
        departureDate: params.departureDate,
        returnDate: params.returnDate,
        departureTime: '22:30',
        arrivalTime: '06:15+1',
        duration: '7시간 45분',
        stops: 1,
        stopoverCities: ['CDG'],
        price: Math.round(basePrice * priceMultiplier * 0.9 * params.adults),
        currency: 'KRW',
        cabin: 'ECONOMY',
        availableSeats: 20,
        baggage: { checkedBags: 1, carryOn: true },
        cancellationPolicy: 'Standard',
        isRefundable: false
      }
    ];

    return mockFlights;
  }

  // 기본 가격 계산
  private static getBasePrice(origin: string, destination: string): number {
    const priceMap: Record<string, Record<string, number>> = {
      'Seoul': {
        'Tokyo': 250000,
        'Beijing': 300000,
        'Bangkok': 450000,
        'Paris': 800000,
        'London': 850000,
        'New York': 1200000,
        'Sydney': 900000,
        'Rome': 750000,
        'Berlin': 800000,
        'Barcelona': 850000
      }
    };

    return priceMap[origin]?.[destination] || 800000;
  }

  // 계절별 가격 변동
  private static getPriceMultiplier(date: string): number {
    const month = new Date(date).getMonth() + 1;
    if ([7, 8, 12, 1].includes(month)) return 1.4; // 성수기
    if ([4, 5, 6, 9, 10, 11].includes(month)) return 1.1; // 어깨철
    return 0.8; // 비수기
  }

  // 항공편 상세 정보 조회
  static async getFlightDetails(offerId: string): Promise<StandardizedFlight | null> {
    try {
      const token = await this.getAccessToken();
      
      const response = await fetch(`${this.BASE_URL}/shopping/flight-offers/${offerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get flight details: ${response.status}`);
      }

      const data = await response.json();
      return this.transformFlightOffers([data.data], '', '')[0] || null;
    } catch (error) {
      console.error('Error getting flight details:', error);
      return null;
    }
  }

  // 항공편 가격 확인 (실시간)
  static async confirmFlightPrice(offerId: string): Promise<{ confirmed: boolean; price: number; currency: string }> {
    try {
      const token = await this.getAccessToken();
      
      const response = await fetch(`${this.BASE_URL}/shopping/flight-offers/pricing`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: {
            type: 'flight-offers-pricing',
            flightOffers: [{ id: offerId }]
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to confirm price: ${response.status}`);
      }

      const data = await response.json();
      const offer = data.data.flightOffers[0];
      
      return {
        confirmed: true,
        price: Math.round(parseFloat(offer.price.grandTotal)),
        currency: offer.price.currency
      };
    } catch (error) {
      console.error('Error confirming flight price:', error);
      return { confirmed: false, price: 0, currency: 'KRW' };
    }
  }
}