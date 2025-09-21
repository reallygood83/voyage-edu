// 교육 과정 표준 및 학습 목표 분석 시스템

export interface EducationStandard {
  level: 'elementary' | 'middle' | 'high';
  grade: number;
  subject: string;
  keyLearningElements: string[];
  learningObjectives: string[];
  coreCompetencies: string[];
  assessmentCriteria: string[];
}

export interface CurriculumMapping {
  geography: string[];
  culture: string[];
  history: string[];
  language: string[];
  economics: string[];
  socialStudies: string[];
}

// 한국 교육과정 표준 (2022 개정 교육과정 기준)
export const KOREAN_EDUCATION_STANDARDS: Record<string, EducationStandard> = {
  'elementary_3_social': {
    level: 'elementary',
    grade: 3,
    subject: '사회',
    keyLearningElements: [
      '우리가 살아가는 곳',
      '다양한 삶의 모습',
      '지역의 위치와 특성',
      '교통과 통신 수단'
    ],
    learningObjectives: [
      '우리 지역의 위치와 특성을 파악할 수 있다',
      '다른 지역의 생활 모습을 이해할 수 있다',
      '교통과 통신의 발달이 생활에 미친 영향을 설명할 수 있다'
    ],
    coreCompetencies: [
      '의사소통역량',
      '공동체역량',
      '창의적사고역량',
      '지식정보처리역량'
    ],
    assessmentCriteria: [
      '지역의 특성을 지도나 사진을 보고 설명할 수 있는가',
      '다른 지역의 생활 모습을 존중하는 태도를 보이는가',
      '학습한 내용을 생활에 적용할 수 있는가'
    ]
  },
  'elementary_4_social': {
    level: 'elementary',
    grade: 4,
    subject: '사회',
    keyLearningElements: [
      '지역의 어제와 오늘',
      '사회 변화와 문화 다양성',
      '지역 사회의 발전',
      '민주 시민의 생활'
    ],
    learningObjectives: [
      '지역 사회의 변화 모습을 설명할 수 있다',
      '문화의 다양성을 이해하고 존중할 수 있다',
      '민주 시민으로서의 역할을 실천할 수 있다'
    ],
    coreCompetencies: [
      '의사소통역량',
      '공동체역량',
      '문화향유역량',
      '민주시민역량'
    ],
    assessmentCriteria: [
      '시대에 따른 생활 모습의 변화를 비교할 수 있는가',
      '다문화에 대한 올바른 인식을 가지고 있는가',
      '공동체 구성원으로서 책임감을 보이는가'
    ]
  },
  'elementary_5_social': {
    level: 'elementary',
    grade: 5,
    subject: '사회',
    keyLearningElements: [
      '국토와 우리 생활',
      '인간과 환경',
      '우리나라의 역사',
      '정치 발전과 시민 참여'
    ],
    learningObjectives: [
      '우리나라의 지리적 특성을 이해할 수 있다',
      '환경과 인간 생활의 관계를 파악할 수 있다',
      '우리나라의 역사적 발전 과정을 설명할 수 있다'
    ],
    coreCompetencies: [
      '지식정보처리역량',
      '창의적사고역량',
      '심미적감성역량',
      '의사소통역량'
    ],
    assessmentCriteria: [
      '국토의 특성을 지형과 기후를 중심으로 설명할 수 있는가',
      '환경 문제에 대한 관심과 실천 의지를 보이는가',
      '역사적 사건의 원인과 결과를 논리적으로 설명할 수 있는가'
    ]
  },
  'elementary_6_social': {
    level: 'elementary',
    grade: 6,
    subject: '사회',
    keyLearningElements: [
      '세계 여러 나라의 자연과 문화',
      '세계화와 국제 교류',
      '지구촌의 미래와 지속가능한 발전',
      '민주주의의 발전과 시민 참여'
    ],
    learningObjectives: [
      '세계 여러 나라의 자연환경과 문화를 이해할 수 있다',
      '세계화가 우리 생활에 미친 영향을 설명할 수 있다',
      '지속가능한 발전의 중요성을 인식할 수 있다'
    ],
    coreCompetencies: [
      '문화향유역량',
      '공동체역량',
      '창의적사고역량',
      '민주시민역량'
    ],
    assessmentCriteria: [
      '세계 여러 나라의 문화적 특성을 존중하는 태도를 보이는가',
      '국제 교류의 필요성과 방법을 제시할 수 있는가',
      '지구촌 문제 해결을 위한 실천 방안을 제안할 수 있는가'
    ]
  }
};

