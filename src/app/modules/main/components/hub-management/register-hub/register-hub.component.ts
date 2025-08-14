import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';



import {HubDto} from "../../../models/hub.Dto";
import {DataHubStaticElementDomains} from "../../../models/DataHubStaticElementDomains.Dto";

import {ApiGatewayConstants} from "../../../constants/ApiGatewayConstants";

import { FormsModule, NgForm } from '@angular/forms';
import { ApiGatewayService } from '../../../services/api-gateway.service';
import { ToastService } from '../../../../shared/services/ToastService';
import { FuseLoadingService } from '../../../../../../@fuse/services/loading';
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { Constants } from '../../../../shared/constants/Constants';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { ButtonDirective } from 'primeng/button';
import { Steps } from 'primeng/steps';
import { DropdownModule } from 'primeng/dropdown';
import { Checkbox } from 'primeng/checkbox';
import { NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { Password } from 'primeng/password';
import { Message } from 'primeng/message';

import { TableModule } from 'primeng/table';
import { DataTypeHubPipe } from '../../../../shared/pipes/dataTypeHub.pipe';
import { EnStatusPipe } from '../../../../shared/pipes/en-status.pipe';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { ParamTypePipe } from '../../../../shared/pipes/paramType.pipe';
import { InputTextarea } from 'primeng/inputtextarea';
import { Dialog } from 'primeng/dialog';
import { MoreChar19Pipe } from '../../../../shared/pipes/moreChar19.pipe';
import { MessagesCategoryPipe } from '../../../../shared/pipes/messagesCategory.pipe';
import { Ripple } from 'primeng/ripple';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Fieldset } from 'primeng/fieldset';
import { Toast } from 'primeng/toast';
import { Textarea } from 'primeng/textarea';
import { Step, StepList, StepPanel, StepPanels, Stepper } from 'primeng/stepper';

