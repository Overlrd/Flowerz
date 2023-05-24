import * as React from 'react';
import { Grid } from '@mui/material';
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
                <th colSpan="2">Planet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Mercury</th>
                <td>4,880</td>
              </tr>
              <tr>
                <th scope="row">Venus</th>
                <td>12,104</td>
              </tr>
              <tr>
                <th scope="row">Venus</th>
                <td>12,104</td>
              </tr>
              <tr>
                <th scope="row">Venus</th>
                <td>12,104</td>
              </tr>
            </tbody>
          </table>
          </div>
        </header>
  
        <div className='fc-f-title'><h3>{flower_name || 'Passiflora Mixta'}</h3></div>
  
        <main className='fc-main'>
          <p>{wiki_description || 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta nihil amet distinctio ab voluptates, ipsum numquam necessitatibus! Iste sint exercitationem aliquam. Error maiores quod perspiciatis magnam labore temporibus id nobis.'}</p>
          <img id='fc-main-img' src="https://cataas.com/cat/says/hello%20world!"/>
        </main>
  
        <footer>
          <p>From wikipedia</p>
        </footer>
      </article>
    );
  }
  

export default FlowerCard