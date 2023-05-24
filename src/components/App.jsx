import React from 'react'
import Nav from './Nav.jsx'
import MiddleChoice from './MiddleChoice.jsx'
import SwappingImages from './SwappingImages.jsx'
import FlowerCard from './FlowerCard.jsx'
import InputModal from './InputModal.jsx'
import { predictImage } from '../utils/PredictImage.js'
import { handleSubmit } from '../utils/handleInputModalSubmit.js'
import ModalFlowerCard from './ModalFlowerCard.jsx'

const App = () => {
  const [inputFormVisible, setinputFormVisible] = React.useState(false)
  const [modalFlowerVisible, setmodalFlowerVisibible] = React.useState(false)
  const [flowerData, setFlowerData] = React.useState(null);

  return (
    <>
        <Nav/>
        <MiddleChoice onclick={()=> {setinputFormVisible(true)}}/>
        <SwappingImages/>
        <InputModal visible={inputFormVisible} onclose={() => {setinputFormVisible(false)}} oncancel={()=>{setinputFormVisible(false)}} handleSubmit={(event) => handleSubmit(event,setFlowerData, setinputFormVisible, setmodalFlowerVisibible)} />
        {flowerData && (
        <div>{console.log(flowerData.first_class_name)}</div>,
        <ModalFlowerCard visible={modalFlowerVisible} flower_name={flowerData.first_class_name} img_url={flowerData['img_urls'][0]} />

        )}
    </>
  )
}

export default App