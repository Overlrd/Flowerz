import React from 'react'

const FlowerCard = () => {
  const [isExpanded, setExpanded] = React.useState(false);
  const [flowerIsClicked, setflowerisClicked] = React.useState(false);
  const switchText = () => {
    setExpanded(!isExpanded);
  };
  const handleImageClick = () => {
    setflowerisClicked(true)
  }
 
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
            <tr>
              <th scope="row">Kingdom</th>
              <td>Plantae</td>
            </tr>
            <tr>
              <th scope="row">Clade</th>
              <td>1Tulipa</td>
            </tr>
            <tr>
              <th scope="row">Clade</th>
              <td>TulipaTulipa</td>
            </tr>
            <tr>
              <th scope="row">Clade</th>
              <td>Tulipa</td>
            </tr>
            <tr>
              <th scope="row">Family</th>
              <td>Tulipa</td>
            </tr>
            <tr>
              <th scope="row">Subfamily</th>
              <td>TulipaTulipaTulipa</td>
            </tr>
            <tr>
              <th scope="row">Tribe</th>
              <td>TulipaTulipa</td>
            </tr>
            <tr>
              <th scope="row">Genus</th>
              <td>Tulipa</td>
            </tr>

          </tbody>
        </table>
        </div>
        <div>
          <img onClick={handleImageClick} id='header-flower-img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Dahlia.%22Erika_Krause%22.7408.jpg/128px-Dahlia.%22Erika_Krause%22.7408.jpg"/>
          <p>Dahlia <span>(Scientific name)</span> </p>
        </div>
      </header>

      <details className='right-text'>
        <summary onClick={switchText} role="link">{isExpanded ? 'Less' : 'More'}</summary>
          <div className='description-div'>
              <div className='img-small'>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Dahlia.%22Erika_Krause%22.7408.jpg/128px-Dahlia.%22Erika_Krause%22.7408.jpg"/>
              </div>
              <div className='description-text-div'>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, assumenda sequi! Cum numquam eius explicabo cupiditate nihil odit possimus assumenda minima modi, mollitia tempore ullam, perspiciatis consequatur voluptas iure exercitationem.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo molestiae voluptatum delectus hic, similique enim esse nisi quasi architecto? Non sit optio quibusdam. Dolores quasi eaque voluptate doloribus repellendus nesciunt?</p>
              </div>
          </div>
          <div className='footer'>
              <p>Image and description from <a href="">wikipedia</a></p>
          </div>
      </details>

    </article>
    </>

  )
}

export default FlowerCard