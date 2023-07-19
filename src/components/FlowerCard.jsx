import React from 'react'
import ImageModal from './ImageModal.jsx';

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
          <div>
              <img id='header-flower-img' className='skeleton' src={image_url} style={{ maxWidth: '500px', maxHeight: '500px' }} />
              <div id='header-flower-title' className='skeleton skeleton-text'>
                {flower_name.split('-')[0]} <span>({flower_name.split('-')[1]})</span>
            </div>
          </div>
        </header>

        <details className='right-text'>
          <summary onClick={switchText} role="link">{isExpanded ? 'Less' : 'More'}</summary>
          <div className='description-div'>
            <div className='img-small skeleton'>
              <img src={small_image_url} />
            </div>
            <div className='description-text-div  skeleton skeleton-text skeleton-text__body'>
              {wiki_description}
            </div>
          </div>
          <div className='footer skeleton skeleton-text skeleton-footer'>
            <p>Image and description from <a href="">wikipedia</a></p>
          </div>
        </details>
      </article>
    </>
  );
};


export default FlowerCard