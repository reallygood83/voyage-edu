# 🌍 Voyage Edu - 초등학생을 위한 세계 문화 여행 교육 플랫폼

🎒 **재미있는 여행 계획으로 세계 문화를 탐험하는 교육용 웹 애플리케이션**

[![Vercel Deploy](https://img.shields.io/badge/Vercel-Deploy-black?logo=vercel)](https://voyage-edu.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)

## 🚀 프로젝트 소개

Voyage Edu는 초등학생들이 세계 문화를 탐험하고 창의적인 여행 상품을 만들 수 있는 교육용 웹 애플리케이션입니다. 실제 데이터를 활용하여 여행 계획을 세우고 홍보 자료를 제작하면서 문화 다양성을 이해하고 창의력을 기를 수 있습니다.

## ✨ 주요 기능

### 🌟 **게임화된 학습 시스템**
- 🏆 **5가지 업적 시스템**: 첫 탐험가, 도시 탐험가, 계획의 달인, 디자이너, 여행 전문가
- 📊 **진행률 추적**: 단계별 학습 진도 시각화
- 🎯 **포인트 시스템**: 업적 달성 시 포인트 획득
- 🎮 **레벨 시스템**: 초보 여행자부터 여행 마스터까지

### 📍 **국가/도시 검색 시스템**
- 🌍 20개 이상 국가 지원 (한국 포함)
- 🌤️ 실시간 날씨 정보 통합
- 🏛️ 문화 정보 및 주요 관광지 소개
- 📱 터치 친화적 카드 인터페이스

### ✈️ **여행 계획 빌더**
- 📅 일정 타임라인 구성 도구
- 🎯 활동 계획 수립 가이드
- 💰 예산 자동 계산 시스템
- 👥 타겟 고객 설정 (가족, 청소년, 시니어 등)

### 📢 **홍보 자료 제작 도구**
- 📖 브로셔 디자인 (다양한 템플릿)
- 🎨 포스터 생성 (창의적 스타일)
- 🖼️ 소셜 미디어 콘텐츠 생성

### 🎓 **초등학생 친화적 설계**
- 🧸 **ADHD 친화적**: 명확한 시각적 구분과 단계별 안내
- 🎨 **밝고 활기찬 UI**: 그라데이션 배경과 애니메이션 효과
- 🔤 **한글 최적화**: Pretendard, Noto Sans KR 폰트 적용
- ♿ **접근성 준수**: WCAG 2.1 AA 기준 준수

## 🛠️ 기술 스택

### 🖥️ **Frontend**
- **Framework**: Next.js 15 (App Router)
- **Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS 3.4.x
- **Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React

### 🎨 **UI/UX Design**
- **Design System**: shadcn/ui 기반 커스텀 컴포넌트
- **Typography**: Pretendard + Noto Sans KR
- **Animations**: CSS animations + Tailwind transitions
- **Responsive**: Mobile-first 반응형 디자인

### 🔧 **Development Tools**
- **Language**: TypeScript 5.9
- **Build Tool**: Next.js built-in bundler
- **Linting**: ESLint + Next.js rules
- **Version Control**: Git + GitHub

### 🌐 **APIs & Services**
- **날씨 API**: OpenWeatherMap (실시간 날씨 정보)
- **Authentication**: Firebase Auth (예정)
- **Database**: Firebase Realtime Database (예정)
- **AI Features**: Google Gemini API (예정)

## 📦 설치 방법

```bash
# 저장소 클론
git clone https://github.com/reallygood83/voyage-edu.git

# 디렉토리 이동
cd voyage-edu

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

## 🔑 환경 변수 설정

`.env.local` 파일을 생성하고 다음 API 키를 추가하세요:

```env
# OpenWeatherMap API (날씨 정보 - 필수)
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_key

# Firebase Configuration (인증 및 데이터베이스 - 필수)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Future APIs (향후 구현 예정)
NEXT_PUBLIC_AMADEUS_CLIENT_ID=your_amadeus_id
NEXT_PUBLIC_AMADEUS_CLIENT_SECRET=your_amadeus_secret
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
```

### 📝 API 키 발급 방법

#### 🌤️ OpenWeatherMap (무료)
1. https://openweathermap.org 회원가입
2. My API keys → Create Key
3. 활성화까지 최대 2시간 소요

#### 🔥 Firebase (무료)
1. https://console.firebase.google.com 접속
2. 새 프로젝트 생성
3. 프로젝트 설정 → 일반 → 웹앱 추가
4. SDK 설정 및 구성에서 config 객체 복사

## 📱 사용 방법

1. **국가 선택**: 탐험하고 싶은 국가를 검색하고 선택
2. **도시 선택**: 방문할 도시들을 선택 (여러 개 가능)
3. **여행 계획**: 일정, 타겟 고객, 예산 수준 설정
4. **활동 추가**: 각 도시별로 활동 계획 추가
5. **홍보 자료**: 브로슈어나 포스터 디자인 생성
6. **공유하기**: 완성된 여행 상품 공유

## 🌐 배포

Vercel을 통한 배포:

```bash
# 빌드
npm run build

# Vercel CLI 설치 (필요시)
npm i -g vercel

# 배포
vercel
```

## 📋 프로젝트 구조

```
voyage_edu/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React 컴포넌트
│   ├── services/        # API 서비스
│   ├── types/           # TypeScript 타입 정의
│   ├── utils/           # 유틸리티 함수
│   └── hooks/          # React Hooks
├── public/             # 정적 파일
└── package.json       # 프로젝트 설정
```

## 🎯 교육적 가치

- **문화 다양성 이해**: 세계 여러 나라의 문화 체험
- **창의적 사고**: 여행 상품 기획 및 디자인
- **실무 경험**: 실제 데이터를 활용한 계획 수립
- **마케팅 기초**: 타겟 고객 설정 및 홍보 전략

## 🚀 Live Demo

**🌐 [Voyage Edu 체험하기](https://voyage-edu.vercel.app)**

> 초등학생을 위한 재미있는 세계 문화 여행 교육 플랫폼을 직접 체험해보세요!

## 📷 Screenshots

### 🏠 메인 페이지
- 게임화된 진행률 추적
- 친근한 인사말과 포인트 시스템
- 단계별 탭 네비게이션

### 🌍 국가/도시 선택
- 터치 친화적 카드 인터페이스
- 실시간 날씨 정보 통합
- 시각적 피드백과 애니메이션

### ✈️ 여행 계획 수립
- 직관적인 계획 빌더
- 예산 자동 계산
- 활동 추가 및 관리

### 📢 홍보 자료 제작
- 다양한 템플릿 선택
- 실시간 미리보기
- 완성된 자료 다운로드

## 📝 라이선스

MIT License

## 👩‍🏫 문의

교육용 프로젝트 관련 문의는 이슈를 등록해주세요.

---

Made with ❤️ for Elementary School Students