export interface Country {
  code: string;
  name: string;
  nameKo: string;
  flag: string;
  continent: string;
}

export interface City {
  id: string;
  name: string;
  nameKo: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  population?: number;
  timezone?: string;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  duration: string;
  price: number;
  currency: string;
}

export interface Accommodation {
  id: string;
  name: string;
  type: 'hotel' | 'hostel' | 'guesthouse' | 'apartment';
  rating: number;
  price: number;
  currency: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  amenities: string[];
  images: string[];
}

export interface Weather {
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  forecast?: WeatherForecast[];
}

export interface WeatherForecast {
  date: string;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
}

export interface CulturalInfo {
  language: string[];
  currency: string;
  timezone: string;
  festivals: Festival[];
  foods: Food[];
  attractions: Attraction[];
}

export interface Festival {
  name: string;
  nameKo: string;
  date: string;
  description: string;
  image?: string;
}

export interface Food {
  name: string;
  nameKo: string;
  description: string;
  image?: string;
  type: 'main' | 'dessert' | 'snack' | 'drink';
}

export interface Attraction {
  name: string;
  nameKo: string;
  description: string;
  type: 'museum' | 'park' | 'monument' | 'building' | 'natural' | 'other';
  image?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

export interface TravelPlan {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  destinations: Destination[];
  targetCustomer: TargetCustomer;
  totalBudget: number;
  currency: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
}

export interface Destination {
  city: City;
  arrivalDate: string;
  departureDate: string;
  accommodation?: Accommodation;
  activities: Activity[];
  flights?: Flight[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  duration: number; // in hours
  price: number;
  type: 'cultural' | 'adventure' | 'relaxation' | 'food' | 'shopping' | 'other';
  location?: {
    name: string;
    latitude: number;
    longitude: number;
  };
}

export interface TargetCustomer {
  type: 'family' | 'youth' | 'senior' | 'business' | 'couple' | 'solo';
  ageRange: string;
  interests: string[];
  budget: 'economy' | 'standard' | 'luxury';
}

export interface PromotionalMaterial {
  id: string;
  travelPlanId: string;
  type: 'brochure' | 'poster' | 'social' | 'video';
  title: string;
  description: string;
  imageUrl?: string;
  content: any; // JSON content for rich editor
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  grade?: number;
  school?: string;
  profileImage?: string;
  createdAt: string;
}