import { LinkT, UserT } from "./types";

export const linksData: LinkT[] = [
  {
    path: "/",
    linkname: "home",
  },
  {
    path: "/about",
    linkname: "about",
  }
];

export const initialUserValues: UserT = {
  username: "",
  password: "",
  passwordConfirmation: "",
  email: "",
  firstName: "",
  lastName: "",
};

export const initialSessionValues: Omit<UserT, "passwordConfirmation" | "username" | "firstName" | "lastName"> = {
  email: "",
  password: ""
}
