import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUser, FiCode, FiMail, FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect, useRef } from "react";
import '../index.css';
import gsap from 'gsap';

const navItems = [
    { name: "INICIO",     path: "/",         icon: FiHome  },
    { name: "SOBRE MI",   path: "/about",    icon: FiUser  },
    { name: "PROYECTOS",  path: "/projects", icon: FiCode  },
    { name: "CONTACTO",   path: "/contact",  icon: FiMail  },
];

// Anchos por ítem (px) para desktop
const TEXT_WIDTHS = [90, 105, 140, 130];
const ICON_WIDTH  = 36;

function Navbar() {
    const textRefs      = useRef([]);
    const iconRefs      = useRef([]);
    const linkRefs      = useRef([]);
    const containerRef  = useRef(null);
    const listRef       = useRef(null);
    const mobileMenuRef = useRef(null);
    const location      = useLocation();

    const [hovered,    setHovered]    = useState(false);
    const [scrolled,   setScrolled]   = useState(false);
    const [menuOpenPath, setMenuOpenPath] = useState(null);
    // El menú está abierto solo si el path activo coincide con cuando se abrió
    const menuOpen = menuOpenPath === location.pathname;
    const setMenuOpen = (val) => setMenuOpenPath(val ? location.pathname : null);
    const [isMobile,   setIsMobile]   = useState(false);

    // Detectar si es móvil
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);


    // Entrada inicial
    useEffect(() => {
        gsap.from(containerRef.current, {
            y: -80, opacity: 0, duration: 1, ease: 'power3.out'
        });
    }, []);

    // Detectar scroll
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Animar menú móvil
    useEffect(() => {
        if (!mobileMenuRef.current || !isMobile) return;
        if (menuOpen) {
            gsap.fromTo(mobileMenuRef.current,
                { opacity: 0, y: -10, scale: 0.97 },
                { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: 'power3.out' }
            );
        } else {
            gsap.to(mobileMenuRef.current, {
                opacity: 0, y: -6, scale: 0.97, duration: 0.18, ease: 'power2.in'
            });
        }
    }, [menuOpen, isMobile]);

    const showText = hovered || !scrolled;

    // Animación expandir / contraer — solo desktop
    useEffect(() => {
        if (isMobile) return;
        if (!linkRefs.current[0]) return;

        const tl = gsap.timeline();

        if (showText) {
            tl.to(iconRefs.current, {
                opacity: 0, y: -8, scale: 0.7, duration: 0.18, stagger: 0.03
            }, 0);
            linkRefs.current.forEach((el, i) => {
                tl.to(el, { width: TEXT_WIDTHS[i], duration: 0.32, ease: 'power3.out' }, 0.05);
            });
            tl.to(containerRef.current, { paddingInline: 36, duration: 0.32, ease: 'power3.out' }, 0.05);
            tl.to(listRef.current,       { gap: 24,          duration: 0.32, ease: 'power3.out' }, 0.05);
            tl.to(textRefs.current, {
                opacity: 1, y: 0, scale: 1, duration: 0.22, stagger: 0.04
            }, 0.22);
        } else {
            tl.to(textRefs.current, {
                opacity: 0, y: 8, scale: 0.75, duration: 0.18, stagger: 0.03
            }, 0);
            linkRefs.current.forEach((el) => {
                tl.to(el, { width: ICON_WIDTH, duration: 0.35, ease: 'power3.out' }, 0.1);
            });
            tl.to(containerRef.current, { paddingInline: 10, duration: 0.35, ease: 'power3.out' }, 0.1);
            tl.to(listRef.current,       { gap: 4,           duration: 0.35, ease: 'power3.out' }, 0.1);
            tl.to(iconRefs.current, {
                opacity: 1, y: 0, scale: 1, duration: 0.25, stagger: 0.04
            }, 0.2);
        }
    }, [showText, isMobile]);

    /* ─── MÓVIL ─────────────────────────────────────────────────────────── */
    if (isMobile) {
        return (
            <nav style={{ zIndex: 50 }}>
                {/* Barra superior móvil */}
                <div
                    ref={containerRef}
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full flex items-center justify-between px-5 py-2.5 text-white text-sm font-medium"
                    style={{
                        background: "rgba(8,12,20,0.85)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                        width: "calc(100% - 2rem)",
                        maxWidth: "420px",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <span className="text-cyan-400 font-bold tracking-widest text-xs uppercase">
                        Castagno Dev
                    </span>
                    <button
                        onClick={() => setMenuOpen(v => !v)}
                        className="text-white p-1 rounded-lg transition-colors"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>
                </div>

                {/* Menú desplegable móvil */}
                {menuOpen && (
                    <div
                        ref={mobileMenuRef}
                        className="fixed top-16 left-1/2 -translate-x-1/2 z-50 rounded-2xl py-3 px-2 flex flex-col gap-1"
                        style={{
                            background: "rgba(8,12,20,0.95)",
                            border: "1px solid rgba(255,255,255,0.07)",
                            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                            backdropFilter: "blur(16px)",
                            width: "calc(100% - 2rem)",
                            maxWidth: "420px",
                            opacity: 0,
                        }}
                    >
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200"
                                    style={{
                                        color: isActive ? "#22d3ee" : "rgba(255,255,255,0.8)",
                                        background: isActive ? "rgba(34,211,238,0.06)" : "transparent",
                                    }}
                                >
                                    <item.icon size={16} />
                                    <span className="tracking-widest text-sm">{item.name}</span>
                                    {isActive && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </nav>
        );
    }

    /* ─── DESKTOP ────────────────────────────────────────────────────────── */
    return (
        <nav>
            <div
                ref={containerRef}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="fixed top-5 left-1/2 -translate-x-1/2 z-50 rounded-full backdrop-blur-md shadow-lg text-white text-sm font-medium"
                style={{
                    background: "rgba(8,12,20,0.7)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    paddingBlock: "8px",
                    paddingInline: "36px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
            >
                <ul ref={listRef} className="flex items-center" style={{ gap: "24px" }}>
                    {navItems.map((item, i) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.path} className="relative group">
                                <Link
                                    ref={el => linkRefs.current[i] = el}
                                    to={item.path}
                                    className="relative flex items-center justify-center overflow-hidden h-7"
                                    style={{ width: TEXT_WIDTHS[i] }}
                                >
                                    {/* Texto */}
                                    <span
                                        ref={el => textRefs.current[i] = el}
                                        className="absolute whitespace-nowrap tracking-widest text-xl pointer-events-none"
                                        style={{ color: isActive ? "#22d3ee" : "rgba(255,255,255,0.85)" }}
                                    >
                                        {item.name}
                                    </span>

                                    {/* Ícono */}
                                    <span
                                        ref={el => iconRefs.current[i] = el}
                                        className="absolute pointer-events-none"
                                        style={{
                                            opacity: 0,
                                            color: isActive ? "#22d3ee" : "rgba(255,255,255,0.7)",
                                        }}
                                    >
                                        <item.icon size={16} />
                                    </span>

                                    {/* Línea activa */}
                                    <span
                                        className="absolute bottom-0 left-0 h-px rounded-full transition-all duration-300"
                                        style={{
                                            width: isActive ? "100%" : "0%",
                                            background: "linear-gradient(90deg, #22d3ee, #818cf8)",
                                        }}
                                    />
                                    <span className="absolute bottom-0 left-0 h-px rounded-full w-0 group-hover:w-full transition-all duration-300"
                                        style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8)", opacity: isActive ? 0 : 1 }} />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;