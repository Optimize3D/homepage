const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const year = document.querySelector("#year");
const emailForms = document.querySelectorAll("[data-email-form]");
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

    buttons.forEach((item) => {
      const isSelected = item === button;
      item.setAttribute("aria-selected", String(isSelected));
      item.tabIndex = isSelected ? 0 : -1;
    });
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

if (emailForms.length > 0) {
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
  const formValue = (form, name) => {
    const field = form.elements.namedItem(name);
    return typeof field?.value === "string" ? field.value.trim() : "";
  };
  const checkedValues = (form, name) => [...form.querySelectorAll(`input[name="${name}"]:checked`)]
    .map((input) => input.value)
    .filter(Boolean);
  const emailSubject = (form, locale, date, category, company) => {
    const fallback = locale.startsWith("en") ? "Optimize3D pilot inquiry" : "Optimize3D 파일럿 문의";
    const baseSubject = form.dataset.emailSubject || fallback;
    const companyLabel = company ? `[${company}]` : "";

    return `[${date}][${category}]${companyLabel} ${baseSubject}`;
  };
  const emailBody = (form, locale, date, category) => {
    const company = formValue(form, "company");
    const name = formValue(form, "name");
    const phone = formValue(form, "phone");
    const email = formValue(form, "email");
    const details = formValue(form, "details");
    const data = checkedValues(form, "owned-data");
    const challenges = checkedValues(form, "challenge");

    if (locale.startsWith("en")) {
      return [
        "Hello Optimize3D,",
        "",
        "I would like to submit the following pilot or technical inquiry.",
        "",
        `Inquiry date: ${date}`,
        `Primary inquiry: ${category}`,
        `Company / organization: ${company}`,
        `Name: ${name}`,
        `Phone: ${phone || "Not provided"}`,
        `Reply email: ${email}`,
        "",
        `Available data: ${data.length ? data.join(" / ") : "Not specified"}`,
        `Challenges to solve: ${challenges.length ? challenges.join(" / ") : "Not specified"}`,
        "",
        "Project details:",
        details,
        "",
        "I will attach relevant sample data or reference files where available.",
        "I understand that a formal NDA can be executed before the technical pilot begins."
      ].join("\n");
    }

    return [
      "안녕하세요, Optimize3D 파일럿/기술 상담을 접수합니다.",
      "",
      `문의일: ${date}`,
      `상담 대분류: ${category}`,
      `회사/기관: ${company}`,
      `성함: ${name}`,
      `연락처: ${phone || "미기재"}`,
      `회신 이메일: ${email}`,
      "",
      `보유 데이터: ${data.length ? data.join(" / ") : "선택 안 함"}`,
      `해결 과제: ${challenges.length ? challenges.join(" / ") : "선택 안 함"}`,
      "",
      "상세 문의 내용:",
      details,
      "",
      "가능한 경우 샘플 데이터나 참고 파일을 함께 첨부하겠습니다.",
      "필요시 공식 NDA 체결 후 실무 기술 파일럿을 진행할 수 있음을 확인했습니다."
    ].join("\n");
  };

  emailForms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const locale = form.dataset.emailLocale || document.documentElement.lang || "ko";
      const date = inquiryDate();
      const category = formValue(form, "category") || (locale.startsWith("en") ? "General Technical Consultation" : "일반 기술상담");
      const company = formValue(form, "company");
      const subject = encodeURIComponent(emailSubject(form, locale, date, category, company));
      const body = encodeURIComponent(emailBody(form, locale, date, category));
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
