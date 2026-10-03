import { notFound } from "next/navigation";
import LessonView from "@/components/LessonView";
import { allLessons, getLesson } from "@/lib/lessons";

export function generateStaticParams() {
  return allLessons().map((l) => ({ id: l.id }));
}

export default function LessonPage({ params }: { params: { id: string } }) {
  const lesson = getLesson(params.id);
  if (!lesson) notFound();
  return <LessonView lesson={lesson} />;
}
