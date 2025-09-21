# 🌍 Voyage Edu - 세계 문화 여행 상품 제작 웹앱

초등학생을 위한 교육용 세계 문화 여행 상품 제작 플랫폼

## 🚀 프로젝트 소개

Voyage Edu는 초등학생들이 세계 문화를 탐험하고 창의적인 여행 상품을 만들 수 있는 교육용 웹 애플리케이션입니다. 실제 데이터를 활용하여 여행 계획을 세우고 홍보 자료를 제작하면서 문화 다양성을 이해하고 창의력을 기를 수 있습니다.

## ✨ 주요 기능

### 📍 국가/도시 검색 및 정보 조회
- 20개 이상 국가 지원 (한국 포함)
- 주요 도시별 실시간 날씨 정보
- 문화 정보 및 주요 관광지 소개

### ✈️ 여행 계획 만들기
- 일정 타임라인 구성
- 활동 계획 수립
- 예산 자동 계산
- 타겟 고객 설정 (가족, 청소년, 시니어 등)

### 📢 홍보 자료 제작
- 브로슈어 디자인 (3가지 템플릿)
- 포스터 생성 (다양한 스타일)
- 소셜 미디어 콘텐츠 (준비 중)

### 🎓 교육 기능
- 초등 수준 가이드
- 문화 존중 토론 프롬프트
- SEL(사회정서학습) 요소 통합
- 게임화된 인터페이스

## 🛠️ 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Node.js (API Routes)
- **Database**: Firebase (예정)
- **APIs**: 
  - OpenWeatherMap (날씨)
  - Amadeus (항공/숙소) - 예정
  - Google Gemini (AI 생성) - 예정

## 📦 설치 방법

```bash
# 저장소 클론
git clone https://github.com/yourusername/voyage_edu.git

# 디렉토리 이동
cd voyage_edu

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

## 🔑 환경 변수 설정

`.env.local` 파일을 생성하고 다음 API 키를 추가하세요:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_key_here
NEXT_PUBLIC_AMADEUS_CLIENT_ID=your_id_here
NEXT_PUBLIC_AMADEUS_CLIENT_SECRET=your_secret_here
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

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

## 📝 라이선스

ISC License

## 👩‍🏫 문의

교육용 프로젝트 관련 문의는 이슈를 등록해주세요.

---

Made with ❤️ for Elementary School Students