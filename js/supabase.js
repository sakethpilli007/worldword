const SUPABASE_URL = 'https://edkiumdwugzkodgzaeff.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVka2l1bWR3dWd6a29kZ3phZWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMTMyNjUsImV4cCI6MjA5NDc4OTI2NX0.Zt-MDhPP9ah2dCZbVfFaTCZO3sY0rNXfm3Qs6bV0gGI';

const REVEAL_HOUR = 20; // 8 PM local time

const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function isRevealTime() {
  return new Date().getHours() >= REVEAL_HOUR;
}

function getOrCreateDeviceId() {
  const KEY = 'worldword_device';
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}

async function apiGetPromptsByDay(day) {
  const { data, error } = await db
    .from('prompts')
    .select('id, day, position, text')
    .eq('day', day)
    .order('position');
  if (error || !data || data.length === 0) return null;
  return data;
}

async function apiGetTodaysPrompts() {
  const today = getToday();
  const { data, error } = await db
    .from('prompts')
    .select('id, day, position, text')
    .eq('day', today)
    .order('position');

  if (error || !data || data.length === 0) return null;
  return data;
}

async function apiGetTotalCount(day) {
  const { data, error } = await db
    .from('prompts')
    .select('id')
    .eq('day', day);

  if (error || !data) return 0;

  let total = 0;
  for (const p of data) {
    const { data: cnt } = await db.rpc('get_submission_count', { p_prompt_id: p.id });
    total += cnt || 0;
  }
  return total;
}

async function apiSubmitWord(promptId, word) {
  const deviceId = getOrCreateDeviceId();
  const { error } = await db
    .from('submissions')
    .insert({ prompt_id: promptId, word: word.toLowerCase().trim(), device_id: deviceId });

  if (error) {
    if (error.code === '23505') throw { type: 'duplicate' };
    throw { type: 'network', message: error.message };
  }
  return { success: true };
}

async function apiGetBoard(promptId) {
  const { data, error } = await db.rpc('get_board', { p_prompt_id: promptId });
  if (error || !data || data.length === 0) return null;
  return data;
}
