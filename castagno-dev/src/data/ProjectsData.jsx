import { SiReact, SiTailwindcss, SiJavascript, SiGsap, SiNextdotjs, SiSpringboot, SiSpringsecurity, SiHibernate, SiPhp, SiNestjs, SiTypescript, SiMysql, SiDocker, SiGithub, SiFigma, SiVite, SiPostman, SiSwagger, SiXampp } from "react-icons/si";
import { DiJava } from "react-icons/di";

const ProjectsDetails = [
    {
        name: 'Competika',
        description: 'texto corto',
        fullDescription: 'Texto largo',
        technologies: ['JavaScript', 'PHP', 'Tailwind'],
        icon: [ SiJavascript, SiPhp, SiTailwindcss],
        type: 'Full-Stack',
        status: 'en desarrollo',
        github: 'https://github.com/LeonelLopez14/Competika.git',
        deploy: null
    },
    {
        name: 'Login_Api',
        description: 'texto corto',
        fullDescription: 'Texto largo',
        technologies: ['Java', 'SpringBoot', 'SpringSecurity', 'Hibernate', 'MySQL', 'Docker', 'Swagger'],
        icon: [ DiJava, SiSpringboot, SiSpringsecurity, SiHibernate, SiMysql, SiDocker, SiSwagger],
        type: 'API',
        status: 'completado',
        github: 'https://github.com/LeonelLopez14/login_api.git',
        deploy: null
    },
    {
        name: 'Incident-Report-Api',
        description: 'texto corto',
        fullDescription: 'Texto largo',
        technologies: ['JavaScript', 'Java', 'SpringBoot', 'SpringSecurity', 'Hibernate', 'MySQL', 'Docker', 'Swagger'],
        icon: [ SiJavascript, DiJava, SiSpringboot, SiSpringsecurity, SiHibernate, SiMysql, SiDocker, SiSwagger],
        type: 'Full-Stack',
        status: 'en desarrollo',
        github: 'https://github.com/LeonelLopez14/Incident-Report-API.git',
        deploy: null
    },
    {
        name: 'ProyectoFinalBazarApi',
        description: 'texto corto',
        fullDescription: 'Texto largo',
        technologies: ['Java', 'SpringBoot', 'Hibernate', 'MySQL', 'Docker', 'Swagger'],
        icon: [ DiJava, SiSpringboot, SiHibernate, SiMysql, SiDocker, SiSwagger],
        type: 'API',
        status: 'completado',
        github: 'https://github.com/LeonelLopez14/ProyectoFinalBazarApi.git',
        deploy: null
    },
    {
        name: 'Supermercado prueba técnica',
        description: 'texto corto',
        fullDescription: 'Texto largo',
        technologies: ['Java', 'SpringBoot', 'Hibernate', 'MySQL', 'Docker'],
        icon: [ DiJava, SiSpringboot, SiHibernate, SiMysql, SiDocker],
        type: 'API',
        status: 'completado',
        github: 'https://github.com/LeonelLopez14/SupermercadoPruebaTecnica.git',
        deploy: 'https://supermercadopruebatecnica.onrender.com/'
    },
    {
        name: 'GymITS',
        description: 'texto corto',
        fullDescription: 'Texto largo',
        technologies: ['Java', 'SpringBoot', 'Hibernate', 'MySQL'],
        icon: [ DiJava, SiSpringboot, SiHibernate, SiMysql,],
        type: 'Backend',
        status: 'completado',
        github: 'https://github.com/LeonelLopez14/gimnasioITS-ProyectoFinal.git',
        deploy: null
    },
    {
        name: 'Clinica_vet',
        description: 'texto corto',
        fullDescription: 'Texto largo',
        technologies: ['Java', 'SpringBoot', 'Hibernate', 'MySQL'],
        icon: [ DiJava, SiSpringboot, SiHibernate, SiMysql],
        type: 'API',
        status: 'completado',
        github: 'https://github.com/LeonelLopez14/clinica_vet.git',
        deploy: null
    },
    {
        name: 'Portfolio',
        description: 'texto corto',
        fullDescription: 'Texto largo',
        technologies: ['JavaScript', 'React', 'GSAP', 'Tailwind', 'Vite'],
        icon: [ SiJavascript, SiReact, SiGsap, SiTailwindcss, SiVite],
        type: 'Frontend',
        status: 'en desarrollo',
        github: 'https://github.com/LeonelLopez14/Portfolio.git',
        deploy: null
    },
    {
        name: 'Jacarandá web',
        description: 'texto corto',
        fullDescription: 'Texto largo',
        technologies: ['JavaScript', 'React', 'GSAP', 'Tailwind'],
        icon: [ SiJavascript, SiReact, SiGsap, SiTailwindcss],
        type: 'Frontend',
        status: 'planificacion',
        github: null,
        deploy: null
    }
]

export default ProjectsDetails;