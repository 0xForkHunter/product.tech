import { AirstackSocialProfiles } from "@/lib/api/backend/airstack";
import { ApiResponse } from "@/models/apiResponse.model";
import { SimpleUseQueryOptions } from "@/models/helpers.model";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "./useAxios";

export const useGetWalletSocials = (address?: `0x${string}`, options?: SimpleUseQueryOptions) => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["useGetWalletSocials", address],
    enabled: !!address,
    queryFn: () =>
      axios
        .get<ApiResponse<AirstackSocialProfiles>>("/api/airstack/social", { params: { address } })
        .then((res) => res.data.data),
  });
};
