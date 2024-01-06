import fs from 'node:fs/promises';
import svgToImg from 'svg-to-img';
import pngToIco from 'png-to-ico';
import chalk from 'chalk';

(async () => {
  // Convert SVG to PNG
  console.log(chalk.blue('Reading file...'));
  const file = await fs.readFile('source.svg')
  console.log(chalk.blue('Converting file to PNG...'));
  const buffer = await svgToImg.from(file).toPng();
  console.log(chalk.blue('Saving PNG...'));
  await fs.writeFile('output.png', buffer);

  // Convert PNG to ICO
  console.log(chalk.blue('Converting PNG to ICO...'));
  const ico = await pngToIco('output.png');
  console.log(chalk.blue('Saving ICO...'));
  await fs.writeFile('output.ico', ico);
  console.log(chalk.green('Done!'));
})();
