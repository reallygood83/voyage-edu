// 맞춤형 교육용 템플릿 시스템

export interface EducationTemplate {
  id: string;
  name: string;
  description: string;
  level: 'elementary' | 'middle' | 'high';
  grades: number[];
  subjects: string[];
  category: 'academic' | 'arts' | 'science' | 'social' | 'language';
  designElements: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    layout: 'grid' | 'card' | 'timeline' | 'infographic';
    iconStyle: 'playful' | 'professional' | 'minimal' | 'colorful';
  };
  contentStructure: {
    sections: string[];
    requiredElements: string[];
    optionalElements: string[];
  };
  educationalFeatures: {
    interactiveElements: string[];
    assessmentTools: string[];
    collaborationFeatures: string[];
  };
}

// 초등학교 맞춤 템플릿
export const ELEMENTARY_TEMPLATES: EducationTemplate[] = [
  {
    id: 'elementary_adventure',
    name: '모험 탐험대',
    description: '게임화된 학습 여정으로 호기심과 탐구심을 자극하는 템플릿',
    level: 'elementary',
    grades: [3, 4, 5, 6],
    subjects: ['사회', '과학', '통합교과'],
    category: 'academic',
    designElements: {
      primaryColor: '#FF6B6B',
      secondaryColor: '#4ECDC4', 
      accentColor: '#FFE66D',
      fontFamily: 'Pretendard, sans-serif',
      layout: 'card',
      iconStyle: 'playful'
    },
    contentStructure: {
      sections: ['시작하기', '탐험 목표', '여행 계획', '모험 활동', '보물 발견', '성과 공유'],
      requiredElements: ['학습목표', '활동계획', '결과물'],
      optionalElements: ['게임요소', '보상시스템', '협력활동']
    },
    educationalFeatures: {
      interactiveElements: ['클릭 맵', '퀴즈 게임', '드래그 앤 드롭'],
      assessmentTools: ['자기평가', '동료평가', '관찰평가'],
      collaborationFeatures: ['팀 구성', '역할 분담', '공동 작업']
    }
  },
  {
    id: 'elementary_storytelling',
    name: '이야기 여행',
    description: '스토리텔링을 통한 몰입형 학습 경험 제공',
    level: 'elementary',
    grades: [1, 2, 3, 4],
    subjects: ['국어', '사회', '도덕'],
    category: 'language',
    designElements: {
      primaryColor: '#9B59B6',
      secondaryColor: '#E8B4CB',
      accentColor: '#F7DC6F',
      fontFamily: 'Pretendard, sans-serif',
      layout: 'timeline',
      iconStyle: 'colorful'
    },
    contentStructure: {
      sections: ['이야기 시작', '등장인물', '배경 소개', '문제 상황', '해결 과정', '이야기 끝'],
      requiredElements: ['캐릭터', '스토리라인', '학습요소'],
      optionalElements: ['음성해설', '애니메이션', '인터랙션']
    },
    educationalFeatures: {
      interactiveElements: ['음성 녹음', '그림 그리기', '선택형 스토리'],
      assessmentTools: ['구술평가', '포트폴리오', '창작활동'],
      collaborationFeatures: ['공동 창작', '역할극', '토론']
    }
  },
  {
    id: 'elementary_science_lab',
    name: '어린이 실험실',
    description: '과학적 사고력과 탐구력을 기르는 실험 중심 템플릿',
    level: 'elementary',
    grades: [4, 5, 6],
    subjects: ['과학', '수학', '실과'],
    category: 'science',
    designElements: {
      primaryColor: '#3498DB',
      secondaryColor: '#2ECC71',
      accentColor: '#F39C12',
      fontFamily: 'Pretendard, sans-serif',
      layout: 'grid',
      iconStyle: 'minimal'
    },
    contentStructure: {
      sections: ['가설 설정', '실험 준비', '실험 과정', '결과 관찰', '결론 도출', '응용 사례'],
      requiredElements: ['실험목표', '실험방법', '결과분석'],
      optionalElements: ['시뮬레이션', '동영상', '추가자료']
    },
    educationalFeatures: {
      interactiveElements: ['가상실험', '측정도구', '데이터 입력'],
      assessmentTools: ['실험보고서', '관찰일지', '발표평가'],
      collaborationFeatures: ['실험팀', '데이터 공유', '결과 토론']
    }
  }
];

