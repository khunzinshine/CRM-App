import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const systemSlice = createSlice({
  name: "system",
  initialState: initialState,
  reducers: {
    loadingAction: (state = initialState, { payload }) => {
      return { ...state, loading: payload };
    },
  },
  extraReducers: {},
});

export const system = (state) => state.system;
export const { loadingAction } = systemSlice.actions;
export default systemSlice.reducer;
