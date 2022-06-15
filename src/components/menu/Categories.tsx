import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchParts, chooseCategory } from "../../slices/partsSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {showAppPartForm} from '../../slices/addPartSlice'
import { Subcategories } from "./Subcategories";
import './categories.css'

import { getArr } from "../../helpers";

export function Categories() {
  const dispath = useAppDispatch();
  const categories = useAppSelector((state) => state.parts.categories);

  useEffect(() => {
    dispath(fetchParts());
  }, []);

  return (
    <>
      <div className="menu">
        <ul className="category-list">
          {getArr(categories).map((category, index) => (
            <li className="category-item">
              <button className="category-btn" key={index} onClick={() => dispath(chooseCategory(category))}>
                <span>{category}</span>
              </button>
            </li>
          ))}
        </ul>
        <button className="add-part-btn" onClick={() => dispath(showAppPartForm(true))}><span>Add new part</span></button>
      </div>
      
      <Subcategories categories={categories}/>
    </>
  );
}
