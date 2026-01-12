"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SyllabusBuilder } from "@/components/dashboard/syllabus-builder"
import { AuthorSection } from "@/components/dashboard/author-section"
import {
  Course,
  Module,
  Author,
  CourseCategory,
  CourseLevel,
  categoryOptions,
  levelOptions,
  authors,
} from "@/lib/courses-data"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  FileText,
  Image,
  Save,
  User,
} from "lucide-react"
import Link from "next/link"

interface CourseFormProps {
  course?: Course
  mode: "create" | "edit"
}

interface FormData {
  title: string
  shortDescription: string
  fullDescription: string
  category: CourseCategory | ""
  level: CourseLevel | ""
  thumbnail: string
  estimatedDuration: string
  authorId: string
  modules: Module[]
}

const initialFormData: FormData = {
  title: "",
  shortDescription: "",
  fullDescription: "",
  category: "",
  level: "",
  thumbnail: "",
  estimatedDuration: "",
  authorId: "",
  modules: [],
}

export function CourseForm({ course, mode }: CourseFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(
    course
      ? {
          title: course.title,
          shortDescription: course.shortDescription,
          fullDescription: course.fullDescription || "",
          category: course.category,
          level: course.level,
          thumbnail: course.thumbnail,
          estimatedDuration: course.estimatedDuration,
          authorId: course.author.id,
          modules: course.modules,
        }
      : initialFormData
  )
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

  const steps = [
    { number: 1, title: "Informasi Dasar", icon: FileText },
    { number: 2, title: "Silabus Kursus", icon: FileText },
  ]

  const validateStep1 = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Judul kursus wajib diisi"
    }
    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Deskripsi singkat wajib diisi"
    }
    if (!formData.category) {
      newErrors.category = "Kategori wajib dipilih"
    }
    if (!formData.level) {
      newErrors.level = "Level wajib dipilih"
    }
    if (!formData.estimatedDuration.trim()) {
      newErrors.estimatedDuration = "Durasi wajib diisi"
    }
    if (!formData.authorId) {
      newErrors.authorId = "Penulis wajib dipilih"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (status: "Draft" | "Published") => {
    // In a real app, this would call an API
    console.log("Submitting course:", { ...formData, status })
    alert(`Kursus berhasil ${status === "Draft" ? "disimpan sebagai draft" : "dipublikasikan"}!`)
  }

  const updateFormData = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  const selectedAuthor = authors.find((a) => a.id === formData.authorId)

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard/courses"
            className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Kursus
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">
            {mode === "create" ? "Tambah Kursus Baru" : "Edit Kursus"}
          </h1>
          <p className="text-sm text-slate-600">
            {mode === "create"
              ? "Buat kursus hukum baru dengan mengisi informasi di bawah"
              : "Perbarui informasi kursus Anda"}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    currentStep >= step.number
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white text-slate-400"
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    Langkah {step.number}
                  </p>
                  <p
                    className={`text-xs ${
                      currentStep >= step.number ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-4 h-0.5 w-24 sm:w-32 md:w-48 ${
                      currentStep > step.number ? "bg-slate-900" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="mt-4" />
        </div>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 && (
                <>
                  <FileText className="h-5 w-5" />
                  Informasi Dasar Kursus
                </>
              )}
              {currentStep === 2 && (
                <>
                  <FileText className="h-5 w-5" />
                  Silabus & Materi Kursus
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <>
                {/* Course Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Judul Kursus <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Contoh: Pengantar Hukum Pidana Indonesia"
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                {/* Short Description */}
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">
                    Deskripsi Singkat <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="shortDescription"
                    placeholder="Ringkasan singkat tentang kursus ini (max 200 karakter)"
                    value={formData.shortDescription}
                    onChange={(e) => updateFormData("shortDescription", e.target.value)}
                    className={errors.shortDescription ? "border-red-500" : ""}
                    rows={3}
                  />
                  <p className="text-xs text-slate-500">
                    {formData.shortDescription.length}/200 karakter
                  </p>
                  {errors.shortDescription && (
                    <p className="text-sm text-red-500">{errors.shortDescription}</p>
                  )}
                </div>

                {/* Full Description */}
                <div className="space-y-2">
                  <Label htmlFor="fullDescription">Deskripsi Lengkap</Label>
                  <Textarea
                    id="fullDescription"
                    placeholder="Penjelasan detail tentang kursus, tujuan pembelajaran, dan manfaat yang akan didapat"
                    value={formData.fullDescription}
                    onChange={(e) => updateFormData("fullDescription", e.target.value)}
                    rows={5}
                  />
                </div>

                {/* Category and Level */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>
                      Kategori <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        updateFormData("category", value as CourseCategory)
                      }
                      options={categoryOptions}
                      placeholder="Pilih kategori"
                      className={errors.category ? "border-red-500" : ""}
                    />
                    {errors.category && (
                      <p className="text-sm text-red-500">{errors.category}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Level <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.level}
                      onValueChange={(value) =>
                        updateFormData("level", value as CourseLevel)
                      }
                      options={levelOptions}
                      placeholder="Pilih level"
                      className={errors.level ? "border-red-500" : ""}
                    />
                    {errors.level && (
                      <p className="text-sm text-red-500">{errors.level}</p>
                    )}
                  </div>
                </div>

                {/* Duration and Thumbnail */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="duration">
                      Estimasi Durasi <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="duration"
                        placeholder="Contoh: 12 jam"
                        value={formData.estimatedDuration}
                        onChange={(e) =>
                          updateFormData("estimatedDuration", e.target.value)
                        }
                        className={`pl-9 ${errors.estimatedDuration ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.estimatedDuration && (
                      <p className="text-sm text-red-500">{errors.estimatedDuration}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Thumbnail URL</Label>
                    <div className="relative">
                      <Image className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        id="thumbnail"
                        placeholder="https://example.com/image.jpg"
                        value={formData.thumbnail}
                        onChange={(e) => updateFormData("thumbnail", e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>

                {/* Author Selection */}
                <div className="space-y-2">
                  <Label>
                    Penulis / Instruktur <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.authorId}
                    onValueChange={(value) => updateFormData("authorId", value)}
                    options={authors.map((author) => ({
                      value: author.id,
                      label: author.name,
                    }))}
                    placeholder="Pilih penulis"
                    className={errors.authorId ? "border-red-500" : ""}
                  />
                  {errors.authorId && (
                    <p className="text-sm text-red-500">{errors.authorId}</p>
                  )}
                </div>

                {/* Author Preview */}
                {selectedAuthor && <AuthorSection author={selectedAuthor} />}
              </>
            )}

            {currentStep === 2 && (
              <SyllabusBuilder
                modules={formData.modules}
                onChange={(modules: Module[]) => updateFormData("modules", modules)}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Sebelumnya
          </Button>
          <div className="flex gap-2">
            {currentStep === 2 && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleSubmit("Draft")}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Simpan Draft
                </Button>
                <Button
                  className="bg-slate-900 hover:bg-slate-800"
                  onClick={() => handleSubmit("Published")}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Publikasikan
                </Button>
              </>
            )}
            {currentStep < 2 && (
              <Button onClick={handleNext} className="bg-slate-900 hover:bg-slate-800">
                Selanjutnya
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
