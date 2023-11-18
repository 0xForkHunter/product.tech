import { PRODUCT_TECH_ABI } from "./abis/productTechAbi";

export const APP_LOGO_SMALL = "/next.svg";
export const APP_LOGO = "/logo.png";
export const BASE_API_URL = "https://product-tech-5c84bae0fb08.herokuapp.com";
export const MAIN_COLOR = "#FF6154";
export const PRODUCT_TECH_ADDRESS = "0x8b8eF71BAa1483c87E679B23365E13bB110c8B79";
export const PRODUCT_TECH_CONTRACT = {
  address: PRODUCT_TECH_ADDRESS,
  abi: PRODUCT_TECH_ABI,
} as const;
