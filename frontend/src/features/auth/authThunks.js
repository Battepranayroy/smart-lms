import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Register failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      return res.data; // contains user + token
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
