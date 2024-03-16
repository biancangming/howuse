export function createMarkBase64(str: string, opacity = 0.15) {
  const _opacity = opacity > 1 ? 1 : (opacity < 0 ? 0.1 : opacity) // 介于 0 - 1 之间

  const can = document.createElement('canvas');
  const width = 200;
  const height = 140;
  Object.assign(can, { width, height });

  const cans = can.getContext('2d');
  if (cans) {
    cans.rotate((-20 * Math.PI) / 120);
    cans.font = '15px Vedana';
    cans.fillStyle = `rgba(0, 0, 0, ${_opacity})`;
    cans.textAlign = 'left';
    cans.textBaseline = 'middle';
    cans.fillText(str, width / 20, height);
  }
  return can.toDataURL('image/png');
}