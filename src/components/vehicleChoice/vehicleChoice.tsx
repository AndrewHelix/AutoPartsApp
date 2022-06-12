import { useAppDispatch, useAppSelector } from "../../hooks";
import { vehicleSelected, vehicleChosen } from "../../slices/vehicleSlice";

interface PropsInterface {
  cars: string[];
}

export function VehicleChoice({ cars }: PropsInterface) {

  const dispath = useAppDispatch();
  const brand = useAppSelector((state) => state.vehicle.brand);
  const vehicles = useAppSelector((state) => state.vehicle.vehicles);
  const models = vehicles[brand];

  return (
    <>
      <select
        onChange={(e) => {
          dispath(vehicleSelected(e.target.value))
          dispath(vehicleChosen(''))
        }}
      > 
        <option value={''}>Выберите брэнд</option>
        {cars.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
      {brand !== "" ? (
        <select
          onChange={e => dispath(vehicleChosen(e.target.value))}
        > 
          <option value={''}>Выберите модель</option>
          {models.map((car) => (
            <option value={car.id} key={car.id}>
              {car.model}
            </option>
          ))}
        </select>
      ) : (
        <span>Выберите брэнд</span>
      )}
    </>
  );
}
