// Training, Workshop, and Review Data for DHSI

export type TrainingType = "pelatihan" | "workshop";
export type TrainingStatus = "upcoming" | "ongoing" | "completed";

export interface TrainingSession {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  type: TrainingType;
  status: TrainingStatus;
  thumbnail: string;
  date: string;
  endDate?: string;
  time: string;
  duration: string;
  location: string;
  isOnline: boolean;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  category: string;
  level: string;
  maxParticipants: number;
  enrolledParticipants: number;
  price: string;
  syllabus: string[];
  requirements: string[];
  benefits: string[];
  rating?: number;
  totalReviews?: number;
}

export interface TrainingReview {
  id: string;
  trainingId: string;
  trainingTitle: string;
  trainingType: TrainingType;
  reviewerName: string;
  reviewerRole: string;
  reviewerAvatar: string;
  rating: number;
  content: string;
  date: string;
  helpful: number;
}

// Pelatihan Terbaru (Latest Training)
export const latestTrainings: TrainingSession[] = [
  {
    id: "training-1",
    title: "Certified Cyber Law Practitioner (CCLP)",
    shortDescription:
      "Sertifikasi profesional untuk praktisi hukum siber dengan standar internasional.",
    fullDescription:
      "Program sertifikasi komprehensif yang dirancang untuk para praktisi hukum yang ingin mendalami aspek hukum siber. Peserta akan mempelajari regulasi data pribadi, kejahatan siber, forensik digital, dan penyelesaian sengketa online. Sertifikasi ini diakui secara nasional dan memberikan kredensial yang kuat dalam industri hukum teknologi.",
    type: "pelatihan",
    status: "upcoming",
    thumbnail: "/training/cyber-law.jpg",
    date: "2026-02-15",
    endDate: "2026-02-20",
    time: "09:00 - 16:00 WIB",
    duration: "6 hari (48 jam)",
    location: "Hotel Pullman Jakarta Central Park",
    isOnline: false,
    instructor: {
      name: "Prof. Dr. Ahmad Sudirman, S.H., M.H.",
      title: "Guru Besar Hukum Pidana & Pakar Hukum Siber",
      avatar: "/avatars/instructor-1.jpg",
    },
    category: "Sertifikasi Profesional",
    level: "Advanced",
    maxParticipants: 30,
    enrolledParticipants: 22,
    price: "Rp 12.500.000",
    syllabus: [
      "Pengantar Hukum Siber Indonesia dan Internasional",
      "UU ITE dan Peraturan Pelaksanaannya",
      "Perlindungan Data Pribadi (UU PDP)",
      "Kejahatan Siber dan Pembuktian Digital",
      "Forensik Digital untuk Praktisi Hukum",
      "Penyelesaian Sengketa E-Commerce",
      "Studi Kasus dan Simulasi Sidang",
      "Ujian Sertifikasi CCLP",
    ],
    requirements: [
      "Sarjana Hukum atau bidang terkait",
      "Pengalaman minimal 2 tahun di bidang hukum",
      "Memahami dasar-dasar teknologi informasi",
    ],
    benefits: [
      "Sertifikat CCLP yang diakui nasional",
      "Akses ke jaringan alumni DHSI",
      "Materi pelatihan komprehensif",
      "Konsultasi pasca-pelatihan selama 3 bulan",
    ],
  },
  {
    id: "training-2",
    title: "Digital Forensics for Legal Professionals",
    shortDescription:
      "Pelatihan intensif forensik digital untuk profesional hukum.",
    fullDescription:
      "Pelatihan hands-on yang mengajarkan teknik pengumpulan, preservasi, dan analisis bukti digital. Ditujukan untuk advokat, jaksa, dan hakim yang menangani kasus-kasus terkait teknologi. Peserta akan belajar menggunakan tools forensik standar industri.",
    type: "pelatihan",
    status: "ongoing",
    thumbnail: "/training/digital-forensics.jpg",
    date: "2026-01-10",
    endDate: "2026-01-14",
    time: "09:00 - 17:00 WIB",
    duration: "5 hari (40 jam)",
    location: "Online via Zoom",
    isOnline: true,
    instructor: {
      name: "Dr. Ir. Rudi Hartono, M.Kom.",
      title: "Pakar Forensik Digital & Konsultan Keamanan",
      avatar: "/avatars/instructor-2.jpg",
    },
    category: "Forensik Digital",
    level: "Intermediate",
    maxParticipants: 25,
    enrolledParticipants: 25,
    price: "Rp 8.500.000",
    syllabus: [
      "Prinsip Dasar Forensik Digital",
      "Legal Framework untuk Digital Evidence",
      "Teknik Akuisisi dan Preservasi Data",
      "Analisis Media Penyimpanan",
      "Mobile Device Forensics",
      "Network Forensics",
      "Penyusunan Laporan Forensik",
      "Expert Witness Preparation",
    ],
    requirements: [
      "Profesional hukum atau IT security",
      "Laptop dengan spesifikasi minimal 8GB RAM",
      "Familiar dengan sistem operasi Windows/Linux",
    ],
    benefits: [
      "Sertifikat Kompetensi Forensik Digital",
      "Software forensik berlisensi edukasi",
      "Akses ke lab virtual selama 6 bulan",
      "E-book dan materi referensi",
    ],
    rating: 4.9,
    totalReviews: 45,
  },
  {
    id: "training-3",
    title: "Privacy & Data Protection Officer Training",
    shortDescription:
      "Pelatihan DPO sesuai standar UU Perlindungan Data Pribadi.",
    fullDescription:
      "Program pelatihan lengkap untuk calon Data Protection Officer sesuai dengan UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi. Mencakup aspek legal, teknis, dan manajerial dari perlindungan data.",
    type: "pelatihan",
    status: "upcoming",
    thumbnail: "/training/data-protection.jpg",
    date: "2026-03-01",
    endDate: "2026-03-03",
    time: "09:00 - 16:00 WIB",
    duration: "3 hari (24 jam)",
    location: "Aston Priority Simatupang Hotel",
    isOnline: false,
    instructor: {
      name: "Dr. Siti Rahayu, S.H., M.Hum.",
      title: "Pakar Hukum Perdata & Perlindungan Data",
      avatar: "/avatars/instructor-3.jpg",
    },
    category: "Perlindungan Data",
    level: "Intermediate",
    maxParticipants: 35,
    enrolledParticipants: 18,
    price: "Rp 7.500.000",
    syllabus: [
      "Framework UU PDP Indonesia",
      "Peran dan Tanggung Jawab DPO",
      "Data Processing Principles",
      "Hak-hak Subjek Data",
      "Data Protection Impact Assessment",
      "Breach Notification Procedures",
      "Cross-border Data Transfer",
      "Compliance Audit dan Monitoring",
    ],
    requirements: [
      "Profesional hukum, IT, atau compliance",
      "Minimal S1 dari berbagai disiplin ilmu",
      "Memahami operasional organisasi",
    ],
    benefits: [
      "Sertifikat DPO yang diakui",
      "Template dokumen compliance",
      "Membership komunitas DPO Indonesia",
      "Update regulasi berkala",
    ],
  },
];

