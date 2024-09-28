import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface Prayer {
  nextPrayer: string;
  nextPrayerTime:number
}

const initialState: Prayer = {
    nextPrayer: "",
    nextPrayerTime:0
};

export const prayerSlice = createSlice({
  name: "prayerTime",
  initialState,
  reducers: {
    setNextPrayer: (state, action: PayloadAction<string>) => {
      state.nextPrayer = action.payload;
    },
    setNextPrayerTime: (state, action: PayloadAction<number>) => {
        state.nextPrayerTime = action.payload;
      },

  },
});

export const { setNextPrayer,setNextPrayerTime } = prayerSlice.actions;
export const prayerReducer = prayerSlice.reducer;
