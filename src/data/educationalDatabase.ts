/**
 * 교육용 세계 문화 데이터베이스
 * Wikipedia API 없이도 풍부한 교육 자료 제공
 * 교육적 목적으로 큐레이션된 고품질 콘텐츠
 */

export interface EducationalCityData {
  // 기본 정보
  name: string;
  nameKo: string;
  country: string;
  countryKo: string;
  continent: string;
  population: string;
  area: string;
  coordinates: { lat: number; lng: number };
  
  // 지리적 특성
  geography: {
    location: string;
    terrain: string;
    naturalFeatures: string[];
    climate: string;
    seasons: string[];
  };
  
  // 문화적 특색
  culture: {
    mainLanguages: string[];
    religions: string[];
    traditions: string[];
    modernCulture: string[];
    artAndLiterature: string[];
    musicAndDance: string[];
  };
  
  // 역사적 배경
  history: {
    ancientHistory: string;
    modernHistory: string;
    historicalSites: string[];
    importantEvents: string[];
  };
  
  // 교육적 가치
  educational: {
    keyLearningPoints: string[];
    culturalLessons: string[];
    globalConnections: string[];
    modernRelevance: string[];
  };
  
  // 한국과의 관계
  relationWithKorea: {
    diplomaticRelations: string;
    culturalExchange: string;
    economicTies: string;
    travelInfo: string;
    studyAbroad: string;
  };
  
  // 실용적 정보
  practical: {
    currency: string;
    timeZone: string;
    bestVisitTime: string[];
    mustVisitPlaces: string[];
    famousFood: string[];
    festivals: string[];
    transportation: string[];
  };
  
  // 교육 활동 제안
  activities: {
    compareAndContrast: string[];
    researchTopics: string[];
    creativeTasks: string[];
    discussionQuestions: string[];
  };
}

