const PAST_DAYS = [
  {
    date: "May 18",
    prompts: [
      { text: "What a 'quick sync' really is", words: [
        {w:"trap",n:2841},{w:"waste",n:2103},{w:"nothing",n:1876},{w:"hell",n:1432},
        {w:"torture",n:1201},{w:"pointless",n:987},{w:"nightmare",n:876},{w:"dread",n:754},
        {w:"pain",n:698},{w:"endless",n:612},{w:"boring",n:543},{w:"annoying",n:498},
        {w:"useless",n:421},{w:"mandatory",n:387},{w:"death",n:356},{w:"chaos",n:312},
        {w:"stress",n:289},{w:"filler",n:234},{w:"repeat",n:198},{w:"void",n:167}
      ]},
      { text: "One word for the Sunday scaries", words: [
        {w:"dread",n:3102},{w:"anxiety",n:2876},{w:"doom",n:2541},{w:"fear",n:2103},
        {w:"panic",n:1876},{w:"dark",n:1654},{w:"ugh",n:1432},{w:"monday",n:1201},
        {w:"work",n:987},{w:"sadness",n:876},{w:"misery",n:754},{w:"stress",n:698},
        {w:"gloom",n:612},{w:"existential",n:543},{w:"despair",n:498},{w:"heavy",n:421},
        {w:"regret",n:387},{w:"tired",n:356},{w:"awful",n:312},{w:"haunted",n:289}
      ]},
      { text: "What you do instead of sleeping", words: [
        {w:"scroll",n:4218},{w:"phone",n:3876},{w:"tiktok",n:3201},{w:"doom",n:2654},
        {w:"reddit",n:2103},{w:"watch",n:1876},{w:"eat",n:1654},{w:"think",n:1432},
        {w:"worry",n:1201},{w:"read",n:987},{w:"overthink",n:876},{w:"netflix",n:754},
        {w:"procrastinate",n:612},{w:"browse",n:543},{w:"spiral",n:498},{w:"text",n:421},
        {w:"regret",n:387},{w:"stare",n:356},{w:"nothing",n:312},{w:"exist",n:289}
      ]},
      { text: "One word for your Notes app", words: [
        {w:"chaos",n:1987},{w:"graveyard",n:1654},{w:"mess",n:1432},{w:"random",n:1201},
        {w:"trash",n:987},{w:"anxiety",n:876},{w:"dark",n:754},{w:"forgotten",n:698},
        {w:"ideas",n:612},{w:"garbage",n:543},{w:"unread",n:498},{w:"scary",n:421},
        {w:"archive",n:387},{w:"void",n:356},{w:"wasteland",n:312},{w:"evidence",n:289},
        {w:"embarrassing",n:234},{w:"ancient",n:198},{w:"apocalypse",n:167},{w:"haunted",n:143}
      ]},
      { text: "What 'I'm almost ready' means", words: [
        {w:"lie",n:3654},{w:"minutes",n:3102},{w:"never",n:2541},{w:"waiting",n:2103},
        {w:"joke",n:1876},{w:"fantasy",n:1654},{w:"hope",n:1432},{w:"delusion",n:1201},
        {w:"eventually",n:987},{w:"soon",n:876},{w:"false",n:754},{w:"chaos",n:698},
        {w:"catastrophe",n:612},{w:"panic",n:543},{w:"disaster",n:498},{w:"twenty",n:421},
        {w:"denial",n:387},{w:"optimism",n:356},{w:"fiction",n:312},{w:"impossible",n:289}
      ]},
    ]
  },
  {
    date: "May 17",
    prompts: [
      { text: "One word for opening the fridge again", words: [
        {w:"bored",n:3891},{w:"hope",n:3201},{w:"sad",n:2654},{w:"hungry",n:2103},
        {w:"again",n:1876},{w:"ritual",n:1654},{w:"nothing",n:1432},{w:"disappointed",n:1201},
        {w:"empty",n:987},{w:"habit",n:876},{w:"pointless",n:754},{w:"optimism",n:698},
        {w:"denial",n:612},{w:"desperate",n:543},{w:"anxiety",n:498},{w:"wishful",n:421},
        {w:"snack",n:387},{w:"compulsion",n:356},{w:"yearning",n:312},{w:"lost",n:289}
      ]},
      { text: "What happens at minute 45 of a 30-min meeting", words: [
        {w:"nothing",n:2744},{w:"chaos",n:2103},{w:"pain",n:1876},{w:"dread",n:1654},
        {w:"tragedy",n:1432},{w:"suffering",n:1201},{w:"spiral",n:987},{w:"overtime",n:876},
        {w:"nightmare",n:754},{w:"still",n:698},{w:"more",n:612},{w:"why",n:543},
        {w:"trapped",n:498},{w:"endless",n:421},{w:"mercy",n:387},{w:"regret",n:356},
        {w:"hostage",n:312},{w:"despair",n:289},{w:"escape",n:234},{w:"death",n:198}
      ]},
      { text: "One word for your commute", words: [
        {w:"pain",n:5102},{w:"hell",n:4321},{w:"nightmare",n:3876},{w:"awful",n:3201},
        {w:"dread",n:2654},{w:"slow",n:2103},{w:"misery",n:1876},{w:"traffic",n:1654},
        {w:"chaos",n:1432},{w:"long",n:1201},{w:"survival",n:987},{w:"purgatory",n:876},
        {w:"suffering",n:754},{w:"dark",n:698},{w:"crowded",n:612},{w:"loud",n:543},
        {w:"ugh",n:498},{w:"trapped",n:421},{w:"soulless",n:387},{w:"exhausting",n:356}
      ]},
      { text: "What you tell yourself before one more episode", words: [
        {w:"last",n:4398},{w:"sleep",n:3876},{w:"fine",n:3201},{w:"quick",n:2654},
        {w:"lie",n:2103},{w:"ok",n:1876},{w:"one",n:1654},{w:"promise",n:1432},
        {w:"never",n:1201},{w:"liar",n:987},{w:"denial",n:876},{w:"myth",n:754},
        {w:"delusion",n:698},{w:"habit",n:612},{w:"trap",n:543},{w:"compulsion",n:498},
        {w:"lies",n:421},{w:"false",n:387},{w:"ritual",n:356},{w:"hopeless",n:312}
      ]},
      { text: "One word for your browser history", words: [
        {w:"evidence",n:2156},{w:"shame",n:1987},{w:"chaos",n:1654},{w:"dark",n:1432},
        {w:"cursed",n:1201},{w:"disaster",n:987},{w:"embarrassing",n:876},{w:"haunted",n:754},
        {w:"crimes",n:698},{w:"unhinged",n:612},{w:"classified",n:543},{w:"deleted",n:498},
        {w:"trauma",n:421},{w:"spiral",n:387},{w:"forbidden",n:356},{w:"concerning",n:312},
        {w:"incriminating",n:289},{w:"reckless",n:234},{w:"regret",n:198},{w:"secret",n:167}
      ]},
    ]
  },
  {
    date: "May 16",
    prompts: [
      { text: "What 'per my last email' really means", words: [
        {w:"read",n:4711},{w:"seriously",n:4103},{w:"rude",n:3654},{w:"passive",n:3201},
        {w:"again",n:2876},{w:"ignored",n:2541},{w:"frustrated",n:2103},{w:"angry",n:1876},
        {w:"please",n:1654},{w:"done",n:1432},{w:"unsubscribe",n:1201},{w:"fired",n:987},
        {w:"exhausted",n:876},{w:"sigh",n:754},{w:"obvious",n:698},{w:"clearly",n:612},
        {w:"literally",n:543},{w:"helpless",n:498},{w:"pointless",n:421},{w:"done",n:387}
      ]},
      { text: "One word for your phone battery at 8%", words: [
        {w:"panic",n:6023},{w:"anxiety",n:5432},{w:"dread",n:4876},{w:"crisis",n:4201},
        {w:"emergency",n:3654},{w:"fear",n:3102},{w:"doom",n:2876},{w:"desperate",n:2541},
        {w:"charge",n:2103},{w:"stress",n:1876},{w:"dark",n:1654},{w:"dead",n:1432},
        {w:"survival",n:1201},{w:"hurry",n:987},{w:"ugh",n:876},{w:"dying",n:754},
        {w:"run",n:698},{w:"now",n:612},{w:"please",n:543},{w:"help",n:498}
      ]},
      { text: "What remote work looks like by 3pm", words: [
        {w:"couch",n:3344},{w:"bed",n:3102},{w:"chaos",n:2654},{w:"pyjamas",n:2103},
        {w:"nothing",n:1876},{w:"nap",n:1654},{w:"dark",n:1432},{w:"snacks",n:1201},
        {w:"netflix",n:987},{w:"spiral",n:876},{w:"horizontal",n:754},{w:"defeated",n:698},
        {w:"slouch",n:612},{w:"surrender",n:543},{w:"exhausted",n:498},{w:"gone",n:421},
        {w:"absent",n:387},{w:"decomposing",n:356},{w:"blank",n:312},{w:"lost",n:289}
      ]},
      { text: "One word for LinkedIn", words: [
        {w:"cringe",n:7891},{w:"exhausting",n:6543},{w:"fake",n:5876},{w:"painful",n:5201},
        {w:"performative",n:4654},{w:"gross",n:4102},{w:"awful",n:3876},{w:"unbearable",n:3201},
        {w:"sad",n:2876},{w:"theater",n:2541},{w:"circus",n:2103},{w:"cursed",n:1876},
        {w:"dystopia",n:1654},{w:"delusional",n:1432},{w:"ugh",n:1201},{w:"nightmare",n:987},
        {w:"corporate",n:876},{w:"lies",n:754},{w:"dark",n:698},{w:"hollow",n:612}
      ]},
      { text: "What the miscellaneous drawer is", words: [
        {w:"graveyard",n:2198},{w:"chaos",n:1987},{w:"void",n:1654},{w:"mystery",n:1432},
        {w:"cursed",n:1201},{w:"archive",n:987},{w:"forgotten",n:876},{w:"ancient",n:754},
        {w:"dark",n:698},{w:"haunted",n:612},{w:"random",n:543},{w:"everything",n:498},
        {w:"terrifying",n:421},{w:"archaeological",n:387},{w:"historical",n:356},{w:"museum",n:312},
        {w:"junk",n:289},{w:"treasure",n:234},{w:"pandora",n:198},{w:"abyss",n:167}
      ]},
    ]
  },
];

