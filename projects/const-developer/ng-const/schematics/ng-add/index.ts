import { Rule, Tree, SchematicContext } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function ngAdd(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        if (options.buildApp) {
            const newPackageJson: object = updatePackageJson(tree);

            tree.overwrite('package.json', JSON.stringify(newPackageJson, null, 2));
            context.logger.info('✅️ Script buildLibCoreApp adicionado no package.json.');

            addArchiverLib(context);
        };

        return tree;
    };
};

function updatePackageJson(tree: Tree): object {
    const packageText: string = tree.read('package.json')!.toString('utf-8');
    let packageJson: any = JSON.parse(packageText);
    
    const buildApp: object = JSON.parse('{"build:build-app": "schematics @const-developer/ng-const:build-app", "build:libcore": "npm run build && npm run build:build-app"}');
    // const buildApp: object = {buildAppLibCore: "schematics @const-developer/ng-const:build-app"};
    const archiver: object = JSON.parse('{"archiver": "^5.3.1"}');
    packageJson.dependencies = Object.assign(packageJson.dependencies, archiver);
    packageJson.scripts = Object.assign(packageJson.scripts, buildApp);

    return packageJson;
};

function addArchiverLib(context: SchematicContext): void {
    context.logger.info('✅️ Instalando pacote archiver.');
    context.addTask(new NodePackageInstallTask());
};