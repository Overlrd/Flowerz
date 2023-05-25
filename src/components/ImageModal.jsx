import React from 'react'
import'../static/imagemodal.css'

const ImageModal = ({open=false, img_url, caption="Plantae"}) => {
  return (
    <dialog open={open}>
            <img src={img_url}/>
            <div id='caption'> {caption} </div>
    </dialog>
  )
}

export default ImageModal