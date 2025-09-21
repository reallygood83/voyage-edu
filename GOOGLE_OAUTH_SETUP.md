# 🔐 Google OAuth 설정 완벽 가이드

## 📋 현재 상황
- Firebase 프로젝트: `voyage-edu`
- 로컬 도메인: `localhost:3001`
- 배포 도메인: `https://voyage-edu-two.vercel.app/`
- Google OAuth 클라이언트 ID 설정 필요

## 🚀 Google Cloud Console OAuth 설정

### 1단계: Google Cloud Console 접속
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트 선택: **voyage-edu**
3. 상단 프로젝트 선택기에서 올바른 프로젝트인지 확인

### 2단계: API 및 서비스 설정
1. 좌측 메뉴에서 **API 및 서비스** 클릭
2. **사용자 인증 정보** 선택

### 3단계: OAuth 2.0 클라이언트 ID 확인/생성

#### 기존 클라이언트 ID가 있는 경우:
1. **OAuth 2.0 클라이언트 ID** 섹션에서 기존 클라이언트 찾기
2. 클라이언트 이름 클릭하여 편집

#### 새 클라이언트 ID 생성이 필요한 경우:
1. **+ 사용자 인증 정보 만들기** 클릭
2. **OAuth 클라이언트 ID** 선택
3. 애플리케이션 유형: **웹 애플리케이션** 선택
4. 이름: `Voyage Edu Web Client` 입력

### 4단계: 승인된 JavaScript 원본 설정
**승인된 JavaScript 원본**에 다음 URL들을 추가:

```
http://localhost:3001
https://localhost:3001
https://voyage-edu-two.vercel.app
https://voyage-edu.firebaseapp.com
```

#### 추가 방법:
1. **승인된 JavaScript 원본** 섹션에서 **+ URI 추가** 클릭
2. 각 URL을 하나씩 입력
3. **Enter** 키로 확인

### 5단계: 승인된 리디렉션 URI 설정
**승인된 리디렉션 URI**에 다음 URL들을 추가:

```
http://localhost:3001/__/auth/handler
https://localhost:3001/__/auth/handler
https://voyage-edu-two.vercel.app/__/auth/handler
https://voyage-edu.firebaseapp.com/__/auth/handler
```

#### 추가 방법:
1. **승인된 리디렉션 URI** 섹션에서 **+ URI 추가** 클릭
2. 각 URL을 하나씩 입력
3. **Enter** 키로 확인

### 6단계: 설정 저장
1. **저장** 버튼 클릭
2. 클라이언트 ID와 클라이언트 보안 비밀번호 확인
3. 필요시 복사하여 안전한 곳에 보관

## 🔧 OAuth 동의 화면 설정

### 1단계: OAuth 동의 화면 접속
1. **API 및 서비스** > **OAuth 동의 화면** 클릭

### 2단계: 기본 정보 확인
다음 정보가 올바르게 설정되어 있는지 확인:

```
앱 이름: Voyage Edu
사용자 지원 이메일: [본인 이메일]
앱 로고: (선택사항)
앱 도메인:
  - 홈페이지: https://voyage-edu-two.vercel.app
  - 개인정보처리방침: https://voyage-edu-two.vercel.app/privacy
  - 서비스 약관: https://voyage-edu-two.vercel.app/terms
개발자 연락처 정보: [본인 이메일]
```

### 3단계: 승인된 도메인 추가
**승인된 도메인** 섹션에 다음 도메인들을 추가:

```
vercel.app
voyage-edu-two.vercel.app
firebaseapp.com
voyage-edu.firebaseapp.com
```

### 4단계: 범위 설정
**범위** 섹션에서 다음 범위가 포함되어 있는지 확인:

```
../auth/userinfo.email
../auth/userinfo.profile
openid
```

### 5단계: 테스트 사용자 (개발 중인 경우)
앱이 아직 게시되지 않은 경우:
1. **테스트 사용자** 섹션에서 **+ 사용자 추가** 클릭
2. 테스트할 Google 계정 이메일 추가

## 🔍 Firebase Authentication 연동 확인

