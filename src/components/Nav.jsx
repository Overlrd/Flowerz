import React from 'react'
import githubIcon from '../static/github-mark-white.png'
const Nav = () => {
  return (
    <nav>
        <ul>
            <li className='flowerz-nav-li'>
                <h1 className='flowerz-nav-title'>Flowerz</h1>
                <span className='flowerz-nav-icon'>🌺</span>
                <span className='flowerz-nav-text'>Cause their names matter</span>
            </li>
        </ul>
        <ul>
        <li className='gh-flowerz-nav-li'><a href="#"><img className='flowerz-nav-gh' src={githubIcon} alt="Github Icon"/></a></li>
        </ul>
    </nav>
  )
}

export default Nav