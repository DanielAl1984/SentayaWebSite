/* ============================================================
   SENTAYA AI — Main Script
   UI/UX Pro Max skill applied:
   · Active nav (P9) · Reduced-motion (P7) · Accessibility (P1)
   · Canvas network topology · Typewriter · Counters · Scroll FX
   ============================================================ */

/* P7/P1 — check OS reduced-motion preference once at load */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
    initBodyReveal();
    initNavbar();
    initActiveNav();
    if (!prefersReducedMotion) initHeroCanvas();
    initTypewriter();
    initScrollObserver();
    initCounters();
    initSmoothScroll();
    if (!prefersReducedMotion) initParallaxGhostNums();
});


/* ── Body reveal — handled by CSS animation, no JS needed ── */
function initBodyReveal() {}


/* ── Navbar ──────────────────────────────────────────────── */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const menu   = document.getElementById('navMenu');

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', window.scrollY > 80);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const open = menu.classList.toggle('open');
            toggle.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
        });

        menu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) closeMenu();
        });

        /* Close on Escape key — P9 modal-escape principle */
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
        });
    }

    function closeMenu() {
        if (!menu || !toggle) return;
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
    }
}


/* ── Active Nav — P9 Navigation: nav-state-active ───────── */
function initActiveNav() {
    const navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
    if (!navLinks.length) return;

    const sectionMap = navLinks
        .map(link => ({
            link,
            section: document.getElementById(link.getAttribute('href').slice(1)),
        }))
        .filter(({ section }) => section !== null);

    const setActive = () => {
        /* Determine current section: last one whose top is at/above nav + offset */
        const scrollY = window.scrollY + parseInt(
            getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '68',
            10
        ) + 32;

        let current = null;
        sectionMap.forEach(({ section }) => {
            if (section.offsetTop <= scrollY) current = section;
        });

        sectionMap.forEach(({ link, section }) => {
            const isActive = section === current;
            link.classList.toggle('active', isActive);
            /* aria-current="page" for accessibility — P1 */
            if (isActive) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    window.addEventListener('scroll', setActive, { passive: true });
    setActive(); /* run once on load */
}


/* ── Hero Canvas — Dense Network Topology ───────────────── */
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let nodes = [], edges = [], packets = [];
    let w = 0, h = 0, rafId = null;

    const CFG = {
        nodeDensity: 38,
        maxDist:    160,
        speed:      0.22,
        maxPackets: 22,
        spawnProb:  0.055,
        lineAlpha:  0.09,
        nodePulse:  0.018,
        pktSpeedLo: 0.005,
        pktSpeedHi: 0.011,
    };

    function resize() {
        w = canvas.width  = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;
        build();
    }

    function build() {
        const count = Math.max(28, Math.floor((w * h) / (CFG.nodeDensity * CFG.nodeDensity)));
        nodes = Array.from({ length: Math.min(count, 80) }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * CFG.speed,
            vy: (Math.random() - 0.5) * CFG.speed,
            phase: Math.random() * Math.PI * 2,
            pSpeed: CFG.nodePulse + Math.random() * 0.012,
            r: 1.2 + Math.random() * 1.8,
        }));
        rebuildEdges();
        packets = [];
        for (let i = 0; i < 8; i++) spawnPacket();
    }

    function rebuildEdges() {
        edges = [];
        const d2 = CFG.maxDist * CFG.maxDist;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist2 = dx * dx + dy * dy;
                if (dist2 < d2) {
                    edges.push({
                        a: i, b: j,
                        alpha: (1 - Math.sqrt(dist2) / CFG.maxDist) * CFG.lineAlpha,
                    });
                }
            }
        }
    }

    function spawnPacket() {
        if (!edges.length) return;
        const ei = (Math.random() * edges.length) | 0;
        packets.push({
            ei,
            t: 0,
            speed: CFG.pktSpeedLo + Math.random() * (CFG.pktSpeedHi - CFG.pktSpeedLo),
            rev: Math.random() < 0.5,
        });
    }

    let frameCount = 0;
    function frame() {
        ctx.clearRect(0, 0, w, h);
        frameCount++;

        for (const n of nodes) {
            n.x += n.vx; n.y += n.vy; n.phase += n.pSpeed;
            if (n.x < 0 || n.x > w) n.vx *= -1;
            if (n.y < 0 || n.y > h) n.vy *= -1;
        }

        if (frameCount % 90 === 0) rebuildEdges();

        for (const e of edges) {
            const a = nodes[e.a], b = nodes[e.b];
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(159,201,10,${e.alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }

        for (const n of nodes) {
            const p = (Math.sin(n.phase) + 1) * 0.5;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(159,201,10,${0.12 + p * 0.30})`;
            ctx.fill();
        }

        for (let i = packets.length - 1; i >= 0; i--) {
            const pk = packets[i];
            if (pk.ei >= edges.length) { packets.splice(i, 1); continue; }

            const e = edges[pk.ei];
            const [from, to] = pk.rev ? [nodes[e.b], nodes[e.a]] : [nodes[e.a], nodes[e.b]];

            pk.t += pk.speed;
            if (pk.t >= 1) {
                packets.splice(i, 1);
                if (Math.random() < 0.8) spawnPacket();
                continue;
            }

            const x = from.x + (to.x - from.x) * pk.t;
            const y = from.y + (to.y - from.y) * pk.t;

            const g = ctx.createRadialGradient(x, y, 0, x, y, 12);
            g.addColorStop(0, 'rgba(159,201,10,0.4)');
            g.addColorStop(1, 'rgba(159,201,10,0)');
            ctx.beginPath();
            ctx.arc(x, y, 12, 0, Math.PI * 2);
            ctx.fillStyle = g;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, 2.8, 0, Math.PI * 2);
            ctx.fillStyle = '#9FC90A';
            ctx.fill();
        }

        if (packets.length < CFG.maxPackets && Math.random() < CFG.spawnProb) spawnPacket();

        rafId = requestAnimationFrame(frame);
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) { cancelAnimationFrame(rafId); }
        else { rafId = requestAnimationFrame(frame); }
    });

    let rTimer;
    window.addEventListener('resize', () => {
        clearTimeout(rTimer);
        rTimer = setTimeout(resize, 150);
    });

    resize();
    rafId = requestAnimationFrame(frame);
}


/* ── Typewriter — Hero Eyebrow ───────────────────────────── */
function initTypewriter() {
    const el     = document.getElementById('eyebrowText');
    const cursor = document.querySelector('.eyebrow-cursor');
    if (!el) return;

    /* Cycles through brand status lines — reflects current partnership state */
    const lines = [
        'Field-Validated AI Compression Technology',
        'IAI Paid Pilot · Video, Data & Image',
        'FDA-Validated · ASTRA Program Member',
    ];

    const typeSpeed   = 36;
    const eraseSpeed  = 18;
    const holdMs      = 2400;

    /* P7 — if reduced motion, show first line immediately and stop */
    if (prefersReducedMotion) {
        el.textContent = lines[0];
        if (cursor) cursor.style.display = 'none';
        return;
    }

    let lineIdx = 0;

    const typeLine = (txt, done) => {
        let i = 0;
        const t = setInterval(() => {
            el.textContent += txt[i++];
            if (i >= txt.length) { clearInterval(t); done(); }
        }, typeSpeed);
    };

    const eraseLine = (done) => {
        const t = setInterval(() => {
            const cur = el.textContent;
            el.textContent = cur.slice(0, -1);
            if (!el.textContent.length) { clearInterval(t); done(); }
        }, eraseSpeed);
    };

    const cycle = () => {
        const txt = lines[lineIdx % lines.length];
        typeLine(txt, () => {
            setTimeout(() => {
                eraseLine(() => {
                    lineIdx++;
                    cycle();
                });
            }, holdMs);
        });
    };

    setTimeout(cycle, 600);
}


/* ── Scroll Observer — Reveal Animations ────────────────── */
function initScrollObserver() {
    /* P7 — if reduced motion, reveal everything immediately */
    if (prefersReducedMotion) {
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.classList.add('visible');
        });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -32px 0px',
    });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}


/* ── Counters — Metrics Bleed ────────────────────────────── */
function initCounters() {
    const els = document.querySelectorAll('.m-count[data-target]');
    if (!els.length) return;

    /* P7 — show final values immediately for reduced motion */
    if (prefersReducedMotion) {
        els.forEach(el => { el.textContent = el.dataset.target; });
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    els.forEach(el => observer.observe(el));
}

function countUp(el) {
    const target = parseInt(el.dataset.target, 10);
    const dur    = 1200;
    const start  = performance.now();

    const tick = (now) => {
        const progress = Math.min((now - start) / dur, 1);
        /* ease-out-expo — P7 spring/physics principle */
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
}


/* ── Smooth Scroll ───────────────────────────────────────── */
function initSmoothScroll() {
    const navH = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-h') || '68',
        10
    );

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - navH;
            window.scrollTo({
                top,
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
            });
            /* P1 — move focus to the target section after scroll */
            setTimeout(() => {
                if (target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
            }, prefersReducedMotion ? 0 : 650);
        });
    });
}


/* ── Parallax Ghost Numbers ──────────────────────────────── */
function initParallaxGhostNums() {
    const ghosts = document.querySelectorAll('.ghost-num');
    if (!ghosts.length) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            ghosts.forEach(el => {
                const hdr  = el.closest('.section-hdr');
                if (!hdr) return;
                const rect  = hdr.getBoundingClientRect();
                const mid   = rect.top + rect.height / 2;
                const ratio = (window.innerHeight / 2 - mid) / window.innerHeight;
                el.style.transform = `translateY(${ratio * 28}px)`;
            });
            ticking = false;
        });
    }, { passive: true });
}
