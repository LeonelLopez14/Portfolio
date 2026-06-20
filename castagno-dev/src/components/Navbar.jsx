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
            gsap.set(iconRefs.current, {
            opacity: 0,
            scale: 0.8
        });
        if (!navRef.current) return;

        const yaAnimado =
            sessionStorage.getItem('navbarAnimated');

        if (!yaAnimado) {
            gsap.from(navRef.current, {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }

        sessionStorage.setItem(
            'navbarAnimated',
            'true'
        )

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

            tl.to(containerRef.current, {
                paddingInline: 40,
                duration: 0.4,
                ease: 'power3.out'
            }, 0);

            tl.to(listRef.current, {
                gap: 32,
                duration: 0.4,
                ease: 'power3.out'
            }, 0);

            tl.to(iconRefs.current, {
                opacity: 0,
                y: -10,
                scale: 0.8,
                stagger: 0.03,
                duration: 0.25
            }, 0);

            tl.to(textRefs.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.03,
                duration: 0.3
            }, '-=0.1');

            tl.to(linkRefs.current, {
                width: 120,
                duration: 0.3,
                ease: 'power3.out'
            });

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
                duration: 0.25
            }, 0);

            tl.to(iconRefs.current, {
                opacity: 1,
                y: 0,
                scale: 1,
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
                    z-10
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
    "
>
                            >
                                <span
                                    ref={(el) => (textRefs.current[index] = el)}
                                    className="absolute whitespace-nowrap"
                                >
                                    {item.name}
                                </span>

                                <span
                                    ref={(el) => (iconRefs.current[index] = el)}
                                    lassName="absolute opacity-0"
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