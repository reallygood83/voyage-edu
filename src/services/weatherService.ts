import { Weather } from '@/types';

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (
  lat: number,
  lon: number
): Promise<Weather> => {
  if (!OPENWEATHER_API_KEY) {
    // Return mock data if no API key
    return {
      temp: 22,
      feelsLike: 21,
      description: '맑음',
      icon: '☀️',
      humidity: 60,
      windSpeed: 5,
    };
  }

  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=kr`
    );
    
    if (!response.ok) {
      throw new Error('Weather API error');
    }
    
    const data = await response.json();
    
    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      icon: getWeatherEmoji(data.weather[0].icon),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    // Return mock data on error
    return {
      temp: 22,
      feelsLike: 21,
      description: '맑음',
      icon: '☀️',
      humidity: 60,
      windSpeed: 5,
    };
  }
};

const getWeatherEmoji = (iconCode: string): string => {
  const iconMap: Record<string, string> = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '☁️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️',
  };
  
  return iconMap[iconCode] || '☀️';
};