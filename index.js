import fs from 'node:fs/promises';
import svgToImg from 'svg-to-img';
import pngToIco from 'png-to-ico';
import chalk from 'chalk';

const savePng = async (file, size) => {
  console.log(chalk.blue('Saving PNG size: ' + size));
  const buffer = await svgToImg.from(file).toPng({ width: size, height: size });
  console.log(chalk.blue('Saving PNG...'));
  const fileName = `output-${size}.png`;
  await fs.writeFile(fileName, buffer);
  return fileName;
}


(async () => {
  // Convert SVG to PNG
  console.log(chalk.blue('Reading file...'));
  const file = await fs.readFile('source.svg')
  console.log(chalk.blue('Converting file to PNG...'));

  // 512
  await savePng(file, 512);
  const smallFileName = await savePng(file, 48)

  // Convert PNG to ICO
  console.log(chalk.blue('Converting PNG to ICO...'));
  const ico = await pngToIco(smallFileName);
  console.log(chalk.blue('Saving ICO...'));
  await fs.writeFile('output.ico', ico);
  console.log(chalk.green('Done!'));
})();
