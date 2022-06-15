import { useAppSelector } from "../../hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PartsPage } from "../mainArea/PartsPage";
import { CategoriesType } from './Subcategories'
import { getArr } from '../../helpers'

interface Part {
  name: string;
  price: string;
  for: string[];
  characteristics: string;
  img: string
}

export function Subcategory({categories} : CategoriesType) {
  /* const [parts, setParts] = useState<Parts[]>([]);
  const { category, subcategory } = useParams();
  const categories = useAppSelector((state) => state.parts.categories);
  const vehicleChosen = useAppSelector((state) => state.vehicle.chosenVehicle);
  useEffect(() => {
    if (Object.keys(categories).length !== 0) {
      //@ts-ignore
      const arrOfParts: Parts[] = categories[category][subcategory];
      //@ts-ignore
      const partsForRender: Parts[] = arrOfParts.filter((part) => part.for.includes(vehicleChosen));
      setParts(partsForRender);
    }
  }, [category, subcategory, vehicleChosen]); */
  const [parts, setParts] = useState<Part[]>([]);
  const chosenCategory = useAppSelector(state => state.parts.chosenCategory);
  const chosenSubcategory = useAppSelector(state => state.parts.chosenSubcategory);
  const vehicleChosen = useAppSelector((state) => state.vehicle.chosenVehicle);
  useEffect(() => {
    if(chosenSubcategory) {
      const arrOfParts : Part[] = categories[chosenCategory][chosenSubcategory];
      const partsForRender: Part[] = arrOfParts.filter((part) => part.for.includes(vehicleChosen));
      setParts(partsForRender)
      
    }
  }, [chosenSubcategory])

  return (
    <ul className="parts-list">
      {parts.length ? (
        parts.map((part) => (
          <PartsPage
            key={part.name}
            name={part.name}
            price={part.price}
            forCars={part.for}
            img={part.img}
          />
        ))
      ) : (
        <h3>we don't have any parts</h3>
      )}
    </ul>
  );
}
