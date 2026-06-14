import { Link } from "react-router-dom";
import '../index.css';

function Navbar() {
    return (
        <nav>
            <div className="flex justify-between items-center bg-cyan-800">
                <span>Logo</span>
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/about">Sobre mi</Link></li>
                    <li><Link to="./contact">Contacto</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar