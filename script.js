/* ========= Easy-to-edit settings ========= */
const CONFIG = {
  instagramUrl: "https://www.instagram.com/",   // <- put Sapna's Instagram profile link here
  whatsapp: "918130157199",
  email: "kumaris4066@gmail.com"
};
/* ========================================= */

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* Instagram links */
const instaBtn = $("#instaBtn");
const headerInstaBtn = $("#headerInstaBtn");
if (instaBtn) instaBtn.href = CONFIG.instagramUrl;
if (headerInstaBtn) headerInstaBtn.href = CONFIG.instagramUrl;

/* Gallery slides */
const galleryFolder = "assets/img/gallery/WhatsApp%20Unknown%202026-11-24%20at%2012.29.06%20PM/";
const GALLERY = [
  ["WhatsApp%20Image%202026-11-19%20at%206.10.04%20PM.jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.10.03%20PM.jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.10.03%20PM%20(3).jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.10.03%20PM%20(2).jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.10.03%20PM%20(1).jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.10.02%20PM.jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.10.02%20PM%20(2).jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.10.02%20PM%20(1).jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.10.01%20PM.jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.10.01%20PM%20(2).jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.10.01%20PM%20(1).jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.10.00%20PM.jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.10.00%20PM%20(2).jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.10.00%20PM%20(1).jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.09.59%20PM.jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.09.59%20PM%20(2).jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.09.59%20PM%20(1).jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.09.58%20PM.jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.09.58%20PM%20(2).jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.09.58%20PM%20(1).jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.09.54%20PM.jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.09.53%20PM.jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.09.53%20PM%20(1).jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.09.52%20PM.jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.09.52%20PM%20(1).jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.09.51%20PM.jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.09.50%20PM.jpeg", "Makeup portfolio photo"],
  ["WhatsApp%20Image%202026-11-19%20at%206.09.50%20PM%20(1).jpeg", "Makeup portfolio photo"]
];
$("#galleryWrap").innerHTML = GALLERY.map(([file, alt]) => {
  const path = galleryFolder + file;
  return `<div class="swiper-slide" data-full="${path}"><img src="${path}" alt="${alt}" loading="lazy"></div>`;
}).join("");
const instaStrip = $("#instaStrip");
if (instaStrip) {
  instaStrip.innerHTML = GALLERY.slice(0, 6).map(([file, alt]) =>
    `<a href="${CONFIG.instagramUrl}" target="_blank" rel="noopener" aria-label="${alt} on Instagram"><img src="${galleryFolder + file}" alt="${alt}" loading="lazy"></a>`).join("");
}

/* Loader */
window.addEventListener("load", () => setTimeout(() => $("#loader").classList.add("done"), 600));
setTimeout(() => $("#loader").classList.add("done"), 2500);

/* Nav */
const nav = $("#nav"), burger = $("#burger"), menu = $("#menu");
const toggleMenu = open => {
  burger.classList.toggle("open", open); menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open); document.body.style.overflow = open ? "hidden" : "";
};
burger.addEventListener("click", () => toggleMenu(!menu.classList.contains("open")));
$$("a", menu).forEach(a => a.addEventListener("click", () => toggleMenu(false)));

/* Scroll: progress, nav bg, active link */
const sections = $$("main section[id]"), links = $$(".menu a:not(.btn)");
function onScroll() {
  const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
  $("#progress").style.width = (y / h * 100) + "%";
  nav.classList.toggle("scrolled", y > 40);
  let cur = "";
  sections.forEach(s => { if (y + 140 >= s.offsetTop) cur = s.id; });
  links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + cur));
}
addEventListener("scroll", onScroll, { passive: true }); onScroll();

/* Reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    $$(".bar", e.target).forEach(b => b.classList.add("in"));
    if (e.target.classList.contains("bar")) e.target.classList.add("in");
    io.unobserve(e.target);
  });
}, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
$$(".reveal,.reveal-left,.reveal-right,.bar").forEach(el => io.observe(el));

/* Counters */
const cio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || "", t0 = performance.now();
  const tick = t => { const p = Math.min((t - t0) / 1600, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suf : ""); if (p < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick); cio.unobserve(el);
}), { threshold: .6 });
$$("[data-count]").forEach(el => cio.observe(el));

