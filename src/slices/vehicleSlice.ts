import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface vehicleState {
  vehicles: {
    [key: string] : {
      model: string,
      id: string,
      photo: string
    }[]
  };
  brand: string
  chosenVehicle: string
  loadingVehicles: boolean;
}

// Define the initial state using that type
const initialState: vehicleState = {
  vehicles: {},
  brand: '',
  chosenVehicle: '',
  loadingVehicles: false,
};

export const fetchVehicles = createAsyncThunk(
  "fetchVehicles", 
  async () => {
      const response = await fetch(`http://localhost:3001/vehicles/`);
      const data = await response.json();
      return data;
});

export const vehicleSlice = createSlice({
  name: "vehicle",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    vehicleSelected: (state, action: PayloadAction<string>) => {
      state.brand =  action.payload
    },
    vehicleChosen: (state, action: PayloadAction<string>) => {
      state.chosenVehicle = action.payload
    }
  },
  extraReducers: {
    "fetchVehicles/pending": (state) => {
      state.loadingVehicles = true;
    },
    "fetchVehicles/fulfilled": (state, action: PayloadAction<{}>) => {
      state.loadingVehicles = false;
      state.vehicles = action.payload
    },
    "fetchVehicles/rejected": (state) => {
      state.loadingVehicles = false;
    }
  },
});

export const {vehicleSelected, vehicleChosen} = vehicleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.vehicle;

export default vehicleSlice.reducer;
