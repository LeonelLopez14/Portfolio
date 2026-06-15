import { Link } from "react-router-dom";
import '../index.css';

function Navbar() {
    return (
        <nav>
            <div className="flex justify-center items-center bg-cyan-800 p-3 z-99">
                {/*<span className="flex place-self-start ">Logo</span>*/}
                <ul className="flex flex-row space-x-5 space-y-2 text-2xl antialiased font-medium tracking-wide list-none text-white">
                    <li><Link to="/">INICIO</Link></li>
                    <li><Link to="/about">SOBRE MI</Link></li>
                    <li><Link to="./contact">CONTACTO</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar