'use client';

import { useState, useEffect } from 'react';
import { TravelPlan, PromotionalMaterial } from '@/types';
import BrochureDesigner from './BrochureDesigner';
import PosterGenerator from './PosterGenerator';
import EducationalMaterialDesigner from '@/components/EducationalMaterialDesigner';
import { EducationAIEngine, EducationalContent } from '@/lib/educationAI';
import { EducationTemplateEngine } from '@/lib/educationTemplates';
import { LearningObjectiveAnalyzer } from '@/lib/educationStandards';

interface PromotionalMaterialsProps {
  travelPlan: TravelPlan;
  onBack: () => void;
  educationMode?: boolean;
  targetGrade?: number;
  targetSubject?: string;
}

const PromotionalMaterials = ({ 
  travelPlan, 
  onBack, 
  educationMode = false,
  targetGrade = 5,
  targetSubject = '사회'
}: PromotionalMaterialsProps) => {
  const [materialType, setMaterialType] = useState<'brochure' | 'poster' | 'social' | 'educational'>(
    educationMode ? 'educational' : 'brochure'
  );
  const [generatedMaterials, setGeneratedMaterials] = useState<PromotionalMaterial[]>([]);
  const [educationalContent, setEducationalContent] = useState<EducationalContent | null>(null);
  const [educationSettings, setEducationSettings] = useState({
    level: 'elementary' as 'elementary' | 'middle' | 'high',
    grade: targetGrade,
    subject: targetSubject,
    learningStyle: 'visual' as 'visual' | 'auditory' | 'kinesthetic' | 'reading',
    groupSize: 'small' as 'individual' | 'small' | 'large'
  });

  const handleSaveMaterial = (material: PromotionalMaterial) => {
    setGeneratedMaterials([...generatedMaterials, material]);
  };

  // 교육용 콘텐츠 생성
  useEffect(() => {
    if (educationMode && travelPlan && travelPlan.cities) {
      generateEducationalContent();
    }
  }, [educationMode, travelPlan, educationSettings]);

  const generateEducationalContent = async () => {
    if (!travelPlan.cities || travelPlan.cities.length === 0) return;

    try {
      // 추천 템플릿 가져오기
      const recommendedTemplates = EducationTemplateEngine.recommendTemplate(
        educationSettings.level,
        educationSettings.grade,
        educationSettings.subject,
        educationSettings.learningStyle,
        educationSettings.groupSize
      );

      const template = recommendedTemplates[0]; // 첫 번째 추천 템플릿 사용
      if (!template) return;

      // 교육용 콘텐츠 생성
      const content = EducationAIEngine.generateEducationalContent(
        '세계 문화 탐험',
        travelPlan.cities,
        educationSettings.level,
        educationSettings.grade,
        educationSettings.subject,
        template
      );

      setEducationalContent(content);
    } catch (error) {
      console.error('교육용 콘텐츠 생성 실패:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Material Type Selection */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          {educationMode ? '📚 교육용 자료 만들기' : '📢 홍보 자료 만들기'}
        </h2>
        
        {educationMode && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">🎯 교육 설정</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <label className="block text-blue-700 font-medium">학교급</label>
                <select 
                  value={educationSettings.level}
                  onChange={(e) => setEducationSettings(prev => ({...prev, level: e.target.value as any}))}
                  className="w-full mt-1 border border-blue-300 rounded px-2 py-1"
                >
                  <option value="elementary">초등학교</option>
                  <option value="middle">중학교</option>
                  <option value="high">고등학교</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-700 font-medium">학년</label>
                <select 
                  value={educationSettings.grade}
                  onChange={(e) => setEducationSettings(prev => ({...prev, grade: parseInt(e.target.value)}))}
                  className="w-full mt-1 border border-blue-300 rounded px-2 py-1"
                >
                  {[1,2,3,4,5,6].map(grade => (
                    <option key={grade} value={grade}>{grade}학년</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-blue-700 font-medium">교과</label>
                <select 
                  value={educationSettings.subject}
                  onChange={(e) => setEducationSettings(prev => ({...prev, subject: e.target.value}))}
                  className="w-full mt-1 border border-blue-300 rounded px-2 py-1"
                >
                  <option value="사회">사회</option>
                  <option value="통합교과">통합교과</option>
                  <option value="도덕">도덕</option>
                  <option value="국어">국어</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-700 font-medium">학습 스타일</label>
                <select 
                  value={educationSettings.learningStyle}
                  onChange={(e) => setEducationSettings(prev => ({...prev, learningStyle: e.target.value as any}))}
                  className="w-full mt-1 border border-blue-300 rounded px-2 py-1"
                >
                  <option value="visual">시각형</option>
                  <option value="auditory">청각형</option>
                  <option value="kinesthetic">체험형</option>
                  <option value="reading">독서형</option>
                </select>
              </div>
              <div>
                <label className="block text-blue-700 font-medium">그룹 크기</label>
                <select 
                  value={educationSettings.groupSize}
                  onChange={(e) => setEducationSettings(prev => ({...prev, groupSize: e.target.value as any}))}
                  className="w-full mt-1 border border-blue-300 rounded px-2 py-1"
                >
                  <option value="individual">개별</option>
                  <option value="small">소그룹</option>
                  <option value="large">대그룹</option>
                </select>
              </div>
            </div>
          </div>
        )}
        
        <div className={`grid grid-cols-1 md:grid-cols-${educationMode ? '4' : '3'} gap-4`}>
          {educationMode && (
            <button
              onClick={() => setMaterialType('educational')}
              className={`p-6 rounded-xl border-2 transition-all ${
                materialType === 'educational'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-bold text-lg">교육 자료</h3>
              <p className="text-sm text-gray-600 mt-1">
                교육과정 연계 학습 자료
              </p>
            </button>
          )}
          <button
            onClick={() => setMaterialType('brochure')}
            className={`p-6 rounded-xl border-2 transition-all ${
              materialType === 'brochure'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-4xl mb-3">📄</div>
            <h3 className="font-bold text-lg">브로슈어</h3>
            <p className="text-sm text-gray-600 mt-1">
              상세한 여행 정보를 담은 안내 책자
            </p>
          </button>
          
          <button
            onClick={() => setMaterialType('poster')}
            className={`p-6 rounded-xl border-2 transition-all ${
              materialType === 'poster'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-4xl mb-3">🖼️</div>
            <h3 className="font-bold text-lg">포스터</h3>
            <p className="text-sm text-gray-600 mt-1">
              시선을 사로잡는 홍보 포스터
            </p>
          </button>
          
          <button
            onClick={() => setMaterialType('social')}
            className={`p-6 rounded-xl border-2 transition-all ${
              materialType === 'social'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-4xl mb-3">📱</div>
            <h3 className="font-bold text-lg">소셜 미디어</h3>
            <p className="text-sm text-gray-600 mt-1">
              SNS용 홍보 이미지
            </p>
          </button>
        </div>
      </div>

      {/* Material Designer */}
      {materialType === 'brochure' && (
        <BrochureDesigner
          travelPlan={travelPlan}
          onSave={handleSaveMaterial}
        />
      )}
      
      {materialType === 'poster' && (
        <PosterGenerator
          travelPlan={travelPlan}
          selectedCities={travelPlan.cities?.map(cityName => ({
            id: cityName,
            name: cityName,
            nameKo: cityName,
            country: 'Korea',
            countryCode: 'KR',
            latitude: 0,
            longitude: 0
          })) || []}
          onSave={handleSaveMaterial}
        />
      )}
      
      {materialType === 'social' && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            📱 소셜 미디어 콘텐츠
          </h3>
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">🚧</div>
            <p>준비 중입니다!</p>
            <p className="text-sm mt-2">곧 Instagram, Facebook용 콘텐츠를 만들 수 있어요</p>
          </div>
        </div>
      )}
      
      {materialType === 'educational' && educationalContent && (
        <EducationalMaterialDesigner
          educationalContent={educationalContent}
          travelPlan={travelPlan}
          onSave={handleSaveMaterial}
          educationSettings={educationSettings}
        />
      )}

      {/* Generated Materials */}
      {generatedMaterials.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            ✅ 생성된 홍보 자료
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedMaterials.map((material) => (
              <div
                key={material.id}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="text-2xl mb-2">
                  {material.type === 'brochure' && '📄'}
                  {material.type === 'poster' && '🖼️'}
                  {material.type === 'social' && '📱'}
                </div>
                <h4 className="font-semibold">{material.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{material.description}</p>
                <button className="mt-3 text-primary-500 hover:text-primary-700 text-sm font-medium">
                  다운로드 →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="btn-secondary px-8 py-3"
        >
          ← 이전 단계
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
        >
          {educationMode ? '🎓 학습 자료 활용하기' : '🎉 완료 및 공유하기'}
        </button>
      </div>
    </div>
  );
};

export default PromotionalMaterials;