export const EDUCATIONAL_CITIES_DATABASE: Record<string, EducationalCityData> = {
  // 아시아
  'Tokyo': {
    name: 'Tokyo',
    nameKo: '도쿄',
    country: 'Japan',
    countryKo: '일본',
    continent: '아시아',
    population: '약 1,400만명 (도쿄도)',
    area: '2,194 km²',
    coordinates: { lat: 35.6762, lng: 139.6503 },
    
    geography: {
      location: '일본 혼슈 섬 동쪽, 도쿄만에 인접한 간토 평야에 위치',
      terrain: '평야 지대로 이루어져 있으며, 서쪽으로는 산맥이 둘러싸고 있음',
      naturalFeatures: ['도쿄만', '스미다강', '아라카와강', '타마강', '도쿄만 인공섬들'],
      climate: '온대 습윤 기후로 사계절이 뚜렷함',
      seasons: ['봄: 벚꽃 시즌 (3-5월)', '여름: 덥고 습함 (6-8월)', '가을: 단풍 시즌 (9-11월)', '겨울: 온화하고 건조 (12-2월)']
    },
    
    culture: {
      mainLanguages: ['일본어'],
      religions: ['신토', '불교', '기독교'],
      traditions: ['다도', '꽃꽂이(이케바나)', '서예', '기모노 문화', '절하는 인사법'],
      modernCulture: ['애니메이션과 만화', '게임 문화', '아이돌 문화', '하라주쿠 패션', 'J-POP'],
      artAndLiterature: ['하이쿠 시', '무라카미 하루키', '우키요에 목판화', '가부키 연극'],
      musicAndDance: ['전통 가가쿠 음악', '타이코 북', '부토 무용', 'J-POP', '비주얼 록']
    },
    
    history: {
      ancientHistory: '에도 시대(1603-1868)에는 에도라는 이름으로 불렸으며, 도쿠가와 막부의 중심지였음',
      modernHistory: '1868년 메이지 유신 후 도쿄로 개명되어 일본의 수도가 되었으며, 급속한 서구화와 근대화를 경험',
      historicalSites: ['센소지 절', '메이지 신궁', '도쿄역', '황궁', '에도 도쿄 박물관'],
      importantEvents: ['1923년 관동대지진', '1945년 도쿄 대공습', '1964년 도쿄 올림픽', '2021년 도쿄 올림픽']
    },
    
    educational: {
      keyLearningPoints: [
        '전통과 현대가 조화롭게 공존하는 도시 발전 모델',
        '자연재해에 대응하는 도시 계획과 건축 기술',
        '첨단 기술과 전통 문화의 융합',
        '대중교통 시스템의 효율성과 정시성'
      ],
      culturalLessons: [
        '상대방을 배려하는 일본의 예의 문화',
        '완벽함을 추구하는 장인 정신(쇼쿠닌)',
        '집단 조화를 중시하는 사회 문화',
        '자연과 인간의 조화를 추구하는 철학'
      ],
      globalConnections: [
        '세계 3대 금융 중심지 중 하나',
        '아시아 팝 문화의 발신지',
        '로봇 공학과 AI 기술의 선두주자',
        '국제 외교와 경제 협력의 중심'
      ],
      modernRelevance: [
        '스마트 시티 기술의 모범 사례',
        '고령화 사회 대응 전략',
        '지속 가능한 도시 발전 모델',
        '문화 콘텐츠 산업의 글로벌 영향력'
      ]
    },
    
    relationWithKorea: {
      diplomaticRelations: '1965년 한일 기본 조약 이후 정치적 관계를 유지하고 있으며, 때로는 역사 문제로 갈등이 있지만 경제적 협력은 지속됨',
      culturalExchange: '한류와 일류의 상호 교류가 활발하며, K-POP과 J-POP, 드라마와 애니메이션 등이 서로 인기',
      economicTies: '한국의 3대 교역 상대국 중 하나이며, 자동차, 전자제품, 화학 분야에서 경쟁과 협력 관계',
      travelInfo: '서울에서 비행기로 2시간 30분, 한국인이 가장 많이 방문하는 해외 도시 중 하나',
      studyAbroad: '한국 학생들의 일본 유학 1순위 도시이며, 일본 학생들도 서울 유학을 많이 선택'
    },
    
    practical: {
      currency: '엔(¥)',
      timeZone: 'UTC+9 (한국과 동일)',
      bestVisitTime: ['봄 (3-5월): 벚꽃 시즌', '가을 (9-11월): 단풍과 쾌적한 날씨'],
      mustVisitPlaces: ['센소지 절', '도쿄 스카이트리', '메이지 신궁', '시부야 교차로', '츠키지 시장', '긴자', '하라주쿠'],
      famousFood: ['스시', '라멘', '텐푸라', '우동', '돈카츠', '모쿠나베', '타이야키'],
      festivals: ['벚꽃 축제 (3-4월)', '스미다가와 불꽃축제 (7월)', '산자 마츠리 (5월)', '간다 마츠리 (5월)'],
      transportation: ['JR 야마노테선', '지하철', '신칸센', '버스', '택시']
    },
    
    activities: {
      compareAndContrast: [
        '도쿄와 서울의 대중교통 시스템 비교하기',
        '일본과 한국의 전통 건축 양식 차이점 찾기',
        '양국의 음식 문화와 식사 예절 비교',
        '현대 기술 발전 양상과 활용 방식 분석'
      ],
      researchTopics: [
        '에도 시대부터 현재까지 도쿄의 도시 발전사',
        '일본의 자연재해 대비 건축 기술',
        '일본 애니메이션 산업이 세계에 미친 영향',
        '일본의 고령화 사회 대응 정책'
      ],
      creativeTasks: [
        '도쿄 여행 가이드북 만들기',
        '일본 전통 문화 체험 프로그램 설계하기',
        '한일 문화 교류 이벤트 기획하기',
        '미래의 도쿄 모습 상상해서 그리기'
      ],
      discussionQuestions: [
        '전통과 현대가 조화롭게 공존하려면 어떤 노력이 필요할까?',
        '자연재해가 많은 지역에서는 어떻게 도시를 계획해야 할까?',
        '문화 콘텐츠가 국가 이미지에 미치는 영향은?',
        '이웃 나라와의 갈등을 해결하는 좋은 방법은?'
      ]
    }
  },

  'Paris': {
    name: 'Paris',
    nameKo: '파리',
    country: 'France',
    countryKo: '프랑스',
    continent: '유럽',
    population: '약 220만명 (파리시), 1,200만명 (일드프랑스)',
    area: '105 km²',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    
    geography: {
      location: '프랑스 북부 센강 유역의 파리 분지에 위치한 내륙 도시',
      terrain: '센강이 도시를 가로지르며, 비교적 평탄한 지형에 몇 개의 언덕이 있음',
      naturalFeatures: ['센강', '몽마르트 언덕', '생트제느비에브 언덕', '불로뉴 숲', '뱅센 숲'],
      climate: '온대 해양성 기후로 연중 온화하며 비가 자주 옴',
      seasons: ['봄: 쾌적하고 화창 (3-5월)', '여름: 따뜻하고 건조 (6-8월)', '가을: 선선하고 아름다운 단풍 (9-11월)', '겨울: 서늘하고 흐림 (12-2월)']
    },
    
    culture: {
      mainLanguages: ['프랑스어'],
      religions: ['가톨릭', '개신교', '이슬람교', '유대교'],
      traditions: ['카페 문화', '패션과 스타일', '미식 문화', '예술 살롱', '부티크 쇼핑'],
      modernCulture: ['현대 미술', '패션 위크', '시네마 문화', '거리 예술', '라이프스타일'],
      artAndLiterature: ['인상주의 회화', '빅토르 위고', '몰리에르', '발자크', '보들레르'],
      musicAndDance: ['클래식 음악', '샹송', '발레', '오페라', '현대 음악']
    },
    
    history: {
      ancientHistory: '기원전 3세기 켈트족의 파리시족이 정착한 루테티아가 기원이며, 로마 제국의 지배를 받았음',
      modernHistory: '중세부터 프랑스의 정치·문화 중심지였으며, 계몽주의와 프랑스 혁명의 발상지',
      historicalSites: ['노트르담 대성당', '루브르 박물관', '베르사유 궁전', '개선문', '사크레쾨르 성당'],
      importantEvents: ['1789년 프랑스 혁명', '1889년 에펠탑 건설', '두 차례 세계대전', '1968년 5월 혁명']
    },
    
    educational: {
      keyLearningPoints: [
        '예술과 문화가 도시 정체성의 핵심인 사례',
        '역사적 건축물 보존과 현대적 개발의 조화',
        '시민 혁명과 민주주의 발전 과정',
        '패션과 미식이 문화 산업으로 발전한 과정'
      ],
      culturalLessons: [
        '예술과 아름다움을 일상에서 추구하는 문화',
        '토론과 비판적 사고를 중시하는 사회',
        '개인의 자유와 표현을 존중하는 가치관',
        '느린 삶과 여유를 즐기는 라이프스타일'
      ],
      globalConnections: [
        '유엔 교육과학문화기구(UNESCO) 본부',
        '국제패션의 중심지',
        '유럽연합(EU)의 주요 정치 중심지',
        '세계 관광산업의 선두주자'
      ],
      modernRelevance: [
        '문화유산 보존과 관광산업 발전의 모범',
        '창조경제와 문화산업의 중요성',
        '도시 계획에서 보행자 중심 설계',
        '지속가능한 교통 정책의 실험장'
      ]
    },
    
    relationWithKorea: {
      diplomaticRelations: '1886년 한불 수호통상조약 이후 오랜 우호 관계를 유지하며, 문화·교육 분야 협력이 활발',
      culturalExchange: '프랑스 문화원과 세종학당을 통한 언어·문화 교류, 한국 현대문화의 프랑스 진출 확대',
      economicTies: '럭셔리 브랜드, 화장품, 항공우주 분야에서 협력하며, 한국 기업의 유럽 진출 거점',
      travelInfo: '서울에서 직항으로 약 12시간, 유럽 여행의 관문 도시 역할',
      studyAbroad: '예술, 패션, 요리 분야 유학지로 인기가 높으며, 프랑스 정부 장학금 프로그램 운영'
    },
    
    practical: {
      currency: '유로(€)',
      timeZone: 'UTC+1 (한국보다 8시간 늦음)',
      bestVisitTime: ['봄 (4-6월): 화창하고 쾌적한 날씨', '초가을 (9-10월): 선선하고 아름다운 계절'],
      mustVisitPlaces: ['에펠탑', '루브르 박물관', '노트르담 대성당', '베르사유 궁전', '개선문', '몽마르트', '샹젤리제'],
      famousFood: ['크루아상', '바게트', '에스카르고', '푸아그라', '마카롱', '프렌치 와인', '치즈'],
      festivals: ['바스티유 데이 (7월 14일)', '음악 축제 (6월 21일)', '백야 축제 (10월)', '파리 패션위크'],
      transportation: ['메트로', 'RER', '버스', '트램', '벨리브(자전거)', '걷기']
    },
    
    activities: {
      compareAndContrast: [
        '파리와 서울의 카페 문화 비교하기',
        '프랑스와 한국의 교육 시스템 차이점',
        '두 나라의 역사적 혁명과 민주화 과정',
        '패션과 뷰티 산업의 발전 양상 비교'
      ],
      researchTopics: [
        '프랑스 혁명이 세계 민주주의에 미친 영향',
        '파리의 도시 계획과 오스만의 파리 개조',
        '인상주의 미술 운동의 탄생과 발전',
        'UNESCO와 문화유산 보호 정책'
      ],
      creativeTasks: [
        '파리 미술관 가이드 만들기',
        '프랑스 요리 레시피북 제작하기',
        '파리를 배경으로 한 소설 쓰기',
        '파리 스타일 패션 디자인하기'
      ],
      discussionQuestions: [
        '예술과 문화가 도시에 미치는 영향은?',
        '역사적 건물을 보존하면서 현대화하는 방법은?',
        '관광업이 지역사회에 미치는 긍정적·부정적 영향은?',
        '서로 다른 문화 간의 교류는 어떤 가치가 있을까?'
      ]
    }
  },

  'New York': {
    name: 'New York',
    nameKo: '뉴욕',
    country: 'United States',
    countryKo: '미국',
    continent: '북아메리카',
    population: '약 840만명 (뉴욕시), 2,000만명 (대도시권)',
    area: '783 km²',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    
    geography: {
      location: '미국 동부 해안 허드슨강 어귀에 위치한 항구 도시',
      terrain: '맨해튼, 브루클린, 퀸즈, 브롱크스, 스태튼 아일랜드 5개 자치구로 구성',
      naturalFeatures: ['허드슨강', '이스트강', '맨해튼 섬', '센트럴파크', '자유의 여신상'],
      climate: '습윤 대륙성 기후로 사계절이 뚜렷하며 여름은 덥고 겨울은 춤',
      seasons: ['봄: 화창하고 쾌적 (3-5월)', '여름: 덥고 습함 (6-8월)', '가을: 선선하고 아름다운 단풍 (9-11월)', '겨울: 춥고 눈이 많음 (12-2월)']
    },
    
    culture: {
      mainLanguages: ['영어', '스페인어', '중국어', '기타 다양한 언어'],
      religions: ['기독교', '유대교', '이슬람교', '힌두교', '불교'],
      traditions: ['이민자 문화', '멜팅팟', '브로드웨이', '재즈', '스트리트 아트'],
      modernCulture: ['힙합', '스트리트 패션', '푸드 트럭', '루프탑 문화', '스타트업'],
      artAndLiterature: ['추상표현주의', '월트 휘트먼', 'F. 스콧 피츠제럴드', '랭스턴 휴즈'],
      musicAndDance: ['재즈', '힙합', '브로드웨이 뮤지컬', '탭댄스', '살사']
    },
    
    history: {
      ancientHistory: '1624년 네덜란드인들이 뉴암스테르담으로 건설했으며, 1664년 영국이 점령하여 뉴욕으로 개명',
      modernHistory: '19-20세기 대규모 이민으로 다민족 도시가 되었으며, 세계 금융과 문화의 중심지로 발전',
      historicalSites: ['자유의 여신상', '엘리스 섬', '브루클린 브릿지', '엠파이어 스테이트 빌딩', '9/11 메모리얼'],
      importantEvents: ['1886년 자유의 여신상 건립', '1929년 대공황', '2001년 9/11 테러', '2012년 허리케인 샌디']
    },
    
    educational: {
      keyLearningPoints: [
        '다문화 사회의 형성과 통합 과정',
        '자본주의와 금융 시스템의 중심지 역할',
        '이민자들의 아메리칸 드림 추구',
        '수직 도시 개발과 고층 건축의 발전'
      ],
      culturalLessons: [
        '다양성 속에서 unity를 찾는 사회 통합',
        '기회의 땅에서 꿈을 실현하려는 도전 정신',
        '경쟁과 협력이 공존하는 비즈니스 문화',
        '예술과 상업이 만나는 창조 경제'
      ],
      globalConnections: [
        '유엔 본부 소재지',
        '세계 금융의 중심 월스트리트',
        '패션과 미디어 산업의 글로벌 허브',
        '국제 비즈니스와 외교의 중심'
      ],
      modernRelevance: [
        '글로벌 도시의 모범 사례',
        '다문화 통합 정책의 실험장',
        '혁신과 창업의 메카',
        '기후 변화 대응 도시 정책'
      ]
    },
    
    relationWithKorea: {
      diplomaticRelations: '한미동맹의 핵심 파트너로서 정치·경제·군사 분야에서 긴밀한 협력 관계',
      culturalExchange: '한류의 미국 진출 교두보이며, K-POP, K-드라마, K-푸드의 인기가 높음',
      economicTies: '한국 기업들의 미국 진출 거점이며, 무역과 투자에서 핵심적 역할',
      travelInfo: '서울에서 직항으로 약 14시간, 미국 동부 여행의 시작점',
      studyAbroad: '한국 학생들의 미국 유학 1순위 도시이며, 명문 대학들이 집중되어 있음'
    },
    
    practical: {
      currency: '미국 달러($)',
      timeZone: 'UTC-5 (한국보다 14시간 늦음)',
      bestVisitTime: ['봄 (4-6월): 쾌적한 날씨와 아름다운 경관', '가을 (9-11월): 선선하고 화창한 날씨'],
      mustVisitPlaces: ['자유의 여신상', '엠파이어 스테이트 빌딩', '센트럴파크', '타임스스퀘어', '브루클린 브릿지', '9/11 메모리얼'],
      famousFood: ['뉴욕 피자', '베이글', '핫도그', '치즈케이크', '델리 샌드위치', '스테이크'],
      festivals: ['새해 전야제 (12월 31일)', '독립기념일 (7월 4일)', '할로윈 퍼레이드 (10월 31일)', '마카롱스 데이 퍼레이드'],
      transportation: ['지하철(Subway)', '버스', '택시', '우버', '시티바이크', '페리']
    },
    
    activities: {
      compareAndContrast: [
        '뉴욕과 서울의 다문화 사회 양상 비교',
        '미국과 한국의 교육 시스템과 입시 제도',
        '양국의 스타트업 생태계와 창업 문화',
        '도시 교통 시스템과 도시 계획 비교'
      ],
      researchTopics: [
        '뉴욕의 이민 역사와 다문화 통합 정책',
        '월스트리트와 세계 금융 시스템',
        '브로드웨이와 공연 예술 산업',
        '9/11 테러가 미국 사회에 미친 영향'
      ],
      creativeTasks: [
        '뉴욕 여행 가이드북 제작하기',
        '미국 이민자의 생활 일기 쓰기',
        '브로드웨이 뮤지컬 시나리오 만들기',
        '뉴욕 스카이라인 그림 그리기'
      ],
      discussionQuestions: [
        '다문화 사회에서 갈등을 줄이고 통합을 이루려면?',
        '자본주의 경제 시스템의 장점과 단점은?',
        '꿈을 이루기 위해 가장 중요한 것은 무엇일까?',
        '대도시의 문제점을 해결하는 방법은?'
      ]
    }
  },

  'London': {
    name: 'London',
    nameKo: '런던',
    country: 'United Kingdom',
    countryKo: '영국',
    continent: '유럽',
    population: '약 900만명 (그레이터 런던)',
    area: '1,572 km²',
    coordinates: { lat: 51.5074, lng: -0.1278 },
    
    geography: {
      location: '영국 남동부 템스강 유역에 위치한 항구 도시',
      terrain: '템스강이 도시를 가로지르며, 비교적 평탄한 지형',
      naturalFeatures: ['템스강', '하이드파크', '리젠트파크', '그리니치 언덕'],
      climate: '온대 해양성 기후로 연중 온화하고 비가 자주 옴',
      seasons: ['봄: 화창하고 쾌적 (3-5월)', '여름: 따뜻하고 일조량 많음 (6-8월)', '가을: 선선하고 비 많음 (9-11월)', '겨울: 춥고 흐림 (12-2월)']
    },
    
    culture: {
      mainLanguages: ['영어'],
      religions: ['개신교', '가톨릭', '이슬람교', '힌두교', '유대교'],
      traditions: ['애프터눈 티', '퍼브 문화', '왕실 전통', '신사 문화', '정원 가꾸기'],
      modernCulture: ['록 음악', '축구 문화', '현대 미술', '패션', '핀테크'],
      artAndLiterature: ['셰익스피어', '찰스 디킨스', '해리 포터', '비틀즈', '터너'],
      musicAndDance: ['클래식 음악', '록', '펑크', '브릿팝', '발레']
    },
    
    history: {
      ancientHistory: '로마 시대 론디니움으로 시작되어 중세부터 영국의 수도 역할',
      modernHistory: '대영제국의 중심지였으며, 산업혁명과 세계 금융업의 발상지',
      historicalSites: ['빅벤', '버킹엄 궁전', '타워 브릿지', '웨스트민스터 사원', '대영박물관'],
      importantEvents: ['1666년 런던 대화재', '제2차 세계대전 런던 대공습', '2012년 런던 올림픽']
    },
    
    educational: {
      keyLearningPoints: [
        '입헌군주제와 민주주의의 발전 과정',
        '산업혁명의 발상지로서의 역사적 의미',
        '세계 금융업의 중심지 역할',
        '문화 다양성과 포용성의 도시 모델'
      ],
      culturalLessons: [
        '전통을 지키면서 변화에 적응하는 보수성',
        '개인주의와 프라이버시를 중시하는 문화',
        '유머와 아이러니를 사랑하는 영국인의 정서',
        '규칙과 질서를 중시하는 사회 시스템'
      ],
      globalConnections: [
        '영연방 국가들의 중심',
        '세계 금융 중심지 시티 오브 런던',
        '국제법과 중재의 중심',
        '영어권 문화의 발신지'
      ],
      modernRelevance: [
        '브렉시트 이후 글로벌 역할 재정립',
        '핀테크와 창조경제의 선두주자',
        '지속가능한 도시 개발의 모범',
        '다문화 사회 통합의 경험'
      ]
    },
    
    relationWithKorea: {
      diplomaticRelations: '1883년 조영수호통상조약 이후 오랜 역사를 가진 우호국',
      culturalExchange: '영국 문화원을 통한 교육·문화 교류, 한류의 유럽 진출 거점',
      economicTies: '금융, 교육, 문화 콘텐츠 분야에서 협력',
      travelInfo: '서울에서 직항으로 약 11시간, 유럽 여행의 관문',
      studyAbroad: '영어권 유학의 최고 선호 목적지, 명문 대학들의 집결지'
    },
    
    practical: {
      currency: '파운드 스털링(£)',
      timeZone: 'UTC+0 (한국보다 9시간 늦음)',
      bestVisitTime: ['여름 (6-8월): 가장 따뜻하고 일조량 많음', '초가을 (9월): 선선하고 쾌적'],
      mustVisitPlaces: ['빅벤', '버킹엄 궁전', '대영박물관', '타워 브릿지', '런던 아이', '하이드파크'],
      famousFood: ['피쉬 앤 칩스', '선데이 로스트', '티 앤 스콘', '파이', '풀 잉글리시 브렉퍼스트'],
      festivals: ['노팅힐 카니발 (8월)', '에든버러 페스티벌', '본파이어 나이트 (11월 5일)'],
      transportation: ['언더그라운드(지하철)', '더블데커 버스', '택시(블랙캡)', '보리스 바이크']
    },
    
    activities: {
      compareAndContrast: [
        '영국과 한국의 입헌군주제 비교',
        '런던과 서울의 금융업 발전 비교',
        '양국의 교육 시스템과 대학 문화',
        '차 문화와 커피 문화 비교'
      ],
      researchTopics: [
        '산업혁명이 세계에 미친 영향',
        '대영제국의 역사와 현재의 영연방',
        '셰익스피어와 영문학의 세계적 영향',
        '브렉시트의 배경과 결과'
      ],
      creativeTasks: [
        '런던 박물관 가이드 만들기',
        '영국 왕실 가계도 그리기',
        '셰익스피어 작품 현대적 각색하기',
        '런던 지하철 노선도 디자인하기'
      ],
      discussionQuestions: [
        '전통과 현대를 조화시키는 방법은?',
        '군주제가 현대 사회에서 갖는 의미는?',
        '글로벌 언어로서 영어의 영향력은?',
        '도시의 정체성을 지키면서 발전하는 방법은?'
      ]
    }
  },

  'Bangkok': {
    name: 'Bangkok',
    nameKo: '방콕',
    country: 'Thailand',
    countryKo: '태국',
    continent: '아시아',
    population: '약 1,000만명',
    area: '1,569 km²',
    coordinates: { lat: 13.7563, lng: 100.5018 },
    
    geography: {
      location: '태국 중부 짜오프라야 강 삼각주에 위치',
      terrain: '강과 운하가 많은 평야 지대',
      naturalFeatures: ['짜오프라야강', '수상시장', '왕궁', '사원들'],
      climate: '열대 몬순 기후로 연중 덥고 습함',
      seasons: ['건기 (11-2월): 선선하고 쾌적', '더위 (3-5월): 매우 덥고 건조', '우기 (6-10월): 덥고 비 많음']
    },
    
    culture: {
      mainLanguages: ['태국어'],
      religions: ['상좌불교', '이슬람교', '기독교', '힌두교'],
      traditions: ['불교 문화', '와이(합장) 인사', '태국 마사지', '무에타이', '송끄란'],
      modernCulture: ['스트리트 푸드', '쇼핑몰 문화', '투크투크', '루프탑 바'],
      artAndLiterature: ['태국 고전 무용', '전통 조각', '사원 벽화', '현대 태국 영화'],
      musicAndDance: ['전통 태국 음악', '캬논(전통 무용)', '룩퉁(민요)', '모던 팝']
    },
    
    history: {
      ancientHistory: '아유타야 왕국의 후예로 1782년 짜끄리 왕조가 수도로 정함',
      modernHistory: '서구 열강의 식민지배를 피하며 독립을 유지한 동남아시아 유일의 나라',
      historicalSites: ['왕궁', '왓 포', '왓 아룬', '짐 톰슨 하우스', '방파인 궁전'],
      importantEvents: ['1782년 방콕 천도', '1932년 입헌군주제 성립', '1997년 아시아 금융위기']
    },
    
    educational: {
      keyLearningPoints: [
        '동남아시아에서 식민지배를 피한 유일한 국가',
        '불교 문화가 일상에 깊이 스며든 사회',
        '전통과 현대가 공존하는 관광 대국',
        '아세안(ASEAN)의 중심 국가'
      ],
      culturalLessons: [
        '온화하고 평화로운 미소의 나라 정신',
        '계급과 나이를 중시하는 위계 문화',
        '불교의 자비와 관용 정신',
        '손님을 극진히 대접하는 환대 문화'
      ],
      globalConnections: [
        'ASEAN 창립 멤버국',
        '동남아시아 관광업의 허브',
        '세계 쌀 수출 대국',
        '동서양을 잇는 교통 요충지'
      ],
      modernRelevance: [
        '지속가능한 관광업 발전 모델',
        '불교 철학의 현대적 적용',
        '동남아시아 경제 통합의 중심',
        '다종교 사회의 평화로운 공존'
      ]
    },
    
    relationWithKorea: {
      diplomaticRelations: '1958년 수교 이후 정치·경제·문화 모든 분야에서 협력 확대',
      culturalExchange: '한류의 동남아시아 진출 핵심 거점, K-POP과 K-드라마 인기 최고조',
      economicTies: '한국 기업의 동남아 진출 교두보, 자동차·전자·화학 분야 협력',
      travelInfo: '서울에서 직항 5시간 30분, 한국인 최고 인기 여행지',
      studyAbroad: '태국어와 동남아 문화 학습, 불교 철학 연구의 중심지'
    },
    
    practical: {
      currency: '바트(฿)',
      timeZone: 'UTC+7 (한국보다 2시간 늦음)',
      bestVisitTime: ['건기 (11-2월): 선선하고 쾌적한 날씨'],
      mustVisitPlaces: ['왕궁', '왓 포', '왓 아룬', '짜뚜짝 주말시장', '카오산 로드', '수상시장'],
      famousFood: ['팟타이', '똠양꿍', '그린 커리', '망고 스티키 라이스', '쏨땀', '마사만 커리'],
      festivals: ['송끄란 (4월 13-15일)', '러이끄라통 (11월)', '중국 새해 (1-2월)'],
      transportation: ['BTS 스카이트레인', 'MRT 지하철', '투크투크', '택시', '보트', '모터사이 택시']
    },
    
    activities: {
      compareAndContrast: [
        '태국과 한국의 불교 문화 비교',
        '양국의 왕실 문화와 전통',
        '스트리트 푸드 문화 비교',
        '관광업 발전 전략 비교'
      ],
      researchTopics: [
        '태국이 식민지배를 피할 수 있었던 이유',
        '상좌불교의 특징과 일상 속 실천',
        'ASEAN의 역할과 동남아시아 통합',
        '지속가능한 관광업 발전 방안'
      ],
      creativeTasks: [
        '태국 여행 가이드북 만들기',
        '태국 요리 레시피 수집하기',
        '태국 전통 무용 동작 배우기',
        '방콕 수상시장 그림 그리기'
      ],
      discussionQuestions: [
        '종교가 사회와 문화에 미치는 영향은?',
        '관광업의 긍정적·부정적 영향은?',
        '전통을 보존하면서 현대화하는 방법은?',
        '동남아시아 국가들의 협력이 중요한 이유는?'
      ]
    }
  },

  'Sydney': {
    name: 'Sydney',
    nameKo: '시드니',
    country: 'Australia',
    countryKo: '호주',
    continent: '오세아니아',
    population: '약 530만명',
    area: '12,368 km²',
    coordinates: { lat: -33.8688, lng: 151.2093 },
    
    geography: {
      location: '호주 동부 해안 태평양에 면한 항구 도시',
      terrain: '시드니 하버를 중심으로 형성된 해안 도시',
      naturalFeatures: ['시드니 하버', '본다이 비치', '블루 마운틴', '로열 국립공원'],
      climate: '온대 해양성 기후로 연중 온화함',
      seasons: ['여름 (12-2월): 따뜻하고 해변 시즌', '가을 (3-5월): 쾌적한 날씨', '겨울 (6-8월): 온화하고 건조', '봄 (9-11월): 화창하고 아름다움']
    },
    
    culture: {
      mainLanguages: ['영어'],
      religions: ['기독교', '불교', '이슬람교', '힌두교', '유대교'],
      traditions: ['서핑 문화', 'BBQ 문화', '스포츠 문화', '야외 활동', '멀티컬처'],
      modernCulture: ['카페 문화', '페스티벌 문화', '친환경 생활', '워크-라이프 밸런스'],
      artAndLiterature: ['원주민 아트', '현대 호주 문학', '거리 예술', '독립 영화'],
      musicAndDance: ['록 음악', '인디 밴드', '원주민 전통 음악', '페스티벌 음악']
    },
    
    history: {
      ancientHistory: '원주민 아보리지니가 6만년 이상 거주한 땅',
      modernHistory: '1788년 영국 식민지로 시작되어 죄수들의 유배지였다가 자유 이민으로 발전',
      historicalSites: ['시드니 오페라 하우스', '하버 브릿지', '더 록스', '하이드 파크 배럭'],
      importantEvents: ['1788년 영국 식민지 건설', '1901년 호주 연방 성립', '2000년 시드니 올림픽']
    },
    
    educational: {
      keyLearningPoints: [
        '원주민과 이민자 문화가 공존하는 다문화 사회',
        '자연환경 보호와 도시 발전의 조화',
        '이민 국가로서의 성공적 사회 통합',
        '남반구 선진국의 독특한 발전 경험'
      ],
      culturalLessons: [
        '여유롭고 자유로운 호주인의 라이프스타일',
        '자연을 사랑하고 보호하는 환경 의식',
        '공정하고 평등한 사회를 추구하는 가치관',
        '다양성을 인정하고 포용하는 문화'
      ],
      globalConnections: [
        '아시아-태평양 지역의 교두보',
        'APEC과 G20의 주요 멤버',
        '자원 수출 대국',
        '교육 수출 강국'
      ],
      modernRelevance: [
        '지속가능한 도시 개발의 모범',
        '기후 변화 대응 선진 사례',
        '다문화 사회 통합 정책',
        '혁신적 교육 시스템'
      ]
    },
    
    relationWithKorea: {
      diplomaticRelations: '1961년 수교 이후 자원·에너지 분야를 중심으로 전략적 동반자',
      culturalExchange: '한국계 호주인 공동체 활발, 한류 문화와 K-푸드 확산',
      economicTies: '철광석·석탄 등 자원 수입과 자동차·전자 제품 수출',
      travelInfo: '서울에서 직항 10시간, 워킹홀리데이 최고 인기 국가',
      studyAbroad: '영어권 유학과 이민의 선호 목적지, 우수한 교육 시스템'
    },
    
    practical: {
      currency: '호주 달러(A$)',
      timeZone: 'UTC+10 (한국보다 1시간 빠름)',
      bestVisitTime: ['봄 (9-11월): 화창하고 쾌적', '가을 (3-5월): 선선하고 아름다운 계절'],
      mustVisitPlaces: ['오페라 하우스', '하버 브릿지', '본다이 비치', '타롱가 동물원', '달링 하버', '블루 마운틴'],
      famousFood: ['미트 파이', '피쉬 앤 칩스', '팀탐', '파블로바', '베지마이트', '바비큐'],
      festivals: ['새해 불꽃축제 (1월 1일)', '시드니 페스티벌 (1월)', '비비드 시드니 (5-6월)', '동성애자 축제 마디그라'],
      transportation: ['시티레일', '버스', '페리', '라이트레일', '우버', '자전거']
    },
    
    activities: {
      compareAndContrast: [
        '호주와 한국의 다문화 정책 비교',
        '양국의 교육 시스템과 입시 제도',
        '환경 보호 정책과 실천 방안',
        '워크-라이프 밸런스 문화 비교'
      ],
      researchTopics: [
        '호주 원주민(아보리지니)의 역사와 현재',
        '호주의 이민 정책과 다문화주의',
        '기후 변화가 호주에 미치는 영향',
        '호주의 자원 개발과 환경 보호'
      ],
      creativeTasks: [
        '시드니 여행 일정표 만들기',
        '호주 동물 도감 제작하기',
        '원주민 예술 작품 그려보기',
        '환경 보호 캠페인 포스터 만들기'
      ],
      discussionQuestions: [
        '이민 사회에서 문화적 갈등을 해결하는 방법은?',
        '환경 보호와 경제 발전을 어떻게 조화시킬까?',
        '원주민 문화를 보존하고 존중하는 방법은?',
        '남반구와 북반구 국가의 차이점은?'
      ]
    }
  },

  // 추가 도시들 - 아시아
  'Seoul': {
    name: 'Seoul',
    nameKo: '서울',
    country: 'South Korea',
    countryKo: '대한민국',
    continent: '아시아',
    population: '약 960만명 (서울특별시)',
    area: '605 km²',
    coordinates: { lat: 37.5665, lng: 126.9780 },
    
    geography: {
      location: '한반도 중서부 한강 유역에 위치한 분지형 도시',
      terrain: '북쪽과 동쪽은 산지, 남쪽은 한강이 흐르는 평야',
      naturalFeatures: ['한강', '북한산', '남산', '청계천', '월드컵공원'],
      climate: '온대 대륙성 기후로 사계절이 뚜렷함',
      seasons: ['봄: 화창하고 따뜻 (3-5월)', '여름: 덥고 습한 장마철 (6-8월)', '가을: 선선하고 단풍 (9-11월)', '겨울: 춥고 건조 (12-2월)']
    },
    
    culture: {
      mainLanguages: ['한국어'],
      religions: ['불교', '기독교', '천주교', '원불교'],
      traditions: ['유교 문화', '한복', '한글', '한옥', '전통 차례', '설날', '추석'],
      modernCulture: ['K-POP', 'K-드라마', '치킨과 맥주', '카페 문화', 'PC방', '찜질방'],
      artAndLiterature: ['판소리', '한국화', '한국 현대문학', '웹툰', '한국 영화'],
      musicAndDance: ['국악', '사물놀이', '탈춤', 'K-POP', '힙합']
    },
    
    history: {
      ancientHistory: '조선 전기 1394년부터 수도가 되어 600년 이상의 수도 역사',
      modernHistory: '일제강점기, 한국전쟁, 산업화를 거쳐 현재의 글로벌 도시로 발전',
      historicalSites: ['경복궁', '창덕궁', '종묘', '덕수궁', '북촌 한옥마을', '인사동'],
      importantEvents: ['1394년 조선 수도 천도', '1945년 광복', '1950-53년 한국전쟁', '1988년 서울 올림픽', '2002년 FIFA 월드컵']
    },
    
    educational: {
      keyLearningPoints: [
        '전쟁의 폐허에서 선진국으로 발전한 한강의 기적',
        '유교 문화와 현대 기술의 조화',
        '한류를 통한 문화 콘텐츠의 세계화',
        '교육열과 IT 기술의 발달'
      ],
      culturalLessons: [
        '가족과 효를 중시하는 유교적 가치관',
        '빨리빨리 문화와 역동성',
        '공동체 의식과 협력 정신',
        '새로운 것을 받아들이는 개방성'
      ],
      globalConnections: [
        'G20 주요 멤버국의 수도',
        '한류 문화의 세계적 확산',
        'IT와 반도체 기술의 선도',
        '동북아시아 경제 허브'
      ],
      modernRelevance: [
        '디지털 혁신과 스마트시티의 모범',
        '문화 콘텐츠 산업의 성공 사례',
        '압축 성장 모델의 경험',
        '고령화 사회 대응 전략'
      ]
    },
    
    relationWithKorea: {
      diplomaticRelations: '대한민국의 수도로서 모든 외교 활동의 중심',
      culturalExchange: '한국 문화의 발신지이자 세계 문화 교류의 중심',
      economicTies: '한국 경제의 중심지이자 글로벌 기업들의 아시아 거점',
      travelInfo: '한국의 관문이자 모든 여행의 시작점',
      studyAbroad: '국제학생들의 한국어와 한국문화 학습 중심지'
    },
    
    practical: {
      currency: '원(₩)',
      timeZone: 'UTC+9',
      bestVisitTime: ['봄 (4-6월): 벚꽃과 쾌적한 날씨', '가을 (9-11월): 단풍과 선선한 날씨'],
      mustVisitPlaces: ['경복궁', '명동', '강남', '홍대', '이태원', '동대문', '남대문', '북촌 한옥마을'],
      famousFood: ['김치', '불고기', '비빔밥', '냉면', '삼겹살', '치킨', '한정식'],
      festivals: ['서울등축제 (11월)', '한강여름축제 (7-8월)', '서울국제영화제 (10월)', '하이서울페스티벌'],
      transportation: ['지하철', '버스', '택시', '따릉이(자전거)', 'KTX']
    },
    
    activities: {
      compareAndContrast: [
        '서울과 다른 아시아 수도들의 발전 과정',
        '한국과 일본의 현대화 경험 비교',
        '유교 문화권 국가들의 교육열 비교',
        '아시아 대도시들의 교통 시스템 비교'
      ],
      researchTopics: [
        '한강의 기적: 한국의 경제 발전사',
        '한류의 형성과 세계적 확산 과정',
        '서울의 도시 계획과 재개발 역사',
        '분단국가의 수도로서 서울의 특징'
      ],
      creativeTasks: [
        '서울 관광 가이드북 만들기',
        '한국 전통과 현대를 담은 작품 만들기',
        '한류 확산 전략 기획하기',
        '서울의 과거와 현재 비교 전시회 기획'
      ],
      discussionQuestions: [
        '빠른 발전의 장점과 부작용은 무엇일까?',
        '전통문화를 현대에 어떻게 계승할 수 있을까?',
        '문화 콘텐츠가 국가 이미지에 미치는 영향은?',
        '대도시의 문제들을 어떻게 해결할 수 있을까?'
      ]
    }
  },

  'Beijing': {
    name: 'Beijing',
    nameKo: '베이징',
    country: 'China',
    countryKo: '중국',
    continent: '아시아',
    population: '약 2,180만명',
    area: '16,410 km²',
    coordinates: { lat: 39.9042, lng: 116.4074 },
    
    geography: {
      location: '중국 북부 화북평원 북단에 위치한 내륙 도시',
      terrain: '북쪽과 서쪽은 산지, 남동쪽은 평야',
      naturalFeatures: ['만리장성', '이화원', '천단공원', '베이하이공원'],
      climate: '대륙성 기후로 사계절이 뚜렷하고 건조함',
      seasons: ['봄: 건조하고 황사 (3-5월)', '여름: 덥고 습함 (6-8월)', '가을: 쾌적하고 건조 (9-11월)', '겨울: 춥고 건조 (12-2월)']
    },
    
    culture: {
      mainLanguages: ['중국어(북경관화)'],
      religions: ['불교', '도교', '이슬람교', '기독교'],
      traditions: ['중국 서예', '경극', '태극권', '중국차', '풍수지리', '춘절'],
      modernCulture: ['현대 중국 영화', 'C-POP', '온라인 쇼핑', '모바일 결제', '공유경제'],
      artAndLiterature: ['중국 고전문학', '현대 중국 미술', '서예', '도자기'],
      musicAndDance: ['경극', '전통 중국 음악', '민속 무용', '현대 팝 음악']
    },
    
    history: {
      ancientHistory: '3,000년의 역사를 가진 고도로 원, 명, 청나라의 수도',
      modernHistory: '중화인민공화국 성립 이후 정치·문화의 중심지로서 급속 발전',
      historicalSites: ['자금성', '천안문광장', '만리장성', '이화원', '천단'],
      importantEvents: ['1949년 중화인민공화국 건국', '1989년 천안문 사건', '2008년 베이징 올림픽', '2022년 베이징 동계올림픽']
    },
    
    educational: {
      keyLearningPoints: [
        '세계 최대 인구 국가의 수도이자 정치 중심지',
        '5,000년 중화 문명의 계승과 발전',
        '사회주의 시장경제의 실험과 성과',
        '고대 문화유산과 현대 발전의 조화'
      ],
      culturalLessons: [
        '중용과 조화를 추구하는 중국 철학',
        '집단주의와 사회 안정을 중시하는 가치관',
        '역사와 전통을 중시하는 문화',
        '실용주의적 사고와 혁신 정신'
      ],
      globalConnections: [
        '유엔 안보리 상임이사국',
        '일대일로 정책의 출발점',
        '세계 2위 경제대국의 수도',
        '아시아 정치·외교의 중심'
      ],
      modernRelevance: [
        '중국몽과 중화민족 부흥의 상징',
        '환경 문제와 지속가능 발전의 과제',
        '기술 혁신과 AI 발전의 중심',
        '글로벌 거버넌스 참여 확대'
      ]
    },
    
    relationWithKorea: {
      diplomaticRelations: '1992년 수교 이후 전략적 협력 동반자 관계',
      culturalExchange: '한중 문화교류의 중심지, 한류와 중화문화의 상호 교류',
      economicTies: '한국의 최대 교역 상대국이자 투자 대상국',
      travelInfo: '서울에서 비행기로 2시간, 육로로도 접근 가능',
      studyAbroad: '중국어와 중국 문화 학습의 최고 목적지'
    },
    
    practical: {
      currency: '위안(¥)',
      timeZone: 'UTC+8 (한국보다 1시간 늦음)',
      bestVisitTime: ['봄 (4-6월): 화창하고 쾌적', '가을 (9-11월): 선선하고 맑음'],
      mustVisitPlaces: ['자금성', '만리장성', '천안문광장', '이화원', '천단', '798예술구'],
      famousFood: ['베이징덕', '짜장면', '딤섬', '훠궈', '덜덕면', '월병'],
      festivals: ['춘절(설날)', '국경절(10월 1일)', '중추절', '등축제'],
      transportation: ['지하철', '버스', '택시', '따시(공유자전거)', '고속철도']
    },
    
    activities: {
      compareAndContrast: [
        '베이징과 서울의 수도 기능과 역할',
        '중국과 한국의 한자 문화권 비교',
        '양국의 경제 발전 모델과 정책',
        '전통 궁궐 건축의 특징 비교'
      ],
      researchTopics: [
        '중국의 개혁개방 정책과 경제 발전',
        '일대일로 정책과 글로벌 영향',
        '중국의 환경 문제와 해결 노력',
        '중화문화의 전통과 현대적 계승'
      ],
      creativeTasks: [
        '베이징 역사 탐방 코스 만들기',
        '중국 서예 작품 써보기',
        '중국 전통 음식 조리법 배우기',
        '만리장성의 역사 이야기 만들기'
      ],
      discussionQuestions: [
        '큰 국가를 통치하는 것의 어려움은?',
        '전통문화를 보존하면서 발전하는 방법은?',
        '환경과 경제 발전의 균형을 맞추려면?',
        '이웃 나라와의 좋은 관계를 유지하는 방법은?'
      ]
    }
  },

  // 아프리카 추가
  'Cairo': {
    name: 'Cairo',
    nameKo: '카이로',
    country: 'Egypt',
    countryKo: '이집트',
    continent: '아프리카',
    population: '약 2,000만명 (대카이로권)',
    area: '606 km²',
    coordinates: { lat: 30.0444, lng: 31.2357 },
    
    geography: {
      location: '이집트 북부 나일강 삼각주 남단에 위치',
      terrain: '나일강 양안의 비옥한 충적평야',
      naturalFeatures: ['나일강', '기자 피라미드', '사하라 사막 인근'],
      climate: '사막성 기후로 연중 건조하고 더움',
      seasons: ['겨울 (12-2월): 온화하고 쾌적', '봄 (3-5월): 따뜻함', '여름 (6-8월): 매우 덥고 건조', '가을 (9-11월): 더위가 누그러짐']
    },
    
    culture: {
      mainLanguages: ['아랍어'],
      religions: ['이슬람교(수니파)', '콥트 기독교'],
      traditions: ['이슬람 문화', '콥트 전통', '아랍 서예', '향신료 문화', '나일강 축제'],
      modernCulture: ['아랍 영화', '현대 이슬람 예술', '카페 문화', '시샤(물담배)'],
      artAndLiterature: ['고대 이집트 상형문자', '이슬람 예술', '현대 아랍 문학', '파라오 문화'],
      musicAndDance: ['아랍 전통 음악', '베리댄스', '수피 음악', '현대 이집트 팝']
    },
    
    history: {
      ancientHistory: '고대 이집트 문명의 중심지로 5,000년의 역사',
      modernHistory: '이슬람 정복 이후 아랍 세계의 문화적 중심지로 발전',
      historicalSites: ['기자 피라미드', '스핑크스', '이집트 박물관', '칸 엘 칼릴리 바자르', '알아즈하르 모스크'],
      importantEvents: ['고대 이집트 파라오 시대', '640년 아랍 정복', '1952년 이집트 혁명', '2011년 아랍의 봄']
    },
    
    educational: {
      keyLearningPoints: [
        '인류 최초 문명 중 하나인 고대 이집트의 유산',
        '아프리카와 중동을 잇는 지정학적 중요성',
        '이슬람 문화와 아랍 세계의 중심',
        '수에즈 운하를 통한 국제 교통의 요충지'
      ],
      culturalLessons: [
        '다양한 종교가 공존하는 관용의 문화',
        '고대 문명을 보존하고 계승하는 정신',
        '나일강 중심의 농업 문화와 지혜',
        '아랍 세계의 문화적 정체성과 자부심'
      ],
      globalConnections: [
        '아랍연맹 본부 소재지',
        '수에즈 운하를 통한 세계 해상 교통',
        '아프리카와 중동의 문화 교류 중심',
        '이슬람 세계의 종교적 중심지 중 하나'
      ],
      modernRelevance: [
        '중동 정치와 아랍 통합의 중심 역할',
        '문화유산 보존과 관광업 발전',
        '아프리카 대륙 발전의 선도적 역할',
        '종교간 대화와 평화의 메신저'
      ]
    },
    
    relationWithKorea: {
      diplomaticRelations: '1995년 수교 이후 정치·경제 협력 확대',
      culturalExchange: '한국의 중동 진출 교두보, 이집트 문화 교류 증진',
      economicTies: '건설·인프라 분야 협력, 에너지 자원 협력',
      travelInfo: '서울에서 경유 항공편으로 약 15시간',
      studyAbroad: '아랍어와 이슬람 문화, 고고학 연구의 중심지'
    },
    
    practical: {
      currency: '이집트 파운드(EGP)',
      timeZone: 'UTC+2 (한국보다 7시간 늦음)',
      bestVisitTime: ['겨울 (11-3월): 가장 쾌적한 관광 시즌'],
      mustVisitPlaces: ['기자 피라미드', '이집트 박물관', '칸 엘 칼릴리', '알아즈하르 모스크', '나일강 크루즈'],
      famousFood: ['코샤리', '풀', '파라펠', '케밥', '아랍 빵', '이집트 차'],
      festivals: ['라마단', '이드 알 피트르', '콥트 크리스마스', '나일강 축제'],
      transportation: ['지하철', '버스', '택시', '우버', '나일강 보트']
    },
    
    activities: {
      compareAndContrast: [
        '이집트와 한국의 고대 문명과 문자',
        '이슬람 문화와 한국 전통 문화 비교',
        '나일강과 한강의 문명 발달 역할',
        '피라미드와 한국 고분 문화 비교'
      ],
      researchTopics: [
        '고대 이집트 문명과 피라미드의 건설 기술',
        '이슬람 문화의 전파와 이집트의 역할',
        '수에즈 운하의 경제적·전략적 중요성',
        '아랍의 봄과 중동 정치 변화'
      ],
      creativeTasks: [
        '이집트 고대 문명 전시회 기획하기',
        '상형문자로 이름 써보기',
        '피라미드 건설 과정 모형 만들기',
        '이집트 전통 음식 만들어보기'
      ],
      discussionQuestions: [
        '고대 문명이 현대에 주는 교훈은?',
        '서로 다른 종교가 평화롭게 공존하는 방법은?',
        '문화유산을 보존하면서 발전하는 방법은?',
        '지정학적 위치가 국가에 미치는 영향은?'
      ]
    }
  },

  // 남아메리카 추가
  'Rio de Janeiro': {
    name: 'Rio de Janeiro',
    nameKo: '리우데자네이루',
    country: 'Brazil',
    countryKo: '브라질',
    continent: '남아메리카',
    population: '약 670만명 (리우시), 1,360만명 (대도시권)',
    area: '1,221 km²',
    coordinates: { lat: -22.9068, lng: -43.1729 },
    
    geography: {
      location: '브라질 남동부 대서양 연안에 위치한 항구 도시',
      terrain: '산과 바다가 어우러진 천혜의 자연 경관',
      naturalFeatures: ['코파카바나 해변', '이파네마 해변', '코르코바도 산', '설탕빵 산', '티주카 국립공원'],
      climate: '열대 기후로 연중 따뜻함',
      seasons: ['여름 (12-3월): 덥고 습한 우기', '가을 (4-6월): 따뜻하고 건조', '겨울 (7-9월): 온화하고 건조', '봄 (10-11월): 따뜻해지며 우기 시작']
    },
    
    culture: {
      mainLanguages: ['포르투갈어'],
      religions: ['가톨릭', '개신교', '아프리카 전통 종교', '스피리티즘'],
      traditions: ['카니발', '삼바', '카포에이라', '축구', '보사노바', '파벨라 문화'],
      modernCulture: ['해변 문화', '음악 페스티벌', '거리 예술', '비키니 패션', '서핑 문화'],
      artAndLiterature: ['브라질 바로크', '현대 브라질 예술', '보사노바', '브라질 영화'],
      musicAndDance: ['삼바', '보사노바', '포호', '람바다', 'MPB(브라질 대중 음악)']
    },
    
    history: {
      ancientHistory: '1565년 포르투갈인들이 건설한 식민 도시',
      modernHistory: '1763년부터 1960년까지 브라질의 수도였으며 문화의 중심지',
      historicalSites: ['코르코바도의 예수상', '설탕빵 산', '산타 테레사 지구', '라파 아치', '셀라론 계단'],
      importantEvents: ['1808년 포르투갈 왕실 이주', '1888년 노예제 폐지', '1950년과 2014년 FIFA 월드컵', '2016년 하계 올림픽']
    },
    
    educational: {
      keyLearningPoints: [
        '포르투갈 식민지 역사와 혼혈 문화의 형성',
        '아프리카, 유럽, 원주민 문화의 융합',
        '음악과 춤이 중심인 독특한 문화',
        '사회적 불평등과 도시 문제의 현실'
      ],
      culturalLessons: [
        '다양성을 포용하고 즐기는 브라질 정신',
        '음악과 춤으로 표현하는 감정과 삶',
        '자연과 함께하는 여유로운 라이프스타일',
        '어려운 현실 속에서도 긍정적인 에너지'
      ],
      globalConnections: [
        '남미 최대 국가 브라질의 문화 수도',
        '포르투갈어권 문화의 중심',
        '전 세계 카니발 문화의 원조',
        '남반구 스포츠와 축구의 성지'
      ],
      modernRelevance: [
        '도시 빈곤과 사회 통합의 과제',
        '지속가능한 관광 개발 모델',
        '문화 다양성과 창조 경제',
        '기후 변화와 환경 보호의 중요성'
      ]
    },
    
    relationWithKorea: {
      diplomaticRelations: '1959년 수교 이후 우호적 관계 유지',
      culturalExchange: '브라질 내 한인 사회 형성, K-POP과 한류 문화 확산',
      economicTies: '자동차, 철강, 화학 분야 협력 및 투자',
      travelInfo: '서울에서 경유 항공편으로 약 24시간',
      studyAbroad: '포르투갈어와 라틴 아메리카 문화 학습 중심지'
    },
    
    practical: {
      currency: '브라질 헤알(R$)',
      timeZone: 'UTC-3 (한국보다 12시간 늦음)',
      bestVisitTime: ['가을-겨울 (4-9월): 건조하고 쾌적한 날씨'],
      mustVisitPlaces: ['코르코바도 예수상', '설탕빵 산', '코파카바나 해변', '이파네마 해변', '산타 테레사', '마라카낭 스타디움'],
      famousFood: ['페이조아다', '슈하스코', '브리가데이로', '카이피리냐', '아사이', '코시냐'],
      festivals: ['리우 카니발 (2-3월)', '록 인 리우', '아니메 에스트 (새해 축제)', '페스타 주니나'],
      transportation: ['지하철', '버스', '택시', '우버', '케이블카', '자전거']
    },
    
    activities: {
      compareAndContrast: [
        '브라질과 한국의 축구 문화 비교',
        '카니발과 한국 전통 축제 비교',
        '양국의 다문화 사회 형성 과정',
        '열대 기후와 온대 기후 지역의 생활 차이'
      ],
      researchTopics: [
        '브라질의 식민지 역사와 혼혈 문화 형성',
        '삼바와 카니발의 역사와 문화적 의미',
        '브라질의 사회 불평등과 파벨라 문제',
        '아마존 보호와 환경 정책'
      ],
      creativeTasks: [
        '리우 카니발 의상 디자인하기',
        '삼바 춤 배우고 공연하기',
        '브라질 음식 만들어보기',
        '리우의 자연 경관 그림 그리기'
      ],
      discussionQuestions: [
        '문화 다양성이 사회에 미치는 영향은?',
        '사회 불평등 문제를 어떻게 해결할 수 있을까?',
        '자연 환경을 보호하면서 발전하는 방법은?',
        '스포츠가 사회 통합에 미치는 역할은?'
      ]
    }
  }
};

