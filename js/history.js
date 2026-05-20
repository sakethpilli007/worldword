async function loadHistory() {
  const container = document.getElementById('history-content');
  container.innerHTML = '';

  const dates = [];
  for (let i = 1; i <= 3; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }

  for (const dateStr of dates) {
    const prompts = await apiGetPromptsByDay(dateStr);
    if (!prompts) continue;

    const boards = await Promise.all(prompts.map(p => apiGetBoard(p.id)));
    if (!boards.some(b => b !== null)) continue;

    const label = new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const el = document.createElement('div');
    el.className = 'history-day';

    const rows = prompts.map((p, pi) => {
      const board = boards[pi];
      if (!board || board.length === 0) return '';

      const panelId = `hist-panel-${dateStr}-${pi}`;
      const top20 = board.slice(0, 20);

      return `
        <div class="history-row">
          <div class="history-row-top">
            <span class="history-prompt-text">${p.text}</span>
            <div class="history-row-right">
              <span class="history-top-word">${board[0].word}</span>
              <button class="expand-btn" data-panel="${panelId}" aria-expanded="false">▾</button>
            </div>
          </div>
          <div class="history-word-list" id="${panelId}" hidden>
            ${top20.map((entry, idx) => `
              <div class="hist-word-row">
                <span class="hist-rank">${idx + 1}</span>
                <span class="hist-word">${entry.word}</span>
                <span class="hist-bar-wrap"><span class="hist-bar" style="width:${Math.round(entry.count / board[0].count * 100)}%"></span></span>
                <span class="hist-count">${entry.count.toLocaleString()}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    el.innerHTML = `
      <div class="history-day-date">${label}</div>
      <div class="history-rows">${rows}</div>
    `;
    container.appendChild(el);

    el.querySelectorAll('.expand-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const panel = document.getElementById(btn.dataset.panel);
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        btn.textContent = expanded ? '▾' : '▴';
        panel.hidden = expanded;
      });
    });
  }

  if (!container.children.length) {
    container.innerHTML = '<p class="hint">past results will appear here after the first day</p>';
  }
}
