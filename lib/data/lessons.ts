import { Lesson } from "@/types/lesson";

// Lesson notes from MSA tutor sessions, one entry per lesson. Arabic is
// fully vowelled. `latin` is hand-written in the app's usual style (long
// vowels doubled, ذ → TH, ع → '); leave it out and the rule-based
// transliterator fills in a rougher version.
export const lessons: Lesson[] = [
  {
    id: "2026-10-03-introductions",
    date: "2026-10-03",
    title: "Introductions & Personal Information",
    vocabulary: [
      {
        heading: "Introductions",
        items: [
          { arabic: "مَا اسْمُكَ؟", latin: "MAA ISMUKA", english: "What is your name?", note: "to a male" },
          { arabic: "مَا اسْمُكِ؟", latin: "MAA ISMUKI", english: "What is your name?", note: "to a female" },
          { arabic: "أَنَا اسْمِي…", latin: "ANA ISMEE…", english: "My name is…" },
          { arabic: "مِنْ أَيْنَ أَنْتَ؟", latin: "MIN AYNA ANTA", english: "Where are you from?", note: "to a male" },
          { arabic: "مِنْ أَيْنَ أَنْتِ؟", latin: "MIN AYNA ANTI", english: "Where are you from?", note: "to a female" },
          { arabic: "أَنَا مِنْ بَرِيطَانِيَا", latin: "ANA MIN BAREETAANIYAA", english: "I am from Britain" },
          { arabic: "مَاذَا تَعْمَلُ؟", latin: "MAATHAA TA'MAL", english: "What do you do?", note: "to a male" },
          { arabic: "مَاذَا تَعْمَلِينَ؟", latin: "MAATHAA TA'MALEEN", english: "What do you do?", note: "to a female" },
          {
            arabic: "أَنَا مُعَلِّمٌ فِي الْمَدْرَسَةِ الْبِرِيطَانِيَّةِ فِي الْكُوَيْتِ",
            latin: "ANA MU'ALLIM FIL-MADRASA AL-BIREETAANIYYA FIL-KUWAYT",
            english: "I am a teacher at the British school in Kuwait",
          },
          { arabic: "تَشَرَّفْنَا", latin: "TASHARRAFNAA", english: "Pleased to meet you" },
          { arabic: "أَيْضًا", latin: "AYDAN", english: "Also / too" },
          { arabic: "كَمْ عُمْرُكَ؟", latin: "KAM 'UMRUKA", english: "How old are you?", note: "to a male" },
          { arabic: "كَمْ عُمْرُكِ؟", latin: "KAM 'UMRUKI", english: "How old are you?", note: "to a female" },
          {
            arabic: "عُمْرِي أَرْبَعٌ وَثَلَاثُونَ سَنَةً",
            latin: "'UMREE ARBA' WA-THALAATHOON SANA",
            english: "I am 34 years old",
          },
        ],
      },
      {
        heading: "Favourites",
        items: [
          { arabic: "الْمُفَضَّل", latin: "AL-MUFADDAL", english: "Favourite / preferred" },
          { arabic: "لَوْنِي الْمُفَضَّل", latin: "LAWNEE AL-MUFADDAL", english: "My favourite colour" },
          { arabic: "طَعَامِي الْمُفَضَّل", latin: "TA'AAMEE AL-MUFADDAL", english: "My favourite food" },
          { arabic: "لُغَتِي الْمُفَضَّلَة", latin: "LUGHATEE AL-MUFADDALA", english: "My favourite language" },
          { arabic: "مَا لَوْنُكَ الْمُفَضَّلُ؟", latin: "MAA LAWNUKA AL-MUFADDAL", english: "What is your favourite colour?", note: "to a male" },
          { arabic: "مَا لَوْنُكِ الْمُفَضَّلُ؟", latin: "MAA LAWNUKI AL-MUFADDAL", english: "What is your favourite colour?", note: "to a female" },
        ],
      },
    ],
    grammar: [
      {
        title: "What? (with nouns)",
        arabic: "مَا",
        meaning: "What?",
        explanation: "Commonly used when asking what something is, or with nouns.",
        examples: [
          { arabic: "مَا اسْمُكَ؟", latin: "MAA ISMUKA", english: "What is your name?" },
          { arabic: "مَا لَوْنُكَ الْمُفَضَّلُ؟", latin: "MAA LAWNUKA AL-MUFADDAL", english: "What is your favourite colour?" },
        ],
      },
      {
        title: "What? (with verbs)",
        arabic: "مَاذَا",
        meaning: "What?",
        explanation: "Commonly used with verbs.",
        examples: [
          { arabic: "مَاذَا تَعْمَلُ؟", latin: "MAATHAA TA'MAL", english: "What do you do?" },
          { arabic: "مَاذَا تَأْكُلُ؟", latin: "MAATHAA TA'KUL", english: "What are you eating?" },
        ],
      },
      {
        title: "Possessive endings",
        forms: [
          { arabic: "ـكَ", latin: "-KA", english: "your", note: "addressing a male" },
          { arabic: "ـكِ", latin: "-KI", english: "your", note: "addressing a female" },
          { arabic: "ـي", latin: "-EE", english: "my" },
        ],
        examples: [
          { arabic: "اِسْمُكَ", latin: "ISMUKA", english: "your name", note: "male" },
          { arabic: "اِسْمُكِ", latin: "ISMUKI", english: "your name", note: "female" },
          { arabic: "اِسْمِي", latin: "ISMEE", english: "my name" },
          { arabic: "لَوْنُكَ", latin: "LAWNUKA", english: "your colour", note: "male" },
          { arabic: "لَوْنُكِ", latin: "LAWNUKI", english: "your colour", note: "female" },
          { arabic: "لَوْنِي", latin: "LAWNEE", english: "my colour" },
          { arabic: "عُمْرِي", latin: "'UMREE", english: "my age" },
          { arabic: "لُغَتِي", latin: "LUGHATEE", english: "my language" },
        ],
      },
      {
        title: "Gender agreement",
        explanation:
          "An adjective matches the gender of its noun. لُغَة is feminine, so it takes الْمُفَضَّلَة.",
        forms: [
          { arabic: "الْمُفَضَّل", latin: "AL-MUFADDAL", english: "favourite", note: "masculine" },
          { arabic: "الْمُفَضَّلَة", latin: "AL-MUFADDALA", english: "favourite", note: "feminine" },
        ],
        examples: [
          { arabic: "لَوْنِي الْمُفَضَّل", latin: "LAWNEE AL-MUFADDAL", english: "my favourite colour" },
          {
            arabic: "لُغَتِي الْمُفَضَّلَة",
            latin: "LUGHATEE AL-MUFADDALA",
            english: "my favourite language",
            note: "لُغَة is feminine",
          },
        ],
      },
    ],
    sentences: [],
    personal: [
      { arabic: "أَنَا اسْمِي مَارْك.", latin: "ANA ISMEE MAARK", english: "My name is Mark." },
      { arabic: "أَنَا مِنْ بَرِيطَانِيَا.", latin: "ANA MIN BAREETAANIYAA", english: "I am from Britain." },
      { arabic: "أَنَا مُعَلِّمٌ فِي الْكُوَيْتِ.", latin: "ANA MU'ALLIM FIL-KUWAYT", english: "I am a teacher in Kuwait." },
      {
        arabic: "عُمْرِي أَرْبَعٌ وَثَلَاثُونَ سَنَةً.",
        latin: "'UMREE ARBA' WA-THALAATHOON SANA",
        english: "I am 34 years old.",
      },
    ],
  },
];