// Workshop Mendatang (Upcoming Workshops)
export const upcomingWorkshops: TrainingSession[] = [
  {
    id: "workshop-1",
    title: "Workshop: Menyusun Kebijakan Privasi yang Efektif",
    shortDescription: "Praktik langsung menyusun privacy policy sesuai UU PDP.",
    fullDescription:
      "Workshop praktis satu hari untuk menyusun kebijakan privasi yang compliant dengan UU Perlindungan Data Pribadi. Peserta akan membawa pulang template dan framework yang dapat langsung diimplementasikan di organisasinya.",
    type: "workshop",
    status: "upcoming",
    thumbnail: "/workshop/privacy-policy.jpg",
    date: "2026-01-25",
    time: "09:00 - 16:00 WIB",
    duration: "1 hari (7 jam)",
    location: "Swiss-Belhotel Mangga Besar",
    isOnline: false,
    instructor: {
      name: "Andi Prasetyo, S.H., LL.M.",
      title: "Privacy Counsel & CIPP/E",
      avatar: "/avatars/instructor-4.jpg",
    },
    category: "Compliance",
    level: "Beginner",
    maxParticipants: 40,
    enrolledParticipants: 28,
    price: "Rp 2.500.000",
    syllabus: [
      "Elemen Wajib Privacy Policy",
      "Drafting Techniques",
      "Common Mistakes to Avoid",
      "Workshop: Hands-on Drafting",
      "Peer Review Session",
    ],
    requirements: ["Terbuka untuk semua profesional", "Membawa laptop"],
    benefits: [
      "Template Privacy Policy",
      "Checklist Compliance",
      "Sertifikat Partisipasi",
    ],
  },
  {
    id: "workshop-2",
    title: "Workshop: Incident Response & Crisis Communication",
    shortDescription:
      "Simulasi penanganan insiden siber dan komunikasi krisis.",
    fullDescription:
      "Workshop tabletop exercise yang mensimulasikan skenario insiden siber nyata. Peserta akan belajar koordinasi lintas tim, pengambilan keputusan cepat, dan strategi komunikasi krisis yang efektif.",
    type: "workshop",
    status: "upcoming",
    thumbnail: "/workshop/incident-response.jpg",
    date: "2026-02-08",
    time: "08:30 - 17:00 WIB",
    duration: "1 hari (8 jam)",
    location: "Online via Zoom",
    isOnline: true,
    instructor: {
      name: "Ir. Budi Santoso, CISSP, CISM",
      title: "Chief Security Officer & Incident Response Expert",
      avatar: "/avatars/instructor-5.jpg",
    },
    category: "Keamanan Siber",
    level: "Intermediate",
    maxParticipants: 30,
    enrolledParticipants: 15,
    price: "Rp 3.000.000",
    syllabus: [
      "Incident Response Framework",
      "Tabletop Exercise: Ransomware Attack",
      "Communication Protocol",
      "Legal Considerations",
      "Post-Incident Review",
    ],
    requirements: [
      "Tim IT, Legal, atau Communications",
      "Direkomendasikan mengikuti secara tim",
    ],
    benefits: [
      "Incident Response Playbook",
      "Communication Templates",
      "Sertifikat Partisipasi",
    ],
  },
  {
    id: "workshop-3",
    title: "Workshop: AI Governance & Legal Compliance",
    shortDescription: "Memahami regulasi AI dan menyusun governance framework.",
    fullDescription:
      "Workshop eksklusif yang membahas landscape regulasi AI di Indonesia dan global, serta cara menyusun AI governance framework yang sesuai dengan prinsip-prinsip etika dan hukum yang berlaku.",
    type: "workshop",
    status: "upcoming",
    thumbnail: "/workshop/ai-governance.jpg",
    date: "2026-02-22",
    time: "09:00 - 16:00 WIB",
    duration: "1 hari (7 jam)",
    location: "The Westin Jakarta",
    isOnline: false,
    instructor: {
      name: "Prof. Dr. Bambang Wijaya, S.H., LL.M.",
      title: "Ahli Hukum Tata Negara & AI Ethics Researcher",
      avatar: "/avatars/instructor-6.jpg",
    },
    category: "AI & Emerging Tech",
    level: "Advanced",
    maxParticipants: 25,
    enrolledParticipants: 20,
    price: "Rp 4.500.000",
    syllabus: [
      "AI Regulatory Landscape",
      "Ethical AI Principles",
      "Risk Assessment Framework",
      "Governance Structure Design",
      "Case Studies from Global Organizations",
    ],
    requirements: [
      "Legal, Compliance, atau Tech Leaders",
      "Familiar dengan konsep AI/ML",
    ],
    benefits: [
      "AI Governance Framework Template",
      "Risk Assessment Toolkit",
      "Exclusive Networking Session",
    ],
  },
];

