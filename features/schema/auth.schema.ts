import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
});
