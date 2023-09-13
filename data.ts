import { LinkT, UserT } from "./types";

export const linksData: LinkT[] = [
  {
    path: "/",
    linkname: "home",
  },
  {
    path: "/about",
    linkname: "about",
  },
  {
    path: "/create-profile",
    linkname: "create"
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