@Component({
    selector: 'app-register-hub',
    templateUrl: './register-hub.component.html',
    standalone: true,
    styleUrls: ['./register-hub.component.scss'],
    imports: [
        BreadcrumbsComponent,
        Panel,
        FormsModule,
        InputText,
        Tooltip,
        ButtonDirective,
        Steps,
        DropdownModule,
        Checkbox,
        NgStyle,
        Password,
        Message,
        NgIf,
        NgClass,
        TableModule,
        DataTypeHubPipe,
        EnStatusPipe,
        MatTooltip,
        TranslocoPipe,
        MatIcon,
        TranslocoDirective,
        ParamTypePipe,
        InputTextarea,
        Dialog,
        MoreChar19Pipe,
        MessagesCategoryPipe,
        Ripple,
        ToggleSwitch,
        Fieldset,
        Toast,
        Textarea,
        Stepper,
        StepList,
        Step,
        StepPanels,
        StepPanel,
        NgForOf,
    ],
})
export class RegisterHubComponent implements OnInit, OnChanges {
    @ViewChild('myForm', { static: true }) myForm: NgForm;
    @Output() close = new EventEmitter<string>();
    @Input() inputApiHub;
    @Input() inputUpdate: HubDto;
    @Input('ngModel') model: any;
    @Output('ngModelChange') update = new EventEmitter();
    status;
    name;
    title;
    moduleTitle;
    partyTitle;
    clientName;
    clientBase;
    moduleBase;
    accessBase;
    partyBase;
    apiId;
    dbEngineId;
    hubId = null;
    objectName;
    driverName;
    dbName;
    hubTitle;
    commandTypeId = '1';
    detailsBreadObject = [];
    templates = 'SELECT * FROM';
    tempQuery;
    ip = '';
    port =null;
    user = '';
    password = '';
    messageId4X = null;
    messageId2X = null;
    messageId5X = null;
    codeMessageDe = null;
    messageIdDe = null;
    titleMessageDe = null;
    tableIdDe = null;
    ipLbl = '';
    lblObjectName = '';
    portLbl = '';
    userLbl = '';
    passwordLbl = '';
    queryUser = '';
    concatString;
    hubConstants = Constants;
    paramName;
    paramType = '0';
    aliasOutputParamName;
    paramValue;
    dataType;
    param = '';
    paramsList = [];
    spParamsList = [];
    mapList = [];
    loading: boolean;
    loadingButton: boolean;
    inputMap;
    outputMap;
    dataTypeMap;
    isEcrypt;
    statusMap;
    headerRegHub = 'ایجاد هاب داده';
    titleFieldset = 'Register Database Info';
    helpFlag: boolean = false;
    customQueryParamFlag: boolean = false;
    spParamsFlag: boolean = false;
    customQueryFlag: boolean = false;
    handlSpaseFlag: boolean = false;
    spFlag: boolean = false;
    textSqlFlag: boolean = true;
    resultTestConnectionFlag: boolean = false;
    connectionSuccessFlag: boolean = false;
    connectionFailedFlag: boolean = false;
    nextFlag: boolean = true;
    backShowFlag: boolean = false;
    nextShowFlag: boolean = true;
    FinalRegistrationFlag: boolean = false;
    queryFailedFlag: boolean = false;
    spTestFlag: boolean = true;
    querySuccessFlag: boolean = false;
    testConectionFlag: boolean = true;
    testFinalFlag: boolean = true;
    isFinal: boolean = false;
    commitFlag: boolean = true;
    formChanged: boolean = false;
    allowCreateConnectionPool: boolean = false;
    connectionPoolSize = 10;
    autoCommit;
    icon400_val = '';
    icon500_val = '';
    icon200_val = '';
    tooltipNext = 'ابتدا اطلاعات دیتابیس را ثبت بنمائید';
    tooltipTestSp = 'جهت تست پروسیجر حداقل یک رکورد پارامتر پروسیجر لازم هست!';
    tooltip200 = 'انتخاب پیام برای موفقیت آمیز بودن عملیات ';
    tooltip400 = 'انتخاب پیام برای خطا در عملیات، سمت فرانت اند';
    tooltip500 = 'انتخاب پیام برای خطا در عملیات، سمت  بک اند';
    titleMessage400;
    codeMessage400 = '400';
    textMessage400;
    textENMessage400;
    tableIdMessage400;
    typeMessage400;
    titleMessage200;
    codeMessage200 = '200';
    textMessage200;
    textENMessage200;
    tableIdMessage200;
    typeMessage200;
    titleMessage500;
    codeMessage500 = '500';
    textMessage500;
    textENMessage500;
    tableIdMessage500;
    typeMessage500;
    messageId;
    message200Dto;
    selectedMessageId2XX = null;
    selectedMessageId4XX = null;
    selectedMessageId5XX = null;
    messagesList500 = [];
    messagesList400 = [];
    messagesList200 = [];
    first400: number = 0;
    first500: number = 0;
    first200: number = 0;
    rows200: number = 5;
    rows400: number = 5;
    rows500: number = 5;
    customQuery = null;
    tempCustomQuery = null;
    message200Flag: boolean = false;
    message400Flag: boolean = false;
    message500Flag: boolean = false;
    regTextDBFlag: boolean = true;
    dbInfoFlag: boolean = true;
    paramFlag: boolean = false;
    spParamFlag: boolean = false;
    previewFlag: boolean = false;
    addFlag: boolean = false;
    customQueryInputFlag: boolean = false;
    resultTestQueryFlag: boolean = false;
    regCheckFlag: boolean = false;
    categoryMessages200 = ApiGatewayConstants.categoryMessages;
    categoryMessages400 = ApiGatewayConstants.categoryMessages;
    categoryMessages500 = ApiGatewayConstants.categoryMessages;
    statusCodeOptions200 = ApiGatewayConstants.statusCodeHub;
    statusCodeOptions400 = ApiGatewayConstants.statusCodeHub;
    statusCodeOptions500 = ApiGatewayConstants.statusCodeHub;
    typeMessages400 = ApiGatewayConstants.typeMessages;
    typeMessages500 = ApiGatewayConstants.typeMessages;
    typeMessages200 = ApiGatewayConstants.typeMessages;
    dataTypeOptions = Constants.dataTypeOptions;
    itemsHub = [];
    activeIndex: number = 0;
    rows: number = 5;
    nextBtn200Flag: boolean = false;
    nextBtn400Flag: boolean = false;
    nextBtn500Flag: boolean = false;
    pageno: number = 0;
    pagesize = 10;
    pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 20, code: 20 },
        { name: 30, code: 30 },
        { name: 40, code: 40 },
        { name: 50, code: 50 },
    ];
    fieldsetStyles = {
        'background-color': '#9e99e7',
        padding: '5px',
        'border-radius': '4px',
        color: '#1c034f',
    };
    primaryStyles = {
        'background-color': '#9e99e7',
        padding: '5px',
        'border-radius': '4px',
        color: '#1c034f',
    };
    secondaryStyles = {
        'background-color': '#bf99e7',
        padding: '5px',
        'border-radius': '4px',
        color: '#3c034f',
    };
    canCommit: any;

    constructor(
        private apiGatewayService: ApiGatewayService,
        private notifierService: ToastService,
         private transloco :TranslocoService,
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService
    ) {}

    concatIp(e) {
        debugger;
        this.ipLbl = e.target.value;
        if (this.ipLbl != '') {
            this.ipLbl += ':';
        }
    }

    addObjectName(e) {
        debugger;
        this.lblObjectName = e.target.value;
        /* if (this.lblObjectName != "") {
             this.lblObjectName += ':'
         }*/
    }

    closeMessage200(event) {
        if (event.title == 'closeAndCreate' || event == 'close') {
            this.messageId2X = event.messageId;
        }
    }
    deleteSpParam(param) {
        debugger;
        let index = this.spParamsList.findIndex((obj) => obj.row === param.row);
        if (index > -1) {
            this.spParamsList.splice(index, 1);
            for (let k = 0; k < this.spParamsList.length; k++) {
                this.spParamsList[k] = Object.assign(this.spParamsList[k], {
                    row: k + 1,
                    id: k + 1,
                });
            }
            this.queryFailedFlag = false;
            this.querySuccessFlag = false;
            this.param = '';
        }
    }

    messageClear400() {
        this.titleMessage400 = '';
        this.textMessage400 = '';
        this.textENMessage400 = '';
        this.tableIdMessage400 = '';
        this.typeMessage400 = '';
        this.messageId = null;
        this.selectedMessageId4XX = null;
        this.pageno = 0;
        this.pagesize = 5;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            400,
            this.codeMessage400,
            this.titleMessage400,
            this.tableIdMessage400,
            this.typeMessage400,
            this.pagesize,
            this.pageno
        );
        this.nextBtn400Flag = false;
    }

    messageClear500() {
        this.titleMessage500 = '';
        this.textMessage500 = '';
        this.textENMessage500 = '';
        this.tableIdMessage500 = '';
        this.typeMessage400 = '';
        this.messageId = null;
        this.pageno = 0;
        this.pagesize = 5;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            500,
            this.codeMessage500,
            this.titleMessage500,
            this.tableIdMessage500,
            this.typeMessage500,
            this.pagesize,
            this.pageno
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

    messageClear200() {
        debugger
        this.titleMessage200 = '';
        this.textMessage200 = '';
        this.textENMessage200 = '';
        this.tableIdMessage200 = '';
        this.typeMessage200 = '';

        this.messageId = null;
        this.pageno = 0;
        this.pagesize = 5;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            200,
            this.codeMessage200,
            this.titleMessage200,
            this.tableIdMessage200,
            this.typeMessage200,
            this.pagesize,
            this.pageno
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
        this.selectedMessageId2XX= null;
    }

    ngOnChanges(changes: SimpleChanges) {
        debugger;
    }

    concatPort(e) {
        debugger;
        this.portLbl = e.target.value;
        if (this.portLbl != '') {
            this.portLbl += ';';
        }
    }

    concatUser(e) {
        debugger;
        this.userLbl = e.target.value;
        if (this.userLbl != '') {
            this.userLbl += ';';
        }
    }

    concatPassword(e) {
        const inputElement = e.target as HTMLInputElement;
        const newPasswordValue = inputElement.value;

        // به‌روزرسانی مقدار passwordLbl با * برای هر کاراکتر وارد شده
        this.passwordLbl = '*'.repeat(newPasswordValue.length);
        //this.passwordLbl = e.target.value
        if (this.passwordLbl != '') {
            this.passwordLbl += ';';
        }
    }

    testConnectionMethod() {
        debugger;
        let tempObjHub = JSON.parse(window.localStorage.getItem('hubObj'));
        debugger;
        if (tempObjHub != null) {
            debugger;
            if (this.hubId != undefined && this.hubId != null) {
                this._primengProgressBarService.show();
                this.loadingButton=true
                this.messagesApiFacadeService
                    .testconnection(this.hubId)
                    .subscribe(
                        (j) => {
                            this.loadingButton=false
                            this._primengProgressBarService.hide();
                            debugger;
                            this.resultTestConnectionFlag = true;
                            this.connectionSuccessFlag = true;
                            this.connectionFailedFlag = false;
                            this.nextFlag = false;
                        },
                        (error) => {
                            this.loadingButton=false
                            this._primengProgressBarService.hide();
                            this.resultTestConnectionFlag = true;
                            this.connectionFailedFlag = true;
                            this.connectionSuccessFlag = false;
                            this.nextFlag = true;
                            this.tooltipNext =
                                'تست کانکشن باموفقیت انجام نشده است!';
                        }
                    );
            }
        }
    }

    registerDataBase() {
        debugger;

        if (this.validationDataBaseInfo()) {
            let tempObjHub = JSON.parse(window.localStorage.getItem('hubObj'));
            if (tempObjHub != null) {
                debugger;
                let hubObj: HubDto = new HubDto();
                this.hubId != null ? (hubObj.hubId = +this.hubId) : undefined;
                hubObj.dbEngineId = +this.dbEngineId;
                hubObj.driverName = '-';
                hubObj.hubTitle = this.hubTitle;
                hubObj.ip = this.ip;
                hubObj.portNumber = this.port;
                if (this.port == '') {
                    hubObj.portNumber = null;
                }
                hubObj.userName = this.user;
                hubObj.password = this.password;
                if (+this.selectedMessageId4XX == 0) {
                    hubObj.messageId4X = null;
                } else {
                    hubObj.messageId4X = +this.selectedMessageId4XX;
                }
                if (+this.selectedMessageId5XX == 0) {
                    hubObj.messageId5X = null;
                } else {
                    hubObj.messageId5X = +this.selectedMessageId5XX;
                }
                if (+this.selectedMessageId2XX == 0) {
                    hubObj.messageId2X = null;
                } else {
                    hubObj.messageId2X = +this.selectedMessageId2XX;
                }
                this.connectionSuccessFlag == true
                    ? (hubObj.isTestConnection = 1)
                    : this.connectionSuccessFlag;
                hubObj.dbName = this.dbName;
                hubObj.connectionPoolSize = 10;
                this.autoCommit == true
                    ? (hubObj.autoCommit = 1)
                    : (hubObj.autoCommit = 0);
                this.allowCreateConnectionPool == true
                    ? (hubObj.allowCreateConnectionPool = 1)
                    : (hubObj.allowCreateConnectionPool = 0);
                window.localStorage.setItem('hubObj', JSON.stringify(hubObj));
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.datahubRegister(hubObj).subscribe(
                    (ne) => {
                        this._primengProgressBarService.hide();
                        this.notifierService.showSuccess({
                            detail: 'ثبت اطلاعات دیتابیس باموفقیت انجام شد!',
                            life: 3000,
                        });
                        this.hubId = ne.hubId;
                        this.nextFlag = false;
                        this.connectionSuccessFlag = false;
                        this.connectionFailedFlag = false;
                        this.resultTestConnectionFlag = false;
                        this.testConectionFlag = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            } else {
                debugger;
                let hubObj: HubDto = new HubDto();
                hubObj.dbEngineId = +this.dbEngineId;
                hubObj.driverName = '-';
                hubObj.hubTitle = this.hubTitle;
                hubObj.ip = this.ip;
                hubObj.portNumber = this.port;
                hubObj.userName = this.user;
                hubObj.password = this.password;
                if (+this.selectedMessageId4XX == 0) {
                    hubObj.messageId4X = null;
                } else {
                    hubObj.messageId4X = +this.selectedMessageId4XX;
                }
                if (+this.selectedMessageId5XX == 0) {
                    hubObj.messageId5X = null;
                } else {
                    hubObj.messageId5X = +this.selectedMessageId5XX;
                }
                if (+this.selectedMessageId2XX == 0) {
                    hubObj.messageId2X = null;
                } else {
                    hubObj.messageId2X = +this.selectedMessageId2XX;
                }
                hubObj.dbName = this.dbName;
                hubObj.connectionPoolSize = 10;
                this.connectionFailedFlag == true
                    ? (hubObj.isTestConnection = 0)
                    : this.connectionFailedFlag;
                this.autoCommit == true
                    ? (hubObj.autoCommit = 1)
                    : (hubObj.autoCommit = 0);
                this.allowCreateConnectionPool == true
                    ? (hubObj.allowCreateConnectionPool = 1)
                    : (hubObj.allowCreateConnectionPool = 0);
                this._primengProgressBarService.show();
                this.messagesApiFacadeService.datahubRegister(hubObj).subscribe(
                    (ne) => {
                        this._primengProgressBarService.hide();
                        this.notifierService.showSuccess({
                            detail: 'اطلاعات دیتابیس باموفقیت ثبت شد!',
                            life: 3000,
                        });
                        this.hubId = ne.hubId;
                        this.connectionSuccessFlag = false;
                        this.connectionFailedFlag = false;
                        this.resultTestConnectionFlag = false;
                        this.testConectionFlag = false;
                        this.nextFlag = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            }
        }
    }

    testQuery() {
        debugger;
        let tempObjHub = JSON.parse(window.localStorage.getItem('hubObj'));

        debugger;
        if (tempObjHub != undefined && tempObjHub != null) {
            if (this.hubId != null) {
                debugger;
                if (this.commandTypeId == '3') {
                    this.tempQuery = this.customQuery;
                }
                debugger;

                this.resultTestQueryFlag = true;
                this.queryFailedFlag = true;
                this.querySuccessFlag = false;
                this.nextFlag = true;
                this.tooltipNext = 'تست کوئری با موفقیت انجام نشده است!';
                debugger;
                // })
            }
        }
        // })
    }

    parseQuery() {
        this.param = '';
        this.lblObjectName = this.objectName;

        for (let k = 0; k < this.paramsList.length; k++) {
            this.paramsList.length > 0 && k != 0
                ? (this.param += ' AND ')
                : this.param;
            /* if ( this.dataType==0) {*/
            this.param +=
                this.paramsList[k].paramName +
                ' = ' +
                this.paramsList[k].paramValue +
                ' ';
            //}/*else{
            // this.param +='n_'+this.paramsList[k].paramName+' = '+this.paramsList[k].paramValue+' '
            // }*/
        }

        if (this.paramsList.length > 0) {
            debugger;
            this.param = ' WHERE ' + this.param;
            this.tempQuery =
                this.templates + ' ' + this.lblObjectName + this.param;

            debugger;
        } else {
            this.tempQuery = this.templates + ' ' + this.lblObjectName;
            debugger;
        }
    }

    duplicateCheck(): boolean {
        debugger;
        const seen = new Set();
        for (const obj of this.paramsList) {
            if (seen.has(obj.paramName)) {
                return true;
            }
            seen.add(obj.paramName);
        }
        return false;

        debugger;
    }

    checkDuplicate(arr, paramName, newObj) {
        debugger;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].paramName == newObj.paramName) {
                return false;
            }
        }
        return true;
    }

    checkSpDuplicate(arr, paramName, newObj) {
        debugger;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name == newObj.name) {
                return false;
            }
        }
        return true;
    }

    fakeRegister() {
        debugger;
        if (this.validationParam()) {
            this.queryFailedFlag = false;
            this.querySuccessFlag = false;
            this.param = '';
            if (this.paramsList.length > 0) {
                if (
                    this.checkDuplicate(this.paramsList, 'paramName', {
                        paramName: this.paramName,
                        paramValue: this.paramValue,
                        dataType: this.dataType,
                        status:
                            this.status == true
                                ? (this.status = true)
                                : (this.status = false),
                    })
                ) {
                    this.paramsList.push({
                        paramName: this.paramName,
                        paramValue: this.paramValue,
                        dataType: this.dataType,
                        status:
                            this.status == true
                                ? (this.status = true)
                                : (this.status = false),
                    });
                    this.nextFlag = false;
                    this.paramName = null;
                    this.paramValue = null;
                } else {
                    this.notifierService.showError({
                        detail: 'امکان افزودن Param Name تکراری وجود ندارد!',
                    });
                }
            } else {
                this.paramsList.push({
                    paramName: this.paramName,
                    paramValue: this.paramValue,
                    dataType: this.dataType,
                    status:
                        this.status == true
                            ? (this.status = true)
                            : (this.status = false),
                });
                this.paramName = null;
                this.paramValue = null;
                this.nextFlag = false;
            }

            // this.paramsList= [...new Set(this.paramsList)]
            //this.paramsList = Array.from(new Set(this.paramsList))
            for (let k = 0; k < this.paramsList.length; k++) {
                if ('row' in this.paramsList) {
                } else {
                    this.paramsList[k] = Object.assign(this.paramsList[k], {
                        row: k + 1,
                    });
                }
            }
        }
    }

    fakeParamSpRegister() {
        debugger;
        if (this.validationSpParam()) {
            this.queryFailedFlag = false;
            this.querySuccessFlag = false;
            this.param = '';
            if (this.spParamsList.length > 0) {
                if (
                    this.checkSpDuplicate(this.spParamsList, 'paramName', {
                        name: this.paramName,
                        testValue: this.paramValue,
                        dataType: this.dataType,
                        paramType: +this.paramType,
                        endpintdetailId: null,
                        customParamId: null,
                        aliasOutputParamName: this.aliasOutputParamName,
                        status:
                            this.status == true
                                ? (this.status = true)
                                : (this.status = false),
                    })
                ) {
                    this.spParamsList.push({
                        name: this.paramName,
                        testValue: this.paramValue,
                        dataType: this.dataType,
                        paramType: +this.paramType,
                        endpintdetailId: null,
                        customParamId: null,
                        aliasOutputParamName: this.aliasOutputParamName,
                        status:
                            this.status == true
                                ? (this.status = true)
                                : (this.status = false),
                    });
                    console.log('spList', this.spParamsList);
                    this.nextFlag = false;
                    this.paramName = null;
                    this.paramValue = null;
                    this.aliasOutputParamName = null;
                } else {
                    this.notifierService.showError({
                        detail: 'امکان افزودن Param Name تکراری وجود ندارد!',
                    });
                }
            } else {
                this.spParamsList.push({
                    name: this.paramName,
                    testValue: this.paramValue,
                    dataType: this.dataType,
                    paramType: +this.paramType,
                    endpintdetailId: null,
                    customParamId: null,
                    aliasOutputParamName: this.aliasOutputParamName,
                    status:
                        this.status == true
                            ? (this.status = true)
                            : (this.status = false),
                });
                this.paramName = null;
                this.paramValue = null;
                this.aliasOutputParamName = null;
                this.nextFlag = false;
            }

            // this.paramsList= [...new Set(this.paramsList)]
            //this.paramsList = Array.from(new Set(this.paramsList))
            for (let k = 0; k < this.spParamsList.length; k++) {
                if ('row' in this.spParamsList) {
                } else {
                    this.spParamsList[k] = Object.assign(this.spParamsList[k], {
                        row: k + 1,
                        id: k + 1,
                    });
                }
            }
            console.log('spList', this.spParamsList);
        }
    }

    messageSearch400() {
        this.search(
            400,
            '400',
            this.titleMessage400,
            this.tableIdMessage400,
            this.typeMessage400,
            this.pagesize,
            this.pageno
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
            this.pageno
        );
    }

    messageSearch200() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .messagesearch(
                200,
                this.titleMessage200,
                this.tableIdMessage200,
                this.typeMessage200
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
                }
            );
    }

    openMessage400() {
        this.search(
            400,
            '400',
            this.titleMessage400,
            this.tableIdMessage400,
            this.typeMessage400,
            5,
            0
        );
    }

    openMessage500() {
        this.search(
            500,
            '500',
            this.titleMessage500,
            this.tableIdMessage500,
            this.typeMessage500,
            5,
            0
        );
    }

    search(
        statusCode,
        codeMessage,
        titleMessage,
        tableIdMessage,
        typeMessage,
        pagesize?,
        pageno?
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
                pageno
            )
            .subscribe(
                (response) => {
                    debugger;
                    debugger;
                    debugger;
                    this._primengProgressBarService.hide();
                    if (statusCode == 200) {
                        this.messagesList200 = response;
                    } else if (statusCode == 400) {
                        this.messagesList400 = response;
                    } else if (statusCode == 500) {
                        this.messagesList500 = response;
                    }
                    debugger;
                    debugger;
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
                    debugger;
                    if (messagesList.length == 0) {
                        messagesList = [];
                    } else {
                        for (let i = 0; i < messagesList.length; i++) {
                            if (messagesList[i].messageId == messageId) {
                                debugger;
                                this.selectedMessageId4XX = messagesList[i];
                                this.selectedMessageId5XX = messagesList[i];
                                this.selectedMessageId2XX = messagesList[i];
                                if (statusCode == 200) {
                                    debugger;
                                    this.message200Flag = true;
                                } else if (statusCode == 400) {
                                    this.message400Flag = true;
                                } else if (statusCode == 500) {
                                    this.message500Flag = true;
                                }
                            } else {
                                if (statusCode == 200) {
                                    debugger;
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
                                    { row: u + startRow + 1 }
                                );
                            }
                        } else if (this.pageno == 1) {
                            for (let u = 0; u < messagesList.length; u++) {
                                messagesList[u] = Object.assign(
                                    messagesList[u],
                                    { row: u + this.pagesize + 1 }
                                );
                            }
                        } else {
                            for (let u = 0; u < messagesList.length; u++) {
                                messagesList[u] = Object.assign(
                                    messagesList[u],
                                    { row: u + 1 }
                                );
                                debugger;
                            }
                        }
                    }
                    debugger;
                    console.log(
                        'selectedMessageId2XX',
                        this.selectedMessageId2XX
                    );
                    console.log(
                        'selectedMessageId5XX',
                        this.selectedMessageId5XX
                    );
                    console.log(
                        'selectedMessageId4XX',
                        this.selectedMessageId4XX
                    );
                    console.log('messagesList', messagesList);
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    openMessage200() {
        debugger;
        this.search(
            200,
            '200',
            this.titleMessage200,
            this.tableIdMessage200,
            this.typeMessage200,
            5,
            0
        );
    }

    selectedMessage400(event) {
        debugger;
        debugger;
        this.messageIdDe = event.data.messageId;
        this.titleMessageDe = event.data.title;
        this.tableIdDe = event.data.tableId;
        this.icon400_val = 'pi pi-check';
        this.messageId4X = event.data.messageId;
        this.selectedMessageId4XX = event.data.messageId;
        this.codeMessageDe = event.data.code;
    }

    selectedMessage500(event) {
        debugger;
        debugger;
        this.messageId5X = event.data.messageId;
        this.selectedMessageId5XX = event.data.messageId;
        this.codeMessageDe = event.data.code;
        this.messageIdDe = event.data.messageId;
        this.titleMessageDe = event.data.title;
        this.tableIdDe = event.data.tableId;
        this.icon500_val = 'pi pi-check';
    }

    selectedMessage200(event) {
        debugger;
        debugger;
        this.messageId2X = event.data.messageId;
        this.selectedMessageId2XX = event.data.messageId;
        this.codeMessageDe = event.data.code;
        this.messageIdDe = event.data.messageId;
        this.titleMessageDe = event.data.title;
        this.tableIdDe = event.data.tableId;
        this.icon200_val = 'pi pi-check';
    }

    onRowUnselect500(event) {
        this.icon500_val = null;
        this.selectedMessageId4XX = null;
    }

    onRowUnselect400(event) {
        this.icon400_val = null;
        this.selectedMessageId4XX = null;
    }

    onRowUnselect200(event) {
        this.icon200_val = null;
        this.selectedMessageId2XX = null;
    }

    back() {
        this.commandTypeId != '1' && this.commandTypeId != null
            ? (this.commitFlag = false)
            : (this.commitFlag = true);
        this.activeIndex != 0 ? (this.activeIndex -= 1) : this.activeIndex;
        this.activeIndex != 0
            ? ((this.regTextDBFlag = false), (this.backShowFlag = true))
            : ((this.regTextDBFlag = true), (this.backShowFlag = false));
        if (this.activeIndex == 1) {
            this.titleFieldset = 'Test Database Info';
            this.regTextDBFlag = false;
            this.backShowFlag = true;
            this.dbInfoFlag = true;
            this.paramFlag = false;
            this.nextShowFlag = true;
            this.resultTestConnectionFlag = false;
            this.FinalRegistrationFlag = false;
            this.nextFlag = true;
            //  this.connectionSuccessFlag == false ? (this.nextFlag = true, this.tooltipNext = "ابتدا DataBase Info را ثبت اولیه بنمائید") : this.nextFlag = false
        } else if (this.activeIndex == 0) {
            this.titleFieldset = 'Register Database Info';
            this.fieldsetStyles = this.secondaryStyles;
            this.fieldsetStyles = this.primaryStyles;
            this.regTextDBFlag = true;
            this.backShowFlag = false;
            this.nextShowFlag = true;
            this.dbInfoFlag = true;
            this.paramFlag = false;
            this.FinalRegistrationFlag = false;
            this.connectionSuccessFlag = false;
            this.connectionFailedFlag = false;
            this.resultTestConnectionFlag = false;
            this.nextFlag = false;
        }
    }

    onContinuation() {
        debugger;
        this.commandTypeId != '1' && this.commandTypeId != null
            ? (this.commitFlag = false)
            : (this.commitFlag = true);
        this.activeIndex != 5 ? (this.activeIndex += 1) : this.activeIndex;
        this.activeIndex != 0
            ? ((this.regTextDBFlag = false), (this.backShowFlag = true))
            : ((this.regTextDBFlag = true), (this.backShowFlag = false));
        debugger;
        if (this.activeIndex == 0) {
            debugger;
            this.titleFieldset = 'Register Database Info';
            this.regTextDBFlag = true;
            this.backShowFlag = false;
            this.nextShowFlag = true;
            this.dbInfoFlag = true;
            this.paramFlag = false;
            this.previewFlag = false;
            this.nextFlag = false;
            this.resultTestConnectionFlag = false;
            this.FinalRegistrationFlag = false;
            this.fieldsetStyles = this.primaryStyles;
            debugger;
        } else if (this.activeIndex == 1) {
            debugger;
            if (this.validationDataBaseInfo()) {
                debugger;
                this.titleFieldset = 'Test Database Info';
                this.fieldsetStyles = this.secondaryStyles;
                this.regTextDBFlag = false;
                this.backShowFlag = true;
                this.nextShowFlag = true;
                this.nextFlag = true;
                this.dbInfoFlag = true;
                this.paramFlag = false;
                this.previewFlag = false;
                this.resultTestConnectionFlag = false;
                this.FinalRegistrationFlag = false;
                this.nextShowFlag = false;

                /*  if (this.inputUpdate != undefined) {
                      debugger
                      this.testConnectionMethod()
                  }*/
                // this.connectionSuccessFlag == false ? (this.nextFlag = true, this.tooltipNext = "ابتدا DataBase Info را ثبت اولیه بنمائید") : this.nextFlag = false
                debugger;
            } else {
                this.activeIndex = 0;
                this.regTextDBFlag = true;
                this.backShowFlag = false;
                this.nextShowFlag = true;
                this.dbInfoFlag = true;
                this.paramFlag = false;
                this.previewFlag = false;
                this.nextFlag = false;
                this.resultTestConnectionFlag = false;
                this.FinalRegistrationFlag = false;
            }
            debugger;
        }
        /*  switch (this.commandTypeId) {
              case '1':
                  this.commitFlag = true

                  if (this.activeIndex == 2) {
                      this.regTextDBFlag = false;
                      this.nextFlag = false
                      this.backShowFlag = true;
                      this.nextShowFlag = true;
                      this.dbInfoFlag = false
                      this.paramFlag = true
                      this.addFlag = true
                      this.previewFlag = false;
                      this.resultTestConnectionFlag = false;
                      this.FinalRegistrationFlag = false
                      if (this.inputUpdate != undefined) {
                          debugger
                          this.paramsList = this.inputUpdate.dataHubStaticElementDomains
                      }
                      this.nextFlag = false
                  }
                  else if (this.activeIndex == 3) {
                      this.resultTestConnectionFlag = false;
                      this.paramFlag = true
                      this.regTextDBFlag = false;
                      this.backShowFlag = true;
                      this.nextShowFlag = false;
                      this.dbInfoFlag = false
                      this.addFlag = false
                      this.previewFlag = false;
                      this.resultTestQueryFlag = false
                      //  this.resultTestQueryFlag == false ?this.nextFlag = true: this.nextFlag = false
                      this.querySuccessFlag == false ? (this.nextFlag = true , this.tooltipNext = "ابتدا کوئری را ایجاد و تست بنمائید") : this.nextFlag = false
                      this.FinalRegistrationFlag = false
                     /!* if (this.inputUpdate != undefined) {
                          debugger
                          this.parseQuery()
                          this.testQuery()
                      }*!/
                  } else if (this.activeIndex == 4) {
                      this.resultTestConnectionFlag = true;
                      this.paramFlag = false
                      this.paramFlag = true
                      this.addFlag = false
                      this.backShowFlag = true;
                      this.nextShowFlag = false;
                      this.dbInfoFlag = true
                      this.regTextDBFlag = false;
                      this.previewFlag = true;
                      this.resultTestQueryFlag = true
                      this.FinalRegistrationFlag = true
                  }
                  this.spParamFlag = false
                  this.customQueryParamFlag = false
                  break;
              case '2':
                  if (this.activeIndex == 0) {
                      debugger
                      this.regTextDBFlag = true;
                      this.backShowFlag = false;
                      this.nextShowFlag = true;
                      this.dbInfoFlag = true
                      this.paramFlag = false
                      this.previewFlag = false;
                      this.nextFlag = false
                      this.resultTestConnectionFlag = false;
                      this.FinalRegistrationFlag = false
                      debugger
                  }
                  else if (this.activeIndex == 1) {
                      debugger
                      if (this.validationDataBaseInfo()) {
                          debugger
                          this.regTextDBFlag = false;
                          this.backShowFlag = true;
                          this.nextShowFlag = true;
                          this.nextFlag = false
                          this.dbInfoFlag = true
                          this.paramFlag = false
                          this.previewFlag = false;
                          this.resultTestConnectionFlag = false;
                          this.connectionSuccessFlag == false
                          this.connectionFailedFlag == false
                          this.FinalRegistrationFlag = false
                          this.customQueryFlag = false
                          this.connectionSuccessFlag == false ? (this.nextFlag = true, this.tooltipNext = "ابتدا DataBase Info را ثبت اولیه بنمائید") : this.nextFlag = false
                          debugger
                      } else {
                          this.activeIndex = 0
                          this.regTextDBFlag = true;
                          this.backShowFlag = false;
                          this.nextShowFlag = true;
                          this.dbInfoFlag = true
                          this.paramFlag = false
                          this.previewFlag = false;
                          this.nextFlag = false
                          this.customQueryFlag = false
                          this.resultTestConnectionFlag = false;
                          this.FinalRegistrationFlag = false
                      }
                      debugger
                  }
                  else if (this.activeIndex == 2) {
                      this.resultTestConnectionFlag = false;
                      this.spTestFlag = true
                      this.spParamFlag = true;
                      this.nextShowFlag = false;
                      this.backShowFlag = true;
                      this.dbInfoFlag = false
                      this.regTextDBFlag = false;
                      this.previewFlag = false;
                      this.nextFlag=true
                      this.tooltipNext='ابتدا پروسیجر را تست بنمائید!'
                      this.resultTestQueryFlag = false
                      this.querySuccessFlag == false
                      this.queryFailedFlag == false
                     /!* if (this.inputUpdate != undefined) {
                          debugger
                          this.testQuery()
                      }*!/
                      this.FinalRegistrationFlag = false
                  }
                  else if (this.activeIndex == 3) {
                      this.spTestFlag=false
                      this.resultTestConnectionFlag = true;
                      this.paramFlag = false
                      this.addFlag = false
                      this.backShowFlag = true;
                      this.nextShowFlag = false;
                      this.dbInfoFlag = true
                      this.regTextDBFlag = false;
                      this.previewFlag = true;
                      this.resultTestQueryFlag = true
                      this.FinalRegistrationFlag = true
                  }
                  this.paramFlag = false
                  this.customQueryParamFlag = false
                  break;
              case '3':
                  if (this.activeIndex == 0) {
                      this.regTextDBFlag = false;
                      this.backShowFlag = true;
                      this.nextShowFlag = true;
                      this.dbInfoFlag = false
                      this.paramFlag = true
                      this.addFlag = true
                      this.previewFlag = false;
                      this.resultTestConnectionFlag = false;
                      this.FinalRegistrationFlag = false
                      this.customQueryInputFlag = false
                  } else if (this.activeIndex == 1) {
                      if (this.validationDataBaseInfo()) {
                          this.regTextDBFlag = false;
                          this.backShowFlag = true;
                          this.nextShowFlag = true;
                          this.dbInfoFlag = true
                          this.paramFlag = false
                          this.previewFlag = false;
                          this.resultTestConnectionFlag = false;
                          this.FinalRegistrationFlag = false
                          this.nextFlag = true
                          this.customQueryInputFlag = false
                        //   this.connectionSuccessFlag == false ? (this.nextFlag = true, this.tooltipNext = "ابتدا DataBase Info را ثبت اولیه بنمائید") : this.nextFlag = false
                      } else {
                          this.activeIndex = 0
                          this.regTextDBFlag = true;
                          this.backShowFlag = false;
                          this.nextShowFlag = true;
                          this.dbInfoFlag = true
                          this.paramFlag = false
                          this.previewFlag = false;
                          this.nextFlag = false
                          this.resultTestConnectionFlag = false;
                          this.FinalRegistrationFlag = false
                          this.customQueryInputFlag = false
                      }
                      debugger
                  } else if (this.activeIndex == 2) {
                      debugger
                      this.regTextDBFlag = false;
                      this.nextFlag = true
                      this.customQueryInputFlag = true
                      this.tooltipNext = "تست کوئری با موفقیت انجام نشده است!"
                      this.backShowFlag = true;
                      this.dbInfoFlag = false
                      this.customQueryParamFlag = true
                      this.addFlag = true
                      this.previewFlag = false;
                      this.resultTestConnectionFlag = false;
                      this.FinalRegistrationFlag = false
                      this.resultTestQueryFlag = false
                      this.nextShowFlag = false;
                      /!*if (this.inputUpdate != undefined) {
                          this.customQuery = this.inputUpdate.objectName
                          debugger
                          this.testQuery();

                      }
  *!/
                  } else if (this.activeIndex == 3) {
                      this.nextShowFlag = false
                      this.dbInfoFlag = true
                      this.resultTestConnectionFlag = true;
                      this.regTextDBFlag = false;
                      this.paramFlag = false
                      this.addFlag = false
                      this.customQueryInputFlag = true
                      this.previewFlag = true;
                      this.resultTestQueryFlag = true
                      this.FinalRegistrationFlag = true
                  }
                  this.spParamFlag = false
                  this.paramFlag = false
                  break
          }*/
    }

    changeCommandType(e) {
        this.paramsList = [];
        this.dbEngineId = null;
        this.name = '';
        this.driverName = '-';
        this.dbName = '';
        this.ip = '';
        this.ipLbl = '';
        this.port = null;
        this.portLbl = '';
        this.user = '';
        this.userLbl = '';
        this.password = '';
        this.passwordLbl = '';
        this.objectName = '';
        this.connectionPoolSize = 10;
        //  this.canCommit = false
        this.autoCommit = false;
        this.allowCreateConnectionPool = false;
        this.dataType = null;
        this.customQuery;
        switch (e.value) {
            case '1':
               /* this.itemsHub = [
                    {
                        label: 'ثبت dataBaseInfo',
                        command: (event: any) => {
                            this.activeIndex = 0;
                        },
                    },
                    {
                        label: 'تست اتصال به دیتابیس',
                        command: (event: any) => {
                            this.activeIndex = 1;
                        },
                    },
                    {
                        label: 'لیست پارامتر های کوئری',
                        command: (event: any) => {
                            this.activeIndex = 2;
                        },
                    },
                    {
                        label: ' تست کوئری',
                        command: (event: any) => {
                            this.activeIndex = 3;
                        },
                    },
                ];*/
                this.itemsHub = [
                    {
                        label: 'ثبت dataBaseInfo',
                        content: 'فرم ثبت دیتابیس',
                        command: () => this.activeIndex = 0,
                    },
                    {
                        label: 'تست اتصال به دیتابیس',
                        content: 'نتیجه تست اتصال',
                        command: () => this.activeIndex = 1,
                    },
                    {
                        label: 'لیست پارامتر های کوئری',
                        content: 'لیست پارامترها',
                        command: () => this.activeIndex = 2,
                    },
                    {
                        label: ' تست کوئری',
                        content: 'خروجی تست کوئری',
                        command: () => this.activeIndex = 3,
                    },
                ];
                this.commitFlag = true;
                this.customQueryFlag = false;
                this.handlSpaseFlag = false;
                this.textSqlFlag = true;
                this.spFlag = false;
                break;
            case '2':
               /* this.itemsHub = [
                    {
                        label: 'ثبت dataBaseInfo',
                        command: (event: any) => {
                            this.activeIndex = 0;
                        },
                    },
                    {
                        label: 'تست اتصال به دیتابیس',
                        command: (event: any) => {
                            this.activeIndex = 1;
                        },
                    },
                    {
                        label: 'تست پروسیجر',
                        command: (event: any) => {
                            this.activeIndex = 2;
                        },
                    },
                ];*/
                this.itemsHub = [
                    {
                        label: 'ثبت dataBaseInfo',
                        content: 'فرم ثبت اطلاعات دیتابیس',
                        command: () => {
                            this.activeIndex = 0;
                        },
                    },
                    {
                        label: 'تست اتصال به دیتابیس',
                        content: 'بررسی اتصال به دیتابیس با اطلاعات وارد شده',
                        command: () => {
                            this.activeIndex = 1;
                        },
                    },
                    {
                        label: 'تست پروسیجر',
                        content: 'اجرای تست بر روی پروسیجر انتخاب‌شده',
                        command: () => {
                            this.activeIndex = 2;
                        },
                    },
                ];
                this.commitFlag = false;
                this.customQueryFlag = false;
                this.handlSpaseFlag = true;
                this.textSqlFlag = false;
                this.spFlag = true;
                break;
            case '3':
                /*this.itemsHub = [
                    {
                        label: 'ثبت dataBaseInfo',
                        command: (event: any) => {
                            this.activeIndex = 0;
                        },
                    },
                    {
                        label: 'تست اتصال به دیتابیس',
                        command: (event: any) => {
                            this.activeIndex = 1;
                        },
                    },
                    {
                        label: 'تست کوئری',
                        command: (event: any) => {
                            this.activeIndex = 2;
                        },
                    },
                ];*/
                this.itemsHub = [
                    {
                        label: 'ثبت dataBaseInfo',
                        content: 'فرم ثبت اطلاعات دیتابیس',
                        command: () => {
                            this.activeIndex = 0;
                        },
                    },
                    {
                        label: 'تست اتصال به دیتابیس',
                        content: 'بررسی اتصال به دیتابیس با اطلاعات وارد شده',
                        command: () => {
                            this.activeIndex = 1;
                        },
                    },
                    {
                        label: 'تست کوئری',
                        content: 'اجرای تست بر روی کوئری',
                        command: () => {
                            this.activeIndex = 2;
                        },
                    },
                ];
                this.spFlag = false;
                this.commitFlag = false;
                this.customQueryFlag = true;
                this.handlSpaseFlag = false;
                this.objectName = '';
                this.textSqlFlag = false;

                break;
        }
    }

    validationDataBaseInfo(): boolean {
        if (!this.hubTitle) {
            this.notifierService.showError({
                detail: 'لطفا عنوان هاب را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.dbEngineId) {
            this.notifierService.showError({
                detail: 'لطفا dbEngine را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.dbName) {
            this.notifierService.showError({
                detail: 'لطفا dbName را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.ip) {
            this.notifierService.showError({
                detail: 'لطفا ip را وارد کنید!',
                life: 3000,
            });
            return false;
        } /*else if (!this.port) {
            this.notifierService.showError({
                detail: 'لطفا port را وارد کنید!',
                life: 3000,
            });
            return false;
        }*/ else if (!this.user) {
            this.notifierService.showError({
                detail: 'لطفا user را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.password) {
            this.notifierService.showError({
                detail: 'لطفا password را وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    validationParam(): boolean {
        if (!this.paramName) {
            this.notifierService.showError({
                detail: 'لطفا paramName را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.paramValue) {
            this.notifierService.showError({
                detail: 'لطفا paramValue را وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    validationSpParam(): boolean {
        debugger;
        if (!this.paramName) {
            this.notifierService.showError({
                detail: 'لطفا paramName را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.paramValue) {
            this.notifierService.showError({
                detail: 'لطفا paramValue را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.aliasOutputParamName) {
            this.notifierService.showError({
                detail: 'لطفا عنوان خروجی را وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    previousPageStatement200(): void {
        this.pageno -= 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            200,
            '200',
            this.titleMessage200,
            this.tableIdMessage200,
            this.typeMessage200,
            this.pagesize,
            this.pageno
        );
    }

    nextPageStatement200(): void {
        this.pageno += 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            200,
            '200',
            this.titleMessage200,
            this.tableIdMessage200,
            this.typeMessage200,
            this.pagesize,
            this.pageno
        );
    }

    OnchangePageno200(e) {
        debugger;
        this.pageno = 0;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + 1;
        this.search(
            200,
            '200',
            this.titleMessage200,
            this.tableIdMessage200,
            this.typeMessage200,
            this.pagesize,
            this.pageno
        );
    }

    previousPageStatement400(): void {
        this.pageno -= 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            400,
            '400',
            this.titleMessage400,
            this.tableIdMessage400,
            this.typeMessage400,
            this.pagesize,
            this.pageno
        );
    }

    nextPageStatement400(): void {
        this.pageno += 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            400,
            '400',
            this.titleMessage400,
            this.tableIdMessage400,
            this.typeMessage400,
            this.pagesize,
            this.pageno
        );
    }

    OnchangePageno400(e) {
        debugger;
        this.pageno = 0;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + 1;
        this.search(
            400,
            '400',
            this.titleMessage400,
            this.tableIdMessage400,
            this.typeMessage400,
            this.pagesize,
            this.pageno
        );
    }

    previousPageStatement500(): void {
        this.pageno -= 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            500,
            '500',
            this.titleMessage500,
            this.tableIdMessage500,
            this.typeMessage500,
            this.pagesize,
            this.pageno
        );
    }

    nextPageStatement500(): void {
        this.pageno += 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(
            500,
            '500',
            this.titleMessage500,
            this.tableIdMessage500,
            this.typeMessage500,
            this.pagesize,
            this.pageno
        );
    }

    OnchangePageno500(e) {
        debugger;
        this.pageno = 0;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + 1;
        this.search(
            500,
            '500',
            this.titleMessage500,
            this.tableIdMessage500,
            this.typeMessage500,
            this.pagesize,
            this.pageno
        );
    }

    ngOnInit(): void {
        debugger;

        //  this.apiGatewayService.updateApprovalObjHub({})
        this.hubId = null;
        this.commitFlag = true;
        /*this.itemsHub = [
            {
                label: 'ثبت اطلاعات دیتابیس',
                command: (event: any) => {
                    this.activeIndex = 0;
                },
            },
            {
                label: 'تست اتصال به دیتابیس',
                command: (event: any) => {
                    this.activeIndex = 1;
                },
            },
        ];*/
        this.itemsHub = [
            {
                label: 'ثبت اطلاعات دیتابیس',
                content: 'فرم وارد کردن اطلاعات دیتابیس',
                command: () => {
                    this.activeIndex = 0;
                },
            },
            {
                label: 'تست اتصال به دیتابیس',
                content: 'نتیجه‌ی تست اتصال به دیتابیس نمایش داده خواهد شد',
                command: () => {
                    this.activeIndex = 1;
                },
            },
        ];
        if (this.inputUpdate != undefined) {
            debugger;
            this.detailsBreadObject = this.chooseBread('updateHubBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
            this.headerRegHub = 'ویرایش هاب داده';
            this.nextShowFlag = true;
            this.backShowFlag = false;
            this.nextFlag = false;
            this.hubId = this.inputUpdate.hubId;
            this.dbEngineId =
                this.inputUpdate.dbEngineId != null
                    ? this.inputUpdate.dbEngineId.toString()
                    : this.inputUpdate.dbEngineId;
            this.commandTypeId =
                this.inputUpdate.commandTypeId != null
                    ? this.inputUpdate.commandTypeId.toString()
                    : null;
            debugger;
            switch (this.commandTypeId) {
                case '1':
                    /*this.itemsHub = [
                        {
                            label: 'ثبت dataBaseInfo',
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: 'تست اتصال به دیتابیس',
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: 'لیست پارامتر های کوئری',
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                        {
                            label: ' تست کوئری',
                            command: (event: any) => {
                                this.activeIndex = 3;
                            },
                        },
                    ];*/
                    this.itemsHub = [
                        {
                            label: 'ثبت dataBaseInfo',
                            content: 'فرم ثبت اطلاعات پایگاه داده',
                            command: () => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: 'تست اتصال به دیتابیس',
                            content: 'بررسی اتصال به پایگاه داده با اطلاعات وارد شده',
                            command: () => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: 'لیست پارامترهای کوئری',
                            content: 'نمایش لیست پارامترهای مورد استفاده در کوئری',
                            command: () => {
                                this.activeIndex = 2;
                            },
                        },
                        {
                            label: 'تست کوئری',
                            content: 'اجرای کوئری و نمایش نتیجه برای بررسی صحت',
                            command: () => {
                                this.activeIndex = 3;
                            },
                        },
                    ];
                    this.commitFlag = true;
                    this.objectName = this.inputUpdate.objectName;
                    this.customQueryFlag = false;
                    this.handlSpaseFlag = false;
                    this.textSqlFlag = true;
                    this.spFlag = false;
                    break;
                case '2':
                   /* this.itemsHub = this.itemsHub = [
                        {
                            label: 'ثبت dataBaseInfo',
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: 'تست اتصال به دیتابیس',
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: 'تست پروسیجر',
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                    ];*/
                    this.itemsHub = [
                        {
                            label: 'ثبت dataBaseInfo',
                            content: 'فرم ثبت اطلاعات پایگاه داده',
                            command: () => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: 'تست اتصال به دیتابیس',
                            content: 'بررسی اتصال به دیتابیس با اطلاعات وارد شده',
                            command: () => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: 'تست پروسیجر',
                            content: 'اجرای پروسیجر و نمایش نتایج آن',
                            command: () => {
                                this.activeIndex = 2;
                            },
                        },
                    ];
                    this.commitFlag = false;
                    this.objectName = this.inputUpdate.objectName;
                    this.customQueryFlag = false;
                    this.handlSpaseFlag = true;
                    this.textSqlFlag = false;
                    this.spFlag = true;
                    break;
                case '3':
                    debugger;
                   /* this.itemsHub = [
                        {
                            label: 'ثبت dataBaseInfo',
                            command: (event: any) => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: 'تست اتصال به دیتابیس',
                            command: (event: any) => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: 'تست کوئری',
                            command: (event: any) => {
                                this.activeIndex = 2;
                            },
                        },
                    ];*/
                    this.itemsHub = [
                        {
                            label: 'ثبت dataBaseInfo',
                            content: 'فرم ثبت اطلاعات پایگاه داده',
                            command: () => {
                                this.activeIndex = 0;
                            },
                        },
                        {
                            label: 'تست اتصال به دیتابیس',
                            content: 'بررسی اتصال به دیتابیس با اطلاعات وارد شده',
                            command: () => {
                                this.activeIndex = 1;
                            },
                        },
                        {
                            label: 'تست کوئری',
                            content: 'اجرای کوئری و نمایش نتیجه برای بررسی صحت',
                            command: () => {
                                this.activeIndex = 2;
                            },
                        },
                    ];
                    debugger;
                    this.commitFlag = false;
                    this.tempCustomQuery = this.inputUpdate.objectName;
                    this.customQuery = '';
                    this.customQueryFlag = true;
                    this.objectName = ' ';
                    this.textSqlFlag = false;
                    this.spFlag = false;
                    this.handlSpaseFlag = false;
                    break;
                case null:
                    break;
            }
            this.dbName = this.inputUpdate.dbName;
            this.ip = this.inputUpdate.ip;
            this.inputUpdate.portNumber != undefined
                ? (this.port = this.inputUpdate.portNumber.toString())
                : this.inputUpdate.portNumber;
            this.user = this.inputUpdate.userName;
            this.hubTitle = this.inputUpdate.hubTitle;
            this.password = this.inputUpdate.password;
            this.passwordLbl = '*'.repeat(this.inputUpdate.password.length);
            this.driverName = '-';
            //  this.inputUpdate.canCommit == 0 ? this.canCommit = true : this.canCommit = false
            this.inputUpdate.autoCommit === 1
                ? (this.autoCommit = true)
                : (this.autoCommit = false);
            this.connectionPoolSize = this.inputUpdate.connectionPoolSize;
            this.inputUpdate.allowCreateConnectionPool === 1
                ? (this.allowCreateConnectionPool = true)
                : (this.allowCreateConnectionPool = false);

            this.ipLbl = this.ip + ':';
            this.portLbl = this.port + ';';
            this.userLbl = this.user + ';';

            if (
                this.inputUpdate.messageId2X != null &&
                this.inputUpdate.messageId2X != 0
            ) {
                debugger;
                this.icon200_val = 'pi pi-check';
                this.messageId2X = this.inputUpdate.messageId2X;
                this.selectedMessageId2XX = this.inputUpdate;
            } else {
                this.icon200_val = null;
            }

            if (
                this.inputUpdate.messageId4X != null &&
                this.inputUpdate.messageId4X != 0
            ) {
                this.icon400_val = 'pi pi-check';
                this.messageId4X = this.inputUpdate.messageId4X;
                this.selectedMessageId4XX = this.inputUpdate;
            } else {
                this.icon400_val = null;
            }
            if (
                this.inputUpdate.messageId5X != null &&
                this.inputUpdate.messageId5X != 0
            ) {
                this.icon500_val = 'pi pi-check';
                this.messageId5X = this.inputUpdate.messageId5X;
                this.selectedMessageId5XX = this.inputUpdate;
            } else {
                this.icon500_val = null;
            }
            debugger;
            debugger;
            debugger;
            window.localStorage.setItem(
                'hubObj',
                JSON.stringify(this.inputUpdate)
            );
            this.selectedMessageId2XX != undefined &&
            this.selectedMessageId2XX != null
                ? (this.icon200_val = 'pi pi-check')
                : (this.icon200_val = null);
            this.selectedMessageId4XX != undefined &&
            this.selectedMessageId4XX != null
                ? (this.icon400_val = 'pi pi-check')
                : (this.icon400_val = null);
            this.selectedMessageId5XX != undefined &&
            this.selectedMessageId5XX != null
                ? (this.icon500_val = 'pi pi-check')
                : (this.icon500_val = null);
            debugger;
            this.nextFlag = false;
        }
        else {
            this.dbEngineId = null;
            this.commandTypeId = '1';
            this.dbName = null;
            this.driverName = '-';
            this.ip = null;
            this.port = null;
            this.user = null;
            this.password = null;
            this.objectName = null;
            //  this.canCommit = null
            this.autoCommit = null;
            this.connectionPoolSize = 10;
            this.allowCreateConnectionPool = null;
            this.nextFlag = true;
            this.tooltipNext = 'ابتدا اطلاعات دیتابیس را ثبت بنمائید';
            this.ipLbl = '';
            this.portLbl = '';
            this.userLbl = '';
            this.passwordLbl = '';
            this.detailsBreadObject = this.chooseBread('addHubBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
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
            this.queryFailedFlag = false;
            this.querySuccessFlag = false;
            this.param = '';
        }
    }


    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'addHubBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.config'),
                        img_index0: 'assets/icons/config.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.dataHub'),
                        rout_index1: '/hub',
                        isActive1: true,
                        img_index1: 'assets/icons/hub.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('breadcrumbs.addDataHub'),
                        rout_index2: '/register',
                        isActive2: true,
                        img_index2: 'assets/icons/save.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'updateHubBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.config'),
                        img_index0: 'assets/icons/config.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('breadcrumbs.dataHub'),
                        rout_index1: '/hub',
                        isActive1: true,
                        img_index1: 'assets/icons/hub.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('breadcrumbs.editDataHub'),
                        rout_index2: '/register',
                        isActive2: true,
                        img_index2: 'assets/icons/update.png',
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
    onClose(e) {
        this.close.emit('close');
    }

    testSp() {}
}
