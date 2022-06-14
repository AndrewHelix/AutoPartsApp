import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getArr } from "../../helpers";
import { useEffect } from "react";
import { chooseSubcategory } from '../../slices/partsSlice'
import { Subcategory } from './Subcategory'
import './subcategory.css'

export type CategoriesType = {
  categories: {[key: string]: {
      [key: string]: {
          name: string;
          price: string;
          for: string[];
          characteristics: string;
          img: string
      }[];
  };
}
}

export function Subcategories({ categories }: CategoriesType) {
  /*  const [categoryChoice, setChoice] = useState<string[]>([]);
  const {category} = useParams();
  const categories = useAppSelector(state => state.parts.categories);
  //@ts-ignore
  useEffect(() => {
    if (Object.keys(categories).length !== 0) { //такое условие и хук useEffect с зависимостью от категории, потому что при перезагрузке не успевает приходить из стора категории и тогда в функцию не попадает объект, что ломает приложение
      //@ts-ignore
      setChoice(getArr(categories[category]))
    }
  }, [category]) */
  const dispath = useAppDispatch();
  const chooseCategory = useAppSelector((state) => state.parts.chosenCategory);
  const [subcategories, setSubcategories] = useState<string[]>([])

  useEffect(() => {
    if(chooseCategory.length) {
      setSubcategories(getArr(categories[chooseCategory]))
    }
  }, [chooseCategory])

  return (
    <div className="view">
    <div >
      {subcategories.length ? (
        subcategories.map((subcategory, i) => (
          <button key={i} onClick={() => dispath(chooseSubcategory(subcategory))}>
            {subcategory}
          </button>
        ))
      ) : (
        <h3>choice category!!!</h3>
      )}
    </div>
    <Subcategory categories={categories}/>
    </div>
    
  );
}
