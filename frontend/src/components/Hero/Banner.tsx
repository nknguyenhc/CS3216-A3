import { ParallaxBanner } from "react-scroll-parallax";
import { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types";

const Banner = () => {
  const background: BannerLayer = {
    image:
      "./assets/hero-image.jpeg",
    opacity: [1, 0.3],
    scale: [1, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true
  };

  const headline: BannerLayer = {
    translateY: [0, 30],
    scale: [1, 1.05, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="font-thin text-[10vw] text-white">App name</h1>
      </div>
    )
  };

  const gradientOverlay: BannerLayer = {
    opacity: [0, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: <div className="absolute inset-0 bg-gradient-to-t from-blue-custom via-blue-custom to-light-blue-custom" />
  };

  return (
    <ParallaxBanner
      layers={[background, headline, gradientOverlay]}
      className="h-screen"
    />
  );
};

export default Banner;