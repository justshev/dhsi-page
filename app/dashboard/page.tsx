import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/lib/courses-data";
import {
  getAllTrainings,
  formatDate,
  getStatusLabel,
  getTypeLabel,
} from "@/lib/training-data";
import {
  BookOpen,
  GraduationCap,
  TrendingUp,
  Users,
  Presentation,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const publishedCourses = courses.filter((c) => c.status === "Published");
  const draftCourses = courses.filter((c) => c.status === "Draft");
  const totalStudents = courses.reduce(
    (acc, c) => acc + (c.enrolledStudents || 0),
    0
  );
  const avgRating =
    courses
      .filter((c) => c.rating && c.rating > 0)
      .reduce((acc, c) => acc + (c.rating || 0), 0) /
    courses.filter((c) => c.rating && c.rating > 0).length;

  // Training data
  const trainings = getAllTrainings();
  const upcomingTrainings = trainings.filter((t) => t.status === "upcoming");
  const ongoingTrainings = trainings.filter((t) => t.status === "ongoing");
  const totalTrainingParticipants = trainings.reduce(
    (acc, t) => acc + t.enrolledParticipants,
    0
  );

  const stats = [
    {
      title: "Total Kursus",
      value: courses.length,
      description: `${publishedCourses.length} published, ${draftCourses.length} draft`,
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      title: "Pelatihan & Workshop",
      value: trainings.length,
      description: `${upcomingTrainings.length} akan datang, ${ongoingTrainings.length} berlangsung`,
      icon: Presentation,
      color: "bg-teal-500",
    },
    {
      title: "Total Peserta",
      value: (totalStudents + totalTrainingParticipants).toLocaleString(),
      description: "Kursus & Pelatihan",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Rating Rata-rata",
      value: avgRating.toFixed(1),
      description: "Dari semua kursus",
      icon: TrendingUp,
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Selamat Datang di Dashboard
          </h1>
          <p className="text-slate-600">
            Kelola kursus hukum Indonesia Anda dengan mudah
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                    <p className="text-sm font-medium text-slate-600">
                      {stat.title}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Courses */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Kursus Terbaru</span>
                <Link
                  href="/dashboard/courses"
                  className="text-sm font-normal text-blue-600 hover:underline"
                >
                  Lihat semua
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.slice(0, 4).map((course) => (
                  <Link
                    key={course.id}
                    href={`/dashboard/courses/${course.id}/preview`}
                    className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                      <BookOpen className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">
                        {course.title}
                      </p>
                      <p className="text-sm text-slate-500">
                        {course.category} · {course.totalModules} modul
                      </p>
                    </div>
                    <div
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        course.status === "Published"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {course.status}
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kursus Populer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses
                  .filter((c) => c.enrolledStudents && c.enrolledStudents > 0)
                  .sort(
                    (a, b) =>
                      (b.enrolledStudents || 0) - (a.enrolledStudents || 0)
                  )
                  .slice(0, 4)
                  .map((course, index) => (
                    <Link
                      key={course.id}
                      href={`/dashboard/courses/${course.id}/preview`}
                      className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-slate-50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-900 truncate">
                          {course.title}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {course.enrolledStudents?.toLocaleString()}
                          </span>
                          {course.rating && (
                            <span className="flex items-center gap-1">
                              ⭐ {course.rating}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/dashboard/courses/new"
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Buat Kursus Baru</p>
                  <p className="text-sm text-slate-500">
                    Tambah kursus hukum baru
                  </p>
                </div>
              </Link>
              <Link
                href="/dashboard/training/new"
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                  <Presentation className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Tambah Pelatihan</p>
                  <p className="text-sm text-slate-500">
                    Buat pelatihan/workshop
                  </p>
                </div>
              </Link>
              <Link
                href="/dashboard/training"
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Kelola Pelatihan</p>
                  <p className="text-sm text-slate-500">
                    Atur jadwal & peserta
                  </p>
                </div>
              </Link>
              <Link
                href="/dashboard/students"
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Lihat Peserta</p>
                  <p className="text-sm text-slate-500">Kelola data peserta</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Trainings */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pelatihan Akan Datang</span>
              <Link
                href="/dashboard/training"
                className="text-sm font-normal text-blue-600 hover:underline"
              >
                Lihat semua
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTrainings.slice(0, 4).map((training) => (
                <Link
                  key={training.id}
                  href={`/dashboard/training/${training.id}/preview`}
                  className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-slate-50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
                    <Presentation className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">
                      {training.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatDate(training.date)} ·{" "}
                      {training.enrolledParticipants}/{training.maxParticipants}{" "}
                      peserta
                    </p>
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      training.type === "pelatihan"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-teal-100 text-teal-700"
                    }`}
                  >
                    {getTypeLabel(training.type)}
                  </div>
                </Link>
              ))}
              {upcomingTrainings.length === 0 && (
                <p className="text-center text-sm text-slate-500 py-4">
                  Tidak ada pelatihan yang akan datang
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
