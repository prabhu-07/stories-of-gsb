/**
 * ══════════════════════════════════════════════════════════════════
 * STORIES BY GSB — CENTRALIZED DATA CONFIGURATION
 * ══════════════════════════════════════════════════════════════════
 * 
 * ▸ CLOUDINARY CLOUD NAME: a1g89w9n
 * 
 * ▸ HOW TO ADD / CHANGE IMAGES:
 *   1. Go to https://console.cloudinary.com/pm/a1g89w9n/media-explorer
 *   2. Upload your temple image(s)
 *   3. Use the following naming convention for the "Public ID":
 * 
 *        {templename}{number}
 *        e.g. kochitirumaladevesowm1, kochitirumaladevesowm2
 *             shrimangeshi1, shrimangeshi2
 *             shrishantadurga1, shrishantadurga2
 * 
 *   4. After uploading, the images will auto-display on the website!
 *      Cloudinary URL format used:
 *      https://res.cloudinary.com/a1g89w9n/image/upload/f_auto,q_auto,w_800/{publicId}
 * 
 * ▸ HOW TO EDIT DESCRIPTIONS:
 *   Just change the text in "description" fields below.
 * 
 * ▸ HOW TO ADD A NEW TEMPLE:
 *   Copy any temple object below, change the id/name/images/description,
 *   upload matching images to Cloudinary, and save this file.
 * 
 * ══════════════════════════════════════════════════════════════════
 */

// ── Cloudinary Helper ─────────────────────────────────────────────
const CLOUD_NAME = "a1g89w9n";

/**
 * Build an optimized Cloudinary image URL.
 * @param {string} publicId  — The public ID you gave the image in Cloudinary
 * @param {object} opts      — Optional overrides { width, height, quality, format }
 * @returns {string}         — Full Cloudinary delivery URL
 */
