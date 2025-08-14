import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { HubDto } from '../../../../../../models/hub.Dto';

import { ConfirmationService } from 'primeng/api';
import { ApiGatewayConstants } from '../../../../../../constants/ApiGatewayConstants';
import { EndpointheaderDto } from '../../../../../../models/endpointheaderDto';
import { TestSpDto } from '../../../../../../models/testSp.Dto';

import { NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { Menu } from 'primeng/menu';
import { Panel } from 'primeng/panel';
import { Ripple } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { FuseLoadingService } from '../../../../../../../../../@fuse/services/loading';
import { BreadcrumbsComponent } from '../../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Constants } from '../../../../../../../shared/constants/Constants';
import { HistoryMoreCharPipe } from '../../../../../../../shared/pipes/historyMoreChar.pipe';
import { IsApprovalPipe } from '../../../../../../../shared/pipes/isApproval.pipe';
import { ModuleTypePipe } from '../../../../../../../shared/pipes/moduleType.pipe';
import { MoreChar19Pipe } from '../../../../../../../shared/pipes/moreChar19.pipe';
import { StatusPipe } from '../../../../../../../shared/pipes/status.pipe';
import { ToastService } from '../../../../../../../shared/services/ToastService';
import { MessagesApiFacadeService } from '../../../../../../services/messages-api-facade.service';
import { MediatorsJsonComponent } from '../../../../../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../../../../../mediators/mediators.component';
import { NodeChangeListComponent } from '../../../../../node-change-list/node-change-list.component';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import {
    HeaderEndpointRegisterComponent,
} from '../../../../../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../../../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import { Password } from 'primeng/password';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { Textarea } from 'primeng/textarea';
import { Step, StepList, StepPanel, StepPanels, Stepper } from 'primeng/stepper';
import { ConditionPipe } from '../../../../../../../shared/pipes/condition.pipe';
import { DataTypeHubPipe } from '../../../../../../../shared/pipes/dataTypeHub.pipe';
import { EnStatusPipe } from '../../../../../../../shared/pipes/en-status.pipe';
import { Fieldset } from 'primeng/fieldset';
import { MessagesCategoryPipe } from '../../../../../../../shared/pipes/messagesCategory.pipe';
import { ParamTypePipe } from '../../../../../../../shared/pipes/paramType.pipe';
import { ActionTypeHubPipe } from '../../../../../../../shared/pipes/actionTypeHub.pipe';

@Component({
    selector: 'app-api-hub-attachment',
    templateUrl: './api-hub-attachment.component.html',
    styleUrls: ['./api-hub-attachment.component.scss'],
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
        Password,
        ToggleSwitch,
        Toast,
        Textarea,
        NgForOf,
        Step,
        StepList,
        StepPanel,
        StepPanels,
        Stepper,
        ConditionPipe,
        DataTypeHubPipe,
        EnStatusPipe,
        Fieldset,
        MessagesCategoryPipe,
        ParamTypePipe,
        ActionTypeHubPipe,
    ],
    providers: [ConfirmationService],
})
export class ApiHubAttachmentComponent implements OnInit {
    @Input() inputAttachApiHub;
    @Output() close = new EventEmitter<string>();
    registerEndpointHeaderDto;
    filterList = [];
    loadingButton: boolean;
    helpFlag: boolean = false;
    helpSpFlag: boolean = false;
    helpCustomQueryFlag: boolean = false;
    dbname;
    dbnameSearch;
    ip;
    ipSearch;
    port;
    user;
    password;
    hubId;
    apiDataHubId;
    rDate;
    apiId;
    type;
    title;
    titleSearch;
    icon200_val = null;
    icon400_val = null;
    icon500_val = null;
    hubTitle: string = '';
    headerHubApi: string = 'انتخاب هاب سرویس';
    lblIndex0: string = 'انتخاب هاب سرویس';
    lblIndex1: string = 'تست اتصال به دیتابیس';
    lblIndex2: string = 'انتخاب الزامات هاب';
    lblIndex3: string = 'لیست پارامتر های کوئری';
    lblIndex4: string = 'ایجاد و تست کوئری';
    lblIndex5: string = 'مدیاتور خروجی';
    lblIndex6: string = 'پیش نمایش و اتصال هاب به سرویس';
    tooltipNext = 'تست کانکشن باموفقیت انجام نشده است!';
    tooltipBack =
        'به علت اتصال سرویس به هاب امکان بازگشت به مراحل قبل وجود ندارد!';
    tooltipAttachment = 'اتصال هاب به سرویس انجام شده است!';
    tooltipTest = 'ابتدا باید کوئری پارس شود و سپس تست انجام خواهد شد!';
    nextBtn400Flag: boolean = false;
    nextBtn500Flag: boolean = false;
    nextBtn200Flag: boolean = false;
    nextFlagDisabled: boolean = false;
    backFlagDisabled: boolean = false;
    backShowFlag: boolean = false;
    nextShowFlag: boolean = true;
    FinalRegistrationFlag: boolean = false;
    resultTestQueryFlag: boolean = false;
    selectHubFlag: boolean = true;
    endpointDetailFlag: boolean = false;
    dbInfoFlag: boolean = false;
    mapingFlag: boolean = false;
    paramFlag: boolean = false;
    addFlag: boolean = false;
    addMapFlag: boolean = false;
    addSpFlag: boolean = false;
    textSqlFlag: boolean = false;
    spTestFlag: boolean = false;
    customQueryFlag: boolean = false;
    spParamFlag: boolean = false;
    customQueryParamFlag: boolean = false;
    customQueryInputFlag: boolean = false;
    previewFlag: boolean = false;
    RequirementsHub: boolean = false;
    addCusFlag: boolean = false;
    spFlag: boolean = false;
    canCommit: boolean = false;
    autoCommit: boolean = false;
    connectionPoolSize: number = 10;
    allowCreateConnectionPool: boolean = false;
    resultTestConnectionFlag: boolean = false;
    connectionSuccessFlag: boolean = false;
    connectionFailedFlag: boolean = false;
    queryFailedFlag: boolean = false;
    querySuccessFlag: boolean = false;
    message500Flag: boolean = false;
    message400Flag: boolean = false;
    message200Flag: boolean = false;
    dataTypeFlag: boolean = false;
    actionTypeFlag: boolean = false;
    downloadResultSet: boolean = false;
    attachmentDisableBTN: boolean = false;
    operationTypeId: number;
    conditionOptions = ApiGatewayConstants.conditions;
    codeMessage200='200';
    titleMessage200;
    tableIdMessage200;
    typeMessage200;
    codeMessage400='400';
    titleMessage400;
    tableIdMessage400;
    typeMessage400;
    messageId;
    codeMessage500='500';
    titleMessage500;
    tableIdMessage500;
    typeMessage500;
    textMessage400;
    textENMessage400;
    textMessage200;
    textENMessage200;
    textMessage500;
    textENMessage500;
    selectedMessageId2XX = null;
    selectedMessageId4XX = null;
    selectedMessageId5XX = null;
    statusCodeOptions200 = ApiGatewayConstants.statusCodeHub;
    statusCodeOptions400 = ApiGatewayConstants.statusCodeHub;
    statusCodeOptions500 = ApiGatewayConstants.statusCodeHub;
    categoryMessages200 = ApiGatewayConstants.categoryMessages;
    categoryMessages400 = ApiGatewayConstants.categoryMessages;
    categoryMessages500 = ApiGatewayConstants.categoryMessages;
    typeMessages400 = ApiGatewayConstants.typeMessages;
    typeMessages500 = ApiGatewayConstants.typeMessages;
    typeMessages200 = ApiGatewayConstants.typeMessages;
    nextFlag: boolean = false;
    commandTypeId: string;
    commitFlag: boolean;
    activeIndex: number = 0;
    customQuery = null;
    highlightedQuery;
    messagesList200 = [];
    messagesList400 = [];
    messagesList500 = [];
    dbEngineId;
    dbName;
    objectName;
    ipLbl;
    portLbl;
    userLbl;
    passwordLbl;
    lblObjectName = '';
    tempQuery = '';
    paramName;
    paramValue;
    inputName;
    outputName;
    dataType;
    status: boolean | number = true;
    messageId4X = null;
    messageId2X = null;
    messageId5X = null;
    isEcrypt;
    tooltipTestSp = 'جهت تست پروسیجر حداقل یک رکورد پارامتر پروسیجر لازم هست!';
    tooltipParams = 'افزودن به المان سرویس';
    aliasOutputParamName;
    successValue;
    paramType = '0';
    paramsList = [];
    tempAddParam = [];
    tempCusAddParam = [];
    paramsCustomList = [];
    paramsStaticList = [];
    nonStaticParam = [];
    spParamsList = [];
    mapList = [];
    staticAndNonStaticList = [];
    headerConfirm = 'clear params';
    tempNonList = [];
    hubAttachList = [];
    counter = 0;
    counterO = 0;
    counterOC = 0;
    counterOR = 0;
    param = '';
    templates = 'SELECT * FROM';
    hubConstants = Constants;
    matches = [];
    cusParamList = [];
    itemsHub = [
        {
            label: this.lblIndex0,
            command: (event: any) => {
                this.activeIndex = 0;
            },
        },
        {
            label: this.lblIndex1,
            command: (event: any) => {
                this.activeIndex = 1;
            },
        },
        {
            label: this.lblIndex2,
            command: (event: any) => {
                this.activeIndex = 2;
            },
        },
    ];
    LblActionType = 'ok';
    actionType;
    selectedHubList: any;
    pageno: number = 0;
    pagesize = 10;
    pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    hubList = [];
    HubAttachmentFlag: boolean = false;
    attachFlag: boolean = false;
    nextBtnFlag: boolean = false;
    loading: boolean = false;
    hubObj = {
        apiId: null,
        apiHubId: null,
        rdate: null,
        status: null,
        downloadResultSet: null,
        hubId: null,
        objectName: null,
        commandTypeId: null,
        isTestQuery: null,
        isFinal: null,
    };

    constructor(
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private confirmationService: ConfirmationService,
        private transloco: TranslocoService,
        private notifierService: ToastService,
    ) {
    }

    ngOnInit(): void {
        this.registerEndpointHeaderDto = {
            apiEndpointHeaderFlag: true,
            apiId: this.apiId,
        };
        if (this.inputAttachApiHub != undefined) {
            this.apiId = this.inputAttachApiHub.apiId;
            this.type = this.inputAttachApiHub.type;
        } else {
            // this.apiId = 221
        }

        this.hubId = null;
        switch (this.commandTypeId) {
            case '1':
                this.lblIndex0 = 'انتخاب هاب سرویس';
                this.lblIndex1 = 'تست اتصال به دیتابیس';
                this.lblIndex2 = 'لیست پارامتر های کوئری';
                this.lblIndex3 = 'ایجاد و تست کوئری';
                this.lblIndex4 = 'مدیاتور خروجی';
                this.lblIndex5 = 'پیش نمایش و اتصال هاب به سرویس';
                this.itemsHub = [
                    {
                        label: this.lblIndex0,
                        command: (event: any) => {
                            this.activeIndex = 0;
                        },
                    },
                    {
                        label: this.lblIndex1,
                        command: (event: any) => {
                            this.activeIndex = 1;
                        },
                    },
                    {
                        label: this.lblIndex2,
                        command: (event: any) => {
                            this.activeIndex = 2;
                        },
                    },
                    {
                        label: this.lblIndex3,
                        command: (event: any) => {
                            this.activeIndex = 3;
                        },
                    },
                    {
                        label: this.lblIndex4,
                        command: (event: any) => {
                            this.activeIndex = 4;
                        },
                    },
                    {
                        label: this.lblIndex5,
                        command: (event: any) => {
                            this.activeIndex = 5;
                        },
                    },
                ];
                break;
            case '2':
                this.lblIndex0 = 'انتخاب هاب سرویس';
                this.lblIndex1 = 'تست اتصال به دیتابیس';
                this.lblIndex2 = 'تعیین پارامتر های ورودی و خروجی پروسیجر';
                this.lblIndex3 = 'تست پروسیجر';
                this.lblIndex4 = 'مدیاتور خروجی';
                this.lblIndex5 = 'پیش نمایش و اتصال هاب به سرویس';
                this.itemsHub = [
                    {
                        label: this.lblIndex0,
                        command: (event: any) => {
                            this.activeIndex = 0;
                        },
                    },
                    {
                        label: this.lblIndex1,
                        command: (event: any) => {
                            this.activeIndex = 1;
                        },
                    },
                    {
                        label: this.lblIndex2,
                        command: (event: any) => {
                            this.activeIndex = 2;
                        },
                    },
                    {
                        label: this.lblIndex3,
                        command: (event: any) => {
                            this.activeIndex = 3;
                        },
                    },
                    {
                        label: this.lblIndex4,
                        command: (event: any) => {
                            this.activeIndex = 4;
                        },
                    },
                ];
                break;
            case '3':
                this.lblIndex0 = 'انتخاب هاب سرویس';
                this.lblIndex1 = 'تست اتصال به دیتابیس';
                this.lblIndex2 = 'تست کوئری';
                this.lblIndex3 = 'مدیاتور خروجی';
                this.lblIndex4 = 'پیش نمایش و اتصال هاب به سرویس';
                this.itemsHub = [
                    {
                        label: this.lblIndex0,
                        command: (event: any) => {
                            this.activeIndex = 0;
                        },
                    },
                    {
                        label: this.lblIndex1,
                        command: (event: any) => {
                            this.activeIndex = 1;
                        },
                    },
                    {
                        label: this.lblIndex2,
                        command: (event: any) => {
                            this.activeIndex = 2;
                        },
                    },
                    {
                        label: this.lblIndex3,
                        command: (event: any) => {
                            this.activeIndex = 3;
                        },
                    },
                    {
                        label: this.lblIndex4,
                        command: (event: any) => {
                            this.activeIndex = 4;
                        },
                    },
                ];
        }

        this.searchHubAttachList();
    }

    onClose(event) {
        if (event == 'close') {
            this.endpointDetailFlag = false;
        } else if (event == 'closeAndCreate') {
            this.loadSpNonStaticParams();
            this.endpointDetailFlag = false;
        }
    }

    checkDontCareAndAddEleman(e?) {
        let counter = 0;
        let counter2 = 0;
        for (let i = 0; i < this.paramsCustomList.length; i++) {
            if (
                this.paramsCustomList[i].matched == 0 &&
                this.paramsCustomList[i].actionType == '0'
            ) {
                counter++;
            }
        }
        if (counter == 0) {
            this.nextFlagDisabled = false;
        } else {
            this.tooltipNext = 'not matched params!';
            this.nextFlagDisabled = true;
        }

        for (let i = 0; i < this.paramsCustomList.length; i++) {
            if (
                this.paramsCustomList[i].detailType == undefined ||
                this.paramsCustomList[i].detailType == null
            ) {
                counter2++;
            }
        }
        if (counter2 == 0) {
            this.nextFlagDisabled = false;
        } else {
            this.tooltipNext = 'Params don\'t match registered elements!';
            this.nextFlagDisabled = true;
        }
        if (e?.value == '0') {
            this.tooltipNext = 'not matched params!';
            this.nextFlagDisabled = true;
        }
    }

    validationAttachApiHub(): boolean {
        if (!this.commandTypeId) {
            this.notifierService.showError({
                detail: 'لطفا نوع دستور را وارد نمائید! ',
            });
            return false;
        } else if (!this.objectName && !this.spFlag && !this.customQueryFlag) {
            this.notifierService.showError({
                detail: 'لطفا نام آبجکت را وارد نمائید! ',
            });
        } else if (!this.objectName && this.spFlag && !this.customQueryFlag) {
            this.notifierService.showError({
                detail: 'لطفا نام پروسیجر را وارد نمائید! ',
            });
        } else {
            return true;
        }
    }

    attachApiHub() {
        if (this.validationAttachApiHub()) {
            this.hubObj.apiId = +this.apiId;
            this.hubObj.hubId = +this.hubId;
            this.hubObj.status = 0;
            this.hubObj.objectName = this.objectName;
            this.hubObj.commandTypeId = Number(this.commandTypeId);
            this.querySuccessFlag == true
                ? (this.hubObj.isTestQuery = 1)
                : this.querySuccessFlag;
            this.queryFailedFlag == true
                ? (this.hubObj.isTestQuery = 0)
                : this.queryFailedFlag;
            this.hubObj.isFinal = 0;
            this.downloadResultSet
                ? (this.hubObj.downloadResultSet = 1)
                : (this.hubObj.downloadResultSet = 0);
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerHubAttach(this.hubObj)
                .subscribe(
                    (l) => {
                        this._primengProgressBarService.hide();
                        this.notifierService.showSuccess({
                            detail: 'عملیات با موفقیت انجام گردید!',
                            life: 3000,
                        });
                        this.apiDataHubId = l.apiHubId;
                        this.rDate = l.rdate;
                        this.nextFlagDisabled = false;
                        this.attachmentDisableBTN = true;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    },
                );
        }
    }

