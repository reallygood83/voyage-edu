'use client';

import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { userProfile, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    grade: userProfile?.grade || '',
    school: userProfile?.school || '',
  });

  const handleSave = async () => {
    await updateUserProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile?.name || '',
      grade: userProfile?.grade || '',
      school: userProfile?.school || '',
    });
    setIsEditing(false);
  };

  if (!userProfile) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            👤 내 프로필
          </DialogTitle>
          <DialogDescription className="text-center">
            나의 여행 정보를 관리해보세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 프로필 정보 카드 */}
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage 
                    src={userProfile.photoURL} 
                    alt={userProfile.name}
                  />
                  <AvatarFallback className="bg-blue-500 text-white font-bold text-2xl">
                    {getInitials(userProfile.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{userProfile.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {isEditing ? (
                // 편집 모드
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">이름</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="이름을 입력하세요"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">학년</label>
                    <Input
                      value={formData.grade}
                      onChange={(e) => setFormData(prev => ({ ...prev, grade: e.target.value }))}
                      placeholder="예: 6학년"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">학교</label>
                    <Input
                      value={formData.school}
                      onChange={(e) => setFormData(prev => ({ ...prev, school: e.target.value }))}
                      placeholder="학교명을 입력하세요"
                    />
                  </div>
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} className="flex-1">
                      💾 저장하기
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="flex-1">
                      ❌ 취소
                    </Button>
                  </div>
                </div>
              ) : (
                // 보기 모드
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">이메일</span>
                    <span className="text-sm">{userProfile.email}</span>
                  </div>
                  {userProfile.grade && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">학년</span>
                      <span className="text-sm">{userProfile.grade}</span>
                    </div>
                  )}
                  {userProfile.school && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">학교</span>
                      <span className="text-sm">{userProfile.school}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">가입일</span>
                    <span className="text-sm">{formatDate(userProfile.createdAt)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">마지막 로그인</span>
                    <span className="text-sm">{formatDate(userProfile.lastLoginAt)}</span>
                  </div>
                  
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    variant="outline" 
                    className="w-full mt-4"
                  >
                    ✏️ 프로필 편집
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 통계 카드들 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">
                  {userProfile.points.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">총 포인트</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {userProfile.achievements.length}
                </div>
                <div className="text-sm text-gray-600">달성한 업적</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">
                  {userProfile.travelPlans.length}
                </div>
                <div className="text-sm text-gray-600">여행 계획</div>
              </CardContent>
            </Card>
          </div>

          {/* 업적 목록 */}
          {userProfile.achievements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🏆 달성한 업적</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userProfile.achievements.map((achievement, index) => (
                    <Badge key={index} variant="achievement" className="text-sm">
                      {achievement}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};