// 검색 기능을 위한 도시 인덱스
export const SEARCHABLE_CITIES = Object.keys(EDUCATIONAL_CITIES_DATABASE);

// 대륙별 분류
export const CITIES_BY_CONTINENT = {
  '아시아': ['Tokyo', 'Bangkok', 'Seoul', 'Beijing'],
  '유럽': ['Paris', 'London'],
  '북아메리카': ['New York'],
  '남아메리카': ['Rio de Janeiro'],
  '아프리카': ['Cairo'],
  '오세아니아': ['Sydney']
};

// 주제별 분류
export const CITIES_BY_THEME = {
  '전통과 현대의 조화': ['Tokyo', 'Paris', 'Bangkok', 'Seoul', 'Beijing'],
  '다문화 사회': ['New York', 'London', 'Sydney', 'Rio de Janeiro'],
  '예술과 문화': ['Paris', 'London', 'Rio de Janeiro', 'Cairo'],
  '경제와 금융': ['New York', 'London', 'Tokyo', 'Seoul'],
  '기술과 혁신': ['Tokyo', 'Seoul', 'Beijing'],
  '역사와 유산': ['Paris', 'London', 'Beijing', 'Cairo'],
  '자연과 환경': ['Sydney', 'Rio de Janeiro'],
  '종교와 철학': ['Bangkok', 'Cairo'],
  '해양 문화': ['Sydney', 'London', 'Rio de Janeiro'],
  '왕실 문화': ['London', 'Bangkok', 'Beijing'],
  '한류와 K-문화': ['Seoul'],
  '고대 문명': ['Cairo', 'Beijing'],
  '음식과 미식': ['Tokyo', 'Paris', 'Bangkok', 'Seoul'],
  '축제와 카니발': ['Rio de Janeiro', 'Bangkok'],
  '스마트시티': ['Seoul', 'Tokyo', 'Beijing'],
  '아랍과 이슬람': ['Cairo'],
  '라틴 문화': ['Rio de Janeiro'],
  '동서양 교류': ['Tokyo', 'Seoul', 'Beijing'],
  '분단과 통일': ['Seoul'],
  '사막과 강 문명': ['Cairo']
};

