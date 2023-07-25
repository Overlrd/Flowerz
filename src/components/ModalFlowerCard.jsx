import React from 'react'
import FlowerCard from './FlowerCard.jsx';
import close_icon from '../static/close.png'

const ModalFlowerCard = ({ visible, onSpanClose, flowerData }) => {
  const { first_class_name, img_urls, additionalData } = flowerData;
  const { data } = additionalData || {};
  const { infobox_data, page_text, page_image } = data || {};
  
  return (
    <dialog open={visible}>
      <FlowerCard 
        image_url={img_urls[0]} 
        tabular_data={infobox_data || []}
        flower_name={first_class_name}
        wiki_description={page_text || ''}
        small_image_url={page_image || ''}
      />
    <span onClick={onSpanClose} className='close'><img src={close_icon} alt="X"/></span>
    </dialog>
  );
};


export default ModalFlowerCard