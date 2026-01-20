# CLAUDE.md - VideoPack OVP 프로젝트 컨텍스트

> Claude가 이 프로젝트를 이해하고 작업하는 데 필요한 핵심 정보

## 프로젝트 개요

**VideoPack OVP**는 Brightcove와 Kaltura의 장점을 결합한 현대적인 OVP(Online Video Platform) 관리자 콘솔입니다.

### 핵심 목표
- Brightcove의 직관적인 UI/UX
- Kaltura의 강력한 기능
- 더 쉬운 배포 개념 (배포 패키지 + 배포 룰)

### 기술 스택
- **Frontend**: Vue 3 (CDN), Bootstrap 5, ViewLogic Router
- **UI**: Bootstrap Icons, Chart.js
- **패턴**: ViewLogic (HTML/JS 완전 분리)
- **라우팅**: Hash-based routing

## 프로젝트 구조

```
wecandeo/
├── index.html                  # 진입점 (ViewLogic Router 초기화)
├── README.md                   # 사용자용 문서
├── GUIDE.md                    # ViewLogic 개발 가이드
├── ovp-admin-menu-proposal.md  # 메뉴 구성 제안서 (Brightcove/Kaltura 비교)
├── CLAUDE.md                   # 이 파일 (Claude용 컨텍스트)
│
├── css/
│   └── base.css                # 전역 스타일 (Bootstrap 최대 활용)
│
└── src/
    ├── views/                  # HTML 뷰 (ViewLogic 규칙)
    │   ├── layout/
    │   │   └── default.html    # 기본 레이아웃 (헤더, 사이드바)
    │   ├── home.html           # 홈 대시보드
    │   ├── login.html          # 로그인 페이지
    │   └── media/
    │       └── library.html    # 미디어 보관함
    │
    └── logic/                  # JavaScript 로직 (ViewLogic 규칙)
        ├── layout/
        │   └── default.js      # 레이아웃 로직
        ├── home.js             # 홈 로직
        ├── login.js            # 로그인 로직
        └── media/
            └── library.js      # 미디어 보관함 로직
```

## ViewLogic 패턴 필수 규칙

### 1. 파일 구조
- HTML과 JS는 **완전히 분리**
- 파일명과 경로는 **정확히 일치**해야 함
  ```
  views/goals/my-goals.html  ↔  logic/goals/my-goals.js
  views/media/library.html   ↔  logic/media/library.js
  ```

### 2. 기본 구조
```javascript
// logic/example/page.js
export default {
    layout: 'default',  // 레이아웃 사용 (null이면 레이아웃 없음)

    data() {
        return {
            items: [],
            loading: false
        }
    },

    async mounted() {
        await this.loadData();
    },

    methods: {
        async loadData() {
            // 데이터 로드
        },

        goToPage() {
            this.navigateTo('/path');
        }
    }
}
```

### 3. 주요 메서드
```javascript
this.navigateTo('/media/library');           // 페이지 이동
this.navigateTo('/media/detail', { id: 5 }); // 파라미터와 함께 이동
this.getParam('id');                         // 파라미터 가져오기
```

## CSS 개발 원칙

### Bootstrap 최대 활용
```html
<!-- ✅ 좋은 예: Bootstrap 클래스 사용 -->
<div class="d-flex gap-3 p-4 bg-light rounded-3">
    <button class="btn btn-primary">버튼</button>
</div>

<!-- ❌ 나쁜 예: 인라인 스타일 -->
<div style="display: flex; gap: 1rem;">
    <button style="background: blue;">버튼</button>
</div>
```

### CSS 변수 사용
```css
/* base.css에 정의된 변수 사용 */
color: var(--primary-color);
background: var(--gray-100);
```

## 핵심 개념

### 1. 워크플로우
```
업로드 → 미디어 보관함 → 제작(인코딩) → 배포 패키지 → 배포 룰 → 퍼블리시
```

### 2. 배포 룰 (핵심 차별화)
하나의 "배포 룰" = 보안 설정 + 플레이어 설정 + 외부 배포

**예시:**
```
배포 룰: "공개용"
├── 보안: 도메인 제한 없음
├── 플레이어: 공개 플레이어 스킨
└── 외부: YouTube 자동 동기화

배포 룰: "내부용"
├── 보안: 회사 IP만 허용
├── 플레이어: 로고 워터마크
└── 외부: 배포 안 함
```

### 3. 메뉴 구조 (9개 섹션)
1. **대시보드** - 주요 지표, 인코딩 현황, 최근 활동
2. **미디어** - 보관함, 업로드, 폴더
3. **배포** - 패키지, 배포 룰, 임베드 코드
4. **제작** - 트랜스코딩, 자막, 편집
5. **분석** - 동영상, 시청자, 트래픽 분석
6. **수익화** - 광고, 구독 모델
7. **설정** - 플레이어, 인코딩, CDN, API
8. **사용자** - 팀 관리, 권한
9. **시스템** - 자동화, 알림, 라이브

## 현재 구현 상태 (Phase 1 완료)

