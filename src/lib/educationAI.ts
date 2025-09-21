// 교육용 AI 콘텐츠 생성 엔진

import { LearningObjectiveAnalyzer } from './educationStandards';
import { EducationTemplate, EducationTemplateEngine } from './educationTemplates';

export interface EducationalContent {
  id: string;
  title: string;
  description: string;
  level: 'elementary' | 'middle' | 'high';
  grade: number;
  subject: string;
  learningObjectives: string[];
  coreCompetencies: string[];
  contentSections: {
    id: string;
    title: string;
    content: string;
    type: 'text' | 'image' | 'video' | 'interactive' | 'assessment';
    educationalValue: number; // 1-10 점수
  }[];
  assessmentCriteria: {
    criteria: string;
    rubric: {
      excellent: string;
      good: string;
      needsImprovement: string;
    };
  }[];
  metadata: {
    createdAt: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number; // 분 단위
    prerequisites: string[];
    keywords: string[];
  };
}

export interface ContentQualityMetrics {
  educationalAlignment: number; // 교육과정 연계성 (0-100)
  ageAppropriateness: number; // 연령 적합성 (0-100)
  engagementLevel: number; // 참여도 예상 (0-100)
  comprehensibility: number; // 이해 용이성 (0-100)
  interactivity: number; // 상호작용성 (0-100)
  assessmentQuality: number; // 평가 품질 (0-100)
  overallScore: number; // 종합 점수 (0-100)
}

// 교육 전문 지식 베이스
export const EDUCATION_KNOWLEDGE_BASE = {
  developmentalStages: {
    elementary: {
      cognitive: '구체적 조작기, 경험 중심 학습, 단계적 사고',
      social: '협력 학습 시작, 규칙 이해, 공정성 중시',
      emotional: '성취감 중요, 긍정적 피드백 필요, 안정감 추구',
      attention: '15-20분 집중, 시각적 자료 효과적, 활동 중심'
    },
    middle: {
      cognitive: '형식적 조작기 시작, 추상적 사고 발달, 논리적 추론',
      social: '또래 집단 중요, 정체성 형성, 독립성 추구',
      emotional: '감정 기복 큰, 자아존중감 중요, 인정받고 싶어함',
      attention: '25-30분 집중, 토론 선호, 프로젝트 중심'
    },
    high: {
      cognitive: '형식적 조작기, 복합적 사고, 메타인지 발달',
      social: '미래 지향적, 사회 참여 의식, 깊은 관계 형성',
      emotional: '자아 정체성 확립, 진로 고민, 독립성 강화',
      attention: '40-50분 집중, 심화 학습 가능, 자기주도 학습'
    }
  },
  learningPrinciples: {
    constructivism: '학습자가 능동적으로 지식을 구성',
    socialLearning: '상호작용을 통한 학습',
    meaningfulLearning: '기존 지식과 새로운 지식의 연결',
    experientialLearning: '직접 경험을 통한 학습',
    differentiation: '개별 학습자의 특성을 고려한 맞춤 학습'
  },
  assessmentTypes: {
    formative: '학습 과정 중 지속적 평가',
    summative: '학습 결과에 대한 종합 평가',
    authentic: '실제 상황에서의 수행 평가',
    peer: '동료 간 상호 평가',
    self: '자기 성찰 및 평가'
  }
};

// AI 콘텐츠 생성 엔진
export class EducationAIEngine {
  // 교육적 적합성 분석
  static analyzeEducationalFitness(
    content: string,
    level: 'elementary' | 'middle' | 'high',
    grade: number,
    subject: string
  ): ContentQualityMetrics {
    const metrics: ContentQualityMetrics = {
      educationalAlignment: 0,
      ageAppropriateness: 0,
      engagementLevel: 0,
      comprehensibility: 0,
      interactivity: 0,
      assessmentQuality: 0,
      overallScore: 0
    };

    // 교육과정 연계성 분석
    metrics.educationalAlignment = this.analyzeStandardsAlignment(content, level, grade, subject);

    // 연령 적합성 분석
    metrics.ageAppropriateness = this.analyzeAgeAppropriateness(content, level);

    // 참여도 예상 분석
    metrics.engagementLevel = this.analyzeEngagementPotential(content, level);

    // 이해 용이성 분석
    metrics.comprehensibility = this.analyzeComprehensibility(content, level);

    // 상호작용성 분석
    metrics.interactivity = this.analyzeInteractivity(content);

    // 평가 품질 분석
    metrics.assessmentQuality = this.analyzeAssessmentQuality(content, level);

    // 종합 점수 계산
    metrics.overallScore = Math.round(
      (metrics.educationalAlignment * 0.25 +
       metrics.ageAppropriateness * 0.20 +
       metrics.engagementLevel * 0.15 +
       metrics.comprehensibility * 0.15 +
       metrics.interactivity * 0.15 +
       metrics.assessmentQuality * 0.10)
    );

    return metrics;
  }

