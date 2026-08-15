# 🎂 Birthday Wishes — React Version (fully static)

Vanilla HTML/CSS/JS wala birthday-wish app React components mein convert ho gaya hai (Vite + Tailwind v4 + Context API).

**Zero setup** — koi form nahi, koi photo upload nahi, koi asset file daalne ki zarurat nahi. Sab kuch hardcoded/auto-generated hai — `npm install && npm run dev` chalao aur seedha page khul jayega.

## Run karne ke liye

```bash
npm install
npm run dev
```

## Structure

```
src/
  context/BirthdayContext.jsx     → global state (name, dob, age, note, toast) — sab static config se initialize hota hai
  data/personConfig.js            → PERSON_NAME + PERSON_DOB (agar kabhi change karne ho to yahi 2 lines edit karna)
  data/constants.js               → wishesData, ZODIACS, fortunes, giftMessages (static data)
  utils/helpers.js                → calculateAge, formatDate, getZodiac (pure functions)
  utils/confetti.js               → launchConfetti / spawnEmojiBurst (self-contained, koi external confetti.js file nahi chahiye)
  utils/placeholderImages.js      → auto-generated SVG placeholder photos/gifs (koi image file upload/asset nahi chahiye)
  components/
    Navbar.jsx             → sticky nav + mobile hamburger, scroll-based active section
    Hero.jsx               → heading, age badge, next-birthday countdown, celebrate button
    FloatingEmojis.jsx     → background floating emoji animation
    Gallery.jsx            → 4 placeholder "gif" cards with scroll-reveal (IntersectionObserver)
    GalleryOverlay.jsx     → fullscreen photo slideshow (uses generated placeholder photos)
    LoveNote.jsx           → default note display
    Wishes.jsx             → 9 wish cards, scroll-reveal
    Candles.jsx            → click-to-blow candles + mic-blow (Web Audio API)
    Stats.jsx              → live-updating heartbeats/breaths/hours/days stats
    GiftBox.jsx            → tap-to-open gift with random message
    Fortune.jsx            → crystal ball, random fortune
    Zodiac.jsx             → zodiac lookup + canvas constellation map
    Footer.jsx
    Toast.jsx
```

## Agar kabhi customize karna ho

Sab kuch optional hai — page bina kisi change ke already chalta hai. Par agar chaho to:

- **Naam/DOB** → `src/data/personConfig.js` mein `PERSON_NAME`/`PERSON_DOB` badal do.
- **Real photos** → `src/utils/placeholderImages.js` abhi [picsum.photos](https://picsum.photos) se real stock images load karta hai (fixed seeds, so hamesha same images aayengi). Internet chahiye page load pe. Apni khud ki photos daalni ho to `PLACEHOLDER_PHOTOS`/`PLACEHOLDER_GIFS` ko apni image imports se replace kar do.
- **3D candles/gift box** — original `threescenes.js` (Three.js r128) available nahi tha, isliye `script.js` ka CSS/canvas-based fallback logic React mein use kiya hai. 3D version chahiye to `threescenes.js` bhej dena.
- **Background video/audio** (`bg.mp4`, `bg.png`, `bg.mp3`) — abhi sirf CSS gradient background hai. Files chahiye ho to bata dena, wapas wire kar dunga.
