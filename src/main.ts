import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { appConfig } from 'app/app.config';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
);
platformBrowserDynamic().bootstrapModule(AppComponent).then(() => {
    if ('serviceWorker' in navigator && environment.production) {
        navigator.serviceWorker.register('/ngsw-worker.js');
    }
});
