import '../index.css';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { FiMail, FiGithub, FiLinkedin, FiInstagram, FiSend } from 'react-icons/fi';
import { TfiLocationPin } from 'react-icons/tfi';
gsap.registerPlugin(SplitText);

// ─── Canvas de partículas ascendentes ────────────────────────────────────────
function ParticleCanvas() {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx    = canvas.getContext('2d');
        let animId;

        const resize = () => {
            canvas.width  = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Generar partículas
        const count = 55;
        const pts   = Array.from({ length: count }, () => ({
            x:     Math.random() * canvas.width,
            y:     Math.random() * canvas.height,
            r:     Math.random() * 1.5 + 0.3,
            speed: Math.random() * 0.4 + 0.15,
            alpha: Math.random() * 0.4 + 0.1,
            color: Math.random() > 0.6 ? '#a78bfa' : Math.random() > 0.4 ? '#60a5fa' : '#22d3ee',
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            pts.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fill();
                p.y -= p.speed;
                if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
            });
            ctx.globalAlpha = 1;
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}

// ─── Input con línea animada ──────────────────────────────────────────────────
function Field({ label, id, type = 'text', placeholder, name, required, textarea }) {
    const lineRef = useRef(null);

    const onFocus = () => gsap.to(lineRef.current, { scaleX: 1, duration: 0.35, ease: 'power3.out' });
    const onBlur  = () => gsap.to(lineRef.current, { scaleX: 0, duration: 0.3,  ease: 'power3.in'  });

    const shared = "w-full bg-transparent text-slate-200 placeholder-slate-600 text-sm outline-none py-3 pr-3";

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-xs uppercase tracking-widest text-slate-500 font-medium">
                {label}{required && <span className="text-cyan-400 ml-1">*</span>}
            </label>
            <div className="relative border-b border-slate-700/60">
                {textarea ? (
                    <textarea
                        id={id} name={name} placeholder={placeholder} required={required}
                        rows={5} onFocus={onFocus} onBlur={onBlur}
                        className={shared + " resize-none"}
                    />
                ) : (
                    <input
                        id={id} name={name} type={type} placeholder={placeholder} required={required}
                        onFocus={onFocus} onBlur={onBlur}
                        className={shared}
                    />
                )}
                {/* Línea de foco */}
                <div
                    ref={lineRef}
                    className="absolute bottom-0 left-0 h-px w-full"
                    style={{
                        background: 'linear-gradient(90deg, #22d3ee, #a78bfa)',
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                    }}
                />
            </div>
        </div>
    );
}

// ─── Componente principal ─────────────────────────────────────────────────────
function Contact() {
    const [sending,  setSending]  = useState(false);
    const [sent,     setSent]     = useState(false);

    const titleRef  = useRef(null);
    const lineRef   = useRef(null);
    const leftRef   = useRef(null);
    const rightRef  = useRef(null);
    const btnRef    = useRef(null);

    // Animaciones de entrada
    useEffect(() => {
        const el = titleRef.current;
        if (!el) return;

        const split = new SplitText(el, { type: 'chars' });
        gsap.set(split.chars, { opacity: 0 });

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();

            // Chars suben desde abajo
            gsap.fromTo(split.chars,
                { opacity: 0, y: 50, rotateX: -60 },
                {
                    opacity: 1, y: 0, rotateX: 0,
                    stagger: 0.04, duration: 0.7, ease: 'back.out(2)',
                    transformPerspective: 600,
                }
            );
            // Glow sutil en loop
            gsap.to(split.chars, {
                textShadow: '0 0 25px rgba(167,139,250,0.7), 0 0 50px rgba(167,139,250,0.3)',
                repeat: -1, yoyo: true, duration: 2.5, delay: 0.9,
                stagger: { each: 0.07, from: 'center', repeat: -1 }
            });

            gsap.fromTo(lineRef.current,
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 0.9, delay: 0.45, ease: 'power4.out' }
            );
            gsap.fromTo(leftRef.current,
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 0.8, delay: 0.55, ease: 'power3.out' }
            );
            gsap.fromTo(rightRef.current,
                { opacity: 0, x: 50 },
                { opacity: 1, x: 0, duration: 0.8, delay: 0.65, ease: 'power3.out' }
            );
        }, { threshold: 0.3 });

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        gsap.to(btnRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });

        const form = e.target;
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name:    form.name.value,
                    mail:    form.mail.value,
                    subject: form.subject.value,
                    message: form.message.value,
                }),
            });

            if (!res.ok) throw new Error('Error');
            setSent(true);
            gsap.fromTo(btnRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
            );
        } catch {
            alert('Hubo un error al enviar. Intentá de nuevo.');
        } finally {
            setSending(false);
        }
    };

    const socials = [
        { href: "https://www.linkedin.com/in/leonel-lopez-5bb549306/", icon: FiLinkedin, label: "LinkedIn"  },
        { href: "https://github.com/LeonelLopez14",                    icon: FiGithub,   label: "GitHub"    },
        { href: "https://instagram.com/castagno.dev",                  icon: FiInstagram,label: "Instagram" },
    ];

    return (
        <section
            id="contact"
            className="relative w-full min-h-screen py-28 px-6 overflow-hidden"
            style={{ background: "linear-gradient(160deg, #08051a 0%, #0d0820 40%, #050d1a 70%, #080c14 100%)" }}
        >
            {/* Fondo: blobs violeta/índigo — diferente al resto de páginas */}
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[160px] -z-10 pointer-events-none"
                style={{ background: "rgba(139,92,246,0.12)" }} />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[140px] -z-10 pointer-events-none"
                style={{ background: "rgba(99,102,241,0.1)" }} />
            <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full blur-[120px] -z-10 pointer-events-none"
                style={{ background: "rgba(34,211,238,0.05)" }} />

            {/* Partículas */}
            <ParticleCanvas />

            <div className="relative z-10 max-w-5xl mx-auto">

                {/* Título */}
                <div className="text-center mb-16">
                    <p className="uppercase tracking-[6px] text-violet-400 text-xs font-medium mb-4">
                        Hablemos
                    </p>
                    <h2
                        ref={titleRef}
                        className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-none mb-6"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        CONTACTO
                    </h2>
                    <div
                        ref={lineRef}
                        className="mx-auto h-px w-48 opacity-0"
                        style={{ background: "linear-gradient(90deg, transparent, #a78bfa, transparent)", transformOrigin: "center" }}
                    />
                </div>

                {/* Contenido: info | formulario */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* ── COLUMNA INFO ── */}
                    <div ref={leftRef} className="opacity-0 flex flex-col gap-8">

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">¿Tenés un proyecto?</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                Estoy disponible para oportunidades freelance, trabajo remoto o híbrido.
                                Si tenés una idea, un proyecto o simplemente querés hablar de tecnología,
                                escribime — respondo en menos de 24 horas.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <a href="mailto:castagno.dev@gmail.com"
                                className="flex items-center gap-3 text-slate-300 hover:text-violet-300 transition-colors duration-200 group text-sm">
                                <span className="p-2.5 rounded-xl border border-slate-700/50 group-hover:border-violet-500/30 transition-colors duration-200"
                                    style={{ background: "rgba(139,92,246,0.06)" }}>
                                    <FiMail size={16} />
                                </span>
                                castagno.dev@gmail.com
                            </a>

                            <div className="flex items-center gap-3 text-slate-400 text-sm">
                                <span className="p-2.5 rounded-xl border border-slate-700/50"
                                    style={{ background: "rgba(139,92,246,0.06)" }}>
                                    <TfiLocationPin size={16} />
                                </span>
                                Buscando oportunidades · Remote / Híbrido
                            </div>
                        </div>

                        {/* Redes */}
                        <div>
                            <p className="text-xs uppercase tracking-widest text-slate-600 mb-4">También en</p>
                            <div className="flex gap-3">
                                {socials.map(({ href, icon: Icon, label }) => (
                                    <a key={label} href={href} target="_blank" rel="noreferrer"
                                        className="p-3 rounded-xl border border-slate-700/50 text-slate-400 hover:text-violet-300 hover:border-violet-500/30 transition-all duration-200"
                                        style={{ background: "rgba(139,92,246,0.04)" }}>
                                        <Icon size={18} />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Disponibilidad */}
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-green-500/15"
                            style={{ background: "rgba(34,197,94,0.04)" }}>
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                            </span>
                            <span className="text-green-300 text-xs font-medium tracking-wide">
                                Disponible para nuevas oportunidades
                            </span>
                        </div>

                    </div>

                    {/* ── FORMULARIO ── */}
                    <div ref={rightRef} className="opacity-0">
                        <div
                            className="rounded-2xl border p-8 flex flex-col gap-6"
                            style={{
                                background: "rgba(15, 10, 35, 0.5)",
                                backdropFilter: "blur(24px)",
                                WebkitBackdropFilter: "blur(24px)",
                                borderColor: "rgba(139,92,246,0.12)",
                                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 25px 60px rgba(0,0,0,0.35)",
                            }}
                        >
                            {!sent ? (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                    <Field label="Tu nombre"  id="name"    name="name"    placeholder="John Doe"                 required />
                                    <Field label="Email"      id="mail"    name="mail"    placeholder="johndoe@gmail.com" type="email" required />
                                    <Field label="Asunto"     id="subject" name="subject" placeholder="Ej: Oferta laboral" />
                                    <Field label="Mensaje"    id="message" name="message" placeholder="Contame tu proyecto o propuesta..." required textarea />

                                    <button
                                        ref={btnRef}
                                        type="submit"
                                        disabled={sending}
                                        className="mt-2 flex items-center justify-center gap-3 w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300"
                                        style={{
                                            background: sending
                                                ? "rgba(139,92,246,0.2)"
                                                : "linear-gradient(135deg, rgba(139,92,246,0.8), rgba(99,102,241,0.8))",
                                            border: "1px solid rgba(139,92,246,0.35)",
                                            color: sending ? "rgba(255,255,255,0.5)" : "#fff",
                                            boxShadow: sending ? "none" : "0 4px 24px rgba(139,92,246,0.25)",
                                        }}
                                    >
                                        {sending ? (
                                            <>
                                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                                </svg>
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                <FiSend size={15} />
                                                Enviar mensaje
                                            </>
                                        )}
                                    </button>
                                </form>
                            ) : (
                                // Estado enviado
                                <div className="flex flex-col items-center justify-center gap-5 py-10 text-center">
                                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                                        style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)" }}>
                                        ✓
                                    </div>
                                    <h4 className="text-white font-bold text-xl">Mensaje enviado</h4>
                                    <p className="text-slate-400 text-sm max-w-xs">
                                        Gracias por escribir. Te respondo en menos de 24 horas.
                                    </p>
                                    <button
                                        onClick={() => setSent(false)}
                                        className="text-xs text-violet-400 hover:text-violet-300 underline underline-offset-4 transition-colors"
                                    >
                                        Enviar otro mensaje
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Contact;