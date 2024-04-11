import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import "./Slider.css";
import bannerService from "../../services/bannerService";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "690px",
};


const Slideshow = () => {
  const [data, setData] = useState([])
    useEffect(() => {
      bannerService.gets().then((response) => {
        if (response.data) {
          setData(response.data.results);
        }
      });

    }, []);
  return (
    <div className="slideContainer">
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          {data.map((d,index) => {
            return (
              <div class={`carousel-item ${index === 1 && 'active'}`} key={d.id}>
              <img src={d.image} class="d-block w-100" alt="..."/>
            </div>
            )
        })}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  );
};

export default Slideshow;
