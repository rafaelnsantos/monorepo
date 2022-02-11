import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DefaultRootState } from "react-redux";

export interface ShowsStore {
  value: number[];
  selected?: number;
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
    selectShow: (state, action: PayloadAction<number | undefined>) => {
      state.selected = action.payload;
    },
  },
});

export const checkIsAdded = (id: number) => (state: DefaultRootState) =>
  state.shows.value.includes(id);
