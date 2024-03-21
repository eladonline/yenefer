import { AxiosResponse } from "axios";
import api from "@/utils/api/api";

export function userSettings(): Promise<AxiosResponse> {
  return api.http.get("/settings/user");
}
