import { useAppSelector } from "../../hooks";
import { getArr } from "../../helpers";
import { useEffect, useState } from "react";

type CarsType = {
  model: string;
  id: string;
  photo: string;
}[];

interface Props {
  onChange: Function
}

export function AddCarsForParts({onChange} : Props) {
  const [models, setModels] = useState<CarsType>([]);
  const vehicles = useAppSelector((state) => state.vehicle.vehicles);
  const brands = getArr(vehicles);

  useEffect(() => {
    brands.forEach((brand) => {
      const models = vehicles[brand];
      setModels((state) => [...state, ...models]);
    });
  }, []);

  return (
    <>
      {
        models.map((model) => (
          <div>
            <input type="checkbox" id={model.id} value={model.id} onChange={(e) => onChange(e.target.value, e.target.checked)}/>
            <label htmlFor={model.id}>{model.id}</label>
          </div>
        ))
      }
    </>
  );
}
