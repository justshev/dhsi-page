"use client";

import createCourseRequest from "@/services/courses/create-course";
import { CreateCoursePayload } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

const createCourseSchema = Yup.object({
  title: Yup.string().required("Judul kursus wajib diisi"),
  short_description: Yup.string()
    .max(200, "Deskripsi singkat maksimal 200 karakter")
    .required("Deskripsi singkat wajib diisi"),
  description: Yup.string().optional(),
  category: Yup.string().required("Kategori wajib dipilih"),
  level: Yup.string().required("Level wajib dipilih"),
  // duration: Yup.string().required("Durasi wajib diisi"),
  thumbnail: Yup.mixed<File>().nullable(),
  price: Yup.string().optional(),
});

const useCreateCourse = () => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: CreateCoursePayload) => {
      return createCourseRequest(payload);
    },
    mutationKey: ["create-course"],
    onSuccess: (response) => {
      const newId = response.data?.id;

      if (newId) {
        router.push(`/dashboard/courses/${newId}/modules`);
      }
    },
  });

  const formik = useFormik<CreateCoursePayload>({
    initialValues: {
      title: "",
      short_description: "",
      description: "",
      category: "",
      level: "",
      thumbnail: null,
      price: "",
    } as CreateCoursePayload,
    validationSchema: createCourseSchema,
    onSubmit: (values: CreateCoursePayload) => {
      console.log(values);
      mutate(values);
    },
  });

  return {
    isPending,
    formik,
  };
};

export default useCreateCourse;
