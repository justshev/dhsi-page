import { getCourseById } from "@/lib/courses-data"
import { redirect } from "next/navigation"
import { CourseDetail } from "@/components/dashboard/course-detail"

interface CourseDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params
  const course = getCourseById(id)

  if (!course) {
    redirect("/dashboard/courses")
  }

  return <CourseDetail course={course} />
}
