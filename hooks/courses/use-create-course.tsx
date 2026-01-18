import { CreateCoursePayload } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";

const useCreateCourse = () => {
  const formik = useFormik<CreateCoursePayload>({
    initialValues: {
      title: "",
      author: "",
      short_description: "",
      description: "",
      category: "",
      duration: "",
      level: "",
      thumbnail: null,
    } as CreateCoursePayload,
    onSubmit: (values) => {},
  });

  const { mutate, isPending } = useMutation({});
};

export default useCreateCourse;
