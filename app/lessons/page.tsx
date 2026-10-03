import Link from "next/link";
import { allLessons, formatLessonDate, lessonItems } from "@/lib/lessons";

export default function LessonsPage() {
  const lessons = allLessons();

  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col px-5 pt-10 pb-28 sm:px-8">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <p className="font-latin text-[11px] uppercase tracking-widest2 text-gold">Lesson notes</p>
          <h1 className="mt-1 font-arabic text-2xl text-paper">دُرُوس — my tutor lessons</h1>
        </div>
        <nav className="mt-1 flex flex-col items-end gap-1 font-latin text-xs uppercase tracking-wide">
          <Link href="/" className="text-paper-dim underline decoration-ink-line underline-offset-4 hover:text-gold">
            ← Renderer
          </Link>
          <Link href="/cards" className="text-paper-dim underline decoration-ink-line underline-offset-4 hover:text-gold">
            Flashcards →
          </Link>
        </nav>
      </header>

      {lessons.length === 0 ? (
        <p className="rounded-lg border border-ink-line bg-ink-soft px-4 py-6 text-center font-latin text-sm text-paper-dim">
          No lessons yet.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {lessons.map((l) => (
            <li key={l.id}>
              <Link
                href={`/lessons/${l.id}`}
                className="block rounded-lg border border-ink-line bg-ink-soft px-4 py-4 transition-colors hover:border-gold/50"
              >
                <p className="font-latin text-[11px] uppercase tracking-widest2 text-gold">
                  {formatLessonDate(l.date)}
                </p>
                <p className="mt-1 font-latin text-lg text-paper">{l.title ?? "Lesson"}</p>
                <p className="mt-1 font-latin text-xs text-paper-dim">
                  {lessonItems(l).length} items · {l.grammar.length} grammar points
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
