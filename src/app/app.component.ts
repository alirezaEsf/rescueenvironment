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

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet],
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
                private saffronMessageService: SaffronMessageService) {
        this.service.registerViewContainerRef(viewContainerRef);

        this.loaderService.setRootViewContainerRef(viewContainerRef);
        this.saffronMessageService.registerViewContainerRef(this.viewContainerRef);
    }

    ngOnInit(): void {
        // this.setBodyDirection(this.appSettings.AppDirection);
    }

    // Method to set the body direction
    setBodyDirection(direction: string): void {
        // this.renderer.setAttribute(document.body, 'dir', direction);
    }
}
