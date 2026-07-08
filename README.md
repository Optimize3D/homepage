# Optimize3D Landing v3

정적 사이트입니다. 브라우저에서 `index.html`을 바로 열 수 있고, 영문판은 `en/index.html`에서 확인할 수 있습니다.

## Structure

- `index.html`: 실제 렌더링되는 정적 페이지
- `research.html`: OPTLab 연구실적 요약과 대표 연구 사례 페이지
- `en/index.html`, `en/research.html`: 영문 홈과 연구실적 페이지
- `assets/brand/`: 단순화한 Optimize3D SVG 워드마크, 심볼, favicon
- `assets/images/`: 렌더링에 쓰는 새 생성 이미지 4개와 이전 참조 이미지 보관본
- `assets/css/styles.css`: 전체 스타일
- `assets/js/main.js`: 모바일 메뉴
- `assets/js/research-publications.js`: 연구실 논문 목록 렌더링 데이터
- `content/home.json`, `content/research.json`: 향후 CMS/빌드 연동용 국문 콘텐츠 원본 초안
- `content/home.en.json`, `content/research.en.json`: 향후 CMS/빌드 연동용 영문 콘텐츠 원본 초안

## Design Direction

- 첫 화면은 낮고 간결한 B2B 기술기업형 히어로로 구성했습니다.
- 로고는 복잡한 큐브/점군 마크를 제거하고 `O3 + Optimize3D` 워드마크로 단순화했습니다.
- 본문은 연구실 소개가 아니라 사업영역, AI 기술, 파일럿 프로세스, 적용분야 순서로 구성했습니다.
- 포인트클라우드 3차원 객체인식, 공간추론, AI 품질판단을 핵심 기술 문구로 포함했습니다.
- 연구실 배경은 하단 기술근거 섹션에 신뢰 요소로만 배치했습니다.
- 문의 이메일은 HTML에 원문 주소를 노출하지 않고, 클릭 시 JavaScript에서 조합해 메일 앱을 여는 방식으로 처리했습니다.
- Technical Backbone에서 별도 연구실적 페이지로 이동할 수 있게 구성했습니다.
- 연구실적 페이지에는 OPTLab 연구실 소개를 추가했고, 주요 연구실적 표는 연구실 학술논문 48편으로 확장했습니다.
- 논문 링크는 제목 기반 Google Scholar 검색 링크로 연결했습니다.

## GitHub Pages

- GitHub Pages에서 Jekyll 변환 없이 그대로 서빙되도록 `.nojekyll`을 포함했습니다.
- 사이트 루트는 이 폴더 자체입니다. 저장소 루트에 `index.html`, `assets/`, `content/`, `en/`, `research.html`이 오도록 올리면 됩니다.
- 문의 메일 주소는 `assets/js/main.js`에서 문자 코드로 조합됩니다. 공개 HTML에는 원문 이메일을 노출하지 않습니다.
