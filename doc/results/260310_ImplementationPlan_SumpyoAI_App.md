Date: 2026-03-10 15:45:00
Author: Antigravity

# [실행 계획서] 숨표(Sumpyo) AI - 모바일 앱 개발

"모바일 네이티브 환경에서 구현하는 가장 따뜻한 디지털 위로"

## 1. 개요 (Objective)

기존 웹 기반의 '숨표 AI'를 Expo React Native 기반의 모바일 앱으로 전환하며, `NativeWind`와 `Reanimated`를 활용해 고도화된 감성 UI/UX를 제공한다.

## 2. 개발 단계 및 진행 상황 (Phases & Progress)

### Phase 1: 앱 인프라 구축 (Infrastructure) - ✅ 완료

- [x] Expo Router 기반 프로젝트 구조 설계
- [x] NativeWind v4 (Tailwind CSS) 및 테마 컬러 설정
- [x] Babel/Metro 설정 최적화 (NativeWind + Reanimated 충돌 해결)
- [x] TypeScript 엄격 모드 적용 및 타입 안전성 확보

### Phase 2: 감성 인터랙션 UI (UI/UX) - ✅ 완료

- [x] `UI_UX_GUIDE.md`에 기반한 색상 및 타이포그래피 적용
- [x] 메인 화면 Floating 헤더 애니메이션 구현
- [x] 4단계 조제 위저드 UI (고민 -> 스타일 -> 조제 -> 처방) 구축
- [x] `PrescriptionCard` 애니메이션 및 Serif 스타일 적용

### Phase 3: AI 처방 시스템 (AI Logic) - ✅ 완료

- [x] Google Gemini 1.5 Flash 연동 (`@google/generative-ai`)
- [x] 3대 조제 스타일(F/T/W) 멀티 페르소나 프롬프트 구현
- [x] JSON 모드 강제를 통한 처방 데이터 구조화
- [x] API 장애 시 Fallback 처방 로직 추가

### Phase 4: 데이터 영속성 레이어 (Persistence) - ✅ 완료

- [x] Zustand 5.x 기반 전역 상태 관리
- [x] `expo-secure-store` 연동을 통한 암호화된 로컬 저장소 구축
- [x] 처방전 추가/삭제 및 오프라인 약장(History) 기능 완료
- [x] 로컬 데이터 스키마 정의 및 타입 바인딩

### Phase 5: 향후 고도화 (Future) - 🕒 예정

- [ ] 햅틱 피드백(`expo-haptics`) 연동
- [ ] Supabase Auth 기반 소셜 로그인 및 데이터 싱크
- [ ] 인앱 결제(IAP) 모델 도입
- [ ] EAS를 통한 프로덕션 배포 및 모니터링

## 3. 핵심 마일스톤 (Milestones)

1.  **Phase 1-4 통합 완료**: 기본 기능 및 UI 완성 (2026-03-10)
2.  **Internal Beta**: 로컬 환경 테스트 및 UI 피드백 반영
3.  **Production Ready**: 백엔드 연동 및 배포 최적화

## 4. 기술적 해결 과제 (Tech Hurdles)

- NativeWind v4와 Reanimated 4.x 연동 시 발생하는 Babel preset 오류 해결 완료.
- Gemini SDK의 `import.meta` 브라우저 호환성 문제 해결 완료.
