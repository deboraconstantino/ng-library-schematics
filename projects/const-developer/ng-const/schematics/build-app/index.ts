import { Rule, Tree } from '@angular-devkit/schematics';
import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';

export function buildApp(): Rule {
    return (tree: Tree) => {    
        const appName: string = getAppName(tree);
        const folderToZip = `./dist/${appName}`;
        const outputZipFile = `./dist/${appName}.zip`;

        // Função para zipar
        const zipFolder = (sourceFolder: any, targetZipFile: any) => {
            const output = fs.createWriteStream(targetZipFile);
            const archive = archiver('zip', {
                zlib: { level: 9 } // Nível de compressão máximo
            });

            output.on('close', () => {
                console.log('Pasta zippada com sucesso.');
                console.log('total bytes: ' + archive.pointer());
                renameZip(outputZipFile, appName);
            });

            archive.on('error', (err: any) => {
                console.error('Erro ao zipar pasta:', err);
            });

            fs.readdir(folderToZip, {withFileTypes: true}, (err: any) => {
                if (err) {
                    console.error('Não foi possível encontrar a pasta ' + folderToZip + '. Certifique-se de que o nome da pasta de build (dist) é igual ao nome do projeto: ' + appName + '.');
                };
            });

            archive.pipe(output);

            // Recursivamente adiciona todos os arquivos e pastas dentro da pasta sourceFolder
            archive.directory(sourceFolder, path.basename(sourceFolder));

            archive.finalize();
        };

            // Chama a função criada
            zipFolder(folderToZip, outputZipFile);
        return tree;
    };
}

function getAppName(tree: Tree): string {
    const packageText: string = tree.read('package.json')!.toString('utf-8');
    return JSON.parse(packageText).name;
}

function renameZip(outputZipFile: string, appName: string): void {
    fs.rename(outputZipFile, `./dist/${appName}.app`, (error: any) => {
        if (error) {
            console.error(error)
        } else {
            console.log('Arquivo renomeado com sucesso.');
        }
    });
}