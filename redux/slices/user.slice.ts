import { SessionT, UserT } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState: Omit<UserT, "password" | "passwordConfirmation"> = {
  username: "",
  email: "",
  firstName: "",
  lastName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state: Omit<UserT, "password" | "passwordConfirmation">,
      action: PayloadAction<SessionT>
    ) => {
      const token = action.payload.token;
      const user = jwt_decode(token);
      state.username = "state updated";
    },
    logout: (state) => {
      state.username = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
