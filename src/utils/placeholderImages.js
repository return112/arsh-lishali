// ============================================================
// Self-contained placeholder images.
// Uses picsum.photos (free stock photo service, no API key needed)
// with fixed seeds so the same images load every time. No uploads,
// no local asset files needed — just internet access at runtime.
// ============================================================

import image1 from "../../public/image 1.jpeg";
import image2 from "../../public/image 2.jpeg";
import image3 from "../../public/image 3.jpeg";
import image4 from "../../public/image 4.jpeg";
import image5 from "../../public/image 5.jpeg";
import gif1 from "../../public/gif1.gif";
import gif2 from "../../public/gif2.gif";
import gif3 from "../../public/gif3.gif";
import gif4 from "../../public/gif4.gif";

// Three "uploaded photo" style placeholders for the gallery slideshow
export const PLACEHOLDER_PHOTOS = [image1, image2, image3, image4, image5];

// Four "gif card" style placeholders for the scattered gallery grid
export const PLACEHOLDER_GIFS = [
  { src: gif1, caption: "Celebrate! 🎉" },
  { src: gif2, caption: "You're Amazing 🌟" },
  { src: gif3, caption: "Keep Shining ✨" },
  { src: gif4, caption: "Stay Awesome 🎂" },
];
