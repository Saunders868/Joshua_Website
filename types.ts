import React from "react";

export interface LinkT {
  linkname: string | React.ReactElement;
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
  createdAt?: string;
  id?: string;
  image?: string;
  updatedAt?: string;
  user?: string;
  // user: string;
  __v?: number;
  _id?: string;
  // _id: string;
}

export interface UserSessionT {
  createdAt: string;
  updatedAt: string;
  user: string;
  userAgent: string;
  valid: boolean;
  __v: number;
  _id: string;
}

export type CloudinaryInfoT = {
  access_mode: string;
  api_key: string;
  asset_id: string;
  batchId: string;
  bytes: number;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  id: string;
  original_filename: string;
  path: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: string[];
  thumbnail_url: string;
  type: string;
  url: string;
  version: number;
  version_id: string;
  width: number;
};
