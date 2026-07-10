const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const year = document.querySelector("#year");
const emailButtons = document.querySelectorAll("[data-email-button]");
const pipelines = document.querySelectorAll("[data-pipeline]");
const tabGroups = document.querySelectorAll("[data-tab-group]");
const emailCategorySelect = document.querySelector("[data-email-category-select]");
const contactCategoryLinks = document.querySelectorAll("[data-contact-category]");

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

pipelines.forEach((pipeline) => {
  const steps = [...pipeline.querySelectorAll("[data-pipeline-step]")];
  const title = pipeline.querySelector("[data-pipeline-visual-title]");
  const body = pipeline.querySelector("[data-pipeline-visual-body]");
  const output = pipeline.querySelector("[data-pipeline-visual-output]");
  const image = pipeline.querySelector("img[data-pipeline-image]");
  const caption = pipeline.querySelector("[data-pipeline-visual-caption]");
  const stagePanel = pipeline.querySelector("[role='tabpanel']");

  const activateStep = (step) => {
    steps.forEach((item) => item.classList.toggle("is-active", item === step));
    steps.forEach((item) => item.setAttribute("aria-selected", String(item === step)));
    steps.forEach((item) => { item.tabIndex = item === step ? 0 : -1; });
    if (stagePanel && step.id) stagePanel.setAttribute("aria-labelledby", step.id);
    if (title) title.textContent = step.dataset.pipelineTitle || "";
    if (body) body.textContent = step.dataset.pipelineBody || "";
    if (output) output.textContent = step.dataset.pipelineOutput || "";
    if (caption) caption.textContent = step.dataset.pipelineCaption || "";

    if (image && step.dataset.pipelineImage) {
      image.src = step.dataset.pipelineImage;
      image.alt = step.dataset.pipelineAlt || "";
    }
  };

  steps.forEach((step, index) => {
    step.addEventListener("click", () => activateStep(step));
    step.addEventListener("keydown", (event) => {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % steps.length;
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + steps.length) % steps.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = steps.length - 1;

      steps[nextIndex].focus();
      activateStep(steps[nextIndex]);
    });
  });

  if (steps[0]) activateStep(steps[0]);
});

tabGroups.forEach((group) => {
  const buttons = [...group.querySelectorAll("[data-tab-target]")];
  const panels = buttons
    .map((button) => document.getElementById(button.dataset.tabTarget))
    .filter(Boolean);

  const activateTab = (button) => {
    const target = document.getElementById(button.dataset.tabTarget);
    if (!target) return;

    buttons.forEach((item) => item.setAttribute("aria-selected", String(item === button)));
    panels.forEach((panel) => {
      const isActive = panel === target;
      panel.hidden = !isActive;
      panel.classList.toggle("is-active", isActive);
    });
  };

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => activateTab(button));
    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if (event.key === "ArrowRight") nextIndex = (index + 1) % buttons.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = buttons.length - 1;

      buttons[nextIndex].focus();
      activateTab(buttons[nextIndex]);
    });
  });

  const selected = buttons.find((button) => button.getAttribute("aria-selected") === "true") || buttons[0];
  if (selected) activateTab(selected);
});

if (emailButtons.length > 0) {
  const emailCodePoints = [111, 112, 116, 105, 109, 105, 122, 101, 51, 100, 46, 120, 121, 122, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109];
  const emailAddress = () => String.fromCharCode(...emailCodePoints);
  const inquiryDate = () => {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).formatToParts(new Date());
    const part = (type) => parts.find((item) => item.type === type)?.value || "";

    return `${part("year")}-${part("month")}-${part("day")}`;
  };
  const selectedCategory = (locale) => {
    const selected = emailCategorySelect?.selectedOptions?.[0];
    if (selected?.value) return selected.value;

    return locale.startsWith("en") ? "General Technical Consultation" : "일반 기술상담";
  };
  const emailSubject = (button, locale, date, category) => {
    const fallback = locale.startsWith("en") ? "Optimize3D pilot inquiry" : "Optimize3D 파일럿 문의";
    const baseSubject = button.dataset.emailSubject || fallback;

    return `[${date}][${category}] ${baseSubject}`;
  };
  const emailBody = (locale, date, category) => {
    if (locale.startsWith("en")) {
      return [
        "Hello Optimize3D,",
        "",
        "I would like to discuss a pilot or technical inquiry.",
        "Please review the information below.",
        "",
        `Inquiry date: ${date}`,
        `Inquiry area: ${category}`,
        "",
        "1. Company / organization:",
        "2. Name / role:",
        "3. Contact number:",
        "4. Target site or object: ship block / cargo hold / mold / piping / jig / robot cell / other",
        "5. Available data: point cloud / CAD / photos / drawings / inspection criteria",
        "6. Problem to solve:",
        "7. Desired deliverables: inspection report / deviation map / scan-to-CAD / AI analysis / jig concept / Physical AI execution data",
        "8. Schedule or notes:",
        "",
        "If available, I will attach sample data or reference images."
      ].join("\n");
    }

    return [
      "안녕하세요, Optimize3D 파일럿/기술 상담을 문의드립니다.",
      "아래 항목 중 가능한 내용만 작성합니다.",
      "",
      `문의일: ${date}`,
      `문의 분야: ${category}`,
      "",
      "1. 회사/기관:",
      "2. 성함/직책:",
      "3. 연락처:",
      "4. 적용 현장 또는 대상: 선박블록 / 카고홀드 / 몰드 / 배관 / 지그 / 로봇셀 / 기타",
      "5. 보유 데이터: 포인트클라우드 / CAD / 사진 / 도면 / 검사 기준",
      "6. 해결하고 싶은 문제:",
      "7. 희망 결과물: 검사 리포트 / 편차맵 / 역설계 CAD / AI 분석 / 지그 설계 / 피지컬AI 실행 데이터",
      "8. 희망 일정 또는 기타:",
      "",
      "가능하다면 샘플 데이터나 참고 이미지를 함께 첨부하겠습니다."
    ].join("\n");
  };

  emailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const locale = button.dataset.emailLocale || document.documentElement.lang || "ko";
      const date = inquiryDate();
      const category = selectedCategory(locale);
      const subject = encodeURIComponent(emailSubject(button, locale, date, category));
      const body = encodeURIComponent(emailBody(locale, date, category));
      window.location.href = `mailto:${emailAddress()}?subject=${subject}&body=${body}`;
    });
  });
}

contactCategoryLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!emailCategorySelect) return;
    const category = link.dataset.contactCategory;
    const option = [...emailCategorySelect.options].find((item) => item.value === category);
    if (option) emailCategorySelect.value = category;
  });
});
