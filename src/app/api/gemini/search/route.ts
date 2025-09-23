import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  let city = '';
  
  try {
    const requestBody = await request.json();
    city = requestBody.city;

    if (!city) {
      return NextResponse.json(
        { error: '도시 이름이 필요합니다.' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `${city}에 대한 여행 및 문화 정보를 JSON 형태로 제공해주세요. 다음 형식을 정확히 따라주세요:

{
  "city": "${city}",
  "country": "국가명",
  "summary": "도시 소개 (2-3문장)",
  "basicInfo": {
    "population": "인구 정보",
    "area": "면적 정보"
  },
  "highlights": [
    "주요 특징 1",
    "주요 특징 2", 
    "주요 특징 3"
  ],
  "culturalInfo": {
    "language": "주요 언어",
    "currency": "통화",
    "bestTimeToVisit": "최적 여행 시기",
    "timezone": "한국 기준 시차",
    "religion": "주요 종교",
    "foodCulture": "음식 문화 설명",
    "famousFor": ["유명한 것 1", "유명한 것 2", "유명한 것 3"]
  },
  "travelTips": [
    "여행 팁 1",
    "여행 팁 2",
    "여행 팁 3"
  ],
  "learningPoints": [
    "학습 포인트 1",
    "학습 포인트 2", 
    "학습 포인트 3"
  ],
  "recommendedActivities": [
    "추천 활동 1",
    "추천 활동 2",
    "추천 활동 3"
  ]
}

반드시 유효한 JSON 형식으로만 응답해주세요. 다른 텍스트는 포함하지 마세요.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // JSON 응답 파싱
    console.log('Gemini API 응답:', text);
    
    let searchResult;
    try {
      // JSON 파싱 시도
      const cleanText = text.trim().replace(/```json\s*/, '').replace(/```\s*$/, '');
      searchResult = JSON.parse(cleanText);
      console.log('파싱된 결과:', searchResult);
    } catch (parseError) {
      console.error('JSON 파싱 실패:', parseError);
      // Fallback: Mock 데이터 사용
      searchResult = getMockData(city);
    }

    return NextResponse.json(searchResult);
  } catch (error) {
    console.error('Gemini API 오류:', error);
    // API 오류 시에도 Mock 데이터 반환
    const fallbackResult = getMockData(city || '도시');
    return NextResponse.json(fallbackResult);
  }
}

// Fallback Mock 데이터 함수
function getMockData(city: string): any {
  return {
    city: city,
    country: '정보 수집 중',
    summary: `${city}는 독특한 매력을 가진 도시입니다. 풍부한 역사와 문화를 자랑하며, 다양한 볼거리와 체험거리가 있습니다.`,
    basicInfo: {
      population: '정보 수집 중',
      area: '정보 수집 중'
    },
    highlights: [
      '풍부한 역사와 전통',
      '독특한 지역 문화',
      '다양한 관광 명소'
    ],
    culturalInfo: {
      language: '현지 언어',
      currency: '현지 통화',
      bestTimeToVisit: '봄, 가을 (일반적으로 쾌적한 시기)',
      timezone: '한국 기준 시차 정보 수집 중',
      religion: '다양한 종교가 공존',
      foodCulture: '지역 특색이 담긴 전통 요리',
      famousFor: ['지역 특산품', '전통 문화', '관광 명소']
    },
    travelTips: [
      '현지 문화와 관습을 존중해주세요',
      '기본적인 현지 인사말을 배워보세요',
      '대중교통 이용법을 미리 확인해보세요'
    ],
    learningPoints: [
      '해당 지역의 역사적 배경 이해하기',
      '전통 문화와 현대 문화의 조화 관찰하기',
      '현지인들의 생활 방식 체험하기'
    ],
    recommendedActivities: [
      '현지 전통 시장 둘러보기',
      '문화유산 및 박물관 방문',
      '현지 요리 체험 프로그램 참여'
    ]
  };
}