import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  height: "800px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default function HomeCarousel() {
  return (
    <Carousel autoplay style={{ position: "relative" }}>
      <div>
        <h3 style={contentStyle}>
          <img src="http://picsum.photos/1000" class="w-100" />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img src="http://picsum.photos/1001" class="w-100" />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img src="http://picsum.photos/1002" class="w-100" />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img src="http://picsum.photos/1003" class="w-100" />
        </h3>
      </div>
    </Carousel>
  );
}
