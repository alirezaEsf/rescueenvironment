import {AfterViewChecked, AfterViewInit, Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {FoadDto} from "../../../../models/FoadDto";

import { NgClass, NgIf, NgStyle, ViewportScroller } from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../../shared/pipes/moreChar19.pipe';
import { ModuleTypePipe } from '../../../../../shared/pipes/moduleType.pipe';
import { HistoryMoreCharPipe } from '../../../../../shared/pipes/historyMoreChar.pipe';
import { IsApprovalPipe } from '../../../../../shared/pipes/isApproval.pipe';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { MediatorsJsonComponent } from '../../../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../../../mediators/mediators.component';
import { NodeChangeListComponent } from '../../../node-change-list/node-change-list.component';
import { Dialog } from 'primeng/dialog';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import {
    HeaderEndpointRegisterComponent
} from '../../../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import { TieredMenu } from 'primeng/tieredmenu';
import { ApiModuleRegisterComponent } from './api-module-register/api-module-register.component';
import { ApiModuleUpdateComponent } from './api-module-update/api-module-update.component';
import { ApiRuleComponent } from './api-rule/api-rule.component';
import { TimeLimitationComponent } from './time-limitation/time-limitation.component';
import { MediatorsListComponent } from './mediators-list/mediators-list.component';
import { ApiLogsComponent } from './api-logs/api-logs.component';
import { ChartApiComponent } from './chart-api/chart-api.component';
import { AlertClientComponent } from '../../../alert-client/alert-client.component';
import { AlertSystemComponent } from '../../../alert-system/alert-system.component';
import {
    ClientApiManagementComponent
} from '../../../services-api/endpoint-management/client-api-management/client-api-management.component';
import { ProducedNodeComponent } from './produced-node/produced-node.component';
import { RequiredNodeComponent } from './required-node/required-node.component';
import { SequenceComponent } from './sequence/sequence.component';
import { HeaderEndpointManagementComponent } from '../../../services-api/endpoint-management/header-endpoint-management/header-endpoint-management.component';
import { apiHubComponent } from './api-hub/api-hub.component';
import { FuseLoadingService } from '../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../shared/services/ToastService';
import { AccessDataSaveService } from '../../../../../shared/services/access-data-save.service';
import { ApiGatewayService } from '../../../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../../../services/messages-api-facade.service';
import { PrimeNG } from 'primeng/config';
import { HttpMethodsPipe } from '../../../../../shared/pipes/http-methods.pipe';
import { UIChart } from 'primeng/chart';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-basemodule-api-module',
    templateUrl: './basemodule-api-module.component.html',
    styleUrls: ['./basemodule-api-module.component.scss'],
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
        TieredMenu,
        ApiModuleRegisterComponent,
        ApiModuleUpdateComponent,
        ApiRuleComponent,
        TimeLimitationComponent,
        MediatorsListComponent,
        ApiLogsComponent,
        ChartApiComponent,
        AlertClientComponent,
        AlertSystemComponent,
        ClientApiManagementComponent,
        ProducedNodeComponent,
        RequiredNodeComponent,
        SequenceComponent,
        HeaderEndpointManagementComponent,
        apiHubComponent,
        HttpMethodsPipe,
        UIChart,
        Toast,
    ],
})
export class BasemoduleApiModuleComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputAccess;
    @Input() inputModulePartyBase;
    @Input() inputModule;
    @Input() flag;
    errorMessage=''
    addFlag = false;
    rulFlag = false;
    apiHubFlag = false;
    flagClient = false;
    partyBase = null;
    timeLimitationFlag: boolean = false;
    chartApiFlag: boolean = false;
    alertClientFlag: boolean = false;
    headerFlag: boolean = false;
    mediatorsFlag: boolean = false;
    apiLogFlag: boolean = false;
    alertSystemFlag: boolean = false;
    clientApiFlag: boolean = false;
    producedNodeFlag: boolean = false;
    requiredNodeFlag: boolean = false;
    sequenceFlag: boolean = false;
    updateFlag: boolean = false;
    showDialog: boolean = false;
    tableFlag: boolean = true;
    apiDto = {
        apiId: null,
        moduleId: null,
        title: '',
        name: '',
        protocol: null,
        type: null,
        url: '',
        timeout: null,
        runningType: null,
        status: null,
        maxCall: null,
        callDuration: null,
        cashing_status: null,
        cashing_expire: '',
        description: '',
        retryCount: null,
        delayRetryCount: null,
        limitForPeriod: null,
        limitRefreshPeriod: null,
        logRequestStatus: null,
        logResponseStatus: null,
        reverseStatus: null,
        reverseCondition: null,
        cookeSendStatus: null,
        moduleBase: null,
        moduleTitle: null,
        partyTitle: null,
        clientBase: null,
        clientName: null,
        clientId: null,
        accessBase: null,
        moduleType: null,
        sequenceBase: null,
        partyBase: null,
        shenase: null,
    };
    tempApi;
    headerApi = 'سرویس های ماژول';
    baseClientFlag;
    ModuleDto: {
        partyId: null;
        moduleTitle: '';
        moduleType: null;
        moduleGroup: null;
        moduleAuthMode: null;
        esbMode: null;
        status: null;
        description: '';
        retryCount: null;
        delayRetryTime: null;
        limitForPeriod: null;
        limitRefreshPeriod: null;
        moduleid: null;
        moduleId: null;
        moduleBase: null;
        partyTitle: null;
    };

    api: FoadDto = {
        delayRetryTime: null,
        description: '',
        esbMode: null,
        limitForPeriod: null,
        limitRefreshPeriod: null,
        moduleAuthMode: null,
        moduleBase: null,
        moduleGroup: null,
        moduleId: null,
        moduleTitle: '',
        moduleType: null,
        partyId: null,
        partyTitle: '',
        retryCount: null,
        status: null,
    };
    moduleTitle;
    moduleType;
    moduleGroup;
    apiList = [];
    detailsBreadObject = [];
    moduleBase: boolean;
    accessBase: boolean;
    clientBase: boolean;
    nextBtnFlag: boolean = false;
    onlyNextBtnFlag: boolean = false;
    partyTitle;
    clientName = null;
    items;
    moduleId;
    clientId;
    tempClientId;
    tempModuleById;
    widthModuleTitle;
    widthModuleType;
    widthModuleGroup;
    basicOptions;
    basicData;
    first: number = 0;
    rows: number = 10;
    showTitle: boolean = true;
    showName: boolean = false;
    filterFlag: boolean = true;
    name;
    title;
    categoryid: number = null;
    mainId: number;
    searchBy: string = '1';
    apiMainCategories: any[] = [
        {
            categoryId: null,
            title: '-',
        },
    ];
    categories: any[] = [
        {
            categoryId: null,
            title: '-',
        },
    ];
    mainCategorie: any[] = [
        {
            categoryId: null,
            title: '-',
        },
    ];
    searchByOption = [
        { name: 'عنوان سرویس', code: '1' },
        { name: 'نام سرویس', code: '2' },
    ];
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    pageno: number = 0;
    pagesize = 10;
    pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    loading: boolean;
    apibymoduleidCallFlag: boolean = false;
    searchbytitleCallFlag: boolean = false;
    SearchModuleByIdCallFlag: boolean = false;
    apibymoduleidandnameCallFlag: boolean = false;

    constructor(
        private apiGatewayService: ApiGatewayService,
        private transloco :TranslocoService,
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private accessDataSaveService: AccessDataSaveService,
        private viewportScroller: ViewportScroller,
        private notifierService: ToastService,
        private router: Router,
        private route: ActivatedRoute,
        private primeng: PrimeNG
    ) {}

    OnChangeCateguryOptions(event) {
        debugger;
        this.categories = [];
        let newObject = {
            categoryId: null,
            title: '-',
            shenase: '',
        };
        this.categories.unshift(newObject);
        if (event.value != null) {
            debugger;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.getApiCategory(event.value).subscribe(
                (response) => {
                    debugger;
                    console.log('response', response);
                    this._primengProgressBarService.hide();
                    this.categoryid = null;
                    this.categories = [];
                    this.categories = response.outputData;
                    let newObject = {
                        categoryId: null,
                        title: '-',
                        shenase: '',
                    };
                    this.categories.unshift(newObject);
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
        }
    }

    transferToStore() {
        this.errorMessage=''
        debugger
        if (this.validateTransfer()) {
            debugger
            if (this.apiDto != undefined && this.apiDto != null) {
                debugger
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.apistoreJwt().subscribe(  (u) => {
                        debugger
                        this._primengProgressBarService.hide();
                        this._primengProgressBarService.show();
                        this.messagesApiFacadeService
                            .integrationTransfer(u?.outputData, this.apiDto.apiId, this.categoryid, this.moduleId).subscribe((m) => {
                                debugger
                                this._primengProgressBarService.hide();
                                    this.notifierService.showSuccess({
                                        detail: m?.resultStatus?.message,
                                        life: 3000,
                                    });
                                this.errorMessage=m?.error?.text
                                    this.closeDialog();
                                },
                                (error) => {
                                debugger
                                    this.errorMessage=error?.error?.text
                                    this._primengProgressBarService.hide();
                                }
                            );
                    },
                    (error) => {
                        debugger
                        this._primengProgressBarService.hide();
                    }
                );
                /*this.messagesApiFacadeService.transferToStore(this.apiDto.apiId,this.categoryid).
                subscribe(p=>{
                    this._primengProgressBarService.hide()
                    console.log(p)
                    this.closeDialog()
                },error => {
                    this._primengProgressBarService.hide()
                })*/
            }
        }
    }

    validateTransfer(): boolean {
        if (!this.mainCategorie) {
            this.notifierService.showError({
                detail: 'لطفا دسته بندی سرویس را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.categoryid) {
            this.notifierService.showError({
                detail: 'لطفا بسته سرویس را وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    closeDialog() {
        this.showDialog = false;
        this.errorMessage=" "
        this.mainCategorie = null;
        this.categoryid = null;
        this.categories = [];
        this.categories.unshift({ title: '-', categoryId: null });
    }

    onChangeSearch(event) {
        if (event.value == null) {
            this.filterFlag = false;
            this.nextBtnFlag = false;
            this.onlyNextBtnFlag = false;
            this.title = null;
            this.name = null;
        } else if (event.value == '1') {
            this.filterFlag = true;
            this.showTitle = true;
            this.showName = false;
            this.onlyNextBtnFlag = true;
            this.name = null;
            this.searchBy = event.value;
        } else if (event.value == '2') {
            this.filterFlag = true;
            this.showTitle = false;
            this.showName = true;
            this.onlyNextBtnFlag = true;
            this.title = null;
            this.searchBy = event.value;
        }
    }

    OnchangePageno(e) {
        this.pageno = 0;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + 1;
        //if()
        this.search(this.pagesize, this.pageno);
    }

    previousPageStatement(): void {
        this.pageno -= 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(this.pagesize, this.pageno);
    }

    nextPageStatement(): void {
        this.pageno += 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(this.pagesize, this.pageno);
    }

    clear() {
        this.name = null;
        this.title = null;
        this.apiList = [];
        this.searchBy = '1';
        this.showTitle = true;
        this.showName = false;
        this.filterFlag = true;
        this.pagesize = 10;
        this.pageno = 0;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.nextBtnFlag = false;
        this.onlyNextBtnFlag = false;
        this.loading = false;
        this.apibymoduleidCallFlag = true;
        this.loading = true;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .apibymoduleinfo(
                this.moduleId,
                this.pageno,
                this.pagesize,
                null,
                null
            )
            .subscribe(
                (a) => {
                    this._primengProgressBarService.hide();
                    let startRow: number;
                    this.pageno != 0
                        ? (startRow = this.pageno * this.pagesize)
                        : (startRow = 0);
                    this.loading = false;
                    if (Array.isArray(a)) {
                        this.apiList = a;
                    } else {
                        this.apiList.push(a);
                    }
                    this.apiList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    for (let k = 0; k < this.apiList.length; k++) {
                        this.apiList[k].cashing_expire = this.castToDate(
                            this.apiList[k].cashing_expire
                        );
                        this.apiList[k].successData = this.apiList[
                            k
                        ].successData.map((data) => data.count);
                        this.apiList[k].unSuccessData = this.apiList[
                            k
                        ].unSuccessData.map((data) => data.count);
                        this.apiList[k] = Object.assign(this.apiList[k], {
                            basicData: {
                                labels: this.apiList[0].days,
                                datasets: [
                                    {
                                        label: 'موفق',
                                        data: this.apiList[k].successData,
                                        fill: false,
                                        borderColor: '#21c57b',
                                        tension: 0.4,
                                    },
                                    {
                                        label: 'ناموفق',
                                        data: this.apiList[k].unSuccessData,
                                        fill: true,
                                        borderColor: '#ff5858',
                                        tension: 0.4,
                                    },
                                ],
                            },
                        });
                        this.apiList[k] = Object.assign(this.apiList[k], {
                            basicOptions: {
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                            },
                        });
                    }
                    if (this.pageno != 0 && this.pageno != 1) {
                        for (let u = 0; u < this.apiList.length; u++) {
                            this.apiList[u] = Object.assign(this.apiList[u], {
                                row: u + startRow + 1,
                            });
                        }
                    } else if (this.pageno == 1) {
                        for (let u = 0; u < this.apiList.length; u++) {
                            this.apiList[u] = Object.assign(this.apiList[u], {
                                row: u + this.pagesize + 1,
                            });
                        }
                    } else {
                        for (let u = 0; u < this.apiList.length; u++) {
                            this.apiList[u] = Object.assign(this.apiList[u], {
                                row: u + 1,
                            });
                        }
                    }

                    //console.log('apiList', this.apiList)
                    this.basicOptions = {
                        plugins: {
                            legend: {
                                display: false,
                                labels: {
                                    color: '#495057',
                                },
                            },
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: '#495057',
                                },
                                grid: {
                                    color: '#ebedef',
                                },
                                display: false,
                            },
                            y: {
                                ticks: {
                                    color: '#495057',
                                },
                                grid: {
                                    color: '#ebedef',
                                },
                            },
                        },
                    };
                    this.loading = false;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    onKeydown(event) {
        let mySelf = this;
        if (event.key === 'Enter') {
            mySelf.searchClick(true);
        }
    }

    searchClick(flag: boolean) {
        if (flag) {
            if (this.searchBy == '1') {
                if (this.validationSearchByTitle()) {
                    this.pageno = 0;
                    this.pagesize = 10;
                    this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
                    this.search(this.pagesize, this.pageno);
                }
            } else if (this.searchBy == '2') {
                if (this.validationSearchByName()) {
                    this.pageno = 0;
                    this.pagesize = 10;
                    this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
                    this.search(this.pagesize, this.pageno);
                }
            } else {
                this.pageno = 0;
                this.pagesize = 10;
                this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
                this.search(this.pagesize, this.pageno);
            }
        }
    }

    search(pagesize, pageno) {
        debugger;
        let startRow: number;
        pageno != 0 ? (startRow = pageno * pagesize) : (startRow = 0);
        if (this.searchBy == null) {
            debugger;
            this.nextBtnFlag = false;
            this.loading = true;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .apibymoduleinfo(
                    this.moduleId,
                    this.pageno,
                    this.pagesize,
                    null,
                    null
                )
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.loading = false;
                        if (Array.isArray(a)) {
                            this.apiList = a;
                        } else {
                            this.apiList.push(a);
                        }
                        this.apiList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        for (let k = 0; k < this.apiList.length; k++) {
                            this.apiList[k].cashing_expire = this.castToDate(
                                this.apiList[k].cashing_expire
                            );
                            this.apiList[k].successData = this.apiList[
                                k
                            ].successData.map((data) => data.count);
                            this.apiList[k].unSuccessData = this.apiList[
                                k
                            ].unSuccessData.map((data) => data.count);
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                basicData: {
                                    labels: this.apiList[0].days,
                                    datasets: [
                                        {
                                            label: 'موفق',
                                            data: this.apiList[k].successData,
                                            fill: false,
                                            borderColor: '#21c57b',
                                            tension: 0.4,
                                        },
                                        {
                                            label: 'ناموفق',
                                            data: this.apiList[k].unSuccessData,
                                            fill: true,
                                            borderColor: '#ff5858',
                                            tension: 0.4,
                                        },
                                    ],
                                },
                            });
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                basicOptions: {
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                },
                            });
                        }
                        if (pageno != 0 && pageno != 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + startRow + 1 }
                                );
                                debugger;
                            }
                        } else if (pageno == 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + pagesize + 1 }
                                );
                                debugger;
                            }
                        } else {
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + 1 }
                                );
                                debugger;
                            }
                        }

                        //console.log('apiList', this.apiList)
                        this.basicOptions = {
                            plugins: {
                                legend: {
                                    display: false,
                                    labels: {
                                        color: '#495057',
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: '#495057',
                                    },
                                    grid: {
                                        color: '#ebedef',
                                    },
                                    display: false,
                                },
                                y: {
                                    ticks: {
                                        color: '#495057',
                                    },
                                    grid: {
                                        color: '#ebedef',
                                    },
                                },
                            },
                        };
                        this.loading = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
        if (this.searchBy == '1') {
            debugger;
            if (this.title) {
                this.loading = true;
                debugger;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .apibymoduleinfo(
                        this.moduleId,
                        this.pageno,
                        this.pagesize,
                        null,
                        this.title
                    )
                    .subscribe(
                        (w) => {
                            this._primengProgressBarService.hide();
                            this.loading = false;
                            this.apiList = [];
                            if (Array.isArray(w)) {
                                this.apiList = w;
                            } else {
                                this.apiList.push(w);
                            }
                            this.apiList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false)
                            );
                            for (let k = 0; k < this.apiList.length; k++) {
                                this.apiList[k] = Object.assign(
                                    this.apiList[k],
                                    { row: k + 1 }
                                );
                                this.apiList[k].cashing_expire =
                                    this.castToDate(
                                        this.apiList[k].cashing_expire
                                    );
                                this.apiList[k].successData = this.apiList[
                                    k
                                ].successData.map((data) => data.count);
                                this.apiList[k].unSuccessData = this.apiList[
                                    k
                                ].unSuccessData.map((data) => data.count);
                                this.apiList[k] = Object.assign(
                                    this.apiList[k],
                                    {
                                        basicData: {
                                            labels: this.apiList[0].days,
                                            datasets: [
                                                {
                                                    label: 'موفق',
                                                    data: this.apiList[k]
                                                        .successData,
                                                    fill: false,
                                                    borderColor: '#21c57b',
                                                    tension: 0.4,
                                                },
                                                {
                                                    label: 'ناموفق',
                                                    data: this.apiList[k]
                                                        .unSuccessData,
                                                    fill: true,
                                                    borderColor: '#ff5858',
                                                    tension: 0.4,
                                                },
                                            ],
                                        },
                                    }
                                );
                                this.apiList[k] = Object.assign(
                                    this.apiList[k],
                                    {
                                        basicOptions: {
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                        },
                                    }
                                );
                            }
                            if (pageno != 0 && pageno != 1) {
                                debugger;
                                for (let u = 0; u < this.apiList.length; u++) {
                                    this.apiList[u] = Object.assign(
                                        this.apiList[u],
                                        { row: u + startRow + 1 }
                                    );
                                    debugger;
                                }
                            } else if (pageno == 1) {
                                debugger;
                                for (let u = 0; u < this.apiList.length; u++) {
                                    this.apiList[u] = Object.assign(
                                        this.apiList[u],
                                        { row: u + pagesize + 1 }
                                    );
                                    debugger;
                                }
                            } else {
                                for (let u = 0; u < this.apiList.length; u++) {
                                    this.apiList[u] = Object.assign(
                                        this.apiList[u],
                                        { row: u + 1 }
                                    );
                                    debugger;
                                }
                            }
                            //console.log('apiList', this.apiList)
                            this.basicOptions = {
                                plugins: {
                                    legend: {
                                        display: false,
                                        labels: {
                                            color: '#495057',
                                        },
                                    },
                                },
                                scales: {
                                    x: {
                                        ticks: {
                                            color: '#495057',
                                        },
                                        grid: {
                                            color: '#ebedef',
                                        },
                                        display: false,
                                    },
                                    y: {
                                        ticks: {
                                            color: '#495057',
                                        },
                                        grid: {
                                            color: '#ebedef',
                                        },
                                    },
                                },
                            };
                            this.loading = false;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );
            } else {
                this.loading = true;
                debugger;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .apibymoduleinfo(
                        this.moduleId,
                        this.pageno,
                        this.pagesize,
                        null,
                        null
                    )
                    .subscribe(
                        (w) => {
                            this._primengProgressBarService.hide();
                            this.loading = false;
                            this.apiList = [];
                            if (Array.isArray(w)) {
                                this.apiList = w;
                            } else {
                                this.apiList.push(w);
                            }
                            this.apiList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false)
                            );
                            for (let k = 0; k < this.apiList.length; k++) {
                                this.apiList[k] = Object.assign(
                                    this.apiList[k],
                                    { row: k + 1 }
                                );
                                this.apiList[k].cashing_expire =
                                    this.castToDate(
                                        this.apiList[k].cashing_expire
                                    );
                                this.apiList[k].successData = this.apiList[
                                    k
                                ].successData.map((data) => data.count);
                                this.apiList[k].unSuccessData = this.apiList[
                                    k
                                ].unSuccessData.map((data) => data.count);
                                this.apiList[k] = Object.assign(
                                    this.apiList[k],
                                    {
                                        basicData: {
                                            labels: this.apiList[0].days,
                                            datasets: [
                                                {
                                                    label: 'موفق',
                                                    data: this.apiList[k]
                                                        .successData,
                                                    fill: false,
                                                    borderColor: '#21c57b',
                                                    tension: 0.4,
                                                },
                                                {
                                                    label: 'ناموفق',
                                                    data: this.apiList[k]
                                                        .unSuccessData,
                                                    fill: true,
                                                    borderColor: '#ff5858',
                                                    tension: 0.4,
                                                },
                                            ],
                                        },
                                    }
                                );
                                this.apiList[k] = Object.assign(
                                    this.apiList[k],
                                    {
                                        basicOptions: {
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                        },
                                    }
                                );
                            }
                            if (pageno != 0 && pageno != 1) {
                                debugger;
                                for (let u = 0; u < this.apiList.length; u++) {
                                    this.apiList[u] = Object.assign(
                                        this.apiList[u],
                                        { row: u + startRow + 1 }
                                    );
                                    debugger;
                                }
                            } else if (pageno == 1) {
                                debugger;
                                for (let u = 0; u < this.apiList.length; u++) {
                                    this.apiList[u] = Object.assign(
                                        this.apiList[u],
                                        { row: u + pagesize + 1 }
                                    );
                                    debugger;
                                }
                            } else {
                                for (let u = 0; u < this.apiList.length; u++) {
                                    this.apiList[u] = Object.assign(
                                        this.apiList[u],
                                        { row: u + 1 }
                                    );
                                    debugger;
                                }
                            }
                            //console.log('apiList', this.apiList)
                            this.basicOptions = {
                                plugins: {
                                    legend: {
                                        display: false,
                                        labels: {
                                            color: '#495057',
                                        },
                                    },
                                },
                                scales: {
                                    x: {
                                        ticks: {
                                            color: '#495057',
                                        },
                                        grid: {
                                            color: '#ebedef',
                                        },
                                        display: false,
                                    },
                                    y: {
                                        ticks: {
                                            color: '#495057',
                                        },
                                        grid: {
                                            color: '#ebedef',
                                        },
                                    },
                                },
                            };
                            this.loading = false;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );
            }
        } else if (this.searchBy == '2') {
            debugger;
            if (this.name) {
                this.loading = true;
                debugger;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .apibymoduleinfo(
                        this.moduleId,
                        this.pageno,
                        this.pagesize,
                        this.name
                    )
                    .subscribe(
                        (w) => {
                            this._primengProgressBarService.hide();
                            this.loading = false;
                            this.apiList = [];
                            if (Array.isArray(w)) {
                                this.apiList = w;
                            } else {
                                this.apiList.push(w);
                            }
                            this.apiList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false)
                            );
                            for (let k = 0; k < this.apiList.length; k++) {
                                this.apiList[k] = Object.assign(
                                    this.apiList[k],
                                    { row: k + 1 }
                                );
                                this.apiList[k].cashing_expire =
                                    this.castToDate(
                                        this.apiList[k].cashing_expire
                                    );
                                this.apiList[k].successData = this.apiList[
                                    k
                                ].successData.map((data) => data.count);
                                this.apiList[k].unSuccessData = this.apiList[
                                    k
                                ].unSuccessData.map((data) => data.count);
                                this.apiList[k] = Object.assign(
                                    this.apiList[k],
                                    {
                                        basicData: {
                                            labels: this.apiList[0].days,
                                            datasets: [
                                                {
                                                    label: 'موفق',
                                                    data: this.apiList[k]
                                                        .successData,
                                                    fill: false,
                                                    borderColor: '#21c57b',
                                                    tension: 0.4,
                                                },
                                                {
                                                    label: 'ناموفق',
                                                    data: this.apiList[k]
                                                        .unSuccessData,
                                                    fill: true,
                                                    borderColor: '#ff5858',
                                                    tension: 0.4,
                                                },
                                            ],
                                        },
                                    }
                                );
                                this.apiList[k] = Object.assign(
                                    this.apiList[k],
                                    {
                                        basicOptions: {
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                        },
                                    }
                                );
                            }
                            if (pageno != 0 && pageno != 1) {
                                debugger;
                                for (let u = 0; u < this.apiList.length; u++) {
                                    this.apiList[u] = Object.assign(
                                        this.apiList[u],
                                        { row: u + startRow + 1 }
                                    );
                                    debugger;
                                }
                            } else if (pageno == 1) {
                                debugger;
                                for (let u = 0; u < this.apiList.length; u++) {
                                    this.apiList[u] = Object.assign(
                                        this.apiList[u],
                                        { row: u + pagesize + 1 }
                                    );
                                    debugger;
                                }
                            } else {
                                for (let u = 0; u < this.apiList.length; u++) {
                                    this.apiList[u] = Object.assign(
                                        this.apiList[u],
                                        { row: u + 1 }
                                    );
                                    debugger;
                                }
                            }
                            //console.log('apiList', this.apiList)
                            this.basicOptions = {
                                plugins: {
                                    legend: {
                                        display: false,
                                        labels: {
                                            color: '#495057',
                                        },
                                    },
                                },
                                scales: {
                                    x: {
                                        ticks: {
                                            color: '#495057',
                                        },
                                        grid: {
                                            color: '#ebedef',
                                        },
                                        display: false,
                                    },
                                    y: {
                                        ticks: {
                                            color: '#495057',
                                        },
                                        grid: {
                                            color: '#ebedef',
                                        },
                                    },
                                },
                            };
                            this.loading = false;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );
            } else {
                this.loading = true;
                debugger;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .apibymoduleinfo(
                        this.moduleId,
                        this.pageno,
                        this.pagesize,
                        null
                    )
                    .subscribe(
                        (w) => {
                            this._primengProgressBarService.hide();
                            this.loading = false;
                            this.apiList = [];
                            if (Array.isArray(w)) {
                                this.apiList = w;
                            } else {
                                this.apiList.push(w);
                            }
                            this.apiList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false)
                            );
                            for (let k = 0; k < this.apiList.length; k++) {
                                this.apiList[k] = Object.assign(
                                    this.apiList[k],
                                    { row: k + 1 }
                                );
                                this.apiList[k].cashing_expire =
                                    this.castToDate(
                                        this.apiList[k].cashing_expire
                                    );
                                this.apiList[k].successData = this.apiList[
                                    k
                                ].successData.map((data) => data.count);
                                this.apiList[k].unSuccessData = this.apiList[
                                    k
                                ].unSuccessData.map((data) => data.count);
                                this.apiList[k] = Object.assign(
                                    this.apiList[k],
                                    {
                                        basicData: {
                                            labels: this.apiList[0].days,
                                            datasets: [
                                                {
                                                    label: 'موفق',
                                                    data: this.apiList[k]
                                                        .successData,
                                                    fill: false,
                                                    borderColor: '#21c57b',
                                                    tension: 0.4,
                                                },
                                                {
                                                    label: 'ناموفق',
                                                    data: this.apiList[k]
                                                        .unSuccessData,
                                                    fill: true,
                                                    borderColor: '#ff5858',
                                                    tension: 0.4,
                                                },
                                            ],
                                        },
                                    }
                                );
                                this.apiList[k] = Object.assign(
                                    this.apiList[k],
                                    {
                                        basicOptions: {
                                            plugins: {
                                                legend: {
                                                    display: false,
                                                },
                                            },
                                        },
                                    }
                                );
                            }
                            if (pageno != 0 && pageno != 1) {
                                debugger;
                                for (let u = 0; u < this.apiList.length; u++) {
                                    this.apiList[u] = Object.assign(
                                        this.apiList[u],
                                        { row: u + startRow + 1 }
                                    );
                                    debugger;
                                }
                            } else if (pageno == 1) {
                                debugger;
                                for (let u = 0; u < this.apiList.length; u++) {
                                    this.apiList[u] = Object.assign(
                                        this.apiList[u],
                                        { row: u + pagesize + 1 }
                                    );
                                    debugger;
                                }
                            } else {
                                for (let u = 0; u < this.apiList.length; u++) {
                                    this.apiList[u] = Object.assign(
                                        this.apiList[u],
                                        { row: u + 1 }
                                    );
                                    debugger;
                                }
                            }
                            //console.log('apiList', this.apiList)
                            this.basicOptions = {
                                plugins: {
                                    legend: {
                                        display: false,
                                        labels: {
                                            color: '#495057',
                                        },
                                    },
                                },
                                scales: {
                                    x: {
                                        ticks: {
                                            color: '#495057',
                                        },
                                        grid: {
                                            color: '#ebedef',
                                        },
                                        display: false,
                                    },
                                    y: {
                                        ticks: {
                                            color: '#495057',
                                        },
                                        grid: {
                                            color: '#ebedef',
                                        },
                                    },
                                },
                            };
                            this.loading = false;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );
            }
        }
    }

    validationSearchByTitle(): boolean {
        if (this.title && this.title.length < 3) {
            debugger;
            this.notifierService.showError({
                detail: 'لطفا جهت جستجو عنوان سرویس را بیش از سه حرف وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    validationSearchByName(): boolean {
        if (this.name && this.name.length < 3) {
            debugger;
            this.notifierService.showError({
                detail: 'لطفا جهت جستجو نام سرویس را بیش از سه حرف وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    castToDate(args: string): any {
        if (args)
            if (args.toString().length === 10) {
                let tempArgs: string;
                tempArgs = args.replace(/\//g, '');
                return tempArgs;
            }
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'accessBase':
                return [

                    {
                        index: 0,
                        label_index0: 'لیست دسترسی',
                        rout_index0: '',
                        isActive0: false,
                        img_index0: 'assets/icons/access.png',
                        label_Detail_index0: null,
                    },
                    {
                        index: 1,
                        label_index1: 'سرویس',
                        rout_index1: null,
                        isActive1: true,
                        label_Detail_index1: '(' + this.clientName + ')',
                        img_index1: 'assets/icons/api.png',
                    },
                    {label_index2: null, label_Detail_index2: null},
                    {label_index3: null, label_Detail_index3: null},
                    {label_index4: null, label_Detail_index4: null},
                    {label_index5: null, label_Detail_index5: null},
                    {label_index6: null, label_Detail_index6: null}
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
                        rout_index1: null,
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                        label_Detail_index1: '(' + this.clientName + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(لیست دسترسی)',
                        img_index2: 'assets/icons/api.png',
                    },
                    {label_index3: null, label_Detail_index3: null},
                    {label_index4: null, label_Detail_index4: null},
                    {label_index5: null, label_Detail_index5: null},
                    {label_index6: null, label_Detail_index6: null}
                ];
            default:
                return null;
        }
    }

    /*    downLoadFile(data: any, type: string) {
            let blob = new Blob([data], { type: type});
            let url = window.URL.createObjectURL(blob);
            let pwa = window.open(url);
            if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
                alert( 'Please disable your Pop-up blocker and try again.');
            }
        }*/

    /*    onDownloadFile(row: any) {
            if (row.url) {
                const a = document.createElement('a');
                a.href = environment.server.apiService + row.url;
                a.download = row.fileName;
                a.click();
            } else {
                const a = document.createElement('a');
                a.href = 'data:' + row.mimeType + ';base64,' + row.file;
                a.download = row.fileName;
                a.click();
            }
        }*/

    downloadFile(data) {
        const url = window.URL.createObjectURL(data);
        const e = document.createElement('a');
        e.href = url;
        e.download = url.substr(url.lastIndexOf('/') + 1);
        document.body.appendChild(e);
        e.click();
        document.body.removeChild(e);
    }

    getsourcecurl(api) {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.getsourcecurl(api.apiId).subscribe(
            (response) => {
                this._primengProgressBarService.hide();
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    getdestinationcurl(api) {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.getdestinationcurl(api.apiId).subscribe(
            (response) => {
                this._primengProgressBarService.hide();
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    sequenceFlow(api) {
        debugger;
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientBase = this.flagClient;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.moduleType = this.moduleType;
        this.sequenceFlag = true;
        this.apiGatewayService.updateApprovalApiIdSeq(api.apiId);
    }

    ngOnInit(): void {
        this.scrollTop();

        this.primeng.ripple.set(true);
        this.items = [
            {
                label: 'المان های سرویس',
                icon: '',
                command: () => {
                    this.showHeader(this.tempApi);
                },
            },
            {
                label: 'کلاینت های سرویس',
                icon: '',
                command: () => {
                    this.showClientApi(this.tempApi);
                },
            },
            {
                label: 'قواعد سرویس',
                icon: '',
                command: () => {
                    this.showRules(this.tempApi);
                },
            },
            {
                label: 'هاب سرویس',
                icon: '',
                command: () => {
                    this.showApiHub(this.tempApi);
                },
            },
            {
                label: this.transloco.translate('contextMenu.curl'),
                icon: '',
                items: [
                    {
                        label: this.transloco.translate('contextMenu.createOriginCurl'),
                        icon: '',
                        command: () => {
                            this.getsourcecurl(this.tempApi);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.createDestinationCurl'),
                        icon: '',
                        command: () => {
                            this.getdestinationcurl(this.tempApi);
                        },
                    },
                ],
            },
            {
                label: this.transloco.translate('contextMenu.sequence'),
                icon: '',
                items: [
                    {
                        label: this.transloco.translate('contextMenu.producedNode'),
                        icon: '',
                        command: () => {
                            this.producedNode(this.tempApi);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.requiredNode'),
                        icon: '',
                        command: () => {
                            this.requiredNode(this.tempApi);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.sequenceFlow'),
                        icon: '',
                        command: () => {
                            this.sequenceFlow(this.tempApi);
                        },
                    },
                ],
            },
            {
                label: this.transloco.translate('contextMenu.apiManagement'),
                items: [
                    {
                        label: this.transloco.translate('contextMenu.apiTimeLimitation'),
                        icon: '',
                        command: () => {
                            this.showTimeLimitation(this.tempApi);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.apiMediators'),
                        icon: '',
                        command: () => {
                            this.showMediators(this.tempApi);
                        },
                    },
                ],
            },
            {
                label: this.transloco.translate('contextMenu.apiReview'),
                items: [
                    {
                        label:this.transloco.translate('contextMenu.apiChart'),
                        icon: '',
                        command: () => {
                            this.showChartApi(this.tempApi);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.apiLog'),
                        icon: '',
                        command: () => {
                            this.showApiLog(this.tempApi);
                        },
                    },
                ],
            },
            {
                label:  this.transloco.translate('contextMenu.alarms'),
                items: [
                    {
                        label: this.transloco.translate('contextMenu.alarmsUser'),
                        command: () => {
                            this.showAlertClient(this.tempApi);
                        },
                    },
                    {
                        label:this.transloco.translate('contextMenu.alarmsSystem'),
                        icon: '',
                        command: () => {
                            this.showAlertSystem(this.tempApi);
                        },
                    },
                ],
            },
            {
                label: this.transloco.translate('contextMenu.TransferringInfoGateway'),
                command: () => {
                    this.showTransport(this.tempApi);
                },
            },
            {
                label: this.transloco.translate('contextMenu.Edit'),
                command: () => {
                    this.showUpdate(this.tempApi);
                },
            },
            {
                label: '____________________________',
            },
            {
                label: this.transloco.translate('contextMenu.cancel'),
            },
        ];
        this.tempClientId = null;
        this.apiGatewayService.currentApprovalStageClientObject.subscribe(
            (c) => {
                this.tempClientId = c.clientId;
                this.clientId = c.clientId;
                this.clientName = c.name;
                this.baseClientFlag = c.baseClientFlag;
            }
        );

        this.flagClient = this.flag;
        if (this.inputAccess != undefined) {
            this.clientBase = this.inputAccess.clientBase;
            this.accessBase = this.inputAccess.accessBase;
            this.clientName = this.inputAccess.clientName;
            this.clientId = this.inputAccess.clientId;
            this.moduleTitle = this.inputAccess.moduleTitle;
            this.moduleId = this.inputAccess.moduleId;
            this.moduleType = this.inputAccess.moduleType;
            this.headerApi = ' سرویس های کلاینت';
            // moduleId
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
            else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.SearchModuleById(this.moduleId).subscribe((j) => {
                        this._primengProgressBarService.hide();
                        this.moduleType = j.moduleType;
                        this.moduleGroup = j.moduleGroup;
                        this.moduleTitle = j.moduleTitle;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            this.loading = true;
            debugger;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .apibymoduleinfo(
                    this.moduleId,
                    this.pageno,
                    this.pagesize,
                    this.name,
                    this.title
                )
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.loading = false;
                        if (Array.isArray(a)) {
                            this.apiList = a;
                        } else {
                            this.apiList.push(a);
                        }
                        this.apiList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        for (let k = 0; k < this.apiList.length; k++) {
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                row: k + 1,
                            });
                            this.apiList[k].cashing_expire = this.castToDate(
                                this.apiList[k].cashing_expire
                            );
                            this.apiList[k].successData = this.apiList[
                                k
                            ].successData.map((data) => data.count);
                            this.apiList[k].unSuccessData = this.apiList[
                                k
                            ].unSuccessData.map((data) => data.count);
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                basicData: {
                                    labels: this.apiList[0].days,
                                    datasets: [
                                        {
                                            label: 'موفق',
                                            data: this.apiList[k].successData,
                                            fill: false,
                                            borderColor: '#21c57b',
                                            tension: 0.4,
                                        },
                                        {
                                            label: 'ناموفق',
                                            data: this.apiList[k].unSuccessData,
                                            fill: true,
                                            borderColor: '#ff5858',
                                            tension: 0.4,
                                        },
                                    ],
                                },
                            });
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                basicOptions: {
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                },
                            });
                        }
                        let startRow: number;
                        this.pageno != 0
                            ? (startRow = this.pageno * this.pagesize)
                            : (startRow = 0);
                        if (this.pageno != 0 && this.pagesize != 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + startRow + 1 }
                                );
                                debugger;
                            }
                        } else if (this.pageno == 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + this.pagesize + 1 }
                                );
                                debugger;
                            }
                        } else {
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + 1 }
                                );
                                debugger;
                            }
                        }
                        //console.log('apiList', this.apiList)
                        this.basicOptions = {
                            plugins: {
                                legend: {
                                    display: false,
                                    labels: {
                                        color: '#495057',
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: '#495057',
                                    },
                                    grid: {
                                        color: '#ebedef',
                                    },
                                    display: false,
                                },
                                y: {
                                    ticks: {
                                        color: '#495057',
                                    },
                                    grid: {
                                        color: '#ebedef',
                                    },
                                },
                            },
                        };
                        this.loading = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            if (this.moduleTitle.length > 22) {
                this.widthModuleTitle = 100;
            }
            if (this.moduleType.length > 22) {
                this.widthModuleType = 100;
            }
            if (this.moduleGroup.length > 22) {
                this.widthModuleGroup = 100;
            }
        }
        else if (this.inputAccess != undefined) {
            this.accessBase = this.inputAccess.accessBase;
            this.clientBase = this.inputAccess.clientBase;
            this.tempModuleById = this.accessDataSaveService.shareData.moduleId;
            this.moduleId = this.accessDataSaveService.shareData.moduleId;
            this.loading = true;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .SearchModuleById(this.tempModuleById)
                .subscribe(
                    (resModule) => {
                        this._primengProgressBarService.hide();
                        this.loading = false;
                        this.moduleTitle = resModule.moduleTitle;
                        this.moduleType = resModule.moduleType;
                        this.moduleGroup = resModule.moduleGroup;
                        if (this.accessBase) {
                            this.detailsBreadObject = [

                                {
                                    index: 0,
                                    label_index0: 'لیست دسترسی',
                                    rout_index0: '/api-gateway/access-list',
                                    isActive0: false,
                                    img_index0: 'assets/icons/access.png',
                                },
                                {
                                    index: 1,
                                    label_index1: 'سرویس',
                                    rout_index1: null,
                                    isActive1: true,
                                    img_index1: 'assets/icons/api.png',
                                    label_Detail_index1:
                                        '(' + this.moduleTitle + ')',
                                },
                                {label_index2: null, label_Detail_index2: null},
                                {label_index3: null, label_Detail_index3: null},
                                {label_index4: null, label_Detail_index4: null},
                                {label_index5: null, label_Detail_index5: null},
                                {label_index6: null, label_Detail_index6: null}
                            ];
                            this.apiGatewayService.updateApprovalDetailsBreadObject(
                                this.detailsBreadObject
                            );
                            if (this.moduleTitle.length > 22) {
                                this.widthModuleTitle = 100;
                            }
                            if (this.moduleType.length > 22) {
                                this.widthModuleType = 100;
                            }
                            if (this.moduleGroup.length > 22) {
                                this.widthModuleGroup = 100;
                            }
                        }
                        this.loading = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
        else if (this.inputModule != undefined) {
            this.moduleBase = true;
            this.moduleTitle = this.inputModule.moduleTitle;
            this.moduleType = this.inputModule.moduleType;
            this.moduleGroup = this.inputModule.moduleGroup;
            this.moduleId = this.inputModule.moduleId;
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
                    label_index1: 'ماژول',
                    rout_index1: '/module',
                    isActive1: false,
                    img_index1: 'assets/icons/module.png',
                },
                {
                    index: 2,
                    label_index2: 'سرویس',
                    rout_index2: null,
                    isActive2: true,
                    label_Detail_index2: '(' + this.moduleTitle + ')',
                    img_index2: 'assets/icons/api.png',
                },
                { label_index3: null },
                { label_index4: null },
                { label_index5: null },
                { label_index6: null },
            ];
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
            if (this.moduleTitle.length > 22) {
                this.widthModuleTitle = 100;
            }
            if (this.moduleType.length > 22) {
                this.widthModuleType = 100;
            }
            if (this.moduleGroup.length > 22) {
                this.widthModuleGroup = 100;
            }
            this.loading = true;
            debugger;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .apibymoduleinfo(
                    this.inputModule.moduleId,
                    this.pageno,
                    this.pagesize,
                    null,
                    null
                )
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.loading = false;
                        if (Array.isArray(a)) {
                            this.apiList = a;
                        } else {
                            this.apiList.push(a);
                        }
                        this.apiList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        for (let k = 0; k < this.apiList.length; k++) {
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                row: k + 1,
                            });
                            this.apiList[k].cashing_expire = this.castToDate(
                                this.apiList[k].cashing_expire
                            );
                            this.apiList[k].successData = this.apiList[
                                k
                            ].successData.map((data) => data.count);
                            this.apiList[k].unSuccessData = this.apiList[
                                k
                            ].unSuccessData.map((data) => data.count);
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                basicData: {
                                    labels: this.apiList[0].days,
                                    datasets: [
                                        {
                                            label: 'موفق',
                                            data: this.apiList[k].successData,
                                            fill: false,
                                            borderColor: '#21c57b',
                                            tension: 0.4,
                                        },
                                        {
                                            label: 'ناموفق',
                                            data: this.apiList[k].unSuccessData,
                                            fill: true,
                                            borderColor: '#ff5858',
                                            tension: 0.4,
                                        },
                                    ],
                                },
                            });
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                basicOptions: {
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                },
                            });
                        }
                        //console.log('apiList', this.apiList)
                        this.basicOptions = {
                            plugins: {
                                legend: {
                                    display: false,
                                    labels: {
                                        color: '#495057',
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: '#495057',
                                    },
                                    grid: {
                                        color: '#ebedef',
                                    },
                                    display: false,
                                },
                                y: {
                                    ticks: {
                                        color: '#495057',
                                    },
                                    grid: {
                                        color: '#ebedef',
                                    },
                                },
                            },
                        };
                        this.loading = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
        else if (this.inputModulePartyBase != undefined) {
            this.partyBase = true;
            this.api = this.inputModulePartyBase;
            this.apiGatewayService.updateApprovalModuleId(this.api.moduleId);
            this.moduleId = this.api.moduleId;
            this.loading = true;
            debugger;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .apibymoduleinfo(
                    this.api.moduleId,
                    this.pageno,
                    this.pagesize,
                    null,
                    null
                )
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.loading = false;
                        if (Array.isArray(a)) {
                            this.apiList = a;
                        } else {
                            this.apiList.push(a);
                        }
                        this.apiList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        for (let k = 0; k < this.apiList.length; k++) {
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                row: k + 1,
                            });
                            this.apiList[k].cashing_expire = this.castToDate(
                                this.apiList[k].cashing_expire
                            );
                            this.apiList[k].successData = this.apiList[
                                k
                            ].successData.map((data) => data.count);
                            this.apiList[k].unSuccessData = this.apiList[
                                k
                            ].unSuccessData.map((data) => data.count);
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                basicData: {
                                    labels: this.apiList[0].days,
                                    datasets: [
                                        {
                                            label: 'موفق',
                                            data: this.apiList[k].successData,
                                            fill: false,
                                            borderColor: '#21c57b',
                                            tension: 0.4,
                                        },
                                        {
                                            label: 'ناموفق',
                                            data: this.apiList[k].unSuccessData,
                                            fill: true,
                                            borderColor: '#ff5858',
                                            tension: 0.4,
                                        },
                                    ],
                                },
                            });
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                basicOptions: {
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                },
                            });
                        }
                        let startRow: number;
                        this.pageno != 0
                            ? (startRow = this.pageno * this.pagesize)
                            : (startRow = 0);
                        if (this.pageno != 0 && this.pagesize != 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + startRow + 1 }
                                );
                                debugger;
                            }
                        } else if (this.pageno == 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + this.pagesize + 1 }
                                );
                                debugger;
                            }
                        } else {
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + 1 }
                                );
                                debugger;
                            }
                        }
                        //console.log('apiList', this.apiList)
                        this.basicOptions = {
                            plugins: {
                                legend: {
                                    display: false,
                                    labels: {
                                        color: '#495057',
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: '#495057',
                                    },
                                    grid: {
                                        color: '#ebedef',
                                    },
                                    display: false,
                                },
                                y: {
                                    ticks: {
                                        color: '#495057',
                                    },
                                    grid: {
                                        color: '#ebedef',
                                    },
                                },
                            },
                        };
                        this.loading = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            this.moduleTitle = this.api.moduleTitle;
            this.partyTitle = this.api.partyTitle;
            this.moduleType = this.api.moduleType;
            this.moduleGroup = this.api.moduleGroup;
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
                    isActive3: true,
                    label_Detail_index3: '(' + this.moduleTitle + ')',
                    img_index3: 'assets/icons/api.png',
                },
                { label_index4: null },
                { label_index5: null },
                { label_index6: null },
            ];
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
            if (this.moduleTitle.length > 22) {
                this.widthModuleTitle = 100;
            }
            if (this.moduleType.length > 22) {
                this.widthModuleType = 100;
            }
            if (this.moduleGroup.length > 22) {
                this.widthModuleGroup = 100;
            }
        }
        /* else if (this.flagClient) {

             this.headerApi = ' سرویس های کلاینت'
             this.detailsBreadObject = [
                 {index: 0,  label_index0: "صفحه اصلی" ,img_index0: "assets/icons/home.png" , rout_index0: '/home', isActive0: false},
                 {
                     index: 1, label_index1: "کلاینت ها", rout_index1: '/client', isActive1: false,
                     img_index1: "assets/icons/client.png"
                 },
                 {
                     index: 2, label_index2: "سرویس", rout_index2: null, isActive2: true,
                     label_Detail_index2: '(' + this.clientName + ')',
                     img_index2: "assets/icons/api.png"
                 }, {label_index3: null}, {label_index4: null}, {label_index5: null}, {label_index6: null}
             ]
             this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
             this.messagesApiFacadeService.apibyclientid(Number(this.tempClientId)).subscribe(b => {
                 this.moduleId = b[0].moduleId
                 if (Array.isArray(b)) {
                     this.apiList = b

                 } else {
                     this.apiList.push(b)
                 }

                 this.apiList.map(x => (x.status === 1 ? x.status = true : x.status = false))
                 for (let k = 0; k < this.apiList.length; k++) {
                     this.apiList[k] = Object.assign(this.apiList[k], {row: (k + 1)})
                     this.apiList[k].cashing_expire = this.castToDate(this.apiList[k].cashing_expire)
                     this.apiList[k].successData = this.apiList[k].successData.map(data => data.count);
                     this.apiList[k].unSuccessData = this.apiList[k].unSuccessData.map(data => data.count);
                     this.apiList[k] = Object.assign(this.apiList[k],
                         {
                             basicData: {
                                 labels: this.apiList[0].days,
                                 datasets: [
                                     {
                                         label: 'موفق',
                                         data: this.apiList[k].successData,
                                         fill: false,
                                         borderColor: '#21c57b',
                                         tension: .4
                                     },
                                     {
                                         label: 'ناموفق',
                                         data: this.apiList[k].unSuccessData,
                                         fill: true,
                                         borderColor: '#ff5858',
                                         tension: .4
                                     }
                                 ]
                             }
                         })
                     this.apiList[k] = Object.assign(this.apiList[k],
                         {
                             basicOptions: {
                                 plugins: {
                                     legend: {
                                         display: false,
                                     }
                                 }
                             }
                         })

                 }

                 //console.log('apiList', this.apiList)
                 this.basicOptions = {
                     plugins: {
                         legend: {
                             display: false,
                             labels: {
                                 color: '#495057'
                             }
                         }
                     },
                     scales: {
                         x: {

                             ticks: {
                                 color: '#495057'
                             },
                             grid: {
                                 color: '#ebedef'
                             },
                             display: false,
                         },
                         y: {
                             ticks: {
                                 color: '#495057'
                             },
                             grid: {
                                 color: '#ebedef'
                             }
                         }
                     }
                 };
                 this.messagesApiFacadeService.SearchModuleById(Number(this.moduleId)).subscribe(h => {
                     this.moduleTitle = h.moduleTitle
                     this.moduleType = h.moduleType
                     this.moduleGroup = h.moduleGroup
                     if (this.moduleTitle.length > 22) {

                         this.widthModuleTitle = 100
                     }
                     if (this.moduleType.length > 22) {
                         this.widthModuleType = 100
                     }
                     if (this.moduleGroup.length > 22) {
                         this.widthModuleGroup = 100
                     }
                 })
             })

         }*/
    }

    showAdd() {
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto.moduleId = this.moduleId;
        this.apiDto.clientId = this.clientId;
        this.addFlag = true;
    }

    setRecord(api) {
        this.tempApi = api;
    }

    showMediators(api) {
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.flagClient;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.moduleType = this.moduleType;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.mediatorsFlag = true;
    }

    showTimeLimitation(api) {
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.flagClient;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.apiGatewayService.updateApprovalApiName(api.url);
        this.timeLimitationFlag = true;
    }

    showClientApi(api) {
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.flagClient;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.partyBase = this.partyBase;
        /*   this.apiGatewayService.updateApprovalApiId(api.apiId)
           this.apiGatewayService.updateApprovalApiName(api.name)
           this.apiGatewayService.updateApprovalApiName(api.url)*/
        this.clientApiFlag = true;
    }

    showRules(api) {
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.flagClient;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.partyBase = this.partyBase;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.apiGatewayService.updateApprovalApiName(api.url);
        this.rulFlag = true;
    }

    showApiHub(api) {
        debugger;
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.flagClient;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.partyBase = this.partyBase;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.apiGatewayService.updateApprovalApiName(api.url);
        debugger;
        this.apiHubFlag = true;
        debugger;
    }

    showChartApi(api) {
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.flagClient;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.apiGatewayService.updateApprovalApiName(api.url);
        this.chartApiFlag = true;
        this.partyTitle != undefined || this.partyTitle != null
            ? (this.apiDto.partyBase = true)
            : (this.apiDto.partyBase = false);
    }

    showHeader(api) {
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.flagClient;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.apiGatewayService.updateApprovalApiName(api.url);
        this.headerFlag = true;
        this.partyTitle != undefined || this.partyTitle != null
            ? (this.apiDto.partyBase = true)
            : (this.apiDto.partyBase = false);
    }

    showAlertClient(api) {
        this.alertClientFlag = true;
    }

    showAlertSystem(api) {
        this.alertSystemFlag = true;
    }

    showApiLog(api) {
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.flagClient;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.apiGatewayService.updateApprovalApiName(api.url);
        this.apiLogFlag = true;
        this.partyTitle != undefined || this.partyTitle != null
            ? (this.apiDto.partyBase = true)
            : (this.apiDto.partyBase = false);
    }

    showTransport(api) {
        this.errorMessage=''
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        debugger;
        this.showDialog = true;
        this._primengProgressBarService.show();

        this.messagesApiFacadeService.getApiMainCategory().subscribe(
            (p) => {
                debugger;
                this._primengProgressBarService.hide();
                this.apiMainCategories = [];
                this.apiMainCategories = p.outputData;
                this.apiMainCategories.unshift({
                    title: '-',
                    categoryId: null,
                });
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    showUpdate(api) {
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.updateFlag = true;
    }

    producedNode(api) {
        debugger;
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.flagClient;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.moduleType = this.moduleType;
        this.apiDto.sequenceBase = false;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.producedNodeFlag = true;
    }

    requiredNode(api) {
        debugger;
        this.apiDto = {
            apiId: null,
            moduleId: null,
            title: '',
            name: '',
            protocol: null,
            type: null,
            url: '',
            timeout: null,
            runningType: null,
            status: null,
            maxCall: null,
            callDuration: null,
            cashing_status: null,
            cashing_expire: '',
            description: '',
            retryCount: null,
            delayRetryCount: null,
            limitForPeriod: null,
            limitRefreshPeriod: null,
            logRequestStatus: null,
            logResponseStatus: null,
            reverseStatus: null,
            reverseCondition: null,
            cookeSendStatus: null,
            moduleBase: null,
            moduleTitle: null,
            partyTitle: null,
            clientBase: null,
            clientName: null,
            clientId: null,
            accessBase: null,
            moduleType: null,
            sequenceBase: null,
            partyBase: null,
            shenase: null,
        };
        this.apiDto = api;
        this.apiDto.moduleBase = this.moduleBase;
        this.apiDto.moduleTitle = this.moduleTitle;
        this.apiDto.partyTitle = this.partyTitle;
        this.apiDto.clientBase = this.flagClient;
        this.apiDto.clientBase = this.clientBase;
        this.apiDto.clientName = this.clientName;
        this.apiDto.clientId = this.clientId;
        this.apiDto.accessBase = this.accessBase;
        this.apiDto.moduleType = this.moduleType;
        this.apiDto.sequenceBase = false;
        this.apiGatewayService.updateApprovalApiId(api.apiId);
        this.apiGatewayService.updateApprovalApiName(api.name);
        this.requiredNodeFlag = true;
    }

    onClose(event) {
        this.scrollTop();
        if (this.clientBase) {
            this.loading = true;
            debugger;
            this.pageno = 0;
            this.pagesize = 10;
            this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.apibymoduleinfo(this.moduleId,this.pageno,this.pagesize, null, null).subscribe((a) => {
                        this._primengProgressBarService.hide();
                        this.loading = false;
                        if (Array.isArray(a)) {
                            this.apiList = a;
                        } else {
                            this.apiList.push(a);
                        }
                        this.apiList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        for (let k = 0; k < this.apiList.length; k++) {
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                row: k + 1,
                            });
                            this.apiList[k].cashing_expire = this.castToDate(
                                this.apiList[k].cashing_expire
                            );
                            this.apiList[k].successData = this.apiList[
                                k
                            ].successData.map((data) => data.count);
                            this.apiList[k].unSuccessData = this.apiList[
                                k
                            ].unSuccessData.map((data) => data.count);
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                basicData: {
                                    labels: this.apiList[0].days,
                                    datasets: [
                                        {
                                            label: 'موفق',
                                            data: this.apiList[k].successData,
                                            fill: false,
                                            borderColor: '#21c57b',
                                            tension: 0.4,
                                        },
                                        {
                                            label: 'ناموفق',
                                            data: this.apiList[k].unSuccessData,
                                            fill: true,
                                            borderColor: '#ff5858',
                                            tension: 0.4,
                                        },
                                    ],
                                },
                            });
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                basicOptions: {
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                },
                            });
                        }
                        let startRow: number;
                        this.pageno != 0
                            ? (startRow = this.pageno * this.pagesize)
                            : (startRow = 0);
                        if (this.pageno != 0 && this.pagesize != 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + startRow + 1 }
                                );
                                debugger;
                            }
                        } else if (this.pageno == 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + this.pagesize + 1 }
                                );
                                debugger;
                            }
                        } else {
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + 1 }
                                );
                                debugger;
                            }
                        }
                        //console.log('apiList', this.apiList)
                        this.basicOptions = {
                            plugins: {
                                legend: {
                                    display: false,
                                    labels: {
                                        color: '#495057',
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: '#495057',
                                    },
                                    grid: {
                                        color: '#ebedef',
                                    },
                                    display: false,
                                },
                                y: {
                                    ticks: {
                                        color: '#495057',
                                    },
                                    grid: {
                                        color: '#ebedef',
                                    },
                                },
                            },
                        };
                        this.loading = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        if (this.accessBase) {
            this.loading = true;
            debugger;
            this.pageno = 0;
            this.pagesize = 10;
            this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .apibymoduleinfo(
                    this.moduleId,
                    this.pageno,
                    this.pagesize,
                    null,
                    null
                )
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.loading = false;
                        if (Array.isArray(a)) {
                            this.apiList = a;
                        } else {
                            this.apiList.push(a);
                        }
                        this.apiList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        for (let k = 0; k < this.apiList.length; k++) {
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                row: k + 1,
                            });
                            this.apiList[k].cashing_expire = this.castToDate(
                                this.apiList[k].cashing_expire
                            );
                            this.apiList[k].successData = this.apiList[
                                k
                            ].successData.map((data) => data.count);
                            this.apiList[k].unSuccessData = this.apiList[
                                k
                            ].unSuccessData.map((data) => data.count);
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                basicData: {
                                    labels: this.apiList[0].days,
                                    datasets: [
                                        {
                                            label: 'موفق',
                                            data: this.apiList[k].successData,
                                            fill: false,
                                            borderColor: '#21c57b',
                                            tension: 0.4,
                                        },
                                        {
                                            label: 'ناموفق',
                                            data: this.apiList[k].unSuccessData,
                                            fill: true,
                                            borderColor: '#ff5858',
                                            tension: 0.4,
                                        },
                                    ],
                                },
                            });
                            /*(this.partyList[k].row = (k+1))*/
                        }
                        let startRow: number;
                        this.pageno != 0
                            ? (startRow = this.pageno * this.pagesize)
                            : (startRow = 0);
                        if (this.pageno != 0 && this.pagesize != 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + startRow + 1 }
                                );
                                debugger;
                            }
                        } else if (this.pageno == 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + this.pagesize + 1 }
                                );
                                debugger;
                            }
                        } else {
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + 1 }
                                );
                                debugger;
                            }
                        }
                        this.loading = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else if (this.inputModule != undefined) {
            this.loading = true;
            debugger;
            this.pageno = 0;
            this.pagesize = 10;
            this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .apibymoduleinfo(
                    this.inputModule.moduleId,
                    this.pageno,
                    this.pagesize,
                    null,
                    null
                )
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.loading = false;
                        if (Array.isArray(a)) {
                            this.apiList = a;
                        } else {
                            this.apiList.push(a);
                        }
                        this.apiList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        for (let k = 0; k < this.apiList.length; k++) {
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                row: k + 1,
                            });
                            this.apiList[k].cashing_expire = this.castToDate(
                                this.apiList[k].cashing_expire
                            );
                            this.apiList[k].successData = this.apiList[
                                k
                            ].successData.map((data) => data.count);
                            this.apiList[k].unSuccessData = this.apiList[
                                k
                            ].unSuccessData.map((data) => data.count);
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                basicData: {
                                    labels: this.apiList[0].days,
                                    datasets: [
                                        {
                                            label: 'موفق',
                                            data: this.apiList[k].successData,
                                            fill: false,
                                            borderColor: '#21c57b',
                                            tension: 0.4,
                                        },
                                        {
                                            label: 'ناموفق',
                                            data: this.apiList[k].unSuccessData,
                                            fill: true,
                                            borderColor: '#ff5858',
                                            tension: 0.4,
                                        },
                                    ],
                                },
                            });
                            /*(this.partyList[k].row = (k+1))*/
                        }
                        let startRow: number;
                        this.pageno != 0
                            ? (startRow = this.pageno * this.pagesize)
                            : (startRow = 0);
                        if (this.pageno != 0 && this.pagesize != 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + startRow + 1 }
                                );
                                debugger;
                            }
                        } else if (this.pageno == 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + this.pagesize + 1 }
                                );
                                debugger;
                            }
                        } else {
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + 1 }
                                );
                                debugger;
                            }
                        }
                        this.loading = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
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
                    label_index1: 'ماژول',
                    rout_index1: '/module',
                    isActive1: false,
                    img_index1: 'assets/icons/module.png',
                },
                {
                    index: 2,
                    label_index2: 'سرویس',
                    rout_index2: null,
                    isActive2: true,
                    label_Detail_index2: '(' + this.moduleTitle + ')',
                    img_index2: 'assets/icons/api.png',
                },
                { label_index3: null },
                { label_index4: null },
                { label_index5: null },
            ];
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        if (this.inputModulePartyBase != undefined) {
            this.loading = true;
            debugger;
            this.pageno = 0;
            this.pagesize = 10;
            this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .apibymoduleinfo(
                    this.api.moduleId,
                    this.pageno,
                    this.pagesize,
                    null,
                    null
                )
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.loading = false;
                        if (Array.isArray(a)) {
                            this.apiList = a;
                        } else {
                            this.apiList.push(a);
                        }
                        this.apiList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        for (let k = 0; k < this.apiList.length; k++) {
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                row: k + 1,
                            });
                            this.apiList[k].cashing_expire = this.castToDate(
                                this.apiList[k].cashing_expire
                            );
                            this.apiList[k].successData = this.apiList[
                                k
                            ].successData.map((data) => data.count);
                            this.apiList[k].unSuccessData = this.apiList[
                                k
                            ].unSuccessData.map((data) => data.count);
                            this.apiList[k] = Object.assign(this.apiList[k], {
                                basicData: {
                                    labels: this.apiList[0].days,
                                    datasets: [
                                        {
                                            label: 'موفق',
                                            data: this.apiList[k].successData,
                                            fill: false,
                                            borderColor: '#21c57b',
                                            tension: 0.4,
                                        },
                                        {
                                            label: 'ناموفق',
                                            data: this.apiList[k].unSuccessData,
                                            fill: true,
                                            borderColor: '#ff5858',
                                            tension: 0.4,
                                        },
                                    ],
                                },
                            });
                            /*(this.partyList[k].row = (k+1))*/
                        }
                        let startRow: number;
                        this.pageno != 0
                            ? (startRow = this.pageno * this.pagesize)
                            : (startRow = 0);
                        if (this.pageno != 0 && this.pagesize != 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + startRow + 1 }
                                );
                                debugger;
                            }
                        } else if (this.pageno == 1) {
                            debugger;
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + this.pagesize + 1 }
                                );
                                debugger;
                            }
                        } else {
                            for (let u = 0; u < this.apiList.length; u++) {
                                this.apiList[u] = Object.assign(
                                    this.apiList[u],
                                    { row: u + 1 }
                                );
                                debugger;
                            }
                        }
                        this.loading = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
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
                    isActive3: true,
                    label_Detail_index3: '(' + this.moduleTitle + ')',
                    img_index3: 'assets/icons/api.png',
                },
                { label_index4: null },
                { label_index5: null },
            ];
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        /* if (event == 'close') {*/
        this.addFlag = false;
        this.updateFlag = false;
        this.rulFlag = false;
        this.timeLimitationFlag = false;
        this.mediatorsFlag = false;
        this.apiLogFlag = false;
        this.chartApiFlag = false;
        this.alertSystemFlag = false;
        this.alertClientFlag = false;
        this.clientApiFlag = false;
        this.producedNodeFlag = false;
        this.requiredNodeFlag = false;
        this.sequenceFlag = false;
        this.headerFlag = false;
        this.apiHubFlag = false;
    }

    BeforeButton() {
        this.close.emit('close');
    }

    ngAfterViewInit(): void {
        this.viewportScroller.scrollToAnchor('section');
        this.router.navigate([], { fragment: 'section' });
    }
}
