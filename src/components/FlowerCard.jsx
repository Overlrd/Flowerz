import React from 'react'
import ImageModal from './ImageModal.jsx';
const FlowerCard = ({
  image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Dahlia.%22Erika_Krause%22.7408.jpg/128px-Dahlia.%22Erika_Krause%22.7408.jpg",
  small_image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Dahlia.%22Erika_Krause%22.7408.jpg/128px-Dahlia.%22Erika_Krause%22.7408.jpg",
  wiki_description = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, assumenda sequi! Cum numquam eius explicabo cupiditate nihil odit possimus assumenda minima modi, mollitia tempore ullam, perspiciatis consequatur voluptas iure exercitationem.\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Nemo molestiae voluptatum delectus hic, similique enim esse nisi quasi architecto? Non sit optio quibusdam. Dolores quasi eaque voluptate doloribus repellendus nesciunt?",
  tabular_data,
  flower_name = "common name-scientific name",
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
              <img id='header-flower-img' src={image_url} />
              <div id='header-flower-title'>
                {flower_name.split('-')[0]} <span>({flower_name.split('-')[1]})</span>
            </div>
          </div>
        </header>

        <details className='right-text'>
          <summary onClick={switchText} role="link">{isExpanded ? 'Less' : 'More'}</summary>
          <div className='description-div'>
            <div className='img-small'>
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