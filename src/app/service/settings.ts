import { AxiosResponse } from "axios";
import api from "@/utils/api/api";

export function formsSettings(): Promise<AxiosResponse> {
  return api.http.get("/settings/forms");
}
