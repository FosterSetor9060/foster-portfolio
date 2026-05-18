import { useState, useEffect, useRef } from "react";

const TOOL_LOGOS = {
  // Each value is a self-contained SVG string (viewBox only, no width/height)
  HTML5: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 452 520" width="100%" height="100%"><path fill="#e44d26" d="M41 460L0 0h451l-41 460-185 52z"/><path fill="#f16529" d="M226 472l149-41 35-394H226z"/><path fill="#ebebeb" d="M226 208h-75l-5-58h80V94H84l15 171h127zm0 147l-64-17-4-45h-56l7 89 117 32z"/><path fill="#fff" d="M226 208v56h70l-7 73-63 17v59l116-32 9-97 9-76zm0-114v56h137l4-56z"/></svg>`,
  CSS3: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 452 520" width="100%" height="100%"><path fill="#0170ba" d="M41 460L0 0h451l-41 460-185 52z"/><path fill="#0d85d8" d="M226 472l149-41 35-394H226z"/><path fill="#ebebeb" d="M226 208H84l5 58h137v-58zm0-114H79l5 57h142V94zm0 261l-64-17-4-45h-56l7 89 117 32v-59z"/><path fill="#fff" d="M226 208v58h69l-7 73-62 17v59l116-32 9-97 8-78zm0-114v57h136l4-57z"/></svg>`,
  JavaScript: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 630" width="100%" height="100%"><rect width="630" height="630" fill="#f7df1e"/><path d="M423 492c7 12 16 20 33 20 14 0 22-7 22-16 0-11-9-15-24-22l-8-3c-24-10-40-23-40-50 0-25 19-44 49-44 21 0 36 7 47 27l-26 17c-6-10-12-14-21-14s-15 5-15 14c0 9 6 13 20 19l8 4c28 12 44 25 44 53 0 30-24 46-56 46-31 0-52-15-62-35zm-113 3c5 9 10 17 21 17 11 0 17-4 17-20v-109h33v110c0 34-20 49-49 49-26 0-41-14-49-30z"/></svg>`,
  TypeScript: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 630" width="100%" height="100%"><rect width="630" height="630" fill="#3178c6"/><path fill="#fff" d="M492 319h-68v191h-40V319h-68v-33h176zm-239 162c7 11 18 19 34 19 15 0 25-8 25-18 0-12-9-17-27-24l-9-4c-26-11-44-25-44-53 0-27 21-48 54-48 23 0 40 8 52 30l-29 18c-6-11-13-15-23-15-10 0-17 6-17 15 0 10 6 14 22 21l9 4c31 14 49 27 49 57 0 33-26 50-61 50-34 0-57-17-68-39z"/></svg>`,
  React: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23 23 20.46" width="100%" height="100%"><circle r="2.05" fill="#61dafb"/><g stroke="#61dafb" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`,
  TailwindCSS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 33" width="100%" height="100%"><path fill="#38bdf8" fill-rule="evenodd" d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"/></svg>`,
  Figma: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 57" width="100%" height="100%"><path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/><path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z"/><path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z"/><path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/><path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/></svg>`,
  Python: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.9 110.9" width="100%" height="100%"><defs><linearGradient id="pa" x1="50.8%" y1="0%" x2="50.8%" y2="100%"><stop offset="0%" stop-color="#5a9fd4"/><stop offset="100%" stop-color="#306998"/></linearGradient><linearGradient id="pb" x1="50.8%" y1="0%" x2="50.8%" y2="100%"><stop offset="0%" stop-color="#ffd43b"/><stop offset="100%" stop-color="#ffe873"/></linearGradient></defs><path fill="url(#pa)" d="M54.9 8c-18.6 0-17.5 8.1-17.5 8.1l0 8.4h17.9v2.5H28.8s-12-1.4-12 17.4 10.5 17.9 10.5 17.9h6.3v-8.6s-.3-10.5 10.3-10.5h17.8s9.9.2 9.9-9.6V18.1S73.3 8 54.9 8zm-9.8 5.7a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4z"/><path fill="url(#pb)" d="M56 102.9c18.6 0 17.5-8.1 17.5-8.1V86.4H55.6v-2.5H82s12 1.4 12-17.4-10.5-17.9-10.5-17.9h-6.3v8.6s.3 10.5-10.3 10.5H49.2s-9.9-.2-9.9 9.6v16.1S37.6 102.9 56 102.9zm9.8-5.7a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4z"/></svg>`,
  NodeJS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 289" width="100%" height="100%"><path fill="#83cd29" d="M128 0L0 73.9v141.2L128 289l128-73.9V73.9z"/><path fill="#404137" d="M128 4.7l121.8 70.3v139.9L128 285l-121.8-70v-140z"/><path fill="#fff" d="M128 145.7c-30.5 0-55.1-24.7-55.1-55.1 0-30.5 24.7-55.1 55.1-55.1 20.4 0 38.4 11.1 48.1 27.7l-24 13.9c-5-8.7-14.4-14.6-24.9-14.6-16 0-29 13-29 29s13 29 29 29c10.6 0 19.8-5.7 24.8-14.2l24.1 13.7C150.6 134.4 132.5 145.7 128 145.7z"/><path fill="#fff" d="M187.3 108.9l-13.7 24-24-13.9 13.7-24zM128 200.6c-30.5 0-55.1-24.7-55.1-55.1h27c0 15.5 12.6 28.1 28.1 28.1s28.1-12.6 28.1-28.1h27c0 30.5-24.6 55.1-55.1 55.1z"/></svg>`,
  Flask: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%"><path fill="#fff" d="M28 2h44l4 36-26 60-26-60z"/><path fill="#aaa" d="M50 80 L30 35 L70 35 Z"/><rect x="38" y="2" width="24" height="10" fill="#ccc"/><path fill="none" stroke="#888" stroke-width="2" d="M30 35 Q25 50 30 65 M70 35 Q75 50 70 65"/></svg>`,
  SQLAlchemy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%"><path fill="#d71f00" d="M64 8C37 8 16 19 16 33v62c0 14 21 25 48 25s48-11 48-25V33C112 19 91 8 64 8z"/><ellipse fill="#ff3e00" cx="64" cy="33" rx="48" ry="18"/><path fill="#fff" fill-opacity=".5" d="M40 28h48v10H40z"/><path fill="#fff" fill-opacity=".3" d="M40 52h48v6H40zm0 16h48v6H40zm0 16h32v6H40z"/></svg>`,
  MySQL: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%"><path fill="#00618a" d="M2 2h50v6H2z"/><path fill="#e48e00" d="M86 2c10 0 40 20 40 62s-30 62-40 62-40-20-40-62S76 2 86 2z"/><path fill="#00618a" d="M2 14h50v6H2zm0 12h50v6H2zm0 12h30v6H2z"/><path fill="#fff" d="M92 40c0 15-3 28-6 28s-6-13-6-28 3-20 6-20 6 5 6 20z"/><path fill="#fff" d="M86 76c3 0 14-8 14-34S89 10 86 10s-14 8-14 32 11 34 14 34z" fill-opacity=".4"/></svg>`,
  MongoDB: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 549" width="100%" height="100%"><path fill="#10aa50" d="M175.622 61.108C152.612 33.807 132.797 6.078 128.749.32a1.03 1.03 0 0 0-1.492 0c-4.048 5.759-23.863 33.487-46.874 60.788-197.507 251.896 31.108 421.89 31.108 421.89l1.917 1.28c1.704 26.234 5.966 64.18 5.966 64.18h17.045s4.26-37.946 5.965-64.18l1.918-1.284c.001.001 228.614-169.99 31.32-421.886zm-47.187 407.995s-10.212-8.568-12.768-13.688V109.02c2.556-5.12 12.768-13.688 12.768-13.688s10.212 8.568 12.768 13.688v346.395c-2.556 5.12-12.768 13.688-12.768 13.688z"/></svg>`,
  AWS: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%"><path fill="#ff9900" d="M29 60.3c0 1 .1 1.8.4 2.3.3.5.8.9 1.5 1.3.1.1.2.2.2.4 0 .2-.2.4-.5.7l-1.6 1.1c-.2.1-.5.2-.7.2-.3 0-.6-.1-.9-.4-.4-.4-.7-.8-1-1.3a22 22 0 0 1-.9-1.7c-2.2 2.6-5 3.9-8.3 3.9-2.4 0-4.3-.7-5.7-2a7 7 0 0 1-2.1-5.3c0-2.3.8-4.2 2.5-5.6 1.7-1.4 3.9-2.1 6.7-2.1.9 0 1.9.1 2.9.2 1 .1 2.1.4 3.2.6v-2c0-2.1-.4-3.6-1.3-4.4-.9-.8-2.4-1.2-4.5-1.2-.9 0-1.9.1-2.9.4-1 .2-2 .5-2.9.9-.4.2-.8.3-1 .4l-.6.1c-.5 0-.7-.4-.7-1.1v-1.7c0-.6.1-1 .3-1.3.2-.3.6-.5 1.2-.8 1-.5 2.1-.9 3.5-1.2 1.4-.3 2.8-.5 4.4-.5 3.4 0 5.8.8 7.4 2.3 1.6 1.5 2.3 3.9 2.3 7v9.2zM19 62.8c.9 0 1.8-.2 2.8-.5.9-.3 1.8-.9 2.5-1.8.4-.5.7-1.1.9-1.8.2-.7.3-1.5.3-2.5v-1.2c-.8-.2-1.7-.3-2.5-.4a20 20 0 0 0-2.5-.1c-1.7 0-3 .3-3.9 1-.9.7-1.3 1.7-1.3 3 0 1.2.3 2.1.9 2.7.6.6 1.6.9 2.8.9zm20.9 2.8c-.6 0-1-.1-1.3-.3-.3-.2-.5-.6-.7-1.2L32 42.8c-.2-.6-.3-1.1-.3-1.3 0-.5.3-.8.8-.8H35c.6 0 1 .1 1.3.3.3.2.5.6.6 1.2l4.3 17 4-17c.1-.6.3-1 .6-1.2.3-.2.7-.3 1.3-.3h2.1c.6 0 1 .1 1.3.3.3.2.5.6.6 1.2l4 17.2 4.4-17.2c.1-.6.4-1 .6-1.2.3-.2.7-.3 1.3-.3h2.5c.5 0 .8.3.8.8 0 .2 0 .3-.1.5l-.2.8-6.3 21.3c-.2.6-.4 1-.7 1.2-.3.2-.7.3-1.3.3H54c-.6 0-1-.1-1.3-.3-.3-.2-.5-.6-.6-1.2l-4-16.5-3.9 16.4c-.1.6-.3 1-.6 1.2-.3.2-.7.3-1.3.3h-2.4zm33.4.7c-1.5 0-3-.2-4.4-.5-1.4-.3-2.5-.7-3.3-1.1-.5-.3-.8-.6-.9-.9a2.3 2.3 0 0 1-.1-.8v-1.8c0-.7.3-1.1.8-1.1.2 0 .4 0 .6.1l.9.4c1.2.5 2.5.9 3.8 1.2 1.4.3 2.7.4 4 .4 2.1 0 3.8-.4 4.9-1.1 1.1-.7 1.7-1.8 1.7-3.1 0-.9-.3-1.7-.9-2.3-.6-.6-1.7-1.1-3.4-1.6L72 53.9c-2.4-.8-4.2-1.9-5.3-3.3a7.8 7.8 0 0 1-1.7-4.9c0-1.4.3-2.7 1-3.7.6-1 1.5-1.9 2.5-2.6 1-.7 2.2-1.2 3.5-1.6 1.3-.4 2.7-.5 4.1-.5.7 0 1.5 0 2.2.1.8.1 1.5.2 2.2.4.7.1 1.3.3 1.9.5.6.2 1 .4 1.4.6.5.3.8.5 1 .8.2.3.3.6.3 1v1.7c0 .7-.3 1.1-.8 1.1-.3 0-.7-.1-1.3-.4-2-.9-4.2-1.4-6.6-1.4-1.9 0-3.4.3-4.5 1-1.1.7-1.6 1.7-1.6 3.1 0 .9.3 1.7 1 2.3.7.6 1.9 1.2 3.7 1.7l3.5 1.1c2.4.8 4.1 1.8 5.2 3.2a7.5 7.5 0 0 1 1.7 4.8c0 1.5-.3 2.8-.9 4s-1.4 2.1-2.5 2.9c-1.1.8-2.3 1.4-3.7 1.8a17 17 0 0 1-4.7.6z"/><path fill="#252f3e" d="M85.6 74.9c-10.5 7.7-25.7 11.8-38.8 11.8C31.1 86.7 16 80.9 4.5 70.7c-.9-.8-.1-2 1-1.3 12.5 7.3 28 11.6 44 11.6 10.8 0 22.6-2.2 33.5-6.9 1.7-.7 3 1.1 1.6 2.1z"/><path fill="#252f3e" d="M89.8 70.1c-1.3-1.6-8.4-.8-11.6-.4-.9.1-1.1-.7-.2-1.4 5.7-4 15-2.8 16.1-1.5 1.1 1.4-.3 10.5-5.6 14.9-.8.7-1.6.3-1.2-.5 1.2-3 3.8-9.5 2.5-11.1z"/></svg>`,
  Docker: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 72" width="100%" height="100%"><path fill="#066da5" d="M97.9 30.4c-1.5-1.1-5-1.5-7.7-1-0.3-2.9-2.1-5.4-5.3-7.7l-1.8-1.2-1.2 1.8c-1.5 2.3-2.2 5.5-2 8.4 0.1 1 0.5 2.7 1.5 4.2-1.1 0.6-3.3 1.5-6.2 1.5H0.6L0.4 38c-0.3 4.5 0.4 9 2.4 13.1 2.4 4.8 5.8 8.3 10.2 10.4 5 2.3 13 3.6 22.2 3.6 4.2 0 8.3-0.4 12.2-1.1 5.6-1 11.1-2.9 15.8-5.9 4.1-2.6 7.2-5.9 9.6-9.9 4.6-0.2 9.1-1.1 12.6-3.1 0.1-0.1 0.2-0.1 0.3-0.2l1.6-1.1-1.5-1.2c-0.9-0.7-2.7-1.8-7.9-2.3zm0 0"/><path fill="#066da5" d="M11 27.3h7.5V35H11zm0 0m8.5 0H27V35h-7.5zm0 0m8.5 0h7.5V35H28zm0 0m8.5 0H44V35h-7.5zm0 0m8.5 0h7.5V35h-7.5zm0 0M28 19.3h7.5v7.5H28zm0 0m8.5 0H44v7.5h-7.5zm0 0m8.5 0h7.5v7.5h-7.5zm0 0M36.5 11h7.5v7.5h-7.5zm0 0"/></svg>`,
  Kubernetes: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 249" width="100%" height="100%"><path fill="#326ce5" d="M82.1 0l-5.6 3.2L13 37.8 7.4 41 4.2 47 .3 122.3 0 129l3.2 5.9 37.5 66.7 3.2 5.7 6.4 3.2L122.3 249l6.7.3 5.9-3.2 66.7-37.5 5.7-3.2 3.2-6.4L249 122.3l.3-6.7-3.2-5.9L209.6 43l-3.2-5.7-6.4-3.2L128 0h-5.7z"/><path fill="#fff" d="M128 32.4c-3.5 0-6.3 2.8-6.3 6.3 0 .6.1 1.2.3 1.8L101.8 58.8c-1-.7-2.2-1.1-3.5-1.1-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3c1.2 0 2.3-.4 3.3-1l20.2 20.2v37.1l-32.1 10.4-14.1-17.6.7-2.3c0-.5.1-1 .1-1.5 0-3.5-2.8-6.3-6.3-6.3-3.5 0-6.3 2.8-6.3 6.3 0 3.5 2.8 6.3 6.3 6.3 1.4 0 2.7-.4 3.7-1.2l12.8 15.9-30.9 10.1v4.2l32.3 5.2-.1.8v25.8l-14.1 4.6-5.6-6.8v-4.1c0-3.5-2.8-6.3-6.3-6.3s-6.3 2.8-6.3 6.3 2.8 6.3 6.3 6.3c.5 0 1-.1 1.5-.2l5.6 6.8c0 .3-.1.6-.1.9 0 3.5 2.8 6.3 6.3 6.3s6.3-2.8 6.3-6.3c0-.3 0-.6-.1-.9l4.1-5.7 16.6 2.7v3.7l-12.2 15.1c-1-.8-2.2-1.2-3.5-1.2-3.5 0-6.3 2.8-6.3 6.3s2.8 6.3 6.3 6.3 6.3-2.8 6.3-6.3c0-.6-.1-1.2-.3-1.8l11.4-14.2L128 213l17.6 8.9 11.4 14.2c-.2.6-.3 1.2-.3 1.8 0 3.5 2.8 6.3 6.3 6.3s6.3-2.8 6.3-6.3-2.8-6.3-6.3-6.3c-1.3 0-2.5.4-3.5 1.2l-12.2-15.1v-3.7l16.6-2.7 4.1 5.7c-.1.3-.1.6-.1.9 0 3.5 2.8 6.3 6.3 6.3s6.3-2.8 6.3-6.3c0-.3 0-.6-.1-.9l5.6-6.8c.5.1 1 .2 1.5.2 3.5 0 6.3-2.8 6.3-6.3s-2.8-6.3-6.3-6.3-6.3 2.8-6.3 6.3v4.1l-14.1-4.6v-25.8l-.1-.8 32.3-5.2v-4.2l-30.9-10.1 12.8-15.9c1 .8 2.3 1.2 3.7 1.2 3.5 0 6.3-2.8 6.3-6.3 0-3.5-2.8-6.3-6.3-6.3-3.5 0-6.3 2.8-6.3 6.3 0 .5.1 1 .1 1.5l.7 2.3-14.1 17.6-32.1-10.4V89.5l20.2-20.2c1 .7 2.1 1 3.3 1 3.5 0 6.3-2.8 6.3-6.3s-2.8-6.3-6.3-6.3c-1.3 0-2.5.4-3.5 1.1L106 40.5c.2-.6.3-1.2.3-1.8 0-3.5-2.8-6.3-6.3-6.3zM128 96.6c6.8 0 13.3 1.5 19.2 4.2l-19.2 26.5-19.2-26.5c5.9-2.7 12.4-4.2 19.2-4.2zm-26.3 9.6l13.2 18.2-21.6 7v-1.2c0-10 3.3-19.2 8.4-24zm52.6 0c5.1 5.8 8.4 15 8.4 24v1.2l-21.6-7 13.2-18.2zm-59.5 32.4l22 7.1-13.6 17c-6-6.9-9.6-16.2-10.1-25.6l1.7 1.5zm66.4 0l1.7-1.5c-.5 9.4-4.1 18.7-10.1 25.6l-13.6-17 22-7.1zm-43.7 14.2l18.5 5.9-9.3 11.5c-3-.9-6-1.4-9.2-1.4s-6.2.5-9.2 1.4l-9.3-11.5 18.5-5.9zm0 22c4.4 0 8.6.7 12.5 2.1l-12.5 6.3-12.5-6.3c3.9-1.4 8.1-2.1 12.5-2.1z"/></svg>`,
  Terraform: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 291" width="100%" height="100%"><path fill="#5c4ee5" d="M169.9 136.9L256 87.2V185l-86.1 49.7z"/><path fill="#4040b2" d="M0 87.2l86.1 49.7V185L0 135.3z"/><path fill="#5c4ee5" d="M86.1 0l86.1 49.7-86.1 49.7L0 49.7z"/><path fill="#4040b2" d="M86.1 191.7l86.1 49.7V291L86.1 241.4z"/></svg>`,
  GitHub: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%"><path fill="#fff" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  Linux: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%"><path fill="#fff" d="M127.5 8C80 8 50 55 50 100c0 20 5 38 13 52-8 10-15 22-15 35 0 25 20 43 80 43s80-18 80-43c0-13-7-25-15-35 8-14 13-32 13-52C206 55 175 8 127.5 8zm0 20c33 0 58 35 58 72 0 16-4 30-11 41-14-10-31-16-47-16s-33 6-47 16c-7-11-11-25-11-41 0-37 25-72 58-72zm-25 80c8 0 14 6 14 14s-6 14-14 14-14-6-14-14 6-14 14-14zm50 0c8 0 14 6 14 14s-6 14-14 14-14-6-14-14 6-14 14-14zm-25 40c22 0 40 6 50 16-8 8-25 14-50 14s-42-6-50-14c10-10 28-16 50-16z"/></svg>`,
  Prometheus: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%"><circle cx="128" cy="128" r="120" fill="#e6522c"/><circle cx="128" cy="128" r="60" fill="none" stroke="#fff" stroke-width="16"/><circle cx="128" cy="128" r="16" fill="#fff"/><line x1="128" y1="8" x2="128" y2="40" stroke="#fff" stroke-width="12"/><line x1="128" y1="216" x2="128" y2="248" stroke="#fff" stroke-width="12"/><line x1="8" y1="128" x2="40" y2="128" stroke="#fff" stroke-width="12"/><line x1="216" y1="128" x2="248" y2="128" stroke="#fff" stroke-width="12"/></svg>`,
  Grafana: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%"><rect width="256" height="256" rx="30" fill="#f46800"/><path fill="#fff" d="M128 48c-44 0-80 36-80 80s36 80 80 80 80-36 80-80-36-80-80-80zm0 140c-33 0-60-27-60-60s27-60 60-60 60 27 60 60-27 60-60 60zm0-100c-22 0-40 18-40 40 0 10 4 19 10 26l12-12c-4-4-6-9-6-14 0-13 11-24 24-24 6 0 11 2 15 6l12-12c-7-6-16-10-27-10zm30 54l-12 12c4 4 6 9 6 14 0 13-11 24-24 24-6 0-11-2-15-6l-12 12c7 6 16 10 27 10 22 0 40-18 40-40 0-10-4-19-10-26z"/></svg>`,
  Nginx: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%"><polygon fill="#009900" points="128,8 8,72 8,184 128,248 248,184 248,72"/><polygon fill="#00b300" points="128,8 8,72 128,136"/><polygon fill="#007300" points="128,8 248,72 128,136"/><polygon fill="#005900" points="8,72 8,184 128,136"/><polygon fill="#007300" points="248,72 248,184 128,136"/><polygon fill="#009900" points="8,184 128,248 128,136"/><polygon fill="#005900" points="248,184 128,248 128,136"/></svg>`,
  Bash: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%"><path fill="#293138" d="M109.01 28.64L71.28 6.24a14.33 14.33 0 00-14.56 0L18.99 28.64a14.57 14.57 0 00-7.28 12.62v44.87a14.57 14.57 0 007.28 12.62l37.73 22.4a14.33 14.33 0 0014.56 0l37.73-22.4a14.57 14.57 0 007.28-12.62V41.26a14.57 14.57 0 00-7.28-12.62z"/><path fill="#4eaa25" d="M91.04 84.28l-2.87 5.11-25.57-14.7v-30.4h5.87v27.26z"/><path fill="#fff" d="M45.23 65.9l-5.09-2.97L52.78 41h6l12.64 21.93-5.09 2.97-10.05-17.43zm.59 12.67l-2.94-5.09 22.56-13.01 2.94 5.09z"/></svg>`,
  Helm: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%"><path fill="#0f1689" d="M128 8C62 8 8 62 8 128s54 120 120 120 120-54 120-120S194 8 128 8z"/><path fill="#277a9f" d="M128 30c-54 0-98 44-98 98s44 98 98 98 98-44 98-98-44-98-98-98z"/><path fill="#fff" d="M78 98h100l-50 70-50-70zm50-40a20 20 0 100 40 20 20 0 000-40z"/></svg>`,
  Ansible: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%"><circle cx="128" cy="128" r="120" fill="#1a1918"/><path fill="#fff" d="M128 28c-55 0-100 45-100 100s45 100 100 100 100-45 100-100S183 28 128 28zm36 140l-53-80v80H91V88h20l53 80V88h20v80z"/></svg>`,
  Git: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%"><path fill="#f05032" d="M252 119.8L136.2 4a13.6 13.6 0 00-19.2 0L94.5 26.6l24.3 24.3a16.2 16.2 0 0120.4 20.6L162 94.4a16.2 16.2 0 11-9.7 9.2L130 81.3v62a16.2 16.2 0 11-13.3.5V80a16.2 16.2 0 01-8.8-21.3L83.7 34.4l-79.7 80a13.6 13.6 0 000 19.2L119.8 248a13.6 13.6 0 0019.2 0L252 139a13.6 13.6 0 000-19.2z"/></svg>`,
  VSCode: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%"><path fill="#007acc" d="M189.6 8.2L104 92.7 48.3 46.2 8 69v118l40.3 22.8L104 163.3l85.6 84.5L248 219.6V36.4z"/><path fill="#fff" d="M248 36.4L189.6 8.2 104 92.7V163.3L189.6 247.8 248 219.6V36.4zM104 128L48.3 163.8V92.2L104 128z"/></svg>`,
  Postman: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%"><circle cx="128" cy="128" r="120" fill="#ff6c37"/><path fill="#fff" d="M148 108l-40 40 12 12 40-40zm-52 60l-8-8 8-8 8 8zm64-64l-8-8 8-8 8 8zM128 68c-33 0-60 27-60 60s27 60 60 60 60-27 60-60-27-60-60-60zm0 108c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"/></svg>`,
  Vim: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%"><path fill="#019733" d="M8 64h48L8 192h48l72-128 72 128h48L176 64h48L128 8z"/></svg>`,
  Jira: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%"><path fill="#2684ff" d="M244.7 117.3L135.1 7.7a20.6 20.6 0 00-29.1 0L96.6 17 185 105.5a16.3 16.3 0 010 23l-64 64 9.4 9.4a20.6 20.6 0 0029.1 0L244.7 92.3a20.6 20.6 0 000-29.1l.1 54.1z"/><path fill="#2684ff" d="M120 120.5L11.3 211.8a20.6 20.6 0 0029.1 29.1L149 151.3a16.3 16.3 0 000-23L120 99.6v20.9z"/></svg>`,
  Java: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 346" width="100%" height="100%"><path fill="#f89820" d="M82.6 267.5s-13.3 7.7 9.5 10.3c27.6 3.1 41.7 2.7 72.1-3.1 0 0 8 5 19.2 9.3-68.2 29.2-154.4-1.7-100.8-16.5z"/><path fill="#f89820" d="M74.3 229.8s-14.9 11 7.9 13.4c29.5 3 52.8 3.2 93.1-4.4 0 0 5.6 5.7 14.4 8.8-82.4 24.1-174.1 1.9-115.4-17.8z"/><path fill="#ea2d2e" d="M143.8 149.4c16.8 19.3-4.4 36.7-4.4 36.7s42.7-22 23.1-49.5c-18.3-25.8-32.3-38.6 43.6-82.8 0 0-119.1 29.7-62.3 95.6z"/><path fill="#f89820" d="M224.6 295.4s9.8 8.1-10.8 14.4c-39.3 11.9-163.5 15.4-197.9.5-12.4-5.4 10.8-12.8 18.1-14.4 7.6-1.6 11.9-1.3 11.9-1.3-13.7-9.7-88.6 19-38 27.2 138.1 22.4 251.7-10.1 216.7-26.4z"/><path fill="#f89820" d="M89.1 190.4s-62.8 14.9-22.3 20.3c17.2 2.3 51.4 1.8 83.3-.9 26.1-2.2 52.3-7 52.3-7s-9.2 3.9-15.9 8.5c-64.2 16.9-188.2 9-152.5-8.2 30.1-14.7 55.1-12.7 55.1-12.7z"/><path fill="#f89820" d="M193.1 253.4c65.2-33.9 35.1-66.5 14-62.1-5.1 1.1-7.4 2-7.4 2s1.9-3 5.5-4.3c41.1-14.4 72.7 42.6-13.4 65.2 0 .1.8-.7 1.3-.8z"/><path fill="#ea2d2e" d="M162.5 8s35.9 35.9-34.1 91.1c-56.2 44.4-12.8 69.7 0 98.6-32.8-29.6-56.8-55.7-40.7-80C110.5 80 176.3 63 162.5 8z"/><path fill="#f89820" d="M96.6 345.3c62.5 4 158.5-2.2 160.8-31.7 0 0-4.4 11.2-51.7 20.1-53.4 10-119.3 8.8-158.3 2.4 0 0 8 6.6 49.2 9.2z"/></svg>`,
  C: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="100%" height="100%"><circle cx="128" cy="128" r="120" fill="#555"/><path fill="#fff" d="M179 166c-9 16-26 26-45 26-30 0-54-24-54-54s24-54 54-54c19 0 36 10 45 26l-22 13c-5-9-14-15-23-15-17 0-30 14-30 30s13 30 30 30c9 0 18-6 23-15z"/></svg>`,
};

// Map tool names to logo keys
const LOGO_KEY = {
  "HTML5": "HTML5", "CSS3": "CSS3", "JavaScript": "JavaScript", "TypeScript": "TypeScript",
  "React": "React", "Tailwind CSS": "TailwindCSS", "Figma": "Figma",
  "Python": "Python", "Node.js": "NodeJS", "Flask": "Flask",
  "SQLAlchemy": "SQLAlchemy", "MySQL": "MySQL", "MongoDB": "MongoDB",
  "AWS": "AWS", "Docker": "Docker", "Kubernetes": "Kubernetes",
  "Terraform": "Terraform", "GitHub Actions": "GitHub", "Linux": "Linux",
  "Prometheus": "Prometheus", "Grafana": "Grafana", "Nginx": "Nginx",
  "Bash": "Bash", "Helm": "Helm", "Ansible": "Ansible",
  "Git": "Git", "GitHub": "GitHub", "VS Code": "VSCode",
  "Postman": "Postman", "Vim": "Vim", "Jira": "Jira",
  "Java": "Java", "C": "C",
};



/* ───────────────────────────────────────────
   DESIGN SYSTEM
   Dark editorial luxury — deep charcoal canvas,
   warm off-white type, amber accent lines.
   Fonts: Cormorant Garamond (display) + DM Sans (body)
─────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 1, num: "01",
    title: "Microservices Platform",
    desc: "Scalable e-commerce backend engineered with microservices architecture for high-throughput distributed systems.",
    img: "https://i.postimg.cc/BQL51M9B/Untitled-design-2.png",
    tags: ["Node.js", "Docker", "Kubernetes", "MongoDB"],
    category: "Backend",
    link: "https://github.com/FosterSetor9060",
    year: "2024",
  },
  {
    id: 2, num: "02",
    title: "CI/CD Pipeline Automation",
    desc: "End-to-end automated deployment pipeline for SaaS — zero-downtime deployments with full rollback support.",
    img: "https://i.postimg.cc/NMwW25zQ/1.png",
    tags: ["GitHub Actions", "Terraform", "AWS", "Docker"],
    category: "DevOps",
    link: "https://github.com/FosterSetor9060",
    year: "2024",
  },
  {
    id: 3, num: "03",
    title: "Real-time Assessment Platform",
    desc: "Interactive web dashboard for applicant assessment and automated grading with real-time analytics.",
    img: "https://i.postimg.cc/hP36bC5y/2.png",
    tags: ["Python", "SQLAlchemy", "MySQL", "Frontend"],
    category: "Frontend",
    link: "https://github.com/FosterSetor9060/Testcompanion_v1",
    year: "2024",
  },
  {
    id: 4, num: "04",
    title: "FosterLabs Career Website",
    desc: "Career-focused web platform connecting talent with opportunities — Python backend, modern UI.",
    img: null,
    tags: ["Python", "HTML", "CSS"],
    category: "Backend",
    link: "https://github.com/FosterSetor9060/fosterLabs-career-websit",
    year: "2023",
  },
  {
    id: 5, num: "05",
    title: "Accessories Hub",
    desc: "Polished e-commerce accessories storefront with immersive product browsing experience.",
    img: null,
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Frontend",
    link: "https://github.com/FosterSetor9060/Accessories-Website-Design",
    year: "2023",
  },
  {
    id: 6, num: "06",
    title: "Task Management App",
    desc: "Minimalist, responsive task management application with clean state management patterns.",
    img: null,
    tags: ["JavaScript", "CSS"],
    category: "Frontend",
    link: "https://github.com/FosterSetor9060/my-todo-app",
    year: "2023",
  },
];

const SKILLS_SE = [
  { label: "Frontend Development", pct: 90 },
  { label: "Backend Engineering", pct: 85 },
  { label: "Database Management", pct: 80 },
  { label: "API Design", pct: 95 },
  { label: "UI / UX", pct: 88 },
];
const SKILLS_DEVOPS = [
  { label: "Kubernetes", pct: 90 },
  { label: "AWS", pct: 85 },
  { label: "Terraform", pct: 80 },
  { label: "Docker", pct: 95 },
  { label: "CI / CD", pct: 88 },
];

const CLOUD = [
  { icon: "◈", title: "AWS Infrastructure", desc: "Scalable cloud architectures with EC2, S3, RDS, Lambda, and CloudFront.", tags: ["EC2","S3","Lambda","CloudFront"] },
  { icon: "◇", title: "Infrastructure as Code", desc: "Terraform modules for reproducible, version-controlled infrastructure at scale.", tags: ["Terraform","HCL","AWS"] },
  { icon: "▷", title: "CI/CD Pipelines", desc: "Automated pipelines via GitHub Actions across staging and production environments.", tags: ["GitHub Actions","Docker","CI/CD"] },
  { icon: "⬡", title: "Containerization", desc: "Docker-containerized services orchestrated with Kubernetes for high availability.", tags: ["Docker","Kubernetes","Helm"] },
  { icon: "◻", title: "Security & Compliance", desc: "GuardDuty, IAM policies, VPC hardening, and security group governance.", tags: ["GuardDuty","IAM","VPC"] },
  { icon: "◎", title: "Monitoring & Observability", desc: "CloudWatch dashboards, Grafana panels, and real-time alerting pipelines.", tags: ["CloudWatch","Grafana","Prometheus"] },
];

const TOOLS = [
  {
    category: "Frontend",
    icon: "◈",
    items: [
      { name: "HTML5",        logoKey: "HTML5" },
      { name: "CSS3",        logoKey: "CSS3" },
      { name: "JavaScript",        logoKey: "JavaScript" },
      { name: "React",        logoKey: "React" },
      { name: "Tailwind CSS",        logoKey: "TailwindCSS" },
      { name: "Figma",        logoKey: "Figma" },
    ],
  },
  {
    category: "Backend",
    icon: "◇",
    items: [
      { name: "Python",        logoKey: "Python" },
      { name: "Node.js",        logoKey: "NodeJS" },
      { name: "Flask",        logoKey: "Flask" },
      { name: "SQLAlchemy",        logoKey: "SQLAlchemy" },
      { name: "MySQL",        logoKey: "MySQL" },
      { name: "MongoDB",        logoKey: "MongoDB" },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: "▷",
    items: [
      { name: "AWS",        logoKey: "AWS" },
      { name: "Docker",        logoKey: "Docker" },
      { name: "Kubernetes",        logoKey: "Kubernetes" },
      { name: "Terraform",        logoKey: "Terraform" },
      { name: "GitHub Actions",        logoKey: "GitHub" },
      { name: "Linux",        logoKey: "Linux" },
    ],
  },
  {
    category: "Security & Monitoring",
    icon: "◻",
    items: [
      { name: "Prometheus",        logoKey: "Prometheus" },
      { name: "Grafana",        logoKey: "Grafana" },
      { name: "Nginx",        logoKey: "Nginx" },
      { name: "Bash",        logoKey: "Bash" },
      { name: "Helm",        logoKey: "Helm" },
      { name: "Ansible",        logoKey: "Ansible" },
    ],
  },
  {
    category: "Tools & Workflow",
    icon: "◎",
    items: [
      { name: "Git",        logoKey: "Git" },
      { name: "GitHub",        logoKey: "GitHub" },
      { name: "VS Code",        logoKey: "VSCode" },
      { name: "Postman",        logoKey: "Postman" },
      { name: "Vim",        logoKey: "Vim" },
      { name: "Jira",        logoKey: "Jira" },
    ],
  },
  {
    category: "Languages",
    icon: "✦",
    items: [
      { name: "Python",        logoKey: "Python" },
      { name: "JavaScript",        logoKey: "JavaScript" },
      { name: "TypeScript",        logoKey: "TypeScript" },
      { name: "Bash",        logoKey: "Bash" },
      { name: "Java",        logoKey: "Java" },
      { name: "C",        logoKey: "C" },
    ],
  },
];

const FILTER_CATS = ["All","Frontend","Backend","DevOps"];

/* ── ToolLogo component: renders inline SVG by name ── */
function ToolLogo({ name }) {
  const key = LOGO_KEY[name];
  const svg = key ? TOOL_LOGOS[key] : null;
  if (!svg) {
    return (
      <div style={{
        width: "36px", height: "36px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(255,255,255,.05)", borderRadius: "8px",
        fontSize: ".65rem", color: "var(--amber)", fontWeight: 700, letterSpacing: ".02em",
      }}>
        {name.slice(0,2).toUpperCase()}
      </div>
    );
  }
  return (
    <div
      style={{
        width: "36px", height: "36px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(255,255,255,.05)", borderRadius: "8px",
        padding: "5px",
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

/* ── hooks ── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, y = 40, style = {} }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : `translateY(${y}px)`,
      transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}s, transform .8s cubic-bezier(.16,1,.3,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function SkillBar({ label, pct, live }) {
  return (
    <div style={{ marginBottom: "22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignItems: "baseline" }}>
        <span style={{ fontSize: ".82rem", fontWeight: 500, color: "var(--muted)", letterSpacing: ".05em", textTransform: "uppercase" }}>{label}</span>
        <span style={{ fontSize: ".78rem", fontWeight: 600, color: "var(--amber)", fontFamily: "'DM Mono',monospace" }}>{pct}%</span>
      </div>
      <div style={{ height: "1px", background: "rgba(255,255,255,.08)", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "1px",
          width: live ? `${pct}%` : "0%",
          background: "linear-gradient(90deg, var(--amber), var(--amber-light))",
          transition: "width 1.4s cubic-bezier(.16,1,.3,1) .3s",
          boxShadow: "0 0 8px var(--amber)",
        }} />
        <div style={{
          position: "absolute", top: "-3px",
          left: live ? `${pct}%` : "0%",
          width: "7px", height: "7px", borderRadius: "50%",
          background: "var(--amber)",
          transform: "translateX(-50%)",
          transition: "left 1.4s cubic-bezier(.16,1,.3,1) .3s",
          boxShadow: "0 0 10px var(--amber)",
          opacity: live ? 1 : 0,
        }} />
      </div>
    </div>
  );
}

/* ── MAIN ── */
export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [skillsRef, skillsLive] = useInView(0.2);
  const heroRef = useRef(null);

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 60); setScrollY(window.scrollY); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap');

        :root {
          --bg: #0d0f14;
          --surface: #13161d;
          --surface2: #1a1e28;
          --border: rgba(255,255,255,.07);
          --border-strong: rgba(255,255,255,.12);
          --ink: #f0ece3;
          --muted: #7a7f8e;
          --subtle: #4a4f5e;
          --amber: #c9a84c;
          --amber-light: #e8c97a;
          --amber-dim: rgba(201,168,76,.12);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--ink); font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        a { color: inherit; text-decoration: none; }

        /* scrollbar */
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--amber); border-radius: 2px; }

        /* cursor line */
        .cursor-line { cursor: crosshair; }

        /* nav link */
        .nl { font-size: .78rem; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); cursor: pointer; transition: color .3s; }
        .nl:hover { color: var(--amber); }

        /* project row hover */
        .proj-row { border-top: 1px solid var(--border); transition: background .3s; cursor: pointer; }
        .proj-row:hover { background: var(--surface); }
        .proj-row:hover .proj-num { color: var(--amber); }
        .proj-row:hover .proj-arrow { opacity: 1; transform: translate(0,0); }
        .proj-num { color: var(--subtle); transition: color .3s; font-family: 'DM Mono', monospace; font-size: .72rem; }
        .proj-arrow { opacity: 0; transform: translate(-8px, 8px); transition: all .3s; color: var(--amber); font-size: 1.1rem; }

        /* filter btn */
        .fbtn { background: transparent; border: 1px solid var(--border); color: var(--muted); border-radius: 2px; padding: 8px 18px; font-size: .74rem; letter-spacing: .1em; text-transform: uppercase; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all .25s; }
        .fbtn:hover { border-color: var(--amber); color: var(--amber); }
        .fbtn.active { background: var(--amber); border-color: var(--amber); color: #0d0f14; font-weight: 700; }

        /* cloud card */
        .ccard { border: 1px solid var(--border); border-radius: 2px; padding: 32px; background: var(--surface); transition: all .3s; }
        .ccard:hover { border-color: var(--amber); background: var(--surface2); transform: translateY(-3px); }
        .ccard:hover .cicon { color: var(--amber); }
        .cicon { font-size: 1.4rem; color: var(--subtle); transition: color .3s; line-height: 1; }

        /* contact link row */
        .clink { display: flex; align-items: center; gap: 20px; padding: 20px 0; border-bottom: 1px solid var(--border); transition: all .25s; cursor: pointer; }
        .clink:hover { padding-left: 12px; border-color: var(--amber); }
        .clink:hover .clink-icon { color: var(--amber); border-color: var(--amber); }
        .clink-icon { width: 42px; height: 42px; border: 1px solid var(--border); border-radius: 2px; display: flex; align-items: center; justify-content: center; font-size: 1rem; color: var(--muted); flex-shrink: 0; transition: all .25s; }

        /* input focus */
        .field { width: 100%; background: var(--surface); border: 1px solid var(--border); color: var(--ink); padding: 14px 18px; font-family: 'DM Sans', sans-serif; font-size: .9rem; border-radius: 2px; outline: none; transition: border-color .25s; }
        .field::placeholder { color: var(--subtle); }
        .field:focus { border-color: var(--amber); }

        /* section label line */
        .slabel { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }
        .slabel::before { content: ''; display: block; width: 32px; height: 1px; background: var(--amber); }

        /* noise overlay */
        .noise { pointer-events: none; position: fixed; inset: 0; z-index: 1000; opacity: .025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px 128px;
        }

        /* ambient glow */
        .glow-orb { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }

        /* hero parallax line */
        @keyframes lineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        .hero-word { display:inline-block; opacity:0; animation: fadeSlideUp .9s cubic-bezier(.16,1,.3,1) forwards; }

        @media (max-width: 768px) {
          .hide-mob { display: none !important; }
          .hero-title { font-size: clamp(3.2rem, 12vw, 5rem) !important; }
          .two-col { flex-direction: column !important; }
          .three-col { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Grain */}
      <div className="noise" />

      <div style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh", position: "relative" }}>

        {/* ── NAV ─────────────────────────────── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 clamp(24px,5vw,72px)",
          height: scrolled ? "64px" : "80px",
          borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
          background: scrolled ? "rgba(13,15,20,.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          transition: "all .4s ease",
        }}>
          <div onClick={() => go("home")} style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.35rem", fontWeight: 600, letterSpacing: ".05em", cursor: "pointer", color: "var(--ink)" }}>
            FS<span style={{ color: "var(--amber)" }}>.</span>
          </div>

          <div className="hide-mob" style={{ display: "flex", gap: "40px" }}>
            {[["home","Home"],["about","About"],["projects","Work"],["tools","Stack"],["cloud-portfolio","Cloud"],["contact","Contact"]].map(([id,label]) => (
              <span key={id} className="nl" onClick={() => go(id)}>{label}</span>
            ))}
          </div>

          <a href="https://drive.google.com/uc?export=download&id=1IkKKdrxkSd2X53ZW5HTItjFaw2Ue2zPL"
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              border: "1px solid var(--amber)", color: "var(--amber)",
              padding: "9px 22px", fontSize: ".74rem", letterSpacing: ".1em",
              textTransform: "uppercase", fontWeight: 600, borderRadius: "2px",
              transition: "all .25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--amber)"; e.currentTarget.style.color = "#0d0f14"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--amber)"; }}
          >
            Resume
          </a>
        </nav>

        {/* ── HERO ─────────────────────────────── */}
        <section id="home" ref={heroRef} style={{
          minHeight: "100vh",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "0 clamp(24px,5vw,72px) clamp(60px,8vh,100px)",
          position: "relative", overflow: "hidden",
        }}>
          {/* ambient orbs */}
          <div className="glow-orb" style={{ width: 600, height: 600, background: "rgba(201,168,76,.06)", top: "10%", right: "-10%" }} />
          <div className="glow-orb" style={{ width: 400, height: 400, background: "rgba(99,102,241,.05)", bottom: "20%", left: "-5%" }} />

          {/* top meta */}
          <div style={{
            position: "absolute", top: "clamp(90px,14vh,130px)", left: "clamp(24px,5vw,72px)", right: "clamp(24px,5vw,72px)",
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          }}>
            <div>
              <div style={{ fontSize: ".72rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "8px" }}>Status</div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: ".82rem", color: "var(--ink)" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px #22c55e", animation: "pulse 2s infinite" }} />
                Available for work
              </div>
            </div>
            <div className="hide-mob" style={{ textAlign: "right" }}>
              <div style={{ fontSize: ".72rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "8px" }}>Location</div>
              <div style={{ fontSize: ".82rem", color: "var(--ink)" }}>Accra, Ghana</div>
            </div>
          </div>

          {/* main title */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ fontSize: ".75rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ display: "inline-block", width: 24, height: "1px", background: "var(--amber)" }} />
              Portfolio 2026
            </div>

            {/* Hero top row: title + photo */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", flexWrap: "wrap" }}>
              <h1 className="hero-title" style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(4rem, 10vw, 9rem)",
                fontWeight: 300, lineHeight: 0.95,
                letterSpacing: "-.02em",
                marginBottom: "0",
                color: "var(--ink)",
              }}>
                <span className="hero-word" style={{ animationDelay: ".05s" }}>Foster</span>
                {" "}
                <span className="hero-word" style={{ animationDelay: ".2s", fontStyle: "italic", color: "var(--amber)" }}>Setor</span>
              </h1>

              {/* Profile Photo */}
              <div style={{
                flexShrink: 0,
                width: "clamp(140px, 18vw, 220px)",
                height: "clamp(140px, 18vw, 220px)",
                borderRadius: "4px",
                overflow: "hidden",
                border: "1px solid var(--border-strong)",
                boxShadow: "0 0 60px rgba(201,168,76,.1)",
                animation: "floatY 5s ease-in-out infinite",
                position: "relative",
              }}>
                <img
                  src="https://i.postimg.cc/D0QtqVwd/IMG-3752.png"
                  alt="Foster Setor"
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", objectPosition: "center top",
                    filter: "contrast(1.05) brightness(0.95)",
                    display: "block",
                  }}
                />
                {/* amber overlay tint */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to bottom, transparent 60%, rgba(201,168,76,.08) 100%)",
                  pointerEvents: "none",
                }} />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "40px", flexWrap: "wrap", gap: "24px" }}>
              <p style={{
                fontSize: "clamp(.9rem,1.5vw,1.1rem)", color: "var(--muted)",
                maxWidth: "480px", lineHeight: 1.8, fontWeight: 300,
              }}>
                Software Developer & DevOps Engineer — building scalable systems, streamlining pipelines, and crafting cloud infrastructure that actually works.
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={() => go("projects")} style={{
                  background: "var(--amber)", color: "#0d0f14", border: "none",
                  padding: "13px 28px", fontSize: ".78rem", letterSpacing: ".1em",
                  textTransform: "uppercase", fontWeight: 700, cursor: "pointer",
                  borderRadius: "2px", transition: "all .25s",
                }}
                  onMouseEnter={e => { e.target.style.background = "var(--amber-light)"; }}
                  onMouseLeave={e => { e.target.style.background = "var(--amber)"; }}
                >View Work</button>
                <button onClick={() => go("contact")} style={{
                  background: "transparent", color: "var(--ink)", border: "1px solid var(--border-strong)",
                  padding: "13px 28px", fontSize: ".78rem", letterSpacing: ".1em",
                  textTransform: "uppercase", fontWeight: 500, cursor: "pointer",
                  borderRadius: "2px", transition: "all .25s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--amber)"; e.currentTarget.style.color = "var(--amber)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.color = "var(--ink)"; }}
                >Get In Touch</button>
              </div>
            </div>

            {/* divider */}
            <div style={{ height: "1px", background: "var(--border)", marginTop: "52px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, var(--amber), transparent)", transformOrigin: "left", animation: "lineGrow 1.4s cubic-bezier(.16,1,.3,1) .6s both" }} />
            </div>

            {/* bottom stats row */}
            <div style={{ display: "flex", gap: "48px", marginTop: "32px", flexWrap: "wrap" }}>
              {[
                { n: "7+", l: "Years of Development" },
                { n: "15+", l: "Projects Delivered" },
                { n: "5+", l: "Years of DevOps" },
                { n: "ALX", l: "Software Eng. Alumni" },
              ].map(s => (
                <div key={s.l}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontWeight: 600, color: "var(--amber)", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: ".72rem", color: "var(--muted)", letterSpacing: ".08em", textTransform: "uppercase", marginTop: "6px" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT / SKILLS ─────────────────── */}
        <section id="about" style={{ padding: "clamp(80px,12vh,130px) clamp(24px,5vw,72px)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

            <Reveal>
              <div className="slabel">
                <span style={{ fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--amber)" }}>About</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 300, letterSpacing: "-.02em", marginBottom: "60px", lineHeight: 1.1 }}>
                Skills &<br /><span style={{ fontStyle: "italic" }}>Expertise</span>
              </h2>
            </Reveal>

            <div className="two-col" style={{ display: "flex", gap: "80px", marginBottom: "72px" }}>
              <Reveal delay={0.05} style={{ flex: 1 }}>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "32px" }}>
                  <div style={{ fontSize: ".7rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "28px" }}>Software Engineering</div>
                  <div ref={skillsRef}>
                    {SKILLS_SE.map(s => <SkillBar key={s.label} label={s.label} pct={s.pct} live={skillsLive} />)}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1} style={{ flex: 1 }}>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "32px" }}>
                  <div style={{ fontSize: ".7rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "28px" }}>DevOps & Cloud</div>
                  {SKILLS_DEVOPS.map(s => <SkillBar key={s.label} label={s.label} pct={s.pct} live={skillsLive} />)}
                </div>
              </Reveal>
            </div>

            {/* background cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "1px", background: "var(--border)", border: "1px solid var(--border)" }}>
              {[
                {
                  label: "Software Engineer", years: "7+", projects: "15+",
                  body: "Specializing in robust, scalable applications. Passionate about clean code, efficient architectures, and solutions that deliver measurable impact.",
                },
                {
                  label: "DevOps Engineer", years: "5+", projects: "10+",
                  body: "Building and maintaining scalable cloud infrastructure. Expert in automation, containerization, and CI/CD for seamless software delivery.",
                },
                {
                  label: "ALX Alumni", years: "—", projects: "—",
                  body: "Graduate of the ALX Software Engineering program. Building innovative solutions at the intersection of code, cloud, and AI.",
                },
              ].map((c, i) => (
                <Reveal key={c.label} delay={i * 0.08}>
                  <div style={{ background: "var(--surface)", padding: "40px 36px" }}>
                    <div style={{ fontSize: ".7rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "20px" }}>{c.label}</div>
                    <p style={{ fontSize: ".9rem", color: "var(--muted)", lineHeight: 1.85, marginBottom: "36px", fontWeight: 300 }}>{c.body}</p>
                    <div style={{ display: "flex", gap: "36px" }}>
                      {[{ n: c.years, l: "Experience" }, { n: c.projects, l: "Projects" }].map(s => (
                        <div key={s.l}>
                          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.2rem", fontWeight: 600, color: "var(--ink)", lineHeight: 1 }}>{s.n}</div>
                          <div style={{ fontSize: ".7rem", color: "var(--subtle)", letterSpacing: ".08em", textTransform: "uppercase", marginTop: "5px" }}>{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ─────────────────────────── */}
        <section id="projects" style={{ padding: "clamp(80px,12vh,130px) clamp(24px,5vw,72px)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

            <Reveal>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "24px" }}>
                <div>
                  <div className="slabel">
                    <span style={{ fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--amber)" }}>Work</span>
                  </div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 300, letterSpacing: "-.02em", lineHeight: 1.1 }}>
                    Selected<br /><span style={{ fontStyle: "italic" }}>Projects</span>
                  </h2>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {FILTER_CATS.map(f => (
                    <button key={f} className={`fbtn${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Project list */}
            <div>
              {filtered.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06}>
                  <a href={p.link} target="_blank" rel="noreferrer" className="proj-row" style={{ display: "block", padding: "28px 0", textDecoration: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                      <span className="proj-num">{p.num}</span>

                      {/* optional thumbnail */}
                      {p.img && (
                        <div style={{ width: "72px", height: "48px", flexShrink: 0, overflow: "hidden", borderRadius: "2px", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      )}

                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "16px", flexWrap: "wrap" }}>
                          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.2rem,2.5vw,1.7rem)", fontWeight: 500, letterSpacing: "-.01em", color: "var(--ink)" }}>{p.title}</h3>
                          <span style={{ fontSize: ".7rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--amber)", border: "1px solid rgba(201,168,76,.25)", padding: "3px 10px", borderRadius: "2px" }}>{p.category}</span>
                        </div>
                        <p style={{ fontSize: ".84rem", color: "var(--muted)", marginTop: "6px", fontWeight: 300 }}>{p.desc}</p>
                      </div>

                      <div className="hide-mob" style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "220px" }}>
                        {p.tags.map(t => (
                          <span key={t} style={{ fontSize: ".68rem", letterSpacing: ".06em", color: "var(--subtle)", border: "1px solid var(--border)", padding: "3px 9px", borderRadius: "2px", fontFamily: "'DM Mono',monospace" }}>{t}</span>
                        ))}
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", flexShrink: 0 }}>
                        <span style={{ fontSize: ".7rem", color: "var(--subtle)", fontFamily: "'DM Mono',monospace" }}>{p.year}</span>
                        <span className="proj-arrow">↗</span>
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
              <div style={{ borderTop: "1px solid var(--border)" }} />
            </div>

            <Reveal delay={0.2}>
              <div style={{ marginTop: "40px", display: "flex", justifyContent: "flex-end" }}>
                <a href="https://github.com/FosterSetor9060?tab=repositories" target="_blank" rel="noreferrer" style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  fontSize: ".78rem", letterSpacing: ".1em", textTransform: "uppercase",
                  color: "var(--muted)", transition: "color .25s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--amber)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; }}
                >
                  All repositories on GitHub
                  <span style={{ width: 28, height: "1px", background: "currentColor", display: "inline-block" }} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── TECH STACK & TOOLS ───────────────── */}
        <section id="tools" style={{ padding: "clamp(80px,12vh,130px) clamp(24px,5vw,72px)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <Reveal>
              <div className="slabel">
                <span style={{ fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--amber)" }}>Stack</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "60px" }}>
                <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 300, letterSpacing: "-.02em", lineHeight: 1.1 }}>
                  Tools &<br /><span style={{ fontStyle: "italic" }}>Technologies</span>
                </h2>
                <p style={{ fontSize: ".88rem", color: "var(--muted)", maxWidth: "340px", lineHeight: 1.85, fontWeight: 300 }}>
                  Every tool I've worked with across the full software and infrastructure lifecycle.
                </p>
              </div>
            </Reveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: "1px", background: "var(--border)" }}>
              {TOOLS.map((group, gi) => (
                <Reveal key={group.category} delay={gi * 0.06}>
                  <div style={{ background: "var(--surface)", padding: "36px", transition: "background .3s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--surface2)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px", paddingBottom: "20px", borderBottom: "1px solid var(--border)" }}>
                      <span style={{ fontSize: "1.1rem", color: "var(--amber)", lineHeight: 1 }}>{group.icon}</span>
                      <span style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--amber)" }}>{group.category}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                      {group.items.map((tool) => (
                        <div key={tool.name} style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          padding: "12px 14px", border: "1px solid var(--border)",
                          borderRadius: "2px", transition: "all .3s", cursor: "default",
                          position: "relative", overflow: "hidden",
                        }}
                          onMouseEnter={e => {
                            e.currentTarget.style.borderColor = "rgba(201,168,76,.4)";
                            e.currentTarget.style.background = "rgba(201,168,76,.06)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          <ToolLogo name={tool.name} />
                          <span style={{ fontSize: ".78rem", color: "var(--muted)", letterSpacing: ".02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 400 }}>{tool.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div style={{
                marginTop: "1px", background: "var(--surface)", borderTop: "1px solid var(--border)",
                padding: "24px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
              }}>
                <div style={{ display: "flex", gap: "48px" }}>
                  {[
                    { n: TOOLS.length, l: "Categories" },
                    { n: TOOLS.reduce((a, g) => a + g.items.length, 0), l: "Total Tools" },
                  ].map(s => (
                    <div key={s.l} style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.2rem", fontWeight: 600, color: "var(--amber)", lineHeight: 1 }}>{s.n}</span>
                      <span style={{ fontSize: ".72rem", color: "var(--subtle)", letterSpacing: ".1em", textTransform: "uppercase" }}>{s.l}</span>
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: ".75rem", color: "var(--subtle)", letterSpacing: ".08em", fontStyle: "italic" }}>Continuously expanding · ALX Alumni</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CLOUD PORTFOLIO ────────────────── */}
        <section id="cloud-portfolio" style={{ padding: "clamp(80px,12vh,130px) clamp(24px,5vw,72px)", borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <Reveal>
              <div className="slabel">
                <span style={{ fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--amber)" }}>Infrastructure</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 300, letterSpacing: "-.02em", marginBottom: "16px", lineHeight: 1.1 }}>
                Cloud Engineer<br /><span style={{ fontStyle: "italic" }}>Portfolio</span>
              </h2>
              <p style={{ fontSize: ".9rem", color: "var(--muted)", maxWidth: "460px", lineHeight: 1.8, fontWeight: 300, marginBottom: "60px" }}>
                Specialized expertise in cloud infrastructure, automation, and modern DevOps practices.
              </p>
            </Reveal>

            <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1px", background: "var(--border)" }}>
              {CLOUD.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className="ccard">
                    <div className="cicon" style={{ marginBottom: "20px" }}>{item.icon}</div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-.01em", marginBottom: "12px", color: "var(--ink)" }}>{item.title}</h3>
                    <p style={{ fontSize: ".85rem", color: "var(--muted)", lineHeight: 1.75, fontWeight: 300, marginBottom: "20px" }}>{item.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {item.tags.map(t => (
                        <span key={t} style={{ fontSize: ".68rem", letterSpacing: ".06em", color: "var(--amber)", border: "1px solid rgba(201,168,76,.2)", padding: "3px 9px", borderRadius: "2px", fontFamily: "'DM Mono',monospace" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────── */}
        <section id="contact" style={{ padding: "clamp(80px,12vh,130px) clamp(24px,5vw,72px)", borderTop: "1px solid var(--border)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <Reveal>
              <div className="slabel">
                <span style={{ fontSize: ".72rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--amber)" }}>Contact</span>
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 300, letterSpacing: "-.02em", marginBottom: "60px", lineHeight: 1.1 }}>
                Let's Work<br /><span style={{ fontStyle: "italic" }}>Together</span>
              </h2>
            </Reveal>

            <div className="two-col" style={{ display: "flex", gap: "80px", alignItems: "flex-start" }}>
              {/* Left — links */}
              <Reveal style={{ flex: 1 }}>
                <p style={{ fontSize: ".9rem", color: "var(--muted)", lineHeight: 1.85, fontWeight: 300, marginBottom: "40px", maxWidth: "380px" }}>
                  Open to full-time roles, freelance contracts, and technical collaborations. Reach out — I respond within 24 hours.
                </p>
                {[
                  { icon: "✉", label: "Email", val: "fostersetor6@gmail.com", href: "mailto:fostersetor6@gmail.com" },
                  { icon: "⌨", label: "GitHub", val: "github.com/FosterSetor9060", href: "https://github.com/FosterSetor9060" },
                  { icon: "↗", label: "LinkedIn", val: "linkedin.com/in/FosterSetor", href: "https://www.linkedin.com/in/FosterSetor" },
                  { icon: "▷", label: "YouTube", val: "bit.ly/3uZLyxB", href: "https://bit.ly/3uZLyxB" },
                ].map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="clink">
                    <div className="clink-icon">{link.icon}</div>
                    <div>
                      <div style={{ fontSize: ".68rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--subtle)", marginBottom: "3px" }}>{link.label}</div>
                      <div style={{ fontSize: ".88rem", fontWeight: 400, color: "var(--ink)" }}>{link.val}</div>
                    </div>
                    <span style={{ marginLeft: "auto", fontSize: ".8rem", color: "var(--subtle)" }}>↗</span>
                  </a>
                ))}
              </Reveal>

              {/* Right — form */}
              <Reveal delay={0.1} style={{ flex: 1 }}>
                {sent ? (
                  <div style={{
                    border: "1px solid rgba(201,168,76,.3)",
                    borderRadius: "2px", padding: "52px 36px", textAlign: "center",
                    background: "rgba(201,168,76,.04)",
                  }}>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "3rem", fontStyle: "italic", color: "var(--amber)", marginBottom: "16px" }}>Thank you.</div>
                    <p style={{ color: "var(--muted)", fontSize: ".9rem", lineHeight: 1.7, marginBottom: "28px" }}>Your message has been received. I'll get back to you shortly.</p>
                    <button onClick={() => setSent(false)} style={{
                      background: "transparent", border: "1px solid var(--amber)", color: "var(--amber)",
                      padding: "10px 24px", fontSize: ".76rem", letterSpacing: ".1em",
                      textTransform: "uppercase", cursor: "pointer", borderRadius: "2px", fontFamily: "'DM Sans',sans-serif",
                    }}>Send Another</button>
                  </div>
                ) : (
                  <div style={{ border: "1px solid var(--border)", borderRadius: "2px", padding: "40px 36px", background: "var(--surface)" }}>
                    <div style={{ fontSize: ".7rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--amber)", marginBottom: "28px" }}>Send a message</div>
                    <div style={{ marginBottom: "18px" }}>
                      <div style={{ fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "8px" }}>Name</div>
                      <input className="field" placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div style={{ marginBottom: "18px" }}>
                      <div style={{ fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "8px" }}>Email</div>
                      <input className="field" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div style={{ marginBottom: "28px" }}>
                      <div style={{ fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "8px" }}>Message</div>
                      <textarea className="field" rows={5} placeholder="Tell me about your project or opportunity..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: "vertical" }} />
                    </div>
                    <button onClick={() => setSent(true)} style={{
                      width: "100%", background: "var(--amber)", color: "#0d0f14", border: "none",
                      padding: "15px", fontSize: ".78rem", letterSpacing: ".12em",
                      textTransform: "uppercase", fontWeight: 700, cursor: "pointer",
                      borderRadius: "2px", fontFamily: "'DM Sans',sans-serif", transition: "background .25s",
                    }}
                      onMouseEnter={e => { e.target.style.background = "var(--amber-light)"; }}
                      onMouseLeave={e => { e.target.style.background = "var(--amber)"; }}
                    >Send Message</button>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────── */}
        <footer style={{
          borderTop: "1px solid var(--border)", padding: "36px clamp(24px,5vw,72px)",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px",
        }}>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontWeight: 600, letterSpacing: ".05em" }}>
            FS<span style={{ color: "var(--amber)" }}>.</span>
          </div>
          <span style={{ fontSize: ".74rem", color: "var(--subtle)", letterSpacing: ".08em" }}>© 2026 Foster Setor · All Rights Reserved</span>
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              ["GitHub", "https://github.com/FosterSetor9060"],
              ["LinkedIn", "https://www.linkedin.com/in/FosterSetor"],
              ["YouTube", "https://bit.ly/3uZLyxB"],
              ["Email", "mailto:fostersetor6@gmail.com"],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase",
                color: "var(--subtle)", transition: "color .25s",
              }}
                onMouseEnter={e => { e.target.style.color = "var(--amber)"; }}
                onMouseLeave={e => { e.target.style.color = "var(--subtle)"; }}
              >{label}</a>
            ))}
          </div>
        </footer>

      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:.4;} }`}</style>
    </>
  );
}
