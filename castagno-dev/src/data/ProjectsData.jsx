import { SiReact, SiTailwindcss, SiJavascript, SiGsap, SiNextdotjs, SiSpringboot, SiSpringsecurity, SiHibernate, SiPhp, SiNestjs, SiTypescript, SiMysql, SiDocker, SiGithub, SiFigma, SiVite, SiPostman, SiSwagger, SiXampp } from "react-icons/si";
import { DiJava } from "react-icons/di";

const ProjectsDetails = [
    {
        name: 'Competika',
        description: 'Plataforma para organizar, unirse y seguir torneos de cualquier tipo de deporte o juego.',
        fullDescription: 'Proyecto final de la carrera. Una plataforma completa donde los usuarios pueden crear, organizar y unirse a torneos de cualquier disciplina. Abarca el desarrollo full-stack con backend en PHP y base de datos, además de todo el trabajo de infraestructura: dockerización, configuración de firewall, scripts de despliegue y deploy en producción. El proyecto cubre el ciclo completo de desarrollo de software, desde la planificación hasta la puesta en producción.',
        technologies: ['JavaScript', 'PHP', 'Tailwind'],
        icon: [ SiJavascript, SiPhp, SiTailwindcss],
        type: 'Full-Stack',
        status: 'en desarrollo',
        github: 'https://github.com/LeonelLopez14/Competika.git',
        deploy: null
    },
    {
        name: 'Login_Api',
        description: 'API de autenticación con login, roles de usuario y restricciones de acceso.',
        fullDescription: 'API REST que implementa un sistema de autenticación completo con manejo de roles y restricciones de acceso. Utiliza JWT para la autenticación de usuarios, Spring Security para la capa de seguridad, y JPA con Hibernate para la persistencia de datos en MySQL. La API está documentada con Swagger y dockerizada para facilitar su despliegue. Pensada como base reutilizable para proyectos que necesiten un sistema de login robusto desde el día uno.',
        technologies: ['Java', 'SpringBoot', 'SpringSecurity', 'Hibernate', 'MySQL', 'Docker', 'Swagger'],
        icon: [ DiJava, SiSpringboot, SiSpringsecurity, SiHibernate, SiMysql, SiDocker, SiSwagger],
        type: 'API',
        status: 'completado',
        github: 'https://github.com/LeonelLopez14/login_api.git',
        deploy: null
    },
    {
        name: 'Incident-Report-Api',
        description: 'Sistema full-stack para reporte y seguimiento de incidentes, en desarrollo.',
        fullDescription: 'Proyecto full-stack actualmente en desarrollo, construido en Java. Su objetivo es permitir el reporte, seguimiento y gestión de incidentes dentro de una organización. A diferencia de los proyectos anteriores enfocados solo en la API, este incorpora también la capa de frontend, ampliando el alcance hacia una solución completa de extremo a extremo.',
        technologies: ['JavaScript', 'Java', 'SpringBoot', 'SpringSecurity', 'Hibernate', 'MySQL', 'Docker', 'Swagger'],
        icon: [ SiJavascript, DiJava, SiSpringboot, SiSpringsecurity, SiHibernate, SiMysql, SiDocker, SiSwagger],
        type: 'Full-Stack',
        status: 'en desarrollo',
        github: 'https://github.com/LeonelLopez14/Incident-Report-API.git',
        deploy: null
    },
    {
        name: 'ProyectoFinalBazarApi',
        description: 'API RESTful para la gestión de un bazar, proyecto final del curso de Spring Boot.',
        fullDescription: 'Proyecto final del curso "Desarrollo de APIs con Spring Boot" de TodoCode Academy. Una API RESTful pensada para la gestión de un bazar, construida con Java y Spring Boot, con JPA y Hibernate para la persistencia en MySQL. Incluye documentación con Swagger y está dockerizada. Sirvió como cierre práctico del curso, aplicando todo lo aprendido en un caso de uso real.',
        technologies: ['Java', 'SpringBoot', 'Hibernate', 'MySQL', 'Docker', 'Swagger'],
        icon: [ DiJava, SiSpringboot, SiHibernate, SiMysql, SiDocker, SiSwagger],
        type: 'API',
        status: 'completado',
        github: 'https://github.com/LeonelLopez14/ProyectoFinalBazarApi.git',
        deploy: null
    },
    {
        name: 'Supermercado prueba técnica',
        description: 'API RESTful para la gestión de un supermercado, desarrollada como prueba técnica.',
        fullDescription: 'API REST desarrollada como prueba técnica para un proceso de selección. Implementa la gestión de un supermercado usando Java, Spring Boot, JPA con Hibernate y MySQL, todo dockerizado para facilitar su ejecución. Resuelta bajo las restricciones de tiempo típicas de una evaluación técnica, priorizando claridad y buenas prácticas sobre funcionalidades extra.',
        technologies: ['Java', 'SpringBoot', 'Hibernate', 'MySQL', 'Docker'],
        icon: [ DiJava, SiSpringboot, SiHibernate, SiMysql, SiDocker],
        type: 'API',
        status: 'completado',
        github: 'https://github.com/LeonelLopez14/SupermercadoPruebaTecnica.git',
        deploy: 'https://supermercadopruebatecnica.onrender.com/'
    },
    {
        name: 'GymITS',
        description: 'Sistema de gestión para gimnasio con operaciones CRUD sobre base de datos MySQL.',
        fullDescription: 'Proyecto final de segundo año de la carrera de Informática. Desarrollado en Java aplicando Programación Orientada a Objetos, permite crear, leer, actualizar y eliminar registros vinculados a la gestión de un gimnasio, persistiendo los datos en una base MySQL. Representa una de las primeras aplicaciones sólidas de POO en un proyecto académico completo.',
        technologies: ['Java', 'SpringBoot', 'Hibernate', 'MySQL'],
        icon: [ DiJava, SiSpringboot, SiHibernate, SiMysql,],
        type: 'Backend',
        status: 'completado',
        github: 'https://github.com/LeonelLopez14/gimnasioITS-ProyectoFinal.git',
        deploy: null
    },
    {
        name: 'Clinica_vet',
        description: 'Sistema de gestión para una clínica veterinaria, con ejemplo de deploy en producción.',
        fullDescription: 'Proyecto de ejemplo orientado a la gestión de una clínica veterinaria, construido con Java, Spring Boot, JPA y Hibernate sobre una base de datos MySQL, y dockerizado. Incluye un caso de deploy funcional, pensado como práctica de llevar un proyecto backend desde el desarrollo local hasta un entorno desplegado.',
        technologies: ['Java', 'SpringBoot', 'Hibernate', 'MySQL'],
        icon: [ DiJava, SiSpringboot, SiHibernate, SiMysql],
        type: 'API',
        status: 'completado',
        github: 'https://github.com/LeonelLopez14/clinica_vet.git',
        deploy: null
    },
    {
        name: 'Portfolio',
        description: 'Este portfolio personal, construido con React, Tailwind y JavaScript.',
        fullDescription: 'El sitio que estás viendo en este momento. Desarrollado con React y Tailwind CSS, con JavaScript como base, e incorporando próximamente animaciones con GSAP. Pensado no solo como vitrina de proyectos, sino como ejercicio práctico para afianzar conceptos de React desde cero — cada sección fue una oportunidad para aprender algo nuevo del framework.',
        technologies: ['JavaScript', 'React', 'GSAP', 'Tailwind', 'Vite'],
        icon: [ SiJavascript, SiReact, SiGsap, SiTailwindcss, SiVite],
        type: 'Frontend',
        status: 'en desarrollo',
        github: 'https://github.com/LeonelLopez14/Portfolio.git',
        deploy: null
    },
    {
        name: 'Jacarandá web',
        description: 'Sitio web institucional para una empresa ficticia, en etapa de planificación.',
        fullDescription: 'Parte del proyecto final de carrera junto a Competika: el desarrollo de una página web para "Jacarandá", la empresa ficticia creada como contexto del proyecto. Se construirá con React, Tailwind CSS, JavaScript y GSAP para las animaciones. Actualmente en etapa de planificación, antes de comenzar el desarrollo.',
        technologies: ['JavaScript', 'React', 'GSAP', 'Tailwind'],
        icon: [ SiJavascript, SiReact, SiGsap, SiTailwindcss],
        type: 'Frontend',
        status: 'planificacion',
        github: null,
        deploy: null
    }
]

export default ProjectsDetails;