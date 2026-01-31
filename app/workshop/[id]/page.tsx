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
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import createWorkshopPaymentRequest from "@/services/workshop/create-workshop-payment";

export default function WorkshopDetailPage() {
  const { id } = useParams();
  console.log(id);
  const { workshop, isLoading } = useGetWorkshopDetail(id as string);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    if (!workshop || !id || typeof id !== "string") return;

    try {
      setIsProcessing(true);
      const response = await createWorkshopPaymentRequest(id);

      const redirectUrl = response.data?.redirect_url;

      if (!redirectUrl) {
        toast.error("Gagal mendapatkan URL pembayaran.");
        return;
      }

      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast.error("Gagal memproses pembayaran workshop.");
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen">
        <section className="py-10 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/#latest-training"
              className="text-muted-foreground hover:text-primary mb-6 inline-flex items-center gap-2 transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Kembali ke daftar workshop</span>
            </Link>

            {isLoading && (
              <p className="text-muted-foreground py-20 text-center">
                Memuat detail workshop...
              </p>
            )}

            {!isLoading && !workshop && (
              <p className="text-muted-foreground py-20 text-center">
                Workshop tidak ditemukan.
              </p>
            )}

            {!isLoading && workshop && (
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
                {/* Left: Workshop info */}
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="default">{getTypeLabel("workshop")}</Badge>
                    {workshop.category && (
                      <Badge variant="secondary">{workshop.category}</Badge>
                    )}
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Calendar size={14} />
                      <span>{formatDate(workshop.created_at)}</span>
                    </Badge>
                  </div>

                  <h1 className="text-foreground text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
                    {workshop.title}
                  </h1>

                  {workshop.short_description && (
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {workshop.short_description}
                    </p>
                  )}

                  {workshop.description && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Deskripsi Workshop</CardTitle>
                        <CardDescription>
                          Detail mengenai materi dan tujuan workshop.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {workshop.description}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {workshop.benefits && workshop.benefits.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Yang Akan Anda Dapatkan</CardTitle>
                        <CardDescription>
                          Manfaat yang akan Anda peroleh dari mengikuti workshop
                          ini.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-muted-foreground space-y-2 text-sm leading-relaxed">
                          {workshop.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2">
                              {/* <span className="bg-primary mt-1 h-1.5 w-1.5 rounded-full" /> */}
                              <CheckCircle
                                size={16}
                                className="text-green-600"
                              />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {workshop.modules && workshop.modules.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Rencana Sesi Workshop</CardTitle>
                        <CardDescription>
                          Anda belum membeli workshop ini. Konten lengkap akan
                          terbuka setelah pembayaran berhasil.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-muted text-muted-foreground flex items-center gap-2 rounded-md px-4 py-3 text-sm">
                          <Lock size={16} className="shrink-0" />
                          <span>
                            Semua sesi dan materi masih terkunci. Ini adalah
                            preview struktur workshop untuk membantu Anda
                            mempertimbangkan pendaftaran.
                          </span>
                        </div>
                        <div className="space-y-3">
                          {workshop.modules
                            .slice()
                            .sort((a, b) => a.order - b.order)
                            .map((module) => (
                              <div
                                key={module.id}
                                className="bg-card flex items-start justify-between gap-3 rounded-lg border px-4 py-3"
                              >
                                <div>
                                  <p className="text-foreground text-sm font-medium">
                                    {module.order}. {module.title}
                                  </p>
                                  <p className="text-muted-foreground text-xs">
                                    {moduleTypeLabels[module.type]}
                                  </p>
                                </div>
                                <Lock
                                  size={18}
                                  className="text-muted-foreground mt-1 shrink-0"
                                />
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Right: Price & CTA */}
                <div className="lg:sticky lg:top-24">
                  <Card className="overflow-hidden shadow-xl">
                    <div className="bg-muted relative h-48 w-full overflow-hidden">
                      <Image
                        src={workshop.thumbnail || "/placeholder.svg"}
                        alt={workshop.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="space-y-4 px-6">
                      <div className="space-y-1 text-center">
                        <p className="text-muted-foreground text-sm">
                          {workshop.category}
                        </p>
                        <p className="text-primary text-3xl font-bold">
                          {formatPrice(workshop.price)}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          Harga per peserta, belum termasuk pajak bila ada.
                        </p>
                      </div>

                      <Separator />

                      <div className="text-muted-foreground space-y-2 text-sm">
                        <p>
                          Anda saat ini belum terdaftar pada workshop ini.
                          Silakan lanjut ke proses pendaftaran untuk mendapatkan
                          akses penuh ke seluruh sesi dan materi.
                        </p>
                      </div>

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleCheckout}
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Memproses..." : "Daftar Workshop"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
