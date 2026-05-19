const STORAGE_KEY = 'worldword_v2';

// ── WORD VALIDATION ──

const BLOCKED_WORDS = new Set([
  // slurs
  'nigger','nigga','faggot','fag','retard','chink','spic','kike','wetback','tranny',
  // sexually explicit / adult content
  'fuck','shit','cunt','cock','dick','pussy','bitch','whore','slut','blowjob','handjob',
  'cumshot','jizz','dildo','penis','vagina','tits','boobs','ass','arse','asshole','arsehole',
  'orgy','sex','sexy','nude','naked','porn','pornography','rape','anal','oral','erotic',
  'erection','orgasm','masturbate','masturbation','ejaculate','grope','fondle','fetish',
  'boner','horny','kinky','nudes','threesome','incest','pedophile','molestation',
  // identity terms (keep game neutral)
  'gay','lesbian','bisexual','transgender','queer','trans','homo','dyke','nonbinary',
  // general swearing
  'bastard','piss','crap','wank','twat','tosser','bollocks','shite','motherfucker',
  'bullshit','horseshit','dumbass','jackass','dipshit','shithead','fuckhead','fucker',
  'dammit','goddamn','goddammit',
  // meta / bot answers
  'claude','ai','chatgpt','openai','anthropic','gpt',
]);

function validateWord(word) {
  if (!word || word.length < 2) return 'at least 2 letters';
  if (word.length > 24) return 'too long';
  if (!/^[a-z]+$/.test(word)) return 'letters only';
  if (BLOCKED_WORDS.has(word)) return 'word not allowed';
  return null;
}

function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}

