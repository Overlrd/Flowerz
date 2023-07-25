import React from 'react'
import closeicon from '../static/close.png'
import '../static/inputmodal.css'
const InputModal = ({ visible , onclose, oncancel , handleSubmit}) => { 
    return (
    <dialog open={visible} >
        <article>
            <header>
            <p>
                <strong>Upload images 🌸</strong>
            </p>

            <span onClick={onclose}>
                <img src={closeicon} alt="X"/>
            </span>
            </header>

            <main className='im-main'>
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type="file" name="images" multiple accept="image/*" required id="id_images" />
                    <input type="submit" value="Upload"/>
                </form>
            </main>

            <footer>
            <a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by adrianadam - Flaticon</a>
            </footer>
        </article>
    </dialog>
  )
}

export default InputModal