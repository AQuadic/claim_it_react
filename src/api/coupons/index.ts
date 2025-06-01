import axios from "@/lib/axios";

export type CouponStatusType = "claimed" | "used" | "expired" | "available";

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
  status: CouponStatusType;
}

export interface ClaimReturnType {
  name: string;
  phone: string;
  status: string;
  qrcode: string;
  voucher: Voucher;
  provider: Provider;
}

export interface Provider {
  name: string;
}

export interface Voucher {
  id: number;
  code: string;
  note: string;
  status: string;
  expire_date: Date;
}

export const getCoupons = async (hash: string): Promise<CouponTypes[]> => {
  const response = await axios.get("/coupons", {
    params: { hash },
  });
  return response.data.data;
};

export const claimCoupon = async (
  id: string | number,
  hash: string,
  name: string,
  phone: string
): Promise<ClaimReturnType> => {
  const response = await axios.post("/coupons/", {
    id: id,
    hash,
    name,
    phone,
    phone_country: "EG",
  });
  return response.data.data;
};
