'use client';

import { useState } from 'react';
import { TravelPlan, PromotionalMaterial } from '@/types';

interface BrochureDesignerProps {
  travelPlan: TravelPlan;
  onSave: (material: PromotionalMaterial) => void;
}

const BrochureDesigner = ({ travelPlan, onSave }: BrochureDesignerProps) => {
  const [title, setTitle] = useState(`${travelPlan.title} 여행 안내`);
  const [description, setDescription] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<'classic' | 'modern' | 'fun'>('modern');

  const templates = [
    { id: 'classic', name: '클래식', icon: '📜', color: 'from-amber-100 to-amber-200' },
    { id: 'modern', name: '모던', icon: '🎨', color: 'from-blue-100 to-purple-200' },
    { id: 'fun', name: '재미있는', icon: '🌈', color: 'from-pink-100 to-yellow-200' },
  ];

  const handleGenerateBrochure = () => {
    const material: PromotionalMaterial = {
      id: `mat_${Date.now()}`,
      travelPlanId: travelPlan.id,
      type: 'brochure',
      title,
      description,
      content: {
        template: selectedTemplate,
        travelPlan,
        customText: description,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    onSave(material);
    // Reset form
    setDescription('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        📄 브로슈어 디자인
      </h3>

      {/* Template Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          템플릿 선택
        </label>
        <div className="grid grid-cols-3 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template.id as any)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedTemplate === template.id
                  ? 'border-primary-500 shadow-lg'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className={`h-32 rounded-lg bg-gradient-to-br ${template.color} mb-3 flex items-center justify-center text-4xl`}>
                {template.icon}
              </div>
              <p className="font-medium">{template.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Brochure Content */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            브로슈어 제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            홍보 문구
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="특별한 여행의 매력을 설명해주세요..."
            className="input-field w-full"
            rows={4}
          />
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6 p-6 bg-gray-50 rounded-xl">
        <h4 className="font-semibold mb-3">미리보기</h4>
        <div className={`bg-gradient-to-br ${templates.find(t => t.id === selectedTemplate)?.color} rounded-lg p-6`}>
          <h5 className="text-xl font-bold mb-2">{title}</h5>
          <p className="text-gray-700 mb-4">{description || '여행 설명을 입력해주세요'}</p>
          
          <div className="bg-white/80 rounded-lg p-4 space-y-2">
            <p className="font-semibold">📍 방문 도시:</p>
            <div className="flex flex-wrap gap-2">
              {travelPlan.destinations?.map(dest => (
                <span key={dest.city.id} className="bg-primary-100 px-3 py-1 rounded-full text-sm">
                  {dest.city.nameKo}
                </span>
              )) || <span className="text-gray-500 text-sm">도시 정보가 없습니다</span>}
            </div>
          </div>
          
          <div className="mt-4 bg-white/80 rounded-lg p-4">
            <p className="font-semibold">👥 타겟 고객:</p>
            <p className="text-sm mt-1">{travelPlan.targetCustomer?.type || '일반 여행객'}</p>
            <p className="font-semibold mt-2">💰 예상 비용:</p>
            <p className="text-sm mt-1">₩{travelPlan.totalBudget?.toLocaleString() || '미정'}</p>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateBrochure}
        className="btn-primary w-full mt-6"
        disabled={!title}
      >
        브로슈어 생성하기
      </button>
    </div>
  );
};

export default BrochureDesigner;