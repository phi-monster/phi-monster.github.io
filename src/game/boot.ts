import { PALETTE } from './palette';

export async function bootArcade(parentId: string) {
  const parent = document.getElementById(parentId);
  if (!parent) return;

  // Dynamic-import Phaser + scene so they ship in a separate chunk
  const [{ default: Phaser }, { TitleScene }] = await Promise.all([
    import('phaser'),
    import('./TitleScene'),
  ]);

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    backgroundColor: PALETTE.bg0,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: parent.clientWidth,
      height: parent.clientHeight,
    },
    pixelArt: true,
    roundPixels: true,
    fps: { target: 60, forceSetTimeOut: false },
    scene: [TitleScene],
    audio: { disableWebAudio: false, noAudio: true },
    banner: false,
    // Don't capture mouse/touch/keyboard — title screen is decorative,
    // events must reach the page so the user can scroll naturally.
    input: {
      mouse: false,
      touch: false,
      keyboard: false,
      gamepad: false,
      activePointers: 0,
      windowEvents: false,
    },
    disableContextMenu: false,
  });

  // Pause Phaser rendering when canvas is off-screen — keeps idle CPU near zero
  // when the user is reading content below.
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        game.loop.wake();
      } else {
        game.loop.sleep();
      }
    }
  }, { threshold: 0.05 });
  io.observe(parent);

  return game;
}
