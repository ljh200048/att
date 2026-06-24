import { Product } from '../types';

// ==========================================
// HIGH-FIDELITY PURE SVG DESIGNS (Obeying Rule 8)
// Specially engineered to represent the real products in the user's Instagram feed!
// ==========================================

// 1. "S W" Vertical White Strap Keyring (Post 5 of Instagram feed)
const customStrapWhiteSWSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="%23FFFDF0"/>
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="black" stroke-width="8"/>
  
  {/* Drop Shadows */}
  <path d="M175,60 L245,60 L245,340 L175,340 Z" fill="rgba(0,0,0,0.06)" transform="translate(8, 8)"/>
  <circle cx="205" cy="55" r="30" fill="none" stroke="rgba(0,0,0,0.15)" stroke-width="12" transform="translate(2, 2)"/>
  
  {/* Top Heavy Silver Ring */}
  <circle cx="205" cy="55" r="30" fill="none" stroke="%23A0AEC0" stroke-width="12"/>
  <circle cx="205" cy="55" r="30" fill="none" stroke="%23CBD5E0" stroke-width="4"/>
  <rect x="195" y="80" width="20" height="15" fill="%23718096" rx="2" stroke="black" stroke-width="3"/>
  
  {/* Fabric Strap Body - Woven Cotton Webbing texture */}
  <path d="M175,90 L235,90 L235,330 L175,330 Z" fill="%23FFFFFF" stroke="black" stroke-width="7" stroke-linejoin="round"/>
  {/* Weave Stitches */}
  <path d="M185,95 L185,325 M200,95 L200,325 M215,95 L215,325 M225,95 L225,325" stroke="%23E2E8F0" stroke-width="1.5" stroke-dasharray="3, 5"/>
  
  {/* Silver Metal Bottom Tip Clamp */}
  <rect x="171" y="322" width="68" height="18" fill="url(%23silver_metal)" stroke="black" stroke-width="5" rx="1"/>

  {/* Letters 'S' and 'W' arranged vertically - heavy reflective black gloss acrylic style */}
  <g transform="translate(0, 5)">
    {/* Shadow S */}
    <text x="208" y="178" font-family="'Arial Black', 'Impact', sans-serif" font-size="52" font-weight="900" text-anchor="middle" fill="rgba(0,0,0,0.25)">S</text>
    {/* Letter S */}
    <text x="205" y="175" font-family="'Arial Black', 'Impact', sans-serif" font-size="52" font-weight="900" text-anchor="middle" fill="%231A202C" stroke="black" stroke-width="4">S</text>
    {/* Highlight S */}
    <path d="M198,145 Q205,140 210,147" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/>
    
    {/* Shadow W */}
    <text x="208" y="248" font-family="'Arial Black', 'Impact', sans-serif" font-size="44" font-weight="900" text-anchor="middle" fill="rgba(0,0,0,0.25)">W</text>
    {/* Letter W */}
    <text x="205" y="245" font-family="'Arial Black', 'Impact', sans-serif" font-size="44" font-weight="900" text-anchor="middle" fill="%231A202C" stroke="black" stroke-width="4">W</text>
    {/* Highlight W */}
    <path d="M192,225 L198,245" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  </g>

  {/* Brand Label Decal */}
  <rect x="180" y="285" width="50" height="12" fill="%23FF1493" stroke="black" stroke-width="2" rx="1"/>
  <text x="205" y="294" font-family="monospace" font-size="7" font-weight="900" text-anchor="middle" fill="white">att_seoul</text>

  <defs>
    <linearGradient id="silver_metal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="%23718096"/>
      <stop offset="35%" stop-color="%23CBD5E0"/>
      <stop offset="50%" stop-color="%23FFFFFF"/>
      <stop offset="65%" stop-color="%23CBD5E0"/>
      <stop offset="100%" stop-color="%234A5568"/>
    </linearGradient>
  </defs>
