import React from 'react'
import closeicon from '../static/close.png'
import { predictImage } from '../utils/PredictImage';
import ModalFlowerCard from './ModalFlowerCard.jsx';

const InputModal = ({ visible , onclose, oncancel }) => {
    const [flowerData, setFlowerData] = React.useState(null);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the form from being submitted
    
        // Retrieve CSRF token from the hidden field
        const csrfToken = document.getElementById('csrf_token').value;
        console.log(csrfToken)
    
        // Create a new FormData object
        const formData = new FormData(event.target);
    
        // Append the CSRF token to the form data
        formData.append('csrfmiddlewaretoken', csrfToken);

        // Make request to Backend 
        predictImage(formData).then(data => {
            console.log(data)
            const flower_name = data['first_class_name']
            const image_urls = data['img_urls']
            const prediction = data['prediction']
            setFlowerData({
                img_url: image_urls[0],
                flower_name: flower_name,
            });
        })
      };

      React.useEffect(() => {
        console.log(flowerData);
      }, [flowerData]);

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
                    <input type="submit" value="Upload" />
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