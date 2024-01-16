import instance from "@/config/axios.config";
import parseAttributes from "./parse-data";

export const getEngineers = async () => {
  const response = await instance.get("/users");
  return parseAttributes(response.data.data) || [];
};
