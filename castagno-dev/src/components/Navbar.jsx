import { Link } from "react-router-dom";
import { FiHome, FiUser, FiCode, FiMail } from 'react-icons/fi';
import { useState, useEffect } from "react";
import '../index.css';
const navItems = [
    { name: "INICIO", path: "/", icon: FiHome },
    { name: "SOBRE MI", path: "/about", icon: FiUser },
    { name: "PROYECTOS", path: "/projects", icon: FiCode },
    { name: "CONTACTO", path: "/contact", icon: FiMail }
];

function Navbar() {
    //funcion y evento hovered para activar o descativar la animacion
    const [hovered, setHovered] = useState(false);
    // funcion y evento scrolled para activar o desactivar la animacion
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
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
    
    const showText = !scrolled || hovered; 
    return (
        <nav>
            <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`fixed bg-black/30 flex justify-between items-center gap-16
                        ${scrolled ? "py-2 px-8" : "py-3 px-10"}
                        left-1/2 -translate-x-1/2 top-5 rounded-full backdrop-blur-md text-white shadow-lg z-10
                        transition-all duration-300`}>
                {/*<span className="flex place-self-start ">Logo</span>*/}
                <ul className="flex gap-8 text-xl">
                    {navItems.map((item) => (
                        <li className="relative group cursor-pointer" key={item.path}>
                            <Link to={item.path}>
                                {showText ? item.name : <item.icon />}
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