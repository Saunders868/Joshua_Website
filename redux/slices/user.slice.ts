import { SessionT, UserT } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState: {user: Omit<UserT, "password" | "passwordConfirmation"> &
SessionT } = {
  user: {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    token: "",
    refreshToken: "",
  },
};

export interface DecodedUserT extends UserT {
  createdAt: string;
  exp: number;
  iat: number;
  image: string;
  orders: string[];
  productPermissions: string[];
  role: "user" | "admin";
  session: string;
  updatedAt: string;
  __v: number;
  _id: string;
  name: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state: { user: Omit<UserT, "password" | "passwordConfirmation"> & SessionT },
      action: PayloadAction<SessionT>
    ) => {
      const token = action.payload.token;
      const user: DecodedUserT = jwt_decode(token);

      const fullName = user.name;
      const nameParts = fullName.split(" ");

      state.user.token = token;
      state.user.refreshToken = action.payload.refreshToken;
      state.user.username = user.username;
      state.user.email = user.email;
      state.user.firstName = nameParts[0];
      state.user.lastName = nameParts[1];
    },
    logout: (state) => {
      state.user.username = "";
      state.user.firstName = "";
      state.user.lastName = "";
      state.user.email = "";
      state.user.refreshToken = "";
      state.user.token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
