import { createSlice } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer-types";

const initialState: UserReducerInitialState = {
  user: null,
  loading: true,
};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExists: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    userNotExists: (state) => {
        state.loading = false;
        state.user = null;
    },
  },
});

export const {userExists, userNotExists} = userReducer.actions