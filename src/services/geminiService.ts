'use client';

import { TravelPlan, Destination, Activity } from '@/types';

export interface GeminiAIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface TravelRecommendation {
  destinations: string[];
  activities: string[];
  budget: {
    min: number;
    max: number;
    breakdown: {
      accommodation: number;
      food: number;
      activities: number;
      transportation: number;
    };
  };
  bestTime: string;
  duration: string;
  tips: string[];
}

export interface ItineraryOptimization {
  optimizedSchedule: Array<{
    day: number;
    activities: Array<{
      time: string;
      activity: string;
      location: string;
      duration: string;
      cost: number;
    }>;
  }>;
  totalCost: number;
  suggestions: string[];
}

class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Gemini API key not found in environment variables');
    }
  }

  private async makeRequest(prompt: string): Promise<GeminiAIResponse> {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return {
          success: true,
          data: data.candidates[0].content.parts[0].text
        };
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * 여행 목적지와 선호도를 기반으로 맞춤형 여행 추천을 생성합니다.
   */
  async generateTravelRecommendation(
    preferences: {
      budget: number;
      duration: number;
      interests: string[];
      travelStyle: string;
      season: string;
      groupSize: number;
    }
  ): Promise<TravelRecommendation | null> {
    const prompt = `
당신은 전문 여행 컨설턴트입니다. 다음 조건에 맞는 여행 추천을 JSON 형식으로 제공해주세요:

조건:
- 예산: ${preferences.budget}원
- 여행 기간: ${preferences.duration}일
- 관심사: ${preferences.interests.join(', ')}
- 여행 스타일: ${preferences.travelStyle}
- 계절: ${preferences.season}
- 인원: ${preferences.groupSize}명

다음 JSON 형식으로 응답해주세요:
{
  "destinations": ["목적지1", "목적지2", "목적지3"],
  "activities": ["활동1", "활동2", "활동3", "활동4", "활동5"],
  "budget": {
    "min": 최소예산,
    "max": 최대예산,
    "breakdown": {
      "accommodation": 숙박비,
      "food": 식비,
      "activities": 활동비,
      "transportation": 교통비
    }
  },
  "bestTime": "최적 여행 시기",
  "duration": "권장 여행 기간",
  "tips": ["팁1", "팁2", "팁3"]
}

한국어로 응답하고, 실용적이고 구체적인 정보를 제공해주세요.
`;

    const response = await this.makeRequest(prompt);
    
    if (response.success && response.data) {
      try {
        // JSON 응답에서 실제 JSON 부분만 추출
        const jsonMatch = response.data.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (error) {
        console.error('Failed to parse travel recommendation:', error);
      }
    }
    
    return null;
  }

  /**
   * 기존 여행 계획을 최적화합니다.
   */
  async optimizeItinerary(travelPlan: TravelPlan): Promise<ItineraryOptimization | null> {
    const destinationsInfo = travelPlan.destinations?.map(dest => ({
      city: dest.city.nameKo,
      activities: dest.activities.map(act => act.name),
      arrivalDate: dest.arrivalDate,
      departureDate: dest.departureDate
    })) || [];

    const prompt = `
당신은 여행 일정 최적화 전문가입니다. 다음 여행 계획을 분석하고 최적화된 일정을 제안해주세요:

여행 정보:
- 총 예산: ${travelPlan.totalBudget || travelPlan.budget}원
- 여행 기간: ${travelPlan.duration}일
- 목적지: ${destinationsInfo.map(d => d.city).join(', ')}
- 계획된 활동들: ${destinationsInfo.flatMap(d => d.activities).join(', ')}

다음 JSON 형식으로 최적화된 일정을 제안해주세요:
{
  "optimizedSchedule": [
    {
      "day": 1,
      "activities": [
        {
          "time": "09:00",
          "activity": "활동명",
          "location": "위치",
          "duration": "2시간",
          "cost": 50000
        }
      ]
    }
  ],
  "totalCost": 예상총비용,
  "suggestions": ["개선사항1", "개선사항2", "개선사항3"]
}

효율적인 동선, 시간 배분, 비용 최적화를 고려하여 한국어로 응답해주세요.
`;

    const response = await this.makeRequest(prompt);
    
    if (response.success && response.data) {
      try {
        const jsonMatch = response.data.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (error) {
        console.error('Failed to parse itinerary optimization:', error);
      }
    }
    
    return null;
  }

  /**
   * 목적지별 맞춤형 활동을 추천합니다.
   */
  async recommendActivities(
    cityName: string,
    interests: string[],
    budget: number,
    duration: number
  ): Promise<Activity[] | null> {
    const prompt = `
${cityName}에서 ${duration}일 동안 즐길 수 있는 활동을 추천해주세요.

조건:
- 관심사: ${interests.join(', ')}
- 예산: ${budget}원
- 기간: ${duration}일

다음 JSON 배열 형식으로 응답해주세요:
[
  {
    "name": "활동명",
    "description": "활동 설명",
    "duration": "소요시간",
    "cost": 예상비용,
    "category": "카테고리",
    "location": "위치",
    "tips": "팁"
  }
]

실제 존재하는 장소와 활동을 추천하고, 한국어로 응답해주세요.
`;

    const response = await this.makeRequest(prompt);
    
    if (response.success && response.data) {
      try {
        const jsonMatch = response.data.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const activities = JSON.parse(jsonMatch[0]);
          return activities.map((activity: any, index: number) => ({
            id: `ai-${Date.now()}-${index}`,
            name: activity.name,
            description: activity.description,
            duration: activity.duration,
            cost: activity.cost,
            category: activity.category,
            location: activity.location,
            tips: activity.tips
          }));
        }
      } catch (error) {
        console.error('Failed to parse activity recommendations:', error);
      }
    }
    
    return null;
  }

  /**
   * 여행 계획에 대한 전반적인 조언을 제공합니다.
   */
  async getTravelAdvice(travelPlan: TravelPlan): Promise<string | null> {
    const prompt = `
다음 여행 계획을 검토하고 전문적인 조언을 제공해주세요:

여행 계획:
- 목적지: ${travelPlan.destinations?.map(d => d.city.nameKo).join(', ')}
- 기간: ${travelPlan.duration}일
- 예산: ${travelPlan.totalBudget || travelPlan.budget}원
- 여행 스타일: ${travelPlan.targetCustomer?.type}

다음 관점에서 조언해주세요:
1. 예산 배분의 적절성
2. 일정의 현실성
3. 놓치기 쉬운 준비사항
4. 현지 문화 및 관습
5. 안전 및 건강 관련 팁

구체적이고 실용적인 조언을 한국어로 제공해주세요.
`;

    const response = await this.makeRequest(prompt);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    return null;
  }
}

export const geminiService = new GeminiService();