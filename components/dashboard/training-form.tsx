"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  TrainingSession,
  TrainingType,
  TrainingStatus,
  trainingTypeOptions,
  trainingStatusOptions,
  trainingCategoryOptions,
  trainingLevelOptions,
} from "@/lib/training-data";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Image as ImageIcon,
  MapPin,
  Plus,
  Save,
  Trash2,
  User,
  X,
} from "lucide-react";
import Link from "next/link";

interface TrainingFormProps {
  training?: TrainingSession;
  mode: "create" | "edit";
}

export function TrainingForm({ training, mode }: TrainingFormProps) {
  const router = useRouter();
  const isEdit = mode === "edit";

  // Form state
  const [formData, setFormData] = useState({
    title: training?.title || "",
    shortDescription: training?.shortDescription || "",
    fullDescription: training?.fullDescription || "",
    type: training?.type || ("pelatihan" as TrainingType),
    status: training?.status || ("upcoming" as TrainingStatus),
    category: training?.category || "",
    level: training?.level || "Beginner",
    date: training?.date || "",
    endDate: training?.endDate || "",
    time: training?.time || "",
    duration: training?.duration || "",
    location: training?.location || "",
    isOnline: training?.isOnline || false,
    maxParticipants: training?.maxParticipants || 30,
    price: training?.price || "",
    thumbnail: training?.thumbnail || "",
    instructor: {
      name: training?.instructor.name || "",
      title: training?.instructor.title || "",
      avatar: training?.instructor.avatar || "",
    },
    syllabus: training?.syllabus || [""],
    requirements: training?.requirements || [""],
    benefits: training?.benefits || [""],
  });

  const [saving, setSaving] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInstructorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      instructor: { ...prev.instructor, [name]: value },
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayItemChange = (
    field: "syllabus" | "requirements" | "benefits",
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field: "syllabus" | "requirements" | "benefits") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayItem = (
    field: "syllabus" | "requirements" | "benefits",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form data:", formData);
    setSaving(false);
    router.push("/dashboard/training");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Link href="/dashboard/training">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isEdit
                ? "Edit Pelatihan/Workshop"
                : "Tambah Pelatihan/Workshop Baru"}
            </h1>
            <p className="text-sm text-slate-600">
              {isEdit
                ? "Perbarui informasi pelatihan atau workshop"
                : "Isi formulir untuk membuat pelatihan atau workshop baru"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
              <CardDescription>
                Informasi utama tentang pelatihan atau workshop
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="type">Tipe Program *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange("type", value)}
                    options={trainingTypeOptions}
                    placeholder="Pilih tipe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      handleSelectChange("status", value)
                    }
                    options={trainingStatusOptions}
                    placeholder="Pilih status"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Judul Program *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Contoh: Certified Cyber Law Practitioner (CCLP)"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Deskripsi Singkat *</Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  placeholder="Deskripsi singkat untuk ditampilkan di card..."
                  rows={2}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription">Deskripsi Lengkap</Label>
                <Textarea
                  id="fullDescription"
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  placeholder="Deskripsi lengkap tentang program ini..."
                  rows={4}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleSelectChange("category", value)
                    }
                    options={trainingCategoryOptions}
                    placeholder="Pilih kategori"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Level *</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) =>
                      handleSelectChange("level", value)
                    }
                    options={trainingLevelOptions}
                    placeholder="Pilih level"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">URL Thumbnail</Label>
                <div className="flex gap-2">
                  <Input
                    id="thumbnail"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                    placeholder="/training/nama-gambar.jpg"
                  />
                  <Button type="button" variant="outline" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule & Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Jadwal & Lokasi
              </CardTitle>
              <CardDescription>
                Atur tanggal, waktu, dan lokasi pelaksanaan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Tanggal Mulai *</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Tanggal Selesai</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="time">Waktu *</Label>
                  <Input
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="09:00 - 16:00 WIB"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Durasi *</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="Contoh: 3 hari (24 jam)"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isOnline"
                    checked={formData.isOnline}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="text-sm">Program Online</span>
                </label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Lokasi *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder={
                    formData.isOnline
                      ? "Online via Zoom"
                      : "Nama Hotel / Lokasi"
                  }
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Instructor */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Instruktur
              </CardTitle>
              <CardDescription>
                Informasi tentang instruktur / narasumber
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instructorName">Nama Instruktur *</Label>
                <Input
                  id="instructorName"
                  name="name"
                  value={formData.instructor.name}
                  onChange={handleInstructorChange}
                  placeholder="Prof. Dr. Nama Lengkap, S.H., M.H."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructorTitle">Jabatan / Keahlian *</Label>
                <Input
                  id="instructorTitle"
                  name="title"
                  value={formData.instructor.title}
                  onChange={handleInstructorChange}
                  placeholder="Guru Besar Hukum Siber & Pakar Digital Forensik"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructorAvatar">URL Foto Instruktur</Label>
                <Input
                  id="instructorAvatar"
                  name="avatar"
                  value={formData.instructor.avatar}
                  onChange={handleInstructorChange}
                  placeholder="/avatars/instructor-1.jpg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Capacity */}
          <Card>
            <CardHeader>
              <CardTitle>Harga & Kapasitas</CardTitle>
              <CardDescription>Atur harga dan batas peserta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Harga *</Label>
                  <Input
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Rp 5.000.000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Maksimal Peserta *</Label>
                  <Input
                    id="maxParticipants"
                    name="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={handleInputChange}
                    min={1}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Syllabus */}
          <Card>
            <CardHeader>
              <CardTitle>Materi / Silabus</CardTitle>
              <CardDescription>
                Daftar materi yang akan dipelajari
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.syllabus.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold text-primary shrink-0">
                    {index + 1}
                  </div>
                  <Input
                    value={item}
                    onChange={(e) =>
                      handleArrayItemChange("syllabus", index, e.target.value)
                    }
                    placeholder={`Materi ${index + 1}`}
                  />
                  {formData.syllabus.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeArrayItem("syllabus", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                onClick={() => addArrayItem("syllabus")}
              >
                <Plus className="h-4 w-4" />
                Tambah Materi
              </Button>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Persyaratan Peserta</CardTitle>
              <CardDescription>
                Syarat yang harus dipenuhi calon peserta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.requirements.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) =>
                      handleArrayItemChange(
                        "requirements",
                        index,
                        e.target.value
                      )
                    }
                    placeholder={`Persyaratan ${index + 1}`}
                  />
                  {formData.requirements.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeArrayItem("requirements", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                onClick={() => addArrayItem("requirements")}
              >
                <Plus className="h-4 w-4" />
                Tambah Persyaratan
              </Button>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Manfaat / Benefit</CardTitle>
              <CardDescription>
                Yang akan didapatkan peserta setelah mengikuti program
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.benefits.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) =>
                      handleArrayItemChange("benefits", index, e.target.value)
                    }
                    placeholder={`Benefit ${index + 1}`}
                  />
                  {formData.benefits.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeArrayItem("benefits", index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2"
                onClick={() => addArrayItem("benefits")}
              >
                <Plus className="h-4 w-4" />
                Tambah Benefit
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <Link href="/dashboard/training">
              <Button type="button" variant="outline">
                Batal
              </Button>
            </Link>
            <Button type="submit" disabled={saving} className="gap-2">
              <Save className="h-4 w-4" />
              {saving
                ? "Menyimpan..."
                : isEdit
                ? "Simpan Perubahan"
                : "Buat Program"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
