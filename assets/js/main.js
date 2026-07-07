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

  emailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const subject = encodeURIComponent(button.dataset.emailSubject || "Optimize3D 파일럿 문의");
      window.location.href = `mailto:${emailAddress()}?subject=${subject}`;
    });
  });
}
