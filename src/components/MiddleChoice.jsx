import React from 'react'
const MiddleChoice = ({onclick}) => {
  return (
    <article className='mc-article container'>
        <input type="search" placeholder="Passioflora" aria-label="Search"/>
        <button onClick={onclick} className='outline'>Search with an image</button>
    </article>
  )
}

export default MiddleChoice