// Kelas yang Sudah Selesai dengan Review
export const completedTrainings: TrainingSession[] = [
  {
    id: "completed-1",
    title: "Masterclass: Cyber Crime Investigation",
    shortDescription:
      "Pelatihan investigasi kejahatan siber untuk penegak hukum.",
    fullDescription:
      "Program masterclass intensif yang membekali peserta dengan keterampilan investigasi kejahatan siber mulai dari pengumpulan bukti hingga penyusunan berkas perkara.",
    type: "pelatihan",
    status: "completed",
    thumbnail: "/training/cybercrime.jpg",
    date: "2025-11-15",
    endDate: "2025-11-19",
    time: "09:00 - 17:00 WIB",
    duration: "5 hari (40 jam)",
    location: "Jakarta Convention Center",
    isOnline: false,
    instructor: {
      name: "AKBP Dr. Hendri Wijaya, S.IK., M.H.",
      title: "Kepala Unit Cyber Crime Polri",
      avatar: "/avatars/instructor-7.jpg",
    },
    category: "Penegakan Hukum",
    level: "Advanced",
    maxParticipants: 30,
    enrolledParticipants: 30,
    price: "Rp 15.000.000",
    syllabus: [
      "Tipologi Kejahatan Siber",
      "Teknik Investigasi Digital",
      "Koordinasi Lintas Yurisdiksi",
      "Penyusunan Berkas Perkara",
    ],
    requirements: ["Penegak hukum atau profesional keamanan"],
    benefits: ["Sertifikat Masterclass", "Networking dengan praktisi"],
    rating: 4.9,
    totalReviews: 28,
  },
  {
    id: "completed-2",
    title: "Workshop: Smart Contract & Blockchain Legal Issues",
    shortDescription: "Aspek hukum smart contract dan teknologi blockchain.",
    fullDescription:
      "Workshop yang mengupas tuntas aspek legal dari smart contract, cryptocurrency, dan teknologi blockchain di Indonesia.",
    type: "workshop",
    status: "completed",
    thumbnail: "/workshop/blockchain.jpg",
    date: "2025-10-20",
    time: "09:00 - 16:00 WIB",
    duration: "1 hari (7 jam)",
    location: "Online via Zoom",
    isOnline: true,
    instructor: {
      name: "Dr. Lisa Permata, S.H., M.Kn.",
      title: "Notaris & Blockchain Legal Expert",
      avatar: "/avatars/instructor-8.jpg",
    },
    category: "Fintech & Blockchain",
    level: "Intermediate",
    maxParticipants: 50,
    enrolledParticipants: 48,
    price: "Rp 2.000.000",
    syllabus: [
      "Blockchain Technology Overview",
      "Legal Status of Smart Contracts",
      "Cryptocurrency Regulations",
      "NFT & Digital Assets",
    ],
    requirements: ["Terbuka untuk semua profesional"],
    benefits: ["Materi presentasi", "Sertifikat"],
    rating: 4.8,
    totalReviews: 42,
  },
  {
    id: "completed-3",
    title: "Certified Information Privacy Professional (CIPP)",
    shortDescription: "Sertifikasi internasional untuk profesional privasi.",
    fullDescription:
      "Program persiapan ujian sertifikasi CIPP/E yang diakui secara internasional oleh IAPP.",
    type: "pelatihan",
    status: "completed",
    thumbnail: "/training/cipp.jpg",
    date: "2025-09-01",
    endDate: "2025-09-05",
    time: "09:00 - 16:00 WIB",
    duration: "5 hari (35 jam)",
    location: "Hotel Mulia Senayan",
    isOnline: false,
    instructor: {
      name: "Maria Gonzales, CIPP/E, CIPM",
      title: "IAPP Certified Trainer",
      avatar: "/avatars/instructor-9.jpg",
    },
    category: "Sertifikasi Internasional",
    level: "Advanced",
    maxParticipants: 25,
    enrolledParticipants: 25,
    price: "Rp 18.000.000",
    syllabus: [
      "European Data Protection Framework",
      "GDPR Deep Dive",
      "Cross-border Data Transfers",
      "Exam Preparation",
    ],
    requirements: ["Profesional dengan pengalaman di bidang privasi"],
    benefits: ["Voucher ujian CIPP/E", "Study materials resmi IAPP"],
    rating: 4.9,
    totalReviews: 23,
  },
  {
    id: "completed-4",
    title: "Workshop: E-Commerce Dispute Resolution",
    shortDescription:
      "Penyelesaian sengketa e-commerce dan perlindungan konsumen.",
    fullDescription:
      "Workshop praktis tentang mekanisme penyelesaian sengketa dalam transaksi e-commerce.",
    type: "workshop",
    status: "completed",
    thumbnail: "/workshop/ecommerce.jpg",
    date: "2025-08-15",
    time: "09:00 - 15:00 WIB",
    duration: "1 hari (6 jam)",
    location: "Mercure Jakarta Sabang",
    isOnline: false,
    instructor: {
      name: "Dewi Kartika, S.H., M.H.",
      title: "Arbiter BANI & E-Commerce Expert",
      avatar: "/avatars/instructor-10.jpg",
    },
    category: "E-Commerce",
    level: "Beginner",
    maxParticipants: 45,
    enrolledParticipants: 40,
    price: "Rp 1.500.000",
    syllabus: [
      "Regulasi E-Commerce Indonesia",
      "Hak Konsumen Digital",
      "Mekanisme ODR",
      "Studi Kasus",
    ],
    requirements: ["Terbuka untuk umum"],
    benefits: ["Template dokumen", "Sertifikat"],
    rating: 4.7,
    totalReviews: 35,
  },
];

