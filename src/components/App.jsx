import React from 'react'
import Nav from './Nav.jsx'
import MiddleChoice from './MiddleChoice.jsx' 
import SwappingImages from './SwappingImages.jsx'
import InputModal from './InputModal.jsx'
import { handleSubmit } from '../utils/handleInputModalSubmit.js'
import ModalFlowerCard from './ModalFlowerCard.jsx'


const App = () => {
  const [inputFormVisible, setinputFormVisible] = React.useState(false)
  const [modalFlowerVisible, setmodalFlowerVisibible] = React.useState(false)
  const [flowerData, setFlowerData] = React.useState(null);
  React.useEffect(() => {
    console.log(flowerData); // Log the updated state
  }, [flowerData]);

  return (
    <>
        <Nav/>

        <MiddleChoice onclick={()=> {setinputFormVisible(true)}}/>
        
        <SwappingImages handleImageClick={()=>{handleImageClick}}/>

        <InputModal visible={inputFormVisible} onclose={() => {setinputFormVisible(false)}} oncancel={()=>{setinputFormVisible(false)}} handleSubmit={(event) => handleSubmit(event,setFlowerData, setinputFormVisible, setmodalFlowerVisibible)} />
        
        {flowerData && (
          <ModalFlowerCard
            visible={modalFlowerVisible}
            flowerData={flowerData}
            onSpanClose={()=> {setmodalFlowerVisibible(false)}}
          />
        )}
    </>
  )
}

export default App