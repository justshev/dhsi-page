import { CourseList } from "@/components/dashboard/course-list"
import { courses } from "@/lib/courses-data"

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <CourseList courses={courses} />
      </div>
    </div>
  )
}
