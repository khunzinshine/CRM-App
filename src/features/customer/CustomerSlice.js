import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCustomerList,
  createNewCustomer,
  deleteCustomer,
  getDetailCustomer,
} from "./CustomerAPI";

const initialState = {
  data: [],
  message: null,
  detail: {},
};

const Slice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCustomerList.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchCustomerList.rejected, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(createNewCustomer.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(createNewCustomer.rejected, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(deleteCustomer.rejected, (state, action) => {
      state.message = action.payload;
    });
    builder.addCase(getDetailCustomer.fulfilled, (state, action) => {
      state.detail = action.payload;
    });
    builder.addCase(getDetailCustomer.rejected, (state, action) => {
      state.message = action.payload;
    });
  },
});

export const customer = (state) => state.customer;
export default Slice.reducer;
