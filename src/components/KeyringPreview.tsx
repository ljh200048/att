/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles } from 'lucide-react';

interface KeyringPreviewProps {
  productId?: string;
  shape?: 'heart' | 'circle' | 'square' | 'star' | 'bear';
  selectedColor?: string; // hex or tailwind text
  wording?: string;
  charmType?: 'heart' | 'ribbon' | 'bear' | 'star' | 'flower' | 'none';
  hasGlitter?: 'none' | 'basic' | 'holographic';
  customImageRef?: string; // base64 reference string for a photo keyring
  className?: string;
  interactive?: boolean;
}

export default function KeyringPreview({
  productId,
  shape = 'heart',
  selectedColor = '#FFD1D7',
  wording = 'att',
  charmType = 'ribbon',
  hasGlitter = 'none',
  customImageRef,
  className = '',
  interactive = true,
}: KeyringPreviewProps) {
  // Convert custom strap color names to beautiful high-contrast hex codes for textile webbing
  const getHexColor = (col: string) => {
    if (col.startsWith('#')) return col;
    switch (col) {
      case '러블리핑크': case '핑크': case '베이비핑크': return '#FFD1D7';
      case '소프트라벤더': case '라이트퍼플': case '퍼플': case '소프트퍼플': return '#E1D5F5';
      case '스카이블루': case '블루': return '#C5E3FC';
      case '크림화이트': case '화이트': return '#FAFAF9';
      case '딥블랙': case '블랙': return '#292524';
      case '허니옐로우': case '옐로우': return '#FFF59D';
      case '피치살구': case '피치블라썸': case '살구': return '#FFE0B2';
      case '네이비블루': case '네이비': return '#1E293B';
      default: return col || '#FFD1D7';
    }
  };

  const hexColor = getHexColor(selectedColor);
  const isDarkStrap = hexColor === '#292524' || hexColor === '#1E293B';

  // Characters split helper for vertical embroidered patches
  const baseLetterPatches = (wording || '').toUpperCase().slice(0, 5).split('');

  // Pastel colored backings for letters to mimic handmade felt alphabet patches
  const letterColors = [
    { bg: '#FF94A2', text: '#FFFFFF' }, // Pink
    { bg: '#FFF59D', text: '#3E2723' }, // Yellow
    { bg: '#C5E3FC', text: '#1E293B' }, // Blue
    { bg: '#C8E6C9', text: '#1B5E20' }, // Green
    { bg: '#E1D5F5', text: '#4A148C' }  // Lavender
  ];

  return (
    <div 
      id="keyring-preview-container" 
      className={`relative flex flex-col items-center justify-center p-4 bg-amber-50/20 backdrop-blur-md rounded-2xl border-4 border-dashed border-pink-100 transition-all duration-300 ${interactive ? 'hover:scale-105 hover:shadow-lg' : ''} ${className}`}
      style={{ minHeight: '260px' }}
    >
      {/* Glittering Sparkle Micro Indicators (Embroidered sparkle stars) */}
      {hasGlitter !== 'none' && (
        <div id="sparkle-particles" className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          <Sparkles className="absolute text-yellow-400 w-5 h-5 top-8 left-12 glitter-particle opacity-80 animate-pulse" />
          <Sparkles className="absolute text-pink-400 w-4 h-4 bottom-12 right-12 glitter-particle opacity-70 animate-bounce" />
          <Sparkles className="absolute text-teal-400 w-4 h-4 top-16 right-16 glitter-particle opacity-60" style={{ animationDelay: '0.4s' }} />
          <Sparkles className="absolute text-yellow-300 w-6 h-6 bottom-16 left-16 glitter-particle opacity-90" style={{ animationDelay: '0.8s' }} />
        </div>
      )}

      {/* Interactive Vector Clasp & Woven Strap System */}
      <svg 
        id="keyring-vector-canvas" 
        width="180" 
        height="260" 
        viewBox="0 0 100 130" 
        className="drop-shadow-[0_10px_20px_rgba(40,40,45,0.18)] select-none"
      >
        <defs>
          {/* Metallic gradients for clips and crimps */}
          <linearGradient id="metal-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#FFD54F" />
            <stop offset="100%" stopColor="#FFB300" />
          </linearGradient>
          <linearGradient id="metal-silver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ECEFF1" />
            <stop offset="50%" stopColor="#B0BEC5" />
            <stop offset="100%" stopColor="#78909C" />
          </linearGradient>
          
          {/* Inner shade overlay for fabric webbing texture */}
          <pattern id="webbing-texture" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M0 4L4 0M-1 1L1 -1M3 5L5 3" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
          </pattern>
        </defs>

        {productId && (productId === 'kiki-face-brown' || productId.startsWith('wacky') || productId.startsWith('lily') || productId.startsWith('leo') || productId.startsWith('hooded')) ? (
          <g id="wacky-custom-graphics">
            {productId === 'kiki-face-brown' && (
              <g id="kiki-face-brown-svg">
                {/* Ring */}
                <circle cx="50" cy="18" r="8" fill="none" stroke="#B0BEC5" strokeWidth="2.5" />
                <circle cx="50" cy="27" r="3" fill="none" stroke="#78909C" strokeWidth="1.5" />
                {/* Ears */}
                <circle cx="30" cy="48" r="14" fill="#8B5A2B" stroke="#6F441B" strokeWidth="1.5" />
                <circle cx="30" cy="48" r="8" fill="#F48FB1" />
                <circle cx="70" cy="48" r="14" fill="#8B5A2B" stroke="#6F441B" strokeWidth="1.5" />
                <circle cx="70" cy="48" r="8" fill="#F48FB1" />
                {/* Head */}
                <circle cx="50" cy="74" r="32" fill="#8B5A2B" stroke="#6F441B" strokeWidth="1.8" />
                {/* Cheeks */}
                <circle cx="32" cy="80" r="4.5" fill="#FF8A80" opacity="0.8" />
                <circle cx="68" cy="80" r="4.5" fill="#FF8A80" opacity="0.8" />
                {/* Snout */}
                <ellipse cx="50" cy="80" rx="12" ry="9" fill="#FFF8E1" />
                {/* Nose & Smile */}
                <polygon points="50,76 47,73 53,73" fill="#3E2723" />
                <path d="M 48,81 Q 50,83 52,81" fill="none" stroke="#3E2723" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 50,76 L 50,81" stroke="#3E2723" strokeWidth="1.2" />
                {/* Eyes */}
                <circle cx="41" cy="68" r="3" fill="#212121" />
                <circle cx="41" cy="67" r="1" fill="#FFF" />
                <circle cx="59" cy="68" r="3" fill="#212121" />
                <circle cx="59" cy="67" r="1" fill="#FFF" />
              </g>
            )}

            {productId === 'wacky-luggage-black' && (
              <g id="wacky-luggage-black-svg">
                {/* Hook */}
                <path d="M 46,10 L 54,10 L 52,32 L 48,32 Z" fill="#78909C" />
                <circle cx="50" cy="12" r="5" fill="none" stroke="#546E7A" strokeWidth="1.8" />
                {/* Tag */}
                <rect x="28" y="32" width="44" height="78" rx="8" fill="#212121" stroke="#FFEB3B" strokeWidth="1.5" />
                {/* Stitching effect */}
                <rect x="31" y="35" width="38" height="72" rx="5" fill="none" stroke="#FFF" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.4" />
                {/* Yellow Lightning bolt smiley */}
                <path d="M 42,48 L 56,48 L 46,65 L 58,65 L 40,94 L 48,68 L 38,68 Z" fill="#FFEB3B" />
                {/* Smile details */}
                <circle cx="46" cy="58" r="2.2" fill="#212121" />
                <circle cx="54" cy="58" r="2.2" fill="#212121" />
                <path d="M 47,66 Q 50,70 53,66" fill="none" stroke="#212121" strokeWidth="1.5" strokeLinecap="round" />
                {/* Tiny Text tag */}
                <rect x="36" y="98" width="28" height="6" rx="2" fill="#FFEB3B" />
                <text x="50" y="103" textAnchor="middle" fontSize="4.5" fontWeight="bold" fill="#212121" fontFamily="sans-serif">WACKY</text>
              </g>
            )}

            {productId === 'wacky-luggage-purple' && (
              <g id="wacky-luggage-purple-svg">
                <path d="M 46,10 L 54,10 L 52,32 L 48,32 Z" fill="#78909C" />
                <circle cx="50" cy="12" r="5" fill="none" stroke="#546E7A" strokeWidth="1.8" />
                {/* Tag with cat ear outline on top */}
                <rect x="28" y="36" width="44" height="74" rx="8" fill="#B39DDB" stroke="#FFF" strokeWidth="1" />
                {/* Cat ears top detail */}
                <polygon points="28,38 36,28 44,36" fill="#B39DDB" stroke="#FFF" strokeWidth="1" />
                <polygon points="72,38 64,28 56,36" fill="#B39DDB" stroke="#FFF" strokeWidth="1" />
                {/* Stitching effect */}
                <rect x="31" y="39" width="38" height="68" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="0.6" strokeDasharray="2.5,2.5" opacity="0.6" />
                {/* Cross neon cat eyes */}
                <path d="M 38,55 L 44,61 M 44,55 L 38,61" stroke="#FF4081" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 56,55 L 62,61 M 62,55 L 56,61" stroke="#FF4081" strokeWidth="2.5" strokeLinecap="round" />
                {/* Nose & whiskers */}
                <polygon points="50,65 48,63 52,63" fill="#FF4081" />
                <line x1="44" y1="66" x2="36" y2="64" stroke="#FF4081" strokeWidth="1.2" />
                <line x1="44" y1="69" x2="35" y2="70" stroke="#FF4081" strokeWidth="1.2" />
                <line x1="56" y1="66" x2="64" y2="64" stroke="#FF4081" strokeWidth="1.2" />
                <line x1="56" y1="69" x2="65" y2="70" stroke="#FF4081" strokeWidth="1.2" />
                {/* Text tag */}
                <text x="50" y="94" textAnchor="middle" fontSize="6" fontWeight="900" fill="#FFF" fontFamily="Impact">MEOW</text>
              </g>
            )}

            {productId === 'wacky-luggage-yellow' && (
              <g id="wacky-luggage-yellow-svg">
                <path d="M 46,10 L 54,10 L 52,32 L 48,32 Z" fill="#424242" />
                <circle cx="50" cy="12" r="5" fill="none" stroke="#212121" strokeWidth="1.8" />
                {/* Tag */}
                <rect x="28" y="32" width="44" height="78" rx="8" fill="#FFF176" stroke="#FBC02D" strokeWidth="1.8" />
                <rect x="31" y="35" width="38" height="72" rx="5" fill="none" stroke="#E65100" strokeWidth="0.6" strokeDasharray="2,2" opacity="0.6" />
                {/* Big bolt symbol */}
                <path d="M 44,45 L 60,45 L 48,67 L 58,67 L 38,98 L 48,70 L 36,70 Z" fill="#212121" />
                <circle cx="45" cy="55" r="2.5" fill="#FFF176" />
                <circle cx="54" cy="55" r="2.5" fill="#FFF176" />
                <path d="M 46,62 Q 50,66 53,62" fill="none" stroke="#FFF176" strokeWidth="1.8" strokeLinecap="round" />
              </g>
            )}

            {productId === 'lily-pouch-black' && (
              <g id="lily-pouch-black-svg">
                {/* Ring */}
                <circle cx="50" cy="16" r="9" fill="none" stroke="#B0BEC5" strokeWidth="2.8" />
                <line x1="50" y1="25" x2="50" y2="35" stroke="#90A4AE" strokeWidth="2" />
                {/* Flower Petals */}
                <g id="flower-group" transform="translate(50,75)">
                  <circle cx="0" cy="-24" r="16" fill="#212121" />
                  <circle cx="21" cy="-12" r="16" fill="#212121" />
                  <circle cx="21" cy="12" r="16" fill="#212121" />
                  <circle cx="0" cy="24" r="16" fill="#212121" />
                  <circle cx="-21" cy="12" r="16" fill="#212121" />
                  <circle cx="-21" cy="-12" r="16" fill="#212121" />
                  {/* Center Face */}
                  <circle cx="0" cy="0" r="18" fill="#FFFFFF" stroke="#000" strokeWidth="1" />
                  {/* Blue highlight petal (bottom left) */}
                  <circle cx="-13" cy="13" r="10" fill="#448AFF" opacity="0.85" />
                  {/* Happy face */}
                  <circle cx="-5" cy="-3" r="2" fill="#212121" />
                  <circle cx="5" cy="-3" r="2" fill="#212121" />
                  <path d="M -6,5 Q 0,11 6,5" fill="none" stroke="#212121" strokeWidth="2.2" strokeLinecap="round" />
                  {/* Sparkle star */}
                  <path d="M 10,-10 L 12,-14 L 14,-10 L 18,-8 L 14,-6 L 12,-2 L 10,-6 L 6,-8 Z" fill="#FFF59D" />
                </g>
              </g>
            )}

            {productId === 'lily-pouch-white' && (
              <g id="lily-pouch-white-svg">
                <circle cx="50" cy="16" r="9" fill="none" stroke="#B0BEC5" strokeWidth="2.8" />
                <line x1="50" y1="25" x2="50" y2="35" stroke="#90A4AE" strokeWidth="2" />
                <g id="flower-white-group" transform="translate(50,75)">
                  {/* Petals are lovely pastel blue in white version */}
                  <circle cx="0" cy="-24" r="16" fill="#C5E3FC" />
                  <circle cx="21" cy="-12" r="16" fill="#C5E3FC" />
                  <circle cx="21" cy="12" r="16" fill="#C5E3FC" />
                  <circle cx="0" cy="24" r="16" fill="#C5E3FC" />
                  <circle cx="-21" cy="12" r="16" fill="#C5E3FC" />
                  <circle cx="-21" cy="-12" r="16" fill="#C5E3FC" />
                  {/* Center Face */}
                  <circle cx="0" cy="0" r="18" fill="#FFFFFF" stroke="#C5E3FC" strokeWidth="1" />
                  {/* Pink accent petal */}
                  <circle cx="-13" cy="13" r="10" fill="#FF8A80" opacity="0.85" />
                  {/* Happy face */}
                  <circle cx="-5" cy="-3" r="2" fill="#1E293B" />
                  <circle cx="5" cy="-3" r="2" fill="#1E293B" />
                  <path d="M -6,5 Q 0,11 6,5" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
                  {/* Sparkle star */}
                  <path d="M 10,-10 L 12,-14 L 14,-10 L 18,-8 L 14,-6 L 12,-2 L 10,-6 L 6,-8 Z" fill="#FFE082" />
                </g>
              </g>
            )}

            {productId === 'leo-fleece-black' && (
              <g id="leo-fleece-black-svg">
                <circle cx="50" cy="18" r="8" fill="none" stroke="#78909C" strokeWidth="2" />
                <line x1="50" y1="26" x2="50" y2="38" stroke="#78909C" strokeWidth="1.5" />
                {/* Fleece cat ears pointy */}
                <polygon points="20,44 32,24 44,48" fill="#212121" stroke="#FF4081" strokeWidth="1.2" />
                <polygon points="80,44 68,24 56,48" fill="#212121" stroke="#FF4081" strokeWidth="1.2" />
                {/* Cat head */}
                <ellipse cx="50" cy="74" rx="34" ry="28" fill="#212121" stroke="#FF4081" strokeWidth="1.5" />
                {/* Fleece curly lines overlay */}
                <path d="M 24,70 Q 28,66 32,70 T 40,70 T 48,70 T 56,70 T 64,70 T 72,70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <path d="M 28,80 Q 32,76 36,80 T 44,80 T 52,80 T 60,80 T 68,80" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                {/* Neon Pink stitching eyes */}
                <path d="M 33,65 L 43,65 M 33,65 Q 38,72 43,65" fill="none" stroke="#FF4081" strokeWidth="2" strokeLinecap="round" />
                <path d="M 57,65 L 67,65 M 57,65 Q 62,72 67,65" fill="none" stroke="#FF4081" strokeWidth="2" strokeLinecap="round" />
                {/* Nose smile details */}
                <polygon points="50,75 48,72 52,72" fill="#FF4081" />
                <path d="M 47,80 Q 50,82 53,80" fill="none" stroke="#FF4081" strokeWidth="1.5" strokeLinecap="round" />
                {/* Whiskers */}
                <line x1="42" y1="76" x2="28" y2="76" stroke="#FF4081" strokeWidth="1" />
                <line x1="42" y1="80" x2="26" y2="82" stroke="#FF4081" strokeWidth="1" />
                <line x1="58" y1="76" x2="72" y2="76" stroke="#FF4081" strokeWidth="1" />
                <line x1="58" y1="80" x2="74" y2="82" stroke="#FF4081" strokeWidth="1" />
              </g>
            )}

            {productId === 'leo-fleece-purple' && (
              <g id="leo-fleece-purple-svg">
                <circle cx="50" cy="18" r="8" fill="none" stroke="#78909C" strokeWidth="2" />
                <line x1="50" y1="26" x2="50" y2="38" stroke="#78909C" strokeWidth="1.5" />
                <polygon points="20,44 32,24 44,48" fill="#B39DDB" stroke="#8E24AA" strokeWidth="1.2" />
                <polygon points="80,44 68,24 56,48" fill="#B39DDB" stroke="#8E24AA" strokeWidth="1.2" />
                <ellipse cx="50" cy="74" rx="34" ry="28" fill="#B39DDB" stroke="#8E24AA" strokeWidth="1.5" />
                <path d="M 24,70 Q 28,66 32,70 T 40,70 T 48,70 T 56,70 T 64,70 T 72,70" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <path d="M 28,80 Q 32,76 36,80 T 44,80 T 52,80 T 60,80 T 68,80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                <path d="M 33,65 L 43,65 M 33,65 Q 38,72 43,65" fill="none" stroke="#8E24AA" strokeWidth="2" strokeLinecap="round" />
                <path d="M 57,65 L 67,65 M 57,65 Q 62,72 67,65" fill="none" stroke="#8E24AA" strokeWidth="2" strokeLinecap="round" />
                <polygon points="50,75 48,72 52,72" fill="#8E24AA" />
                <path d="M 47,80 Q 50,82 53,80" fill="none" stroke="#8E24AA" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="42" y1="76" x2="28" y2="76" stroke="#8E24AA" strokeWidth="1" />
                <line x1="42" y1="80" x2="26" y2="82" stroke="#8E24AA" strokeWidth="1" />
                <line x1="58" y1="76" x2="72" y2="76" stroke="#8E24AA" strokeWidth="1" />
                <line x1="58" y1="80" x2="74" y2="82" stroke="#8E24AA" strokeWidth="1" />
              </g>
            )}

            {productId === 'hooded-kiki-blue' && (
              <g id="hooded-kiki-blue-svg">
                <circle cx="50" cy="18" r="8" fill="none" stroke="#78909C" strokeWidth="2" />
                <line x1="50" y1="26" x2="50" y2="35" stroke="#78909C" strokeWidth="1.5" />
                {/* Rabbit ears */}
                <rect x="36" y="15" width="8" height="25" rx="4" fill="#C5E3FC" stroke="#1565C0" strokeWidth="1" />
                <rect x="56" y="15" width="8" height="25" rx="4" fill="#C5E3FC" stroke="#1565C0" strokeWidth="1" />
                {/* Head */}
                <circle cx="50" cy="55" r="22" fill="#1E88E5" stroke="#0D47A1" strokeWidth="1.5" />
                {/* Checked lines */}
                <path d="M 32,45 L 68,45 M 30,55 L 70,55 M 34,65 L 66,65" fill="none" stroke="#0D47A1" strokeWidth="0.8" opacity="0.4" />
                <path d="M 40,35 L 40,75 M 50,33 L 50,77 M 60,35 L 60,75" fill="none" stroke="#0D47A1" strokeWidth="0.8" opacity="0.4" />
                {/* Face cutout */}
                <circle cx="50" cy="56" r="14" fill="#FFF" />
                {/* Face Details */}
                <circle cx="45" cy="53" r="1.5" fill="#212121" />
                <circle cx="55" cy="53" r="1.5" fill="#212121" />
                <ellipse cx="50" cy="57" rx="6" ry="4.5" fill="#FFE082" />
                <path d="M 48,58 Q 50,60 52,58" fill="none" stroke="#212121" strokeWidth="1.2" strokeLinecap="round" />
                {/* Label pouch outfit */}
                <rect x="36" y="80" width="28" height="28" rx="6" fill="#1E88E5" stroke="#0D47A1" strokeWidth="1" />
                <rect x="40" y="86" width="20" height="12" rx="2" fill="#FFF" />
                <text x="50" y="94" textAnchor="middle" fontSize="3.5" fontWeight="900" fill="#1E88E5" fontFamily="monospace">WACKY</text>
              </g>
            )}
          </g>
        ) : (
          <>
            {/* 1. Metal Carabiner / Ring Clasp (Hanger System) */}
            <g id="clasp-system">
              {/* Main Top Swivel Snap Hook Carabiner (Silver/Gold based on aesthetic) */}
              <path 
                d="M 50,7 A 6,6 0 0,1 55,16 L 53,24 L 47,24 L 45,16 A 6,6 0 0,1 50,7 Z" 
                fill="url(#metal-gold)" 
                stroke="#D4AF37" 
                strokeWidth="0.5" 
              />
              <circle cx="50" cy="13" r="3.5" fill="#FFF" />
              
              {/* Oval rotation joint pin */}
              <rect x="47" y="22" width="6" height="3" rx="1.5" fill="url(#metal-gold)" stroke="#C59B27" strokeWidth="0.5" />
              
              {/* Flat connector link rings */}
              <circle cx="50" cy="27" r="3" fill="none" stroke="url(#metal-gold)" strokeWidth="1.8" />
            </g>

            {/* 2. Main Webbing Fabric Strap Body */}
            <g id="fabric-strap-group">
              {/* Top Flat Metal Crimp Cap (Main strap clamp) */}
              <rect x="34" y="29" width="32" height="5" rx="1" fill="url(#metal-gold)" stroke="#D4AF37" strokeWidth="0.5" />
              <line x1="36" y1="31" x2="64" y2="31" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />

              {/* Core Woven Fabric Ribbon Loop (Webbing strap) */}
              <rect 
                x="36" 
                y="33" 
                width="28" 
                height="85" 
                rx="4" 
                fill={hexColor} 
                stroke="rgba(0,0,0,0.08)" 
                strokeWidth="0.5" 
              />
              {/* Webbing textile texture pattern overlay */}
              <rect x="36" y="33" width="28" height="85" rx="4" fill="url(#webbing-texture)" />

              {/* Stitches Details (Side border sewing lines) */}
              <line 
                x1="38.5" 
                y1="35" 
                x2="38.5" 
                y2="116" 
                stroke={isDarkStrap ? '#FFD1D7' : '#94A3B8'} 
                strokeWidth="0.8" 
                strokeDasharray="2,1.5" 
                opacity="0.85" 
              />
              <line 
                x1="61.5" 
                y1="35" 
                x2="61.5" 
                y2="116" 
                stroke={isDarkStrap ? '#FFD1D7' : '#94A3B8'} 
                strokeWidth="0.8" 
                strokeDasharray="2,1.5" 
                opacity="0.85" 
              />

              {/* Bottom Flat Crimp Metal Clamp */}
              <rect x="34" y="117" width="32" height="4" rx="1.5" fill="url(#metal-gold)" stroke="#D4AF37" strokeWidth="0.5" />
              <circle cx="50" cy="119" r="1" fill="rgba(0,0,0,0.3)" />
            </g>

            {/* 3. Embroidered Alphabet Letters spacing vertically along Ribbon */}
            <g id="alphabet-letters-patches">
              {baseLetterPatches.map((char, index) => {
                // Distribute up to 4/5 letters along the upper-middle of the strap
                const size = baseLetterPatches.length;
                const startY = size <= 2 ? 55 : size <= 3 ? 48 : 42;
                const gap = size <= 2 ? 22 : size <= 3 ? 16 : 13;
                const cy = startY + index * gap;
                
                // Choose colors based on character cycling
                const colorScheme = letterColors[index % letterColors.length];

                return (
                  <g key={index} className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
                    {/* Felt circular backing patch */}
                    <circle 
                      cx="50" 
                      cy={cy} 
                      r="5.5" 
                      fill={colorScheme.bg} 
                      stroke="rgba(0,0,0,0.05)" 
                      strokeWidth="0.5" 
                    />
                    {/* Thin dashed circular embroidery thread stitch */}
                    <circle 
                      cx="50" 
                      cy={cy} 
                      r="4.2" 
                      fill="none" 
                      stroke={isDarkStrap ? '#FFF' : 'rgba(255,255,255,0.7)'} 
                      strokeWidth="0.4" 
                      strokeDasharray="1,0.8" 
                    />
                    {/* Heavy display letter */}
                    <text 
                      x="50" 
                      y={cy + 1.8} 
                      textAnchor="middle" 
                      fill={colorScheme.text} 
                      fontSize="5.5" 
                      fontWeight="900"
                      fontFamily="Impact, Arial Black, sans-serif"
                    >
                      {char}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* 4. Primary Embroidered Decoration Wafen Badge (Overlap at bottom half) */}
            <g id="primary-wafen-decor" transform="translate(50, 102)" className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.22)]">
              {shape === 'heart' && (
                <g>
                  {/* Embroidered Heart Patch */}
                  <path 
                    d="M 0,4.8 Q -6,-0.5 -6,4 Q -6,8.5 0,13.5 Q 6,8.5 6,4 Q 6,-0.5 0,4.8 Z" 
                    fill="#FF94A2" 
                    stroke="#E11D48" 
                    strokeWidth="1.2" 
                  />
                  <path 
                    d="M 0,4.8 Q -6,-0.5 -6,4 Q -6,8.5 0,13.5 Q 6,8.5 6,4 Q 6,-0.5 0,4.8 Z" 
                    fill="none" 
                    stroke="#FFFFFF" 
                    strokeWidth="0.6" 
                    strokeDasharray="1,0.5" 
                  />
                  <path d="M -2,4 Q -1,5 0,3.5 Q 1,5 2,4" fill="none" stroke="#FF4D6D" strokeWidth="0.8" strokeLinecap="round" />
                </g>
              )}

              {shape === 'circle' && (
                <g>
                  {/* Pizza Slice Wafen Patch from photo! */}
                  <path 
                    d="M -6,0 L 6,0 L 0,11 Z" 
                    fill="#FFD54F" 
                    stroke="#E65100" 
                    strokeWidth="1.2" 
                  />
                  <path 
                    d="M -6.5,-0.8 L 6.5,-0.8 L 0,12 Z" 
                    fill="none" 
                    stroke="#FFFFFF" 
                    strokeWidth="0.5" 
                    strokeDasharray="1,0.5" 
                  />
                  {/* Crust */}
                  <path d="M -6.5,0 C -2,-1 2,-1 6.5,0" fill="none" stroke="#D84315" strokeWidth="1.8" strokeLinecap="round" />
                  {/* Pepperonis */}
                  <circle cx="-1.5" cy="3.5" r="1.2" fill="#D50000" />
                  <circle cx="2.2" cy="4.5" r="1.2" fill="#D50000" />
                  <circle cx="0" cy="7.5" r="1.1" fill="#D50000" />
                </g>
              )}

              {shape === 'star' && (
                <g>
                  {/* Skate Board Wafen Patch from photo! */}
                  <rect x="-10" y="2" width="20" height="5.5" rx="2.5" fill="#E53935" stroke="#FFFFFF" strokeWidth="0.8" />
                  <rect x="-10" y="2" width="20" height="5.5" rx="2.5" fill="none" stroke="#B71C1C" strokeWidth="0.4" strokeDasharray="1,0.6" />
                  <line x1="-9" y1="4.8" x2="9" y2="4.8" stroke="#FFE082" strokeWidth="1.2" />
                  {/* Skateboard Wheels */}
                  <circle cx="-6" cy="7.5" r="1.5" fill="#FFE082" stroke="#212121" strokeWidth="0.8" />
                  <circle cx="6" cy="7.5" r="1.5" fill="#FFE082" stroke="#212121" strokeWidth="0.8" />
                  <circle cx="-6" cy="7.5" r="0.5" fill="#212121" />
                  <circle cx="6" cy="7.5" r="0.5" fill="#212121" />
                </g>
              )}

              {shape === 'bear' && (
                <g transform="scale(0.9)">
                  {/* Purple Teddy Wafen Patch */}
                  <rect x="-7.5" y="0" width="15" height="11" rx="5" fill="#B39DDB" stroke="#5E35B1" strokeWidth="1.2" />
                  <rect x="-7.5" y="0" width="15" height="11" rx="5" fill="none" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="1,0.6" />
                  {/* Ears */}
                  <circle cx="-5" cy="0" r="3" fill="#B39DDB" stroke="#5E35B1" strokeWidth="1" />
                  <circle cx="5" cy="0" r="3" fill="#B39DDB" stroke="#5E35B1" strokeWidth="1" />
                  <circle cx="-5" cy="0" r="1.2" fill="#FFF" />
                  <circle cx="5" cy="0" r="1.2" fill="#FFF" />
                  {/* Face detail */}
                  <circle cx="-2.5" cy="4.5" r="0.8" fill="#212121" />
                  <circle cx="2.5" cy="4.5" r="0.8" fill="#212121" />
                  <ellipse cx="0" cy="6.2" rx="1.8" ry="1.2" fill="#FFF" />
                  <polygon points="0,5.8 -1.2,5 -1.2,5" fill="#212121" />
                  <line x1="0" y1="5.8" x2="0" y2="7.2" stroke="#212121" strokeWidth="0.6" />
                </g>
              )}

              {shape === 'square' && (
                <g transform="scale(1.1)">
                  {/* Music Headphone Patch from photo */}
                  <ellipse cx="0" cy="5" rx="6.5" ry="5.5" fill="none" stroke="#0097A7" strokeWidth="2.2" strokeLinecap="round" />
                  <ellipse cx="0" cy="5" rx="6.5" ry="5.5" fill="none" stroke="#FFF" strokeWidth="0.6" strokeDasharray="1,0.5" />
                  {/* Side cups */}
                  <rect x="-8.2" y="3.5" width="3.2" height="5.5" rx="1.5" fill="#EC407A" stroke="#AD1457" strokeWidth="0.8" />
                  <rect x="5" y="3.5" width="3.2" height="5.5" rx="1.5" fill="#EC407A" stroke="#AD1457" strokeWidth="0.8" />
                  <rect x="-8.2" y="3.5" width="3.2" height="5.5" rx="1.5" fill="none" stroke="#FFF" strokeWidth="0.4" strokeDasharray="1,0.5" />
                  <rect x="5" y="3.5" width="3.2" height="5.5" rx="1.5" fill="none" stroke="#FFF" strokeWidth="0.4" strokeDasharray="1,0.5" />
                  <circle cx="-6.6" cy="6.2" r="1" fill="#FFF" />
                  <circle cx="6.6" cy="6.2" r="1" fill="#FFF" />
                </g>
              )}
            </g>

            {/* 5. Side Accessory Hanging Charm (Dangling from top ring) */}
            {charmType !== 'none' && (
              <g id="accessory-charm" transform="translate(69, 44)" className="drop-shadow-[0_2.5px_4px_rgba(0,0,0,0.18)]">
                {/* Hanging jump-rings */}
                <circle cx="0" cy="0" r="2.2" fill="none" stroke="url(#metal-gold)" strokeWidth="1" />
                <circle cx="1.5" cy="3.5" r="1.5" fill="none" stroke="url(#metal-gold)" strokeWidth="0.8" />
                
                {/* Ribbon Charm */}
                {charmType === 'ribbon' && (
                  <path 
                    d="M -1,4.5 C -4,1.5 -8,1.5 -7,4.5 C -6,6.5 -4,7.5 0,7.5 C 4,7.5 6,6.5 7,4.5 C 8,1.5 4,1.5 1,4.5 L 0,7.5 L -5,13.5 L -2,13.5 L 0,8.5 L 2,13.5 L 5,13.5 L 0,7.5 Z" 
                    fill="#FF94A2" 
                    stroke="#E11D48" 
                    strokeWidth="0.4" 
                  />
                )}

                {/* Mini Star Charm */}
                {charmType === 'star' && (
                  <path 
                    d="M 0,1.5 L 1.8,5.5 L 6,5.5 L 2.6,8 L 4,12 L 0,9.5 L -4,12 L -2.6,8 L -6,5.5 L -1.8,5.5 Z" 
                    fill="#FFF176" 
                    stroke="#FBC02D" 
                    strokeWidth="0.4" 
                  />
                )}

                {/* Bear Charm */}
                {charmType === 'bear' && (
                  <path 
                    d="M -3,5 Q -5,2 -1,3 Q 0,0 1,3 Q 5,2 3,5 L 2,8 Q 3,10 3,12 L -3,12 Q -3,10 -2,8 Z" 
                    fill="#B39DDB" 
                    stroke="#673AB7" 
                    strokeWidth="0.4" 
                  />
                )}

                {/* Flower Charm */}
                {charmType === 'flower' && (
                  <g transform="translate(0, 6.5)">
                    {/* 5 Petals */}
                    <circle cx="0" cy="-2.5" r="2.2" fill="#FFE082" />
                    <circle cx="2.6" cy="-1" r="2.2" fill="#FFE082" />
                    <circle cx="1.8" cy="2.2" r="2.2" fill="#FFE082" />
                    <circle cx="-1.8" cy="2.2" r="2.2" fill="#FFE082" />
                    <circle cx="-2.6" cy="-1" r="2.2" fill="#FFE082" />
                    {/* Center point */}
                    <circle cx="0" cy="0" r="1.5" fill="#FFF" stroke="#FFD54F" strokeWidth="0.4" />
                  </g>
                )}

                {/* Heart Charm */}
                {charmType === 'heart' && (
                  <path 
                    d="M 0,2.5 Q -3.5,-0.5 -3.5,3.5 Q -3.5,7.5 0,10.5 Q 3.5,7.5 3.5,3.5 Q 3.5,-0.5 0,2.5 Z" 
                    fill="#FFAB91" 
                    stroke="#E64A19" 
                    strokeWidth="0.4" 
                  />
                )}
              </g>
            )}
          </>
        )}
      </svg>

      {/* Handmade label seal */}
      <span className="mt-2.5 text-xs font-mono tracking-wider text-stone-700 bg-amber-100 hover:bg-amber-200 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-2xs font-extrabold flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>100% HANDMADE DIY STRAP</span>
      </span>
    </div>
  );
}
