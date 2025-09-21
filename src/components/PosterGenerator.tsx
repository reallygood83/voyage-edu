'use client';

import { useState } from 'react';
import { TravelPlan, PromotionalMaterial } from '@/types';

interface PosterGeneratorProps {
  travelPlan: TravelPlan;
  onSave: (material: PromotionalMaterial) => void;
}

const PosterGenerator = ({ travelPlan, onSave }: PosterGeneratorProps) => {
  const [title, setTitle] = useState(travelPlan.title);
  const [tagline, setTagline] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<'vibrant' | 'elegant' | 'playful'>('vibrant');
  const [selectedLayout, setSelectedLayout] = useState<'vertical' | 'horizontal'>('vertical');

  const styles = [
    { id: 'vibrant', name: '활기찬', emoji: '🎆', colors: 'from-orange-400 to-pink-600' },
    { id: 'elegant', name: '우아한', emoji: '✨', colors: 'from-gray-700 to-gray-900' },
    { id: 'playful', name: '재미있는', emoji: '🎪', colors: 'from-green-400 to-blue-500' },
  ];

  const handleGeneratePoster = () => {
    const material: PromotionalMaterial = {
      id: `mat_${Date.now()}`,
      travelPlanId: travelPlan.id,
      type: 'poster',
      title,
      description: tagline,
      content: {
        style: selectedStyle,
        layout: selectedLayout,
        travelPlan,
        tagline,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    onSave(material);
    setTagline('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        🖼️ 포스터 생성
      </h3>

      {/* Style Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          포스터 스타일
        </label>
        <div className="grid grid-cols-3 gap-4">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id as any)}
              className={`p-4 rounded-xl border-2 transition-all ${
                selectedStyle === style.id
                  ? 'border-primary-500 shadow-lg'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className={`h-20 rounded-lg bg-gradient-to-br ${style.colors} mb-3 flex items-center justify-center text-3xl`}>
                {style.emoji}
              </div>
              <p className="font-medium">{style.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Layout Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          레이아웃
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setSelectedLayout('vertical')}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedLayout === 'vertical'
                ? 'border-primary-500 shadow-lg'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="h-32 w-24 mx-auto bg-gray-200 rounded mb-2"></div>
            <p className="font-medium">세로형</p>
          </button>
          <button
            onClick={() => setSelectedLayout('horizontal')}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedLayout === 'horizontal'
                ? 'border-primary-500 shadow-lg'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="h-24 w-32 mx-auto bg-gray-200 rounded mb-2"></div>
            <p className="font-medium">가로형</p>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            포스터 제목
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
            캐치프레이즈
          </label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="예: 잊지 못할 문화 체험의 시작!"
            className="input-field w-full"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6 p-6 bg-gray-50 rounded-xl">
        <h4 className="font-semibold mb-3">미리보기</h4>
        <div className={`${selectedLayout === 'vertical' ? 'max-w-sm' : 'max-w-2xl'} mx-auto`}>
          <div className={`bg-gradient-to-br ${styles.find(s => s.id === selectedStyle)?.colors} rounded-lg p-8 text-white ${
            selectedLayout === 'vertical' ? 'aspect-[3/4]' : 'aspect-[16/9]'
          } flex flex-col justify-between`}>
            <div>
              <h5 className="text-3xl font-bold mb-2">{title}</h5>
              {tagline && <p className="text-lg opacity-90">{tagline}</p>}
            </div>
            
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {travelPlan.destinations?.map(dest => (
                  <span key={dest.city.id} className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {dest.city.nameKo}
                  </span>
                )) || <span className="text-white/70 text-sm">도시 정보가 없습니다</span>}
              </div>
              
              <div className="text-sm opacity-80">
                <p>{travelPlan.startDate} ~ {travelPlan.endDate}</p>
                <p className="font-bold text-xl mt-1">₩{travelPlan.totalBudget?.toLocaleString() || '미정'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGeneratePoster}
        className="btn-primary w-full mt-6"
        disabled={!title}
      >
        포스터 생성하기
      </button>
    </div>
  );
};

export default PosterGenerator;