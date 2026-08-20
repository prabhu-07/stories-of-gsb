# 🕉️ Stories by GSB — Sacred Saraswat Heritage Archive

A premium single-page heritage website showcasing historic Gowd Saraswat Brahmin (GSB) temples, mathas, annual festivals, and architectural restoration across Goa, Konkan, and Coastal Karnataka.

**🌐 Live Site:** [https://prabhu-07.github.io/stories-of-gsb/](https://prabhu-07.github.io/stories-of-gsb/)

---

## 📸 How to Upload & Manage Temple Images

All images are served through **Cloudinary** (cloud: `a1g89w9n`). This means you upload images to Cloudinary and they automatically appear on the website — no code changes needed.

### Step 1 — Open Cloudinary Dashboard

Go to: **[https://console.cloudinary.com/pm/a1g89w9n/media-explorer](https://console.cloudinary.com/pm/a1g89w9n/media-explorer)**

Log in with your Cloudinary account credentials.

### Step 2 — Upload Your Image

1. Click the **"Upload"** button (top-right corner)
2. Select or drag your temple/event photo
3. **Important:** Before uploading, set the **"Public ID"** (this is the image name the website uses)

### Step 3 — Use the Correct Public ID

The website looks for images with these exact Public IDs. Use them when uploading:

#### 🏛️ Temple Images

| Temple | Image 1 (Public ID) | Image 2 (Public ID) |
|--------|---------------------|---------------------|
| Kochi Thirumala Devaswom | `kochitirumaladevesowm1` | `kochitirumaladevesowm2` |
| Shri Mangeshi Temple | `shrimangeshi1` | `shrimangeshi2` |
| Shri Shanta Durga Temple | `shrishantadurga1` | `shrishantadurga2` |
| Venkataramana Temple, Mangalore | `mangalorevenkataramana1` | `mangalorevenkataramana2` |
| Shri Kashi Math Samsthan | `kashimath1` | `kashimath2` |
| Gokarna Partagali Math | `gokarnapartagali1` | `gokarnapartagali2` |

> **Example:** If you have a photo of Mangeshi Temple, upload it to Cloudinary and set the Public ID to `shrimangeshi1`. It will instantly appear on the website.

#### 📅 Event / Festival Images

| Event | Public ID |
|-------|-----------|
| Makara Sankranti & Deepotsavam | `event_sankranti` |
| Kodial Teru (Mangalore Rathotsavam) | `event_kodialteru` |
| Mangeshi Shivaratri Maharathotsav | `event_shivaratri` |
| Shigmo Festival | `event_shigmo` |
| Sri Rama Navami Vasanthotsavam | `event_ramanavami` |
| Akshaya Tritiya Chandanotsavam | `event_akshayatritiya` |
| Vata Purnima & Ganga Puja | `event_vatapurnima` |
| Shayana Ekadashi & Chaturmas Vrata | `event_chaturmas` |
| Choodi Pooja (Vedic Flora Ritual) | `event_choodipooja` |
| Ganesh Chaturthi (Chavoth) | `event_chavoth` |
| Navratri & Vijayadashami | `event_navratri` |
| Tulsi Vivah & Lakshadeepotsav | `event_tulsivivah` |
| Subrahmanya Sashti & Geeta Jayanti | `event_geetajayanti` |

#### 🪷 Logo

| Item | Public ID |
|------|-----------|
| Website Logo | Stored locally at `assets/images/logo.png` |

### Step 4 — That's It!

Once uploaded to Cloudinary with the correct Public ID, refresh the website and your image will be displayed automatically. Cloudinary also auto-optimizes the image format and quality for fast loading.

> **Note:** If you haven't uploaded an image yet, a placeholder image will be shown instead. No broken images will appear.

---

## ✏️ How to Edit Temple Descriptions & Details

All temple data (names, descriptions, locations, geo-links) is in **one file**:

📄 **[`js/data.js`](js/data.js)**

Open this file and edit the text directly. Each temple looks like this:

```javascript
{
  id: "mangeshi",
  name: "Shri Mangeshi Temple",                    // ← Change temple name
  location: "Priol, Ponda, Goa",                   // ← Change location
  established: "1560 AD",                           // ← Change year
  deity: "Lord Mangesh (Shiva)",                    // ← Change deity
  description: "The revered ancestral shrine...",   // ← Change description
  geoLocationUrl: "https://maps.google.com/?q=...", // ← Change map link
  images: [
    cloudImg("shrimangeshi1"),                      // ← Matches Cloudinary Public ID
    cloudImg("shrimangeshi2")
  ],
}
```

### To Add a New Temple:

1. Copy any existing temple block in `js/data.js`
2. Change the `id`, `name`, `description`, `images`, etc.
3. Upload matching images to Cloudinary with new Public IDs
4. Save the file — the new temple card appears on the website

---

## 📅 How to Edit Calendar Events

Events for all 12 months (January–December) are also in **[`js/data.js`](js/data.js)**.

Each event looks like this:

```javascript
{
  id: "jan-1",
  month: "January",
  date: "Jan 14-16",
  tithi: "Makara Sankranti",
  title: "Makara Sankranti & Deepotsavam",         // ← Change title
  category: "deepotsav",                            // ← Options: deepotsav, rathotsavam, pujas, seasonal
  location: "All GSB Shrines",                      // ← Change location
  image: cloudThumb("event_sankranti"),             // ← Matches Cloudinary Public ID
  description: "Lighting of thousands of lamps..."  // ← Change description
}
```

### To Add a New Event:

1. Copy any existing event block
2. Change the fields (use a unique `id`)
3. Set the `month` to one of: `January`, `February`, ..., `December`
4. Set the `category` to one of: `deepotsav`, `rathotsavam`, `pujas`, `seasonal`
5. Upload a matching image to Cloudinary
6. Save — the event appears in the calendar

---

## 📁 Project Structure

```
stories-of-gsb/
│
├── index.html              ← Main website (single-page, all sections)
├── temple-detail.html      ← Individual temple detail page
├── ritual-detail.html      ← Individual ritual detail page
│
├── js/
│   ├── data.js             ← ⭐ ALL DATA HERE — temples, events, Cloudinary config
│   ├── events-calendar.js  ← Calendar filter/search engine
│   └── temple-detail.js    ← Dynamic temple detail renderer
│
├── assets/
│   └── images/
│       ├── logo.png        ← Website logo
│       └── *.png           ← Screenshot previews
│
├── home.html               ← Legacy: Home page
├── temples.html            ← Legacy: Temples directory
├── rituals.html            ← Legacy: Rituals & festivals
└── README.md               ← This file
```

---

## 🌐 How to Host on GitHub Pages

1. Go to **[Repository Settings → Pages](https://github.com/prabhu-07/stories-of-gsb/settings/pages)**
2. Under **"Build and deployment"** → **Branch**, select **`main`**
3. Click **Save**
4. Your site will be live at: `https://prabhu-07.github.io/stories-of-gsb/`

---

## 🎨 Website Features

| Feature | Description |
|---------|-------------|
| 🏛️ Temple Cards | Each temple has images, description, deity info, and a Google Maps geo-location link |
| 📅 12-Month Calendar | Filter festivals by month (Jan–Dec), category, or search |
| 🔄 Restoration Toggle | Compare vintage vs. restored temple states |
| ✨ Gold Shimmer UI | Animated gold gradient text, glowing cards, scroll-reveal animations |
| 📱 Responsive | Works on desktop, tablet, and mobile |
| ⚡ Fast Loading | Cloudinary auto-optimizes images (WebP/AVIF, quality, size) |
| 📍 Geo Location | One-click Google Maps link for every temple |

---

## 🛡️ Admin Moderation & Event Approval Guide

When visitors submit events through the **"➕ Submit Event"** modal on the website, their submissions are saved in Supabase with `is_approved = false`. **Unapproved submissions are NOT visible to public visitors.**

### How to Access Admin Mode & Moderate Submissions:

1. Open your website with **`?admin=true`** added to the URL:
   👉 **`https://prabhu-07.github.io/stories-of-gsb/?admin=true`**

2. The **🛡️ Admin Moderation Panel** banner will automatically appear above the 12-Month Calendar section.

3. You will see a list of all **Pending Submissions**:
   - Click **`✅ Approve & Publish Live`** → Sets `is_approved = true` so the event is published publicly for everyone in the world.
   - Click **`🗑️ Reject & Delete`** → Deletes the event submission from Supabase.

4. To exit Admin Mode, click **"Exit Admin Mode"** in the top right of the moderation panel banner.

---

## 🔗 Quick Links

- **Cloudinary Dashboard:** [https://console.cloudinary.com/pm/a1g89w9n/media-explorer](https://console.cloudinary.com/pm/a1g89w9n/media-explorer)
- **GitHub Repository:** [https://github.com/prabhu-07/stories-of-gsb](https://github.com/prabhu-07/stories-of-gsb)
- **Data File (edit temples/events):** [`js/data.js`](js/data.js)

---

*Built with ♡ for the Gowd Saraswat Brahmin community.*
