import './style.css';
import { SUPPORTED_BANGS } from '@/utils/bangs';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div class="container">
    <div class="header">
      <div class="title-with-logo">
        <img src="/logo.svg" alt="Logo" class="app-logo" />
        <h2>Guilt Trip</h2>
      </div>
      <div style="display: flex; gap: 8px;">
        <button id="snooze-btn" class="icon-btn" title="Pause for 30m">💤</button>
        <button id="theme-toggle" class="icon-btn" title="Toggle Dark Mode">🌙</button>
      </div>
    </div>

    <div id="stats-card" class="section" style="background: linear-gradient(135deg, #de5833 0%, #eb7042 100%); color: white; border: none; cursor: pointer;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; flex-direction: column;">
            <span style="font-weight: 600; font-size: 14px; opacity: 0.9;">Big Tech Avoided</span>
            <span style="font-size: 11px; opacity: 0.8; font-weight: 400;">(Last 30 days)</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
            <span id="stat-count" style="font-size: 24px; font-weight: 800;">0</span>
            <span id="stats-chevron-icon" style="font-size: 12px; opacity: 0.6; transition: transform 0.2s;">▼</span>
        </div>
      </div>
      <div id="stats-details" class="hidden" style="margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.2);"></div>
    </div>
    
    <div class="section">
      <div class="section-header" id="settings-toggle">
        <h3>Settings</h3>
        <span class="chevron" id="settings-chevron">▼</span>
      </div>
      <div class="section-content hidden" id="settings-content">
        <div class="setting-row">
          <div class="label-with-tooltip">
            <label for="strict-mode" style="cursor: pointer;"><b>Strict Mode</b></label>
            <span class="tooltip-trigger" data-tooltip="Skip banner and auto-redirect">?</span>
          </div>
          <label class="switch-wrapper" style="cursor: pointer;">
            <input type="checkbox" id="strict-mode">
            <span class="toggle-slider"></span>
          </label>
        </div>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 12px 0;">
        <div class="setting-row">
          <label>Banner Color</label>
          <input type="color" id="banner-bg" value="#de5833">
        </div>
        <div class="setting-row">
          <label>Text Color</label>
          <input type="color" id="banner-text" value="#ffffff">
        </div>
      </div>
    </div>

    <div class="section">
      <h3>Enabled Bangs</h3>
      <div id="bang-list"></div>
    </div>
    
    <div class="footer">
      <a href="https://github.com/teismar/ddg_guilt_trip" target="_blank">GitHub Repository</a>
      <span>•</span>
      <span>Developed by teismar</span>
    </div>
  </div>
