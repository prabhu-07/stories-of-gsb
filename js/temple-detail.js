/**
 * STORIES BY GSB - DYNAMIC TEMPLE DETAIL RENDERER
 * 
 * Reads ?id=... from the URL and dynamically renders temple details,
 * images, restoration statistics, and historical inscriptions!
 */

document.addEventListener('DOMContentLoaded', () => {
  // Parse URL query parameter ?id=...
  const urlParams = new URLSearchParams(window.location.search);
  const templeId = urlParams.get('id') || 'mangeshi';

  // Find temple data from TEMPLES_DATA (defined in js/data.js)
  const temple = (typeof TEMPLES_DATA !== 'undefined' ? TEMPLES_DATA : []).find(t => t.id === templeId) || TEMPLES_DATA[0];

  if (!temple) return;

  // Update Page Title & Metadata
  document.title = `${temple.name} | Stories by GSB`;

  // Update DOM elements if present
  const titleElems = document.querySelectorAll('.temple-name-target');
  titleElems.forEach(el => el.textContent = temple.name);

  const locElem = document.getElementById('temple-location-target');
  if (locElem) locElem.textContent = temple.location;

  const descElem = document.getElementById('temple-desc-target');
  if (descElem) descElem.textContent = temple.description;

  const deityElem = document.getElementById('temple-deity-target');
  if (deityElem) deityElem.textContent = temple.deity;

  const estElem = document.getElementById('temple-established-target');
  if (estElem) estElem.textContent = temple.established;

  const archElem = document.getElementById('temple-architecture-target');
  if (archElem) archElem.textContent = temple.architecture;

  const restoYearElem = document.getElementById('temple-resto-year-target');
  if (restoYearElem) restoYearElem.textContent = temple.restorationYear;

  const restoDetailElem = document.getElementById('temple-resto-details-target');
  if (restoDetailElem) restoDetailElem.textContent = temple.restorationDetails;

  // Update Hero & Restoration Images
  const mainImg = document.getElementById('temple-hero-img');
  if (mainImg) mainImg.src = temple.image;

  const restoImg = document.getElementById('restoration-view-img');
  if (restoImg) restoImg.src = temple.restoredImage || temple.image;

  // Before / After Toggle state
  const toggleBtn = document.getElementById('toggle-restoration');
  const restoStatus = document.getElementById('restoration-status-tag');

  if (toggleBtn && restoImg) {
    let isRestored = true;
    toggleBtn.addEventListener('click', () => {
      isRestored = !isRestored;
      if (isRestored) {
        restoImg.src = temple.restoredImage || temple.image;
        if (restoStatus) restoStatus.textContent = `RESTORED (${temple.restorationYear})`;
        toggleBtn.textContent = "View Vintage Archival State";
      } else {
        restoImg.src = temple.vintageImage || temple.image;
        if (restoStatus) restoStatus.textContent = "VINTAGE ARCHIVAL STATE (Original soot & stonework)";
        toggleBtn.textContent = "View Restored Precision State";
      }
    });
  }
});
