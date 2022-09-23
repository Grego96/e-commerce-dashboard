import { createReducer } from "@reduxjs/toolkit";
import { resetDb } from "./dbAction";

const initialState = { value: 0 };

const dbReducer = createReducer(initialState, (builder) => {
  builder.addCase(resetDb, (state, action) => {
    state.value++;
  });
});

export default dbReducer;
