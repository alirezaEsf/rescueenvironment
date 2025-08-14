import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { DevelopmentComponent } from '../../../shared/components/development/development.component';
import { ButtonDirective } from 'primeng/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'app-alert-system',
    templateUrl: './alert-system.component.html',
    standalone: true,
    styleUrls: ['./alert-system.component.scss'],
    imports: [DevelopmentComponent, ButtonDirective, MatTooltip],
})
export class AlertSystemComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {}
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();
    }
    BeforeButton() {
        // this.router.navigate(['/home']);
        this.close.emit('close');
    }
}
