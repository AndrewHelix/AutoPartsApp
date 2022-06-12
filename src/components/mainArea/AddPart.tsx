import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { showAppPartForm } from "../../slices/addPartSlice";
import { AddCarsForParts } from "./AddCarsForParts";

type StateType = {
  name: string;
  price: string;
  for: string[];
  characteristics: {
    [key: string]: string;
  };
};

export function AddPart() {
  const [state, setState] = useState<StateType>({
    name: "",
    price: "",
    for: [],
    characteristics: {},
  });
  const isShow = useAppSelector((state) => state.addPart.showAppPartForm);
  const dispath = useAppDispatch();

  function addCars(id: string, checked: boolean) {
    if (checked) {
      setState((state) => ({
        ...state,
        for: [...state.for, id],
      }));
    } else {
      setState((state) => ({
        ...state,
        for: state.for.filter(car => car !== id),
      }));
    }
  }

  return (
    <>
      {isShow ? (
        <div>
          <h3>add new part</h3>
          <button onClick={() => dispath(showAppPartForm(false))}>close</button>
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
            <label htmlFor="price">Price</label>
            <input type="text" id="price" />
            <AddCarsForParts onChange={addCars} />
          </form>
        </div>
      ) : null}
    </>
  );
}
