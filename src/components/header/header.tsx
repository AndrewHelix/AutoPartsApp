import { FC } from "react";
import { fetchVehicles } from "../../slices/vehicleSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";

import { VehicleChoice } from "../vehicleChoice/vehicleChoice";

import './header.css'

function getArr(obj: {}): string[] {
  return Object.keys(obj);
}

export const Header: FC = () => {
  const dispath = useAppDispatch();
  const vehicles = useAppSelector((state) => state.vehicle.vehicles);
  //const brand = useAppSelector((state) => state.vehicle.vehicles);

  useEffect(() => {
    dispath(fetchVehicles());
  }, []);

  return (
    <header className="header">
      <VehicleChoice cars={getArr(vehicles)} />
    </header>
  );
};

export default Header;
