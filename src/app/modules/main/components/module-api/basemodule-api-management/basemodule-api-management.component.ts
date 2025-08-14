import {Component, Input, OnInit, SimpleChanges} from '@angular/core';

import {EndpointDto} from "../../../models/endpointDto";

import {ApiGatewayConstants} from "../../../constants/ApiGatewayConstants";

import {ActivatedRoute} from "@angular/router";
import { FuseLoadingService } from '../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../shared/services/ToastService';
import { ApiGatewayService } from '../../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { PrimeNG } from 'primeng/config';
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
} from '../../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import {
    ModuleApiUpdateComponent
} from '../../services-api/module-api-management/module-api-update/module-api-update.component';
import {
    BasemoduleApiAddComponent
} from './basemodule-api-party-management/basemodule-api-add/basemodule-api-add.component';
import { EndpointManagementComponent } from '../../services-api/endpoint-management/endpoint-management.component';
import { BasemoduleApiModuleComponent } from './basemodule-api-module/basemodule-api-module.component';
import { Toast } from 'primeng/toast';


@Component({
    selector: 'app-basemodule-api-management',
    templateUrl: './basemodule-api-management.component.html',
    styleUrls: ['./basemodule-api-management.component.scss'],
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
        ModuleApiUpdateComponent,
        BasemoduleApiAddComponent,
        EndpointManagementComponent,
        BasemoduleApiModuleComponent,
        Toast,
    ],
})
export class BasemoduleApiManagementComponent implements OnInit {
    errorMessage
    addFlag = false;
    apiModuleFlag = false;
    endpointFlag = false;
    updateFlag = false;
    partyFlag = false;
    moduleTitle = '';
    title = '';
    moduleList = [];
    ModuleDto;
    geeks: boolean;
    endpointDto: EndpointDto;
    clientFlag = false;
    headerFlag = false;
    minLength_partyName = ApiGatewayConstants.minLength_partyName;
    partyList = [];
    partyDto;
    detailsBreadObject = [];
    tempModule;
    items;
    first: number = 0;
    rows: number = 10;
    first2: number = 0;
    rows2: number = 10;
    pageno: number = 0;
    pagenoParty: number = 0;
    pagesize = 10;
    pagesizeParty = 10;
    pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pageDescriptionParty =this.transloco.translate('hardCode.page') + ': ' + (this.pagenoParty + 1);
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    pagesizeOptionsParty = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    nextBtnFlag: boolean = false;
    nextBtnFlagParty: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private transloco :TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private notifierService: ToastService,
        private primeng: PrimeNG
    ) {}

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();
        this.primeng.ripple.set(true);
        this.items = [
            {
                items: [
                    {
                        label: 'سرویس های ماژول',
                        icon: '',
                        command: () => {
                            this.showApi(this.tempModule);
                        },
                    },
                    {
                        label: 'اندپوینت های ماژول',
                        icon: '',
                        command: () => {
                            this.showEndpoint(this.tempModule);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
                        command: () => {
                            this.showUpdate(this.tempModule);
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
        this.detailsBreadObject = [
            {
                index: 0,
                label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                img_index0: 'assets/icons/team.png',
                rout_index0: '/home',
                isActive0: false,
            },
            {
                index: 1,
                label_index1: this.transloco.translate('breadcrumbs.module'),
                rout_index1: '',
                isActive1: true,
                img_index1: 'assets/icons/module.png',
            },
            { label_index2: null, label_Detail_index2: null },
            { label_index3: null, label_Detail_index3: null },
            { label_index4: null, label_Detail_index4: null },
            { label_index5: null, label_Detail_index5: null },
            { label_index6: null, label_Detail_index6: null },
        ];
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
        this.moduleList = [];
        let startRow: number;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .searchbytitlemodule(this.pageno, this.pagesize, this.moduleTitle)
            .subscribe(
                (b) => {
                    this._primengProgressBarService.hide();
                    this.moduleList = b;
                    if (Array.isArray(b)) {
                        this.moduleList = b;
                    } else {
                        this.moduleList.push(b);
                    }
                    this.moduleList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    if (this.pageno != 0 && this.pageno != 1) {
                        for (let u = 0; u < this.moduleList.length; u++) {
                            this.moduleList[u] = Object.assign(
                                this.moduleList[u],
                                { row: u + startRow + 1 }
                            );
                        }
                    } else if (this.pageno == 1) {
                        for (let u = 0; u < this.moduleList.length; u++) {
                            this.moduleList[u] = Object.assign(
                                this.moduleList[u],
                                { row: u + this.pagesize + 1 }
                            );
                        }
                    } else {
                        for (let u = 0; u < this.moduleList.length; u++) {
                            this.moduleList[u] = Object.assign(
                                this.moduleList[u],
                                { row: u + 1 }
                            );
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    searchClick(flag: boolean) {
        if (flag) {
            if (this.validationSearchByTitle()) {
                this.pageno = 0;
                this.pagesize = 10;
                this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
                this.search();
            }
        } else {
            this.search();
        }
    }

    onKeydown(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.searchClick(true);
        }
    }

    showAdd() {
        this.pagenoParty = 0;
        this.pagesizeParty = 10;
        this.pageDescriptionParty =this.transloco.translate('hardCode.page') + ': ' + (this.pagenoParty + 1);
        let startRowParty: number;
        this.pagenoParty != 0
            ? (startRowParty = this.pagenoParty * this.pagesizeParty)
            : (startRowParty = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .getpartyinfo(this.pagenoParty, this.pagesizeParty, this.title)
            .subscribe(
                (b) => {
                    this._primengProgressBarService.hide();
                    this.partyList = b;
                    if (Array.isArray(b)) {
                        this.partyList = b;
                    } else {
                        this.partyList.push(b);
                    }
                    this.partyList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    if (this.pagenoParty != 0 && this.pagenoParty != 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + startRowParty + 1 }
                            );
                        }
                    } else if (this.pagenoParty == 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + this.pagesizeParty + 1 }
                            );
                        }
                    } else {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + 1 }
                            );
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
        this.geeks = true;
        this.partyFlag = true;
    }

    onClosePdialog() {
        this.geeks = false;
    }

    setRecord(module) {
        this.tempModule = module;
    }

    showUpdate(module) {
        this.ModuleDto = {
            partyId: null,
            partyTitle: null,
            moduleTitle: '',
            moduleType: '',
            moduleGroup: null,
            moduleAuthMode: null,
            esbMode: null,
            status: null,
            description: '',
            retryCount: null,
            delayRetryTime: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            basemoduleFlag: null,
            moduleid: null,
            moduleId: null,
        };

        this.ModuleDto = module;
        this.ModuleDto.basemoduleFlag = true;
        this.ModuleDto.moduleid = module.moduleId;
        debugger
        this.updateFlag = true;
    }

    showAddParty(party) {
        this.geeks = false;
        this.partyDto = {
            title: '',
            status: null,
            partyid: null,
        };
        this.partyDto = party;
        this.addFlag = true;
    }

    onClose(event: any) {
        this.scrollTop();
        this.addFlag = false;
        this.updateFlag = false;
        this.partyFlag = false;
        this.apiModuleFlag = false;
        this.endpointFlag = false;
        if (event == 'closeAndCreate' || event == 'doubleClose') {
            this.moduleList = [];
            this.pagesize = 10;
            this.pageno = 0;
            this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
            this.moduleTitle = '';
            this.search();
            /*
                        this.messagesApiFacadeService.modulegetall().subscribe(getAllResponse => {
                            this.moduleList = getAllResponse;
                            this.moduleList.map(x => (x.status === 1 ? x.status = true : x.status = false))
                            for (let k = 0; k < this.moduleList.length; k++) {
                                this.moduleList[k] = Object.assign(this.moduleList[k], {row: (k + 1)})
                                /!*(this.partyList[k].row = (k+1))*!/
                            }
                        });
            */
        }
        this.detailsBreadObject = [
            {
                index: 0,
                label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                img_index0: 'assets/icons/team.png',
                rout_index0: '/home',
                isActive0: false,
            },
            {
                index: 1,
                label_index1: this.transloco.translate('breadcrumbs.module'),
                rout_index1: '',
                isActive1: true,
                img_index1: 'assets/icons/module.png',
            },
            { label_index2: null, label_Detail_index2: null },
            { label_index3: null, label_Detail_index3: null },
            { label_index4: null, label_Detail_index4: null },
            { label_index5: null, label_Detail_index5: null },
            { label_index6: null, label_Detail_index6: null },
        ];
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
    }

    clear() {
        this.moduleTitle = '';
        this.moduleList = [];
        this.pagesize = 10;
        this.pageno = 0;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
        /*  this.messagesApiFacadeService.modulegetall().subscribe(responseAll => {
              this.moduleList = responseAll;
              this.moduleList.map(x => (x.status === 1 ? x.status = true : x.status = false))
              for (let k = 0; k < this.moduleList.length; k++) {
                  this.moduleList[k] = Object.assign(this.moduleList[k], {row: (k + 1)})
                  /!*(this.partyList[k].row = (k+1))*!/
              }
          })*/
    }

    search() {
        this.moduleList = [];
        let startRow: number;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .searchbytitlemodule(this.pageno, this.pagesize, this.moduleTitle)
            .subscribe(
                (b) => {
                    this._primengProgressBarService.hide();
                    this.moduleList = b;
                    if (Array.isArray(b)) {
                        this.moduleList = b;
                    } else {
                        this.moduleList.push(b);
                    }
                    this.moduleList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    if (this.pageno != 0 && this.pageno != 1) {
                        for (let u = 0; u < this.moduleList.length; u++) {
                            this.moduleList[u] = Object.assign(
                                this.moduleList[u],
                                { row: u + startRow + 1 }
                            );
                        }
                    } else if (this.pageno == 1) {
                        for (let u = 0; u < this.moduleList.length; u++) {
                            this.moduleList[u] = Object.assign(
                                this.moduleList[u],
                                { row: u + this.pagesize + 1 }
                            );
                        }
                    } else {
                        for (let u = 0; u < this.moduleList.length; u++) {
                            this.moduleList[u] = Object.assign(
                                this.moduleList[u],
                                { row: u + 1 }
                            );
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    nextPageStatement(): void {
        this.pageno += 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }

    nextPageStatementParty(): void {
        this.pagenoParty += 1;
        this.pageDescriptionParty =this.transloco.translate('hardCode.page') + ': ' + (this.pagenoParty + 1);
        this.searchParty();
    }

    previousPageStatement(): void {
        this.pageno -= 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search();
    }

    previousPageStatementParty(): void {
        this.pagenoParty -= 1;
        this.pageDescriptionParty =this.transloco.translate('hardCode.page') + ': ' + (this.pagenoParty + 1);
        this.searchParty();
    }

    OnchangePageno(e) {
        this.pageno = 0;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + 1;
        //if()
        this.search();
    }

    OnchangePagenoParty(e) {
        this.pagenoParty = 0;
        this.pageDescriptionParty =this.transloco.translate('hardCode.page') + ': ' + 1;
        //if()
        this.searchParty();
    }

    showEndpoint(module) {
        this.ModuleDto = {
            partyId: null,
            moduleTitle: '',
            moduleType: null,
            moduleGroup: null,
            moduleAuthMode: null,
            esbMode: null,
            status: null,
            description: '',
            retryCount: null,
            delayRetryTime: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            moduleid: null,
            moduleBase: null,
            moduleId: null,
        };
        this.ModuleDto = module;
        this.ModuleDto.moduleid = module.moduleId;
        this.ModuleDto.moduleBase = true;
        this.apiGatewayService.updateApprovalModuleId(module.moduleId);
        this.endpointFlag = true;
    }

    showApi(module) {
        this.ModuleDto = {
            partyId: null,
            moduleTitle: '',
            moduleType: null,
            moduleGroup: null,
            moduleAuthMode: null,
            esbMode: null,
            status: null,
            description: '',
            retryCount: null,
            delayRetryTime: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            moduleid: null,
            moduleId: null,
        };
        this.ModuleDto = module;
        this.ModuleDto.moduleid = module.moduleId;

        this.apiGatewayService.updateApprovalmoduleBase(true);
        this.apiModuleFlag = true;
    }

    showClient(endpoint) {
        this.endpointDto = {
            sourceUrl: '',
            status: null,
            destinationPortNumber: '',
            destinationHost: '',
        };
        this.endpointDto = endpoint;
        this.clientFlag = true;
        this.apiGatewayService.updateApprovalEndpoint(endpoint);
    }

    showHeader(endpoint) {
        this.endpointDto = {
            sourceUrl: '',
            status: null,
            destinationPortNumber: '',
            destinationHost: '',
        };
        this.endpointDto = endpoint;
        this.headerFlag = true;
        this.apiGatewayService.updateApprovalEndpoint(endpoint);
    }

    searchParty() {
        this.partyList = [];
        let startRowParty: number;
        this.pagenoParty != 0
            ? (startRowParty = this.pagenoParty * this.pagesizeParty)
            : (startRowParty = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .getpartyinfo(this.pagenoParty, this.pagesizeParty, this.title)
            .subscribe(
                (b) => {
                    this._primengProgressBarService.hide();
                    this.partyList = b;
                    if (Array.isArray(b)) {
                        this.partyList = b;
                    } else {
                        this.partyList.push(b);
                    }
                    this.partyList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    if (this.pagenoParty != 0 && this.pagenoParty != 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + startRowParty + 1 }
                            );
                        }
                    } else if (this.pagenoParty == 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + this.pagesizeParty + 1 }
                            );
                        }
                    } else {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + 1 }
                            );
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    clearParty() {
        this.title = '';
        this.pagenoParty = 0;
        this.pagesizeParty = 10;
        this.pageDescriptionParty =this.transloco.translate('hardCode.page') + ': ' + (this.pagenoParty + 1);
        let startRowParty: number;
        this.pagenoParty != 0
            ? (startRowParty = this.pagenoParty * this.pagesizeParty)
            : (startRowParty = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .getpartyinfo(this.pagenoParty, this.pagesizeParty, this.title)
            .subscribe(
                (b) => {
                    this._primengProgressBarService.hide();
                    this.partyList = b;
                    if (Array.isArray(b)) {
                        this.partyList = b;
                    } else {
                        this.partyList.push(b);
                    }
                    this.partyList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    if (this.pagenoParty != 0 && this.pagenoParty != 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + startRowParty + 1 }
                            );
                        }
                    } else if (this.pagenoParty == 1) {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + this.pagesizeParty + 1 }
                            );
                        }
                    } else {
                        for (let u = 0; u < this.partyList.length; u++) {
                            this.partyList[u] = Object.assign(
                                this.partyList[u],
                                { row: u + 1 }
                            );
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    validationSearchByTitle(): boolean {
        if (this.moduleTitle && this.moduleTitle.length < 3) {
            this.notifierService.showError({
                detail: 'لطفا جهت جستجو عنوان ماژول را بیش از سه حرف وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }
    validationSearchByPartyTitle(): boolean {
        if (!this.title) {
            this.notifierService.showError({
                detail: 'لطفا جهت جستجو عنوان سازمان را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (this.title && this.title.length < 3) {
            this.notifierService.showError({
                detail: 'لطفا جهت جستجو عنوان سازمان را بیش از سه حرف وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }
}