  // 교육과정 연계성 분석
  private static analyzeStandardsAlignment(
    content: string,
    level: string,
    grade: number,
    subject: string
  ): number {
    const keywords = {
      elementary: ['체험', '탐구', '관찰', '비교', '이해', '경험'],
      middle: ['분석', '종합', '비교', '토론', '프로젝트', '협력'],
      high: ['연구', '분석', '평가', '창의', '비판적', '종합적']
    };

    const levelKeywords = keywords[level as keyof typeof keywords] || [];
    const matchCount = levelKeywords.filter(keyword => 
      content.toLowerCase().includes(keyword)
    ).length;

    return Math.min(100, (matchCount / levelKeywords.length) * 100);
  }

  // 연령 적합성 분석
  private static analyzeAgeAppropriateness(content: string, level: string): number {
    const inappropriateElements = {
      elementary: ['복잡한', '어려운', '추상적', '고등', '대학'],
      middle: ['유치한', '쉬운', '단순한', '어린이'],
      high: ['초등', '유치', '단순', '쉬운']
    };

    const inappropriateKeywords = inappropriateElements[level as keyof typeof inappropriateElements] || [];
    const inappropriateCount = inappropriateKeywords.filter(keyword => 
      content.toLowerCase().includes(keyword)
    ).length;

    return Math.max(0, 100 - (inappropriateCount * 20));
  }

  // 참여도 예상 분석
  private static analyzeEngagementPotential(content: string, level: string): number {
    const engagementElements = {
      elementary: ['게임', '놀이', '체험', '만들기', '그리기', '노래'],
      middle: ['토론', '프로젝트', '실험', '조사', '발표', '경쟁'],
      high: ['연구', '토론', '프레젠테이션', '프로젝트', '분석', '창작']
    };

    const levelElements = engagementElements[level as keyof typeof engagementElements] || [];
    const matchCount = levelElements.filter(element => 
      content.toLowerCase().includes(element)
    ).length;

    return Math.min(100, (matchCount / levelElements.length) * 100);
  }

  // 이해 용이성 분석
  private static analyzeComprehensibility(content: string, level: string): number {
    const sentences = content.split(/[.!?]/).filter(s => s.trim().length > 0);
    const avgSentenceLength = sentences.reduce((sum, sentence) => 
      sum + sentence.trim().split(' ').length, 0
    ) / sentences.length;

    const appropriateLengths = {
      elementary: { min: 5, max: 15 },
      middle: { min: 10, max: 20 },
      high: { min: 15, max: 30 }
    };

    const range = appropriateLengths[level as keyof typeof appropriateLengths];
    if (avgSentenceLength >= range.min && avgSentenceLength <= range.max) {
      return 100;
    } else {
      const deviation = Math.abs(avgSentenceLength - (range.min + range.max) / 2);
      return Math.max(0, 100 - (deviation * 5));
    }
  }

  // 상호작용성 분석
  private static analyzeInteractivity(content: string): number {
    const interactiveElements = [
      '클릭', '선택', '입력', '드래그', '터치', '음성', '녹음', 
      '그리기', '만들기', '게임', '퀴즈', '시뮬레이션'
    ];

    const matchCount = interactiveElements.filter(element => 
      content.toLowerCase().includes(element)
    ).length;

    return Math.min(100, (matchCount / interactiveElements.length) * 100);
  }

  // 평가 품질 분석
  private static analyzeAssessmentQuality(content: string, level: string): number {
    const assessmentTerms = [
      '평가', '확인', '점검', '피드백', '성찰', '자기평가', 
      '동료평가', '관찰', '포트폴리오', '루브릭'
    ];

    const matchCount = assessmentTerms.filter(term => 
      content.toLowerCase().includes(term)
    ).length;

    return Math.min(100, (matchCount / assessmentTerms.length) * 100);
  }

