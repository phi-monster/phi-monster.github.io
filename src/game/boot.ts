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
    audio: { disableWebAudio: false, noAudio: true }, // we synthesize manually
    banner: false,
  });

  // When the title screen advances, scroll into the main content.
  document.addEventListener('phi:start', () => {
    const main = document.getElementById('main-content');
    if (main) {
      main.classList.add('reveal');
      main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, { once: true });

  return game;
}
