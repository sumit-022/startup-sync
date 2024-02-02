import instance from "@/config/axios.config";

const getServices = async () => {
  const response = await instance.get(
    "/services?pagination[page]=1&pagination[pageSize]=1000"
  );
  return response.data.data;
};

export default getServices;
