import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FuseLoadingService } from '../../../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../../../shared/services/ToastService';
import { MessagesApiFacadeService } from '../../../../../../services/messages-api-facade.service';
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

@Component({
    selector: 'app-producednode-register',
    templateUrl: './producednode-register.component.html',
    styleUrls: ['./producednode-register.component.scss'],
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
export class ProducednodeRegisterComponent implements OnInit {
    @Input() producedInput;
    @Output() close = new EventEmitter<string>();

    constructor(
        private messagesApiFacadeService: MessagesApiFacadeService,
        private notifierService: ToastService,
        private _primengProgressBarService: FuseLoadingService
    ) {}

    headerTypeGroup = [{ name: 'Body', code: '2' }];
    nodeName: string = '';
    nodePath: string = '';
    nodePlace: string = null;
    producedId: number = null;
    apiId: string = '';
    items;
    tempProduced;
    justReturnValue: boolean = null;
    justReturnValueFlag: boolean = null;

    ngOnInit(): void {
        debugger;
        this.nodePlace = '2';
        if (this.producedInput != undefined) {
            if (this.producedInput.nodeName != undefined) {
                if (this.producedInput.justReturnValue == 1) {
                    this.nodePath = '';
                    this.justReturnValueFlag = true;
                } else {
                    if (this.producedInput.nodePath != null) {
                        this.nodePath = this.producedInput.nodePath.toString();
                    }
                }
                debugger;
                this.nodeName = this.producedInput.nodeName;
                this.producedId = this.producedInput.producedId;
                this.producedInput.justReturnValue == 1
                    ? (this.justReturnValue = true)
                    : (this.justReturnValue = false);

                //  this.nodePlace = this.producedInput.nodePlace.toString()
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
            let obj;
            if (this.producedInput != undefined) {
                if (this.producedInput.producedId != undefined) {
                    debugger;
                    obj = {
                        nodeName: '',
                        nodePlace: '',
                        nodePath: '',
                        apiId: null,
                        producedId: null,
                        // justReturnValue:null
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
                    obj.nodePath = this.nodePath;
                    obj.nodePlace = 2;
                    obj.nodeName = this.nodeName;
                    obj.apiId = this.producedInput.apiId;
                    obj.producedId = this.producedInput.producedId;
                    this.justReturnValue == true
                        ? (obj.justReturnValue = 1)
                        : (obj.justReturnValue = 0);
                } else {
                    debugger;
                    obj = {
                        nodeName: '',
                        nodePlace: '',
                        nodePath: '',
                        apiId: null,
                        justReturnValue: null,
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
                    obj.nodePath = this.nodePath;
                    obj.nodePlace = 2;
                    obj.nodeName = this.nodeName;
                    obj.apiId = this.producedInput.apiId;
                    this.justReturnValue == true
                        ? (obj.justReturnValue = 1)
                        : (obj.justReturnValue = 0);
                }
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .producednodeRegister(obj)
                    .subscribe(
                        (n) => {
                            this._primengProgressBarService.hide();
                            obj.nodeName = null;
                            this.nodeName = null;
                            obj.nodePath = null;
                            this.nodePath = null;
                            obj.apiId = null;
                            obj.producedId = null;
                            obj.justReturnValue = null;
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

    onCancel() {
        this.close.emit('close');
    }

    validation(): boolean {
        if (!this.nodeName) {
            this.notifierService.showError({
                detail: 'لطفا عنوان نود را وارد نمائید!',
                life: 3000,
            });
            return false;
        }
        {
            return true;
        }
    }

    onchangeJustReturnValue() {
        if (this.justReturnValue) {
            this.nodeName = 'justReturnValue';
            this.nodePlace = '2';
            this.nodePath = '';
            this.justReturnValueFlag = true;
        } else {
            this.nodeName = '';
            this.nodePlace = '2';
            this.justReturnValueFlag = false;
        }
    }
}
