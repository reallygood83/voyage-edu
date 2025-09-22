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
      
      아래 형식에 맞춰 ${city}에 대한 상세한 여행 및 문화 정보를 제공해주세요.
      각 섹션은 명확하게 구분하고, 풍부한 내용을 포함해주세요.
      
      [기본 정보]
      - 도시 소개: (3-4문장으로 도시의 특징과 매력을 설명)
      - 국가: (도시가 속한 국가)
      - 인구: (대략적인 인구수)
      - 면적: (도시 면적)
      
      [주요 특징]
      1. (첫 번째 주요 특징)
      2. (두 번째 주요 특징)
      3. (세 번째 주요 특징)
      
      [문화 정보]
      - 언어: (공용어 및 주요 사용 언어)
      - 화폐: (통화 단위 및 환율 정보)
      - 최적 여행 시기: (계절별 특징 포함)
      - 시차: (한국 기준 시차)
      - 종교: (주요 종교)
      - 음식 문화: (대표 음식 3-4가지)
      
      [유명한 것들]
      1. (관광지/명소 1)
      2. (관광지/명소 2)
      3. (관광지/명소 3)
      4. (특산품/문화 1)
      5. (특산품/문화 2)
      
      [여행 팁]
      1. (실용적인 팁 1)
      2. (실용적인 팁 2)
      3. (실용적인 팁 3)
      4. (실용적인 팁 4)
      5. (실용적인 팁 5)
      
      [교육적 학습 포인트]
      1. (역사/문화 관련 학습 포인트)
      2. (지리/환경 관련 학습 포인트)
      3. (사회/경제 관련 학습 포인트)
      
      [추천 활동]
      1. (가족/어린이 추천 활동)
      2. (문화 체험 활동)
      3. (교육적 활동)
      
      각 정보는 구체적이고 유용하게 작성해주세요.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // 텍스트 파싱하여 구조화된 데이터로 변환
    console.log('Gemini API 응답:', text);
    
    const searchResult = parseGeminiResponse(text, city);
    console.log('파싱된 결과:', searchResult);

    return NextResponse.json(searchResult);
  } catch (error) {
    console.error('Gemini API 오류:', error);
    return NextResponse.json(
      { error: 'AI 검색 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 강화된 파싱 함수
function parseGeminiResponse(text: string, city: string): any {
  const sections = extractSections(text);
  
  return {
    city: city,
    country: extractFromSection(sections, '기본 정보', '국가') || 'Unknown',
    summary: extractFromSection(sections, '기본 정보', '도시 소개') || `${city}는 매력적인 도시입니다.`,
    basicInfo: {
      population: extractFromSection(sections, '기본 정보', '인구') || '정보 없음',
      area: extractFromSection(sections, '기본 정보', '면적') || '정보 없음',
    },
    highlights: extractListFromSection(sections, '주요 특징') || ['역사적 의미', '문화적 다양성', '독특한 매력'],
    culturalInfo: {
      language: extractFromSection(sections, '문화 정보', '언어') || '현지 언어',
      currency: extractFromSection(sections, '문화 정보', '화폐') || '현지 통화',
      bestTimeToVisit: extractFromSection(sections, '문화 정보', '최적 여행 시기') || '봄, 가을',
      timezone: extractFromSection(sections, '문화 정보', '시차') || '정보 없음',
      religion: extractFromSection(sections, '문화 정보', '종교') || '다양한 종교',
      foodCulture: extractFromSection(sections, '문화 정보', '음식 문화') || '현지 특색 음식',
      famousFor: extractListFromSection(sections, '유명한 것들') || ['관광 명소', '전통 문화', '현지 음식']
    },
    travelTips: extractListFromSection(sections, '여행 팁') || [
      '현지 문화를 존중하세요',
      '기본 인사말을 배우세요',
      '교통 패스를 활용하세요'
    ],
    learningPoints: extractListFromSection(sections, '교육적 학습 포인트') || [
      '현지 역사 이해하기',
      '전통 문화 체험하기',
      '언어 기초 배우기'
    ],
    recommendedActivities: extractListFromSection(sections, '추천 활동') || [
      '가족 친화적 활동',
      '문화 체험',
      '교육적 견학'
    ]
  };
}

function extractSections(text: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const lines = text.split('\n');
  let currentSection = '';
  let currentContent: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // 섹션 헤더 감지 ([섹션명] 형태)
    const sectionMatch = trimmedLine.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      // 이전 섹션 저장
      if (currentSection && currentContent.length > 0) {
        sections[currentSection] = currentContent.join('\n');
      }
      
      // 새 섹션 시작
      currentSection = sectionMatch[1];
      currentContent = [];
    } else if (currentSection && trimmedLine) {
      currentContent.push(trimmedLine);
    }
  }
  
  // 마지막 섹션 저장
  if (currentSection && currentContent.length > 0) {
    sections[currentSection] = currentContent.join('\n');
  }
  
  return sections;
}

function extractFromSection(sections: Record<string, string>, sectionName: string, fieldName: string): string | null {
  const section = sections[sectionName];
  if (!section) return null;
  
  const fieldMatch = section.match(new RegExp(`-\\s*${fieldName}[:\\s]+(.+?)(?:\\n|$)`, 'i'));
  return fieldMatch ? fieldMatch[1].trim() : null;
}

function extractListFromSection(sections: Record<string, string>, sectionName: string): string[] | null {
  const section = sections[sectionName];
  if (!section) return null;
  
  const lines = section.split('\n');
  const listItems: string[] = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    const listMatch = trimmedLine.match(/^\d+\.\s*(.+)$/);
    if (listMatch) {
      listItems.push(listMatch[1].trim());
    }
  }
  
  return listItems.length > 0 ? listItems : null;
}