/**
 * Enhanced Education Service
 * Wikipedia API 없이도 풍부한 교육 자료를 제공하는 향상된 서비스
 * 교육적 목적으로 큐레이션된 고품질 콘텐츠 제공
 */

import { 
  EDUCATIONAL_CITIES_DATABASE, 
  EducationalCityData, 
  searchEducationalData, 
  searchByKeyword,
  CITIES_BY_CONTINENT,
  CITIES_BY_THEME 
} from '@/data/educationalDatabase';

export interface EnhancedDestinationInfo {
  // 기본 정보
  basic: {
    name: string;
    nameKo: string;
    country: string;
    countryKo: string;
    continent: string;
    population: string;
    summary: string;
  };
  
  // 지리 및 기후
  geography: {
    location: string;
    terrain: string;
    naturalFeatures: string[];
    climate: string;
    seasons: string[];
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  
  // 문화적 특색 - 교육적 가치가 높은 내용
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
  
  // 교육적 가치 - 핵심 학습 포인트
  educational: {
    keyLearningPoints: string[];
    culturalLessons: string[];
    globalConnections: string[];
    modernRelevance: string[];
  };
  
  // 한국과의 관계 - 국제 이해 교육
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
  
  // 관련 도시 추천
  relatedCities?: string[];
  
  // 교육 레벨 정보
  educationLevel: {
    difficulty: '초급' | '중급' | '고급';
    ageGroup: string;
    subjects: string[];
    learningObjectives: string[];
  };
}

export class EnhancedEducationService {
  
  /**
   * 도시 이름으로 향상된 교육 정보 가져오기
   */
  static async getEnhancedDestinationInfo(cityName: string, countryName?: string): Promise<EnhancedDestinationInfo | null> {
    console.log('Enhanced Education Service: 요청 시작', { cityName, countryName });
    
    try {
      // 1. 내부 교육 데이터베이스에서 검색
      let educationalData = searchEducationalData(cityName);
      
      // 2. 부분 매칭으로 재검색
      if (!educationalData && countryName) {
        const keywordResults = searchByKeyword(cityName);
        if (keywordResults.length > 0) {
          educationalData = keywordResults[0];
        }
      }
      
      // 3. 데이터가 없으면 기본 교육 템플릿 생성
      if (!educationalData) {
        educationalData = this.generateEducationalTemplate(cityName, countryName);
      }
      
      // 4. 향상된 교육 정보로 변환
      const enhancedInfo = this.convertToEnhancedInfo(educationalData);
      
      console.log('Enhanced Education Service: 변환 완료', enhancedInfo);
      return enhancedInfo;
      
    } catch (error) {
      console.error('Enhanced Education Service: 에러 발생', error);
      // 에러 시에도 기본 교육 템플릿 제공
      const template = this.generateEducationalTemplate(cityName, countryName);
      return this.convertToEnhancedInfo(template);
    }
  }
  
  /**
   * 교육 데이터를 향상된 정보로 변환
   */
  private static convertToEnhancedInfo(data: EducationalCityData): EnhancedDestinationInfo {
    // 교육 레벨 자동 결정
    const educationLevel = this.determineEducationLevel(data);
    
    // 관련 도시 추천
    const relatedCities = this.findRelatedCities(data);
    
    return {
      basic: {
        name: data.name,
        nameKo: data.nameKo,
        country: data.country,
        countryKo: data.countryKo,
        continent: data.continent,
        population: data.population,
        summary: this.generateEducationalSummary(data)
      },
      
      geography: {
        location: data.geography.location,
        terrain: data.geography.terrain,
        naturalFeatures: data.geography.naturalFeatures,
        climate: data.geography.climate,
        seasons: data.geography.seasons,
        coordinates: data.coordinates
      },
      
      culture: data.culture,
      history: data.history,
      educational: data.educational,
      relationWithKorea: data.relationWithKorea,
      practical: data.practical,
      activities: data.activities,
      
      relatedCities,
      educationLevel
    };
  }
  
  /**
   * 교육적 요약 생성
   */
  private static generateEducationalSummary(data: EducationalCityData): string {
    const keyPoints = data.educational.keyLearningPoints.slice(0, 2);
    const culturalPoints = data.educational.culturalLessons.slice(0, 1);
    
    return `${data.nameKo}는 ${data.countryKo}의 대표적인 도시로, ${keyPoints.join(', ')} 등을 학습할 수 있는 교육적 가치가 높은 도시입니다. 특히 ${culturalPoints[0]} 등의 문화적 특징을 통해 다양한 세계 문화를 이해할 수 있습니다.`;
  }
  
  /**
   * 교육 레벨 자동 결정
   */
  private static determineEducationLevel(data: EducationalCityData): {
    difficulty: '초급' | '중급' | '고급';
    ageGroup: string;
    subjects: string[];
    learningObjectives: string[];
  } {
    const complexity = data.educational.keyLearningPoints.length + 
                      data.educational.globalConnections.length +
                      data.history.importantEvents.length;
    
    let difficulty: '초급' | '중급' | '고급';
    let ageGroup: string;
    
    if (complexity <= 8) {
      difficulty = '초급';
      ageGroup = '초등학교 4-6학년';
    } else if (complexity <= 12) {
      difficulty = '중급';
      ageGroup = '중학교 1-3학년';
    } else {
      difficulty = '고급';
      ageGroup = '고등학교 1-3학년';
    }
    
    // 주제별 교과목 매핑
    const subjects = this.mapToSubjects(data);
    
    // 학습 목표 생성
    const learningObjectives = [
      `${data.nameKo}의 지리적 특성과 기후 조건을 이해한다`,
      `${data.countryKo} 문화의 특징과 전통을 학습한다`,
      `한국과 ${data.countryKo}의 관계를 파악한다`,
      `세계 시민으로서의 글로벌 감각을 기른다`
    ];
    
    return {
      difficulty,
      ageGroup,
      subjects,
      learningObjectives
    };
  }
  
  /**
   * 교과목 매핑
   */
  private static mapToSubjects(data: EducationalCityData): string[] {
    const subjects: string[] = ['사회', '지리'];
    
    // 문화적 요소가 강하면 문화 과목 추가
    if (data.culture.artAndLiterature.length > 0 || data.culture.musicAndDance.length > 0) {
      subjects.push('예술', '음악');
    }
    
    // 역사적 요소가 강하면 역사 과목 추가
    if (data.history.importantEvents.length > 3) {
      subjects.push('역사');
    }
    
    // 경제 관련 내용이 있으면 경제 과목 추가
    if (data.educational.globalConnections.some(conn => 
      conn.includes('금융') || conn.includes('경제') || conn.includes('무역'))) {
      subjects.push('경제');
    }
    
    // 언어 관련 내용
    if (data.culture.mainLanguages.length > 0) {
      subjects.push('외국어');
    }
    
    return subjects;
  }
  
  /**
   * 관련 도시 찾기
   */
  private static findRelatedCities(data: EducationalCityData): string[] {
    const related: string[] = [];
    
    // 같은 대륙의 도시들
    const continentCities = CITIES_BY_CONTINENT[data.continent as keyof typeof CITIES_BY_CONTINENT] || [];
    related.push(...continentCities.filter(city => city !== data.name));
    
    // 같은 주제의 도시들
    for (const [theme, cities] of Object.entries(CITIES_BY_THEME)) {
      if (cities.includes(data.name)) {
        related.push(...cities.filter(city => city !== data.name && !related.includes(city)));
      }
    }
    
    return related.slice(0, 3); // 최대 3개까지
  }
  
