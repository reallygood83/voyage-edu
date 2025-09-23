'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { TravelPlan } from '@/types'
import TravelPlanCard from './TravelPlanCard'
import TravelPlanDetailView from './TravelPlanDetailView'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, TrendingUp, Heart, Eye, Calendar, Plus, Upload } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getSharedTravelPlans, getPopularTravelPlans, toggleLikeTravelPlan, incrementViewCount } from '@/services/firebaseService'

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
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [plans, setPlans] = useState<CommunityPlan[]>([])
  const [filteredPlans, setFilteredPlans] = useState<CommunityPlan[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [filterTag, setFilterTag] = useState('all')
  const [loading, setLoading] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState<CommunityPlan | null>(null)
  const [showDetailView, setShowDetailView] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  // Firebase에서 커뮤니티 데이터 로드
  useEffect(() => {
    const loadCommunityPlans = async () => {
      setLoading(true)
      try {
        const sharedPlans = await getSharedTravelPlans(20)
        
        // TravelPlan을 CommunityPlan으로 변환
        const communityPlans: CommunityPlan[] = sharedPlans.map((plan, index) => ({
          ...plan,
          author: '학생' + (index + 1), // 익명화된 작성자명
          likes: (plan as any).likesCount || 0, // 실제 좋아요 수 사용
          views: (plan as any).viewsCount || 1, // 실제 조회수 사용
          isLiked: false, // TODO: 로그인 시 실제 좋아요 상태 확인
          rating: (plan as any).rating || (4.0 + Math.random() * 1.0), // 실제 평점 또는 기본값
          tags: plan.cities || [] // 도시명을 태그로 사용
        }))

        // 사용자 계획이 있으면 맨 앞에 추가
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
            tags: ['나의계획', ...(userPlan.cities || [])]
          }
          communityPlans.unshift(userCommunityPlan)
        }

        setPlans(communityPlans)
        setFilteredPlans(communityPlans)
      } catch (error) {
        console.error('Error loading community plans:', error)
        // 에러 시 빈 배열로 설정
        setPlans([])
        setFilteredPlans([])
      } finally {
        setLoading(false)
      }
    }

    loadCommunityPlans()
  }, [userPlan])

  // URL 파라미터 기반 상세보기 상태 관리
  useEffect(() => {
    const planId = searchParams.get('planId')
    if (planId && plans.length > 0) {
      const plan = plans.find(p => p.id === planId)
      if (plan) {
        setSelectedPlan(plan)
        setShowDetailView(true)
      }
    } else {
      setShowDetailView(false)
      setSelectedPlan(null)
    }
  }, [searchParams, plans])

  // 필터링 및 정렬
  useEffect(() => {
    let filtered = [...plans]

    // 검색 필터
    if (searchTerm) {
      filtered = filtered.filter(plan => 
        (plan.cities && plan.cities.some(city => city.includes(searchTerm))) ||
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

  const handleLike = async (planId: string) => {
    try {
      // 임시 사용자 ID (실제로는 인증된 사용자 ID를 사용해야 함)
      const userId = 'anonymous-user-' + Date.now()
      
      if (planId !== 'user-plan') {
        const newLikesCount = await toggleLikeTravelPlan(planId, userId)
        
        setPlans(prev => prev.map(plan => 
          plan.id === planId 
            ? { ...plan, isLiked: !plan.isLiked, likes: newLikesCount }
            : plan
        ))
      } else {
        // 사용자 자신의 계획은 로컬 상태만 업데이트
        setPlans(prev => prev.map(plan => 
          plan.id === planId 
            ? { ...plan, isLiked: !plan.isLiked, likes: plan.isLiked ? plan.likes - 1 : plan.likes + 1 }
            : plan
        ))
      }
    } catch (error) {
      console.error('Error handling like:', error)
      // 에러 시 로컬 상태만 업데이트
      setPlans(prev => prev.map(plan => 
        plan.id === planId 
          ? { ...plan, isLiked: !plan.isLiked, likes: plan.isLiked ? plan.likes - 1 : plan.likes + 1 }
          : plan
      ))
    }
  }

  const handleShare = async (planId: string) => {
    const plan = plans.find(p => p.id === planId)
    if (plan) {
      try {
        await navigator.share({
          title: `${plan.cities?.join(' → ') || plan.title} 여행 계획`,
          text: `${plan.author}님의 ${plan.cities?.join(' → ') || plan.title} 여행 계획을 확인해보세요!`,
          url: window.location.href
        })
      } catch (error) {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href)
        alert('링크가 클립보드에 복사되었습니다!')
      }
    }
  }

  const handleView = async (planId: string) => {
    const plan = plans.find(p => p.id === planId)
    if (plan) {
      try {
        // Firebase 조회수 증가 (사용자 계획이 아닌 경우)
        if (planId !== 'user-plan') {
          const newViewCount = await incrementViewCount(planId)
          
          setPlans(prev => prev.map(p => 
            p.id === planId ? { ...p, views: newViewCount } : p
          ))
        } else {
          // 사용자 자신의 계획은 로컬 상태만 업데이트
          setPlans(prev => prev.map(p => 
            p.id === planId ? { ...p, views: p.views + 1 } : p
          ))
        }
      } catch (error) {
        console.error('Error incrementing view count:', error)
        // 에러 시 로컬 상태만 업데이트
        setPlans(prev => prev.map(p => 
          p.id === planId ? { ...p, views: p.views + 1 } : p
        ))
      }
      
      // URL에 상세보기 상태 추가
      const params = new URLSearchParams(searchParams.toString())
      params.set('planId', planId)
      router.push(`?${params.toString()}`)
      
      // 상세보기 모드로 전환
      setSelectedPlan(plan)
      setShowDetailView(true)
      
      if (onPlanSelect) {
        onPlanSelect(plan)
      }
    }
  }

  const handleBackToList = () => {
    // URL에서 planId 파라미터 제거하여 커뮤니티 목록으로 돌아가기
    const params = new URLSearchParams(searchParams.toString())
    params.delete('planId')
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
    router.push(newUrl)
    
    setShowDetailView(false)
    setSelectedPlan(null)
  }

  const handleUploadPlan = () => {
    if (userPlan) {
      const userCommunityPlan: CommunityPlan = {
        ...userPlan,
        id: `user-plan-${Date.now()}`,
        author: '나의 여행계획',
        likes: 0,
        views: 1,
        isLiked: false,
        rating: 5.0,
        createdAt: new Date().toISOString(),
        tags: generateTags(userPlan)
      }
      
      setPlans(prev => [userCommunityPlan, ...prev])
      setIsUploadDialogOpen(false)
      alert('여행 계획이 커뮤니티에 성공적으로 공유되었습니다! 🎉')
    }
  }

  const generateTags = (plan: TravelPlan): string[] => {
    const tags = ['나의계획']
    
    if (plan.cities) {
      if (plan.cities.length === 1) tags.push('단일도시')
      else if (plan.cities.length >= 3) tags.push('다중도시')
      
      // 도시 기반 태그
      if (plan.cities.some(city => ['Tokyo', 'Osaka', 'Kyoto'].includes(city))) {
        tags.push('일본여행')
      }
      if (plan.cities.some(city => ['Seoul', 'Busan', 'Jeju'].includes(city))) {
        tags.push('국내여행')
      }
    }
    
    const tripDays = plan.startDate && plan.endDate ? 
      Math.ceil((new Date(plan.endDate).getTime() - new Date(plan.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1 : 0
    
    if (tripDays <= 3) tags.push('단기여행')
    else if (tripDays >= 7) tags.push('장기여행')
    
    if (plan.totalBudget) {
      if (plan.totalBudget <= 500000) tags.push('저예산')
      else if (plan.totalBudget >= 1500000) tags.push('프리미엄')
    }
    
    return tags
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

  // 상세보기 모드
  if (showDetailView && selectedPlan) {
    return (
      <TravelPlanDetailView 
        plan={selectedPlan}
        onBack={handleBackToList}
        onLike={handleLike}
        onShare={handleShare}
      />
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* 헤더 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800">여행 계획 커뮤니티</h2>
          </div>
          {userPlan && (
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="w-4 h-4 mr-2" />
                  내 계획 공유하기
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>여행 계획 공유하기</DialogTitle>
                  <DialogDescription>
                    나의 여행 계획을 커뮤니티에 공유하여 다른 여행자들과 나누세요!
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">공유할 계획</h4>
                    <p className="text-gray-600">{userPlan.cities?.join(' → ') || userPlan.title}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {userPlan.startDate} ~ {userPlan.endDate}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                      취소
                    </Button>
                    <Button onClick={handleUploadPlan} className="bg-blue-600 hover:bg-blue-700">
                      공유하기
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
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