// 중학교 맞춤 템플릿
export const MIDDLE_SCHOOL_TEMPLATES: EducationTemplate[] = [
  {
    id: 'middle_project_based',
    name: '프로젝트 학습',
    description: '실생활 문제 해결을 통한 창의적 사고력 개발',
    level: 'middle',
    grades: [1, 2, 3],
    subjects: ['사회', '과학', '기술가정', '예체능'],
    category: 'academic',
    designElements: {
      primaryColor: '#2C3E50',
      secondaryColor: '#34495E',
      accentColor: '#E74C3C',
      fontFamily: 'Pretendard, sans-serif',
      layout: 'infographic',
      iconStyle: 'professional'
    },
    contentStructure: {
      sections: ['문제 인식', '주제 선정', '계획 수립', '자료 수집', '분석 및 종합', '결과 발표'],
      requiredElements: ['프로젝트계획서', '진행과정', '최종결과물'],
      optionalElements: ['전문가자문', '현장조사', '매체제작']
    },
    educationalFeatures: {
      interactiveElements: ['마인드맵', '일정관리', '자료수집도구'],
      assessmentTools: ['프로세스평가', '결과물평가', '발표평가'],
      collaborationFeatures: ['팀프로젝트', '역할분담', '피드백']
    }
  },
  {
    id: 'middle_debate',
    name: '토론과 논증',
    description: '비판적 사고력과 의사소통 능력 향상을 위한 토론 중심 학습',
    level: 'middle',
    grades: [2, 3],
    subjects: ['국어', '사회', '도덕'],
    category: 'social',
    designElements: {
      primaryColor: '#8E44AD',
      secondaryColor: '#9B59B6',
      accentColor: '#F1C40F',
      fontFamily: 'Pretendard, sans-serif',
      layout: 'grid',
      iconStyle: 'professional'
    },
    contentStructure: {
      sections: ['논제 분석', '입장 정리', '근거 수집', '논증 구성', '토론 실행', '성찰 및 평가'],
      requiredElements: ['논제', '찬반논리', '토론결과'],
      optionalElements: ['전문자료', '설문조사', '영상자료']
    },
    educationalFeatures: {
      interactiveElements: ['논리구조도', '증거수집', '반박준비'],
      assessmentTools: ['논리성평가', '표현력평가', '태도평가'],
      collaborationFeatures: ['팀토론', '교차질문', '합의도출']
    }
  }
];

// 고등학교 맞춤 템플릿
export const HIGH_SCHOOL_TEMPLATES: EducationTemplate[] = [
  {
    id: 'high_research',
    name: '학술 연구',
    description: '대학 수준의 학술적 탐구와 연구 방법론 학습',
    level: 'high',
    grades: [1, 2, 3],
    subjects: ['모든 교과'],
    category: 'academic',
    designElements: {
      primaryColor: '#34495E',
      secondaryColor: '#7F8C8D',
      accentColor: '#3498DB',
      fontFamily: 'Pretendard, sans-serif',
      layout: 'infographic',
      iconStyle: 'minimal'
    },
    contentStructure: {
      sections: ['연구문제', '문헌조사', '연구방법', '자료수집', '분석결과', '결론 및 제언'],
      requiredElements: ['연구계획서', '문헌목록', '연구보고서'],
      optionalElements: ['통계분석', '인터뷰', '설문조사']
    },
    educationalFeatures: {
      interactiveElements: ['데이터시각화', '통계도구', '인용관리'],
      assessmentTools: ['연구보고서', '프레젠테이션', '동료검토'],
      collaborationFeatures: ['공동연구', '전문가멘토링', '학술교류']
    }
  },
  {
    id: 'high_career',
    name: '진로 탐색',
    description: '미래 설계와 진로 결정을 위한 체계적 탐색 활동',
    level: 'high',
    grades: [1, 2, 3],
    subjects: ['진로와직업', '사회', '실용교과'],
    category: 'social',
    designElements: {
      primaryColor: '#16A085',
      secondaryColor: '#27AE60',
      accentColor: '#F39C12',
      fontFamily: 'Pretendard, sans-serif',
      layout: 'timeline',
      iconStyle: 'professional'
    },
    contentStructure: {
      sections: ['자기이해', '직업탐색', '진로체험', '진로설계', '실행계획', '점검 및 수정'],
      requiredElements: ['진로계획서', '체험보고서', '포트폴리오'],
      optionalElements: ['적성검사', '현장체험', '멘토링']
    },
    educationalFeatures: {
      interactiveElements: ['진로적성검사', '직업정보검색', '진로로드맵'],
      assessmentTools: ['자기성찰', '계획서평가', '실행평가'],
      collaborationFeatures: ['진로멘토링', '동료상담', '전문가특강']
    }
  }
];

// 교과별 특성화 템플릿
export const SUBJECT_SPECIALIZED_TEMPLATES = {
  language: {
    colors: ['#E8B4CB', '#D7DBDD', '#F8C471'],
    iconStyle: 'colorful',
    features: ['어휘학습', '문법연습', '작문활동', '문학감상']
  },
  science: {
    colors: ['#AED6F1', '#A9DFBF', '#F9E79F'],
    iconStyle: 'minimal',
    features: ['실험설계', '데이터분석', '가설검증', '과학적사고']
  },
  social: {
    colors: ['#D5A6BD', '#A9CCE3', '#F7DC6F'],
    iconStyle: 'professional',
    features: ['사회문제분석', '역사탐구', '지리조사', '시민참여']
  },
  arts: {
    colors: ['#F1948A', '#BB8FCE', '#85C1E9'],
    iconStyle: 'playful',
    features: ['창작활동', '작품감상', '표현기법', '협력제작']
  },
  mathematics: {
    colors: ['#82E0AA', '#85C1E9', '#F8C471'],
    iconStyle: 'minimal',
    features: ['문제해결', '논리적사고', '수학적모델링', '계산연습']
  }
};