</svg>`;

// 2. Custom Strap with Acoustic Guitar & Airplane Wappens (Post 6 - Right side black strap)
const customStrapBlackGuitarSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="%23FFFDF0"/>
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="black" stroke-width="8"/>
  
  {/* Shadow */}
  <path d="M175,65 L235,65 L235,340 L175,340 Z" fill="rgba(0,0,0,0.12)" transform="translate(10, 8)"/>
  
  {/* Gold Buckle Clasp on Top */}
  <circle cx="205" cy="50" r="26" fill="none" stroke="%23D4AF37" stroke-width="12" transform="translate(2, 2)"/>
  <circle cx="205" cy="55" r="22" fill="none" stroke="%23FFD700" stroke-width="10"/>
  <rect x="193" y="75" width="24" height="18" fill="%23B8860B" stroke="black" stroke-width="3" rx="2"/>

  {/* Black heavy-duty webbing strap fabric */}
  <path d="M175,90 L235,90 L235,335 L175,335 Z" fill="%23111111" stroke="black" stroke-width="7"/>
  {/* Ribbon ridges pattern */}
  <path d="M180,95 L180,330 M190,95 L190,330 M200,95 L200,330 M210,95 L210,330 M220,95 L220,330 M230,95 L230,330" stroke="%232D3748" stroke-width="2" stroke-dasharray="2, 6"/>

  {/* Guitar Embroidery Patch (Attached onto strap) */}
  <g transform="translate(182, 110) scale(0.9)">
    <path d="M25,0 L25,40 Q25,60 10,65 Q0,70 10,85 Q25,100 25,115 L25,120 L28,120 L28,115 Q28,100 43,85 Q53,70 43,65 Q28,60 28,40 L28,0 Z" fill="%23A0522D" stroke="black" stroke-width="4" stroke-linejoin="round"/>
    <path d="M14,65 C12,75 12,85 24,93" fill="none" stroke="%23FF8C00" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="26" cy="80" rx="6" ry="10" fill="black" stroke="%23D4AF37" stroke-width="2"/>
    <rect x="23" y="-30" width="6" height="35" fill="%23DEB887" stroke="black" stroke-width="2"/>
    <line x1="25" y1="-30" x2="25" y2="70" stroke="white" stroke-width="1.5"/>
    <line x1="27" y1="-30" x2="27" y2="70" stroke="white" stroke-width="1.5"/>
    {/* Guitar head */}
    <rect x="21" y="-42" width="10" height="15" fill="%238B4513" stroke="black" stroke-width="2" rx="1"/>
    <circle cx="18" cy="-35" r="2.5" fill="%23FFD700" stroke="black" stroke-width="1"/>
    <circle cx="34" cy="-35" r="2.5" fill="%23FFD700" stroke="black" stroke-width="1"/>
  </g>

  {/* Embroidered Blue Airplane Patch (Beautifully layered) */}
  <g transform="translate(162, 230) rotate(-10) scale(0.85)">
    {/* Thread outline effect */}
    <path d="M5,40 L35,38 L45,5 L55,5 L60,35 L90,32 L95,45 L62,48 L58,80 L75,90 L70,98 L48,90 L25,95 L28,84 L45,76 L40,48 L5,45 Z" fill="%233182CE" stroke="black" stroke-width="5" stroke-linejoin="round"/>
    <path d="M10,40 L33,38 L43,8 L49,8 L55,36 L83,34 L87,42 L57,44 L53,77 L68,85 L65,90 L44,84 L22,89 L24,81 L40,71 L36,44 L10,42 Z" fill="%2363B3ED" stroke="white" stroke-dasharray="2, 2" stroke-width="2.5"/>
    {/* Cockpit window sticker */}
    <ellipse cx="25" cy="40" rx="5" ry="3" fill="white" stroke="black" stroke-width="1.5"/>
  </g>

  {/* Stitched letters 'A' and 'G' in neon pink embroidery */}
  <g transform="translate(0, -55)">
     <text x="206" y="258" font-family="'Impact', sans-serif" font-size="28" fill="%23FF1493" stroke="black" stroke-width="6" stroke-linejoin="round" text-anchor="middle" font-weight="900">A</text>
     <text x="204" y="256" font-family="'Impact', sans-serif" font-size="28" fill="%23FFF" text-anchor="middle" font-weight="900">A</text>
     
     <text x="206" y="288" font-family="'Impact', sans-serif" font-size="28" fill="%23FF1493" stroke="black" stroke-width="6" stroke-linejoin="round" text-anchor="middle" font-weight="900">G</text>
     <text x="204" y="286" font-family="'Impact', sans-serif" font-size="28" fill="%23FFF" text-anchor="middle" font-weight="900">G</text>
  </g>

  {/* Stitch stamp at the tail */}
  <rect x="171" y="327" width="68" height="15" fill="%23FFD700" stroke="black" stroke-width="4"/>
  <text x="205" y="338" font-family="monospace" font-size="8" font-weight="900" text-anchor="middle" fill="black">att!_LIVE</text>
</svg>`;

