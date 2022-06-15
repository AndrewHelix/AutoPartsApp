import { useState, ChangeEvent, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { showAppPartForm } from "../../slices/addPartSlice";
import { AddCarsForParts } from "./AddCarsForParts";
import { fetchAddPart } from "../../slices/addPartSlice";
import { AddCategoryForParts } from "./AddCategoryForParts";
import { getArr } from "../../helpers";
import { PartData } from "../../slices/addPartSlice";
import './addPart.css'

type StateType = {
  name: string;
  price: string;
  for: string[];
  characteristics: string;
  img: string
};

export function AddPart() {
  const isShow = useAppSelector((state) => state.addPart.showAppPartForm);
  const categoriesOfParts = useAppSelector(state => state.parts.categories)

  const dispath = useAppDispatch();
  
  const [body, setBody] = useState<StateType>({
    name: '',
    price: "",
    for: [],
    characteristics: "",
    img: ''
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

  function sendPartData({ category, subcategory, body} : PartData) {
    dispath(showAppPartForm(false));
    dispath(fetchAddPart({ category, subcategory, body}))
  }

  return (
    <>
      {isShow ? (
        <div className="add-part-form">
          <h3 className="add-part-title">add new part</h3>
          <button className="part-form-close-btn cl-btn-3" onClick={() => dispath(showAppPartForm(false))}>
            <span className="top"></span>
            <span className="bot"></span>
          </button>
          <form>
            <h4 className="add-part-subtitle">Category</h4>
            <div className="add-part-inputs-wrapper">
              <AddCategoryForParts name={'category'} items={categories} onChange={addCategoryInfo}/>
            </div>
            <h4 className="add-part-subtitle">Subcategory</h4>
            <div className="add-part-inputs-wrapper">
              <AddCategoryForParts name={'subcategory'} items={subcategories} onChange={addCategoryInfo}/>
            </div>
            <div className="add-part-data-wrapper">
              <div>
                <label className="add-part-subtitle" htmlFor="name">Name</label>
                <input type="text" id="name" onChange={addInfo} />
              </div>
              <div>
                <label className="add-part-subtitle" htmlFor="price">Price</label>
                <input type="text" id="price" onChange={addInfo} />
              </div>
              <div>
                <label className="add-part-subtitle" htmlFor="img-link">Link to img</label>
                <input type="text" id="img-link" onChange={addInfo} />
              </div>
            </div>
            <div className="add-part-inputs-wrapper">
             <AddCarsForParts onChange={addCars} />
            </div>
            <div className="add-part-data-wrapper">
              <div>
                <label className="add-part-subtitle" htmlFor="characteristics">Characteristics</label>
                <textarea
                  name="characteristics"
                  id="characteristics"
                  onChange={addInfo}
                  placeholder='Use this format - Property: value;'
                ></textarea>
                
              </div>
            </div>
           
          </form>
          <button className="add-part-send-btn" onClick={() => sendPartData({ category, subcategory, body}) }>
            <span>Send new part</span>
          </button>
        </div>
      ) : null}
    </>
  );
}
