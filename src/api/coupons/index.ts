import axios from "@/lib/axios";

interface ImageTypes {
  file_name: string;
  uuid: string;
  mime_type: string;
  url: string;
}

interface EntityTypes {
  name: string;
  image: ImageTypes;
}

export interface CouponTypes {
  id: number;
  code: string;
  note: string;
  expire_date: string;
  influencer: EntityTypes;
  provider: EntityTypes;
  status: string;
}

export const getCoupons = async (hash: string): Promise<CouponTypes[]> => {
  const response = await axios.get("/coupons", {
    params: { hash },
  });
  return response.data.data;
};
