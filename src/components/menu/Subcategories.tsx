import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../../hooks";
import { getArr } from "../../helpers";
import { useEffect } from 'react'


export function Subcategories() {
  const [categoryChoice, setChoice] = useState<string[]>([]);
  const {category} = useParams();
  const categories = useAppSelector(state => state.parts.categories);
  //@ts-ignore
  useEffect(() => {
    if (Object.keys(categories).length !== 0) { //такое условие и хук useEffect с зависимостью от категории, потому что при перезагрузке не успевает приходить из стора категории и тогда в функцию не попадает объект, что ломает приложение
      //@ts-ignore
      setChoice(getArr(categories[category]))
    }
  }, [category])

  return <div>
    { categoryChoice ? 
      categoryChoice.map(subcategory => <Link key={subcategory} to={`/${category}/${subcategory}`}>{subcategory}</Link>) : <h3>choice category!!!</h3>
    }
  </div>;
}