function cloudImg(publicId, opts = {}) {
  const w = opts.width  || 800;
  const q = opts.quality || "auto";
  const f = opts.format  || "auto";
  const extra = opts.height ? `,h_${opts.height},c_fill` : ",c_fill";
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_${f},q_${q},w_${w}${extra}/${publicId}`;
}

// ── Image Normalizer (Cloudinary, Google Drive, Direct URLs) ───────
/**
 * Converts any input into a direct renderable image URL.
 * Handles:
 * - Google Drive shared image links (e.g. drive.google.com/file/d/ID/view)
 * - Cloudinary public IDs (e.g. "kochitirumaladevesowm1")
 * - Direct HTTP/HTTPS URLs (e.g. Unsplash, Imgur, Cloudinary CDN)
 */
function normalizeImageUrl(src) {
  if (!src || typeof src !== 'string') return "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=1200&q=80";
  src = src.trim();
  if (!src) return "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=1200&q=80";

  // Google Drive File Link Handler
  const driveFileRegex = /drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/i;
  const driveMatch = src.match(driveFileRegex);
  if (driveMatch && driveMatch[1]) {
    const fileId = driveMatch[1];
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  // Direct Web URL
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:') || src.startsWith('assets/')) {
    return src;
  }

  // Cloudinary Public ID fallback
  return cloudImg(src);
}

/**
 * Checks if a string is a Google Drive folder link
 */
function isGoogleDriveFolder(url) {
  if (!url || typeof url !== 'string') return false;
  return /drive\.google\.com\/(?:drive\/folders\/|drive\/u\/\d+\/folders\/|open\?id=)/i.test(url);
}

// Thumbnail helper (small cards / event cards)
function cloudThumb(publicId) {
  if (publicId && (publicId.startsWith('http') || publicId.includes('drive.google.com'))) {
    return normalizeImageUrl(publicId);
  }
  return cloudImg(publicId, { width: 600, quality: "auto" });
}

// Hero-size helper (large banners)
function cloudHero(publicId) {
  if (publicId && (publicId.startsWith('http') || publicId.includes('drive.google.com'))) {
    return normalizeImageUrl(publicId);
  }
  return cloudImg(publicId, { width: 1400, quality: "90" });
}


// ══════════════════════════════════════════════════════════════════
//  TEMPLES DATA
// ══════════════════════════════════════════════════════════════════

const TEMPLES_DATA = [
  {
    id: "kochi-tirumala",
    name: "Kochi Thirumala Devaswom Temple",
    subtitle: "Malabar Saraswat Cultural & Spiritual Center",
    location: "Gosripuram, Mattancherry, Kochi, Kerala",
    established: "1568 AD",
    deity: "Lord Gosripuram Venkatachalapathy",
    architecture: "Kerala & Saraswat Temple Architecture Fusion",
    restorationYear: "2024 Copper Roof & Sanctum Restoration",
    // ─── Cloudinary Images ─────────────────────────────────────
    //  Upload to Cloudinary with Public IDs:
    //    kochitirumaladevesowm1
    //    kochitirumaladevesowm2
    images: [
      cloudImg("kochitirumaladevesowm1"),
      cloudImg("kochitirumaladevesowm2")
    ],
    fallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    geoLocationUrl: "https://maps.google.com/?q=Ernakulam+Thirumala+Devaswom+Kochi",
    description: "The crown jewel of Kerala GSB heritage, hosting annual Arattu festivals, gold-plated Garuda vehicles, and traditional Panchavadyam cultural performances.",
    restorationDetails: "Replacement of heritage copper roof tiles, gold gilding of temple flagstaff (Dhwaja Stambha), and preservation of 16th-century murals."
  },
  {
    id: "mangeshi",
    name: "Shri Mangeshi Temple",
    subtitle: "Ancestral Kuladevata Shrine of Saraswats",
    location: "Priol, Ponda, Goa",
    established: "1560 AD",
    deity: "Lord Mangesh (Shiva)",
    architecture: "Goan Saraswat & Granite Sanctum",
    restorationYear: "2025 Sanctum Precision",
    images: [
      cloudImg("shrimangeshi1"),
      cloudImg("shrimangeshi2")
    ],
    fallbackImage: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=1200&q=80",
    geoLocationUrl: "https://maps.google.com/?q=Shri+Mangeshi+Temple+Priol+Goa",
    description: "The revered ancestral Kuladevata shrine of thousands of Saraswat Brahmins, world-renowned for its magnificent 7-storey white Deepstambha and serene water tank.",
    restorationDetails: "Precision cleaning of 16th-century granite sanctum, fiber-optic gold leaf ceiling gilding, and preservation of ancient Devanagari copper plate inscriptions."
  },
  {
    id: "shantadurga",
    name: "Shri Shanta Durga Temple",
    subtitle: "Goddess of Universal Peace & Harmony",
    location: "Kavlem, Ponda, Goa",
    established: "1738 AD",
    deity: "Goddess Shantadurga (Mahamaya)",
    architecture: "Indo-Portuguese Vastu Fusion",
    restorationYear: "2024 Golden Chariot Preservation",
    images: [
      cloudImg("shrishantadurga1"),
      cloudImg("shrishantadurga2")
    ],
    fallbackImage: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80",
    geoLocationUrl: "https://maps.google.com/?q=Shri+Shanta+Durga+Temple+Kavlem+Goa",
    description: "Dedicated to Goddess Shantadurga who mediated between Lord Shiva and Lord Vishnu. Features golden palanquins, vaulted assembly halls, and grand annual Jatra processions.",
    restorationDetails: "Structural reinforcement of vaulted roof domes, hand-polished teakwood pillars, and LED illumination accentuating brass artwork."
  },
  {
    id: "venkataramana",
    name: "Srinivasa Venkataramana Temple",
    subtitle: "Kodial Teru Spiritual Nerve Center",
    location: "Car Street, Mangalore, Karnataka",
    established: "17th Century AD",
    deity: "Lord Veera Venkatesha",
    architecture: "Coastal Karnataka Dravidian & Brass Sanctum",
    restorationYear: "2025 Silver Chariot Sanctum",
    images: [
      cloudImg("mangalorevenkataramana1"),
      cloudImg("mangalorevenkataramana2")
    ],
    fallbackImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    geoLocationUrl: "https://maps.google.com/?q=Srinivasa+Venkataramana+Temple+Car+Street+Mangalore",
    description: "The spiritual center of Coastal Karnataka GSB Saraswats, renowned worldwide for the 6-day Kodial Teru (Rathotsavam) where thousands pull the sacred teakwood and silver chariot.",
    restorationDetails: "Restoration of intricate silver cladding around the Garbhagriha, new teakwood carved chariot wheels, and climate-controlled altar preservation."
  },
  {
    id: "kashi-math",
    name: "Shri Kashi Math Samsthan",
    subtitle: "Vedic Guru Parampara & Heritage Seat",
    location: "Varanasi / Walkeshwar Mumbai / Kochi",
    established: "1542 AD",
    deity: "Lord Vyasa Raghupati",
    architecture: "Ancient Vedic Ashram Style",
    restorationYear: "2024 Vrindavan Sanctum",
    images: [
      cloudImg("kashimath1"),
      cloudImg("kashimath2")
    ],
    fallbackImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    geoLocationUrl: "https://maps.google.com/?q=Shri+Kashi+Math+Varanasi",
    description: "The revered spiritual seat of Gowd Saraswat Brahmins, guiding the community in Dvaita Vedanta philosophy, daily Yajna, Vedic education, and charitable Annadhanam.",
    restorationDetails: "Conservation of ancient palm-leaf manuscripts, marble Vrindavan sanctum polishing, and digital archival of Guru Parampara lineages."
  },
  {
    id: "gokarna-partagali",
    name: "Shri Gokarna Partagali Jeevottam Math",
    subtitle: "First Saraswat Matha Seat",
    location: "Partagali, Canacona, Goa",
    established: "1475 AD",
    deity: "Lord Ramachandra & Viravittal",
    architecture: "Traditional Goan Matha Courtyard",
    restorationYear: "2025 Banyan Quadrangle Preservation",
    images: [
      cloudImg("gokarnapartagali1"),
      cloudImg("gokarnapartagali2")
    ],
    fallbackImage: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=1200&q=80",
    geoLocationUrl: "https://maps.google.com/?q=Shri+Gokarna+Partagali+Jeevottam+Math+Goa",
    description: "The historic matha located on the tranquil banks of Kushavati river, famous for its centuries-old sacred Banyan tree where Swamijis conduct daily Vedic discourses.",
    restorationDetails: "Restoration of wooden courtyard pillars, restoration of heritage guest quarters, and eco-conservation of surrounding sacred groves."
  }
];


// ══════════════════════════════════════════════════════════════════
//  FULL YEAR CALENDAR EVENTS DATA (12 MONTHS: JAN – DEC)
// ══════════════════════════════════════════════════════════════════
//
//  Event images also use Cloudinary.
//  Upload with Public IDs like: event_sankranti, event_kodialteru, etc.
//  If you haven't uploaded event images yet, Unsplash fallbacks are used.
//

const YEAR_EVENTS_DATA = [
  // ── JANUARY ─────────────────────────────────────────────────────
  {
    id: "jan-1",
    month: "January",
    monthNum: 1,
    date: "Jan 14-16",
    tithi: "Makara Sankranti",
    title: "Makara Sankranti & Deepotsavam",
    category: "deepotsav",
    location: "All GSB Shrines",
    image: cloudThumb("event_sankranti"),
    fallbackImage: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=600&q=80",
    description: "Lighting of thousands of oil lamps to mark the auspicious Uttarayana movement of the Sun, with special sesame and jaggery prasadam."
  },
  {
    id: "jan-2",
    month: "January",
    monthNum: 1,
    date: "Jan 24-29",
    tithi: "Magha Shuddha Saptami",
    title: "Kodial Teru (Mangalore Rathotsavam)",
    category: "rathotsavam",
    location: "SV Temple Mangalore",
    image: cloudThumb("event_kodialteru"),
    fallbackImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    description: "The world-famous 6-day GSB chariot festival where tens of thousands pull the massive silver chariot of Lord Veera Venkatesha."
  },

  // ── FEBRUARY ────────────────────────────────────────────────────
  {
    id: "feb-1",
    month: "February",
    monthNum: 2,
    date: "Feb 18",
    tithi: "Maha Shivaratri",
    title: "Mangeshi Shivaratri Maharathotsav",
    category: "rathotsavam",
    location: "Shri Mangeshi Temple, Goa",
    image: cloudThumb("event_shivaratri"),
    fallbackImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80",
    description: "All-night Vedic chanting, Rudrabhishekam, and midnight chariot procession of Lord Mangesh amidst thousands of glowing lamps."
  },

  // ── MARCH ───────────────────────────────────────────────────────
  {
    id: "mar-1",
    month: "March",
    monthNum: 3,
    date: "Mar 12-20",
    tithi: "Phalguna Purnima",
    title: "Shigmo Festival (Spring Rathotsava)",
    category: "seasonal",
    location: "Goa & Konkan Temples",
    image: cloudThumb("event_shigmo"),
    fallbackImage: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80",
    description: "Vibrant Saraswat spring carnival with traditional Ghodemodni folk dances, color offerings, and deity chariot processions."
  },

  // ── APRIL ───────────────────────────────────────────────────────
  {
    id: "apr-1",
    month: "April",
    monthNum: 4,
    date: "Apr 06",
    tithi: "Chaitra Navami",
    title: "Sri Rama Navami Vasanthotsavam",
    category: "pujas",
    location: "All Saraswat Shrines",
    image: cloudThumb("event_ramanavami"),
    fallbackImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    description: "Celebration of Lord Rama's birth with Kalyanotsavam, panakam distribution, and classical Sangeethotsavam concerts."
  },

  // ── MAY ─────────────────────────────────────────────────────────
  {
    id: "may-1",
    month: "May",
    monthNum: 5,
    date: "May 03",
    tithi: "Vaishakha Tritiya",
    title: "Akshaya Tritiya Chandanotsavam",
    category: "pujas",
    location: "Kashi Math & Temple Altar",
    image: cloudThumb("event_akshayatritiya"),
    fallbackImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80",
    description: "Deities are smeared with fragrant sandalwood paste (Chandan) to beat the summer heat, accompanied by Kanakabhishekam."
  },

  // ── JUNE ────────────────────────────────────────────────────────
  {
    id: "june-1",
    month: "June",
    monthNum: 6,
    date: "June 18",
    tithi: "Jyeshtha Purnima",
    title: "Vata Purnima & Ganga Puja",
    category: "pujas",
    location: "Household Altars & Rivers",
    image: cloudThumb("event_vatapurnima"),
    fallbackImage: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=600&q=80",
    description: "Women worship the banyan tree for marital health and longevity, offering holy threads and sacred fruits."
  },

  // ── JULY ────────────────────────────────────────────────────────
  {
    id: "july-1",
    month: "July",
    monthNum: 7,
    date: "July 10",
    tithi: "Ashadha Ekadashi",
    title: "Shayana Ekadashi & Chaturmas Vrata",
    category: "pujas",
    location: "Kashi & Partagali Mathas",
    image: cloudThumb("event_chaturmas"),
    fallbackImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    description: "Initiation of 4-month Chaturmas spiritual retreat by Swamijis, with intense daily Tapas, Mudra Dharana, and Veda Japa."
  },

  // ── AUGUST ──────────────────────────────────────────────────────
  {
    id: "aug-1",
    month: "August",
    monthNum: 8,
    date: "Aug 08 - Sep 05",
    tithi: "Shravana Month",
    title: "Choodi Pooja (Vedic Flora Ritual)",
    category: "pujas",
    location: "Household & Tulsi Vrindavan",
    image: cloudThumb("event_choodipooja"),
    fallbackImage: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80",
    description: "Cherished Saraswat ritual performed every Friday and Sunday of Shravana by married women offering wild flower bouquets to Tulsi and elders."
  },

  // ── SEPTEMBER ───────────────────────────────────────────────────
  {
    id: "sep-1",
    month: "September",
    monthNum: 9,
    date: "Sep 07-12",
    tithi: "Bhadrapada Chaturthi",
    title: "Ganesh Chaturthi (Chavoth)",
    category: "seasonal",
    location: "Goan & Saraswat Homes",
    image: cloudThumb("event_chavoth"),
    fallbackImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80",
    description: "The grandest family festival in GSB culture featuring Matoli floral canopies, eco-friendly idol worship, modak offerings, and Visarjan."
  },

  // ── OCTOBER ─────────────────────────────────────────────────────
  {
    id: "oct-1",
    month: "October",
    monthNum: 10,
    date: "Oct 15-24",
    tithi: "Ashvin Navratri",
    title: "Navratri & Vijayadashami Maharathotsavam",
    category: "rathotsavam",
    location: "Shanta Durga & Mangeshi",
    image: cloudThumb("event_navratri"),
    fallbackImage: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80",
    description: "10 days of divine Lalitha Sahasranama puja, Simhavahana processions, and Vijayadashami chariot festivals."
  },

  // ── NOVEMBER ────────────────────────────────────────────────────
  {
    id: "nov-1",
    month: "November",
    monthNum: 11,
    date: "Nov 12-15",
    tithi: "Karthika Purnima",
    title: "Tulsi Vivah & Lakshadeepotsav",
    category: "deepotsav",
    location: "All GSB Shrines",
    image: cloudThumb("event_tulsivivah"),
    fallbackImage: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=600&q=80",
    description: "The celestial wedding of Tulsi Vrindavan with Lord Damodar, accompanied by the illumination of 100,000 brass oil lamps."
  },

  // ── DECEMBER ────────────────────────────────────────────────────
  {
    id: "dec-1",
    month: "December",
    monthNum: 12,
    date: "Dec 18",
    tithi: "Margashirsha Sashti",
    title: "Subrahmanya Sashti & Geeta Jayanti",
    category: "pujas",
    location: "Coastal Temples & Mathas",
    image: cloudThumb("event_geetajayanti"),
    fallbackImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    description: "Special Naga Devata pujas and continuous 18-chapter Bhagavad Geeta chanting across all GSB institutions."
  }
];

// ══════════════════════════════════════════════════════════════════
//  DYNAMIC TEMPLE STORAGE & RETRIEVAL HELPERS (SUPABASE + LOCAL)
// ══════════════════════════════════════════════════════════════════

/**
 * Get all custom temples saved in localStorage
 */
function getLocalCustomTemples() {
  try {
    const raw = localStorage.getItem('user_submitted_temples');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn("Could not read local temples:", e);
    return [];
  }
}

/**
 * Save custom temples list to localStorage
 */
function saveLocalCustomTemples(templesList) {
  try {
    localStorage.setItem('user_submitted_temples', JSON.stringify(templesList));
  } catch (e) {
    console.warn("Could not save local temples:", e);
  }
}

/**
 * Fetches all temples combining built-in TEMPLES_DATA + Supabase + LocalStorage
 */
async function getAllTemples() {
  const localList = getLocalCustomTemples();
  let supabaseTemples = [];

  if (typeof supabaseClient !== 'undefined' && supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('temples')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        supabaseTemples = data.map(item => ({
          ...item,
          isUserSubmitted: true,
          images: Array.isArray(item.images) ? item.images : (item.images ? [item.images] : []),
          image: item.image || (item.images && item.images[0]) || ''
        }));
      }
    } catch (err) {
      console.warn("Error fetching Supabase temples:", err);
    }
  }

  // Deduplicate by ID
  const map = new Map();
  // 1. Static temples first
  TEMPLES_DATA.forEach(t => map.set(t.id, t));
  // 2. Supabase temples
  supabaseTemples.forEach(t => map.set(t.id, t));
  // 3. LocalStorage custom temples
  localList.forEach(t => map.set(t.id, t));

  return Array.from(map.values());
}

/**
 * Saves a new temple or updates an existing one
 */
async function saveCustomTemple(temple) {
  if (!temple.id) {
    temple.id = 'temple-' + Date.now();
  }
  temple.isUserSubmitted = true;
  temple.created_at = temple.created_at || new Date().toISOString();

  // Ensure images array
  if (!Array.isArray(temple.images)) {
    temple.images = temple.images ? [temple.images] : [];
  }

  // If primary image is empty/optional, automatically use 1st image from folder / gallery
  if (!temple.image || temple.image.trim() === '') {
    if (temple.images.length > 0 && temple.images[0]) {
      temple.image = normalizeImageUrl(temple.images[0]);
    } else {
      temple.image = "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=1200&q=80";
    }
  } else if (!temple.images.includes(temple.image)) {
    temple.images.unshift(temple.image);
  }

  // 1. Save to LocalStorage
  const localList = getLocalCustomTemples();
  const existingIdx = localList.findIndex(t => t.id === temple.id);
  if (existingIdx >= 0) {
    localList[existingIdx] = temple;
  } else {
    localList.unshift(temple);
  }
  saveLocalCustomTemples(localList);

  // 2. Save to Supabase (if table exists)
  if (typeof supabaseClient !== 'undefined' && supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('temples')
        .upsert([temple]);
      
      if (error) {
        console.warn("Supabase temple upsert warning (stored locally):", error.message);
      } else {
        console.log("⚡ Temple synced to Supabase successfully!", data);
      }
    } catch (e) {
      console.warn("Supabase upsert exception:", e);
    }
  }

  return temple;
}

/**
 * Delete a temple
 */
async function deleteCustomTemple(templeId) {
  // 1. Remove from LocalStorage
  const localList = getLocalCustomTemples().filter(t => t.id !== templeId);
  saveLocalCustomTemples(localList);

  // 2. Remove from Supabase
  if (typeof supabaseClient !== 'undefined' && supabaseClient) {
    try {
      await supabaseClient
        .from('temples')
        .delete()
        .eq('id', templeId);
    } catch (e) {
      console.warn("Supabase temple delete exception:", e);
    }
  }
  return true;
}

/**
 * Get a single temple by ID
 */
async function getTempleById(id) {
  const all = await getAllTemples();
  return all.find(t => t.id === id) || all[0];
}
