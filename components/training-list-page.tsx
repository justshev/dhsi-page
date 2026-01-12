"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Users,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Search,
  Video,
  Building2,
  Filter,
} from "lucide-react";
import {
  latestTrainings,
  upcomingWorkshops,
  completedTrainings,
  TrainingSession,
  formatDate,
  getStatusBadgeVariant,
  getStatusLabel,
  getTypeLabel,
  getTypeBadgeVariant,
} from "@/lib/training-data";

const allTrainings = [
  ...latestTrainings,
  ...upcomingWorkshops,
  ...completedTrainings,
];

export default function TrainingListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = [...new Set(allTrainings.map((t) => t.category))];
  const levels = ["Beginner", "Intermediate", "Advanced"];

  const categoryOptions = [
    { value: "all", label: "Semua Kategori" },
    ...categories.map((cat) => ({ value: cat, label: cat })),
  ];

  const levelOptions = [
    { value: "all", label: "Semua Level" },
    ...levels.map((level) => ({ value: level, label: level })),
  ];

  const statusOptions = [
    { value: "all", label: "Semua Status" },
    { value: "upcoming", label: "Segera Hadir" },
    { value: "ongoing", label: "Sedang Berlangsung" },
    { value: "completed", label: "Selesai" },
  ];

  const filterTrainings = (trainings: TrainingSession[]) => {
    return trainings.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || t.category === selectedCategory;
      const matchesLevel = selectedLevel === "all" || t.level === selectedLevel;
      const matchesStatus =
        selectedStatus === "all" || t.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
    });
  };

  const getFilteredByTab = () => {
    if (activeTab === "pelatihan") {
      return filterTrainings(
        allTrainings.filter((t) => t.type === "pelatihan")
      );
    } else if (activeTab === "workshop") {
      return filterTrainings(allTrainings.filter((t) => t.type === "workshop"));
    }
    return filterTrainings(allTrainings);
  };

  const filteredTrainings = getFilteredByTab();

  return (
    <main className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/5 via-background to-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Katalog Pelatihan & Workshop
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Temukan program pelatihan dan workshop terbaik untuk meningkatkan
              kompetensi Anda di bidang hukum siber.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <Input
                placeholder="Cari pelatihan atau workshop..."
                className="pl-12 pr-4 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-muted-foreground" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              options={categoryOptions}
              placeholder="Kategori"
              className="w-[180px]"
            />
            <Select
              value={selectedLevel}
              onValueChange={setSelectedLevel}
              options={levelOptions}
              placeholder="Level"
              className="w-[150px]"
            />
            <Select
              value={selectedStatus}
              onValueChange={setSelectedStatus}
              options={statusOptions}
              placeholder="Status"
              className="w-40"
            />
            {(selectedCategory !== "all" ||
              selectedLevel !== "all" ||
              selectedStatus !== "all" ||
              searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                  setSelectedStatus("all");
                  setSearchQuery("");
                }}
              >
                Reset Filter
              </Button>
            )}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="all">
                Semua ({filterTrainings(allTrainings).length})
              </TabsTrigger>
              <TabsTrigger value="pelatihan">
                Pelatihan (
                {
                  filterTrainings(
                    allTrainings.filter((t) => t.type === "pelatihan")
                  ).length
                }
                )
              </TabsTrigger>
              <TabsTrigger value="workshop">
                Workshop (
                {
                  filterTrainings(
                    allTrainings.filter((t) => t.type === "workshop")
                  ).length
                }
                )
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <TrainingGrid trainings={filteredTrainings} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}

function TrainingGrid({ trainings }: { trainings: TrainingSession[] }) {
  if (trainings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Tidak ada hasil yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainings.map((training) => (
        <Card
          key={training.id}
          className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col"
        >
          <div className="relative h-48 w-full overflow-hidden bg-muted">
            <Image
              src={training.thumbnail || "/placeholder.svg"}
              alt={training.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant={getStatusBadgeVariant(training.status)}>
                {getStatusLabel(training.status)}
              </Badge>
              <Badge
                variant={getTypeBadgeVariant(training.type)}
                className="bg-background/80 backdrop-blur-sm"
              >
                {getTypeLabel(training.type)}
              </Badge>
            </div>
            <div className="absolute top-3 right-3">
              <Badge
                variant="outline"
                className="bg-background/80 backdrop-blur-sm gap-1"
              >
                {training.isOnline ? (
                  <Video size={10} />
                ) : (
                  <Building2 size={10} />
                )}
                {training.isOnline ? "Online" : "Offline"}
              </Badge>
            </div>
          </div>
          <CardHeader className="flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Badge variant="secondary" className="text-xs">
                {training.category}
              </Badge>
              <span>•</span>
              <span>{training.level}</span>
            </div>
            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {training.title}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {training.shortDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted shrink-0">
                <Image
                  src={training.instructor.avatar || "/placeholder.svg"}
                  alt={training.instructor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {training.instructor.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {training.instructor.title}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span>{formatDate(training.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{training.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span className="truncate">
                  {training.isOnline ? "Online" : training.location}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center gap-4">
                {training.rating && (
                  <div className="flex items-center gap-1">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-sm font-semibold">
                      {training.rating}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users size={14} />
                  <span>
                    {training.enrolledParticipants}/{training.maxParticipants}
                  </span>
                </div>
              </div>
              <span className="font-bold text-primary">{training.price}</span>
            </div>

            <Link href={`/training/${training.id}`}>
              <Button className="w-full gap-2 mt-2" variant="outline">
                Lihat Detail <ArrowRight size={16} />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