// 교과 간 연계 학습 요소
export const CROSS_CURRICULAR_ELEMENTS = {
  geography: {
    '지형과 기후': ['산맥', '강', '평야', '기후대', '날씨'],
    '인문지리': ['인구', '도시', '교통', '산업', '문화'],
    '지역 특성': ['자연환경', '인문환경', '지역 개발', '관광 자원']
  },
  culture: {
    '전통문화': ['의식주', '축제', '예술', '언어', '종교'],
    '현대문화': ['K-pop', '한류', '영화', '드라마', '게임'],
    '문화교류': ['국제교류', '다문화', '문화적응', '상호이해']
  },
  history: {
    '고대사': ['문명 발생', '국가 형성', '문화유산', '교역'],
    '근현대사': ['근대화', '식민지', '독립', '현대 발전'],
    '세계사': ['세계 대전', '냉전', '세계화', '국제기구']
  },
  economics: {
    '기초경제': ['생산', '소비', '교환', '화폐', '시장'],
    '국제경제': ['무역', '환율', '국제분업', '경제협력'],
    '지속가능경제': ['친환경', '자원 절약', '순환 경제']
  }
};

// 학습 목표 분석 엔진
export class LearningObjectiveAnalyzer {
  // 여행 계획에서 교육 목표 추출
  static analyzeTravelPlan(destinations: string[], activities: string[]): {
    educationalGoals: string[];
    curriculumConnections: CurriculumMapping;
    assessmentSuggestions: string[];
  } {
    const educationalGoals: string[] = [];
    const curriculumConnections: CurriculumMapping = {
      geography: [],
      culture: [],
      history: [],
      language: [],
      economics: [],
      socialStudies: []
    };
    const assessmentSuggestions: string[] = [];

    // 목적지 기반 지리 학습 목표
    destinations.forEach(destination => {
      educationalGoals.push(`${destination}의 지리적 특성과 기후를 이해한다`);
      educationalGoals.push(`${destination}의 문화적 특성을 파악하고 우리나라와 비교한다`);
      
      curriculumConnections.geography.push(`${destination}의 위치와 지형`);
      curriculumConnections.culture.push(`${destination}의 전통문화와 생활양식`);
      curriculumConnections.socialStudies.push(`${destination}과 우리나라의 교류 역사`);
    });

    // 활동 기반 학습 목표
    activities.forEach(activity => {
      if (activity.includes('문화')) {
        educationalGoals.push('다양한 문화를 체험하고 문화적 다양성을 이해한다');
        curriculumConnections.culture.push('문화 체험 활동');
      }
      if (activity.includes('역사') || activity.includes('유적')) {
        educationalGoals.push('역사적 유산의 가치를 이해하고 보존의 중요성을 인식한다');
        curriculumConnections.history.push('역사 유적 탐방');
      }
      if (activity.includes('음식') || activity.includes('요리')) {
        educationalGoals.push('세계 각국의 음식 문화를 이해하고 식문화의 다양성을 체험한다');
        curriculumConnections.culture.push('세계 음식 문화');
      }
    });

    // 평가 제안
    assessmentSuggestions.push('여행 계획서 작성 및 발표');
    assessmentSuggestions.push('목적지별 문화 비교 보고서');
    assessmentSuggestions.push('여행 후 소감문 및 학습 성찰일지');
    assessmentSuggestions.push('창의적 결과물 제작 (포스터, 영상, 브로슈어 등)');

    return {
      educationalGoals,
      curriculumConnections,
      assessmentSuggestions
    };
  }

