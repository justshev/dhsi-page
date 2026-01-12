"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Users,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  latestTrainings,
  formatDate,
  getStatusBadgeVariant,
  getStatusLabel,
  getTypeLabel,
} from "@/lib/training-data";

export default function LatestTrainingSection() {
  return (
    <section id="latest-training" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Sparkles size={16} />
            <span className="text-sm font-medium">Pelatihan Terbaru</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Kelas Pelatihan Terkini
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Tingkatkan kompetensi Anda dengan program pelatihan terbaru dari
            Dewan Hukum Siber Indonesia.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {latestTrainings.map((training) => (
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
                    variant="outline"
                    className="bg-background/80 backdrop-blur-sm"
                  >
                    {getTypeLabel(training.type)}
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
                        {training.enrolledParticipants}/
                        {training.maxParticipants}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-primary">
                    {training.price}
                  </span>
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

        <div className="text-center mt-12">
          <Link href="/training">
            <Button size="lg" className="gap-2">
              Lihat Semua Pelatihan <ArrowRight size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
