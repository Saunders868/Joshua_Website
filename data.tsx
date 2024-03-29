import Carts from "./icons/Carts";
import Downloads from "./icons/Downloads";
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
  {
    path: "/shop",
    linkname: "shop",
  },
  {
    path: "/profile/dashboard",
    linkname: <Users color="white" />,
  },
  {
    path: "/cart",
    linkname: <Carts color="white" />,
  },
];

export const linksDataMobile: LinkT[] = [
  {
    path: "/",
    linkname: "home",
  },
  {
    path: "/about",
    linkname: "about",
  },
  {
    path: "/shop",
    linkname: "shop",
  },
  {
    path: "/profile/user",
    linkname: <Users />,
  },
  {
    path: "/cart",
    linkname: <Carts />,
  },
];

export const initialUserValues: UserT = {
  username: "",
  password: "",
  passwordConfirmation: "",
  productPermissions: [],
  email: "",
  firstName: "",
  lastName: "",
};

export const initialSessionValues: Omit<
  UserT,
  | "passwordConfirmation"
  | "username"
  | "firstName"
  | "lastName"
  | "productPermissions"
> = {
  email: "",
  password: "",
};

export const initialProductValues: ProductT = {
  title: "",
  desc: "",
  price: 0,
};

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
  // {
  //   path: "/admin/carts",
  //   linkname: "Carts",
  //   icon: <Carts />,
  // },
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

export const userDasboardLinks: AdminDasboardLink[] = [
  // {
  //   path: "/profile/dashboard",
  //   linkname: "Dashboard",
  //   icon: <Home />,
  // },
  {
    path: "/profile/user",
    linkname: "User",
    icon: <Users />,
  },
  {
    path: "/profile/orders",
    linkname: "Orders",
    icon: <Orders />,
  },
  {
    path: "/profile/downloads",
    linkname: "Downloads",
    icon: <Downloads />,
  },
];

export const foodSliderData = [
  {
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWJzdHJhY3R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
  },
];

export const faqItems = [
  {
    question: "BRANDING",
    hashtags: ["Figma", "Sketch", "Adobe", "Invision", "Protopie"],
    answer:
      "We believe in the greater good, we strive to do something for people, we aim to make their lives easier and more enjoyable, we love businesses that keep this",
  },
  {
    question: "UX/UI DESIGN",
    hashtags: ["Figma", "Sketch", "Adobe", "Invision", "Protopie"],
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
  },
  {
    question: "FRONTEND DEVELOPMENT",
    hashtags: ["Figma", "Sketch", "Adobe", "Invision", "Protopie"],
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
  },
  {
    question: "BACKEND DEVELOPMENT",
    hashtags: ["Figma", "Sketch", "Adobe", "Invision", "Protopie"],
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
  },
];