// 3. Custom Strap with Skateboard & "DOM" letters (Post 6 - Left side white strap)
const customStrapWhiteDOMSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="%23FFFDF0"/>
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="black" stroke-width="8"/>
  
  <path d="M175,65 L235,65 L235,340 L175,340 Z" fill="rgba(0,0,0,0.06)" transform="translate(8, 8)"/>
  
  {/* Shiny Gold Circle Hanger at top */}
  <circle cx="205" cy="50" r="28" fill="none" stroke="%23D4AF37" stroke-width="12"/>
  <circle cx="205" cy="50" r="28" fill="none" stroke="%23FFE066" stroke-width="4"/>
  <rect x="194" y="75" width="22" height="16" fill="%23B8860B" stroke="black" stroke-width="3.5" rx="1.5"/>

  {/* White Textured Fabric Webbing strap */}
  <path d="M175,90 L235,90 L235,335 L175,335 Z" fill="%23FFFDF0" stroke="black" stroke-width="7" stroke-linejoin="round"/>
  <path d="M185,95 L185,325 M195,95 L195,325 M205,95 L205,325 M215,95 L215,325 M225,95 L225,325" stroke="%23E2E8F0" stroke-width="2" stroke-dasharray="2, 4"/>

  {/* Colorful bold Letters 'D', 'O', 'M' arranged vertically inside bubble border */}
  <g transform="translate(0, 5)">
    <g transform="translate(205, 140)">
      <circle cx="0" cy="0" r="22" fill="%23FF1493" stroke="black" stroke-width="4.5" shadow="[2px_2px_0px_black]"/>
      <text x="0" y="8" font-family="'Arial Black', sans-serif" font-size="26" font-weight="950" fill="white" text-anchor="middle">D</text>
    </g>

    <g transform="translate(205, 192)">
      <circle cx="0" cy="0" r="22" fill="%2300BFFF" stroke="black" stroke-width="4.5"/>
      <text x="0" y="8" font-family="'Arial Black', sans-serif" font-size="24" font-weight="950" fill="white" text-anchor="middle">O</text>
    </g>

    <g transform="translate(205, 244)">
      <circle cx="0" cy="0" r="22" fill="%2339FF14" stroke="black" stroke-width="4.5"/>
      <text x="0" y="7" font-family="'Arial Black', sans-serif" font-size="20" font-weight="950" fill="black" text-anchor="middle">M</text>
    </g>
  </g>

  {/* Skateboard Retro Patch overlay at bottom tip */}
  <g transform="translate(170, 275) rotate(15) scale(0.75)">
    <rect x="0" y="10" width="80" height="25" fill="%23FFD700" rx="10" stroke="black" stroke-width="4"/>
    <rect x="5" y="14" width="70" height="17" fill="none" stroke="%23FF1493" stroke-width="2" stroke-dasharray="5,3" rx="7"/>
    {/* Wheels */}
    <circle cx="20" cy="38" r="8" fill="black"/>
    <circle cx="20" cy="38" r="3" fill="white"/>
    <circle cx="60" cy="38" r="8" fill="black"/>
    <circle cx="60" cy="38" r="3" fill="white"/>
    <text x="40" y="27" font-family="sans-serif" font-size="10" font-weight="900" fill="black" text-anchor="middle">SKate</text>
  </g>

  {/* Metal Tip Bottom end */}
  <rect x="171" y="327" width="68" height="15" fill="%23CBD5E0" stroke="black" stroke-width="4"/>
</svg>`;

// 4. Headphones, 'H', 'U', Cloud Black custom strap (Post 8 in Instagram layout)
const headphonesCloudStrapBlackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="%23FFFDF0"/>
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="black" stroke-width="8"/>
  
  <path d="M175,65 L235,65 L235,340 L175,340 Z" fill="rgba(0,0,0,0.12)" transform="translate(10, 8)"/>

  {/* D-clasp top in golden finish */}
  <circle cx="205" cy="50" r="26" fill="none" stroke="%23D4AF37" stroke-width="12"/>
  <rect x="194" y="75" width="22" height="15" fill="%23B8860B" stroke="black" stroke-width="3"/>

  {/* Strap black heavy thread */}
  <path d="M175,88 L235,88 L235,335 L175,335 Z" fill="%231A202C" stroke="black" stroke-width="6"/>
  <line x1="185" y1="92" x2="185" y2="330" stroke="%232D3748" stroke-width="2" stroke-dasharray="3, 3"/>
  <line x1="225" y1="92" x2="225" y2="330" stroke="%232D3748" stroke-width="2" stroke-dasharray="3, 3"/>

  {/* Cyber Headphones Patch on Strap */}
  <g transform="translate(162, 105) scale(0.65)">
    {/* Outer ear muffs arch */}
    <path d="M10,50 Q10,0 60,0 Q110,0 110,50" fill="none" stroke="%23D4AF37" stroke-width="10" stroke-linecap="round"/>
    <path d="M10,50 Q10,0 60,0 Q110,0 110,50" fill="none" stroke="black" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10,50 Q10,0 60,0 Q110,0 110,50" fill="none" stroke="%2339FF14" stroke-width="8" stroke-linecap="round"/>
    
    {/* Left Muff */}
    <rect x="-3" y="42" width="30" height="48" fill="%23FF1493" rx="12" stroke="black" stroke-width="5"/>
    <ellipse cx="12" cy="66" rx="6" ry="14" fill="white"/>
    
    {/* Right Muff */}
    <rect x="93" y="42" width="30" height="48" fill="%23FF1493" rx="12" stroke="black" stroke-width="5"/>
    <ellipse cx="108" cy="66" rx="6" ry="14" fill="white"/>

    {/* Connecting band stripe */}
    <line x1="25" y1="66" x2="95" y2="66" stroke="%2300BFFF" stroke-width="6"/>
  </g>

  {/* Letters 'H', 'U' custom lettering embroidery */}
  <g transform="translate(0, -5)">
    <text x="208" y="210" font-family="'Impact', sans-serif" font-size="28" font-weight="900" fill="%2339FF14" stroke="black" stroke-width="5" text-anchor="middle">H</text>
    <text x="205" y="207" font-family="'Impact', sans-serif" font-size="28" font-weight="900" fill="white" text-anchor="middle">H</text>

    <text x="208" y="246" font-family="'Impact', sans-serif" font-size="28" font-weight="900" fill="%2339FF14" stroke="black" stroke-width="5" text-anchor="middle">U</text>
    <text x="205" y="243" font-family="'Impact', sans-serif" font-size="28" font-weight="900" fill="white" text-anchor="middle">U</text>
  </g>

  {/* White Cloud fluffy stitch patch at bottom */}
  <g transform="translate(160, 260) scale(0.68)">
    <path d="M20,40 C10,40 0,55 0,72 C0,90 20,100 45,100 C50,100 90,100 100,100 C110,100 120,85 120,72 C120,55 105,50 95,52 C90,30 65,20 45,30 C35,25 25,32 20,40 Z" fill="white" stroke="black" stroke-width="6" stroke-linejoin="round"/>
    <path d="M20,42 C12,42 4,56 4,72 C4,87 22,96 45,96 C50,96 88,96 98,96 C108,96 116,83 116,72 C116,57 102,52 93,54 C88,34 64,24 45,34 C36,29 26,35 20,42 Z" fill="none" stroke="%2300BFFF" stroke-dasharray="3, 3" stroke-width="3"/>
  </g>

  {/* Gold bottom tip finish */}
  <rect x="171" y="327" width="67" height="15" fill="%23D4AF37" stroke="black" stroke-width="4"/>
</svg>`;

