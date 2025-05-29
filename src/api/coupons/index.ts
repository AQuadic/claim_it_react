import axios from "@/lib/axios";

export const getCoupons = async (hash: string) => {
  const response = await axios.get("/coupons", {
    params: { hash },
  });
  return response.data;
};
