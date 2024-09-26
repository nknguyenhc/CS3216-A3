import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef } from "react";

function ScrollVideo() {
  const ref = useRef<HTMLCanvasElement>(null);

  const canvasHeight = 600;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["center end", "start start"],
  });

  const images = useMemo(() => {
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= 266; i++) {
      const img = new Image();
      const formattedIndex = i.toString().padStart(4, "0");
      img.src = `/assets/cambridge/frame_${formattedIndex}.webp`;
      loadedImages.push(img);
    }

    return loadedImages;
  }, []);

  const render = useCallback(
    (index: number) => {
      const canvas = ref.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx && images[index - 1]) {
          const image = images[index - 1];
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
      }
    },
    [images]
  );

  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 266]);

  useMotionValueEvent(currentIndex, "change", (latest) => {
    render(Number(latest.toFixed()));
  });

  useEffect(() => {
    render(1);
  }, [render]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = ref.current;
      if (canvas) {
        const section = canvas.parentElement;
        if (section) {
          canvas.width = section.clientWidth;
          canvas.height = canvasHeight;
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasHeight]);

  return (
    <section className="flex overflow-hidden flex-col items-center px-16 pt-9 pb-9 w-full max-md:px-5 max-md:max-w-full">
      <div className="w-full max-w-[1186px] max-md:max-w-full text-center">
        <h1 className="text-4xl font-black uppercase text-slate-500 max-md:max-w-full pb-4">
          Enter Your Dream School with Us
        </h1>
        <canvas ref={ref} />
      </div>
    </section>
  );
}

export default ScrollVideo;
