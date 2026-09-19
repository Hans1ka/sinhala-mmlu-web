/*
 * SITE CONFIGURATION — edit this file to update links, dates and announcements.
 * Any value starting with "TODO" is treated as "not available yet": the matching
 * buttons are shown as "Coming soon" and cannot be clicked.
 */
window.SITE_CONFIG = {
  // ---- Links -------------------------------------------------------------
  links: {
    registration: "https://forms.gle/2Wcw8G8EcemK4LmD8",       // Google Form for team registration
    codabench:    "https://www.codabench.org/competitions/18187/?secret_key=dc53b4fc-f2e9-46c4-847e-635152b183c7",
    // dataset:      "TODO_HUGGINGFACE_DATASET_URL",
    // baseline:     "site/leaderboard.html",
    // rulesPdf:     "TODO_RULES_DOCUMENT_URL",
    reportTemplate: "TODO_SYSTEM_DESCRIPTION_TEMPLATE_URL",
    forum:        "https://padlet.com/sinhalammluicter2026/forum",   // e.g. Codabench forum or GitHub Discussions
    icter:        "https://icter.lk/",
  },
  email: "sinhalammlu.icter2026@gmail.com",

  // All deadlines are 23:59 Sri Lanka Standard Time (UTC+05:30) unless noted.
  timezoneLabel: "Sri Lanka Time (UTC+05:30)",

  // ---- Leaderboard --------------------------------------------------------
  // Rows are empty until there is something to show. Add objects as results come in.
  leaderboard: {
    // Shown at the top of the leaderboard page.
    note: "Baseline scores are published when the test set is released on 12 October 2026. Final rankings appear after code verification.",
    // Organiser baselines on the test set.
    baselines: [
      // { system: "Qwen3-8B (zero-shot)", easy: 00.0, medium: 00.0, hard: 00.0, macro: 00.0 },
    ],
    // Final, verified rankings.
    final: [
      // { rank: 1, team: "Team name", affiliation: "University", easy: 00.0, medium: 00.0, hard: 00.0, macro: 00.0 },
    ],
  },
  
    // ---- Organisers ---------------------------------------------------------
  // Put image files in site/assets/img/ . Leave photo empty ("") to show initials.
  organisers: [
    {
      name: "Informatics Institute of Technology",
      short: "IIT",
      location: "Colombo, Sri Lanka",
      url: "https://www.iit.ac.lk/",
      logo: "assets/img/iit.png",
      people: [
        { name: "Dr Ruvan Weerasinghe", photo: "assets/img/people/dr-ruvan.jpg" },
        { name: "Hansika Seneviratne", photo: "assets/img/people/hans.jpeg" },
        { name: "Amasha Widanagamage", photo: "assets/img/people/amasha.jpeg" },
      ],
    },
    {
      name: "University of Colombo School of Computing",
      short: "UCSC",
      location: "Colombo, Sri Lanka",
      url: "https://ucsc.cmb.ac.lk/",
      logo: "assets/img/ucsc.png",
      people: [
        { name: "Dr. Randil Pushpananda", photo: "assets/img/people/dr-randil.jpg" },
        { name: "Ashmari Pramodya", photo: "assets/img/people/ashmari.jpeg" },
        { name: "Nirasha Nelki", photo: "assets/img/people/nirasha.jpeg" },

      ],
    },
  ],

  // Logos shown in the footer strip on every page (order matters).
  brandLogos: [
    { name: "Informatics Institute of Technology", short: "IIT", src: "assets/img/iit.png", url: "https://www.iit.ac.lk/" },
    { name: "University of Colombo School of Computing", short: "UCSC", src: "assets/img/ucsc.png", url: "https://ucsc.cmb.ac.lk/" },
    { name: "ICTer 2026", short: "ICTer", src: "assets/img/icter.png", url: "https://icter.lk/" },
  ],
  
  // ---- Timeline ----------------------------------------------------------
  // date: ISO 8601 with +05:30 offset. "proposed: true" shows a "Tentative" tag.
  timeline: [
    { date: "2026-10-01T09:00:00+05:30", title: "Online Launch Workshop · Dev phase starts",
      text: "Development data, baseline for the dev set, rules and templates go live." },
    { date: "2026-10-12T00:00:00+05:30", title: "Test phase opens",
      text: "Test set released to registered teams. Baseline test scores posted." },
    { date: "2026-10-22T23:59:00+05:30", title: "Leaderboard closes",
      text: "Final leaderboard submission." },
    { date: "2026-10-23T23:59:00+05:30", title: "Final system & code submission",
      text: "Select up to 2 final runs and submit code, scripts and model manifest for reproduction." },
    { date: "2026-10-26T23:59:00+05:30", title: "System description reports due",
      text: "Short report describing your system, using the official template." },
    { date: "2026-10-28T17:00:00+05:30", title: "Verified results published",
      text: "Reproduction outcomes published." },
    { date: "2026-10-30T17:00:00+05:30", title: "Presentation slides due",
      text: "A slide deck to present your work ICTer 2026." },
    { date: "2026-11-02T09:00:00+05:30", title: "Presentation at ICTer 2026",
      text: "Present your work at <a href='https://icter.lk/' target='_blank' rel='noopener'>ICTer 2026</a>, UCSC, Colombo." },
  ],

  // ---- Prizes ------------------------------------------------------------
  // Keep amounts as "To be announced" until funding is confirmed in writing.
  prizes: {
    first:  "To be announced",
    second: "Professional development voucher",
    third:  "Professional development voucher",
  },

  // ---- Announcements (newest first) ---------------------------------------
  news: [
    { date: "2026-09-19", text: "Website launched. Registration opens on 21st September 2026." },
  ],
};
