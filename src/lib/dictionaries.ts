import type { Locale } from "@/lib/locales";
import type { MapCopy, NavLabels } from "@/lib/types";

export type Dictionary = {
  meta: {
    siteName: string;
    description: string;
    soonTitle: string;
  };
  skip: string;
  nav: NavLabels;
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    cta: string;
  };
  about: {
    eyebrow: string;
    title: string;
    award: string;
    body: string;
    teamTitle: string;
  };
  map: MapCopy & {
    eyebrow: string;
    title: string;
  };
  soon: {
    eyebrow: string;
    title: string;
    intro: string;
    features: Array<{
      id: string;
      title: string;
      text: string;
    }>;
  };
  footer: {
    blurb: string;
    award: string;
  };
  notFound: {
    title: string;
    body: string;
    home: string;
  };
};

const hy: Dictionary = {
  meta: {
    siteName: "Նռան",
    description:
      "Նռանը պահում է հայերենի բարբառային ժառանգությունը լսելի. հազվագյուտ ձայնագրություններ, դրված քարտեզի վրա։",
    soonTitle: "Շուտով",
  },
  skip: "Անցնել բովանդակությանը",
  nav: {
    primary: "Հիմնական",
    about: "Նռանի մասին",
    map: "Քարտեզ",
    soon: "Շուտով",
    openMenu: "Բացել ընտրացանկը",
    closeMenu: "Փակել ընտրացանկը",
    language: "Լեզու",
    footer: "Էջատակ",
  },
  hero: {
    eyebrow: "Բարբառային ժառանգություն",
    title: "Նռան",
    lead: "Նուռը Հայաստանի խորհրդանիշն է. շատ հատիկներ, և յուրաքանչյուրն իր համով։ Այդպիսին են նաև մեր բարբառները՝ բազմազան, տեղական, կենդանի։",
    body: "Նռանը տեղ է, որտեղ այդ ձայները մնում են լսելի։ Այստեղ հավաքվում են հազվագյուտ ձայնագրություններ այն մարդկանցից, ովքեր խոսում են բարբառով։",
    cta: "Տեսնել բարբառները",
  },
  about: {
    eyebrow: "Նախագիծը",
    title: "Նռանի մասին",
    award:
      "Նախագիծը ստեղծվել է FEMINNO-ի Global Armenian AI Girls Award մրցույթի շրջանակում։",
    body: "Հայերենի բարբառները սերունդների ձայնն են՝ տան, գյուղի, ճանապարհի։ Շատերը գրեթե չեն գրառվում, իսկ որոշները մնում են միայն մի քանի խոսողների մոտ։ Նռանը սկսում է այդ ձայները հավաքել. քարտեզ, կարճ պատմություն և ձայնագրություն, որպեսզի բարբառը հնարավոր լինի լսել և պահել։",
    teamTitle: "Թիմ",
  },
  map: {
    eyebrow: "Լսել տեղից",
    title: "Քարտեզ",
    lead: "Ամեն կետ մի բարբառ է։ Բացեք քարտը և լսեք ձայնագրությունը։",
    closed:
      "Քարտեզը փակ է, որպեսզի էջը մնա թեթև։ Բացեք այն, երբ ուզենաք տեսնել կետերն ու լսել ձայները։",
    open: "Բացել քարտեզը",
    close: "Փակել քարտեզը",
    loading: "Քարտեզը բեռնվում է…",
    empty: "Դեռ կետեր չկան։ Ավելացրեք տող բարբառների ցանկում։",
    error: "Բարբառների ցանկը չհաջողվեց կարդալ։",
    listLabel: "Կետեր քարտեզի վրա",
    play: "Լսել ձայնագրությունը",
    pause: "Դադարեցնել",
    speaker: "Խոսող",
    region: "Շրջան",
    closeCard: "Փակել քարտը",
    audioMissing: "Այս ձայնագրության ֆայլը դեռ ձայնադարանում չէ։",
    audioError: "Ձայնագրությունը չհաջողվեց նվագարկել։",
    testBadge: "Նմուշային ձայնագրություն",
    noscript: "Քարտեզը բացելու համար պետք է JavaScript։",
    next: "Հաջորդ մասերը Շուտով էջում են։",
  },
  soon: {
    eyebrow: "Հաջորդը",
    title: "Շուտով",
    intro: "Նռանը բացվում է աստիճանաբար։ Սրանք այն մասերն են, որոնք դեռ ճանապարհին են։",
    features: [
      {
        id: "collection",
        title: "Բարբառների հավաքածու",
        text: "Հայաստանի և սփյուռքի հայտնի բարբառների հնարավորինս ամբողջական հավաքածու։",
      },
      {
        id: "models",
        title: "Մոդելներ, որոնք սովորում են բարբառից",
        text: "Արհեստական բանականության մոդելների միացում, որպեսզի համակարգը սովորի բարբառներից։",
      },
      {
        id: "search",
        title: "Բառի որոնում",
        text: "Որոնում, որը բացատրում է բարբառային բառի ծագումն ու գործածությունը։",
      },
      {
        id: "chat",
        title: "Բարբառով զրուցարան",
        text: "Զրուցարան, ուսուցանված բարբառով և գրական հայերենով, որը կարող է ազատ խոսել բարբառներով։",
      },
      {
        id: "library",
        title: "Հազվագյուտ ձայնադարան",
        text: "Իրական խոսողներից գրառված հազվագյուտ ձայնագրությունների գրադարան՝ բոլոր բարբառներով։",
      },
    ],
  },
  footer: {
    blurb: "Նռանը պահում է բարբառի ձայնը։",
    award: "FEMINNO-ի Global Armenian AI Girls Award մրցույթի մաս։",
  },
  notFound: {
    title: "Այս էջը չկա",
    body: "Հասցեն չի համապատասխանում Նռանի որևէ էջի։",
    home: "Վերադառնալ սկիզբ",
  },
};

