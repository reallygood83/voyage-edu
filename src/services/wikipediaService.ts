'use client';

export interface DestinationInfo {
  summary: string;
  geography?: string;
  climate?: string;
  culture?: string;
  relationWithKorea?: string;
  bestSeasons?: string[];
  mainImage?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  population?: string;
  language?: string[];
  currency?: string;
  timezone?: string;
  famousFor?: string[];
  mustVisit?: string[];
  localFood?: string[];
  festivals?: string[];
}

export class WikipediaService {
  private static readonly WIKIPEDIA_API_URL = 'https://ko.wikipedia.org/w/api.php';
  private static readonly EN_WIKIPEDIA_API_URL = 'https://en.wikipedia.org/w/api.php';

  /**
   * 도시/국가 정보를 Wikipedia에서 가져오기
   */
  static async getDestinationInfo(cityName: string, countryName?: string): Promise<DestinationInfo | null> {
    try {
      // 먼저 한국어 Wikipedia에서 검색
      let info = await this.searchWikipedia(cityName, this.WIKIPEDIA_API_URL);
      
      // 한국어에서 못 찾으면 영어로 시도
      if (!info && countryName) {
        info = await this.searchWikipedia(`${cityName}, ${countryName}`, this.EN_WIKIPEDIA_API_URL);
      }

      if (!info) {
        // Mock 데이터 반환 (실제 API 실패 시)
        return this.getMockDestinationInfo(cityName);
      }

      return info;
    } catch (error) {
      console.error('Wikipedia API error:', error);
      return this.getMockDestinationInfo(cityName);
    }
  }

