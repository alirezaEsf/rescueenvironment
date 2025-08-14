import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../shared/pipes/moreChar19.pipe';
import { ModuleTypePipe } from '../../../../shared/pipes/moduleType.pipe';
import { HistoryMoreCharPipe } from '../../../../shared/pipes/historyMoreChar.pipe';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { IsApprovalPipe } from '../../../../shared/pipes/isApproval.pipe';
import { StatusPipe } from '../../../../shared/pipes/status.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { MediatorsJsonComponent } from '../../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../../mediators/mediators.component';
import { NodeChangeListComponent } from '../../node-change-list/node-change-list.component';
import { Dialog } from 'primeng/dialog';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import {
    HeaderEndpointRegisterComponent
} from './header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import { FuseLoadingService } from '../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../shared/services/ToastService';
import { PrimeNG } from 'primeng/config';
import { AccessDataSaveService } from '../../../../shared/services/access-data-save.service';
import { ApiGatewayService } from '../../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { ThreeDotDetailsPipe } from '../../../../shared/pipes/threeDotDetails.pipe';
import { EndpointRegisterComponent } from './endpoint-register/endpoint-register.component';
import { EndpointUpdateComponent } from './endpoint-update/endpoint-update.component';
import { HeaderEndpointManagementComponent } from './header-endpoint-management/header-endpoint-management.component';
import { ClientApiManagementComponent } from './client-api-management/client-api-management.component';
import { IpLimitationComponent } from './ip-limitation/ip-limitation.component';
import { Card } from 'primeng/card';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-endpoint-management',
    templateUrl: './endpoint-management.component.html',
    styleUrls: ['./endpoint-management.component.scss'],
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
        ThreeDotDetailsPipe,
        EndpointRegisterComponent,
        EndpointUpdateComponent,
        HeaderEndpointManagementComponent,
        ClientApiManagementComponent,
        IpLimitationComponent,
        Card,
        Toast,
    ],
})
export class EndpointManagementComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputEndpoint;
    @Input() inputAccess;
    @Input() inputClients;
    endpointDto = {
        sourceUrl: '',
        status: null,
        destinationPortNumber: '',
        destinationHost: '',
        moduleId: null,
        endpointid: null,
        moduleBase: null,
        partyTitle: null,
        moduleTitle: null,
        accessBase: null,
        clientName: '',
        clientBase: null,
        partyBase: null,
    };
    registerFlag = false;
    updateFlag = false;
    clientFlag = false;
    headerFlag = false;
    addButtonFlag = false;
    dialogAllEndpointModuleFlag = false;
    ipLimitFlag = false;
    addDisable = false;
    endpointList = [];
    newEndpointList = [];
    otherEndpointList = [];
    moduleTitle = null;
    clientName = null;
    moduleGroup = null;
    moduleType = null;
    partyTitle = null;
    moduleBase = null;
    partyBase = null;
    accessBase = null;
    clientBase = null;
    detailsBreadObject = [];
    tempEndpoint;
    items;
    moduleId;
    widthModuleTitle;
    widthModuleGroup;
    widthModuleType;
    first: number = 0;
    rows: number = 10;
    createEndpointFlag: boolean = true;
    countLicense = 0;
    moduleIdReg = {
        moduleId: null,
        clientBase: false,
        allowedAccountno: null,
        apikey: '',
        clientId: null,
        digitalPublickey: '',
        endpointId: null,
        mobileNo: '',
        name: '',
        organizationCode: '',
        publicKey: '',
        row: null,
        status: null,
    };
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private transloco :TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private _primengProgressBarService: FuseLoadingService,
        private accessDataSaveService: AccessDataSaveService,
        private notifierService: ToastService,
        private primeng: PrimeNG
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
                        rout_index1: '/api-gateway/home/party/module',
                        isActive1: false,
                        img_index1: 'assets/icons/module.png',
                    },
                    {
                        index: 2,
                        label_index2: 'اندپوینت',
                        rout_index2: '',
                        isActive2: true,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/endpoint.png',
                    },
                    { label_index3: null },
                    { label_index4: null },
                    { label_index5: null },
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
                        rout_index1: '/api-gateway/home/party',
                        isActive1: false,
                        img_index1: 'assets/icons/party.png',
                    },
                    {
                        index: 2,
                        label_index2: 'ماژول',
                        rout_index2: '/api-gateway/home/party/module',
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        isActive2: false,
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3: 'اندپوینت',
                        rout_index3: '',
                        isActive3: true,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/endpoint.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'accessBase':
                return [
                    {
                        index: 0,
                        label_index0: 'لیست دسترسی',
                        rout_index0: '/api-gateway/access-list',
                        isActive0: false,
                        img_index0: 'assets/icons/access.png',
                    },
                    {
                        index: 1,
                        label_index1: 'اندپوینت',
                        rout_index1: '',
                        isActive1: true,
                        label_Detail_index1: '(' + this.moduleTitle + ')',
                        img_index1: 'assets/icons/endpoint.png',
                    },
                    { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                    { label_index7: null, label_Detail_index7: null },
                ];
            case 'clientBase':
                return [

                    {
                        index: 0,
                        label_index0: 'کلاینت',
                        rout_index0: '/api-gateway/access-list',
                        isActive0: false,
                        img_index0: 'assets/icons/client.png',
                    },
                    {
                        index: 1,
                        label_index1: 'لیست دسترسی',
                        rout_index1: '/api-gateway/access-list',
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                        label_Detail_index1: '(' + this.clientName + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'اندپوینت',
                        rout_index2: '',
                        isActive2: true,
                        label_Detail_index2: '(لیست دسترسی)',
                        img_index2: 'assets/icons/endpoint.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
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
        debugger
        this.scrollTop();
        console.log(this.inputClients, 'inputClients');
        this.primeng.ripple.set(true);
        this.items = [
            {
                items: [
                    /* {
                         label: 'کلاینت های اندپوینت',
                         icon: '',
                         command: () => {
                             this.showClient(this.tempEndpoint);
                         }
                     },*/
                    {
                        label: 'المان های اندپوینت',
                        icon: '',
                        command: () => {
                            this.showHeader(this.tempEndpoint);
                        },
                    },
                    {
                        label: 'محدودیت های IP',
                        icon: '',
                        command: () => {
                            this.showIpLimit(this.tempEndpoint);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
                        command: () => {
                            this.showUpdate(this.tempEndpoint);
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
        this.moduleBase = false;
        this.accessBase = false;
        debugger
        if (this.inputAccess != undefined) {
            debugger
            this.moduleTitle = this.inputAccess.moduleTitle;
            this.accessBase = this.inputAccess.accessBase;
            this.clientBase = this.inputAccess.clientBase;
            this.moduleId = this.inputAccess.moduleId;
            this.clientName = this.inputAccess.clientName;
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
                this.endpointDto.clientBase = true;
            }
            else if (this.accessBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
                this.endpointDto.accessBase = true;
            }

            this.endpointList = [];
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .endpointbymoduleid(this.moduleId)
                .subscribe(
                    (getAllResponse) => {
                        this._primengProgressBarService.hide();
                        if (Array.isArray(getAllResponse)) {
                            this.endpointList = getAllResponse;
                        } else {
                            this.endpointList.push(getAllResponse);
                        }

                        this.endpointList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        this.createEndpointFlag = this.disabelCheck();
                        for (let k = 0; k < this.endpointList.length; k++) {
                            this.endpointList[k] = Object.assign(
                                this.endpointList[k],
                                { expanded: false }
                            );
                            this._primengProgressBarService.show();
                            this.messagesApiFacadeService
                                .findbyendpointid(
                                    this.endpointList[k].endpointId
                                )
                                .subscribe(
                                    (ress) => {
                                        //console.log('ress', ress)
                                        this._primengProgressBarService.hide();
                                        let result = '';
                                        for (let i = 0; i < ress.length; i++) {
                                            result +=
                                                ress[i].ipAddress.toString();
                                            if (i < ress.length - 1) {
                                                result += ' / ';
                                            }
                                        }
                                        this.newEndpointList =
                                            this.endpointList.map((item) => {
                                                let obj = {
                                                    destinationHost: null,
                                                    destinationPortNumber: null,
                                                    destinationUri: null,
                                                    endpointId: null,
                                                    expanded: null,
                                                    moduleId: null,
                                                    sourceUrl: null,
                                                    status: null,
                                                    clientName: null,
                                                    ipAddress: null,
                                                };
                                                obj.destinationHost =
                                                    item.destinationHost;
                                                obj.destinationPortNumber =
                                                    item.destinationPortNumber;
                                                obj.destinationUri =
                                                    item.destinationUri;
                                                obj.endpointId =
                                                    item.endpointId;
                                                obj.expanded = item.expanded;
                                                obj.moduleId = item.moduleId;
                                                obj.sourceUrl = item.sourceUrl;
                                                obj.status = item.status;
                                                obj.clientName =
                                                    item.clientName;
                                                obj.ipAddress = result;
                                                //console.log('newEndpointList', obj)
                                                return obj;
                                            });
                                    },
                                    (error) => {
                                        this._primengProgressBarService.hide();
                                    }
                                );
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .SearchModuleById(this.moduleId)
                .subscribe(
                    (resModul) => {
                        this._primengProgressBarService.hide();
                        this.moduleTitle = resModul.moduleTitle;
                        this.moduleGroup = resModul.moduleGroup;
                        this.moduleType = resModul.moduleType;
                        this.partyTitle = resModul.title;
                        this.moduleTitle.length > 22
                            ? (this.widthModuleTitle = 100)
                            : (this.widthModuleTitle = 50);
                        this.moduleGroup.length > 22
                            ? (this.widthModuleGroup = 100)
                            : (this.widthModuleGroup = 50);
                        this.moduleType.length > 22
                            ? (this.widthModuleType = 100)
                            : (this.widthModuleType = 50);
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .checkactiveendpointbymoduleid(this.moduleId)
                .subscribe(
                    (o) => {
                        this._primengProgressBarService.hide();
                        debugger;
                        this.addButtonFlag = o;
                        debugger;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
        else if (this.inputClients != undefined) {
            this.clientBase = this.inputClients.clientBase;
            this.clientName = this.inputClients.clientName;
            this.moduleId = this.inputClients.moduleId;

            this.moduleIdReg.moduleId = this.inputClients.moduleId;
            this.moduleIdReg.clientBase = this.inputClients.clientBase;
            this.moduleIdReg.allowedAccountno =
                this.inputClients.allowedAccountno;
            this.moduleIdReg.apikey = this.inputClients.apikey;
            this.moduleIdReg.clientId = this.inputClients.clientId;
            this.moduleIdReg.digitalPublickey =
                this.inputClients.digitalPublickey;
            this.moduleIdReg.endpointId = this.inputClients.endpointId;
            this.moduleIdReg.mobileNo = this.inputClients.mobileNo;
            this.moduleIdReg.name = this.inputClients.name;
            this.moduleIdReg.organizationCode =
                this.inputClients.organizationCode;
            this.moduleIdReg.publicKey = this.inputClients.publicKey;
            this.moduleIdReg.row = this.inputClients.row;
            this.moduleIdReg.status = this.inputClients.status;
            this.items = [
                {
                    items: [
                        {
                            label: 'سایر اندپوینت های ماژول',
                            icon: '',
                            command: () => {
                                this.showAllEndpointModule(this.tempEndpoint);
                            },
                        },
                        {
                            label: 'کلاینت های اندپوینت',
                            icon: '',
                            command: () => {
                                this.showClient(this.tempEndpoint);
                            },
                        },
                        {
                            label: 'المان های اندپوینت',
                            icon: '',
                            command: () => {
                                this.showHeader(this.tempEndpoint);
                            },
                        },
                        {
                            label: 'محدودیت های IP',
                            icon: '',
                            command: () => {
                                this.showIpLimit(this.tempEndpoint);
                            },
                        },
                        {
                            label: this.transloco.translate('contextMenu.Edit'),
                            command: () => {
                                this.showUpdate(this.tempEndpoint);
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
            let tempClientId: number;

            this.apiGatewayService.currentApprovalStageClientObject.subscribe(
                (a) => {
                    tempClientId = Number(a.clientId);
                    this.clientName = a.name;
                }
            );
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .endpointbyclientid(tempClientId)
                .subscribe(
                    (res) => {
                        this._primengProgressBarService.hide();
                        if (Array.isArray(res)) {
                            this.endpointList = res;

                            this.moduleId = res[0].moduleId;
                        } else {
                            this.endpointList.push(res);
                            this.moduleId = res[0].moduleId;
                        }
                        this._primengProgressBarService.show();
                        this.messagesApiFacadeService
                            .checkactiveendpointbymoduleid(this.moduleId)
                            .subscribe(
                                (o) => {
                                    this._primengProgressBarService.hide();
                                    debugger;
                                    this.addButtonFlag = o;
                                    debugger;
                                },
                                (error) => {
                                    this._primengProgressBarService.hide();
                                }
                            );
                        this.endpointList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        this.createEndpointFlag = this.disabelCheck();
                        for (let k = 0; k < this.endpointList.length; k++) {
                            this.endpointList[k] = Object.assign(
                                this.endpointList[k],
                                { expanded: false }
                            );
                            this._primengProgressBarService.show();
                            this.messagesApiFacadeService
                                .findbyendpointid(
                                    this.endpointList[k].endpointId
                                )
                                .subscribe(
                                    (ress) => {
                                        //console.log('ress', ress)
                                        this._primengProgressBarService.hide();
                                        let result = '';
                                        for (let i = 0; i < ress.length; i++) {
                                            result +=
                                                ress[i].ipAddress.toString();
                                            if (i < ress.length - 1) {
                                                result += ' / ';
                                            }
                                        }
                                        this.newEndpointList =
                                            this.endpointList.map((item) => {
                                                let obj = {
                                                    destinationHost: null,
                                                    destinationPortNumber: null,
                                                    destinationUri: null,
                                                    endpointId: null,
                                                    expanded: null,
                                                    moduleId: null,
                                                    sourceUrl: null,
                                                    status: null,
                                                    ipAddress: null,
                                                    clientName: null,
                                                };
                                                obj.destinationHost =
                                                    item.destinationHost;
                                                obj.destinationPortNumber =
                                                    item.destinationPortNumber;
                                                obj.destinationUri =
                                                    item.destinationUri;
                                                obj.endpointId =
                                                    item.endpointId;
                                                obj.expanded = item.expanded;
                                                obj.moduleId = item.moduleId;
                                                obj.sourceUrl = item.sourceUrl;
                                                obj.status = item.status;
                                                obj.clientName =
                                                    item.clientName;
                                                obj.ipAddress = result;

                                                //console.log('newEndpointList', obj)
                                                return obj;
                                            });
                                    },
                                    (error) => {
                                        this._primengProgressBarService.hide();
                                    }
                                );
                        }
                        this._primengProgressBarService.show();
                        this.messagesApiFacadeService
                            .SearchModuleById(Number(this.moduleId))
                            .subscribe(
                                (h) => {
                                    this._primengProgressBarService.hide();
                                    this.moduleTitle = h.moduleTitle;
                                    this.moduleType = h.moduleType;
                                    this.moduleGroup = h.moduleGroup;
                                    this.moduleTitle.length > 22
                                        ? (this.widthModuleTitle = 100)
                                        : (this.widthModuleTitle = 50);
                                    this.moduleGroup.length > 22
                                        ? (this.widthModuleGroup = 100)
                                        : (this.widthModuleGroup = 50);
                                    this.moduleType.length > 22
                                        ? (this.widthModuleType = 100)
                                        : (this.widthModuleType = 50);
                                },
                                (error) => {
                                    this._primengProgressBarService.hide();
                                }
                            );
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
        else if (this.inputEndpoint != undefined) {
            this.moduleTitle = this.inputEndpoint.moduleTitle;
            this.moduleGroup = this.inputEndpoint.moduleGroup;
            this.moduleType = this.inputEndpoint.moduleType;
            this.partyTitle = this.inputEndpoint.title;
            this.moduleBase = this.inputEndpoint.moduleBase;
            this.moduleId = this.inputEndpoint.moduleId;
            let temp = this.inputEndpoint.moduleid;

            if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
                this.endpointList = [];
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .endpointbymoduleid(temp)
                    .subscribe(
                        (getAllResponse) => {
                            this._primengProgressBarService.hide();
                            if (Array.isArray(getAllResponse)) {
                                this.endpointList = getAllResponse;
                            } else {
                                this.endpointList.push(getAllResponse);
                            }
                            this.endpointList.forEach((x) => {
                                console.log('clientNameli', x.clientName);
                            });
                            console.log(this.endpointList, 'this.endpointList');
                            this.endpointList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false)
                            );
                            this.createEndpointFlag = this.disabelCheck();
                            for (let k = 0; k < this.endpointList.length; k++) {
                                this.endpointList[k] = Object.assign(
                                    this.endpointList[k],
                                    { expanded: false }
                                );
                                this._primengProgressBarService.show();
                                this.messagesApiFacadeService
                                    .findbyendpointid(
                                        this.endpointList[k].endpointId
                                    )
                                    .subscribe(
                                        (ress) => {
                                            this._primengProgressBarService.hide();
                                            //console.log('ress', ress)
                                            let result = '';
                                            for (
                                                let i = 0;
                                                i < ress.length;
                                                i++
                                            ) {
                                                result +=
                                                    ress[
                                                        i
                                                    ].ipAddress.toString();
                                                if (i < ress.length - 1) {
                                                    result += ' / ';
                                                }
                                            }
                                            this.newEndpointList =
                                                this.endpointList.map(
                                                    (item) => {
                                                        let obj = {
                                                            destinationHost:
                                                                null,
                                                            destinationPortNumber:
                                                                null,
                                                            destinationUri:
                                                                null,
                                                            endpointId: null,
                                                            expanded: null,
                                                            moduleId: null,
                                                            sourceUrl: null,
                                                            status: null,
                                                            ipAddress: null,
                                                            clientName: null,
                                                        };
                                                        obj.destinationHost =
                                                            item.destinationHost;
                                                        obj.destinationPortNumber =
                                                            item.destinationPortNumber;
                                                        obj.destinationUri =
                                                            item.destinationUri;
                                                        obj.endpointId =
                                                            item.endpointId;
                                                        obj.expanded =
                                                            item.expanded;
                                                        obj.moduleId =
                                                            item.moduleId;
                                                        obj.sourceUrl =
                                                            item.sourceUrl;
                                                        obj.status =
                                                            item.status;
                                                        obj.clientName =
                                                            item.clientName;
                                                        obj.ipAddress = result;

                                                        //console.log('newEndpointList', obj)
                                                        return obj;
                                                    }
                                                );
                                        },
                                        (error) => {
                                            this._primengProgressBarService.hide();
                                        }
                                    );
                            }
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );

                this.moduleTitle.length > 22
                    ? (this.widthModuleTitle = 100)
                    : (this.widthModuleTitle = 50);
                this.moduleGroup.length > 22
                    ? (this.widthModuleGroup = 100)
                    : (this.widthModuleGroup = 50);
                this.moduleType.length > 22
                    ? (this.widthModuleType = 100)
                    : (this.widthModuleType = 50);
            } else if (this.inputEndpoint.partyBase != undefined) {
                this.partyBase = true;
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
                this.endpointList = [];
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .endpointbymoduleid(temp)
                    .subscribe(
                        (getAllResponse) => {
                            this._primengProgressBarService.hide();
                            if (Array.isArray(getAllResponse)) {
                                this.endpointList = getAllResponse;
                            } else {
                                this.endpointList.push(getAllResponse);
                            }
                            this.endpointList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false)
                            );
                            this.createEndpointFlag = this.disabelCheck();
                            for (let k = 0; k < this.endpointList.length; k++) {
                                this.endpointList[k] = Object.assign(
                                    this.endpointList[k],
                                    { expanded: false }
                                );
                                this._primengProgressBarService.show();
                                this.messagesApiFacadeService
                                    .findbyendpointid(
                                        this.endpointList[k].endpointId
                                    )
                                    .subscribe(
                                        (ress) => {
                                            this._primengProgressBarService.hide();
                                            let result = '';
                                            for (
                                                let i = 0;
                                                i < ress.length;
                                                i++
                                            ) {
                                                result +=
                                                    ress[
                                                        i
                                                    ].ipAddress.toString();
                                                if (i < ress.length - 1) {
                                                    result += ' / ';
                                                }
                                            }
                                            this.newEndpointList =
                                                this.endpointList.map(
                                                    (item) => {
                                                        let obj = {
                                                            destinationHost:
                                                                null,
                                                            destinationPortNumber:
                                                                null,
                                                            destinationUri:
                                                                null,
                                                            endpointId: null,
                                                            expanded: null,
                                                            moduleId: null,
                                                            sourceUrl: null,
                                                            status: null,
                                                            clientName: null,
                                                            ipAddress: null,
                                                        };
                                                        obj.destinationHost =
                                                            item.destinationHost;
                                                        obj.destinationPortNumber =
                                                            item.destinationPortNumber;
                                                        obj.destinationUri =
                                                            item.destinationUri;
                                                        obj.endpointId =
                                                            item.endpointId;
                                                        obj.expanded =
                                                            item.expanded;
                                                        obj.moduleId =
                                                            item.moduleId;
                                                        obj.sourceUrl =
                                                            item.sourceUrl;
                                                        obj.status =
                                                            item.status;
                                                        obj.clientName =
                                                            item.clientName;
                                                        obj.ipAddress = result;

                                                        //console.log('newEndpointList', obj)
                                                        return obj;
                                                    }
                                                );
                                        },
                                        (error) => {
                                            this._primengProgressBarService.hide();
                                        }
                                    );
                            }
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );

                this.moduleTitle.length > 22
                    ? (this.widthModuleTitle = 100)
                    : (this.widthModuleTitle = 50);
                this.moduleGroup.length > 22
                    ? (this.widthModuleGroup = 100)
                    : (this.widthModuleGroup = 50);
                this.moduleType.length > 22
                    ? (this.widthModuleType = 100)
                    : (this.widthModuleType = 50);
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .checkactiveendpointbymoduleid(this.moduleId)
                .subscribe(
                    (o) => {
                        this._primengProgressBarService.hide();
                        debugger;
                        this.addButtonFlag = o;
                        debugger;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    expandTheRow(row: any): void {
        row.expanded = !row.expanded;
    }

    expandTheRowEvent(event: any): void {
        event.data.expanded = !event.data.expanded;
    }

    setRecord(endpoint) {
        this.tempEndpoint = endpoint;
    }

    showAdd() {
        if (this.validationShowAdd()) {
            if (this.inputEndpoint != undefined) {
                this.endpointDto.endpointid = this.inputEndpoint.endpointId;
            }
            this.moduleIdReg.moduleId = this.moduleId;
            this.registerFlag = true;
            console.log(this.moduleIdReg, 'moduleIdReg');
        }
    }

    disabelCheck(): boolean {
        this.countLicense = 0;
        this.endpointList.forEach((item) => {
            if (item.status) {
                this.countLicense += 1;
            }
        });
        if (this.countLicense == 0) {
            return false;
        } else {
            return true;
        }
    }

    validationShowAdd(): boolean {
        if (this.createEndpointFlag) {
            this.notifierService.showError({
                detail: 'یک اندپوینت فعال برای این ماژول وجود دارد!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    onClose() {
        this.scrollTop();
        for (let k = 0; k < this.endpointList.length; k++) {
            this.endpointList[k] = Object.assign(this.endpointList[k], {
                expanded: false,
            });
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .findbyendpointid(this.endpointList[k].endpointId)
                .subscribe(
                    (ress) => {
                        //console.log('ress', ress)
                        this._primengProgressBarService.hide();
                        let result = '';
                        for (let i = 0; i < ress.length; i++) {
                            result += ress[i].ipAddress.toString();
                            if (i < ress.length - 1) {
                                result += ' / ';
                            }
                        }
                        this.newEndpointList = this.endpointList.map((item) => {
                            let obj = {
                                destinationHost: null,
                                destinationPortNumber: null,
                                destinationUri: null,
                                endpointId: null,
                                expanded: null,
                                moduleId: null,
                                sourceUrl: null,
                                status: null,
                                clientName: null,
                                ipAddress: null,
                            };
                            obj.destinationHost = item.destinationHost;
                            obj.destinationPortNumber =
                                item.destinationPortNumber;
                            obj.destinationUri = item.destinationUri;
                            obj.endpointId = item.endpointId;
                            obj.expanded = item.expanded;
                            obj.moduleId = item.moduleId;
                            obj.sourceUrl = item.sourceUrl;
                            obj.status = item.status;
                            obj.clientName = item.clientName;
                            obj.ipAddress = result;
                            //console.log('newEndpointList', obj)
                            return obj;
                        });
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }

        if (this.inputAccess != undefined) {
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
                this.endpointDto.clientBase = true;
            } else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
                this.endpointDto.accessBase = true;
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .endpointbymoduleid(this.moduleId)
                .subscribe(
                    (getAllResponse) => {
                        this._primengProgressBarService.hide();
                        if (Array.isArray(getAllResponse)) {
                            this.endpointList = getAllResponse;
                        } else {
                            this.endpointList.push(getAllResponse);
                        }
                        this.endpointList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        this.createEndpointFlag = this.disabelCheck();
                        for (let k = 0; k < this.endpointList.length; k++) {
                            this.endpointList[k] = Object.assign(
                                this.endpointList[k],
                                { expanded: false }
                            );
                            this._primengProgressBarService.show();
                            this.messagesApiFacadeService
                                .findbyendpointid(
                                    this.endpointList[k].endpointId
                                )
                                .subscribe(
                                    (ress) => {
                                        //console.log('ress', ress)
                                        this._primengProgressBarService.hide();
                                        let result = '';
                                        for (let i = 0; i < ress.length; i++) {
                                            result +=
                                                ress[i].ipAddress.toString();
                                            if (i < ress.length - 1) {
                                                result += ' / ';
                                            }
                                        }
                                        this.newEndpointList =
                                            this.endpointList.map((item) => {
                                                let obj = {
                                                    destinationHost: null,
                                                    destinationPortNumber: null,
                                                    destinationUri: null,
                                                    endpointId: null,
                                                    expanded: null,
                                                    moduleId: null,
                                                    sourceUrl: null,
                                                    status: null,
                                                    clientName: null,
                                                    ipAddress: null,
                                                };
                                                obj.destinationHost =
                                                    item.destinationHost;
                                                obj.destinationPortNumber =
                                                    item.destinationPortNumber;
                                                obj.destinationUri =
                                                    item.destinationUri;
                                                obj.endpointId =
                                                    item.endpointId;
                                                obj.expanded = item.expanded;
                                                obj.moduleId = item.moduleId;
                                                obj.sourceUrl = item.sourceUrl;
                                                obj.status = item.status;
                                                obj.clientName =
                                                    item.clientName;
                                                obj.ipAddress = result;
                                                //console.log('newEndpointList', obj)
                                                return obj;
                                            });
                                    },
                                    (error) => {
                                        this._primengProgressBarService.hide();
                                    }
                                );
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        } else if (this.inputClients != undefined) {
            this.clientBase = this.inputClients.clientBase;
            this.clientName = this.inputClients.clientName;
            let tempClientId: number;
            this._primengProgressBarService.show();
            this.apiGatewayService.currentApprovalStageClientObject.subscribe(
                (a) => {
                    this._primengProgressBarService.hide();
                    tempClientId = Number(a.clientId);
                    this.clientName = a.name;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .endpointbyclientid(tempClientId)
                .subscribe(
                    (res) => {
                        this._primengProgressBarService.hide();
                        if (Array.isArray(res)) {
                            this.endpointList = res;
                            this.moduleId = res[0].moduleId;
                        } else {
                            this.endpointList.push(res);
                            this.moduleId = res[0].moduleId;
                        }
                        this.endpointList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        this.createEndpointFlag = this.disabelCheck();
                        for (let k = 0; k < this.endpointList.length; k++) {
                            this.endpointList[k] = Object.assign(
                                this.endpointList[k],
                                { expanded: false }
                            );
                            this._primengProgressBarService.show();
                            this.messagesApiFacadeService
                                .findbyendpointid(
                                    this.endpointList[k].endpointId
                                )
                                .subscribe(
                                    (ress) => {
                                        this._primengProgressBarService.hide();
                                        //console.log('ress', ress)
                                        let result = '';
                                        for (let i = 0; i < ress.length; i++) {
                                            result +=
                                                ress[i].ipAddress.toString();
                                            if (i < ress.length - 1) {
                                                result += ' / ';
                                            }
                                        }
                                        this.newEndpointList =
                                            this.endpointList.map((item) => {
                                                let obj = {
                                                    destinationHost: null,
                                                    destinationPortNumber: null,
                                                    destinationUri: null,
                                                    endpointId: null,
                                                    expanded: null,
                                                    moduleId: null,
                                                    sourceUrl: null,
                                                    status: null,
                                                    clientName: null,
                                                    ipAddress: null,
                                                };
                                                obj.destinationHost =
                                                    item.destinationHost;
                                                obj.destinationPortNumber =
                                                    item.destinationPortNumber;
                                                obj.destinationUri =
                                                    item.destinationUri;
                                                obj.endpointId =
                                                    item.endpointId;
                                                obj.expanded = item.expanded;
                                                obj.moduleId = item.moduleId;
                                                obj.sourceUrl = item.sourceUrl;
                                                obj.status = item.status;
                                                obj.clientName =
                                                    item.clientName;
                                                obj.ipAddress = result;

                                                //console.log('newEndpointList', obj)
                                                return obj;
                                            });
                                    },
                                    (error) => {
                                        this._primengProgressBarService.hide();
                                    }
                                );
                        }
                        this._primengProgressBarService.show();
                        this.messagesApiFacadeService
                            .SearchModuleById(Number(this.moduleId))
                            .subscribe(
                                (h) => {
                                    this._primengProgressBarService.hide();
                                    this.moduleTitle = h.moduleTitle;
                                    this.moduleType = h.moduleType;
                                    this.moduleGroup = h.moduleGroup;
                                    this.moduleTitle.length > 22
                                        ? (this.widthModuleTitle = 100)
                                        : (this.widthModuleTitle = 50);
                                    this.moduleGroup.length > 22
                                        ? (this.widthModuleGroup = 100)
                                        : (this.widthModuleGroup = 50);
                                    this.moduleType.length > 22
                                        ? (this.widthModuleType = 100)
                                        : (this.widthModuleType = 50);
                                },
                                (error) => {
                                    this._primengProgressBarService.hide();
                                }
                            );
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        } else if (this.inputEndpoint != undefined) {
            this.moduleTitle = this.inputEndpoint.moduleTitle;
            this.moduleGroup = this.inputEndpoint.moduleGroup;
            this.moduleType = this.inputEndpoint.moduleType;
            this.partyTitle = this.inputEndpoint.title;
            this.moduleBase = this.inputEndpoint.moduleBase;
            let temp = this.inputEndpoint.moduleid;
            if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
                this.endpointList = [];
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .endpointbymoduleid(temp)
                    .subscribe(
                        (getAllResponse) => {
                            this._primengProgressBarService.hide();
                            if (Array.isArray(getAllResponse)) {
                                this.endpointList = getAllResponse;
                            } else {
                                this.endpointList.push(getAllResponse);
                            }
                            this.endpointList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false)
                            );
                            this.createEndpointFlag = this.disabelCheck();
                            for (let k = 0; k < this.endpointList.length; k++) {
                                this.endpointList[k] = Object.assign(
                                    this.endpointList[k],
                                    { expanded: false }
                                );
                                this._primengProgressBarService.show();
                                this.messagesApiFacadeService
                                    .findbyendpointid(
                                        this.endpointList[k].endpointId
                                    )
                                    .subscribe(
                                        (ress) => {
                                            this._primengProgressBarService.hide();
                                            //console.log('ress', ress)
                                            let result = '';
                                            for (
                                                let i = 0;
                                                i < ress.length;
                                                i++
                                            ) {
                                                result +=
                                                    ress[
                                                        i
                                                    ].ipAddress.toString();
                                                if (i < ress.length - 1) {
                                                    result += ' / ';
                                                }
                                            }
                                            this.newEndpointList =
                                                this.endpointList.map(
                                                    (item) => {
                                                        let obj = {
                                                            destinationHost:
                                                                null,
                                                            destinationPortNumber:
                                                                null,
                                                            destinationUri:
                                                                null,
                                                            endpointId: null,
                                                            expanded: null,
                                                            moduleId: null,
                                                            sourceUrl: null,
                                                            status: null,
                                                            clientName: null,
                                                            ipAddress: null,
                                                        };
                                                        obj.destinationHost =
                                                            item.destinationHost;
                                                        obj.destinationPortNumber =
                                                            item.destinationPortNumber;
                                                        obj.destinationUri =
                                                            item.destinationUri;
                                                        obj.endpointId =
                                                            item.endpointId;
                                                        obj.expanded =
                                                            item.expanded;
                                                        obj.moduleId =
                                                            item.moduleId;
                                                        obj.sourceUrl =
                                                            item.sourceUrl;
                                                        obj.status =
                                                            item.status;
                                                        obj.clientName =
                                                            item.clientName;
                                                        obj.ipAddress = result;

                                                        //console.log('newEndpointList', obj)
                                                        return obj;
                                                    }
                                                );
                                        },
                                        (error) => {
                                            this._primengProgressBarService.hide();
                                        }
                                    );
                            }
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );

                this.moduleTitle.length > 22
                    ? (this.widthModuleTitle = 100)
                    : (this.widthModuleTitle = 50);
                this.moduleGroup.length > 22
                    ? (this.widthModuleGroup = 100)
                    : (this.widthModuleGroup = 50);
                this.moduleType.length > 22
                    ? (this.widthModuleType = 100)
                    : (this.widthModuleType = 50);
            } else if (this.inputEndpoint.partyBase != undefined) {
                this.partyBase = true;
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
                this.endpointList = [];
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .endpointbymoduleid(temp)
                    .subscribe(
                        (getAllResponse) => {
                            this._primengProgressBarService.hide();
                            if (Array.isArray(getAllResponse)) {
                                this.endpointList = getAllResponse;
                            } else {
                                this.endpointList.push(getAllResponse);
                            }
                            this.endpointList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false)
                            );
                            this.createEndpointFlag = this.disabelCheck();
                            for (let k = 0; k < this.endpointList.length; k++) {
                                this.endpointList[k] = Object.assign(
                                    this.endpointList[k],
                                    { expanded: false }
                                );
                                this._primengProgressBarService.show();
                                this.messagesApiFacadeService
                                    .findbyendpointid(
                                        this.endpointList[k].endpointId
                                    )
                                    .subscribe(
                                        (ress) => {
                                            this._primengProgressBarService.hide();
                                            //console.log('ress', ress)
                                            let result = '';
                                            for (
                                                let i = 0;
                                                i < ress.length;
                                                i++
                                            ) {
                                                result +=
                                                    ress[
                                                        i
                                                    ].ipAddress.toString();
                                                if (i < ress.length - 1) {
                                                    result += ' / ';
                                                }
                                            }
                                            this.newEndpointList =
                                                this.endpointList.map(
                                                    (item) => {
                                                        let obj = {
                                                            destinationHost:
                                                                null,
                                                            destinationPortNumber:
                                                                null,
                                                            destinationUri:
                                                                null,
                                                            endpointId: null,
                                                            expanded: null,
                                                            moduleId: null,
                                                            sourceUrl: null,
                                                            status: null,
                                                            clientName: null,
                                                            ipAddress: null,
                                                        };
                                                        obj.destinationHost =
                                                            item.destinationHost;
                                                        obj.destinationPortNumber =
                                                            item.destinationPortNumber;
                                                        obj.destinationUri =
                                                            item.destinationUri;
                                                        obj.endpointId =
                                                            item.endpointId;
                                                        obj.expanded =
                                                            item.expanded;
                                                        obj.moduleId =
                                                            item.moduleId;
                                                        obj.sourceUrl =
                                                            item.sourceUrl;
                                                        obj.status =
                                                            item.status;
                                                        obj.clientName =
                                                            item.clientName;
                                                        obj.ipAddress = result;

                                                        //console.log('newEndpointList', obj)
                                                        return obj;
                                                    }
                                                );
                                        },
                                        (error) => {
                                            this._primengProgressBarService.hide();
                                        }
                                    );
                            }
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );

                this.moduleTitle.length > 22
                    ? (this.widthModuleTitle = 100)
                    : (this.widthModuleTitle = 50);
                this.moduleGroup.length > 22
                    ? (this.widthModuleGroup = 100)
                    : (this.widthModuleGroup = 50);
                this.moduleType.length > 22
                    ? (this.widthModuleType = 100)
                    : (this.widthModuleType = 50);
            }
        }
        this._primengProgressBarService.show();

        this.messagesApiFacadeService
            .checkactiveendpointbymoduleid(this.moduleId)
            .subscribe(
                (o) => {
                    this._primengProgressBarService.hide();
                    debugger;
                    this.addButtonFlag = o;
                    debugger;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
        this.registerFlag = false;
        this.updateFlag = false;
        this.clientFlag = false;
        this.headerFlag = false;
        this.ipLimitFlag = false;
    }

    showUpdate(endpoint) {
        this.endpointDto = {
            sourceUrl: '',
            status: null,
            destinationPortNumber: '',
            destinationHost: '',
            endpointid: null,
            moduleBase: null,
            partyTitle: null,
            moduleTitle: null,
            accessBase: null,
            clientName: null,
            clientBase: null,
            moduleId: null,
            partyBase: null,
        };
        this.endpointDto = endpoint;
        this.endpointDto.endpointid = endpoint.endpointId;
        this.endpointDto.moduleId = this.moduleId;
        this.updateFlag = true;
    }

    showClient(endpoint) {
        this.endpointDto = {
            sourceUrl: '',
            status: null,
            destinationPortNumber: '',
            destinationHost: '',
            endpointid: null,
            moduleBase: null,
            partyTitle: null,
            moduleTitle: null,
            accessBase: null,
            clientName: null,
            clientBase: null,
            partyBase: null,
            moduleId: null,
        };
        this.endpointDto = endpoint;
        this.endpointDto.endpointid = endpoint.endpointId;
        this.endpointDto.moduleBase = this.moduleBase;
        this.endpointDto.accessBase = this.accessBase;
        this.endpointDto.clientBase = this.clientBase;
        this.endpointDto.partyTitle = this.partyTitle;
        this.endpointDto.moduleTitle = this.moduleTitle;
        this.endpointDto.clientName = this.clientName;
        this.endpointDto.partyBase = this.partyBase;
        this.clientFlag = true;
        this.apiGatewayService.updateApprovalEndpoint(endpoint);
    }

    showAllEndpointModule(endpoint) {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .endpointbymoduleid(endpoint.moduleId)
            .subscribe(
                (n) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(n)) {
                        this.endpointList = n;
                    } else {
                        this.endpointList.push(n);
                    }
                    this.endpointList.forEach((x) => {
                        console.log('clientNameli', x.clientName);
                    });
                    console.log(this.endpointList, 'this.endpointList');
                    this.endpointList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    this.createEndpointFlag = this.disabelCheck();
                    for (let k = 0; k < this.endpointList.length; k++) {
                        this.endpointList[k] = Object.assign(
                            this.endpointList[k],
                            { expanded: false }
                        );
                        this._primengProgressBarService.show();
                        this.messagesApiFacadeService
                            .findbyendpointid(this.endpointList[k].endpointId)
                            .subscribe(
                                (ress) => {
                                    this._primengProgressBarService.hide();
                                    //console.log('ress', ress)
                                    let result = '';
                                    for (let i = 0; i < ress.length; i++) {
                                        result += ress[i].ipAddress.toString();
                                        if (i < ress.length - 1) {
                                            result += ' / ';
                                        }
                                    }
                                    this.otherEndpointList =
                                        this.endpointList.map((item) => {
                                            let obj = {
                                                destinationHost: null,
                                                destinationPortNumber: null,
                                                destinationUri: null,
                                                endpointId: null,
                                                expanded: null,
                                                moduleId: null,
                                                sourceUrl: null,
                                                status: null,
                                                ipAddress: null,
                                                clientName: null,
                                            };
                                            obj.destinationHost =
                                                item.destinationHost;
                                            obj.destinationPortNumber =
                                                item.destinationPortNumber;
                                            obj.destinationUri =
                                                item.destinationUri;
                                            obj.endpointId = item.endpointId;
                                            obj.expanded = item.expanded;
                                            obj.moduleId = item.moduleId;
                                            obj.sourceUrl = item.sourceUrl;
                                            obj.status = item.status;
                                            obj.clientName = item.clientName;
                                            obj.ipAddress = result;
                                            return obj;
                                        });
                                    this.dialogAllEndpointModuleFlag = true;
                                },
                                (error) => {
                                    this._primengProgressBarService.hide();
                                }
                            );
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    showHeader(endpoint) {
        this.endpointDto = {
            sourceUrl: '',
            status: null,
            destinationPortNumber: '',
            destinationHost: '',
            endpointid: null,
            moduleBase: null,
            partyTitle: null,
            moduleTitle: null,
            accessBase: null,
            clientName: null,
            clientBase: null,
            moduleId: null,
            partyBase: null,
        };
        this.endpointDto = endpoint;
        this.endpointDto.accessBase = this.accessBase;
        this.endpointDto.moduleBase = this.moduleBase;
        this.endpointDto.clientBase = this.clientBase;
        this.headerFlag = true;
        this.endpointDto.partyTitle = this.partyTitle;
        this.endpointDto.moduleTitle = this.moduleTitle;
        this.endpointDto.clientName = this.clientName;
        this.apiGatewayService.updateApprovalEndpoint(endpoint);
    }

    showIpLimit(endpoint) {
        this.endpointDto = {
            sourceUrl: '',
            status: null,
            destinationPortNumber: '',
            destinationHost: '',
            endpointid: null,
            moduleId: null,
            moduleBase: null,
            partyTitle: null,
            moduleTitle: null,
            accessBase: null,
            clientName: null,
            clientBase: null,
            partyBase: null,
        };
        this.endpointDto = endpoint;
        this.endpointDto.accessBase = this.accessBase;
        this.endpointDto.moduleBase = this.moduleBase;
        this.endpointDto.clientBase = this.clientBase;
        this.ipLimitFlag = true;
        this.endpointDto.partyTitle = this.partyTitle;
        this.endpointDto.moduleTitle = this.moduleTitle;
        this.endpointDto.clientName = this.clientName;
        this.endpointDto.partyBase = this.partyBase;
        this.apiGatewayService.updateApprovalEndpoint(endpoint);
    }

    BeforeButton() {
        this.close.emit('close');
    }
}
