import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface partsState {
  categories: {
    [key: string] : {
      [key: string] : {
        name: string,
        price: string,
        for: string[],
        characteristics: string,
        img: string,
      }[]
    }
  };
  loadingParts: boolean;
  chosenCategory: string;
  chosenSubcategory: string;
}

// Define the initial state using that type
const initialState: partsState = {
  categories: {},
  loadingParts: false,
  chosenCategory: '',
  chosenSubcategory: '',
};

export const fetchParts = createAsyncThunk(
  "fetchParts", 
  async () => {
      const response = await fetch(`http://localhost:3001/categories/`);
      const data = await response.json();
      return data;
});

export const partsSlice = createSlice({
  name: "parts",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    chooseCategory: (state, action: PayloadAction<string>) => {
      state.chosenCategory = action.payload
    },
    chooseSubcategory: (state, action: PayloadAction<string>) => {
      state.chosenSubcategory = action.payload
    }
  },
  extraReducers: {
    "fetchParts/pending": (state) => {
      state.loadingParts = true;
    },
    "fetchParts/fulfilled": (state, action: PayloadAction<{}>) => {
      state.loadingParts = false;
      state.categories = action.payload
    },
    "fetchParts/rejected": (state) => {
      state.loadingParts = false;
    }
  },
});

export const {chooseCategory, chooseSubcategory} = partsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.parts;

export default partsSlice.reducer;