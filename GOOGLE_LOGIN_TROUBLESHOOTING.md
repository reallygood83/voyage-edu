# 🔧 구글 로그인 문제 해결 가이드

## 🚨 현재 문제 상황
- localhost에서 구글 로그인이 작동하지 않음
- Firebase 보안 규칙이 설정되지 않았음 (✅ 해결됨)

## ✅ 완료된 작업
1. ✅ Firestore 보안 규칙 설정 및 배포
2. ✅ Firebase 프로젝트 연결 확인
3. ✅ 환경 변수 설정 확인

## 🔍 단계별 문제 해결

### 1단계: Firebase 콘솔에서 구글 로그인 활성화 확인

**반드시 다음 단계를 수행하세요:**

1. [Firebase 콘솔](https://console.firebase.google.com/project/voyage-edu/authentication/providers) 접속
2. **Authentication** > **Sign-in method** 이동
3. **Google** 제공업체 상태 확인:
   - 🔴 비활성화 상태라면 → **클릭하여 활성화**
   - 🟢 활성화 상태라면 → 다음 단계로

### 2단계: 승인된 도메인 설정 확인

1. [Firebase 콘솔 승인된 도메인](https://console.firebase.google.com/project/voyage-edu/authentication/settings) 접속
2. **승인된 도메인** 섹션에서 다음 확인:
   - ✅ `localhost` 도메인이 있는지 확인
   - ❌ 없다면 **도메인 추가** 버튼으로 `localhost` 추가

### 3단계: 브라우저에서 테스트

1. http://localhost:3001 접속
2. **로그인하고 시작하기** 버튼 클릭
3. **Google로 시작하기** 버튼 클릭
4. 오류 메시지 확인

## 🐛 일반적인 오류와 해결방법

### 오류 1: `auth/unauthorized-domain`
```
Firebase: Error (auth/unauthorized-domain).
```
**해결방법:**
- Firebase 콘솔 > Authentication > Settings > 승인된 도메인에 `localhost` 추가

### 오류 2: `auth/operation-not-allowed`
```
Firebase: Error (auth/operation-not-allowed).
```
**해결방법:**
- Firebase 콘솔 > Authentication > Sign-in method에서 Google 활성화

### 오류 3: `auth/popup-blocked`
```
Firebase: Error (auth/popup-blocked).
```
**해결방법:**
- 브라우저 팝업 차단 해제
- 시크릿 모드에서 테스트

### 오류 4: `auth/network-request-failed`
```
Firebase: Error (auth/network-request-failed).
```
**해결방법:**
- 인터넷 연결 확인
- VPN 사용 시 비활성화 후 테스트

## 🔧 디버깅 도구

### 브라우저 개발자 도구 확인
1. F12 키로 개발자 도구 열기
2. **Console** 탭에서 오류 메시지 확인
3. **Network** 탭에서 Firebase 요청 상태 확인

### Firebase 환경 변수 확인
현재 설정된 환경 변수:
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBiDf...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=voyage-edu.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=voyage-edu
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=voyage-edu.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=37108519699
NEXT_PUBLIC_FIREBASE_APP_ID=1:37108519699:web:8793aed003389db317c0e6
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-LS05RY3421
```

## 📞 추가 지원

### 로그 확인 방법
1. 터미널에서 개발 서버 로그 확인
2. 브라우저 콘솔에서 Firebase 초기화 메시지 확인:
   ```
   🔥 Firebase App Initialized: SUCCESS
   🔥 Firebase Auth Instance: SUCCESS
   ```

### 테스트 계정
- 구글 계정으로 로그인 테스트
- 다른 브라우저에서도 테스트 (Chrome, Safari, Firefox)

## 🎯 성공 확인 방법

구글 로그인이 성공하면:
1. 로그인 모달이 닫힘
2. 우상단에 사용자 프로필 아이콘 표시
3. 환영 메시지 표시
4. 브라우저 콘솔에 성공 로그 출력

---

**💡 팁: 문제가 지속되면 브라우저 캐시를 지우고 다시 시도해보세요!**