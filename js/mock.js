// Mock backend — replace with real Supabase calls later
// Simulates a board that exists when reveal time has passed

const MOCK_REVEAL_HOUR = 20; // 8pm

const MOCK_BOARDS = {
  "2026-05-19": [
    { word: "pointless",  count: 1203 },
    { word: "waste",      count: 847  },
    { word: "torture",    count: 612  },
    { word: "nothing",    count: 589  },
    { word: "vibes",      count: 401  },
    { word: "pain",       count: 387  },
    { word: "mandatory",  count: 344  },
    { word: "pretend",    count: 298  },
    { word: "suffer",     count: 201  },
    { word: "nap",        count: 187  },
  ],
};

const MOCK_COUNTS = {
  "2026-05-19": 6312,
};

async function apiGetPrompt() {
  return getTodaysPrompt();
}

async function apiGetCount(promptId) {
  return MOCK_COUNTS[promptId] ?? Math.floor(Math.random() * 800 + 200);
}

async function apiSubmitWord(promptId, word) {
  // In real version: INSERT into submissions table
  // Returns { success: true, submissionCount: N }
  const base = MOCK_COUNTS[promptId] ?? 500;
  return { success: true, submissionCount: base + 1 };
}

async function apiGetBoard(promptId) {
  // In real version: SELECT word, count(*) FROM submissions WHERE prompt_id = ?
  // Only returns data after reveal time
  const now = new Date();
  const isAfterReveal = now.getHours() >= MOCK_REVEAL_HOUR;

  if (!isAfterReveal) return null;
  return MOCK_BOARDS[promptId] ?? null;
}

// Force reveal mode for local testing — set to true to skip the 8pm check
const FORCE_REVEAL = true;

async function apiGetBoardDebug(promptId) {
  if (FORCE_REVEAL) {
    return MOCK_BOARDS[promptId] ?? MOCK_BOARDS["2026-05-19"];
  }
  return apiGetBoard(promptId);
}
