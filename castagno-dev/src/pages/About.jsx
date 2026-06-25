import { Link } from "react-router-dom";
import '../index.css';
import Skills from '../data/Skills';
import gsap from 'gsap';
import { useEffect, useRef } from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

const statusColors = {
    sabido:      "text-green-400",
    aprendiendo: "text-yellow-400",
    futuro:      "text-violet-400",
};

const statusBorders = {
    sabido:      "hover:border-green-400",
    aprendiendo: "hover:border-yellow-400",
    futuro:      "hover:border-violet-400",
};

const statusGlow = {
    sabido:      "hover:shadow-green-500/20",
    aprendiendo: "hover:shadow-yellow-500/20",
    futuro:      "hover:shadow-violet-500/20",
};

// ─── Canvas ondas (reutilizado del Hero) ─────────────────────────────────────
function WaveCanvas({ speed = 0.0001, opacity = 1 }) {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx    = canvas.getContext("2d");
        let animId, t = 0;
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener("resize", resize);
        const LINES = 14, LINE_WIDTH = 1.8, COLOR = "rgba(34,211,238,";
        const draw = () => {
            const W = canvas.width, H = canvas.height;
            ctx.clearRect(0, 0, W, H);
            for (let l = 0; l < LINES; l++) {
                const progress = l / (LINES - 1);
                const baseY    = H * 0.15 + progress * H * 0.7;
                const alpha    = 0.08 + 0.22 * Math.sin(Math.PI * progress);
                ctx.beginPath();
                ctx.lineWidth   = LINE_WIDTH;
                ctx.strokeStyle = COLOR + alpha + ")";
                const STEPS = 180;
                for (let s = 0; s <= STEPS; s++) {
                    const x = (s / STEPS) * W;
                    const y = baseY
                        + Math.sin(s * 0.045 + t + l * 0.5)       * 22
                        + Math.sin(s * 0.022 + t * 1.3 + l * 0.9) * 14
                        + Math.sin(s * 0.080 + t * 0.7 + l * 0.3) *  7;
                    s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
            t += speed * 60;
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
    }, [speed]);
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0, opacity }} />;
}

// ─── Párrafo animado con ScrollTrigger ───────────────────────────────────────
function AnimParagraph({ children, from = "left", delay = 0 }) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            setTimeout(() => {
                gsap.fromTo(el,
                    { opacity: 0, x: from === "left" ? -50 : 50 },
                    { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" }
                );
            }, delay * 1000);
        }, { threshold: 0.2 });
        observer.observe(el);
        return () => observer.disconnect();
    }, [from, delay]);
    return <p ref={ref} className="text-lg md:text-xl text-slate-300 leading-relaxed" style={{ opacity: 0 }}>{children}</p>;
}

