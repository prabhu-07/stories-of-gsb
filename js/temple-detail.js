/**
 * STORIES BY GSB - DYNAMIC TEMPLE DETAIL RENDERER
 * 
 * Reads ?id=... from the URL and dynamically renders temple details,
 * images, restoration statistics, contact info, Instagram links, and Google Drive albums!
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Parse URL query parameter ?id=...
  const urlParams = new URLSearchParams(window.location.search);
  const templeId = urlParams.get('id') || 'mangeshi';

  // Find temple data from dynamic getAllTemples() or TEMPLES_DATA
  let temple = null;
  if (typeof getTempleById === 'function') {
    temple = await getTempleById(templeId);
  } else if (typeof TEMPLES_DATA !== 'undefined') {
    temple = TEMPLES_DATA.find(t => t.id === templeId) || TEMPLES_DATA[0];
  }

  if (!temple) return;

  // Update Page Title & Metadata
  document.title = `${temple.name} | Stories by GSB`;

  // Update DOM elements if present
  const titleElems = document.querySelectorAll('.temple-name-target, #temple-hero-title');
  titleElems.forEach(el => el.textContent = temple.name);

  const locElem = document.getElementById('temple-location-target');
  if (locElem) locElem.textContent = temple.location;

  const descElem = document.getElementById('temple-desc-target');
  if (descElem) descElem.textContent = temple.description;

  const deityElem = document.getElementById('temple-deity-target');
  if (deityElem) deityElem.textContent = temple.deity || 'GSB Kuladevata';

  const estElem = document.getElementById('temple-established-target');
  if (estElem) estElem.textContent = temple.established || 'Ancient Heritage';

  const archElem = document.getElementById('temple-architecture-target');
  if (archElem) archElem.textContent = temple.architecture || 'Saraswat Dravidian Fusion';

  const restoYearElem = document.getElementById('temple-resto-year-target');
  if (restoYearElem) restoYearElem.textContent = temple.restorationYear || 'Preserved';

  const restoDetailElem = document.getElementById('temple-resto-details-target');
  if (restoDetailElem) restoDetailElem.textContent = temple.restorationDetails || temple.description;

  // Update Hero & Restoration Images
  const mainPhoto = temple.image || (temple.images && temple.images[0]) || temple.fallbackImage;
  const mainImg = document.getElementById('temple-hero-img');
  if (mainImg && mainPhoto) {
    mainImg.src = (typeof normalizeImageUrl === 'function') ? normalizeImageUrl(mainPhoto) : mainPhoto;
  }

  const restoImg = document.getElementById('restoration-view-img');
  if (restoImg) {
    const rPhoto = temple.restoredImage || mainPhoto;
    restoImg.src = (typeof normalizeImageUrl === 'function') ? normalizeImageUrl(rPhoto) : rPhoto;
  }

  // Google Maps Direction button
  const mapButtons = document.querySelectorAll('button:has(.material-symbols-outlined), a[data-map-btn]');
  mapButtons.forEach(btn => {
    if (btn.textContent.includes('Google Maps') || btn.textContent.includes('Directions')) {
      btn.addEventListener('click', () => {
        const url = temple.geoLocationUrl || `https://maps.google.com/?q=${encodeURIComponent(temple.name + ' ' + (temple.location || ''))}`;
        window.open(url, '_blank');
      });
    }
  });

  // Inject Contact Info & Instagram link in sidebar/header if elements exist
  const sidebar = document.querySelector('aside .etched-border');
  if (sidebar) {
    let extraHtml = '';
    
    if (temple.contactInfo) {
      extraHtml += `
        <div class="pt-4 border-t border-primary/20">
          <h5 class="text-xs uppercase tracking-widest text-primary font-semibold mb-2">📞 Contact Info</h5>
          <p class="text-xs text-on-surface-variant leading-relaxed">${temple.contactInfo}</p>
        </div>
      `;
    }

    if (temple.instaLink) {
      extraHtml += `
        <div class="pt-4 border-t border-primary/20">
          <a href="${temple.instaLink}" target="_blank" rel="noopener noreferrer"
             class="flex items-center justify-center gap-2 w-full py-3 bg-pink-600/20 text-pink-300 border border-pink-500/40 rounded-lg text-xs font-bold hover:bg-pink-600 hover:text-white transition-all">
            <span>📷</span> <span>Follow on Instagram</span>
          </a>
        </div>
      `;
    }

    if (temple.driveFolderUrl) {
      extraHtml += `
        <div class="pt-4 border-t border-primary/20">
          <a href="${temple.driveFolderUrl}" target="_blank" rel="noopener noreferrer"
             class="flex items-center justify-center gap-2 w-full py-3 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-bold hover:bg-amber-500 hover:text-black transition-all">
            <span>📁</span> <span>Google Drive Photo Archive</span>
          </a>
        </div>
      `;
    }

    if (extraHtml) {
      sidebar.insertAdjacentHTML('beforeend', extraHtml);
    }
  }

  // Before / After Toggle state
  const toggleBtn = document.getElementById('toggle-restoration');
  const restoStatus = document.getElementById('restoration-status-tag');

  if (toggleBtn && restoImg) {
    let isRestored = true;
    toggleBtn.addEventListener('click', () => {
      isRestored = !isRestored;
      if (isRestored) {
        restoImg.src = temple.restoredImage || mainPhoto;
        if (restoStatus) restoStatus.textContent = `RESTORED (${temple.restorationYear || 'Current'})`;
        toggleBtn.textContent = "View Vintage Archival State";
      } else {
        restoImg.src = temple.vintageImage || mainPhoto;
        if (restoStatus) restoStatus.textContent = "VINTAGE ARCHIVAL STATE (Original soot & stonework)";
        toggleBtn.textContent = "View Restored Precision State";
      }
    });
  }
});