function saveState(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

function today() { return new Date().toISOString().split('T')[0]; }

function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function updateStreak(state) {
  const todayStr = today();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  if (state.lastPlayedDate === todayStr) return state.streak || 1;
  if (state.lastPlayedDate === yesterday) return (state.streak || 0) + 1;
  return 1;
}

// Countdown to 8PM local time
function startCountdown() {
  function tick() {
    const now = new Date();
    const reveal = new Date();
    reveal.setHours(20, 0, 0, 0);
    if (now >= reveal) {
      document.getElementById('countdown-timer').textContent = 'Revealing now...';
      return;
    }
    const diff = reveal - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('countdown-timer').textContent =
      `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  tick();
  return setInterval(tick, 1000);
}

// Progress pills showing answered words
function renderProgressPills(total, currentIndex, answers) {
  const container = document.getElementById('progress-pills');
  container.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const pill = document.createElement('div');
    if (i < currentIndex) {
      pill.className = 'pill done';
      pill.innerHTML = `✓ <span class="pill-word">${answers[i]}</span>`;
    } else if (i === currentIndex) {
      pill.className = 'pill active';
      pill.textContent = `${i + 1} of ${total}`;
    } else {
      pill.className = 'pill';
      pill.textContent = `${i + 1}`;
    }
    container.appendChild(pill);
  }
}

function buildShareText(dateStr, answers, prompts, boards) {
  const d = new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const emojis = answers.map((word, i) => {
    const board = boards[i];
    const w = (word || '').toLowerCase();
    const rank = board ? board.findIndex(e => e.word.toLowerCase() === w) + 1 : 0;
    return !board ? '⬜' : rank === 1 ? '🟧' : rank <= 3 ? '🟨' : rank <= 10 ? '🟩' : '⬛';
  });
  const onBoard = answers.filter((word, i) => {
    const board = boards[i];
    const w = (word || '').toLowerCase();
    return board && board.findIndex(e => e.word.toLowerCase() === w) >= 0;
  }).length;
  return [
    `WorldWord · ${d}`,
    emojis.join(''),
    `${onBoard}/${answers.length} on the board`,
    'worldword.world'
  ].join('\n');
}

async function animateBoard(containerId, board, yourWord) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  const maxCount = board[0].count;

  board.forEach((entry, i) => {
    const isYours = entry.word === yourWord;
    const isTop = i === 0;
    const pct = Math.max(8, Math.round((entry.count / maxCount) * 100));

    const row = document.createElement('div');
    row.className = 'board-row';
    row.innerHTML = `
      <span class="rank${isTop ? ' top' : ''}">${isTop ? '★' : i + 1}</span>
      <div class="bar-container">
        <div class="bar-fill${isYours ? ' is-yours' : isTop ? ' is-top' : ''}" style="width:0%"></div>
        <span class="bar-label">${entry.word}</span>
        ${isYours ? '<span class="bar-badge you">you</span>' : ''}
        ${isTop && !isYours ? '<span class="bar-badge top">#1</span>' : ''}
      </div>
      <span class="bar-count">${entry.count.toLocaleString()}</span>
    `;
    container.appendChild(row);

    setTimeout(() => {
      row.classList.add('visible');
      setTimeout(() => {
        row.querySelector('.bar-fill').style.width = pct + '%';
      }, 60);
    }, i * 110);
  });
}

function renderYourResult(containerId, board, yourWord) {
  const el = document.getElementById(containerId);
  if (!el) return null;
  const w = (yourWord || '').toLowerCase();
  const rank = board.findIndex(e => e.word.toLowerCase() === w) + 1;

  if (rank === 1) {
    el.className = 'your-result top-hit';
    el.innerHTML = `🥇 <strong>${yourWord}</strong> — you got the #1 answer! ${board[0].count.toLocaleString()} people said this`;
  } else if (rank > 0) {
    el.className = 'your-result hit';
    el.innerHTML = `✅ <strong>${yourWord}</strong> ranked #${rank} of ${board.length} — ${board[rank-1].count.toLocaleString()} people agreed`;
  } else {
    el.className = 'your-result';
    el.innerHTML = `<strong>${yourWord}</strong> didn't make the top 10 this time`;
  }
  return rank;
}

// Tab label: first 3-4 words of prompt
function truncatePrompt(text, maxLen = 22) {
  return text.length <= maxLen ? text : text.slice(0, maxLen).trimEnd() + '…';
}

function getRankEmoji(rank) {
  if (!rank || rank === 0) return '—';
  if (rank === 1) return '🥇';
  if (rank <= 3) return '🟨';
  return '🟩';
}

async function showReveal(prompts, answers) {
  showScreen('screen-reveal');
  const tabsEl = document.getElementById('reveal-tabs');
  const panelsEl = document.getElementById('reveal-panels');
  tabsEl.innerHTML = '';
  panelsEl.innerHTML = '';

  const boards = await Promise.all(prompts.map(p => apiGetBoard(p.id)));

  // Score summary
  const onBoardCount = answers.filter((w, i) => {
    const b = boards[i];
    const lw = (w || '').toLowerCase();
    return b && b.findIndex(e => e.word.toLowerCase() === lw) >= 0;
  }).length;
  const topCount = answers.filter((w, i) => {
    const b = boards[i];
    const lw = (w || '').toLowerCase();
    return b && b.findIndex(e => e.word.toLowerCase() === lw) === 0;
  }).length;

  const scoreEl = document.getElementById('reveal-score');
  scoreEl.innerHTML = `<strong>${onBoardCount}/${prompts.length}</strong> on the board ${topCount > 0 ? `· <strong>${topCount}</strong> #1 ${topCount === 1 ? 'answer' : 'answers'}` : ''} <span class="live-badge">live</span>`;

  prompts.forEach((prompt, i) => {
    const word = answers[i];
    const board = boards[i];
    const lw = (word || '').toLowerCase();
    const rank = board ? board.findIndex(e => e.word.toLowerCase() === lw) + 1 : -1;
    const isTop = rank === 1;
    const isHit = rank > 0;

    // Tab
    const tab = document.createElement('button');
    tab.className = 'reveal-tab' +
      (i === 0 ? ' active' : '') +
      (isTop ? ' top-hit' : isHit ? ' hit' : '');
    tab.innerHTML = `
      <span class="tab-emoji">${isTop ? '🥇' : isHit ? '✅' : '—'}</span>
      <span class="tab-num">${i + 1}</span>
    `;
    tab.title = prompt.text;
    tab.addEventListener('click', () => switchRevealTab(i));
    tabsEl.appendChild(tab);

    // Panel
    const panel = document.createElement('div');
    panel.id = `panel-${i}`;
    panel.className = 'reveal-panel' + (i === 0 ? ' active' : '');
    panel.innerHTML = `
      <div class="reveal-prompt-card ${isTop ? 'top-hit' : isHit ? 'hit' : ''}">
        <p class="prompt-number">prompt ${i + 1} of ${prompts.length}</p>
        <p class="prompt-text">${prompt.text}</p>
      </div>
      <div class="board" id="board-${i}"></div>
      <div class="your-result" id="result-${i}"></div>
    `;
    panelsEl.appendChild(panel);
  });

  // Animate first board
  if (boards[0]) {
    await animateBoard('board-0', boards[0], answers[0]);
    renderYourResult('result-0', boards[0], answers[0]);
  }

  tabsEl._boards = boards;
  tabsEl._answers = answers;
  tabsEl._loaded = new Set([0]);

  document.getElementById('share-btn').onclick = () => {
    const text = buildShareText(today(), answers, prompts, boards);
    navigator.clipboard.writeText(text).then(() => showToast('copied to clipboard!'));
  };
}

function switchRevealTab(index) {
  const tabsEl = document.getElementById('reveal-tabs');
  document.querySelectorAll('.reveal-tab').forEach((t, i) => t.classList.toggle('active', i === index));
  document.querySelectorAll('.reveal-panel').forEach((p, i) => p.classList.toggle('active', i === index));

  if (!tabsEl._loaded.has(index)) {
    tabsEl._loaded.add(index);
    const board = tabsEl._boards[index];
    const word = tabsEl._answers[index];
    if (board) {
      animateBoard(`board-${index}`, board, word);
      renderYourResult(`result-${index}`, board, word);
    }
  }
}

// ── SUBMIT FLOW ──

function startSubmitFlow(prompts, answers, index, state, todayStr) {
  showScreen('screen-submit');
  renderProgressPills(prompts.length, index, answers);

  const prompt = prompts[index];
  const promptEl = document.getElementById('prompt-text');
  const numEl = document.getElementById('prompt-number');
  numEl.textContent = `prompt ${index + 1} of ${prompts.length}`;
  promptEl.textContent = prompt.text;

  const card = document.getElementById('prompt-card');
  card.style.animation = 'none';
  card.offsetHeight; // reflow
  card.style.animation = 'cardIn 0.25s ease';

  const input = document.getElementById('word-input');
  const btn = document.getElementById('submit-btn');
  const label = document.getElementById('submit-label');

  input.value = '';
  setTimeout(() => input.focus(), 50);

  const isLast = index === prompts.length - 1;
  label.textContent = isLast ? 'finish' : 'next →';

  const doSubmit = async () => {
    const word = input.value.trim().toLowerCase();
    const validationError = validateWord(word);
    if (validationError) {
      input.classList.add('error');
      setTimeout(() => input.classList.remove('error'), 500);
      showToast(validationError);
      return;
    }

    btn.disabled = true;
    label.textContent = '...';

    try {
      await apiSubmitWord(prompt.id, word);
    } catch (e) {
      if (e && e.type === 'duplicate') {
        // already submitted this prompt from this device — advance silently
      } else {
        showToast('connection error — try again');
        btn.disabled = false;
        label.textContent = isLast ? 'finish' : 'next →';
        return;
      }
    }

    const newAnswers = [...answers, word];
    const newStreak = updateStreak(state);
    const newState = { date: todayStr, answers: newAnswers, streak: newStreak, lastPlayedDate: todayStr };
    saveState(newState);

    const streakEl = document.getElementById('streak-display');
    if (newStreak >= 2) {
      streakEl.textContent = `🔥 ${newStreak} day streak`;
      streakEl.classList.add('active');
    }

    if (newAnswers.length < prompts.length) {
      startSubmitFlow(prompts, newAnswers, index + 1, newState, todayStr);
    } else {
      const boards = await Promise.all(prompts.map(p => apiGetBoard(p.id)));
      const hasReveal = boards.some(b => b !== null);
      const total = await apiGetTotalCount(todayStr);
      if (hasReveal) {
        await showReveal(prompts, newAnswers);
      } else {
        showWaiting(prompts, newAnswers, total);
      }
    }
  };

  btn.disabled = false;
  btn.onclick = doSubmit;
  input.onkeydown = e => { if (e.key === 'Enter') doSubmit(); };
  input.oninput = () => {
    // strip anything that isn't a letter, in real-time
    const clean = input.value.toLowerCase().replace(/[^a-z]/g, '');
    if (input.value !== clean) input.value = clean;
    input.classList.remove('error');
  };
}

let countdownInterval = null;

function showWaiting(prompts, answers, totalCount) {
  showScreen('screen-waiting');
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = startCountdown();

  const summary = document.getElementById('waiting-summary');
  summary.innerHTML = prompts.map((p, i) => `
    <div class="waiting-row">
      <span class="waiting-row-num">${i + 1}</span>
      <span class="waiting-row-prompt">${p.text}</span>
      <span class="waiting-row-word">${answers[i] || '—'}</span>
    </div>
  `).join('');

  const countEl = document.getElementById('waiting-total-count');
  countEl.textContent = totalCount.toLocaleString();

  document.getElementById('share-pending-btn').onclick = () => {
    const d = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const text = `WorldWord · ${d}\nI played — see the live board!\nworldword.world`;
    navigator.clipboard.writeText(text).then(() => showToast('copied!'));
  };
}

// ── HOW TO PLAY MODAL ──
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  const openBtn = document.getElementById('how-to-play-btn');
  const closeBtn = document.getElementById('modal-close');
  const okBtn = document.getElementById('modal-ok');

  const open = () => overlay.classList.add('open');
  const close = () => overlay.classList.remove('open');

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  okBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  // Show on first ever visit
  if (!localStorage.getItem('worldword_seen')) {
    localStorage.setItem('worldword_seen', '1');
    setTimeout(open, 600);
  }
}

