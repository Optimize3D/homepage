const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const year = document.querySelector("#year");
const emailButtons = document.querySelectorAll("[data-email-button]");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (emailButtons.length > 0) {
  const emailCodePoints = [111, 112, 116, 105, 109, 105, 122, 101, 51, 100, 46, 120, 121, 122, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109];
  const emailAddress = () => String.fromCharCode(...emailCodePoints);
  const emailBody = (locale) => {
    if (locale.startsWith("en")) {
      return [
        "Hello Optimize3D,",
        "",
        "I would like to discuss a pilot or technical inquiry.",
        "Please review the information below.",
        "",
        "1. Company / organization:",
        "2. Name / role:",
        "3. Contact number:",
        "4. Target site or object: ship block / cargo hold / mold / piping / jig / robot cell / other",
        "5. Available data: point cloud / CAD / photos / drawings / inspection criteria",
        "6. Problem to solve:",
        "7. Desired deliverables: inspection report / deviation map / scan-to-CAD / AI analysis / jig concept / robot simulation data",
        "8. Schedule or notes:",
        "",
        "If available, I will attach sample data or reference images."
      ].join("\n");
    }

    return [
      "안녕하세요, Optimize3D 파일럿/기술 상담을 문의드립니다.",
      "아래 항목 중 가능한 내용만 작성합니다.",
      "",
      "1. 회사/기관:",
      "2. 성함/직책:",
      "3. 연락처:",
      "4. 적용 현장 또는 대상: 선박블록 / 카고홀드 / 몰드 / 배관 / 지그 / 로봇셀 / 기타",
      "5. 보유 데이터: 포인트클라우드 / CAD / 사진 / 도면 / 검사 기준",
      "6. 해결하고 싶은 문제:",
      "7. 희망 결과물: 검사 리포트 / 편차맵 / 역설계 CAD / AI 분석 / 지그 설계 / 로봇 시뮬레이션 데이터",
      "8. 희망 일정 또는 기타:",
      "",
      "가능하다면 샘플 데이터나 참고 이미지를 함께 첨부하겠습니다."
    ].join("\n");
  };

  emailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const locale = button.dataset.emailLocale || document.documentElement.lang || "ko";
      const subject = encodeURIComponent(button.dataset.emailSubject || "Optimize3D 파일럿 문의");
      const body = encodeURIComponent(emailBody(locale));
      window.location.href = `mailto:${emailAddress()}?subject=${subject}&body=${body}`;
    });
  });
}
