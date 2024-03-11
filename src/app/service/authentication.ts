"use client";
import api from "@/utils/api/api";
import { AxiosPromise, AxiosResponse } from "axios";

type PayloadLogin = {
  username: string;
  password: string;
};

export async function login(payload: PayloadLogin): Promise<AxiosResponse> {
  return api.http.patch("/api/auth", payload);
}

export async function signup(payload: PayloadLogin): Promise<AxiosResponse> {
  return api.http.post("/api/auth", payload);
}
