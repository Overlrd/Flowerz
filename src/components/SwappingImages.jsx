import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import FlowerCard from './FlowerCard.jsx';
import { fetch_trefle_flowers } from '../utils/fetch_trefle_flowers.js';
import { fetch_flower_data } from '../utils/PredictImage.js';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";


const SwappingImages = () => {
  const [TrefleData, setTrefleData] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [additionalData, setAdditionalData] = useState({});

  useEffect(() => {
    fetch_trefle_flowers()
      .then((data) => setTrefleData(data.data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    console.log(TrefleData);
  }, [TrefleData]);


  useEffect(() => {
    console.log("Current active slide index:", activeSlideIndex);
    if (TrefleData.length > 0 && activeSlideIndex >= 0 && activeSlideIndex < TrefleData.length) { 
      const activeItem = TrefleData[activeSlideIndex];
      console.log(activeItem.slug, "active slug ")
      fetch_flower_data(activeItem.slug, "all")
      .then((data) => {
        console.log("additional data", data)
        setAdditionalData(data);
      })
      .catch((error) => console.error(error));
  }
  }, [activeSlideIndex, TrefleData]);


  return (
      <Swiper onSlideChange={(Swiper) => setActiveSlideIndex(Swiper.activeIndex)} navigation={true} modules={[Navigation]} className="mySwiper">
      {TrefleData.map((item, index) => (
        <SwiperSlide key={index}>
          {console.log(additionalData[index]?.small_image_url, "additional image url")}
          <FlowerCard
        flower_name={item.common_name + "-" + item.slug}
        image_url={item.image_url}
        small_image_url={additionalData[index]?.small_image_url} // Pass small_image_url from additionalData
        wiki_description={additionalData[index]?.wiki_description} // Pass wiki_description from additionalData
        tabular_data={additionalData[index]?.tabular_data} // Pass tabular_data from additionalData
          />
        </SwiperSlide>
      ))}
      </Swiper>

  ) 
}

export default SwappingImages