// 5. Black GVM Strap with space green disc (Post 2 of Instagram feed - Left side)
const gvmNeonDiskStrapBlackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="%23FFFDF0"/>
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="black" stroke-width="8"/>
  
  <path d="M175,65 L235,65 L235,340 L175,340 Z" fill="rgba(0,0,0,0.12)" transform="translate(10, 8)"/>
  
  {/* Gold Ring hanger */}
  <circle cx="205" cy="50" r="26" fill="none" stroke="%23D4AF37" stroke-width="12"/>
  <rect x="194" y="75" width="22" height="15" fill="%23B8860B" stroke="black" stroke-width="3"/>

  {/* Black Strap */}
  <path d="M175,88 L235,88 L235,335 L175,335 Z" fill="%230F0F12" stroke="black" stroke-width="6"/>

  {/* Letters 'G', 'V', 'M' in magenta hotpink with stitch detailing */}
  <g transform="translate(0, 10)">
    <g transform="translate(205, 120)">
      <rect x="-18" y="-18" width="36" height="36" rx="6" fill="%23FF1493" stroke="black" stroke-width="3.5"/>
      <text x="0" y="8" font-family="'Arial Black', sans-serif" font-size="22" font-weight="950" fill="white" text-anchor="middle">G</text>
    </g>
    <g transform="translate(205, 164)">
      <rect x="-18" y="-18" width="36" height="36" rx="6" fill="%2300BFFF" stroke="black" stroke-width="3.5"/>
      <text x="0" y="8" font-family="'Arial Black', sans-serif" font-size="22" font-weight="950" fill="white" text-anchor="middle">V</text>
    </g>
    <g transform="translate(205, 208)">
      <rect x="-18" y="-18" width="36" height="36" rx="6" fill="%2339FF14" stroke="black" stroke-width="3.5"/>
      <text x="0" y="8" font-family="'Arial Black', sans-serif" font-size="18" font-weight="950" fill="black" text-anchor="middle">M</text>
    </g>
  </g>

  {/* Neon Space Plate / golf green disc design at bottom */}
  <g transform="translate(160, 245) scale(0.65)">
    {/* Oval Green Ground Disk */}
    <ellipse cx="70" cy="80" rx="60" ry="24" fill="%2339FF14" stroke="black" stroke-width="7"/>
    <ellipse cx="70" cy="80" rx="45" ry="14" fill="none" stroke="white" stroke-width="3" stroke-dasharray="4, 4"/>
    {/* Standing red tee Pin or rocket stem */}
    <line x1="70" y1="80" x2="70" y2="20" stroke="black" stroke-width="8"/>
    <line x1="70" y1="80" x2="70" y2="20" stroke="%23FF1493" stroke-width="3"/>
    <circle cx="70" cy="15" r="10" fill="black"/>
    <circle cx="70" cy="15" r="5" fill="white"/>
  </g>

  {/* Metal end clip finish */}
  <rect x="171" y="327" width="67" height="15" fill="%23CBD5E0" stroke="black" stroke-width="4"/>
