import { SiReact, SiTailwindcss, SiJavascript, SiGsap, SiNextdotjs, SiSpringboot, SiSpringsecurity, SiHibernate, SiPhp, SiNestjs, SiTypescript, SiMysql, SiDocker, SiGithub, SiFigma, SiVite, SiPostman, SiSwagger, SiXampp } from "react-icons/si";
import { DiJava } from "react-icons/di";

const Skills = [
    {
        category: 'Frontend',
        items: [
            { name:'React', status: 'aprendiendo', icon: SiReact},
            { name:'Tailwind', status: 'sabido', icon: SiTailwindcss},
            { name:'JavaScript', status: 'aprendiendo', icon: SiJavascript},
            { name:'GSAP', status: 'aprendiendo', icon: SiGsap},
            { name:'Next.js', status: 'futuro', icon: SiNextdotjs},
        ]
    },
    {
        category: 'Backend',
        items: [
            { name:'Java', status: 'sabido', icon: DiJava},
            { name:'SpringBoot', status: 'sabido', icon: SiSpringboot},
            { name:'SpringSecurity', status: 'aprendiendo', icon: SiSpringsecurity},
            { name:'Hibernate', status: 'sabido', icon: SiHibernate},
            { name:'Swagger', status: 'sabido', icon: SiSwagger},
            { name:'PHP', status: 'aprendiendo', icon: SiPhp},
            { name:'Nest.js', status: 'futuro', icon: SiNestjs},
            { name:'TypeScript', status: 'futuro', icon: SiTypescript}
        ]
    },
    {
        category: 'Servicios',
        items: [
            { name:'MySQL', status: 'sabido', icon: SiMysql},
            { name:'Docker', status: 'sabido', icon: SiDocker},
            { name:'GitHub', status: 'sabido', icon: SiGithub},
            { name:'Figma', status: 'aprendiendo', icon: SiFigma},
            { name:'Vite', status: 'aprendiendo', icon: SiVite},
            { name:'Postman', status: 'sabido', icon: SiPostman},
            { name:'XAMPP', status: 'sabido', icon: SiXampp},
        ]
    }
]
export default Skills;
