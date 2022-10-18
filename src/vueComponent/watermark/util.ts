export function createMarkBase64(str: string, ) {
  const can = document.createElement('canvas');
  const width = 200;
  const height = 140;
  Object.assign(can, { width, height });

  const cans = can.getContext('2d');
  if (cans) {
    cans.rotate((-20 * Math.PI) / 120);
    cans.font = '15px Vedana';
    cans.fillStyle = 'rgba(0, 0, 0, 0.15)';
    cans.textAlign = 'left';
    cans.textBaseline = 'middle';
    cans.fillText(str, width / 20, height);
  }
  return can.toDataURL('image/png');
}