import { useEffect, useRef, useState } from "react";
import { TfiLocationPin } from "react-icons/tfi";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import me from '../assets/me.jpg';
import '../index.css';
import gsap from 'gsap';
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);
import "flag-icons/css/flag-icons.min.css";

// ─── Canvas de ondas topográficas ────────────────────────────────────────────
function WaveCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animId;
        let t = 0;

        const resize = () => {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Configuración de líneas
        const LINES       = 14;       // cantidad de ondas
        const LINE_WIDTH  = 1.8;      // px
        const COLOR       = "rgba(34,211,238,"; // cyan-400 base
        const SPEED       = 0.0001;   // velocidad del loop

        const draw = () => {
            const W = canvas.width;
            const H = canvas.height;
            ctx.clearRect(0, 0, W, H);

            for (let l = 0; l < LINES; l++) {
                const progress = l / (LINES - 1);               // 0..1
                // cada onda ocupa una franja vertical del canvas
                const baseY    = H * 0.15 + progress * H * 0.7;
                // opacidad más alta en el centro, se desvanece en bordes
                const alpha    = 0.08 + 0.22 * Math.sin(Math.PI * progress);

                ctx.beginPath();
                ctx.lineWidth = LINE_WIDTH;
                ctx.strokeStyle = COLOR + alpha + ")";

                const STEPS = 180;
                for (let s = 0; s <= STEPS; s++) {
                    const x = (s / STEPS) * W;
                    // Superponer varias frecuencias por línea
                    const y = baseY
                        + Math.sin(s * 0.045 + t + l * 0.5)          * 22
                        + Math.sin(s * 0.022 + t * 1.3 + l * 0.9)    * 14
                        + Math.sin(s * 0.080 + t * 0.7 + l * 0.3)    *  7;

                    s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            t += SPEED * 60; // normalizar a 60fps
            animId = requestAnimationFrame(draw);
        };

        draw();
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0, opacity: 1 }}
        />
    );
}
// ─────────────────────────────────────────────────────────────────────────────

