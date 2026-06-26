import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";
import '../index.css';
import "flag-icons/css/flag-icons.min.css";

const links = [
    { name: "Inicio",     path: "/"         },
    { name: "Sobre mí",   path: "/about"    },
    { name: "Proyectos",  path: "/projects" },
    { name: "Contacto",   path: "/contact"  },
];

const socials = [
    { href: "https://github.com/LeonelLopez14",                    icon: FiGithub,    label: "GitHub"    },
    { href: "https://www.linkedin.com/in/leonel-lopez-5bb549306/", icon: FiLinkedin,  label: "LinkedIn"  },
    { href: "https://instagram.com/castagno.dev",                  icon: FiInstagram, label: "Instagram" },
];

function Footer() {
    return (
        <footer className="relative overflow-hidden pt-16 pb-8 px-6"
            style={{ background: "linear-gradient(180deg, #080c14 0%, #050810 100%)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>

            {/* Línea superior con glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
                style={{ background: "linear-gradient(90deg, transparent, #22d3ee, transparent)" }} />

            <div className="max-w-5xl mx-auto">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* Marca */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-black text-white tracking-widest uppercase"
                            style={{ textShadow: "0 0 20px rgba(34,211,238,0.3)" }}>
                            {"{ Castagno Dev }"}
                        </h2>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            Desarrollador Full-Stack construyendo aplicaciones web modernas con foco en rendimiento y diseño.
                        </p>
                        {/* Indicador disponibilidad */}
                        <div className="flex items-center gap-2 mt-1">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                            </span>
                            <span className="text-green-400 text-xs">Disponible para proyectos</span>
                        </div>
                    </div>

                    {/* Navegación */}
                    <div className="flex flex-col gap-3">
                        <p className="text-xs uppercase tracking-widest text-slate-600 mb-1">Páginas</p>
                        {links.map(l => (
                            <Link key={l.path} to={l.path}
                                className="text-slate-400 text-sm hover:text-cyan-400 transition-colors duration-200 w-fit">
                                {l.name}
                            </Link>
                        ))}
                    </div>

                    {/* Contacto + redes */}
                    <div className="flex flex-col gap-4">
                        <p className="text-xs uppercase tracking-widest text-slate-600 mb-1">Redes</p>
                        <div className="flex gap-3">
                            {socials.map(({ href, icon: Icon, label }) => (
                                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                                    className="p-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-200"
                                    style={{ background: "rgba(255,255,255,0.02)" }}>
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                        <a href="mailto:contacto@castagno.dev"
                            className="text-slate-500 text-xs hover:text-slate-300 transition-colors duration-200 mt-1">
                            contacto@castagno.dev
                        </a>
                    </div>

                </div>

                {/* Divisor */}
                <div className="h-px w-full mb-6" style={{ background: "rgba(255,255,255,0.04)" }} />

                {/* Copyright */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p className="text-slate-600 text-xs">© 2026 Castagno Dev · Leonel López</p>
                    <p className="text-slate-700 text-xs">Hecho con garra charrúa   ·   <span class="fi fi-uy"></span></p>
                    
                </div>

            </div>
        </footer>
    );
}

export default Footer;