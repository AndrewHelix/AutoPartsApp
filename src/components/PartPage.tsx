import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks";

type Part = {
  name: string;
  price: string;
  for: string[];
  characteristics: string;
  img: string;
};

export function PartPage() {
  const [part, setPart] = useState<Part>({
    name: "",
    price: "",
    for: [],
    characteristics: "",
    img: "",
  });
  const { name } = useParams();

  const chosenCategory = useAppSelector((state) => state.parts.chosenCategory);
  const chosenSubcategory = useAppSelector(
    (state) => state.parts.chosenSubcategory
  );
  const categories = useAppSelector((state) => state.parts.categories);

  useEffect(() => {
    const parts = categories[chosenCategory][chosenSubcategory];
    const currentPart = parts.find((part) => part.name === name);
    //@ts-ignore
    setPart(currentPart);
  }, [categories]);

  return <div>{part.name} {part.price} {part.characteristics}</div>;
}
