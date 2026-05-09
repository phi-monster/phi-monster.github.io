import Phaser from 'phaser';
import { PALETTE, hex } from './palette';

/**
 * VS-screen title for Φ MONSTER.
 *
 * Composition (left → right):
 *   AGENT-α (VLA POLICY)  ⚡  Φ-badge "VS"  ⚡  AGENT-β (WORLD MODEL)
 *
 * Two pixel humanoid silhouettes face each other across a sunset arena.
 * Each has a HUD strip with model label + health bar above.
 * Atmospheric backdrop: sky → distant arena horizon → sienna ground.
 *
 * Decorative — no input is captured. The user just scrolls past.
 */
export class TitleScene extends Phaser.Scene {
  private bg!: Phaser.GameObjects.Graphics;
  private leftFighter!: Phaser.GameObjects.Container;
  private rightFighter!: Phaser.GameObjects.Container;
  private leftHud!: Phaser.GameObjects.Container;
  private rightHud!: Phaser.GameObjects.Container;
  private centerBadge!: Phaser.GameObjects.Container;
  private titleStrip!: Phaser.GameObjects.Container;
  private scrollHint!: Phaser.GameObjects.Text;
  private chevron!: Phaser.GameObjects.Text;
  private bgScrollY = 0;

  constructor() {
    super('TitleScene');
  }

