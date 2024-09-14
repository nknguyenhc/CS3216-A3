import React, { useEffect, useRef } from 'react';

const ImageSection: React.FC = () => {
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const imgsRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    const items = itemsRef.current;
    const imgs = imgsRef.current;

    const detectIntersection = (entries: IntersectionObserverEntry[]) => {
      for (let e of entries) {
        const i = items.indexOf(e.target as HTMLDivElement);
        if (e.isIntersecting) {
          requestAnimationFrame(() => {
            e.target.classList.add('opacity-100');
            imgs[i].classList.add('opacity-100');
          });
        } else {
          e.target.classList.remove('opacity-100');
          imgs[i].classList.remove('opacity-100');
        }
      }
    };

    const options = {
      threshold: 0.25,
    };

    const observer = new IntersectionObserver(detectIntersection, options);

    items.forEach(item => observer.observe(item));

    return () => {
      // Cleanup observer on component unmount
      items.forEach(item => observer.unobserve(item));
    };
  }, []);

  return (
    <main className="grid grid-cols-2">
      <section className="h-[200px] overflow-auto">
        <div
          ref={(el) => el && itemsRef.current.push(el)}
          className="h-full border-dashed border-red-500 opacity-0 transition-opacity duration-1000"
        >
          test 1
        </div>
        <div
          ref={(el) => el && itemsRef.current.push(el)}
          className="h-full border-dashed border-red-500 opacity-0 transition-opacity duration-1000"
        >
          test 2
        </div>
        <div
          ref={(el) => el && itemsRef.current.push(el)}
          className="h-full border-dashed border-red-500 opacity-0 transition-opacity duration-1000"
        >
          test 3
        </div>
        <div
          ref={(el) => el && itemsRef.current.push(el)}
          className="h-full border-dashed border-red-500 opacity-0 transition-opacity duration-1000"
        >
          test 4
        </div>
      </section>
      <aside className="relative">
        <img
          ref={(el) => el && imgsRef.current.push(el)}
          src="https://picsum.photos/200?1"
          alt="1"
          className="absolute top-0 right-0 opacity-0 transition-opacity duration-1000"
        />
        <img
          ref={(el) => el && imgsRef.current.push(el)}
          src="https://picsum.photos/200?2"
          alt="2"
          className="absolute top-0 right-0 opacity-0 transition-opacity duration-1000"
        />
        <img
          ref={(el) => el && imgsRef.current.push(el)}
          src="https://picsum.photos/200?3"
          alt="3"
          className="absolute top-0 right-0 opacity-0 transition-opacity duration-1000"
        />
        <img
          ref={(el) => el && imgsRef.current.push(el)}
          src="https://picsum.photos/200?4"
          alt="4"
          className="absolute top-0 right-0 opacity-0 transition-opacity duration-1000"
        />
      </aside>
    </main>
  );
};

export default ImageSection;
