export const COUNTRIES = [
  { code: 'KR', name: 'South Korea', nameKo: '대한민국', flag: '🇰🇷', continent: 'Asia' },
  { code: 'JP', name: 'Japan', nameKo: '일본', flag: '🇯🇵', continent: 'Asia' },
  { code: 'CN', name: 'China', nameKo: '중국', flag: '🇨🇳', continent: 'Asia' },
  { code: 'US', name: 'United States', nameKo: '미국', flag: '🇺🇸', continent: 'North America' },
  { code: 'FR', name: 'France', nameKo: '프랑스', flag: '🇫🇷', continent: 'Europe' },
  { code: 'GB', name: 'United Kingdom', nameKo: '영국', flag: '🇬🇧', continent: 'Europe' },
  { code: 'DE', name: 'Germany', nameKo: '독일', flag: '🇩🇪', continent: 'Europe' },
  { code: 'IT', name: 'Italy', nameKo: '이탈리아', flag: '🇮🇹', continent: 'Europe' },
  { code: 'ES', name: 'Spain', nameKo: '스페인', flag: '🇪🇸', continent: 'Europe' },
  { code: 'AU', name: 'Australia', nameKo: '호주', flag: '🇦🇺', continent: 'Oceania' },
  { code: 'BR', name: 'Brazil', nameKo: '브라질', flag: '🇧🇷', continent: 'South America' },
  { code: 'CA', name: 'Canada', nameKo: '캐나다', flag: '🇨🇦', continent: 'North America' },
  { code: 'IN', name: 'India', nameKo: '인도', flag: '🇮🇳', continent: 'Asia' },
  { code: 'MX', name: 'Mexico', nameKo: '멕시코', flag: '🇲🇽', continent: 'North America' },
  { code: 'TH', name: 'Thailand', nameKo: '태국', flag: '🇹🇭', continent: 'Asia' },
  { code: 'VN', name: 'Vietnam', nameKo: '베트남', flag: '🇻🇳', continent: 'Asia' },
  { code: 'SG', name: 'Singapore', nameKo: '싱가포르', flag: '🇸🇬', continent: 'Asia' },
  { code: 'MY', name: 'Malaysia', nameKo: '말레이시아', flag: '🇲🇾', continent: 'Asia' },
  { code: 'ID', name: 'Indonesia', nameKo: '인도네시아', flag: '🇮🇩', continent: 'Asia' },
  { code: 'EG', name: 'Egypt', nameKo: '이집트', flag: '🇪🇬', continent: 'Africa' },
];

export const MAJOR_CITIES = {
  KR: [
    { id: 'seoul', name: 'Seoul', nameKo: '서울', latitude: 37.5665, longitude: 126.9780 },
    { id: 'busan', name: 'Busan', nameKo: '부산', latitude: 35.1796, longitude: 129.0756 },
    { id: 'jeju', name: 'Jeju', nameKo: '제주', latitude: 33.4996, longitude: 126.5312 },
  ],
  JP: [
    { id: 'tokyo', name: 'Tokyo', nameKo: '도쿄', latitude: 35.6762, longitude: 139.6503 },
    { id: 'osaka', name: 'Osaka', nameKo: '오사카', latitude: 34.6937, longitude: 135.5023 },
    { id: 'kyoto', name: 'Kyoto', nameKo: '교토', latitude: 35.0116, longitude: 135.7681 },
  ],
  US: [
    { id: 'newyork', name: 'New York', nameKo: '뉴욕', latitude: 40.7128, longitude: -74.0060 },
    { id: 'losangeles', name: 'Los Angeles', nameKo: '로스앤젤레스', latitude: 34.0522, longitude: -118.2437 },
    { id: 'sanfrancisco', name: 'San Francisco', nameKo: '샌프란시스코', latitude: 37.7749, longitude: -122.4194 },
  ],
  FR: [
    { id: 'paris', name: 'Paris', nameKo: '파리', latitude: 48.8566, longitude: 2.3522 },
    { id: 'nice', name: 'Nice', nameKo: '니스', latitude: 43.7102, longitude: 7.2620 },
    { id: 'lyon', name: 'Lyon', nameKo: '리옹', latitude: 45.7640, longitude: 4.8357 },
  ],
};

export const TARGET_CUSTOMERS = [
  { value: 'family', label: '가족 여행자', labelEn: 'Family Travelers' },
  { value: 'youth', label: '청소년 그룹', labelEn: 'Youth Groups' },
  { value: 'senior', label: '시니어 여행자', labelEn: 'Senior Travelers' },
  { value: 'couple', label: '커플/신혼여행', labelEn: 'Couples/Honeymoon' },
  { value: 'solo', label: '혼자 여행', labelEn: 'Solo Travelers' },
  { value: 'business', label: '비즈니스 여행', labelEn: 'Business Travelers' },
];

export const ACTIVITY_TYPES = [
  { value: 'cultural', label: '문화 체험', icon: '🏛️' },
  { value: 'adventure', label: '모험 활동', icon: '🏔️' },
  { value: 'relaxation', label: '휴식', icon: '🏖️' },
  { value: 'food', label: '음식 체험', icon: '🍜' },
  { value: 'shopping', label: '쇼핑', icon: '🛍️' },
  { value: 'other', label: '기타', icon: '✨' },
];

export const ACCOMMODATION_TYPES = [
  { value: 'hotel', label: '호텔', icon: '🏨' },
  { value: 'hostel', label: '호스텔', icon: '🏠' },
  { value: 'guesthouse', label: '게스트하우스', icon: '🏡' },
  { value: 'apartment', label: '아파트', icon: '🏢' },
];

export const BUDGET_LEVELS = [
  { value: 'economy', label: '저예산', description: '경제적인 여행' },
  { value: 'standard', label: '표준', description: '적당한 예산의 여행' },
  { value: 'luxury', label: '고급', description: '럭셔리한 여행' },
];

export const GRADE_LEVELS = [
  { value: 1, label: '1학년' },
  { value: 2, label: '2학년' },
  { value: 3, label: '3학년' },
  { value: 4, label: '4학년' },
  { value: 5, label: '5학년' },
  { value: 6, label: '6학년' },
];

export const API_ENDPOINTS = {
  WEATHER: process.env.NEXT_PUBLIC_WEATHER_API_URL || '',
  AMADEUS_TOKEN: process.env.NEXT_PUBLIC_AMADEUS_TOKEN_URL || '',
  AMADEUS_API: process.env.NEXT_PUBLIC_AMADEUS_API_URL || '',
  WIKIPEDIA: 'https://ko.wikipedia.org/api/rest_v1',
  GEMINI: process.env.NEXT_PUBLIC_GEMINI_API_URL || '',
};