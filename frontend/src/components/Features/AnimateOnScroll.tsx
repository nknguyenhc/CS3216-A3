import React, { useRef } from "react";
import "./styles.css";
import { useInView } from "react-intersection-observer";

export default function AnimateOnScroll() {
  const imageRef = useRef(null);

  const { ref: firstContainer, inView: firstInView } = useInView({
    threshold: 0
  });

  const { ref: secondContainer, inView: secondInView } = useInView({
    threshold: 0
  });

  const { ref: thirdContainer, inView: thirdInView } = useInView({
    threshold: 0
  });

  const getImage = () => {
    if (firstInView)
      return "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg";
    if (secondInView)
      return "https://images.ctfassets.net/hrltx12pl8hq/3MbF54EhWUhsXunc5Keueb/60774fbbff86e6bf6776f1e17a8016b4/04-nature_721703848.jpg?fit=fill&w=480&h=270";
    //if (thirdInView)
    return "https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png";
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="image-wrapper">
          <img src={getImage()} alt="a" ref={imageRef} className="image" />
        </div>

        <div className="first" ref={firstContainer}></div>
        <div className="second" ref={secondContainer}></div>
        <div className="third" ref={thirdContainer}></div>
      </div>

      <div className="footer"></div>
    </div>
  );
}
