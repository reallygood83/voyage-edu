# 🔥 Firestore 데이터베이스 생성 가이드

## 🚨 현재 문제 상황
- **오류**: `net::ERR_ABORTED https://firestore.googleapis.com/...`
- **원인**: Firestore 데이터베이스가 아직 생성되지 않음
- **해결**: Firebase 콘솔에서 수동으로 데이터베이스 생성 필요

## ✅ 완료된 작업
1. ✅ Firebase 프로젝트 연결 확인
2. ✅ Firebase SDK 초기화 성공
3. ✅ Firestore 보안 규칙 배포 완료
4. ✅ 환경변수 설정 확인

## 🎯 해결 방법

### 1단계: Firebase 콘솔에서 Firestore 데이터베이스 생성 (필수!)

1. **Firebase 콘솔 접속**
   - [Firebase 콘솔](https://console.firebase.google.com/project/voyage-edu/firestore) 접속
   - 프로젝트: `voyage-edu`

2. **Firestore Database 생성**
   - 좌측 메뉴에서 "Firestore Database" 클릭
   - "데이터베이스 만들기" 버튼 클릭
   - **모드 선택**: "테스트 모드에서 시작" 선택 (개발용)
   - **위치 선택**: `asia-northeast3 (Seoul)` 선택 (권장)
   - "완료" 버튼 클릭

3. **데이터베이스 생성 확인**
   - 데이터베이스가 생성되면 빈 컬렉션 목록이 표시됨
   - 상태가 "활성"으로 표시되는지 확인

### 2단계: 테스트 데이터 추가 (선택사항)

1. **테스트 컬렉션 생성**
   - "컬렉션 시작" 클릭
   - 컬렉션 ID: `test`
   - 문서 ID: `test-doc`
   - 필드: `message` (문자열) = `"Hello Firestore!"`

### 3단계: 보안 규칙 확인

현재 설정된 보안 규칙 (개발용 - 임시):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 임시로 모든 인증된 사용자에게 읽기/쓰기 권한 부여 (개발 중)
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🔍 문제 해결 확인

### 브라우저 콘솔에서 확인할 메시지:
```
🔥 Firebase App Initialized: SUCCESS
🔥 Firebase Auth Instance: SUCCESS
🔥 Firebase Firestore Instance: object
🔥 Testing Firestore connection...
🔥 Firestore connection: SUCCESS
```

### 오류가 사라져야 할 메시지:
- ❌ `net::ERR_ABORTED https://firestore.googleapis.com/...`

## 📋 체크리스트

- [ ] Firebase 콘솔에서 Firestore 데이터베이스 생성
- [ ] 데이터베이스 위치를 `asia-northeast3 (Seoul)`로 설정
- [ ] 테스트 모드로 시작 (개발용)
- [ ] 브라우저에서 오류 메시지 사라짐 확인
- [ ] 개발자 도구에서 Firestore 연결 성공 메시지 확인

## 🚀 다음 단계

데이터베이스 생성 후:
1. 브라우저 새로고침
2. 개발자 도구 콘솔에서 오류 확인
3. 구글 로그인 테스트
4. 데이터 저장/읽기 테스트

## 💡 참고사항

- **무료 플랜**: Spark 플랜으로도 Firestore 사용 가능
- **결제 활성화**: CLI로 데이터베이스 생성 시에만 필요
- **콘솔 생성**: 무료로 가능
- **위치 변경**: 데이터베이스 생성 후 변경 불가능

## 🆘 추가 지원

문제가 지속되면:
1. Firebase 프로젝트 설정 재확인
2. 브라우저 캐시 삭제
3. 시크릿 모드에서 테스트
4. Firebase 상태 페이지 확인: https://status.firebase.google.com/