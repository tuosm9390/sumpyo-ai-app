Date: 2026-03-10 14:15:00
Author: Antigravity

# [추후 개발 계획서] 숨표(Sumpyo) AI - 고도화 및 배포 로드맵 (Gemini Edition)

"마음의 위로를 넘어, 안정적이고 지속 가능한 모바일 서비스로의 도약"

## 1. 현재 진행 상황 요약 (Status Quo)

- **Phase 1-4 기본 뼈대 완성**:
  - Expo Router 기반의 파일 라우팅 및 `NativeWind` v4 테마 시스템 연동 완료 (`Sage Green`, `Warm White`).
  - **Google Gemini (`gemini-1.5-flash`)** 연동을 통한 감성 처방전 생성 로직 구현.
  - `Zustand`와 `expo-secure-store`를 활용한 처방전 로컬 영속성(오프라인 약장) 구현.
  - `Reanimated`를 사용한 부드러운 UI 인터랙션 및 화면 전환 효과 적용.

## 2. 향후 개발 단계 (Upcoming Phases)

### Phase 5: 감성 UX 고도화 및 햅틱 피드백

- **Haptic Experience 적용**:
  - '조제 요청하기' 버튼 클릭 시, 처방전 생성 완료 시, 약장 기록 삭제 시 등 주요 상호작용에 `expo-haptics`를 활용한 미세 진동 피드백 추가.
- **Apothecary(조제 중) 애니메이션 강화**:
  - API 응답을 기다리는 동안 단순 로딩 스피너 대신, '약탕기'나 '허브를 빻는 모션' 등의 감성적인 Lottie 애니메이션 노출.
- **음성 입력 지원 (Optional)**:
  - 텍스트 입력뿐만 아니라 `expo-av`를 활용해 음성으로 고민을 털어놓고 STT(Speech-to-Text)로 변환하는 기능 도입 검토.

### Phase 6: 백엔드 및 인증 시스템 완성

- **Supabase Auth 완벽 연동**:
  - Apple Login (iOS 필수) 및 Google Login 연동.
  - 비회원(로컬 스토리지) 모드에서 회원 가입 시 기존 처방전 데이터를 Supabase DB로 마이그레이션(동기화)하는 로직 구현.
- **사용자별 커스텀 프롬프트 최적화**:
  - 사용자의 과거 처방 기록을 컨텍스트로 활용하여, 더 개인화되고 연속성 있는 AI 처방(RAG 활용) 제공.

### Phase 7: 인앱 결제(IAP) 및 비즈니스 모델 연동

- **결제 시스템 도입**:
  - 하루 무료 처방 횟수 제한(예: 1일 1회) 및 초과 시 '정성스러운 조제권' 유료 구매 유도.
  - `react-native-iap` 또는 `Expo In-App Purchases` 연동을 통한 iOS/Android 스토어 결제 구축.
- **결제 보안(Server-side Verification)**:
  - Supabase Edge Functions를 활용해 앱스토어/플레이스토어 영수증 검증 로직 구현.

### Phase 8: 프로덕션 배포 및 모니터링 (EAS)

- **에러 트래킹 및 로깅**:
  - Sentry 연동을 통해 프론트엔드 및 AI 호출 에러 모니터링 체계 구축.
- **EAS Build 및 제출**:
  - `eas.json` 프로파일 구성 (development, preview, production).
  - TestFlight (iOS) 및 Google Play Console 내부 테스트 트랙에 앱 배포.
  - 양대 마켓 리뷰 가이드라인을 준수하기 위한 최종 검수 (특히 결제 및 소셜 로그인 정책 확인).

## 3. 주요 마일스톤 및 체크리스트

- [ ] `expo-haptics`를 주요 버튼 및 인터랙션에 연동.
- [ ] Supabase Auth (Apple / Google) 소셜 로그인 구현.
- [ ] 게스트 모드 로컬 데이터를 계정 생성 시 클라우드로 병합.
- [ ] 인앱 결제 프로세스 기획 및 개발 환경(Sandbox) 테스트.
- [ ] Sentry 연동 및 프로덕션 환경 로깅 설정.
- [ ] EAS를 통한 양대 마켓 스토어 심사 제출.

## 4. 기술적 주의사항 (Technical Considerations)

- **API Key 보안**: **Gemini API Key**를 현재 클라이언트 사이드에서 직접 사용할 경우 키 유출 위험이 있으므로, 최종 프로덕션에서는 **Supabase Edge Functions**를 통해 백엔드에서 호출하도록 구조를 반드시 리팩토링해야 합니다.
- **오프라인-온라인 동기화**: `Zustand` 로컬 스토리지와 Supabase DB 간의 데이터 동기화 시 충돌(Conflict)이 발생하지 않도록 타임스탬프 기준의 명확한 병합 전략이 필요합니다.