  create() {
    this.bg = this.add.graphics();
    this.drawBackdrop();

    this.leftFighter = this.makeFighter(false);
    this.rightFighter = this.makeFighter(true);
    this.centerBadge = this.makeBadge();

    this.leftHud = this.makeHud({
      align: 'left',
      codename: 'AGENT · α',
      model: 'VLA  POLICY',
      version: 'v1.4 · 7B',
      color: PALETTE.brick,
    });
    this.rightHud = this.makeHud({
      align: 'right',
      codename: 'AGENT · β',
      model: 'WORLD  MODEL',
      version: 'v0.9 · 13B',
      color: PALETTE.teal,
    });

    this.titleStrip = this.makeTitleStrip();

    // Scroll hint
    this.scrollHint = this.add.text(0, 0, 'SCROLL  TO  CONTINUE', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: this.responsiveSize(11, 8),
      color: hex(PALETTE.cream),
    }).setOrigin(0.5).setAlpha(0.85);
    this.chevron = this.add.text(0, 0, '▼', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: this.responsiveSize(16, 12),
      color: hex(PALETTE.gold),
    }).setOrigin(0.5);

    this.tweens.add({
      targets: this.scrollHint,
      alpha: { from: 0.85, to: 0.25 },
      duration: 1100,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    this.tweens.add({
      targets: this.chevron,
      y: '+=8',
      duration: 700,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Subtle idle bob on each fighter (breathing in stance)
    this.tweens.add({
      targets: [this.leftFighter, this.rightFighter],
      y: '+=6',
      duration: 1400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
    // Center badge slow pulse
    this.tweens.add({
      targets: this.centerBadge,
      scale: { from: 1, to: 1.08 },
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    this.layout();
    this.scale.on('resize', this.layout, this);
  }

  update(_t: number, delta: number) {
    this.bgScrollY = (this.bgScrollY + delta * 0.02) % 32;
    this.drawBackdrop();
  }

  // ─── Layout ────────────────────────────────────────────────────────────
  private layout = () => {
    const { width, height } = this.scale;

    // Mobile: stack the two fighters vertically? Keep them side-by-side
    // but smaller. Keep proportions sane.
    const isNarrow = width < 720;

    // Background fills full canvas, no positioning needed.
    // Fighters
    const margin = isNarrow ? 60 : 140;
    this.leftFighter.setPosition(margin, height * 0.62);
    this.rightFighter.setPosition(width - margin, height * 0.62);
    const fighterScale = isNarrow ? 0.7 : 1;
    this.leftFighter.setScale(fighterScale);
    this.rightFighter.setScale(fighterScale);

    // HUDs above each fighter
    this.leftHud.setPosition(margin, height * 0.22);
    this.rightHud.setPosition(width - margin, height * 0.22);
    this.leftHud.setScale(isNarrow ? 0.75 : 1);
    this.rightHud.setScale(isNarrow ? 0.75 : 1);

    // Center badge
    this.centerBadge.setPosition(width / 2, height * 0.5);
    this.centerBadge.setScale(isNarrow ? 0.7 : 1);

    // Title strip near top center
    this.titleStrip.setPosition(width / 2, isNarrow ? height * 0.07 : height * 0.08);
    this.titleStrip.setScale(isNarrow ? 0.7 : 1);

    // Scroll hint
    this.scrollHint.setPosition(width / 2, height - 56);
    this.chevron.setPosition(width / 2, height - 28);

    this.cameras.resize(width, height);
    this.drawBackdrop();
  };

  // ─── Backdrop: sunset sky + arena floor ────────────────────────────────
  private drawBackdrop() {
    const { width, height } = this.scale;
    const g = this.bg;
    g.clear();

    // Vertical sunset gradient (multiple bands)
    const horizonY = height * 0.62;
    const bands: [number, number][] = [
      [PALETTE.sky0, 0],
      [PALETTE.sky1, height * 0.25],
      [PALETTE.sky2, height * 0.45],
      [PALETTE.sky3, horizonY - 4],
    ];
    for (let i = 0; i < bands.length - 1; i++) {
      const [c1, y1] = bands[i]!;
      const [_c2, y2] = bands[i + 1]!;
      g.fillStyle(c1, 1);
      g.fillRect(0, y1, width, y2 - y1);
    }
    // Bright horizon band
    g.fillStyle(0xf2c388, 1);
    g.fillRect(0, horizonY - 4, width, 6);

    // Sun disc behind center badge
    g.fillStyle(0xf2c388, 0.85);
    g.fillCircle(width / 2, horizonY - 10, height * 0.18);
    g.fillStyle(0xd28b4f, 0.5);
    g.fillCircle(width / 2, horizonY - 10, height * 0.24);

    // Distant arena ring silhouette (just a band of darker tone above horizon)
    g.fillStyle(0x3d2a30, 0.55);
    g.fillRect(0, horizonY - 28, width, 24);

    // Foreground ground (sienna), with painted gradient
    g.fillStyle(PALETTE.ground, 1);
    g.fillRect(0, horizonY, width, height - horizonY);
    // Floor light streaks (perspective)
    const cx = width / 2;
    g.lineStyle(1, 0x6b3a30, 0.6);
    for (let i = -8; i <= 8; i++) {
      g.beginPath();
      g.moveTo(cx + i * (width / 6), height);
      g.lineTo(cx, horizonY);
      g.strokePath();
    }
    // A few horizontal floor lines (perspective receding)
    g.lineStyle(1, 0x6b3a30, 0.4);
    for (let i = 0; i < 10; i++) {
      const t = (i * 24 + this.bgScrollY) / (height - horizonY);
      if (t > 1 || t < 0) continue;
      const y = horizonY + Math.pow(t, 1.6) * (height - horizonY);
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(width, y);
      g.strokePath();
    }

    // Ring rope marking (foreground, gives "ring" feel)
    g.lineStyle(2, PALETTE.ink, 0.7);
    g.strokeRect(40, horizonY + 12, width - 80, height - horizonY - 24);
  }

  // ─── A pixel humanoid silhouette in fighting stance ────────────────────
  // Cream fill + ink outline. 16-wide × 22-tall pattern.
  private makeFighter(facingLeft: boolean): Phaser.GameObjects.Container {
    const px = this.responsiveSize(7, 5); // pixel size
    // 17 cols × 22 rows. Symmetric stance: legs apart, arms up in guard.
    const pattern = [
      '.....XXXXX.......',
      '.....XXXXX.......',
      '....XXXXXXX......',
      '....XX.X.XX......',
      '....XXXXXXX......',
      '..XXXXXXXXX......',
      '.XXXXXXXXXXX.....',
      '.XX.XXXXX.XX.....',
      'XXX.XXXXX.XXX....',
      'XXXX.XXX.XXXX....',
      '.XXXXXXXXXXX.....',
      '...XXXXXXX.......',
      '...XXXXXXX.......',
      '...XXX.XXX.......',
      '..XXX...XXX......',
      '..XX.....XX......',
      '..XX.....XX......',
      '.XXX.....XXX.....',
      '.XX.......XX.....',
      'XXX.......XXX....',
      'XX.........XX....',
      'XXXX.....XXXX....',
    ];

    const container = this.add.container(0, 0);
    const rows = pattern.length;
    const cols = pattern[0]!.length;
    const ox = -(cols * px) / 2;
    const oy = -(rows * px);

    // Outline (drawn slightly offset in 4 directions to form ink edge)
    const outlineOffsets = [
      [-1, 0], [1, 0], [0, -1], [0, 1],
      [-1, -1], [1, -1], [-1, 1], [1, 1],
    ];

    // Step 1: draw outline shadows on darker side
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (pattern[r]![c] !== 'X') continue;
        for (const [dx, dy] of outlineOffsets) {
          container.add(this.add.rectangle(
            ox + c * px + dx, oy + r * px + dy,
            px, px, PALETTE.ink, 1
          ).setOrigin(0));
        }
      }
    }

    // Step 2: cream fill on top of outline
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (pattern[r]![c] !== 'X') continue;
        container.add(this.add.rectangle(
          ox + c * px, oy + r * px,
          px, px, PALETTE.parchment, 1
        ).setOrigin(0));
      }
    }

    // Step 3: simple shading (inner darker band on the back side)
    const shadeSide = facingLeft ? 'left' : 'right';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (pattern[r]![c] !== 'X') continue;
        const isShadeCol = shadeSide === 'left' ? c < cols * 0.35 : c > cols * 0.65;
        if (isShadeCol) {
          container.add(this.add.rectangle(
            ox + c * px, oy + r * px,
            px, px, PALETTE.parchmentDim, 0.6
          ).setOrigin(0));
        }
      }
    }

    // A short ground shadow ellipse beneath
    const shadow = this.add.ellipse(0, 0, cols * px * 0.9, px * 2, PALETTE.shadow, 0.5);
    container.add(shadow);
    shadow.setDepth(-1);

    if (facingLeft) container.setScale(-1, 1);
    return container;
  }

  // ─── Center "VS" badge: Φ inside a diamond ─────────────────────────────
  private makeBadge(): Phaser.GameObjects.Container {
    const c = this.add.container(0, 0);
    const r = this.responsiveSize(70, 50);

    // Outer glow disc
    c.add(this.add.circle(0, 0, r + 14, PALETTE.gold, 0.25));
    c.add(this.add.circle(0, 0, r + 6, PALETTE.gold, 0.4));

    // Diamond: 4 rotated rects
    const diamond = this.add.graphics();
    diamond.fillStyle(PALETTE.ink, 1);
    diamond.fillTriangle(0, -r, r, 0, 0, r);
    diamond.fillTriangle(0, -r, -r, 0, 0, r);
    c.add(diamond);

    const inner = this.add.graphics();
    inner.fillStyle(PALETTE.brick, 1);
    inner.fillTriangle(0, -r + 6, r - 6, 0, 0, r - 6);
    inner.fillTriangle(0, -r + 6, -(r - 6), 0, 0, r - 6);
    c.add(inner);

    // Φ in the middle
    const phi = this.add.text(0, 0, 'Φ', {
      fontFamily: '"Press Start 2P", "VT323", monospace',
      fontSize: this.responsiveSize(48, 32),
      color: hex(PALETTE.cream),
      stroke: hex(PALETTE.shadow),
      strokeThickness: 4,
    }).setOrigin(0.5);
    c.add(phi);

    // "FIGHT" caption beneath
    const fight = this.add.text(0, r + 14, 'FIGHT', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: this.responsiveSize(11, 9),
      color: hex(PALETTE.gold),
      stroke: hex(PALETTE.shadow),
      strokeThickness: 3,
    }).setOrigin(0.5);
    c.add(fight);

    return c;
  }

  // ─── HUD strip above a fighter: codename, model, version, health ───────
  private makeHud(opts: {
    align: 'left' | 'right';
    codename: string;
    model: string;
    version: string;
    color: number;
  }): Phaser.GameObjects.Container {
    const c = this.add.container(0, 0);
    const isLeft = opts.align === 'left';
    const w = this.responsiveSize(260, 200);
    const h = this.responsiveSize(74, 60);
    const ox = isLeft ? 0 : -w;

    // Back panel (cream paper with ink edge)
    const panel = this.add.rectangle(ox, 0, w, h, PALETTE.parchment, 0.95).setOrigin(0);
    c.add(panel);
    const edge = this.add.rectangle(ox, 0, w, h, PALETTE.ink, 1).setOrigin(0).setStrokeStyle(2, PALETTE.ink);
    edge.setFillStyle(0, 0);
    c.add(edge);

    // Color stripe (model accent color) on the left edge
    const stripe = this.add.rectangle(
      isLeft ? ox : ox + w - 6,
      0, 6, h, opts.color, 1
    ).setOrigin(0);
    c.add(stripe);

    // Codename (top line)
    const codename = this.add.text(
      isLeft ? ox + 14 : ox + w - 14, 8,
      opts.codename, {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: this.responsiveSize(11, 9),
        color: hex(PALETTE.ink),
      }
    ).setOrigin(isLeft ? 0 : 1, 0);
    c.add(codename);

    // Model line
    const model = this.add.text(
      isLeft ? ox + 14 : ox + w - 14, 26,
      opts.model, {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: this.responsiveSize(8, 7),
        color: hex(opts.color),
      }
    ).setOrigin(isLeft ? 0 : 1, 0);
    c.add(model);

    // Version line
    const ver = this.add.text(
      isLeft ? ox + 14 : ox + w - 14, 40,
      opts.version, {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: this.responsiveSize(7, 6),
        color: hex(PALETTE.inkSoft),
      }
    ).setOrigin(isLeft ? 0 : 1, 0);
    c.add(ver);

    // Health bar
    const barW = w - 28;
    const barX = ox + 14;
    const barY = h - 16;
    c.add(this.add.rectangle(barX, barY, barW, 8, PALETTE.shadow, 1).setOrigin(0));
    c.add(this.add.rectangle(barX + 1, barY + 1, barW - 2, 6, opts.color, 1).setOrigin(0));
    // Tick marks on bar
    for (let i = 1; i < 10; i++) {
      c.add(this.add.rectangle(barX + (barW * i / 10), barY, 1, 8, PALETTE.shadow, 1).setOrigin(0));
    }

    return c;
  }

  // ─── Title strip at top: "PHI MONSTER" + "physical-world AI fighting" ──
  private makeTitleStrip(): Phaser.GameObjects.Container {
    const c = this.add.container(0, 0);
    const title = this.add.text(0, 0, 'PHI  MONSTER', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: this.responsiveSize(22, 14),
      color: hex(PALETTE.cream),
      stroke: hex(PALETTE.shadow),
      strokeThickness: 5,
    }).setOrigin(0.5).setShadow(3, 3, hex(PALETTE.brick), 0, true, true);
    c.add(title);

    const sub = this.add.text(0, this.responsiveSize(26, 18),
      'PHYSICAL · WORLD · AI · FIGHTING', {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: this.responsiveSize(9, 7),
        color: hex(PALETTE.gold),
      }
    ).setOrigin(0.5);
    c.add(sub);

    return c;
  }

  private responsiveSize(desktop: number, mobile: number) {
    return this.scale.width < 720 ? mobile : desktop;
  }
}
