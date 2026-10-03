// Lesson notes — a permanent record of each tutor lesson. Arabic is
// stored fully vowelled, like the rest of the app; harakat are stripped
// at render time only.

// One Arabic line with its meaning. `latin` is optional: when omitted,
// the rule-based transliterator fills it in (lib/lessons.ts). `note`
// carries short qualifiers such as "to a male" / "to a female".
export type LessonItem = {
  arabic: string;
  english: string;
  latin?: string;
  note?: string;
};

export type LessonGroup = {
  heading?: string;
  items: LessonItem[];
};

// A grammar pattern, rendered as its own visually separated card.
// `forms` is the pattern itself (e.g. the possessive endings ـكَ ـكِ ـي);
// `examples` show it in use.
export type GrammarPoint = {
  title: string;
  arabic?: string;
  meaning?: string;
  explanation?: string;
  forms?: LessonItem[];
  examples?: LessonItem[];
};

export type Lesson = {
  id: string;
  date: string; // YYYY-MM-DD
  title?: string;
  // The rough in-lesson notes (usually approximate Latin), kept for reference.
  roughNotes?: string;
  vocabulary: LessonGroup[];
  grammar: GrammarPoint[];
  sentences: LessonItem[];
  // Sentences about me — shown apart from generic vocabulary.
  personal: LessonItem[];
};
