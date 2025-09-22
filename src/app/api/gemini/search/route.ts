import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { city } = await request.json();

    if (!city) {
      return NextResponse.json(
        { error: '도시 이름이 필요합니다.' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      도시: ${city}
      
      이 도시에 대한 여행 및 문화 정보를 다음 형식으로 제공해주세요:
      
      1. 도시 소개 (2-3문장)
      2. 주요 특징 3가지
      3. 문화 정보 (언어, 화폐, 최적 여행 시기, 유명한 것들)
      4. 여행 팁 3가지
      5. 교육적 학습 포인트 3가지
      
      간단하고 명확하게 답변해주세요.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // 텍스트 파싱하여 구조화된 데이터로 변환
    const lines = text.split('\n').filter(line => line.trim());
    
    // 간단한 파싱 로직
    const searchResult = {
      city: city,
      country: extractCountry(text),
      summary: extractSummary(lines),
      highlights: extractHighlights(lines),
      culturalInfo: extractCulturalInfo(lines),
      travelTips: extractTravelTips(lines),
      learningPoints: extractLearningPoints(lines),
    };

    return NextResponse.json(searchResult);
  } catch (error) {
    console.error('Gemini API 오류:', error);
    return NextResponse.json(
      { error: 'AI 검색 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 파싱 헬퍼 함수들
function extractCountry(text: string): string {
  // 국가 정보 추출 로직
  const countryMatch = text.match(/국가[:\s]+([^\n,]+)/i);
  return countryMatch ? countryMatch[1].trim() : '';
}

function extractSummary(lines: string[]): string {
  // 첫 2-3문장을 요약으로 사용
  const summaryLines = lines.slice(0, 3).join(' ');
  return summaryLines.substring(0, 200);
}

function extractHighlights(lines: string[]): string[] {
  const highlights: string[] = [];
  let inHighlights = false;
  
  for (const line of lines) {
    if (line.includes('주요 특징') || line.includes('특징')) {
      inHighlights = true;
      continue;
    }
    if (inHighlights && line.match(/^\d\.|^-|^•/)) {
      highlights.push(line.replace(/^\d\.|^-|^•/, '').trim());
      if (highlights.length >= 3) break;
    }
  }
  
  return highlights.slice(0, 3);
}

function extractCulturalInfo(lines: string[]): any {
  const culturalInfo = {
    language: '',
    currency: '',
    bestTimeToVisit: '',
    famousFor: [] as string[],
  };

  const text = lines.join('\n');
  
  // 언어 추출
  const langMatch = text.match(/언어[:\s]+([^\n,]+)/i);
  culturalInfo.language = langMatch ? langMatch[1].trim() : '현지 언어';
  
  // 화폐 추출
  const currencyMatch = text.match(/화폐[:\s]+([^\n,]+)/i);
  culturalInfo.currency = currencyMatch ? currencyMatch[1].trim() : '현지 통화';
  
  // 최적 시기 추출
  const timeMatch = text.match(/최적[^\n]*시기[:\s]+([^\n]+)/i);
  culturalInfo.bestTimeToVisit = timeMatch ? timeMatch[1].trim() : '봄, 가을';
  
  // 유명한 것들 추출
  const famousMatch = text.match(/유명[^\n]*[:\s]+([^\n]+)/i);
  if (famousMatch) {
    culturalInfo.famousFor = famousMatch[1].split(/,|、/).map(item => item.trim()).slice(0, 3);
  }
  
  return culturalInfo;
}

function extractTravelTips(lines: string[]): string[] {
  const tips: string[] = [];
  let inTips = false;
  
  for (const line of lines) {
    if (line.includes('여행 팁') || line.includes('팁')) {
      inTips = true;
      continue;
    }
    if (inTips && line.match(/^\d\.|^-|^•/)) {
      tips.push(line.replace(/^\d\.|^-|^•/, '').trim());
      if (tips.length >= 3) break;
    }
  }
  
  return tips.slice(0, 3);
}

function extractLearningPoints(lines: string[]): string[] {
  const points: string[] = [];
  let inPoints = false;
  
  for (const line of lines) {
    if (line.includes('학습 포인트') || line.includes('교육')) {
      inPoints = true;
      continue;
    }
    if (inPoints && line.match(/^\d\.|^-|^•/)) {
      points.push(line.replace(/^\d\.|^-|^•/, '').trim());
      if (points.length >= 3) break;
    }
  }
  
  // 학습 포인트가 없으면 기본값 제공
  if (points.length === 0) {
    points.push('현지 문화와 전통 이해하기');
    points.push('역사적 배경 알아보기');
    points.push('언어와 인사말 배우기');
  }
  
  return points.slice(0, 3);
}