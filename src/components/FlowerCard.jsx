import React from 'react'
import { useEffect, useState } from 'react';
import '../static/flowercard.css';
const FlowerCard = ({
  image_url,
  small_image_url,
  wiki_description,
  tabular_data,
  flower_name 
}) => {
  const [isExpanded, setExpanded] = React.useState(false);
  const switchText = () => {
    setExpanded(!isExpanded);
  };
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const headerImg = new Image();
    headerImg.src = image_url;

    headerImg.onload = () => {
      setIsImageLoaded(true);
    };
  }, [image_url]);


  const flowerNameParts = flower_name.split('-');
  const flowerTitle = flowerNameParts[0];
  const flowerSubtitle = flowerNameParts[1];

  return (
    <>
      <article>
        <header>
          <div>
            {tabular_data && tabular_data.length ? (
              <table>
                <tbody>
                  {tabular_data.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{data.label}</th>
                      <td>{data.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <a href="#" aria-busy="true" >Loading data, please wait...</a>
            )}


          </div>
          <div className='header-img-div'>
            <div className='skeleton' style={{ maxWidth: '500px', maxHeight: '500px' , width: '300px', height: '300px'}}>
              {isImageLoaded && <img id='header-flower-img' src={image_url} alt="Header Flower" />}
            </div>

              {isImageLoaded && (
            <div id='header-flower-title' className=''>
              {flowerTitle}
              {flowerSubtitle && <span>({flowerSubtitle})</span>}
            </div>
            )}
            
          </div>

        </header>

        <details className='right-text'>
          <summary onClick={switchText} role="link">{isExpanded ? 'Less' : 'More'}</summary>
          <div className='description-div'>
            <div className='img-small skeleton'>
              <img src={small_image_url} />
            </div>
            <div className='description-text-div'>
              {wiki_description}
            </div>
          </div>
          <div className='footer'>
            <p>Image and description from <a href="">wikipedia</a></p>
          </div>
        </details>
      </article>
    </>
  );
};


export default FlowerCard