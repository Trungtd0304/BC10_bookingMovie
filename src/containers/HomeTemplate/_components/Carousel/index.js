import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "./HomeCarousel.css";

import { getCarouselAction } from "../../../../redux/actions/CarouselAction";

const contentStyle = {
  height: "800px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "center",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
};

export default function HomeCarousel(props) {
  const { arrImg } = useSelector((state) => state.CarouselReducer);

  const dispatch = useDispatch();
  //Sẽ tự kích hoạt khi component load
  useEffect(async () => {
    dispatch(getCarouselAction);
  }, []);

  const renderImg = () => {
    return arrImg?.map((item, index) => {
      return (
        <div key={index}>
          <h3
            style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
          >
            <img
              src={item.hinhAnh}
              className="w-100"
              style={{ opacity: 0 }}
              alt={item.hinhAnh}
            />
          </h3>
        </div>
      );
    });
  };

  return (
    <Carousel autoplay style={{ width: "100%", padding: 5, margin: 0 }}>
      {renderImg()}
    </Carousel>
  );
}
