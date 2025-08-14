import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgClass, NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { InputText } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { Menu } from 'primeng/menu';
import { Message } from 'primeng/message';
import { Panel } from 'primeng/panel';
import { Ripple } from 'primeng/ripple';
import { Steps } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { FuseLoadingService } from '../../../../../../../@fuse/services/loading';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { DbEnginePipe } from '../../../../../shared/pipes/dbEngine.pipe';
import { HistoryMoreCharPipe } from '../../../../../shared/pipes/historyMoreChar.pipe';
import { IsApprovalPipe } from '../../../../../shared/pipes/isApproval.pipe';
import { ModuleTypePipe } from '../../../../../shared/pipes/moduleType.pipe';
import { MoreChar19Pipe } from '../../../../../shared/pipes/moreChar19.pipe';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import { ToastService } from '../../../../../shared/services/ToastService';
import { AccessDataSaveService } from '../../../../../shared/services/access-data-save.service';
import { ApiGatewayService } from '../../../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../../../services/messages-api-facade.service';
import { MediatorsJsonComponent } from '../../../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../../../mediators/mediators.component';
import { NodeChangeListComponent } from '../../../node-change-list/node-change-list.component';
import { HeaderEndpointRegisterComponent } from '../header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { ClientApiRegisterComponent } from './client-api-register/client-api-register.component';
import { ClientApiUpdateComponent } from './client-api-update/client-api-update.component';
import { Card } from 'primeng/card';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-client-api-management',
    templateUrl: './client-api-management.component.html',
    styleUrls: ['./client-api-management.component.scss'],
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
        ClientApiRegisterComponent,
        ClientApiUpdateComponent,
        Card,
        Toast,
    ],
})
export class ClientApiManagementComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputclient;
    @Input() inputAccess;
    @Input() inputApi;
    clientApiDto = {
        apiId: null,
        dailyCount: null,
        weeklyCount: null,
        monthlyCount: null,
        clientList: [],
    };
    registerFlag = false;
    updateFlag = false;
    ruleClientFlag = false;
    dubFlag = false;
    clientList = [];
    clientAttachList = [];
    clientDto;
    sourceUrl;
    destinationHost;
    newModuleId;
    destinationUri;
    temp;
    detailsBreadObject = [];
    moduleTitle;
    partyTitle;
    clientName;
    mobile;
    accessBase = false;
    endpointId;
    widthSourceUrl;
    widthDestinationHost;
    widthDestinationUri;
    items;
    tempClient;
    moduleBase;
    partyBase;
    clientBase;
    apiTitle;
    apiName;
    flagClient;
    dialogClientFlag = false;
    clientTemp: any;
    first: number = 0;
    rows: number = 10;
    first2: number = 0;
    rows2: number = 10;
    apiId;
    dailyCount;
    weeklyCount;
    monthlyCount;
    paginationLabel=this.transloco.translate('label.pagination.table');

    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private accessDataSaveService: AccessDataSaveService,
        private _primengProgressBarService: FuseLoadingService,
        private transloco :TranslocoService,
        private notifierService: ToastService
    ) {}

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'moduleBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'ماژول',
                        rout_index1: '/module',
                        isActive1: false,
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
                        label_index3: 'کلاینت',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: 'assets/icons/client.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'partyBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                        img_index0: 'assets/icons/team.png',
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
                        rout_index2: '',
                        isActive2: false,
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3: 'سرویس',
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: 'کلاینت',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.apiName + ')',
                        img_index4: 'assets/icons/client.png',
                    },
                    { label_index5: null },
                    { label_index6: null },
                ];
            case 'clientBase':
                return [
                    {
                        index: 0,
                        label_index0: 'کلاینت',
                        rout_index0: '/client',
                        isActive0: false,
                        img_index0: 'assets/icons/client.png',
                    },
                    {
                        index: 1,
                        label_index1: 'لیست دسترسی',
                        rout_index1: '/api-gateway/access-list',
                        label_Detail_index1: '(' + this.clientName + ')',
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(لیست دسترسی)',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'کلاینت',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: 'assets/icons/client.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
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
                        label_Detail_index2: '(' + this.clientName + ')',
                    },
                    {
                        index: 3,
                        label_index3: 'کلاینت',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: 'assets/icons/client.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }

    onKeydownSearch(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.clientSearch();
        }
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    clientSearch() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .clientsearchbyclientnameandmobileno(this.clientName, this.mobile)
            .subscribe(
                (a) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(a)) {
                        this.clientAttachList = a;
                    } else {
                        this.clientAttachList.push(a);
                    }
                    this.clientAttachList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    for (let k = 0; k < this.clientAttachList.length; k++) {
                        this.clientAttachList[k] = Object.assign(
                            this.clientAttachList[k],
                            { row: k + 1 }
                        );
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    clientApiSearch(apiId) {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.clientbyapiid(apiId).subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                if (Array.isArray(a)) {
                    this.clientList = a;
                } else {
                    this.clientList.push(a);
                }
                this.clientList.map((x) =>
                    x.status === 1 ? (x.status = true) : (x.status = false)
                );
                for (let k = 0; k < this.clientList.length; k++) {
                    this.clientList[k] = Object.assign(this.clientList[k], {
                        row: k + 1,
                    });
                }
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    clear() {
        this.mobile = '';
        this.clientName = '';
        this.showClients();
    }

    ngOnInit(): void {
        this.scrollTop();

        this.items = [
            {
                items: [
                    {
                        label: 'قواعد کلاینت',
                        icon: '',
                        command: () => {
                            this.showRuleClient(this.tempClient);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
                        command: () => {
                            this.showUpdate(this.tempClient);
                        },
                    },
                ],
            },
            {
                label: '____________________________',
                items: [
                    {
                        label: this.transloco.translate('contextMenu.cancel'),
                    },
                ],
            },
        ];
        this.accessBase = false;
        this.apiGatewayService.currentApprovalStageEndpoint.subscribe((msg) => {
            this.temp = msg;
        });
        this.sourceUrl = this.temp.sourceUrl;
        this.destinationHost = this.temp.destinationHost;
        this.destinationUri = this.temp.destinationUri;
        if (this.inputApi != undefined) {
            this.apiId = this.inputApi.apiId;
            this.dailyCount = this.inputApi.dailyCount;
            this.weeklyCount = this.inputApi.weeklyCount;
            this.monthlyCount = this.inputApi.monthlyCount;
            this.partyTitle = this.inputApi.partyTitle;
            this.moduleTitle = this.inputApi.moduleTitle;
            this.clientName = this.inputApi.clientName;
            this.accessBase = this.inputApi.accessBase;
            this.moduleBase = this.inputApi.moduleBase;
            this.partyBase = this.inputApi.partyBase;
            this.clientBase = this.inputApi.clientBase;
            this.apiName = this.inputApi.name;
            this.apiTitle = this.inputApi.title;
            this.clientApiDto.apiId = this.inputApi.apiId;
            this.clientApiDto.dailyCount = this.inputApi.dailyCount;
            this.clientApiDto.weeklyCount = this.inputApi.weeklyCount;
            this.clientApiDto.monthlyCount = this.inputApi.monthlyCount;
            this.clientApiSearch(this.apiId);
            if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        } else if (this.inputclient != undefined) {
            this.partyTitle = this.inputclient.partyTitle;
            this.moduleTitle = this.inputclient.moduleTitle;
            this.clientName = this.inputclient.clientName;
            this.accessBase = this.inputclient.accessBase;
            this.moduleBase = this.inputclient.moduleBase;
            this.partyBase = this.inputclient.partyBase;
            this.clientBase = this.inputclient.clientBase;
            this.endpointId = this.inputclient.endpointid;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .clientgetbyendpointid(this.endpointId)
                .subscribe(
                    (getAllResponse) => {
                        this._primengProgressBarService.hide();
                        if (Array.isArray(getAllResponse)) {
                            this.clientList = getAllResponse;
                        } else {
                            this.clientList.push(getAllResponse);
                        }
                        this.clientList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        for (let k = 0; k < this.clientList.length; k++) {
                            this.clientList[k] = Object.assign(
                                this.clientList[k],
                                { row: k + 1 }
                            );
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            this.apiGatewayService.updateApprovalEndpointIdClient(
                this.inputclient.endpointId.toString()
            );
            if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
                if (this.sourceUrl.length > 22) {
                    this.widthSourceUrl = 100;
                }
                if (this.destinationHost.length > 22) {
                    this.widthDestinationHost = 100;
                }
                if (this.destinationUri.length > 22) {
                    this.widthDestinationUri = 100;
                }
            } else if (this.inputclient.clientBase) {
                this.flagClient = this.inputclient.clientBase;
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
                if (this.sourceUrl.length > 22) {
                    this.widthSourceUrl = 100;
                }
                if (this.destinationHost.length > 22) {
                    this.widthDestinationHost = 100;
                }
                if (this.destinationUri.length > 22) {
                    this.widthDestinationUri = 100;
                }
            } else if (this.inputclient.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
                if (this.sourceUrl.length > 22) {
                    this.widthSourceUrl = 100;
                }
                if (this.destinationHost.length > 22) {
                    this.widthDestinationHost = 100;
                }
                if (this.destinationUri.length > 22) {
                    this.widthDestinationUri = 100;
                }
            }
        }
    }

    showAdd() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.clientbyapiid(this.apiId).subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                if (Array.isArray(a)) {
                    this.clientList = a;
                } else {
                    this.clientList.push(a);
                }
                this.clientList.map((x) =>
                    x.status === 1 ? (x.status = true) : (x.status = false)
                );
                for (let k = 0; k < this.clientList.length; k++) {
                    this.clientList[k] = Object.assign(this.clientList[k], {
                        row: k + 1,
                    });
                }
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
        this.clientApiDto.clientList = this.clientList;
        this.registerFlag = true;
    }

    showClients() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.clientgetall().subscribe(
            (c) => {
                this._primengProgressBarService.hide();
                if (Array.isArray(c)) {
                    this.clientAttachList = c;
                } else {
                    this.clientAttachList.push(c);
                }
                this.clientAttachList.map((x) =>
                    x.status === 1 ? (x.status = true) : (x.status = false)
                );
                for (let k = 0; k < this.clientAttachList.length; k++) {
                    this.clientAttachList[k] = Object.assign(
                        this.clientAttachList[k],
                        { row: k + 1 }
                    );
                }
                this.dialogClientFlag = true;
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    selectedClient(client) {
        this.dubFlag = false;
        for (let i = 0; i < this.clientList.length; i++) {
            if (
                client.name == this.clientList[i].name &&
                client.mobileNo == this.clientList[i].mobileNo
            ) {
                this.dubFlag = true;
                this.notifierService.showError({
                    detail: 'کلاینت منتخب قبلا به سرویس متصل شده است!',
                    life: 3000,
                });

                break;
            } else {
                this.dubFlag = false;
            }
        }
        if (!this.dubFlag) {
            this.clientTemp = {
                clientId: null,
                apiId: null,
                dailyCount: null,
                weeklyCount: null,
                monthlyCount: null,
            };
            this.clientList = [];
            //console.log('selected')
            this.clientTemp.apiId = this.apiId;
            this.clientTemp.dailyCount = this.dailyCount;
            this.clientTemp.weeklyCount = this.weeklyCount;
            this.clientTemp.monthlyCount = this.monthlyCount;
            this.clientTemp.clientId = client.clientId;
            // if ()
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .clientAttachApi(this.clientTemp)
                .subscribe(
                    (res) => {
                        this._primengProgressBarService.hide();
                        this.clientApiSearch(this.apiId);
                        this.dialogClientFlag = false;
                        /* this.messagesApiFacadeService.clientgetbyendpointid(this.endpointId).subscribe(getAllResponse => {
                     if (Array.isArray(getAllResponse)) {
                         this.clientList = getAllResponse
                     } else {
                         this.clientList.push(getAllResponse)
                     }
                     this.clientList.map(x => (x.status === 1 ? x.status = true : x.status = false))
                     for (let k = 0; k < this.clientList.length; k++) {
                         this.clientList[k] = Object.assign(this.clientList[k], {row: (k + 1)})
                     }

                 })*/
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    onClose(event) {
        this.scrollTop();
        if (event == 'close') {
            this.registerFlag = false;
            this.updateFlag = false;
            this.ruleClientFlag = false;
        } else if (event == 'closeAndCreate') {
            this.registerFlag = false;
            this.updateFlag = false;
            this.ruleClientFlag = false;
            this.clientApiSearch(this.apiId);
        }
        if (this.inputApi != undefined) {
            if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        }
        if (this.inputclient != undefined) {
            if (this.inputclient.moduleBase) {
                this.detailsBreadObject = [
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
                        label_index3: 'کلاینت',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: 'assets/icons/client.png',
                    },
                    { label_index4: null },
                    { label_index5: null },
                    { label_index6: null },
                ];
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else {
                this.detailsBreadObject = [
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
                        rout_index2: '',
                        isActive2: false,
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3: 'سرویس',
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: 'کلاینت',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.apiName + ')',
                        img_index4: 'assets/icons/client.png',
                    },
                    { label_index5: null },
                    { label_index6: null },
                ];
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
            if (this.inputclient.accessBase) {
                this.detailsBreadObject = [
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
                        label_index3: 'کلاینت',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: 'assets/icons/client.png',
                    },
                    { label_index4: null },
                    { label_index5: null },
                    { label_index6: null },
                ];
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        }

        if (this.inputclient != undefined) {
            if (this.inputclient.clientBase) {
                this.detailsBreadObject = [
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
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.clientName + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'کلاینت',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: 'assets/icons/client.png',
                    },
                    { label_index4: null },
                    { label_index5: null },
                    { label_index6: null },
                ];
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        }
    }

    setRecord(client) {
        this.tempClient = client;
    }

    showUpdate(client) {
        this.clientDto = {
            apikey: '',
            name: '',
            mobileNo: '',
            publicKey: '',
            digitalPublickey: '',
            status: null,
            organizationCode: '',
            allowedAccountno: null,
            endpointId: null,
            clientId: null,
        };
        this.clientDto = client;
        this.updateFlag = true;
    }

    showRuleClient(client) {
        this.clientDto = {
            apikey: '',
            name: '',
            mobileNo: '',
            publicKey: '',
            digitalPublickey: '',
            status: null,
            organizationCode: '',
            allowedAccountno: null,
            endpointId: null,
            clientId: null,
            moduleBase: false,
            moduleTitle: null,
            partyTitle: null,
            clientBase: false,
            partyBase: false,
            clientName: null,
            accessBase: false,
            destinationHost: null,
            apiName: null,
        };
        this.clientDto = client;
        this.clientDto.moduleBase = this.moduleBase;
        this.clientDto.moduleTitle = this.moduleTitle;
        this.clientDto.apiName = this.apiName;
        this.clientDto.partyTitle = this.partyTitle;
        this.clientDto.clientBase = this.flagClient;
        this.clientDto.clientName = this.clientName;
        this.clientDto.accessBase = this.accessBase;
        this.clientDto.partyBase = this.partyBase;
        this.clientDto.destinationHost = this.destinationHost;
        this.ruleClientFlag = true;
    }

    BeforeButton() {
        this.close.emit('close');
    }
}
