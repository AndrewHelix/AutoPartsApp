import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchParts } from "../../slices/partsSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {showAppPartForm} from '../../slices/addPartSlice'

import { getArr } from "../../helpers";

export function Categories() {
  const dispath = useAppDispatch();
  const categories = useAppSelector((state) => state.parts.categories);

  useEffect(() => {
    dispath(fetchParts());
  }, []);

  return (
    <>
      <ul>
        {getArr(categories).map((category, index) => (
          <li>
            <Link key={index} to={`/${category}`}>
              {category}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={() => dispath(showAppPartForm(true))}>Add new part</button>
    </>
  );
}
