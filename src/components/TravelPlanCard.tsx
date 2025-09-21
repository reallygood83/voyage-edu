'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, Share2, Eye, MapPin, Calendar, Users, Star } from 'lucide-react'
import { TravelPlan } from '@/types'

interface TravelPlanCardProps {
  plan: TravelPlan & {
    id: string
    author: string
    likes: number
    views: number
    isLiked: boolean
    rating: number
    createdAt: string
    tags: string[]
  }
  onLike: (planId: string) => void
  onShare: (planId: string) => void
  onView: (planId: string) => void
}

export default function TravelPlanCard({ plan, onLike, onShare, onView }: TravelPlanCardProps) {
  const [isLiked, setIsLiked] = useState(plan.isLiked)
  const [likesCount, setLikesCount] = useState(plan.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
    onLike(plan.id)
  }

  const handleShare = () => {
    onShare(plan.id)
  }

  const handleView = () => {
    onView(plan.id)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getDuration = () => {
    if (plan.startDate && plan.endDate) {
      const start = new Date(plan.startDate)
      const end = new Date(plan.endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return `${diffDays}일`
    }
    return '미정'
  }

  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-gray-800 mb-2">
              {plan.cities?.join(' → ') || plan.title} 여행
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Users className="w-4 h-4" />
              <span>by {plan.author}</span>
              <span>•</span>
              <span>{formatDate(plan.createdAt)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{plan.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 여행 기본 정보 */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-500" />
            <span>{plan.cities?.length || 0}개 도시</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-green-500" />
            <span>{getDuration()}</span>
          </div>
        </div>

        {/* 예산 정보 */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">총 예산</div>
          <div className="text-lg font-bold text-blue-600">
            ₩{plan.totalBudget?.toLocaleString()} 원
          </div>
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2">
          {plan.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* 액션 버튼 */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-sm transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likesCount}</span>
            </button>
            
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Eye className="w-4 h-4" />
              <span>{plan.views}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-1"
            >
              <Share2 className="w-4 h-4" />
              공유
            </Button>
            
            <Button
              size="sm"
              onClick={handleView}
              className="bg-blue-600 hover:bg-blue-700"
            >
              상세보기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}