// Review dengan informasi kelas yang direview
export const trainingReviews: TrainingReview[] = [
  {
    id: "review-1",
    trainingId: "completed-1",
    trainingTitle: "Masterclass: Cyber Crime Investigation",
    trainingType: "pelatihan",
    reviewerName: "Kompol Agus Dermawan, S.H.",
    reviewerRole: "Penyidik Cyber Crime",
    reviewerAvatar: "/avatars/reviewer-1.jpg",
    rating: 5,
    content:
      "Pelatihan yang sangat komprehensif dan aplikatif. Instruktur sangat berpengalaman dan materi langsung bisa diterapkan dalam investigasi nyata. Simulasi kasusnya sangat membantu memahami alur investigasi yang benar.",
    date: "2025-11-22",
    helpful: 45,
  },
  {
    id: "review-2",
    trainingId: "completed-1",
    trainingTitle: "Masterclass: Cyber Crime Investigation",
    trainingType: "pelatihan",
    reviewerName: "Iptu Ratna Sari, S.Kom.",
    reviewerRole: "Analis Digital Forensik",
    reviewerAvatar: "/avatars/reviewer-2.jpg",
    rating: 5,
    content:
      "Materi forensik digitalnya sangat detail dan up-to-date. Saya mendapatkan banyak insight baru tentang teknik investigasi modern yang belum pernah saya pelajari sebelumnya.",
    date: "2025-11-21",
    helpful: 38,
  },
  {
    id: "review-3",
    trainingId: "completed-2",
    trainingTitle: "Workshop: Smart Contract & Blockchain Legal Issues",
    trainingType: "workshop",
    reviewerName: "Rina Handayani, S.H., M.Kn.",
    reviewerRole: "Corporate Lawyer",
    reviewerAvatar: "/avatars/reviewer-3.jpg",
    rating: 5,
    content:
      "Workshop yang sangat membuka wawasan tentang aspek legal blockchain. Dr. Lisa menjelaskan konsep teknis dengan bahasa yang mudah dipahami oleh praktisi hukum.",
    date: "2025-10-22",
    helpful: 52,
  },
  {
    id: "review-4",
    trainingId: "completed-2",
    trainingTitle: "Workshop: Smart Contract & Blockchain Legal Issues",
    trainingType: "workshop",
    reviewerName: "Dimas Prakoso, S.H.",
    reviewerRole: "Fintech Legal Counsel",
    reviewerAvatar: "/avatars/reviewer-4.jpg",
    rating: 4,
    content:
      "Materi bagus dan relevan dengan perkembangan industri fintech saat ini. Akan lebih baik jika ada sesi hands-on untuk melihat langsung cara kerja smart contract.",
    date: "2025-10-21",
    helpful: 28,
  },
  {
    id: "review-5",
    trainingId: "completed-3",
    trainingTitle: "Certified Information Privacy Professional (CIPP)",
    trainingType: "pelatihan",
    reviewerName: "Ayu Lestari, S.Kom., M.M.",
    reviewerRole: "Data Protection Officer",
    reviewerAvatar: "/avatars/reviewer-5.jpg",
    rating: 5,
    content:
      "Persiapan ujian yang sangat terstruktur. Maria adalah trainer yang luar biasa dengan pemahaman mendalam tentang GDPR. Saya berhasil lulus ujian CIPP/E di percobaan pertama!",
    date: "2025-09-15",
    helpful: 67,
  },
  {
    id: "review-6",
    trainingId: "completed-3",
    trainingTitle: "Certified Information Privacy Professional (CIPP)",
    trainingType: "pelatihan",
    reviewerName: "Benny Kurniawan, S.H., LL.M.",
    reviewerRole: "Privacy Counsel",
    reviewerAvatar: "/avatars/reviewer-6.jpg",
    rating: 5,
    content:
      "Investasi yang sangat worth it untuk karir di bidang privasi. Materi lengkap, instructor berpengalaman, dan networking dengan sesama peserta sangat valuable.",
    date: "2025-09-12",
    helpful: 54,
  },
  {
    id: "review-7",
    trainingId: "completed-4",
    trainingTitle: "Workshop: E-Commerce Dispute Resolution",
    trainingType: "workshop",
    reviewerName: "Sinta Dewi, S.H.",
    reviewerRole: "Legal Staff Marketplace",
    reviewerAvatar: "/avatars/reviewer-7.jpg",
    rating: 5,
    content:
      "Workshop praktis yang langsung bisa diaplikasikan. Template dokumen yang diberikan sangat membantu dalam pekerjaan sehari-hari di marketplace.",
    date: "2025-08-18",
    helpful: 41,
  },
  {
    id: "review-8",
    trainingId: "completed-4",
    trainingTitle: "Workshop: E-Commerce Dispute Resolution",
    trainingType: "workshop",
    reviewerName: "Fajar Rahman, S.E., S.H.",
    reviewerRole: "Consumer Protection Advocate",
    reviewerAvatar: "/avatars/reviewer-8.jpg",
    rating: 4,
    content:
      "Memberikan pemahaman yang baik tentang mekanisme ODR. Studi kasus yang dibahas sangat relevan dengan kondisi e-commerce Indonesia saat ini.",
    date: "2025-08-17",
    helpful: 33,
  },
];