function Hero() {
    const [opened, setOpened] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const glowRef = useRef(null);
    const photoRef = useRef(null);
    const effectPhotoRef = useRef(null);
    const [hovered, setHovered] = useState(false);

    const leftBracket  = useRef(null);
    const rightBracket = useRef(null);

    const textRef    = useRef(null);
    const buttonsRef = useRef(null);
    const brandRef   = useRef(null);
    const clickRef   = useRef(null);
    const glowTween  = useRef(null);
    const particlesRef = useRef([]);

    // --- Blobs + partículas ---
    useEffect(() => {
        gsap.to(".blob-1", { x: 600, y: -400, rotation: 360, scale: 1.8, duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".blob-2", { x: -500, y: 500, rotation: -360, scale: 2,   duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".blob-3", { x: 400,  y: 350, rotation: 240,  scale: 1.7, duration:  8, repeat: -1, yoyo: true, ease: "sine.inOut" });

        particlesRef.current.forEach((el, i) => {
            if (!el) return;
            gsap.to(el, {
                y: gsap.utils.random(-80, -160),
                x: gsap.utils.random(-40, 40),
                opacity: 0,
                duration: gsap.utils.random(3, 6),
                repeat: -1,
                delay: i * 0.4,
                ease: "power1.out",
                onRepeat: () => gsap.set(el, { y: 0, opacity: gsap.utils.random(0.2, 0.6) })
            });
        });
    }, []);

    // --- Click hint pulsing ---
    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(clickRef.current, { y: 10, opacity: 0.5, duration: 1 });
        tl.to(clickRef.current, { textShadow: "0 0 40px #22d3ee", duration: 1 }, 0);
    }, []);

    // --- Glow pulsing ---
    useEffect(() => {
        glowTween.current = gsap.to(glowRef.current, {
            scale: 1.3, opacity: 0.8, duration: 2, repeat: -1, yoyo: true
        });
        return () => glowTween.current?.kill();
    }, []);

    useEffect(() => {
        if (!glowTween.current) return;
        if (hovered) {
            glowTween.current.pause();
            gsap.to(glowRef.current, { scale: 2.2, opacity: 1, duration: 0.3 });
        } else {
            gsap.to(glowRef.current, {
                scale: 1.3, opacity: 0.8, duration: 0.3,
                onComplete: () => glowTween.current.resume()
            });
        }
    }, [hovered]);

    // --- Corchetes: posición inicial centrada ---
    useEffect(() => {
        gsap.set(leftBracket.current,  { x: -44 });
        gsap.set(rightBracket.current, { x:  44 });

        gsap.to([leftBracket.current, rightBracket.current], {
            y: -15, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut"
        });

        gsap.from([leftBracket.current, rightBracket.current], {
            scale: 0, opacity: 0, rotate: 180, duration: 1.5, ease: "elastic.out(1,0.5)"
        });
    }, []);

    // --- Click: apertura ---
    const handleOpen = () => {
        if (opened) return;
        setOpened(true);

        gsap.killTweensOf([leftBracket.current, rightBracket.current]);

        const tl = gsap.timeline({ onComplete: () => setShowContent(true) });

        tl.to(leftBracket.current,  { x: -80,  scale: 1.8, rotation: -20, duration: 0.5, ease: "power4.out" }, 0);
        tl.to(rightBracket.current, { x:  80,  scale: 1.8, rotation:  20, duration: 0.5, ease: "power4.out" }, 0);

        tl.to(leftBracket.current,  { x: -550, duration: 0.8, ease: "power3.out" }, 0.4);
        tl.to(rightBracket.current, { x:  550, duration: 0.8, ease: "power3.out" }, 0.4);

        tl.to(leftBracket.current,  { x: -530, y: -10, rotation: 0, scale: 1.1, duration: 1.2, ease: "power4.inOut" }, 1.3);
        tl.to(rightBracket.current, { x:  530, y: -10, rotation: 0, scale: 1.1, duration: 1.2, ease: "power4.inOut" }, 1.3);

        tl.to(clickRef.current,  { opacity: 0, duration: 0.3 }, 0);
        tl.to(glowRef.current,   { opacity: 0, scale: 0, duration: 0.3 }, 0);
    };

    // --- Contenido expandido ---
    useEffect(() => {
        if (!showContent) return;

        const split = new SplitText(brandRef.current, { type: "chars" });
        const tl = gsap.timeline();

        tl.to(brandRef.current,  { y: 120, opacity: 1, duration: 0 }, 0);
        tl.from(split.chars, { y: 80, opacity: 0, scale: 1.5, stagger: 0.04, duration: 0.8, ease: "expo.out" }, 0);

        tl.from(photoRef.current, { opacity: 0, scale: 0.4, rotate: -20, duration: 1, ease: "back.out(2)" }, 0.2);
        tl.from(effectPhotoRef.current, { opacity: 0, scale: 0.4, rotate: -20, duration: 1, ease: "back.out(2)" }, 0.2);
        tl.from(textRef.current,  { opacity: 0, x: 60, duration: 0.9, ease: "power4.out" }, 0.4);
        tl.from(buttonsRef.current.children, { opacity: 1, y: 30, stagger: 0.08, duration: 0.5 }, 0.6);

        tl.to(leftBracket.current,  { x: -320, y: -250, rotation: 0, scale: 0.6, duration: 1.2, ease: "power4.inOut" }, 0.7);
        tl.to(rightBracket.current, { x:  320, y: -250, rotation: 0, scale: 0.6, duration: 1.2, ease: "power4.inOut" }, 0.7);

        const glowAnim = (target) => gsap.to(target, {
            textShadow: "0 0 20px #22d3ee, 0 0 50px #22d3ee, 0 0 90px #22d3ee",
            repeat: -1, yoyo: true, duration: 2
        });

        tl.add(() => {
            glowAnim(split.chars);
            glowAnim(leftBracket.current);
            glowAnim(rightBracket.current);
        }, 0.8);
    }, [showContent]);

    return (
        <section
            onClick={!opened ? handleOpen : undefined}
            className="relative flex items-center justify-center overflow-hidden min-h-screen text-white px-6"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, #0a1628 0%, #080c14 70%)" }}
        >
            {/* Ondas topográficas animadas */}
            <WaveCanvas />

            {/* Blobs */}
            <div className="blob blob-1 absolute w-175 h-175 rounded-full bg-cyan-500/20 blur-[180px] -z-10" />
            <div className="blob blob-2 absolute w-225 h-225 rounded-full bg-blue-600/20 blur-[180px] -z-10" />
            <div className="blob blob-3 absolute w-150 h-150 rounded-full bg-sky-400/20 blur-[180px] -z-10" />

            {/* Partículas */}
            {Array.from({ length: 18 }).map((_, i) => (
                <div
                    key={i}
                    ref={el => particlesRef.current[i] = el}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        width:  `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        left:   `${5 + Math.random() * 90}%`,
                        top:    `${20 + Math.random() * 60}%`,
                        backgroundColor: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#60a5fa' : '#818cf8',
                        opacity: Math.random() * 0.4 + 0.1,
                        zIndex: 0,
                    }}
                />
            ))}

            {/* Corchetes — siempre en el DOM */}
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${opened ? '' : 'cursor-pointer'}`} style={{ zIndex: 2 }}>
                <span ref={leftBracket}  className="text-8xl md:text-[12rem] font-semibold select-none" style={{ textShadow: "0 0 40px rgba(34,211,238,0.8)" }}>{"{"}  </span>
                <span ref={rightBracket} className="text-8xl md:text-[12rem] font-semibold select-none" style={{ textShadow: "0 0 40px rgba(34,211,238,0.8)" }}>{" }"}</span>
            </div>

            {/* Estado inicial */}
            {!opened && (
                <div className="flex flex-col items-center pointer-events-none" style={{ zIndex: 3 }}>
                    <div
                        ref={glowRef}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className="absolute rounded-full bg-cyan-500/20 blur-3xl pointer-events-auto"
                        style={{ width: '28rem', height: '28rem' }}
                    />
                    <div style={{ height: "18rem" }} />
                    <p
                        ref={clickRef}
                        className="mt-8 text-xl md:text-2xl font-semibold tracking-wider text-white"
                        style={{ textShadow: "0 0 12px rgba(34,211,238,0.8)" }}
                    >
                        Haz clic para descubrir más
                    </p>
                </div>
            )}

            {/* Estado expandido */}
            {showContent && (
                <div className="max-w-5xl w-full" style={{ zIndex: 3 }}>
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center">
                        <h1
                            ref={brandRef}
                            className="text-5xl md:text-7xl font-medium uppercase tracking-widest text-white opacity-0 whitespace-nowrap"
                        >
                            Castagno Dev
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-14 mt-8">
                        {/* Foto — clip octagonal */}
                        <div className="relative shrink-0 w-65 h-90">

                            {/* Borde diagonal en cyan */}
                            <div
                                ref={effectPhotoRef}
                                className="absolute inset-0 pointer-events-none z-10"
                                style={{
                                    clipPath: "polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)",
                                    background: "linear-gradient(135deg, rgba(34,211,238,0.5) 0%, transparent 20%, transparent 40%, rgba(34,211,238,0.2) 100%)"
                                }}
                            />

                            <img
                                ref={photoRef}
                                src={me}
                                alt="Leonel López"
                                className="w-full h-full object-cover"
                                style={{
                                    clipPath: "polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)",
                                    filter: "brightness(0.9) saturate(0.85)"
                                }}
                            />

                        </div>
                        <div ref={textRef}>
                            <p className="uppercase text-cyan-400 tracking-[4px] text-sm mb-4">
                                Full-Stack Developer
                            </p>
                            <p className="text-xl text-justify text-gray-300 leading-relaxed max-w-md">
                                ¡Hola! Mi nombre es <strong className="text-white">Leonel López</strong>.
                                Soy estudiante de Bachillerato Tecnológico en Tecnologías de la Información y actualmente construyo aplicaciones web modernas con foco en rendimiento, diseño y código limpio. Bienvenido/a a mi portfolio.
                            </p>
                            <div className="flex items-center gap-2 mt-6 text-gray-400">
                                <TfiLocationPin />
                                <span>Buscando oportunidades · Remote / Híbrido · </span>
                                <span class="fi fi-uy"></span>
                            </div>

                            <div ref={buttonsRef} className="flex items-center gap-4 mt-8">
                                <button className="px-8 py-3 border border-cyan-400 rounded-2xl text-cyan-400 hover:bg-cyan-400 hover:text-black transition">
                                    Sobre mí
                                </button>
                                <a href="https://www.linkedin.com/in/leonel-lopez-5bb549306/" target="_blank" rel="noreferrer"
                                    className="p-3 border border-cyan-400 rounded-2xl text-cyan-400 hover:bg-cyan-400 hover:text-black transition">
                                    <FiLinkedin size={24} />
                                </a>
                                <a href="https://github.com/LeonelLopez14" target="_blank" rel="noreferrer"
                                    className="p-3 border border-cyan-400 rounded-2xl text-cyan-400 hover:bg-cyan-400 hover:text-black transition">
                                    <FiGithub size={24} />
                                </a>
                                <a href="https://instagram.com/castagno.dev" target="_blank" rel="noreferrer"
                                    className="p-3 border border-cyan-400 rounded-2xl text-cyan-400 hover:bg-cyan-400 hover:text-black transition">
                                    <FiInstagram size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Hero;