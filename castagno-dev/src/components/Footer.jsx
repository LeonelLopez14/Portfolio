import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import '../index.css';

function Footer () {
    return (
    <footer className="border-t border-cyan-500/20 py-12 bg-linear-to-r from-slate-900 to-slate-700">

    <div className="max-w-6xl mx-auto flex flex-col items-center">

        <h2 className="text-3xl font-bold text-white uppercase">
            {"{ Castagno Dev }"}
        </h2>

        <p className="text-gray-400 mt-3">
            Construyendo software por pasión.
        </p>

        <div className="flex gap-10 mt-6">
            <a href="https://github.com/LeonelLopez14" target="_blank" rel="noreferrer"
            className=" hover:scale-175 transition-all duration-300">
                <FiGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/leonel-lopez-5bb549306/" target="_blank" rel="noreferrer"
            className=" hover:scale-175 transition-all duration-300">
                <FiLinkedin size={24} />
            </a>
            <a href="https://instagram.com/castagno.dev" target="_blank" rel="noreferrer"
            className=" hover:scale-175 transition-all duration-300">
                <FiInstagram size={24} />
            </a>
        </div>

        <p className="text-gray-500 text-sm mt-8">
            © 2026 Castagno Dev
        </p>

    </div>

</footer>
    );
}

export default Footer