import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import FlowerCard from './FlowerCard.jsx';
import { fetch_trefle_flowers } from '../utils/fetch-trefle-data.js';
import { fetch_flower_data } from '../utils/handle-predict-Image.js';
import '../static/swappingimages.css'

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
    console.log("Treffle Data Updated");
  }, [TrefleData]);

    // Function to fetch additional data for a specific item and save it to local storage
    const fetchAndSaveAdditionalData = (slug) => {
      fetch_flower_data(slug, "all")
        .then((data) => {
          setAdditionalData(data);
          // Save the additional data to local storage for future use
          localStorage.setItem(slug, JSON.stringify(data));
        })
        .catch((error) => console.error(error));
    };

    useEffect(() => {
      // Check if the additional data is available in the local storage for the active item
      const activeItem = TrefleData[activeSlideIndex];
      const slug = activeItem?.slug;
      const storedData = localStorage.getItem(slug);
      if (storedData) {
        // If the data is available in local storage, use it directly
        setAdditionalData(JSON.parse(storedData));
      } else if (TrefleData.length > 0 && activeSlideIndex >= 0 && activeSlideIndex < TrefleData.length) { 
        // If the data is not available in local storage, fetch it
        fetchAndSaveAdditionalData(slug);
      }
    }, [activeSlideIndex, TrefleData]);

  return (
      <Swiper onSlideChange={(Swiper) => setActiveSlideIndex(Swiper.activeIndex)} navigation={true} modules={[Navigation]} className="mySwiper">
      {TrefleData.map((item, index) => (
        <SwiperSlide key={index}>
          <FlowerCard
        flower_name={item.common_name + "-" + item.slug}
        image_url={item.image_url}
        small_image_url={additionalData.data?.page_image}
        wiki_description={additionalData.data?.page_text || "No description available" } 
        tabular_data={additionalData.data?.infobox_data}
          />
        </SwiperSlide>
      ))}
      </Swiper>

  ) 
}

export default SwappingImages