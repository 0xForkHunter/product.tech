import { PRODUCT_TECH_ABI } from "./abis/productTechAbi";

export const APP_LOGO_SMALL = "/next.svg";
export const APP_LOGO = "/logo.png";
export const DEFAULT_PROFILE_PICTURE = "/default-profile.png";
export const BASE_API_URL = "http://127.0.0.1:3001";
export const MAIN_COLOR = "#FF6154";
export const PRODUCT_TECH_ADDRESS = "0x277b12B641f28B7Bb24601072D34fc48c706af06";
export const PRODUCT_TECH_CONTRACT = {
  address: PRODUCT_TECH_ADDRESS,
  abi: PRODUCT_TECH_ABI,
} as const;
