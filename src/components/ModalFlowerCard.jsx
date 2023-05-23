import React from 'react'
import FlowerCard from './FlowerCard.jsx'

const ModalFlowerCard = ({ img_url, table_data, flower_name, wiki_description }) => {
  return (
    <dialog open>
        <FlowerCard 
        img_url={img_url} 
        table_data={table_data}
        flower_name={flower_name}
        wiki_description={wiki_description}
         />
    </dialog>
  )
}

export default ModalFlowerCard