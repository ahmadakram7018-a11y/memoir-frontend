import localFont from "next/font/local";

// Display face — headlines and section titles only, never body copy.
export const fraunces = localFont({
  src: [
    { path: "./fonts/Fraunces-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Fraunces-Italic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

// Body / UI face.
export const publicSans = localFont({
  src: [
    { path: "./fonts/PublicSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/PublicSans-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-public-sans",
  display: "swap",
});

// Handwritten face — reserved for the welcome note only.
export const caveat = localFont({
  src: "./fonts/Caveat-Regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-caveat",
  display: "swap",
});
