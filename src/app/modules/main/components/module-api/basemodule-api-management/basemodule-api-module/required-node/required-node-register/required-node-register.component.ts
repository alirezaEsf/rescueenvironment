import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiGatewayConstants} from "../../../../../../constants/ApiGatewayConstants";
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../../../../shared/pipes/moreChar19.pipe';
import { ModuleTypePipe } from '../../../../../../../shared/pipes/moduleType.pipe';
import { HistoryMoreCharPipe } from '../../../../../../../shared/pipes/historyMoreChar.pipe';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { IsApprovalPipe } from '../../../../../../../shared/pipes/isApproval.pipe';
import { StatusPipe } from '../../../../../../../shared/pipes/status.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { MediatorsJsonComponent } from '../../../../../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../../../../../mediators/mediators.component';
import { NodeChangeListComponent } from '../../../../../node-change-list/node-change-list.component';
import { Dialog } from 'primeng/dialog';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import {
    HeaderEndpointRegisterComponent
} from '../../../../../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../../../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import { ToastService } from '../../../../../../../shared/services/ToastService';
import { FuseLoadingService } from '../../../../../../../../../@fuse/services/loading';
import { MessagesApiFacadeService } from '../../../../../../services/messages-api-facade.service';

@Component({
    selector: 'app-required-node-register',
    templateUrl: './required-node-register.component.html',
    styleUrls: ['./required-node-register.component.scss'],
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
    ],
})
export class RequiredNodeRegisterComponent implements OnInit {
    @Input() requiredInput;
    @Output() close = new EventEmitter<string>();

    constructor(
        private messagesApiFacadeService: MessagesApiFacadeService,
        private notifierService: ToastService,
        private _primengProgressBarService: FuseLoadingService
    ) {}

    headerTypeGroup = ApiGatewayConstants.headerTypeGroupNode;
    nodeName: string = null;
    nodePath: string = '';
    staticTextAfter: string = null;
    staticTextBefore: string = null;
    nodePlace: number = null;
    requiredId: number = null;
    apiId: string = '';
    items;
    tempProduced;

    ngOnInit(): void {
        debugger
        if (this.requiredInput != undefined) {
            debugger;
            if (this.requiredInput.nodeName != undefined) {
                debugger;
                this.nodeName = this.requiredInput.nodeName;
                if (this.requiredInput.nodePlace != null) {
                    this.nodePlace = this.requiredInput.nodePlace.toString();
                }
                if (this.requiredInput.nodePath != null) {
                    this.nodePath = this.requiredInput.nodePath.toString();
                }
                if (this.requiredInput.staticTextBefore != null) {
                    this.staticTextBefore =
                        this.requiredInput.staticTextBefore.toString();
                }
                if (this.requiredInput.staticTextAfter != null) {
                    this.staticTextAfter =
                        this.requiredInput.staticTextAfter.toString();
                }
                this.requiredId = this.requiredInput.requiredId;
            }
        }
    }

    onKeydown(event): void {
        let mySelf = this;
        if (event.key === 'Enter') {
            mySelf.onRegister();
        }
    }

    onRegister() {
        debugger;
        if (this.validation()) {
            debugger;
            debugger;
            let obj;
            if (this.requiredInput != undefined) {
                if (this.requiredInput.requiredId != undefined) {
                    debugger;
                    obj = {
                        nodeName: '',
                        nodePlace: '',
                        nodePath: '',
                        apiId: null,
                        requiredId: null,
                        staticTextAfter: null,
                        staticTextBefore: null,
                    };
                    debugger;
                    if (
                        this.nodePath != null &&
                        this.nodePath != undefined &&
                        this.nodePath != ''
                    ) {
                        let firstChar = this.nodePath.charAt(0);
                        firstChar != '/'
                            ? (this.nodePath = '/' + this.nodePath)
                            : '/' + this.nodePath;
                    }
                    obj.nodePlace = +this.nodePlace;
                    obj.nodePath = this.nodePath;
                    obj.nodeName = this.nodeName;
                    obj.apiId = this.requiredInput.apiId;
                    obj.requiredId = this.requiredInput.requiredId;
                    this.staticTextAfter == ''
                        ? (obj.staticTextAfter = null)
                        : (obj.staticTextAfter = this.staticTextAfter);
                    this.staticTextBefore == ''
                        ? (obj.staticTextBefore = null)
                        : (obj.staticTextBefore = this.staticTextBefore);
                } else {
                    debugger;
                    obj = {
                        nodeName: '',
                        nodePlace: '',
                        nodePath: '',
                        apiId: null,
                        staticTextAfter: null,
                        staticTextBefore: null,
                    };
                    debugger;
                    if (
                        this.nodePath != null &&
                        this.nodePath != undefined &&
                        this.nodePath != ''
                    ) {
                        let firstChar = this.nodePath.charAt(0);
                        firstChar != '/'
                            ? (this.nodePath = '/' + this.nodePath)
                            : '/' + this.nodePath;
                    }
                    debugger;
                    obj.nodePlace = +this.nodePlace;
                    obj.nodePath = this.nodePath;
                    obj.nodeName = this.nodeName;
                    obj.apiId = this.requiredInput.apiId;
                    obj.apiId = this.requiredInput.apiId;
                    this.staticTextAfter == ''
                        ? (obj.staticTextAfter = null)
                        : (obj.staticTextAfter = this.staticTextAfter);
                    this.staticTextBefore == ''
                        ? (obj.staticTextBefore = null)
                        : (obj.staticTextBefore = this.staticTextBefore);
                }
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .requirednodeRegister(obj)
                    .subscribe(
                        (n) => {
                            this._primengProgressBarService.hide();
                            obj.nodeName = null;
                            obj.nodePlace = null;
                            obj.nodePath = null;
                            obj.apiId = null;
                            obj.requiredId = null;
                            obj.staticTextAfter = null;
                            obj.staticTextBefore = null;
                            this.close.emit('closeAndCreate');
                            debugger;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );
            }
        }
    }

    validation(): boolean {
        if (!this.nodeName) {
            this.notifierService.showError({
                detail: 'لطفا عنوان نود را وارد نمائید!',
                life: 3000,
            });
            return false;
        } else if (!this.nodePlace) {
            this.notifierService.showError({
                detail: 'لطفا گروه بندی را وارد نمائید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    onCancel() {
        this.close.emit('close');
    }
}
