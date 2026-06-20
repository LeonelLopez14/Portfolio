import '../index.css';
import ProjectsDetails from '../data/ProjectsData';
import { useState } from 'react';

function Projects() {
    const [filtroTipo, setFiltroTipo] = useState('Todos');
    const [filtroTecnologia, setFiltroTecnologia] = useState('Todas');
    const [proyectoActivo, setProyectoActivo] = useState(null);

    const tipos = [
        'Todos',
        ...new Set(
            ProjectsDetails.map(project => project.type)
        )
    ];

    const tecnologias = [
        'Todas',
        ...new Set(
            ProjectsDetails.flatMap(
                project => project.technologies
            )
        )
    ];

    const toggleProyecto = (nombre) => {
        setProyectoActivo(
            proyectoActivo === nombre
                ? null
                : nombre
        );
    };

    const proyectosFiltrados = ProjectsDetails.filter(project => {

        const coincideTipo =
            filtroTipo === 'Todos'
                ? true
                : project.type === filtroTipo;

        const coincideTecnologia =
            filtroTecnologia === 'Todas'
                ? true
                : project.technologies.includes(filtroTecnologia);

        return coincideTipo && coincideTecnologia;
    });

    return (
        <section
            id="projects"
            className="w-full min-h-screen py-30"
        >
            <h1
                className="
                text-5xl
                font-bold
                text-center
                text-white
                mb-16
                "
            >
                MIS PROYECTOS
            </h1>

            {/* FILTROS */}

            <div
                className="
                flex
                flex-col
                md:flex-row
                justify-center
                items-center
                gap-4
                mb-12
                px-10
                "
            >
                <select
                    value={filtroTipo}
                    onChange={(e) =>
                        setFiltroTipo(e.target.value)
                    }
                    className="
                    bg-slate-900
                    border
                    border-blue-800
                    rounded-xl
                    px-4
                    py-2
                    text-white
                    "
                >
                    {tipos.map(tipo => (
                        <option
                            key={tipo}
                            value={tipo}
                        >
                            {tipo}
                        </option>
                    ))}
                </select>

                <select
                    value={filtroTecnologia}
                    onChange={(e) =>
                        setFiltroTecnologia(e.target.value)
                    }
                    className="
                    bg-slate-900
                    border
                    border-blue-800
                    rounded-xl
                    px-4
                    py-2
                    text-white
                    "
                >
                    {tecnologias.map(tech => (
                        <option
                            key={tech}
                            value={tech}
                        >
                            {tech}
                        </option>
                    ))}
                </select>
            </div>

            {/* GRID DE PROYECTOS */}

            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-8
                w-full
                p-10
                "
            >
                {proyectosFiltrados.map((data) => {
                    const expandido =
                        proyectoActivo === data.name;

                    return (
                        <div
                            key={data.name}
                            onClick={() =>
                                toggleProyecto(data.name)
                            }
                            className={`
                                rounded-3xl
                                border
                                backdrop-blur-md
                                text-white
                                flex
                                flex-col
                                cursor-pointer
                                overflow-hidden
                                transition-all
                                duration-500
                                ease-in-out
                                p-6
                                ${
                                    expandido
                                        ? 'bg-slate-900/80 border-blue-500 scale-[1.02] shadow-2xl shadow-blue-900/30'
                                        : 'bg-slate-900/40 border-blue-800 hover:border-blue-600 hover:-translate-y-1'
                                }
                            `}
                        >
                            {/* HEADER */}

                            <div className="flex justify-between items-center mb-4">
                                <h3
                                    className="
                                    text-2xl
                                    font-bold
                                    "
                                >
                                    {data.name}
                                </h3>

                                <span
                                    className={`
                                        px-3
                                        py-1
                                        rounded-full
                                        text-xs
                                        font-medium
                                        ${
                                            data.status === 'completado'
                                                ? 'bg-green-500/20 text-green-300'
                                                : data.status === 'en desarrollo'
                                                ? 'bg-yellow-500/20 text-yellow-300'
                                                : 'bg-blue-500/20 text-blue-300'
                                        }
                                    `}
                                >
                                    {data.status}
                                </span>
                            </div>

                            {/* TIPO */}

                            <p className="text-slate-400 mb-4">
                                {data.type}
                            </p>

                            {/* TECNOLOGÍAS */}

                            <div className="flex flex-wrap gap-2 mb-6">
                                {data.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="
                                        px-2
                                        py-1
                                        text-xs
                                        rounded-md
                                        bg-slate-800
                                        text-slate-300
                                        "
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* ICONOS */}

                            <div
                                className="
                                flex
                                flex-wrap
                                gap-4
                                text-3xl
                                mb-6
                                "
                            >
                                {data.icon.map((Icon, index) => (
                                    <Icon
                                        key={index}
                                        className="
                                        transition-transform
                                        duration-300
                                        hover:scale-125
                                        "
                                    />
                                ))}
                            </div>

                            {/* DESCRIPCIÓN */}

                            <div
                                className={`
                                    transition-all
                                    duration-500
                                    ease-in-out
                                    overflow-hidden
                                    ${
                                        expandido
                                            ? 'max-h-125 opacity-100'
                                            : 'max-h-30 opacity-90'
                                    }
                                `}
                            >
                                <p className="text-slate-300 leading-relaxed">
                                    {expandido
                                        ? data.fullDescription
                                        : data.description}
                                </p>

                                {expandido && (
                                    <div
                                        className="
                                        mt-6
                                        pt-6
                                        border-t
                                        border-slate-700
                                        flex
                                        gap-4
                                        "
                                    >
                                        {data.github && (
                                            <a
                                                href={data.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                className="
                                                px-4
                                                py-2
                                                rounded-xl
                                                bg-blue-600
                                                hover:bg-blue-500
                                                transition-colors
                                                "
                                            >
                                                GitHub
                                            </a>
                                        )}

                                        {data.deploy && (
                                            <a
                                                href={data.deploy}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                className="
                                                px-4
                                                py-2
                                                rounded-xl
                                                bg-green-600
                                                hover:bg-green-500
                                                transition-colors
                                                "
                                            >
                                                Demo
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* FLECHA */}

                            <div
                                className={`
                                    text-center
                                    mt-6
                                    text-blue-400
                                    transition-transform
                                    duration-300
                                    ${
                                        expandido
                                            ? 'rotate-180'
                                            : ''
                                    }
                                `}
                            >
                                ▼
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Projects;