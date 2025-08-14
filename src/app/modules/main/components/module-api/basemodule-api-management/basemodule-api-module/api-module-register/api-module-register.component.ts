import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiGatewayConstants} from "../../../../../constants/ApiGatewayConstants";
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
import { ToastService } from '../../../../../../shared/services/ToastService';
import { FuseLoadingService } from '../../../../../../../../@fuse/services/loading';
import { MessagesApiFacadeService } from '../../../../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../../../../services/api-gateway.service';
import { Constants } from '../../../../../../shared/constants/Constants';
import { KeyFilter } from 'primeng/keyfilter';
import { InputNumber } from 'primeng/inputnumber';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Textarea } from 'primeng/textarea';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { DirectionService } from '../../../../../../../../shared/services/DirectionService';
import { PersianCalendarComponent } from '../../../../../../shared/components/persian-calendar/persian-calendar.module';

@Component({
    selector: 'app-api-module-register',
    templateUrl: './api-module-register.component.html',
    styleUrls: ['./api-module-register.component.scss'],
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
        KeyFilter,
        InputNumber,
        ToggleSwitch,
        Textarea,
        InputGroup,
        InputGroupAddon,
        PersianCalendarComponent,
    ],
})
export class ApiModuleRegisterComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputRegister;
    helpFlag: boolean = false;
    moc_status = false
    protocolOptions = ApiGatewayConstants.protocol;
    typeOptions = ApiGatewayConstants.type;
    callDurationOptions = ApiGatewayConstants.callDuration;
    reverseConditionOptions = ApiGatewayConstants.reverseCondition;
    statusCodeOptions = ApiGatewayConstants.statusCodeApi;
    url_cust_alphaEnOSlashOUnderDashLineAndDash: RegExp =
        ApiGatewayConstants.url_cust_alphaEnOSlashOUnderDashLineAndDash;
    cust_alphanumEn: RegExp = ApiGatewayConstants.cust_alphanumEn;
    // cust_alphaAndNumbers: RegExp = ApiGatewayConstants.cust_alphaAndNumbers
    slashAlpha: RegExp =
        ApiGatewayConstants.url_cust_alphaEnOSlashOUnderDashLine;
    retryForHttpStatusCode;
    protocol;
    name;
    title;
    type;
    url;
    timeout;
    runningType;
    maxCall: number = 0;
    callDuration;
    cashing_expire;
    status;
    description;
    retryCount;
    delayRetryCount;
    limitForPeriod;
    limitRefreshPeriod;
    itemsDialog;
    tempItemDialog: number = null;
    logRequestStatus = true;
    logResponseStatus = true;
    reverseStatus = false;
    cookeSendStatus = false;
    dataHubStatus = false;
    cashing_status = false;
    EncodingUrlDialogFlag = true;
    encodingUrlName;
    encodingUrlValue;
    reverseCondition;
    mockJsonResponse=null
    dailyCount: number = 0;
    weeklyCount: number = 0;
    monthlyCount: number = 0;
    encodingUrlList = [];
    first: number = 0;
    rows: number = 10;
    LblCashing_status = 'غیر فعال';
    LblLogRequestStatus = 'فعال';
    LblLogResponseStatus = 'فعال';
    LblReverseStatus = 'غیر فعال';
    LblCookeSendStatus = 'غیر فعال';
    LblDataHubStatus = 'غیر فعال';
    LblStatus = 'فعال';
    shenase;
    objectRegister = {
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
        hasHub: null,
        dailyCount: null,
        weeklyCount: null,
        monthlyCount: null,
        feeFieldPath: null,
        retryForHttpStatusCode: null,
        hasBody: 1,
        hasEncodingUrl: null,
        hasUrlParams: null,
        staticBody: null,
        hasStaticBody: 0,
        mockJsonResponse: null,
        isMock: 0

    };
    paginationLabel=this.transloco.translate('label.pagination.table');
    checkedBody: boolean = false;
    hasUrlParams: boolean = false;
    checkedStaticBody: boolean = false;
    checkedEncodingUrl: boolean = false;
    dialogEncodingUrlFlag: boolean = false;
    checkedKarmozd: boolean = false;
    disabledBody: boolean = true;
    feeFieldPath = '';
    staticBody = '';
    hasSequence = false;
    sequenceTooltip = 'این فیلد قابل ویرایش نمی باشد!';
    helpTextareaFlag: boolean = false;
    direction
    moduleBase: boolean;
    accessBase: boolean;
    clientBase: boolean;
    detailsBreadObject = [];
    constructor(
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private directionService: DirectionService,
        private transloco :TranslocoService,
        private route: ActivatedRoute,
        private notifierService: ToastService
    ) {}

    deleteEncodingUrl(item) {
        debugger;
        for (let i = 0; i < this.encodingUrlList.length; i++) {
            debugger;
            if (this.encodingUrlList[i].row == item.row) {
                this.encodingUrlList.splice(i, 1);
                break;
            }
        }
    }
    onChangeMethodeHttp(e) {
        if (e.value == '1') {
            this.disabledBody = false;
        } else {
            this.disabledBody = true;
            this.checkedBody = false;
        }
    }
    setRecordDialogSecond(numberApi: number) {
        this.tempItemDialog = numberApi;
    }
    openHelpDialogTextarea() {
        this.helpTextareaFlag = true;
    }
    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'accessBase':
                return [
                    {
                        index: 0,
                        label_index0:  'لیست دسترسی',
                        mg_index0: 'assets/icons/access.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1:  'سرویس',
                        rout_index1: '',
                        isActive1: true,
                        img_index1: 'assets/icons/api.png',
                        label_Detail_index1: null,
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('registerParty.header.registerParty'),
                        rout_index2: '',
                        isActive2: true,
                        img_index2: 'assets/icons/save.png',
                    },
                    {  label_index3: null, label_Detail_index3: null },
                    {  label_index4: null, label_Detail_index4: null },
                    {  label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'clientBase':
                return [
                    {
                        index: 0,
                        label_index0:'کلاینت',
                        img_index0: 'assets/icons/client.png',
                        rout_index0: '/client',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'لیست دسترسی',
                        rout_index1: null,
                        isActive1: false,
                        img_index1:'assets/icons/access.png',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        img_index2: 'assets/icons/api.png',
                        label_Detail_index2:'(لیست دسترسی)',
                    },
                    {  label_index3: null, label_Detail_index3: null },
                    {  label_index4: null, label_Detail_index4: null },
                    {  label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }
    ngOnInit(): void {

            this.direction=this.directionService
        this.scrollTop();
        this.status = true;
        this.itemsDialog = [
            {
                label: 'حذف encodingUrl',
                icon: '',
                command: () => {
                    this.deleteEncodingUrl(this.tempItemDialog);
                },
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
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    changeKarmozd() {
        if (this.checkedKarmozd == false) {
            this.feeFieldPath = '';
        }
    }

    changeEncodingUrl() {
        if (this.checkedEncodingUrl == true) {
            //this.staticBody = ''
            this.checkedStaticBody = false;
            this.staticBody = null;
            this.EncodingUrlDialogFlag = false;
            // this.encodingUrlList = []
        } else {
            // this.encodingUrlList = []
            this.EncodingUrlDialogFlag = true;
        }
    }

    changeStaticBody() {
        if (this.checkedStaticBody == true) {
            this.checkedEncodingUrl = false;
            // this.encodingUrlList = []
            // this.staticBody = ''
            this.EncodingUrlDialogFlag = true;
        } else {
            this.staticBody = null;
            //   this.staticBody = ''
        }
    }

    onEncodingUrl() {
        this.dialogEncodingUrlFlag = true;
    }
    validationEncodingUrl(): boolean {
        if (!this.encodingUrlName) {
            this.notifierService.showError({
                detail: 'نام EncodingUrl را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.encodingUrlValue) {
            this.notifierService.showError({
                detail: 'مقدار EncodingUrl را وارد کنید!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }
    addEncodingUrl() {
        if (this.validationEncodingUrl()) {
            this.encodingUrlList.push({
                name: this.encodingUrlName,
                value: this.encodingUrlValue,
            });
            this.encodingUrlName = '';
            this.encodingUrlValue = '';
            for (let k = 0; k < this.encodingUrlList.length; k++) {
                if ('row' in this.encodingUrlList) {
                } else {
                    this.encodingUrlList[k] = Object.assign(
                        this.encodingUrlList[k],
                        {
                            row: k + 1,
                        }
                    );
                }
            }
        }
    }

    onCancel() {
        this.close.emit('close');
    }

    onKeydown(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }

    onChange(e) {
        this.cashing_status
            ? (this.LblCashing_status = 'فعال')
            : (this.LblCashing_status = 'غیر فعال');
        this.logRequestStatus
            ? (this.LblLogRequestStatus = 'فعال')
            : (this.LblLogRequestStatus = 'غیر فعال');
        this.logResponseStatus
            ? (this.LblLogResponseStatus = 'فعال')
            : (this.LblLogResponseStatus = 'غیر فعال');
        this.reverseStatus
            ? (this.LblReverseStatus = 'فعال')
            : (this.LblReverseStatus = 'غیر فعال');
        this.dataHubStatus
            ? (this.LblDataHubStatus = 'فعال')
            : (this.LblDataHubStatus = 'غیر فعال');
        this.cookeSendStatus
            ? (this.LblCookeSendStatus = 'فعال')
            : (this.LblCookeSendStatus = 'غیر فعال');
        this.status ? (this.LblStatus = 'فعال') : (this.LblStatus = 'غیر فعال');
    }

    onInputChange(value) {
        if (
            this.delayRetryCount < 1000 ||
            this.delayRetryCount == '' ||
            this.delayRetryCount == null
        ) {
            if (this.retryCount > 0) {
                this.delayRetryCount = 1000;
            }
            if (this.retryCount == 0) {
                this.delayRetryCount = 0;
            }
        } else {
            if (this.retryCount == 0) {
                this.delayRetryCount = 0;
            }
        }
    }

    onRegister() {
        if (this.validation()) {
            this.objectRegister.moduleId = this.inputRegister.moduleId;
            if (
                this.timeout == null ||
                this.timeout == undefined ||
                this.timeout == ''
            ) {
                this.timeout = '0';
            }
            // this.name != null ? this.name = this.name.toLowerCase() : null
            this.name != null
                ? (this.objectRegister.name = this.name)
                : (this.objectRegister.name = null);
            this.title != null
                ? (this.objectRegister.title = this.title)
                : (this.objectRegister.title = null);
            /*   this.shenase = 'AG-' + this.shenase;
            this.shenase != null ? this.objectRegister.shenase = this.shenase : this.objectRegister.shenase = null
*/
            this.objectRegister.staticBody = this.staticBody;
            this.checkedStaticBody == true
                ? (this.objectRegister.hasStaticBody = 1)
                : (this.objectRegister.hasStaticBody = 0);
            this.url != null
                ? (this.objectRegister.url = this.url)
                : (this.objectRegister.url = null);
            this.feeFieldPath != null
                ? (this.objectRegister.feeFieldPath = this.feeFieldPath)
                : (this.objectRegister.feeFieldPath = null);
            this.cashing_expire != null
                ? (this.objectRegister.cashing_expire = this.cashing_expire)
                : (this.objectRegister.cashing_expire = null);
            this.description != null
                ? (this.objectRegister.description = this.description)
                : (this.objectRegister.description = null);
            this.timeout != null
                ? (this.objectRegister.timeout = Number(this.timeout))
                : (this.objectRegister.timeout = null);
            this.protocol != null
                ? (this.objectRegister.protocol = Number(this.protocol))
                : (this.objectRegister.protocol = null);
            this.type != null
                ? (this.objectRegister.type = Number(this.type))
                : (this.objectRegister.type = null);
            this.runningType != null
                ? (this.objectRegister.runningType = Number(this.runningType))
                : (this.objectRegister.runningType = null);
            this.maxCall != null
                ? (this.objectRegister.maxCall = Number(this.maxCall))
                : (this.objectRegister.maxCall = 0);
            this.retryCount != null
                ? (this.objectRegister.retryCount = Number(this.retryCount))
                : (this.objectRegister.retryCount = 0);
            this.delayRetryCount != null
                ? (this.objectRegister.delayRetryCount = Number(
                      this.delayRetryCount
                  ))
                : (this.objectRegister.delayRetryCount = null);
            this.limitForPeriod != null
                ? (this.objectRegister.limitForPeriod = Number(
                      this.limitForPeriod
                  ))
                : (this.objectRegister.limitForPeriod = null);
            this.limitRefreshPeriod != null
                ? (this.objectRegister.limitRefreshPeriod = Number(
                      this.limitRefreshPeriod
                  ))
                : (this.objectRegister.limitRefreshPeriod = null);
            this.reverseCondition != null
                ? (this.objectRegister.reverseCondition = Number(
                      this.reverseCondition
                  ))
                : (this.objectRegister.reverseCondition = null);
            this.retryForHttpStatusCode != null
                ? (this.objectRegister.retryForHttpStatusCode = Number(
                      this.retryForHttpStatusCode
                  ))
                : (this.objectRegister.retryForHttpStatusCode = null);
            this.retryForHttpStatusCode != null
                ? (this.objectRegister.retryForHttpStatusCode = Number(
                      this.retryForHttpStatusCode
                  ))
                : (this.objectRegister.retryForHttpStatusCode = null);
            this.dailyCount != null
                ? (this.objectRegister.dailyCount = Number(this.dailyCount))
                : (this.objectRegister.dailyCount = 0);
            this.weeklyCount != null
                ? (this.objectRegister.weeklyCount = Number(this.weeklyCount))
                : (this.objectRegister.weeklyCount = 0);
            this.monthlyCount != null
                ? (this.objectRegister.monthlyCount = Number(this.monthlyCount))
                : (this.objectRegister.monthlyCount = 0);
            this.logRequestStatus == true
                ? (this.objectRegister.logRequestStatus = 1)
                : (this.objectRegister.logRequestStatus = 0);
            this.cashing_status == true
                ? (this.objectRegister.cashing_status = 1)
                : (this.objectRegister.cashing_status = 0);
            this.logResponseStatus == true
                ? (this.objectRegister.logResponseStatus = 1)
                : (this.objectRegister.logResponseStatus = 0);
            this.reverseStatus == true
                ? (this.objectRegister.reverseStatus = 1)
                : (this.objectRegister.reverseStatus = 0);
            this.dataHubStatus == true
                ? (this.objectRegister.hasHub = 1)
                : (this.objectRegister.hasHub = 0);
            this.cookeSendStatus == true
                ? (this.objectRegister.cookeSendStatus = 1)
                : (this.objectRegister.cookeSendStatus = 0);
            this.status == true
                ? (this.objectRegister.status = 1)
                : (this.objectRegister.status = 0);
            this.checkedEncodingUrl == true
                ? (this.objectRegister.hasEncodingUrl = 1)
                : (this.objectRegister.hasEncodingUrl = 0);
            this.objectRegister.callDuration = +0;
            this.checkedBody == true
                ? (this.objectRegister.hasBody = 1)
                : (this.objectRegister.hasBody = 0);
            this.hasUrlParams == true
                ? (this.objectRegister.hasUrlParams = 1)
                : (this.objectRegister.hasUrlParams = 0);
            this.moc_status == true ? this.objectRegister.isMock = 1 : this.objectRegister.isMock = 0
            this.moc_status==true?this.objectRegister.mockJsonResponse=this.mockJsonResponse:this.objectRegister.mockJsonResponse=null
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerApi(this.objectRegister)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        if (
                            this.checkedEncodingUrl &&
                            this.encodingUrlList.length > 0
                        ) {
                            for (
                                let k = 0;
                                k < this.encodingUrlList.length;
                                k++
                            ) {
                                if ('apiId' in this.encodingUrlList) {
                                } else {
                                    this.encodingUrlList[k] = Object.assign(
                                        this.encodingUrlList[k],
                                        {
                                            apiId: a.apiId,
                                        }
                                    );
                                }
                            }
                            let objEncodingUrl = {
                                apiId: null,
                                name: null,
                                value: null,
                            };
                            this.encodingUrlList.forEach((item) => {
                                objEncodingUrl.apiId = item.apiId;
                                objEncodingUrl.name = item.name;
                                objEncodingUrl.value = item.value;
                                this._primengProgressBarService.show();
                                this.messagesApiFacadeService
                                    .encodedetailRegister(objEncodingUrl)
                                    .subscribe(
                                        (s) => {
                                            this._primengProgressBarService.hide();
                                            this.close.emit('closeAndCreate');
                                            this.notifierService.showSuccess({
                                                detail: 'اطلاعات ثبت گردید!',
                                                life: 3000,
                                            });
                                        },
                                        (error) => {
                                            this._primengProgressBarService.hide();
                                        }
                                    );
                            });
                        } else {
                            this.close.emit('closeAndCreate');
                            this.notifierService.showSuccess({
                                detail: 'اطلاعات ثبت گردید!',
                                life: 3000,
                            });
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    changeMoc_status(){
        if (this.moc_status == false) {
            this.mockJsonResponse = null
        }
    }

    validation(): boolean {
        debugger;
        let tempName;
        let alarmFlagSlash = false;
        tempName =this.name? this.name.split('/').filter((word) => {
            if (word !== '') return word;
        }):this.name;
        const set = new Set(tempName);

        const duplicateList =tempName ? tempName.filter((item) => {
            if (set.has(item)) {
                set.delete(item);
            } else {
                return item;
            }
        }):tempName ;
        if (duplicateList){
            for (let i = 0; i < duplicateList.length; i++) {
                if (duplicateList[i].includes('segment')) {
                    debugger;
                    alarmFlagSlash = true;
                }
            }
        }


        if(this.name){
            for (let i = 0; i < this.name.length; i++) {
                if (this.name.charAt(i) == '{') {
                    if (this.name.charAt(i - 1) != '/') {
                        debugger;
                        alarmFlagSlash = true;
                    }
                    if (
                        this.name.charAt(i + 1) != 's' ||
                        this.name.charAt(i + 2) != 'e' ||
                        this.name.charAt(i + 3) != 'g' ||
                        this.name.charAt(i + 4) != 'm' ||
                        this.name.charAt(i + 5) != 'e' ||
                        this.name.charAt(i + 6) != 'n' ||
                        this.name.charAt(i + 7) != 't'
                    ) {
                        debugger;
                        alarmFlagSlash = true;
                    }
                }

                if (this.name.charAt(i) == '}') {
                    debugger;
                    if (
                        this.name.charAt(i + 2) != -1 &&
                        this.name.charAt(i + 2) != '' &&
                        this.name.charAt(i + 1) != '/'
                    ) {
                        debugger;
                        alarmFlagSlash = true;
                    }
                }
            }
        }

        if (!this.title) {
            this.notifierService.showError({
                detail: 'لطفا  عنوان سرویس را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.name) {
            this.notifierService.showError({
                detail: 'لطفا نام سرویس را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (
            Constants.BracesOpenPattern.test(this.name) &&
            !Constants.BracesClosePattern.test(this.name)
        ) {
            debugger;
            this.notifierService.showError({
                detail: 'الگوی وارد شده برای نام سرویس صحیح نمی باشد!',
                life: 3000,
            });
            return false;
        } else if (
            Constants.BracesClosePattern.test(this.name) &&
            !Constants.BracesOpenPattern.test(this.name)
        ) {
            this.notifierService.showError({
                detail: 'الگوی وارد شده برای نام سرویس صحیح نمی باشد!',
                life: 3000,
            });
            return false;
        } else if (alarmFlagSlash) {
            this.notifierService.showError({
                detail: 'الگوی وارد شده برای نام سرویس صحیح نمی باشد!',
                life: 3000,
            });
        } else if (
            /*        else if (
                    (Constants.BracesOpenPattern.test(this.name)
                        &&!Constants.BracesOpenAndCloseAndEveryPattern.test(this.name)
                    )||
                    (
                        (Constants.BracesClosePattern.test(this.name)
                            &&!Constants.BracesOpenAndCloseAndEveryPattern.test(this.name)
                        )
                    )
                ) {
                    this.notifierService.showError({detail: "الگوی وارد شده برای نام سرویس صحیح نمی باشد!", life: 3000});
                    return false;
                }*/
            this.name.split(Constants.BracesOpenPattern).length - 1 !=
            this.name.split(Constants.BracesClosePattern).length - 1
        ) {
            this.notifierService.showError({
                detail: 'الگوی وارد شده برای نام سرویس صحیح نمی باشد!',
                life: 3000,
            });
            return false;
        } else if (
            !this.name.includes('segment') &&
            Constants.BracesOpenAndClosePattern.test(this.name) &&
            !this.name.includes('segment1') &&
            Constants.BracesOpenAndClosePattern.test(this.name) &&
            !this.name.includes('segment2') &&
            Constants.BracesOpenAndClosePattern.test(this.name) &&
            !this.name.includes('segment3') &&
            Constants.BracesOpenAndClosePattern.test(this.name) &&
            !this.name.includes('segment4') &&
            Constants.BracesOpenAndClosePattern.test(this.name) &&
            !this.name.includes('segment5') &&
            Constants.BracesOpenAndClosePattern.test(this.name)
        ) {
            this.notifierService.showError({
                detail: 'الگوی وارد شده برای نام سرویس صحیح نمی باشد!',
                life: 3000,
            });
            return false;
        } else if (duplicateList.length > 0 && alarmFlagSlash) {
            this.notifierService.showError({
                detail: 'الگوی وارد شده برای نام سرویس صحیح نمی باشد!',
                life: 3000,
            });
        } else if (!this.url) {
            this.notifierService.showError({
                detail: 'لطفا مسیر را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (
            Number(this.retryCount) > 0 &&
            Number(this.delayRetryCount) < 1000
        ) {
            this.notifierService.showWarning({
                detail: 'فیلد فاصله زمانی بین هر تلاش در بخش تعیین شرایط فراخوانی سرویس نباید کمتر از 1000 باشد!',
                life: 3000,
            });
            return false;
        } else if (!this.type) {
            this.notifierService.showError({
                detail: 'لطفا نوع متد را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (!this.protocol) {
            this.notifierService.showError({
                detail: 'لطفا بستر ارتباطی را وارد کنید!',
                life: 3000,
            });
            return false;
        } else if (this.moc_status&&!this.mockJsonResponse) {
            this.notifierService.showError({detail: "لطفا  mock پاسخ سرویس را وارد کنید!", life: 3000});
            return false;
        } if(this.moc_status&&this.mockJsonResponse){
            debugger
            try{
                debugger
                JSON.parse(this.mockJsonResponse)
                return true
            }catch(e){
                debugger
                this.notifierService.showError({detail: "json وارد شده برای mock به فرمت استاندارد نمی باشد!", life: 3000});
                return false;
            }
        } else {
            return true;
        }
    }
}
