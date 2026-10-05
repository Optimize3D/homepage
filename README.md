# Optimize3D Website

GitHub Pages에서 제공하는 국문·영문 정적 홈페이지입니다. 실제 화면은 `index.html`, `en/index.html`을 수정합니다.

## 구조

- `assets/css/home.css`: 메인·연구실적 공통 색상, 글꼴, 내비게이션과 버튼
- `assets/css/research.css`: 연구실적 페이지 카드와 논문 목록 레이아웃
- `assets/js/home.js`: 메인·연구실적 공통 모바일 메뉴
- `assets/js/main.js`: 메인 문의 이메일 초안 작성
- `research.html`, `en/research.html`, `assets/js/research-publications.js`: 연구실적과 논문 목록
- `content/home*.json`: 향후 CMS 연동용 초안. 현재 HTML에서 자동으로 읽지 않음

## 디자인과 콘텐츠

대형 이미지, 어두운 배경, 간결한 적용사례 카드로 구성합니다. 홈페이지의 수치형 성능·실적 홍보는 제외하고, 사례 연도와 논문 출처는 유지합니다. 첫 사례는 2026년 대용량 포인트 클라우드 경량 스트리밍입니다.

`assets/visuals/lod-streaming-v2*.svg`는 LOD 점군 스트리밍 개념도입니다. `assets/images/generated/home-support-inspection-paper.webp`는 논문 DOI `10.3744/SNAK.2026.63.3.191`의 원통형 지지대 분리·단면 중심·높이 분석을 바탕으로 생성한 개념 이미지이며 실측 화면으로 표시하지 않습니다. 관련 논문은 합성 기준 배치를 사용해 위치 비교 방법을 검증했습니다. 나머지 생성 이미지에도 개념 이미지 표시를 유지합니다.

문의 양식은 서버 접수 대신 입력 내용을 정리한 이메일 초안을 엽니다. 메일 앱이 없는 사용자를 위해 직접 이메일 주소를 제공합니다. 사이트 루트의 `.nojekyll`을 유지해 저장소 파일을 그대로 배포합니다.


## 루트 주소와 검색 설정

배포 저장소는 `Optimize3D/optimize3d.github.io`, 배포 소스는 `main` 브랜치의 루트입니다. 대표 주소는 `https://optimize3d.github.io/`이며 영문 페이지는 `/en/`, 연구실적은 `/research.html`과 `/en/research.html`입니다.

네 페이지의 canonical, hreflang, Open Graph, 구조화 데이터와 사이트맵은 새 주소를 사용합니다. `/robots.txt`에서 크롤링을 허용하고 루트 사이트맵을 안내합니다. Google 소유권 확인 HTML 파일은 유지합니다.

기존 `/homepage/`, `/homepage/en/`, `/homepage/research.html`, `/homepage/en/research.html`에는 즉시 meta refresh 이동 페이지를 유지합니다. JavaScript로 쿼리 문자열과 섹션 링크도 보존합니다. GitHub Pages에서는 서버의 HTTP 301을 지정할 수 없으므로 HTML 방식이며, Google은 0초 meta refresh를 영구 이동 신호로 해석합니다. 기존 Google 확인 파일과 사이트맵 경로도 유지합니다. 이전 `/homepage/sitemap.xml`에는 해당 경로 아래의 기존 네 주소를 담아 이동 페이지의 재수집을 돕고, 루트 사이트맵에는 새 주소만 담습니다. 이전 주소는 크롤링을 막거나 noindex 처리하지 않습니다.

전환 후 Search Console에서 `https://optimize3d.github.io/` URL 접두어 속성을 확인하고 `https://optimize3d.github.io/sitemap.xml`을 제출합니다. 새 주소의 URL 검사를 통해 색인 생성을 요청합니다. 같은 호스트 안에서 경로만 바꾸는 이전이므로 Search Console의 주소 변경 도구는 사용하지 않습니다. 검색 결과의 이전 주소가 교체되는 시점과 순위는 Google의 재수집·색인 처리에 따릅니다.

네이버 URL 검사에 맞춰 국문·영문 페이지의 검색 설명과 Open Graph 설명을 80자 이내로 유지합니다. 자세한 서비스와 산업별 적용 내용은 본문에 남깁니다. 네이버 소유확인 HTML 파일은 저장소 루트에 유지합니다.

연구실적 페이지의 대표 적용 사례 첫 항목은 2026년 대형 선박 블록 객체 탐지·세그멘테이션 기술 적용성 검증입니다. 삼성중공업 위탁연구임을 소개합니다. 첨부 킥오프 연구개발계획서의 데이터셋 구축, AI 모델 적용과 시각화 범위를 요약하며, 완료 성과나 정량 성능으로 표현하지 않습니다. 원본 계획서와 내부 화면은 홈페이지에 공개하지 않습니다.
