// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/*declare var $ENV: Env;
interface  Env {
    SERVICEBASEURL: string;
}*/
export const environment = {
    // سرور اقای زرین qc
 serviceBaseUrl: 'http://192.168.160.40:8086/',
    //serviceBaseUrl: process.env['BASE_URL'] || 'http://192.168.160.40:8086/',
   // serviceBaseUrl: $ENV.SERVICEBASEURL,
    //سیستم اقای زرین
   // serviceBaseUrl : 'http://192.168.160.80:8086/',
    // uat نسخه جامپ
    // serviceBaseUrl: 'http://172.24.161.106:7086/',
    // pro نسخه اقای فلاح
    //serviceBaseUrl: 'https://service-api.rqbank.ir/',
    version: '1.08.11',
    defaultLanguage: 'fa',
    supportedLanguages: ['fa-IR', 'en-US'],
    production: false,
    apiBaseUrl: '',
    hmr: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
