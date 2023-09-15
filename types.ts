import React from "react";

export interface LinkT {
  linkname: string;
  path: string;
}

export interface UserT {
  username: string;
  password: string;
  passwordConfirmation: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface SessionT {
  token: string;
  refreshToken: string;
}

export interface AdminDasboardLink {
  path: string;
  linkname: string;
  icon: React.ReactElement;
}

export interface ProductT {
  title: string;
  desc: string; 
  price: number;
  type?: "virtual" | "simple";
}