</svg>`;

// 6. "LOVE EVERYWHERE" Horizontal Ribbon Embroidery Patch (Post 4 of Instagram feed)
const loveEverywhereWappenSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 350" width="100%" height="100%">
  <rect width="400" height="350" fill="%23FFFDF0"/>
  <rect x="15" y="15" width="370" height="320" fill="none" stroke="black" stroke-width="8"/>

  {/* Drop shadow for 3D realism */}
  <path d="M30,140 Q110,105 200,140 Q290,175 370,140 C370,195 370,220 370,220 Q290,255 200,220 Q110,185 30,220 Z" fill="rgba(0,0,0,0.08)" transform="translate(6, 6)"/>

  {/* Curved Cream Banner Base */}
  <path d="M30,140 Q110,105 200,140 Q290,175 370,140 C370,195 370,220 370,220 Q290,255 200,220 Q110,185 30,220 Z" fill="%23FCFBF2" stroke="black" stroke-width="6" stroke-linejoin="round"/>
  
  {/* Scalloped Double Thread Edge Stitching (Gives real embroidery texture) */}
  <path d="M30,140 Q110,105 200,140 Q290,175 370,140 C370,195 370,220 370,220 Q290,255 200,220 Q110,185 30,220 Z" fill="none" stroke="%23A0AEC0" stroke-dasharray="2, 6" stroke-width="2.5"/>

  {/* Embossed Bold Text along the curve */}
  <g transform="translate(0, 15)">
    {/* Stitched letters arranged to fit the ribbon wave */}
    <text x="50" y="165" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="28" fill="black" transform="rotate(-15, 50, 165)">L</text>
    <text x="70" y="156" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="28" fill="black" transform="rotate(-12, 70, 156)">O</text>
    <text x="94" y="150" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="28" fill="black" transform="rotate(-8, 94, 150)">V</text>
    <text x="115" y="147" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="28" fill="black" transform="rotate(-4, 115, 147)">E</text>

    {/* Center Red Embroidery Heart */}
    <path d="M148,142 C148,135 140,130 134,136 C128,142 148,155 148,155 C148,155 168,142 162,136 C156,130 148,135 148,142 Z" fill="%23FF1493" stroke="black" stroke-width="2" transform="scale(1.1) translate(-10, -12)"/>

    {/* EVERYWHERE styled on the right curve */}
    <text x="175" y="155" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="26" fill="black" transform="rotate(3, 175, 155)">E</text>
    <text x="195" y="158" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="26" fill="black" transform="rotate(5, 195, 158)">V</text>
    <text x="215" y="162" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="26" fill="black" transform="rotate(7, 215, 162)">E</text>
    <text x="235" y="166" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="26" fill="black" transform="rotate(9, 235, 166)">R</text>
    <text x="255" y="172" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="26" fill="black" transform="rotate(11, 255, 172)">Y</text>
    <text x="275" y="178" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="26" fill="black" transform="rotate(13, 275, 178)">W</text>
    <text x="303" y="186" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="26" fill="black" transform="rotate(15, 303, 186)">H</text>
    <text x="325" y="196" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="26" fill="black" transform="rotate(17, 325, 196)">E</text>
    <text x="345" y="206" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="26" fill="black" transform="rotate(19, 345, 206)">R</text>
    <text x="365" y="216" font-family="'Impact', Arial, sans-serif" font-weight="900" font-size="26" fill="black" transform="rotate(21, 365, 216)">E</text>
  </g>

  {/* Stitched text bubble */}
  <text x="200" y="275" font-family="monospace" font-size="11" font-weight="900" fill="gray" text-anchor="middle">att embroidery original co.</text>
</svg>`;

