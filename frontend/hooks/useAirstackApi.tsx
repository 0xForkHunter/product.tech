import { AirstackSocialProfiles } from "@/lib/api/backend/airstack";
import { ApiResponse } from "@/models/apiResponse.model";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "./useAxios";

export const useGetWalletSocials = (address?: `0x${string}`, options?: { enabled?: boolean }) => {
  const axios = useAxios();
  return useQuery({
    queryKey: ["useGetWalletSocials", address],
    enabled: !!address,
    ...options,
    queryFn: () =>
      axios
        .get<ApiResponse<AirstackSocialProfiles>>("/api/airstack/social", { params: { address } })
        .then((res) => res.data.data),
  });
};