### ✅ 완료된 기능
1. **레이아웃** ([src/views/layout/default.html](src/views/layout/default.html))
   - 반응형 헤더 (검색, 업로드 버튼, 사용자 메뉴)
   - 아코디언 사이드바 (9개 메뉴 섹션)
   - 모바일 대응

2. **홈 대시보드** ([src/views/home.html](src/views/home.html))
   - 주요 지표 카드 4개 (동영상, 스토리지, 조회수, 대역폭)
   - 인코딩 현황 (진행 중 3개 표시)
   - 최근 활동 피드
   - 인기 동영상 Top 5

3. **미디어 보관함** ([src/views/media/library.html](src/views/media/library.html))
   - 그리드/리스트 뷰 전환
   - 고급 필터 (상태, 카테고리, 정렬)
   - 일괄 작업 (선택, 삭제, 태그, 이동)
   - 인코딩 상태 표시
   - 페이지네이션

4. **로그인 페이지** ([src/views/login.html](src/views/login.html))
   - 개발 모드 빠른 로그인 (관리자/편집자/뷰어)
   - 역할 기반 접근 제어 (RBAC)

### 개발 모드 설정
- `index.html`에서 `useAuth: false`로 설정
- `window.DEV_MODE = true`
- 로컬 서버 필요 (Python HTTP 서버, npx serve, VS Code Live Server)

## 다음 작업 계획 (Phase 2)

### 우선순위 높음
1. **업로드 페이지** ([src/views/media/upload.html](src/views/media/upload.html))
   - 드래그 앤 드롭 UI
   - 진행 상태 표시
   - 인코딩 옵션 선택 (자동/선택/나중에)
   - 메타데이터 입력

2. **배포 패키지** ([src/views/distribution/packages.html](src/views/distribution/packages.html))
   - 패키지 생성/편집/삭제
   - 동영상 추가/제거
   - 배포 상태 관리

3. **배포 룰** ([src/views/distribution/rules.html](src/views/distribution/rules.html))
   - 룰 프리셋 관리
   - 보안 설정 UI (도메인, IP, Geo-blocking)
   - 플레이어 선택

4. **트랜스코딩 관리** ([src/views/production/transcoding.html](src/views/production/transcoding.html))
   - 인코딩 큐 모니터링
   - 프로필 관리
   - 우선순위 설정

### 우선순위 중간
- 동영상 상세보기
- 임베드 코드 생성기
- 분석 페이지 (기본)

## 코딩 가이드라인

### 새 페이지 추가 시
1. HTML과 JS 파일 생성 (파일명과 경로 일치)
2. Logic 파일에 `layout: 'default'` 설정
3. Bootstrap 클래스 최대 활용
4. 반응형 고려 (모바일/태블릿/데스크톱)
5. 레이아웃의 사이드바 메뉴에 링크 추가

### API 연동 시 (향후)
```javascript
// logic 파일의 methods에서
async loadData() {
    try {
        const response = await this.$api.get('/api/videos');
        this.items = response.data;
    } catch (error) {
        console.error('데이터 로드 실패:', error);
    }
}
```

### 상태 관리
- 간단한 상태는 `data()`에 정의
- 복잡한 상태는 `computed` 활용
- 전역 상태는 `window` 객체 사용 (예: `window.getCurrentUser()`)

## 참고 문서

- **README.md**: 사용자 가이드, 빠른 시작
- **GUIDE.md**: ViewLogic 패턴 상세 설명
- **ovp-admin-menu-proposal.md**: 메뉴 구조, Brightcove/Kaltura 비교 분석
- [ViewLogic 공식 문서](https://viewlogic.io) (외부)

## 중요 참고사항

### 파일 경로
- HTML: `src/views/` 아래
- JS: `src/logic/` 아래
- CSS: `css/` (루트의 css 폴더, src 아님!)

### 라우팅
- 해시 라우팅: `#/home`, `#/media/library`
- 레이아웃에서 사이드바 링크는 `#/경로` 형식
- Logic에서 이동은 `this.navigateTo('/경로')`

### 사용자 역할
```javascript
window.USER_ROLES.ADMIN    // 슈퍼 관리자
window.USER_ROLES.EDITOR   // 편집자
window.USER_ROLES.VIEWER   // 뷰어
window.USER_ROLES.ANALYST  // 분석가

window.getCurrentUser()    // 현재 사용자 정보
window.isAdmin()          // 관리자 확인
window.canEdit()          // 편집 권한 확인
```

## 주의사항

1. **절대 인라인 스타일 사용 금지** - Bootstrap 클래스 사용
2. **ViewLogic 파일명 규칙 엄수** - 경로와 파일명 정확히 일치
3. **반응형 필수** - 모든 페이지 모바일 대응
4. **개발 모드 유지** - `useAuth: false` (배포 시에만 true)
5. **커밋 메시지에 Claude Code 서명 포함** - Git 커밋 시 자동 추가

---

**마지막 업데이트**: 2026-01-20
**현재 Phase**: Phase 1 완료, Phase 2 준비 중