// 템플릿 선택 엔진
export class EducationTemplateEngine {
  // 학습자 특성에 맞는 템플릿 추천
  static recommendTemplate(
    level: 'elementary' | 'middle' | 'high',
    grade: number,
    subject: string,
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading',
    groupSize: 'individual' | 'small' | 'large'
  ): EducationTemplate[] {
    let templates: EducationTemplate[] = [];

    // 학교급별 템플릿 선택
    switch (level) {
      case 'elementary':
        templates = ELEMENTARY_TEMPLATES;
        break;
      case 'middle':
        templates = MIDDLE_SCHOOL_TEMPLATES;
        break;
      case 'high':
        templates = HIGH_SCHOOL_TEMPLATES;
        break;
    }

    // 학년 및 교과 필터링
    templates = templates.filter(template => 
      template.grades.includes(grade) && 
      (template.subjects.includes(subject) || template.subjects.includes('모든 교과'))
    );

    // 학습 스타일별 정렬
    templates.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      if (learningStyle === 'visual') {
        if (a.designElements.layout === 'infographic') scoreA += 3;
        if (a.designElements.iconStyle === 'colorful') scoreA += 2;
        if (b.designElements.layout === 'infographic') scoreB += 3;
        if (b.designElements.iconStyle === 'colorful') scoreB += 2;
      }

      if (learningStyle === 'kinesthetic') {
        scoreA += a.educationalFeatures.interactiveElements.length;
        scoreB += b.educationalFeatures.interactiveElements.length;
      }

      if (groupSize === 'large') {
        scoreA += a.educationalFeatures.collaborationFeatures.length;
        scoreB += b.educationalFeatures.collaborationFeatures.length;
      }

      return scoreB - scoreA;
    });

    return templates;
  }

  // 맞춤형 템플릿 생성
  static generateCustomTemplate(
    baseTemplate: EducationTemplate,
    customizations: {
      colors?: string[];
      layout?: string;
      additionalSections?: string[];
      focusAreas?: string[];
    }
  ): EducationTemplate {
    const customTemplate = { ...baseTemplate };
    
    // 색상 커스터마이징
    if (customizations.colors) {
      customTemplate.designElements.primaryColor = customizations.colors[0] || customTemplate.designElements.primaryColor;
      customTemplate.designElements.secondaryColor = customizations.colors[1] || customTemplate.designElements.secondaryColor;
      customTemplate.designElements.accentColor = customizations.colors[2] || customTemplate.designElements.accentColor;
    }

    // 레이아웃 변경
    if (customizations.layout) {
      customTemplate.designElements.layout = customizations.layout as any;
    }

    // 섹션 추가
    if (customizations.additionalSections) {
      customTemplate.contentStructure.sections.push(...customizations.additionalSections);
    }

    // 포커스 영역에 따른 기능 강화
    if (customizations.focusAreas) {
      customizations.focusAreas.forEach(area => {
        if (area === 'collaboration') {
          customTemplate.educationalFeatures.collaborationFeatures.push('실시간 협업', '공동 편집');
        }
        if (area === 'assessment') {
          customTemplate.educationalFeatures.assessmentTools.push('루브릭 평가', '포트폴리오 평가');
        }
        if (area === 'interactivity') {
          customTemplate.educationalFeatures.interactiveElements.push('AR/VR 체험', '시뮬레이션');
        }
      });
    }

    customTemplate.id = `custom_${baseTemplate.id}_${Date.now()}`;
    customTemplate.name = `맞춤형 ${baseTemplate.name}`;

    return customTemplate;
  }

  // 템플릿 유효성 검증
  static validateTemplate(template: EducationTemplate): {
    isValid: boolean;
    errors: string[];
    suggestions: string[];
  } {
    const errors: string[] = [];
    const suggestions: string[] = [];

    // 필수 요소 검증
    if (!template.name || template.name.trim() === '') {
      errors.push('템플릿 이름이 필요합니다');
    }

    if (template.grades.length === 0) {
      errors.push('대상 학년을 지정해야 합니다');
    }

    if (template.subjects.length === 0) {
      errors.push('해당 교과를 지정해야 합니다');
    }

    if (template.contentStructure.sections.length < 3) {
      errors.push('최소 3개의 섹션이 필요합니다');
    }

    // 개선 제안
    if (template.educationalFeatures.interactiveElements.length < 2) {
      suggestions.push('상호작용 요소를 더 추가하여 참여도를 높이세요');
    }

    if (template.educationalFeatures.assessmentTools.length < 2) {
      suggestions.push('다양한 평가 도구를 활용하여 학습 효과를 측정하세요');
    }

    if (template.educationalFeatures.collaborationFeatures.length === 0) {
      suggestions.push('협력 학습 기능을 추가하여 사회성을 기르세요');
    }

    return {
      isValid: errors.length === 0,
      errors,
      suggestions
    };
  }
}