### 1단계: Firebase Console 접속
1. [Firebase Console](https://console.firebase.google.com/project/voyage-edu) 접속
2. **Authentication** > **Sign-in method** 이동

### 2단계: Google 제공업체 설정 확인
1. **Google** 제공업체 클릭
2. 다음 정보 확인:
   ```
   사용 설정: ✅ 활성화
   웹 SDK 구성:
     - 웹 클라이언트 ID: [Google Cloud Console의 클라이언트 ID와 일치]
     - 웹 클라이언트 보안 비밀번호: [설정됨]
   ```

### 3단계: 프로젝트 설정 확인
```
프로젝트 공개용 이름: Voyage Edu
프로젝트 지원 이메일: [본인 이메일]
```

## 🧪 설정 테스트

### 1단계: 로컬 환경 테스트
1. `http://localhost:3001` 접속
2. 개발자 도구 (F12) 열기
3. **Console** 탭에서 오류 확인
4. Google 로그인 버튼 클릭
5. 팝업 창이 정상적으로 열리는지 확인

### 2단계: 배포 환경 테스트
1. `https://voyage-edu-two.vercel.app/` 접속
2. 개발자 도구 (F12) 열기
3. **Console** 탭에서 Firebase 초기화 로그 확인
4. Google 로그인 버튼 클릭
5. OAuth 동의 화면이 정상적으로 표시되는지 확인

### 3단계: 네트워크 요청 확인
1. 개발자 도구 **Network** 탭 열기
2. Google 로그인 시도
3. 다음 요청들이 성공하는지 확인:
   - `accounts.google.com` 관련 요청
   - `securetoken.googleapis.com` 관련 요청
   - Firebase Auth 관련 요청

## 🚨 일반적인 오류와 해결방법

### 오류 1: `redirect_uri_mismatch`
```
Error 400: redirect_uri_mismatch
```
**해결방법:**
- Google Cloud Console > OAuth 클라이언트 ID > 승인된 리디렉션 URI 확인
- `https://voyage-edu-two.vercel.app/__/auth/handler` 추가

### 오류 2: `origin_mismatch`
```
Error 400: origin_mismatch
```
**해결방법:**
- Google Cloud Console > OAuth 클라이언트 ID > 승인된 JavaScript 원본 확인
- `https://voyage-edu-two.vercel.app` 추가

### 오류 3: `access_denied`
```
Error: access_denied
```
**해결방법:**
- OAuth 동의 화면 > 게시 상태 확인
- 테스트 사용자에 본인 계정 추가

### 오류 4: `popup_closed_by_user`
```
Firebase: Error (auth/popup-closed-by-user)
```
**해결방법:**
- 정상적인 사용자 행동
- 팝업 차단 설정 확인
- 다시 시도

## ✅ 설정 완료 체크리스트

### Google Cloud Console
- [ ] OAuth 2.0 클라이언트 ID 생성/확인
- [ ] 승인된 JavaScript 원본 설정 (4개 URL)
- [ ] 승인된 리디렉션 URI 설정 (4개 URL)
- [ ] OAuth 동의 화면 기본 정보 설정
- [ ] 승인된 도메인 추가 (4개 도메인)
- [ ] 필요한 범위 설정

### Firebase Console
- [ ] Google 제공업체 활성화
- [ ] 웹 클라이언트 ID 연동 확인
- [ ] 프로젝트 공개용 이름 설정
- [ ] 지원 이메일 설정

### 테스트
- [ ] 로컬 환경 Google 로그인 성공
- [ ] 배포 환경 Google 로그인 성공
- [ ] 오류 메시지 없음
- [ ] 사용자 정보 정상 표시

## 🔗 유용한 링크

- [Google Cloud Console - 사용자 인증 정보](https://console.cloud.google.com/apis/credentials?project=voyage-edu)
- [Google Cloud Console - OAuth 동의 화면](https://console.cloud.google.com/apis/credentials/consent?project=voyage-edu)
- [Firebase Console - Authentication](https://console.firebase.google.com/project/voyage-edu/authentication/providers)
- [배포된 사이트](https://voyage-edu-two.vercel.app/)

---

💡 **중요**: OAuth 설정 변경 후 5-10분 정도 기다린 후 테스트하세요. Google 서버에서 설정이 전파되는 시간이 필요합니다.