  // 스마트 콘텐츠 생성
  static generateEducationalContent(
    topic: string,
    destinations: string[],
    level: 'elementary' | 'middle' | 'high',
    grade: number,
    subject: string,
    template: EducationTemplate
  ): EducationalContent {
    // 학습 목표 분석
    const analysis = LearningObjectiveAnalyzer.analyzeTravelPlan(destinations, [topic]);
    
    // 발달 단계에 맞는 콘텐츠 조정
    const ageAppropriateContent = this.adaptContentForAge(
      analysis.educationalGoals,
      level,
      grade
    );

    // 템플릿에 따른 섹션 생성
    const contentSections = this.generateContentSections(
      ageAppropriateContent,
      destinations,
      template
    );

    // 평가 기준 생성
    const assessmentCriteria = this.generateAssessmentCriteria(
      analysis.educationalGoals,
      level
    );

    return {
      id: `content_${Date.now()}`,
      title: `${destinations.join(', ')} ${topic} 학습`,
      description: `${level} ${grade}학년 대상 ${subject} 교과 연계 학습 자료`,
      level,
      grade,
      subject,
      learningObjectives: analysis.educationalGoals,
      coreCompetencies: LearningObjectiveAnalyzer.analyzeCoreCompetencies(analysis.educationalGoals),
      contentSections,
      assessmentCriteria,
      metadata: {
        createdAt: new Date().toISOString(),
        difficulty: this.determineDifficulty(level, grade),
        estimatedTime: this.estimateCompletionTime(contentSections),
        prerequisites: this.identifyPrerequisites(subject, grade),
        keywords: this.extractKeywords(destinations, topic)
      }
    };
  }

  // 연령별 콘텐츠 적응
  private static adaptContentForAge(
    objectives: string[],
    level: 'elementary' | 'middle' | 'high',
    grade: number
  ): string[] {
    const developmentStage = EDUCATION_KNOWLEDGE_BASE.developmentalStages[level];
    
    return objectives.map(objective => {
      if (level === 'elementary') {
        // 구체적이고 체험 중심으로 변환
        return objective
          .replace('분석한다', '살펴본다')
          .replace('평가한다', '생각해본다')
          .replace('종합한다', '정리한다');
      } else if (level === 'middle') {
        // 사고력 중심으로 변환
        return objective
          .replace('암기한다', '이해한다')
          .replace('따라한다', '분석한다');
      } else {
        // 고차원 사고력 중심으로 변환
        return objective
          .replace('이해한다', '분석하고 평가한다')
          .replace('설명한다', '비판적으로 검토한다');
      }
    });
  }

  // 콘텐츠 섹션 생성
  private static generateContentSections(
    objectives: string[],
    destinations: string[],
    template: EducationTemplate
  ): EducationalContent['contentSections'] {
    const sections: EducationalContent['contentSections'] = [];

    template.contentStructure.sections.forEach((sectionTitle, index) => {
      sections.push({
        id: `section_${index}`,
        title: sectionTitle,
        content: this.generateSectionContent(sectionTitle, destinations, template.level),
        type: this.determineSectionType(sectionTitle, template),
        educationalValue: this.calculateEducationalValue(sectionTitle, template)
      });
    });

    return sections;
  }

  // 섹션 콘텐츠 생성
  private static generateSectionContent(
    sectionTitle: string,
    destinations: string[],
    level: 'elementary' | 'middle' | 'high'
  ): string {
    const destinationList = destinations.join(', ');
    
    if (sectionTitle.includes('목표') || sectionTitle.includes('시작')) {
      return `${destinationList}를 통해 ${level === 'elementary' ? '재미있게 탐험' : level === 'middle' ? '체계적으로 탐구' : '심층적으로 연구'}해보세요.`;
    } else if (sectionTitle.includes('계획') || sectionTitle.includes('준비')) {
      return `${destinationList} 학습을 위한 ${level === 'elementary' ? '단계별 활동' : level === 'middle' ? '프로젝트 계획' : '연구 설계'}을 수립합니다.`;
    } else if (sectionTitle.includes('활동') || sectionTitle.includes('과정')) {
      return `${destinationList}의 특성을 ${level === 'elementary' ? '다양한 체험을 통해' : level === 'middle' ? '조사와 분석을 통해' : '비판적 사고와 연구를 통해'} 알아봅니다.`;
    } else if (sectionTitle.includes('결과') || sectionTitle.includes('정리')) {
      return `${destinationList} 학습의 성과를 ${level === 'elementary' ? '그림이나 글로 표현' : level === 'middle' ? '보고서나 발표로 정리' : '논문이나 프레젠테이션으로 종합'}합니다.`;
    } else {
      return `${destinationList}에 대한 ${sectionTitle.toLowerCase()} 활동을 진행합니다.`;
    }
  }

