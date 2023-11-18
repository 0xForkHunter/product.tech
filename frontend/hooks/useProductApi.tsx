"use client";

import { BASE_API_URL } from "@/data/constants";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface Product {
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
  media: string[];
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

export const useGetProductFromSlug = (slug?: string, options?: { enabled?: boolean }) => {
  return useQuery({
    enabled: !!slug,
    ...options,
    queryKey: ["useGetProducts", slug],
    queryFn: () =>
      fetch(BASE_API_URL + `/products/preview?slug=${slug}`)
        .then((res) => res.json())
        .then((res) => res.product as Product),
  });
};

export const useCreateProductApi = () => {
  return useMutation({
    mutationFn: (args: { slug: string; submitter_address: string; safe_address: string }) =>
      fetch(BASE_API_URL + "/products", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ product: args }),
      })
        .then((res) => res.json())
        .then((res) => res.product as Product),
  });
};
