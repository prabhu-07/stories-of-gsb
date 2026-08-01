/**
 * STORIES BY GSB - SACRED LENS LUXURY PORTFOLIO
 * Unified JS Single-Page Router & Interactive Engine
 */

(function() {
  'use strict';

  const SCREENS = {
    'master': { title: 'Stories by GSB | Master Experience (Unified)', id: 'f3fcd509ec1248b29098051306b5ba3b' },
    'home': { title: 'Stories by GSB | Home (Vision Integrated)', id: 'a3f89b9d75084a6cb84ca24f94a327f9' },
    'rituals': { title: 'Stories by GSB | Rituals & Festivals', id: 'c49ddbe24b9843ce80119f3ce87a2d23' },
    'ritual-detail': { title: 'Stories by GSB | Ritual Detail View', id: '1ac70cd9a84548fbaed809e0d9a4e76e' },
    'temples': { title: 'Stories by GSB | Temples (Hover Overlays)', id: 'c4b988c18a0545f6b3e24cfd3da8d9f8' },
    'temple-detail': { title: 'Stories by GSB | Temple Detail (Restored)', id: 'e9c5e36286184b86bfbf4e0b11de877f' }
  };

  function getRouteFromHash() {
    const hash = window.location.hash.replace('#', '').trim();
    return SCREENS[hash] ? hash : 'master';
  }

  function navigateToScreen(screenId, pushState = true) {
    const targetScreen = SCREENS[screenId] ? screenId : 'master';

    // Hide all screen sections
    const allScreens = document.querySelectorAll('.spa-screen');
    allScreens.forEach(sec => {
      sec.style.display = 'none';
      sec.classList.remove('active-screen');
    });

    // Show selected screen section
    const activeSec = document.getElementById(`spa-screen-${targetScreen}`);
    if (activeSec) {
      activeSec.style.display = 'block';
      setTimeout(() => {
        activeSec.classList.add('active-screen');
      }, 10);
    }

    // Update active state on navigation buttons & tabs
    document.querySelectorAll('.spa-nav-link').forEach(btn => {
      const route = btn.getAttribute('data-route');
      if (route === targetScreen) {
        btn.classList.add('bg-[#D4AF37]', 'text-black', 'font-bold');
        btn.classList.remove('text-gray-300', 'hover:text-primary');
      } else {
        btn.classList.remove('bg-[#D4AF37]', 'text-black', 'font-bold');
        btn.classList.add('text-gray-300');
      }
    });

    // Update active screen badge info
    const badgeElem = document.getElementById('active-stitch-id');
    if (badgeElem && SCREENS[targetScreen]) {
      badgeElem.textContent = `${SCREENS[targetScreen].id.substring(0, 8)}...`;
      badgeElem.title = `Stitch Screen ID: ${SCREENS[targetScreen].id}`;
    }

    // Update URL hash
    if (pushState && window.location.hash !== `#${targetScreen}`) {
      window.location.hash = targetScreen;
    }

    // Update Document Title
    document.title = SCREENS[targetScreen].title;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Initialize Router on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    // Intercept hash changes
    window.addEventListener('hashchange', () => {
      navigateToScreen(getRouteFromHash(), false);
    });

    // Intercept click on data-route links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-route]');
      if (link) {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        navigateToScreen(route, true);
      }
    });

    // Initial navigation
    navigateToScreen(getRouteFromHash(), false);
  });
})();
