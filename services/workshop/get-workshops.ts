import axiosInstance from "@/lib/axios";

export interface WorkshopSummary {
  id: string;
  title: string;
  short_description: string | null;
  description: string | null;
  category: string | null;
  thumbnail: string | null;
  price: number;
  created_at: string;
}

export interface GetWorkshopsResponse {
  data: WorkshopSummary[];
}

export const getWorkshopsRequest = async () => {
  const response = await axiosInstance.get<GetWorkshopsResponse>(
    "/api/dashboard/workshops"
  );
  return response.data;
};
