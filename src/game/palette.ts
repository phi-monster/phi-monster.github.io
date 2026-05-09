// Dusk-arena palette — inspired by Garou: Mark of the Wolves and KOF stage art.
// Warm sunset / parchment hues replace the old black + neon scheme.
export const PALETTE = {
  // Sky / sunset
  sky0: 0x2b1d2e,   // deep plum (top of sky)
  sky1: 0x593041,   // mauve
  sky2: 0xa84a3a,   // sunset crimson
  sky3: 0xd28b4f,   // amber band near horizon
  ground: 0x4a2a25, // sienna ground

  // Surface colors used for HUDs / silhouettes
  parchment: 0xf2e6c8,   // cream (silhouette fill)
  parchmentDim: 0xd9c79b,
  ink: 0x2a1f1a,         // warm dark (outlines / text)
  inkSoft: 0x6b5a48,
  brick: 0xb8412c,       // brick red accent
  gold: 0xc9963a,        // antique gold
  teal: 0x3d6b75,        // dusty teal
  sienna: 0x8a4f31,
  shadow: 0x14100c,
} as const;

export const hex = (n: number) => '#' + n.toString(16).padStart(6, '0');
