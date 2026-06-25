import { Link } from "react-router-dom";
import { FiHome, FiUser, FiCode, FiMail } from 'react-icons/fi';
import { useState, useEffect } from "react";
import '../index.css';
import { useRef } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
const navItems = [
    { name: "INICIO", path: "/", icon: FiHome },
    { name: "SOBRE MI", path: "/about", icon: FiUser },
    { name: "PROYECTOS", path: "/projects", icon: FiCode },
    { name: "CONTACTO", path: "/contact", icon: FiMail }
];

function Navbar() {
    const textRefs = useRef([]);
    const iconRefs = useRef([]);
    const linkRefs = useRef([]);
    const navRef = useRef(null);
    const containerRef = useRef(null);
    const listRef = useRef(null);
    //funcion y evento hovered para activar o descativar la animacion
    const [hovered, setHovered] = useState(false);
    // funcion y evento scrolled para activar o desactivar la animacion
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        gsap.from(containerRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    }, []);

    useEffect(() => {
            
        if (!navRef.current) return;

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const showText = hovered || !scrolled ;

    useEffect(() => {

        const tl = gsap.timeline();

        if (showText) {

        tl.to(linkRefs.current, {
            width: 120,
            duration: 0.35,
            ease: 'power3.out'
        }, 0);

        tl.to(containerRef.current, {
            paddingInline: 40,
            duration: 0.35,
            ease: 'power3.out'
        }, 0);

        tl.to(listRef.current, {
            gap: 32,
            duration: 0.35,
            ease: 'power3.out'
        }, 0);

        tl.to(iconRefs.current, {
            opacity: 0,
            y: -10,
            scale: 0.8,
            duration: 0.2,
            stagger: 0.03
        }, 0);

        tl.to(textRefs.current, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.25,
            stagger: 0.03
        }, 0.3);
        } else {

            tl.to(containerRef.current, {
                paddingInline: 8,
                duration: 0.4,
                ease: 'power3.out'
            }, 0);

            tl.to(listRef.current, {
                gap: 4,
                duration: 0.4,
                ease: 'power3.out'
            }, 0);

            tl.to(textRefs.current, {
                opacity: 0,
                y: 10,
                scale: 0.8,
                stagger: 0.03,
                duration: 0.3
            }, 0.2);

            tl.to(iconRefs.current, {
                opacity: 1,
                padding: 12,
                y: 0,
                scale: 1.2,
                stagger: 0.03,
                duration: 0.35
            }, 0.1);

            tl.to(linkRefs.current, {
                width: 32,
                duration: 0.4
            });

        }

    }, [showText]);



    return (
        <nav id="navbar" ref={navRef}>
            <div
                ref={containerRef}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="
                    fixed
                    bg-black/30
                    rounded-full
                    backdrop-blur-md
                    text-white
                    shadow-lg
                    z-50
                    left-1/2
                    -translate-x-1/2
                    top-5
                "
            >
                {/*<span className="flex place-self-start ">Logo</span>*/}
                <ul 
                    ref={listRef}
                    className="flex gap-8 text-xl items-center">
                    {navItems.map((item, index) => (
                        <li className="relative group" 
                            key={item.path}>
                            <Link
                                ref={(el) => (linkRefs.current[index] = el)}
                                to={item.path}
                                className="
                                    relative
                                    flex
                                    items-center
                                    justify-center
                                    overflow-hidden
                                    w-30
                                    h-8
                                "
                            >
                                <span
                                    ref={(el) => (textRefs.current[index] = el)}
                                    className="absolute whitespace-nowrap  pointer-events-none"
                                >
                                    {item.name}
                                </span>

                                <span
                                    ref={(el) => (iconRefs.current[index] = el)}
                                    className="absolute opacity-0  pointer-events-none"
                                >
                                    <item.icon />
                                </span>
                                <span className="absolute left-0 bottom-1.25 w-0 h-1 rounded-xl bg-linear-to-r  from-blue-400
                                to-blue-800 transition-all duration-300 group-hover:w-full translate-y-1.5"></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar