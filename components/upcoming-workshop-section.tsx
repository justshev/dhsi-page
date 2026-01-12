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
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Users,
  Video,
  Building2,
} from "lucide-react";
import { upcomingWorkshops, formatDate } from "@/lib/training-data";

export default function UpcomingWorkshopSection() {
  return (
    <section id="upcoming-workshops" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Calendar size={16} />
            <span className="text-sm font-medium">Segera Hadir</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Workshop Mendatang
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Praktik langsung dan hands-on dengan para pakar dalam workshop
            eksklusif kami.
          </p>
        </div>

        <div className="space-y-6">
          {upcomingWorkshops.map((workshop, index) => (
            <Card
              key={workshop.id}
              className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${
                index === 0 ? "border-primary border-2" : ""
              }`}
            >
              <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
                <div className="relative h-48 md:h-full min-h-[200px] overflow-hidden bg-muted">
                  <Image
                    src={workshop.thumbnail || "/placeholder.svg"}
                    alt={workshop.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {index === 0 && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary text-primary-foreground">
                        Terdekat
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="flex flex-col">
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="secondary">{workshop.category}</Badge>
                      <Badge variant="outline">{workshop.level}</Badge>
                      <Badge
                        variant={workshop.isOnline ? "default" : "outline"}
                        className="gap-1"
                      >
                        {workshop.isOnline ? (
                          <Video size={12} />
                        ) : (
                          <Building2 size={12} />
                        )}
                        {workshop.isOnline ? "Online" : "Offline"}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl lg:text-2xl">
                      {workshop.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {workshop.shortDescription}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Calendar size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Tanggal
                            </p>
                            <p className="font-medium">
                              {formatDate(workshop.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Clock size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Waktu
                            </p>
                            <p className="font-medium">{workshop.time}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <MapPin size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Lokasi
                            </p>
                            <p className="font-medium">{workshop.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Peserta
                            </p>
                            <p className="font-medium">
                              {workshop.enrolledParticipants}/
                              {workshop.maxParticipants} terdaftar
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                          <Image
                            src={
                              workshop.instructor.avatar || "/placeholder.svg"
                            }
                            alt={workshop.instructor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {workshop.instructor.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {workshop.instructor.title}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-primary">
                          {workshop.price}
                        </span>
                        <Link href={`/training/${workshop.id}`}>
                          <Button className="gap-2">
                            Daftar Sekarang <ArrowRight size={16} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