// ─── Contenedor de categoría de skills animado ───────────────────────────────
function SkillGroup({ skillGroup, index }) {
    const groupRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
    const el = groupRef.current;
    const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        gsap.fromTo(el,
            { opacity: 0, y: 50, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: index * 0.12, ease: "power3.out" }
        );
        gsap.fromTo(itemsRef.current,
            { opacity: 0, y: 20, scale: 0.9 },
            {
                opacity: 1, y: 0, scale: 1,
                duration: 0.4,
                stagger: 0.05,
                delay: index * 0.12 + 0.15,
                ease: "back.out(1.3)"
            }
        );
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
}, [index]);

    return (
        <div
            ref={groupRef}
            className="flex-1 min-w-0 rounded-3xl bg-slate-900/50 border border-slate-800 p-6 backdrop-blur-md opacity-0"
        >
            <h3 className="text-2xl font-bold text-center text-white mb-8 tracking-wide">
                {skillGroup.category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {skillGroup.items.map((item, i) => (
                    <div
                        key={item.name}
                        ref={el => itemsRef.current[i] = el}
                        className={"flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-slate-800/40 border border-slate-700 backdrop-blur-md hover:bg-slate-700/40 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 cursor-pointer opacity-0 " + statusBorders[item.status] + " " + statusGlow[item.status]}
                    >
                        <item.icon className={"text-5xl " + statusColors[item.status]} />
                        <span className="text-sm md:text-base font-medium text-center text-slate-200 ">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Componente principal ─────────────────────────────────────────────────────
function About() {
    const particlesRef  = useRef([]);
    const titleRef      = useRef(null);
    const subtitleRef   = useRef(null);
    const btnRef        = useRef(null);
    const legendRef     = useRef(null);
    const skillsTitleRef = useRef(null);

    // Partículas y blobs
    const particles = Array.from({ length: 18 }, (_, i) => ({
        w:       (Math.random() * 3 + 1).toFixed(1) + "px",
        h:       (Math.random() * 3 + 1).toFixed(1) + "px",
        left:    (5  + Math.random() * 90).toFixed(1) + "%",
        top:     (20 + Math.random() * 60).toFixed(1) + "%",
        color:   i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#60a5fa" : "#818cf8",
        opacity: (Math.random() * 0.4 + 0.1).toFixed(2),
    }));

    useEffect(() => {
        gsap.to(".blob-about-1", { x: 500,  y: -300, rotation: 360,  scale: 1.8, duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".blob-about-2", { x: -400, y: 400,  rotation: -360, scale: 2,   duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".blob-about-3", { x: 300,  y: 300,  rotation: 240,  scale: 1.7, duration:  8, repeat: -1, yoyo: true, ease: "sine.inOut" });

        particlesRef.current.forEach((el, i) => {
            if (!el) return;
            gsap.to(el, {
                y: gsap.utils.random(-80, -160),
                x: gsap.utils.random(-40, 40),
                opacity: 0,
                duration: gsap.utils.random(3, 6),
                repeat: -1, delay: i * 0.4, ease: "power1.out",
                onRepeat: () => gsap.set(el, { y: 0, opacity: gsap.utils.random(0.2, 0.6) })
            });
        });
    }, []);

    // Animación del título "SOBRE MÍ"
    useEffect(() => {
        const el = titleRef.current;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();

            gsap.fromTo(el,
                { opacity: 0, y: 60, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
            );
            gsap.fromTo(subtitleRef.current,
                { opacity: 0, scaleX: 0 },
                { opacity: 1, scaleX: 1, duration: 1, delay: 0.4, ease: "power4.out" }
            );
            gsap.fromTo(btnRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, delay: 0.5, ease: "power3.out" }
            );
        }, { threshold: 0.3 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Animación de la leyenda y título de skills
    useEffect(() => {
        const targets = [skillsTitleRef.current, legendRef.current];
        targets.forEach((el, i) => {
            const observer = new IntersectionObserver(([entry]) => {
                if (!entry.isIntersecting) return;
                observer.disconnect();
                gsap.fromTo(el,
                    { opacity: 0, y: 25 },
                    { opacity: 1, y: 0, duration: 0.7, delay: i * 0.15, ease: "power3.out" }
                );
            }, { threshold: 0.3 });
            observer.observe(el);
        });
    }, []);

    return (
        <>
        {/* ═══ SECCIÓN SOBRE MÍ ═══════════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-24 px-6" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, #0a1628 0%, #080c14 70%)" }}>

            <WaveCanvas speed={0.0001} />

            {/* Blobs */}
            <div className="blob-about-1 absolute w-175 h-175 rounded-full bg-cyan-500/15 blur-[180px] -z-10" />
            <div className="blob-about-2 absolute w-225 h-225 rounded-full bg-blue-600/15 blur-[180px] -z-10" />
            <div className="blob-about-3 absolute w-150 h-150 rounded-full bg-sky-400/15 blur-[180px] -z-10" />

            {/* Partículas */}
            {particles.map((p, i) => (
                <div key={i} ref={el => particlesRef.current[i] = el}
                    className="absolute rounded-full pointer-events-none"
                    style={{ width: p.w, height: p.h, left: p.left, top: p.top, backgroundColor: p.color, opacity: p.opacity, zIndex: 0 }}
                />
            ))}

            <div className="relative z-10 max-w-4xl mx-auto">

                {/* Título */}
                <div className="text-center mb-16">
                    <p className="uppercase tracking-[6px] text-cyan-400 text-sm font-medium mb-4">
                        Quién soy
                    </p>
                    <h2
                        ref={titleRef}
                        className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-none mb-6"
                    >
                        SOBRE MÍ
                    </h2>
                    {/* Línea decorativa */}
                    <div
                        ref={subtitleRef}
                        className="mx-auto h-px w-48 opacity-0"
                        style={{ background: "linear-gradient(90deg, transparent, #22d3ee, transparent)", transformOrigin: "center" }}
                    />
                </div>

                {/* Párrafos alternados izquierda / derecha */}
                <div className="space-y-10 mb-16">
                    <AnimParagraph from="left" delay={0}>
                        Soy <strong className="text-white font-semibold">Leonel López</strong>, desarrollador Full-Stack en formación. Combino el aprendizaje formal con la exploración autodidacta — si una tecnología me interesa, no espero a que aparezca en un programa de estudios para empezar a probarla.
                    </AnimParagraph>

                    <AnimParagraph from="right" delay={0.05}>
                        Actualmente curso bachillerato tecnológico en Tecnologías de la Información, donde construyo las bases técnicas que después profundizo por mi cuenta en proyectos reales como este portfolio y otra variedad de proyectos.
                    </AnimParagraph>

                    <AnimParagraph from="left" delay={0.05}>
                        Mi próximo paso técnico es sumar <strong className="text-cyan-400">Next.js</strong>, <strong className="text-cyan-400">TypeScript</strong>, <strong className="text-cyan-400">PHP</strong> y <strong className="text-cyan-400">Nest.js</strong> a mi stack. Y al terminar la carrera este año, planeo continuar con un Tecnólogo en Ciberseguridad.
                    </AnimParagraph>

                    <AnimParagraph from="right" delay={0.05}>
                        Si buscás un desarrollador que se involucra de verdad con lo que construye, en la sección de proyectos podés ver ese enfoque aplicado.
                    </AnimParagraph>
                </div>

                {/* Botón */}
                <div className="flex justify-center">
                    <a
                        ref={btnRef}
                        href="#skills"
                        className="opacity-0 inline-flex items-center gap-3 px-8 py-3 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold transition-all duration-300 hover:-translate-y-1"
                    >
                        Ver tecnologías
                        <FaArrowDown />
                    </a>
                </div>

            </div>
        </section>

        {/* ═══ SECCIÓN SKILLS ══════════════════════════════════════════════════ */}
        <section
            id="skills"
            className="relative overflow-hidden py-24 px-6"
            style={{ background: "linear-gradient(180deg, #080c14 0%, #050d1a 40%, #03080f 100%)" }}
        >
            {/* Fondo diferenciado: grid + viñeta */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "linear-gradient(rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.04) 1px, transparent 1px)",
                backgroundSize: "48px 48px"
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
                background: "radial-gradient(ellipse 70% 50% at 50% 50%, transparent 40%, #03080f 100%)"
            }} />
            {/* Línea separadora superior */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, #22d3ee44, transparent)" }} />
            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.3), transparent)" }} />

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Título skills */}
                <div className="flex flex-col items-center mb-12">
                    <p className="uppercase tracking-[6px] text-cyan-400 text-sm font-medium mb-3">Stack técnico</p>
                    <h3
                        ref={skillsTitleRef}
                        className="text-4xl md:text-5xl font-black text-white mb-10 opacity-0 tracking-tight"
                    >
                        Tecnologías
                    </h3>

                    {/* Leyenda */}
                    <div
                        ref={legendRef}
                        className="flex flex-wrap justify-center gap-6 px-8 py-4 mb-6 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-md opacity-0"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                            <span className="text-slate-300 text-sm">Sabido</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
                            <span className="text-slate-300 text-sm">Aprendiendo</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
                            <span className="text-slate-300 text-sm">Futuro</span>
                        </div>
                    </div>
                </div>

                {/* Grid de categorías */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {Skills.map((skillGroup, index) => (
                        <SkillGroup key={skillGroup.category} skillGroup={skillGroup} index={index} />
                    ))}
                </div>

                {/* Botón proyectos */}
                <div className="flex justify-center mt-14">
                    <Link
                        to="/projects"
                        className="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold transition-all duration-300 hover:translate-1"
                    >
                        Ver proyectos
                        <FaArrowRight />
                    </Link>
                </div>

            </div>
        </section>
        </>
    );
}

export default About;