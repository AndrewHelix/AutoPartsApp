import { useAppSelector } from "../../hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PartsPage } from "../mainArea/PartsPage";

interface Parts {
  name: string;
  price: string;
  for: [];
  characteristics: '';
}

export function Subcategory() {
  const [parts, setParts] = useState<Parts[]>([]);
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
  }, [category, subcategory, vehicleChosen]);

  return (
    <div>
      {parts.length ? (
        parts.map((part) => (
          <PartsPage
            key={part.name}
            name={part.name}
            price={part.price}
            forCars={part.for}
          />
        ))
      ) : (
        <h3>we don't have any parts</h3>
      )}
    </div>
  );
}
