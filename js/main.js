(() => {
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll(".has-dropdown").forEach((item) => {
    const btn = item.querySelector(":scope > .nav__link");
    if (!btn || btn.tagName !== "BUTTON") return;
    btn.addEventListener("click", (e) => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        e.preventDefault();
        const open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
      }
    });
  });

  // Hero carousel
  const slides = [...document.querySelectorAll(".hero__img")];
  const dots = [...document.querySelectorAll(".hero__dots button")];
  if (slides.length && dots.length) {
    let index = 0;
    let timer;

    const show = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((el, n) => el.classList.toggle("is-active", n === index));
      dots.forEach((el, n) => el.classList.toggle("is-active", n === index));
    };

    const start = () => {
      stop();
      timer = window.setInterval(() => show(index + 1), 5000);
    };
    const stop = () => {
      if (timer) window.clearInterval(timer);
    };

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        show(Number(dot.dataset.dot));
        start();
      });
    });

    start();
  }
})();
