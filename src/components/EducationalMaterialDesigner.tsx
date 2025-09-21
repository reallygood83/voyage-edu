'use client';

import { useState, useEffect } from 'react';
import { TravelPlan, PromotionalMaterial } from '@/types';
import { EducationalContent, EducationAIEngine, ContentQualityMetrics } from '@/lib/educationAI';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EducationalMaterialDesignerProps {
  educationalContent: EducationalContent;
  travelPlan: TravelPlan;
  onSave: (material: PromotionalMaterial) => void;
  educationSettings: {
    level: 'elementary' | 'middle' | 'high';
    grade: number;
    subject: string;
    learningStyle: string;
    groupSize: string;
  };
}

const EducationalMaterialDesigner = ({
  educationalContent,
  travelPlan,
  onSave,
  educationSettings
}: EducationalMaterialDesignerProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('interactive_worksheet');
  const [qualityMetrics, setQualityMetrics] = useState<ContentQualityMetrics | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState<string>('');

  // 콘텐츠 품질 분석
  useEffect(() => {
    if (educationalContent) {
      analyzeContentQuality();
    }
  }, [educationalContent, educationSettings]);

  const analyzeContentQuality = () => {
    const contentText = educationalContent.contentSections
      .map(section => section.content)
      .join(' ');

    const metrics = EducationAIEngine.analyzeEducationalFitness(
      contentText,
      educationSettings.level,
      educationSettings.grade,
      educationSettings.subject
    );

    setQualityMetrics(metrics);
  };

  // 교육자료 템플릿 목록
  const educationalTemplates = [
    {
      id: 'interactive_worksheet',
      name: '📝 상호작용 워크시트',
      description: '체크박스, 빈칸 채우기, 퀴즈가 포함된 인터랙티브 학습지',
      features: ['체크리스트', '빈칸 채우기', '선택형 문제', '그리기 영역'],
      level: ['elementary', 'middle']
    },
    {
      id: 'learning_journey',
      name: '🗺️ 학습 여정 맵',
      description: '게임화된 학습 경로로 단계별 미션을 완료하는 형태',
      features: ['단계별 미션', '진행률 표시', '보상 시스템', '시각적 맵'],
      level: ['elementary']
    },
    {
      id: 'research_guide',
      name: '🔍 탐구 활동 가이드',
      description: '체계적인 조사와 분석을 위한 연구 활동 템플릿',
      features: ['가설 설정', '자료 수집', '분석 틀', '결론 도출'],
      level: ['middle', 'high']
    },
    {
      id: 'collaborative_project',
      name: '👥 협력 프로젝트',
      description: '팀 단위로 진행하는 협력 학습 프로젝트 가이드',
      features: ['역할 분담', '공동 작업', '상호 평가', '발표 준비'],
      level: ['middle', 'high']
    },
    {
      id: 'assessment_portfolio',
      name: '📊 평가 포트폴리오',
      description: '다양한 평가 도구가 통합된 종합 평가 자료',
      features: ['자기평가', '동료평가', '관찰평가', '성찰일지'],
      level: ['elementary', 'middle', 'high']
    }
  ];

  // 현재 학습 수준에 맞는 템플릿 필터링
  const availableTemplates = educationalTemplates.filter(template =>
    template.level.includes(educationSettings.level)
  );

  // HTML 교육자료 생성
  const generateEducationalMaterial = async () => {
    setIsGenerating(true);
    
    try {
      const template = availableTemplates.find(t => t.id === selectedTemplate);
      if (!template) return;

      let htmlContent = '';

      switch (selectedTemplate) {
        case 'interactive_worksheet':
          htmlContent = generateInteractiveWorksheet();
          break;
        case 'learning_journey':
          htmlContent = generateLearningJourney();
          break;
        case 'research_guide':
          htmlContent = generateResearchGuide();
          break;
        case 'collaborative_project':
          htmlContent = generateCollaborativeProject();
          break;
        case 'assessment_portfolio':
          htmlContent = generateAssessmentPortfolio();
          break;
        default:
          htmlContent = generateInteractiveWorksheet();
      }

      setGeneratedHTML(htmlContent);

      // PromotionalMaterial 형태로 저장
      const material: PromotionalMaterial = {
        id: `edu_${Date.now()}`,
        travelPlanId: travelPlan.id,
        type: 'brochure', // 교육자료는 brochure 타입으로 저장
        title: `${educationalContent.title} - ${template.name}`,
        description: `${educationSettings.level} ${educationSettings.grade}학년 ${educationSettings.subject} 교과 연계 학습자료`,
        imageUrl: undefined,
        content: htmlContent,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      onSave(material);

    } catch (error) {
      console.error('교육자료 생성 실패:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // 상호작용 워크시트 생성
  const generateInteractiveWorksheet = (): string => {
    const destinations = travelPlan.cities || [];
    const objectives = educationalContent.learningObjectives.slice(0, 3);

    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${educationalContent.title} - 상호작용 워크시트</title>
    <style>
        body {
            font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .worksheet {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #667eea;
        }
        .title {
            font-size: 2.5em;
            color: #333;
            margin-bottom: 10px;
            font-weight: bold;
        }
        .subtitle {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 20px;
        }
        .info-box {
            background: #f8f9ff;
            border-left: 5px solid #667eea;
            padding: 20px;
            margin: 20px 0;
            border-radius: 10px;
        }
        .section {
            margin: 30px 0;
            padding: 25px;
            border: 2px solid #e0e0e0;
            border-radius: 15px;
            background: #fafafa;
        }
        .section h3 {
            color: #667eea;
            font-size: 1.4em;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        .section h3::before {
            content: "📍";
            margin-right: 10px;
            font-size: 1.2em;
        }
        .checkbox-item {
            display: flex;
            align-items: center;
            margin: 15px 0;
            padding: 10px;
            background: white;
            border-radius: 8px;
            border: 1px solid #e0e0e0;
        }
        .checkbox {
            width: 20px;
            height: 20px;
            margin-right: 15px;
            cursor: pointer;
        }
        .fill-blank {
            border-bottom: 2px solid #667eea;
            min-width: 150px;
            display: inline-block;
            margin: 0 5px;
            padding: 5px 10px;
            background: #f0f0f0;
        }
        .quiz-section {
            background: #fff8e1;
            border: 2px solid #ffc107;
            border-radius: 15px;
            padding: 25px;
            margin: 20px 0;
        }
        .quiz-question {
            font-weight: bold;
            margin-bottom: 15px;
            color: #e65100;
        }
        .quiz-options {
            margin-left: 20px;
        }
        .quiz-option {
            margin: 10px 0;
            display: flex;
            align-items: center;
        }
        .drawing-area {
            border: 2px dashed #667eea;
            min-height: 150px;
            margin: 20px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f0f4ff;
            border-radius: 10px;
            color: #667eea;
            font-size: 1.1em;
        }
        .progress-bar {
            width: 100%;
            height: 30px;
            background: #e0e0e0;
            border-radius: 15px;
            overflow: hidden;
            margin: 20px 0;
        }
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            width: 0%;
            transition: width 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }
        .achievement-badge {
            display: inline-block;
            background: #4caf50;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            margin: 5px;
            font-size: 0.9em;
            font-weight: bold;
        }
        .learning-objectives {
            background: #e8f5e8;
            border-radius: 15px;
            padding: 20px;
            margin: 20px 0;
        }
        .destinations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .destination-card {
            background: white;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            border: 2px solid #e0e0e0;
            transition: transform 0.3s ease;
        }
        .destination-card:hover {
            transform: translateY(-5px);
            border-color: #667eea;
        }
        @media print {
            body { background: white; }
            .worksheet { box-shadow: none; }
        }
    </style>
    <script>
        function updateProgress() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            const checked = document.querySelectorAll('input[type="checkbox"]:checked');
            const progress = (checked.length / checkboxes.length) * 100;
            
            const progressBar = document.querySelector('.progress-fill');
            if (progressBar) {
                progressBar.style.width = progress + '%';
                progressBar.textContent = Math.round(progress) + '%';
            }
        }
        
        function showAchievement(title) {
            alert('🎉 축하합니다! "' + title + '" 달성했습니다!');
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', updateProgress);
            });
        });
    </script>
</head>
<body>
    <div class="worksheet">
        <div class="header">
            <h1 class="title">🌍 ${educationalContent.title}</h1>
            <p class="subtitle">${educationSettings.level} ${educationSettings.grade}학년 ${educationSettings.subject} 교과 연계 학습</p>
            <div class="info-box">
                <strong>📚 학습 목표:</strong> ${objectives.join(', ')}
            </div>
        </div>

        <div class="learning-objectives">
            <h3>🎯 이번 시간에 배울 내용</h3>
            ${objectives.map((obj, i) => `
                <div class="checkbox-item">
                    <input type="checkbox" class="checkbox" id="obj${i}">
                    <label for="obj${i}">${obj}</label>
                </div>
            `).join('')}
        </div>

        <div class="section">
            <h3>🗺️ 여행할 나라들 알아보기</h3>
            <div class="destinations-grid">
                ${destinations.map(dest => `
                    <div class="destination-card">
                        <h4>📍 ${dest}</h4>
                        <div class="fill-blank" contenteditable="true">특징 적기</div>
                        <div style="margin-top: 10px;">
                            <input type="checkbox" id="dest_${dest}"> 
                            <label for="dest_${dest}">조사 완료</label>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="quiz-section">
            <h3>🧩 퀴즈 타임!</h3>
            <div class="quiz-question">Q1. ${destinations[0] || '선택한 나라'}에서 가장 유명한 음식은 무엇일까요?</div>
            <div class="quiz-options">
                <div class="quiz-option">
                    <input type="radio" name="q1" id="q1a"> <label for="q1a">① 김치</label>
                </div>
                <div class="quiz-option">
                    <input type="radio" name="q1" id="q1b"> <label for="q1b">② 스시</label>
                </div>
                <div class="quiz-option">
                    <input type="radio" name="q1" id="q1c"> <label for="q1c">③ 파스타</label>
                </div>
            </div>
        </div>

        <div class="section">
            <h3>✏️ 나만의 여행 계획 그리기</h3>
            <p>가고 싶은 곳과 하고 싶은 일을 그림으로 그려보세요!</p>
            <div class="drawing-area">
                🎨 여기에 그림을 그려주세요
            </div>
        </div>

        <div class="section">
            <h3>📝 학습 정리하기</h3>
            <p><strong>1. 오늘 가장 재미있었던 것:</strong></p>
            <div class="fill-blank" contenteditable="true" style="width: 100%; min-height: 50px;"></div>
            
            <p><strong>2. 더 알고 싶은 것:</strong></p>
            <div class="fill-blank" contenteditable="true" style="width: 100%; min-height: 50px;"></div>
            
            <p><strong>3. 친구들에게 소개하고 싶은 것:</strong></p>
            <div class="fill-blank" contenteditable="true" style="width: 100%; min-height: 50px;"></div>
        </div>

        <div style="text-align: center; margin-top: 40px;">
            <h3>🏆 학습 진행률</h3>
            <div class="progress-bar">
                <div class="progress-fill">0%</div>
            </div>
            <div style="margin-top: 20px;">
                <span class="achievement-badge">🌟 탐험가</span>
                <span class="achievement-badge">🗺️ 지리박사</span>
                <span class="achievement-badge">🎨 창의왕</span>
            </div>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
            <p style="color: #666;">Voyage Edu에서 제작된 교육자료입니다. 📚✨</p>
        </div>
    </div>
</body>
</html>`;
  };

  // 학습 여정 맵 생성
  const generateLearningJourney = (): string => {
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${educationalContent.title} - 학습 여정 맵</title>
    <style>
        body {
            font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
            min-height: 100vh;
        }
        .journey-map {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .map-header {
            text-align: center;
            margin-bottom: 40px;
        }
        .journey-path {
            display: flex;
            flex-direction: column;
            gap: 30px;
            position: relative;
        }
        .mission-station {
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 20px;
            position: relative;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .mission-station:hover {
            transform: scale(1.02);
        }
        .mission-icon {
            font-size: 3em;
            margin-right: 20px;
        }
        .mission-content {
            flex: 1;
        }
        .mission-title {
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .mission-description {
            opacity: 0.9;
            line-height: 1.4;
        }
        .mission-status {
            background: rgba(255,255,255,0.2);
            padding: 10px 20px;
            border-radius: 25px;
            margin-left: 20px;
        }
        .completed {
            background: #4caf50;
        }
        .current {
            background: #ff9800;
            animation: pulse 2s infinite;
        }
        .locked {
            background: #757575;
            opacity: 0.6;
        }
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
        }
        .rewards-section {
            background: #fff3e0;
            border-radius: 15px;
            padding: 20px;
            margin-top: 30px;
            text-align: center;
        }
        .reward-badge {
            display: inline-block;
            background: #ff9800;
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            margin: 5px;
            font-weight: bold;
        }
    </style>
    <script>
        function completeMission(missionId) {
            const mission = document.getElementById(missionId);
            const status = mission.querySelector('.mission-status');
            
            mission.classList.remove('current');
            mission.classList.add('completed');
            status.textContent = '✅ 완료';
            
            // 다음 미션 활성화
            const nextMission = mission.nextElementSibling;
            if (nextMission && nextMission.classList.contains('locked')) {
                nextMission.classList.remove('locked');
                nextMission.classList.add('current');
                nextMission.querySelector('.mission-status').textContent = '📍 현재 미션';
            }
            
            updateProgress();
        }
        
        function updateProgress() {
            const total = document.querySelectorAll('.mission-station').length;
            const completed = document.querySelectorAll('.completed').length;
            const progress = (completed / total) * 100;
            
            document.getElementById('progress').textContent = Math.round(progress) + '%';
        }
    </script>
</head>
<body>
    <div class="journey-map">
        <div class="map-header">
            <h1>🗺️ ${educationalContent.title} 학습 여정</h1>
            <p>미션을 하나씩 완료하며 세계 여행 전문가가 되어보세요!</p>
            <h3>진행률: <span id="progress">0%</span></h3>
        </div>

        <div class="journey-path">
            <div class="mission-station current" id="mission1" onclick="completeMission('mission1')">
                <div class="mission-icon">🚀</div>
                <div class="mission-content">
                    <div class="mission-title">미션 1: 여행 준비하기</div>
                    <div class="mission-description">
                        세계 지도에서 가고 싶은 나라를 찾아보고, 기본 정보를 조사해보세요.
                    </div>
                </div>
                <div class="mission-status">📍 현재 미션</div>
            </div>

            <div class="mission-station locked" id="mission2" onclick="completeMission('mission2')">
                <div class="mission-icon">🎒</div>
                <div class="mission-content">
                    <div class="mission-title">미션 2: 문화 탐험하기</div>
                    <div class="mission-description">
                        각 나라의 전통 음식, 의상, 축제에 대해 알아보고 정리해보세요.
                    </div>
                </div>
                <div class="mission-status">🔒 잠김</div>
            </div>

            <div class="mission-station locked" id="mission3" onclick="completeMission('mission3')">
                <div class="mission-icon">🏛️</div>
                <div class="mission-content">
                    <div class="mission-title">미션 3: 역사 여행하기</div>
                    <div class="mission-description">
                        각 나라의 유명한 역사적 장소와 이야기를 찾아보세요.
                    </div>
                </div>
                <div class="mission-status">🔒 잠김</div>
            </div>

            <div class="mission-station locked" id="mission4" onclick="completeMission('mission4')">
                <div class="mission-icon">🎨</div>
                <div class="mission-content">
                    <div class="mission-title">미션 4: 여행 계획 만들기</div>
                    <div class="mission-description">
                        배운 내용을 바탕으로 나만의 세계 여행 계획을 세워보세요.
                    </div>
                </div>
                <div class="mission-status">🔒 잠김</div>
            </div>

            <div class="mission-station locked" id="mission5" onclick="completeMission('mission5')">
                <div class="mission-icon">🏆</div>
                <div class="mission-content">
                    <div class="mission-title">미션 5: 여행 전문가 되기</div>
                    <div class="mission-description">
                        친구들에게 여행 계획을 발표하고 세계 여행 전문가 자격을 획득하세요!
                    </div>
                </div>
                <div class="mission-status">🔒 잠김</div>
            </div>
        </div>

        <div class="rewards-section">
            <h3>🏆 획득할 수 있는 보상</h3>
            <div class="reward-badge">🌟 탐험가 뱃지</div>
            <div class="reward-badge">🗺️ 지리 박사 뱃지</div>
            <div class="reward-badge">🎨 창의왕 뱃지</div>
            <div class="reward-badge">🏆 여행 전문가 뱃지</div>
        </div>
    </div>
</body>
</html>`;
  };

  // 탐구 활동 가이드 생성
  const generateResearchGuide = (): string => {
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${educationalContent.title} - 탐구 활동 가이드</title>
    <style>
        body {
            font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            min-height: 100vh;
        }
        .research-guide {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .guide-header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 3px solid #74b9ff;
        }
        .research-step {
            background: #f8f9ff;
            border-left: 5px solid #74b9ff;
            padding: 25px;
            margin: 25px 0;
            border-radius: 10px;
        }
        .step-number {
            background: #74b9ff;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.2em;
            float: left;
            margin-right: 20px;
        }
        .step-content {
            margin-left: 60px;
        }
        .step-title {
            font-size: 1.3em;
            font-weight: bold;
            color: #2d3436;
            margin-bottom: 10px;
        }
        .research-form {
            background: white;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            padding: 20px;
            margin: 15px 0;
        }
        .form-field {
            margin: 15px 0;
        }
        .form-field label {
            display: block;
            font-weight: bold;
            margin-bottom: 5px;
            color: #2d3436;
        }
        .form-field input, .form-field textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-family: inherit;
        }
        .form-field textarea {
            min-height: 100px;
            resize: vertical;
        }
        .analysis-framework {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 20px 0;
        }
        .framework-box {
            background: #e8f4ff;
            border: 2px solid #74b9ff;
            border-radius: 10px;
            padding: 20px;
        }
        .sources-checklist {
            background: #fff8e1;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
        }
        .checklist-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        .checklist-item input {
            margin-right: 10px;
        }
        .conclusion-template {
            background: #e8f5e8;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="research-guide">
        <div class="guide-header">
            <h1>🔍 ${educationalContent.title} 탐구 활동 가이드</h1>
            <p>체계적인 조사와 분석을 통해 깊이 있는 학습을 해보세요!</p>
        </div>

        <div class="research-step">
            <div class="step-number">1</div>
            <div class="step-content">
                <div class="step-title">🎯 연구 문제 설정하기</div>
                <p>궁금한 점이나 해결하고 싶은 문제를 명확하게 정해보세요.</p>
                
                <div class="research-form">
                    <div class="form-field">
                        <label>주요 연구 질문:</label>
                        <textarea placeholder="예: 왜 일본과 한국의 전통 건축양식이 다를까?"></textarea>
                    </div>
                    <div class="form-field">
                        <label>세부 질문 1:</label>
                        <input type="text" placeholder="첫 번째 하위 질문을 적어보세요">
                    </div>
                    <div class="form-field">
                        <label>세부 질문 2:</label>
                        <input type="text" placeholder="두 번째 하위 질문을 적어보세요">
                    </div>
                </div>
            </div>
        </div>

        <div class="research-step">
            <div class="step-number">2</div>
            <div class="step-content">
                <div class="step-title">📚 자료 수집하기</div>
                <p>신뢰할 수 있는 다양한 자료를 수집해보세요.</p>
                
                <div class="sources-checklist">
                    <h4>📋 자료 수집 체크리스트</h4>
                    <div class="checklist-item">
                        <input type="checkbox" id="book"> <label for="book">📖 도서관 책 또는 백과사전</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="website"> <label for="website">🌐 공신력 있는 웹사이트</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="news"> <label for="news">📰 신문 기사</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="video"> <label for="video">🎥 교육용 동영상</label>
                    </div>
                    <div class="checklist-item">
                        <input type="checkbox" id="interview"> <label for="interview">🎤 전문가 인터뷰</label>
                    </div>
                </div>

                <div class="research-form">
                    <div class="form-field">
                        <label>수집한 자료 목록:</label>
                        <textarea placeholder="자료의 제목, 출처, 핵심 내용을 정리해주세요"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="research-step">
            <div class="step-number">3</div>
            <div class="step-content">
                <div class="step-title">🔬 분석하기</div>
                <p>수집한 자료를 체계적으로 분석해보세요.</p>
                
                <div class="analysis-framework">
                    <div class="framework-box">
                        <h4>📊 비교 분석</h4>
                        <div class="form-field">
                            <label>공통점:</label>
                            <textarea rows="3"></textarea>
                        </div>
                        <div class="form-field">
                            <label>차이점:</label>
                            <textarea rows="3"></textarea>
                        </div>
                    </div>
                    
                    <div class="framework-box">
                        <h4>🔍 원인과 결과</h4>
                        <div class="form-field">
                            <label>원인:</label>
                            <textarea rows="3"></textarea>
                        </div>
                        <div class="form-field">
                            <label>결과:</label>
                            <textarea rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="research-step">
            <div class="step-number">4</div>
            <div class="step-content">
                <div class="step-title">📝 결론 도출하기</div>
                <p>분석한 내용을 바탕으로 연구 질문에 대한 답을 찾아보세요.</p>
                
                <div class="conclusion-template">
                    <div class="form-field">
                        <label>🎯 연구 질문에 대한 답:</label>
                        <textarea placeholder="주요 연구 질문에 대한 답을 적어보세요"></textarea>
                    </div>
                    <div class="form-field">
                        <label>💡 새롭게 알게 된 점:</label>
                        <textarea placeholder="이번 연구를 통해 새롭게 알게 된 점들을 정리해보세요"></textarea>
                    </div>
                    <div class="form-field">
                        <label>❓ 추가로 궁금한 점:</label>
                        <textarea placeholder="더 깊이 연구해보고 싶은 주제나 궁금한 점을 적어보세요"></textarea>
                    </div>
                    <div class="form-field">
                        <label>🌟 이 연구의 의미:</label>
                        <textarea placeholder="이번 연구가 왜 중요하고 어떤 의미가 있는지 써보세요"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
            <h3>🏆 연구 완료!</h3>
            <p>수고하셨습니다. 이제 여러분은 진정한 탐구자입니다! 🔍✨</p>
            <p style="color: #666; font-size: 0.9em;">Voyage Edu 탐구 활동 가이드</p>
        </div>
    </div>
</body>
</html>`;
  };

  // 협력 프로젝트 가이드 생성
  const generateCollaborativeProject = (): string => {
    const projectTitle = `${educationalContent.title} - 팀 프로젝트`;
    const teamRoles = [
      { name: '탐험대장', icon: '🏃‍♂️', description: '팀을 이끌고 프로젝트 일정을 관리해요' },
      { name: '자료수집가', icon: '🔍', description: '정보를 찾고 정리하는 전문가예요' },
      { name: '창작가', icon: '🎨', description: '창의적인 결과물을 만드는 담당이에요' },
      { name: '발표자', icon: '🎤', description: '팀의 결과를 멋지게 발표해요' }
    ];

    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectTitle}</title>
    <style>
        body {
            font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .project-container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 25px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .project-header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border-radius: 20px;
            color: white;
        }

        .project-title {
            font-size: 2.5em;
            margin: 0 0 10px 0;
            font-weight: 800;
        }

        .project-subtitle {
            font-size: 1.2em;
            opacity: 0.9;
            margin: 0;
        }

        .team-section {
            margin: 40px 0;
            padding: 30px;
            background: #f8f9ff;
            border-radius: 20px;
            border-left: 6px solid #667eea;
        }

        .section-title {
            font-size: 1.8em;
            color: #333;
            margin: 0 0 25px 0;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .team-roles {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }

        .role-card {
            background: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            border: 2px solid transparent;
            transition: all 0.3s ease;
        }

        .role-card:hover {
            transform: translateY(-5px);
            border-color: #667eea;
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.15);
        }

        .role-icon {
            font-size: 3em;
            margin-bottom: 10px;
            display: block;
        }

        .role-name {
            font-size: 1.3em;
            font-weight: 700;
            color: #333;
            margin: 0 0 10px 0;
        }

        .role-description {
            color: #666;
            font-size: 0.95em;
            line-height: 1.4;
        }

        .project-phases {
            display: grid;
            gap: 25px;
            margin: 30px 0;
        }

        .phase-card {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            border-left: 5px solid #f093fb;
        }

        .phase-title {
            font-size: 1.4em;
            font-weight: 700;
            color: #333;
            margin: 0 0 15px 0;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .phase-activities {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .phase-activities li {
            padding: 8px 0;
            padding-left: 30px;
            position: relative;
            color: #555;
        }

        .phase-activities li:before {
            content: '✅';
            position: absolute;
            left: 0;
        }

        .collaboration-tools {
            background: #fff5f5;
            border-radius: 15px;
            padding: 25px;
            margin: 30px 0;
            border: 2px solid #f093fb;
        }

        .tool-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .tool-item {
            background: white;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .evaluation-criteria {
            background: #f0fff4;
            border-radius: 15px;
            padding: 25px;
            margin: 30px 0;
            border: 2px solid #48bb78;
        }

        .criteria-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .criteria-item {
            background: white;
            padding: 15px;
            border-radius: 10px;
            border-left: 4px solid #48bb78;
        }

        .criteria-title {
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 5px;
        }

        .criteria-description {
            color: #4a5568;
            font-size: 0.9em;
        }

        .timeline {
            background: #f7fafc;
            border-radius: 15px;
            padding: 25px;
            margin: 30px 0;
        }

        .timeline-item {
            display: flex;
            align-items: center;
            margin: 15px 0;
            padding: 15px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .timeline-day {
            background: #667eea;
            color: white;
            padding: 10px 15px;
            border-radius: 50px;
            font-weight: 700;
            margin-right: 20px;
            min-width: 80px;
            text-align: center;
        }

        .timeline-content {
            flex: 1;
        }

        @media (max-width: 768px) {
            .project-container {
                margin: 10px;
                padding: 20px;
            }
            
            .project-title {
                font-size: 2em;
            }
            
            .team-roles {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="project-container">
        <div class="project-header">
            <h1 class="project-title">${projectTitle}</h1>
            <p class="project-subtitle">함께 만들어가는 세계 문화 탐험 프로젝트</p>
        </div>

        <div class="team-section">
            <h2 class="section-title">👥 우리 팀 역할 분담</h2>
            <div class="team-roles">
                ${teamRoles.map(role => `
                    <div class="role-card">
                        <span class="role-icon">${role.icon}</span>
                        <h3 class="role-name">${role.name}</h3>
                        <p class="role-description">${role.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="team-section">
            <h2 class="section-title">🗓️ 프로젝트 진행 단계</h2>
            <div class="project-phases">
                <div class="phase-card">
                    <h3 class="phase-title">📋 1단계: 계획 세우기</h3>
                    <ul class="phase-activities">
                        <li>팀원 역할 정하기</li>
                        <li>여행 목적지 선정하기</li>
                        <li>조사할 문화 요소 정하기</li>
                        <li>일정 계획 세우기</li>
                    </ul>
                </div>
                
                <div class="phase-card">
                    <h3 class="phase-title">🔍 2단계: 자료 조사하기</h3>
                    <ul class="phase-activities">
                        <li>목적지 기본 정보 수집</li>
                        <li>전통 문화와 현대 문화 조사</li>
                        <li>음식, 의상, 축제 등 조사</li>
                        <li>우리나라와 비교 분석</li>
                    </ul>
                </div>
                
                <div class="phase-card">
                    <h3 class="phase-title">🎨 3단계: 결과물 만들기</h3>
                    <ul class="phase-activities">
                        <li>여행 계획서 작성</li>
                        <li>문화 비교 포스터 제작</li>
                        <li>전통 요리 체험 계획</li>
                        <li>발표 자료 준비</li>
                    </ul>
                </div>
                
                <div class="phase-card">
                    <h3 class="phase-title">🎤 4단계: 발표하기</h3>
                    <ul class="phase-activities">
                        <li>팀 발표 진행</li>
                        <li>다른 팀과 정보 공유</li>
                        <li>상호 피드백 주고받기</li>
                        <li>프로젝트 성찰하기</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="collaboration-tools">
            <h2 class="section-title">🛠️ 협업 도구 활용</h2>
            <div class="tool-grid">
                <div class="tool-item">
                    <h4>📝 구글 문서</h4>
                    <p>함께 자료 정리</p>
                </div>
                <div class="tool-item">
                    <h4>📊 패들릿</h4>
                    <p>아이디어 공유</p>
                </div>
                <div class="tool-item">
                    <h4>🎨 칸바</h4>
                    <p>포스터 제작</p>
                </div>
                <div class="tool-item">
                    <h4>💬 클래스룸</h4>
                    <p>소통과 피드백</p>
                </div>
            </div>
        </div>

        <div class="evaluation-criteria">
            <h2 class="section-title">⭐ 평가 기준</h2>
            <div class="criteria-grid">
                <div class="criteria-item">
                    <div class="criteria-title">협력과 소통</div>
                    <div class="criteria-description">팀원들과 잘 협력하고 적극적으로 소통했나요?</div>
                </div>
                <div class="criteria-item">
                    <div class="criteria-title">창의적 사고</div>
                    <div class="criteria-description">독창적이고 창의적인 아이디어를 제시했나요?</div>
                </div>
                <div class="criteria-item">
                    <div class="criteria-title">자료 활용</div>
                    <div class="criteria-description">다양한 자료를 잘 수집하고 활용했나요?</div>
                </div>
                <div class="criteria-item">
                    <div class="criteria-title">문제 해결</div>
                    <div class="criteria-description">문제 상황을 잘 해결하고 대안을 제시했나요?</div>
                </div>
            </div>
        </div>

        <div class="timeline">
            <h2 class="section-title">📅 권장 일정표</h2>
            <div class="timeline-item">
                <div class="timeline-day">1-2일</div>
                <div class="timeline-content">
                    <strong>팀 구성 및 계획</strong><br>
                    역할 분담, 목적지 선정, 조사 계획 수립
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-day">3-5일</div>
                <div class="timeline-content">
                    <strong>자료 조사</strong><br>
                    문화, 역사, 지리 정보 수집 및 정리
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-day">6-8일</div>
                <div class="timeline-content">
                    <strong>결과물 제작</strong><br>
                    발표 자료, 포스터, 체험 활동 준비
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-day">9-10일</div>
                <div class="timeline-content">
                    <strong>발표 및 공유</strong><br>
                    팀 발표, 피드백, 성찰 활동
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;
  };

  // 평가 포트폴리오 생성
  const generateAssessmentPortfolio = (): string => {
    const assessmentTitle = `${educationalContent.title} - 학습 포트폴리오`;
    
    return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${assessmentTitle}</title>
    <style>
        body {
            font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            margin: 0;
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .portfolio-container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 25px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .portfolio-header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%);
            border-radius: 20px;
            color: white;
        }

        .portfolio-title {
            font-size: 2.5em;
            margin: 0 0 10px 0;
            font-weight: 800;
        }

        .portfolio-subtitle {
            font-size: 1.2em;
            opacity: 0.9;
            margin: 0;
        }

        .learning-objectives {
            background: #f0f8ff;
            border-radius: 15px;
            padding: 25px;
            margin: 30px 0;
            border-left: 5px solid #4a90e2;
        }

        .section-title {
            font-size: 1.8em;
            color: #333;
            margin: 0 0 20px 0;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .objectives-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .objective-card {
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            border-top: 4px solid #4a90e2;
        }

        .objective-title {
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 10px;
            font-size: 1.1em;
        }

        .objective-description {
            color: #4a5568;
            font-size: 0.95em;
            line-height: 1.5;
        }

        .assessment-rubric {
            background: #fff9f0;
            border-radius: 15px;
            padding: 25px;
            margin: 30px 0;
            border: 2px solid #f6ad55;
        }

        .rubric-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        }

        .rubric-table th {
            background: #4a90e2;
            color: white;
            padding: 15px;
            text-align: center;
            font-weight: 700;
        }

        .rubric-table td {
            padding: 15px;
            border-bottom: 1px solid #e2e8f0;
            text-align: center;
            vertical-align: top;
        }

        .rubric-table tr:last-child td {
            border-bottom: none;
        }

        .rubric-table tr:nth-child(even) {
            background: #f8f9fa;
        }

        .level-excellent { background: #c6f6d5 !important; }
        .level-good { background: #fed7d7 !important; }
        .level-needs-improvement { background: #fefcbf !important; }

        .self-assessment {
            background: #f0fff4;
            border-radius: 15px;
            padding: 25px;
            margin: 30px 0;
            border: 2px solid #48bb78;
        }

        .assessment-items {
            display: grid;
            gap: 20px;
            margin-top: 20px;
        }

        .assessment-item {
            background: white;
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .assessment-question {
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 15px;
            font-size: 1.1em;
        }

        .rating-scale {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
            flex-wrap: wrap;
        }

        .rating-option {
            background: #f7fafc;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            padding: 10px 15px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            min-width: 80px;
        }

        .rating-option:hover {
            border-color: #4a90e2;
            background: #e6f3ff;
        }

        .reflection-area {
            width: 100%;
            min-height: 80px;
            padding: 15px;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            font-family: inherit;
            font-size: 0.95em;
            resize: vertical;
        }

        .reflection-area:focus {
            outline: none;
            border-color: #4a90e2;
            box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
        }

        .evidence-collection {
            background: #fdf2f8;
            border-radius: 15px;
            padding: 25px;
            margin: 30px 0;
            border: 2px solid #f687b3;
        }

        .evidence-types {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }

        .evidence-type {
            background: white;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 3px 10px rgba(0,0,0,0.05);
            border-top: 4px solid #f687b3;
        }

        .evidence-icon {
            font-size: 2.5em;
            margin-bottom: 10px;
            display: block;
        }

        .evidence-title {
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 10px;
        }

        .evidence-description {
            color: #4a5568;
            font-size: 0.9em;
            line-height: 1.4;
        }

        .growth-tracking {
            background: #f7fafc;
            border-radius: 15px;
            padding: 25px;
            margin: 30px 0;
        }

        .growth-chart {
            background: white;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .chart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #e2e8f0;
        }

        .chart-title {
            font-weight: 700;
            color: #2d3748;
        }

        .progress-bars {
            display: grid;
            gap: 15px;
        }

        .progress-item {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .progress-label {
            min-width: 120px;
            font-weight: 600;
            color: #4a5568;
            font-size: 0.9em;
        }

        .progress-bar {
            flex: 1;
            height: 25px;
            background: #e2e8f0;
            border-radius: 12px;
            overflow: hidden;
            position: relative;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #4a90e2, #63b3ed);
            border-radius: 12px;
            transition: width 0.5s ease;
        }

        .progress-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-weight: 600;
            color: white;
            font-size: 0.8em;
        }

        @media (max-width: 768px) {
            .portfolio-container {
                margin: 10px;
                padding: 20px;
            }
            
            .portfolio-title {
                font-size: 2em;
            }
            
            .objectives-grid {
                grid-template-columns: 1fr;
            }
            
            .evidence-types {
                grid-template-columns: 1fr;
            }
            
            .rating-scale {
                justify-content: center;
            }
        }
    </style>
</head>
<body>
    <div class="portfolio-container">
        <div class="portfolio-header">
            <h1 class="portfolio-title">${assessmentTitle}</h1>
            <p class="portfolio-subtitle">나만의 학습 성장 기록장</p>
        </div>

        <div class="learning-objectives">
            <h2 class="section-title">🎯 학습 목표</h2>
            <div class="objectives-grid">
                ${educationalContent.learningObjectives.map((objective, index) => `
                    <div class="objective-card">
                        <div class="objective-title">목표 ${index + 1}</div>
                        <div class="objective-description">${objective}</div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="assessment-rubric">
            <h2 class="section-title">📊 평가 기준표</h2>
            <table class="rubric-table">
                <thead>
                    <tr>
                        <th style="width: 25%;">평가 영역</th>
                        <th style="width: 25%;">우수 (4점)</th>
                        <th style="width: 25%;">양호 (3점)</th>
                        <th style="width: 25%;">보완 필요 (2점)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>문화 이해도</strong></td>
                        <td class="level-excellent">다양한 문화적 특징을 깊이 있게 이해하고 비교 분석함</td>
                        <td class="level-good">문화적 특징을 이해하고 기본적인 비교가 가능함</td>
                        <td class="level-needs-improvement">문화적 특징에 대한 이해가 부족함</td>
                    </tr>
                    <tr>
                        <td><strong>조사 능력</strong></td>
                        <td class="level-excellent">다양한 자료를 수집하고 신뢰성 있게 정리함</td>
                        <td class="level-good">기본적인 자료 수집과 정리가 가능함</td>
                        <td class="level-needs-improvement">자료 수집과 정리에 도움이 필요함</td>
                    </tr>
                    <tr>
                        <td><strong>창의적 표현</strong></td>
                        <td class="level-excellent">독창적이고 창의적인 방법으로 표현함</td>
                        <td class="level-good">적절한 방법으로 내용을 표현함</td>
                        <td class="level-needs-improvement">표현 방법이 단조롭거나 미흡함</td>
                    </tr>
                    <tr>
                        <td><strong>협력과 소통</strong></td>
                        <td class="level-excellent">적극적으로 협력하고 효과적으로 소통함</td>
                        <td class="level-good">기본적인 협력과 소통이 가능함</td>
                        <td class="level-needs-improvement">협력과 소통에 어려움을 보임</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="self-assessment">
            <h2 class="section-title">🤔 자기 평가</h2>
            <div class="assessment-items">
                <div class="assessment-item">
                    <div class="assessment-question">1. 세계 여러 나라의 문화를 얼마나 잘 이해했나요?</div>
                    <div class="rating-scale">
                        <div class="rating-option">매우 잘함</div>
                        <div class="rating-option">잘함</div>
                        <div class="rating-option">보통</div>
                        <div class="rating-option">노력 필요</div>
                    </div>
                    <textarea class="reflection-area" placeholder="구체적인 이유나 예시를 써보세요..."></textarea>
                </div>
                
                <div class="assessment-item">
                    <div class="assessment-question">2. 조사 활동에 얼마나 적극적으로 참여했나요?</div>
                    <div class="rating-scale">
                        <div class="rating-option">매우 적극적</div>
                        <div class="rating-option">적극적</div>
                        <div class="rating-option">보통</div>
                        <div class="rating-option">소극적</div>
                    </div>
                    <textarea class="reflection-area" placeholder="어떤 조사 활동을 했는지 써보세요..."></textarea>
                </div>
                
                <div class="assessment-item">
                    <div class="assessment-question">3. 팀 활동에서 협력을 얼마나 잘했나요?</div>
                    <div class="rating-scale">
                        <div class="rating-option">매우 잘함</div>
                        <div class="rating-option">잘함</div>
                        <div class="rating-option">보통</div>
                        <div class="rating-option">노력 필요</div>
                    </div>
                    <textarea class="reflection-area" placeholder="팀 활동에서 어떻게 협력했는지 써보세요..."></textarea>
                </div>
                
                <div class="assessment-item">
                    <div class="assessment-question">4. 가장 기억에 남는 것과 배운 점은 무엇인가요?</div>
                    <textarea class="reflection-area" placeholder="가장 인상 깊었던 문화나 새롭게 알게 된 점을 써보세요..." style="min-height: 120px;"></textarea>
                </div>
            </div>
        </div>

        <div class="evidence-collection">
            <h2 class="section-title">📁 학습 증거 자료</h2>
            <div class="evidence-types">
                <div class="evidence-type">
                    <span class="evidence-icon">📝</span>
                    <div class="evidence-title">조사 보고서</div>
                    <div class="evidence-description">나라별 문화 조사 자료와 정리한 내용</div>
                </div>
                <div class="evidence-type">
                    <span class="evidence-icon">🎨</span>
                    <div class="evidence-title">창작물</div>
                    <div class="evidence-description">포스터, 그림, 만들기 작품 등</div>
                </div>
                <div class="evidence-type">
                    <span class="evidence-icon">📸</span>
                    <div class="evidence-title">활동 사진</div>
                    <div class="evidence-description">수업 활동, 체험 활동 사진</div>
                </div>
                <div class="evidence-type">
                    <span class="evidence-icon">🎤</span>
                    <div class="evidence-title">발표 자료</div>
                    <div class="evidence-description">발표 슬라이드, 발표 영상</div>
                </div>
                <div class="evidence-type">
                    <span class="evidence-icon">✍️</span>
                    <div class="evidence-title">성찰 일지</div>
                    <div class="evidence-description">학습 과정과 느낀 점 기록</div>
                </div>
                <div class="evidence-type">
                    <span class="evidence-icon">👥</span>
                    <div class="evidence-title">협력 기록</div>
                    <div class="evidence-description">팀 활동 과정과 역할 수행 내용</div>
                </div>
            </div>
        </div>

        <div class="growth-tracking">
            <h2 class="section-title">📈 성장 기록</h2>
            <div class="growth-chart">
                <div class="chart-header">
                    <div class="chart-title">학습 영역별 성장도</div>
                    <div style="font-size: 0.9em; color: #718096;">클릭하여 점수를 조정하세요</div>
                </div>
                <div class="progress-bars">
                    <div class="progress-item">
                        <div class="progress-label">문화 이해</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 75%;">
                                <div class="progress-text">75%</div>
                            </div>
                        </div>
                    </div>
                    <div class="progress-item">
                        <div class="progress-label">조사 능력</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 80%;">
                                <div class="progress-text">80%</div>
                            </div>
                        </div>
                    </div>
                    <div class="progress-item">
                        <div class="progress-label">창의적 표현</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 70%;">
                                <div class="progress-text">70%</div>
                            </div>
                        </div>
                    </div>
                    <div class="progress-item">
                        <div class="progress-label">협력 소통</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 85%;">
                                <div class="progress-text">85%</div>
                            </div>
                        </div>
                    </div>
                    <div class="progress-item">
                        <div class="progress-label">발표 능력</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 65%;">
                                <div class="progress-text">65%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // 평점 선택 기능
        document.querySelectorAll('.rating-option').forEach(option => {
            option.addEventListener('click', function() {
                // 같은 그룹의 다른 선택 해제
                this.parentElement.querySelectorAll('.rating-option').forEach(el => {
                    el.style.background = '#f7fafc';
                    el.style.borderColor = '#e2e8f0';
                    el.style.color = '#2d3748';
                });
                
                // 선택된 항목 강조
                this.style.background = '#4a90e2';
                this.style.borderColor = '#4a90e2';
                this.style.color = 'white';
            });
        });

        // 진행률 바 클릭 기능
        document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const percentage = Math.round((clickX / rect.width) * 100);
                
                const fill = this.querySelector('.progress-fill');
                const text = this.querySelector('.progress-text');
                
                fill.style.width = percentage + '%';
                text.textContent = percentage + '%';
            });
        });
    </script>
</body>
</html>`;
  };

  return (
    <div className="space-y-8">
      {/* 품질 분석 결과 */}
      {qualityMetrics && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              📊 교육 콘텐츠 품질 분석
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {qualityMetrics.educationalAlignment}%
                </div>
                <div className="text-sm text-gray-600">교육과정 연계성</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {qualityMetrics.ageAppropriateness}%
                </div>
                <div className="text-sm text-gray-600">연령 적합성</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {qualityMetrics.engagementLevel}%
                </div>
                <div className="text-sm text-gray-600">참여도 예상</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {qualityMetrics.comprehensibility}%
                </div>
                <div className="text-sm text-gray-600">이해 용이성</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {qualityMetrics.interactivity}%
                </div>
                <div className="text-sm text-gray-600">상호작용성</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {qualityMetrics.overallScore}%
                </div>
                <div className="text-sm text-gray-600">종합 점수</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 템플릿 선택 */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            🎨 교육자료 템플릿 선택
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <h4 className="font-bold text-lg mb-2">{template.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex flex-wrap gap-1">
                  {template.features.map((feature, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 생성된 자료 미리보기 */}
      {generatedHTML && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              👀 생성된 교육자료 미리보기
            </h3>
            <div className="border-2 border-gray-300 rounded-lg p-4 max-h-96 overflow-y-auto">
              <iframe
                srcDoc={generatedHTML}
                className="w-full h-80 border-0"
                title="교육자료 미리보기"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* 생성 버튼 */}
      <div className="text-center">
        <Button
          onClick={generateEducationalMaterial}
          disabled={isGenerating}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          {isGenerating ? '🔄 생성 중...' : '✨ 교육자료 생성하기'}
        </Button>
      </div>
    </div>
  );
};

export default EducationalMaterialDesigner;