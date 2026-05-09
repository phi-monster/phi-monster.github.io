import Phaser from 'phaser';
import { PALETTE, hex } from './palette';

/**
 * KOF-style title screen.
 * Renders a pulsing Φ logo, scrolling background grid, "PRESS START" prompt.
 * Emits 'phi:start' on the document when the user advances.
 */
export class TitleScene extends Phaser.Scene {
  private bgGraphics!: Phaser.GameObjects.Graphics;
  private logoContainer!: Phaser.GameObjects.Container;
  private pressStart!: Phaser.GameObjects.Text;
  private subtitle!: Phaser.GameObjects.Text;
  private tagline!: Phaser.GameObjects.Text;
  private scanlineOverlay!: Phaser.GameObjects.Graphics;
  private bgScrollY = 0;
  private started = false;

  constructor() {
    super('TitleScene');
  }

  create() {
    const { width, height } = this.scale;

    this.bgGraphics = this.add.graphics();
    this.drawBackground();

    // Big pixel-block Φ logo
    this.logoContainer = this.add.container(width / 2, height * 0.42);
    this.drawPhiLogo(this.logoContainer);

    // PHI MONSTER text under logo
    this.subtitle = this.add.text(width / 2, height * 0.62, 'PHI  MONSTER', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: this.responsiveSize(28, 16),
      color: hex(PALETTE.ink),
      stroke: hex(PALETTE.shadow),
      strokeThickness: 6,
    }).setOrigin(0.5).setShadow(4, 4, hex(PALETTE.blood), 0, true, true);

    // Tagline
    this.tagline = this.add.text(width / 2, height * 0.69, 'PRONOUNCED  "FIGHT"', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: this.responsiveSize(11, 8),
      color: hex(PALETTE.gold),
    }).setOrigin(0.5).setAlpha(0.85);

    // PRESS START
    this.pressStart = this.add.text(width / 2, height * 0.85, 'PRESS  START', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: this.responsiveSize(18, 12),
      color: hex(PALETTE.hot),
      stroke: hex(PALETTE.shadow),
      strokeThickness: 4,
    }).setOrigin(0.5);

    this.tweens.add({
      targets: this.pressStart,
      alpha: { from: 1, to: 0.15 },
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Logo pulsing
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

    // Input
    this.input.on('pointerdown', () => this.startGame());
    this.input.keyboard?.on('keydown', () => this.startGame());

    // Resize handling
    this.scale.on('resize', this.handleResize, this);
  }

  private startGame() {
    if (this.started) return;
    this.started = true;

    // Big flash + screen shake
    this.cameras.main.flash(180, 255, 210, 63);
    this.cameras.main.shake(220, 0.012);

    // Strike sound: oscillator (no assets)
    this.playStrikeSound();

    this.tweens.add({
      targets: [this.logoContainer, this.subtitle, this.tagline, this.pressStart],
      alpha: 0,
      y: '-=20',
      duration: 600,
      ease: 'Cubic.easeIn',
    });

    this.time.delayedCall(700, () => {
      document.dispatchEvent(new CustomEvent('phi:start'));
    });
  }

  private playStrikeSound() {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'square';
      o.frequency.setValueAtTime(220, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.2);
      g.gain.setValueAtTime(0.18, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.26);
    } catch {
      // ignore (audio context blocked)
    }
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
    g.lineStyle(1, PALETTE.hot, 0.4);
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

  // Pixel Φ rendered as filled rects (8x8 blocks)
  private drawPhiLogo(container: Phaser.GameObjects.Container) {
    const blocks = this.responsiveSize(14, 8); // pixel block size
    // 9 cols × 13 rows pattern of Φ
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

    // Drop-shadow layer
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (pattern[r]![c] !== 'X') continue;
        const sh = this.add.rectangle(
          ox + c * blocks + 6,
          oy + r * blocks + 6,
          blocks,
          blocks,
          PALETTE.shadow,
          1
        ).setOrigin(0);
        container.add(sh);
      }
    }
    // Mid color layer (offset)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (pattern[r]![c] !== 'X') continue;
        const mid = this.add.rectangle(
          ox + c * blocks + 3,
          oy + r * blocks + 3,
          blocks,
          blocks,
          PALETTE.blood,
          1
        ).setOrigin(0);
        container.add(mid);
      }
    }
    // Main fill — gold
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (pattern[r]![c] !== 'X') continue;
        const px = this.add.rectangle(
          ox + c * blocks,
          oy + r * blocks,
          blocks,
          blocks,
          PALETTE.gold,
          1
        ).setOrigin(0);
        container.add(px);
        // Highlight on top-left of each block
        const hl = this.add.rectangle(
          ox + c * blocks,
          oy + r * blocks,
          blocks,
          Math.max(2, blocks * 0.2),
          0xffffff,
          0.4
        ).setOrigin(0);
        container.add(hl);
      }
    }
  }

  private responsiveSize(desktop: number, mobile: number) {
    return this.scale.width < 640 ? mobile : desktop;
  }

  private handleResize(gameSize: Phaser.Structs.Size) {
    const { width, height } = gameSize;
    this.cameras.resize(width, height);
    this.logoContainer.setPosition(width / 2, height * 0.42);
    this.subtitle.setPosition(width / 2, height * 0.62);
    this.tagline.setPosition(width / 2, height * 0.69);
    this.pressStart.setPosition(width / 2, height * 0.85);
    this.drawScanlines();
    this.drawBackground();
  }
}
