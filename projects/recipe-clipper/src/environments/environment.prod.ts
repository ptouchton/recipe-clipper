const packageJson = require('../../../../package.json');

export const environment = {
  appName: 'Recipe Clipper',
  envName: 'PROD',
  production: true,
  test: false,
  i18nPrefix: '/angular-ngrx-material-starter',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome:
      packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  },
  productsApi: 'https://recipe-clipper.netlify.app/.netlify/functions/products',
  recipesApi: 'https://recipe-clipper.netlify.app/.netlify/functions/recipes',
  redirectUrl: 'https://recipe-clipper.netlify.app/call-back'
};
