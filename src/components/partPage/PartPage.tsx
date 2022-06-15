import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import './partPage.css'

type Part = {
  name: string;
  price: string;
  for: string[];
  characteristics: string;
  img: string;
};

type Parts = {
  [key: string]: {
    [key: string]: Part[];
  };
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
  const navigate = useNavigate();

  const chosenCategory = useAppSelector((state) => state.parts.chosenCategory);
  const chosenSubcategory = useAppSelector(
    (state) => state.parts.chosenSubcategory
  );
  const parts = useAppSelector((state) => state.parts.categories);

  useEffect(() => {
    if (Object.keys(parts).length) {
      const arrOfSubcategoryParts = parts[chosenCategory][chosenSubcategory];
      const part = arrOfSubcategoryParts.find((part) => part.name === name);
      //@ts-ignore
      setPart(part);
    }
  }, [parts]);

  function getRenderElements(charaсteristic: string) {
    const str = charaсteristic.split(":");

    return (
      <div className="characteristic-line" key={str[0]}>
        <b>{str[0]}:</b>
        <span>{str[1]}</span>
      </div>
    );
  }

  const goBack = () => navigate(-1);

  return (
    <div className="part-page-wrapper">
      <button className="part-form-close-btn cl-btn-3" onClick={goBack}>
            <span className="top"></span>
            <span className="bot"></span>
          </button>
      <div>
      <img src={part.img} alt={part.name} />
      </div>
      <div>
        <h4>{part.name}</h4>
        <h5>{part.price}</h5>
        {part.characteristics.split(";").map((el) => getRenderElements(el))}
      </div>
    </div>
  );
}
