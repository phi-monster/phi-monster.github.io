// NEO·GEO inspired palette - referenced by both CSS and Phaser
export const PALETTE = {
  bg0: 0x0a0612,
  bg1: 0x14091f,
  bg2: 0x1d0a2c,
  ink: 0xf5e9c1,
  inkDim: 0xc8b78a,
  hot: 0xff2d6f,
  hot2: 0xff5a3c,
  gold: 0xffd23f,
  neon: 0x00f0ff,
  acid: 0xb6ff3c,
  blood: 0xc81d4e,
  shadow: 0x07030d,
} as const;

export const hex = (n: number) => '#' + n.toString(16).padStart(6, '0');
