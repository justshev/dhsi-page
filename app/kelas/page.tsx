"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  latestTrainings,
  upcomingWorkshops,
  type TrainingSession,
} from "@/lib/training-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Search,
  Calendar,
  Clock,
  Users,
  MapPin,
  Star,
  CheckCircle2,
  BookOpen,
  Award,
  Loader2,
  Filter,
} from "lucide-react";
import useGetUser from "@/hooks/auth/use-get-user";

export default function KelasPage() {
  // const { isAuthenticated, isLoading, getUserProfileData } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // const profile = getUserProfileData();
  // const enrolledIds = data?.enrolledClasses.map((c) => c.id) || [];

  // Combine all programs
  const allPrograms: TrainingSession[] = [
    ...latestTrainings,
    ...upcomingWorkshops,
  ];

  // Filter programs
  const filteredPrograms = allPrograms.filter((program) => {
    const matchesSearch =
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.shortDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "training")
      return matchesSearch && program.type === "pelatihan";
    if (activeTab === "workshop")
      return matchesSearch && program.type === "workshop";
    if (activeTab === "enrolled")
      // return matchesSearch && enrolledIds.includes(program.id);

      return matchesSearch;
  });

  const { isLoading, hasLoggedin } = useGetUser();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-linear-to-r from-slate-800 to-slate-900 py-8 text-white">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="mb-4 inline-flex items-center text-sm text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500 shadow-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">Katalog Kelas</h1>
              <p className="text-slate-300">
                Temukan pelatihan dan workshop yang sesuai dengan kebutuhan Anda
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="relative max-w-md flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Cari pelatihan atau workshop..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-500">
              {filteredPrograms.length} program ditemukan
            </span>
          </div>
        </div>
      </div>

      {/* Tabs & Content */}
      <div className="container mx-auto px-4 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid w-full grid-cols-4">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="training">Pelatihan</TabsTrigger>
            <TabsTrigger value="workshop">Workshop</TabsTrigger>
            {hasLoggedin && (
              <TabsTrigger value="enrolled">Kelas Saya</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value={activeTab}>
            {filteredPrograms.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <BookOpen className="mx-auto mb-3 h-12 w-12 text-slate-300" />
                  <p className="text-slate-500">
                    {activeTab === "enrolled"
                      ? "Anda belum terdaftar di kelas apapun"
                      : "Tidak ada program yang ditemukan"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPrograms.map((program) => {
                  // const isEnrolled = enrolledIds.includes(program.id);

                  return (
                    <Card
                      key={program.id}
                      className="overflow-hidden transition-shadow hover:shadow-lg"
                    >
                      <div className="relative h-48 bg-slate-200">
                        <Image
                          src={program.thumbnail || "/placeholder.jpg"}
                          alt={program.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <Badge
                            className={
                              program.type === "pelatihan"
                                ? "bg-teal-500"
                                : "bg-purple-500"
                            }
                          >
                            {program.type === "pelatihan"
                              ? "Pelatihan"
                              : "Workshop"}
                          </Badge>
                          {/* {isEnrolled && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Terdaftar
                            </Badge>
                          )} */}
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <h3 className="mb-2 line-clamp-2 text-lg font-bold text-slate-900">
                          {program.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-sm text-slate-500">
                          {program.shortDescription}
                        </p>

                        <div className="mb-4 space-y-2 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span>{program.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-slate-400" />
                            <span>{program.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            <span>{program.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t pt-4">
                          <div>
                            <p className="text-xs text-slate-500">Harga</p>
                            <p className="font-bold text-teal-600">
                              {program.price}
                            </p>
                          </div>

                          {/* {isEnrolled ? (
                              <Link href="/profile">
                                <Button variant="outline" size="sm">
                                  Lihat Progress
                                </Button>
                              </Link>
                            )  */}
                          {hasLoggedin ? (
                            <Button
                              size="sm"
                              className="bg-teal-500 hover:bg-teal-600"
                            >
                              Daftar Sekarang
                            </Button>
                          ) : (
                            <Link href={`/login?redirect=/kelas`}>
                              <Button size="sm" variant="outline">
                                Login untuk Daftar
                              </Button>
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA for non-authenticated users */}
      {!hasLoggedin && (
        <div className="bg-linear-to-r from-teal-500 to-teal-600 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-3 text-2xl font-bold text-white">
              Mulai Perjalanan Belajar Anda
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-teal-100">
              Daftar sekarang untuk mendapatkan akses ke semua pelatihan dan
              workshop kami. Dapatkan sertifikat resmi setelah menyelesaikan
              program.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-teal-50"
                >
                  Daftar Gratis
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Sudah Punya Akun
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Benefits */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="mb-8 text-center text-xl font-bold text-slate-900">
          Keuntungan Mengikuti Program Kami
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100">
                <Award className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">
                Sertifikat Resmi
              </h3>
              <p className="text-sm text-slate-600">
                Dapatkan sertifikat yang diakui setelah menyelesaikan program
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">
                Instruktur Ahli
              </h3>
              <p className="text-sm text-slate-600">
                Belajar langsung dari para praktisi dan akademisi terkemuka
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mb-2 font-semibold text-slate-900">
                Materi Terkini
              </h3>
              <p className="text-sm text-slate-600">
                Kurikulum selalu diperbarui sesuai perkembangan hukum terbaru
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
