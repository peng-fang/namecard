(function () {
  var themeButtons = Array.prototype.slice.call(
    document.querySelectorAll("[data-theme-choice]"),
  );
  var nav = document.querySelector(".nav-links");
  var menuButton = document.querySelector(".menu-button");
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var themeColors = {
    light: "#f5f5f7",
    space: "#101014",
    aurora: "#17265f",
  };

  function getInitialTheme() {
    var saved = localStorage.getItem("pf-theme");
    if (saved === "light" || saved === "space" || saved === "aurora") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "space"
      : "light";
  }

  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("pf-theme", theme);
    if (themeMeta) themeMeta.setAttribute("content", themeColors[theme]);
    themeButtons.forEach(function (button) {
      var active = button.dataset.themeChoice === theme;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setTheme(button.dataset.themeChoice);
    });
  });
  setTheme(getInitialTheme());

  if (menuButton && nav) {
    menuButton.addEventListener("click", function () {
      var open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      menuButton.classList.toggle("is-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuButton.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "打开导航");
      });
    });
  }

  var carousel = document.querySelector(".carousel");
  var track = document.querySelector(".carousel-track");
  var slides = Array.prototype.slice.call(document.querySelectorAll(".identity-slide"));
  var dots = Array.prototype.slice.call(document.querySelectorAll(".carousel-dots button"));
  var liveText = document.querySelector(".carousel .sr-only");
  var titles = slides.map(function (slide) {
    var heading = slide.querySelector("h3");
    return heading ? heading.textContent : "";
  });
  var current = 0;
  var paused = false;
  var resumeTimer = null;
  var pointerStart = null;

  function updateCarousel(next) {
    current = (next + slides.length) % slides.length;
    if (track) track.style.transform = "translateX(-" + current * 100 + "%)";
    slides.forEach(function (slide, index) {
      slide.setAttribute("aria-hidden", String(index !== current));
    });
    dots.forEach(function (dot, index) {
      var active = index === current;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", String(active));
    });
    if (liveText) liveText.textContent = "当前展示：" + titles[current];
  }

  function move(step) {
    updateCarousel(current + step);
  }

  function pauseTemporarily() {
    paused = true;
    if (resumeTimer) window.clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(function () {
      paused = false;
    }, 8000);
  }

  dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
      updateCarousel(index);
      pauseTemporarily();
    });
  });

  var prev = document.querySelector(".carousel-prev");
  var next = document.querySelector(".carousel-next");
  if (prev) {
    prev.addEventListener("click", function () {
      move(-1);
      pauseTemporarily();
    });
  }
  if (next) {
    next.addEventListener("click", function () {
      move(1);
      pauseTemporarily();
    });
  }

  if (carousel) {
    carousel.addEventListener("mouseenter", function () { paused = true; });
    carousel.addEventListener("mouseleave", function () { paused = false; });
    carousel.addEventListener("focus", function () { paused = true; });
    carousel.addEventListener("blur", function () { paused = false; });
    carousel.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        move(-1);
        pauseTemporarily();
      }
      if (event.key === "ArrowRight") {
        move(1);
        pauseTemporarily();
      }
    });
    carousel.addEventListener("pointerdown", function (event) {
      pointerStart = event.clientX;
      pauseTemporarily();
    });
    carousel.addEventListener("pointerup", function (event) {
      if (pointerStart === null) return;
      var distance = event.clientX - pointerStart;
      if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
      pointerStart = null;
    });
    carousel.addEventListener("pointercancel", function () {
      pointerStart = null;
    });
  }

  window.setInterval(function () {
    if (!paused) move(1);
  }, 5500);

  var qqButton = document.querySelector("[data-copy-qq]");
  if (qqButton) {
    qqButton.addEventListener("click", function () {
      var qq = qqButton.dataset.copyQq;
      var strong = qqButton.querySelector("strong");
      var suffix = qqButton.querySelector("span:last-child");

      function showCopied() {
        if (strong) strong.textContent = "已复制到剪贴板";
        if (suffix) suffix.textContent = "✓";
        window.setTimeout(function () {
          if (strong) strong.textContent = qq;
          if (suffix) suffix.textContent = "＋";
        }, 1800);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(qq).then(showCopied).catch(function () {
          fallbackCopy(qq);
          showCopied();
        });
        return;
      }
      fallbackCopy(qq);
      showCopied();
    });
  }

  function fallbackCopy(text) {
    var input = document.createElement("textarea");
    input.value = text;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    input.remove();
  }
})();
