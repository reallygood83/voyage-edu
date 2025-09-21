'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CustomActivity {
  name: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  location?: string;
  recommendedTime?: string;
}

interface CustomActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: CustomActivity) => void;
  cityName: string;
}

export const CustomActivityModal: React.FC<CustomActivityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  cityName
}) => {
  const [activity, setActivity] = useState<CustomActivity>({
    name: '',
    description: '',
    duration: '2시간',
    price: 0,
    category: 'cultural',
    location: '',
    recommendedTime: '오전'
  });

  const handleSave = () => {
    if (!activity.name || !activity.description) {
      alert('활동 이름과 설명을 입력해주세요.');
      return;
    }
    onSave(activity);
    // Reset form
    setActivity({
      name: '',
      description: '',
      duration: '2시간',
      price: 0,
      category: 'cultural',
      location: '',
      recommendedTime: '오전'
    });
    onClose();
  };

  const activityCategories = [
    { value: 'cultural', label: '🏛️ 문화/역사' },
    { value: 'nature', label: '🌳 자연/경관' },
    { value: 'shopping', label: '🛍️ 쇼핑' },
    { value: 'food', label: '🍽️ 음식/맛집' },
    { value: 'adventure', label: '🎢 모험/액티비티' },
    { value: 'relaxation', label: '🧘 휴식/힐링' },
    { value: 'education', label: '📚 교육/학습' },
    { value: 'entertainment', label: '🎭 엔터테인먼트' }
  ];

  const durations = [
    '30분', '1시간', '1시간 30분', '2시간', '2시간 30분', 
    '3시간', '4시간', '5시간', '반나절', '하루 종일'
  ];

  const recommendedTimes = [
    '이른 아침 (06:00-08:00)',
    '오전 (09:00-12:00)',
    '점심 시간 (12:00-14:00)',
    '오후 (14:00-18:00)',
    '저녁 시간 (18:00-20:00)',
    '밤 (20:00-23:00)',
    '언제나 가능'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            ✨ {cityName}에서 나만의 활동 만들기
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 활동 이름 */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-semibold">
              활동 이름 *
            </Label>
            <Input
              id="name"
              value={activity.name}
              onChange={(e) => setActivity({ ...activity, name: e.target.value })}
              placeholder="예: 한강 자전거 타기, 전통시장 탐방"
              className="text-lg"
            />
          </div>

          {/* 활동 설명 */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">
              활동 설명 *
            </Label>
            <Textarea
              id="description"
              value={activity.description}
              onChange={(e) => setActivity({ ...activity, description: e.target.value })}
              placeholder="어떤 활동인지 자세히 설명해주세요. 왜 이 활동이 특별한가요?"
              className="min-h-[100px]"
            />
          </div>

          {/* 카테고리 선택 */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-base font-semibold">
              활동 카테고리
            </Label>
            <Select value={activity.category} onValueChange={(value) => setActivity({ ...activity, category: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {activityCategories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* 소요 시간 */}
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-base font-semibold">
                예상 소요 시간
              </Label>
              <Select value={activity.duration} onValueChange={(value) => setActivity({ ...activity, duration: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {durations.map(duration => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 예상 비용 */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-base font-semibold">
                예상 비용 (원)
              </Label>
              <Input
                id="price"
                type="number"
                value={activity.price}
                onChange={(e) => setActivity({ ...activity, price: parseInt(e.target.value) || 0 })}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* 장소/위치 */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-base font-semibold">
                장소/위치 (선택)
              </Label>
              <Input
                id="location"
                value={activity.location}
                onChange={(e) => setActivity({ ...activity, location: e.target.value })}
                placeholder="예: 명동, 강남역 근처"
              />
            </div>

            {/* 추천 시간대 */}
            <div className="space-y-2">
              <Label htmlFor="time" className="text-base font-semibold">
                추천 시간대
              </Label>
              <Select value={activity.recommendedTime} onValueChange={(value) => setActivity({ ...activity, recommendedTime: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {recommendedTimes.map(time => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* 미리보기 카드 */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">📋 미리보기</h4>
            <div className="space-y-1 text-sm">
              <p><strong>활동:</strong> {activity.name || '(아직 입력되지 않음)'}</p>
              <p><strong>설명:</strong> {activity.description || '(아직 입력되지 않음)'}</p>
              <p><strong>소요시간:</strong> {activity.duration}</p>
              <p><strong>비용:</strong> {activity.price.toLocaleString()}원</p>
              {activity.location && <p><strong>위치:</strong> {activity.location}</p>}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            취소
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!activity.name || !activity.description}
            className="bg-blue-600 hover:bg-blue-700"
          >
            활동 추가하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};