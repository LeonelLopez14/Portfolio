import { useEffect, useRef, useState } from "react";
import { TfiLocationPin } from "react-icons/tfi";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import me from '../assets/me.jpg'
import '../index.css';
import gsap from 'gsap';

function Hero() {
    const [fase, setFase] = useState("inicial");
    const glowRef = useRef(null);
    const photoRef = useRef(null);
    const [hovered, setHovered] = useState(false);
    const bracketRef = useRef(null);
    const leftBracket = useRef(null);
    const rightBracket = useRef(null);
    const contentRef = useRef(null);
    const textRef = useRef(null);
    const buttonsRef = useRef(null);
    const brandRef = useRef(null);
    const finalContainerRef = useRef(null);

useEffect(() => {

    gsap.to(".blob-1", {
        x: 200,
        y: -100,
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".blob-2", {
        x: -150,
        y: 120,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".blob-3", {
        x: 100,
        y: 180,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true
    });

    gsap.to(bracketRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

}, []);

    // separate effect to react to hover state for the glow
useEffect(() => {

    if (!glowRef.current) return;

    if (hovered) {

        gsap.to(glowRef.current, {
            scale: 1.5,
            opacity: 1,
            duration: 0.4
        });

    } else {

        gsap.to(glowRef.current, {
            scale: 1.2,
            opacity: 0.8,
            duration: 0.4
        });

    }

}, [hovered]);

useEffect(() => {

    if (fase !== "expandido") return;

    const tl = gsap.timeline();

    tl.to(leftBracket.current, {
        x: -350,
        duration: 1,
        ease: "power3.out"
    })

    .to(rightBracket.current, {
        x: 350,
        duration: 1,
        ease: "power3.out"
    }, "<")

    .from(photoRef.current, {
        opacity: 0,
        scale: 0.7,
        duration: 0.8,
        ease: "power3.out"
    })

    .from(textRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.4")

    .from(buttonsRef.current.children, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out"
    }, "-=0.4");

}, [fase]);

useEffect(() => {

    if (fase !== "expandido") return;

    const timer = setTimeout(() => {
        setFase("final");
    }, 4000);

    return () => clearTimeout(timer);

}, [fase]);

useEffect(() => {

    if (fase !== "final") return;

    const tl = gsap.timeline();

    tl.to(contentRef.current, {
        scale: 1.08,
        duration: 1,
        ease: "power3.out"
    })

    .from(brandRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
    });

}, [fase]);

    return (
        <section className="relative flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,#0a1628_0%,#080c14_70%)] min-h-screen text-white px-6">
        <div className="blob blob-1 absolute w-150 h-150 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="blob blob-2 absolute w-125 h-125 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="blob blob-3 absolute w-137.5 h-137.5 rounded-full bg-sky-500/20 blur-[120px]" />
            {/* ESTADO INICIAL */}
            {fase === "inicial" && (
        <div
        onClick={() => setFase("expandido")}
        className="cursor-pointer select-none relative flex flex-col items-center"
        >

        {/* Glow respirando */}

        <div
            ref={glowRef}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="absolute w-112.5 h-112.5 rounded-full bg-cyan-500/20 blur-3xl"/>

        {/* Corchetes */}
        <h1
            ref={bracketRef}
            className=" text-8xl md:text-[12rem] font-bold text-center  text-white drop-shadow-[0_0_40px_rgba(34,211,238,0.8)]">
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
                <div
                    ref={finalContainerRef}
                    className="max-w-6xl w-full">

                    {/* NOMBRE SOLO EN FASE FINAL */}
                    {fase === "final" && (
                        <div
                            ref={brandRef}
                            className="text-center mb-16">
                            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] uppercase">
                            {"{ Castagno Dev }"}
                            </h1>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row items-center justify-center gap-10">

                    {fase === "expandido" && (
                        <span
                            ref={leftBracket}
                            className="text-8xl md:text-9xl font-bold drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">
                        {"{"}
                        </span>
                    )}

                        {/* CONTENIDO */}
                        <div
                            ref={contentRef}
                            className="flex flex-col md:flex-row items-center gap-14">

                            <img
                                ref={photoRef}
                                src={me}
                                alt="Leonel López"
                                className='rounded-2xl object-cover  w-64 h-64'
                            />

                            <div
                                ref={textRef}
                                className=''
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
                            
                                <div
                                    ref={buttonsRef}
                                    className="flex items-center gap-4 mt-8">

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
                            <span
                                ref={rightBracket}
                                className="text-8xl md:text-9xl font-bold drop-shadow-[0_0_20px_rgba(34,211,238,0.8)]">
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