// ── MAIN ──
async function init() {
  renderHistory();
  initModal();

  document.getElementById('today-date').textContent = formatDate(today());

  const state = loadState();
  const todayStr = today();

  const streakEl = document.getElementById('streak-display');
  if (state.streak >= 2) {
    streakEl.textContent = `🔥 ${state.streak} day streak`;
    streakEl.classList.add('active');
  }

  const prompts = await apiGetTodaysPrompts();
  if (!prompts) {
    document.getElementById('prompt-text').textContent = 'No prompts today — check back soon.';
    document.getElementById('prompt-number').textContent = '';
    return;
  }

  const totalCount = await apiGetTotalCount(todayStr);
  document.getElementById('player-count').textContent = totalCount.toLocaleString();

  // Sanitize state: if answers array is corrupt or oversized, trim it
  if (state.date === todayStr && state.answers) {
    state.answers = state.answers
      .filter(w => typeof w === 'string' && w.length > 0)
      .map(w => w.toLowerCase().trim())
      .slice(0, prompts.length);
    saveState(state);
  }

  // Finished today
  if (state.date === todayStr && state.answers && state.answers.length === prompts.length) {
    const boards = await Promise.all(prompts.map(p => apiGetBoard(p.id)));
    if (boards.some(b => b !== null)) {
      await showReveal(prompts, state.answers);
    } else {
      showWaiting(prompts, state.answers, totalCount);
    }
    return;
  }

  const answeredSoFar = (state.date === todayStr && state.answers) ? state.answers : [];
  startSubmitFlow(prompts, answeredSoFar, answeredSoFar.length, state, todayStr);
}

// Inject card animation
const style = document.createElement('style');
style.textContent = `@keyframes cardIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`;
document.head.appendChild(style);

init();
