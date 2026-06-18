import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import {
  identities,
  profile,
  resumeProjects,
  themes,
  timeline,
  type Theme,
} from "./data";

const ArrowIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path
      d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const GithubIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 .7A11.5 11.5 0 0 0 8.4 23c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.2 1.2a11.1 11.1 0 0 1 5.8 0C17 4.7 18 5 18 5c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.8 1.2 3.1 0 4.4-2.8 5.4-5.5 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .7Z"
    />
  </svg>
);

function ThemePicker({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (theme: Theme) => void;
}) {
  return (
    <div className="theme-picker" aria-label="选择网站主题">
      {themes.map((item) => (
        <button
          aria-label={`切换到${item.label}主题`}
          aria-pressed={theme === item.id}
          className={theme === item.id ? "theme-dot is-active" : "theme-dot"}
          key={item.id}
          onClick={() => onChange(item.id)}
          title={item.label}
          type="button"
        >
          <span style={{ background: item.color }} />
        </button>
      ))}
    </div>
  );
}

function Navigation({
  theme,
  onThemeChange,
}: {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}) {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="site-header">
      <a aria-label="返回首页" className="brand" href="#top">
        PF<span>.</span>
      </a>
      <nav
        aria-label="主导航"
        className={open ? "nav-links is-open" : "nav-links"}
      >
        <a href="#identity" onClick={closeMenu}>身份</a>
        <a href="#journey" onClick={closeMenu}>经历</a>
        <a href="#resume" onClick={closeMenu}>履历</a>
        <a href="#contact" onClick={closeMenu}>联系</a>
        <ThemePicker theme={theme} onChange={onThemeChange} />
      </nav>
      <button
        aria-expanded={open}
        aria-label={open ? "关闭导航" : "打开导航"}
        className={open ? "menu-button is-open" : "menu-button"}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span />
        <span />
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="hero-orb hero-orb-one" />
      <div className="hero-orb hero-orb-two" />
      <p className="hero-kicker reveal">HELLO, I AM</p>
      <h1 className="reveal reveal-delay-one">
        彭方<span className="hero-dot">。</span>
      </h1>
      <div aria-label="职业身份" className="role-list reveal reveal-delay-two">
        {profile.roles.map((role) => (
          <span key={role}>{role}</span>
        ))}
      </div>
      <p className="hero-summary reveal reveal-delay-three">{profile.summary}</p>
      <div className="hero-actions reveal reveal-delay-three">
        <a className="button button-primary" href="#identity">
          认识我 <span aria-hidden="true">↓</span>
        </a>
        <a
          className="button button-ghost"
          href={profile.github}
          rel="noreferrer"
          target="_blank"
        >
          <GithubIcon /> GitHub
        </a>
      </div>
      <div aria-hidden="true" className="scroll-hint">
        <span />
        Scroll to explore
      </div>
    </section>
  );
}

function IdentityCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const resumeTimer = useRef<number | null>(null);

  const move = useCallback((step: number) => {
    setIndex((current) => (current + step + identities.length) % identities.length);
  }, []);

  const pauseTemporarily = useCallback(() => {
    setPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 8000);
  }, []);

  const goTo = (next: number) => {
    setIndex(next);
    pauseTemporarily();
  };

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => move(1), 5500);
    return () => window.clearInterval(timer);
  }, [move, paused]);

  useEffect(
    () => () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    },
    [],
  );

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
    pauseTemporarily();
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
    pointerStart.current = null;
  };

  return (
    <section className="identity-section section-shell" id="identity">
      <div className="section-heading">
        <div>
          <p className="eyebrow">MULTIPLE IDENTITIES, ONE DIRECTION</p>
          <h2>不断生长的我</h2>
        </div>
        <p>身份并非标签，而是我理解世界、创造价值的不同视角。</p>
      </div>

      <div
        aria-label="彭方的四种身份"
        aria-roledescription="轮播图"
        className="carousel"
        onBlur={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            move(-1);
            pauseTemporarily();
          }
          if (event.key === "ArrowRight") {
            move(1);
            pauseTemporarily();
          }
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerCancel={() => { pointerStart.current = null; }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        role="region"
        tabIndex={0}
      >
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {identities.map((identity, itemIndex) => (
            <article
              aria-hidden={index !== itemIndex}
              className="identity-slide"
              key={identity.title}
              style={{ "--slide-accent": identity.accent } as CSSProperties}
            >
              <div className="identity-copy">
                <p className="identity-index">{identity.eyebrow}</p>
                <h3>{identity.title}</h3>
                <p>{identity.description}</p>
                <span className="identity-line" />
              </div>
              <div className="identity-art">
                <div aria-hidden="true" className="image-fallback">
                  <span>PF</span>
                </div>
                <img
                  alt={`${profile.name}作为${identity.title}的卡通插画`}
                  draggable="false"
                  loading={itemIndex === 0 ? "eager" : "lazy"}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                  src={identity.image}
                />
              </div>
            </article>
          ))}
        </div>

        <button
          aria-label="上一张"
          className="carousel-arrow carousel-prev"
          onClick={() => {
            move(-1);
            pauseTemporarily();
          }}
          type="button"
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          aria-label="下一张"
          className="carousel-arrow carousel-next"
          onClick={() => {
            move(1);
            pauseTemporarily();
          }}
          type="button"
        >
          <ArrowIcon direction="right" />
        </button>

        <div aria-label="选择身份" className="carousel-dots" role="tablist">
          {identities.map((identity, itemIndex) => (
            <button
              aria-label={`查看${identity.title}`}
              aria-selected={index === itemIndex}
              className={index === itemIndex ? "is-active" : ""}
              key={identity.title}
              onClick={() => goTo(itemIndex)}
              role="tab"
              type="button"
            >
              <span />
            </button>
          ))}
        </div>
        <p aria-live="polite" className="sr-only">
          当前展示：{identities[index].title}
        </p>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="journey-section section-shell" id="journey">
      <div className="section-heading section-heading-centered">
        <div>
          <p className="eyebrow">MY JOURNEY</p>
          <h2>从学习，到创造</h2>
        </div>
        <p>每一段经历，都在为下一次选择积累判断力。</p>
      </div>
      <div className="timeline">
        <div aria-hidden="true" className="timeline-rail" />
        {timeline.map((item, index) => (
          <article className="timeline-card" key={`${item.period}-${item.title}`}>
            <span aria-hidden="true" className="timeline-node">{index + 1}</span>
            <div className="timeline-meta">
              <span>{item.period}</span>
              <small>{item.tag}</small>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.note ? (
              <div className="timeline-note">
                <span>{item.note.label}</span>
                <strong>{item.note.title}</strong>
                <p>{item.note.description}</p>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  const copyQQ = async () => {
    try {
      await navigator.clipboard.writeText(profile.qq);
    } catch {
      const input = document.createElement("textarea");
      input.value = profile.qq;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  return (
    <section className="contact-section section-shell" id="contact">
      <div className="contact-card">
        <div className="contact-glow" />
        <p className="eyebrow">LET&apos;S BUILD SOMETHING</p>
        <h2>下一件有趣的事，<br />也许可以一起创造。</h2>
        <p className="contact-intro">
          对 AI 应用、产品创新、软件与硬件创业感兴趣？欢迎和我交流。
        </p>
        <div className="contact-actions">
          <a
            className="contact-link"
            href={profile.github}
            rel="noreferrer"
            target="_blank"
          >
            <span className="contact-icon"><GithubIcon /></span>
            <span>
              <small>GitHub</small>
              <strong>@{profile.githubHandle}</strong>
            </span>
            <span aria-hidden="true">↗</span>
          </a>
          <button className="contact-link" onClick={copyQQ} type="button">
            <span className="contact-icon">Q</span>
            <span>
              <small>QQ</small>
              <strong>{copied ? "已复制到剪贴板" : profile.qq}</strong>
            </span>
            <span aria-hidden="true">{copied ? "✓" : "＋"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section className="resume-section section-shell" id="resume">
      <div className="section-heading">
        <div>
          <p className="eyebrow">TECHNICAL RESUME</p>
          <h2>技术履历</h2>
        </div>
        <p>把简历中的项目经历浓缩成可分享的技术亮点，重点展示工程能力、AI 应用和算法实践。</p>
      </div>
      <div className="resume-grid">
        {resumeProjects.map((project) => (
          <article className="resume-card" key={project.title}>
            <div className="resume-card-head">
              <span>{project.category}</span>
              <small>{project.meta}</small>
            </div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul>
              {project.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <div className="stack-list">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="skills-strip" aria-label="技能概览">
        <span>Python</span>
        <span>Java</span>
        <span>C / C++</span>
        <span>Spring Boot</span>
        <span>Spring AI</span>
        <span>RAG</span>
        <span>TensorFlow</span>
        <span>MySQL / Redis</span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer section-shell">
      <p>© {new Date().getFullYear()} {profile.englishName}</p>
      <p>保持好奇，持续创造。</p>
      <a href="#top">回到顶部 ↑</a>
    </footer>
  );
}

function getInitialTheme(): Theme {
  const saved = localStorage.getItem("pf-theme");
  if (saved === "light" || saved === "space" || saved === "aurora") {
    return saved;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "space"
    : "light";
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("pf-theme", theme);
    const themeColor = theme === "light"
      ? "#f5f5f7"
      : theme === "space"
        ? "#101014"
        : "#17265f";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", themeColor);
  }, [theme]);

  return (
    <div className="site">
      <Navigation theme={theme} onThemeChange={setTheme} />
      <main>
        <Hero />
        <IdentityCarousel />
        <Journey />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
