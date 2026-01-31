"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import useGetCourseTitle from "@/hooks/workshop/use-get-course-by-id";
import { CourseModule, ModuleType } from "@/types/course-module";
import saveWorkshopModulesRequest, {
  SaveWorkshopModulesPayload,
} from "@/services/workshop/save-workshop-modules";

export interface CourseModulesFormValues {
  modules: CourseModule[];
  draftTitle: string;
  draftDate: string;
  draftType: ModuleType | null;
}

const useCourseModulesBuilder = () => {
  const router = useRouter();
  const { id: courseId } = useParams();
  const { title, isLoading } = useGetCourseTitle(courseId as string);

  const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);

  const { mutate: saveModules, isPending } = useMutation({
    mutationKey: ["workshop-modules", courseId],
    mutationFn: (values: CourseModulesFormValues) => {
      const payload: SaveWorkshopModulesPayload = {
        modules: values.modules.map((module, index) => ({
          title: module.title,
          type: module.type,
          date: module.date,
          order: module.order ?? index + 1,
          youtube_url: module.youtubeUrl || undefined,
          zoom_url: module.zoomUrl || undefined,
          whatsapp_group_url: module.whatsappGroupUrl || undefined,
          exam_form_url: module.examFormUrl || undefined,
        })),
      };

      return saveWorkshopModulesRequest(courseId as string, payload);
    },
    onSuccess: (response) => {
      toast.success(response.message || "Modul berhasil disimpan");
      router.push(`/dashboard/workshops/${courseId}`);
    },
    onError: () => {
      toast.error("Gagal menyimpan modul. Silakan coba lagi.");
    },
  });

  const formik = useFormik<CourseModulesFormValues>({
    initialValues: {
      modules: [],
      draftTitle: "",
      draftDate: "",
      draftType: null,
    },
    onSubmit: (values) => {
      saveModules(values);
    },
  });

  const openTypeDialog = () => {
    setIsTypeDialogOpen(true);
  };

  const handleTypeDialogChange = (open: boolean) => {
    setIsTypeDialogOpen(open);
  };

  const handleSelectType = (type: ModuleType) => {
    const nextIndex = formik.values.modules.length + 1;

    formik.setFieldValue("draftType", type);
    formik.setFieldValue("draftTitle", `Modul ${nextIndex}`);
    formik.setFieldValue("draftDate", "");

    setIsTypeDialogOpen(false);
    setIsScheduleDialogOpen(true);
  };

  const handleScheduleDialogChange = (open: boolean) => {
    setIsScheduleDialogOpen(open);
  };

  const handleCancelSchedule = () => {
    setIsScheduleDialogOpen(false);
    formik.setFieldValue("draftType", null);
    formik.setFieldValue("draftTitle", "");
    formik.setFieldValue("draftDate", "");
  };

  const handleConfirmSchedule = () => {
    const { draftType, draftTitle, draftDate, modules } = formik.values;

    if (!draftType || !draftDate) return;

    const newModule: CourseModule = {
      id: `module-${Date.now()}`,
      title: draftTitle || `Modul ${modules.length + 1}`,
      type: draftType,
      isExpanded: false,
      order: modules.length + 1,
      date: draftDate,
      youtubeUrl: "",
      zoomUrl: "",
      whatsappGroupUrl: "",
      examFormUrl: "",
    };

    formik.setFieldValue("modules", [...modules, newModule]);

    setIsScheduleDialogOpen(false);
    formik.setFieldValue("draftType", null);
    formik.setFieldValue("draftTitle", "");
    formik.setFieldValue("draftDate", "");
  };

  const toggleModuleExpand = (moduleId: string) => {
    const updatedModules = formik.values.modules.map((module) =>
      module.id === moduleId
        ? { ...module, isExpanded: !module.isExpanded }
        : module,
    );

    formik.setFieldValue("modules", updatedModules);
  };

  const handleChangeDraftTitle = (value: string) => {
    formik.setFieldValue("draftTitle", value);
  };

  const handleChangeDraftDate = (value: string) => {
    formik.setFieldValue("draftDate", value);
  };

  const handleChangeModuleField = <K extends keyof CourseModule>(
    moduleId: string,
    field: K,
    value: CourseModule[K],
  ) => {
    const updatedModules = formik.values.modules.map((module) =>
      module.id === moduleId ? { ...module, [field]: value } : module,
    );

    formik.setFieldValue("modules", updatedModules);
  };

  const handleSave = () => {
    formik.handleSubmit();
  };

  const isSaveDisabled =
    formik.values.modules.length === 0 || isPending || !formik.dirty;

  return {
    // course info
    courseId,
    title,
    isLoading,

    // formik
    formik,
    modules: formik.values.modules,

    // dialogs
    isTypeDialogOpen,
    isScheduleDialogOpen,
    openTypeDialog,
    handleTypeDialogChange,
    handleScheduleDialogChange,

    // actions
    handleSelectType,
    handleCancelSchedule,
    handleConfirmSchedule,
    toggleModuleExpand,
    handleChangeDraftTitle,
    handleChangeDraftDate,
    handleChangeModuleField,
    handleSave,

    // derived state
    isSaveDisabled,
  };
};

export default useCourseModulesBuilder;
