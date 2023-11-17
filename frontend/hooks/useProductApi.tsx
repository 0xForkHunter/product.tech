"use client";

import { BASE_API_URL } from "@/constants";
import { useQuery } from "@tanstack/react-query";

interface Product {
  description: string;
  id: number;
  name: string;
  product_creation_date: string;
  product_hunt_url: string;
  reviews_count: number;
  reviews_rating: number;
  safe_address: string;
  slug: string;
  submitter_address: string;
  tagline: string;
  thumbnail_url: string;
  votes_count: number;
  website_url: string;
}

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["useGetProducts"],
    queryFn: () =>
      fetch(BASE_API_URL + "/products")
        .then((res) => res.json())
        .then((res) => res.products as Product[]),
  });
};
