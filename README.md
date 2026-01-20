# 🎬 VideoPack OVP - 관리자 콘솔

> Brightcove & Kaltura의 강점을 결합한 현대적이고 사용자 친화적인 OVP 관리 플랫폼

## 📋 프로젝트 소개

VideoPack OVP는 동영상 콘텐츠를 효율적으로 관리하고 배포할 수 있는 통합 관리 시스템입니다.
Brightcove의 직관적인 UI/UX와 Kaltura의 강력한 기능을 결합하여 최고의 사용자 경험을 제공합니다.

## ✨ 주요 기능

### 1. 📊 대시보드
- 주요 지표 한눈에 확인 (총 동영상, 스토리지, 조회수, 대역폭)
- 인코딩 현황 실시간 모니터링
- 최근 활동 피드
- 인기 동영상 Top 5

### 2. 📹 미디어 관리
- **미디어 보관함**: 모든 동영상 원본 및 인코딩 버전 관리
- **그리드/리스트 뷰**: 사용자 선호에 따른 뷰 전환
- **고급 필터**: 상태, 카테고리, 태그 기반 검색
- **일괄 작업**: 여러 동영상 한 번에 관리

### 3. 📦 배포
- **배포 패키지**: 동영상 그룹화 및 배포 관리
- **배포 룰**: 접근 제어 + 플레이어 설정 통합
- **임베드 코드**: 간편한 iframe 코드 생성

### 4. 🎨 제작
- **트랜스코딩**: 화질별 인코딩 프로필 관리
- **자막 & 캡션**: 다국어 자막 지원
- **편집 도구**: 간단한 클리핑 및 썸네일 편집

### 5. 📊 분석
- 동영상별 재생 분석
- 시청자 행동 분석
- 트래픽 및 대역폭 리포트
- 맞춤 리포트 생성

### 6. 💰 수익화
- 광고 삽입 (프리롤/미드롤/포스트롤)
- 구독 모델 관리
- 수익 대시보드

### 7. ⚙️ 설정
- 플레이어 스튜디오
- 인코딩 프로필
- 스토리지 & CDN
- API & Webhooks

### 8. 👥 사용자 관리
- 팀 관리 및 권한 설정
- 활동 로그

### 9. 🔧 시스템
- 자동화 규칙
- 알림 설정
- 라이브 스트리밍

## 🚀 빠른 시작

### 1. 로컬 서버 실행

프로젝트는 정적 파일로 구성되어 있어 간단한 HTTP 서버만 있으면 실행 가능합니다.

#### Python 사용 (Python 3 필요)
```bash
# 프로젝트 폴더에서 실행
python -m http.server 8000

# 브라우저에서 접속
# http://localhost:8000
```

#### Node.js 사용 (npx 필요)
```bash
# 프로젝트 폴더에서 실행
npx serve -p 8000

# 브라우저에서 접속
# http://localhost:8000
```

#### VS Code Live Server 사용
1. VS Code에서 프로젝트 열기
2. Live Server 확장 설치
3. index.html 우클릭 → "Open with Live Server"

### 2. 로그인

개발 모드에서는 인증이 비활성화되어 있어 바로 홈 페이지(대시보드)에 접속됩니다.

로그인 페이지를 테스트하려면:
1. 브라우저에서 `#/login` 접속
2. 개발 모드 빠른 로그인 버튼 사용:
   - **관리자로 로그인**: 모든 기능 접근 가능
   - **편집자로 로그인**: 업로드, 편집 가능
   - **뷰어로 로그인**: 읽기 전용

## 📁 프로젝트 구조

