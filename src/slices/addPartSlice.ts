import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { fetchParts } from "./partsSlice";
import {useAppDispatch} from '../hooks'

// Define a type for the slice state
interface addPartState {
  newPart: {
    [key: string]: {
      [key: string]: {
        name: string;
        price: string;
        for: [];
        characteristics: "";
      }[];
    };
  };
  showAppPartForm: boolean;
  loadingNewPart: boolean;
}

// Define the initial state using that type
const initialState: addPartState = {
  newPart: {
    ПОДВЕСКА: {
      АМОРТИЗАТОРЫ: {
        //@ts-ignore
        name: "",
        price: "",
        for: [],
        characteristics: "",
      },
    },
  },
  showAppPartForm: false,
  loadingNewPart: false,
};

export interface PartData {
  category: string;
  subcategory: string;
  body: {
    name: string;
    price: string;
    for: string[];
    characteristics: string;
  };
}

async function getNewBody({ category, subcategory, body }: PartData) {
  const parts = await fetch('http://localhost:3001/categories/');
  const data = await parts.json();
  
  const oldParts = data[category][subcategory]
  data[category][subcategory] = [...oldParts, body]
  return data
}

export const fetchAddPart = createAsyncThunk(
  "fetchAddPart",
  async ({ category, subcategory, body }: PartData) => {
    const newBody = await getNewBody({ category, subcategory, body })
    const response = await fetch(
      `http://localhost:3001/categories/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(newBody),
      }
    );
    console.log(category, subcategory)
    const data = await response.json();
    console.log(newBody)
    return data;
  }
);

export const addPartSlice = createSlice({
  name: "addPart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    showAppPartForm: (state, action: PayloadAction<boolean>) => {
      state.showAppPartForm = action.payload;
    },
  },
  extraReducers: {
    "fetchAddPart/pending": (state) => {
      state.loadingNewPart = true;
    },
    "fetchAddPart/fulfilled": (state, action: PayloadAction<{}>) => {
      state.loadingNewPart = false;
      state.newPart = action.payload;
    },
    "fetchAddPart/rejected": (state) => {
      state.loadingNewPart = false;
    },
  },
});

export const { showAppPartForm } = addPartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.addPart;

export default addPartSlice.reducer;
