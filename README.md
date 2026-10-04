# Optimize3D Website

GitHub Pages에서 제공하는 국문·영문 정적 홈페이지입니다. 실제 화면은 `index.html`, `en/index.html`을 수정합니다.

## 구조

- `assets/css/home.css`, `assets/js/home.js`: 홈페이지 전용 디자인, 모바일 메뉴와 문의 양식 열기
- `assets/css/styles.css`: 연구실적 페이지 스타일
- `assets/js/main.js`: 기존 연구 페이지 메뉴와 이메일 초안 작성
- `research.html`, `en/research.html`, `assets/js/research-publications.js`: 연구실적과 논문 목록
- `content/home*.json`: 향후 CMS 연동용 초안. 현재 HTML에서 자동으로 읽지 않음

## 디자인과 콘텐츠

대형 이미지, 어두운 배경, 간결한 적용사례 카드로 구성합니다. 홈페이지의 수치형 성능·실적 홍보는 제외하고, 사례 연도와 논문 출처는 유지합니다. 첫 사례는 2026년 대용량 포인트 클라우드 경량 스트리밍입니다.

`assets/visuals/lod-streaming-v2*.svg`는 LOD 점군 스트리밍 개념도입니다. `assets/images/generated/home-support-inspection-paper.webp`는 논문 DOI `10.3744/SNAK.2026.63.3.191`의 원통형 지지대 분리·단면 중심·높이 분석을 바탕으로 생성한 개념 이미지이며 실측 화면으로 표시하지 않습니다. 관련 논문은 합성 기준 배치를 사용해 위치 비교 방법을 검증했습니다. 나머지 생성 이미지에도 개념 이미지 표시를 유지합니다.

문의 양식은 서버 접수 대신 입력 내용을 정리한 이메일 초안을 엽니다. 메일 앱이 없는 사용자를 위해 직접 이메일 주소를 제공합니다. 사이트 루트의 `.nojekyll`을 유지해 저장소 파일을 그대로 배포합니다.
