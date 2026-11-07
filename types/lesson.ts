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

// A verb in the lesson's verb library: past-tense root, present-tense
// form, and its present-tense conjugations. Each conjugation's `note`
// names the person ("I", "We", "He", "She") and drives the table rows,
// so new persons can be added later without changing the type.
export type Verb = {
  english: string; // infinitive, e.g. "To travel"
  past: LessonItem; // past-tense root, e.g. سَافَرَ
  present: LessonItem; // present-tense form, e.g. يُسَافِرُ
  conjugations: (LessonItem & { person: string })[];
  examples?: LessonItem[];
};

// One line of the pronunciation guide: a transliteration symbol, the
// Arabic letter or mark it stands for, and how to say it.
export type PronunciationNote = {
  symbol: string;
  arabic?: string;
  sound: string;
  example?: string;
};

export type Lesson = {
  id: string;
  number?: number;
  date: string; // YYYY-MM-DD
  title?: string;
  // Show the transliteration on the lesson page (from lesson 2 on, at
  // Mark's request). Lessons without it keep Arabic + English only.
  showTransliteration?: boolean;
  pronunciation?: PronunciationNote[];
  verbs?: Verb[];
  vocabulary: LessonGroup[];
  grammar: GrammarPoint[];
  sentences: LessonItem[];
  // Sentences about me to practise saying — shown apart from generic vocabulary.
  personal: LessonItem[];
};