// 7. Y2K Retro icons combo patch collage (Skateboard, Arcade console, Cherry)
const retroGameSkateWappenSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="%23FFFDF0"/>
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="black" stroke-width="8"/>

  {/* Arcade cabinet wappen on left */}
  <g transform="translate(60, 40) rotate(-10) scale(0.9)">
    <rect x="0" y="0" width="110" height="150" fill="%2300BFFF" stroke="black" stroke-width="6" rx="4"/>
    <rect x="10" y="10" width="90" height="55" fill="black" stroke="black" stroke-width="4"/>
    <text x="55" y="45" font-family="monospace" font-size="18" font-weight="900" fill="%2339FF14" text-anchor="middle">PLAY</text>
    <rect x="10" y="75" width="90" height="50" fill="%23FF1493" stroke="black" stroke-width="4"/>
    {/* buttons */}
    <circle cx="45" cy="100" r="10" fill="%23FEE500" stroke="black" stroke-width="3"/>
    <circle cx="75" cy="100" r="10" fill="%2339FF14" stroke="black" stroke-width="3"/>
  </g>

  {/* Skateboard on right */}
  <g transform="translate(180, 200) rotate(15) scale(0.95)">
    <rect x="0" y="20" width="140" height="38" fill="%23FF1493" rx="15" stroke="black" stroke-width="6"/>
    <rect x="10" y="26" width="120" height="26" fill="none" stroke="white" stroke-dasharray="4,4" stroke-width="3" rx="10"/>
    <circle cx="35" cy="62" r="12" fill="black" stroke="black" stroke-width="2"/>
    <circle cx="35" cy="62" r="4" fill="white"/>
    <circle cx="105" cy="62" r="12" fill="black" stroke="black" stroke-width="2"/>
    <circle cx="105" cy="62" r="4" fill="white"/>
    <text x="70" y="44" font-family="'Arial Black', sans-serif" font-size="12" font-weight="950" fill="white" text-anchor="middle">STREET</text>
  </g>

  {/* Cherry link in upper right */}
  <g transform="translate(230, 40) rotate(5) scale(0.8)">
    <ellipse cx="40" cy="120" rx="35" ry="35" fill="%2339FF14" stroke="black" stroke-width="6"/>
    <ellipse cx="110" cy="130" rx="35" ry="35" fill="%23FF1493" stroke="black" stroke-width="6"/>
    <path d="M72,40 L40,120 M72,40 L110,130" stroke="black" fill="none" stroke-width="6" stroke-linecap="round"/>
  </g>
