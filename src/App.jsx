import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useScroll, useTransform } from "framer-motion";
import { cats, orderLink, products, store } from "./data.js";

const ease = [0.22, 1, 0.36, 1];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, ease, delay },
});

const price = (p) => (p.price ? `${p.price} ج.م` : "السعر على واتساب");
const orderText = (p) => `أهلاً LUXY، عايزة أطلب: ${p.name}`;

function Loader({ onDone }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setShow(false), reduced ? 300 : 1500);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "";
  }, [show]);
  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div className="loader" exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}>
          <div className="loader-word" dir="ltr">
            {"LUXY".split("").map((c, i) => (
              <motion.span key={i} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.7, ease, delay: 0.1 + i * 0.08 }}>
                {c}
              </motion.span>
            ))}
          </div>
          <motion.i className="loader-line" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, ease, delay: 0.4 }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Logo() {
  return (
    <a href="#top" className="logo" dir="ltr">
      LUXY<span>●</span>
    </a>
  );
}

function Hero({ ready }) {
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 700], [0, 90]);
  const show = (d) => ({ initial: { opacity: 0, y: 24 }, animate: ready ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.9, ease, delay: d } });

  return (
    <section className="hero" id="top">
      <motion.img className="hero-img" src="./img/hero.webp" alt="ساعة ذهبي على خلفية داكنة" style={{ y: imgY }} />
      <div className="hero-shade" />
      <nav className="nav">
        <Logo />
        <div className="nav-links">
          <a href="#new">الجديد</a>
          <a href="#shop">التشكيلة</a>
          <a href="#why">ليه LUXY</a>
        </div>
        <a className="pill pill-light nav-cta" href={orderLink("أهلاً LUXY، عايزة أسأل عن ساعة")} target="_blank" rel="noreferrer">
          اطلبي الآن
        </a>
      </nav>
      <div className="hero-copy">
        <motion.p className="hero-kicker" {...show(0.05)}>
          ساعات رجالي وحريمي
        </motion.p>
        <motion.h1 {...show(0.12)}>
          أناقة تليق
          <br />
          بإيدك
        </motion.h1>
        <motion.p className="hero-sub" {...show(0.2)}>
          تشكيلة ساعات جلد ومعدن بتصميمات شيك، وعروض بتنزل باستمرار. اختاري ساعتك واطلبيها في رسالة.
        </motion.p>
        <motion.div className="hero-actions" {...show(0.28)}>
          <a className="pill pill-light" href="#shop">
            تسوّقي التشكيلة
          </a>
          <a className="pill pill-ghost" href="#new">
            شوفي الجديد
          </a>
        </motion.div>
        <motion.ul className="hero-tags" {...show(0.36)}>
          <li>رجالي</li>
          <li>حريمي</li>
          <li>جلد</li>
          <li>معدن</li>
        </motion.ul>
      </div>
    </section>
  );
}

function NewArrival() {
  const items = products.filter((p) => p.tag);
  return (
    <section className="section" id="new">
      <motion.h2 className="title center" {...rise()}>
        وصل حديثاً
      </motion.h2>
      <div className="new-grid">
        {items.map((p, i) => (
          <motion.a key={p.id} className="new-card" href={orderLink(orderText(p))} target="_blank" rel="noreferrer" {...rise(i * 0.08)}>
            <span className={`badge ${p.tag === "عرض" ? "badge-sale" : ""}`}>{p.tag}</span>
            <div className="new-media">
              <img src={p.img} alt={p.name} loading="lazy" />
            </div>
            <p className="new-note">{p.note}</p>
            <h3>{p.name}</h3>
            <p className="new-price">{price(p)}</p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

const features = [
  { t: "رجالي وحريمي", d: "تشكيلة بتتجدد باستمرار للاتنين." },
  { t: "جلد ومعدن", d: "أحزمة جلد كلاسيك وإسورة معدن لامعة." },
  { t: "عروض مستمرة", d: "عروض خاصة بتنزل على الجروب أول بأول." },
  { t: "الطلب بسهولة", d: "اختاري الساعة وابعتي رسالة، وإحنا نكمل معاكي." },
];

function Why() {
  return (
    <section className="section" id="why">
      <motion.h2 className="title center" {...rise()}>
        ليه تختاري LUXY؟
      </motion.h2>
      <div className="why">
        {features.map((f, i) => (
          <motion.div key={f.t} className={`why-cell why-${i}`} {...rise(i * 0.06)}>
            <span className="why-dot" />
            <h3>{f.t}</h3>
            <p>{f.d}</p>
          </motion.div>
        ))}
        <motion.div className="why-img" {...rise(0.1)}>
          <img src="./img/wrist.webp" alt="ساعة حريمي على اليد" loading="lazy" />
        </motion.div>
      </div>
    </section>
  );
}

function Shop() {
  const [cat, setCat] = useState("all");
  const list = products.filter((p) => cat === "all" || p.cat === cat);
  return (
    <section className="section" id="shop">
      <div className="shop-head">
        <motion.h2 className="title" {...rise()}>
          اختاري ساعتك
        </motion.h2>
        <div className="tabs" role="tablist">
          {cats.map((c) => (
            <button key={c.key} role="tab" aria-selected={cat === c.key} className={cat === c.key ? "on" : ""} onClick={() => setCat(c.key)}>
              {cat === c.key && <motion.span layoutId="tab" className="tab-bg" transition={{ type: "spring", damping: 30, stiffness: 380 }} />}
              <span>{c.label}</span>
            </button>
          ))}
        </div>
      </div>
      <motion.div className="shop-grid" layout>
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.article
              key={p.id}
              className="dark-card"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease }}
            >
              {p.tag && <span className={`badge badge-dark ${p.tag === "عرض" ? "badge-sale" : ""}`}>{p.tag}</span>}
              <div className="dark-media">
                <img src={p.img} alt={p.name} loading="lazy" />
              </div>
              <h3>{p.name}</h3>
              <div className="dark-foot">
                <span>{price(p)}</span>
                <a className="pill pill-light pill-sm" href={orderLink(orderText(p))} target="_blank" rel="noreferrer">
                  اطلبي
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function Banner() {
  return (
    <section className="section">
      <motion.div className="banner" {...rise()}>
        <div className="banner-copy">
          <h2>ساعة لكل مناسبة</h2>
          <p>تابعي جروب LUXY على فيسبوك عشان تشوفي كل جديد والعروض أول ما تنزل.</p>
          <a className="pill pill-dark" href={store.group} target="_blank" rel="noreferrer">
            انضمي للجروب
          </a>
        </div>
        <img src="./img/wrist2.webp" alt="ساعة رجالي جلد على اليد" loading="lazy" />
      </motion.div>
    </section>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  return (
    <MotionConfig reducedMotion="user">
      <Loader onDone={() => setReady(true)} />
      <div className="page">
        <Hero ready={ready} />
        <NewArrival />
        <Why />
        <Shop />
        <Banner />
        <footer className="footer">
          <Logo />
          <p>ساعات رجالي وحريمي · © 2026 LUXY</p>
        </footer>
      </div>
      <a className="float-order" href={orderLink("أهلاً LUXY، عايزة أسأل عن ساعة")} target="_blank" rel="noreferrer">
        اطلبي ساعتك
      </a>
    </MotionConfig>
  );
}
