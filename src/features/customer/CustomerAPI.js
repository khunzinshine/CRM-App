import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadingAction } from "../system/SystemSlice";
import axios from "axios";

export const fetchCustomerList = createAsyncThunk(
  "fetchCustomerList",
  async ({ url, body }, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(loadingAction(true));
      const response = await axios.get(url, { params: body });
      dispatch(loadingAction(false));
      return fulfillWithValue(response);
    } catch (err) {
      dispatch(loadingAction(false));
      return rejectWithValue(err);
    }
  }
);

export const createNewCustomer = createAsyncThunk(
  "createNewCustomer",
  async ({ url, body }, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(loadingAction(true));
      const response = await axios.post(url, { params: body });
      dispatch(loadingAction(false));
      return fulfillWithValue(response);
    } catch (err) {
      dispatch(loadingAction(false));
      return rejectWithValue(err);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "deleteCustomer",
  async ({ url, body }, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(loadingAction(true));
      const response = await axios.delete(url + "/" + body);
      dispatch(loadingAction(false));
      return fulfillWithValue(response);
    } catch (err) {
      dispatch(loadingAction(false));
      return rejectWithValue(err);
    }
  }
);

export const getDetailCustomer = createAsyncThunk(
  "getDetailCustomer",
  async ({ url, body }, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      dispatch(loadingAction(true));
      const response = await axios.get(url + "/" + body);
      dispatch(loadingAction(false));
      return fulfillWithValue(response);
    } catch (err) {
      dispatch(loadingAction(false));
      return rejectWithValue(err);
    }
  }
);