</svg>`;

// 8. Classic high-gloss neon pink heart pendant keyring
const pinkHeartKeyringSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <rect width="400" height="400" fill="%23FFFDF0"/>
  <rect x="15" y="15" width="370" height="370" fill="none" stroke="black" stroke-width="8"/>
  <circle cx="200" cy="50" r="28" fill="%23000" stroke="%23FFF" stroke-width="4"/>
  <circle cx="200" cy="50" r="14" fill="%23FFFDF0"/>
  <line x1="200" y1="78" x2="200" y2="130" stroke="black" stroke-width="12" stroke-linecap="round"/>
  <path d="M200,140 C200,90 120,70 80,120 C40,170 60,240 130,300 L200,365 L270,300 C340,240 360,170 320,120 C280,70 200,90 200,140 Z" fill="%23FF1493" stroke="black" stroke-width="16" stroke-linejoin="round"/>
  <path d="M120,160 C130,135 170,135 180,165" fill="none" stroke="white" stroke-width="10" stroke-linecap="round"/>
  <text x="200" y="240" font-family="'Impact', 'Arial Black', sans-serif" font-size="34" fill="black" font-weight="900" text-anchor="middle" transform="rotate(-15, 200, 240)">att_love</text>
</svg>`;

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'pink-heart-keyring',
    name: 'att 핫핑크 아크릴 하트 볼체인 커스텀 키링',
    price: 8500,
    originalPrice: 12000,
    discountRate: 29,
    description: '어태치(att)만의 힙하고 유니크한 취향을 붙이는 핫핑크 고밀도 아크릴 하트 키링입니다. 투명하고 선명한 마감광택과 탄탄한 볼체인 마운트로 옷, 파우치, 헤드폰 케이스 백참 등 최상의 코디력을 선사합니다.',
    category: 'keyring',
    images: [pinkHeartKeyringSvg],
    colors: ['핫핑크', '라임그린', '네온블루'],
    options: ['실버 볼체인형', '핑크 컬러볼체인 추가 (+500원)', '키치 하트 고리 추가 (+1000원)'],
    size: '가로 4.5cm x 세로 5cm (체인 총길이 약 10cm)',
    material: '고광택 투명 카스티드 아크릴 3mm, 황동 크로뮴 합금 체인',
    leadTime: '우체국 안심 포장 당일 혹은 가공 완료 후 익일 오전 배송 등록',
    shippingFee: 0,
    rating: 4.9,
    reviewCount: 124,
    isPopular: true
  },
  {
    id: 'custom-strap-sw',
    name: 'att 오리지널 이니셜 화이트 스트랩 키링 [S W]',
    price: 11500,
    originalPrice: 15000,
    discountRate: 23,
    description: 'Instagram 피드의 선풍적인 인기를 끌었던 바로 그 모델! 도톰하게 직조 가공한 화이트 직물 스트랩에 입체적인 아크릴 로고 단독 마운트를 얹어 Y2K 감성의 힙하고 깔끔한 뒤축 코디력을 완성합니다. D-링 금장/은장 고리 기본 커스텀 사양.',
    category: 'keyring',
    images: [customStrapWhiteSWSvg],
    colors: ['오프화이트', '매트블랙', '라임그린'],
    options: ['정규 실버 서지컬 클래스형', '골드 하이클래스 버클 마운트 추가 (+1500원)', '키홀더 이니셜 추가각인 (+1000원)'],
    size: '스트랩 가로 2.5cm x 총길이 14.5cm (기성 마운트 최적화)',
    material: '고밀도 친환경 방직 코튼 웹 스트랩, 은합금 가공 마운터 스틸링',
    leadTime: '주문제작 접수 완료 시 1.5 영업일 이내 안전 기공 및 송장 안내',
    shippingFee: 0,
    rating: 5.0,
    reviewCount: 88,
    isPopular: true
  },
  {
    id: 'custom-strap-guitar',
    name: 'att 미니어처 일렉 기타 & 블루 에어플레인 자수 스트랩 키링 [A G]',
    price: 13800,
    originalPrice: 18000,
    discountRate: 23,
    description: '힙스터들의 최애 조합! 블랙 탄탄 코튼 하이드 스트랩에 한땀씩 고품격 수작업 컴퓨터 자수로 직조한 올드 카우 어코스틱기타 자수 와펜과 sky-blue 비행기 패치, 그리고 A와 G 두터운 자수 이니셜이 세트로 배치되어 강렬한 개성을 연출합니다.',
    category: 'keyring',
    images: [customStrapBlackGuitarSvg],
    colors: ['딥블랙 스트랩', '밀크화이트 스트랩', '베이비핑크 스트랩'],
    options: ['앤틱골드 크로스버클 패키지 (기본)', '랍스터 원터치 카라비너 세트 (+1000원)'],
    size: '가로 3cm x 길이 15cm (자수 전면 마운트 스케일)',
    material: '수입 프리미엄 캔버스 블랙 웨빙, 독일산 친환경 고급 자수 코튼 원사',
    leadTime: '수공예가 한땀씩 정성 가공하므로 1~3일 소요',
    shippingFee: 0,
    rating: 4.9,
    reviewCount: 154,
    isPopular: true
  },
  {
    id: 'custom-strap-dom',
    name: 'att 캔디 핑크 이니셜 화이트 스트랩 키링 [D O M]',
    price: 12500,
    originalPrice: 16000,
    discountRate: 21,
    description: 'Instagram 실시간 문의 주문 폭발 모델! 매끄럽고 부드러운 화이트 웹벨트 기본 바탕 위에 핫핑크 글리터 동글 이니셜 벨트핀 D, O, M 3종과 Y2K 감성 물씬 풍기는 골드 스케이트보드 슬라이드 와펜이 조화를 이룹니다.',
    category: 'keyring',
    images: [customStrapWhiteDOMSvg],
    colors: ['크림화이트', '펑키스트릿블랙', '라벤더퍼플'],
    options: ['안심 골드 스냅 결속형', '랍스터 금장 스틸 버클 연장형 (+1000원)'],
    size: '가로 2.8cm x 총길이 15.2cm 부품 포함',
    material: '고광택 폴리아세탈 D-링 훅, 카스티드 쉘 아크릴 이니셜 링',
    leadTime: '당일 우체국 소포 특송 등록 지원',
    shippingFee: 0,
    rating: 4.8,
    reviewCount: 112,
    isPopular: true
  },
  {
    id: 'headphones-cloud-strap',
    name: 'att 네온 헤드폰 & 클라우드 커스텀 블랙 스트랩 키링 [H U]',
    price: 13200,
    originalPrice: 17000,
    discountRate: 22,
    description: '음악 애호가들과 스트리트 패션 매니아들의 원조 최애템! 고중량 블랙 웨빙 끈 위에 네온 핑크 아날로그 헤드폰 와펜과 H, U 글자 자수, 구름모양 패치가 함께 스티칭되어 무선 헤드폰 케이스나 백팩에 부착하면 환상적인 피팅을 가미합니다.',
    category: 'keyring',
    images: [headphonesCloudStrapBlackSvg],
    colors: ['스트릿블랙', '아이보리크림', '코즈믹네이비'],
    options: ['골드 카라비너 D-링 (기본)', '키치 오성 별고리 교체 (+500원)', '1:1 이니셜 2자 맞춤변경 특권 (+1500원)'],
    size: '전체 폭 3cm x 총길이 15.8cm 최적 결속',
    material: '독일 원천 코튼 봉사, 나일론 웹 강화 스크래치 방지 스트랩',
    leadTime: '접수 확인 후 24시간 이내 수제가공 출고 보장',
    shippingFee: 0,
    rating: 4.9,
    reviewCount: 96,
    isPopular: true
  },
  {
    id: 'gvm-neon-disk-strap',
    name: 'att 펑크 핫핑크 마운트 블랙 스트랩 키링 [G V M]',
    price: 11800,
    originalPrice: 15500,
    discountRate: 23,
    description: '인스타 피드 1열 메인을 장식한 하이-레벨 키링! 칠흑 같은 딥블랙 고급 스트랩 끈에 핫핑크 "G", "V", 그리고 라임그린 "M" 사각형 이니셜 패치에 네온 우주 비행 접시 디스크 와펜을 결합시켜 독보적인 감각을 뿜어냅니다.',
    category: 'keyring',
    images: [gvmNeonDiskStrapBlackSvg],
    colors: ['딥스트릿 블랙', '사이버 핫핑크', '라임 크리스탈'],
    options: ['골드 버클 마운터', '원터치 서지컬 원형 스마트링 (+1000원)', '가죽 스트랩 스트랩 연장 기공 (+1550원)'],
    size: '가로 2.5cm x 길이 15cm 테일 피팅',
    material: '울트라 압착 나일론 코튼 믹스 웹, 카보네이트 아연합금 훅',
    leadTime: '주문제작 1~2일 완료 즉시 수령 특송',
    shippingFee: 0,
    rating: 5.0,
    reviewCount: 72,
    isPopular: true
  },
  {
    id: 'love-everywhere-patch',
    name: 'att 오리지널 "LOVE EVERYWHERE" 곡선 직조 와펜',
    price: 4500,
    originalPrice: 6000,
    discountRate: 25,
    description: 'Instagram 피드에서 가장 시선을 끌었던 시그니처 와펜 패치! 파도 소리를 닮은 물결 무늬 보드 위에 Chunky Black 원사 자수로 "LOVE ♥ EVERYWHERE" 레터링과 볼륨 하트를 정성스럽게 수제 직조 장식하였습니다. 옷핀, 다리미 고온 압착 지원.',
    category: 'wappen',
    images: [loveEverywhereWappenSvg],
    colors: ['오프화이트 바디', '사이버블랙 바디', '핫네온 라임 바디'],
    options: ['다리미 고정용 핫멜트식 (기본)', '다목적 하이-본딩 스마트 스티커형', '옷 장착용 후면 옷핀 2볼 추가 가공 (+800원)'],
    size: '가로 8.5cm x 세로 4.8cm 볼륨 물결식',
    material: '고밀도 타타미 스티치 직물 코튼 사, 뒷면 열융합 폴리아미드 코팅',
    leadTime: '주문 즉시 당일 특송 가이딩 출고',
    shippingFee: 3000,
    rating: 4.8,
    reviewCount: 132,
    isPopular: true
  },
  {
    id: 'retro-arcade-wappen',
    name: 'att Y2K 아케이드 게임 & 체리 복합 자수 와펜 패키지',
    price: 6800,
    originalPrice: 9000,
    discountRate: 24,
    description: '올드스쿨 힙합 컬렉터를 위한 종합 와펜팩! 고해상도 자수 공정으로 한치의 흐트러짐 없이 연출한 미니어처 아케이드 오락기 와펜, 핑크 스케이트 보드, 달콤한 이중 체리 패치가 한 세트로 묶여 파격 혜택 가치로 구성된 실속 자수 와펜 패키지입니다.',
    category: 'wappen',
    images: [retroGameSkateWappenSvg],
    colors: ['오리지널 네온 믹스', '레트로 흑백 솔리드'],
    options: ['다리미 열접착 필름타입', '에코백용 수제 옷핀 가공 패키지 (+1000원)', '100% 완전 직봉용 무융합 원초타입'],
    size: '오락기: 5.5cm x 7.5cm / 보드: 7cm x 2cm',
    material: '최고급 직수 사염 편사 직조, 열반응성 핫멜트 본드 후면 가공',
    leadTime: '영업일 기준 1일 이내 신속 출고',
    shippingFee: 0,
    rating: 4.9,
    reviewCount: 94,
    isPopular: false
  }
];