function renderHistory() {
  const container = document.getElementById('history-content');
  container.innerHTML = '';

  PAST_DAYS.forEach(day => {
    const el = document.createElement('div');
    el.className = 'history-day';

    const rows = day.prompts.map((p, pi) => {
      const panelId = `hist-panel-${day.date.replace(/\s/g,'-')}-${pi}`;
      const top5 = p.words.slice(0, 20);
      return `
        <div class="history-row">
          <div class="history-row-top">
            <span class="history-prompt-text">${p.text}</span>
            <div class="history-row-right">
              <span class="history-top-word">${p.words[0].w}</span>
              <button class="expand-btn" data-panel="${panelId}" aria-expanded="false">▾</button>
            </div>
          </div>
          <div class="history-word-list" id="${panelId}" hidden>
            ${top5.map((entry, idx) => `
              <div class="hist-word-row">
                <span class="hist-rank">${idx + 1}</span>
                <span class="hist-word">${entry.w}</span>
                <span class="hist-bar-wrap"><span class="hist-bar" style="width:${Math.round(entry.n/top5[0].n*100)}%"></span></span>
                <span class="hist-count">${entry.n.toLocaleString()}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    el.innerHTML = `
      <div class="history-day-date">${day.date}</div>
      <div class="history-rows">${rows}</div>
    `;
    container.appendChild(el);
  });

  // Wire up expand buttons
  container.querySelectorAll('.expand-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = document.getElementById(btn.dataset.panel);
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.textContent = expanded ? '▾' : '▴';
      panel.hidden = expanded;
    });
  });
}
