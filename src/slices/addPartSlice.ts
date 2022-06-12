import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface addPartState {
  newPart : {
    [key: string]: {
      [key: string]: {
        name: string;
        price: string;
        for: [];
        characteristics: {
          [key: string]: string;
        };
      }[];
    };
  } 
  showAppPartForm: boolean;
  loadingNewPart: boolean;
}

// Define the initial state using that type
const initialState: addPartState = {
  newPart : {
    'ПОДВЕСКА': {
      'АМОРТИЗАТОРЫ': {
        //@ts-ignore
        name: '',
        price: '',
        for: [],
        characteristics: {
          'sdfsf': '',
        },
      }
    }
  },
  showAppPartForm: false,
  loadingNewPart: false
};

interface PartData {
  category: string;
  subcategory: string;
  body: {};
}

export const fetchAddPart = createAsyncThunk(
  "fetchAddPart",
  async ({ category, subcategory, body }: PartData) => {
    const response = await fetch(
      `http://localhost:3001/${category}/${subcategory}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
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

export const {showAppPartForm} = addPartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.addPart;

export default addPartSlice.reducer;
