/**
 * STORIES BY GSB - FULL YEAR CALENDAR & EVENTS SYSTEM
 * Compatible with unified index.html scroll section AND standalone rituals.html
 * Powered by Supabase Real-Time Database with LocalStorage & Static Fallbacks!
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

  // Viewer Add Event Modal Elements
  const openModalBtn = document.getElementById('open-add-event-modal');
  const closeModalBtn = document.getElementById('close-add-event-modal');
  const cancelModalBtn = document.getElementById('cancel-add-event-modal');
  const addEventModal = document.getElementById('add-event-modal');
  const addEventForm = document.getElementById('add-event-form');

  // LocalStorage Fallback Helpers
  function getLocalEvents() {
    try {
      const stored = localStorage.getItem('user_submitted_events');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function saveLocalEvent(ev) {
    try {
      const current = getLocalEvents();
      current.unshift(ev);
      localStorage.setItem('user_submitted_events', JSON.stringify(current));
    } catch (e) {}
  }

  // ── Modal Handlers ──────────────────────────────────────────────────────
  if (openModalBtn && addEventModal) {
    openModalBtn.addEventListener('click', () => {
      addEventModal.classList.remove('hidden');
      addEventModal.classList.add('flex');
    });
  }

  const hideModal = () => {
    if (addEventModal) {
      addEventModal.classList.add('hidden');
      addEventModal.classList.remove('flex');
    }
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', hideModal);

  if (addEventModal) {
    addEventModal.addEventListener('click', (e) => {
      if (e.target === addEventModal) hideModal();
    });
  }

  // Form Submit Handler (Saves to Supabase if configured, or LocalStorage)
  if (addEventForm) {
    addEventForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const title = document.getElementById('new-event-title').value.trim();
      const month = document.getElementById('new-event-month').value;
      const date = document.getElementById('new-event-date').value.trim();
      const tithi = document.getElementById('new-event-tithi').value.trim() || 'Community Offering';
      const category = document.getElementById('new-event-category').value;
      const location = document.getElementById('new-event-location').value.trim();
      const description = document.getElementById('new-event-description').value.trim();
      const customImg = document.getElementById('new-event-image').value.trim();

      if (!title || !month || !date || !location || !description) {
        alert("Please fill in all required fields!");
        return;
      }

      const newEventObj = {
        month: month,
        date: date,
        tithi: tithi,
        title: title,
        category: category,
        location: location,
        image: customImg || "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=600&q=80",
        fallbackImage: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=600&q=80",
        description: description,
        isUserSubmitted: true
      };

      // 1. Try Supabase Insert
      let savedToSupabase = false;
      if (typeof supabaseClient !== 'undefined' && supabaseClient) {
        try {
          const { data, error } = await supabaseClient
            .from('events')
            .insert([{
              month: newEventObj.month,
              date: newEventObj.date,
              tithi: newEventObj.tithi,
              title: newEventObj.title,
              category: newEventObj.category,
              location: newEventObj.location,
              description: newEventObj.description,
              image: newEventObj.image
            }]);
          
          if (!error) {
            savedToSupabase = true;
            console.log("⚡ Event successfully saved to Supabase cloud database!");
          } else {
            console.warn("Supabase insert error:", error);
          }
        } catch (err) {
          console.warn("Supabase insert exception:", err);
        }
      }

      // 2. LocalStorage Fallback if Supabase not configured yet
      if (!savedToSupabase) {
        saveLocalEvent({ ...newEventObj, id: 'user-ev-' + Date.now() });
      }

      addEventForm.reset();
      hideModal();

      currentMonthFilter = month;
      
      if (monthBarContainer) {
        monthBarContainer.querySelectorAll('.month-tab-btn').forEach(b => {
          const active = b.dataset.month === currentMonthFilter;
          b.className = `month-tab-btn flex-shrink-0 px-4 py-2 rounded-full text-xs tracking-wider uppercase transition-all duration-300 border ${
            active
              ? 'font-bold bg-primary text-black shadow-md border-primary'
              : 'font-medium bg-surface-variant/60 text-gray-300 hover:bg-primary/20 hover:text-primary border-primary/20'
          }`;
        });
      }

      await renderEvents();
      alert("✨ Event submitted successfully!");
    });
  }

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

  // ── Render Events (Fetches Supabase + LocalStorage + Static Data) ───────
  async function renderEvents() {
    if (!eventsGridContainer) return;

    let supabaseEvents = [];

    // Fetch from Supabase if active
    if (typeof supabaseClient !== 'undefined' && supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('events')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          supabaseEvents = data.map(item => ({
            ...item,
            isUserSubmitted: true
          }));
        }
      } catch (err) {
        console.warn("Error fetching Supabase events:", err);
      }
    }

    const staticEvents = (typeof YEAR_EVENTS_DATA !== 'undefined') ? YEAR_EVENTS_DATA : [];
    const localEvents  = getLocalEvents();

    const allEvents = [...supabaseEvents, ...localEvents, ...staticEvents];

    const filtered = allEvents.filter(ev => {
      const matchMonth = currentMonthFilter === "All Months" || ev.month === currentMonthFilter;
      const matchCat   = currentCategoryFilter === "all" || ev.category === currentCategoryFilter;
      const q = currentSearchQuery;
      const matchSearch = !q ||
        (ev.title && ev.title.toLowerCase().includes(q)) ||
        (ev.location && ev.location.toLowerCase().includes(q)) ||
        (ev.description && ev.description.toLowerCase().includes(q)) ||
        (ev.tithi && ev.tithi.toLowerCase().includes(q));
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
      <div class="bg-surface-variant/60 border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 shadow-lg group flex flex-col justify-between">
        <div>
          <div class="relative h-48 overflow-hidden">
            <img src="${ev.image || 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=600&q=80'}" onerror="this.onerror=null; this.src='${ev.fallbackImage || ev.image || 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=600&q=80'}'" alt="${ev.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div class="absolute top-3 left-3 bg-black/80 border border-primary/40 px-3 py-1 rounded-full text-[11px] font-mono text-primary flex items-center gap-1.5">
              <span>📅</span> <span>${ev.date}</span>
            </div>
            <div class="absolute top-3 right-3 bg-primary/90 text-black px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
              ${ev.month}
            </div>
            ${ev.isUserSubmitted ? `
              <div class="absolute bottom-3 left-3 bg-amber-500/90 text-black font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider">
                Community Submission
              </div>
            ` : ''}
          </div>
          <div class="p-6">
            <div class="text-[11px] font-serif tracking-widest text-primary uppercase mb-1 font-semibold">
              ${ev.tithi || ''} &bull; ${ev.location}
            </div>
            <h3 class="font-serif text-lg text-white font-bold mb-2 group-hover:text-primary transition-colors">
              ${ev.title}
            </h3>
            <p class="text-xs text-gray-300 leading-relaxed mb-4">
              ${ev.description}
            </p>
          </div>
        </div>
        <div class="px-6 pb-6 pt-0">
          <a href="ritual-detail.html?event=${ev.id || ''}" class="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline">
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
