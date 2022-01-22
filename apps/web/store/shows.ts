import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShowsStore {
  value: number[];
}

const initialState: ShowsStore = {
  value: [],
};

export const showsSlice = createSlice({
  name: "shows",

  initialState,

  reducers: {
    addShow: (state, { payload }: PayloadAction<number>) => {
      const shows = new Set(state.value);
      shows.add(payload);
      state.value = Array.from(shows);
    },
    removeShow: (state, { payload }: PayloadAction<number>) => {
      const shows = new Set(state.value);
      shows.delete(payload);
      state.value = Array.from(shows);
    },
  },
});