const en: Dictionary = {
  meta: {
    siteName: "Nran",
    description:
      "Nran keeps Armenian dialect heritage audible: rare recordings, placed on a map.",
    soonTitle: "Coming soon",
  },
  skip: "Skip to content",
  nav: {
    primary: "Main",
    about: "About Nran",
    map: "Map",
    soon: "Coming soon",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    footer: "Footer",
  },
  hero: {
    eyebrow: "Dialect heritage",
    title: "Nran",
    lead: "The pomegranate is a symbol of Armenia: many seeds, each with its own taste. Our dialects are like that — varied, local, and alive.",
    body: "Nran is a place where those voices stay audible. It gathers rare recordings from people who speak in dialect.",
    cta: "See the dialects",
  },
  about: {
    eyebrow: "The project",
    title: "About Nran",
    award:
      "This project was created as part of the FEMINNO Global Armenian AI Girls Award.",
    body: "Armenian dialects are the voice of generations — of a home, a village, a road. Many are rarely recorded, and some remain with only a few speakers. Nran begins by gathering those voices: a map, a short account, and a recording, so a dialect can be heard and kept.",
    teamTitle: "Team",
  },
  map: {
    eyebrow: "Listen from a place",
    title: "Map",
    lead: "Each mark is a dialect. Open a card and play the recording.",
    closed:
      "The map stays closed so the page remains light. Open it when you want to see the marks and hear the voices.",
    open: "Open the map",
    close: "Close the map",
    loading: "The map is loading…",
    empty: "No places yet. Add a row to the dialect catalog.",
    error: "The dialect catalog could not be read.",
    listLabel: "Places on the map",
    play: "Play recording",
    pause: "Pause recording",
    speaker: "Speaker",
    region: "Region",
    closeCard: "Close dialect card",
    audioMissing: "This recording file is not in the audio folder yet.",
    audioError: "The recording could not be played.",
    testBadge: "Sample recording",
    noscript: "JavaScript is required to open the interactive map.",
    next: "What comes next is on the Coming soon page.",
  },
  soon: {
    eyebrow: "Next",
    title: "Coming soon",
    intro: "Nran opens in stages. These are the parts still on the way.",
    features: [
      {
        id: "collection",
        title: "A dialect collection",
        text: "A collection of as many known dialects as possible, in Armenia and the diaspora.",
      },
      {
        id: "models",
        title: "Models that learn dialects",
        text: "AI models integrated so the system can learn from dialect speech and text.",
      },
      {
        id: "search",
        title: "Search for a word",
        text: "Search that explains the origin and usage of a dialect word.",
      },
      {
        id: "chat",
        title: "A dialect chatbot",
        text: "A chatbot trained on dialect and formal language, able to converse freely in dialects.",
      },
      {
        id: "library",
        title: "A library of rare audio",
        text: "A library of rare recordings of real speakers, across dialects.",
      },
    ],
  },
  footer: {
    blurb: "Nran keeps the sound of dialect.",
    award: "Part of the FEMINNO Global Armenian AI Girls Award.",
  },
  notFound: {
    title: "This page is not here",
    body: "That address does not match a page on Nran.",
    home: "Back to the start",
  },
};

const dictionaries: Record<Locale, Dictionary> = { hy, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
