import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef } from 'react';

function App() {
	const ref = useRef<HTMLCanvasElement>(null);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['center end', 'start start'],
	});

	const images = useMemo(() => {
		const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= 266; i++) {
      const img = new Image();
      const formattedIndex = i.toString().padStart(4, '0');
      img.src = `./assets/cambridge/frame_${formattedIndex}.webp`;
      loadedImages.push(img);
    }

    console.log('loaded images', loadedImages);

		return loadedImages;
	}, []);

	const render = useCallback(
		(index: number) => {
			if (images[index - 1]) {
				ref.current?.getContext('2d')?.drawImage(images[index - 1], 0, 0);
			}
		},
		[images]
	);

	const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 266]);

	useMotionValueEvent(currentIndex, 'change', (latest) => {
		render(Number(latest.toFixed()));
	});

	useEffect(() => {
		render(1);
	}, [render]);

	return (


    <section className="bg-custom-gradient flex overflow-hidden flex-col items-center px-16 pt-9 pb-9 w-full max-md:px-5 max-md:max-w-full">
    <div className="w-full max-w-[1186px] max-md:max-w-full">
      <h2 className="text-3xl font-extrabold text-black mb-5">Our advantages</h2>
      <canvas width={1000} height={1000} ref={ref} />
    </div>
  </section>
	);  
}

export default App;