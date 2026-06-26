import '../index.css';
import ProjectsDetails from '../data/ProjectsData';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

// ─── Utilidades ───────────────────────────────────────────────────────────────
const statusStyle = {
    completado:      { bg: "bg-green-500/15",  text: "text-green-300",  border: "border-green-500/30"  },
    "en desarrollo": { bg: "bg-yellow-500/15", text: "text-yellow-300", border: "border-yellow-500/30" },
    default:         { bg: "bg-blue-500/15",   text: "text-blue-300",   border: "border-blue-500/30"   },
};
const getStatus = (s) => statusStyle[s] ?? statusStyle.default;

// ─── Tarjeta 3D individual ────────────────────────────────────────────────────
function ProjectCard({ data, side, onExpand, isExpanded }) {
    const cardRef = useRef(null);
    const isLeft  = side === "left";

    // Tilt 3D con el mouse
    const handleMouseMove = useCallback((e) => {
        if (isExpanded) return;
        const rect = cardRef.current.getBoundingClientRect();
        const dx   = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
        const dy   = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
        gsap.to(cardRef.current, {
            rotateY: dx * 14, rotateX: -dy * 10, scale: 1.03, transformPerspective: 900,
            duration: 0.2, ease: "power2.out",
        });
    }, [isExpanded]);

    const handleMouseLeave = useCallback(() => {
        if (isExpanded) return;
        gsap.to(cardRef.current, {
            rotateY: isLeft ? -8 : 8, rotateX: 0, scale: 1,
            transformPerspective: 900, duration: 0.6, ease: "power3.out",
        });
    }, [isExpanded, isLeft]);

    // Entrada desde el lado correcto
    useEffect(() => {
        const el = cardRef.current;
        gsap.set(el, { opacity: 0, x: isLeft ? -70 : 70, rotateY: isLeft ? -8 : 8, transformPerspective: 900 });
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            gsap.to(el, { opacity: 1, x: 0, rotateY: isLeft ? -8 : 8, transformPerspective: 900, duration: 0.85, ease: "power3.out" });
        }, { threshold: 0.1 });
        observer.observe(el);
        return () => observer.disconnect();
    }, [isLeft]);

    // Enderezar al expandir, inclinar al cerrar
    useEffect(() => {
        gsap.to(cardRef.current, {
            rotateY: isExpanded ? 0 : (isLeft ? -8 : 8),
            rotateX: 0, scale: 1,
            transformPerspective: 900, duration: 0.55, ease: "power3.out",
        });
    }, [isExpanded, isLeft]);

    const st = getStatus(data.status);

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onExpand(data.name)}
            className="cursor-pointer h-full"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
            <div
                className="rounded-2xl p-6 h-full flex flex-col border transition-colors duration-300"
                style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderColor: isExpanded ? "rgba(34,211,238,0.3)" : "rgba(100,116,139,0.25)",
                    boxShadow: isExpanded
                        ? "0 0 40px rgba(34,211,238,0.07), 0 20px 60px rgba(0,0,0,0.4)"
                        : "0 8px 32px rgba(0,0,0,0.35)",
                }}
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-3 gap-3">
                    <h3 className="text-xl font-bold text-white leading-tight">{data.name}</h3>
                    <span className={"shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium border " + st.bg + " " + st.text + " " + st.border}>
                        {data.status}
                    </span>
                </div>

                <p className="text-xs uppercase tracking-widest text-cyan-400/60 mb-4">{data.type}</p>

                <div className="flex flex-wrap gap-3 text-2xl mb-4">
                    {data.icon.map((Icon, i) => (
                        <Icon key={i} className="text-slate-300 transition-transform duration-200 hover:scale-125" />
                    ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {data.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 text-xs rounded-md text-slate-400 border border-white/8"
                            style={{ background: "rgba(255,255,255,0.04)" }}>
                            {tech}
                        </span>
                    ))}
                </div>

                <p className="text-slate-400 text-sm leading-relaxed flex-1 line-clamp-3">{data.description}</p>

                <p className="mt-4 text-xs tracking-widest uppercase" style={{ color: isExpanded ? "rgba(34,211,238,0.4)" : "rgba(34,211,238,0.35)" }}>
                    {isExpanded ? "Click para cerrar ×" : "Click para ver más →"}
                </p>
            </div>
        </div>
    );
}

// ─── Panel de detalle ─────────────────────────────────────────────────────────
function DetailPanel({ data, side }) {
    const panelRef = useRef(null);
    const isLeft   = side === "left";

    useEffect(() => {
        const el = panelRef.current;
        gsap.set(el, { opacity: 0, x: isLeft ? 35 : -35, scale: 0.97 });
        gsap.to(el, {
            opacity: 1, x: 0, scale: 1,
            duration: 0.65, delay: 0.2, ease: "power3.out",
        });
    }, [isLeft]);

    return (
        <div
            ref={panelRef}
            className="h-full rounded-2xl border p-6 flex flex-col gap-4"
            style={{
                background: "rgba(8, 12, 20, 0.3)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderColor: "rgba(255,255,255,0.06)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.25)",
            }}
        >
            <div className="w-8 h-px rounded-full" style={{ background: "linear-gradient(90deg, #22d3ee, transparent)" }} />
            <h4 className="text-sm font-semibold text-white/80 tracking-wider uppercase">Sobre el proyecto</h4>
            <p className="text-slate-400 text-sm leading-relaxed flex-1">{data.fullDescription}</p>

            <div className="flex gap-3 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {data.github && (
                    <a href={data.github} target="_blank" rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-slate-300 border border-white/8 hover:border-white/20 hover:text-white transition-all duration-200"
                        style={{ background: "rgba(255,255,255,0.04)" }}>
                        GitHub →
                    </a>
                )}
                {data.deploy && (
                    <a href={data.deploy} target="_blank" rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-cyan-300 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-200"
                        style={{ background: "rgba(34,211,238,0.05)" }}>
                        Demo →
                    </a>
                )}
            </div>
        </div>
    );
}

