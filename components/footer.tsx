import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">DC</span>
              </div>
              <span className="font-bold text-lg text-foreground">Dewan Hukum Siber Indonesia</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Forum kolaborasi nasional untuk penguatan regulasi, penegakan hukum, dan tata kelola ruang siber Indonesia.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Program */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Program</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition text-sm">
                  Regulasi & Tata Kelola Siber
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition text-sm">
                  Forensik & Pembuktian Digital
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition text-sm">
                  Manajemen Insiden & Krisis
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition text-sm">
                  Etika, Privasi, & Hak Digital
                </a>
              </li>
            </ul>
          </div>

          {/* Dewan */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Dewan</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition text-sm">
                  Profil & Mandat
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition text-sm">
                  Berita & Publikasi
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition text-sm">
                  Struktur & Keanggotaan
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition text-sm">
                  Hubungi Sekretariat
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition text-sm">
                  Kebijakan Keamanan Informasi
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition text-sm">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator />

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2025 Dewan Hukum Siber Indonesia.</p>
          <p className="text-muted-foreground text-sm">Berkolaborasi untuk ruang digital yang aman dan berkeadilan.</p>
        </div>
      </div>
    </footer>
  )
}
