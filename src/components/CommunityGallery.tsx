'use client'

import { useState, useEffect } from 'react'
import { TravelPlan } from '@/lib/travelApi'
import TravelPlanCard from './TravelPlanCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, TrendingUp, Heart, Eye, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface CommunityPlan extends TravelPlan {
  id: string
  author: string
  likes: number
  views: number
  isLiked: boolean
  rating: number
  createdAt: string
  tags: string[]
}

interface CommunityGalleryProps {
  userPlan?: TravelPlan
  onPlanSelect?: (plan: CommunityPlan) => void
}

export default function CommunityGallery({ userPlan, onPlanSelect }: CommunityGalleryProps) {
  const [plans, setPlans] = useState<CommunityPlan[]>([])
  const [filteredPlans, setFilteredPlans] = useState<CommunityPlan[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [filterTag, setFilterTag] = useState('all')
  const [loading, setLoading] = useState(true)

  // 샘플 커뮤니티 데이터
  useEffect(() => {
    const samplePlans: CommunityPlan[] = [
      {
        id: '1',
        cities: ['서울', '부산', '제주'],
        startDate: '2024-03-15',
        endDate: '2024-03-20',
        totalBudget: 850000,
        activities: [],
        author: '여행러버123',
        likes: 45,
        views: 230,
        isLiked: false,
        rating: 4.8,
        createdAt: '2024-02-20',
        tags: ['가족여행', '맛집투어', '문화체험']
      },
      {
        id: '2', 
        cities: ['경주', '안동', '포항'],
        startDate: '2024-04-10',
        endDate: '2024-04-12',
        totalBudget: 420000,
        activities: [],
        author: '역사탐험가',
        likes: 32,
        views: 156,
        isLiked: true,
        rating: 4.6,
        createdAt: '2024-02-18',
        tags: ['역사여행', '문화재', '전통체험']
      },
      {
        id: '3',
        cities: ['강릉', '속초', '양양'],
        startDate: '2024-05-01',
        endDate: '2024-05-03',
        totalBudget: 380000,
        activities: [],
        author: '바다사랑',
        likes: 67,
        views: 298,
        isLiked: false,
        rating: 4.9,
        createdAt: '2024-02-15',
        tags: ['바다여행', '힐링', '자연체험']
      },
      {
        id: '4',
        cities: ['전주', '군산', '익산'],
        startDate: '2024-04-20',
        endDate: '2024-04-22',
        totalBudget: 310000,
        activities: [],
        author: '한옥마니아',
        likes: 28,
        views: 134,
        isLiked: false,
        rating: 4.4,
        createdAt: '2024-02-12',
        tags: ['전통여행', '한옥체험', '맛집']
      },
      {
        id: '5',
        cities: ['춘천', '가평', '양평'],
        startDate: '2024-03-25',
        endDate: '2024-03-26',
        totalBudget: 180000,
        activities: [],
        author: '춘천닭갈비',
        likes: 19,
        views: 89,
        isLiked: false,
        rating: 4.2,
        createdAt: '2024-02-10',
        tags: ['당일여행', '드라이브', '맛집투어']
      }
    ]

    // 사용자 계획이 있으면 추가
    if (userPlan) {
      const userCommunityPlan: CommunityPlan = {
        ...userPlan,
        id: 'user-plan',
        author: '나의 여행계획',
        likes: 0,
        views: 1,
        isLiked: false,
        rating: 5.0,
        createdAt: new Date().toISOString(),
        tags: ['나의계획', '새로운여행']
      }
      samplePlans.unshift(userCommunityPlan)
    }

    setTimeout(() => {
      setPlans(samplePlans)
      setFilteredPlans(samplePlans)
      setLoading(false)
    }, 1000)
  }, [userPlan])

  // 필터링 및 정렬
  useEffect(() => {
    let filtered = [...plans]

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(plan => 
        plan.cities.some(city => city.includes(searchTerm)) ||
        plan.author.includes(searchTerm) ||
        plan.tags.some(tag => tag.includes(searchTerm))
      )
    }

    // 태그 필터
    if (filterTag !== 'all') {
      filtered = filtered.filter(plan => plan.tags.includes(filterTag))
    }

    // 정렬
    switch (sortBy) {
      case 'likes':
        filtered.sort((a, b) => b.likes - a.likes)
        break
      case 'views':
        filtered.sort((a, b) => b.views - a.views)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'latest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    setFilteredPlans(filtered)
  }, [plans, searchTerm, sortBy, filterTag])

  const handleLike = (planId: string) => {
    setPlans(prev => prev.map(plan => 
      plan.id === planId 
        ? { ...plan, isLiked: !plan.isLiked, likes: plan.isLiked ? plan.likes - 1 : plan.likes + 1 }
        : plan
    ))
  }

  const handleShare = async (planId: string) => {
    const plan = plans.find(p => p.id === planId)
    if (plan) {
      try {
        await navigator.share({
          title: `${plan.cities.join(' → ')} 여행 계획`,
          text: `${plan.author}님의 ${plan.cities.join(' → ')} 여행 계획을 확인해보세요!`,
          url: window.location.href
        })
      } catch (error) {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href)
        alert('링크가 클립보드에 복사되었습니다!')
      }
    }
  }

  const handleView = (planId: string) => {
    const plan = plans.find(p => p.id === planId)
    if (plan) {
      // 조회수 증가
      setPlans(prev => prev.map(p => 
        p.id === planId ? { ...p, views: p.views + 1 } : p
      ))
      
      if (onPlanSelect) {
        onPlanSelect(plan)
      }
    }
  }

  const allTags = [...new Set(plans.flatMap(plan => plan.tags))]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">커뮤니티 여행 계획을 불러오는 중...</span>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-800">여행 계획 커뮤니티</h2>
        </div>
        <p className="text-gray-600">다른 여행자들의 멋진 여행 계획을 둘러보고 영감을 받아보세요!</p>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="도시, 작성자, 태그 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="정렬 기준" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="likes">좋아요순</SelectItem>
              <SelectItem value="views">조회수순</SelectItem>
              <SelectItem value="rating">평점순</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterTag} onValueChange={setFilterTag}>
            <SelectTrigger>
              <SelectValue placeholder="태그 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 태그</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>{filteredPlans.length}개 계획</span>
          </div>
        </div>
      </div>

      {/* 통계 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">총 여행 계획</p>
              <p className="text-3xl font-bold">{plans.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100 text-sm">총 좋아요</p>
              <p className="text-3xl font-bold">{plans.reduce((sum, plan) => sum + plan.likes, 0)}</p>
            </div>
            <Heart className="w-8 h-8 text-pink-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">총 조회수</p>
              <p className="text-3xl font-bold">{plans.reduce((sum, plan) => sum + plan.views, 0)}</p>
            </div>
            <Eye className="w-8 h-8 text-green-200" />
          </div>
        </div>
      </div>

      {/* 여행 계획 그리드 */}
      {filteredPlans.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto mb-4" />
          </div>
          <p className="text-xl text-gray-600 mb-2">검색 결과가 없습니다</p>
          <p className="text-gray-500">다른 검색어나 필터를 사용해보세요</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <TravelPlanCard
              key={plan.id}
              plan={plan}
              onLike={handleLike}
              onShare={handleShare}
              onView={handleView}
            />
          ))}
        </div>
      )}

      {/* 태그 클라우드 */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">인기 태그</h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => {
            const count = plans.filter(plan => plan.tags.includes(tag)).length
            return (
              <Badge
                key={tag}
                variant={filterTag === tag ? "default" : "secondary"}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setFilterTag(filterTag === tag ? 'all' : tag)}
              >
                {tag} ({count})
              </Badge>
            )
          })}
        </div>
      </div>
    </div>
  )
}