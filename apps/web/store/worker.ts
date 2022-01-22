import { createSlice } from "@reduxjs/toolkit";

export interface WorkerStore {
  url: string;
}

const initialState: WorkerStore = {
  url: process.env.NEXT_PUBLIC_VERCEL_URL,
};

export const workerSlice = createSlice({
  name: "worker",

  initialState,

  reducers: {},
});
