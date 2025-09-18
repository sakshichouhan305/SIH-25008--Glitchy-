import { useState, useEffect } from "react";

const slideStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "15px",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
};

const dotStyle = {
  margin: "0 5px",
  cursor: "pointer",
  fontSize: "20px",
  color: "#bbb",
};

const activeDotStyle = {
  ...dotStyle,
  color: "#333",
};

const ImageSlider = ({ slides, autoPlay = true, intervalTime = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  // Auto-play Effect
  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        goToNext();
      }, intervalTime);
      return () => clearInterval(timer);
    }
  }, [currentIndex, autoPlay, intervalTime]);

  return (
    <div style={sliderStyles}>
      {/* Arrows */}
      <div onClick={goToPrevious} style={leftArrowStyles}>
        ❰
      </div>
      <div onClick={goToNext} style={rightArrowStyles}>
        ❱
      </div>

      {/* Current Slide */}
      <div style={slideStylesWidthBackground}></div>

      {/* Dots */}
      <div style={dotsContainerStyles}>
        {slides.map((_, slideIndex) => (
          <div
            key={slideIndex}
            style={currentIndex === slideIndex ? activeDotStyle : dotStyle}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;