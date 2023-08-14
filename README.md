# NgLibrarySchematics
Estudo realizado para implementação do schematics em uma lib.

Foram criados dois schematics customizados:
1. ng-add: Esse schematic exibe uma mensagem para o usuário no momento da instalação, perguntando se o mesmo quer adicionar um comando de build em sua aplicação. Caso sim, será instalada a dependência archiver e serão adicionados os comandos de **build:build-app** e **build:libcore** no package.json da aplicação principal.
2. build-app: Esse schematic zipa a pasta gerada em dist após o build da aplicação e renomeia sua extensão para .app.

## Resultado
Pacote desenvolvido: https://www.npmjs.com/package/@const-developer/ng-const

**Observação:** o pacote foi desenvolvido exclusivamente para estudos.

## Testando os schematics criados
1. Executar o comando `ng-add @const-developer/ng-const`;
2. Responder a pergunta com Y, para que os comandos de build e o pacote archiver seja instalado **(esse testa o ng-add)**;
3. Executar o comando `npm run build:libcore`. Esse comando irá executar o build da aplicação e em seguida, zipar a pasta gerada em dist e renomear sua extensão para .app **(esse testa o build-app)**.

**Observação:** para o estudo, foi utilizado apenas o **npm**, mas os comandos podem ser alterados manualmente para o gerenciador de pacotes que preferir.

## Referências
https://gleisonsubzerokz.medium.com/angular-schematics-criando-projetos-customizados-edf89fd434dd

https://github.com/wizsolucoes/angular-starter-schematic

https://coco-boudard.medium.com/add-schematics-to-angular-library-bd5987328d7b

https://angular.io/guide/schematics-for-libraries