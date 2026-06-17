import { Link } from "react-router-dom";
import '../index.css';
import Skills from '../data/Skills';
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

const statusColors = {
    sabido: "text-green-400",
    aprendiendo: "text-yellow-400",
    futuro: "text-violet-400",
};

const statusBorders = {
    sabido: "hover:border-green-400",
    aprendiendo: "hover:border-yellow-400",
    futuro: "hover:border-violet-400",
};

function About() {
    return (
        <section className="py-20 px-6 bg-linear-to-b from-slate-950 via-slate-900 to-blue-950">
            <div className="max-w-7xl mx-auto">

                <div className="space-y-20">

                    {/* INFO */}
                    <div className="max-w-4xl mx-auto text-center pb-10">

                        <h2 className="
                            text-4xl
                            md:text-5xl
                            font-bold
                            text-white
                            mb-5
                            pt-15
                        ">
                            SOBRE MÍ
                        </h2>

                        <div className="space-y-6 pt-5">
                            <p className="
                                text-lg
                                md:text-xl
                                text-slate-300
                                leading-relaxed
                                m-10
                            ">
                                Soy Leonel López, desarrollador Full-Stack en formación. Combino el aprendizaje formal con la exploración autodidacta — si una tecnología me interesa, no espero a que aparezca en un programa de estudios para empezar a probarla.
                            </p>

                            <p className="
                                text-lg
                                md:text-xl
                                text-slate-300
                                leading-relaxed
                            ">
                                Actualmente curso la carrera terciaria de Tecnologías de la Información, donde construyo las bases técnicas que después profundizo por mi cuenta en proyectos reales como este portfolio y otra variedad de proyectos.
                            </p>

                            <p className="
                                text-lg
                                md:text-xl
                                text-slate-300
                                leading-relaxed
                            ">
                                Mi próximo paso técnico es sumar Next.js, TypeScript, PHP y Nest.js a mi stack. Y al terminar la carrera este año, planeo continuar con un Tecnólogo en Ciberseguridad.
                            </p>

                            <p className="
                                text-lg
                                md:text-xl
                                text-slate-300
                                leading-relaxed
                            ">
                                Si buscás un desarrollador que se involucra de verdad con lo que construye, en la sección de proyectos podés ver ese enfoque aplicado.
                            </p>
                        </div>

                        <button
                            className="
                                mt-15
                                px-8
                                py-3
                                rounded-xl
                                bg-blue-600
                                hover:bg-blue-500
                                text-white
                                font-semibold
                                transition-all
                                duration-300
                                hover:-translate-y-1
                            "
                        >
                            <a className="inline-flex items-center gap-3 " href="#skills">
                                Ver tecnologías 
                                <FaArrowDown/>
                            </a>
                        </button>

                    </div>

                    <section id="skills">
                        {/* LEYENDA */}
                    <div className="flex flex-col items-center mt-10 pt-20">

                        <h3 className="
                            text-2xl
                            font-semibold
                            text-white
                            mb-5
                        ">
                            Estado de conocimientos
                        </h3>

                        <div className="
                            flex flex-wrap
                            justify-center
                            gap-8
                            px-8
                            py-4
                            mb-10
                            rounded-2xl
                            bg-slate-800/40
                            border
                            border-slate-700
                            backdrop-blur-md
                        ">

                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                <span className="text-slate-200">
                                    Sabido
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <span className="text-slate-200">
                                    Aprendiendo
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-violet-400"></div>
                                <span className="text-slate-200">
                                    Futuro
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* STACK */}
                    <div className="flex flex-col lg:flex-row gap-10 ">

                        {Skills.map((skillGroup) => (
                            <div
                                key={skillGroup.category}
                                className="
                                    flex-1
                                    rounded-3xl
                                    bg-slate-900/40
                                    border
                                    border-slate-800
                                    p-6
                                    backdrop-blur-md
                                "
                            >
                                <h3 className="
                                    text-3xl
                                    font-bold
                                    text-center
                                    text-white
                                    mb-8
                                ">
                                    {skillGroup.category}
                                </h3>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

                                    {skillGroup.items.map((item) => (
                                        <div
                                            key={item.name}
                                            className={`
                                                flex
                                                flex-col
                                                items-center
                                                justify-center
                                                gap-3
                                                p-5

                                                rounded-2xl

                                                bg-slate-800/40
                                                border
                                                border-slate-700

                                                backdrop-blur-md

                                                hover:bg-slate-700/40
                                                hover:-translate-y-2
                                                hover:shadow-lg
                                                hover:shadow-blue-500/10

                                                transition-all
                                                duration-300

                                                cursor-pointer

                                                ${statusBorders[item.status]}
                                            `}
                                        >
                                            <item.icon
                                                className={`
                                                    text-6xl
                                                    ${statusColors[item.status]}
                                                `}
                                            />

                                            <span className="
                                                text-sm
                                                md:text-base
                                                font-medium
                                                text-center
                                                text-slate-200
                                            ">
                                                {item.name}
                                            </span>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        ))}

                    </div>
                        <div className="flex justify-center mt-12">
                            <Link
                                to="/projects"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    px-8
                                    py-3
                                    rounded-xl
                                    border
                                    border-blue-500
                                    text-blue-300
                                    hover:bg-blue-500
                                    hover:text-white
                                    transition-all
                                    duration-300
                                    hover:-translate-y-1
                                    gap-3
                                "
                            >
                                Ver proyectos
                                <FaArrowRight />
                            </Link>
                        </div>
                    </section>

                </div>

            </div>
    </section>     
    );
}

export default About