  /**
   * 기본 교육 템플릿 생성 (데이터가 없는 도시용)
   */
  private static generateEducationalTemplate(cityName: string, countryName?: string): EducationalCityData {
    const countryKo = this.getCountryKoreanName(countryName || 'Unknown');
    
    return {
      name: cityName,
      nameKo: cityName,
      country: countryName || 'Unknown',
      countryKo: countryKo,
      continent: '미분류',
      population: '조사 필요',
      area: '조사 필요',
      coordinates: { lat: 0, lng: 0 },
      
      geography: {
        location: `${countryKo}에 위치한 도시`,
        terrain: '지형 정보를 조사해보세요',
        naturalFeatures: ['주변 자연환경 탐구 과제'],
        climate: '기후 특성을 알아보세요',
        seasons: ['계절별 특징 연구하기']
      },
      
      culture: {
        mainLanguages: [countryName === 'Korea' ? '한국어' : '현지어'],
        religions: ['종교 조사하기'],
        traditions: ['전통 문화 알아보기'],
        modernCulture: ['현대 문화 특징 찾기'],
        artAndLiterature: ['예술과 문학 탐구하기'],
        musicAndDance: ['음악과 춤 문화 조사하기']
      },
      
      history: {
        ancientHistory: `${cityName}의 고대 역사를 조사해보세요`,
        modernHistory: `${cityName}의 근현대 발전 과정을 알아보세요`,
        historicalSites: ['역사적 장소 찾아보기'],
        importantEvents: ['중요한 역사적 사건 조사하기']
      },
      
      educational: {
        keyLearningPoints: [
          `${cityName}의 지리적 위치와 중요성 이해하기`,
          `${countryKo} 문화의 특징 파악하기`,
          '다른 문화와의 비교를 통한 다양성 이해',
          '글로벌 시대의 국제 교류 중요성 깨닫기'
        ],
        culturalLessons: [
          '다양한 문화에 대한 열린 마음 갖기',
          '차이를 인정하고 존중하는 태도 기르기',
          '세계 시민으로서의 책임감 갖기'
        ],
        globalConnections: [
          '국제 교류와 협력의 중요성',
          '문화 다양성과 상호 이해',
          '지구촌 시대의 연결성'
        ],
        modernRelevance: [
          '현대 사회에서의 국제 이해 교육',
          '글로벌 시민 의식 함양',
          '문화적 감수성 개발'
        ]
      },
      
      relationWithKorea: {
        diplomaticRelations: `한국과 ${countryKo}의 외교 관계를 조사해보세요`,
        culturalExchange: '문화 교류 현황을 알아보세요',
        economicTies: '경제적 협력 관계를 파악해보세요',
        travelInfo: '여행 정보와 교통편을 찾아보세요',
        studyAbroad: '교육 교류와 유학 정보를 조사해보세요'
      },
      
      practical: {
        currency: '현지 화폐 조사하기',
        timeZone: '시간대 확인하기',
        bestVisitTime: ['여행하기 좋은 시기 알아보기'],
        mustVisitPlaces: ['꼭 가봐야 할 곳 찾기'],
        famousFood: ['유명한 음식 조사하기'],
        festivals: ['주요 축제와 행사 알아보기'],
        transportation: ['교통수단 조사하기']
      },
      
      activities: {
        compareAndContrast: [
          `${cityName}과 우리나라 도시 비교하기`,
          `${countryKo}와 한국의 문화 차이점 찾기`,
          '생활 방식과 관습 비교하기'
        ],
        researchTopics: [
          `${cityName}의 역사와 발전 과정`,
          `${countryKo}의 정치와 사회 제도`,
          '경제 발전과 산업 구조',
          '교육 제도와 학교 생활'
        ],
        creativeTasks: [
          `${cityName} 여행 가이드북 만들기`,
          `${countryKo} 문화 소개 발표 준비하기`,
          '현지 요리 만들어보기',
          '전통 예술 작품 만들어보기'
        ],
        discussionQuestions: [
          '다른 문화를 이해하는 것이 왜 중요할까?',
          '문화적 차이로 인한 갈등을 어떻게 해결할 수 있을까?',
          '세계화 시대에 필요한 능력은 무엇일까?',
          '우리나라와 다른 나라의 협력 방안은?'
        ]
      }
    };
  }
  
  /**
   * 국가명 한국어 변환
   */
  private static getCountryKoreanName(countryName: string): string {
    const countryMap: Record<string, string> = {
      'Japan': '일본',
      'France': '프랑스',
      'United States': '미국',
      'United Kingdom': '영국',
      'Thailand': '태국',
      'Australia': '호주',
      'China': '중국',
      'Germany': '독일',
      'Italy': '이탈리아',
      'Spain': '스페인',
      'Canada': '캐나다',
      'Brazil': '브라질',
      'India': '인도',
      'Russia': '러시아',
      'Unknown': '미분류'
    };
    
    return countryMap[countryName] || countryName;
  }
  
  /**
   * 주제별 도시 추천
   */
  static getRecommendationsByTheme(theme: string): string[] {
    return CITIES_BY_THEME[theme as keyof typeof CITIES_BY_THEME] || [];
  }
  
  /**
   * 대륙별 도시 목록
   */
  static getCitiesByContinent(continent: string): string[] {
    return CITIES_BY_CONTINENT[continent as keyof typeof CITIES_BY_CONTINENT] || [];
  }
  
  /**
   * 모든 이용 가능한 주제 목록
   */
  static getAvailableThemes(): string[] {
    return Object.keys(CITIES_BY_THEME);
  }
  
  /**
   * 교육 통계 정보
   */
  static getEducationalStats() {
    const totalCities = Object.keys(EDUCATIONAL_CITIES_DATABASE).length;
    const continents = Object.keys(CITIES_BY_CONTINENT).filter(c => CITIES_BY_CONTINENT[c as keyof typeof CITIES_BY_CONTINENT].length > 0).length;
    const themes = Object.keys(CITIES_BY_THEME).length;
    
    return {
      totalCities,
      continents,
      themes,
      averageDataPointsPerCity: totalCities > 0 ? Math.round(
        Object.values(EDUCATIONAL_CITIES_DATABASE).reduce((acc, city) => {
          return acc + 
            city.educational.keyLearningPoints.length + 
            city.culture.traditions.length + 
            city.activities.discussionQuestions.length;
        }, 0) / totalCities
      ) : 0
    };
  }
}

export default EnhancedEducationService;