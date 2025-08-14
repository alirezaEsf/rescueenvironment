import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../../../shared/pipes/moreChar19.pipe';
import { ModuleTypePipe } from '../../../../../../shared/pipes/moduleType.pipe';
import { HistoryMoreCharPipe } from '../../../../../../shared/pipes/historyMoreChar.pipe';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { IsApprovalPipe } from '../../../../../../shared/pipes/isApproval.pipe';
import { StatusPipe } from '../../../../../../shared/pipes/status.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { MediatorsJsonComponent } from '../../../../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../../../../mediators/mediators.component';
import { NodeChangeListComponent } from '../../../../node-change-list/node-change-list.component';
import { Dialog } from 'primeng/dialog';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import {
    HeaderEndpointRegisterComponent
} from '../../../../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import { TimeLimitationRegisterComponent } from './time-limitation-register/time-limitation-register.component';
import { ThreeDotDetailsPipe } from '../../../../../../shared/pipes/threeDotDetails.pipe';
import { LimitTypePipe } from '../../../../../../shared/pipes/limitType.pipe';
import { ActivatedRoute } from '@angular/router';
import { MessagesApiFacadeService } from '../../../../../services/messages-api-facade.service';
import { FuseLoadingService } from '../../../../../../../../@fuse/services/loading';
import { ApiGatewayService } from '../../../../../services/api-gateway.service';
import { AccessDataSaveService } from '../../../../../../shared/services/access-data-save.service';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-time-limitation',
    templateUrl: './time-limitation.component.html',
    styleUrls: ['./time-limitation.component.scss'],
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
        TimeLimitationRegisterComponent,
        ThreeDotDetailsPipe,
        LimitTypePipe,
        Toast,
    ],
})
export class TimeLimitationComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputTimeLimitation;
    timeLimitationFlag = false;
    addUpdateFlag = false;
    title: string = null;
    url: string = null;
    timeLimitationList = [];
    objectTimeLimitation = {
        fromDateTime: null,
        toDateTime: null,
        limitType: null,
        apiId: null,
        status: null,
        updateFlag: null,
        headerLimit: 'headerLimit',
    };
    detailsBreadObject = [];
    partyTitle;
    moduleTitle;
    clientBase = null;
    moduleBase = null;
    accessBase = null;
    clientName;
    widthUrl;
    widthTitle;
    first: number = 0;
    rows: number = 10;
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private transloco :TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private accessDataSaveService: AccessDataSaveService
    ) {}

    chooseBread(caseBase: any) {
        switch (caseBase) {
            case 'clientBase':
                return [
                    {
                        index: 0,
                        label_index0: 'صفحه اصلی',
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'کلاینت',
                        rout_index1: '/client',
                        isActive1: false,
                        img_index1: 'assets/icons/client.png',
                    },
                    {
                        index: 2,
                        label_index2: 'لیست دسترسی',
                        rout_index2: '/api-gateway/access-list',
                        isActive2: false,
                        img_index2: 'assets/icons/access.png',
                        label_Detail_index2: '(' + this.clientName + ')',
                    },
                    {
                        index: 3,
                        label_index3: 'سرویس',
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(لیست دسترسی)',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: 'محدودیت زمانی سرویس',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.title + ')',
                        img_index4: 'assets/icons/limit.png',
                    },
                    { label_index5: null },
                    { label_index6: null },
                ];
                break;
            case 'moduleBase':
                return [
                    {
                        index: 0,
                        label_index0: 'صفحه اصلی',
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'ماژول',
                        rout_index1: '/module',
                        isActive1: false,
                        img_index1: 'assets/icons/module.png',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'محدودیت زمانی سرویس',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.title + ')',
                        img_index3: 'assets/icons/limit.png',
                    },
                    { label_index4: null },
                    { label_index5: null },
                ];
                break;
            case 'accessBase':
                return [
                    {
                        index: 0,
                        label_index0: 'صفحه اصلی',
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'لیست دسترسی',
                        rout_index1: '/api-gateway/access-list',
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        img_index2: 'assets/icons/api.png',
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                    },
                    {
                        index: 3,
                        label_index3: 'محدودیت زمانی سرویس',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.title + ')',
                        img_index3: 'assets/icons/limit.png',
                    },
                    { label_index4: null },
                    { label_index5: null },
                ];
                break;
            case 'partyBase':
                return [
                    {
                        index: 0,
                        label_index0: 'صفحه اصلی',
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'سازمان',
                        rout_index1: '/party',
                        isActive1: false,
                        img_index1: 'assets/icons/party.png',
                    },
                    {
                        index: 2,
                        label_index2: 'ماژول',
                        rout_index2: '/module',
                        isActive2: false,
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3: 'سرویس',
                        rout_index3: '/api',
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: 'محدودیت زمانی سرویس',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.title + ')',
                        img_index4: 'assets/icons/limit.png',
                    },
                    { label_index5: null },
                ];
                break;
            default:
                return null;
        }
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();

        this.title = this.inputTimeLimitation.title;
        this.url = this.inputTimeLimitation.url;

        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .getlmitbyapiid(this.inputTimeLimitation.apiId)
            .subscribe(
                (a) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(a)) {
                        this.timeLimitationList = a;
                    } else {
                        this.timeLimitationList.push(a);
                    }
                    this.timeLimitationList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    for (let k = 0; k < this.timeLimitationList.length; k++) {
                        this.timeLimitationList[k] = Object.assign(
                            this.timeLimitationList[k],
                            { row: k + 1 }
                        );
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );

        if (this.inputTimeLimitation != undefined) {
            this.moduleBase = this.inputTimeLimitation.moduleBase;
            this.clientBase = this.inputTimeLimitation.clientBase;
            this.accessBase = this.inputTimeLimitation.accessBase;
            this.partyTitle = this.inputTimeLimitation.partyTitle;
            this.moduleTitle = this.inputTimeLimitation.moduleTitle;
            this.clientName = this.inputTimeLimitation.clientName;
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.partyTitle != undefined && this.partyTitle != '') {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        }
        if (this.url.length != null) {
            this.url.length > 22 ? (this.widthUrl = 100) : (this.widthUrl = 50);
        }
        if (this.title.length != null) {
            this.title.length > 22
                ? (this.widthTitle = 100)
                : (this.widthTitle = 50);
        }
    }

    showAddUpdate(updateFlag, timeLimitation?) {
        if (updateFlag) {
            this.addUpdateFlag = true;
            this.objectTimeLimitation = timeLimitation;
            this.objectTimeLimitation.updateFlag = true;
            this.objectTimeLimitation.headerLimit = 'ویرایش محدودیت سرویس';
        } else {
            this.addUpdateFlag = true;
            this.objectTimeLimitation.updateFlag = false;
            this.objectTimeLimitation.headerLimit = 'ثبت محدودیت سرویس';
        }
    }

    onClose(event) {
        if (this.clientBase) {
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else if (this.moduleBase) {
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else if (this.accessBase) {
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else if (this.partyTitle != undefined && this.partyTitle != '') {
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        if (event == 'close') {
            this.addUpdateFlag = false;
        } else if (event == 'closeAndCreate') {
            this.addUpdateFlag = false;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .getlmitbyapiid(this.inputTimeLimitation.apiId)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        if (Array.isArray(a)) {
                            this.timeLimitationList = a;
                        } else {
                            this.timeLimitationList.push(a);
                        }
                        this.timeLimitationList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        for (
                            let k = 0;
                            k < this.timeLimitationList.length;
                            k++
                        ) {
                            this.timeLimitationList[k] = Object.assign(
                                this.timeLimitationList[k],
                                { row: k + 1 }
                            );
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    BeforeButton() {
        this.close.emit('close');
    }
}