/**
 * 도시명으로 교육 데이터 검색
 */
export function searchEducationalData(cityName: string): EducationalCityData | null {
  // 정확한 이름 매칭
  if (EDUCATIONAL_CITIES_DATABASE[cityName]) {
    return EDUCATIONAL_CITIES_DATABASE[cityName];
  }
  
  // 한국어 이름으로 검색
  for (const [key, data] of Object.entries(EDUCATIONAL_CITIES_DATABASE)) {
    if (data.nameKo === cityName || data.nameKo.includes(cityName)) {
      return data;
    }
  }
  
  // 부분 매칭
  for (const [key, data] of Object.entries(EDUCATIONAL_CITIES_DATABASE)) {
    if (key.toLowerCase().includes(cityName.toLowerCase()) || 
        data.name.toLowerCase().includes(cityName.toLowerCase())) {
      return data;
    }
  }
  
  return null;
}

/**
 * 키워드로 관련 도시 검색
 */
export function searchByKeyword(keyword: string): EducationalCityData[] {
  const results: EducationalCityData[] = [];
  const lowerKeyword = keyword.toLowerCase();
  
  Object.values(EDUCATIONAL_CITIES_DATABASE).forEach(city => {
    // 도시명, 국가명에서 검색
    if (city.name.toLowerCase().includes(lowerKeyword) ||
        city.nameKo.includes(keyword) ||
        city.country.toLowerCase().includes(lowerKeyword) ||
        city.countryKo.includes(keyword)) {
      results.push(city);
      return;
    }
    
    // 문화적 특성에서 검색
    const culturalText = [
      ...city.culture.traditions,
      ...city.culture.modernCulture,
      ...city.culture.artAndLiterature
    ].join(' ').toLowerCase();
    
    if (culturalText.includes(lowerKeyword)) {
      results.push(city);
      return;
    }
    
    // 교육적 가치에서 검색
    const educationalText = [
      ...city.educational.keyLearningPoints,
      ...city.educational.culturalLessons
    ].join(' ').toLowerCase();
    
    if (educationalText.includes(lowerKeyword)) {
      results.push(city);
    }
  });
  
  return results;
}

// 교육 도시 배열 export (컴포넌트에서 사용)
export const EDUCATIONAL_CITIES = Object.values(EDUCATIONAL_CITIES_DATABASE);