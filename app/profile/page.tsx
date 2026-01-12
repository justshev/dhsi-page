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

export default function ProfilePage() {
  const { user, isLoading, logout, getUserProfileData } = useAuth();
  const [activeTab, setActiveTab] = useState("classes");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    occupation: "",
    company: "",
  });

  const profile = getUserProfileData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const startEditing = () => {
    setEditData({
      name: profile.name,
      phone: profile.phone || "",
      occupation: profile.occupation || "",
      company: profile.company || "",
    });
    setIsEditing(true);
  };

  const getStatusBadge = (status: EnrolledClass["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
            Selesai
          </Badge>
        );
      case "ongoing":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100">
            Sedang Berjalan
          </Badge>
        );
      case "upcoming":
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100">
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
            className="border-slate-300 text-slate-600 bg-white"
          >
            Kursus
          </Badge>
        );
      case "training":
        return (
          <Badge
            variant="outline"
            className="border-teal-300 text-teal-700 bg-teal-50"
          >
            Pelatihan
          </Badge>
        );
      case "workshop":
        return (
          <Badge
            variant="outline"
            className="border-purple-300 text-purple-700 bg-purple-50"
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
            className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Link>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center text-3xl font-bold shadow-lg">
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
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white text-slate-700 flex items-center justify-center shadow-md hover:bg-slate-50">
                <Edit2 className="h-4 w-4" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{profile.name}</h1>
              <p className="text-slate-300">{profile.email}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-300">
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
                className="border-white/30 text-white hover:bg-white/10 bg-white/5"
                onClick={startEditing}
              >
                <Settings className="h-4 w-4 mr-2 shrink-0" />
                <span>Edit Profil</span>
              </Button>
              <Button
                variant="outline"
                className="border-red-400/40 text-red-200 hover:bg-red-500/20 hover:text-red-100 bg-red-500/10"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-2 shrink-0" />
                <span>Keluar</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="py-4">
              <BookOpen className="h-6 w-6 mx-auto text-teal-500 mb-2" />
              <p className="text-2xl font-bold text-slate-900">
                {profile.enrolledClasses.length}
              </p>
              <p className="text-sm text-slate-500">Kelas Diikuti</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="py-4">
              <Star className="h-6 w-6 mx-auto text-amber-500 mb-2" />
              <p className="text-2xl font-bold text-slate-900">
                {profile.ratedClasses.length}
              </p>
              <p className="text-sm text-slate-500">Kelas Dirating</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="py-4">
              <Award className="h-6 w-6 mx-auto text-blue-500 mb-2" />
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
          <TabsList className="grid w-full grid-cols-3 mb-6 h-auto p-1">
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
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto text-slate-300 mb-3" />
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
                        className="flex flex-col gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md hover:border-slate-300 transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {getTypeBadge(cls.type)}
                              {getStatusBadge(cls.status)}
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-1">
                              {cls.title}
                            </h3>
                            <p className="text-sm text-slate-500">
                              {cls.instructor}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
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
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-3 border-t border-slate-100">
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
                                className="w-full sm:w-auto gap-2 border-green-200 text-green-700 bg-green-50 hover:bg-green-100 hover:border-green-300"
                              >
                                <CheckCircle2 className="h-4 w-4 shrink-0" />
                                <span>Selesai</span>
                              </Button>
                            ) : cls.status === "ongoing" ? (
                              <Button
                                size="sm"
                                className="w-full sm:w-auto gap-2 bg-teal-500 hover:bg-teal-600 text-white"
                              >
                                <PlayCircle className="h-4 w-4 shrink-0" />
                                <span>Lanjutkan</span>
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full sm:w-auto gap-2 border-amber-200 text-amber-700 bg-amber-50 hover:bg-amber-100 hover:border-amber-300"
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
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                    <p className="text-slate-500">
                      Anda belum memberikan rating apapun
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {profile.ratedClasses.map((rated) => (
                      <div
                        key={rated.id}
                        className="p-4 rounded-lg border bg-white"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {getTypeBadge(rated.type)}
                            </div>
                            <h3 className="font-semibold text-slate-900">
                              {rated.title}
                            </h3>
                          </div>
                          <div className="text-right">
                            {renderStars(rated.rating)}
                            <p className="text-xs text-slate-400 mt-1">
                              {formatDate(rated.ratedAt)}
                            </p>
                          </div>
                        </div>
                        {rated.review && (
                          <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
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
                  <div className="text-center py-8">
                    <Award className="h-12 w-12 mx-auto text-slate-300 mb-3" />
                    <p className="text-slate-500">
                      Anda belum memiliki sertifikat
                    </p>
                    <p className="text-sm text-slate-400 mt-1">
                      Selesaikan kelas untuk mendapatkan sertifikat
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {profile.certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="p-4 rounded-lg border bg-linear-to-br from-white to-slate-50 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center shrink-0">
                            <Award className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {getTypeBadge(cert.classType)}
                            </div>
                            <h3 className="font-semibold text-slate-900 truncate">
                              {cert.classTitle}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">
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
                            className="flex-1 gap-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                          >
                            <Download className="h-4 w-4 shrink-0" />
                            <span>Unduh PDF</span>
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 gap-2 bg-teal-500 hover:bg-teal-600 text-white"
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
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
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
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
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
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
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
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
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
                  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white gap-2"
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
