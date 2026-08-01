/**
 * STORIES BY GSB - CENTRALIZED DATA CONFIGURATION
 * 
 * Image Naming Convention:
 *   assets/images/{templename}{numerical}.jpg
 *   e.g. assets/images/kochitirumaladevesowm1.jpg, assets/images/kochitirumaladevesowm2.jpg
 * 
 * Easily edit images, descriptions, and geo-location links in this file!
 */

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
    images: [
      "assets/images/kochitirumaladevesowm1.jpg",
      "assets/images/kochitirumaladevesowm2.jpg"
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
      "assets/images/shrimangeshi1.jpg",
      "assets/images/shrimangeshi2.jpg"
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
      "assets/images/shrishantadurga1.jpg",
      "assets/images/shrishantadurga2.jpg"
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
      "assets/images/mangalorevenkataramana1.jpg",
      "assets/images/mangalorevenkataramana2.jpg"
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
      "assets/images/kashimath1.jpg",
      "assets/images/kashimath2.jpg"
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
      "assets/images/gokarnapartagali1.jpg",
      "assets/images/gokarnapartagali2.jpg"
    ],
    fallbackImage: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=1200&q=80",
    geoLocationUrl: "https://maps.google.com/?q=Shri+Gokarna+Partagali+Jeevottam+Math+Goa",
    description: "The historic matha located on the tranquil banks of Kushavati river, famous for its centuries-old sacred Banyan tree where Swamijis conduct daily Vedic discourses.",
    restorationDetails: "Restoration of wooden courtyard pillars, restoration of heritage guest quarters, and eco-conservation of surrounding sacred groves."
  }
];

/**
 * FULL YEAR CALENDAR EVENTS DATA (12 MONTHS: JAN - DEC)
 */
const YEAR_EVENTS_DATA = [
  // JANUARY
  {
    id: "jan-1",
    month: "January",
    monthNum: 1,
    date: "Jan 14-16",
    tithi: "Makara Sankranti",
    title: "Makara Sankranti & Deepotsavam",
    category: "deepotsav",
    location: "All GSB Shrines",
    image: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    description: "The world-famous 6-day GSB chariot festival where tens of thousands pull the massive silver chariot of Lord Veera Venkatesha."
  },

  // FEBRUARY
  {
    id: "feb-1",
    month: "February",
    monthNum: 2,
    date: "Feb 18",
    tithi: "Maha Shivaratri",
    title: "Mangeshi Shivaratri Maharathotsav",
    category: "rathotsavam",
    location: "Shri Mangeshi Temple, Goa",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80",
    description: "All-night Vedic chanting, Rudrabhishekam, and midnight chariot procession of Lord Mangesh amidst thousands of glowing lamps."
  },

  // MARCH
  {
    id: "mar-1",
    month: "March",
    monthNum: 3,
    date: "Mar 12-20",
    tithi: "Phalguna Purnima",
    title: "Shigmo Festival (Spring Rathotsava)",
    category: "seasonal",
    location: "Goa & Konkan Temples",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80",
    description: "Vibrant Saraswat spring carnival with traditional Ghodemodni folk dances, color offerings, and deity chariot processions."
  },

  // APRIL
  {
    id: "apr-1",
    month: "April",
    monthNum: 4,
    date: "Apr 06",
    tithi: "Chaitra Navami",
    title: "Sri Rama Navami Vasanthotsavam",
    category: "pujas",
    location: "All Saraswat Shrines",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    description: "Celebration of Lord Rama's birth with Kalyanotsavam, panakam distribution, and classical Sangeethotsavam concerts."
  },

  // MAY
  {
    id: "may-1",
    month: "May",
    monthNum: 5,
    date: "May 03",
    tithi: "Vaishakha Tritiya",
    title: "Akshaya Tritiya Chandanotsavam",
    category: "pujas",
    location: "Kashi Math & Temple Altar",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80",
    description: "Deities are smeared with fragrant sandalwood paste (Chandan) to beat the summer heat, accompanied by Kanakabhishekam."
  },

  // JUNE
  {
    id: "june-1",
    month: "June",
    monthNum: 6,
    date: "June 18",
    tithi: "Jyeshtha Purnima",
    title: "Vata Purnima & Ganga Puja",
    category: "pujas",
    location: "Household Altars & Rivers",
    image: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=600&q=80",
    description: "Women worship the banyan tree for marital health and longevity, offering holy threads and sacred fruits."
  },

  // JULY
  {
    id: "july-1",
    month: "July",
    monthNum: 7,
    date: "July 10",
    tithi: "Ashadha Ekadashi",
    title: "Shayana Ekadashi & Chaturmas Vrata",
    category: "pujas",
    location: "Kashi & Partagali Mathas",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    description: "Initiation of 4-month Chaturmas spiritual retreat by Swamijis, with intense daily Tapas, Mudra Dharana, and Veda Japa."
  },

  // AUGUST
  {
    id: "aug-1",
    month: "August",
    monthNum: 8,
    date: "Aug 08 - Sep 05",
    tithi: "Shravana Month",
    title: "Choodi Pooja (Vedic Flora Ritual)",
    category: "pujas",
    location: "Household & Tulsi Vrindavan",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80",
    description: "Cherished Saraswat ritual performed every Friday and Sunday of Shravana by married women offering wild flower bouquets to Tulsi and elders."
  },

  // SEPTEMBER
  {
    id: "sep-1",
    month: "September",
    monthNum: 9,
    date: "Sep 07-12",
    tithi: "Bhadrapada Chaturthi",
    title: "Ganesh Chaturthi (Chavoth)",
    category: "seasonal",
    location: "Goan & Saraswat Homes",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80",
    description: "The grandest family festival in GSB culture featuring Matoli floral canopies, eco-friendly idol worship, modak offerings, and Visarjan."
  },

  // OCTOBER
  {
    id: "oct-1",
    month: "October",
    monthNum: 10,
    date: "Oct 15-24",
    tithi: "Ashvin Navratri",
    title: "Navratri & Vijayadashami Maharathotsavam",
    category: "rathotsavam",
    location: "Shanta Durga & Mangeshi",
    image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80",
    description: "10 days of divine Lalitha Sahasranama puja, Simhavahana processions, and Vijayadashami chariot festivals."
  },

  // NOVEMBER
  {
    id: "nov-1",
    month: "November",
    monthNum: 11,
    date: "Nov 12-15",
    tithi: "Karthika Purnima",
    title: "Tulsi Vivah & Lakshadeepotsav",
    category: "deepotsav",
    location: "All GSB Shrines",
    image: "https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=600&q=80",
    description: "The celestial wedding of Tulsi Vrindavan with Lord Damodar, accompanied by the illumination of 100,000 brass oil lamps."
  },

  // DECEMBER
  {
    id: "dec-1",
    month: "December",
    monthNum: 12,
    date: "Dec 18",
    tithi: "Margashirsha Sashti",
    title: "Subrahmanya Sashti & Geeta Jayanti",
    category: "pujas",
    location: "Coastal Temples & Mathas",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    description: "Special Naga Devata pujas and continuous 18-chapter Bhagavad Geeta chanting across all GSB institutions."
  }
];
