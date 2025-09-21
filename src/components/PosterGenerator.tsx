'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TravelPlan, PromotionalMaterial, City } from '@/types';

interface PosterGeneratorProps {
  travelPlan: TravelPlan;
  selectedCities: City[];
  onSave: (material: PromotionalMaterial) => void;
  onClose?: () => void;
}

interface PosterData {
  title: string;
  subtitle: string;
  highlights: string[];
  duration: string;
  budget: string;
  theme: 'modern' | 'vintage' | 'minimalist' | 'colorful';
  showImages: boolean;
  showQR: boolean;
  customText: string;
}

const PosterGenerator = ({ travelPlan, selectedCities, onSave, onClose }: PosterGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [posterData, setPosterData] = useState<PosterData>({
    title: `${selectedCities.map(c => c.nameKo || c.name).join(' & ')} 여행`,
    subtitle: `${travelPlan.duration}의 특별한 여행`,
    highlights: [
      `${selectedCities.length}개 도시 탐방`,
      `총 예산 ${Math.round(travelPlan.budget / 10000)}만원`,
      `${travelPlan.travelers || 2}명의 여행자`
    ],
    duration: travelPlan.duration,
    budget: `${Math.round(travelPlan.budget / 10000)}만원`,
    theme: 'modern',
    showImages: true,
    showQR: false,
    customText: '함께 떠나요!'
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<'vibrant' | 'elegant' | 'playful'>('vibrant');
  const [selectedLayout, setSelectedLayout] = useState<'vertical' | 'horizontal'>('vertical');

  // 테마별 색상 설정
  const themes = {
    modern: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#0ea5e9',
      background: '#ffffff',
      text: '#1e293b'
    },
    vintage: {
      primary: '#92400e',
      secondary: '#a16207',
      accent: '#d97706',
      background: '#fef3c7',
      text: '#451a03'
    },
    minimalist: {
      primary: '#374151',
      secondary: '#6b7280',
      accent: '#9ca3af',
      background: '#f9fafb',
      text: '#111827'
    },
    colorful: {
      primary: '#dc2626',
      secondary: '#059669',
      accent: '#7c3aed',
      background: '#ffffff',
      text: '#1f2937'
    }
  };

  const styles = [
    { id: 'vibrant', name: '활기찬', emoji: '🎆', colors: 'from-orange-400 to-pink-600' },
    { id: 'elegant', name: '우아한', emoji: '✨', colors: 'from-gray-700 to-gray-900' },
    { id: 'playful', name: '재미있는', emoji: '🎪', colors: 'from-green-400 to-blue-500' },
  ];

  // 캔버스에 포스터 그리기
  const generatePoster = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsGenerating(true);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 크기 설정 (A4 비율 - 210:297)
    canvas.width = 800;
    canvas.height = 1131;

    const theme = themes[posterData.theme];

    // 배경 그리기
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, theme.background);
    gradient.addColorStop(1, theme.primary + '10');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 도시 이미지 영역 (가상의 이미지 플레이스홀더)
    if (posterData.showImages) {
      ctx.fillStyle = theme.accent + '20';
      ctx.fillRect(50, 50, canvas.width - 100, 300);
      
      // 이미지 플레이스홀더 텍스트
      ctx.fillStyle = theme.secondary;
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('📸 여행지 사진', canvas.width / 2, 220);
    }

    // 메인 제목
    ctx.fillStyle = theme.primary;
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    const titleY = posterData.showImages ? 420 : 200;
    ctx.fillText(posterData.title, canvas.width / 2, titleY);

    // 부제목
    ctx.fillStyle = theme.secondary;
    ctx.font = '24px Arial';
    ctx.fillText(posterData.subtitle, canvas.width / 2, titleY + 60);

    // 하이라이트 박스
    const highlightY = titleY + 120;
    ctx.fillStyle = theme.accent + '15';
    ctx.fillRect(60, highlightY, canvas.width - 120, 200);
    
    // 하이라이트 내용
    ctx.fillStyle = theme.text;
    ctx.font = '20px Arial';
    ctx.textAlign = 'left';
    posterData.highlights.forEach((highlight, index) => {
      ctx.fillText(`• ${highlight}`, 80, highlightY + 40 + (index * 40));
    });

    // 일정 정보
    const scheduleY = highlightY + 240;
    ctx.fillStyle = theme.primary;
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('📅 여행 일정', canvas.width / 2, scheduleY);

    // 일차별 간단 정보
    ctx.fillStyle = theme.text;
    ctx.font = '18px Arial';
    if (travelPlan.dailySchedules && travelPlan.dailySchedules.length > 0) {
      travelPlan.dailySchedules.slice(0, 5).forEach((schedule, index) => {
        const dayText = `Day ${schedule.day}: ${schedule.city}`;
        ctx.fillText(dayText, canvas.width / 2, scheduleY + 40 + (index * 30));
      });
    }

    // 예산 정보
    const budgetY = scheduleY + 200;
    ctx.fillStyle = theme.accent;
    ctx.font = 'bold 32px Arial';
    ctx.fillText(`💰 총 예산: ${posterData.budget}`, canvas.width / 2, budgetY);

    // 커스텀 텍스트
    if (posterData.customText) {
      ctx.fillStyle = theme.primary;
      ctx.font = 'bold 24px Arial';
      ctx.fillText(posterData.customText, canvas.width / 2, budgetY + 60);
    }

    // QR 코드 영역 (placeholder)
    if (posterData.showQR) {
      const qrSize = 120;
      const qrX = canvas.width / 2 - qrSize / 2;
      const qrY = canvas.height - 200;
      
      ctx.fillStyle = theme.text;
      ctx.fillRect(qrX, qrY, qrSize, qrSize);
      
      ctx.fillStyle = theme.background;
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('QR 코드', canvas.width / 2, qrY + qrSize + 20);
      ctx.fillText('(상세 일정)', canvas.width / 2, qrY + qrSize + 40);
    }

    // 하단 정보
    ctx.fillStyle = theme.secondary;
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Voyage Edu - 교육적 여행 계획', canvas.width / 2, canvas.height - 40);

    // 생성된 이미지를 데이터 URL로 변환
    const imageDataUrl = canvas.toDataURL('image/png');
    setGeneratedImage(imageDataUrl);
    setIsGenerating(false);
  };

  // 포스터 다운로드
  const downloadPoster = () => {
    if (!generatedImage) return;
    
    const link = document.createElement('a');
    link.download = `${posterData.title.replace(/\s+/g, '_')}_poster.png`;
    link.href = generatedImage;
    link.click();
  };

  // 하이라이트 추가/제거
  const addHighlight = () => {
    if (posterData.highlights.length < 5) {
      setPosterData(prev => ({
        ...prev,
        highlights: [...prev.highlights, '새로운 하이라이트']
      }));
    }
  };

  const removeHighlight = (index: number) => {
    setPosterData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const updateHighlight = (index: number, value: string) => {
    setPosterData(prev => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => i === index ? value : h)
    }));
  };

  const handleGeneratePoster = () => {
    const material: PromotionalMaterial = {
      id: `mat_${Date.now()}`,
      travelPlanId: travelPlan.id,
      type: 'poster',
      title: posterData.title,
      description: posterData.subtitle,
      content: {
        style: selectedStyle,
        layout: selectedLayout,
        travelPlan,
        posterData,
        imageUrl: generatedImage
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    onSave(material);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto">
        <div className="flex">
          {/* 설정 패널 */}
          <div className="w-1/2 p-6 border-r">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">🎨 여행 포스터 생성</h2>
              {onClose && (
                <Button onClick={onClose} variant="outline" size="sm">
                  ✕ 닫기
                </Button>
              )}
            </div>

            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">포스터 제목</Label>
                  <Input
                    id="title"
                    value={posterData.title}
                    onChange={(e) => setPosterData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="여행 포스터 제목"
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle">부제목</Label>
                  <Input
                    id="subtitle"
                    value={posterData.subtitle}
                    onChange={(e) => setPosterData(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="여행의 부제목"
                  />
                </div>

                <div>
                  <Label htmlFor="customText">커스텀 메시지</Label>
                  <Input
                    id="customText"
                    value={posterData.customText}
                    onChange={(e) => setPosterData(prev => ({ ...prev, customText: e.target.value }))}
                    placeholder="특별한 메시지를 입력하세요"
                  />
                </div>
              </div>

              {/* 하이라이트 관리 */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label>주요 하이라이트</Label>
                  <Button 
                    onClick={addHighlight} 
                    size="sm" 
                    variant="outline"
                    disabled={posterData.highlights.length >= 5}
                  >
                    + 추가
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {posterData.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={highlight}
                        onChange={(e) => updateHighlight(index, e.target.value)}
                        placeholder={`하이라이트 ${index + 1}`}
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => removeHighlight(index)}
                        size="sm"
                        variant="outline"
                        className="px-3"
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 테마 선택 */}
              <div>
                <Label>포스터 테마</Label>
                <Select value={posterData.theme} onValueChange={(value: any) => setPosterData(prev => ({ ...prev, theme: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">🔵 모던 블루</SelectItem>
                    <SelectItem value="vintage">🟤 빈티지 브라운</SelectItem>
                    <SelectItem value="minimalist">⚪ 미니멀 그레이</SelectItem>
                    <SelectItem value="colorful">🌈 컬러풀</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 옵션 설정 */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="showImages"
                    checked={posterData.showImages}
                    onChange={(e) => setPosterData(prev => ({ ...prev, showImages: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="showImages">이미지 영역 포함</Label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="showQR"
                    checked={posterData.showQR}
                    onChange={(e) => setPosterData(prev => ({ ...prev, showQR: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="showQR">QR 코드 포함</Label>
                </div>
              </div>

              {/* 생성 버튼 */}
              <div className="space-y-3">
                <Button 
                  onClick={generatePoster}
                  className="w-full"
                  disabled={isGenerating}
                >
                  {isGenerating ? '🎨 포스터 생성 중...' : '🎨 포스터 생성하기'}
                </Button>

                {generatedImage && (
                  <>
                    <Button 
                      onClick={downloadPoster}
                      variant="outline"
                      className="w-full"
                    >
                      📥 포스터 다운로드
                    </Button>
                    <Button 
                      onClick={handleGeneratePoster}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      💾 포스터 저장하기
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 미리보기 패널 */}
          <div className="w-1/2 p-6">
            <h3 className="text-lg font-semibold mb-4">📋 미리보기</h3>
            
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="border border-gray-200 rounded-lg shadow-sm max-w-full h-auto"
                style={{ maxHeight: '600px' }}
              />
              
              {!generatedImage && !isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🎨</div>
                    <p>포스터 생성하기 버튼을 클릭하여</p>
                    <p>미리보기를 확인하세요</p>
                  </div>
                </div>
              )}

              {isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600">포스터 생성 중...</p>
                  </div>
                </div>
              )}
            </div>

            {generatedImage && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  ✅ 포스터가 생성되었습니다! 다운로드하거나 저장하세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterGenerator;