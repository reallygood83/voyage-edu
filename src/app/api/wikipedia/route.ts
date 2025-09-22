import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const country = searchParams.get('country');

  if (!city) {
    return NextResponse.json({ error: '도시명이 필요합니다.' }, { status: 400 });
  }

  try {
    // 한국어 Wikipedia API 호출
    const koQuery = city;
    const koResult = await fetchWikipediaData(koQuery, 'ko');
    
    if (koResult) {
      return NextResponse.json(koResult);
    }

    // 영어 Wikipedia API 호출 (한국어에서 찾지 못한 경우)
    const enQuery = country ? `${city}, ${country}` : city;
    const enResult = await fetchWikipediaData(enQuery, 'en');
    
    if (enResult) {
      return NextResponse.json(enResult);
    }

    // Mock 데이터 반환
    return NextResponse.json(getMockData(city));

  } catch (error) {
    console.error('Wikipedia API Error:', error);
    return NextResponse.json(getMockData(city));
  }
}

async function fetchWikipediaData(query: string, lang: string) {
  const baseUrl = lang === 'ko' 
    ? 'https://ko.wikipedia.org/w/api.php'
    : 'https://en.wikipedia.org/w/api.php';

  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    origin: '*',
    prop: 'extracts|pageimages|coordinates',
    exintro: 'true',
    explaintext: 'true',
    exsentences: '5',
    piprop: 'thumbnail',
    pithumbsize: '500',
    titles: query
  });

  try {
    const response = await fetch(`${baseUrl}?${params}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const pages = data.query?.pages;
    
    if (!pages) return null;
    
    const pageId = Object.keys(pages)[0];
    
    if (pageId === '-1') {
      return null;
    }

    const page = pages[pageId];
    
    return {
      summary: page.extract || '',
      mainImage: page.thumbnail?.source,
      coordinates: page.coordinates?.[0] ? {
        lat: page.coordinates[0].lat,
        lng: page.coordinates[0].lon
      } : undefined,
      geography: page.extract ? extractSection(page.extract, '지리') : '지리적으로 독특한 위치에 자리잡고 있습니다.',
      climate: page.extract ? extractSection(page.extract, '기후') : '사계절이 뚜렷하며, 각 계절마다 다른 매력을 보여줍니다.',
      culture: page.extract ? extractSection(page.extract, '문화') : '전통과 현대가 조화롭게 공존하는 문화를 가지고 있습니다.',
      relationWithKorea: '한국과 활발한 교류를 하고 있는 도시입니다.',
      bestSeasons: ['봄', '가을'],
      famousFor: ['관광 명소', '현지 음식', '문화 체험'],
      mustVisit: ['주요 관광지', '박물관', '전통 시장'],
      localFood: ['현지 특색 음식'],
      festivals: ['계절별 축제']
    };
  } catch (error) {
    console.error(`Wikipedia ${lang} API error:`, error);
    return null;
  }
}

function extractSection(text: string, keyword: string): string {
  const sentences = text.split('.');
  const relevantSentences = sentences.filter(sentence => 
    sentence.toLowerCase().includes(keyword.toLowerCase())
  );
  
  return relevantSentences.length > 0 
    ? relevantSentences.slice(0, 2).join('.') + '.'
    : text.split('.').slice(0, 2).join('.') + '.';
}

function getMockData(city: string) {
  const mockDatabase: Record<string, any> = {
    'Tokyo': {
      summary: '도쿄는 일본의 수도이자 최대 도시로, 현대와 전통이 조화롭게 공존하는 메트로폴리탄입니다.',
      geography: '일본 혼슈 섬 동쪽에 위치하며, 도쿄만에 인접해 있습니다.',
      climate: '온대 습윤 기후로 사계절이 뚜렷하며, 여름은 덥고 습하고 겨울은 온화합니다.',
      culture: '전통 신사와 현대적인 고층빌딩이 공존하며, 애니메이션과 게임 문화의 중심지입니다.',
      relationWithKorea: '서울에서 비행기로 2시간 30분 거리에 있으며, 한국인이 가장 많이 방문하는 해외 도시 중 하나입니다.',
      bestSeasons: ['봄 (3-5월)', '가을 (9-11월)'],
      population: '약 1,400만명',
      language: ['일본어'],
      currency: '엔(¥)',
      timezone: 'UTC+9 (한국과 동일)',
      famousFor: ['스시', '라멘', '벚꽃', '아키하바라', '시부야 스크램블'],
      mustVisit: ['센소지', '도쿄 스카이트리', '메이지 신궁', '츠키지 시장', '디즈니랜드'],
      localFood: ['스시', '라멘', '텐푸라', '우동', '돈카츠'],
      festivals: ['벚꽃 축제 (3-4월)', '스미다가와 불꽃축제 (7월)', '산자 마츠리 (5월)']
    },
    'Paris': {
      summary: '파리는 프랑스의 수도이자 예술과 낭만의 도시로, 세계적인 관광 명소입니다.',
      geography: '프랑스 북부 센강 유역에 위치하며, 일드프랑스 지역의 중심입니다.',
      climate: '온대 해양성 기후로 연중 온화하며, 여름은 따뜻하고 겨울은 서늘합니다.',
      culture: '예술, 패션, 요리의 세계적 중심지로 루브르 박물관, 오르세 미술관 등이 유명합니다.',
      relationWithKorea: '서울에서 직항으로 약 12시간, 유럽 여행의 관문 도시입니다.',
      bestSeasons: ['봄 (4-6월)', '초가을 (9-10월)'],
      population: '약 220만명',
      language: ['프랑스어'],
      currency: '유로(€)',
      timezone: 'UTC+1 (한국보다 8시간 늦음)',
      famousFor: ['에펠탑', '루브르 박물관', '개선문', '샹젤리제', '몽마르뜨'],
      mustVisit: ['에펠탑', '루브르 박물관', '노트르담 대성당', '베르사유 궁전', '개선문'],
      localFood: ['크루아상', '바게트', '에스카르고', '푸아그라', '마카롱'],
      festivals: ['바스티유 데이 (7월 14일)', '음악 축제 (6월 21일)', '백야 축제 (10월)']
    },
    'London': {
      summary: '런던은 영국의 수도이자 세계적인 금융과 문화의 중심지입니다.',
      geography: '영국 남동부 템스강 유역에 위치한 대도시입니다.',
      climate: '온대 해양성 기후로 연중 온화하고 비가 자주 옵니다.',
      culture: '대영박물관, 빅벤, 버킹엄 궁전 등 역사적 명소가 많습니다.',
      relationWithKorea: '서울에서 직항으로 약 11시간, 유럽 여행의 관문입니다.',
      bestSeasons: ['여름 (6-8월)', '초가을 (9월)'],
      famousFor: ['빅벤', '런던 아이', '타워 브릿지', '대영박물관'],
      mustVisit: ['빅벤', '버킹엄 궁전', '대영박물관', '타워 브릿지'],
      localFood: ['피쉬 앤 칩스', '선데이 로스트', '티 앤 스콘'],
      festivals: ['에든버러 페스티벌', '노팅힐 카니발']
    }
  };

  // 도시명으로 직접 매칭 시도
  if (mockDatabase[city]) {
    return mockDatabase[city];
  }

  // 기본 데이터 반환
  return {
    summary: `${city}은(는) 매력적인 여행지입니다. 독특한 문화와 아름다운 경관을 자랑합니다.`,
    geography: '지리적으로 독특한 위치에 자리잡고 있습니다.',
    climate: '사계절이 뚜렷하며, 각 계절마다 다른 매력을 보여줍니다.',
    culture: '전통과 현대가 조화롭게 공존하는 문화를 가지고 있습니다.',
    relationWithKorea: '한국과 활발한 교류를 하고 있는 도시입니다.',
    bestSeasons: ['봄', '가을'],
    population: '약 100만명',
    language: ['현지어'],
    currency: '현지 화폐',
    timezone: 'UTC+0',
    famousFor: ['관광 명소', '현지 음식', '문화 체험'],
    mustVisit: ['주요 관광지', '박물관', '전통 시장'],
    localFood: ['현지 특색 음식'],
    festivals: ['계절별 축제']
  };
}