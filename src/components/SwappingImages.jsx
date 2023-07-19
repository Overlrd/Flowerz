import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import FlowerCard from './FlowerCard.jsx';
import { fetch_trefle_flowers } from '../utils/fetch_trefle_flowers.js';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";


const SwappingImages = () => {
  const [TrefleData, setTrefleData] = useState([]);

  useEffect(() => {
    fetch_trefle_flowers()
      .then((data) => setTrefleData(data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log(TrefleData);
  }, [TrefleData]);
  return (
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {TrefleData.map((item, index) => (
        <SwiperSlide key={index}>
          <FlowerCard
            flower_name={item.common_name}
            image_url={item.image_url}
          />
        </SwiperSlide>
      ))}
      </Swiper>

  ) 
}

export default SwappingImages