  // 학년별 적합성 검증
  static validateForGrade(grade: number, educationalGoals: string[]): {
    appropriate: string[];
    tooAdvanced: string[];
    recommendations: string[];
  } {
    const appropriate: string[] = [];
    const tooAdvanced: string[] = [];
    const recommendations: string[] = [];

    const gradeStandards = Object.values(KOREAN_EDUCATION_STANDARDS).filter(
      standard => standard.grade === grade
    );

    educationalGoals.forEach(goal => {
      // 간단한 키워드 기반 적합성 판단
      if (grade <= 4) {
        if (goal.includes('비교') || goal.includes('이해') || goal.includes('파악')) {
          appropriate.push(goal);
        } else if (goal.includes('분석') || goal.includes('평가') || goal.includes('종합')) {
          tooAdvanced.push(goal);
          recommendations.push(`"${goal}"을 더 구체적이고 체험 중심으로 수정`);
        }
      } else {
        appropriate.push(goal);
      }
    });

    return {
      appropriate,
      tooAdvanced,
      recommendations
    };
  }

  // 핵심 역량 연계 분석
  static analyzeCoreCompetencies(educationalGoals: string[]): string[] {
    const competencies = new Set<string>();

    educationalGoals.forEach(goal => {
      if (goal.includes('소통') || goal.includes('발표') || goal.includes('표현')) {
        competencies.add('의사소통역량');
      }
      if (goal.includes('협력') || goal.includes('공동체') || goal.includes('시민')) {
        competencies.add('공동체역량');
      }
      if (goal.includes('창의') || goal.includes('문제해결') || goal.includes('혁신')) {
        competencies.add('창의적사고역량');
      }
      if (goal.includes('문화') || goal.includes('예술') || goal.includes('심미')) {
        competencies.add('문화향유역량');
      }
      if (goal.includes('정보') || goal.includes('지식') || goal.includes('분석')) {
        competencies.add('지식정보처리역량');
      }
      if (goal.includes('자기관리') || goal.includes('성찰') || goal.includes('계획')) {
        competencies.add('자기관리역량');
      }
    });

    return Array.from(competencies);
  }
}

// 교육과정 연계 콘텐츠 생성기
export class CurriculumContentGenerator {
  static generateLearningActivities(
    destinations: string[],
    grade: number,
    subject: string
  ): string[] {
    const activities: string[] = [];
    const standard = Object.values(KOREAN_EDUCATION_STANDARDS).find(
      s => s.grade === grade && s.subject === subject
    );

    if (!standard) return activities;

    destinations.forEach(destination => {
      // 학년별 맞춤 활동 생성
      if (grade <= 4) {
        activities.push(`${destination} 위치 찾기 게임`);
        activities.push(`${destination}의 대표 음식 알아보기`);
        activities.push(`${destination} 전통 의상 색칠하기`);
        activities.push(`${destination} 인사말 배우기`);
      } else {
        activities.push(`${destination}의 지리적 특성 조사하기`);
        activities.push(`${destination}의 역사와 문화 탐구하기`);
        activities.push(`${destination} 여행 계획서 작성하기`);
        activities.push(`${destination}과 우리나라 비교 발표하기`);
      }
    });

    return activities;
  }

  static generateAssessmentRubric(educationalGoals: string[]): {
    criteria: string;
    excellent: string;
    good: string;
    needsImprovement: string;
  }[] {
    return educationalGoals.map(goal => ({
      criteria: goal,
      excellent: '학습 목표를 완전히 달성하고 창의적으로 표현함',
      good: '학습 목표를 대부분 달성하고 적절히 표현함',
      needsImprovement: '학습 목표 달성이 부족하고 추가 지도가 필요함'
    }));
  }
}