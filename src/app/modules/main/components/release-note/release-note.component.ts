import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from "@angular/router";

import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { ModuleTypePipe } from '../../../shared/pipes/moduleType.pipe';
import { HistoryMoreCharPipe } from '../../../shared/pipes/historyMoreChar.pipe';
import { NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { IsApprovalPipe } from '../../../shared/pipes/isApproval.pipe';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { MediatorsJsonComponent } from '../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../mediators/mediators.component';
import { NodeChangeListComponent } from '../node-change-list/node-change-list.component';
import { Dialog } from 'primeng/dialog';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import {
    HeaderEndpointRegisterComponent
} from '../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import { FuseLoadingService } from '../../../../../@fuse/services/loading';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';
import { Card } from 'primeng/card';

@Component({
    selector: 'app-release-note',
    templateUrl: './release-note.component.html',
    styleUrls: ['./release-note.component.scss'],
    standalone: true,
    imports: [
        TableModule,
        BreadcrumbsComponent,
        Panel,
        FormsModule,
        ButtonDirective,
        InputText,
        Tooltip,
        MoreChar19Pipe,
        ModuleTypePipe,
        HistoryMoreCharPipe,
        NgStyle,
        IsApprovalPipe,
        StatusPipe,
        Menu,
        Ripple,
        MediatorsJsonComponent,
        MediatorsComponent,
        NodeChangeListComponent,
        Dialog,
        TranslocoPipe,
        TranslocoDirective,
        ConfirmDialog,
        DropdownModule,
        NgIf,
        HeaderEndpointRegisterComponent,
        MatTooltip,
        MatIcon,
        Message,
        InputTextarea,
        NgClass,
        Checkbox,
        DbEnginePipe,
        Steps,
        Card,
        NgForOf,
    ],
})
export class ReleaseNoteComponent implements OnInit {
    tempVersion = [];
    releaseList = [];
    pageno: number = 0;
    pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    constructor(
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private route: ActivatedRoute,
        private transloco:TranslocoService,
    ) {}

    nextPageStatement(): void {
        this.pageno += 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        // this.search(this.pagesize,this.pageno);
    }
    ngOnInit(): void {
        this.messagesApiFacadeService
            .releasenote(this.pageno, 3)
            .subscribe((k) => {
                this.tempVersion = k;
            });
    }
    previousPageStatement(): void {
        this.pageno -= 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        // this.search(this.pagesize,this.pageno);
    }
}
