import { useState, ChangeEvent, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { showAppPartForm } from "../../slices/addPartSlice";
import { AddCarsForParts } from "./AddCarsForParts";
import { fetchAddPart } from "../../slices/addPartSlice";
import { AddCategoryForParts } from "./AddCategoryForParts";
import { getArr } from "../../helpers";

type StateType = {
  name: string;
  price: string;
  for: string[];
  characteristics: "";
};

export function AddPart() {
  const isShow = useAppSelector((state) => state.addPart.showAppPartForm);
  const categoriesOfParts = useAppSelector(state => state.parts.categories)

  const dispath = useAppDispatch();
  
  const [body, setBody] = useState<StateType>({
    name: 'AZAZAZA',
    price: "",
    for: [],
    characteristics: "",
  });
  const [categories, setCategory] = useState<string[]>([])
  const [subcategories, setSubcategory] = useState<string[]>([])

  const [categoryInfo, setCategoryInfo] = useState({
    category: '',
    subcategory: ''
  });

  const {category, subcategory} = categoryInfo

  useEffect(() => {
    if(Object.keys(categoriesOfParts).length) {
      setCategory(getArr(categoriesOfParts))
    }
  }, [categoriesOfParts])

  useEffect(() => {
    if(categoryInfo.category.length) {
      setSubcategory(getArr(categoriesOfParts[categoryInfo.category]))
    }
  }, [categoryInfo.category])

  function addCategoryInfo(e : ChangeEvent<HTMLInputElement>) {
    setCategoryInfo(state => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }

  //const {category, subcategory} = categoryInfo
  /* const category = 'СИСТЕМА ВЫПУСКА';
  const subcategory = 'ГЛУШИТЕЛЬ ВЫХЛОПНЫХ ГАЗОВ' */

  function addCars(id: string, checked: boolean) {
    if (checked) {
      setBody((state) => ({
        ...state,
        for: [...state.for, id],
      }));
    } else {
      setBody((state) => ({
        ...state,
        for: state.for.filter((car) => car !== id),
      }));
    }
  }

  type HTMLElements = HTMLInputElement & HTMLTextAreaElement;

  function addInfo(e: ChangeEvent<HTMLElements>) {
    setBody((state) => ({
      ...state,
      [e.target.id]: e.target.value,
    }));
  }

 /*  function addCategory(e: ChangeEvent<HTMLInputElement>) {
    setCategoryInfo(state => ({
      ...state,
      [e.target.id] : e.target.value
    }))
  } */

  return (
    <>
      {isShow ? (
        <div>
          <h3>add new part</h3>
          <button onClick={() => dispath(showAppPartForm(false))}>close</button>
          <form>
            <p>Category</p>
            <AddCategoryForParts value={'category'} items={categories} onChange={addCategoryInfo}/>
            <p>Subcategory</p>
            <AddCategoryForParts value={'subcategory'} items={subcategories} onChange={addCategoryInfo}/>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" onChange={addInfo} />
            <label htmlFor="price">Price</label>
            <input type="text" id="price" onChange={addInfo} />
            <AddCarsForParts onChange={addCars} />
            <label htmlFor="characteristics">Characteristics</label>
            <textarea
              name="characteristics"
              id="characteristics"
              onChange={addInfo}
            ></textarea>
          </form>
          <button onClick={() => dispath(fetchAddPart({ category, subcategory, body})) }>Send new part</button>
        </div>
      ) : null}
    </>
  );
}
