'use client';

import React, { useState } from 'react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileModal } from './ProfileModal';
import Link from 'next/link';

export const UserMenu: React.FC = () => {
  const { userProfile, signOut } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  if (!userProfile) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '☀️ 좋은 아침이에요';
    if (hour < 18) return '🌤️ 좋은 오후예요';
    return '🌙 좋은 저녁이에요';
  };

  return (
    <>
      <div className="flex items-center gap-3">
        {/* 포인트 뱃지 */}
        <Badge variant="achievement" className="text-sm py-1 px-3">
          🏆 {userProfile.points.toLocaleString()}포인트
        </Badge>

        {/* 사용자 드롭다운 메뉴 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage 
                  src={userProfile.photoURL} 
                  alt={userProfile.name}
                />
                <AvatarFallback className="bg-blue-500 text-white font-bold">
                  {getInitials(userProfile.name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-80 p-2" align="end" forceMount>
            {/* 사용자 정보 헤더 */}
            <div className="flex flex-col space-y-2 p-2">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage 
                    src={userProfile.photoURL} 
                    alt={userProfile.name}
                  />
                  <AvatarFallback className="bg-blue-500 text-white font-bold text-lg">
                    {getInitials(userProfile.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-sm font-medium leading-none">
                    {getGreeting()}
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    {userProfile.name}님!
                  </p>
                </div>
              </div>
              
              {/* 상태 정보 */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-center p-2 bg-blue-50 rounded">
                  <p className="text-xs text-gray-600">총 포인트</p>
                  <p className="font-bold text-blue-600">{userProfile.points.toLocaleString()}</p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded">
                  <p className="text-xs text-gray-600">업적</p>
                  <p className="font-bold text-purple-600">{userProfile.achievements.length}개</p>
                </div>
              </div>
            </div>

            <DropdownMenuSeparator />

            {/* 메뉴 항목들 */}
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => setShowProfile(true)}
            >
              <div className="flex items-center">
                <span className="mr-2">👤</span>
                내 프로필
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer">
              <div className="flex items-center">
                <span className="mr-2">✈️</span>
                내 여행 계획
              </div>
            </DropdownMenuItem>

            <Link href="/community">
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-center">
                  <span className="mr-2">🌍</span>
                  커뮤니티 갤러리
                </div>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem className="cursor-pointer">
              <div className="flex items-center">
                <span className="mr-2">🏆</span>
                업적 목록
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem 
              className="cursor-pointer text-red-600"
              onClick={signOut}
            >
              <div className="flex items-center">
                <span className="mr-2">🚪</span>
                로그아웃
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 프로필 모달 */}
      <ProfileModal 
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </>
  );
};