    onContinuation() {
        if (this.selectedHubList != undefined) {
            //   this.commandTypeId = this.selectedHubList.commandTypeId.toString()
            if (this.selectedHubList.dbEngineId) {
                this.dbEngineId = this.selectedHubList.dbEngineId.toString();
            }

            this.dbName = this.selectedHubList.dbName;
            this.hubTitle = this.selectedHubList.hubTitle;

            if (
                this.selectedHubList.messageId2X != null &&
                this.selectedHubList.messageId2X != 0
            ) {
                this.icon200_val = 'pi pi-check';
                this.messageId2X = this.selectedHubList.messageId2X;
                this.selectedMessageId2XX = this.selectedHubList;
            } else {
                this.icon200_val = null;
            }

            if (
                this.selectedHubList.messageId4X != null &&
                this.selectedHubList.messageId4X != 0
            ) {
                this.icon400_val = 'pi pi-check';
                this.messageId4X = this.selectedHubList.messageId4X;
                this.selectedMessageId4XX = this.selectedHubList;
            } else {
                this.icon400_val = null;
            }
            if (
                this.selectedHubList.messageId5X != null &&
                this.selectedHubList.messageId5X != 0
            ) {
                this.icon500_val = 'pi pi-check';
                this.messageId5X = this.selectedHubList.messageId5X;
                this.selectedMessageId5XX = this.selectedHubList;
            } else {
                this.icon500_val = null;
            }
            this.hubId = this.selectedHubList.hubId;
            this.ip = this.selectedHubList.ip;
            this.port = this.selectedHubList.portNumber;
            this.user = this.selectedHubList.userName;
            this.password = this.selectedHubList.password;
            this.connectionPoolSize = this.selectedHubList.connectionPoolSize;
            this.ipLbl = this.selectedHubList.ip + ':';
            this.portLbl = this.selectedHubList.portNumber + ';';
            this.userLbl = this.selectedHubList.userName + ';';
            //this.passwordLbl = this.selectedHubList.password + ';'
            this.passwordLbl =
                this.generateStarString(this.selectedHubList.password) + ';';
            this.selectedHubList.canCommit == 1
                ? (this.canCommit = true)
                : (this.canCommit = false);
            this.selectedHubList.autoCommit == 1
                ? (this.autoCommit = true)
                : (this.autoCommit = false);
            this.selectedHubList.allowCreateConnectionPool === 1
                ? (this.allowCreateConnectionPool = true)
                : (this.allowCreateConnectionPool = false);
            window.localStorage.setItem(
                'hubObj',
                JSON.stringify(this.selectedHubList),
            );
            // this.commandTypeId = this.selectedHubList.commandTypeId.toString()
        } else {
            this.notifierService.showError({
                detail: 'لطفا ابتدا هاب را انتخاب نمائید!',
                life: 3000,
            });
        }
        this.headerHubApi = 'فرآیند هاب سرویس';
        this.commandTypeId != '1' && this.commandTypeId != null
            ? (this.commitFlag = false)
            : (this.commitFlag = true);
        if (this.validationAttachHub()) {
            this.activeIndex != 6 ? (this.activeIndex += 1) : this.activeIndex;
            switch (this.activeIndex) {
                case 0:
                    this.RequirementsHub = false;
                    this.selectHubFlag = true;
                    this.backShowFlag = false;
                    this.nextShowFlag = true;
                    this.FinalRegistrationFlag = false;
                    this.dbInfoFlag = true;
                    this.paramFlag = false;
                    this.previewFlag = false;
                    this.nextFlagDisabled = false;
                    this.resultTestConnectionFlag = false;
                    this.addMapFlag = false;
                    this.itemsHub = [
                        {
                            label: this.lblIndex0,
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: this.lblIndex1,
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: this.lblIndex2,
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                    ];
                    this.lblIndex0 = 'انتخاب هاب سرویس';
                    this.lblIndex1 = 'تست اتصال به دیتابیس';
                    this.lblIndex2 = 'تعیین الزامات هاب';
                    break;
                case 1:
                    this.RequirementsHub = false;
                    this.selectHubFlag = false;
                    this.dbInfoFlag = true;
                    this.backShowFlag = true;
                    this.customQueryFlag = false;
                    this.textSqlFlag = true;
                    this.spFlag = false;
                    this.connectionSuccessFlag = false;
                    this.connectionSuccessFlag && this.resultTestConnectionFlag
                        ? (this.nextFlagDisabled = false)
                        : (this.nextFlagDisabled = true),
                        (this.tooltipNext =
                            'تست کانکشن با موفقیت انجام نشده است!');

                    this.addMapFlag = false;
                    this.itemsHub = [
                        {
                            label: this.lblIndex0,
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: this.lblIndex1,
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: this.lblIndex2,
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                    ];
                    this.lblIndex0 = 'انتخاب هاب سرویس';
                    this.lblIndex1 = 'تست اتصال به دیتابیس';
                    this.lblIndex2 = 'تعیین الزامات هاب';
                    break;
                case 2:
                    this.RequirementsHub = true;
                    this.selectHubFlag = false;
                    this.dbInfoFlag = false;
                    this.backShowFlag = true;
                    this.customQueryFlag = false;
                    this.textSqlFlag = false;
                    this.spFlag = false;
                    this.addMapFlag = false;
                    this.itemsHub = [
                        {
                            label: this.lblIndex0,
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: this.lblIndex1,
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: this.lblIndex2,
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                    ];
                    this.lblIndex0 = 'انتخاب هاب سرویس';
                    this.lblIndex1 = 'تست اتصال به دیتابیس';
                    this.lblIndex2 = 'تعیین الزامات هاب';
                    this.nextFlagDisabled = false;
                    this.attachmentDisableBTN
                        ? (this.nextFlagDisabled = false)
                        : (this.nextFlagDisabled = true),
                        (this.tooltipNext =
                            'الزامات هاب منتخب ثبت نگردیده است!');

                    break;
                case 3:
                    this.backFlagDisabled = false;
                    this.RequirementsHub = false;
                    this.selectHubFlag = false;
                    this.dbInfoFlag = false;
                    this.backShowFlag = true;
                    this.nextShowFlag = true;
                    this.previewFlag = false;
                    this.FinalRegistrationFlag = false;
                    this.addMapFlag = false;
                    this.nextFlagDisabled = false;

                    if (this.commandTypeId == '1') {
                        this.lblIndex0 = 'انتخاب هاب سرویس';
                        this.lblIndex1 = 'تست اتصال به دیتابیس';
                        this.lblIndex2 = 'تعیین الزامات هاب';
                        this.lblIndex3 = 'لیست پارامتر های کوئری';
                        this.lblIndex4 = 'ایجاد و تست کوئری';
                        this.lblIndex5 = 'مدیاتور خروجی';
                        this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                        this.selectedHubList.objectName
                            ? (this.objectName =
                                this.selectedHubList.objectName)
                            : this.objectName;
                        this.paramFlag = true;
                        this.addFlag = true;
                        this.itemsHub = [
                            {
                                label: this.lblIndex0,
                                command: (event: any) => {
                                    this.activeIndex = 0;
                                },
                            },
                            {
                                label: this.lblIndex1,
                                command: (event: any) => {
                                    this.activeIndex = 1;
                                },
                            },
                            {
                                label: this.lblIndex2,
                                command: (event: any) => {
                                    this.activeIndex = 2;
                                },
                            },
                            {
                                label: this.lblIndex3,
                                command: (event: any) => {
                                    this.activeIndex = 3;
                                },
                            },
                            {
                                label: this.lblIndex4,
                                command: (event: any) => {
                                    this.activeIndex = 4;
                                },
                            },
                            {
                                label: this.lblIndex5,
                                command: (event: any) => {
                                    this.activeIndex = 5;
                                },
                            },
                            {
                                label: this.lblIndex6,
                                command: (event: any) => {
                                    this.activeIndex = 6;
                                },
                            },
                        ];
                        /* if (this.tempAddParam.length>0){
                             const updatedArray2 = this.tempAddParam.map(item2 => {
                                 const matchingItem = this.paramsList.find(item1 => {
                                         item1.endpointDetailId === item2.endpointDetailId
                                     }
                                 );
                                 if (matchingItem) {
                                     return {
                                         ...item2,
                                         paramValue: matchingItem.paramValue,
                                         operationTypeId: matchingItem.operationTypeId,
                                         disabled:true
                                     };
                                 }
                                 return item2;
                             });
                             this.paramsList=[]


                             // Create a map to group by paramName
                             const grouped = new Map();

                             // Iterate over the data array
                             updatedArray2.forEach(item => {
                                 if (grouped.has(item.paramName)) {
                                     // If paramName already exists, combine data
                                     const existingItem = grouped.get(item.paramName);
                                     // Merge the two objects (you can modify this merging erroric based on your requirements)
                                     for (const key in item) {
                                         if (key !== 'paramName' && key !== 'row') {
                                             // Merge properties from the current item if they are different or undefined in the existing item
                                             existingItem[key] = item[key] ?? existingItem[key];
                                         }
                                     }
                                 } else {
                                     // If paramName doesn't exist, add the item to the map
                                     grouped.set(item.paramName, { ...item });
                                 }
                             });

 // Convert the grouped map back to an array
                             const mergedArray = Array.from(grouped.values());
                             this.paramsList = mergedArray
                             console.error(mergedArray);
                             this.tempAddParam=this.paramsList
                         }*/
                    } else if (this.commandTypeId == '2') {
                        this.lblIndex3 =
                            'تعیین پارامتر های ورودی و خروجی پروسیجر';
                        this.lblIndex4 = 'تست پروسیجر';
                        this.lblIndex5 = 'مدیاتور خروجی';
                        this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                        this.selectedHubList.objectName
                            ? (this.objectName =
                                this.selectedHubList.objectName)
                            : this.objectName;
                        this.commitFlag = true;
                        this.spParamFlag = true;
                        this.spFlag = true;
                        this.customQueryFlag = false;
                        this.textSqlFlag = false;
                        this.spTestFlag = false;
                        this.addSpFlag = true;
                        if (this.spParamsList.length == 0) {
                            this.loadSpNonStaticParams();
                        }
                        this.itemsHub = [
                            {
                                label: this.lblIndex0,
                                command: (event: any) => {
                                    this.activeIndex = 0;
                                },
                            },
                            {
                                label: this.lblIndex1,
                                command: (event: any) => {
                                    this.activeIndex = 1;
                                },
                            },
                            {
                                label: this.lblIndex2,
                                command: (event: any) => {
                                    this.activeIndex = 2;
                                },
                            },
                            {
                                label: this.lblIndex3,
                                command: (event: any) => {
                                    this.activeIndex = 3;
                                },
                            },
                            {
                                label: this.lblIndex4,
                                command: (event: any) => {
                                    this.activeIndex = 4;
                                },
                            },
                            {
                                label: this.lblIndex5,
                                command: (event: any) => {
                                    this.activeIndex = 5;
                                },
                            },
                            {
                                label: this.lblIndex6,
                                command: (event: any) => {
                                    this.activeIndex = 6;
                                },
                            },
                        ];
                    } else if (this.commandTypeId == '3') {
                        this.lblIndex3 = 'لیست پارامتر های کوئری';
                        this.lblIndex4 = 'تست کوئری';
                        this.lblIndex5 = 'پیش نمایش و اتصال هاب به سرویس';
                        this.customQueryFlag = true;
                        this.textSqlFlag = false;
                        this.spFlag = false;
                        this.backShowFlag = true;
                        this.nextShowFlag = true;
                        this.selectHubFlag = false;
                        this.FinalRegistrationFlag = false;
                        this.customQueryParamFlag = true;
                        this.customQueryInputFlag = true;
                        this.addCusFlag = true;
                        this.dbInfoFlag = false;
                        this.mapingFlag = false;
                        this.addMapFlag = false;

                        /*   if (this.tempCusAddParam.length>0){
                               const updatedArray2 = this.tempCusAddParam.map(item2 => {
                                   const matchingItem = this.paramsCustomList.find(item1 => {
                                           item1.endpointDetailId === item2.endpointDetailId
                                       }
                                   );
                                   if (matchingItem) {
                                       return {
                                           ...item2,
                                           paramValue: matchingItem.paramValue,
                                           operationTypeId: matchingItem.operationTypeId,
                                           disabled:true
                                       };
                                   }
                                   return item2;
                               });
                               this.paramsList=[]


                               // Create a map to group by paramName
                               const grouped = new Map();

                               // Iterate over the data array
                               updatedArray2.forEach(item => {
                                   if (grouped.has(item.paramName)) {
                                       // If paramName already exists, combine data
                                       const existingItem = grouped.get(item.paramName);
                                       // Merge the two objects (you can modify this merging erroric based on your requirements)
                                       for (const key in item) {
                                           if (key !== 'paramName' && key !== 'row') {
                                               // Merge properties from the current item if they are different or undefined in the existing item
                                               existingItem[key] = item[key] ?? existingItem[key];
                                           }
                                       }
                                   } else {
                                       // If paramName doesn't exist, add the item to the map
                                       grouped.set(item.paramName, { ...item });
                                   }
                               });

   // Convert the grouped map back to an array
                               const mergedArray = Array.from(grouped.values());
                               this.paramsCustomList = mergedArray
                               console.error(mergedArray);
                               this.tempCusAddParam=this.paramsCustomList
                           }*/

                        this.itemsHub = [
                            {
                                label: this.lblIndex0,
                                command: (event: any) => {
                                    this.activeIndex = 0;
                                },
                            },
                            {
                                label: this.lblIndex1,
                                command: (event: any) => {
                                    this.activeIndex = 1;
                                },
                            },
                            {
                                label: this.lblIndex2,
                                command: (event: any) => {
                                    this.activeIndex = 2;
                                },
                            },
                            {
                                label: this.lblIndex3,
                                command: (event: any) => {
                                    this.activeIndex = 3;
                                },
                            },
                            {
                                label: this.lblIndex4,
                                command: (event: any) => {
                                    this.activeIndex = 4;
                                },
                            },
                            {
                                label: this.lblIndex5,
                                command: (event: any) => {
                                    this.activeIndex = 5;
                                },
                            },
                        ];
                    }

                    break;
                case 4:
                    this.backFlagDisabled = false;
                    if (this.commandTypeId == '1') {
                        this.lblIndex0 = 'انتخاب هاب سرویس';
                        this.lblIndex1 = 'تست اتصال به دیتابیس';
                        this.lblIndex2 = 'تعیین الزامات هاب';
                        this.lblIndex3 = 'لیست پارامتر های کوئری';
                        this.lblIndex4 = 'ایجاد و تست کوئری';
                        this.lblIndex5 = 'مدیاتور خروجی';
                        this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                        this.itemsHub = [
                            {
                                label: this.lblIndex0,
                                command: (event: any) => {
                                    this.activeIndex = 0;
                                },
                            },
                            {
                                label: this.lblIndex1,
                                command: (event: any) => {
                                    this.activeIndex = 1;
                                },
                            },
                            {
                                label: this.lblIndex2,
                                command: (event: any) => {
                                    this.activeIndex = 2;
                                },
                            },
                            {
                                label: this.lblIndex3,
                                command: (event: any) => {
                                    this.activeIndex = 3;
                                },
                            },
                            {
                                label: this.lblIndex4,
                                command: (event: any) => {
                                    this.activeIndex = 4;
                                },
                            },
                            {
                                label: this.lblIndex5,
                                command: (event: any) => {
                                    this.activeIndex = 5;
                                },
                            },
                            {
                                label: this.lblIndex6,
                                command: (event: any) => {
                                    this.activeIndex = 6;
                                },
                            },
                        ];
                        if (this.paramsList.length > 0) {
                            for (let i = 0; i < this.paramsList.length; i++) {
                                /* let counter = 0
                                for (let i = 0; i < this.paramsList.length; i++) {
                                    if (this.paramsList[i].detailType == undefined || this.paramsList[i].detailType == null) {
                                        counter++
                                    }
                                }
                                if (counter > 0) {
                                    // this.headerConfirm=
                                    this.confirmDialog('ignoreParams')
                                }*/
                                if (
                                    this.paramsList[i].paramValue != undefined
                                ) {
                                    if (
                                        this.paramsList[i].paramValue != null &&
                                        this.paramsList[i].paramValue != ''
                                    ) {
                                        this.paramFlag = true;
                                        this.backShowFlag = true;
                                        this.nextShowFlag = true;
                                        this.selectHubFlag = false;
                                        this.dbInfoFlag = false;
                                        this.addFlag = false;
                                        this.previewFlag = false;
                                        this.FinalRegistrationFlag = false;
                                        this.addMapFlag = false;
                                        this.querySuccessFlag &&
                                        this.resultTestQueryFlag
                                            ? (this.nextFlagDisabled = false)
                                            : (this.nextFlagDisabled = true),
                                            (this.tooltipNext =
                                                'تست کوئری با موفقیت انجام نشده است!');
                                        this.itemsHub = [
                                            {
                                                label: this.lblIndex0,
                                                command: (event: any) => {
                                                    this.activeIndex = 0;
                                                },
                                            },
                                            {
                                                label: this.lblIndex1,
                                                command: (event: any) => {
                                                    this.activeIndex = 1;
                                                },
                                            },
                                            {
                                                label: this.lblIndex2,
                                                command: (event: any) => {
                                                    this.activeIndex = 2;
                                                },
                                            },
                                            {
                                                label: this.lblIndex3,
                                                command: (event: any) => {
                                                    this.activeIndex = 3;
                                                },
                                            },
                                            {
                                                label: this.lblIndex4,
                                                command: (event: any) => {
                                                    this.activeIndex = 4;
                                                },
                                            },
                                            {
                                                label: this.lblIndex5,
                                                command: (event: any) => {
                                                    this.activeIndex = 5;
                                                },
                                            },
                                            {
                                                label: this.lblIndex6,
                                                command: (event: any) => {
                                                    this.activeIndex = 6;
                                                },
                                            },
                                        ];
                                    } else {
                                        this.activeIndex = 3;
                                        this.nextFlagDisabled = false;
                                        this.notifierService.showError({
                                            detail: 'paramValue را لطفا وارد نمائید!',
                                            life: 3000,
                                        });
                                        this.paramFlag = true;
                                        this.selectHubFlag = false;
                                        this.backShowFlag = true;
                                        this.nextShowFlag = true;
                                        this.dbInfoFlag = false;
                                        this.addFlag = true;
                                        this.previewFlag = false;
                                        this.FinalRegistrationFlag = false;
                                        this.addMapFlag = false;
                                        this.itemsHub = [
                                            {
                                                label: this.lblIndex0,
                                                command: (event: any) => {
                                                    this.activeIndex = 0;
                                                },
                                            },
                                            {
                                                label: this.lblIndex1,
                                                command: (event: any) => {
                                                    this.activeIndex = 1;
                                                },
                                            },
                                            {
                                                label: this.lblIndex2,
                                                command: (event: any) => {
                                                    this.activeIndex = 2;
                                                },
                                            },
                                            {
                                                label: this.lblIndex3,
                                                command: (event: any) => {
                                                    this.activeIndex = 3;
                                                },
                                            },
                                            {
                                                label: this.lblIndex4,
                                                command: (event: any) => {
                                                    this.activeIndex = 4;
                                                },
                                            },
                                            {
                                                label: this.lblIndex5,
                                                command: (event: any) => {
                                                    this.activeIndex = 5;
                                                },
                                            },
                                            {
                                                label: this.lblIndex6,
                                                command: (event: any) => {
                                                    this.activeIndex = 6;
                                                },
                                            },
                                        ];
                                    }
                                } else {
                                    this.notifierService.showError({
                                        detail: 'paramValue را لطفا وارد نمائید!',
                                        life: 3000,
                                    });
                                    this.activeIndex = 3;
                                    this.paramFlag = true;
                                    this.selectHubFlag = false;
                                    this.backShowFlag = true;
                                    this.nextShowFlag = true;
                                    this.dbInfoFlag = false;
                                    this.addFlag = true;
                                    this.previewFlag = false;
                                    this.FinalRegistrationFlag = false;
                                    this.addMapFlag = false;
                                    this.itemsHub = [
                                        {
                                            label: this.lblIndex0,
                                            command: (event: any) => {
                                                this.activeIndex = 0;
                                            },
                                        },
                                        {
                                            label: this.lblIndex1,
                                            command: (event: any) => {
                                                this.activeIndex = 1;
                                            },
                                        },
                                        {
                                            label: this.lblIndex2,
                                            command: (event: any) => {
                                                this.activeIndex = 2;
                                            },
                                        },
                                        {
                                            label: this.lblIndex3,
                                            command: (event: any) => {
                                                this.activeIndex = 3;
                                            },
                                        },
                                        {
                                            label: this.lblIndex4,
                                            command: (event: any) => {
                                                this.activeIndex = 4;
                                            },
                                        },
                                        {
                                            label: this.lblIndex5,
                                            command: (event: any) => {
                                                this.activeIndex = 5;
                                            },
                                        },
                                        {
                                            label: this.lblIndex6,
                                            command: (event: any) => {
                                                this.activeIndex = 6;
                                            },
                                        },
                                    ];
                                }
                            }
                        } else {
                            this.paramFlag = true;
                            this.backShowFlag = true;
                            this.nextShowFlag = true;
                            this.selectHubFlag = false;
                            this.dbInfoFlag = false;
                            this.addFlag = false;
                            this.previewFlag = false;
                            this.FinalRegistrationFlag = false;
                            this.addMapFlag = false;
                            this.querySuccessFlag && this.resultTestQueryFlag
                                ? (this.nextFlagDisabled = false)
                                : (this.nextFlagDisabled = true),
                                (this.tooltipNext =
                                    'تست کوئری با موفقیت انجام نشده است!');
                            this.itemsHub = [
                                {
                                    label: this.lblIndex0,
                                    command: (event: any) => {
                                        this.activeIndex = 0;
                                    },
                                },
                                {
                                    label: this.lblIndex1,
                                    command: (event: any) => {
                                        this.activeIndex = 1;
                                    },
                                },
                                {
                                    label: this.lblIndex2,
                                    command: (event: any) => {
                                        this.activeIndex = 2;
                                    },
                                },
                                {
                                    label: this.lblIndex3,
                                    command: (event: any) => {
                                        this.activeIndex = 3;
                                    },
                                },
                                {
                                    label: this.lblIndex4,
                                    command: (event: any) => {
                                        this.activeIndex = 4;
                                    },
                                },
                                {
                                    label: this.lblIndex5,
                                    command: (event: any) => {
                                        this.activeIndex = 5;
                                    },
                                },
                                {
                                    label: this.lblIndex6,
                                    command: (event: any) => {
                                        this.activeIndex = 6;
                                    },
                                },
                            ];
                        }
                    } else if (this.commandTypeId == '2') {
                        this.lblIndex3 =
                            'تعیین پارامتر های ورودی و خروجی پروسیجر';
                        this.lblIndex4 = 'تست پروسیجر';
                        this.lblIndex5 = 'مدیاتور خروجی';
                        this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                        this.itemsHub = [
                            {
                                label: this.lblIndex0,
                                command: (event: any) => {
                                    this.activeIndex = 0;
                                },
                            },
                            {
                                label: this.lblIndex1,
                                command: (event: any) => {
                                    this.activeIndex = 1;
                                },
                            },
                            {
                                label: this.lblIndex2,
                                command: (event: any) => {
                                    this.activeIndex = 2;
                                },
                            },
                            {
                                label: this.lblIndex3,
                                command: (event: any) => {
                                    this.activeIndex = 3;
                                },
                            },
                            {
                                label: this.lblIndex4,
                                command: (event: any) => {
                                    this.activeIndex = 4;
                                },
                            },
                            {
                                label: this.lblIndex5,
                                command: (event: any) => {
                                    this.activeIndex = 5;
                                },
                            },
                            {
                                label: this.lblIndex6,
                                command: (event: any) => {
                                    this.activeIndex = 6;
                                },
                            },
                        ];
                        this.backShowFlag = true;
                        this.nextShowFlag = true;
                        this.selectHubFlag = false;
                        this.spParamFlag = true;
                        this.dbInfoFlag = false;
                        this.spFlag = true;
                        this.addSpFlag = false;
                        this.previewFlag = false;
                        this.customQueryFlag = false;
                        this.textSqlFlag = false;
                        this.spTestFlag = true;
                        this.addMapFlag = false;
                        this.querySuccessFlag && this.resultTestQueryFlag
                            ? (this.nextFlagDisabled = false)
                            : (this.nextFlagDisabled = true),
                            (this.tooltipNext =
                                'تست پروسیجر با موفقیت انجام نشده است!');
                        this.FinalRegistrationFlag = false;
                    } else if (this.commandTypeId == '3') {
                        this.lblIndex3 = 'لیست پارامتر های کوئری';
                        this.lblIndex4 = 'تست کوئری';
                        this.lblIndex5 = 'پیش نمایش و اتصال هاب به سرویس';
                        this.itemsHub = [
                            {
                                label: this.lblIndex0,
                                command: (event: any) => {
                                    this.activeIndex = 0;
                                },
                            },
                            {
                                label: this.lblIndex1,
                                command: (event: any) => {
                                    this.activeIndex = 1;
                                },
                            },
                            {
                                label: this.lblIndex2,
                                command: (event: any) => {
                                    this.activeIndex = 2;
                                },
                            },
                            {
                                label: this.lblIndex3,
                                command: (event: any) => {
                                    this.activeIndex = 3;
                                },
                            },
                            {
                                label: this.lblIndex4,
                                command: (event: any) => {
                                    this.activeIndex = 4;
                                },
                            },
                            {
                                label: this.lblIndex5,
                                command: (event: any) => {
                                    this.activeIndex = 5;
                                },
                            },
                        ];
                        this.nextFlagDisabled = false;
                        this.customQueryFlag = true;
                        this.textSqlFlag = false;
                        this.spFlag = false;
                        this.backShowFlag = true;
                        this.nextShowFlag = true;
                        this.selectHubFlag = false;
                        this.FinalRegistrationFlag = false;
                        this.customQueryParamFlag = true;
                        this.customQueryInputFlag = true;
                        this.addCusFlag = false;
                        this.dbInfoFlag = false;
                        this.mapingFlag = false;
                        this.addMapFlag = false;
                        this.nextFlagDisabled = true;
                        !this.queryFailedFlag && this.resultTestQueryFlag
                            ? (this.nextFlagDisabled = false)
                            : ((this.nextFlagDisabled = true),
                                (this.tooltipNext =
                                    'تست کوئری با موفقیت انجام نشده است!'));
                    }
                    this.activeIndex -= 1;
                    this.RequirementsHub = false;
                    if (this.paramsList.length > 0) {
                        let tempValid = false;
                        for (let i = 0; i < this.paramsList.length; i++) {
                            this.paramsList[i].paramValue == undefined
                                ? (tempValid = false)
                                : (tempValid = true);
                            this.paramsList[i].paramValue == ''
                                ? (tempValid = false)
                                : (tempValid = true);
                            if (this.paramsList[i].paramValue != undefined) {
                                if (
                                    this.paramsList[i].paramValue != null &&
                                    this.paramsList[i].paramValue != ''
                                ) {
                                    this.paramFlag = true;
                                    this.backShowFlag = true;
                                    this.nextShowFlag = true;
                                    this.selectHubFlag = false;
                                    this.dbInfoFlag = false;
                                    this.addFlag = false;
                                    this.previewFlag = false;
                                    this.FinalRegistrationFlag = false;
                                    this.addMapFlag = false;
                                    this.querySuccessFlag &&
                                    this.resultTestQueryFlag
                                        ? (this.nextFlagDisabled = false)
                                        : (this.nextFlagDisabled = true),
                                        (this.tooltipNext =
                                            'تست کوئری با موفقیت انجام نشده است!');
                                }
                            }
                        }
                        if (tempValid) {
                            this.activeIndex += 1;
                        } else {
                            this.notifierService.showError({
                                detail: 'لطفا paramValue را وارد نمائید ! ',
                            });
                        }
                    } else {
                        this.activeIndex += 1;
                    }
                    break;
                case 5:
                    this.backFlagDisabled = false;
                    if (this.commandTypeId == '1') {
                        this.lblIndex0 = 'انتخاب هاب سرویس';
                        this.lblIndex1 = 'تست اتصال به دیتابیس';
                        this.lblIndex2 = 'تعیین الزامات هاب';
                        this.lblIndex3 = 'لیست پارامتر های کوئری';
                        this.lblIndex4 = 'ایجاد و تست کوئری';
                        this.lblIndex5 = 'مدیاتور خروجی';
                        this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                        this.RequirementsHub = false;
                        this.mapingFlag = true;
                        this.paramFlag = false;
                        this.spParamFlag = false;
                        this.customQueryParamFlag = false;
                        this.resultTestConnectionFlag = false;
                        this.addFlag = false;
                        this.backShowFlag = true;
                        this.nextShowFlag = true;
                        this.selectHubFlag = false;
                        this.dbInfoFlag = false;
                        this.previewFlag = false;
                        this.resultTestQueryFlag = false;
                        this.FinalRegistrationFlag = false;
                        this.addMapFlag = true;
                        this.nextFlagDisabled = false;
                        this.itemsHub = [
                            {
                                label: this.lblIndex0,
                                command: (event: any) => {
                                    this.activeIndex = 0;
                                },
                            },
                            {
                                label: this.lblIndex1,
                                command: (event: any) => {
                                    this.activeIndex = 1;
                                },
                            },
                            {
                                label: this.lblIndex2,
                                command: (event: any) => {
                                    this.activeIndex = 2;
                                },
                            },
                            {
                                label: this.lblIndex3,
                                command: (event: any) => {
                                    this.activeIndex = 3;
                                },
                            },
                            {
                                label: this.lblIndex4,
                                command: (event: any) => {
                                    this.activeIndex = 4;
                                },
                            },
                            {
                                label: this.lblIndex5,
                                command: (event: any) => {
                                    this.activeIndex = 5;
                                },
                            },
                            {
                                label: this.lblIndex6,
                                command: (event: any) => {
                                    this.activeIndex = 6;
                                },
                            },
                        ];
                    } else if (this.commandTypeId == '2') {
                        this.lblIndex3 =
                            'تعیین پارامتر های ورودی و خروجی پروسیجر';
                        this.lblIndex4 = 'تست پروسیجر';
                        this.lblIndex5 = 'مدیاتور خروجی';
                        this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                        this.RequirementsHub = false;
                        this.mapingFlag = true;
                        this.paramFlag = false;
                        this.spParamFlag = false;
                        this.customQueryParamFlag = false;
                        this.resultTestConnectionFlag = false;
                        this.addFlag = false;
                        this.backShowFlag = true;
                        this.nextShowFlag = true;
                        this.selectHubFlag = false;
                        this.dbInfoFlag = false;
                        this.previewFlag = false;
                        this.resultTestQueryFlag = false;
                        this.FinalRegistrationFlag = false;
                        this.addMapFlag = true;
                        this.nextFlagDisabled = false;
                        this.itemsHub = [
                            {
                                label: this.lblIndex0,
                                command: (event: any) => {
                                    this.activeIndex = 0;
                                },
                            },
                            {
                                label: this.lblIndex1,
                                command: (event: any) => {
                                    this.activeIndex = 1;
                                },
                            },
                            {
                                label: this.lblIndex2,
                                command: (event: any) => {
                                    this.activeIndex = 2;
                                },
                            },
                            {
                                label: this.lblIndex3,
                                command: (event: any) => {
                                    this.activeIndex = 3;
                                },
                            },
                            {
                                label: this.lblIndex4,
                                command: (event: any) => {
                                    this.activeIndex = 4;
                                },
                            },
                            {
                                label: this.lblIndex5,
                                command: (event: any) => {
                                    this.activeIndex = 5;
                                },
                            },
                            {
                                label: this.lblIndex6,
                                command: (event: any) => {
                                    this.activeIndex = 6;
                                },
                            },
                        ];
                    } else if (this.commandTypeId == '3') {
                        this.lblIndex3 = 'لیست پارامتر های کوئری';
                        this.lblIndex4 = 'تست کوئری';
                        this.lblIndex5 = 'پیش نمایش و اتصال هاب به سرویس';
                        this.customQueryParamFlag = true;
                        this.mapingFlag = true;
                        this.resultTestConnectionFlag = true;
                        this.resultTestQueryFlag = true;
                        this.addFlag = false;
                        this.addMapFlag = false;
                        this.backShowFlag = true;
                        this.nextShowFlag = false;
                        this.selectHubFlag = false;
                        this.dbInfoFlag = true;
                        this.previewFlag = true;
                        this.FinalRegistrationFlag = true;
                        this.itemsHub = [
                            {
                                label: this.lblIndex0,
                                command: (event: any) => {
                                    this.activeIndex = 0;
                                },
                            },
                            {
                                label: this.lblIndex1,
                                command: (event: any) => {
                                    this.activeIndex = 1;
                                },
                            },
                            {
                                label: this.lblIndex2,
                                command: (event: any) => {
                                    this.activeIndex = 2;
                                },
                            },
                            {
                                label: this.lblIndex3,
                                command: (event: any) => {
                                    this.activeIndex = 3;
                                },
                            },
                            {
                                label: this.lblIndex4,
                                command: (event: any) => {
                                    this.activeIndex = 4;
                                },
                            },
                            {
                                label: this.lblIndex5,
                                command: (event: any) => {
                                    this.activeIndex = 5;
                                },
                            },
                        ];
                        break;
                    }

                    break;
                case 6:
                    this.backFlagDisabled = false;

                    this.previewFlag = true;
                    if (this.commandTypeId == '1') {
                        this.lblIndex0 = 'انتخاب هاب سرویس';
                        this.lblIndex1 = 'تست اتصال به دیتابیس';
                        this.lblIndex2 = 'تعیین الزامات هاب';
                        this.lblIndex3 = 'لیست پارامتر های کوئری';
                        this.lblIndex4 = 'ایجاد و تست کوئری';
                        this.lblIndex5 = 'مدیاتور خروجی';
                        this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                        this.paramFlag = true;
                        this.RequirementsHub = false;
                        this.selectHubFlag = false;
                        this.dbInfoFlag = true;
                        this.resultTestQueryFlag = true;
                        this.resultTestConnectionFlag = true;
                        this.nextShowFlag = false;
                        this.addMapFlag = false;

                        this.FinalRegistrationFlag = true;
                    } else if (this.commandTypeId == '2') {
                        this.lblIndex3 =
                            'تعیین پارامتر های ورودی و خروجی پروسیجر';
                        this.lblIndex4 = 'تست پروسیجر';
                        this.lblIndex5 = 'مدیاتور خروجی';
                        this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                        this.spParamFlag = true;
                        this.addSpFlag = false;
                        this.RequirementsHub = false;
                        this.selectHubFlag = false;
                        this.dbInfoFlag = true;
                        this.resultTestQueryFlag = true;
                        this.resultTestConnectionFlag = true;
                        this.FinalRegistrationFlag = true;
                        this.nextShowFlag = false;
                        this.addMapFlag = false;
                    } else if (this.commandTypeId == '3') {
                        this.addMapFlag = false;
                        this.nextShowFlag = false;
                        this.resultTestQueryFlag = true;
                        this.resultTestConnectionFlag = true;
                        this.FinalRegistrationFlag = true;
                        this.RequirementsHub = false;
                        this.selectHubFlag = false;
                        this.dbInfoFlag = true;
                    }
            }
        }
    }

    back() {
        this.activeIndex != 0 ? (this.activeIndex -= 1) : this.activeIndex;
        this.activeIndex != 0
            ? (this.backShowFlag = true)
            : (this.backShowFlag = false);
        switch (this.activeIndex) {
            case 6:
                this.backFlagDisabled = false;
                if (this.commandTypeId == '1') {
                    this.lblIndex0 = 'انتخاب هاب سرویس';
                    this.lblIndex1 = 'تست اتصال به دیتابیس';
                    this.lblIndex2 = 'تعیین الزامات هاب';
                    this.lblIndex3 = 'لیست پارامتر های کوئری';
                    this.lblIndex4 = 'ایجاد و تست کوئری';
                    this.lblIndex5 = 'مدیاتور خروجی';
                    this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                    this.itemsHub = [
                        {
                            label: this.lblIndex0,
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: this.lblIndex1,
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: this.lblIndex2,
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                        {
                            label: this.lblIndex3,
                            command: (event: any) => {
                                this.activeIndex = 3;
                            },
                        },
                        {
                            label: this.lblIndex4,
                            command: (event: any) => {
                                this.activeIndex = 4;
                            },
                        },
                        {
                            label: this.lblIndex5,
                            command: (event: any) => {
                                this.activeIndex = 5;
                            },
                        },
                        {
                            label: this.lblIndex6,
                            command: (event: any) => {
                                this.activeIndex = 6;
                            },
                        },
                    ];
                } else if (this.commandTypeId == '2') {
                    this.lblIndex3 = 'تعیین پارامتر های ورودی و خروجی پروسیجر';
                    this.lblIndex4 = 'تست پروسیجر';
                    this.lblIndex5 = 'مدیاتور خروجی';
                    this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                    this.itemsHub = [
                        {
                            label: this.lblIndex0,
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: this.lblIndex1,
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: this.lblIndex2,
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                        {
                            label: this.lblIndex3,
                            command: (event: any) => {
                                this.activeIndex = 3;
                            },
                        },
                        {
                            label: this.lblIndex4,
                            command: (event: any) => {
                                this.activeIndex = 4;
                            },
                        },
                        {
                            label: this.lblIndex5,
                            command: (event: any) => {
                                this.activeIndex = 5;
                            },
                        },
                        {
                            label: this.lblIndex6,
                            command: (event: any) => {
                                this.activeIndex = 6;
                            },
                        },
                    ];
                } else if (this.commandTypeId == '3') {
                    this.lblIndex3 = 'لیست پارامتر های کوئری';
                    this.lblIndex4 = 'تست کوئری';
                    this.lblIndex5 = 'پیش نمایش و اتصال هاب به سرویس';
                    this.itemsHub = [
                        {
                            label: this.lblIndex0,
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: this.lblIndex1,
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: this.lblIndex2,
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                        {
                            label: this.lblIndex3,
                            command: (event: any) => {
                                this.activeIndex = 3;
                            },
                        },
                        {
                            label: this.lblIndex4,
                            command: (event: any) => {
                                this.activeIndex = 4;
                            },
                        },
                        {
                            label: this.lblIndex5,
                            command: (event: any) => {
                                this.activeIndex = 5;
                            },
                        },
                    ];
                }
                this.FinalRegistrationFlag = true;
                this.mapingFlag = true;
                this.paramFlag = true;
                this.resultTestConnectionFlag = true;
                this.resultTestQueryFlag = true;
                this.addFlag = false;
                this.backShowFlag = true;
                this.nextShowFlag = false;
                this.selectHubFlag = false;
                this.dbInfoFlag = true;
                this.previewFlag = true;
                this.FinalRegistrationFlag = true;
                this.addMapFlag = false;
                this.RequirementsHub = false;
                break;
            case 5:
                this.backFlagDisabled = false;
                if (this.commandTypeId == '1') {
                    this.lblIndex0 = 'انتخاب هاب سرویس';
                    this.lblIndex1 = 'تست اتصال به دیتابیس';
                    this.lblIndex2 = 'تعیین الزامات هاب';
                    this.lblIndex3 = 'لیست پارامتر های کوئری';
                    this.lblIndex4 = 'ایجاد و تست کوئری';
                    this.lblIndex5 = 'مدیاتور خروجی';
                    this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                    this.itemsHub = [
                        {
                            label: this.lblIndex0,
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: this.lblIndex1,
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: this.lblIndex2,
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                        {
                            label: this.lblIndex3,
                            command: (event: any) => {
                                this.activeIndex = 3;
                            },
                        },
                        {
                            label: this.lblIndex4,
                            command: (event: any) => {
                                this.activeIndex = 4;
                            },
                        },
                        {
                            label: this.lblIndex5,
                            command: (event: any) => {
                                this.activeIndex = 5;
                            },
                        },
                        {
                            label: this.lblIndex6,
                            command: (event: any) => {
                                this.activeIndex = 6;
                            },
                        },
                    ];
                } else if (this.commandTypeId == '2') {
                    this.lblIndex3 = 'تعیین پارامتر های ورودی و خروجی پروسیجر';
                    this.lblIndex4 = 'تست پروسیجر';
                    this.lblIndex5 = 'مدیاتور خروجی';
                    this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                    this.itemsHub = [
                        {
                            label: this.lblIndex0,
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: this.lblIndex1,
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: this.lblIndex2,
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                        {
                            label: this.lblIndex3,
                            command: (event: any) => {
                                this.activeIndex = 3;
                            },
                        },
                        {
                            label: this.lblIndex4,
                            command: (event: any) => {
                                this.activeIndex = 4;
                            },
                        },
                        {
                            label: this.lblIndex5,
                            command: (event: any) => {
                                this.activeIndex = 5;
                            },
                        },
                        {
                            label: this.lblIndex6,
                            command: (event: any) => {
                                this.activeIndex = 6;
                            },
                        },
                    ];
                } else if (this.commandTypeId == '3') {
                    this.lblIndex3 = 'لیست پارامتر های کوئری';
                    this.lblIndex4 = 'تست کوئری';
                    this.lblIndex5 = 'پیش نمایش و اتصال هاب به سرویس';
                    this.itemsHub = [
                        {
                            label: this.lblIndex0,
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: this.lblIndex1,
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: this.lblIndex2,
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                        {
                            label: this.lblIndex3,
                            command: (event: any) => {
                                this.activeIndex = 3;
                            },
                        },
                        {
                            label: this.lblIndex4,
                            command: (event: any) => {
                                this.activeIndex = 4;
                            },
                        },
                        {
                            label: this.lblIndex5,
                            command: (event: any) => {
                                this.activeIndex = 5;
                            },
                        },
                    ];
                    this.querySuccessFlag = false;
                    this.querySuccessFlag = false;
                }
                this.RequirementsHub = false;
                this.mapingFlag = true;
                this.paramFlag = false;
                this.customQueryParamFlag = false;
                this.spParamFlag = false;
                this.resultTestConnectionFlag = false;
                this.addFlag = false;
                this.backShowFlag = true;
                this.nextShowFlag = true;
                this.selectHubFlag = false;
                this.dbInfoFlag = false;
                this.previewFlag = false;
                this.resultTestQueryFlag = false;
                this.FinalRegistrationFlag = false;
                this.addMapFlag = true;
                this.nextFlagDisabled = false;

                break;
            case 4:
                this.backFlagDisabled = false;
                this.mapingFlag = false;
                this.RequirementsHub = false;

                if (this.commandTypeId == '1') {
                    this.lblIndex0 = 'انتخاب هاب سرویس';
                    this.lblIndex1 = 'تست اتصال به دیتابیس';
                    this.lblIndex2 = 'تعیین الزامات هاب';
                    this.lblIndex3 = 'لیست پارامتر های کوئری';
                    this.lblIndex4 = 'ایجاد و تست کوئری';
                    this.lblIndex5 = 'مدیاتور خروجی';
                    this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                    if (this.paramsList.length > 0) {
                        for (let i = 0; i < this.paramsList.length; i++) {
                            if (this.paramsList[i].paramValue != undefined) {
                                if (
                                    this.paramsList[i].paramValue != null &&
                                    this.paramsList[i].paramValue != ''
                                ) {
                                    this.paramFlag = true;
                                    this.backShowFlag = true;
                                    this.nextShowFlag = true;
                                    this.selectHubFlag = false;
                                    this.dbInfoFlag = false;
                                    this.addFlag = false;
                                    this.previewFlag = false;
                                    this.FinalRegistrationFlag = false;
                                    this.addMapFlag = false;
                                    this.querySuccessFlag &&
                                    this.resultTestQueryFlag
                                        ? (this.nextFlagDisabled = false)
                                        : (this.nextFlagDisabled = true),
                                        (this.tooltipNext =
                                            'تست کوئری با موفقیت انجام نشده است!');
                                    this.itemsHub = [
                                        {
                                            label: this.lblIndex0,
                                            command: (event: any) => {
                                                this.activeIndex = 0;
                                            },
                                        },
                                        {
                                            label: this.lblIndex1,
                                            command: (event: any) => {
                                                this.activeIndex = 1;
                                            },
                                        },
                                        {
                                            label: this.lblIndex2,
                                            command: (event: any) => {
                                                this.activeIndex = 2;
                                            },
                                        },
                                        {
                                            label: this.lblIndex3,
                                            command: (event: any) => {
                                                this.activeIndex = 3;
                                            },
                                        },
                                        {
                                            label: this.lblIndex4,
                                            command: (event: any) => {
                                                this.activeIndex = 4;
                                            },
                                        },
                                        {
                                            label: this.lblIndex5,
                                            command: (event: any) => {
                                                this.activeIndex = 5;
                                            },
                                        },
                                        {
                                            label: this.lblIndex6,
                                            command: (event: any) => {
                                                this.activeIndex = 6;
                                            },
                                        },
                                    ];
                                } else {
                                    this.activeIndex = 3;
                                    this.nextFlagDisabled = false;
                                    this.notifierService.showError({
                                        detail: 'paramValue را لطفا وارد نمائید!',
                                        life: 3000,
                                    });
                                    this.paramFlag = true;
                                    this.selectHubFlag = false;
                                    this.backShowFlag = true;
                                    this.nextShowFlag = true;
                                    this.dbInfoFlag = false;
                                    this.addFlag = true;
                                    this.previewFlag = false;
                                    this.FinalRegistrationFlag = false;
                                    this.addMapFlag = false;
                                    this.itemsHub = [
                                        {
                                            label: this.lblIndex0,
                                            command: (event: any) => {
                                                this.activeIndex = 0;
                                            },
                                        },
                                        {
                                            label: this.lblIndex1,
                                            command: (event: any) => {
                                                this.activeIndex = 1;
                                            },
                                        },
                                        {
                                            label: this.lblIndex2,
                                            command: (event: any) => {
                                                this.activeIndex = 2;
                                            },
                                        },
                                        {
                                            label: this.lblIndex3,
                                            command: (event: any) => {
                                                this.activeIndex = 3;
                                            },
                                        },
                                        {
                                            label: this.lblIndex4,
                                            command: (event: any) => {
                                                this.activeIndex = 4;
                                            },
                                        },
                                        {
                                            label: this.lblIndex5,
                                            command: (event: any) => {
                                                this.activeIndex = 5;
                                            },
                                        },
                                        {
                                            label: this.lblIndex6,
                                            command: (event: any) => {
                                                this.activeIndex = 6;
                                            },
                                        },
                                    ];
                                }
                            } else {
                                this.activeIndex = 2;
                                this.notifierService.showError({
                                    detail: 'paramValue را لطفا وارد نمائید!',
                                    life: 3000,
                                });
                                this.paramFlag = true;
                                this.selectHubFlag = false;
                                this.backShowFlag = true;
                                this.nextShowFlag = true;
                                this.dbInfoFlag = false;
                                this.addFlag = true;
                                this.previewFlag = false;
                                this.FinalRegistrationFlag = false;
                                this.addMapFlag = false;
                                this.itemsHub = [
                                    {
                                        label: this.lblIndex0,
                                        command: (event: any) => {
                                            this.activeIndex = 0;
                                        },
                                    },
                                    {
                                        label: this.lblIndex1,
                                        command: (event: any) => {
                                            this.activeIndex = 1;
                                        },
                                    },
                                    {
                                        label: this.lblIndex2,
                                        command: (event: any) => {
                                            this.activeIndex = 2;
                                        },
                                    },
                                    {
                                        label: this.lblIndex3,
                                        command: (event: any) => {
                                            this.activeIndex = 3;
                                        },
                                    },
                                    {
                                        label: this.lblIndex4,
                                        command: (event: any) => {
                                            this.activeIndex = 4;
                                        },
                                    },
                                    {
                                        label: this.lblIndex5,
                                        command: (event: any) => {
                                            this.activeIndex = 5;
                                        },
                                    },
                                    {
                                        label: this.lblIndex6,
                                        command: (event: any) => {
                                            this.activeIndex = 6;
                                        },
                                    },
                                ];
                            }
                        }
                    } else {
                        this.paramFlag = true;
                        this.backShowFlag = true;
                        this.nextShowFlag = true;
                        this.selectHubFlag = false;
                        this.dbInfoFlag = false;
                        this.addFlag = false;
                        this.previewFlag = false;
                        this.FinalRegistrationFlag = false;
                        this.addMapFlag = false;
                        this.querySuccessFlag && this.resultTestQueryFlag
                            ? (this.nextFlagDisabled = false)
                            : (this.nextFlagDisabled = true),
                            (this.tooltipNext =
                                'تست کوئری با موفقیت انجام نشده است!');
                        this.itemsHub = [
                            {
                                label: this.lblIndex0,
                                command: (event: any) => {
                                    this.activeIndex = 0;
                                },
                            },
                            {
                                label: this.lblIndex1,
                                command: (event: any) => {
                                    this.activeIndex = 1;
                                },
                            },
                            {
                                label: this.lblIndex2,
                                command: (event: any) => {
                                    this.activeIndex = 2;
                                },
                            },
                            {
                                label: this.lblIndex3,
                                command: (event: any) => {
                                    this.activeIndex = 3;
                                },
                            },
                            {
                                label: this.lblIndex4,
                                command: (event: any) => {
                                    this.activeIndex = 4;
                                },
                            },
                            {
                                label: this.lblIndex5,
                                command: (event: any) => {
                                    this.activeIndex = 5;
                                },
                            },
                            {
                                label: this.lblIndex6,
                                command: (event: any) => {
                                    this.activeIndex = 6;
                                },
                            },
                        ];
                    }
                } else if (this.commandTypeId == '2') {
                    this.lblIndex3 = 'تعیین پارامتر های ورودی و خروجی پروسیجر';
                    this.lblIndex4 = 'تست پروسیجر';
                    this.lblIndex5 = 'مدیاتور خروجی';
                    this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                    this.backShowFlag = true;
                    this.nextShowFlag = true;
                    this.selectHubFlag = false;
                    this.spParamFlag = true;
                    this.dbInfoFlag = false;
                    this.spFlag = true;
                    this.addSpFlag = false;
                    this.previewFlag = false;
                    this.customQueryFlag = false;
                    this.textSqlFlag = false;
                    this.spTestFlag = true;
                    this.addMapFlag = false;
                    this.querySuccessFlag && this.resultTestQueryFlag
                        ? (this.nextFlagDisabled = false)
                        : (this.nextFlagDisabled = true),
                        (this.tooltipNext =
                            'تست پروسیجر با موفقیت انجام نشده است!');
                    this.FinalRegistrationFlag = false;
                    this.itemsHub = [
                        {
                            label: this.lblIndex0,
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: this.lblIndex1,
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: this.lblIndex2,
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                        {
                            label: this.lblIndex3,
                            command: (event: any) => {
                                this.activeIndex = 3;
                            },
                        },
                        {
                            label: this.lblIndex4,
                            command: (event: any) => {
                                this.activeIndex = 4;
                            },
                        },
                        {
                            label: this.lblIndex5,
                            command: (event: any) => {
                                this.activeIndex = 5;
                            },
                        },
                        {
                            label: this.lblIndex6,
                            command: (event: any) => {
                                this.activeIndex = 6;
                            },
                        },
                    ];
                } else if (this.commandTypeId == '3') {
                    this.lblIndex3 = 'لیست پارامتر های کوئری';
                    this.lblIndex4 = 'تست کوئری';
                    this.lblIndex5 = 'پیش نمایش و اتصال هاب به سرویس';
                    this.nextFlagDisabled = false;
                    this.customQueryFlag = true;
                    this.textSqlFlag = false;
                    this.spFlag = false;
                    this.backShowFlag = true;
                    this.nextShowFlag = true;
                    this.selectHubFlag = false;
                    this.FinalRegistrationFlag = false;
                    this.customQueryParamFlag = true;
                    this.customQueryInputFlag = true;
                    this.addCusFlag = false;
                    this.dbInfoFlag = false;
                    this.mapingFlag = false;
                    this.addMapFlag = false;
                    this.nextFlagDisabled = true;
                    this.queryFailedFlag = true;
                    this.querySuccessFlag = false;
                    this.previewFlag = false;
                    this.resultTestQueryFlag = false;
                    !this.queryFailedFlag && this.resultTestQueryFlag
                        ? (this.nextFlagDisabled = false)
                        : ((this.nextFlagDisabled = true),
                            (this.tooltipNext =
                                'تست کوئری با موفقیت انجام نشده است!'));
                    this.itemsHub = [
                        {
                            label: this.lblIndex0,
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: this.lblIndex1,
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: this.lblIndex2,
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                        {
                            label: this.lblIndex3,
                            command: (event: any) => {
                                this.activeIndex = 3;
                            },
                        },
                        {
                            label: this.lblIndex4,
                            command: (event: any) => {
                                this.activeIndex = 4;
                            },
                        },
                        {
                            label: this.lblIndex5,
                            command: (event: any) => {
                                this.activeIndex = 5;
                            },
                        },
                    ];
                }

                break;
            case 3:
                this.backFlagDisabled = false;
                this.RequirementsHub = false;
                this.selectHubFlag = false;
                this.dbInfoFlag = false;
                this.backShowFlag = true;
                this.nextShowFlag = true;
                this.previewFlag = false;
                this.FinalRegistrationFlag = false;
                this.addMapFlag = false;
                this.nextFlagDisabled = false;

                if (this.commandTypeId == '1') {
                    this.lblIndex0 = 'انتخاب هاب سرویس';
                    this.lblIndex1 = 'تست اتصال به دیتابیس';
                    this.lblIndex2 = 'تعیین الزامات هاب';
                    this.lblIndex3 = 'لیست پارامتر های کوئری';
                    this.lblIndex4 = 'ایجاد و تست کوئری';
                    this.lblIndex5 = 'مدیاتور خروجی';
                    this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                    this.selectedHubList.objectName
                        ? (this.objectName = this.selectedHubList.objectName)
                        : this.objectName;
                    this.paramFlag = true;
                    this.addFlag = true;
                    this.itemsHub = [
                        {
                            label: this.lblIndex0,
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: this.lblIndex1,
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: this.lblIndex2,
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                        {
                            label: this.lblIndex3,
                            command: (event: any) => {
                                this.activeIndex = 3;
                            },
                        },
                        {
                            label: this.lblIndex4,
                            command: (event: any) => {
                                this.activeIndex = 4;
                            },
                        },
                        {
                            label: this.lblIndex5,
                            command: (event: any) => {
                                this.activeIndex = 5;
                            },
                        },
                        {
                            label: this.lblIndex6,
                            command: (event: any) => {
                                this.activeIndex = 6;
                            },
                        },
                    ];
                    //  this.loadNonStaticParams();
                } else if (this.commandTypeId == '2') {
                    this.lblIndex3 = 'تعیین پارامتر های ورودی و خروجی پروسیجر';
                    this.lblIndex4 = 'تست پروسیجر';
                    this.lblIndex5 = 'مدیاتور خروجی';
                    this.lblIndex6 = 'پیش نمایش و اتصال هاب به سرویس';
                    this.selectedHubList.objectName
                        ? (this.objectName = this.selectedHubList.objectName)
                        : this.objectName;
                    this.commitFlag = true;
                    this.spParamFlag = true;
                    this.spFlag = true;
                    this.customQueryFlag = false;
                    this.textSqlFlag = false;
                    this.spTestFlag = false;
                    this.addSpFlag = true;
                    if (this.spParamsList.length == 0) {
                        this.loadSpNonStaticParams();
                    }
                    this.itemsHub = [
                        {
                            label: this.lblIndex0,
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: this.lblIndex1,
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: this.lblIndex2,
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                        {
                            label: this.lblIndex3,
                            command: (event: any) => {
                                this.activeIndex = 3;
                            },
                        },
                        {
                            label: this.lblIndex4,
                            command: (event: any) => {
                                this.activeIndex = 4;
                            },
                        },
                        {
                            label: this.lblIndex5,
                            command: (event: any) => {
                                this.activeIndex = 5;
                            },
                        },
                        {
                            label: this.lblIndex6,
                            command: (event: any) => {
                                this.activeIndex = 6;
                            },
                        },
                    ];
                } else if (this.commandTypeId == '3') {
                    this.lblIndex3 = 'لیست پارامتر های کوئری';
                    this.lblIndex4 = 'تست کوئری';
                    this.lblIndex5 = 'پیش نمایش و اتصال هاب به سرویس';
                    this.customQueryFlag = true;
                    this.textSqlFlag = false;
                    this.spFlag = false;
                    this.backShowFlag = true;
                    this.nextShowFlag = true;
                    this.selectHubFlag = false;
                    this.FinalRegistrationFlag = false;
                    this.customQueryParamFlag = true;
                    this.customQueryInputFlag = true;
                    this.addCusFlag = true;
                    this.dbInfoFlag = false;
                    this.mapingFlag = false;
                    this.addMapFlag = false;
                    let counter = 0;
                    for (let i = 0; i < this.paramsCustomList.length; i++) {
                        if (
                            this.paramsCustomList[i].matched == 0 &&
                            this.paramsCustomList[i].actionType == '0'
                        ) {
                            counter++;
                        }
                    }
                    if (counter == 0) {
                        this.nextFlagDisabled = false;
                    } else {
                        this.nextFlagDisabled = true;
                        this.tooltipNext = 'params not validate!';
                    }
                    this.itemsHub = [
                        {
                            label: this.lblIndex0,
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: this.lblIndex1,
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: this.lblIndex2,
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                        {
                            label: this.lblIndex3,
                            command: (event: any) => {
                                this.activeIndex = 3;
                            },
                        },
                        {
                            label: this.lblIndex4,
                            command: (event: any) => {
                                this.activeIndex = 4;
                            },
                        },
                        {
                            label: this.lblIndex5,
                            command: (event: any) => {
                                this.activeIndex = 5;
                            },
                        },
                    ];
                }
                this.querySuccessFlag = false;
                this.queryFailedFlag = false;
                this.resultTestQueryFlag = false;
                break;
            case 2:
                this.paramFlag = false;
                this.spParamFlag = false;
                this.customQueryParamFlag = false;
                this.backFlagDisabled = true;
                this.RequirementsHub = false;
                this.RequirementsHub = true;
                this.selectHubFlag = false;
                this.dbInfoFlag = false;
                this.backShowFlag = true;
                this.textSqlFlag = false;
                this.spFlag = false;
                this.addMapFlag = false;
                this.itemsHub = [
                    {
                        label: this.lblIndex0,
                        command: (event: any) => {
                            this.activeIndex = 0;
                        },
                    },
                    {
                        label: this.lblIndex1,
                        command: (event: any) => {
                            this.activeIndex = 1;
                        },
                    },
                    {
                        label: this.lblIndex2,
                        command: (event: any) => {
                            this.activeIndex = 2;
                        },
                    },
                ];
                this.lblIndex0 = 'انتخاب هاب سرویس';
                this.lblIndex1 = 'تست اتصال به دیتابیس';
                this.lblIndex2 = 'تعیین الزامات هاب';
                this.nextFlagDisabled = true;
                this.attachmentDisableBTN
                    ? (this.nextFlagDisabled = false)
                    : (this.nextFlagDisabled = true),
                    (this.tooltipNext = 'الزامات هاب منتخب ثبت نگردیده است!');
                break;
            case 1:
                this.connectionSuccessFlag = false;
                this.connectionSuccessFlag && this.resultTestConnectionFlag
                    ? (this.nextFlagDisabled = false)
                    : (this.nextFlagDisabled = true),
                    (this.tooltipNext = 'تست کانکشن با موفقیت انجام نشده است!');
                this.RequirementsHub = false;
                this.dbInfoFlag = true;
                this.backShowFlag = true;
                this.selectHubFlag = false;
                this.customQueryFlag = false;
                this.textSqlFlag = true;
                this.spFlag = false;
                this.addMapFlag = false;
                this.mapingFlag = false;
                this.paramFlag = false;
                this.connectionSuccessFlag && this.resultTestConnectionFlag
                    ? (this.nextFlagDisabled = false)
                    : (this.nextFlagDisabled = true),
                    (this.tooltipNext = 'تست کانکشن با موفقیت انجام نشده است!');

                break;
            case 0:
                this.RequirementsHub = false;
                this.selectHubFlag = true;
                this.backShowFlag = false;
                this.nextShowFlag = true;
                this.FinalRegistrationFlag = false;
                this.dbInfoFlag = false;
                this.paramFlag = false;
                this.previewFlag = false;
                this.nextFlag = false;
                this.resultTestConnectionFlag = false;
                this.addMapFlag = false;
                this.mapingFlag = false;
                this.paramFlag = false;
                this.nextFlagDisabled = false;
                break;
        }
    }

    deleteParam(param) {
        let index = this.paramsList.findIndex((obj) => obj.row === param.row);
        if (index > -1) {
            this.paramsList.splice(index, 1);
            for (let k = 0; k < this.paramsList.length; k++) {
                this.paramsList[k] = Object.assign(this.paramsList[k], {
                    row: k + 1,
                });
            }
            this.paramsStaticList.splice(index, 1);
            for (let k = 0; k < this.paramsStaticList.length; k++) {
                this.paramsStaticList[k] = Object.assign(
                    this.paramsStaticList[k],
                    { row: k + 1 },
                );
            }
            this.nonStaticParam.splice(index, 1);
            for (let k = 0; k < this.nonStaticParam.length; k++) {
                this.nonStaticParam[k] = Object.assign(this.nonStaticParam[k], {
                    row: k + 1,
                });
            }
            this.queryFailedFlag = false;
            this.querySuccessFlag = false;
            this.param = '';
        }
    }

    deleteCusParam(param) {
        let index = this.paramsCustomList.findIndex(
            (obj) => obj.row === param.row,
        );
        if (index > -1) {
            this.paramsCustomList.splice(index, 1);
            for (let k = 0; k < this.paramsCustomList.length; k++) {
                this.paramsCustomList[k] = Object.assign(
                    this.paramsCustomList[k],
                    { row: k + 1 },
                );
            }
            this.queryFailedFlag = false;
            this.querySuccessFlag = false;
            this.param = '';
        }
    }

    deleteSpParam(param) {
        /*let index = this.spParamsList.findIndex(obj => obj.row === param.row);
        if (index > -1) {
            this.spParamsList.splice(index, 1);
            for (let k = 0; k < this.spParamsList.length; k++) {
                this.spParamsList[k] = Object.assign(this.spParamsList[k],
                    {row: (k + 1)})
                if (this.spParamsList[k].paramType=='1'){
                    this.spParamsList[k].name.startsWith('O')&&this.spParamsList[k].name[1]
                }else if (this.spParamsList[k].paramType=='2'){

                }else if (this.spParamsList[k].paramType=='3'){

                }
                this.spParamsList[k] = Object.assign(this.spParamsList[k],
                    {row: (k + 1)})

            }
              }*/
        let index = this.spParamsList.findIndex((obj) => obj.row === param.row);
        let index2 = this.staticAndNonStaticList.findIndex(
            (obj) => obj.row === param.row,
        );
        if (index > -1) {
            // حذف شیء از spParamsList
            this.spParamsList = this.spParamsList.filter(
                (obj) => obj.row !== param.row,
            );

            // شمارش متغیرها برای هر نوع
            let oCount = 1;
            let ocCount = 1;
            let orCount = 1;

            // به روز رسانی شماره‌گذاری row و name ها
            this.spParamsList.forEach((obj, idx) => {
                obj.row = idx + 1;

                // به روز رسانی name ها بر اساس paramType
                if (obj.paramType === '1') {
                    obj.name = `O${oCount}`;
                    oCount++;
                } else if (obj.paramType === '2') {
                    obj.name = `OC${ocCount}`;
                    ocCount++;
                } else if (obj.paramType === '3') {
                    obj.name = `OR${orCount}`;
                    orCount++;
                }
            });

            this.queryFailedFlag = false;
            this.querySuccessFlag = false;
        }
        if (index2 > -1) {
            this.staticAndNonStaticList = this.staticAndNonStaticList.filter(
                (obj) => obj.row !== param.row,
            );
            this.staticAndNonStaticList.forEach((obj, idx) => {
                obj.row = idx + 1;
            });
        }
    }

    testSp() {
        let objParam: TestSpDto = new TestSpDto();
        let objArgoman;

        let testSpDto = [];
        // let testSpDto1 = new TestSpDto;

        this.spParamsList.forEach((spParamsItem) => {
            // ایجاد یک آبجکت جدید در targetList

            let testSpDto1 = {
                name:
                    spParamsItem.name == null || spParamsItem.name == undefined
                        ? ''
                        : spParamsItem.name,
                aliasOutputParamName: spParamsItem.aliasOutputParamName,
                testValue:
                    spParamsItem.paramValue == undefined
                        ? null
                        : spParamsItem.paramValue,
                status: 1,
                dataType: +spParamsItem.dataType,
                operationTypeId: +spParamsItem.operationTypeId,
                paramType: +spParamsItem.paramType,
                customParamId: null,
                endpintdetailId: spParamsItem.endpointDetailId,
            };
            // اضافه کردن آبجکت به targetList

            testSpDto.push(testSpDto1);
        });
        let counter = 0;
        for (let r = 0; r < testSpDto.length; r++) {
            testSpDto[r] = Object.assign(testSpDto[r], { id: r + 1 });
            if (testSpDto[r].paramType != '0') {
                counter--;
                testSpDto[r].endpintdetailId = counter;
            }
        }
        //  objArgoman = objParam.objectMapperToList(this.spParamsList);

        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .testconnectionandproc(+this.hubId, this.apiDataHubId, testSpDto)
            .subscribe(
                (e) => {
                    this._primengProgressBarService.hide();
                    this.nextFlagDisabled = false;
                    this.querySuccessFlag = true;
                    this.queryFailedFlag = false;
                    this.resultTestQueryFlag = true;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                    this.queryFailedFlag = true;
                    this.querySuccessFlag = false;
                    this.resultTestQueryFlag = true;
                    this.nextFlagDisabled = true;
                    this.tooltipNext = 'تست پروسیجر با موفقیت انجام نشده است!';
                },
            );
    }

    openEndpointDetail() {
        //
        this.registerEndpointHeaderDto = {
            apiEndpointHeaderFlag: true,
            apiId: this.apiId,
        };
        //
        this.endpointDetailFlag = false;
    }

    areObjectsEqual(obj1, obj2, keys) {
        return keys.every((key) => obj1[key] === obj2[key]);
    }

    addUniqueItems(arr1, arr2, keys) {
        arr1.forEach((item1) => {
            const isDuplicate = arr2.some((item2) =>
                this.areObjectsEqual(item1, item2, keys),
            );
            if (isDuplicate) {
                this.notifierService.showError({ detail: '' });
            } else {
                arr2.push(item1);
            }
        });
    }

    /*  mergeDuplicateParams(paramsList: any[]): any[] {
          const mergedParams: Record<string, any> = {};

          paramsList.forEach((param) => {
              // حذف فاصله‌ها از ابتدا و انتهای paramName
              const paramName = param.paramName.trim();
              const {paramName: _, ...rest} = param; // حذف متغیر اصلی از destructuring

              if (!mergedParams[paramName]) {
                  // اگر این paramName هنوز اضافه نشده باشد، آبجکت جدید ایجاد کن
                  mergedParams[paramName] = {paramName, ...rest};
              } else {
                  // اگر این paramName موجود باشد، مقادیر را ادغام کن
                  mergedParams[paramName] = {...mergedParams[paramName], ...rest};
              }
          });

          // تبدیل به آرایه
          return Object.values(mergedParams);
      }*/
    mergeDuplicateParams(paramsList: any[]): any[] {
        const mergedParams: Record<string, any> = {};

        console.error('Initial paramsList:', JSON.stringify(paramsList));

        paramsList.forEach((param) => {
            const paramName = param.paramName.trim();
            const { paramName: _, ...rest } = param;

            if (!mergedParams[paramName]) {
                mergedParams[paramName] = { paramName, ...rest };
            } else {
                mergedParams[paramName] = {
                    ...mergedParams[paramName],
                    ...rest,
                };
            }

            // error current state of mergedParams
            console.error('Processing param:', JSON.stringify(param));
            console.error(
                'Merged params so far:',
                JSON.stringify(mergedParams),
            );
        });

        const result = Object.values(mergedParams);
        console.error('Final merged result:', JSON.stringify(result));
        return result;
    }

    mergeData(list1, list2) {
        const result = [];

        // برای هر آیتم از list2
        list2.forEach((item2) => {
            // جستجوی تطابق در list1 براساس paramName

            const match = list1.find(
                (item1) => item1.paramName === item2.paramName,
            );

            // اگر تطابق پیدا شد
            if (match) {
                const combinedItem = {
                    ...match, // ویژگی‌ها از list1 (ساختار اصلی از list1)
                    endpointDetailId: item2.endpointDetailId, // از list2
                    detailType: item2.detailType, // از list2
                    disabled: match.disabled, // از list1
                    matched: match.matched, // از list1
                    actionType: match.actionType, // از list1
                    row: match.row, // از list1
                    paramValue: match.paramValue, // از list1
                    operationTypeId: 3, // اضافه کردن operationTypeId با مقدار ثابت 3
                };

                result.push(combinedItem);
            } else {
                // اگر تطابق پیدا نشد، آیتم از list2 را به خروجی اضافه می‌کنیم
                result.push({
                    ...item2,
                    disabled: false,
                    paramValue: null, // از list2 نیست پس می‌تونیم اینجا مقدار null قرار بدیم
                    operationTypeId: 3, // اضافه کردن operationTypeId با مقدار ثابت 3
                });
            }
        });

        // اضافه کردن آیتم‌های باقی‌مانده از list1 که در list2 پیدا نمی‌شوند
        list1.forEach((item1) => {
            if (!list2.some((item2) => item2.paramName === item1.paramName)) {
                result.push({
                    ...item1,
                    disabled: true,
                    paramValue: null, // از list2 نیست پس می‌تونیم اینجا مقدار null قرار بدیم
                    operationTypeId: 3, // اضافه کردن operationTypeId با مقدار ثابت 3
                });
            }
        });

        return result;
    }

    matchElemanLists(list1, list2) {
        console.error('Initial list1:', JSON.stringify(list1));
        console.error('Initial list2:', JSON.stringify(list2));

        const list1ParamNames = list1.map((item) => item.paramName);
        const result = list2.map((item) => {
            const match = list1.find((element) => {
                element.paramName === item.name || item.paramName;
            });

            // Combine match from list1 with item from list2, ensuring actionType is taken from list2
            const combined = match
                ? {
                    ...item,
                    ...match,
                    disabled: true,
                    actionType: item.actionType,
                    operationTypeId: item.operationTypeId,
                    endpointDetailId: item.endpointDetailId,
                    dataType: item.dataType,
                    paramValue: item.paramValue,
                }
                : { ...item, disabled: false };

            // error comparison results
            console.error('Processing item from list2:', JSON.stringify(item));
            console.error('Matching item from list1:', JSON.stringify(match));
            console.error('Combined result:', JSON.stringify(combined));

            return combined;
        });

        list1.forEach((item) => {
            if (!list2.some((element) => element.name === item.paramName)) {
                const newItem = { ...item, disabled: true };
                console.error(
                    'Adding unmatched item from list1:',
                    JSON.stringify(newItem),
                );
                result.unshift(newItem);
            }
        });

        console.error('Final result after matching:', JSON.stringify(result));
        return result;
    }

    replaceNewlineWithSpace(inputString) {
        return inputString?.replace(/\n/g, ' ');
    }

    magicCusMethod() {
        let counter = 0;
        for (let i = 0; i < this.filterList.length; i++) {
            if (!isNaN(this.filterList[i].outputValue)) {
                this.filterList[i] = Object.assign(this.filterList[i], {
                    dataType: 1,
                });
            } else {
                this.filterList[i] = Object.assign(this.filterList[i], {
                    dataType: 0,
                });
            }
        }
        // this.paramsCustomList.forEach(n=>{

        const result = []; // آرایه نهایی

        let tempList;

        tempList = this.matchElemanLists(this.filterList, this.cusParamList);

        tempList.forEach((item) => {
            const key = item.name || item.paramName || item.inputName; // کلید شناسایی یکتا
            const existingItem = result.find(
                (obj) => (obj.name || obj.paramName || item.inputName) === key,
            );

            if (existingItem) {
                // اگر وجود داشت، مقادیر را ادغام می‌کنیم
                Object.assign(existingItem, item);
            } else {
                item.name
                    ? (item.paramName = item.name)
                    : (item.paramName = item.inputName);

                // اگر وجود نداشت، به لیست اضافه می‌کنیم
                result.push({ ...item });
            }
            this.paramsCustomList.push({
                paramName:
                    item.name == undefined ? item.paramName : item.inputName,
                paramValue: null,
                dataType: this.dataType,
                operationTypeId: null,
                actionType: this.actionType,
                matched: item.matched,
                disabled: item.disabled,
                detailType: item.detailType,
                endpointDetailId: item.endpointDetailId,
            });
        });

        tempList = result;
        this.paramsCustomList = tempList;
        for (let k = 0; k < this.paramsCustomList.length; k++) {
            tempList[k] = Object.assign(this.paramsCustomList[k], {
                row: k + 1,
            });
        }

        let counter2 = 0;
        for (let i = 0; i < this.paramsCustomList.length; i++) {
            if (this.paramsCustomList[i].matched == 0) {
                counter2++;
            }
        }
        if (counter2 == 0) {
            this.nextFlagDisabled = false;
        } else {
            this.activeIndex = 2;
            this.nextFlagDisabled = true;
            this.tooltipNext = 'not matched params!';
        }

        if (this.tempCusAddParam.length > 0) {
            // ساخت یک کپی از tempCusAddParam برای جلوگیری از تغییرات غیرمنتظره
            const updatedArray2 = [...this.tempCusAddParam]; // کپی کردن آرایه

            // Create a map to group by paramName
            const grouped = new Map();

            // Iterating over the data array
            updatedArray2.forEach((item) => {
                // اگر فرمت خاص (:) یافت شد
                if (item.paramName.includes(':')) {
                    // اگر داده خاصی با فرمت : پیدا شد، آن را به paramsCustomList اضافه کنیم

                    this.matches.forEach((paramName) => {
                        const existingParam = this.paramsCustomList.find(
                            (item) => item.paramName === paramName,
                        );

                        if (!existingParam) {
                            // اگر پارامتر وجود نداشت، آن را اضافه می‌کنیم

                            this.paramsCustomList.push({
                                ...item,
                                // به دلخواه ویژگی‌های جدید اضافه کنید
                                specialFormat: true,
                            });

                            this.paramsCustomList = this.mergeDuplicateParams(
                                this.paramsCustomList,
                            );
                            console.error(
                                'this.paramsCustomList',
                                JSON.stringify(this.paramsCustomList),
                            );
                        }
                    });
                } else {
                    // اگر paramName در گروه موجود نباشد، آن را اضافه کنید
                    if (grouped.has(item.paramName)) {
                        const existingItem = grouped.get(item.paramName);

                        // ادغام ویژگی‌های item با existingItem
                        for (const key in item) {
                            if (key !== 'paramName' && key !== 'row') {
                                existingItem[key] =
                                    item[key] ?? existingItem[key];
                            }
                        }
                    } else {
                        grouped.set(item.paramName, { ...item });
                    }
                }
            });

            // تبدیل Map به آرایه و ذخیره آن در paramsCustomList
            const mergedArray = Array.from(grouped.values());

            //  ادغام داده‌های جدید با داده‌های قبلی در paramsCustomList
            this.paramsCustomList = [...this.paramsCustomList, ...mergedArray];
            this.paramsCustomList = this.mergeDuplicateParams(
                this.paramsCustomList,
            );
            this.matches = this.matches.map((item) => item.trim());
            this.paramsCustomList.forEach((item) => {
                if (this.matches.includes(item.paramName)) {
                    item.matched = 1; // اگر در matches وجود داشت
                } else {
                    item.matched = 0; // در غیر این صورت
                }
            });
            // تنظیم tempCusAddParam با paramsCustomList جدید
            this.tempCusAddParam = [...this.paramsCustomList];
            console.error(
                'this.paramsCustomList',
                JSON.stringify(this.paramsCustomList),
            );
        }

        for (let k = 0; k < this.paramsCustomList.length; k++) {
            if (+this.paramsCustomList[k].endpointDetailId != 0) {
                this.nonStaticParam.push({
                    dataType: +this.paramsCustomList[k].dataType,
                    paramType: 0,
                    aliasOutputParamName: null,
                    apiDataHubParseOutputParamDomain: null,
                    actionType: +this.paramsCustomList[k].actionType,
                    operationTypeId: +this.paramsCustomList[k].operationTypeId,
                    endpointDetailId:
                        +this.paramsCustomList[k].endpointDetailId,
                });
            }
        }
        console.error('nonStaticParam:', JSON.stringify(this.nonStaticParam));
    }

    /* magictextMethod() {
         let counter = 0
         for (let i = 0; i < this.filterList.length; i++) {

             if (!isNaN(this.filterList[i].outputValue)) {

                 this.filterList[i] = Object.assign(this.filterList[i],
                     {dataType: 1})
             } else {

                 this.filterList[i] = Object.assign(this.filterList[i],
                     {dataType: 0})
             }

         }
         // this.paramsCustomList.forEach(n=>{

         const result = []; // آرایه نهایی


         let tempList

         tempList = this.matchElemanLists(this.filterList, this.paramsList)

         tempList.forEach(item => {
             const key = item.name || item.paramName || item.inputName; // کلید شناسایی یکتا
             const existingItem = result.find(obj =>
                 (obj.name || obj.paramName || item.inputName) === key);

             if (existingItem) {
                 // اگر وجود داشت، مقادیر را ادغام می‌کنیم
                 Object.assign(existingItem, item);
             } else {
                 item.name ? item.paramName = item.name : item.paramName = item.inputName

                 // اگر وجود نداشت، به لیست اضافه می‌کنیم
                 result.push({...item});
             }
             this.paramsList.push({
                 'paramName': item.name == undefined ? item.paramName : item.inputName,
                 'paramValue': null,
                 'dataType': this.dataType,
                 'operationTypeId': null,
                 'actionType': this.actionType,
                 'matched': item.matched,
                 'disabled': item.disabled,
                 'detailType': item.detailType,
                 'endpointDetailId': item.endpointDetailId,
             });
         });

         tempList = result
         this.paramsList = tempList
         for (let k = 0; k < this.paramsList.length; k++) {

             tempList[k] = Object.assign(this.paramsList[k],
                 {row: (k + 1)})
         }


         let counter2 = 0
         for (let i = 0; i < this.paramsList.length; i++) {
             if (this.paramsList[i].matched == 0) {
                 counter2++;
             }
         }
         if (counter2 == 0) {

             this.nextFlagDisabled = false
         } else {

             this.activeIndex = 2
             this.nextFlagDisabled = true
             this.tooltipNext = "not matched params!"
         }




         if (this.tempCusAddParam.length > 0) {
             // ساخت یک کپی از tempCusAddParam برای جلوگیری از تغییرات غیرمنتظره
             const updatedArray2 = [...this.tempCusAddParam];  // کپی کردن آرایه

             // Create a map to group by paramName
             const grouped = new Map();

             // Iterating over the data array
             updatedArray2.forEach(item => {
                 ;
                 ;
                 ;
                 ;
                 ;
                 ;
                 ;

                 // اگر فرمت خاص (=:) یافت شد
                 if (item.paramName.includes('=:')) {
                     // اگر داده خاصی با فرمت =: پیدا شد، آن را به paramsCustomList اضافه کنیم

                     this.matches.forEach(paramName => {
                         const existingParam = this.paramsCustomList.find(item => item.paramName === paramName);

                         if (!existingParam) {

                             // اگر پارامتر وجود نداشت، آن را اضافه می‌کنیم

                             this.paramsCustomList.push({
                                 ...item,
                                 // به دلخواه ویژگی‌های جدید اضافه کنید
                                 specialFormat: true
                             });

                             this.paramsList = this.mergeDuplicateParams(this.paramsList)
                             console.error('this.paramsList', JSON.stringify(this.paramsList))
                         }
                     })
                 } else {
                     // اگر paramName در گروه موجود نباشد، آن را اضافه کنید
                     if (grouped.has(item.paramName)) {
                         const existingItem = grouped.get(item.paramName);

                         // ادغام ویژگی‌های item با existingItem
                         for (const key in item) {
                             if (key !== 'paramName' && key !== 'row') {
                                 existingItem[key] = item[key] ?? existingItem[key];
                             }
                         }
                     } else {
                         grouped.set(item.paramName, {...item});
                     }
                 }
             });

             // تبدیل Map به آرایه و ذخیره آن در paramsList
             const mergedArray = Array.from(grouped.values());

             //  ادغام داده‌های جدید با داده‌های قبلی در paramsList
             this.paramsList = [...this.paramsList, ...mergedArray];
             this.paramsList = this.mergeDuplicateParams(this.paramsList)
             this.paramsList.forEach(item => {

                 if (this.matches.includes(item.paramName)) {

                     item.matched = 1; // اگر در matches وجود داشت
                 } else {

                     item.matched = 0; // در غیر این صورت
                 }
             });
             // تنظیم tempCusAddParam با paramsList جدید
             this.tempCusAddParam = [...this.paramsList];
             console.error('this.paramsList', JSON.stringify(this.paramsList))
         }

         for (let k = 0; k < this.paramsList.length; k++) {





         }
     }
 */
    processData(data, flag) {
        // گروه‌بندی اشیاء بر اساس paramName یا inputName
        const grouped = data.reduce((acc, item) => {
            const key = item.paramName || item.inputName;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});

        // تابع مرج کردن اشیاء
        function mergeObjects(objects) {
            return objects.reduce((merged, obj) => {
                Object.keys(obj).forEach((key) => {
                    if (typeof merged[key] === 'undefined') {
                        merged[key] = obj[key];
                    }
                });
                return merged;
            }, {});
        }

        // پردازش داده‌ها بر اساس فلگ
        const result = Object.values(grouped).map((group) => {
            let mergedObject = mergeObjects(group);

            if (flag === 2) {
                // اعمال محدودیت‌های اضافی برای فلگ 2
                mergedObject = {
                    actionType: 0, // مقدار ثابت برای actionType
                    dataType:
                        typeof mergedObject.dataType === 'number'
                            ? mergedObject.dataType
                            : parseInt(mergedObject.dataType, 10),
                    operationTypeId:
                        typeof mergedObject.operationTypeId === 'number'
                            ? mergedObject.operationTypeId
                            : parseInt(mergedObject.operationTypeId, 10),
                    endpointDetailId:
                        typeof mergedObject.endpointDetailId === 'number'
                            ? mergedObject.endpointDetailId
                            : parseInt(mergedObject.endpointDetailId, 10),
                };
                // حذف مقادیر تکراری بر اساس endpointDetailId
            }

            return mergedObject;
        });
        if (flag === 2) {
            const uniqueData = data.filter(
                (item, index, array) =>
                    index ===
                    array.findIndex(
                        (obj) => obj.endpointDetailId === item.endpointDetailId,
                    ),
            );
            console.log('Filtered Unique Data:', uniqueData);
            return uniqueData;
        }
        return result;
    }

    confirmDialog(type, obj?) {
        if (type == 'sp') {
            this.headerConfirm = 'clear params';
            this.confirmationService.confirm({
                message:
                    'پاکسازی params موجب میگردد اطلاعات جاری پاک شوند.آیا از پاکسازی  params اطمینان دارید؟',
                accept: () => {
                    this.staticAndNonStaticList = [];
                    this.spParamsList = [];
                },
                reject: () => {
                },
            });
        }
        if (type == 'cus') {
            this.headerConfirm = 'clear params';
            this.confirmationService.confirm({
                message:
                    'پاکسازی params موجب میگردد اطلاعات جاری پاک شوند.آیا از پاکسازی  params اطمینان دارید؟',
                accept: () => {
                    //  this.staticAndNonStaticList = []
                    this.paramsCustomList = [];
                    this.nonStaticParam = [];
                    this.tempCusAddParam = [];
                },
                reject: () => {
                },
            });
        }
        if (type == 'param') {
            this.headerConfirm = 'clear params';
            this.confirmationService.confirm({
                message:
                    'load params api موجب میگردد اطلاعات جاری پاک شوند.آیا از پاکسازی  params اطمینان دارید؟',
                accept: () => {
                    //  this.staticAndNonStaticList = []
                    this.paramsList.length > 0
                        ? (this.tempAddParam = this.paramsList)
                        : this.tempAddParam;
                    this.paramsList = [];
                    this.paramsStaticList = [];
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService
                        .endpointdetailByApi(this.apiId)
                        .subscribe(
                            (res) => {
                                this._primengProgressBarService.hide();

                                this.paramsList = [];
                                let tempDetailList;
                                if (Array.isArray(res)) {
                                    tempDetailList = res;
                                } else {
                                    tempDetailList.push(res);
                                }
                                tempDetailList.map((x) =>
                                    x.status === 1
                                        ? (x.status = true)
                                        : (x.status = false),
                                );
                                let conter = 0;
                                for (
                                    let i = 0;
                                    i < tempDetailList.length;
                                    i++
                                ) {
                                    let counter = 0;

                                    if (
                                        tempDetailList[i]
                                            .isSystemEndpointDetail == 1
                                    ) {
                                    } else {
                                        if (tempDetailList[i].status == 1) {
                                            if (this.type != undefined) {
                                                if (this.type == 2) {
                                                    if (
                                                        tempDetailList[i]
                                                            .detailType == 3
                                                    ) {
                                                        if (
                                                            tempDetailList[i]
                                                                .actionType == 1
                                                        ) {
                                                            tempDetailList[i] =
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        paramName:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .ouputName,
                                                                        paramValue:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .outputValue,
                                                                    },
                                                                );
                                                        } else if (
                                                            tempDetailList[i]
                                                                .actionType == 2
                                                        ) {
                                                            tempDetailList[i] =
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        paramName:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .inputName,
                                                                        paramValue:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .outputValue,
                                                                    },
                                                                );
                                                        } else if (
                                                            tempDetailList[i]
                                                                .actionType == 3
                                                        ) {
                                                            tempDetailList[i] =
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        paramName:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .inputName,
                                                                    },
                                                                );
                                                        }

                                                        if (
                                                            !isNaN(
                                                                tempDetailList[
                                                                    i
                                                                    ].outputValue,
                                                            )
                                                        ) {
                                                            tempDetailList[i] =
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        dataType: 1,
                                                                    },
                                                                );
                                                        } else {
                                                            tempDetailList[i] =
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        dataType: 0,
                                                                    },
                                                                );
                                                        }

                                                        if (
                                                            this.paramsList
                                                                .length > 0
                                                        ) {
                                                            tempDetailList[i] =
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        dataType: 0,
                                                                    },
                                                                    {
                                                                        disabled:
                                                                            true,
                                                                    },
                                                                    {
                                                                        actionType: 3,
                                                                    },
                                                                );
                                                            this.paramsList.push(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                            );
                                                            this.paramsStaticList.push(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                            );
                                                        } else {
                                                            tempDetailList[i] =
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        dataType: 0,
                                                                    },
                                                                    {
                                                                        actionType: 3,
                                                                    },
                                                                    {
                                                                        disabled:
                                                                            true,
                                                                    },
                                                                );
                                                            this.paramsList.push(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                            );
                                                            this.paramsStaticList.push(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                            );
                                                        }
                                                    }
                                                } else if (this.type == 1) {
                                                    if (
                                                        tempDetailList[i]
                                                            .detailType == 2
                                                    ) {
                                                        if (
                                                            tempDetailList[i]
                                                                .actionType == 1
                                                        ) {
                                                            tempDetailList[i] =
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        paramName:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .ouputName,
                                                                        paramValue:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .outputValue,
                                                                    },
                                                                );
                                                        } else if (
                                                            tempDetailList[i]
                                                                .actionType == 2
                                                        ) {
                                                            tempDetailList[i] =
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        paramName:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .inputName,
                                                                        paramValue:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .outputValue,
                                                                    },
                                                                );
                                                        } else if (
                                                            tempDetailList[i]
                                                                .actionType == 3
                                                        ) {
                                                            tempDetailList[i] =
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        paramName:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .inputName,
                                                                    },
                                                                );
                                                        }

                                                        if (
                                                            !isNaN(
                                                                tempDetailList[
                                                                    i
                                                                    ].outputValue,
                                                            )
                                                        ) {
                                                            tempDetailList[i] =
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        dataType: 1,
                                                                    },
                                                                );
                                                        } else {
                                                            tempDetailList[i] =
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        dataType: 0,
                                                                    },
                                                                );
                                                        }

                                                        if (
                                                            this.paramsList
                                                                .length > 0
                                                        ) {
                                                            tempDetailList[i] =
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        dataType: 0,
                                                                    },
                                                                    {
                                                                        disabled:
                                                                            true,
                                                                    },
                                                                );
                                                            this.paramsList.push(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                            );
                                                            this.paramsStaticList.push(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                            );
                                                        } else {
                                                            tempDetailList[i] =
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        dataType: 0,
                                                                    },
                                                                    {
                                                                        disabled:
                                                                            true,
                                                                    },
                                                                );
                                                            this.paramsList.push(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                            );
                                                            this.paramsStaticList.push(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                            );
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                console.error(this.paramsList);

