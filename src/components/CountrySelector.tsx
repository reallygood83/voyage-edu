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
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const modalSearchRef = useRef<HTMLInputElement>(null);
  
  // 도시 추가 기능을 위한 state
  const [showAddCityForm, setShowAddCityForm] = useState(false);
  const [newCityName, setNewCityName] = useState('');
  const [customCities, setCustomCities] = useState<City[]>([]);

  // 모달이 열릴 때 검색창에 포커스
  useEffect(() => {
    if (showModal && modalSearchRef.current) {
      modalSearchRef.current.focus();
    }
  }, [showModal]);

  const filteredCountries = COUNTRIES.filter(
    country =>
      country.nameKo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountrySelect = (country: Country) => {
    onCountrySelect(country);
    setSearchTerm(''); // 모달 닫은 후 검색어 초기화
    setShowModal(false); // 모달 자동 닫기
    setSelectedIndex(-1);
    onCitiesSelect([]); // Reset selected cities when country changes
  };

  // 모달용 키보드 네비게이션 처리
  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (filteredCountries.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCountries.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredCountries.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredCountries.length) {
          handleCountrySelect(filteredCountries[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowModal(false);
        setSelectedIndex(-1);
        setSearchTerm('');
        break;
    }
  };

  const handleCityToggle = (city: City) => {
    const isSelected = selectedCities.some(c => c.id === city.id);
    if (isSelected) {
      onCitiesSelect(selectedCities.filter(c => c.id !== city.id));
    } else {
      onCitiesSelect([...selectedCities, city]);
    }
  };

  // 도시 추가 기능
  const handleAddCity = () => {
    if (!newCityName.trim() || !selectedCountry) return;
    
    // 중복 체크 (기본 도시와 커스텀 도시 모두 확인)
    const allCities = [
      ...getCitiesForCountry(selectedCountry.code),
      ...customCities.filter(city => city.countryCode === selectedCountry.code)
    ];
    
    const isDuplicate = allCities.some(
      city => city.nameKo.toLowerCase() === newCityName.trim().toLowerCase() ||
              city.name.toLowerCase() === newCityName.trim().toLowerCase()
    );
    
    if (isDuplicate) {
      alert('이미 추가된 도시입니다!');
      return;
    }
    
    // 새 도시 생성
    const newCity: City = {
      id: `custom-${Date.now()}`,
      name: newCityName.trim(),
      nameKo: newCityName.trim(),
      country: selectedCountry.nameKo,
      countryCode: selectedCountry.code,
      description: `${selectedCountry.nameKo}의 아름다운 도시`,
      coordinates: { lat: 0, lng: 0 }, // 기본값
      isCustom: true // 커스텀 도시 표시
    };
    
    // 커스텀 도시 목록에 추가
    setCustomCities(prev => [...prev, newCity]);
    
    // 폼 초기화
    setNewCityName('');
    setShowAddCityForm(false);
    
    // 바로 선택하기
    onCitiesSelect([...selectedCities, newCity]);
  };

  const getCitiesForCountry = (countryCode: string): City[] => {
    const cities = MAJOR_CITIES[countryCode as keyof typeof MAJOR_CITIES] || [];
    const baseCities = cities.map(city => ({
      ...city,
      country: COUNTRIES.find(c => c.code === countryCode)?.nameKo || '',
      countryCode,
    }));
    
    // 해당 국가의 커스텀 도시들 추가
    const countryCities = customCities.filter(city => city.countryCode === countryCode);
    
    return [...baseCities, ...countryCities];
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
          {/* 검색 영역 */}
          <div className="relative search-container">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Button
                  onClick={() => setShowModal(true)}
                  variant="outline"
                  size="lg"
                  className="w-full h-16 text-xl border-3 border-blue-300 hover:border-blue-500 bg-white/80 hover:bg-blue-50"
                >
                  {selectedCountry ? (
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{selectedCountry.flag}</span>
                      <div className="text-left">
                        <div className="font-bold">{selectedCountry.nameKo}</div>
                        <div className="text-gray-500 text-sm">({selectedCountry.name})</div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span className="text-2xl mr-3">🔍</span>
                      국가를 선택하세요
                    </>
                  )}
                </Button>
              </div>
              
              {/* 선택 초기화 버튼 */}
              {selectedCountry && (
                <Button
                  onClick={() => {
                    onCountrySelect(null);
                    setSearchTerm('');
                    onCitiesSelect([]);
                  }}
                  variant="outline"
                  size="lg"
                  className="h-16 px-6 border-3 border-red-300 hover:border-red-500 text-red-600 hover:text-red-700"
                >
                  <span className="text-xl mr-2">🔄</span>
                  다시 선택
                </Button>
              )}
            </div>
          </div>

          {/* 선택된 국가 표시 영역 */}
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
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-2">다른 국가를 선택하려면</p>
                    <Button
                      onClick={() => {
                        setSearchTerm('');
                        setShowModal(true);
                      }}
                      variant="outline"
                      size="sm"
                      className="border-2 border-blue-300 hover:border-blue-500"
                    >
                      <span className="mr-1">🔍</span>
                      다시 검색
                    </Button>
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
            {/* 도시 추가 버튼 */}
            <div className="mb-6">
              {!showAddCityForm ? (
                <Button
                  onClick={() => setShowAddCityForm(true)}
                  variant="outline"
                  size="lg"
                  className="w-full h-16 text-xl border-3 border-green-300 hover:border-green-500 bg-green-50 hover:bg-green-100 text-green-700 hover:text-green-800"
                >
                  <span className="text-2xl mr-3">➕</span>
                  원하는 도시를 직접 추가해보세요!
                  <span className="text-2xl ml-3">🏙️</span>
                </Button>
              ) : (
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-3 border-green-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">🏙️</span>
                          <h4 className="text-lg font-bold text-gray-800">
                            {selectedCountry.nameKo}에 도시 추가하기
                          </h4>
                        </div>
                        <Input
                          type="text"
                          placeholder="도시명을 입력하세요 (예: 파리, 런던, 뉴욕)"
                          value={newCityName}
                          onChange={(e) => setNewCityName(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddCity()}
                          className="h-12 text-lg border-2 border-green-300 focus:border-green-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleAddCity}
                          disabled={!newCityName.trim()}
                          size="lg"
                          className="h-12 px-6 bg-green-500 hover:bg-green-600 text-white"
                        >
                          <span className="mr-1">✅</span>
                          추가
                        </Button>
                        <Button
                          onClick={() => {
                            setShowAddCityForm(false);
                            setNewCityName('');
                          }}
                          variant="outline"
                          size="lg"
                          className="h-12 px-6 border-2 border-gray-300 hover:border-gray-500"
                        >
                          <span className="mr-1">❌</span>
                          취소
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      💡 팁: 가고 싶은 도시가 목록에 없다면 직접 추가해보세요!
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* 기존 도시 목록 */}
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

            {getCitiesForCountry(selectedCountry.code).length === 0 && !showAddCityForm && (
              <Card className="bg-yellow-50 border-2 border-yellow-300">
                <CardContent className="text-center py-8">
                  <div className="text-4xl mb-4">🚧</div>
                  <p className="text-yellow-700 text-lg font-semibold">
                    이 국가의 도시 정보를 준비 중입니다.
                  </p>
                  <p className="text-yellow-600 mt-2">
                    위의 "도시 추가" 버튼으로 원하는 도시를 직접 추가해보세요!
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

      {/* Country Selection Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => {
            setShowModal(false);
            setSearchTerm('');
            setSelectedIndex(-1);
          }}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
              <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-3">
                <span className="text-3xl">🌍</span>
                국가를 선택해주세요
                <span className="text-3xl">✨</span>
              </h2>
              <p className="text-center text-blue-100 mt-2">
                여행하고 싶은 국가를 검색하거나 목록에서 선택하세요
              </p>
            </div>

            {/* Search Input */}
            <div className="p-6 border-b border-gray-200">
              <input
                ref={modalSearchRef}
                type="text"
                placeholder="국가명을 입력하세요 (예: 미국, United States)"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedIndex(-1);
                }}
                onKeyDown={handleModalKeyDown}
                className="w-full h-14 px-4 text-lg border-3 border-blue-300 rounded-xl focus:border-blue-500 focus:outline-none bg-blue-50/30"
              />
            </div>

            {/* Country List */}
            <div className="max-h-96 overflow-y-auto p-4">
              {filteredCountries.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔍</div>
                  <p className="text-gray-500 text-lg">
                    검색 결과가 없습니다
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    다른 키워드로 검색해보세요
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2">
                  {filteredCountries.map((country, index) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        index === selectedIndex
                          ? 'border-blue-500 bg-blue-50 shadow-lg scale-[1.02]'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{country.flag}</span>
                        <div className="flex-1">
                          <div className="font-bold text-lg text-gray-800">
                            {country.nameKo}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {country.name} • {country.continent}
                          </div>
                        </div>
                        {index === selectedIndex && (
                          <div className="text-blue-500 text-xl">
                            ➤
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div>
                  💡 키보드 화살표로 이동, Enter로 선택 가능
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSearchTerm('');
                    setSelectedIndex(-1);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  취소 (ESC)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;