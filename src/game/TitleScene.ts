import Phaser from 'phaser';
import { PALETTE, hex } from './palette';

/**
 * KOF-style title screen.
 * Pulsing Φ logo, scrolling perspective grid, "SCROLL ↓ TO CONTINUE" hint.
 * No click gating — the canvas is purely decorative; the user scrolls past it.
 * The canvas auto-pauses rendering when it leaves the viewport (cheap idle).
 */
export class TitleScene extends Phaser.Scene {
  private bgGraphics!: Phaser.GameObjects.Graphics;
  private logoContainer!: Phaser.GameObjects.Container;
  private scrollHint!: Phaser.GameObjects.Text;
  private subtitle!: Phaser.GameObjects.Text;
  private tagline!: Phaser.GameObjects.Text;
  private chevron!: Phaser.GameObjects.Text;
  private scanlineOverlay!: Phaser.GameObjects.Graphics;
  private bgScrollY = 0;

  constructor() {
    super('TitleScene');
  }

  create() {
    const { width, height } = this.scale;

    this.bgGraphics = this.add.graphics();
    this.drawBackground();

    // Big pixel-block Φ logo
    this.logoContainer = this.add.container(width / 2, height * 0.4);
    this.drawPhiLogo(this.logoContainer);

    // PHI MONSTER text under logo
    this.subtitle = this.add.text(width / 2, height * 0.6, 'PHI  MONSTER', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: this.responsiveSize(28, 16),
      color: hex(PALETTE.ink),
      stroke: hex(PALETTE.shadow),
      strokeThickness: 6,
    }).setOrigin(0.5).setShadow(4, 4, hex(PALETTE.blood), 0, true, true);

    // Tagline
    this.tagline = this.add.text(width / 2, height * 0.67, 'PRONOUNCED  "FIGHT"', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: this.responsiveSize(11, 8),
      color: hex(PALETTE.gold),
    }).setOrigin(0.5).setAlpha(0.85);

    // Scroll hint (replaces PRESS START)
    this.scrollHint = this.add.text(width / 2, height * 0.84, 'SCROLL  TO  CONTINUE', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: this.responsiveSize(13, 9),
      color: hex(PALETTE.hot),
      stroke: hex(PALETTE.shadow),
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.chevron = this.add.text(width / 2, height * 0.91, '▼', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: this.responsiveSize(18, 14),
      color: hex(PALETTE.hot),
    }).setOrigin(0.5);

    // Hint pulses softly
    this.tweens.add({
      targets: this.scrollHint,
      alpha: { from: 1, to: 0.35 },
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Chevron bobs down/up to suggest scrolling
    this.tweens.add({
      targets: this.chevron,
      y: '+=10',
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Logo pulse
    this.tweens.add({
      targets: this.logoContainer,
      scale: { from: 1, to: 1.06 },
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Scanline overlay
    this.scanlineOverlay = this.add.graphics();
    this.drawScanlines();

    // Resize handling
    this.scale.on('resize', this.handleResize, this);
  }

  update(_time: number, delta: number) {
    this.bgScrollY = (this.bgScrollY + delta * 0.04) % 32;
    this.drawBackground();
  }

  private drawBackground() {
    const { width, height } = this.scale;
    const g = this.bgGraphics;
    g.clear();

    // Vertical gradient bands
    const bandCount = 6;
    const bandColors = [PALETTE.bg0, PALETTE.bg1, PALETTE.bg2, PALETTE.bg1, PALETTE.bg0, PALETTE.bg0];
    for (let i = 0; i < bandCount; i++) {
      g.fillStyle(bandColors[i] ?? PALETTE.bg0, 1);
      g.fillRect(0, (height / bandCount) * i, width, height / bandCount + 1);
    }

    // Scrolling perspective grid floor (lower half)
    const horizonY = height * 0.55;
    const floorH = height - horizonY;
    const cx = width / 2;

    // Horizontal grid lines (perspective)
    for (let i = 0; i < 18; i++) {
      const t = ((i * 32 + this.bgScrollY) % (floorH + 32)) / floorH;
      if (t > 1 || t < 0) continue;
      const y = horizonY + Math.pow(t, 2) * floorH;
      const alpha = Math.min(1, t * 1.5) * 0.55;
      g.lineStyle(1, PALETTE.hot, alpha);
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(width, y);
      g.strokePath();
    }

    // Vanishing point lines
    g.lineStyle(1, PALETTE.hot2, 0.35);
    for (let i = -10; i <= 10; i++) {
      g.beginPath();
      g.moveTo(cx + i * (width / 8), height);
      g.lineTo(cx, horizonY);
      g.strokePath();
    }

    // Sun / disc behind logo
    g.fillStyle(PALETTE.hot2, 0.25);
    g.fillCircle(cx, height * 0.4, Math.min(width, height) * 0.28);
    g.fillStyle(PALETTE.hot, 0.18);
    g.fillCircle(cx, height * 0.4, Math.min(width, height) * 0.2);
  }

  private drawScanlines() {
    const { width, height } = this.scale;
    const g = this.scanlineOverlay;
    g.clear();
    g.fillStyle(0x000000, 0.18);
    for (let y = 0; y < height; y += 4) {
      g.fillRect(0, y, width, 1);
    }
  }

  // Pixel Φ rendered as filled rects
  private drawPhiLogo(container: Phaser.GameObjects.Container) {
    const blocks = this.responsiveSize(14, 8);
    const pattern = [
      '....X....',
      '....X....',
      '..XXXXX..',
      '.XXXXXXX.',
      'XX.XXX.XX',
      'XX.XXX.XX',
      'XX.XXX.XX',
      'XX.XXX.XX',
      'XX.XXX.XX',
      '.XXXXXXX.',
      '..XXXXX..',
      '....X....',
      '....X....',
    ];
    const rows = pattern.length;
    const cols = pattern[0]!.length;
    const ox = -(cols * blocks) / 2;
    const oy = -(rows * blocks) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (pattern[r]![c] !== 'X') continue;
        container.add(this.add.rectangle(
          ox + c * blocks + 6, oy + r * blocks + 6,
          blocks, blocks, PALETTE.shadow, 1).setOrigin(0));
      }
    }
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (pattern[r]![c] !== 'X') continue;
        container.add(this.add.rectangle(
          ox + c * blocks + 3, oy + r * blocks + 3,
          blocks, blocks, PALETTE.blood, 1).setOrigin(0));
      }
    }
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (pattern[r]![c] !== 'X') continue;
        container.add(this.add.rectangle(
          ox + c * blocks, oy + r * blocks,
          blocks, blocks, PALETTE.gold, 1).setOrigin(0));
        container.add(this.add.rectangle(
          ox + c * blocks, oy + r * blocks,
          blocks, Math.max(2, blocks * 0.2),
          0xffffff, 0.4).setOrigin(0));
      }
    }
  }

  private responsiveSize(desktop: number, mobile: number) {
    return this.scale.width < 640 ? mobile : desktop;
  }

  private handleResize(gameSize: Phaser.Structs.Size) {
    const { width, height } = gameSize;
    this.cameras.resize(width, height);
    this.logoContainer.setPosition(width / 2, height * 0.4);
    this.subtitle.setPosition(width / 2, height * 0.6);
    this.tagline.setPosition(width / 2, height * 0.67);
    this.scrollHint.setPosition(width / 2, height * 0.84);
    this.chevron.setPosition(width / 2, height * 0.91);
    this.drawScanlines();
    this.drawBackground();
  }
}
