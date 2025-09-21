'use client';

import { useState } from 'react';
import { TravelPlan, PromotionalMaterial } from '@/types';
import BrochureDesigner from './BrochureDesigner';
import PosterGenerator from './PosterGenerator';

interface PromotionalMaterialsProps {
  travelPlan: TravelPlan;
  onBack: () => void;
}

const PromotionalMaterials = ({ travelPlan, onBack }: PromotionalMaterialsProps) => {
  const [materialType, setMaterialType] = useState<'brochure' | 'poster' | 'social'>('brochure');
  const [generatedMaterials, setGeneratedMaterials] = useState<PromotionalMaterial[]>([]);

  const handleSaveMaterial = (material: PromotionalMaterial) => {
    setGeneratedMaterials([...generatedMaterials, material]);
  };

  return (
    <div className="space-y-8">
      {/* Material Type Selection */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          📢 홍보 자료 만들기
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          🎉 완료 및 공유하기
        </button>
      </div>
    </div>
  );
};

export default PromotionalMaterials;