// Helper to bridge virtual preview configurations with specific product IDs
export function getProductPreviewConfig(productId: string, selectColor?: string, selectOption?: string) {
  const normColor = selectColor || '기본공용';
  return {
    shape: 'bear' as const,
    selectedColor: normColor,
    wording: 'att',
    charmType: 'heart' as const,
    hasGlitter: 'basic' as const
  };
}

// Global functions for state management in mock backend
export function getProducts(): Product[] {
  const stored = localStorage.getItem('att_products3');
  if (!stored) {
    localStorage.setItem('att_products3', JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  try {
    const list = JSON.parse(stored);
    // If list does not contain 'pink-heart-keyring', force-refresh to DEFAULT_PRODUCTS!
    if (list.length === 0 || !list.some((p: any) => p.id === 'pink-heart-keyring')) {
      localStorage.setItem('att_products3', JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }

    // Ensure all products have images and they are not empty
    let changed = false;
    const updatedList = list.map((p: any) => {
      const defaultProd = DEFAULT_PRODUCTS.find((d: any) => d.id === p.id);
      if (defaultProd && (!p.images || p.images.length === 0)) {
        changed = true;
        return { ...p, images: defaultProd.images };
      }
      return p;
    });
    if (changed) {
      localStorage.setItem('att_products3', JSON.stringify(updatedList));
      return updatedList;
    }

    return list;
  } catch (e) {
    return DEFAULT_PRODUCTS;
  }
}

export function saveProducts(products: Product[]) {
  localStorage.setItem('att_products3', JSON.stringify(products));
}