  // 섹션 타입 결정
  private static determineSectionType(
    sectionTitle: string,
    template: EducationTemplate
  ): 'text' | 'image' | 'video' | 'interactive' | 'assessment' {
    if (sectionTitle.includes('평가') || sectionTitle.includes('확인')) {
      return 'assessment';
    } else if (template.educationalFeatures.interactiveElements.length > 0) {
      return 'interactive';
    } else if (sectionTitle.includes('소개') || sectionTitle.includes('설명')) {
      return 'image';
    } else if (sectionTitle.includes('체험') || sectionTitle.includes('활동')) {
      return 'video';
    } else {
      return 'text';
    }
  }

  // 교육적 가치 계산
  private static calculateEducationalValue(
    sectionTitle: string,
    template: EducationTemplate
  ): number {
    let value = 5; // 기본값

    if (sectionTitle.includes('목표') || sectionTitle.includes('학습')) value += 2;
    if (sectionTitle.includes('활동') || sectionTitle.includes('체험')) value += 2;
    if (sectionTitle.includes('평가') || sectionTitle.includes('성찰')) value += 1;
    if (template.educationalFeatures.interactiveElements.length > 2) value += 1;

    return Math.min(10, value);
  }

  // 평가 기준 생성
  private static generateAssessmentCriteria(
    objectives: string[],
    level: 'elementary' | 'middle' | 'high'
  ): EducationalContent['assessmentCriteria'] {
    return objectives.map(objective => ({
      criteria: objective,
      rubric: {
        excellent: level === 'elementary' 
          ? '목표를 완전히 달성하고 창의적으로 표현했어요'
          : level === 'middle' 
          ? '학습 목표를 완전히 달성하고 논리적으로 설명할 수 있다'
          : '학습 목표를 완전히 달성하고 비판적으로 분석하여 창의적 대안을 제시할 수 있다',
        good: level === 'elementary'
          ? '목표를 잘 달성하고 적절하게 표현했어요'
          : level === 'middle'
          ? '학습 목표를 대부분 달성하고 기본적으로 설명할 수 있다'
          : '학습 목표를 대부분 달성하고 적절히 분석할 수 있다',
        needsImprovement: level === 'elementary'
          ? '목표 달성을 위해 더 노력이 필요해요'
          : level === 'middle'
          ? '학습 목표 달성이 부족하고 추가 학습이 필요하다'
          : '학습 목표 달성이 미흡하고 심화 학습과 지도가 필요하다'
      }
    }));
  }

  // 난이도 결정
  private static determineDifficulty(
    level: 'elementary' | 'middle' | 'high',
    grade: number
  ): 'beginner' | 'intermediate' | 'advanced' {
    if (level === 'elementary') {
      return grade <= 2 ? 'beginner' : 'intermediate';
    } else if (level === 'middle') {
      return grade === 1 ? 'intermediate' : 'advanced';
    } else {
      return 'advanced';
    }
  }

  // 완료 시간 추정
  private static estimateCompletionTime(
    sections: EducationalContent['contentSections']
  ): number {
    const timePerSection = {
      text: 5,
      image: 3,
      video: 8,
      interactive: 10,
      assessment: 7
    };

    return sections.reduce((total, section) => 
      total + (timePerSection[section.type] || 5), 0
    );
  }

  // 선수 학습 요소 식별
  private static identifyPrerequisites(subject: string, grade: number): string[] {
    const prerequisites: string[] = [];

    if (subject === '사회') {
      if (grade >= 4) prerequisites.push('지도 읽기', '방향 감각');
      if (grade >= 5) prerequisites.push('우리나라 지리', '기본 역사 지식');
      if (grade >= 6) prerequisites.push('세계 지리 기초', '문화 다양성 이해');
    }

    return prerequisites;
  }

  // 키워드 추출
  private static extractKeywords(destinations: string[], topic: string): string[] {
    const keywords = [...destinations, topic];
    
    // 교육 관련 키워드 추가
    keywords.push('세계문화', '지리', '여행계획', '국제이해', '다문화');
    
    return [...new Set(keywords)];
  }
}