import React from 'react'
import { on_form_submit } from '../utils/handle-search'
const MiddleChoice = ({onclick, handleSearchSubmit}) => {
  return (
    <article className='mc-article container'>
      <form onSubmit={handleSearchSubmit} method="get">
        <input type="search" placeholder="Passioflora" aria-label="Search"/>
      </form>
        <button onClick={onclick} className='outline'>Search with an image</button>
    </article>
  )
}

export default MiddleChoice 