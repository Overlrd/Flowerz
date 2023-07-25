import React from 'react'
import Nav from './Nav.jsx'
import MiddleChoice from './MiddleChoice.jsx' 
import SwappingImages from './SwappingImages.jsx'
import InputModal from './InputModal.jsx'
import { handleSubmit } from '../utils/handle-input-modal.js'
import ModalFlowerCard from './ModalFlowerCard.jsx'
import SearchResult from './SearchResult.jsx'
import { handleSearchSubmit, handleSearchItemClick } from '../utils/handle-search.js'

const App = () => {
  const [inputFormVisible, setinputFormVisible] = React.useState(false)
  const [modalFlowerVisible, setmodalFlowerVisibible] = React.useState(false)
  const [searchResultsVisible, setSearchResultsVisible] = React.useState(false)

  const [flowerData, setFlowerData] = React.useState(null);
  const [searchResultData, setSearchResultData] = React.useState(null)

  React.useEffect(() => {
    console.log(flowerData);
  }, [flowerData]);

  React.useEffect(() => {
    console.log(searchResultData)
  }, [searchResultData]);

  return (
    <>
        <Nav/>

        <MiddleChoice onclick={()=> {setinputFormVisible(true)}} handleSearchSubmit={(event) => handleSearchSubmit(event, setSearchResultData, setSearchResultsVisible)}/>
        
        <SwappingImages handleImageClick={()=>{handleImageClick}}/>

        <InputModal visible={inputFormVisible} onclose={() => {setinputFormVisible(false)}} oncancel={()=>{setinputFormVisible(false)}} handleSubmit={(event) => handleSubmit(event,setFlowerData, setinputFormVisible, setmodalFlowerVisibible)} />
        
        {flowerData && (
          <ModalFlowerCard
            visible={modalFlowerVisible}
            flowerData={flowerData}
            onSpanClose={()=> {setmodalFlowerVisibible(false)}}
          />
        )}

        {searchResultData && (
        <SearchResult visible={searchResultsVisible} onSpanClose={() => {setSearchResultsVisible(false)}} searchData={searchResultData} onClick={(event) => handleSearchItemClick(event, setFlowerData, setSearchResultsVisible, setmodalFlowerVisibible)}/>
        )}
    </>
  )
}

export default App