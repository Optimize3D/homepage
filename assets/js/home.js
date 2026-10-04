(() => {
  const menu = document.querySelector('.menu');
  const links = document.querySelector('.links');
  const english = document.documentElement.lang === 'en';
  const closeMenu = () => {
    menu.setAttribute('aria-expanded', 'false');
    menu.textContent = english ? 'Menu' : '메뉴';
    links.classList.remove('open');
  };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? (english ? 'Close' : '닫기') : (english ? 'Menu' : '메뉴');
    links.classList.toggle('open', open);
  });
  links.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });
  const inquiry = document.querySelector('#inquiry-form');
  document.querySelectorAll('[data-open-inquiry]').forEach(link => link.addEventListener('click', () => {
    inquiry.open = true;
  }));
})();
