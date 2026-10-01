export type Article = {
  slug: string;
  category: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  introduction: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "simple-ways-to-help-prevent-pests-at-home",
    category: "Pest prevention",
    title: "Simple ways to help prevent pests at home",
    description:
      "A practical room-by-room routine for reducing the food, water and access that can attract common household pests.",
    publishedAt: "2026-09-10",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Bright, tidy home interior",
    introduction:
      "Prevention is often about the small habits that make a property less inviting to pests. No single measure can guarantee a pest-free home, but a consistent routine can help you spot changes early and remove common attractants.",
    sections: [
      {
        heading: "Keep food and waste secure",
        paragraphs: [
          "Store dry food in closed containers, clean up crumbs and spills, and avoid leaving pet food out overnight where practical. Use lidded bins and empty them regularly, especially when food waste is involved.",
          "In shared buildings, coordinate waste and food-storage routines with other residents when possible. A pest concern can have more than one source.",
        ],
      },
      {
        heading: "Look for moisture and access points",
        paragraphs: [
          "Check under sinks and around appliances for leaks or persistent damp. Repairing a drip and improving ventilation can remove conditions that some pests seek.",
          "Notice gaps around pipes, doors and vents. Suitable sealing can reduce access, but avoid blocking ventilation or disturbing suspected nests.",
        ],
      },
      {
        heading: "Make checks part of your routine",
        paragraphs: [
          "When cleaning or moving stored items, look for repeat sightings, droppings, gnaw marks or damaged packaging. Record where and when you notice activity; that information can help a professional assessment.",
        ],
      },
    ],
  },
  {
    slug: "how-to-spot-early-signs-of-mice",
    category: "Common household pests",
    title: "How to spot early signs of mice",
    description:
      "Learn what to look for, where activity may appear and which details are useful when asking for professional advice.",
    publishedAt: "2026-08-22",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Small mouse in a natural setting",
    introduction:
      "Mice can be active in small, less-visited spaces before they are seen in the open. Noticing a pattern early can help you describe the issue and decide what to do next.",
    sections: [
      {
        heading: "Signs worth noting",
        paragraphs: [
          "Look for small droppings, chewed packaging, shredded nesting material or repeated scratching sounds. A single sign does not always confirm an active infestation, so note whether it recurs and where.",
          "Check along edges and behind stored items, while taking care not to handle droppings or nesting material directly.",
        ],
      },
      {
        heading: "What to do next",
        paragraphs: [
          "Keep food sealed, clear accessible crumbs, and make a note of rooms, times and possible access points. Avoid moving suspected nests or using products without understanding their instructions and risks.",
          "A professional can assess the signs, consider entry points and discuss appropriate control and prevention options for the property.",
        ],
      },
    ],
  },
  {
    slug: "pest-management-for-london-businesses",
    category: "Commercial pest control",
    title: "Pest management considerations for London businesses",
    description:
      "A straightforward guide to monitoring, reporting and planning pest-control support around a working premises.",
    publishedAt: "2026-07-30",
    readingTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Modern office interior",
    introduction:
      "For a business, pest concerns can affect staff, customers, stock and day-to-day operations. A clear routine for reporting and recording activity helps teams respond consistently.",
    sections: [
      {
        heading: "Create a simple reporting route",
        paragraphs: [
          "Make it clear who staff should tell when they notice pest activity, where it was seen and when. Keep notes in one agreed place so repeat patterns are easier to recognise.",
          "Include relevant areas such as deliveries, waste storage, food preparation and service corridors in routine checks.",
        ],
      },
      {
        heading: "Plan around how the premises operate",
        paragraphs: [
          "Treatment options and visit arrangements depend on the site, the pest and how the business uses the space. Discuss access, operating hours and any customer or staff considerations with a pest professional.",
          "For regulated settings, check the requirements that apply to your business with the relevant authority or qualified adviser; this article is general information, not compliance advice.",
        ],
      },
    ],
  },
  {
    slug: "seasonal-pest-activity-through-the-year",
    category: "Seasonal pest problems",
    title: "Seasonal pest activity: what to keep an eye on",
    description:
      "A year-round overview of how changing weather and property use can affect the signs you notice around your home.",
    publishedAt: "2026-06-18",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "English garden in changing seasonal light",
    introduction:
      "Pest activity can change with weather, food availability and how people use their homes. Seasons are a useful prompt to check different areas, not a guarantee that a particular pest will appear.",
    sections: [
      {
        heading: "Warm-weather checks",
        paragraphs: [
          "During warmer periods, pay attention to food waste, outdoor dining areas and possible wasp activity around eaves or sheds. Keep a safe distance from suspected nests and seek advice rather than disturbing them.",
          "When windows and doors are open more often, check that screens and seals are in good condition where fitted.",
        ],
      },
      {
        heading: "Cool-weather checks",
        paragraphs: [
          "As temperatures drop, inspect lofts, garages and storage areas for signs of animal access. Secure food and reduce clutter where possible so changes are easier to notice.",
          "If you repeatedly see signs of activity, record the location and ask a professional to assess the property.",
        ],
      },
    ],
  },
  {
    slug: "what-to-do-when-you-find-a-wasp-nest",
    category: "Emergency pest problems",
    title: "What to do when you find a wasp nest",
    description:
      "Simple safety-first steps to take when you notice a possible nest at your home or workplace.",
    publishedAt: "2026-05-27",
    readingTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1585152004491-4f12cf830a34?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Wasp near a garden plant",
    introduction:
      "Finding a possible wasp nest can be unsettling, especially near a doorway or a busy part of a property. Keeping people at a safe distance is the best first step.",
    sections: [
      {
        heading: "Keep clear and avoid disturbing it",
        paragraphs: [
          "Do not block the entrance, spray the nest or attempt to remove it yourself. Activity can increase if a nest is disturbed, and working at height creates additional risks.",
          "If safe to do so, keep children and pets away from the area and let other people using the property know to avoid it.",
        ],
      },
      {
        heading: "Ask for an assessment",
        paragraphs: [
          "A pest professional can assess the location, access and activity before discussing suitable options. Share where the nest is, how high it is and whether it is close to a route people use.",
          "If someone is experiencing a severe allergic reaction after a sting, seek emergency medical help immediately.",
        ],
      },
    ],
  },
  {
    slug: "preparing-for-a-professional-pest-inspection",
    category: "Pest-control advice",
    title: "Preparing for a professional pest inspection",
    description:
      "What to note before a visit and how a little preparation can help make an inspection more useful.",
    publishedAt: "2026-04-14",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1400&auto=format&fit=crop",
    imageAlt: "Professional inspecting a residential property",
    introduction:
      "A clear description of what you have noticed helps a pest professional understand where to begin. You do not need to diagnose the pest before asking for an assessment.",
    sections: [
      {
        heading: "Gather useful observations",
        paragraphs: [
          "Write down when you first noticed activity, how often it happens and which rooms or areas are affected. Photos taken from a safe distance can help explain a sign without handling it.",
          "Mention relevant details about the property, recent building work, deliveries or changes in how a space is used.",
        ],
      },
      {
        heading: "Before the inspection",
        paragraphs: [
          "Follow any preparation guidance given when arranging the visit. Keep access to the affected areas clear where practical, and mention pets, children or site-specific access arrangements.",
          "Ask what the inspection covers, what may happen afterwards and whether any further visit could be recommended.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug);
}