`;

const list = document.getElementById('bang-list')!;
const themeToggle = document.getElementById('theme-toggle')!;
const snoozeBtn = document.getElementById('snooze-btn')!;
const statCount = document.getElementById('stat-count')!;
const statsCard = document.getElementById('stats-card')!;
const statsDetails = document.getElementById('stats-details')!;
const strictModeInput = document.getElementById('strict-mode') as HTMLInputElement;
const bannerBgInput = document.getElementById('banner-bg') as HTMLInputElement;
const bannerTextInput = document.getElementById('banner-text') as HTMLInputElement;
const settingsToggle = document.getElementById('settings-toggle')!;
const settingsContent = document.getElementById('settings-content')!;
const settingsChevron = document.getElementById('settings-chevron')!;

settingsToggle.addEventListener('click', () => {
  settingsContent.classList.toggle('hidden');
  settingsChevron.style.transform = settingsContent.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
});

async function loadSettings() {
  const data = await browser.storage.local.get([
    "enabledBangs", "darkMode", "bannerStyle", "strictMode", "stats", "snoozeUntil", "customRedirects"
  ]);
  
  // -1. Handle Stats
  const statsData = data.stats || { interventions: 0 };
  const history: {ts: number, bangId: string}[] = statsData.history || 
    Array.from({length: statsData.interventions || 0}).map(() => ({ ts: 0, bangId: 'unknown' }));

  const now = Date.now();
  const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000;
  const last30d = history.filter(h => h.ts > thirtyDaysAgo);

  statCount.textContent = last30d.length.toString();

  // Populate Details
  const breakdown: Record<string, number> = {};
  last30d.forEach(h => {
      let name = "Unknown / Legacy";
      if (h.bangId && h.bangId !== 'unknown') {
         name = SUPPORTED_BANGS.find(b => b.id === h.bangId)?.name || h.bangId;
      }
      breakdown[name] = (breakdown[name] || 0) + 1;
  });
  
  const sorted = Object.entries(breakdown).sort(([,a], [,b]) => b - a);
  
  if (history.length === 0) {
      statsDetails.innerHTML = '<div style="opacity: 0.8; font-size: 13px;">No interventions recorded yet.</div>';
  } else if (last30d.length === 0) {
       statsDetails.innerHTML = `<div style="opacity: 0.8; font-size: 13px;">No activity in last 30 days.<br>Lifetime Total: ${history.length}</div>`;
  } else {
       const breakdownHtml = sorted.map(([name, count]) => `
          <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;">
              <span>${name}</span>
              <span style="font-weight: 600;">${count}</span>
          </div>
      `).join('');
      
      statsDetails.innerHTML = `
        ${breakdownHtml}
        ${history.length > last30d.length ? `<div style="margin-top: 8px; font-size: 11px; opacity: 0.7; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 4px;">Lifetime Total: ${history.length}</div>` : ''}
      `;
  }

  statsCard.addEventListener('click', () => {
    const isHidden = statsDetails.classList.toggle('hidden');
    const chevron = document.getElementById('stats-chevron-icon');
    if (chevron) {
        chevron.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  });

  // -0.5 Handle Snooze
  let snoozeBy = data.snoozeUntil || 0;
  const updateSnoozeUI = () => {
    const now = Date.now();
    const diff = snoozeBy - now;
    
    if (diff > 0) {
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      snoozeBtn.classList.add('active');
      snoozeBtn.style.color = '#de5833';
      snoozeBtn.title = `Paused (${timeStr} left)`;
      snoozeBtn.textContent = `💤 ${timeStr}`;
    } else {
      snoozeBtn.classList.remove('active');
      snoozeBtn.style.color = '';
      snoozeBtn.title = "Pause for 30m";
      snoozeBtn.textContent = "💤";
    }
  };
  updateSnoozeUI(); // Initial check
  setInterval(updateSnoozeUI, 1000); // Check every second

  snoozeBtn.addEventListener('click', async () => {
    const now = Date.now();
    if (snoozeBy > now) {
      // Cancel snooze
      snoozeBy = 0;
      await browser.storage.local.remove("snoozeUntil");
    } else {
      // Start 30m snooze
      snoozeBy = now + 30 * 60 * 1000;
      await browser.storage.local.set({ snoozeUntil: snoozeBy });
    }
    updateSnoozeUI();
  });

  // 0. Handle Strict Mode
  strictModeInput.checked = data.strictMode || false;
  strictModeInput.addEventListener('change', async () => {
    await browser.storage.local.set({ strictMode: strictModeInput.checked });
  });

  // 1. Handle Dark Mode
  let isDarkMode = data.darkMode !== undefined ? data.darkMode : true;
  updateTheme(isDarkMode);
  
  themeToggle.addEventListener('click', async () => {
    isDarkMode = !isDarkMode;
    updateTheme(isDarkMode);
    await browser.storage.local.set({ darkMode: isDarkMode });
  });

  // 2. Handle Banner Style
  const styles = data.bannerStyle || { bg: '#de5833', text: '#ffffff' };
  bannerBgInput.value = styles.bg;
  bannerTextInput.value = styles.text;

  const saveStyle = async () => {
    await browser.storage.local.set({ 
      bannerStyle: { 
        bg: bannerBgInput.value, 
        text: bannerTextInput.value 
      } 
    });
  };

  bannerBgInput.addEventListener('change', saveStyle);
  bannerTextInput.addEventListener('change', saveStyle);

  // 3. Handle Bangs
  const enabledBangs = data.enabledBangs || {};
  const customRedirects = data.customRedirects || {};
  const isEnabled = (id: string) => enabledBangs[id] !== false;

  SUPPORTED_BANGS.forEach(bang => {
    const item = document.createElement('div');
    item.className = 'bang-item';
    const baseUrl = customRedirects[bang.id] || bang.defaultBaseUrl || "Default";
    const displayUrl = baseUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

    item.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
        <div class="bang-info">
          <div><b>${bang.trigger}</b> <span class="bang-service">${bang.name}</span></div>
          <div class="custom-url-display" title="${baseUrl}" style="font-size: 10px; color: #999; margin-top: 2px; max-width: 180px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
             ↳ ${displayUrl}
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 12px;">
          <button class="icon-btn edit-btn" style="width: 28px; height: 28px; font-size: 14px; opacity: 0.6;" title="Edit Redirect URL">✏️</button>
          <label class="switch-wrapper">
            <input type="checkbox" id="toggle-${bang.id}" ${isEnabled(bang.id) ? 'checked' : ''}>
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
    `;
    
    list.appendChild(item);
    
    // Toggle Logic
    const checkbox = item.querySelector<HTMLInputElement>(`#toggle-${bang.id}`)!;
    checkbox.addEventListener('change', async (e) => {
      const checked = (e.target as HTMLInputElement).checked;
      const current = (await browser.storage.local.get("enabledBangs")).enabledBangs || {};
      current[bang.id] = checked;
      await browser.storage.local.set({ enabledBangs: current });
    });

    // Edit Logic (Non-blocking inline UI)
    const editBtn = item.querySelector<HTMLButtonElement>('.edit-btn')!;
    const infoContainer = item.querySelector<HTMLDivElement>('.bang-info')!;
    
    editBtn.addEventListener('click', async () => {
      // Hide edit button while editing
      editBtn.style.display = 'none';

      // Capture current value
      const stored = await browser.storage.local.get("customRedirects");
      const currentRedirects = stored.customRedirects || {};
      const currentUrl = currentRedirects[bang.id] || bang.defaultBaseUrl || "";

      // Save original HTML to restore on cancel
      const originalHTML = infoContainer.innerHTML;

      // Swap to input mode
      infoContainer.innerHTML = `
        <div style="display: flex; gap: 4px; align-items: center;">
            <input type="text" class="edit-input" value="${currentUrl}" style="width: 140px; font-size: 14px; padding: 4px; border: 1px solid #ccc; border-radius: 4px;">
            <button class="save-btn" style="border: none; background: none; cursor: pointer; color: green;">✔</button>
            <button class="cancel-btn" style="border: none; background: none; cursor: pointer; color: red;">✕</button>
        </div>
      `;

      const input = infoContainer.querySelector<HTMLInputElement>('.edit-input')!;
      const saveBtn = infoContainer.querySelector<HTMLButtonElement>('.save-btn')!;
      const cancelBtn = infoContainer.querySelector<HTMLButtonElement>('.cancel-btn')!;

      input.focus();

      // SAVE HANDLER
      saveBtn.addEventListener('click', async () => {
        const newUrl = input.value.trim();
        
        if (newUrl === "" || newUrl === bang.defaultBaseUrl) {
           delete currentRedirects[bang.id];
        } else {
           let validUrl = newUrl;
           if (!validUrl.startsWith("http")) validUrl = "https://" + validUrl;
           currentRedirects[bang.id] = validUrl; 
        }

        await browser.storage.local.set({ customRedirects: currentRedirects });
        location.reload(); 
      });

      // CANCEL HANDLER
      cancelBtn.addEventListener('click', () => {
        infoContainer.innerHTML = originalHTML;
        editBtn.style.display = ''; // Show edit button again
      });
      
      // Allow Enter/Escape keys
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveBtn.click();
        if (e.key === 'Escape') cancelBtn.click();
      });
    }); // END Edit Logic
  }); // END forEach
}

function updateTheme(dark: boolean) {
  if (dark) {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️';
  } else {
    document.body.classList.remove('dark');
    themeToggle.textContent = '🌙';
  }
}

loadSettings();
