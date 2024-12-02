document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.container');
  const header = document.querySelector('header.parallax');
  let lastScrollY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        const containerTop = container.offsetTop;

        if (lastScrollY < containerTop) {
          header.style.backgroundPosition = `center ${lastScrollY / 2}px`;
        }

        ticking = false;
      });

      ticking = true;
    }
  });
});
