import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUser, FiCode, FiMail } from 'react-icons/fi';
import { useState, useEffect, useRef } from "react";
import '../index.css';
import gsap from 'gsap';

const navItems = [
    { name: "INICIO",     path: "/",        icon: FiHome  },
    { name: "SOBRE MI",   path: "/about",   icon: FiUser  },
    { name: "PROYECTOS",  path: "/projects", icon: FiCode  },
    { name: "CONTACTO",   path: "/contact", icon: FiMail  },
];

// Anchos por ítem (px) — ajustá si cambiás fuente o tamaño
const TEXT_WIDTHS = [90, 105, 140, 130];
const ICON_WIDTH  = 36;

function Navbar() {
    const textRefs      = useRef([]);
    const iconRefs      = useRef([]);
    const linkRefs      = useRef([]);
    const containerRef  = useRef(null);
    const listRef       = useRef(null);
    const location      = useLocation();

    const [hovered, setHovered] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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

    const showText = hovered || !scrolled;

    // Animación expandir / contraer
    useEffect(() => {
        const tl = gsap.timeline();

        if (showText) {
            // Iconos salen
            tl.to(iconRefs.current, {
                opacity: 0, y: -8, scale: 0.7, duration: 0.18, stagger: 0.03
            }, 0);

            // Links se expanden al ancho exacto de cada texto
            linkRefs.current.forEach((el, i) => {
                tl.to(el, { width: TEXT_WIDTHS[i], duration: 0.32, ease: 'power3.out' }, 0.05);
            });

            tl.to(containerRef.current, { paddingInline: 36, duration: 0.32, ease: 'power3.out' }, 0.05);
            tl.to(listRef.current,       { gap: 24,          duration: 0.32, ease: 'power3.out' }, 0.05);

            // Textos entran
            tl.to(textRefs.current, {
                opacity: 1, y: 0, scale: 1, duration: 0.22, stagger: 0.04
            }, 0.22);

        } else {
            // Textos salen
            tl.to(textRefs.current, {
                opacity: 0, y: 8, scale: 0.75, duration: 0.18, stagger: 0.03
            }, 0);

            // Links se contraen
            linkRefs.current.forEach((el) => {
                tl.to(el, { width: ICON_WIDTH, duration: 0.35, ease: 'power3.out' }, 0.1);
            });

            tl.to(containerRef.current, { paddingInline: 10, duration: 0.35, ease: 'power3.out' }, 0.1);
            tl.to(listRef.current,       { gap: 4,           duration: 0.35, ease: 'power3.out' }, 0.1);

            // Iconos entran
            tl.to(iconRefs.current, {
                opacity: 1, y: 0, scale: 1, duration: 0.25, stagger: 0.04
            }, 0.2);
        }
    }, [showText]);

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

                                    {/* Línea activa / hover */}
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