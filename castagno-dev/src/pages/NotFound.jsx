import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

function NotFound() {
    const codeRef   = useRef(null);
    const titleRef  = useRef(null);
    const subRef    = useRef(null);
    const btnRef    = useRef(null);
    const glowRef   = useRef(null);

    useEffect(() => {
        // Glow pulsing
        gsap.to(glowRef.current, {
            scale: 1.3, opacity: 0.6, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut"
        });

        // "404" — chars caen con rebote
        const split = new SplitText(codeRef.current, { type: "chars" });
        gsap.from(split.chars, {
            opacity: 0, y: -80, rotateX: 90, scale: 1.4,
            stagger: 0.08, duration: 0.8, delay: 0.1, ease: "back.out(2)",
            transformPerspective: 600,
        });
        gsap.to(split.chars, {
            textShadow: "0 0 40px rgba(34,211,238,0.8), 0 0 80px rgba(34,211,238,0.3)",
            repeat: -1, yoyo: true, duration: 2, delay: 0.6,
            stagger: { each: 0.1, from: "center", repeat: -1 }
        });

        // Título y subtítulo
        gsap.from(titleRef.current, { opacity: 0, y: 30, duration: 0.7, delay: 0.5, ease: "power3.out" });
        gsap.from(subRef.current,   { opacity: 0, y: 20, duration: 0.6, delay: 0.7, ease: "power3.out" });
        gsap.from(btnRef.current,   { opacity: 0, y: 20, duration: 0.6, delay: 0.9, ease: "power3.out" });

    }, []);

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6 text-center"
            style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, #0a1628 0%, #080c14 70%)" }}>

            {/* Glow central */}
            <div ref={glowRef} className="absolute rounded-full pointer-events-none"
                style={{ width: "30rem", height: "30rem", background: "rgba(34,211,238,0.06)", filter: "blur(80px)" }} />

            {/* Grid sutil */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: "linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)",
                backgroundSize: "56px 56px"
            }} />

            <div className="relative z-10 flex flex-col items-center gap-6">

                {/* 404 */}
                <p className="text-xs uppercase tracking-[6px] text-cyan-400 mb-2">Error</p>
                <h1
                    ref={codeRef}
                    className="text-[10rem] sm:text-[14rem] font-black text-white leading-none"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    404
                </h1>

                <h2 ref={titleRef} className="text-2xl sm:text-3xl font-bold text-white -mt-4">
                    Página no encontrada
                </h2>

                <p ref={subRef} className="text-slate-400 text-sm max-w-sm leading-relaxed">
                    La página que buscás no existe, fue movida o escribiste mal la dirección.
                </p>

                <Link
                    ref={btnRef}
                    to="/"
                    className="mt-2 px-8 py-3 rounded-xl border border-cyan-400 text-cyan-400 font-semibold text-sm tracking-wide hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:-translate-y-1"
                >
                    Volver al inicio
                </Link>

            </div>
        </section>
    );
}

export default NotFound;