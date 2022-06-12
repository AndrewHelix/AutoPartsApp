import {Link} from 'react-router-dom'

interface PartsPageInterface {
  name: string,
  price: string,
  forCars: [],
}

export function PartsPage({name, price, forCars} : PartsPageInterface) {
  return <div>
    <Link to={`/${name}`}><span>{name}</span><span>{price}</span></Link>
  </div>
}