import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import "./Slider.css";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "690px",
};
const slideImages = [
  {
    url: "https://shopgiayreplica.com/wp-content/uploads/2023/07/banner-sale-black-friday-rinh-iphone-15pro.jpg",
    caption: "Slide 1",
  },
  {
    url: "https://shopgiayreplica.com/wp-content/uploads/2023/07/roll-sneaker-shop.jpg",
    caption: "Slide 2",
  },
];

const Slideshow = () => {
  return (
    <div className="slideContainer">
      <Slide>
        {slideImages.map((slideImage, index) => (
          <div key={index}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${slideImage.url})` }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Slideshow;
