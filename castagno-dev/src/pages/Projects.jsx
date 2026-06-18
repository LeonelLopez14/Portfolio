import '../index.css';
import ProjectsDetails from '../data/ProjectsData';

function Projects() {
    return (
        <section
            id="projects"
            className="w-full min-h-screen pt-30"
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
                {ProjectsDetails.map((data) => (
                    <div
                        key={data.name}
                        className="
                        rounded-3xl
                        bg-slate-900/40
                        border
                        border-blue-800
                        p-6
                        backdrop-blur-md
                        text-white
                        flex
                        flex-col
                        items-center
                        "
                    >
                        <h3
                            className="
                            text-2xl
                            font-bold
                            text-center
                            mb-4
                            "
                        >
                            {data.name}
                        </h3>

                        <span
                            className="
                            text-sm
                            px-3
                            py-1
                            rounded-full
                            bg-blue-900/40
                            mb-4
                            "
                        >
                            {data.status}
                        </span>

                        <p className="text-slate-300 mb-4">
                            {data.type}
                        </p>

                        <div className="flex flex-wrap gap-2 justify-center mb-6">
                            {data.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="
                                    px-2
                                    py-1
                                    text-xs
                                    rounded-md
                                    bg-slate-800
                                    "
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div
                            className="
                            flex
                            flex-wrap
                            justify-center
                            gap-4
                            text-3xl
                            "
                        >
                            {data.icon.map((Icon, index) => (
                                <Icon
                                    key={index}
                                    className="hover:scale-110 transition-transform"
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Projects;