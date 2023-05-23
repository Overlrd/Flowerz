import React from 'react'
import FlowerCard from './FlowerCard.jsx';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

const SwappingImages = () => {
  return (
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide><FlowerCard/></SwiperSlide>
        <SwiperSlide><FlowerCard/></SwiperSlide>
        <SwiperSlide><FlowerCard/></SwiperSlide>
        <SwiperSlide><FlowerCard/></SwiperSlide>
        <SwiperSlide><FlowerCard/></SwiperSlide>
      </Swiper>

  )
}

export default SwappingImages