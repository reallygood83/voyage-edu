'use client';

import React, { useState } from 'react';
import { TravelPlan } from '@/types';
import { geminiService, TravelRecommendation, ItineraryOptimization } from '@/services/geminiService';

interface AITravelAssistantProps {
  travelPlan?: TravelPlan;
  onRecommendationApply?: (recommendation: TravelRecommendation) => void;
  onItineraryOptimize?: (optimization: ItineraryOptimization) => void;
}

export default function AITravelAssistant({ 
  travelPlan, 
  onRecommendationApply, 
  onItineraryOptimize 
}: AITravelAssistantProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'recommend' | 'optimize' | 'advice'>('recommend');
  const [recommendation, setRecommendation] = useState<TravelRecommendation | null>(null);
  const [optimization, setOptimization] = useState<ItineraryOptimization | null>(null);
  const [advice, setAdvice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 여행 추천 폼 상태
  const [preferences, setPreferences] = useState({
    budget: 1000000,
    duration: 3,
    interests: [] as string[],
    travelStyle: '휴양',
    season: '봄',
    groupSize: 2
  });

  const interestOptions = [
    '문화/역사', '자연/풍경', '음식', '쇼핑', '액티비티', 
    '휴양', '사진촬영', '예술', '건축', '야생동물'
  ];

  const travelStyles = ['휴양', '모험', '문화탐방', '미식여행', '쇼핑', '배낭여행'];
  const seasons = ['봄', '여름', '가을', '겨울'];

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleGetRecommendation = async () => {
    if (preferences.interests.length === 0) {
      setError('최소 하나의 관심사를 선택해주세요.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.generateTravelRecommendation(preferences);
      if (result) {
        setRecommendation(result);
      } else {
        setError('여행 추천을 생성하는데 실패했습니다.');
      }
    } catch (error) {
      setError('AI 서비스 연결에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptimizeItinerary = async () => {
    if (!travelPlan) {
      setError('최적화할 여행 계획이 없습니다.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.optimizeItinerary(travelPlan);
      if (result) {
        setOptimization(result);
      } else {
        setError('일정 최적화에 실패했습니다.');
      }
    } catch (error) {
      setError('AI 서비스 연결에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetAdvice = async () => {
    if (!travelPlan) {
      setError('조언을 받을 여행 계획이 없습니다.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await geminiService.getTravelAdvice(travelPlan);
      if (result) {
        setAdvice(result);
      } else {
        setError('여행 조언을 생성하는데 실패했습니다.');
      }
    } catch (error) {
      setError('AI 서비스 연결에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">AI</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">AI 여행 어시스턴트</h2>
      </div>

      {/* 탭 네비게이션 */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('recommend')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'recommend'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          🎯 여행 추천
        </button>
        <button
          onClick={() => setActiveTab('optimize')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'optimize'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          ⚡ 일정 최적화
        </button>
        <button
          onClick={() => setActiveTab('advice')}
          className={`px-4 py-2 font-medium ${
            activeTab === 'advice'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          💡 여행 조언
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* 여행 추천 탭 */}
      {activeTab === 'recommend' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                예산 (원)
              </label>
              <input
                type="number"
                value={preferences.budget}
                onChange={(e) => setPreferences(prev => ({ ...prev, budget: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="100000"
                step="100000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                여행 기간 (일)
              </label>
              <input
                type="number"
                value={preferences.duration}
                onChange={(e) => setPreferences(prev => ({ ...prev, duration: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="1"
                max="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                여행 스타일
              </label>
              <select
                value={preferences.travelStyle}
                onChange={(e) => setPreferences(prev => ({ ...prev, travelStyle: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {travelStyles.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                계절
              </label>
              <select
                value={preferences.season}
                onChange={(e) => setPreferences(prev => ({ ...prev, season: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {seasons.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                인원 수
              </label>
              <input
                type="number"
                value={preferences.groupSize}
                onChange={(e) => setPreferences(prev => ({ ...prev, groupSize: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                min="1"
                max="20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              관심사 (복수 선택 가능)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    preferences.interests.includes(interest)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGetRecommendation}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? '🤖 AI가 분석 중...' : '🎯 맞춤 여행 추천 받기'}
          </button>

          {recommendation && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 AI 추천 결과</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">추천 목적지</h4>
                  <ul className="space-y-1">
                    {recommendation.destinations.map((dest, index) => (
                      <li key={index} className="text-gray-600">• {dest}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">추천 활동</h4>
                  <ul className="space-y-1">
                    {recommendation.activities.slice(0, 5).map((activity, index) => (
                      <li key={index} className="text-gray-600">• {activity}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">예산 분석</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">숙박:</span>
                    <span className="font-medium ml-1">{recommendation.budget.breakdown.accommodation.toLocaleString()}원</span>
                  </div>
                  <div>
                    <span className="text-gray-500">식비:</span>
                    <span className="font-medium ml-1">{recommendation.budget.breakdown.food.toLocaleString()}원</span>
                  </div>
                  <div>
                    <span className="text-gray-500">활동:</span>
                    <span className="font-medium ml-1">{recommendation.budget.breakdown.activities.toLocaleString()}원</span>
                  </div>
                  <div>
                    <span className="text-gray-500">교통:</span>
                    <span className="font-medium ml-1">{recommendation.budget.breakdown.transportation.toLocaleString()}원</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-2">여행 팁</h4>
                <ul className="space-y-1">
                  {recommendation.tips.map((tip, index) => (
                    <li key={index} className="text-gray-600 text-sm">💡 {tip}</li>
                  ))}
                </ul>
              </div>

              {onRecommendationApply && (
                <button
                  onClick={() => onRecommendationApply(recommendation)}
                  className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  이 추천을 여행 계획에 적용하기
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* 일정 최적화 탭 */}
      {activeTab === 'optimize' && (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              현재 여행 계획을 AI가 분석하여 최적화된 일정을 제안합니다.
            </p>
            <button
              onClick={handleOptimizeItinerary}
              disabled={isLoading || !travelPlan}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? '🤖 AI가 최적화 중...' : '⚡ 일정 최적화하기'}
            </button>
          </div>

          {optimization && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">⚡ 최적화된 일정</h3>
              
              <div className="space-y-4">
                {optimization.optimizedSchedule.map((day, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold text-gray-700 mb-3">Day {day.day}</h4>
                    <div className="space-y-2">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div>
                            <span className="font-medium text-sm">{activity.time}</span>
                            <span className="mx-2">•</span>
                            <span className="text-gray-700">{activity.activity}</span>
                            <span className="text-gray-500 text-sm ml-2">({activity.duration})</span>
                          </div>
                          <span className="text-purple-600 font-medium">{activity.cost.toLocaleString()}원</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-white rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-700">예상 총 비용:</span>
                  <span className="text-xl font-bold text-purple-600">{optimization.totalCost.toLocaleString()}원</span>
                </div>
                
                <h4 className="font-semibold text-gray-700 mb-2">개선 제안사항</h4>
                <ul className="space-y-1">
                  {optimization.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-gray-600 text-sm">💡 {suggestion}</li>
                  ))}
                </ul>
              </div>

              {onItineraryOptimize && (
                <button
                  onClick={() => onItineraryOptimize(optimization)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  최적화된 일정 적용하기
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* 여행 조언 탭 */}
      {activeTab === 'advice' && (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              현재 여행 계획에 대한 전문적인 조언을 받아보세요.
            </p>
            <button
              onClick={handleGetAdvice}
              disabled={isLoading || !travelPlan}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? '🤖 AI가 분석 중...' : '💡 전문 조언 받기'}
            </button>
          </div>

          {advice && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4">💡 AI 여행 조언</h3>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {advice}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}