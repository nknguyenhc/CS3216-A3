import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSections: React.FC = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const horizontalSections = gsap.utils.toArray('.horizontal-section');

      gsap.to(horizontalSections, {
        xPercent: -100 * (horizontalSections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '#container',
          pin: true,
          scrub: 1,
          snap: 1 / (horizontalSections.length - 1),
          end: () => `+=${document.querySelector('#container')?.scrollWidth || 0}`,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main id="container" className="flex w-[400vw] h-screen">
      <section className="horizontal-section flex items-center justify-center bg-cover bg-center bg-no-repeat h-screen w-screen bg-[url('https://images.pexels.com/photos/2249527/pexels-photo-2249527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
        <h1 className="text-white text-4xl">Horizontal Scroll</h1>
      </section>

      <section className="horizontal-section flex items-center justify-center bg-cover bg-center bg-no-repeat h-screen w-screen bg-[url('https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
        <h1 className="text-white text-4xl">01</h1>
      </section>

      <section className="horizontal-section flex items-center justify-center bg-cover bg-center bg-no-repeat h-screen w-screen bg-[url('https://images.pexels.com/photos/1517076/pexels-photo-1517076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
        <h1 className="text-white text-4xl">02</h1>
      </section>

      <section className="horizontal-section flex items-center justify-center bg-cover bg-center bg-no-repeat h-screen w-screen bg-[url('https://images.pexels.com/photos/1037996/pexels-photo-1037996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]">
        <h1 className="text-white text-4xl">03</h1>
      </section>
    </main>
  );
};

export default HorizontalScrollSections;
