import React from 'react'

const FlowerCard = ({
  image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Dahlia.%22Erika_Krause%22.7408.jpg/128px-Dahlia.%22Erika_Krause%22.7408.jpg",
  small_image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Dahlia.%22Erika_Krause%22.7408.jpg/128px-Dahlia.%22Erika_Krause%22.7408.jpg",
  wiki_description = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, assumenda sequi! Cum numquam eius explicabo cupiditate nihil odit possimus assumenda minima modi, mollitia tempore ullam, perspiciatis consequatur voluptas iure exercitationem.\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Nemo molestiae voluptatum delectus hic, similique enim esse nisi quasi architecto? Non sit optio quibusdam. Dolores quasi eaque voluptate doloribus repellendus nesciunt?",
  tabular_data = [
    { label: "Kingdom", value: "Plantae" },
    { label: "Clade", value: "1Tulipa" },
    { label: "Clade", value: "TulipaTulipa" },
    { label: "Clade", value: "Tulipa" }, 
    { label: "Family", value: "Tulipa" },
    { label: "Subfamily", value: "TulipaTulipaTulipa" },
    { label: "Tribe", value: "TulipaTulipa" },
    { label: "Genus", value: "Tulipa" }
  ]
}) => {
  const [isExpanded, setExpanded] = React.useState(false);
  const [flowerIsClicked, setFlowerIsClicked] = React.useState(false);

  const switchText = () => {
    setExpanded(!isExpanded);
  };

  const handleImageClick = () => {
    setFlowerIsClicked(true);
  };

  return (
    <>
      <article>
        <header>
          <div>
            <table>
              <thead>
                <tr>
                  <th colSpan="2" scope="col">Planet</th>
                </tr>
              </thead>
              <tbody>
                {tabular_data.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{data.label}</th>
                    <td>{data.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <img onClick={handleImageClick} id='header-flower-img' src={image_url} />
            <div id='header-flower-title' >Dahlia <span>(Scientific name)</span> </div>
          </div>
        </header>

        <details className='right-text'>
          <summary onClick={switchText} role="link">{isExpanded ? 'Less' : 'More'}</summary>
          <div className='description-div'>
            <div className='img-small'>
              <img src={small_image_url} />
            </div>
            <div className='description-text-div'>
              {wiki_description.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
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