import instance from "@/config/axios.config";

export const getEngineers = async () => {
  const response = await instance.get("/users");
  return response.data || [];
};
