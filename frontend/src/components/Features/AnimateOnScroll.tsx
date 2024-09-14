import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  reappear?: boolean;
  initialThreshold?: number;
  fadeOutOffset?: number; // New prop for fade-out offset
};

type Options = {
  threshold: number;
  reappear?: boolean;
};

const useElementOnScreen = (options: Options): [React.RefObject<HTMLDivElement>, boolean] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const makeAppear = (entries: any) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  const callBack = options.reappear ? makeAppear : makeAppear;

  useEffect(() => {
    const containerRefCurrent = containerRef.current;
    const observer = new IntersectionObserver(callBack, options);
    if (containerRefCurrent) observer.observe(containerRefCurrent);

    return () => {
      if (containerRefCurrent) {
        observer.unobserve(containerRefCurrent);
      }
    };
  }, [containerRef, options, callBack]);

  return [containerRef, isVisible];
};

const AnimateOnScroll = ({ children, reappear, initialThreshold = 0.5, fadeOutOffset = 300 }: Props) => {
  const [containerRef, isVisible] = useElementOnScreen({
    threshold: initialThreshold,
    reappear: reappear,
  });

  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic fade-out thresholds for each element
  const fadeOutThreshold = fadeOutOffset; // Dynamic threshold based on offset

  // Calculate opacity and translate based on scroll position
  const opacity = scrollY > fadeOutThreshold ? 0 : 1;
  const translateY = isVisible ? "translateY(0)" : "translateY(50px)"; // Adjust translation

  return (
    <div
      ref={containerRef}
      className={`sticky top-0 transition duration-1000 ease-in-out`}
      style={{
        opacity: opacity,
        transform: translateY,
      }}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;
