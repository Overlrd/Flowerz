import React from 'react'
import Nav from './Nav.jsx'
import MiddleChoice from './MiddleChoice.jsx'
import SwappingImages from './SwappingImages.jsx'
import FlowerCard from './FlowerCard.jsx'
import InputModal from './InputModal.jsx'
const App = () => {
  const [Visible, setvisible] = React.useState(false)
  return (
    <>
        <Nav/>
        <MiddleChoice onclick={()=> {setvisible(true)}}/>
        <SwappingImages/>
        <InputModal visible={Visible} onclose={() => {setvisible(false)}} oncancel={()=>{setvisible(false),
        console.log("canceled upload ")}}/>
    </>
  )
}

export default App