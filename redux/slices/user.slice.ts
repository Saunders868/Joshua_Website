import { SessionT, UserT } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState: Omit<UserT, "password" | "passwordConfirmation"> & SessionT = {
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  token: "",
  refreshToken: ""
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
      state: Omit<UserT, "password" | "passwordConfirmation"> & SessionT,
      action: PayloadAction<SessionT>
    ) => {
      const token = action.payload.token;
      const user: DecodedUserT = jwt_decode(token);
      
      const fullName = user.name;
      const nameParts = fullName.split(" ")
      
      state.token = token;
      state.refreshToken = action.payload.refreshToken;
      state.username = user.username;
      state.email = user.email;
      state.firstName = nameParts[0];
      state.lastName = nameParts[1];
    },
    logout: (state) => {
      state.username = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.refreshToken = ""
      state.token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
