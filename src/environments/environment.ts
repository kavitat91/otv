// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiURL: "http://13.233.16.182/",
  // authtoken: "3zZmzoHg8z6SM3wpDoyw"  
  //apiURL: "http://13.234.124.5/",
  //apiURL: "http://bhima.tarangplus.in:3006/", //staging
  //apiURL: "https://prod.api.tarangplus.in/", //production
  //apiURL:"http://13.235.165.21:3006/",
  apiURL: "http://13.235.165.21:3006/", //production
  authtoken: "3zZmzoHg8z6SM3wpDoyw" 
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
