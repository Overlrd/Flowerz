import React from 'react'

const FlowerCard = ({ img_url, table_data, flower_name, wiki_description }) => {
    return (
      <article className='fc-article'>
        <header>
          <div className='fc-header-img-ctn'>
            <img id='fc-header-img' src={img_url || "https://cataas.com/cat/says/hello%20world!"}/>
          </div>
          <div className='fc-header-tb-ctn'>
            <table>
              <thead>
                <tr>
                  <th scope="col">Planet</th>
                  <th scope="col">Diameter (km)</th>
                </tr>
              </thead>
              <tbody>
                {table_data && table_data.map((row, index) => (
                  <tr key={index}>
                    <th scope="row">{row.planet}</th>
                    <td>{row.diameter}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Average</th>
                  <td>9,126</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </header>
  
        <div className='fc-f-title'><h3>{flower_name || 'Passiflora Mixta'}</h3></div>
  
        <footer className='fc-main'>
          <p>{wiki_description || 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta nihil amet distinctio ab voluptates, ipsum numquam necessitatibus! Iste sint exercitationem aliquam. Error maiores quod perspiciatis magnam labore temporibus id nobis.'}</p>
        </footer>
  
        <footer>
          <p>From wikipedia</p>
        </footer>
      </article>
    );
  }
  

export default FlowerCard