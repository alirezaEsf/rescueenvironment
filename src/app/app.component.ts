import { Component, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSettings } from './AppSetting';
import {
    SaffronLoaderService
} from './modules/mat-wrapper-components/projects/components/src/lib/_01-components/_21-saffron-loader/services/saffron-loader.service';
import {
    SaffronMessageService
} from './modules/mat-wrapper-components/projects/components/src/lib/_01-components/_22-saffron-message/services/saffron-message.service';
import { AppComponentService } from './app.component.service';
import { MessageService } from 'primeng/api';
import { ToastService } from './modules/shared/services/ToastService';
import {MainComponent} from "./modules/main/main.component";
import { environment } from '../environments/environment';
import { APP_BASE_HREF } from '@angular/common';
import { SwUpdate } from '@angular/service-worker';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    providers:[MessageService,ToastService,
        {
            provide: APP_BASE_HREF,
            useValue: environment.production ? '/' : '/'
        }
    ],
    imports: [RouterOutlet, MainComponent],
})
export class AppComponent implements OnInit{
    appSettings = AppSettings;
    /**
     * Constructor
     */
    /*constructor(private renderer: Renderer2) {

    }*/
    constructor(private viewContainerRef: ViewContainerRef,
                private renderer: Renderer2,
                private service: AppComponentService,
                private loaderService: SaffronLoaderService,
                private saffronMessageService: SaffronMessageService,
                private swUpdate: SwUpdate
                ) {
        this.service.registerViewContainerRef(viewContainerRef);

        this.loaderService.setRootViewContainerRef(viewContainerRef);
        this.saffronMessageService.registerViewContainerRef(this.viewContainerRef);
    }

    ngOnInit(): void {
        // this.setBodyDirection(this.appSettings.AppDirection);
        this.swUpdate.versionUpdates.subscribe(event => {
            console.log('Version versionUpdates event:>>>>>>>>>>>>>>>>>', event);
            if (event.type === 'VERSION_READY') {
                // به‌روزرسانی جدید آماده است
                if (confirm('نسخه جدید برنامه آماده است. می‌خواهید صفحه را رفرش کنید؟')) {
                    window.location.reload();
                }
            }
        });
    }

    // Method to set the body direction
    setBodyDirection(direction: string): void {
        // this.renderer.setAttribute(document.body, 'dir', direction);
    }
}
