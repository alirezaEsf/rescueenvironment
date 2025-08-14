import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ActivatedRoute} from "@angular/router";

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
import { FuseLoadingService } from '../../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../../shared/services/ToastService';
import { MessagesApiFacadeService } from '../../../../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../../../../services/api-gateway.service';
import { ThreeDotDetailsPipe } from '../../../../../../shared/pipes/threeDotDetails.pipe';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-mediators-list',
    templateUrl: './mediators-list.component.html',
    styleUrls: ['./mediators-list.component.scss'],
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
        Toast,
    ],
})
export class MediatorsListComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputMediators;
    detApiTitle;
    widthApiTitle;
    detApiName;
    widthApiName;
    detModuleType;
    widthModuleType;
    MediatorsList;
    items;
    apiId;
    tempMediator;
    jsonMediatorsFlag: boolean = false;
    flagAddNode: boolean = false;
    flagDeletedNode: boolean = false;
    nodeListFlag: boolean = false;
    xmlMediatorsFlag: boolean = false;
    createMediatorFlag: boolean = true;
    countLicense = 0;
    mediatorListDto;
    flag = true;
    detailsBreadObject = [];
    mediatorTitle;
    moduleTitle;
    apiName;
    accessBase;
    partyBase;
    clientBase;
    clientName;
    moduleBase;
    PartyBase;
    partyTitle;
    apiTitle;
    moduleType;
    mediatorDto;
    tempPath = '';
    keyNode = '';
    valueNode = '';
    first: number = 0;
    rows: number = 10;
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private transloco :TranslocoService,
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private notifierService: ToastService,
        private apiGatewayService: ApiGatewayService
    ) {}

    deleteNode(tempMediator) {
        this.flagDeletedNode = true;
        this.mediatorDto = {
            mediatorId: null,
            apiId: null,
            title: '',
            schemaName: '',
            rdate: '',
            isApproval: null,
            appDate: '',
            status: null,
        };
        this.mediatorDto = tempMediator;
    }

    activationMediator(tempMediator) {
        this.countLicense = 0;
        this.MediatorsList.forEach((item) => {
            if (item.status || item.status == 1) {
                this.countLicense += 1;
            }
        });
        if (this.countLicense == 0) {
            let mediatorId = tempMediator.mediatorId;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .activationMediator(mediatorId)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        console.log('resA', a);

                        this.fetchTable();
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            /* setTimeout(a => {
                 this.fetchTable(), 15
             })*/
        } else {
            this.notifierService.showError({
                detail: 'یک مدیاتور فعال برای این api وجود دارد!',
                life: 3000,
            });
        }
    }

    deactivationMediator(tempMediator) {
        let mediatorId = tempMediator.mediatorId;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .deactivationMediator(mediatorId)
            .subscribe(
                (b) => {
                    this._primengProgressBarService.hide();
                    console.log('resB', b);

                    this.fetchTable();
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    nodesMediator(tempMediator) {
        this.mediatorDto = {
            apiName: '',
            apiTitle: '',
            moduleTitle: '',
            title: '',
            schemaName: '',
            rdate: '',
            appDate: '',
            moduleTypeId: null,
            mediatorId: null,
            apiId: null,
            isApproval: null,
            status: null,
            childNodeName: null,
            childNnodeValue: null,
            childChangeTypeId: null,
            childSchemaName: null,
            childNodeStatus: null,
            mediatorBase: null,
            moduleBase: null,
            moduleType: null,
            partyTitle: null,
            clientBase: null,
            partyBase: null,
            clientName: null,
            accessBase: null,
        };
        this.mediatorDto = tempMediator;
        this.mediatorDto.mediatorBase = false;
        this.mediatorDto.moduleBase = this.moduleBase;
        this.mediatorDto.moduleTitle = this.moduleTitle;
        this.mediatorDto.partyTitle = this.partyTitle;
        this.mediatorDto.clientBase = this.clientBase;
        this.mediatorDto.clientName = this.clientName;
        this.mediatorDto.accessBase = this.accessBase;
        this.mediatorDto.moduleType = this.moduleType;
        this.mediatorDto.partyBase = this.partyBase;
        this.mediatorDto.partyBase = this.partyBase;
        this.mediatorDto.apiTitle = this.apiTitle;
        this.nodeListFlag = true;
    }

    disabelCheck(): boolean {
        this.countLicense = 0;
        this.MediatorsList.forEach((item) => {
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

    fetchTable() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.findbyapiid(this.apiId).subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                if (Array.isArray(a)) {
                    this.MediatorsList = a;
                } else {
                    this.MediatorsList.push(a);
                }
                this.MediatorsList.map((x) =>
                    x.status === 1 ? (x.status = true) : (x.status = false)
                );
                this.MediatorsList.map((x) =>
                    x.isApproval === 1
                        ? (x.isApproval = true)
                        : (x.isApproval = false)
                );
                for (let k = 0; k < this.MediatorsList.length; k++) {
                    this.MediatorsList[k] = Object.assign(
                        this.MediatorsList[k],
                        { row: k + 1 }
                    );
                    /*(this.partyList[k].row = (k+1))*/
                }

                this.createMediatorFlag = this.disabelCheck();
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

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
                        label_index4: 'لیست مدیاتور ها',
                        rout_index4: null,
                        isActive4: true,
                        img_index4: 'assets/icons/mediators.png',
                        label_Detail_index4: '(' + this.apiName + ')',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
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
                        label_index3: 'لیست مدیاتور ها',
                        rout_index3: null,
                        isActive3: true,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiName + ')',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
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
                        label_Detail_index1: '(' + this.clientName + ')',
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
                        label_index3: 'لیست مدیاتور ها',
                        rout_index3: null,
                        isActive3: true,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiName + ')',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
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
                        label_index4: 'لیست مدیاتور ها',
                        rout_index4: null,
                        isActive4: true,
                        img_index4: 'assets/icons/mediators.png',
                        label_Detail_index4: '(' + this.apiName + ')',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
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
        if (this.inputMediators != undefined) {
            this.accessBase = this.inputMediators.accessBase;
            this.clientBase = this.inputMediators.clientBase;
            this.moduleBase = this.inputMediators.moduleBase;
            this.PartyBase = this.inputMediators.PartyBase;
            this.partyTitle = this.inputMediators.partyTitle;
            this.moduleTitle = this.inputMediators.moduleTitle;
            this.apiName = this.inputMediators.name;
            this.clientName = this.inputMediators.clientName;
            this.apiTitle = this.inputMediators.title;
            if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
                this.partyBase = true;
            }
        }
        this.apiId = +this.inputMediators.apiId;
        this.items = [
            {
                items: [
                    {
                        label: 'فعالسازی مدیاتور',
                        icon: '',
                        command: () => {
                            this.activationMediator(this.tempMediator);
                        },
                    },
                    {
                        label: 'غیرفعالسازی مدیاتور',
                        icon: '',
                        command: () => {
                            this.deactivationMediator(this.tempMediator);
                        },
                    },
                    {
                        label: 'نود های مرتبط',
                        icon: '',
                        command: () => {
                            this.nodesMediator(this.tempMediator);
                        },
                    },
                    {
                        label: 'افزودن نود به خروجی',
                        icon: '',
                        command: () => {
                            this.addNode(this.tempMediator);
                        },
                    },
                    {
                        label: 'حذف نود از خروجی',
                        icon: '',
                        command: () => {
                            this.deleteNode(this.tempMediator);
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

        if (this.inputMediators != undefined) {
            this.detApiTitle = this.inputMediators.title;
            this.apiTitle = this.inputMediators.title;
            this.detApiName = this.inputMediators.name;
            this.detModuleType = this.inputMediators.moduleType;
            this.detApiTitle.length > 22
                ? (this.widthApiTitle = 100)
                : (this.widthApiTitle = 50);
            this.detApiName.length > 22
                ? (this.widthApiName = 100)
                : (this.widthApiName = 50);
            this.detModuleType.length > 22
                ? (this.widthModuleType = 100)
                : (this.widthModuleType = 50);
        }

        this.fetchTable();
    }

    BeforeButton() {
        this.close.emit('close');
    }

    validation(): boolean {
        if (this.createMediatorFlag) {
            this.notifierService.showError({
                detail: 'یک مدیاتور فعال برای این api وجود دارد!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    createMediator() {
        if (this.validation())
            if (this.inputMediators != undefined) {
                this.mediatorListDto = {
                    moduleBase: false,
                    moduleTitle: null,
                    partyTitle: null,
                    clientBase: false,
                    clientName: null,
                    accessBase: false,
                    apiTitle: null,
                    apiId: null,
                    apiName: null,
                    moduleType: null,
                };
                this.mediatorListDto.clientBase = this.clientBase;
                this.mediatorListDto.clientName = this.clientName;
                this.mediatorListDto.accessBase = this.accessBase;
                this.mediatorListDto.partyTitle = this.partyTitle;
                this.mediatorListDto.moduleTitle = this.moduleTitle;
                this.mediatorListDto.moduleBase = this.moduleBase;
                this.mediatorListDto.apiTitle = this.apiTitle;
                this.mediatorListDto.apiName = this.apiName;
                this.mediatorListDto.apiId = this.apiId;
                this.mediatorListDto.moduleType = this.moduleType;
                if (this.inputMediators.moduleType == 1) {
                    this.jsonMediatorsFlag = true;
                } else if (this.inputMediators.moduleType == 2) {
                    this.xmlMediatorsFlag = true;
                }
            }
    }

    onClose(e) {
        if (this.inputMediators != undefined) {
            this.accessBase = this.inputMediators.accessBase;
            this.clientBase = this.inputMediators.clientBase;
            this.moduleBase = this.inputMediators.moduleBase;
            this.PartyBase = this.inputMediators.PartyBase;
            this.partyTitle = this.inputMediators.partyTitle;
            this.moduleTitle = this.inputMediators.moduleTitle;
            this.apiName = this.inputMediators.name;
            this.clientName = this.inputMediators.clientName;
            if (this.accessBase) {
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
                        label_index3: 'لیست مدیاتور ها',
                        rout_index3: null,
                        isActive3: true,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiName + ')',
                    },
                    { label_index4: null },
                    { label_index5: null },
                ];
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.clientBase) {
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
                        label_index3: 'لیست مدیاتور ها',
                        rout_index3: null,
                        isActive3: true,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiName + ')',
                    },
                    { label_index4: null },
                    { label_index5: null },
                ];
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.moduleBase) {
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
                        label_index3: 'لیست مدیاتور ها',
                        rout_index3: null,
                        isActive3: true,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiName + ')',
                    },
                    { label_index4: null },
                    { label_index5: null },
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
                        label_index4: 'لیست مدیاتور ها',
                        rout_index4: null,
                        isActive4: true,
                        img_index4: 'assets/icons/mediators.png',
                        label_Detail_index4: '(' + this.apiName + ')',
                    },
                    { label_index5: null },
                ];
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        }

        if (e == 'close') {
            this.fetchTable();
            this.jsonMediatorsFlag = false;
            this.xmlMediatorsFlag = false;
            this.nodeListFlag = false;
        }
    }

    onClosePopup() {
        this.flagAddNode = false;
        this.flagDeletedNode = false;
    }

    addNode(tempMediator) {
        this.flagAddNode = true;
        this.mediatorDto = {
            mediatorId: null,
            apiId: null,
            title: '',
            schemaName: '',
            rdate: '',
            isApproval: null,
            appDate: '',
            status: null,
        };
        this.mediatorDto = tempMediator;
    }

    registerNode(flagAddDelete: number) {
        if (this.validationNode(flagAddDelete)) {
            if (flagAddDelete == 1) {
                let mediatorChangeObject = {
                    nodeName: '',
                    nodeValue: '',
                    changeTypeId: null,
                    schemaName: null,
                    mediatorId: null,
                    status: null,
                };
                mediatorChangeObject.mediatorId = this.mediatorDto.mediatorId;
                mediatorChangeObject.nodeName = this.keyNode;
                mediatorChangeObject.nodeValue = this.valueNode;
                mediatorChangeObject.schemaName = this.tempPath;
                mediatorChangeObject.changeTypeId = 1;
                mediatorChangeObject.status = 1;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .registerMediatorChange(mediatorChangeObject)
                    .subscribe(
                        (g) => {
                            this._primengProgressBarService.hide();
                            this.fetchTable();
                            this.flagAddNode = false;
                            this.keyNode = '';
                            this.valueNode = '';
                            this.tempPath = '';
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );
            } else if (flagAddDelete == 2) {
                let mediatorChangeObject = {
                    nodeName: '',
                    nodeValue: '',
                    changeTypeId: null,
                    schemaName: null,
                    mediatorId: null,
                    status: null,
                };
                mediatorChangeObject.mediatorId = this.mediatorDto.mediatorId;
                mediatorChangeObject.nodeName = this.keyNode;
                mediatorChangeObject.schemaName = this.tempPath;
                mediatorChangeObject.status = 1;
                mediatorChangeObject.changeTypeId = 2;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .registerMediatorChange(mediatorChangeObject)
                    .subscribe(
                        (g) => {
                            this._primengProgressBarService.hide();
                            this.fetchTable();
                            this.flagDeletedNode = false;
                            this.keyNode = '';
                            this.valueNode = '';
                            this.tempPath = '';
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );
            }
        }
    }

    validationNode(flagAddDelete): boolean {
        if (!this.keyNode) {
            this.notifierService.showError({
                detail: 'لطفا کلید را وارد نمائید!',
                life: 3000,
            });
            return false;
        } else if (!this.tempPath && flagAddDelete == 1) {
            this.notifierService.showError({
                detail: 'لطفا مسیر نود را وارد نمائید!',
                life: 3000,
            });

            return false;
        } else {
            return true;
        }
    }

    setRecord(mediator) {
        this.tempMediator = mediator;
    }
}
