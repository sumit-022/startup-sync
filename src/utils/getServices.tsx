import instance from "@/config/axios.config";

const getServices = async () => {
  const response = await instance.get("/services");
  return response.data.data;
};

export default getServices;
