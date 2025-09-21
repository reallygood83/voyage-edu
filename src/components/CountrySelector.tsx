'use client';

import { useState, useEffect, useRef } from 'react';
import { Country, City } from '@/types';
import { COUNTRIES, MAJOR_CITIES } from '@/utils/constants';
import CityCard from './CityCard';
import WeatherWidget from './WeatherWidget';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface CountrySelectorProps {
  selectedCountry: Country | null;
  selectedCities: City[];
  onCountrySelect: (country: Country | null) => void;
  onCitiesSelect: (cities: City[]) => void;
  onNext: () => void;
}

const CountrySelector = ({
  selectedCountry,
  selectedCities,
  onCountrySelect,
  onCitiesSelect,
  onNext,
}: CountrySelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


  // 간단한 외부 클릭 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.search-container')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const filteredCountries = COUNTRIES.filter(
    country =>
      country.nameKo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 디버깅 로그 - Root Cause Analysis  
  console.log('🔍 Search Debug - Simplified Version:', {
    searchTerm,
    searchTermLength: searchTerm.length,
    showDropdown,
    filteredCountriesCount: filteredCountries.length,
    renderCondition: searchTerm.length > 0 && showDropdown,
    // 실제 검색 결과 확인
    filteredCountriesPreview: filteredCountries.slice(0, 3).map(country => ({
      code: country.code,
      nameKo: country.nameKo,
      name: country.name
    }))
  });

  const handleCountrySelect = (country: Country) => {
    onCountrySelect(country);
    setSearchTerm(''); // 검색창 초기화
    setShowDropdown(false);
    onCitiesSelect([]); // Reset selected cities when country changes
  };

  const handleCityToggle = (city: City) => {
    const isSelected = selectedCities.some(c => c.id === city.id);
    if (isSelected) {
      onCitiesSelect(selectedCities.filter(c => c.id !== city.id));
    } else {
      onCitiesSelect([...selectedCities, city]);
    }
  };

  const getCitiesForCountry = (countryCode: string): City[] => {
    const cities = MAJOR_CITIES[countryCode as keyof typeof MAJOR_CITIES] || [];
    return cities.map(city => ({
      ...city,
      country: COUNTRIES.find(c => c.code === countryCode)?.nameKo || '',
      countryCode,
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Country Search */}
      <Card className="overflow-hidden border-3 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-center text-gray-800 flex items-center justify-center gap-3">
            <span className="text-4xl animate-bounce">🌍</span>
            어느 나라를 탐험해볼까요?
            <span className="text-4xl animate-bounce delay-200">✨</span>
          </CardTitle>
          <p className="text-center text-lg text-gray-600 mt-2">
            세계 여러 나라 중에서 가고 싶은 곳을 찾아보세요!
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative search-container">
            <Input
              ref={inputRef}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="🔍 국가 이름을 입력하세요 (예: 한국, 일본, 프랑스)"
              className="text-xl py-6 h-16 border-3 border-blue-300 focus:border-blue-500 bg-white/80"
            />
            
            {searchTerm.length > 0 && showDropdown && (
              <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border-2 border-blue-200 shadow-2xl max-h-60 overflow-y-auto rounded-lg">
                <div className="p-0">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country) => (
                      <Button
                        key={country.code}
                        onClick={() => handleCountrySelect(country)}
                        variant="ghost"
                        className="w-full justify-start p-4 h-auto hover:bg-blue-50 transition-all duration-200 hover:scale-[1.02] border-b border-gray-100 last:border-b-0"
                      >
                        <span className="text-3xl mr-3 animate-pulse">{country.flag}</span>
                        <div className="text-left">
                          <div className="font-bold text-lg">{country.nameKo}</div>
                          <div className="text-gray-500 text-sm">({country.name})</div>
                        </div>
                      </Button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      검색 결과가 없습니다.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {selectedCountry && (
            <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-3 border-green-300 animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="text-6xl animate-bounce">{selectedCountry.flag}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      🎉 {selectedCountry.nameKo}를 선택했어요!
                    </h3>
                    <p className="text-gray-600 text-lg">{selectedCountry.name}</p>
                    <Badge variant="secondary" className="mt-2 text-base">
                      📍 {selectedCountry.continent}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Cities Selection */}
      {selectedCountry && (
        <Card className="border-3 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 animate-slide-up">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-3">
              <span className="text-3xl animate-wiggle">🏙️</span>
              방문할 도시를 선택하세요
              <span className="text-3xl animate-wiggle delay-300">🎯</span>
            </CardTitle>
            <p className="text-center text-lg text-gray-600">
              최대 5개 도시까지 선택할 수 있어요!
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCitiesForCountry(selectedCountry.code).map((city) => (
                <CityCard
                  key={city.id}
                  city={city}
                  isSelected={selectedCities.some(c => c.id === city.id)}
                  onToggle={() => handleCityToggle(city)}
                />
              ))}
            </div>

            {getCitiesForCountry(selectedCountry.code).length === 0 && (
              <Card className="bg-yellow-50 border-2 border-yellow-300">
                <CardContent className="text-center py-8">
                  <div className="text-4xl mb-4">🚧</div>
                  <p className="text-yellow-700 text-lg font-semibold">
                    이 국가의 도시 정보를 준비 중입니다.
                  </p>
                  <p className="text-yellow-600 mt-2">
                    다른 국가를 선택해주세요!
                  </p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}

      {/* Selected Cities Summary */}
      {selectedCities.length > 0 && (
        <Card className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 border-3 border-green-400 animate-slide-up">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-3">
              <span className="text-3xl animate-bounce">🎉</span>
              선택한 도시 ({selectedCities.length}개)
              <span className="text-3xl animate-bounce delay-200">✨</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-3 justify-center">
              {selectedCities.map((city) => (
                <Badge
                  key={city.id}
                  variant="secondary"
                  className="text-lg py-3 px-4 bg-white hover:bg-gray-50 shadow-lg border-2 border-blue-200 transition-all duration-200 hover:scale-105"
                >
                  <span className="mr-2">🏙️</span>
                  {city.nameKo}
                  <Button
                    onClick={() => handleCityToggle(city)}
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    ✕
                  </Button>
                </Badge>
              ))}
            </div>
            
            <div className="text-center">
              <Button
                onClick={onNext}
                size="xl"
                variant="fun"
                className="text-xl px-12 py-6 shadow-xl border-4 border-white/50 transform hover:scale-105"
              >
                <span className="text-2xl mr-3">✈️</span>
                다음 단계: 여행 계획 만들기
                <span className="text-2xl ml-3">🗺️</span>
              </Button>
            </div>
            
            {selectedCities.length >= 3 && (
              <Card className="bg-yellow-50 border-2 border-yellow-300">
                <CardContent className="text-center py-4">
                  <div className="text-2xl mb-2">🏆</div>
                  <p className="text-yellow-800 font-semibold">
                    와! 3개 이상의 도시를 선택했어요!
                  </p>
                  <p className="text-yellow-700 text-sm mt-1">
                    정말 알찬 여행이 될 것 같아요!
                  </p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}

      {/* Weather Preview */}
      {selectedCities.length > 0 && (
        <Card className="border-3 border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-3">
              <span className="text-3xl animate-pulse">🌤️</span>
              선택한 도시들의 날씨
              <span className="text-3xl animate-pulse delay-500">🌡️</span>
            </CardTitle>
            <p className="text-center text-lg text-gray-600">
              여행 준비를 위해 날씨를 확인해보세요!
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCities.map((city) => (
                <WeatherWidget key={city.id} city={city} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CountrySelector;