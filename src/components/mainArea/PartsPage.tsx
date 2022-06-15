import { MouseEvent } from 'react'
import {Link} from 'react-router-dom'
import './partsPage.css'

interface PartsPageInterface {
  name: string,
  price: string,
  forCars: string[],
  img: string,
}

const hoverHandler = (e: MouseEvent<HTMLImageElement>) => {
  //@ts-ignore
  e.target.classList.toggle('scale')
}

export function PartsPage({name, price, img, forCars} : PartsPageInterface) {
  return <li  className='part-list-item' >
    
      <img src={img} alt={name} onMouseOver={hoverHandler} onMouseLeave={hoverHandler}/>
      <h5 className='part-list-item-title'>Name: {name}</h5>
      <span>Price: {price}</span>
      <Link to={`/${name}`}>more info...</Link>
    
  </li>
}