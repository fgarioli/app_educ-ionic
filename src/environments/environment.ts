// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // api: 'http://localhost:8080/app_educ-rest',
  // api: 'http://192.168.25.7:8080/app_educ-rest',
  api: "http://teste.cachoeiro.es.gov.br:8085/app_educ-rest",
  whitelistedDomains: ["teste.cachoeiro.es.gov.br:8085", "localhost:8080"],
  blacklistedRoutes: [
    "teste.cachoeiro.es.gov.br:8085/app_educ-rest/login",
    "localhost:8080/app_educ-rest/login"
  ],
  ano: "2019"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
