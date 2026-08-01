/**
 * STORIES BY GSB - FULL YEAR CALENDAR & EVENTS SYSTEM
 * Compatible with unified index.html scroll section AND standalone rituals.html
 */

document.addEventListener('DOMContentLoaded', () => {
  const months = ["All Months","January","February","March","April","May","June","July","August","September","October","November","December"];

  let currentMonthFilter = "All Months";
  let currentCategoryFilter = "all";
  let currentSearchQuery = "";

  const monthBarContainer = document.getElementById('month-selector-bar');
  const eventsGridContainer = document.getElementById('events-cards-grid');
  const searchInput = document.getElementById('event-search-input');
  const categoryBtns = document.querySelectorAll('.event-cat-btn');

  // ── Month Selector Bar ──────────────────────────────────────────────────
  if (monthBarContainer) {
    monthBarContainer.innerHTML = months.map(m => `
      <button data-month="${m}" class="month-tab-btn flex-shrink-0 px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 font-medium border ${
        m === currentMonthFilter
          ? 'bg-primary text-black font-bold shadow-md border-primary'
          : 'bg-surface-variant/60 text-gray-300 hover:bg-primary/20 hover:text-primary border-primary/20'
      }">
        ${m}
      </button>
    `).join('');

    monthBarContainer.querySelectorAll('.month-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentMonthFilter = btn.dataset.month;
        monthBarContainer.querySelectorAll('.month-tab-btn').forEach(b => {
          const active = b.dataset.month === currentMonthFilter;
          b.className = `month-tab-btn flex-shrink-0 px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 border ${
            active
              ? 'font-bold bg-primary text-black shadow-md border-primary'
              : 'font-medium bg-surface-variant/60 text-gray-300 hover:bg-primary/20 hover:text-primary border-primary/20'
          }`;
        });
        renderEvents();
      });
    });
  }

  // ── Category Filter ─────────────────────────────────────────────────────
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => {
        b.classList.remove('bg-primary','text-black','font-bold');
        b.classList.add('bg-surface-variant','text-gray-300','font-medium');
      });
      btn.classList.add('bg-primary','text-black','font-bold');
      btn.classList.remove('bg-surface-variant','text-gray-300','font-medium');
      currentCategoryFilter = btn.dataset.category || 'all';
      renderEvents();
    });
  });

  // ── Search ──────────────────────────────────────────────────────────────
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      renderEvents();
    });
  }

  // ── Render Events ───────────────────────────────────────────────────────
  function renderEvents() {
    if (!eventsGridContainer) return;

    const eventsData = (typeof YEAR_EVENTS_DATA !== 'undefined') ? YEAR_EVENTS_DATA : [];

    const filtered = eventsData.filter(ev => {
      const matchMonth = currentMonthFilter === "All Months" || ev.month === currentMonthFilter;
      const matchCat   = currentCategoryFilter === "all" || ev.category === currentCategoryFilter;
      const q = currentSearchQuery;
      const matchSearch = !q ||
        ev.title.toLowerCase().includes(q) ||
        ev.location.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q) ||
        ev.tithi.toLowerCase().includes(q);
      return matchMonth && matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      eventsGridContainer.innerHTML = `
        <div class="col-span-full text-center py-16 bg-surface-variant/40 border border-primary/20 rounded-2xl">
          <span class="text-4xl mb-3 block">🕉️</span>
          <h3 class="text-lg font-serif text-primary font-semibold">No Events Found</h3>
          <p class="text-sm text-gray-400 mt-1">Try adjusting your month, category, or search.</p>
        </div>`;
      return;
    }

    eventsGridContainer.innerHTML = filtered.map(ev => `
      <div class="bg-surface-variant/60 border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
        <div class="relative h-48 overflow-hidden">
          <img src="${ev.image}" alt="${ev.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
          <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div class="absolute top-3 left-3 bg-black/80 border border-primary/40 px-3 py-1 rounded-full text-[11px] font-mono text-primary">
            📅 ${ev.date}
          </div>
          <div class="absolute top-3 right-3 bg-primary/90 text-black px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
            ${ev.month}
          </div>
        </div>
        <div class="p-6">
          <div class="text-[11px] font-serif tracking-widest text-primary uppercase mb-1 font-semibold">
            ${ev.tithi} &bull; ${ev.location}
          </div>
          <h3 class="font-serif text-lg text-white font-bold mb-2 group-hover:text-primary transition-colors">
            ${ev.title}
          </h3>
          <p class="text-xs text-gray-300 leading-relaxed mb-4">
            ${ev.description}
          </p>
          <a href="ritual-detail.html?event=${ev.id}" class="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline">
            View Ritual Specifications &amp; Guides →
          </a>
        </div>
      </div>
    `).join('');
  }

  // ── Restoration Toggle (index.html unified page) ────────────────────────
  const toggleBtn  = document.getElementById('toggle-restoration');
  const viewImg    = document.getElementById('restoration-view-img');
  const statusTag  = document.getElementById('restoration-status-tag');

  if (toggleBtn && viewImg && statusTag) {
    let isRestored = true;
    const vintageImg  = "https://images.unsplash.com/photo-1601042879364-b8f6a1039de5?auto=format&fit=crop&w=1200&q=80";
    const restoredImg = "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=1200&q=90";

    toggleBtn.addEventListener('click', () => {
      isRestored = !isRestored;
      viewImg.src = isRestored ? restoredImg : vintageImg;
      statusTag.textContent = isRestored
        ? "RESTORED (2025 Precision State)"
        : "VINTAGE ARCHIVE (Pre-Restoration)";
      statusTag.style.color = isRestored ? "#D4AF37" : "#94a3b8";
      statusTag.style.borderColor = isRestored ? "#D4AF37" : "#94a3b8";
    });
  }

  // Initial render
  renderEvents();
});
