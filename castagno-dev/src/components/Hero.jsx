import { useEffect, useRef } from "react";
import gsap from "gsap";

function Hero() {
    const titleRef = useRef(null);

    useEffect(() => {
    gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
    });
}, []);

    return (
    <h1 ref={titleRef}>
        Castagno Developer
    </h1>
    );
}

export default Hero;