/**
 * STORIES BY GSB - FULL YEAR CALENDAR & EVENTS SYSTEM
 * Powered by Supabase Real-Time Database with Admin Moderation Queue!
 */

document.addEventListener('DOMContentLoaded', () => {
  const months = ["All Months","January","February","March","April","May","June","July","August","September","October","November","December"];

  let currentMonthFilter = "All Months";
  let currentCategoryFilter = "all";
  let currentSearchQuery = "";

  // Check if Admin Mode is active via URL query parameter ?admin=true or ?admin=gsb
  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.has('admin') || localStorage.getItem('gsb_admin_mode') === 'true';

  if (urlParams.has('admin')) {
    localStorage.setItem('gsb_admin_mode', 'true');
  }

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

  // Form Submit Handler (Saves as is_approved: false pending admin review)
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
        description: description,
        is_approved: false // Pending Admin Approval!
      };

      let savedToSupabase = false;
      if (typeof supabaseClient !== 'undefined' && supabaseClient) {
        try {
          const { data, error } = await supabaseClient
            .from('events')
            .insert([newEventObj]);
          
          if (!error) {
            savedToSupabase = true;
          } else {
            console.warn("Supabase insert error:", error);
          }
        } catch (err) {
          console.warn("Supabase insert exception:", err);
        }
      }

      if (!savedToSupabase) {
        saveLocalEvent({ ...newEventObj, id: 'user-ev-' + Date.now(), isUserSubmitted: true });
      }

      addEventForm.reset();
      hideModal();

      await renderEvents();
      alert("✨ Event submitted! Your event has been sent to the admin moderation queue and will appear publicly once approved.");
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

  // ── Admin Actions (Approve / Delete) ────────────────────────────────────
  window.approveSupabaseEvent = async (id) => {
    if (typeof supabaseClient !== 'undefined' && supabaseClient) {
      try {
        const { error } = await supabaseClient
          .from('events')
          .update({ is_approved: true })
          .eq('id', id);
        
        if (!error) {
          alert("✅ Event approved and published live!");
          renderEvents();
        } else {
          alert("Approval error: " + error.message);
        }
      } catch (e) {
        alert("Error approving event: " + e.message);
      }
    }
  };

  window.deleteSupabaseEvent = async (id) => {
    if (!confirm("Are you sure you want to delete this event submission?")) return;
    
    if (typeof supabaseClient !== 'undefined' && supabaseClient) {
      try {
        const { error } = await supabaseClient
          .from('events')
          .delete()
          .eq('id', id);
        
        if (!error) {
          alert("🗑️ Event deleted.");
          renderEvents();
        } else {
          alert("Delete error: " + error.message);
        }
      } catch (e) {
        alert("Error deleting event: " + e.message);
      }
    }
  };

  window.exitAdminMode = () => {
    localStorage.removeItem('gsb_admin_mode');
    window.location.href = window.location.pathname;
  };

  // ── Render Events ───────────────────────────────────────────────────────
  async function renderEvents() {
    if (!eventsGridContainer) return;

    let supabaseEvents = [];
    let pendingEvents = [];

    // Fetch from Supabase
    if (typeof supabaseClient !== 'undefined' && supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('events')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (!error && data) {
          data.forEach(item => {
            if (item.is_approved === true) {
              supabaseEvents.push({ ...item, isUserSubmitted: true });
            } else if (isAdmin) {
              pendingEvents.push(item);
            }
          });
        }
      } catch (err) {
        console.warn("Error fetching Supabase events:", err);
      }
    }

    // Render Admin Moderation Banner if Admin Mode is Active
    const adminBannerContainer = document.getElementById('admin-moderation-banner');
    if (adminBannerContainer) {
      if (isAdmin) {
        adminBannerContainer.innerHTML = `
          <div class="mb-10 bg-amber-500/10 border-2 border-amber-500/60 rounded-3xl p-6 shadow-2xl relative">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-amber-500/30">
              <div class="flex items-center gap-3">
                <span class="text-2xl">🛡️</span>
                <div>
                  <h3 class="font-serif text-lg text-amber-400 font-bold">Admin Moderation Panel</h3>
                  <p class="text-xs text-gray-300">You are in Admin Mode. ${pendingEvents.length} pending event(s) waiting for your approval.</p>
                </div>
              </div>
              <button onclick="exitAdminMode()" class="px-4 py-1.5 bg-surface border border-amber-500/40 text-amber-400 text-xs rounded-full hover:bg-amber-500 hover:text-black transition-all">
                Exit Admin Mode
              </button>
            </div>

            ${pendingEvents.length === 0 ? `
              <p class="text-xs text-gray-400 mt-4 italic text-center py-4">No pending submissions awaiting review.</p>
            ` : `
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                ${pendingEvents.map(p => `
                  <div class="bg-background/80 border border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <div class="flex items-center justify-between gap-2 mb-1">
                        <span class="text-[10px] font-mono text-amber-400">📅 ${p.date} • ${p.month}</span>
                        <span class="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">PENDING REVIEW</span>
                      </div>
                      <h4 class="font-serif font-bold text-white text-base">${p.title}</h4>
                      <p class="text-xs text-gray-400 mt-1 line-clamp-2">${p.description}</p>
                      <span class="text-[10px] text-gray-500 block mt-2">📍 ${p.location}</span>
                    </div>

                    <div class="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-primary/10">
                      <button onclick="deleteSupabaseEvent('${p.id}')" class="px-3 py-1.5 bg-red-500/20 border border-red-500/40 text-red-300 text-xs rounded-xl hover:bg-red-500 hover:text-white transition-all">
                        🗑️ Reject & Delete
                      </button>
                      <button onclick="approveSupabaseEvent('${p.id}')" class="px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 text-xs font-bold rounded-xl hover:bg-emerald-500 hover:text-black transition-all">
                        ✅ Approve & Publish Live
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>
        `;
      } else {
        adminBannerContainer.innerHTML = '';
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
      <div class="${ev.isUserSubmitted ? 'bg-surface-variant/80 border-2 border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.25)]' : 'bg-surface-variant/60 border border-primary/20'} rounded-2xl overflow-hidden hover:border-primary/60 transition-all duration-300 hover:-translate-y-1 shadow-lg group flex flex-col justify-between relative">
        <div>
          <div class="relative h-48 overflow-hidden">
            <img src="${ev.image || 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=600&q=80'}" onerror="this.onerror=null; this.src='${ev.fallbackImage || ev.image || 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=600&q=80'}'" alt="${ev.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div class="absolute top-3 left-3 bg-black/80 border border-primary/40 px-3 py-1 rounded-full text-[11px] font-mono text-primary flex items-center gap-1.5 shadow-md">
              <span>📅</span> <span>${ev.date}</span>
            </div>
            <div class="absolute top-3 right-3 bg-primary/90 text-black px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase shadow-md">
              ${ev.month}
            </div>
            ${ev.isUserSubmitted ? `
              <div class="absolute bottom-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider shadow-lg flex items-center gap-1">
                <span>🌟</span> <span>Community Submission</span>
              </div>
            ` : ''}
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between gap-2 mb-1">
              <div class="text-[11px] font-serif tracking-widest text-primary uppercase font-semibold">
                ${ev.tithi || ''} &bull; ${ev.location}
              </div>
              ${ev.isUserSubmitted ? `<span class="text-[9px] text-amber-400 font-mono bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">Devotee Contributed</span>` : ''}
            </div>
            <h3 class="font-serif text-lg text-white font-bold mb-2 group-hover:text-primary transition-colors">
              ${ev.title}
            </h3>
            <p class="text-xs text-gray-300 leading-relaxed mb-4">
              ${ev.description}
            </p>
          </div>
        </div>
        <div class="px-6 pb-6 pt-0 flex items-center justify-between">
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
