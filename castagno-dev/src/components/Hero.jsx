import { useEffect, useState } from "react";
import { TfiLocationPin } from "react-icons/tfi";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import me from '../assets/me.jpg'
import '../index.css';

function Hero() {
    const [fase, setFase] = useState("inicial");

    useEffect(() => {
        if (fase === "expandido") {
            const timer = setTimeout(() => {
                setFase("final");
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [fase]);

    return (
        <section className="relative flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,#0a1628_0%,#080c14_70%)] min-h-screen text-white px-6">
            {/* ESTADO INICIAL */}
            {fase === "inicial" && (
        <div
        onClick={() => setFase("expandido")}
        className="cursor-pointer select-none relative flex flex-col items-center"
        >

        {/* Glow respirando */}
        <div
            className="absolute w-112.5 h-112.5 rounded-full bg-cyan-500/20 blur-3xl animate-breathe -z-10"/>

        {/* Corchetes */}
        <h1
            className=" text-8xl md:text-[12rem] font-bold text-center  text-white drop-shadow-[0_0_40px_rgba(34,211,238,0.8)] animate-float-bracket">
            {"{ }"}
        </h1>

        {/* Texto */}
        <p
            className=" mt-8 text-xl md:text-2xl font-semibold tracking-wider text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.8) ">
            Haz clic para descubrir más
        </p>

    </div>
)}

            {/* EXPANDIDO Y FINAL */}
            {(fase === "expandido" || fase === "final") && (
                <div className="max-w-6xl w-full">

                    {/* NOMBRE SOLO EN FASE FINAL */}
                    {fase === "final" && (
                        <div className="text-center mb-16">
                            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] uppercase">
                            {"{ Castagno Dev }"}
                            </h1>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row items-center justify-center gap-10">

                    {fase === "expandido" && (
                        <span className="text-8xl md:text-9xl font-bold drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">
                        {"{"}
                        </span>
                    )}

                        {/* CONTENIDO */}
                        <div className="flex flex-col md:flex-row items-center gap-14">

                            <img
                                src={me}
                                alt="Leonel López"
                                className={`rounded-2xl object-cover transition-all duration-700 ${
                                fase === "expandido"
                                    ? "w-64 h-64"
                                    : "w-80 h-80"
                            }`}
                            />

                            <div
                                className={`transition-all duration-700 ${
                                    fase === "expandido"
                                        ? "max-w-xl"
                                        : "max-w-2xl"
                                }`}
                            >
                            
                                <p className="uppercase text-cyan-400 tracking-[4px] text-sm mb-4">
                                    Full-Stack Developer
                                </p>
                            
                                <p className="text-xl text-gray-300 leading-relaxed">
                                    Hola, soy <strong>Leonel López</strong>.
                                    Construyo aplicaciones web modernas
                                    con foco en rendimiento, diseño y
                                    código limpio.
                                </p>
                            
                                <div className="flex items-center gap-2 mt-6 text-gray-400">
                                    <TfiLocationPin />
                                    <span>
                                        Buscando oportunidades · Remote / Híbrido
                                    </span>
                                </div>
                            
                                <div className="flex items-center gap-4 mt-8">

                                <button className="px-8 py-3 border border-cyan-400 rounded-md text-cyan-400 hover:bg-cyan-400                          hover:text-black transition">
                                    Sobre mí
                                </button>

                                <a
                                    href="https://www.linkedin.com/in/leonel-lopez-5bb549306/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 border border-cyan-400 rounded-md text-cyan-400 hover:bg-cyan-400 hover:text-black                           transition"
                                >
                                    <FiLinkedin size={24} />
                                </a>

                                <a
                                    href="https://github.com/LeonelLopez14"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 border border-cyan-400 rounded-md text-cyan-400 hover:bg-cyan-400 hover:text-black                           transition"
                                >
                                    <FiGithub size={24} />
                                </a>

                                <a
                                    href="https://instagram.com/castagno.dev"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-3 border border-cyan-400 rounded-md text-cyan-400 hover:bg-cyan-400 hover:text-black                           transition"
                                >
                                    <FiInstagram size={24} />
                                </a>

                            </div>
                            </div>
                        </div>

                        {/* CORCHETE DERECHO */}
                        {fase === "expandido" && (
                            <span className="text-8xl md:text-9xl font-bold drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">
                                {"}"}
                            </span>
                        )}

                    </div>
                </div>
            )}
        </section>
    );
}

export default Hero;