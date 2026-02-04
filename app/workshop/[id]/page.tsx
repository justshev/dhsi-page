"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, CheckCircle, Lock } from "lucide-react";
import useGetWorkshopDetail from "@/hooks/workshop/use-get-workshop-detail";
import { formatPrice } from "@/utils/format-price";
import { formatDate, getTypeLabel } from "@/lib/training-data";
import { moduleTypeLabels } from "@/types/course-module";
import { notFound, useParams } from "next/navigation";
import useCreateWorkshopPayment from "@/hooks/payment/use-create-workshop-payment";

export default function WorkshopDetailPage() {
  const { id } = useParams();
  const { workshop, isLoading, workshopNotFound } = useGetWorkshopDetail(
    id as string,
  );
  const { checkout, isProcessing } = useCreateWorkshopPayment();

  const handleCheckout = async () => {
    if (!workshop || !id || typeof id !== "string") return;

    const redirectUrl = await checkout(id);
    if (!redirectUrl) return;

    window.location.href = redirectUrl;
  };

  return (
    <>
      <Navbar />

      <main className="bg-background min-h-screen">
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4">
            {/* Back Button */}
            <Link
              href="/#latest-training"
              className="text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-2 text-sm"
            >
              <ArrowLeft size={16} />
              Kembali ke daftar pelatihan
            </Link>

            {/* Loading */}
            {isLoading && (
              <p className="text-muted-foreground py-20 text-center">
                Memuat detail pelatihan...
              </p>
            )}

            {workshopNotFound && (
              <p className="text-muted-foreground py-20 text-center">
                Pelatihan tidak ditemukan.
              </p>
            )}

            {!isLoading && workshop && (
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
                {/* ================= LEFT CONTENT ================= */}
                <div className="space-y-8">
                  {/* Header */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge>{getTypeLabel("pelatihan")}</Badge>
                      {workshop.category && (
                        <Badge variant="secondary">{workshop.category}</Badge>
                      )}
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Calendar size={14} />
                        {formatDate(workshop.created_at)}
                      </Badge>
                    </div>

                    <h1 className="text-3xl leading-tight font-bold md:text-4xl">
                      {workshop.title}
                    </h1>

                    {workshop.short_description && (
                      <p className="text-muted-foreground text-lg">
                        {workshop.short_description}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  {workshop.description && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Deskripsi</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {workshop.description}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {/* Benefits */}
                  {workshop.benefits?.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Apa yang Akan Anda Pelajari</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="grid gap-3 sm:grid-cols-2">
                          {workshop.benefits.map((benefit, index) => (
                            <li
                              key={index}
                              className="text-muted-foreground flex items-start gap-2 text-sm"
                            >
                              <CheckCircle
                                size={16}
                                className="mt-0.5 text-green-600"
                              />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Curriculum */}
                  {workshop.modules?.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Materi Pelatihan</CardTitle>
                        <CardDescription>
                          Preview struktur sesi (terkunci sebelum pembelian)
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        {workshop.modules
                          .slice()
                          .sort((a, b) => a.order - b.order)
                          .map((module) => (
                            <div
                              key={module.id}
                              className="flex items-center justify-between rounded-lg border px-4 py-3"
                            >
                              <div>
                                <p className="text-sm font-medium">
                                  {module.order}. {module.title}
                                </p>
                                <p className="text-muted-foreground text-xs">
                                  {moduleTypeLabels[module.type]}
                                </p>
                              </div>

                              <Lock
                                size={18}
                                className="text-muted-foreground"
                              />
                            </div>
                          ))}
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* ================= RIGHT STICKY ASIDE ================= */}
                <aside className="h-fit lg:sticky lg:top-24">
                  <Card className="overflow-hidden shadow-xl">
                    {/* Thumbnail */}
                    <div className="relative h-52 w-full">
                      <Image
                        src={workshop.thumbnail || "/placeholder.svg"}
                        alt={workshop.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <CardContent className="space-y-4 p-6">
                      {/* Price */}
                      <div className="text-center">
                        <p className="text-primary text-3xl font-bold">
                          {formatPrice(workshop.price)}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Akses penuh workshop
                        </p>
                      </div>

                      <Button
                        size="lg"
                        className="w-full"
                        onClick={handleCheckout}
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Memproses..." : "Daftar Sekarang"}
                      </Button>

                      <Separator />

                      {/* Info */}
                      <ul className="text-muted-foreground space-y-2 text-sm">
                        <li>✔ Akses semua materi</li>
                        <li>✔ Sertifikat kelulusan</li>
                        <li>✔ Update materi jika ada</li>
                      </ul>
                    </CardContent>
                  </Card>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
