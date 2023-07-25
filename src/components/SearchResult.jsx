import React, { useState } from 'react';
import '../static/result-grid.css';
import placeholderImage from '../static/default_flower.png'; // Replace with the path to your placeholder image
import close_icon from '../static/close.png'

const SearchResult = ({ searchData, onClick, onSpanClose, visible }) => {
  const [loadedImages, setLoadedImages] = useState([]);

  const handleImageLoad = (index) => {
    // Update the state to indicate that the image at 'index' has finished loading
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
  };

  return (
    <dialog open={visible}>
    <span onClick={onSpanClose} className='close'><img src={close_icon} alt="X"/></span>
    <article className='container' id='result-grid'>
      {searchData['data'].map((item, index) => (
        <div onClick={onClick} className='grid rslt_item' key={index}>
          {loadedImages.includes(index) ? ( // Display the actual image if it has finished loading
            <img
              className='rslt_art_img'
              src={item.image_url}
              alt={`Item ${index + 1}`}
              onLoad={() => handleImageLoad(index)}
            />
          ) : (
            // Display the placeholder image while waiting for the actual image to load
            <img
              className='rslt_art_img'
              src={placeholderImage}
              alt={`Placeholder for Item ${index + 1}`}
              onLoad={() => handleImageLoad(index)}
            />
          )}
          <div className='rslt_text'>
              <div><span>name:</span> <span>{item.common_name}</span></div>
              <div><span>scientific name:</span> <span>{item.scientific_name}</span></div>
          </div>
          <input type="hidden" data-slug={item.slug} data-name={item.common_name} data-image-url={item.image_url} />        </div>
      ))}
    </article>
    </dialog>
  );
};

export default SearchResult;
