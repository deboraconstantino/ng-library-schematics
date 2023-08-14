import { Rule, Tree } from '@angular-devkit/schematics';
import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function buildApp(_options: any): Rule {
  return (tree: Tree) => {
    const appName: string = getAppName(tree);
    const folderToZip = `./dist/${appName}`;
    const outputZipFile = `./dist/${appName}.zip`;

    const zipFolder = (sourceFolder: any, targetZipFile: any) => {
      const output = fs.createWriteStream(targetZipFile);
      const archive = archiver('zip', {
        zlib: { level: 9 } // Nível de compressão máximo
      });

      output.on('close', () => {
        console.log('Pasta zippada com sucesso.');
      });

      archive.on('error', (err: any) => {
        console.error('Erro ao zipar pasta:', err);
      });

      archive.pipe(output);

      // Recursivamente adiciona todos os arquivos e pastas dentro da pasta sourceFolder
      archive.directory(sourceFolder, path.basename(sourceFolder));

      archive.finalize();
    };

    zipFolder(folderToZip, outputZipFile);

    return tree;
  };
}

function getAppName(tree: Tree): string {
  const packageText: string = tree.read('package.json')!.toString('utf-8');
  return JSON.parse(packageText).name;
}