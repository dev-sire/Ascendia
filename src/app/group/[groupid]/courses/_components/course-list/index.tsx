"use client"
import { Card } from "@/components/ui/card"
import { useCourses } from "@/hooks/courses"
import { truncateString, ucare } from "@/lib/utils"
import { BookOpen } from "lucide-react"
import Link from "next/link"

type Props = {
  groupid: string
}

const CourseList = ({ groupid }: Props) => {
  const { data } = useCourses(groupid)

  if (data?.status !== 200 || !data.courses?.length) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-[#1C1C1F] border border-[#28282D] flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-themeTextGray opacity-40" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#28282D] border-2 border-[#101011]" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-[#28282D] border-2 border-[#101011]" />
        </div>

        <h2 className="text-white font-semibold text-xl mb-2">
          No courses yet
        </h2>
        <p className="text-themeTextGray text-sm max-w-xs leading-relaxed">
          The instructor hasn&apos;t dropped any courses yet. Check back soon,
          something good is coming.
        </p>
      </div>
    )
  }

  return data.courses?.map((course) => (
    <Link href={`/group/${groupid}/courses/${course.id}`} key={course.id}>
      <Card className="bg-transparent border-themeGray h-full rounded-xl overflow-hidden">
        <img
          src={ucare(course.thumbnail)}
          alt="cover"
          className="h-4/6 w-full opacity-60"
        />
        <div className="h-2/6 flex flex-col justify-center pl-5">
          <h2 className="text-lg text-white font-semibold">{course.name}</h2>
          <p className="text-sm text-themeTextGray">
            {truncateString(course.description)}
          </p>
        </div>
      </Card>
    </Link>
  ))
}

export default CourseList