// Helper functions
export function getTrainingById(id: string): TrainingSession | undefined {
  const allTrainings = [
    ...latestTrainings,
    ...upcomingWorkshops,
    ...completedTrainings,
  ];
  return allTrainings.find((t) => t.id === id);
}

export function getReviewsByTrainingId(trainingId: string): TrainingReview[] {
  return trainingReviews.filter((r) => r.trainingId === trainingId);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getStatusBadgeVariant(
  status: TrainingStatus
): "default" | "secondary" | "outline" {
  switch (status) {
    case "upcoming":
      return "default";
    case "ongoing":
      return "secondary";
    case "completed":
      return "outline";
  }
}

export function getStatusLabel(status: TrainingStatus): string {
  switch (status) {
    case "upcoming":
      return "Segera Hadir";
    case "ongoing":
      return "Sedang Berlangsung";
    case "completed":
      return "Selesai";
  }
}

export function getTypeBadgeVariant(
  type: TrainingType
): "default" | "secondary" {
  return type === "pelatihan" ? "default" : "secondary";
}

export function getTypeLabel(type: TrainingType): string {
  return type === "pelatihan" ? "Pelatihan" : "Workshop";
}

// Get all trainings combined
export function getAllTrainings(): TrainingSession[] {
  return [...latestTrainings, ...upcomingWorkshops, ...completedTrainings];
}

// Filter trainings
export function filterTrainings(
  searchTerm: string,
  typeFilter: string,
  statusFilter: string,
  categoryFilter: string
): TrainingSession[] {
  const allTrainings = getAllTrainings();
  return allTrainings.filter((training) => {
    const matchesSearch =
      searchTerm === "" ||
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.shortDescription
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "" || typeFilter === "all" || training.type === typeFilter;

    const matchesStatus =
      statusFilter === "" ||
      statusFilter === "all" ||
      training.status === statusFilter;

    const matchesCategory =
      categoryFilter === "" ||
      categoryFilter === "all" ||
      training.category === categoryFilter;

    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });
}

// Options for selects
export const trainingTypeOptions = [
  { value: "pelatihan", label: "Pelatihan" },
  { value: "workshop", label: "Workshop" },
];

export const trainingStatusOptions = [
  { value: "upcoming", label: "Segera Hadir" },
  { value: "ongoing", label: "Sedang Berlangsung" },
  { value: "completed", label: "Selesai" },
];

export const trainingCategoryOptions = [
  { value: "Sertifikasi Profesional", label: "Sertifikasi Profesional" },
  { value: "Forensik Digital", label: "Forensik Digital" },
  { value: "Perlindungan Data", label: "Perlindungan Data" },
  { value: "Compliance", label: "Compliance" },
  { value: "Keamanan Siber", label: "Keamanan Siber" },
  { value: "AI & Emerging Tech", label: "AI & Emerging Tech" },
  { value: "Penegakan Hukum", label: "Penegakan Hukum" },
  { value: "Fintech & Blockchain", label: "Fintech & Blockchain" },
  { value: "Sertifikasi Internasional", label: "Sertifikasi Internasional" },
  { value: "E-Commerce", label: "E-Commerce" },
];

export const trainingLevelOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];
