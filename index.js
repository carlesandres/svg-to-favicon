import fs from 'node:fs/promises';
import svgToImg from 'svg-to-img';
import pngToIco from 'png-to-ico';
import chalk from 'chalk';

const savePng = async (file, size, fileName) => {
  console.log(chalk.blue('Saving PNG size: ' + size));
  const buffer = await svgToImg.from(file).toPng({ width: size, height: size });
  console.log(chalk.blue('Saving PNG...'));
  fileName = fileName || `output-${size}`;
  fileName += '.png';
  await fs.writeFile(fileName, buffer);
  return fileName;
}


(async () => {
  // Convert SVG to PNG
  console.log(chalk.blue('Reading file...'));
  const file = await fs.readFile('source.svg')
  console.log(chalk.blue('Converting file to PNG...'));

  // 512
  await savePng(file, 180, 'apple-touch-icon');
  await savePng(file, 192, 'android-chrome-192x192');
  await savePng(file, 512, 'android-chrome-512x512');
  const smallFileName = await savePng(file, 48)

  // Convert PNG to ICO
  console.log(chalk.blue('Converting PNG to ICO...'));
  const ico = await pngToIco(smallFileName);
  console.log(chalk.blue('Saving ICO...'));
  await fs.writeFile('favicon.ico', ico);
  console.log(chalk.blue('Removing temp files...'));
  await fs.unlink(smallFileName);
  console.log(chalk.green('Done!'));
})();
