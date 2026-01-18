"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth-context";
import {
  type EnrolledClass,
  type RatedClass,
  type Certificate,
  formatDate,
} from "@/lib/auth";
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  Calendar,
  BookOpen,
  Star,
  Award,
  Settings,
  LogOut,
  ChevronRight,
  Download,
  Clock,
  CheckCircle2,
  PlayCircle,
  Loader2,
  Edit2,
  Save,
  X,
  ArrowLeft,
} from "lucide-react";
import useGetUser from "@/hooks/auth/use-get-user";

export default function ProfilePage() {
  const { data: user, hasLoggedin, isLoading } = useGetUser();
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const getStatusBadge = (status: EnrolledClass["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="border-green-200 bg-green-100 text-green-700 hover:bg-green-100">
            Selesai
          </Badge>
        );
      case "ongoing":
        return (
          <Badge className="border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-100">
            Sedang Berjalan
          </Badge>
        );
      case "upcoming":
        return (
          <Badge className="border-amber-200 bg-amber-100 text-amber-700 hover:bg-amber-100">
            Akan Datang
          </Badge>
        );
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "course":
        return (
          <Badge
            variant="outline"
            className="border-slate-300 bg-white text-slate-600"
          >
            Kursus
          </Badge>
        );
      case "training":
        return (
          <Badge
            variant="outline"
            className="border-teal-300 bg-teal-50 text-teal-700"
          >
            Pelatihan
          </Badge>
        );
      case "workshop":
        return (
          <Badge
            variant="outline"
            className="border-purple-300 bg-purple-50 text-purple-700"
          >
            Workshop
          </Badge>
        );
      default:
        return null;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-amber-400 text-amber-400"
                : "text-slate-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-linear-to-r from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/"
            className="mb-4 inline-flex items-center text-sm text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Link>
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {/* Avatar */}
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-teal-400 to-teal-600 text-3xl font-bold shadow-lg">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  profile.name.charAt(0).toUpperCase()
                )}
              </div>
              <button className="absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-700 shadow-md hover:bg-slate-50">
                <Edit2 className="h-4 w-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-slate-300">{profile.email}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-300">
                {profile.occupation && (
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {profile.occupation}
                  </span>
                )}
                {profile.company && (
                  <span className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    {profile.company}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Bergabung {formatDate(profile.joinedAt)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                className="border-white/30 bg-white/5 text-white hover:bg-white/10"
                onClick={startEditing}
              >
                <Settings className="mr-2 h-4 w-4 shrink-0" />
                <span>Edit Profil</span>
              </Button>
              <Button
                variant="outline"
                className="border-red-400/40 bg-red-500/10 text-red-200 hover:bg-red-500/20 hover:text-red-100"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4 shrink-0" />
                <span>Keluar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto -mt-6 px-4">
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="py-4">
              <BookOpen className="mx-auto mb-2 h-6 w-6 text-teal-500" />
              <p className="text-2xl font-bold text-slate-900">
                {profile.enrolledClasses.length}
              </p>
              <p className="text-sm text-slate-500">Kelas Diikuti</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="py-4">
              <Star className="mx-auto mb-2 h-6 w-6 text-amber-500" />
              <p className="text-2xl font-bold text-slate-900">
                {profile.ratedClasses.length}
              </p>
              <p className="text-sm text-slate-500">Kelas Dirating</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="py-4">
              <Award className="mx-auto mb-2 h-6 w-6 text-blue-500" />
              <p className="text-2xl font-bold text-slate-900">
                {profile.certificates.length}
              </p>
              <p className="text-sm text-slate-500">Sertifikat</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid h-auto w-full grid-cols-3 p-1">
            <TabsTrigger
              value="classes"
              className="gap-2 py-2.5 data-[state=active]:bg-teal-500 data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Kelas Saya</span>
            </TabsTrigger>
            <TabsTrigger
              value="ratings"
              className="gap-2 py-2.5 data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              <Star className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Rating Saya</span>
            </TabsTrigger>
            <TabsTrigger
              value="certificates"
              className="gap-2 py-2.5 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <Award className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Sertifikat</span>
            </TabsTrigger>
          </TabsList>

          {/* Classes Tab */}
          <TabsContent value="classes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Kelas yang Diikuti</CardTitle>
                <CardDescription>
                  Daftar semua kelas, pelatihan, dan workshop yang Anda ikuti
                </CardDescription>
              </CardHeader>
              <CardContent>
                {profile.enrolledClasses.length === 0 ? (
                  <div className="py-8 text-center">
                    <BookOpen className="mx-auto mb-3 h-12 w-12 text-slate-300" />
                    <p className="text-slate-500">
                      Anda belum mengikuti kelas apapun
                    </p>
                    <Link href="/kelas">
                      <Button className="mt-4 bg-teal-500 hover:bg-teal-600">
                        Jelajahi Kelas
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {profile.enrolledClasses.map((cls) => (
                      <div
                        key={cls.id}
                        className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-md"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                          <div className="min-w-0 flex-1">
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              {getTypeBadge(cls.type)}
                              {getStatusBadge(cls.status)}
                            </div>
                            <h3 className="mb-1 font-semibold text-slate-900">
                              {cls.title}
                            </h3>
                            <p className="text-sm text-slate-500">
                              {cls.instructor}
                            </p>
                            <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="h-3 w-3 shrink-0" />
                                <span>
                                  Terdaftar {formatDate(cls.enrolledAt)}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Progress and Action Row */}
                        <div className="flex flex-col gap-4 border-t border-slate-100 pt-3 sm:flex-row sm:items-center">
                          <div className="flex-1 space-y-1.5">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-500">Progress</span>
                              <span className="font-semibold text-slate-700">
                                {cls.progress}%
                              </span>
                            </div>
                            <Progress value={cls.progress} className="h-2" />
                          </div>
                          <div className="shrink-0 sm:ml-4">
                            {cls.status === "completed" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full gap-2 border-green-200 bg-green-50 text-green-700 hover:border-green-300 hover:bg-green-100 sm:w-auto"
                              >
                                <CheckCircle2 className="h-4 w-4 shrink-0" />
                                <span>Selesai</span>
                              </Button>
                            ) : cls.status === "ongoing" ? (
                              <Button
                                size="sm"
                                className="w-full gap-2 bg-teal-500 text-white hover:bg-teal-600 sm:w-auto"
                              >
                                <PlayCircle className="h-4 w-4 shrink-0" />
                                <span>Lanjutkan</span>
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full gap-2 border-amber-200 bg-amber-50 text-amber-700 hover:border-amber-300 hover:bg-amber-100 sm:w-auto"
                              >
                                <Clock className="h-4 w-4 shrink-0" />
                                <span>Menunggu</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ratings Tab */}
          <TabsContent value="ratings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rating & Ulasan Saya</CardTitle>
                <CardDescription>
                  Daftar kelas yang sudah Anda berikan rating dan ulasan
                </CardDescription>
              </CardHeader>
              <CardContent>
                {profile.ratedClasses.length === 0 ? (
                  <div className="py-8 text-center">
                    <Star className="mx-auto mb-3 h-12 w-12 text-slate-300" />
                    <p className="text-slate-500">
                      Anda belum memberikan rating apapun
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {profile.ratedClasses.map((rated) => (
                      <div
                        key={rated.id}
                        className="rounded-lg border bg-white p-4"
                      >
                        <div className="mb-3 flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <div className="mb-1 flex items-center gap-2">
                              {getTypeBadge(rated.type)}
                            </div>
                            <h3 className="font-semibold text-slate-900">
                              {rated.title}
                            </h3>
                          </div>
                          <div className="text-right">
                            {renderStars(rated.rating)}
                            <p className="mt-1 text-xs text-slate-400">
                              {formatDate(rated.ratedAt)}
                            </p>
                          </div>
                        </div>
                        {rated.review && (
                          <p className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                            &ldquo;{rated.review}&rdquo;
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sertifikat Saya</CardTitle>
                <CardDescription>
                  Daftar sertifikat yang telah Anda peroleh
                </CardDescription>
              </CardHeader>
              <CardContent>
                {profile.certificates.length === 0 ? (
                  <div className="py-8 text-center">
                    <Award className="mx-auto mb-3 h-12 w-12 text-slate-300" />
                    <p className="text-slate-500">
                      Anda belum memiliki sertifikat
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Selesaikan kelas untuk mendapatkan sertifikat
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {profile.certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="rounded-lg border bg-linear-to-br from-white to-slate-50 p-4 transition-shadow hover:shadow-md"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-teal-400 to-teal-600">
                            <Award className="h-6 w-6 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              {getTypeBadge(cert.classType)}
                            </div>
                            <h3 className="truncate font-semibold text-slate-900">
                              {cert.classTitle}
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                              No: {cert.certificateNumber}
                            </p>
                            <p className="text-xs text-slate-400">
                              Diterbitkan {formatDate(cert.issuedAt)}
                            </p>
                          </div>
                        </div>
                        <Separator className="my-3" />
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 gap-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                          >
                            <Download className="h-4 w-4 shrink-0" />
                            <span>Unduh PDF</span>
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 gap-2 bg-teal-500 text-white hover:bg-teal-600"
                          >
                            <span>Lihat</span>
                            <ChevronRight className="h-4 w-4 shrink-0" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Edit Profil</CardTitle>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nama Lengkap</Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="edit-name"
                    className="pl-10"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Nomor Telepon</Label>
                <div className="relative">
                  <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="edit-phone"
                    className="pl-10"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-occupation">Pekerjaan</Label>
                <div className="relative">
                  <Briefcase className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="edit-occupation"
                    className="pl-10"
                    value={editData.occupation}
                    onChange={(e) =>
                      setEditData({ ...editData, occupation: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-company">Perusahaan/Instansi</Label>
                <div className="relative">
                  <Building className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="edit-company"
                    className="pl-10"
                    value={editData.company}
                    onChange={(e) =>
                      setEditData({ ...editData, company: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-300 text-slate-600 hover:bg-slate-50"
                  onClick={() => setIsEditing(false)}
                >
                  Batal
                </Button>
                <Button
                  className="flex-1 gap-2 bg-teal-500 text-white hover:bg-teal-600"
                  onClick={() => setIsEditing(false)}
                >
                  <Save className="h-4 w-4 shrink-0" />
                  <span>Simpan</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