```
wecandeo/
├── index.html                          # 메인 HTML 파일
├── README.md                           # 프로젝트 문서
├── ovp-admin-menu-proposal.md         # 메뉴 구성 제안서
│
└── src/
    ├── css/
    │   └── base.css                    # 전역 스타일
    │
    ├── views/                          # HTML 뷰 (ViewLogic 규칙)
    │   ├── layout/
    │   │   └── default.html            # 기본 레이아웃
    │   ├── home.html                   # 홈 (대시보드)
    │   ├── login.html                  # 로그인 페이지
    │   ├── dashboard/
    │   │   └── index.html              # 대시보드 (구버전)
    │   ├── media/
    │   │   └── library.html            # 미디어 보관함
    │   └── distribution/               # 배포 관련 페이지 (예정)
    │
    └── logic/                          # JavaScript 로직 (ViewLogic 규칙)
        ├── layout/
        │   └── default.js              # 레이아웃 로직
        ├── home.js                     # 홈 로직 (대시보드)
        ├── login.js                    # 로그인 로직
        ├── dashboard/
        │   └── index.js                # 대시보드 로직 (구버전)
        └── media/
            └── library.js              # 미디어 보관함 로직
```

## 🛠 기술 스택

### Frontend
- **Framework**: Vue 3 (CDN)
- **UI Library**: Bootstrap 5
- **Router**: ViewLogic Router
- **Icons**: Bootstrap Icons
- **Charts**: Chart.js

### 개발 원칙
- ✅ ViewLogic 패턴: HTML과 JS 완전 분리
- ✅ Bootstrap 최대 활용: 커스텀 CSS 최소화
- ✅ 반응형 디자인: 모바일/태블릿/데스크톱 대응
- ✅ 접근성: 키보드 네비게이션, ARIA 속성

## 📖 ViewLogic 개발 가이드

### 파일 생성 규칙
```
views/goals/my-goals.html  ↔  logic/goals/my-goals.js
└─ 파일명 동일              └─ 파일명 동일
└─ HTML만                  └─ JavaScript만
```

### 기본 구조
```javascript
// logic/example/page.js
export default {
    layout: 'default',  // 또는 null (레이아웃 없음)

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
            // 데이터 로드 로직
        },

        goToPage() {
            this.navigateTo('/path');
        }
    }
}
```

### 주요 메서드
```javascript
this.navigateTo('/media/library');           // 페이지 이동
this.navigateTo('/media/detail', { id: 5 }); // 파라미터와 함께 이동
this.getParam('id');                         // 파라미터 가져오기
this.$api.get('/api/videos');                // API 호출
```

## 🎯 다음 개발 계획

### Phase 1 (완료)
- ✅ 프로젝트 구조 생성
- ✅ 레이아웃 (사이드바, 헤더)
- ✅ 홈 페이지 (대시보드)
- ✅ 미디어 보관함 (그리드/리스트 뷰)
- ✅ 로그인 페이지

### Phase 2 (진행 예정)
- ⬜ 업로드 페이지
- ⬜ 배포 패키지 관리
- ⬜ 배포 룰 설정
- ⬜ 트랜스코딩 관리
- ⬜ 동영상 상세보기

### Phase 3 (계획)
- ⬜ 분석 페이지
- ⬜ 플레이어 스튜디오
- ⬜ 자동화 규칙
- ⬜ API 연동

## 🔧 개발 모드 설정

### 인증 활성화/비활성화
`index.html` 파일에서 설정:

```javascript
const router = new ViewLogicRouter({
    useAuth: false,  // false: 인증 비활성화 (개발용)
                     // true: 인증 활성화 (배포용)
    // ...
});
```

### 개발 모드 플래그
```javascript
window.DEV_MODE = true;  // 개발 모드 활성화
```

## 📝 CSS 규칙

### Bootstrap 활용
```html
<!-- ✅ 좋은 예: Bootstrap 클래스 사용 -->
<div class="d-flex gap-3 p-4 bg-light rounded-3">
    <button class="btn btn-primary">버튼</button>
</div>

<!-- ❌ 나쁜 예: 인라인 스타일 -->
<div style="display: flex; gap: 1rem; padding: 1.5rem;">
    <button style="background: blue;">버튼</button>
</div>
```

### CSS 변수 사용
```css
/* ✅ 좋은 예 */
color: var(--primary-color);
background: var(--gray-100);

/* ❌ 나쁜 예 */
color: #6366f1;
background: #f3f4f6;
```

## 🤝 기여하기

1. 이슈 생성 또는 기능 제안
2. 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 커밋 (`git commit -m 'Add amazing feature'`)
4. 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 생성해주세요.

---

**Made with ❤️ using ViewLogic Router & Bootstrap 5**
