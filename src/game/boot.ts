import { PALETTE } from './palette';

export async function bootArcade(parentId: string) {
  const parent = document.getElementById(parentId);
  if (!parent) return;

  const [{ default: Phaser }, { TitleScene }] = await Promise.all([
    import('phaser'),
    import('./TitleScene'),
  ]);

  // Wait one tick to ensure CSS layout is settled and parent has real size.
  await new Promise(requestAnimationFrame);

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    backgroundColor: PALETTE.sky0,
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: Math.max(parent.clientWidth, 320),
      height: Math.max(parent.clientHeight, 480),
    },
    pixelArt: true,
    roundPixels: true,
    fps: { target: 60, forceSetTimeOut: false },
    scene: [TitleScene],
    audio: { disableWebAudio: false, noAudio: true },
    banner: false,
    // Decorative — disable input subsystem so events pass through to the page.
    input: {
      mouse: false,
      touch: false,
      keyboard: false,
      gamepad: false,
      windowEvents: false,
    },
    disableContextMenu: false,
  });

  // Pause render when canvas leaves viewport — saves CPU while reading content.
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) game.loop.wake();
      else game.loop.sleep();
    }
  }, { threshold: 0.05 });
  io.observe(parent);

  return game;
}
