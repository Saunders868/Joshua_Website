import Carts from "./icons/Carts";
import Home from "./icons/Home";
import Orders from "./icons/Orders";
import Products from "./icons/Products";
import Sessions from "./icons/Sessions";
import Users from "./icons/Users";
import { AdminDasboardLink, LinkT, ProductT, UserT } from "./types";

export const linksData: LinkT[] = [
  {
    path: "/",
    linkname: "home",
  },
  {
    path: "/about",
    linkname: "about",
  },
];

export const initialUserValues: UserT = {
  username: "",
  password: "",
  passwordConfirmation: "",
  email: "",
  firstName: "",
  lastName: "",
};

export const initialSessionValues: Omit<
  UserT,
  "passwordConfirmation" | "username" | "firstName" | "lastName"
> = {
  email: "",
  password: "",
};

export const initialProductValues: ProductT = {
  title: "",
  desc: "",
  price: 0
}

export const dashboardLinks: AdminDasboardLink[] = [
  {
    path: "/admin/dashboard",
    linkname: "Dashboard",
    icon: <Home />,
  },
  {
    path: "/admin/products",
    linkname: "Products",
    icon: <Products />,
  },
  {
    path: "/admin/orders",
    linkname: "Orders",
    icon: <Orders />,
  },
  {
    path: "/admin/carts",
    linkname: "Carts",
    icon: <Carts />,
  },
  {
    path: "/admin/users",
    linkname: "Users",
    icon: <Users />,
  },
  {
    path: "/admin/sessions",
    linkname: "Sessions",
    icon: <Sessions />,
  },
];