// ─── Fila de proyecto ─────────────────────────────────────────────────────────
function ProjectRow({ data, index, expandedName, onExpand }) {
    const isLeft     = index % 2 === 0;
    const side       = isLeft ? "left" : "right";
    const isExpanded = expandedName === data.name;

    // Card siempre en col-1 si isLeft, col-2 si isRight
    // Panel aparece en la columna opuesta cuando está expandido
    return (
        <div style={{ perspective: "1200px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

                {isLeft ? (
                    <>
                        {/* Par: card izquierda, panel derecha */}
                        <div>
                            <ProjectCard data={data} side="left" onExpand={onExpand} isExpanded={isExpanded} />
                        </div>
                        <div className={isExpanded ? "" : "hidden md:block"}>
                            {isExpanded && <DetailPanel data={data} side="left" />}
                        </div>
                    </>
                ) : (
                    <>
                        {/* Impar: panel izquierda, card derecha */}
                        <div className={isExpanded ? "" : "hidden md:block"}>
                            {isExpanded && <DetailPanel data={data} side="right" />}
                        </div>
                        <div>
                            <ProjectCard data={data} side="right" onExpand={onExpand} isExpanded={isExpanded} />
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

// ─── Componente principal ─────────────────────────────────────────────────────
function Projects() {
    const [filtroTipo,       setFiltroTipo]       = useState("Todos");
    const [filtroTecnologia, setFiltroTecnologia] = useState("Todas");
    const [expandedName,     setExpandedName]     = useState(null);

    const titleRef   = useRef(null);
    const lineRef    = useRef(null);
    const filtersRef = useRef(null);

    const tipos        = ["Todos", ...new Set(ProjectsDetails.map(p => p.type))];
    const tecnologias  = ["Todas", ...new Set(ProjectsDetails.flatMap(p => p.technologies))];

    const proyectosFiltrados = ProjectsDetails.filter(p => {
        const okTipo = filtroTipo       === "Todos" || p.type === filtroTipo;
        const okTech = filtroTecnologia === "Todas" || p.technologies.includes(filtroTecnologia);
        return okTipo && okTech;
    });

    const toggleExpand = (name) => setExpandedName(prev => prev === name ? null : name);

    // Título con SplitText
    useEffect(() => {
        const el = titleRef.current;
        if (!el) return;
        const split = new SplitText(el, { type: "chars" });
        gsap.set(split.chars, { opacity: 0 });

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();

            gsap.fromTo(split.chars,
                { opacity: 0, y: -50, rotateX: 90, scale: 1.3 },
                {
                    opacity: 1, y: 0, rotateX: 0, scale: 1,
                    stagger: 0.045, duration: 0.65, ease: "back.out(2)",
                    transformPerspective: 600,
                }
            );
            gsap.to(split.chars, {
                textShadow: "0 0 30px rgba(34,211,238,0.65), 0 0 60px rgba(34,211,238,0.25)",
                repeat: -1, yoyo: true, duration: 2.5, delay: 0.8,
                stagger: { each: 0.06, from: "center", repeat: -1 }
            });
            gsap.fromTo(lineRef.current,
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 1, delay: 0.5, ease: "power4.out" }
            );
            gsap.fromTo(filtersRef.current,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.55, delay: 0.65, ease: "power3.out" }
            );
        }, { threshold: 0.4 });

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const selectClass = "border rounded-xl px-4 py-2 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors duration-200 cursor-pointer";
    const selectStyle = { background: "rgba(15,23,42,0.7)", backdropFilter: "blur(12px)", borderColor: "rgba(100,116,139,0.25)" };

    return (
        <section
            id="projects"
            className="relative w-full min-h-screen py-28 px-6 overflow-hidden"
            style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, #0a1628 0%, #080c14 60%)" }}
        >

            <div className="relative z-10 max-w-5xl mx-auto">

                {/* Título */}
                <div className="text-center mb-16">
                    <p className="uppercase tracking-[6px] text-cyan-400 text-xs font-medium mb-4">Lo que construí</p>
                    <h2
                        ref={titleRef}
                        className="text-6xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-none mb-6"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        PROYECTOS
                    </h2>
                    <div ref={lineRef} className="mx-auto h-px w-48 opacity-0"
                        style={{ background: "linear-gradient(90deg, transparent, #22d3ee, transparent)", transformOrigin: "center" }} />
                </div>

                {/* Filtros */}
                <div ref={filtersRef} className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-16 opacity-0">
                    <select value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)} className={selectClass} style={selectStyle}>
                        {tipos.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <select value={filtroTecnologia} onChange={e => setFiltroTecnologia(e.target.value)} className={selectClass} style={selectStyle}>
                        {tecnologias.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                {/* Proyectos */}
                <div className="flex flex-col gap-8">
                    {proyectosFiltrados.map((data, index) => (
                        <ProjectRow
                            key={data.name}
                            data={data}
                            index={index}
                            expandedName={expandedName}
                            onExpand={toggleExpand}
                        />
                    ))}
                    {proyectosFiltrados.length === 0 && (
                        <p className="text-center text-slate-600 py-20 text-sm tracking-widest uppercase">
                            Sin resultados para esos filtros
                        </p>
                    )}
                </div>
                    {/* Botón proyectos */}
                <div className="flex justify-center mt-14">
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold transition-all duration-300 hover:translate-1"
                    >
                        Contactame
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Projects;