/* Hero sparkles */
const sp = $("#sparkles");
for (let i = 0; i < 22; i++) {
  const s = document.createElement("span");
  s.className = "sparkle"; s.textContent = "✦";
  s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;font-size:${8 + Math.random() * 16}px;--d:${3 + Math.random() * 4}s;--dl:${Math.random() * 5}s`;
  sp.appendChild(s);
}

/* ---------- Swipers ---------- */
const arrows = root => ({ nextEl: $(".swiper-button-next", root), prevEl: $(".swiper-button-prev", root) });
const dots = root => ({ el: $(".swiper-pagination", root), clickable: true });

/* Gallery */
const gRoot = $(".gallery-swiper");
new Swiper(gRoot, {
  effect: "coverflow", grabCursor: true, centeredSlides: true, slidesPerView: "auto", loop: true,
  speed: 900, spaceBetween: 18,
  coverflowEffect: { rotate: 18, stretch: 0, depth: 140, modifier: 1, slideShadows: false },
  autoplay: { delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true },
  navigation: arrows(gRoot), pagination: dots(gRoot), keyboard: { enabled: true },
  breakpoints: { 0: { spaceBetween: 12 }, 900: { spaceBetween: 24 } }
});

/* Achievements */
const aRoot = $(".ach-swiper");
new Swiper(aRoot, {
  grabCursor: true, speed: 800, loop: true, slidesPerView: 1, spaceBetween: 20,
  autoplay: { delay: 3600, disableOnInteraction: false, pauseOnMouseEnter: true },
  navigation: arrows(aRoot), pagination: dots(aRoot), keyboard: { enabled: true },
  breakpoints: { 640: { slidesPerView: 2, spaceBetween: 22 }, 1000: { slidesPerView: 3, spaceBetween: 26 } }
});

/* During My Course - work slides */
const courseFolder = "assets/img/achievment/WhatsApp%20Unknown%202026-11-24%20at%2012.28.56%20PM/";
const COURSE_WORK = [
  "WhatsApp%20Image%202026-11-24%20at%2011.33.35%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.39%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.39%20AM%20(1).jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.39%20AM%20(2).jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.40%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.40%20AM%20(1).jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.41%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.41%20AM%20(1).jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.42%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.42%20AM%20(1).jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.42%20AM%20(2).jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.43%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.43%20AM%20(1).jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.44%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.44%20AM%20(1).jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.45%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.45%20AM%20(1).jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.55%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.55%20AM%20(1).jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.56%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.57%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.58%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.58%20AM%20(1).jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.59%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.33.59%20AM%20(1).jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.34.00%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.34.00%20AM%20(1).jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.34.01%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.34.02%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.34.02%20AM%20(1).jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.34.03%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.34.04%20AM.jpeg",
  "WhatsApp%20Image%202026-11-24%20at%2011.34.04%20AM%20(1).jpeg"
];
const courseWrap = $("#courseWrap");
if (courseWrap) {
  courseWrap.innerHTML = COURSE_WORK.map(file => {
    const path = courseFolder + file;
    return `<div class="swiper-slide" data-full="${path}"><img src="${path}" alt="Makeup work created during my course" loading="lazy"></div>`;
  }).join("");
}
/* initialize course-work Swiper */
const cRoot = $(".course-swiper");
if (cRoot) {
  new Swiper(cRoot, {
    effect: "coverflow", grabCursor: true, centeredSlides: true, slidesPerView: "auto", loop: true,
    speed: 1100, spaceBetween: 18,
    coverflowEffect: { rotate: 12, stretch: 0, depth: 160, modifier: 1, slideShadows: false },
    autoplay: { delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true },
    navigation: arrows(cRoot), pagination: dots(cRoot), keyboard: { enabled: true },
    breakpoints: { 0: { spaceBetween: 12 }, 900: { spaceBetween: 24 } }
  });
}

/* Lightbox */
const lb = $("#lightbox"), lbImg = lb ? $("img", lb) : null;
["#galleryWrap", "#courseWrap"].forEach(selector => {
  const wrap = $(selector);
  if (!wrap || !lb || !lbImg) return;
  wrap.addEventListener("click", e => {
    const s = e.target.closest(".swiper-slide"); if (!s) return;
    lbImg.src = s.dataset.full;
    const image = $("img", s);
    lbImg.alt = image ? image.alt : "Portfolio image";
    lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
  });
});
if (lb) {
  const closeLb = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); };
  lb.addEventListener("click", closeLb);
  addEventListener("keydown", e => e.key === "Escape" && closeLb());
}

/* Contact form (no server needed: opens WhatsApp or the email app with the message ready) */
const form = $("#contactForm"), err = $("#formErr");
let mode = "wa";
$$("button[type=submit]", form).forEach(b => b.addEventListener("click", () => mode = b.dataset.mode));
form.addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  let bad = false;
  ["name", "phone", "service"].forEach(k => {
    const f = form.elements[k].closest(".field"); const ok = (d[k] || "").trim().length > 0;
    f.classList.toggle("bad", !ok); bad ||= !ok;
  });
  if (bad) { err.className = "err"; err.textContent = "Please fill in your name, phone number and the service you need."; return; }
  if (!/^[+\d][\d\s-]{7,}$/.test(d.phone.trim())) { err.className = "err"; err.textContent = "Please enter a valid phone number."; form.elements.phone.closest(".field").classList.add("bad"); return; }
  const text = `Hello Sapna, I'd like to book an appointment.\n\nName: ${d.name}\nPhone: ${d.phone}\n` +
    (d.email ? `Email: ${d.email}\n` : "") + `Service: ${d.service}\n` + (d.date ? `Event date: ${d.date}\n` : "") + (d.message ? `\nMessage: ${d.message}` : "");
  if (mode === "mail") location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Booking enquiry — " + d.service)}&body=${encodeURIComponent(text)}`;
  else window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  err.className = "err ok"; err.textContent = "Thank you! Your message is ready to send in your " + (mode === "mail" ? "email app." : "WhatsApp.");
  form.reset();
});
$$("input,select", form).forEach(i => i.addEventListener("input", () => i.closest(".field").classList.remove("bad")));

$("#yr").textContent = new Date().getFullYear();
