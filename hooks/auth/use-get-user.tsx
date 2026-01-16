"use client";

import { useQuery } from "@tanstack/react-query";

import getCurrentUser from "@/services/auth/me";

export const useGetUser = () => {
	return useQuery({
		queryKey: ["auth", "me"],
		queryFn: getCurrentUser,
		staleTime: 5 * 60 * 1000,
	});
};

export default useGetUser;

