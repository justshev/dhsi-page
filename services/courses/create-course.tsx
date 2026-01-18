import axiosInstance from "@/lib/axios";
import { CreateCoursePayload } from "@/types/types";

export interface CreateCourseResponse {
  status: string;
  message: string;
  data?: {
    id: string;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
}

export const createCourseRequest = async (
  payload: CreateCoursePayload,
): Promise<CreateCourseResponse> => {
  const { data } = await axiosInstance.post<CreateCourseResponse>(
    "/api/courses/new",
    payload,
  );

  return data;
};

export default createCourseRequest;