  /**
   * Wikipedia API를 통한 검색
   */
  private static async searchWikipedia(query: string, apiUrl: string): Promise<DestinationInfo | null> {
    try {
      // Wikipedia Search API
      const searchParams = new URLSearchParams({
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

      const response = await fetch(`${apiUrl}?${searchParams}`);
      
      if (!response.ok) {
        throw new Error(`Wikipedia API error: ${response.status}`);
      }

      const data = await response.json();
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      
      if (pageId === '-1') {
        return null;
      }

      const page = pages[pageId];
      
      return {
        summary: page.extract || '',
        mainImage: page.thumbnail?.source || undefined,
        coordinates: page.coordinates?.[0] ? {
          lat: page.coordinates[0].lat,
          lng: page.coordinates[0].lon
        } : undefined
      };
    } catch (error) {
      console.error('Wikipedia search error:', error);
      return null;
    }
  }

  /**
   * Mock 데이터 생성 (API 실패 시 대체)
   */
  private static getMockDestinationInfo(cityName: string): DestinationInfo {
    const mockData: Record<string, DestinationInfo> = {
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
      'New York': {
        summary: '뉴욕은 미국 최대 도시이자 세계 금융, 예술, 패션의 중심지입니다.',
        geography: '미국 동부 해안에 위치하며, 맨해튼, 브루클린 등 5개 자치구로 구성됩니다.',
        climate: '습윤 대륙성 기후로 여름은 덥고 습하며, 겨울은 춥고 눈이 많이 옵니다.',
        culture: '세계 각국의 문화가 융합된 다문화 도시로, 브로드웨이와 현대 미술의 중심지입니다.',
        relationWithKorea: '서울에서 직항으로 약 14시간, 미국 동부 여행의 시작점입니다.',
        bestSeasons: ['봄 (4-6월)', '가을 (9-11월)'],
        population: '약 840만명',
        language: ['영어'],
        currency: '미국 달러($)',
        timezone: 'UTC-5 (한국보다 14시간 늦음)',
        famousFor: ['자유의 여신상', '타임스스퀘어', '센트럴파크', '브로드웨이', '월스트리트'],
        mustVisit: ['자유의 여신상', '엠파이어 스테이트 빌딩', '9/11 메모리얼', 'MoMA', '브루클린 브릿지'],
        localFood: ['뉴욕 피자', '베이글', '핫도그', '치즈케이크', '델리 샌드위치'],
        festivals: ['새해 전야제 (12월 31일)', '독립기념일 (7월 4일)', '할로윈 퍼레이드 (10월 31일)']
      },
      'Bangkok': {
        summary: '방콕은 태국의 수도로 불교 문화와 현대적 도시가 조화를 이루는 동남아시아의 관문입니다.',
        geography: '태국 중부 짜오프라야 강 삼각주에 위치한 대도시입니다.',
        climate: '열대 몬순 기후로 연중 덥고 습하며, 5-10월은 우기입니다.',
        culture: '불교 사원과 왕궁, 수상시장 등 전통과 현대가 공존하는 도시입니다.',
        relationWithKorea: '서울에서 직항으로 약 5시간 30분, 동남아 배낭여행의 시작점입니다.',
        bestSeasons: ['건기 (11-2월)'],
        population: '약 1,000만명',
        language: ['태국어'],
        currency: '바트(฿)',
        timezone: 'UTC+7 (한국보다 2시간 늦음)',
        famousFor: ['왓 아룬', '왕궁', '카오산 로드', '수상시장', '태국 마사지'],
        mustVisit: ['왕궁', '왓 포', '왓 아룬', '짜뚜짝 주말시장', '카오산 로드'],
        localFood: ['팟타이', '똠양꿍', '망고 스티키 라이스', '그린 커리', '쏨땀'],
        festivals: ['송끄란 (4월 13-15일)', '러이끄라통 (11월)', '중국 새해 (1-2월)']
      },
      'Sydney': {
        summary: '시드니는 호주 최대 도시로 아름다운 항구와 해변을 자랑하는 국제도시입니다.',
        geography: '호주 동부 해안에 위치하며, 세계 3대 미항 중 하나입니다.',
        climate: '온대 해양성 기후로 연중 온화하며, 12-2월이 여름입니다.',
        culture: '다문화 도시로 서핑 문화와 야외 활동이 활발합니다.',
        relationWithKorea: '서울에서 직항으로 약 10시간, 남반구 여행의 관문입니다.',
        bestSeasons: ['봄 (9-11월)', '가을 (3-5월)'],
        population: '약 530만명',
        language: ['영어'],
        currency: '호주 달러(A$)',
        timezone: 'UTC+10 (한국보다 1시간 빠름)',
        famousFor: ['오페라 하우스', '하버 브릿지', '본다이 비치', '블루 마운틴'],
        mustVisit: ['오페라 하우스', '하버 브릿지', '본다이 비치', '타롱가 동물원', '달링 하버'],
        localFood: ['미트 파이', '피시 앤 칩스', '팀탐', '파블로바', '캥거루 스테이크'],
        festivals: ['새해 불꽃축제 (1월 1일)', '비비드 시드니 (5-6월)', '마디그라 (2-3월)']
      }
    };

    // 기본 데이터
    const defaultInfo: DestinationInfo = {
      summary: `${cityName}은(는) 매력적인 여행지입니다. 독특한 문화와 아름다운 경관을 자랑합니다.`,
      geography: '지리적으로 독특한 위치에 자리잡고 있습니다.',
      climate: '사계절이 뚜렷하며, 각 계절마다 다른 매력을 보여줍니다.',
      culture: '전통과 현대가 조화롭게 공존하는 문화를 가지고 있습니다.',
      relationWithKorea: '한국과 활발한 교류를 하고 있는 도시입니다.',
      bestSeasons: ['봄', '가을'],
      famousFor: ['관광 명소', '현지 음식', '문화 체험'],
      mustVisit: ['주요 관광지', '박물관', '전통 시장'],
      localFood: ['전통 요리', '길거리 음식', '디저트'],
      festivals: ['봄 축제', '여름 축제', '가을 축제', '겨울 축제']
    };

    return mockData[cityName] || defaultInfo;
  }

  /**
   * 날씨 기반 여행 추천 시기 계산
   */
  static getBestTravelSeasons(cityName: string): string[] {
    // 도시별 최적 여행 시기 데이터
    const seasonData: Record<string, string[]> = {
      'Tokyo': ['3-5월 (벚꽃 시즌)', '10-11월 (단풍 시즌)'],
      'Bangkok': ['11-2월 (건기, 선선한 날씨)'],
      'Paris': ['5-6월 (봄)', '9-10월 (초가을)'],
      'Sydney': ['9-11월 (봄)', '3-5월 (가을)'],
      'New York': ['4-6월 (봄)', '9-11월 (가을)'],
      'Beijing': ['4-5월 (봄)', '9-10월 (가을)'],
      'Rome': ['4-6월 (봄)', '9-11월 (가을)'],
      'London': ['5-9월 (여름)'],
      'Berlin': ['5-9월 (늦봄-초가을)'],
      'Barcelona': ['4-6월 (봄)', '9-11월 (가을)']
    };

    return seasonData[cityName] || ['봄 (3-5월)', '가을 (9-11월)'];
  }
}