import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 text-balance">
          Siap Berkolaborasi Menguatkan Hukum Siber Indonesia?
        </h2>
        <p className="text-xl text-primary-foreground/80 mb-8 text-balance max-w-2xl mx-auto">
          Bergabunglah bersama regulator, penegak hukum, industri, akademisi, dan komunitas untuk membangun ekosistem
          digital yang aman dan berkeadilan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="gap-2">
            Daftar Sebagai Mitra <ArrowRight size={20} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
          >
            Lihat Dokumen Mandat
          </Button>
        </div>
      </div>
    </section>
  )
}
