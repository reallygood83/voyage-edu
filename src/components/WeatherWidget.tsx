'use client';

import { useState, useEffect } from 'react';
import { City, Weather } from '@/types';
import { fetchWeatherData } from '@/services/weatherService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface WeatherWidgetProps {
  city: City;
}

const WeatherWidget = ({ city }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        setLoading(true);
        // For now, we'll use mock data
        // const data = await fetchWeatherData(city.latitude, city.longitude);
        
        // Mock weather data
        const mockWeather: Weather = {
          temp: Math.round(15 + Math.random() * 20),
          feelsLike: Math.round(15 + Math.random() * 20),
          description: ['맑음', '구름 조금', '흐림', '비'][Math.floor(Math.random() * 4)],
          icon: ['☀️', '⛅', '☁️', '🌧️'][Math.floor(Math.random() * 4)],
          humidity: Math.round(40 + Math.random() * 40),
          windSpeed: Math.round(5 + Math.random() * 15),
        };
        
        setWeather(mockWeather);
        setError(null);
      } catch (err) {
        setError('날씨 정보를 불러올 수 없습니다');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [city]);

  if (loading) {
    return (
      <Card className="border-3 border-blue-200 animate-pulse">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="text-2xl animate-bounce">🌤️</div>
            <p className="text-sm text-gray-500 mt-2">날씨 정보를 가져오는 중...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className="border-3 border-gray-200">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-3">🌩️</div>
          <h4 className="font-bold text-gray-800 mb-2">{city.nameKo} 날씨</h4>
          <p className="text-sm text-gray-500">날씨 정보를 불러올 수 없어요</p>
          <p className="text-xs text-gray-400 mt-1">잠시 후 다시 시도해주세요</p>
        </CardContent>
      </Card>
    );
  }

  // 날씨에 따른 배경 색상 결정
  const getWeatherTheme = (description: string, icon: string) => {
    if (icon === '☀️' || description.includes('맑음')) {
      return 'from-yellow-400 via-orange-400 to-red-400';
    }
    if (icon === '🌧️' || description.includes('비')) {
      return 'from-gray-400 via-blue-400 to-blue-500';
    }
    if (icon === '☁️' || description.includes('흐림')) {
      return 'from-gray-300 via-gray-400 to-gray-500';
    }
    return 'from-blue-400 via-blue-500 to-purple-500';
  };

  // 날씨에 따른 재미있는 메시지
  const getWeatherMessage = (temp: number, description: string) => {
    if (temp >= 30) return '아이스크림 때! 너무 더워요! 🍦';
    if (temp >= 25) return '따뜻하고 좋은 날씨에요! 😎';
    if (temp >= 15) return '산책하기 좋은 날씨! 🚶';
    if (temp >= 5) return '조금 쌌쌌해요. 옵를 챙겨요! 🧥';
    return '매우 추워요! 따뜻하게 입어요! ❄️';
  };

  return (
    <Card className={cn(
      "overflow-hidden border-3 border-white shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1",
      "bg-gradient-to-br", getWeatherTheme(weather.description, weather.icon)
    )}>
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-center flex items-center justify-center gap-2">
          <span className="text-2xl">🌡️</span>
          {city.nameKo} 날씨
        </CardTitle>
      </CardHeader>
      <CardContent className="text-white space-y-4">
        {/* 메인 날씨 정보 */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-5xl font-bold mb-2">
              {weather.temp}°C
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-2">
              체감 {weather.feelsLike}°C
            </Badge>
            <p className="text-lg font-semibold">{weather.description}</p>
          </div>
          <div className="text-7xl animate-bounce">
            {weather.icon}
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl mb-1">💧</div>
              <p className="text-xs opacity-80">습도</p>
              <p className="font-bold text-lg">{weather.humidity}%</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">💨</div>
              <p className="text-xs opacity-80">바람</p>
              <p className="font-bold text-lg">{weather.windSpeed}m/s</p>
            </div>
          </div>
        </div>

        {/* 재미있는 메시지 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
          <p className="text-sm font-medium">
            {getWeatherMessage(weather.temp, weather.description)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;