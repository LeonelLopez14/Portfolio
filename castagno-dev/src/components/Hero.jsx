import { useEffect, useRef, useState } from "react";
import { TfiLocationPin } from "react-icons/tfi";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import me from '../assets/me.jpg'
import '../index.css';
import gsap from 'gsap';
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

function Hero() {
    const [opened, setOpened] = useState(false);
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
    const glowTween = useRef(null);
    const clickRef = useRef(null);



useEffect(() => {

gsap.to(".blob-1",{
    x:600,
    y:-400,
    rotation:360,
    scale:1.8,
    duration:12,
    repeat:-1,
    yoyo:true,
    ease:"sine.inOut"
});

gsap.to(".blob-2",{
    x:-500,
    y:500,
    rotation:-360,
    scale:2,
    duration:10,
    repeat:-1,
    yoyo:true,
    ease:"sine.inOut"
});

gsap.to(".blob-3",{
    x:400,
    y:350,
    rotation:240,
    scale:1.7,
    duration:8,
    repeat:-1,
    yoyo:true,
    ease:"sine.inOut"
});



    gsap.to(bracketRef.current, {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.from(bracketRef.current,{
    scale:0,
    opacity:0,
    rotate:180,
    duration:1.5,
    ease:"elastic.out(1,0.5)"
});

}, []);

useEffect(() => {

    const tl = gsap.timeline({
        repeat:-1,
        yoyo:true
    });

    tl.to(clickRef.current,{
        y:10,
        opacity:0.5,
        duration:1
    });

    tl.to(clickRef.current,{
        textShadow:"0 0 40px #22d3ee",
        duration:1
    },0);

}, []);


    // separate effect to react to hover state for the glow
useEffect(() => {

    glowTween.current = gsap.to(glowRef.current,{
        scale:1.3,
        opacity:0.8,
        duration:2,
        repeat:-1,
        yoyo:true
    });

    return () => glowTween.current?.kill();

}, []);

useEffect(() => {

    if (!glowTween.current) return;

    if (hovered) {

        glowTween.current.pause();

        gsap.to(glowRef.current,{
            scale:2.2,
            opacity:1,
            duration:0.3
        });

    } else {

        gsap.to(glowRef.current,{
            scale:1.3,
            opacity:0.8,
            duration:0.3,
            onComplete: () => glowTween.current.resume()
        });

    }

}, [hovered]);

useEffect(() => {

    if (!opened) return;

    const split = new SplitText(
    brandRef.current,
    {
        type: "chars"
    }
);

gsap.set(leftBracket.current,{
    opacity:1,
    scale:1,
    x:0,
    y:0,
    rotation:0
});

gsap.set(rightBracket.current,{
    opacity:1,
    scale:1,
    x:0,
    y:0,
    rotation:0
});

gsap.killTweensOf([
    leftBracket.current,
    rightBracket.current
]);

gsap.set([
    leftBracket.current,
    rightBracket.current
],{
    clearProps:"transform"
});
    
    const tl = gsap.timeline();

    tl.to(leftBracket.current,{
    scale:1.8,
    rotation:-20,
    duration:0.5
},0);

tl.to(rightBracket.current,{
    scale:1.8,
    rotation:20,
    duration:0.5
},0);

tl.to(leftBracket.current,{
    scale:1.8,
    rotation:-20,
    duration:0.5,
    ease:"power4.out"
},0);

tl.to(rightBracket.current,{
    scale:1.8,
    rotation:20,
    duration:0.5,
    ease:"power4.out"
},0);

tl.to(leftBracket.current,{
    x:-350,
    duration:0.8,
    ease:"power3.out"
},0.4);

tl.to(rightBracket.current,{
    x:350,
    duration:0.8,
    ease:"power3.out"
},0.4);

tl.to(leftBracket.current,{
    x: 230,
    y:-270,
    rotation:0,
    scale:1.1,
    duration:1.2,
    ease:"power4.inOut"
},1.4);

tl.to(rightBracket.current,{
    x: -230,
    y:-270,
    rotation:0,
    scale:1.1,
    duration:1.2,
    ease:"power4.inOut"
},1.4);

tl.from(photoRef.current,{
    opacity:0,
    scale:0.4,
    rotate:-20,
    duration:1,
    ease:"back.out(2)"
},1.4);

tl.from(textRef.current,{
    opacity:0,
    x:100,
    duration:1,
    ease:"power4.out"
},1.6);

tl.from(buttonsRef.current.children,{
    opacity:0,
    y:40,
    stagger:0.1,
    duration:0.5
},1.9);

tl.to(brandRef.current,{
    opacity:1,
    duration:0,
    y:110
},1.5);

tl.from(split.chars,{
    y:150,
    opacity:0,
    scale:2,
    stagger:0.04,
    duration:1,
    ease:"expo.out"
},1.5);

tl.to(split.chars,{
    textShadow:`
        0 0 20px #22d3ee,
        0 0 40px #22d3ee,
        0 0 80px #22d3ee
    `,
    stagger:0.02,
    duration:1
},2.3);

gsap.to(split.chars,{
    textShadow:`
        0 0 20px #22d3ee,
        0 0 40px #22d3ee,
        0 0 80px #22d3ee
    `,
    stagger:0.02,
    repeat:-1,
    yoyo:true,
    duration:2
});

}, [opened]);




    return (
        <section className="relative flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,#0a1628_0%,#080c14_70%)] min-h-screen text-white px-6">
        <div
            className="
                blob
                blob-1
                absolute
                w-175
                h-175
                rounded-full
                bg-cyan-500/20
                blur-[180px]
                -z-10
            "
        />

        <div
            className="
                blob
                blob-2
                absolute
                w-225
                h-225
                rounded-full
                bg-blue-600/20
                blur-[180px]
                -z-10
            "
        />

        <div
            className="
                blob
                blob-3
                absolute
                w-150
                h-150
                rounded-full
                bg-sky-400/20
                blur-[180px]
                -z-10
            "
        />
            {/* ESTADO INICIAL */}
            {!opened && (
        <div
        onClick={() => setOpened(true)}
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
            ref={clickRef}
            className=" mt-8 text-xl md:text-2xl font-semibold tracking-wider text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.8) ">
            Haz clic para descubrir más
        </p>

    </div>
)}

            {/* EXPANDIDO Y FINAL */}
            {opened && (
                <div
                    ref={finalContainerRef}
                    className="max-w-6xl w-full">

                    {/* NOMBRE SOLO EN FASE FINAL */}
                    {opened && (
                        <div className="absolute top-16 left-1/2 -translate-x-1/2">
                            <h1
                                ref={brandRef}
                                className="
                                    brand
                                    opacity-0
                                    text-5xl
                                    md:text-7xl
                                    font-bold
                                    uppercase
                                    text-white
                                "
                            >
                                Castagno Dev
                            </h1>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row items-center justify-center gap-10">

                    {opened && (
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
                        {opened && (
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