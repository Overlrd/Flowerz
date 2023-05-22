import React from 'react'
import Input from './Input.jsx'
import '../../assets/form.css'
const Form = () => {
  return (
    <div id='form_search'>
        <form role="search">
            <input type="search" placeholder="Search" />
            <input type="submit" value="Search" />
        </form>
        <Input></Input>
    </div>
  )
}

export default Form