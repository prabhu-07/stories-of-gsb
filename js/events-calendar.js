/**
 * STORIES BY GSB - FULL YEAR CALENDAR & EVENTS SYSTEM
 * 
 * Renders the 12-month calendar grid, filterable by month (Jan - Dec)
 * or category, with search functionality.
 */

document.addEventListener('DOMContentLoaded', () => {
  const months = ["All Months", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  let currentMonthFilter = "All Months";
  let currentCategoryFilter = "all";
  let currentSearchQuery = "";

  const monthBarContainer = document.getElementById('month-selector-bar');
  const eventsGridContainer = document.getElementById('events-cards-grid');
  const searchInput = document.getElementById('event-search-input');
  const categoryBtns = document.querySelectorAll('.event-cat-btn');

  // Render 12-Month Bar
  if (monthBarContainer) {
    monthBarContainer.innerHTML = months.map(m => `
      <button data-month="${m}" class="month-tab-btn px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 font-medium ${m === currentMonthFilter ? 'bg-[#D4AF37] text-black font-bold shadow-md' : 'bg-surface-variant/60 text-gray-300 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] border border-primary/20'}">
        ${m}
      </button>
    `).join('');

    // Bind click handlers to month buttons
    document.querySelectorAll('.month-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentMonthFilter = btn.dataset.month;
        document.querySelectorAll('.month-tab-btn').forEach(b => {
          if (b.dataset.month === currentMonthFilter) {
            b.className = 'month-tab-btn px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 font-bold bg-[#D4AF37] text-black shadow-md';
          } else {
            b.className = 'month-tab-btn px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 font-medium bg-surface-variant/60 text-gray-300 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] border border-primary/20';
          }
        });
        renderEvents();
      });
    });
  }

  // Bind Category Filter Buttons
  if (categoryBtns) {
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active-cat', 'bg-[#D4AF37]', 'text-black'));
        btn.classList.add('active-cat', 'bg-[#D4AF37]', 'text-black');
        currentCategoryFilter = btn.dataset.category || 'all';
        renderEvents();
      });
    });
  }

  // Bind Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      renderEvents();
    });
  }

  // Render Event Cards Function
  function renderEvents() {
    if (!eventsGridContainer) return;

    const eventsData = typeof YEAR_EVENTS_DATA !== 'undefined' ? YEAR_EVENTS_DATA : [];

    const filtered = eventsData.filter(ev => {
      const matchesMonth = (currentMonthFilter === "All Months" || ev.month === currentMonthFilter);
      const matchesCat = (currentCategoryFilter === "all" || ev.category === currentCategoryFilter);
      const matchesSearch = (!currentSearchQuery || 
        ev.title.toLowerCase().includes(currentSearchQuery) || 
        ev.location.toLowerCase().includes(currentSearchQuery) || 
        ev.description.toLowerCase().includes(currentSearchQuery) || 
        ev.tithi.toLowerCase().includes(currentSearchQuery)
      );

      return matchesMonth && matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      eventsGridContainer.innerHTML = `
        <div class="col-span-full text-center py-16 bg-surface-variant/40 border border-primary/20 rounded-2xl">
          <span class="text-4xl mb-3 block">🕉️</span>
          <h3 class="text-lg font-serif text-[#D4AF37] font-semibold">No Events Found</h3>
          <p class="text-sm text-gray-400 mt-1">Try adjusting your month selection, category filter, or search query.</p>
        </div>
      `;
      return;
    }

    eventsGridContainer.innerHTML = filtered.map(ev => `
      <div class="luxury-event-card bg-surface-variant/60 border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/60 transition-all duration-300 hover:-translate-y-1.5 shadow-lg group">
        <div class="relative h-48 overflow-hidden">
          <img src="${ev.image}" alt="${ev.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
          <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <div class="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 px-3 py-1 rounded-full text-[11px] font-mono text-[#D4AF37]">
            📅 ${ev.date}
          </div>
          <div class="absolute top-3 right-3 bg-[#D4AF37]/90 text-black px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
            ${ev.month}
          </div>
        </div>
        <div class="p-6">
          <div class="text-[11px] font-serif tracking-widest text-[#D4AF37] uppercase mb-1">
            ${ev.tithi} • ${ev.location}
          </div>
          <h3 class="font-serif text-lg text-white font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">
            ${ev.title}
          </h3>
          <p class="text-xs text-gray-300 line-clamp-3 leading-relaxed mb-4">
            ${ev.description}
          </p>
          <a href="ritual-detail.html?event=${ev.id}" class="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] hover:underline">
            View Ritual Specifications & Guides →
          </a>
        </div>
      </div>
    `).join('');
  }

  // Initial render
  renderEvents();
});
