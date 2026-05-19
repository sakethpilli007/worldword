// 90-day prompt bank — hand-curated
// Format: { id: "YYYY-MM-DD", text: "..." }
// Text should be a question or scenario, answer is one word

const PROMPTS = [
  { id: "2026-05-19", text: "What your 9am meeting actually is" },
  { id: "2026-05-20", text: "One word for how Sunday night feels" },
  { id: "2026-05-21", text: "What you tell yourself before skipping the gym" },
  { id: "2026-05-22", text: "What you're actually doing when you say 'on my way'" },
  { id: "2026-05-23", text: "One word for the noise your coworker makes" },
  { id: "2026-05-24", text: "What a 'quick call' really is" },
  { id: "2026-05-25", text: "One word for checking your phone at 2am" },
  { id: "2026-05-26", text: "What 'I'll start Monday' actually means" },
  { id: "2026-05-27", text: "One word for the last thing you Googled" },
  { id: "2026-05-28", text: "What happens at the self-checkout every time" },
  { id: "2026-05-29", text: "One word for your commute" },
  { id: "2026-05-30", text: "What 'working from home' looks like by 3pm" },
  { id: "2026-05-31", text: "One word for opening the fridge a third time" },
  { id: "2026-06-01", text: "What your browser history says about you" },
  { id: "2026-06-02", text: "One word for when the Wi-Fi drops during a call" },
  { id: "2026-06-03", text: "What you're really thinking during a group photo" },
  { id: "2026-06-04", text: "One word for the last text you left on read" },
  { id: "2026-06-05", text: "What 'I'm almost ready' means" },
  { id: "2026-06-06", text: "One word for the tab you've had open for 3 weeks" },
  { id: "2026-06-07", text: "What running into your ex feels like" },
  { id: "2026-06-08", text: "One word for a LinkedIn post that starts with 'Humbled'" },
  { id: "2026-06-09", text: "What happens when you say 'I'll just have one'" },
  { id: "2026-06-10", text: "One word for your posture right now" },
  { id: "2026-06-11", text: "What the 'miscellaneous' drawer in your house is" },
  { id: "2026-06-12", text: "One word for a meeting that could have been an email" },
  { id: "2026-06-13", text: "What you do instead of the thing you're supposed to do" },
  { id: "2026-06-14", text: "One word for your mood before coffee" },
  { id: "2026-06-15", text: "What 'let's circle back' means" },
  { id: "2026-06-16", text: "One word for when autocorrect betrays you" },
  { id: "2026-06-17", text: "What your phone battery at 8% feels like" },
  { id: "2026-06-18", text: "One word for the voice in your head at 3am" },
  { id: "2026-06-19", text: "What you say vs what you mean when you say 'I'm fine'" },
  { id: "2026-06-20", text: "One word for every airport security line" },
  { id: "2026-06-21", text: "What Friday afternoon at work actually is" },
  { id: "2026-06-22", text: "One word for a group project where you do everything" },
  { id: "2026-06-23", text: "What the first thing you check in the morning is" },
  { id: "2026-06-24", text: "One word for 'per my last email'" },
  { id: "2026-06-25", text: "What happens when you say yes to one more drink" },
  { id: "2026-06-26", text: "One word for the playlist you made and never listen to" },
  { id: "2026-06-27", text: "What your 'productive weekend' plan becomes" },
  { id: "2026-06-28", text: "One word for a person who starts every sentence with 'actually'" },
  { id: "2026-06-29", text: "What happens at minute 45 of a 30-minute meeting" },
  { id: "2026-06-30", text: "One word for checking if you locked the door again" },
];

function getTodaysPrompt() {
  const today = new Date().toISOString().split('T')[0];
  return PROMPTS.find(p => p.id === today) || PROMPTS[0];
}
