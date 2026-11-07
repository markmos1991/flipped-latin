import { Lesson } from "@/types/lesson";

// Lesson notes from MSA tutor sessions, one entry per lesson. Arabic is
// fully vowelled. `latin` is hand-written in the app's usual style (long
// vowels doubled, ذ → TH, ع → '); leave it out and the rule-based
// transliterator fills in a rougher version.
export const lessons: Lesson[] = [
  {
    id: "2026-10-03-introductions",
    number: 1,
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
  {
    id: "2026-11-07-pronouns-present-verbs",
    number: 2,
    date: "2026-11-07",
    title: "Pronouns & Present-Tense Verbs",
    showTransliteration: true,
    pronunciation: [
      { symbol: "ā  ī  ū", arabic: "ا  ي  و", sound: "Long vowels: hold them twice as long as a, i, u.", example: "Usāfiru, Fī, Usbūʿ" },
      { symbol: "ʿ", arabic: "ع", sound: "ʿayn: a tight squeeze from deep in the throat. No English equivalent.", example: "Maʿa, Baʿda" },
      { symbol: "ʾ", arabic: "ء", sound: "hamza: a short catch in the breath, like the break in \"uh-oh\".", example: "Ash-shitāʾ" },
      { symbol: "ḥ", arabic: "ح", sound: "A breathy h from the throat, as if fogging a mirror.", example: "Naḥnu" },
      { symbol: "ṣ  ṭ  ẓ", arabic: "ص  ط  ظ", sound: "Heavy s, t and th: tongue low, mouth rounded, darker sound.", example: "Miṣr, Al-ʿuṭla, Abū Ẓabī" },
      { symbol: "dh", arabic: "ذ", sound: "Like th in \"this\".", example: "Adhhabu" },
      { symbol: "sh", arabic: "ش", sound: "Like sh in \"ship\".", example: "Shahr" },
      { symbol: "double letter", arabic: "ّ", sound: "shadda: hold or stress the consonant.", example: "As-sayyāra, Kull" },
    ],
    vocabulary: [
      {
        heading: "Personal pronouns · الضَّمَائِر",
        items: [
          { arabic: "أَنَا", latin: "Ana", english: "I" },
          { arabic: "نَحْنُ", latin: "Naḥnu", english: "We" },
          { arabic: "هُوَ", latin: "Huwa", english: "He" },
          { arabic: "هِيَ", latin: "Hiya", english: "She" },
        ],
      },
      {
        heading: "Standalone vocabulary · الْمُفْرَدَات",
        items: [
          { arabic: "فِي", latin: "Fī", english: "In / during" },
          { arabic: "إِلَى", latin: "Ilā", english: "To / towards" },
          { arabic: "مَعَ", latin: "Maʿa", english: "With" },
          { arabic: "بِـ", latin: "Bi", english: "By / using" },
          { arabic: "لَكِنْ", latin: "Lākin", english: "But" },
          { arabic: "بَعْدَ", latin: "Baʿda", english: "After" },
          { arabic: "كُلّ", latin: "Kull", english: "Every / all" },
          { arabic: "يَوْم", latin: "Yawm", english: "Day" },
          { arabic: "أُسْبُوع", latin: "Usbūʿ", english: "Week" },
          { arabic: "شَهْر", latin: "Shahr", english: "Month" },
          { arabic: "الشِّتَاء", latin: "Ash-shitāʾ", english: "Winter" },
          { arabic: "الْعُطْلَة", latin: "Al-ʿuṭla", english: "Holidays" },
          { arabic: "صَدِيقَة", latin: "Ṣadīqa", english: "Friend (female)" },
          { arabic: "صَدِيقَتُهُ", latin: "Ṣadīqatuhu", english: "His female friend" },
        ],
      },
      {
        heading: "Places & nouns",
        items: [
          { arabic: "الْمَدْرَسَة", latin: "Al-madrasa", english: "School" },
          { arabic: "الْبَيْت", latin: "Al-bayt", english: "Home / house" },
          { arabic: "السَّيَّارَة", latin: "As-sayyāra", english: "Car" },
          { arabic: "الْجِيم", latin: "Al-jīm", english: "Gym" },
          { arabic: "بَرِيطَانِيَا", latin: "Barīṭāniyā", english: "Britain" },
          { arabic: "الْكُوَيْت", latin: "Al-Kuwayt", english: "Kuwait" },
          { arabic: "مِصْر", latin: "Miṣr", english: "Egypt" },
          { arabic: "أَبُوظَبِي", latin: "Abū Ẓabī", english: "Abu Dhabi" },
        ],
      },
    ],
    verbs: [
      {
        english: "To travel",
        past: { arabic: "سَافَرَ", latin: "Sāfara", english: "to travel", note: "past" },
        present: { arabic: "يُسَافِرُ", latin: "Yusāfiru", english: "to travel", note: "present" },
        conjugations: [
          { arabic: "أُسَافِرُ", latin: "Usāfiru", english: "I travel", person: "I" },
          { arabic: "نُسَافِرُ", latin: "Nusāfiru", english: "We travel", person: "We" },
          { arabic: "يُسَافِرُ", latin: "Yusāfiru", english: "He travels", person: "He" },
          { arabic: "تُسَافِرُ", latin: "Tusāfiru", english: "She travels", person: "She" },
        ],
        examples: [
          { arabic: "أَنَا أُسَافِرُ إِلَى بَرِيطَانِيَا فِي الْعُطْلَةِ", english: "I travel to Britain during the holidays." },
          { arabic: "نَحْنُ نُسَافِرُ إِلَى الْكُوَيْتِ فِي الشِّتَاءِ", english: "We travel to Kuwait in winter." },
          { arabic: "هُوَ يُسَافِرُ إِلَى مِصْرَ مَعَ صَدِيقَتِهِ", english: "He travels to Egypt with his female friend." },
          { arabic: "هِيَ تُسَافِرُ إِلَى أَبُوظَبِي بَعْدَ شَهْرٍ", english: "She travels to Abu Dhabi after a month." },
        ],
      },
      {
        english: "To go",
        past: { arabic: "ذَهَبَ", latin: "Dhahaba", english: "to go", note: "past" },
        present: { arabic: "يَذْهَبُ", latin: "Yadhhabu", english: "to go", note: "present" },
        conjugations: [
          { arabic: "أَذْهَبُ", latin: "Adhhabu", english: "I go", person: "I" },
          { arabic: "نَذْهَبُ", latin: "Nadhhabu", english: "We go", person: "We" },
          { arabic: "يَذْهَبُ", latin: "Yadhhabu", english: "He goes", person: "He" },
          { arabic: "تَذْهَبُ", latin: "Tadhhabu", english: "She goes", person: "She" },
        ],
        examples: [
          { arabic: "أَنَا أَذْهَبُ إِلَى الْمَدْرَسَةِ السَّاعَةَ ٦", english: "I go to school at 6 o'clock." },
          { arabic: "نَحْنُ نَذْهَبُ إِلَى الْبَيْتِ بِالسَّيَّارَةِ", english: "We go home by car." },
          { arabic: "أَلِكْس يَذْهَبُ إِلَى الْجِيمِ كُلَّ يَوْمٍ", english: "Alex goes to the gym every day." },
          { arabic: "هِيَ تَذْهَبُ إِلَى الْجَمْعِيَّةِ كُلَّ أُسْبُوعٍ", english: "She goes to the co-op every week." },
        ],
      },
      {
        english: "To learn",
        past: { arabic: "تَعَلَّمَ", latin: "Taʿallama", english: "to learn", note: "past" },
        present: { arabic: "يَتَعَلَّمُ", latin: "Yataʿallamu", english: "to learn", note: "present" },
        conjugations: [
          { arabic: "أَتَعَلَّمُ", latin: "Ataʿallamu", english: "I learn", person: "I" },
          { arabic: "نَتَعَلَّمُ", latin: "Nataʿallamu", english: "We learn", person: "We" },
          { arabic: "يَتَعَلَّمُ", latin: "Yataʿallamu", english: "He learns", person: "He" },
          { arabic: "تَتَعَلَّمُ", latin: "Tataʿallamu", english: "She learns", person: "She" },
        ],
      },
      {
        english: "To teach",
        past: { arabic: "دَرَّسَ", latin: "Darrasa", english: "to teach", note: "past" },
        present: { arabic: "يُدَرِّسُ", latin: "Yudarrisu", english: "to teach", note: "present" },
        conjugations: [
          { arabic: "أُدَرِّسُ", latin: "Udarrisu", english: "I teach", person: "I" },
          { arabic: "نُدَرِّسُ", latin: "Nudarrisu", english: "We teach", person: "We" },
          { arabic: "يُدَرِّسُ", latin: "Yudarrisu", english: "He teaches", person: "He" },
          { arabic: "تُدَرِّسُ", latin: "Tudarrisu", english: "She teaches", person: "She" },
        ],
      },
      {
        english: "To buy",
        past: { arabic: "اِشْتَرَى", latin: "Ishtarā", english: "to buy", note: "past" },
        present: { arabic: "يَشْتَرِي", latin: "Yashtarī", english: "to buy", note: "present" },
        conjugations: [
          { arabic: "أَشْتَرِي", latin: "Ashtarī", english: "I buy", person: "I" },
          { arabic: "نَشْتَرِي", latin: "Nashtarī", english: "We buy", person: "We" },
          { arabic: "يَشْتَرِي", latin: "Yashtarī", english: "He buys", person: "He" },
          { arabic: "تَشْتَرِي", latin: "Tashtarī", english: "She buys", person: "She" },
        ],
      },
    ],
    grammar: [
      {
        title: "Present-tense verb prefixes",
        explanation:
          "The beginning of the verb changes according to the subject. Arabic present-tense verbs change their prefixes to indicate who is performing the action.",
        forms: [
          { arabic: "أَ", latin: "A", english: "I", note: "prefix" },
          { arabic: "نَ", latin: "N", english: "We", note: "prefix" },
          { arabic: "يَ", latin: "Y", english: "He", note: "prefix" },
          { arabic: "تَ", latin: "T", english: "She", note: "prefix" },
        ],
        examples: [
          { arabic: "أَذْهَبُ", latin: "Adhhabu", english: "I go" },
          { arabic: "نَذْهَبُ", latin: "Nadhhabu", english: "We go" },
          { arabic: "يَذْهَبُ", latin: "Yadhhabu", english: "He goes" },
          { arabic: "تَذْهَبُ", latin: "Tadhhabu", english: "She goes" },
        ],
      },
      {
        title: "Sentence structure",
        meaning: "Pronoun + Verb + Destination + Time",
        explanation:
          "Arabic often omits the pronoun because the verb conjugation already identifies the subject: أَذْهَبُ on its own means \"I go\".",
        examples: [
          { arabic: "أَنَا أَذْهَبُ إِلَى الْمَدْرَسَةِ كُلَّ يَوْمٍ", english: "I go to school every day." },
          { arabic: "أَذْهَبُ", latin: "Adhhabu", english: "I go", note: "pronoun omitted" },
        ],
      },
    ],
    sentences: [],
    personal: [],
  },
];