                                if (this.tempAddParam.length > 0) {
                                    this.paramsList = this.mergeParamLists(
                                        this.tempAddParam,
                                        this.paramsList,
                                    );
                                    this.paramsStaticList =
                                        this.mergeParamLists(
                                            this.paramsList,
                                            this.paramsStaticList,
                                        );
                                    this.tempAddParam = this.paramsList;
                                    /*   const updatedArray2 = this.tempAddParam.map(item2 => {
                                   const matchingItem = this.paramsList.find(item1 => {
                                           item1.endpointDetailId === item2.endpointDetailId




                                       }
                                   );
                                   if (matchingItem) {
                                       return {
                                           ...item2,
                                           paramValue: matchingItem.paramValue,
                                           operationTypeId: matchingItem.operationTypeId,
                                           disabled: true
                                       };
                                   }
                                   return item2;
                               });*/
                                    // this.paramsList = []
                                    for (
                                        let k = 0;
                                        k < this.paramsList.length;
                                        k++
                                    ) {
                                        this.paramsList[k] = Object.assign(
                                            this.paramsList[k],
                                            { row: k + 1 },
                                        );
                                    }
                                    // Create a map to group by paramName
                                    const grouped = new Map();
                                    const staticGrouped = new Map();
                                    // Iterate over the data array
                                    this.paramsList.forEach((item) => {
                                        if (grouped.has(item.paramName)) {
                                            // If paramName already exists, combine data
                                            const existingItem = grouped.get(
                                                item.paramName,
                                            );
                                            // Merge the two objects (you can modify this merging erroric based on your requirements)
                                            for (const key in item) {
                                                if (
                                                    key !== 'paramName' &&
                                                    key !== 'row'
                                                ) {
                                                    // Merge properties from the current item if they are different or undefined in the existing item
                                                    existingItem[key] =
                                                        item[key] ??
                                                        existingItem[key];
                                                }
                                            }
                                        } else {
                                            // If paramName doesn't exist, add the item to the map
                                            grouped.set(item.paramName, {
                                                ...item,
                                            });
                                        }
                                    });
                                    this.paramsStaticList.forEach((item) => {
                                        if (staticGrouped.has(item.paramName)) {
                                            // If paramName already exists, combine data
                                            const existingItem =
                                                staticGrouped.get(
                                                    item.paramName,
                                                );
                                            // Merge the two objects (you can modify this merging erroric based on your requirements)
                                            for (const key in item) {
                                                if (
                                                    key !== 'paramName' &&
                                                    key !== 'row'
                                                ) {
                                                    // Merge properties from the current item if they are different or undefined in the existing item
                                                    existingItem[key] =
                                                        item[key] ??
                                                        existingItem[key];
                                                }
                                            }
                                        } else {
                                            // If paramName doesn't exist, add the item to the map
                                            staticGrouped.set(item.paramName, {
                                                ...item,
                                            });
                                        }
                                    });
                                    const mergedArray = Array.from(
                                        grouped.values(),
                                    );
                                    const staticMergedArray = Array.from(
                                        staticGrouped.values(),
                                    );
                                    for (
                                        let k = 0;
                                        k < mergedArray.length;
                                        k++
                                    ) {
                                        mergedArray[k] = Object.assign(
                                            mergedArray[k],
                                            { row: k + 1 },
                                        );
                                    }
                                    this.paramsList = mergedArray;
                                    this.paramsStaticList = staticMergedArray;
                                    console.error(mergedArray);
                                    this.tempAddParam = this.paramsList;
                                }
                            },
                            (error) => {
                                this._primengProgressBarService.hide();
                            },
                        );
                },
                reject: () => {
                },
            });
        }
        if (type == 'relodCus') {
            this.headerConfirm = 'clear params';
            this.confirmationService.confirm({
                message:
                    'validate query  موجب میگردد اطلاعات جاری پاک شوند.آیا از پاکسازی params اطمینان داردید؟',
                accept: () => {
                    this.paramsCustomList.length > 0
                        ? (this.tempCusAddParam = this.paramsCustomList)
                        : this.tempCusAddParam;
                    this.paramsCustomList = [];
                    this.nonStaticParam = [];
                    this.matches = [];
                    //const regex = /=\s*:\s*\w+/g;
                    // const regex = /(?:=\s*:)?(\w+)/g;
                    let regex = /\s*:\w+/g;
                    let match;
                    // const matches = this.customQuery.match(regex);
                    /*  while ((match = regex.exec(this.customQuery)) !== null) {

                          match[0]=  match[0].replace(/:/g, '');

                          matches.push(match[0]);
                      }*/
                    while ((match = regex.exec(this.customQuery)) !== null) {
                        match[0] = match[0].replace(/:/g, '');
                        this.matches.push(match[0]);
                    }

                    this.cusParamList = this.matches.map((match) => ({
                        name: match.substring(0),
                        actionType: null,
                    }));
                    // let cusParamList = matches.map(match => ({name: match.substring(0)}));
                    for (let i = 0; i < this.cusParamList.length; i++) {
                        this.cusParamList[i] = Object.assign(
                            this.cusParamList[i],
                            { actionType: null },
                        );
                    }
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService
                        .endpointdetailByApi(this.apiId)
                        .subscribe(
                            (res) => {
                                this._primengProgressBarService.hide();

                                let tempDetailList;
                                if (Array.isArray(res)) {
                                    tempDetailList = res;
                                } else {
                                    tempDetailList.push(res);
                                }

                                this.filterList = [];
                                tempDetailList.forEach(
                                    (x) => (x.status = x.status === 1),
                                );
                                let conter = 0;
                                for (
                                    let i = 0;
                                    i < tempDetailList.length;
                                    i++
                                ) {
                                    let counter = 0;

                                    if (
                                        tempDetailList[i]
                                            .isSystemEndpointDetail == 1
                                    ) {
                                    } else {
                                        if (tempDetailList[i].status == 1) {
                                            if (this.type != undefined) {
                                                if (this.type == 2) {
                                                    if (
                                                        tempDetailList[i]
                                                            .detailType == 3
                                                    ) {
                                                        if (
                                                            tempDetailList[i]
                                                                .actionType == 1
                                                        ) {
                                                            this.filterList.push(
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        paramName:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .ouputName,
                                                                        paramValue:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .outputValue,
                                                                    },
                                                                ),
                                                            );
                                                        } else if (
                                                            tempDetailList[i]
                                                                .actionType == 2
                                                        ) {
                                                            this.filterList.push(
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        paramName:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .inputName,
                                                                        paramValue:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .outputValue,
                                                                    },
                                                                ),
                                                            );
                                                        } else if (
                                                            tempDetailList[i]
                                                                .actionType == 3
                                                        ) {
                                                            this.filterList.push(
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        paramName:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .inputName,
                                                                    },
                                                                ),
                                                            );
                                                        }
                                                    }
                                                } else if (this.type == 1) {
                                                    if (
                                                        tempDetailList[i]
                                                            .detailType == 2
                                                    ) {
                                                        if (
                                                            tempDetailList[i]
                                                                .actionType == 1
                                                        ) {
                                                            this.filterList.push(
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        paramName:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .ouputName,
                                                                        paramValue:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .outputValue,
                                                                    },
                                                                ),
                                                            );
                                                        } else if (
                                                            tempDetailList[i]
                                                                .actionType == 2
                                                        ) {
                                                            this.filterList.push(
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        paramName:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .inputName,
                                                                        paramValue:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .outputValue,
                                                                    },
                                                                ),
                                                            );
                                                        } else if (
                                                            tempDetailList[i]
                                                                .actionType == 3
                                                        ) {
                                                            this.filterList.push(
                                                                Object.assign(
                                                                    tempDetailList[
                                                                        i
                                                                        ],
                                                                    {
                                                                        paramName:
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .inputName,
                                                                    },
                                                                ),
                                                            );
                                                        }

                                                        this.magicCusMethod();
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                let counter = 0;
                                for (
                                    let i = 0;
                                    i < this.filterList.length;
                                    i++
                                ) {
                                    if (
                                        !isNaN(this.filterList[i].outputValue)
                                    ) {
                                        this.filterList[i] = Object.assign(
                                            this.filterList[i],
                                            { dataType: 1 },
                                        );
                                    } else {
                                        this.filterList[i] = Object.assign(
                                            this.filterList[i],
                                            { dataType: 0 },
                                        );
                                    }
                                }
                                // this.paramsCustomList.forEach(n=>{

                                const list1ParamNames = tempDetailList.map(
                                    (item) => {
                                        if (item.paramName != undefined) {
                                            item.paramName;
                                        }
                                    },
                                );
                                const result = []; // آرایه نهایی

                                let tempList;

                                tempList = this.matchElemanLists(
                                    this.filterList,
                                    this.cusParamList,
                                );

                                tempList.forEach((item) => {
                                    const key =
                                        item.name ||
                                        item.paramName ||
                                        item.inputName; // کلید شناسایی یکتا
                                    const existingItem = result.find(
                                        (obj) =>
                                            (obj.name ||
                                                obj.paramName ||
                                                item.inputName) === key,
                                    );

                                    if (existingItem) {
                                        // اگر وجود داشت، مقادیر را ادغام می‌کنیم
                                        Object.assign(existingItem, item);
                                    } else {
                                        item.name
                                            ? (item.paramName = item.name)
                                            : (item.paramName = item.inputName);

                                        // اگر وجود نداشت، به لیست اضافه می‌کنیم
                                        result.push({ ...item });
                                    }
                                    this.paramsCustomList.push({
                                        paramName:
                                            item.name == undefined
                                                ? item.paramName
                                                : item.inputName,
                                        paramValue: null,
                                        dataType: this.dataType,
                                        operationTypeId: this.operationTypeId,
                                        actionType: this.actionType,
                                        matched: item.matched,
                                        disabled: item.disabled,
                                        detailType: item.detailType,
                                        endpointDetailId: item.endpointDetailId,
                                    });
                                });

                                tempList = result;
                                this.paramsCustomList = tempList;
                                for (
                                    let k = 0;
                                    k < this.paramsCustomList.length;
                                    k++
                                ) {
                                    tempList[k] = Object.assign(
                                        this.paramsCustomList[k],
                                        { row: k + 1 },
                                    );
                                }

                                let counter2 = 0;
                                for (
                                    let i = 0;
                                    i < this.paramsCustomList.length;
                                    i++
                                ) {
                                    if (this.paramsCustomList[i].matched == 0) {
                                        counter2++;
                                    }
                                }
                                if (counter2 == 0) {
                                    this.nextFlagDisabled = false;
                                } else {
                                    this.activeIndex = 2;
                                    this.nextFlagDisabled = true;
                                    this.tooltipNext = 'not matched params!';
                                }

                                if (this.tempCusAddParam.length > 0) {
                                    // ساخت یک کپی از tempCusAddParam برای جلوگیری از تغییرات غیرمنتظره
                                    const updatedArray2 = [
                                        ...this.tempCusAddParam,
                                    ]; // کپی کردن آرایه

                                    // Create a map to group by paramName
                                    const grouped = new Map();

                                    // Iterating over the data array
                                    updatedArray2.forEach((item) => {
                                        // اگر فرمت خاص (=:) یافت شد
                                        if (item.paramName.includes('=:')) {
                                            // اگر داده خاصی با فرمت =: پیدا شد، آن را به paramsCustomList اضافه کنیم

                                            this.matches.forEach(
                                                (paramName) => {
                                                    const existingParam =
                                                        this.paramsCustomList.find(
                                                            (item) =>
                                                                item.paramName ===
                                                                paramName,
                                                        );

                                                    if (!existingParam) {
                                                        // اگر پارامتر وجود نداشت، آن را اضافه می‌کنیم

                                                        this.paramsCustomList.push(
                                                            {
                                                                ...item,
                                                                // به دلخواه ویژگی‌های جدید اضافه کنید
                                                                specialFormat:
                                                                    true,
                                                            },
                                                        );

                                                        this.paramsCustomList =
                                                            this.mergeDuplicateParams(
                                                                this
                                                                    .paramsCustomList,
                                                            );
                                                        console.error(
                                                            'this.paramsCustomList',
                                                            JSON.stringify(
                                                                this
                                                                    .paramsCustomList,
                                                            ),
                                                        );
                                                    }
                                                },
                                            );
                                        } else {
                                            // اگر paramName در گروه موجود نباشد، آن را اضافه کنید
                                            if (grouped.has(item.paramName)) {
                                                const existingItem =
                                                    grouped.get(item.paramName);

                                                // ادغام ویژگی‌های item با existingItem
                                                for (const key in item) {
                                                    if (
                                                        key !== 'paramName' &&
                                                        key !== 'row'
                                                    ) {
                                                        existingItem[key] =
                                                            item[key] ??
                                                            existingItem[key];
                                                    }
                                                }
                                            } else {
                                                grouped.set(item.paramName, {
                                                    ...item,
                                                });
                                            }
                                        }
                                    });

                                    // تبدیل Map به آرایه و ذخیره آن در paramsCustomList
                                    const mergedArray = Array.from(
                                        grouped.values(),
                                    );

                                    //  ادغام داده‌های جدید با داده‌های قبلی در paramsCustomList
                                    this.paramsCustomList = [
                                        ...this.paramsCustomList,
                                        ...mergedArray,
                                    ];
                                    this.paramsCustomList =
                                        this.mergeDuplicateParams(
                                            this.paramsCustomList,
                                        );
                                    this.paramsCustomList.forEach((item) => {
                                        this.matches = this.matches.map(
                                            (item) => item.trim(),
                                        );
                                        if (
                                            this.matches.includes(
                                                item.paramName,
                                            )
                                        ) {
                                            item.matched = 1; // اگر در matches وجود داشت
                                        } else {
                                            item.matched = 0; // در غیر این صورت
                                        }
                                    });
                                    // تنظیم tempCusAddParam با paramsCustomList جدید
                                    this.tempCusAddParam = [
                                        ...this.paramsCustomList,
                                    ];
                                    console.error(
                                        'this.paramsCustomList',
                                        JSON.stringify(this.paramsCustomList),
                                    );
                                }

                                for (
                                    let k = 0;
                                    k < this.paramsCustomList.length;
                                    k++
                                ) {
                                    if (
                                        +this.paramsCustomList[k]
                                            .endpointDetailId != 0
                                    ) {
                                        this.nonStaticParam.push({
                                            dataType:
                                                +this.paramsCustomList[k]
                                                    .dataType,
                                            paramType: 0,
                                            aliasOutputParamName: null,
                                            apiDataHubParseOutputParamDomain:
                                                null,
                                            actionType:
                                                +this.paramsCustomList[k]
                                                    .actionType,
                                            operationTypeId:
                                                +this.paramsCustomList[k]
                                                    .operationTypeId,
                                            endpointDetailId:
                                                +this.paramsCustomList[k]
                                                    .endpointDetailId,
                                        });
                                    }
                                }
                                console.error(
                                    'nonStaticParam:',
                                    JSON.stringify(this.nonStaticParam),
                                );
                                this.checkDontCareAndAddEleman();
                                for (
                                    let k = 0;
                                    k < this.paramsCustomList.length;
                                    k++
                                ) {
                                    tempList[k] = Object.assign(
                                        this.paramsCustomList[k],
                                        { row: k + 1 },
                                    );
                                }
                            },
                            (error) => {
                                this._primengProgressBarService.hide();
                            },
                        );
                },
                reject: () => {
                },
            });
        }
        if (type == 'addQueryParams') {
            this.headerConfirm = 'clear params';
            this.confirmationService.confirm({
                message:
                    'validate query  موجب میگردد اطلاعات جاری پاک شوند.آیا از پاکسازی params اطمینان داردید؟',
                accept: () => {
                    let levelId = 1;
                    let recordId = this.apiId;
                    let registerTemp: EndpointheaderDto;

                    registerTemp = {
                        actionType: 3,
                        status: 1,
                        inputName: obj.paramName,
                        inputValue: '*',
                        ouputName: obj.paramName,
                        outputValue: '*',
                        detailType: this.type == 1 ? 2 : 3,
                        checkElementPath: null,
                    };
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService
                        .registerEndpointdetail(levelId, recordId, registerTemp)
                        .subscribe(
                            (a) => {
                                this._primengProgressBarService.hide();

                                this.paramsCustomList.length > 0
                                    ? (this.tempCusAddParam =
                                        this.paramsCustomList)
                                    : this.tempCusAddParam;
                                this.paramsCustomList = [];
                                this.nonStaticParam = [];

                                const regex = /:\s*\w+/g;
                                // const regex = /:\w+/g;
                                this._primengProgressBarService.show();
                                this.messagesApiFacadeService
                                    .endpointdetailByApi(this.apiId)
                                    .subscribe(
                                        (res) => {
                                            this._primengProgressBarService.hide();

                                            let tempDetailList;
                                            if (Array.isArray(res)) {
                                                tempDetailList = res;
                                            } else {
                                                tempDetailList.push(res);
                                            }
                                            let filterList = [];
                                            tempDetailList.map((x) =>
                                                x.status === 1
                                                    ? (x.status = true)
                                                    : (x.status = false),
                                            );
                                            let conter = 0;
                                            for (
                                                let i = 0;
                                                i < tempDetailList.length;
                                                i++
                                            ) {
                                                let counter = 0;
                                                if (
                                                    tempDetailList[i]
                                                        .isSystemEndpointDetail ==
                                                    1
                                                ) {
                                                } else {
                                                    if (
                                                        tempDetailList[i]
                                                            .status == 1
                                                    ) {
                                                        if (
                                                            this.type !=
                                                            undefined
                                                        ) {
                                                            if (
                                                                this.type == 2
                                                            ) {
                                                                if (
                                                                    tempDetailList[
                                                                        i
                                                                        ]
                                                                        .detailType ==
                                                                    3
                                                                ) {
                                                                    if (
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .actionType ==
                                                                        1
                                                                    ) {
                                                                        filterList.push(
                                                                            Object.assign(
                                                                                tempDetailList[
                                                                                    i
                                                                                    ],
                                                                                {
                                                                                    paramName:
                                                                                    tempDetailList[
                                                                                        i
                                                                                        ]
                                                                                        .ouputName,
                                                                                    paramValue:
                                                                                    tempDetailList[
                                                                                        i
                                                                                        ]
                                                                                        .outputValue,
                                                                                },
                                                                            ),
                                                                        );
                                                                    } else if (
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .actionType ==
                                                                        2
                                                                    ) {
                                                                        filterList.push(
                                                                            Object.assign(
                                                                                tempDetailList[
                                                                                    i
                                                                                    ],
                                                                                {
                                                                                    paramName:
                                                                                    tempDetailList[
                                                                                        i
                                                                                        ]
                                                                                        .inputName,
                                                                                    paramValue:
                                                                                    tempDetailList[
                                                                                        i
                                                                                        ]
                                                                                        .outputValue,
                                                                                },
                                                                            ),
                                                                        );
                                                                    } else if (
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .actionType ==
                                                                        3
                                                                    ) {
                                                                        filterList.push(
                                                                            Object.assign(
                                                                                tempDetailList[
                                                                                    i
                                                                                    ],
                                                                                {
                                                                                    paramName:
                                                                                    tempDetailList[
                                                                                        i
                                                                                        ]
                                                                                        .inputName,
                                                                                },
                                                                            ),
                                                                        );
                                                                    }
                                                                }
                                                            } else if (
                                                                this.type == 1
                                                            ) {
                                                                if (
                                                                    tempDetailList[
                                                                        i
                                                                        ]
                                                                        .detailType ==
                                                                    2
                                                                ) {
                                                                    if (
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .actionType ==
                                                                        1
                                                                    ) {
                                                                        filterList.push(
                                                                            Object.assign(
                                                                                tempDetailList[
                                                                                    i
                                                                                    ],
                                                                                {
                                                                                    paramName:
                                                                                    tempDetailList[
                                                                                        i
                                                                                        ]
                                                                                        .ouputName,
                                                                                    paramValue:
                                                                                    tempDetailList[
                                                                                        i
                                                                                        ]
                                                                                        .outputValue,
                                                                                },
                                                                            ),
                                                                        );
                                                                    } else if (
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .actionType ==
                                                                        2
                                                                    ) {
                                                                        filterList.push(
                                                                            Object.assign(
                                                                                tempDetailList[
                                                                                    i
                                                                                    ],
                                                                                {
                                                                                    paramName:
                                                                                    tempDetailList[
                                                                                        i
                                                                                        ]
                                                                                        .inputName,
                                                                                    paramValue:
                                                                                    tempDetailList[
                                                                                        i
                                                                                        ]
                                                                                        .outputValue,
                                                                                },
                                                                            ),
                                                                        );
                                                                    } else if (
                                                                        tempDetailList[
                                                                            i
                                                                            ]
                                                                            .actionType ==
                                                                        3
                                                                    ) {
                                                                        filterList.push(
                                                                            Object.assign(
                                                                                tempDetailList[
                                                                                    i
                                                                                    ],
                                                                                {
                                                                                    paramName:
                                                                                    tempDetailList[
                                                                                        i
                                                                                        ]
                                                                                        .inputName,
                                                                                },
                                                                            ),
                                                                        );
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            let counter = 0;
                                            for (
                                                let i = 0;
                                                i < filterList.length;
                                                i++
                                            ) {
                                                if (
                                                    !isNaN(
                                                        filterList[i]
                                                            .outputValue,
                                                    )
                                                ) {
                                                    filterList[i] =
                                                        Object.assign(
                                                            filterList[i],
                                                            { dataType: 1 },
                                                        );
                                                } else {
                                                    filterList[i] =
                                                        Object.assign(
                                                            filterList[i],
                                                            { dataType: 0 },
                                                        );
                                                }
                                            }

                                            const list1ParamNames =
                                                tempDetailList.map((item) => {
                                                    if (
                                                        item.paramName !=
                                                        undefined
                                                    ) {
                                                        item.paramName;
                                                    }
                                                });
                                            let tempList;

                                            tempList = this.matchElemanLists(
                                                filterList,
                                                this.cusParamList,
                                            );

                                            const items = tempList;
                                            const paramNamesSet = new Set();

                                            for (const item of items) {
                                                if (
                                                    !paramNamesSet.has(
                                                        item.name == undefined
                                                            ? item.paramName
                                                            : item.name,
                                                    )
                                                ) {
                                                    paramNamesSet.add(
                                                        item.name == undefined
                                                            ? item.paramName
                                                            : item.name,
                                                    );

                                                    this.matches.forEach(
                                                        (paramName) => {
                                                            const existingParam =
                                                                this.paramsCustomList.find(
                                                                    (item) =>
                                                                        item.paramName ===
                                                                        paramName,
                                                                );

                                                            if (
                                                                !existingParam
                                                            ) {
                                                                // اگر پارامتر وجود نداشت، آن را اضافه می‌کنیم
                                                                this.paramsCustomList.push(
                                                                    {
                                                                        paramName:
                                                                            item.name ==
                                                                            undefined
                                                                                ? item.paramName
                                                                                : item.name,
                                                                        paramValue:
                                                                            null,
                                                                        dataType:
                                                                        this
                                                                            .dataType,
                                                                        operationTypeId:
                                                                        this
                                                                            .operationTypeId,
                                                                        matched:
                                                                        item.matched,
                                                                        disabled:
                                                                        item.disabled,
                                                                        detailType:
                                                                        item.detailType,
                                                                        endpointDetailId:
                                                                        item.endpointDetailId,
                                                                    },
                                                                );
                                                                console.error(
                                                                    'this.paramsCustomList',
                                                                    JSON.stringify(
                                                                        this
                                                                            .paramsCustomList,
                                                                    ),
                                                                );
                                                            }
                                                        },
                                                    );
                                                }
                                            }
                                            for (
                                                let k = 0;
                                                k <
                                                this.paramsCustomList.length;
                                                k++
                                            ) {
                                                tempList[k] = Object.assign(
                                                    this.paramsCustomList[k],
                                                    { row: k + 1 },
                                                );
                                            }
                                            if (
                                                this.tempCusAddParam.length > 0
                                            ) {
                                                this.tempCusAddParam =
                                                    this.mergeData(
                                                        this.tempCusAddParam,
                                                        filterList,
                                                    );
                                                const updatedArray2 =
                                                    this.tempCusAddParam.map(
                                                        (item2) => {
                                                            const matchingItem =
                                                                this.paramsCustomList.find(
                                                                    (item1) => {
                                                                        return (
                                                                            item1.paramName ===
                                                                            item2.paramName
                                                                        );
                                                                    },
                                                                );

                                                            if (
                                                                matchingItem &&
                                                                item2.paramName !==
                                                                obj.paramName
                                                            ) {
                                                                // شرط برای موارد غیر استثنا
                                                                return {
                                                                    ...item2,
                                                                    detailType:
                                                                        matchingItem.detailType ??
                                                                        item2.detailType, // حفظ مقدار قبلی در صورت عدم وجود مقدار جدید
                                                                    endpointDetailId:
                                                                        matchingItem.endpointDetailId ??
                                                                        item2.endpointDetailId,
                                                                    paramValue:
                                                                        matchingItem.paramValue ??
                                                                        item2.paramValue,
                                                                    operationTypeId:
                                                                        matchingItem.operationTypeId ??
                                                                        item2.operationTypeId,
                                                                    disabled:
                                                                        true,
                                                                    matched:
                                                                        matchingItem.matched ??
                                                                        item2.matched,
                                                                };
                                                            }
                                                            let regex =
                                                                /\s*:\w+/g;
                                                            let match;

                                                            // استخراج مقادیر از customQuery
                                                            while (
                                                                (match =
                                                                    regex.exec(
                                                                        this
                                                                            .customQuery,
                                                                    )) !== null
                                                                ) {
                                                                match[0] =
                                                                    match[0].replace(
                                                                        /:/g,
                                                                        '',
                                                                    );
                                                                this.matches.push(
                                                                    match[0],
                                                                );
                                                            }

                                                            // ساختن لیست پارامترها با مقدار matched
                                                            this.cusParamList =
                                                                this.matches.map(
                                                                    (match) => {
                                                                        return {
                                                                            name: match.substring(
                                                                                0,
                                                                            ),
                                                                            actionType:
                                                                                null,
                                                                            matched:
                                                                                match ===
                                                                                item2.paramName
                                                                                    ? 1
                                                                                    : 0,
                                                                        };
                                                                    },
                                                                );
                                                            // مواردی که تغییری ندارند به همان صورت بازمی‌گردند

                                                            return item2;
                                                        },
                                                    );

                                                this.paramsCustomList = [];

                                                // Create a map to group by paramName
                                                const grouped = new Map();

                                                // Iterate over the data array
                                                updatedArray2.forEach(
                                                    (item) => {
                                                        if (
                                                            grouped.has(
                                                                item.paramName,
                                                            )
                                                        ) {
                                                            // If paramName already exists, combine data
                                                            const existingItem =
                                                                grouped.get(
                                                                    item.paramName,
                                                                );
                                                            for (const key in item) {
                                                                if (
                                                                    key !==
                                                                    'paramName' &&
                                                                    key !==
                                                                    'row'
                                                                ) {
                                                                    existingItem[
                                                                        key
                                                                        ] =
                                                                        item[
                                                                            key
                                                                            ] ??
                                                                        existingItem[
                                                                            key
                                                                            ];
                                                                }
                                                            }
                                                        } else {
                                                            grouped.set(
                                                                item.paramName,
                                                                { ...item },
                                                            );
                                                        }
                                                    },
                                                );

                                                // Convert the grouped map back to an array
                                                const mergedArray = Array.from(
                                                    grouped.values(),
                                                );

                                                // Add the exception object at the end
                                                const exceptionItem =
                                                    this.tempCusAddParam.find(
                                                        (item) =>
                                                            item.paramName ===
                                                            obj.paramName,
                                                    );
                                                if (exceptionItem) {
                                                    mergedArray.push({
                                                        ...exceptionItem, // تمام مقادیر اصلی exceptionItem
                                                        paramValue:
                                                        exceptionItem.paramValue, // مقدار اصلی در tempCusAddParam
                                                        operationTypeId:
                                                        exceptionItem.operationTypeId, // مقدار اصلی در tempCusAddParam
                                                        endpointDetailId:
                                                        exceptionItem.endpointDetailId, // مقدار اصلی در tempCusAddParam
                                                        detailType: 3, // مقدار ثابت
                                                        actionType:
                                                        exceptionItem.actionType, // مقدار اصلی در tempCusAddParam
                                                        disabled: true, // مقدار ثابت
                                                        matched: 1, // مقدار ثابت
                                                    });
                                                }

                                                this.paramsCustomList =
                                                    this.mergeDuplicateParams(
                                                        mergedArray,
                                                    );
                                                let match;
                                                // const matches = this.customQuery.match(regex);
                                                while (
                                                    (match = regex.exec(
                                                        this.customQuery,
                                                    )) !== null
                                                    ) {
                                                    match[0] = match[0].replace(
                                                        /:/g,
                                                        '',
                                                    );
                                                    this.matches.push(match[0]);
                                                }
                                                this.cusParamList =
                                                    this.matches.map(
                                                        (match) => ({
                                                            name: match.substring(
                                                                0,
                                                            ),
                                                        }),
                                                    );
                                                for (
                                                    let i = 0;
                                                    i <
                                                    this.cusParamList.length;
                                                    i++
                                                ) {
                                                    this.cusParamList[i] =
                                                        Object.assign(
                                                            this.cusParamList[
                                                                i
                                                                ],
                                                            { actionType: null },
                                                        );
                                                }
                                                this.nonStaticParam = [];
                                                for (
                                                    let k = 0;
                                                    k <
                                                    this.paramsCustomList
                                                        .length;
                                                    k++
                                                ) {
                                                    if (
                                                        +this.paramsCustomList[
                                                            k
                                                            ].endpointDetailId != 0
                                                    ) {
                                                        this.nonStaticParam.push(
                                                            {
                                                                dataType:
                                                                    +this
                                                                        .paramsCustomList[
                                                                        k
                                                                        ].dataType,
                                                                paramType: 0,
                                                                aliasOutputParamName:
                                                                    null,
                                                                apiDataHubParseOutputParamDomain:
                                                                    null,
                                                                actionType:
                                                                    +this
                                                                        .paramsCustomList[
                                                                        k
                                                                        ]
                                                                        .actionType,
                                                                endpointDetailId:
                                                                    +this
                                                                        .paramsCustomList[
                                                                        k
                                                                        ]
                                                                        .endpointDetailId,
                                                            },
                                                        );
                                                    }
                                                }
                                                console.error(
                                                    'this.paramsCustomList',
                                                    JSON.stringify(
                                                        this.paramsCustomList,
                                                    ),
                                                );
                                                console.error(mergedArray);
                                                this.tempCusAddParam =
                                                    this.paramsCustomList;
                                            }
                                            this.checkDontCareAndAddEleman();
                                            for (
                                                let k = 0;
                                                k <
                                                this.paramsCustomList.length;
                                                k++
                                            ) {
                                                tempList[k] = Object.assign(
                                                    this.paramsCustomList[k],
                                                    { row: k + 1 },
                                                );
                                            }
                                        },
                                        (error) => {
                                            this._primengProgressBarService.hide();
                                        },
                                    );
                            },
                            (error) => {
                                this._primengProgressBarService.hide();
                            },
                        );
                },
                reject: () => {
                },
            });
        }
        if (type == 'addParams') {
            this.headerConfirm = 'clear params';
            this.confirmationService.confirm({
                message:
                    'validate query  موجب میگردد اطلاعات جاری پاک شوند.آیا از پاکسازی params اطمینان داردید؟',
                accept: () => {
                    let levelId = 1;
                    let recordId = this.apiId;
                    let registerTemp: EndpointheaderDto = {
                        actionType: 3,
                        status: 1,
                        inputName: obj.paramName,
                        inputValue: '*',
                        ouputName: obj.paramName,
                        outputValue: '*',
                        detailType: this.type == 1 ? 2 : 3,
                        checkElementPath: null,
                    };
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService
                        .registerEndpointdetail(levelId, recordId, registerTemp)
                        .subscribe(
                            (a) => {
                                this._primengProgressBarService.hide();
                                this.tempAddParam = this.paramsList;
                                console.error(this.paramsList);
                                this.paramsList = [];

                                this.loadNonStaticParams();
                            },
                            (error) => {
                                this._primengProgressBarService.hide();
                            },
                        );
                },
                reject: () => {
                },
            });
        }
        if (type == 'ignoreParams') {
            this.headerConfirm = 'توجه!!!';
            this.confirmationService.confirm({
                message:
                    'عدم افزودن المان سرویس موجب فراخوانی کل اطلاعات در دیتاهاب می گردد، آیا از نادیده گرفتن پارامتر ها اطمینان دارید؟',
                accept: () => {
                    let counter = 0;
                    for (let i = 0; i < this.paramsList.length; i++) {
                        if (this.paramsList[i].paramValue == undefined) {
                            counter++;
                        }
                    }

                    if (counter > 0) {
                        this.notifierService.showError({
                            detail: 'paramValue را لطفا وارد نمائید!',
                            life: 3000,
                        });

                        this.nextFlagDisabled = false;
                        this.activeIndex = 3;
                        this.paramFlag = true;
                        this.selectHubFlag = false;
                        this.backShowFlag = true;
                        this.nextShowFlag = true;
                        this.dbInfoFlag = false;
                        this.addFlag = true;
                        this.previewFlag = false;
                        this.FinalRegistrationFlag = false;
                        this.addMapFlag = false;
                        this.itemsHub = [
                            {
                                label: this.lblIndex0,
                                command: (event: any) => {
                                    this.activeIndex = 0;
                                },
                            },
                            {
                                label: this.lblIndex1,
                                command: (event: any) => {
                                    this.activeIndex = 1;
                                },
                            },
                            {
                                label: this.lblIndex2,
                                command: (event: any) => {
                                    this.activeIndex = 2;
                                },
                            },
                            {
                                label: this.lblIndex3,
                                command: (event: any) => {
                                    this.activeIndex = 3;
                                },
                            },
                            {
                                label: this.lblIndex4,
                                command: (event: any) => {
                                    this.activeIndex = 4;
                                },
                            },
                            {
                                label: this.lblIndex5,
                                command: (event: any) => {
                                    this.activeIndex = 5;
                                },
                            },
                            {
                                label: this.lblIndex6,
                                command: (event: any) => {
                                    this.activeIndex = 6;
                                },
                            },
                        ];
                    } else {
                        this.paramFlag = true;
                        this.backShowFlag = true;
                        this.nextShowFlag = true;
                        this.selectHubFlag = false;
                        this.dbInfoFlag = false;
                        this.addFlag = false;
                        this.previewFlag = false;
                        this.FinalRegistrationFlag = false;
                        this.addMapFlag = false;
                        this.querySuccessFlag && this.resultTestQueryFlag
                            ? (this.nextFlagDisabled = false)
                            : (this.nextFlagDisabled = true),
                            (this.tooltipNext =
                                'تست کوئری با موفقیت انجام نشده است!');
                        this.itemsHub = [
                            {
                                label: this.lblIndex0,
                                command: (event: any) => {
                                    this.activeIndex = 0;
                                },
                            },
                            {
                                label: this.lblIndex1,
                                command: (event: any) => {
                                    this.activeIndex = 1;
                                },
                            },
                            {
                                label: this.lblIndex2,
                                command: (event: any) => {
                                    this.activeIndex = 2;
                                },
                            },
                            {
                                label: this.lblIndex3,
                                command: (event: any) => {
                                    this.activeIndex = 3;
                                },
                            },
                            {
                                label: this.lblIndex4,
                                command: (event: any) => {
                                    this.activeIndex = 4;
                                },
                            },
                            {
                                label: this.lblIndex5,
                                command: (event: any) => {
                                    this.activeIndex = 5;
                                },
                            },
                            {
                                label: this.lblIndex6,
                                command: (event: any) => {
                                    this.activeIndex = 6;
                                },
                            },
                        ];
                    }
                },
                reject: () => {
                    this.activeIndex = 3;
                    this.paramFlag = true;
                    this.selectHubFlag = false;
                    this.backShowFlag = true;
                    this.nextShowFlag = true;
                    this.nextFlagDisabled = false;
                    this.dbInfoFlag = false;
                    this.addFlag = true;
                    this.previewFlag = false;
                    this.FinalRegistrationFlag = false;
                    this.addMapFlag = false;
                    this.itemsHub = [
                        {
                            label: this.lblIndex0,
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: this.lblIndex1,
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: this.lblIndex2,
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                        {
                            label: this.lblIndex3,
                            command: (event: any) => {
                                this.activeIndex = 3;
                            },
                        },
                        {
                            label: this.lblIndex4,
                            command: (event: any) => {
                                this.activeIndex = 4;
                            },
                        },
                        {
                            label: this.lblIndex5,
                            command: (event: any) => {
                                this.activeIndex = 5;
                            },
                        },
                        {
                            label: this.lblIndex6,
                            command: (event: any) => {
                                this.activeIndex = 6;
                            },
                        },
                    ];
                },
            });
        }
    }

    mergeParamLists(list1: any[], list2: any[]): any[] {
        const mergedList: any[] = [];
        const matchedIndices: Set<number> = new Set(); // برای ذخیره آیتم‌های تطابق‌یافته از لیست دوم

        // پردازش لیست اول
        list1.forEach((item1) => {
            let isMatched = false;

            // بررسی آیتم‌های لیست دوم
            list2.forEach((item2, index) => {
                const inputNameCleaned = item2?.inputName?.trim(); // حذف فاصله اضافی از inputName

                if (item1.paramName === inputNameCleaned) {
                    // ترکیب دو آبجکت، اما dataType از item1 در نظر گرفته می‌شود
                    mergedList.push({
                        ...item1,
                        ...item2,
                        dataType: item1.dataType, // dataType از item1 در خروجی استفاده می‌شود
                    });

                    matchedIndices.add(index); // ذخیره ایندکس تطابق‌یافته
                    isMatched = true;
                }
            });

            if (!isMatched) {
                // اگر تطابقی پیدا نشد، آیتم از لیست اول به تنهایی اضافه شود
                mergedList.push(item1);
            }
        });

        // اضافه کردن آیتم‌های باقی‌مانده از لیست دوم که تطابق نداشتند
        list2.forEach((item2, index) => {
            if (!matchedIndices.has(index)) {
                mergedList.push(item2);
            }
        });

        return mergedList;
    }

    addNonStatic(obj) {
        this.confirmDialog('addQueryParams', obj);
    }

    addNonStaticTextSql(obj) {
        this.confirmDialog('addParams', obj);
    }

    loadNonStaticParams() {
        if (this.paramsList.length > 0) {
            this.tempAddParam = this.paramsList;
            this.confirmDialog('param');
        } else {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .endpointdetailByApi(this.apiId)
                .subscribe(
                    (res) => {
                        this._primengProgressBarService.hide();

                        this.paramsList = [];
                        let tempDetailList;
                        if (Array.isArray(res)) {
                            tempDetailList = res;
                        } else {
                            tempDetailList.push(res);
                        }

                        tempDetailList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false),
                        );
                        let conter = 0;
                        for (let i = 0; i < tempDetailList.length; i++) {
                            let counter = 0;
                            if (tempDetailList[i].isSystemEndpointDetail == 1) {
                            } else {
                                if (tempDetailList[i].status == 1) {
                                    if (this.type != undefined) {
                                        if (this.type == 2) {
                                            if (
                                                tempDetailList[i].detailType ==
                                                3
                                            ) {
                                                if (
                                                    tempDetailList[i]
                                                        .actionType == 1
                                                ) {
                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            {
                                                                paramName:
                                                                tempDetailList[
                                                                    i
                                                                    ].ouputName,
                                                                paramValue:
                                                                tempDetailList[
                                                                    i
                                                                    ]
                                                                    .outputValue,
                                                            },
                                                        );
                                                } else if (
                                                    tempDetailList[i]
                                                        .actionType == 2
                                                ) {
                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            {
                                                                paramName:
                                                                tempDetailList[
                                                                    i
                                                                    ].inputName,
                                                                paramValue:
                                                                tempDetailList[
                                                                    i
                                                                    ]
                                                                    .outputValue,
                                                            },
                                                        );
                                                } else if (
                                                    tempDetailList[i]
                                                        .actionType == 3
                                                ) {
                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            {
                                                                paramName:
                                                                tempDetailList[
                                                                    i
                                                                    ].inputName,
                                                            },
                                                        );
                                                }

                                                if (
                                                    !isNaN(
                                                        tempDetailList[i]
                                                            .outputValue,
                                                    )
                                                ) {
                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            { dataType: 1 },
                                                        );
                                                } else {
                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            { dataType: 0 },
                                                        );
                                                }

                                                if (
                                                    this.paramsList.length > 0
                                                ) {
                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            { dataType: 0 },
                                                            { disabled: true },
                                                        );
                                                    this.paramsList.push(
                                                        tempDetailList[i],
                                                    );
                                                    this.paramsStaticList.push(
                                                        tempDetailList[i],
                                                    );
                                                } else {
                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            { dataType: 0 },
                                                            { disabled: true },
                                                        );
                                                    this.paramsList.push(
                                                        tempDetailList[i],
                                                    );
                                                    this.paramsStaticList.push(
                                                        tempDetailList[i],
                                                    );
                                                }
                                            }
                                        } else if (this.type == 1) {
                                            if (
                                                tempDetailList[i].detailType ==
                                                2
                                            ) {
                                                if (
                                                    tempDetailList[i]
                                                        .actionType == 1
                                                ) {
                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            {
                                                                paramName:
                                                                tempDetailList[
                                                                    i
                                                                    ].ouputName,
                                                                paramValue:
                                                                tempDetailList[
                                                                    i
                                                                    ]
                                                                    .outputValue,
                                                            },
                                                        );
                                                } else if (
                                                    tempDetailList[i]
                                                        .actionType == 2
                                                ) {
                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            {
                                                                paramName:
                                                                tempDetailList[
                                                                    i
                                                                    ].inputName,
                                                                paramValue:
                                                                tempDetailList[
                                                                    i
                                                                    ]
                                                                    .outputValue,
                                                            },
                                                        );
                                                } else if (
                                                    tempDetailList[i]
                                                        .actionType == 3
                                                ) {
                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            {
                                                                paramName:
                                                                tempDetailList[
                                                                    i
                                                                    ].inputName,
                                                            },
                                                        );
                                                }

                                                if (
                                                    !isNaN(
                                                        tempDetailList[i]
                                                            .outputValue,
                                                    )
                                                ) {
                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            { dataType: 1 },
                                                        );
                                                } else {
                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            { dataType: 0 },
                                                        );
                                                }

                                                if (
                                                    this.paramsList.length > 0
                                                ) {
                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            { disabled: true },
                                                        );
                                                    this.paramsList.push(
                                                        tempDetailList[i],
                                                    );
                                                    this.paramsStaticList.push(
                                                        tempDetailList[i],
                                                    );
                                                } else {
                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            { dataType: 0 },
                                                            { disabled: true },
                                                        );
                                                    this.paramsList.push(
                                                        tempDetailList[i],
                                                    );
                                                    this.paramsStaticList.push(
                                                        tempDetailList[i],
                                                    );
                                                    console.error(
                                                        'this.paramsList',
                                                        this.paramsList,
                                                    );
                                                    console.log(
                                                        'this.paramsStaticList',
                                                        this.paramsStaticList,
                                                    );
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        console.log('this.paramsList', this.paramsList);
                        console.log(
                            'this.paramsStaticList',
                            this.paramsStaticList,
                        );

                        if (this.tempAddParam.length > 0) {
                            const updatedArray2 = this.tempAddParam.map(
                                (item2) => {
                                    const matchingItem = this.paramsList.find(
                                        (item1) =>
                                            item1.inputName
                                                .trim()
                                                .toLowerCase() ===
                                            item2.paramName.trim().toLowerCase(),
                                    );

                                    // اگر مورد تطابق پیدا شد
                                    if (matchingItem) {
                                        return {
                                            ...item2,
                                            paramValue:
                                                matchingItem.paramValue ??
                                                item2.paramValue, // مقدار پیش‌فرض در صورت undefined بودن
                                            operationTypeId:
                                                matchingItem.operationTypeId ??
                                                item2.operationTypeId, // مقدار پیش‌فرض برای operationTypeId
                                            disabled: true,
                                            endpointDetailId:
                                            matchingItem.endpointDetailId,
                                            detailType: 1,
                                            dataType: item2.dataType, // مقدار dataType از item2 استفاده می‌شود
                                        };
                                    }

                                    // اگر موردی پیدا نشد، item2 بدون تغییر برگشت داده می‌شود
                                    return item2;
                                },
                            );
                            // this.paramsList = updatedArray2;
                            this.paramsList = this.processData(
                                updatedArray2,
                                1,
                            );
                            console.error(this.paramsList); // چاپ paramsList به منظور بررسی
                            this.paramsStaticList = this.processData(
                                this.paramsList,
                                2,
                            );

                            /*
                    actionType: 3
                    dataType: "0"
                    disabled: true
                    operationTypeId: "3"
                    paramName: "Output_Value"
                    paramValue: "1010"
                    row: 1
                    status: true
                    */
                        }
                        for (let k = 0; k < this.paramsList.length; k++) {
                            // بررسی وجود ویژگی 'row' در هر آیتم
                            if (!('row' in this.paramsList[k])) {
                                this.paramsList[k] = Object.assign(
                                    this.paramsList[k],
                                    { row: k + 1 },
                                );
                            }
                        }

                        console.log('this.paramsList', this.paramsList);
                        console.log(
                            'this.paramsStaticList',
                            this.paramsStaticList,
                        );
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    },
                );
        }
    }

    loadSpNonStaticParams() {
        let counter = 0;
        for (let i = 0; this.spParamsList.length > i; i++) {
            if (this.spParamsList[i].paramType == '0') {
                counter++;
            }
        }
        if (counter == 0) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .endpointdetailByApi(this.apiId)
                .subscribe(
                    (res) => {
                        this._primengProgressBarService.hide();
                        /*  this.spParamsList = []
                  this.staticAndNonStaticList = []*/
                        let tempDetailList;
                        if (Array.isArray(res)) {
                            //   tempDetailList = res
                            for (let o = 0; res.length > o; o++) {
                                if (res[o].isSystemEndpointDetail != 1) {
                                    if (res[o].detailType == 3) {
                                        if (!isNaN(res[o].outputValue)) {
                                            res[o] = Object.assign(res[o], {
                                                dataType: 1,
                                            });
                                        } else {
                                            res[o] = Object.assign(res[o], {
                                                dataType: 0,
                                            });
                                        }
                                        res[o] = Object.assign(
                                            res[o],
                                            { dataType: 0 },
                                            { disabled: true },
                                        );
                                        this.spParamsList.push({
                                            actionType: res[o].actionType,
                                            checkElementPath: null,
                                            dataType: res[o].dataType,
                                            detailType: res[o].detailType,
                                            disabled: true,
                                            endpointDetailId:
                                            res[o].endpointDetailId,
                                            paramName: res[o].inputName,
                                            testValue: res[o].inputValue,
                                            isSystemEndpointDetail:
                                            res[o].isSystemEndpointDetail,
                                            ouputName: res[o].ouputName,
                                            outputValue: res[o].outputValue,
                                            operationTypeId:
                                            res[o].operationTypeId,
                                            row: 1,
                                            status: true,
                                            paramType: '0',
                                            aliasOutputParamName: '',
                                            apiDataHubParseOutputParamDomain: {
                                                successValue: '',
                                            },
                                        });
                                        this.staticAndNonStaticList.push({
                                            endpointDetailId:
                                            res[o].endpointDetailId,
                                            dataType: +res[o].dataType,
                                            paramType: 0,
                                            aliasOutputParamName: null,
                                            operationTypeId: 0,
                                            apiDataHubParseOutputParamDomain:
                                                null,
                                        });
                                    }
                                }
                            }
                            let counterI = 0;
                            for (let k = 0; k < this.spParamsList.length; k++) {
                                if (this.spParamsList[k].paramType == '0') {
                                    counterI++;
                                    this.spParamsList[k] = Object.assign(
                                        this.spParamsList[k],
                                        { row: k + 1 },
                                        { name: 'I' + counterI },
                                    );
                                }
                            }
                        } else {
                            tempDetailList.push(res);

                            tempDetailList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false),
                            );
                            let conter = 0;
                            for (let i = 0; i < tempDetailList.length; i++) {
                                let counter = 0;

                                if (
                                    tempDetailList[i].isSystemEndpointDetail ==
                                    1
                                ) {
                                } else {
                                    if (tempDetailList[i].status == 1) {
                                        if (this.type != undefined) {
                                            if (this.type == 2) {
                                                if (
                                                    tempDetailList[i]
                                                        .detailType == 3
                                                ) {
                                                    if (
                                                        !isNaN(
                                                            tempDetailList[i]
                                                                .outputValue,
                                                        )
                                                    ) {
                                                        tempDetailList[i] =
                                                            Object.assign(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                                { dataType: 1 },
                                                            );
                                                    } else {
                                                        tempDetailList[i] =
                                                            Object.assign(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                                { dataType: 0 },
                                                            );
                                                    }

                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            { dataType: 0 },
                                                            { disabled: true },
                                                        );
                                                    this.spParamsList.push({
                                                        actionType:
                                                        tempDetailList[i]
                                                            .actionType,
                                                        checkElementPath: null,
                                                        dataType:
                                                        tempDetailList[i]
                                                            .dataType,
                                                        detailType:
                                                        tempDetailList[i]
                                                            .detailType,
                                                        disabled: true,
                                                        endpointDetailId:
                                                        tempDetailList[i]
                                                            .endpointDetailId,
                                                        paramName:
                                                        tempDetailList[i]
                                                            .inputName,
                                                        testValue:
                                                        tempDetailList[i]
                                                            .inputValue,
                                                        isSystemEndpointDetail:
                                                        tempDetailList[i]
                                                            .isSystemEndpointDetail,
                                                        ouputName:
                                                        tempDetailList[i]
                                                            .ouputName,
                                                        outputValue:
                                                        tempDetailList[i]
                                                            .outputValue,
                                                        row: 1,
                                                        status: true,
                                                        paramType: '0',
                                                        operationTypeId: '0',
                                                        aliasOutputParamName:
                                                            '',
                                                        apiDataHubParseOutputParamDomain:
                                                            {
                                                                successValue:
                                                                    '',
                                                            },
                                                    });
                                                    this.staticAndNonStaticList.push(
                                                        {
                                                            endpointDetailId:
                                                            tempDetailList[
                                                                i
                                                                ]
                                                                .endpointDetailId,
                                                            dataType:
                                                                +tempDetailList[
                                                                    i
                                                                    ].dataType,
                                                            operationTypeId:
                                                                +tempDetailList[
                                                                    i
                                                                    ]
                                                                    .operationTypeId,
                                                            paramType: 0,
                                                            aliasOutputParamName:
                                                                null,
                                                            apiDataHubParseOutputParamDomain:
                                                                null,
                                                        },
                                                    );
                                                }
                                            } else if (this.type == 1) {
                                                if (
                                                    tempDetailList[i]
                                                        .detailType == 2
                                                ) {
                                                    if (
                                                        !isNaN(
                                                            tempDetailList[i]
                                                                .outputValue,
                                                        )
                                                    ) {
                                                        tempDetailList[i] =
                                                            Object.assign(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                                { dataType: 1 },
                                                            );
                                                    } else {
                                                        tempDetailList[i] =
                                                            Object.assign(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                                { dataType: 0 },
                                                            );
                                                    }

                                                    tempDetailList[i] =
                                                        Object.assign(
                                                            tempDetailList[i],
                                                            { dataType: 0 },
                                                            { disabled: true },
                                                        );
                                                    this.spParamsList.push({
                                                        actionType:
                                                        tempDetailList[i]
                                                            .actionType,
                                                        checkElementPath: null,
                                                        dataType:
                                                        tempDetailList[i]
                                                            .dataType,
                                                        operationTypeId:
                                                        tempDetailList[i]
                                                            .operationTypeId,
                                                        detailType:
                                                        tempDetailList[i]
                                                            .detailType,
                                                        disabled: true,
                                                        endpointDetailId:
                                                        tempDetailList[i]
                                                            .endpointDetailId,
                                                        paramName:
                                                        tempDetailList[i]
                                                            .inputName,
                                                        testValue:
                                                        tempDetailList[i]
                                                            .inputValue,
                                                        isSystemEndpointDetail:
                                                        tempDetailList[i]
                                                            .isSystemEndpointDetail,
                                                        ouputName:
                                                        tempDetailList[i]
                                                            .ouputName,
                                                        outputValue:
                                                        tempDetailList[i]
                                                            .outputValue,
                                                        row: 1,
                                                        status: true,
                                                        paramType: '0',
                                                        aliasOutputParamName:
                                                            '',
                                                        apiDataHubParseOutputParamDomain:
                                                            {
                                                                successValue:
                                                                    '',
                                                            },
                                                    });
                                                    this.staticAndNonStaticList.push(
                                                        {
                                                            endpointDetailId:
                                                            tempDetailList[
                                                                i
                                                                ]
                                                                .endpointDetailId,
                                                            dataType:
                                                                +tempDetailList[
                                                                    i
                                                                    ].dataType,
                                                            operationTypeId:
                                                                +tempDetailList[
                                                                    i
                                                                    ]
                                                                    .operationTypeId,
                                                            paramType: 0,
                                                            aliasOutputParamName:
                                                                null,
                                                            apiDataHubParseOutputParamDomain:
                                                                null,
                                                        },
                                                    );
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            for (let k = 0; k < this.spParamsList.length; k++) {
                                this.spParamsList[k] = Object.assign(
                                    this.spParamsList[k],
                                    { row: k + 1 },
                                    { name: 'I' + (k + 1) },
                                );
                            }
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    },
                );
        } else {
            this.notifierService.showError({
                detail: 'پارام های سرویس لود شده اند!',
            });
        }
    }

    removeApiDataHubIdObject() {
        this.paramsList = this.paramsList.filter((item) => {
            return !item.hasOwnProperty('apiDataHubId');
        });
        this.paramsStaticList = this.paramsStaticList.filter((item) => {
            return item.status !== true && item.status !== false;
        });
    }

    fakeParamRegister() {
        if (this.validationParam()) {
            this.queryFailedFlag = false;
            this.querySuccessFlag = false;
            this.param = '';
            if (this.paramsList.length > 0) {
                if (
                    this.checkDuplicate(this.paramsList, {
                        paramName: this.paramName,
                        paramValue: this.paramValue,
                        dataType: this.dataType,
                        operationTypeId: this.operationTypeId,
                        status:
                            this.status == true
                                ? (this.status = true)
                                : (this.status = false),
                    })
                ) {
                    this.notifierService.showError({
                        detail: 'امکان افزودن Param Name تکراری وجود ندارد!',
                    });
                } else {
                    this.paramsList.push({
                        paramName: this.paramName,
                        paramValue: this.paramValue,
                        dataType: this.dataType,
                        operationTypeId: this.operationTypeId,
                        status:
                            this.status == true
                                ? (this.status = true)
                                : (this.status = false),
                    });

                    this.paramsStaticList.push({
                        paramName: this.paramName,
                        apiDataHubId: this.apiDataHubId,
                        paramValue: this.paramValue,
                        dataType: Number(this.dataType),
                        operationTypeId: +this.operationTypeId,
                        status:
                            this.status == true
                                ? (this.status = 1)
                                : (this.status = 0),
                    });
                    this.nextFlag = false;
                    this.paramName = null;
                    this.paramValue = null;
                    this.status = true;
                }
            } else {
                this.paramsList.push({
                    paramName: this.paramName,
                    paramValue: this.paramValue,
                    dataType: this.dataType,
                    operationTypeId: this.operationTypeId,
                    status:
                        this.status == true
                            ? (this.status = true)
                            : (this.status = false),
                });
                this.paramsStaticList.push({
                    paramName: this.paramName,
                    paramValue: this.paramValue,
                    dataType: Number(this.dataType),
                    operationTypeId: +this.operationTypeId,
                    status:
                        this.status == true
                            ? (this.status = 1)
                            : (this.status = 0),
                });
                this.paramName = null;
                this.paramValue = null;
                this.nextFlag = false;
                this.status = true;
            }
            for (let k = 0; k < this.paramsList.length; k++) {
                if ('row' in this.paramsList) {
                } else {
                    this.paramsList[k] = Object.assign(this.paramsList[k], {
                        row: k + 1,
                    });
                }
            }
            this.removeApiDataHubIdObject();
        }
    }

    addObject(list) {
        let newObject = {
            name: null,
            paramName: this.aliasOutputParamName,
            testValue: this.successValue,
            disabled: false,
            paramValue: this.paramValue,
            endpointDetailId: 0,
            dataType: this.dataType,
            operationTypeId: this.operationTypeId,
            paramType: this.paramType,
            aliasOutputParamName: this.aliasOutputParamName,
            apiDataHubParseOutputParamDomain: {
                successValue: this.successValue,
            },
        };
        if (this.spParamsList.length == 0) {
            let orCounter = 1;
            let oCounter = 1;
            let ocCounter = 1;
            let namePrefix = '';
            switch (newObject.paramType) {
                case '1':
                    namePrefix = 'O';
                    break;
                case '2':
                    namePrefix = 'OC';
                    break;
                case '3':
                    namePrefix = 'OR';

                    break;
                default:
                    namePrefix = 'Default';
            }
            // بررسی و تنظیم نام آبجکت
            if (namePrefix) {
                switch (namePrefix) {
                    case 'OR':
                        newObject.name = 'OR' + orCounter++;
                        break;
                    case 'O':
                        newObject.name = 'O' + oCounter++;
                        break;
                    case 'OC':
                        newObject.name = 'OC' + ocCounter++;
                        break;
                    default:
                        newObject.name = 'Default' + (list.length + 1);
                }
            }

            newObject.paramName = this.aliasOutputParamName;
            newObject.testValue = this.successValue;
            newObject.disabled = false;
            newObject.paramValue = this.paramValue;
            this.dataType != '2'
                ? (newObject.dataType = this.dataType)
                : (newObject.dataType = null);
            newObject.paramType = this.paramType;
            newObject.operationTypeId = this.operationTypeId;
            newObject.aliasOutputParamName = this.aliasOutputParamName;
            newObject.apiDataHubParseOutputParamDomain = {
                successValue: this.successValue,
            };

            if (newObject.paramType != '0') {
                let counter: number = -1; // شروع شمارنده منفی
                list.forEach((item) => {
                    if (item.paramType != '0') {
                        item.endpointDetailId = counter;
                        counter--;
                    }
                });
                newObject.endpointDetailId = counter; // تنظیم شمارنده منفی برای آبجکت جدید
            }
            this.spParamsList.push(newObject);
            this.staticAndNonStaticList.push({
                endpointDetailId: newObject.endpointDetailId,
                dataType: this.dataType != '2' ? this.dataType : null,
                /*  'dataType': +this.dataType,*/
                paramType: +this.paramType,
                operationTypeId: +this.operationTypeId,
                aliasOutputParamName:
                    this.aliasOutputParamName == undefined ||
                    this.aliasOutputParamName == ''
                        ? null
                        : this.aliasOutputParamName,
                apiDataHubParseOutputParamDomain:
                    this.successValue == undefined ||
                    this.successValue == '' ||
                    this.successValue == null
                        ? null
                        : {
                            successValue: this.successValue,
                        },
            });
        } else {
            const namePrefixes = ['OR', 'O', 'OC'];

            switch (this.paramType) {
                case '1':
                    newObject.name = 'O';
                    break;
                case '2':
                    newObject.name = 'OC';
                    break;
                case '3':
                    newObject.name = 'OR';

                    break;
                default:
                    newObject.name = 'Default';
            }
            let namePrefix;
            namePrefix = newObject.name;
            let maxIndex;
            if (namePrefix) {
                if (namePrefix == 'O') {
                    const currentIndexes = list
                        .filter((item) => item.name.startsWith(namePrefix))
                        .map((item) =>
                            parseInt(item.name.substring(namePrefix.length), 10),
                        )
                        .filter((index) => !isNaN(index)); // فیلتر کردن مقادیر غیرعددی

                    maxIndex = Math.max(...currentIndexes, 0);
                } else if (namePrefix == 'OC') {
                    const currentIndexes = list
                        .filter((item) => item.name.startsWith(namePrefix))
                        .map((item) =>
                            parseInt(item.name.substring(namePrefix.length), 10),
                        )
                        .filter((index) => !isNaN(index)); // فیلتر کردن مقادیر غیرعددی

                    maxIndex = Math.max(...currentIndexes, 0);
                } else if (namePrefix == 'OR') {
                    const currentIndexes = list
                        .filter((item) => item.name.startsWith(namePrefix))
                        .map((item) =>
                            parseInt(item.name.substring(namePrefix.length), 10),
                        )
                        .filter((index) => !isNaN(index)); // فیلتر کردن مقادیر غیرعددی

                    maxIndex = Math.max(...currentIndexes, 0);
                }

                newObject.name = namePrefix + (maxIndex + 1);
                newObject.paramName = this.aliasOutputParamName;
                newObject.testValue = this.successValue;
                newObject.operationTypeId = this.operationTypeId;
                newObject.disabled = false;
                newObject.paramValue = +this.paramValue;
                this.dataType != '2'
                    ? (newObject.dataType = this.dataType)
                    : (newObject.dataType = null);
                /* newObject.dataType = +this.dataType;*/
                newObject.paramType = this.paramType;
                newObject.aliasOutputParamName = this.aliasOutputParamName;
                newObject.apiDataHubParseOutputParamDomain = {
                    successValue: this.successValue,
                };
            }
            if (newObject.paramType != '0') {
                let counter: number = -1; // شروع شمارنده منفی
                list.forEach((item) => {
                    if (item.paramType != '0') {
                        item.endpointDetailId = counter;
                        counter--;
                    }
                });
                newObject.endpointDetailId = counter; // تنظیم شمارنده منفی برای آبجکت جدید
            }
            this.spParamsList.push(newObject);
            this.staticAndNonStaticList.push({
                endpointDetailId: newObject.endpointDetailId,
                dataType: +this.dataType,
                operationTypeId: +this.operationTypeId,
                paramType: +this.paramType,
                aliasOutputParamName:
                    this.aliasOutputParamName == undefined ||
                    this.aliasOutputParamName == ''
                        ? null
                        : this.aliasOutputParamName,
                apiDataHubParseOutputParamDomain:
                    this.successValue == undefined ||
                    this.successValue == '' ||
                    this.successValue == null
                        ? null
                        : {
                            successValue: this.successValue,
                        },
            });
        }
        this.nextFlagDisabled = false;
        this.paramName = null;
        this.paramValue = null;
        this.aliasOutputParamName = null;
        this.successValue = null;
        this.dataType = null;
        this.operationTypeId = null;
        this.paramType = '1';
        this.dataTypeFlag = false;
        for (let k = 0; k < this.spParamsList.length; k++) {
            if ('row' in this.spParamsList) {
            } else {
                this.spParamsList[k] = Object.assign(this.spParamsList[k], {
                    row: k + 1,
                });
            }
        }
        for (let k = 0; k < this.staticAndNonStaticList.length; k++) {
            if ('row' in this.staticAndNonStaticList) {
            } else {
                this.staticAndNonStaticList[k] = Object.assign(
                    this.staticAndNonStaticList[k],
                    { row: k + 1 },
                );
            }
        }
    }

    fakeParamSpRegister() {
        this.addObject(this.spParamsList);
    }

    fakeMapRegister() {
        if (this.validationMap()) {
            if (this.mapList.length > 0) {
                if (
                    this.mapcheckDuplicate(this.mapList, {
                        inputName: this.inputName,
                        outputName: this.outputName,
                        dataType: this.dataType,
                        isEcrypt:
                            this.isEcrypt == true
                                ? (this.isEcrypt = true)
                                : (this.isEcrypt = false),
                    })
                ) {
                    this.mapList.push({
                        inputName: this.inputName,
                        outputName: this.outputName,
                        dataType: this.dataType,
                        isEcrypt:
                            this.isEcrypt == true
                                ? (this.isEcrypt = true)
                                : (this.isEcrypt = false),
                    });
                    this.nextFlag = false;
                    this.inputName = null;
                    this.outputName = null;
                    this.isEcrypt = false;
                } else {
                    this.notifierService.showError({
                        detail: 'امکان افزودن input Name تکراری وجود ندارد!',
                    });
                }
            } else {
                this.mapList.push({
                    inputName: this.inputName,
                    outputName: this.outputName,
                    dataType: this.dataType,
                    isEcrypt:
                        this.isEcrypt == true
                            ? (this.isEcrypt = true)
                            : (this.isEcrypt = false),
                });
                this.inputName = null;
                this.outputName = null;
                this.isEcrypt = false;
                this.nextFlag = false;
            }
            for (let k = 0; k < this.mapList.length; k++) {
                if ('row' in this.mapList) {
                } else {
                    this.mapList[k] = Object.assign(this.mapList[k], {
                        row: k + 1,
                    });
                }
            }
        }
    }

    deleteMap(map) {
        let index = this.mapList.findIndex((obj) => obj.row === map.row);
        if (index > -1) {
            this.mapList.splice(index, 1);
            for (let k = 0; k < this.mapList.length; k++) {
                this.mapList[k] = Object.assign(this.mapList[k], {
                    row: k + 1,
                });
            }
        }
    }

    validationParam(): boolean {
        if (!this.paramName) {
            this.notifierService.showError({
                detail: 'لطفا نام پارامتر را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.paramValue) {
            this.notifierService.showError({
                detail: 'لطفا مقدار پارامتر را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.operationTypeId) {
            this.notifierService.showError({
                detail: 'لطفا عملگر را وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    validationMap(): boolean {
        if (!this.inputName) {
            this.notifierService.showError({
                detail: 'لطفا Input Name را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.outputName) {
            this.notifierService.showError({
                detail: 'لطفا Output Name را وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    mapcheckDuplicate(arr, newObj) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].inputName == newObj.inputName) {
                return false;
            }
        }
        return true;
    }

    checkDuplicate(arr, newObj) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].paramName == newObj.paramName) {
                return true;
            }
        }
        return false;
    }

    concatIp(e) {
        this.ipLbl = e.target.value;
        if (this.ipLbl != '') {
            this.ipLbl += ':';
        }
    }

    concatPort(e) {
        this.portLbl = e.target.value;
        if (this.portLbl != '') {
            this.portLbl += ';';
        }
    }

    concatUser(e) {
        this.userLbl = e.target.value;
        if (this.userLbl != '') {
            this.userLbl += ';';
        }
    }

    generateStarString(input) {
        let starString = ''; // رشته خالی برای نگهداری ستاره‌ها

        // حلقه برای عبور از کاراکترهای ورودی
        for (let i = 0; i < input.length; i++) {
            starString += '*'; // افزودن یک ستاره به رشته برای هر کاراکتر
        }

        return starString;
    }

    concatPassword(e) {
        this.passwordLbl = e.target.value;
        this.passwordLbl = this.generateStarString(this.passwordLbl); // فراخوانی تابع

        if (this.passwordLbl != '') {
            this.passwordLbl += ';';
        }
    }

    /*   matchList() {
           let match
           const regex = /=\s*:\s*\w+/g;
           while ((match = regex.exec(this.customQuery)) !== null) {

               match[0] = match[0].replace(/:/g, '');
               this.matches.push(match[0]);
           }
           this.cusParamList = this.matches.map(match => ({name: match.substring(0)}));
           for (let i = 0; i < this.cusParamList.length; i++) {
               this.cusParamList[i] = Object.assign(this.cusParamList[i],
                   {actionType: null})
           }
       }
   */

    /*matchElemanLists(list1, list2) {


        const list1ParamNames = list1.map(item => item.paramName);

        // ابتدا آیتم‌های list2 را بررسی می‌کنیم
        const result = list2.map(item => {
            const match = list1.find(element => element.paramName === item.name);
            if (match) {
                return {...item, ...match, disabled: true};
            } else {
                return {...item, disabled: false};
            }
        });

        // سپس آیتم‌های اضافی list1 که در list2 نیستند را اضافه می‌کنیم
        list1.forEach(item => {
            if (!list2.some(element => element.name === item.paramName)) {
                result.unshift({...item, disabled: true});
            }
        });

        return result;
    }*/
    regTextDBFlag: boolean | string;

    extractWhereConditions(sql) {
        const conditionRegex =
            /(WHERE|AND)\s+([A-Z0-9._]+)\s*=\s*([A-Z0-9._]+)/gi;
        let match;
        const conditions = [];

        while ((match = conditionRegex.exec(sql)) !== null) {
            conditions.push({
                key: match[2].trim(),
                value: match[3].trim(),
            });
        }

        return conditions;
    }

    validateQuery() {
        if (this.customQuery) {
            if (this.paramsCustomList.length > 0) {
                this.confirmDialog('relodCus');
            } else {
                debugger;
                this.paramsCustomList = [];
                this.nonStaticParam = [];
                this.matches = [];
                //  const regex = /:\w+/g;
                // const regex = /:\s*\w+/g;
                const regex = /\s*:\s*\w+/g;
                // /=\s*:\w+/g;
                let match;
                while ((match = regex.exec(this.customQuery)) !== null) {
                    match[0] = match[0].replace(/:/g, '');
                    this.matches.push(match[0]);
                }
                this.cusParamList = this.matches.map((match) => ({
                    name: match.substring(0),
                }));
                for (let i = 0; i < this.cusParamList.length; i++) {
                    this.cusParamList[i] = Object.assign(this.cusParamList[i], {
                        actionType: null,
                    });
                }
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .endpointdetailByApi(this.apiId)
                    .subscribe(
                        (res) => {
                            this._primengProgressBarService.hide();
                            let tempDetailList;
                            if (Array.isArray(res)) {
                                tempDetailList = res;
                            } else {
                                tempDetailList.push(res);
                            }

                            let filterList = [];
                            tempDetailList.map((x) =>
                                x.status === 1
                                    ? (x.status = true)
                                    : (x.status = false),
                            );
                            let conter = 0;
                            for (let i = 0; i < tempDetailList.length; i++) {
                                let counter = 0;
                                if (
                                    tempDetailList[i].isSystemEndpointDetail ==
                                    1
                                ) {
                                } else {
                                    if (tempDetailList[i].status == 1) {
                                        if (this.type != undefined) {
                                            if (this.type == 2) {
                                                if (
                                                    tempDetailList[i]
                                                        .detailType == 3
                                                ) {
                                                    if (
                                                        tempDetailList[i]
                                                            .actionType == 1
                                                    ) {
                                                        filterList.push(
                                                            Object.assign(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                                {
                                                                    paramName:
                                                                    tempDetailList[
                                                                        i
                                                                        ]
                                                                        .ouputName,
                                                                    paramValue:
                                                                    tempDetailList[
                                                                        i
                                                                        ]
                                                                        .outputValue,
                                                                },
                                                            ),
                                                        );
                                                    } else if (
                                                        tempDetailList[i]
                                                            .actionType == 2
                                                    ) {
                                                        filterList.push(
                                                            Object.assign(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                                {
                                                                    paramName:
                                                                    tempDetailList[
                                                                        i
                                                                        ]
                                                                        .inputName,
                                                                    paramValue:
                                                                    tempDetailList[
                                                                        i
                                                                        ]
                                                                        .outputValue,
                                                                },
                                                            ),
                                                        );
                                                    } else if (
                                                        tempDetailList[i]
                                                            .actionType == 3
                                                    ) {
                                                        filterList.push(
                                                            Object.assign(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                                {
                                                                    paramName:
                                                                    tempDetailList[
                                                                        i
                                                                        ]
                                                                        .inputName,
                                                                },
                                                            ),
                                                        );
                                                    }
                                                }
                                            } else if (this.type == 1) {
                                                if (
                                                    tempDetailList[i]
                                                        .detailType == 2
                                                ) {
                                                    if (
                                                        tempDetailList[i]
                                                            .actionType == 1
                                                    ) {
                                                        filterList.push(
                                                            Object.assign(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                                {
                                                                    paramName:
                                                                    tempDetailList[
                                                                        i
                                                                        ]
                                                                        .ouputName,
                                                                    paramValue:
                                                                    tempDetailList[
                                                                        i
                                                                        ]
                                                                        .outputValue,
                                                                },
                                                            ),
                                                        );
                                                    } else if (
                                                        tempDetailList[i]
                                                            .actionType == 2
                                                    ) {
                                                        filterList.push(
                                                            Object.assign(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                                {
                                                                    paramName:
                                                                    tempDetailList[
                                                                        i
                                                                        ]
                                                                        .inputName,
                                                                    paramValue:
                                                                    tempDetailList[
                                                                        i
                                                                        ]
                                                                        .outputValue,
                                                                },
                                                            ),
                                                        );
                                                    } else if (
                                                        tempDetailList[i]
                                                            .actionType == 3
                                                    ) {
                                                        filterList.push(
                                                            Object.assign(
                                                                tempDetailList[
                                                                    i
                                                                    ],
                                                                {
                                                                    paramName:
                                                                    tempDetailList[
                                                                        i
                                                                        ]
                                                                        .inputName,
                                                                },
                                                            ),
                                                        );
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            let counter = 0;
                            for (let i = 0; i < filterList.length; i++) {
                                if (!isNaN(filterList[i].outputValue)) {
                                    filterList[i] = Object.assign(
                                        filterList[i],
                                        { dataType: 1 },
                                    );
                                } else {
                                    filterList[i] = Object.assign(
                                        filterList[i],
                                        { dataType: 0 },
                                    );
                                }
                            }
                            // this.paramsCustomList.forEach(n=>{
                            const list1ParamNames = tempDetailList.map(
                                (item) => {
                                    if (item.paramName != undefined) {
                                        item.paramName;
                                    }
                                },
                            );
                            let tempList;
                            tempList = this.matchElemanLists(
                                filterList,
                                this.cusParamList,
                            );
                            const items = tempList;
                            const paramNamesSet = new Set();
                            for (const item of items) {
                                if (
                                    !paramNamesSet.has(
                                        item.name == undefined
                                            ? item.paramName
                                            : item.name,
                                    )
                                ) {
                                    paramNamesSet.add(
                                        item.name == undefined
                                            ? item.paramName
                                            : item.name,
                                    );

                                    this.matches.forEach((paramName) => {
                                        const existingParam =
                                            this.paramsCustomList.find(
                                                (item) =>
                                                    item.paramName === paramName,
                                            );

                                        if (!existingParam) {
                                            // اگر پارامتر وجود نداشت، آن را اضافه می‌کنیم
                                            this.paramsCustomList.push({
                                                paramName:
                                                    item.name == undefined
                                                        ? item.paramName
                                                        : item.name,
                                                paramValue: null,
                                                dataType: item.dataType,
                                                operationTypeId:
                                                item.operationTypeId,
                                                actionType: item.actionType,
                                                matched: item.matched,
                                                disabled: item.disabled,
                                                detailType: item.detailType,
                                                endpointDetailId:
                                                item.endpointDetailId,
                                            });
                                            console.error(
                                                'this.paramsCustomList',
                                                JSON.stringify(
                                                    this.paramsCustomList,
                                                ),
                                            );
                                        }
                                    });
                                }
                            }
                            this.paramsCustomList = this.mergeDuplicateParams(
                                this.paramsCustomList,
                            );
                            for (
                                let k = 0;
                                k < this.paramsCustomList.length;
                                k++
                            ) {
                                this.nonStaticParam.push({
                                    dataType: Number(
                                        this.paramsCustomList[k].dataType,
                                    ),
                                    operationTypeId:
                                        +this.paramsCustomList[k]
                                            .operationTypeId,
                                    paramType: 0,
                                    aliasOutputParamName: null,
                                    apiDataHubParseOutputParamDomain: null,
                                    actionType:
                                        +this.paramsCustomList[k].actionType,
                                    endpointDetailId:
                                        +this.paramsCustomList[k]
                                            .endpointDetailId,
                                });
                            }
                            for (
                                let k = 0;
                                k < this.paramsCustomList.length;
                                k++
                            ) {
                                tempList[k] = Object.assign(
                                    this.paramsCustomList[k],
                                    { row: k + 1 },
                                );
                                if (this.paramsCustomList[k].actionType) {
                                }
                            }

                            this.paramsCustomList = this.mergeData(
                                this.paramsCustomList,
                                filterList,
                            );
                            this.matches = this.matches.map((item) =>
                                item.trim(),
                            );
                            this.paramsCustomList.forEach((item) => {
                                if (this.matches.includes(item.paramName)) {
                                    item.matched = 1; // اگر در matches وجود داشت
                                } else {
                                    item.matched = 0; // در غیر این صورت
                                }
                            });
                            debugger;

                            this.paramsCustomList.forEach((item) => {
                                this.matches[0] = this.matches[0].replace(
                                    /=/g,
                                    '',
                                );
                                this.matches = this.matches.map((item) =>
                                    item.trim(),
                                );
                                if (this.matches.includes(item.paramName)) {
                                    item.matched = 1; // اگر در matches وجود داشت
                                } else {
                                    item.matched = 0; // در غیر این صورت
                                }
                            });
                            if (this.paramsCustomList.length == 0) {
                                this.notifierService.showWarning({
                                    detail: 'پارامتری در المان سرویس و متن وارد شده یافت نشد!',
                                    life: 3000,
                                });
                            }
                            this.paramsCustomList = this.mergeDuplicateParams(
                                this.paramsCustomList,
                            );
                            for (
                                let k = 0;
                                k < this.paramsCustomList.length;
                                k++
                            ) {
                                tempList[k] = Object.assign(
                                    this.paramsCustomList[k],
                                    { row: k + 1 },
                                );
                            }
                            let counter2 = 0;
                            for (
                                let i = 0;
                                i < this.paramsCustomList.length;
                                i++
                            ) {
                                if (this.paramsCustomList[i].matched == 0) {
                                    counter2++;
                                }
                            }
                            debugger;
                            if (counter2 == 0) {
                                this.nextFlagDisabled = false;
                            } else {
                                this.activeIndex = 2;
                                this.nextFlagDisabled = true;
                                this.tooltipNext = 'not matched params!';
                            }
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        },
                    );
            }
        } else {
            this.notifierService.showError({
                detail: 'لطفا کوئری را وارد نمائید ! ',
            });
        }
    }

    testQuery() {
        let tempObjHub = JSON.parse(window.localStorage.getItem('hubObj'));

        if (tempObjHub != undefined && tempObjHub != null) {
            if (this.hubId != null) {
                this.hubObj = {
                    apiId: null,
                    apiHubId: null,
                    rdate: null,
                    status: null,
                    downloadResultSet: null,
                    objectName: null,
                    commandTypeId: null,
                    isTestQuery: 0,
                    isFinal: 0,
                    hubId: null,
                };

                if (this.commandTypeId == '3') {
                    this.tempQuery = this.customQuery;
                }
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .testconnectionandquery(
                        this.hubId,
                        this.apiDataHubId,
                        this.tempQuery,
                    )
                    .subscribe(
                        (b) => {
                            this._primengProgressBarService.hide();
                            this.resultTestQueryFlag = true;
                            this.querySuccessFlag = true;
                            this.queryFailedFlag = false;
                            this.nextFlagDisabled = false;
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                            this.resultTestQueryFlag = true;
                            this.queryFailedFlag = true;
                            this.querySuccessFlag = false;
                            this.nextFlagDisabled = true;
                            this.tooltipNext =
                                'تست کوئری با موفقیت انجام نشده است!';
                        },
                    );
            }
        }
        // })
    }

    replaceParams(query, params) {
        let updatedQuery = this.replaceNewlineWithSpace(query);
        params.forEach((param) => {
            const regex = new RegExp(`:${param.paramName}`, 'g');

            if (param.dataType == '0') {
                updatedQuery = updatedQuery.replace(
                    regex,
                    param.paramValue !== null ? `'${param.paramValue}'` : 'NULL',
                );
            } else {
                updatedQuery = updatedQuery.replace(
                    regex,
                    param.paramValue !== null ? param.paramValue : 'NULL',
                );
            }
        });
        return updatedQuery;
    }

    testCusQuery() {
        let newSqlQuery = this.customQuery;

        this.paramsCustomList.forEach((param) => {
            const regex = new RegExp(`:${param.paramName}`, 'g');
            let paramValue;
            if (param.dataType == '0') {
                paramValue = `'${param.paramValue}'`;
            } else {
                paramValue = `${param.paramValue}`;
            }
            /* paramValue = param.dataType === "1" ? `"${param.paramValue}"` : param.paramValue;*/
            newSqlQuery = newSqlQuery.replace(regex, paramValue);
        });
        for (let k = 0; k < this.paramsCustomList.length; k++) {
            this.paramsCustomList[k] = Object.assign(this.paramsCustomList[k], {
                row: k + 1,
            });
        }
        let tempObjHub = JSON.parse(window.localStorage.getItem('hubObj'));

        let strReplace;
        if (tempObjHub != undefined && tempObjHub != null) {
            if (this.hubId != null) {
                this.hubObj = {
                    apiId: null,
                    apiHubId: null,
                    rdate: null,
                    status: null,
                    downloadResultSet: null,
                    objectName: null,
                    commandTypeId: null,
                    isTestQuery: 0,
                    isFinal: 0,
                    hubId: null,
                };
                this.hubObj.apiId = +this.apiId;
                this.hubObj.hubId = +this.hubId;
                this.hubObj.status = 1;
                this.hubObj.objectName = this.objectName;
                this.hubObj.commandTypeId = Number(this.commandTypeId);
                this.querySuccessFlag == true
                    ? (this.hubObj.isTestQuery = 1)
                    : this.querySuccessFlag;
                this.queryFailedFlag == true
                    ? (this.hubObj.isTestQuery = 0)
                    : this.queryFailedFlag;
                this.hubObj.isFinal = 0;
                this.downloadResultSet
                    ? (this.hubObj.downloadResultSet = 1)
                    : (this.hubObj.downloadResultSet = 0);

                if (this.commandTypeId == '3') {
                    strReplace = this.replaceParams(
                        newSqlQuery,
                        this.paramsCustomList,
                    );
                }
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .testconnectionandquery(
                        this.hubId,
                        this.apiDataHubId,
                        strReplace,
                    )
                    .subscribe(
                        (b) => {
                            this._primengProgressBarService.hide();
                            this.resultTestQueryFlag = true;
                            this.querySuccessFlag = true;
                            this.queryFailedFlag = false;
                            this.nextFlagDisabled = false;
                            this.nonStaticParam = [];

                            for (
                                let k = 0;
                                k < this.paramsCustomList.length;
                                k++
                            ) {
                                this.nonStaticParam.push({
                                    dataType: Number(
                                        this.paramsCustomList[k].dataType,
                                    ),
                                    operationTypeId:
                                        +this.paramsCustomList[k]
                                            .operationTypeId,
                                    paramType: 0,
                                    aliasOutputParamName: null,
                                    apiDataHubParseOutputParamDomain: null,
                                    actionType:
                                        +this.paramsCustomList[k].actionType,
                                    endpointDetailId:
                                        +this.paramsCustomList[k]
                                            .endpointDetailId,
                                });
                            }
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                            this.resultTestQueryFlag = true;
                            this.queryFailedFlag = true;
                            this.querySuccessFlag = false;
                            this.nextFlagDisabled = true;
                            this.tooltipNext =
                                'تست کوئری با موفقیت انجام نشده است!';
                        },
                    );
            }
        }
    }

    parseQuery() {
        let tempValid = false;
        for (let k = 0; k < this.paramsList.length; k++) {
            this.paramsList[k].paramValue == undefined
                ? (tempValid = false)
                : (tempValid = true);
        }

        if (tempValid) {
            let operation = ' = ';

            this.param = '';
            this.lblObjectName = this.objectName;
            for (let k = 0; k < this.paramsList.length; k++) {
                switch (this.paramsList[k].operationTypeId) {
                    case '1':
                        operation = ' > ';
                        break;
                    case '2':
                        operation = ' < ';
                        break;
                    case '3':
                        operation = ' = ';
                        break;
                    case '4':
                        operation = ' >= ';
                        break;

                    case '5':
                        operation = ' <= ';
                        break;
                    case '6':
                        operation = ' != ';
                        break;
                }
                if (this.paramsList[k].dataType == '0') {
                    this.paramsList.length > 0 && k != 0
                        ? (this.param += ' AND ')
                        : this.param;
                    // this.param += this.paramsList[k].paramName + operation + "\'" + this.paramsList[k].paramValue + "\'" + ' '
                    this.param +=
                        this.paramsList[k].paramName +
                        operation +
                        '\'' +
                        this.paramsList[k].paramValue +
                        '\'' +
                        ' ';
                } else if (this.paramsList[k].dataType == '1') {
                    this.paramsList.length > 0 && k != 0
                        ? (this.param += ' AND ')
                        : this.param;
                    this.param +=
                        this.paramsList[k].paramName +
                        operation +
                        this.paramsList[k].paramValue +
                        ' ';
                }
            }

            if (this.paramsList.length > 0) {
                this.param = ' WHERE ' + this.param;
                this.tempQuery =
                    this.templates + ' ' + this.lblObjectName + this.param;
            } else {
                this.tempQuery = this.templates + ' ' + this.lblObjectName;
            }
        } else {
            if (this.paramsList.length > 0) {
                this.notifierService.showError({
                    detail: 'لطفا paramValue را وارد نمائید ! ',
                });
            } else {
                this.lblObjectName = this.objectName;
                this.tempQuery = this.templates + ' ' + this.lblObjectName;
            }
        }
    }

    onClearSpParams() {
        if (this.spParamsList.length > 0) {
            this.confirmDialog('sp');
        }
    }

    onClearCusParams() {
        if (this.paramsCustomList.length > 0) {
            this.confirmDialog('cus');
        }
    }

    onClearParams() {
        if (this.paramsList.length > 0) {
            this.paramsList = [];
            this.paramsStaticList = [];
            this.tempAddParam = [];
        }
    }

    testConnectionMethod() {
        let tempObjHub = JSON.parse(window.localStorage.getItem('hubObj'));

        if (tempObjHub != null) {
            if (this.hubId != undefined && this.hubId != null) {
                this._primengProgressBarService.show();
                this.loadingButton = true;
                this.messagesApiFacadeService
                    .testconnection(this.hubId)
                    .subscribe(
                        (j) => {
                            this.loadingButton = false;
                            this._primengProgressBarService.hide();
                            this.resultTestConnectionFlag = true;
                            this.connectionSuccessFlag = true;
                            this.connectionFailedFlag = false;
                            this.nextFlagDisabled = false;
                        },
                        (error) => {
                            this.loadingButton = false;
                            this._primengProgressBarService.hide();
                            this.resultTestConnectionFlag = true;
                            this.connectionFailedFlag = true;
                            this.connectionSuccessFlag = false;
                            this.nextFlagDisabled = true;
                            this.tooltipNext =
                                'تست کانکشن باموفقیت انجام نشده است!';
                        },
                    );
            }
        }
    }

    onCancel() {
        this.close.emit('closeAndCreate');
        this.loadingButton = false;
    }

    selectedHub(event) {
        this.hubId = event.data.hubId;
    }

    onRowUnselect(event) {
        this.hubId = null;
    }

    validationAttachHub(): boolean {
        if (!this.hubId) {
            this.notifierService.showError({
                detail: 'لطفا ابتدا هاب مورد نظر را انتخاب نمائید! ',
            });
            return false;
        } else {
            return true;
        }
    }

    onKeydown(event): void {
        let mySelf = this;
        if (event.key === 'Enter') {
            mySelf.searchHubAttachListClick();
        }
    }

    changeCommand() {
        this.objectName = '';
        if (this.commandTypeId == '1') {
            this.customQueryFlag = false;
            this.spFlag = false;
        } else if (this.commandTypeId == '2') {
            this.customQueryFlag = false;
            this.spFlag = true;
        } else if (this.commandTypeId == '3') {
            this.customQueryFlag = true;
            this.spFlag = false;
        }
        this.paramsList = [];
        this.paramsCustomList = [];
        this.paramsStaticList = [];
        this.nonStaticParam = [];
        this.spParamsList = [];
        this.mapList = [];
    }

    search(
        statusCode,
        codeMessage,
        titleMessage,
        tableIdMessage,
        typeMessage,
        pagesize?,
        pageno?,
    ) {
        let startRow: number;

        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .messagesearch(
                codeMessage,
                titleMessage,
                tableIdMessage,
                typeMessage,
                null,
                pagesize,
                pageno,
            )
            .subscribe(
                (response) => {
                    this._primengProgressBarService.hide();

                    if (statusCode == 200) {
                        this.messagesList200 = response;
                    } else if (statusCode == 400) {
                        this.messagesList400 = response;
                    } else if (statusCode == 500) {
                        this.messagesList500 = response;
                    }

                    let messagesList;
                    let messageId;
                    if (statusCode == 200) {
                        messagesList = this.messagesList200;
                        messageId = this.messageId2X;
                    } else if (statusCode == 400) {
                        messagesList = this.messagesList400;
                        messageId = this.messageId4X;
                    } else if (statusCode == 500) {
                        messagesList = this.messagesList500;
                        messageId = this.messageId5X;
                    }

                    if (messagesList.length == 0) {
                        messagesList = [];
                    } else {
                        for (let i = 0; i < messagesList.length; i++) {
                            if (messagesList[i].messageId == messageId) {
                                this.selectedMessageId4XX = messagesList[i];
                                this.selectedMessageId5XX = messagesList[i];
                                this.selectedMessageId2XX = messagesList[i];
                                if (statusCode == 200) {
                                    this.message200Flag = true;
                                } else if (statusCode == 400) {
                                    this.message400Flag = true;
                                } else if (statusCode == 500) {
                                    this.message500Flag = true;
                                }
                            } else {
                                if (statusCode == 200) {
                                    this.message200Flag = true;
                                } else if (statusCode == 400) {
                                    this.message400Flag = true;
                                } else if (statusCode == 500) {
                                    this.message500Flag = true;
                                }
                            }
                        }
                        if (this.pageno != 0 && this.pageno != 1) {
                            for (let u = 0; u < messagesList.length; u++) {
                                messagesList[u] = Object.assign(
                                    messagesList[u],
                                    { row: u + startRow + 1 },
                                );
                            }
                        } else if (this.pageno == 1) {
                            for (let u = 0; u < messagesList.length; u++) {
                                messagesList[u] = Object.assign(
                                    messagesList[u],
                                    { row: u + this.pagesize + 1 },
                                );
                            }
                        } else {
                            for (let u = 0; u < messagesList.length; u++) {
                                messagesList[u] = Object.assign(
                                    messagesList[u],
                                    { row: u + 1 },
                                );
                            }
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                },
            );
    }

    messageClear400() {
        this.titleMessage400 = '';
        this.textMessage400 = '';
        this.textENMessage400 = '';
        this.tableIdMessage400 = '';
        this.typeMessage400 = '';
        this.selectedMessageId4XX = [];
        this.messageId = null;
        this.pageno = 0;
        this.pagesize = 5;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            400,
            '400',
            this.titleMessage400,
            this.tableIdMessage400,
            this.typeMessage400,
            this.pagesize,
            this.pageno,
        );
        this.nextBtn400Flag = false;
    }

    messageClear500() {
        this.titleMessage500 = '';
        this.textMessage500 = '';
        this.textENMessage500 = '';
        this.tableIdMessage500 = '';
        this.typeMessage500 = '';
        this.selectedMessageId5XX = [];
        this.messageId = null;
        this.pageno = 0;
        this.pagesize = 5;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            500,
            '500',
            this.titleMessage500,
            this.tableIdMessage500,
            this.typeMessage500,
            this.pagesize,
            this.pageno,
        );
        this.nextBtn500Flag = false;
        /* this.messageIdDe = null
         this.messageIdDe = ""
         this.codeMessageDe = ""
         this.titleMessageDe = ""
         this.tableIdDe = ""
         this.messageId5XX = null
         this.icon500_val = ''*/
        //this.messageSearch500()
    }

    updateHighlight() {
        this.highlightedQuery = this.customQuery
            .replace(
                /where\b(.*?)= *:([\w.]+)/gi,
                (match, beforeWhere, afterWhere) => {
                    return `where${beforeWhere}= <span class="highlighted">:${afterWhere}</span>`;
                },
            )
            .replace(/\n/g, '<br>') // برای نمایش خطوط جدید
            .replace(/ /g, '&nbsp;'); // برای نمایش فاصله‌ها
    }

    messageClear200() {
        this.titleMessage200 = '';
        this.textMessage200 = '';
        this.textENMessage200 = '';
        this.tableIdMessage200 = '';
        this.typeMessage200 = '';
        this.selectedMessageId2XX = [];
        this.messageId = null;
        this.pageno = 0;
        this.pagesize = 5;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            200,
            '200',
            this.titleMessage200,
            this.tableIdMessage200,
            this.typeMessage200,
            this.pagesize,
            this.pageno,
        );
        this.nextBtn200Flag = false;

        /* this.messageIdDe = null
         this.messageIdDe = ""
         this.codeMessageDe = ""
         this.titleMessageDe = ""
         this.tableIdDe = ""
         this.messageId2XX = null
         this.icon200_val = ''*/
        this.messageSearch200();
    }

    messageSearch400() {
        this.search(
            400,
            '400',
            this.titleMessage400,
            this.tableIdMessage400,
            this.typeMessage400,
            this.pagesize,
            this.pageno,
        );
    }

    messageSearch500() {
        this.search(
            500,
            '500',
            this.titleMessage500,
            this.tableIdMessage500,
            this.typeMessage500,
            this.pagesize,
            this.pageno,
        );
    }

    selectedMessage400(event) {
        this.icon400_val = 'pi pi-check';
        this.messageId4X = event.data.messageId;
        this.selectedMessageId4XX = event.data.messageId;
    }

    selectedMessage500(event) {
        this.messageId5X = event.data.messageId;
        this.selectedMessageId5XX = event.data.messageId;
        this.icon500_val = 'pi pi-check';
    }

    selectedMessage200(event) {
        this.messageId2X = event.data.messageId;
        this.selectedMessageId2XX = event.data.messageId;
        this.icon200_val = 'pi pi-check';
    }

    onRowUnselect500(event) {
        this.icon500_val = null;
        this.selectedMessageId5XX = null;
    }

    onRowUnselect400(event) {
        this.icon400_val = null;
        this.selectedMessageId4XX = null;
    }

    onRowUnselect200(event) {
        this.icon200_val = null;
        this.selectedMessageId2XX = null;
    }

    messageSearch200() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .messagesearch(
                200,
                this.titleMessage200,
                this.tableIdMessage200,
                this.typeMessage200,
            )
            .subscribe(
                (response) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(response)) {
                        this.messagesList200 = response;
                    } else {
                        this.messagesList200.push(response);
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                },
            );
    }

    openMessage200() {
        this.search(
            200,
            '200',
            this.titleMessage200,
            this.tableIdMessage200,
            this.typeMessage200,
            10,
            0,
        );
    }

    openMessage400() {
        this.search(
            400,
            '400',
            this.titleMessage400,
            this.tableIdMessage400,
            this.typeMessage400,
            10,
            0,
        );
    }

    openMessage500() {
        this.search(
            500,
            '500',
            this.titleMessage500,
            this.tableIdMessage500,
            this.typeMessage500,
            10,
            0,
        );
    }

    previousPageStatement200(): void {
        this.pageno -= 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            200,
            this.codeMessage200,
            this.titleMessage200,
            this.tableIdMessage200,
            this.typeMessage200,
            this.pagesize,
            this.pageno,
        );
    }

    nextPageStatement200(): void {
        this.pageno += 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            200,
            this.codeMessage200,
            this.titleMessage200,
            this.tableIdMessage200,
            this.typeMessage200,
            this.pagesize,
            this.pageno,
        );
    }

    OnchangePageno200(e) {
        this.pageno = 0;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + 1;
        this.search(
            200,
            this.codeMessage200,
            this.titleMessage200,
            this.tableIdMessage200,
            this.typeMessage200,
            this.pagesize,
            this.pageno,
        );
    }

    previousPageStatement400(): void {
        this.pageno -= 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            400,
            this.codeMessage400,
            this.titleMessage400,
            this.tableIdMessage400,
            this.typeMessage400,
            this.pagesize,
            this.pageno,
        );
    }

    nextPageStatement400(): void {
        this.pageno += 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            400,
            this.codeMessage400,
            this.titleMessage400,
            this.tableIdMessage400,
            this.typeMessage400,
            this.pagesize,
            this.pageno,
        );
    }

    OnchangePageno400(e) {
        this.pageno = 0;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + 1;
        this.search(
            400,
            this.codeMessage400,
            this.titleMessage400,
            this.tableIdMessage400,
            this.typeMessage400,
            this.pagesize,
            this.pageno,
        );
    }

    previousPageStatement500(): void {
        this.pageno -= 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            500,
            this.codeMessage500,
            this.titleMessage500,
            this.tableIdMessage500,
            this.typeMessage500,
            this.pagesize,
            this.pageno,
        );
    }

    nextPageStatement500(): void {
        this.pageno += 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            500,
            this.codeMessage500,
            this.titleMessage500,
            this.tableIdMessage500,
            this.typeMessage500,
            this.pagesize,
            this.pageno,
        );
    }

    OnchangePageno500(e) {
        this.pageno = 0;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + 1;
        this.search(
            500,
            this.codeMessage500,
            this.titleMessage500,
            this.tableIdMessage500,
            this.typeMessage500,
            this.pagesize,
            this.pageno,
        );
    }

    onChangeParamType() {
        if (this.paramType == '2') {
            this.dataType = null;
            this.dataTypeFlag = true;
        } else {
            this.dataType = null;
            this.dataTypeFlag = false;
        }
    }

    clear() {
        this.dbnameSearch = '';
        this.ipSearch = '';
        this.titleSearch = '';
        this.searchHubAttachList();
        this.pageno = 0;
        this.pagesize = 10;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    }

    searchHubAttachListClick() {
        this.pageno = 0;
        this.pagesize = 10;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.searchHubAttachList();
    }

    searchHubAttachList() {
        this.hubAttachList = [];
        let startRow: number;
        this.pageno != 0
            ? (startRow = this.pageno * this.pagesize)
            : (startRow = 0);

        this.loading = true;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .searchhub(
                this.pageno,
                this.pagesize,
                this.dbnameSearch,
                this.ipSearch,
                this.titleSearch,
            )
            .subscribe(
                (r) => {
                    this._primengProgressBarService.hide();
                    this.loading = false;
                    if (Array.isArray(r)) {
                        this.hubAttachList = r;
                    } else {
                        this.hubAttachList.push(r);
                    }
                    this.hubAttachList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false),
                    );
                    if (this.pageno != 0 && this.pageno != 1) {
                        for (let u = 0; u < this.hubAttachList.length; u++) {
                            this.hubAttachList[u] = Object.assign(
                                this.hubAttachList[u],
                                { row: u + startRow + 1 },
                            );
                        }
                    } else if (this.pageno == 1) {
                        for (let u = 0; u < this.hubAttachList.length; u++) {
                            this.hubAttachList[u] = Object.assign(
                                this.hubAttachList[u],
                                { row: u + this.pagesize + 1 },
                            );
                        }
                    } else {
                        for (let u = 0; u < this.hubAttachList.length; u++) {
                            this.hubAttachList[u] = Object.assign(
                                this.hubAttachList[u],
                                { row: u + 1 },
                            );
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                },
            );
    }

    nextPageStatement() {
        this.pageno += 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.searchHubAttachList();
    }

    previousPageStatement() {
        this.pageno -= 1;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.searchHubAttachList();
    }

    OnchangePageno(e) {
        this.pageno = 0;
        this.pageDescription = this.transloco.translate('hardCode.page') + ': ' + 1;
        this.searchHubAttachList();
    }

    attachHub() {
        this.loadingButton = false;
        if (this.validationAttachHub()) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.getdatahubinfo(this.apiId).subscribe(
                (b) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(b)) {
                        this.hubList = b;
                    } else {
                        this.hubList.push(b);
                    }
                    let counter = 0;
                    for (let k = 0; k < this.hubList.length; k++) {
                        this.hubList[k] = Object.assign(this.hubList[k], {
                            row: k + 1,
                        });
                        if (this.hubList[k].APIHUBID_STATUS == true) {
                            counter++;
                        }
                    }
                    if (this.hubList.length == 0 || counter == 0) {
                        this.attachFlag = false;

                        if (this.commandTypeId == '1') {
                            this.hubObj = {
                                apiId: null,
                                apiHubId: null,
                                rdate: null,
                                status: null,
                                downloadResultSet: null,
                                objectName: null,
                                commandTypeId: null,
                                isTestQuery: 0,
                                isFinal: 0,
                                hubId: null,
                            };
                            this.hubObj.apiId = +this.apiId;
                            this.hubObj.hubId = +this.hubId;
                            this.hubObj.apiHubId = +this.apiDataHubId;
                            this.hubObj.rdate = this.rDate.toString();
                            this.hubObj.status = 1;
                            this.hubObj.objectName = this.objectName;
                            this.hubObj.commandTypeId = Number(
                                this.commandTypeId,
                            );
                            this.querySuccessFlag == true
                                ? (this.hubObj.isTestQuery = 1)
                                : this.querySuccessFlag;
                            this.queryFailedFlag == true
                                ? (this.hubObj.isTestQuery = 0)
                                : this.queryFailedFlag;
                            this.hubObj.isFinal = 0;
                            this.downloadResultSet
                                ? (this.hubObj.downloadResultSet = 1)
                                : (this.hubObj.downloadResultSet = 0);

                            this._primengProgressBarService.show();
                            this.messagesApiFacadeService
                                .registerHubAttach(this.hubObj)
                                .subscribe(
                                    (l) => {
                                        this._primengProgressBarService.hide();

                                        for (
                                            let k = 0;
                                            k < this.paramsStaticList.length;
                                            k++
                                        ) {
                                            this.paramsStaticList[k] =
                                                Object.assign(
                                                    this.paramsStaticList[k],
                                                    {
                                                        apiHubId:
                                                        this.apiDataHubId,
                                                    },
                                                );
                                        }

                                        for (
                                            let k = 0;
                                            k < this.paramsStaticList.length;
                                            k++
                                        ) {
                                            this.paramsStaticList[k] =
                                                Object.assign(
                                                    this.paramsStaticList[k],
                                                    { actionType: null },
                                                );
                                        }
                                        /* let counter = 0
                             for (let r = 0; r < this.paramsStaticList.length; r++) {
                                 this.paramsStaticList[r] = Object.assign(this.paramsStaticList[r],
                                     {id: (r + 1)})
                                 if (this.paramsStaticList[r].paramType != '0') {

                                     counter--
                                     this.paramsStaticList[r].endpintdetailId = counter

                                 }
                             }*/

                                        if (this.paramsStaticList.length > 0) {
                                            if (this.tempAddParam.length > 0) {
                                                this.paramsList =
                                                    this.mergeParamLists(
                                                        this.tempAddParam,
                                                        this.paramsList,
                                                    );
                                                this.paramsStaticList =
                                                    this.mergeParamLists(
                                                        this.paramsList,
                                                        this.paramsStaticList,
                                                    );
                                                this.tempAddParam =
                                                    this.paramsList;

                                                for (
                                                    let k = 0;
                                                    k < this.paramsList.length;
                                                    k++
                                                ) {
                                                    this.paramsList[k] =
                                                        Object.assign(
                                                            this.paramsList[k],
                                                            { row: k + 1 },
                                                        );
                                                }
                                                // Create a map to group by paramName
                                                const grouped = new Map();
                                                const staticGrouped = new Map();
                                                // Iterate over the data array
                                                this.paramsList.forEach(
                                                    (item) => {
                                                        if (
                                                            grouped.has(
                                                                item.paramName,
                                                            )
                                                        ) {
                                                            // If paramName already exists, combine data
                                                            const existingItem =
                                                                grouped.get(
                                                                    item.paramName,
                                                                );
                                                            // Merge the two objects (you can modify this merging erroric based on your requirements)
                                                            for (const key in item) {
                                                                if (
                                                                    key !==
                                                                    'paramName' &&
                                                                    key !==
                                                                    'row'
                                                                ) {
                                                                    // Merge properties from the current item if they are different or undefined in the existing item
                                                                    existingItem[
                                                                        key
                                                                        ] =
                                                                        item[
                                                                            key
                                                                            ] ??
                                                                        existingItem[
                                                                            key
                                                                            ];
                                                                }
                                                            }
                                                        } else {
                                                            // If paramName doesn't exist, add the item to the map
                                                            grouped.set(
                                                                item.paramName,
                                                                { ...item },
                                                            );
                                                        }
                                                    },
                                                );
                                                this.paramsStaticList.forEach(
                                                    (item) => {
                                                        if (
                                                            staticGrouped.has(
                                                                item.paramName,
                                                            )
                                                        ) {
                                                            // If paramName already exists, combine data
                                                            const existingItem =
                                                                staticGrouped.get(
                                                                    item.paramName,
                                                                );
                                                            // Merge the two objects (you can modify this merging erroric based on your requirements)
                                                            for (const key in item) {
                                                                if (
                                                                    key !==
                                                                    'paramName' &&
                                                                    key !==
                                                                    'row'
                                                                ) {
                                                                    // Merge properties from the current item if they are different or undefined in the existing item
                                                                    existingItem[
                                                                        key
                                                                        ] =
                                                                        item[
                                                                            key
                                                                            ] ??
                                                                        existingItem[
                                                                            key
                                                                            ];
                                                                }
                                                            }
                                                        } else {
                                                            // If paramName doesn't exist, add the item to the map
                                                            staticGrouped.set(
                                                                item.paramName,
                                                                { ...item },
                                                            );
                                                        }
                                                    },
                                                );
                                                const mergedArray = Array.from(
                                                    grouped.values(),
                                                );
                                                const staticMergedArray =
                                                    Array.from(
                                                        staticGrouped.values(),
                                                    );
                                                for (
                                                    let k = 0;
                                                    k < mergedArray.length;
                                                    k++
                                                ) {
                                                    mergedArray[k] =
                                                        Object.assign(
                                                            mergedArray[k],
                                                            { row: k + 1 },
                                                        );
                                                }
                                                this.paramsList = mergedArray;
                                                this.paramsStaticList =
                                                    staticMergedArray;
                                                console.error(mergedArray);
                                                this.tempAddParam =
                                                    this.paramsList;
                                            }

                                            let tempArray: any[] =
                                                this.paramsStaticList;
                                            tempArray = tempArray.map((obj) => {
                                                let newObj = Object.assign(
                                                    {},
                                                    obj,
                                                );
                                                delete newObj.checkElementPath;
                                                delete newObj.detailType;
                                                delete newObj.disabled;
                                                delete newObj.id;
                                                delete newObj.status;
                                                delete newObj.row;
                                                delete newObj.paramValue;
                                                delete newObj.endpintdetailId;
                                                delete newObj.paramName;
                                                delete newObj.outputValue;
                                                delete newObj.ouputName;
                                                delete newObj.isSystemEndpointDetail;
                                                delete newObj.inputValue;
                                                delete newObj.inputName;
                                                newObj.operationTypeId = Number(
                                                    newObj.operationTypeId,
                                                );
                                                newObj.actionType = 0;
                                                newObj.paramType = 0;
                                                newObj.dataType =
                                                    +newObj.dataType;

                                                return newObj;
                                            });

                                            //  checkElementPath , detailType , disabled , endpintdetailId , id
                                            this._primengProgressBarService.show();
                                            this.messagesApiFacadeService
                                                .registerApihubparam(tempArray)
                                                .subscribe(
                                                    (p) => {
                                                        this._primengProgressBarService.hide();

                                                        let mappingListReg = [];
                                                        for (
                                                            let k = 0;
                                                            k <
                                                            this.mapList.length;
                                                            k++
                                                        ) {
                                                            //this.mapList[k].isEcrypt = this.mapList[k].isEcrypt ? 1 : 0;
                                                            this.mapList[k] =
                                                                Object.assign(
                                                                    this
                                                                        .mapList[
                                                                        k
                                                                        ],
                                                                    {
                                                                        apiHubId:
                                                                            +this
                                                                                .apiDataHubId,
                                                                    },
                                                                );
                                                        }
                                                        for (const item of this
                                                            .mapList) {
                                                            mappingListReg.push(
                                                                {
                                                                    inputName:
                                                                    item.inputName,
                                                                    outputName:
                                                                    item.outputName,
                                                                    dataType:
                                                                        +item.dataType,
                                                                    isEcrypt:
                                                                        item.isEcrypt
                                                                            ? 1
                                                                            : 0,
                                                                },
                                                            );
                                                        }
                                                        if (
                                                            mappingListReg.length >
                                                            0
                                                        ) {
                                                            for (
                                                                let k = 0;
                                                                k <
                                                                mappingListReg.length;
                                                                k++
                                                            ) {
                                                                mappingListReg[
                                                                    k
                                                                    ] =
                                                                    Object.assign(
                                                                        mappingListReg[
                                                                            k
                                                                            ],
                                                                        {
                                                                            apiHubId:
                                                                            this
                                                                                .apiDataHubId,
                                                                        },
                                                                    );
                                                            }
                                                            this._primengProgressBarService.show();
                                                            this.messagesApiFacadeService
                                                                .registerApidatahubmapresult(
                                                                    mappingListReg,
                                                                )
                                                                .subscribe(
                                                                    (h) => {
                                                                        this._primengProgressBarService.hide();

                                                                        this.HubAttachmentFlag =
                                                                            false;

                                                                        let hubObj: HubDto =
                                                                            new HubDto();
                                                                        hubObj.hubId =
                                                                            +this
                                                                                .hubId;
                                                                        hubObj.dbEngineId =
                                                                            +this
                                                                                .dbEngineId;
                                                                        hubObj.driverName =
                                                                            '-';
                                                                        hubObj.hubTitle =
                                                                            this.hubTitle;
                                                                        hubObj.ip =
                                                                            this.ip;
                                                                        hubObj.portNumber =
                                                                            +this
                                                                                .port;
                                                                        hubObj.userName =
                                                                            this.user;
                                                                        hubObj.password =
                                                                            this.password;
                                                                        hubObj.connectionPoolSize =
                                                                            this.connectionPoolSize;
                                                                        if (
                                                                            +this
                                                                                .selectedMessageId4XX ==
                                                                            0
                                                                        ) {
                                                                            hubObj.messageId4X =
                                                                                null;
                                                                        } else {
                                                                            hubObj.messageId4X =
                                                                                +this
                                                                                    .selectedMessageId4XX;
                                                                        }
                                                                        if (
                                                                            +this
                                                                                .selectedMessageId5XX ==
                                                                            0
                                                                        ) {
                                                                            hubObj.messageId5X =
                                                                                null;
                                                                        } else {
                                                                            hubObj.messageId5X =
                                                                                +this
                                                                                    .selectedMessageId5XX;
                                                                        }
                                                                        if (
                                                                            +this
                                                                                .selectedMessageId2XX ==
                                                                            0
                                                                        ) {
                                                                            hubObj.messageId2X =
                                                                                null;
                                                                        } else {
                                                                            hubObj.messageId2X =
                                                                                +this
                                                                                    .selectedMessageId2XX;
                                                                        }
                                                                        this
                                                                            .connectionSuccessFlag ==
                                                                        true
                                                                            ? (hubObj.isTestConnection = 1)
                                                                            : this
                                                                                .connectionSuccessFlag;
                                                                        hubObj.dbName =
                                                                            this.dbName;
                                                                        this
                                                                            .autoCommit ==
                                                                        true
                                                                            ? (hubObj.autoCommit = 1)
                                                                            : (hubObj.autoCommit = 0);
                                                                        this
                                                                            .allowCreateConnectionPool ==
                                                                        true
                                                                            ? (hubObj.allowCreateConnectionPool = 1)
                                                                            : (hubObj.allowCreateConnectionPool = 0);
                                                                        this._primengProgressBarService.show();
                                                                        this.messagesApiFacadeService
                                                                            .datahubRegister(
                                                                                hubObj,
                                                                            )
                                                                            .subscribe(
                                                                                (
                                                                                    ne,
                                                                                ) => {
                                                                                    this._primengProgressBarService.hide();
                                                                                    this.hubId =
                                                                                        ne.hubId;
                                                                                    this.connectionSuccessFlag =
                                                                                        false;
                                                                                    this.connectionFailedFlag =
                                                                                        false;
                                                                                    this.resultTestConnectionFlag =
                                                                                        false;
                                                                                    this._primengProgressBarService.show();
                                                                                    this.messagesApiFacadeService
                                                                                        .finalapidatahub(
                                                                                            +this
                                                                                                .apiDataHubId,
                                                                                            +this
                                                                                                .hubId,
                                                                                        )
                                                                                        .subscribe(
                                                                                            (
                                                                                                k,
                                                                                            ) => {
                                                                                                this._primengProgressBarService.hide();
                                                                                                this.notifierService.showSuccess(
                                                                                                    {
                                                                                                        detail: 'ثبت نهایی اطلاعات باموفقیت انجام شد!',
                                                                                                        life: 3000,
                                                                                                    },
                                                                                                );
                                                                                                this.close.emit(
                                                                                                    'closeAndCreate',
                                                                                                );
                                                                                            },
                                                                                            (
                                                                                                error,
                                                                                            ) => {
                                                                                                this._primengProgressBarService.hide();
                                                                                            },
                                                                                        );
                                                                                },
                                                                                (
                                                                                    error,
                                                                                ) => {
                                                                                    this._primengProgressBarService.hide();
                                                                                },
                                                                            );
                                                                    },
                                                                    (error) => {
                                                                        this._primengProgressBarService.hide();
                                                                    },
                                                                );
                                                        } else {
                                                            this.HubAttachmentFlag =
                                                                false;

                                                            let hubObj: HubDto =
                                                                new HubDto();
                                                            hubObj.hubId =
                                                                +this.hubId;
                                                            hubObj.dbEngineId =
                                                                +this
                                                                    .dbEngineId;
                                                            hubObj.driverName =
                                                                '-';
                                                            hubObj.hubTitle =
                                                                this.hubTitle;
                                                            hubObj.ip = this.ip;
                                                            hubObj.portNumber =
                                                                +this.port;
                                                            hubObj.userName =
                                                                this.user;
                                                            hubObj.password =
                                                                this.password;
                                                            hubObj.connectionPoolSize =
                                                                this.connectionPoolSize;
                                                            if (
                                                                +this
                                                                    .selectedMessageId4XX ==
                                                                0
                                                            ) {
                                                                hubObj.messageId4X =
                                                                    null;
                                                            } else {
                                                                hubObj.messageId4X =
                                                                    +this
                                                                        .selectedMessageId4XX;
                                                            }
                                                            if (
                                                                +this
                                                                    .selectedMessageId5XX ==
                                                                0
                                                            ) {
                                                                hubObj.messageId5X =
                                                                    null;
                                                            } else {
                                                                hubObj.messageId5X =
                                                                    +this
                                                                        .selectedMessageId5XX;
                                                            }
                                                            if (
                                                                +this
                                                                    .selectedMessageId2XX ==
                                                                0
                                                            ) {
                                                                hubObj.messageId2X =
                                                                    null;
                                                            } else {
                                                                hubObj.messageId2X =
                                                                    +this
                                                                        .selectedMessageId2XX;
                                                            }
                                                            this
                                                                .connectionSuccessFlag ==
                                                            true
                                                                ? (hubObj.isTestConnection = 1)
                                                                : this
                                                                    .connectionSuccessFlag;
                                                            hubObj.dbName =
                                                                this.dbName;
                                                            this.autoCommit ==
                                                            true
                                                                ? (hubObj.autoCommit = 1)
                                                                : (hubObj.autoCommit = 0);
                                                            this
                                                                .allowCreateConnectionPool ==
                                                            true
                                                                ? (hubObj.allowCreateConnectionPool = 1)
                                                                : (hubObj.allowCreateConnectionPool = 0);
                                                            this._primengProgressBarService.show();
                                                            this.messagesApiFacadeService
                                                                .datahubRegister(
                                                                    hubObj,
                                                                )
                                                                .subscribe(
                                                                    (ne) => {
                                                                        this._primengProgressBarService.hide();
                                                                        /*   let counter = 0
                                               for (let r = 0; r < this.paramsStaticList.length; r++) {
                                                   this.paramsStaticList[r] = Object.assign(this.paramsStaticList[r],
                                                       {id: (r + 1)})
                                                   if (this.paramsStaticList[r].paramType != '0') {

                                                       counter--
                                                       this.paramsStaticList[r].endpintdetailId = counter

                                                   }
                                               }*/

                                                                        this.hubId =
                                                                            ne.hubId;
                                                                        this.connectionSuccessFlag =
                                                                            false;
                                                                        this.connectionFailedFlag =
                                                                            false;
                                                                        this.resultTestConnectionFlag =
                                                                            false;
                                                                        this._primengProgressBarService.show();
                                                                        this.messagesApiFacadeService
                                                                            .finalapidatahub(
                                                                                +this
                                                                                    .apiDataHubId,
                                                                                +this
                                                                                    .hubId,
                                                                            )
                                                                            .subscribe(
                                                                                (
                                                                                    k,
                                                                                ) => {
                                                                                    this._primengProgressBarService.hide();
                                                                                    this.notifierService.showSuccess(
                                                                                        {
                                                                                            detail: 'ثبت نهایی اطلاعات باموفقیت انجام شد!',
                                                                                            life: 3000,
                                                                                        },
                                                                                    );
                                                                                    this.close.emit(
                                                                                        'closeAndCreate',
                                                                                    );
                                                                                    this.HubAttachmentFlag =
                                                                                        false;
                                                                                },
                                                                                (
                                                                                    error,
                                                                                ) => {
                                                                                    this._primengProgressBarService.hide();
                                                                                },
                                                                            );
                                                                    },
                                                                    (error) => {
                                                                        this._primengProgressBarService.hide();
                                                                    },
                                                                );
                                                        }
                                                    },
                                                    (error) => {
                                                        this._primengProgressBarService.hide();
                                                    },
                                                );
                                        } else {
                                            let mappingListReg = [];
                                            for (
                                                let k = 0;
                                                k < this.mapList.length;
                                                k++
                                            ) {
                                                //this.mapList[k].isEcrypt = this.mapList[k].isEcrypt ? 1 : 0;
                                                this.mapList[k] = Object.assign(
                                                    this.mapList[k],
                                                    {
                                                        apiHubId:
                                                            +this.apiDataHubId,
                                                    },
                                                );
                                            }
                                            for (const item of this.mapList) {
                                                mappingListReg.push({
                                                    inputName: item.inputName,
                                                    outputName: item.outputName,
                                                    dataType: +item.dataType,
                                                    isEcrypt: item.isEcrypt
                                                        ? 1
                                                        : 0,
                                                });
                                            }
                                            for (
                                                let k = 0;
                                                k < mappingListReg.length;
                                                k++
                                            ) {
                                                mappingListReg[k] =
                                                    Object.assign(
                                                        mappingListReg[k],
                                                        {
                                                            apiHubId:
                                                            this
                                                                .apiDataHubId,
                                                        },
                                                    );
                                            }
                                            if (this.mapList.length > 0) {
                                                this._primengProgressBarService.show();
                                                this.messagesApiFacadeService
                                                    .registerApidatahubmapresult(
                                                        mappingListReg,
                                                    )
                                                    .subscribe(
                                                        (h) => {
                                                            this._primengProgressBarService.hide();

                                                            this.HubAttachmentFlag =
                                                                false;

                                                            let hubObj: HubDto =
                                                                new HubDto();
                                                            hubObj.hubId =
                                                                +this.hubId;
                                                            hubObj.dbEngineId =
                                                                +this
                                                                    .dbEngineId;
                                                            hubObj.driverName =
                                                                '-';
                                                            hubObj.hubTitle =
                                                                this.hubTitle;
                                                            hubObj.ip = this.ip;
                                                            hubObj.portNumber =
                                                                +this.port;
                                                            hubObj.userName =
                                                                this.user;
                                                            hubObj.password =
                                                                this.password;
                                                            hubObj.connectionPoolSize =
                                                                this.connectionPoolSize;
                                                            if (
                                                                +this
                                                                    .selectedMessageId4XX ==
                                                                0
                                                            ) {
                                                                hubObj.messageId4X =
                                                                    null;
                                                            } else {
                                                                hubObj.messageId4X =
                                                                    +this
                                                                        .selectedMessageId4XX;
                                                            }
                                                            if (
                                                                +this
                                                                    .selectedMessageId5XX ==
                                                                0
                                                            ) {
                                                                hubObj.messageId5X =
                                                                    null;
                                                            } else {
                                                                hubObj.messageId5X =
                                                                    +this
                                                                        .selectedMessageId5XX;
                                                            }
                                                            if (
                                                                +this
                                                                    .selectedMessageId2XX ==
                                                                0
                                                            ) {
                                                                hubObj.messageId2X =
                                                                    null;
                                                            } else {
                                                                hubObj.messageId2X =
                                                                    +this
                                                                        .selectedMessageId2XX;
                                                            }
                                                            this
                                                                .connectionSuccessFlag ==
                                                            true
                                                                ? (hubObj.isTestConnection = 1)
                                                                : this
                                                                    .connectionSuccessFlag;
                                                            hubObj.dbName =
                                                                this.dbName;
                                                            this.autoCommit ==
                                                            true
                                                                ? (hubObj.autoCommit = 1)
                                                                : (hubObj.autoCommit = 0);
                                                            this
                                                                .allowCreateConnectionPool ==
                                                            true
                                                                ? (hubObj.allowCreateConnectionPool = 1)
                                                                : (hubObj.allowCreateConnectionPool = 0);
                                                            this._primengProgressBarService.show();
                                                            this.messagesApiFacadeService
                                                                .datahubRegister(
                                                                    hubObj,
                                                                )
                                                                .subscribe(
                                                                    (ne) => {
                                                                        this._primengProgressBarService.hide();
                                                                        this.hubId =
                                                                            ne.hubId;
                                                                        this.connectionSuccessFlag =
                                                                            false;
                                                                        this.connectionFailedFlag =
                                                                            false;
                                                                        this.resultTestConnectionFlag =
                                                                            false;
                                                                        this._primengProgressBarService.show();
                                                                        this.messagesApiFacadeService
                                                                            .finalapidatahub(
                                                                                +this
                                                                                    .apiDataHubId,
                                                                                +this
                                                                                    .hubId,
                                                                            )
                                                                            .subscribe(
                                                                                (
                                                                                    k,
                                                                                ) => {
                                                                                    this._primengProgressBarService.hide();
                                                                                    this.notifierService.showSuccess(
                                                                                        {
                                                                                            detail: 'ثبت نهایی اطلاعات باموفقیت انجام شد!',
                                                                                            life: 3000,
                                                                                        },
                                                                                    );
                                                                                    this.HubAttachmentFlag =
                                                                                        false;
                                                                                    this.close.emit(
                                                                                        'closeAndCreate',
                                                                                    );
                                                                                },
                                                                                (
                                                                                    error,
                                                                                ) => {
                                                                                    this._primengProgressBarService.hide();
                                                                                },
                                                                            );
                                                                    },
                                                                    (error) => {
                                                                        this._primengProgressBarService.hide();
                                                                    },
                                                                );
                                                        },
                                                        (error) => {
                                                            this._primengProgressBarService.hide();
                                                        },
                                                    );
                                            } else {
                                                let hubObj: HubDto =
                                                    new HubDto();
                                                hubObj.hubId = +this.hubId;
                                                hubObj.dbEngineId =
                                                    +this.dbEngineId;
                                                hubObj.driverName = '-';
                                                hubObj.hubTitle = this.hubTitle;
                                                hubObj.ip = this.ip;
                                                hubObj.portNumber = +this.port;
                                                hubObj.userName = this.user;
                                                hubObj.password = this.password;
                                                hubObj.connectionPoolSize =
                                                    this.connectionPoolSize;
                                                if (
                                                    +this
                                                        .selectedMessageId4XX ==
                                                    0
                                                ) {
                                                    hubObj.messageId4X = null;
                                                } else {
                                                    hubObj.messageId4X =
                                                        +this
                                                            .selectedMessageId4XX;
                                                }
                                                if (
                                                    +this
                                                        .selectedMessageId5XX ==
                                                    0
                                                ) {
                                                    hubObj.messageId5X = null;
                                                } else {
                                                    hubObj.messageId5X =
                                                        +this
                                                            .selectedMessageId5XX;
                                                }
                                                if (
                                                    +this
                                                        .selectedMessageId2XX ==
                                                    0
                                                ) {
                                                    hubObj.messageId2X = null;
                                                } else {
                                                    hubObj.messageId2X =
                                                        +this
                                                            .selectedMessageId2XX;
                                                }
                                                this.connectionSuccessFlag ==
                                                true
                                                    ? (hubObj.isTestConnection = 1)
                                                    : this
                                                        .connectionSuccessFlag;
                                                hubObj.dbName = this.dbName;
                                                this.autoCommit == true
                                                    ? (hubObj.autoCommit = 1)
                                                    : (hubObj.autoCommit = 0);
                                                this
                                                    .allowCreateConnectionPool ==
                                                true
                                                    ? (hubObj.allowCreateConnectionPool = 1)
                                                    : (hubObj.allowCreateConnectionPool = 0);
                                                this._primengProgressBarService.show();
                                                this.messagesApiFacadeService
                                                    .datahubRegister(hubObj)
                                                    .subscribe(
                                                        (ne) => {
                                                            this._primengProgressBarService.hide();
                                                            this.hubId =
                                                                ne.hubId;
                                                            this.connectionSuccessFlag =
                                                                false;
                                                            this.connectionFailedFlag =
                                                                false;
                                                            this.resultTestConnectionFlag =
                                                                false;

                                                            for (
                                                                let k = 0;
                                                                k <
                                                                this
                                                                    .paramsStaticList
                                                                    .length;
                                                                k++
                                                            ) {
                                                                this.paramsStaticList[
                                                                    k
                                                                    ] =
                                                                    Object.assign(
                                                                        this
                                                                            .paramsStaticList[
                                                                            k
                                                                            ],
                                                                        {
                                                                            apiHubId:
                                                                            this
                                                                                .apiDataHubId,
                                                                        },
                                                                    );
                                                            }
                                                            //برای don't care
                                                            for (
                                                                let k = 0;
                                                                k <
                                                                this
                                                                    .paramsStaticList
                                                                    .length;
                                                                k++
                                                            ) {
                                                                this.paramsStaticList[
                                                                    k
                                                                    ] =
                                                                    Object.assign(
                                                                        this
                                                                            .paramsStaticList[
                                                                            k
                                                                            ],
                                                                        {
                                                                            actionType: 0,
                                                                        },
                                                                    );
                                                            }

                                                            this._primengProgressBarService.show();
                                                            this.messagesApiFacadeService
                                                                .finalapidatahub(
                                                                    +this
                                                                        .apiDataHubId,
                                                                    +this.hubId,
                                                                )
                                                                .subscribe(
                                                                    (k) => {
                                                                        this._primengProgressBarService.hide();
                                                                        this.notifierService.showSuccess(
                                                                            {
                                                                                detail: 'ثبت نهایی اطلاعات باموفقیت انجام شد!',
                                                                                life: 3000,
                                                                            },
                                                                        );
                                                                        this.close.emit(
                                                                            'closeAndCreate',
                                                                        );
                                                                        this.HubAttachmentFlag =
                                                                            false;
                                                                        this.close.emit(
                                                                            'closeAndCreate',
                                                                        );
                                                                    },
                                                                    (error) => {
                                                                        this._primengProgressBarService.hide();
                                                                    },
                                                                );
                                                        },
                                                        (error1) => {
                                                            this._primengProgressBarService.hide();
                                                        },
                                                    );
                                            }
                                        }
                                    },
                                    (error) => {
                                        this._primengProgressBarService.hide();
                                    },
                                );
                            // })
                        } else if (this.commandTypeId == '2') {
                            this.hubObj = {
                                apiId: null,
                                status: null,
                                apiHubId: null,
                                rdate: null,
                                downloadResultSet: null,
                                objectName: null,
                                commandTypeId: null,
                                isTestQuery: 0,
                                isFinal: 0,
                                hubId: null,
                            };
                            (this.hubObj.apiHubId = +this.apiDataHubId),
                                (this.hubObj.apiId = +this.apiId);
                            this.hubObj.hubId = +this.hubId;
                            this.hubObj.status = 1;
                            this.hubObj.objectName = this.objectName;
                            this.hubObj.rdate = this.rDate.toString();
                            this.hubObj.commandTypeId = Number(
                                this.commandTypeId,
                            );
                            this.querySuccessFlag == true
                                ? (this.hubObj.isTestQuery = 1)
                                : this.querySuccessFlag;
                            this.queryFailedFlag == true
                                ? (this.hubObj.isTestQuery = 0)
                                : this.queryFailedFlag;
                            this.hubObj.isFinal = 0;
                            this.downloadResultSet
                                ? (this.hubObj.downloadResultSet = 1)
                                : (this.hubObj.downloadResultSet = 0);

                            this._primengProgressBarService.show();
                            this.messagesApiFacadeService
                                .registerHubAttach(this.hubObj)
                                .subscribe(
                                    (l) => {
                                        this._primengProgressBarService.hide();

                                        let counter = 0;
                                        if (
                                            this.staticAndNonStaticList.length >
                                            0
                                        ) {
                                            for (
                                                let q = 0;
                                                q <
                                                this.staticAndNonStaticList
                                                    .length;
                                                q++
                                            ) {
                                                if (
                                                    this.staticAndNonStaticList[
                                                        q
                                                        ].paramType != '0'
                                                ) {
                                                    counter--;
                                                    this.staticAndNonStaticList[
                                                        q
                                                        ].endpointDetailId =
                                                        counter;
                                                }
                                            }
                                        }

                                        this.staticAndNonStaticList =
                                            this.staticAndNonStaticList.map(
                                                (obj) => {
                                                    delete obj.row;
                                                    return obj;
                                                },
                                            );
                                        for (
                                            let k = 0;
                                            k <
                                            this.staticAndNonStaticList.length;
                                            k++
                                        ) {
                                            this.staticAndNonStaticList[k] =
                                                Object.assign(
                                                    this.staticAndNonStaticList[
                                                        k
                                                        ],
                                                    {
                                                        apiHubId:
                                                        this.apiDataHubId,
                                                    },
                                                );
                                        }
                                        //برای don't care
                                        for (
                                            let k = 0;
                                            k <
                                            this.staticAndNonStaticList.length;
                                            k++
                                        ) {
                                            this.staticAndNonStaticList[k] =
                                                Object.assign(
                                                    this.staticAndNonStaticList[
                                                        k
                                                        ],
                                                    { actionType: 0 },
                                                );
                                        }

                                        if (
                                            this.staticAndNonStaticList.length >
                                            0
                                        ) {
                                            this._primengProgressBarService.show();
                                            this.messagesApiFacadeService
                                                .registerApihubparam(
                                                    this.staticAndNonStaticList,
                                                )
                                                .subscribe(
                                                    (p) => {
                                                        this._primengProgressBarService.hide();

                                                        let mappingListReg = [];
                                                        for (
                                                            let k = 0;
                                                            k <
                                                            this.mapList.length;
                                                            k++
                                                        ) {
                                                            //this.mapList[k].isEcrypt = this.mapList[k].isEcrypt ? 1 : 0;
                                                            this.mapList[k] =
                                                                Object.assign(
                                                                    this
                                                                        .mapList[
                                                                        k
                                                                        ],
                                                                    {
                                                                        apiHubId:
                                                                            +this
                                                                                .apiDataHubId,
                                                                    },
                                                                );
                                                        }
                                                        for (const item of this
                                                            .mapList) {
                                                            mappingListReg.push(
                                                                {
                                                                    inputName:
                                                                    item.inputName,
                                                                    outputName:
                                                                    item.outputName,
                                                                    dataType:
                                                                        +item.dataType,
                                                                    isEcrypt:
                                                                        item.isEcrypt
                                                                            ? 1
                                                                            : 0,
                                                                },
                                                            );
                                                        }
                                                        mappingListReg =
                                                            mappingListReg.map(
                                                                (obj) => {
                                                                    delete obj.row;
                                                                    return obj;
                                                                },
                                                            );
                                                        for (
                                                            let k = 0;
                                                            k <
                                                            mappingListReg.length;
                                                            k++
                                                        ) {
                                                            mappingListReg[k] =
                                                                Object.assign(
                                                                    mappingListReg[
                                                                        k
                                                                        ],
                                                                    {
                                                                        apiHubId:
                                                                        this
                                                                            .apiDataHubId,
                                                                    },
                                                                );
                                                        }
                                                        if (
                                                            mappingListReg.length >
                                                            0
                                                        ) {
                                                            this._primengProgressBarService.show();
                                                            this.messagesApiFacadeService
                                                                .registerApidatahubmapresult(
                                                                    mappingListReg,
                                                                )
                                                                .subscribe(
                                                                    (h) => {
                                                                        this._primengProgressBarService.hide();

                                                                        let hubObj: HubDto =
                                                                            new HubDto();
                                                                        hubObj.hubId =
                                                                            +this
                                                                                .hubId;
                                                                        hubObj.dbEngineId =
                                                                            +this
                                                                                .dbEngineId;
                                                                        hubObj.driverName =
                                                                            '-';
                                                                        hubObj.hubTitle =
                                                                            this.hubTitle;
                                                                        hubObj.ip =
                                                                            this.ip;
                                                                        hubObj.portNumber =
                                                                            +this
                                                                                .port;
                                                                        hubObj.userName =
                                                                            this.user;
                                                                        hubObj.password =
                                                                            this.password;
                                                                        hubObj.connectionPoolSize =
                                                                            this.connectionPoolSize;
                                                                        if (
                                                                            +this
                                                                                .selectedMessageId4XX ==
                                                                            0
                                                                        ) {
                                                                            hubObj.messageId4X =
                                                                                null;
                                                                        } else {
                                                                            hubObj.messageId4X =
                                                                                +this
                                                                                    .selectedMessageId4XX;
                                                                        }
                                                                        if (
                                                                            +this
                                                                                .selectedMessageId5XX ==
                                                                            0
                                                                        ) {
                                                                            hubObj.messageId5X =
                                                                                null;
                                                                        } else {
                                                                            hubObj.messageId5X =
                                                                                +this
                                                                                    .selectedMessageId5XX;
                                                                        }
                                                                        if (
                                                                            +this
                                                                                .selectedMessageId2XX ==
                                                                            0
                                                                        ) {
                                                                            hubObj.messageId2X =
                                                                                null;
                                                                        } else {
                                                                            hubObj.messageId2X =
                                                                                +this
                                                                                    .selectedMessageId2XX;
                                                                        }
                                                                        this
                                                                            .connectionSuccessFlag ==
                                                                        true
                                                                            ? (hubObj.isTestConnection = 1)
                                                                            : this
                                                                                .connectionSuccessFlag;
                                                                        hubObj.dbName =
                                                                            this.dbName;
                                                                        this
                                                                            .autoCommit ==
                                                                        true
                                                                            ? (hubObj.autoCommit = 1)
                                                                            : (hubObj.autoCommit = 0);
                                                                        this
                                                                            .allowCreateConnectionPool ==
                                                                        true
                                                                            ? (hubObj.allowCreateConnectionPool = 1)
                                                                            : (hubObj.allowCreateConnectionPool = 0);
                                                                        this._primengProgressBarService.show();
                                                                        this.messagesApiFacadeService
                                                                            .datahubRegister(
                                                                                hubObj,
                                                                            )
                                                                            .subscribe(
                                                                                (
                                                                                    ne,
                                                                                ) => {
                                                                                    this._primengProgressBarService.hide();
                                                                                    this.hubId =
                                                                                        ne.hubId;
                                                                                    this.connectionSuccessFlag =
                                                                                        false;
                                                                                    this.connectionFailedFlag =
                                                                                        false;
                                                                                    this.resultTestConnectionFlag =
                                                                                        false;

                                                                                    this._primengProgressBarService.show();
                                                                                    this.messagesApiFacadeService
                                                                                        .finalapidatahub(
                                                                                            +this
                                                                                                .apiDataHubId,
                                                                                            +this
                                                                                                .hubId,
                                                                                        )
                                                                                        .subscribe(
                                                                                            (
                                                                                                k,
                                                                                            ) => {
                                                                                                this._primengProgressBarService.hide();
                                                                                                this.notifierService.showSuccess(
                                                                                                    {
                                                                                                        detail: 'ثبت نهایی اطلاعات باموفقیت انجام شد!',
                                                                                                        life: 3000,
                                                                                                    },
                                                                                                );
                                                                                                this.HubAttachmentFlag =
                                                                                                    false;
                                                                                                this.close.emit(
                                                                                                    'closeAndCreate',
                                                                                                );
                                                                                            },
                                                                                            (
                                                                                                error1,
                                                                                            ) => {
                                                                                                this._primengProgressBarService.hide();
                                                                                            },
                                                                                        );
                                                                                },
                                                                                (
                                                                                    error1,
                                                                                ) => {
                                                                                    this._primengProgressBarService.hide();
                                                                                },
                                                                            );
                                                                    },
                                                                    (
                                                                        error1,
                                                                    ) => {
                                                                        this._primengProgressBarService.hide();
                                                                    },
                                                                );
                                                        } else {
                                                            let hubObj: HubDto =
                                                                new HubDto();
                                                            hubObj.hubId =
                                                                +this.hubId;
                                                            hubObj.dbEngineId =
                                                                +this
                                                                    .dbEngineId;
                                                            hubObj.driverName =
                                                                '-';
                                                            hubObj.hubTitle =
                                                                this.hubTitle;
                                                            hubObj.ip = this.ip;
                                                            hubObj.portNumber =
                                                                +this.port;
                                                            hubObj.userName =
                                                                this.user;
                                                            hubObj.password =
                                                                this.password;
                                                            hubObj.connectionPoolSize =
                                                                this.connectionPoolSize;
                                                            if (
                                                                +this
                                                                    .selectedMessageId4XX ==
                                                                0
                                                            ) {
                                                                hubObj.messageId4X =
                                                                    null;
                                                            } else {
                                                                hubObj.messageId4X =
                                                                    +this
                                                                        .selectedMessageId4XX;
                                                            }
                                                            if (
                                                                +this
                                                                    .selectedMessageId5XX ==
                                                                0
                                                            ) {
                                                                hubObj.messageId5X =
                                                                    null;
                                                            } else {
                                                                hubObj.messageId5X =
                                                                    +this
                                                                        .selectedMessageId5XX;
                                                            }
                                                            if (
                                                                +this
                                                                    .selectedMessageId2XX ==
                                                                0
                                                            ) {
                                                                hubObj.messageId2X =
                                                                    null;
                                                            } else {
                                                                hubObj.messageId2X =
                                                                    +this
                                                                        .selectedMessageId2XX;
                                                            }
                                                            this
                                                                .connectionSuccessFlag ==
                                                            true
                                                                ? (hubObj.isTestConnection = 1)
                                                                : this
                                                                    .connectionSuccessFlag;
                                                            hubObj.dbName =
                                                                this.dbName;
                                                            this.autoCommit ==
                                                            true
                                                                ? (hubObj.autoCommit = 1)
                                                                : (hubObj.autoCommit = 0);
                                                            this
                                                                .allowCreateConnectionPool ==
                                                            true
                                                                ? (hubObj.allowCreateConnectionPool = 1)
                                                                : (hubObj.allowCreateConnectionPool = 0);
                                                            this._primengProgressBarService.show();
                                                            this.messagesApiFacadeService
                                                                .datahubRegister(
                                                                    hubObj,
                                                                )
                                                                .subscribe(
                                                                    (ne) => {
                                                                        this._primengProgressBarService.hide();
                                                                        this.hubId =
                                                                            ne.hubId;
                                                                        this.connectionSuccessFlag =
                                                                            false;
                                                                        this.connectionFailedFlag =
                                                                            false;
                                                                        this.resultTestConnectionFlag =
                                                                            false;

                                                                        this._primengProgressBarService.show();
                                                                        this.messagesApiFacadeService
                                                                            .finalapidatahub(
                                                                                +this
                                                                                    .apiDataHubId,
                                                                                +this
                                                                                    .hubId,
                                                                            )
                                                                            .subscribe(
                                                                                (
                                                                                    k,
                                                                                ) => {
                                                                                    this._primengProgressBarService.hide();
                                                                                    this.notifierService.showSuccess(
                                                                                        {
                                                                                            detail: 'ثبت نهایی اطلاعات باموفقیت انجام شد!',
                                                                                            life: 3000,
                                                                                        },
                                                                                    );
                                                                                    this.HubAttachmentFlag =
                                                                                        false;
                                                                                    this.close.emit(
                                                                                        'closeAndCreate',
                                                                                    );
                                                                                },
                                                                                (
                                                                                    error1,
                                                                                ) => {
                                                                                    this._primengProgressBarService.hide();
                                                                                },
                                                                            );
                                                                    },
                                                                    (
                                                                        error1,
                                                                    ) => {
                                                                        this._primengProgressBarService.hide();
                                                                    },
                                                                );
                                                        }
                                                    },
                                                    (error1) => {
                                                        this._primengProgressBarService.hide();
                                                    },
                                                );
                                        } else {
                                            let mappingListReg = [];
                                            for (
                                                let k = 0;
                                                k < this.mapList.length;
                                                k++
                                            ) {
                                                //this.mapList[k].isEcrypt = this.mapList[k].isEcrypt ? 1 : 0;
                                                this.mapList[k] = Object.assign(
                                                    this.mapList[k],
                                                    {
                                                        apiHubId:
                                                            +this.apiDataHubId,
                                                    },
                                                );
                                            }
                                            mappingListReg = mappingListReg.map(
                                                (obj) => {
                                                    delete obj.row;
                                                    return obj;
                                                },
                                            );
                                            for (const item of this.mapList) {
                                                mappingListReg.push({
                                                    inputName: item.inputName,
                                                    outputName: item.outputName,
                                                    dataType: +item.dataType,
                                                    isEcrypt: item.isEcrypt
                                                        ? 1
                                                        : 0,
                                                });
                                            }
                                            mappingListReg = mappingListReg.map(
                                                (obj) => {
                                                    delete obj.row;
                                                    return obj;
                                                },
                                            );
                                            for (
                                                let k = 0;
                                                k < mappingListReg.length;
                                                k++
                                            ) {
                                                mappingListReg[k] =
                                                    Object.assign(
                                                        mappingListReg[k],
                                                        {
                                                            apiHubId:
                                                            this
                                                                .apiDataHubId,
                                                        },
                                                    );
                                            }
                                            if (mappingListReg.length > 0) {
                                                this._primengProgressBarService.show();
                                                this.messagesApiFacadeService
                                                    .registerApidatahubmapresult(
                                                        mappingListReg,
                                                    )
                                                    .subscribe(
                                                        (h) => {
                                                            this._primengProgressBarService.hide();

                                                            let hubObj: HubDto =
                                                                new HubDto();
                                                            hubObj.hubId =
                                                                +this.hubId;
                                                            hubObj.dbEngineId =
                                                                +this
                                                                    .dbEngineId;
                                                            hubObj.driverName =
                                                                '-';
                                                            hubObj.hubTitle =
                                                                this.hubTitle;
                                                            hubObj.ip = this.ip;
                                                            hubObj.portNumber =
                                                                +this.port;
                                                            hubObj.userName =
                                                                this.user;
                                                            hubObj.password =
                                                                this.password;
                                                            hubObj.connectionPoolSize =
                                                                this.connectionPoolSize;
                                                            if (
                                                                +this
                                                                    .selectedMessageId4XX ==
                                                                0
                                                            ) {
                                                                hubObj.messageId4X =
                                                                    null;
                                                            } else {
                                                                hubObj.messageId4X =
                                                                    +this
                                                                        .selectedMessageId4XX;
                                                            }
                                                            if (
                                                                +this
                                                                    .selectedMessageId5XX ==
                                                                0
                                                            ) {
                                                                hubObj.messageId5X =
                                                                    null;
                                                            } else {
                                                                hubObj.messageId5X =
                                                                    +this
                                                                        .selectedMessageId5XX;
                                                            }
                                                            if (
                                                                +this
                                                                    .selectedMessageId2XX ==
                                                                0
                                                            ) {
                                                                hubObj.messageId2X =
                                                                    null;
                                                            } else {
                                                                hubObj.messageId2X =
                                                                    +this
                                                                        .selectedMessageId2XX;
                                                            }
                                                            this
                                                                .connectionSuccessFlag ==
                                                            true
                                                                ? (hubObj.isTestConnection = 1)
                                                                : this
                                                                    .connectionSuccessFlag;
                                                            hubObj.dbName =
                                                                this.dbName;
                                                            this.autoCommit ==
                                                            true
                                                                ? (hubObj.autoCommit = 1)
                                                                : (hubObj.autoCommit = 0);
                                                            this
                                                                .allowCreateConnectionPool ==
                                                            true
                                                                ? (hubObj.allowCreateConnectionPool = 1)
                                                                : (hubObj.allowCreateConnectionPool = 0);
                                                            this._primengProgressBarService.show();
                                                            this.messagesApiFacadeService
                                                                .datahubRegister(
                                                                    hubObj,
                                                                )
                                                                .subscribe(
                                                                    (ne) => {
                                                                        this._primengProgressBarService.hide();
                                                                        this.hubId =
                                                                            ne.hubId;
                                                                        this.connectionSuccessFlag =
                                                                            false;
                                                                        this.connectionFailedFlag =
                                                                            false;
                                                                        this.resultTestConnectionFlag =
                                                                            false;

                                                                        let hubObj: HubDto =
                                                                            new HubDto();
                                                                        hubObj.hubId =
                                                                            +this
                                                                                .hubId;
                                                                        hubObj.dbEngineId =
                                                                            +this
                                                                                .dbEngineId;
                                                                        hubObj.driverName =
                                                                            '-';
                                                                        hubObj.hubTitle =
                                                                            this.hubTitle;
                                                                        hubObj.ip =
                                                                            this.ip;
                                                                        hubObj.portNumber =
                                                                            +this
                                                                                .port;
                                                                        hubObj.userName =
                                                                            this.user;
                                                                        hubObj.password =
                                                                            this.password;
                                                                        hubObj.connectionPoolSize =
                                                                            this.connectionPoolSize;
                                                                        if (
                                                                            +this
                                                                                .selectedMessageId4XX ==
                                                                            0
                                                                        ) {
                                                                            hubObj.messageId4X =
                                                                                null;
                                                                        } else {
                                                                            hubObj.messageId4X =
                                                                                +this
                                                                                    .selectedMessageId4XX;
                                                                        }
                                                                        if (
                                                                            +this
                                                                                .selectedMessageId5XX ==
                                                                            0
                                                                        ) {
                                                                            hubObj.messageId5X =
                                                                                null;
                                                                        } else {
                                                                            hubObj.messageId5X =
                                                                                +this
                                                                                    .selectedMessageId5XX;
                                                                        }
                                                                        if (
                                                                            +this
                                                                                .selectedMessageId2XX ==
                                                                            0
                                                                        ) {
                                                                            hubObj.messageId2X =
                                                                                null;
                                                                        } else {
                                                                            hubObj.messageId2X =
                                                                                +this
                                                                                    .selectedMessageId2XX;
                                                                        }
                                                                        this
                                                                            .connectionSuccessFlag
                                                                            ? (hubObj.isTestConnection = 1)
                                                                            : this
                                                                                .connectionSuccessFlag;
                                                                        hubObj.dbName =
                                                                            this.dbName;
                                                                        this
                                                                            .autoCommit ==
                                                                        true
                                                                            ? (hubObj.autoCommit = 1)
                                                                            : (hubObj.autoCommit = 0);
                                                                        this
                                                                            .allowCreateConnectionPool ==
                                                                        true
                                                                            ? (hubObj.allowCreateConnectionPool = 1)
                                                                            : (hubObj.allowCreateConnectionPool = 0);
                                                                        this._primengProgressBarService.show();
                                                                        this.messagesApiFacadeService
                                                                            .datahubRegister(
                                                                                hubObj,
                                                                            )
                                                                            .subscribe(
                                                                                (
                                                                                    ne,
                                                                                ) => {
                                                                                    this._primengProgressBarService.hide();
                                                                                    this.hubId =
                                                                                        ne.hubId;
                                                                                    this.connectionSuccessFlag =
                                                                                        false;
                                                                                    this.connectionFailedFlag =
                                                                                        false;
                                                                                    this.resultTestConnectionFlag =
                                                                                        false;

                                                                                    this._primengProgressBarService.show();
                                                                                    this.messagesApiFacadeService
                                                                                        .finalapidatahub(
                                                                                            +this
                                                                                                .apiDataHubId,
                                                                                            +this
                                                                                                .hubId,
                                                                                        )
                                                                                        .subscribe(
                                                                                            (
                                                                                                k,
                                                                                            ) => {
                                                                                                this._primengProgressBarService.hide();
                                                                                                this.notifierService.showSuccess(
                                                                                                    {
                                                                                                        detail: 'ثبت نهایی اطلاعات باموفقیت انجام شد!',
                                                                                                        life: 3000,
                                                                                                    },
                                                                                                );
                                                                                                this.HubAttachmentFlag =
                                                                                                    false;
                                                                                                this.close.emit(
                                                                                                    'closeAndCreate',
                                                                                                );
                                                                                            },
                                                                                            (
                                                                                                error1,
                                                                                            ) => {
                                                                                                this._primengProgressBarService.hide();
                                                                                            },
                                                                                        );
                                                                                },
                                                                                (
                                                                                    error1,
                                                                                ) => {
                                                                                    this._primengProgressBarService.hide();
                                                                                },
                                                                            );
                                                                    },
                                                                    (
                                                                        error1,
                                                                    ) => {
                                                                        this._primengProgressBarService.hide();
                                                                    },
                                                                );
                                                        },
                                                        (error1) => {
                                                            this._primengProgressBarService.hide();
                                                        },
                                                    );
                                            } else {
                                                let hubObj: HubDto =
                                                    new HubDto();
                                                hubObj.hubId = +this.hubId;
                                                hubObj.dbEngineId =
                                                    +this.dbEngineId;
                                                hubObj.driverName = '-';
                                                hubObj.hubTitle = this.hubTitle;
                                                hubObj.ip = this.ip;
                                                hubObj.portNumber = +this.port;
                                                hubObj.userName = this.user;
                                                hubObj.password = this.password;
                                                hubObj.connectionPoolSize =
                                                    this.connectionPoolSize;
                                                if (
                                                    +this
                                                        .selectedMessageId4XX ==
                                                    0
                                                ) {
                                                    hubObj.messageId4X = null;
                                                } else {
                                                    hubObj.messageId4X =
                                                        +this
                                                            .selectedMessageId4XX;
                                                }
                                                if (
                                                    +this
                                                        .selectedMessageId5XX ==
                                                    0
                                                ) {
                                                    hubObj.messageId5X = null;
                                                } else {
                                                    hubObj.messageId5X =
                                                        +this
                                                            .selectedMessageId5XX;
                                                }
                                                if (
                                                    +this
                                                        .selectedMessageId2XX ==
                                                    0
                                                ) {
                                                    hubObj.messageId2X = null;
                                                } else {
                                                    hubObj.messageId2X =
                                                        +this
                                                            .selectedMessageId2XX;
                                                }
                                                this.connectionSuccessFlag ==
                                                true
                                                    ? (hubObj.isTestConnection = 1)
                                                    : this
                                                        .connectionSuccessFlag;
                                                hubObj.dbName = this.dbName;
                                                this.autoCommit == true
                                                    ? (hubObj.autoCommit = 1)
                                                    : (hubObj.autoCommit = 0);
                                                this
                                                    .allowCreateConnectionPool ==
                                                true
                                                    ? (hubObj.allowCreateConnectionPool = 1)
                                                    : (hubObj.allowCreateConnectionPool = 0);
                                                this._primengProgressBarService.show();
                                                this.messagesApiFacadeService
                                                    .datahubRegister(hubObj)
                                                    .subscribe(
                                                        (ne) => {
                                                            this._primengProgressBarService.hide();
                                                            this.hubId =
                                                                ne.hubId;
                                                            this.connectionSuccessFlag =
                                                                false;
                                                            this.connectionFailedFlag =
                                                                false;
                                                            this.resultTestConnectionFlag =
                                                                false;

                                                            this._primengProgressBarService.show();
                                                            this.messagesApiFacadeService
                                                                .finalapidatahub(
                                                                    +this
                                                                        .apiDataHubId,
                                                                    +this.hubId,
                                                                )
                                                                .subscribe(
                                                                    (k) => {
                                                                        this._primengProgressBarService.hide();
                                                                        this.notifierService.showSuccess(
                                                                            {
                                                                                detail: 'ثبت نهایی اطلاعات باموفقیت انجام شد!',
                                                                                life: 3000,
                                                                            },
                                                                        );
                                                                        this.HubAttachmentFlag =
                                                                            false;
                                                                        this.close.emit(
                                                                            'closeAndCreate',
                                                                        );
                                                                    },
                                                                    (
                                                                        error1,
                                                                    ) => {
                                                                        this._primengProgressBarService.hide();
                                                                    },
                                                                );
                                                        },
                                                        (error1) => {
                                                            this._primengProgressBarService.hide();
                                                        },
                                                    );
                                            }
                                        }
                                    },
                                    (error1) => {
                                        this._primengProgressBarService.hide();
                                    },
                                );
                        } else if (this.commandTypeId == '3') {
                            this.hubObj = {
                                apiId: null,
                                apiHubId: null,
                                rdate: null,
                                status: null,
                                downloadResultSet: null,
                                objectName: null,
                                commandTypeId: null,
                                isTestQuery: 0,
                                isFinal: 0,
                                hubId: null,
                            };
                            this.hubObj.apiId = +this.apiId;
                            this.hubObj.hubId = +this.hubId;
                            this.hubObj.status = 1;
                            this.hubObj.apiHubId = +this.apiDataHubId;
                            this.hubObj.objectName = this.customQuery;
                            this.hubObj.rdate = this.rDate.toString();
                            this.hubObj.commandTypeId = Number(
                                this.commandTypeId,
                            );
                            this.querySuccessFlag == true
                                ? (this.hubObj.isTestQuery = 1)
                                : this.querySuccessFlag;
                            this.queryFailedFlag == true
                                ? (this.hubObj.isTestQuery = 0)
                                : this.queryFailedFlag;
                            this.hubObj.isFinal = 0;
                            this.downloadResultSet
                                ? (this.hubObj.downloadResultSet = 1)
                                : (this.hubObj.downloadResultSet = 0);

                            this._primengProgressBarService.show();
                            this.messagesApiFacadeService
                                .registerHubAttach(this.hubObj)
                                .subscribe(
                                    (l) => {
                                        this._primengProgressBarService.hide();
                                        for (
                                            let k = 0;
                                            k < this.nonStaticParam.length;
                                            k++
                                        ) {
                                            this.nonStaticParam[k] =
                                                Object.assign(
                                                    this.nonStaticParam[k],
                                                    {
                                                        apiHubId:
                                                        this.apiDataHubId,
                                                    },
                                                );
                                            if (
                                                this.nonStaticParam[k]
                                                    .actionType == null ||
                                                this.nonStaticParam[k]
                                                    .actionType == 3
                                            ) {
                                                this.nonStaticParam[
                                                    k
                                                    ].actionType = 0;
                                            }
                                        }
                                        if (this.nonStaticParam.length > 0) {
                                            this._primengProgressBarService.show();
                                            this.messagesApiFacadeService
                                                .registerApihubparam(
                                                    this.nonStaticParam,
                                                )
                                                .subscribe(
                                                    (p) => {
                                                        this._primengProgressBarService.hide();

                                                        let hubObj: HubDto =
                                                            new HubDto();
                                                        hubObj.hubId =
                                                            +this.hubId;
                                                        hubObj.dbEngineId =
                                                            +this.dbEngineId;
                                                        hubObj.driverName = '-';
                                                        hubObj.hubTitle =
                                                            this.hubTitle;
                                                        hubObj.ip = this.ip;
                                                        hubObj.portNumber =
                                                            +this.port;
                                                        hubObj.userName =
                                                            this.user;
                                                        hubObj.password =
                                                            this.password;
                                                        hubObj.connectionPoolSize =
                                                            this.connectionPoolSize;
                                                        if (
                                                            +this
                                                                .selectedMessageId4XX ==
                                                            0
                                                        ) {
                                                            hubObj.messageId4X =
                                                                null;
                                                        } else {
                                                            hubObj.messageId4X =
                                                                +this
                                                                    .selectedMessageId4XX;
                                                        }
                                                        if (
                                                            +this
                                                                .selectedMessageId5XX ==
                                                            0
                                                        ) {
                                                            hubObj.messageId5X =
                                                                null;
                                                        } else {
                                                            hubObj.messageId5X =
                                                                +this
                                                                    .selectedMessageId5XX;
                                                        }
                                                        if (
                                                            +this
                                                                .selectedMessageId2XX ==
                                                            0
                                                        ) {
                                                            hubObj.messageId2X =
                                                                null;
                                                        } else {
                                                            hubObj.messageId2X =
                                                                +this
                                                                    .selectedMessageId2XX;
                                                        }
                                                        this
                                                            .connectionSuccessFlag ==
                                                        true
                                                            ? (hubObj.isTestConnection = 1)
                                                            : this
                                                                .connectionSuccessFlag;
                                                        hubObj.dbName =
                                                            this.dbName;
                                                        this.autoCommit == true
                                                            ? (hubObj.autoCommit = 1)
                                                            : (hubObj.autoCommit = 0);
                                                        this
                                                            .allowCreateConnectionPool ==
                                                        true
                                                            ? (hubObj.allowCreateConnectionPool = 1)
                                                            : (hubObj.allowCreateConnectionPool = 0);
                                                        this._primengProgressBarService.show();
                                                        this.messagesApiFacadeService
                                                            .datahubRegister(
                                                                hubObj,
                                                            )
                                                            .subscribe(
                                                                (ne) => {
                                                                    this._primengProgressBarService.hide();
                                                                    this.hubId =
                                                                        ne.hubId;
                                                                    this.connectionSuccessFlag =
                                                                        false;
                                                                    this.connectionFailedFlag =
                                                                        false;
                                                                    this.resultTestConnectionFlag =
                                                                        false;

                                                                    this._primengProgressBarService.show();
                                                                    this.messagesApiFacadeService
                                                                        .finalapidatahub(
                                                                            +this
                                                                                .apiDataHubId,
                                                                            +this
                                                                                .hubId,
                                                                        )
                                                                        .subscribe(
                                                                            (
                                                                                k,
                                                                            ) => {
                                                                                this._primengProgressBarService.hide();
                                                                                this.notifierService.showSuccess(
                                                                                    {
                                                                                        detail: 'ثبت نهایی اطلاعات باموفقیت انجام شد!',
                                                                                        life: 3000,
                                                                                    },
                                                                                );
                                                                                this.HubAttachmentFlag =
                                                                                    false;
                                                                                this.close.emit(
                                                                                    'closeAndCreate',
                                                                                );
                                                                            },
                                                                            (
                                                                                error1,
                                                                            ) => {
                                                                                this._primengProgressBarService.hide();
                                                                            },
                                                                        );
                                                                },
                                                                (error1) => {
                                                                    this._primengProgressBarService.hide();
                                                                },
                                                            );
                                                    },
                                                    (error1) => {
                                                        this._primengProgressBarService.hide();
                                                    },
                                                );
                                        } else {
                                            let hubObj: HubDto = new HubDto();
                                            hubObj.hubId = +this.hubId;
                                            hubObj.dbEngineId =
                                                +this.dbEngineId;
                                            hubObj.driverName = '-';
                                            hubObj.hubTitle = this.hubTitle;
                                            hubObj.ip = this.ip;
                                            hubObj.portNumber = +this.port;
                                            hubObj.userName = this.user;
                                            hubObj.password = this.password;
                                            hubObj.connectionPoolSize =
                                                this.connectionPoolSize;
                                            if (
                                                +this.selectedMessageId4XX == 0
                                            ) {
                                                hubObj.messageId4X = null;
                                            } else {
                                                hubObj.messageId4X =
                                                    +this.selectedMessageId4XX;
                                            }
                                            if (
                                                +this.selectedMessageId5XX == 0
                                            ) {
                                                hubObj.messageId5X = null;
                                            } else {
                                                hubObj.messageId5X =
                                                    +this.selectedMessageId5XX;
                                            }
                                            if (
                                                +this.selectedMessageId2XX == 0
                                            ) {
                                                hubObj.messageId2X = null;
                                            } else {
                                                hubObj.messageId2X =
                                                    +this.selectedMessageId2XX;
                                            }
                                            this.connectionSuccessFlag == true
                                                ? (hubObj.isTestConnection = 1)
                                                : this.connectionSuccessFlag;
                                            hubObj.dbName = this.dbName;
                                            this.autoCommit == true
                                                ? (hubObj.autoCommit = 1)
                                                : (hubObj.autoCommit = 0);
                                            this.allowCreateConnectionPool ==
                                            true
                                                ? (hubObj.allowCreateConnectionPool = 1)
                                                : (hubObj.allowCreateConnectionPool = 0);
                                            this._primengProgressBarService.show();
                                            this.messagesApiFacadeService
                                                .datahubRegister(hubObj)
                                                .subscribe(
                                                    (ne) => {
                                                        this._primengProgressBarService.hide();
                                                        this.hubId = ne.hubId;
                                                        this.connectionSuccessFlag =
                                                            false;
                                                        this.connectionFailedFlag =
                                                            false;
                                                        this.resultTestConnectionFlag =
                                                            false;
                                                        this._primengProgressBarService.show();
                                                        this.messagesApiFacadeService
                                                            .finalapidatahub(
                                                                +this
                                                                    .apiDataHubId,
                                                                +this.hubId,
                                                            )
                                                            .subscribe(
                                                                (k) => {
                                                                    this._primengProgressBarService.hide();
                                                                    this.notifierService.showSuccess(
                                                                        {
                                                                            detail: 'ثبت نهایی اطلاعات باموفقیت انجام شد!',
                                                                            life: 3000,
                                                                        },
                                                                    );
                                                                    this.HubAttachmentFlag =
                                                                        false;
                                                                    this.close.emit(
                                                                        'closeAndCreate',
                                                                    );
                                                                },
                                                                (error1) => {
                                                                    this._primengProgressBarService.hide();
                                                                },
                                                            );
                                                    },
                                                    (error1) => {
                                                        this._primengProgressBarService.hide();
                                                    },
                                                );
                                        }
                                    },
                                    (error1) => {
                                        this._primengProgressBarService.hide();
                                    },
                                );
                        }
                    } else {
                        this.notifierService.showError({
                            detail: 'یک هاب متصل به این سرویس وجود دارد! ',
                        });
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                    this.notifierService.showError({
                        detail: '!فراخوانی سرویس با مشکل مواجه شده است!',
                    });
                },
            );
        }
    }
}
