'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Globe, 
  MapPin, 
  Users, 
  Utensils, 
  Calendar, 
  Heart,
  BookOpen,
  Lightbulb,
  Star,
  CheckCircle
} from 'lucide-react'

interface CulturalInfo {
  city: string
  country: string
  language: string
  population: string
  currency: string
  timezone: string
  climate: string
  traditions: string[]
  festivals: {
    name: string
    season: string
    description: string
  }[]
  food: {
    name: string
    description: string
    isSignature: boolean
  }[]
  etiquette: {
    category: string
    dos: string[]
    donts: string[]
  }[]
  comparison: {
    withKorea: {
      similarities: string[]
      differences: string[]
      learningPoints: string[]
    }
  }
  educationalValue: {
    historyLessons: string[]
    geographyLessons: string[]
    culturalLessons: string[]
    socialStudies: string[]
  }
}

interface CulturalLearningCardProps {
  cities: string[]
  onQuizComplete?: (score: number, totalQuestions: number) => void
}

export default function CulturalLearningCard({ cities, onQuizComplete }: CulturalLearningCardProps) {
  const [selectedCity, setSelectedCity] = useState<string>(cities[0] || '')
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})

  // 샘플 문화 데이터 (실제로는 API에서 가져올 수 있음)
  const culturalData: Record<string, CulturalInfo> = {
    '서울': {
      city: '서울',
      country: '한국',
      language: '한국어',
      population: '약 970만명',
      currency: '원(KRW)',
      timezone: 'KST (UTC+9)',
      climate: '온대몬순기후',
      traditions: ['한복 착용', '차례 지내기', '새해 세배', '추석 성묘'],
      festivals: [
        { name: '서울 등축제', season: '가을', description: '청계천에서 열리는 화려한 등 축제' },
        { name: '한강 불꽃축제', season: '가을', description: '한강에서 열리는 대규모 불꽃놀이' }
      ],
      food: [
        { name: '김치', description: '발효된 배추로 만든 전통 음식', isSignature: true },
        { name: '불고기', description: '양념에 재운 소고기 구이', isSignature: true },
        { name: '냉면', description: '차가운 국수 요리', isSignature: false }
      ],
      etiquette: [
        {
          category: '식사 예절',
          dos: ['어른이 먼저 수저를 드신 후 식사', '두 손으로 받기'],
          donts: ['그릇을 들고 먹기', '수저를 그릇에 꽂아두기']
        }
      ],
      comparison: {
        withKorea: {
          similarities: ['기준 도시이므로 비교 대상'],
          differences: ['기준 도시이므로 비교 대상'],
          learningPoints: ['한국 문화의 중심지', '전통과 현대의 공존']
        }
      },
      educationalValue: {
        historyLessons: ['조선왕조 600년 역사', '한국전쟁과 분단', '급속한 경제성장'],
        geographyLessons: ['한반도 중앙 위치', '한강 유역의 지리적 이점'],
        culturalLessons: ['유교 문화의 영향', '집단주의 문화', '효 사상'],
        socialStudies: ['도시화 과정', '교육열', '기술 발전']
      }
    },
    '부산': {
      city: '부산',
      country: '한국',
      language: '한국어(부산 사투리)',
      population: '약 340만명',
      currency: '원(KRW)',
      timezone: 'KST (UTC+9)',
      climate: '해양성 기후',
      traditions: ['해운대 해맞이', '자갈치 시장 문화', '감천문화마을'],
      festivals: [
        { name: '부산국제영화제', season: '가을', description: '아시아 최대 규모의 영화제' },
        { name: '해운대 모래축제', season: '여름', description: '모래조각 예술 축제' }
      ],
      food: [
        { name: '돼지국밥', description: '부산의 대표 국물 요리', isSignature: true },
        { name: '밀면', description: '부산식 냉면', isSignature: true },
        { name: '씨앗호떡', description: '견과류가 들어간 호떡', isSignature: false }
      ],
      etiquette: [
        {
          category: '지역 특성',
          dos: ['해산물 신선도 확인', '사투리 존중하기'],
          donts: ['해변에서 소음 내기', '해산물 알레르기 주의']
        }
      ],
      comparison: {
        withKorea: {
          similarities: ['한국의 전통 문화 공유', '유교적 가치관'],
          differences: ['해양 문화 발달', '개방적 항구 도시 성격', '사투리 사용'],
          learningPoints: ['지역별 문화 다양성', '지리적 환경과 문화의 관계']
        }
      },
      educationalValue: {
        historyLessons: ['임진왜란 때 의병활동', '개항장 역사', '6.25 때 임시수도'],
        geographyLessons: ['항구 도시의 특징', '해양성 기후', '산과 바다의 조화'],
        culturalLessons: ['해양 문화', '개방적 성격', '다문화 수용성'],
        socialStudies: ['항만 산업', '영화 산업', '관광업 발전']
      }
    },
    '제주': {
      city: '제주',
      country: '한국',
      language: '한국어(제주 방언)',
      population: '약 67만명',
      currency: '원(KRW)',
      timezone: 'KST (UTC+9)',
      climate: '아열대 해양성 기후',
      traditions: ['돌하르방', '해녀 문화', '삼다도(돌, 바람, 여자)', '방사탑'],
      festivals: [
        { name: '제주 유채꽃 축제', season: '봄', description: '노란 유채꽃밭 축제' },
        { name: '제주 해녀축제', season: '여름', description: '전통 해녀 문화 체험' }
      ],
      food: [
        { name: '흑돼지', description: '제주 특산 돼지고기', isSignature: true },
        { name: '갈치조림', description: '제주 연안의 신선한 갈치 요리', isSignature: true },
        { name: '한라봉', description: '제주 특산 감귤', isSignature: false }
      ],
      etiquette: [
        {
          category: '자연 보호',
          dos: ['환경 보호하기', '쓰레기 되가져가기', '해녀 문화 존중'],
          donts: ['산호 훼손하기', '야생동물 방해하기', '무단 채취']
        }
      ],
      comparison: {
        withKorea: {
          similarities: ['한국의 전통 문화', '유교적 영향'],
          differences: ['독특한 해녀 문화', '아열대 기후', '화산섬 지형', '고유한 방언'],
          learningPoints: ['지역 고유 문화의 보존', '자연과 인간의 공존', '지속가능한 관광']
        }
      },
      educationalValue: {
        historyLessons: ['탐라국의 역사', '몽골 침입', '근현대 이주사'],
        geographyLessons: ['화산섬 형성 과정', '아열대 기후', '해양 생태계'],
        culturalLessons: ['해녀 문화', '무속신앙', '공동체 정신'],
        socialStudies: ['관광업 중심 경제', '환경 보전', '지속가능한 개발']
      }
    }
  }

  const getCurrentCityData = (): CulturalInfo | null => {
    return culturalData[selectedCity] || null
  }

  const markSectionComplete = (section: string) => {
    const newCompleted = new Set(completedSections)
    newCompleted.add(`${selectedCity}-${section}`)
    setCompletedSections(newCompleted)
  }

  const isSectionComplete = (section: string): boolean => {
    return completedSections.has(`${selectedCity}-${section}`)
  }

  const getCompletionProgress = (): number => {
    const totalSections = 6 // 기본정보, 전통문화, 음식문화, 예절, 비교학습, 교육적가치
    const completedCount = Array.from(completedSections).filter(
      section => section.startsWith(selectedCity)
    ).length
    return Math.round((completedCount / totalSections) * 100)
  }

  const generateQuiz = () => {
    const cityData = getCurrentCityData()
    if (!cityData) return []

    return [
      {
        id: 1,
        question: `${cityData.city}의 대표 축제는 무엇인가요?`,
        options: cityData.festivals.map(f => f.name).concat(['서울 등축제', '부산 영화제']).slice(0, 4),
        correct: cityData.festivals[0]?.name || ''
      },
      {
        id: 2,
        question: `${cityData.city}의 대표 음식은 무엇인가요?`,
        options: cityData.food.filter(f => f.isSignature).map(f => f.name).concat(['비빔밥', '떡볶이']).slice(0, 4),
        correct: cityData.food.find(f => f.isSignature)?.name || ''
      },
      {
        id: 3,
        question: `${cityData.city}에서 지켜야 할 예절은 무엇인가요?`,
        options: cityData.etiquette[0]?.dos.concat(['큰 소리로 떠들기', '쓰레기 버리기']).slice(0, 4) || [],
        correct: cityData.etiquette[0]?.dos[0] || ''
      }
    ]
  }

  const handleQuizSubmit = () => {
    const quiz = generateQuiz()
    let correctCount = 0
    
    quiz.forEach(q => {
      if (quizAnswers[q.id.toString()] === q.correct) {
        correctCount++
      }
    })

    if (onQuizComplete) {
      onQuizComplete(correctCount, quiz.length)
    }

    alert(`퀴즈 결과: ${correctCount}/${quiz.length}점`)
    setShowQuiz(false)
    setQuizAnswers({})
    markSectionComplete('quiz')
  }

  const cityData = getCurrentCityData()

  if (!cityData) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">선택된 도시의 문화 정보를 준비 중입니다...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* 도시 선택 */}
      {cities.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              문화 학습할 도시 선택
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cities.map(city => (
                <Button
                  key={city}
                  variant={selectedCity === city ? "default" : "outline"}
                  onClick={() => setSelectedCity(city)}
                  className="flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  {city}
                  {completedSections.has(`${city}-quiz`) && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 학습 진도 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {cityData.city} 문화 학습 진도
            </span>
            <Badge variant="outline">
              {getCompletionProgress()}% 완료
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${getCompletionProgress()}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            완료된 섹션: {Array.from(completedSections).filter(s => s.startsWith(selectedCity)).length}/6
          </p>
        </CardContent>
      </Card>

      {/* 메인 콘텐츠 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            {cityData.city} 문화 탐험
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="basic" className="text-xs">
                기본정보
                {isSectionComplete('basic') && <CheckCircle className="w-3 h-3 text-green-500 ml-1" />}
              </TabsTrigger>
              <TabsTrigger value="culture" className="text-xs">
                전통문화
                {isSectionComplete('culture') && <CheckCircle className="w-3 h-3 text-green-500 ml-1" />}
              </TabsTrigger>
              <TabsTrigger value="food" className="text-xs">
                음식문화
                {isSectionComplete('food') && <CheckCircle className="w-3 h-3 text-green-500 ml-1" />}
              </TabsTrigger>
              <TabsTrigger value="etiquette" className="text-xs">
                예절
                {isSectionComplete('etiquette') && <CheckCircle className="w-3 h-3 text-green-500 ml-1" />}
              </TabsTrigger>
              <TabsTrigger value="comparison" className="text-xs">
                비교학습
                {isSectionComplete('comparison') && <CheckCircle className="w-3 h-3 text-green-500 ml-1" />}
              </TabsTrigger>
              <TabsTrigger value="education" className="text-xs">
                교육가치
                {isSectionComplete('education') && <CheckCircle className="w-3 h-3 text-green-500 ml-1" />}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">인구</p>
                    <p className="font-medium">{cityData.population}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">언어</p>
                    <p className="font-medium">{cityData.language}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">기후</p>
                    <p className="font-medium">{cityData.climate}</p>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => markSectionComplete('basic')}
                disabled={isSectionComplete('basic')}
                className="w-full"
              >
                {isSectionComplete('basic') ? '완료됨' : '기본정보 학습 완료'}
              </Button>
            </TabsContent>

            <TabsContent value="culture" className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">전통과 관습</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cityData.traditions.map((tradition, index) => (
                    <div key={index} className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm">{tradition}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">주요 축제</h4>
                <div className="space-y-3">
                  {cityData.festivals.map((festival, index) => (
                    <div key={index} className="bg-purple-50 p-3 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{festival.name}</p>
                          <p className="text-sm text-gray-600">{festival.description}</p>
                        </div>
                        <Badge variant="outline">{festival.season}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={() => markSectionComplete('culture')}
                disabled={isSectionComplete('culture')}
                className="w-full"
              >
                {isSectionComplete('culture') ? '완료됨' : '전통문화 학습 완료'}
              </Button>
            </TabsContent>

            <TabsContent value="food" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cityData.food.map((food, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${food.isSignature ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Utensils className="w-4 h-4" />
                      <h4 className="font-medium">{food.name}</h4>
                      {food.isSignature && <Star className="w-4 h-4 text-yellow-500" />}
                    </div>
                    <p className="text-sm text-gray-600">{food.description}</p>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={() => markSectionComplete('food')}
                disabled={isSectionComplete('food')}
                className="w-full"
              >
                {isSectionComplete('food') ? '완료됨' : '음식문화 학습 완료'}
              </Button>
            </TabsContent>

            <TabsContent value="etiquette" className="space-y-4">
              {cityData.etiquette.map((etiquette, index) => (
                <div key={index} className="space-y-3">
                  <h4 className="font-medium">{etiquette.category}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-medium text-green-800 mb-2">✅ 해야 할 것</h5>
                      <ul className="space-y-1">
                        {etiquette.dos.map((item, i) => (
                          <li key={i} className="text-sm text-green-700">• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h5 className="font-medium text-red-800 mb-2">❌ 하지 말아야 할 것</h5>
                      <ul className="space-y-1">
                        {etiquette.donts.map((item, i) => (
                          <li key={i} className="text-sm text-red-700">• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                onClick={() => markSectionComplete('etiquette')}
                disabled={isSectionComplete('etiquette')}
                className="w-full"
              >
                {isSectionComplete('etiquette') ? '완료됨' : '예절 학습 완료'}
              </Button>
            </TabsContent>

            <TabsContent value="comparison" className="space-y-4">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-3">🤝 한국과의 공통점</h4>
                  <ul className="space-y-1">
                    {cityData.comparison.withKorea.similarities.map((item, index) => (
                      <li key={index} className="text-sm text-blue-700">• {item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-800 mb-3">🌟 독특한 차이점</h4>
                  <ul className="space-y-1">
                    {cityData.comparison.withKorea.differences.map((item, index) => (
                      <li key={index} className="text-sm text-purple-700">• {item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-3">💡 학습 포인트</h4>
                  <ul className="space-y-1">
                    {cityData.comparison.withKorea.learningPoints.map((item, index) => (
                      <li key={index} className="text-sm text-green-700">• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={() => markSectionComplete('comparison')}
                disabled={isSectionComplete('comparison')}
                className="w-full"
              >
                {isSectionComplete('comparison') ? '완료됨' : '비교학습 완료'}
              </Button>
            </TabsContent>

            <TabsContent value="education" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-red-600" />
                    <h4 className="font-medium text-red-800">역사 학습</h4>
                  </div>
                  <ul className="space-y-1">
                    {cityData.educationalValue.historyLessons.map((lesson, index) => (
                      <li key={index} className="text-sm text-red-700">• {lesson}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-4 h-4 text-green-600" />
                    <h4 className="font-medium text-green-800">지리 학습</h4>
                  </div>
                  <ul className="space-y-1">
                    {cityData.educationalValue.geographyLessons.map((lesson, index) => (
                      <li key={index} className="text-sm text-green-700">• {lesson}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart className="w-4 h-4 text-purple-600" />
                    <h4 className="font-medium text-purple-800">문화 학습</h4>
                  </div>
                  <ul className="space-y-1">
                    {cityData.educationalValue.culturalLessons.map((lesson, index) => (
                      <li key={index} className="text-sm text-purple-700">• {lesson}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-blue-600" />
                    <h4 className="font-medium text-blue-800">사회 학습</h4>
                  </div>
                  <ul className="space-y-1">
                    {cityData.educationalValue.socialStudies.map((lesson, index) => (
                      <li key={index} className="text-sm text-blue-700">• {lesson}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Button 
                onClick={() => markSectionComplete('education')}
                disabled={isSectionComplete('education')}
                className="w-full"
              >
                {isSectionComplete('education') ? '완료됨' : '교육가치 학습 완료'}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 퀴즈 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            문화 이해도 퀴즈
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showQuiz ? (
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                {cityData.city}에 대해 얼마나 잘 알게 되었는지 확인해보세요!
              </p>
              <Button 
                onClick={() => setShowQuiz(true)}
                disabled={getCompletionProgress() < 80}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                {getCompletionProgress() < 80 ? '80% 학습 후 퀴즈 이용 가능' : '퀴즈 시작하기'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {generateQuiz().map((question) => (
                <div key={question.id} className="space-y-3">
                  <h4 className="font-medium">{question.question}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {question.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={quizAnswers[question.id.toString()] === option ? "default" : "outline"}
                        onClick={() => setQuizAnswers(prev => ({
                          ...prev,
                          [question.id.toString()]: option
                        }))}
                        className="text-left justify-start"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowQuiz(false)} className="flex-1">
                  취소
                </Button>
                <Button 
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length < generateQuiz().length}
                  className="flex-1"
                >
                  퀴즈 제출
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}