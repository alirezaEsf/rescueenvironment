import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiGatewayConstants } from '../../../../../constants/ApiGatewayConstants';
import { ActivatedRoute } from '@angular/router';

import { TableModule } from 'primeng/table';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../../../shared/pipes/moreChar19.pipe';
import { NgStyle } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { DropdownModule } from 'primeng/dropdown';

import { Checkbox } from 'primeng/checkbox';
import { FuseLoadingService } from '../../../../../../../../@fuse/services/loading';
import { MessagesApiFacadeService } from '../../../../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../../../../services/api-gateway.service';
import { ToastService } from '../../../../../../shared/services/ToastService';
import { Constants } from '../../../../../../shared/constants/Constants';
import { KeyFilter } from 'primeng/keyfilter';
import { InputNumber } from 'primeng/inputnumber';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Textarea } from 'primeng/textarea';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { PersianCalendarComponent } from '../../../../../../shared/components/persian-calendar/persian-calendar.module';
import { InputTextarea } from 'primeng/inputtextarea';

@Component({
    selector: 'app-api-module-update',
    templateUrl: './api-module-update.component.html',
    styleUrls: ['./api-module-update.component.scss'],
    standalone: true,
    imports: [
        Panel,
        FormsModule,
        InputText,
        ButtonDirective,
        KeyFilter,
        DropdownModule,
        Checkbox,
        InputNumber,

        NgStyle,
        TranslocoPipe,
        Dialog,
        TableModule,
        Tooltip,
        MoreChar19Pipe,
        ToggleSwitch,
        Textarea,
        InputGroup,
        InputGroupAddon,
        PersianCalendarComponent,
        InputTextarea,

    ],
})
export class ApiModuleUpdateComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputUpdate;
    moc_status = false
    mockJsonResponse=null
    karmozd = '';
    helpFlag: boolean = false;
    slashAlpha: RegExp =
        ApiGatewayConstants.url_cust_alphaEnOSlashOUnderDashLine;
    protocolOptions = ApiGatewayConstants.protocol;
    typeOptions = ApiGatewayConstants.type;
    callDurationOptions = ApiGatewayConstants.callDuration;
    reverseConditionOptions = ApiGatewayConstants.reverseCondition;
    statusCodeOptions = ApiGatewayConstants.statusCodeApi;
    cust_alphanumEn: RegExp = ApiGatewayConstants.cust_alphanumEn;
    //cust_alphanEnAndSlash = ApiGatewayConstants.url_cust_alphaEnOSlashOUnderLine
    url_cust_alphaEnOSlashOUnderDashLineAndDash: RegExp =
        ApiGatewayConstants.url_cust_alphaEnOSlashOUnderDashLineAndDash;
    retryForHttpStatusCode;
    protocol;
    itemsDialog;
    name;
    title;
    type;
    url;
    timeout;
    runningType;
    maxCall;
    callDuration;
    cashing_expire;
    status;
    description;
    shenase;
    retryCount;
    delayRetryCount;
    limitForPeriod;
    limitRefreshPeriod;
    reverseCondition;
    moduleId;
    apiId;
    dailyCount;
    weeklyCount;
    monthlyCount;
    hasSequence = false;
    feeFieldPath = '';
    sequenceTooltip = 'این فیلد قابل ویرایش نمی باشد!';
    logRequestStatus = false;
    logResponseStatus = false;
    reverseStatus = false;
    cookeSendStatus = false;
    dataHubStatus = false;
    cashing_status = false;
    dialogEncodingUrlFlag: boolean = false;
    checkedEncodingUrl: boolean = false;
    LblCashing_status = null;
    LblLogRequestStatus = null;
    LblLogResponseStatus = null;
    LblReverseStatus = null;
    LblCookeSendStatus = null;
    LblDataHubStatus = null;
    LblStatus = null;
    first: number = 0;
    rows: number = 10;
    objectUpdate = {
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
        dailyCount: null,
        weeklyCount: null,
        monthlyCount: null,
        retryForHttpStatusCode: null,
        feeFieldPath: null,
        hasBody: null,
        hasEncodingUrl: null,
        hasUrlParams: null,
        staticBody: null,
        hasHub: null,
        shenase: null,
        hasStaticBody: 0,
        hasSequence: 0,
        mockJsonResponse: null,
        isMock: 0
    };
    checkedBody: boolean = false;
    hasUrlParams: boolean = false;
    checkedKarmozd: boolean = false;
    checkedStaticBody: boolean = false;
    encodingUrlName;
    encodingUrlValue;
    encodingUrlList = [];
    EncodingUrlDialogFlag = true;
    tempItemDialog: number = null;
    staticBody = '';
    helpTextareaFlag: boolean = false;
    disabledBody: boolean = true;
    paginationLabel = this.transloco.translate('label.pagination.table');

    constructor(
        private route: ActivatedRoute,
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private transloco: TranslocoService,
        private notifierService: ToastService,
    ) {
    }

    setRecordDialogSecond(numberApi: number) {
        this.tempItemDialog = numberApi;
    }

    onChangeMethodeHttp(e) {
        if (e.value == '1') {
            this.disabledBody = false;
        } else {
            this.disabledBody = true;
            this.checkedBody = false;
        }
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    changeKarmozd() {
        if (this.checkedKarmozd == false) {
            this.feeFieldPath = '';
        }
    }

    onEncodingUrl() {
        this.dialogEncodingUrlFlag = true;
    }

    deleteEncodingUrl(item) {
        debugger;
        for (let i = 0; i < this.encodingUrlList.length; i++) {
            if (this.encodingUrlList[i].detailId == item.detailId) {
                debugger;
                this.encodingUrlList.splice(i, 1);
                break;
            }
        }
    }

    changeStaticBody() {
        if (this.checkedStaticBody == true) {
            this.checkedEncodingUrl = false;

            // this.encodingUrlList=[]
            //this.staticBody = ''
            this.EncodingUrlDialogFlag = true;
        } else {
            this.staticBody = null;
            // this.staticBody = ''
        }
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

    changeEncodingUrl() {
        if (this.checkedEncodingUrl == true) {
            //this.staticBody = ''
            this.checkedStaticBody = false;
            this.staticBody = null;
            this.EncodingUrlDialogFlag = false;
            //  this.encodingUrlList=[]
        } else {
            //this.encodingUrlList=[]
            this.EncodingUrlDialogFlag = true;
        }
    }

    closeEncodingUrl(e) {
        this.dialogEncodingUrlFlag = false;
        this.encodingUrlName = '';
        this.encodingUrlValue = '';
    }

    addEncodingUrl() {
        debugger;
        if (this.validationEncodingUrl()) {
            this.encodingUrlList.push({
                name: this.encodingUrlName,
                value: this.encodingUrlValue,
                detailId: null,
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
                        },
                    );
                }
            }
        }
    }

    ngOnInit(): void {
        debugger;
        this.scrollTop();
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .encodedetailbyapiid(this.inputUpdate.apiId)
            .subscribe(
                (l) => {
                    this._primengProgressBarService.hide();
                    if (l.length > 0) {
                        if (Array.isArray(l)) {
                            this.encodingUrlList = l;
                        } else {
                            this.encodingUrlList.push(l);
                        }
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                },
            );

        // this.itemsDialog = [
        //     {
        //         label: 'حذف encodingUrl',
        //         icon: '',
        //         command: () => {
        //             this.deleteEncodingUrl(this.tempItemDialog);
        //         }
        //     },
        //
        //     {
        //         label: '___________________',
        //
        //     },
        //     {
        //         label: this.transloco.translate('contextMenu.cancel'),
        //         /*items: [{
        //             label: this.transloco.translate('contextMenu.cancel'),
        //
        //         }]*/
        //     }
        // ];
        this._primengProgressBarService.show();
        this.apiGatewayService.currentApprovalStageModuleId.subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                this.moduleId = a;
            },
            (error) => {
                this._primengProgressBarService.hide();
            },
        );
        if (this.inputUpdate != undefined) {
            this.moduleId = this.inputUpdate.moduleId;
        }
        this.apiId = this.inputUpdate.apiId;
        this.title = this.inputUpdate.title;
        this.name = this.inputUpdate.name;
        this.url = this.inputUpdate.url;
        this.timeout = this.inputUpdate.timeout;
        this.runningType = this.inputUpdate.runningType;
        this.maxCall = this.inputUpdate.maxCall;
        this.description = this.inputUpdate.description;
        this.retryCount = this.inputUpdate.retryCount;
        this.delayRetryCount = this.inputUpdate.delayRetryCount;
        this.limitForPeriod = this.inputUpdate.limitForPeriod;
        this.limitRefreshPeriod = this.inputUpdate.limitRefreshPeriod;
        this.cashing_expire = this.inputUpdate.cashing_expire;
        this.dailyCount = this.inputUpdate.dailyCount;
        this.weeklyCount = this.inputUpdate.weeklyCount;
        this.monthlyCount = this.inputUpdate.monthlyCount;
        this.feeFieldPath = this.inputUpdate.feeFieldPath;
        this.inputUpdate.hasStaticBody == 1
            ? (this.checkedStaticBody = true)
            : ((this.checkedStaticBody = false), (this.staticBody = null));
        this.staticBody = this.inputUpdate.staticBody;
        debugger;
        this.inputUpdate.shenase != undefined ||
        this.inputUpdate.shenase != null
            ? (this.shenase = this.inputUpdate.shenase.replace(/AG-/g, ''))
            : this.inputUpdate.shenase;
        debugger;
        this.feeFieldPath
            ? (this.checkedKarmozd = true)
            : (this.checkedKarmozd = false);

        this.inputUpdate.hasSequence == 1
            ? (this.hasSequence = true)
            : (this.hasSequence = false);
        this.inputUpdate.logRequestStatus == 1
            ? (this.logRequestStatus = true)
            : (this.logRequestStatus = false);
        this.inputUpdate.logRequestStatus == 1
            ? (this.LblLogRequestStatus = 'فعال')
            : (this.LblLogRequestStatus = 'غیر فعال');
        this.inputUpdate.cashing_status == 1
            ? (this.cashing_status = true)
            : (this.cashing_status = false);
        this.inputUpdate.cashing_status == 1
            ? (this.LblCashing_status = 'فعال')
            : (this.LblCashing_status = 'غیر فعال');
        this.inputUpdate.logResponseStatus == 1
            ? (this.logResponseStatus = true)
            : (this.logResponseStatus = false);
        this.inputUpdate.logResponseStatus == 1
            ? (this.LblLogResponseStatus = 'فعال')
            : (this.LblLogResponseStatus = 'غیر فعال');
        this.inputUpdate.reverseStatus == 1
            ? (this.reverseStatus = true)
            : (this.reverseStatus = false);
        this.inputUpdate.reverseStatus == 1
            ? (this.LblReverseStatus = 'فعال')
            : (this.LblReverseStatus = 'غیر فعال');
        this.inputUpdate.cookeSendStatus == 1
            ? (this.cookeSendStatus = true)
            : (this.cookeSendStatus = false);
        this.inputUpdate.cookeSendStatus == 1
            ? (this.LblCookeSendStatus = 'فعال')
            : (this.LblCookeSendStatus = 'غیر فعال');
        this.inputUpdate.hasHub == 1
            ? (this.dataHubStatus = true)
            : (this.dataHubStatus = false);
        this.inputUpdate.hasHub == 1
            ? (this.LblDataHubStatus = 'فعال')
            : (this.LblDataHubStatus = 'غیر فعال');
        this.inputUpdate.status == 1
            ? (this.status = true)
            : (this.status = false);
        this.inputUpdate.status == 1
            ? (this.LblStatus = 'فعال')
            : (this.LblStatus = 'غیر فعال');
        this.inputUpdate.hasBody == 1
            ? (this.checkedBody = true)
            : (this.checkedBody = false);
        this.inputUpdate.type.toString() == '1'
            ? (this.disabledBody = false)
            : (this.disabledBody = true);
        this.inputUpdate.hasUrlParams == 1
            ? (this.hasUrlParams = true)
            : (this.hasUrlParams = false);

        this.inputUpdate.reverseCondition != null
            ? (this.reverseCondition =
                this.inputUpdate.reverseCondition.toString())
            : (this.reverseCondition = null);

        this.inputUpdate.callDuration != null
            ? (this.callDuration = this.inputUpdate.callDuration.toString())
            : (this.callDuration = null);

        this.inputUpdate.protocol != null
            ? (this.protocol = this.inputUpdate.protocol.toString())
            : (this.protocol = null);

        this.inputUpdate.type != null
            ? (this.type = this.inputUpdate.type.toString())
            : (this.type = null);

        this.inputUpdate.retryForHttpStatusCode != null
            ? (this.retryForHttpStatusCode =
                this.inputUpdate.retryForHttpStatusCode.toString())
            : (this.retryForHttpStatusCode = null);
        if (this.karmozd) {
            this.checkedKarmozd = true;
        }
        if (this.inputUpdate.hasEncodingUrl) {
            this.checkedEncodingUrl = true;
        } else {
            this.checkedEncodingUrl = false;
        }
    }

    onKeydown(event) {
        //console.log('event')
        //console.log(event)
        let self = this;
        if (event.key === 'Enter') {
            self.onUpdate();
        }
    }
    changeMoc_status(){
        if (this.moc_status == false) {
            this.mockJsonResponse = null
        }
    }
    onUpdate() {
        debugger;
        if (this.validation()) {
            debugger;
            this.objectUpdate.apiId = this.apiId;
            this.objectUpdate.moduleId = this.moduleId;
            // this.name != null ? this.name = this.name.toLowerCase() : null
            this.name != null
                ? (this.objectUpdate.name = this.name)
                : (this.objectUpdate.name = null);
            this.title != null
                ? (this.objectUpdate.title = this.title)
                : (this.objectUpdate.title = null);
            this.shenase = 'AG-' + this.shenase;
            this.shenase != null
                ? (this.objectUpdate.shenase = this.shenase)
                : (this.objectUpdate.shenase = null);
            this.url != null
                ? (this.objectUpdate.url = this.url)
                : (this.objectUpdate.url = null);
            this.feeFieldPath != null
                ? (this.objectUpdate.feeFieldPath = this.feeFieldPath)
                : (this.objectUpdate.feeFieldPath = null);
            this.cashing_expire != null
                ? (this.objectUpdate.cashing_expire = this.cashing_expire)
                : (this.objectUpdate.cashing_expire = null);
            this.description != null
                ? (this.objectUpdate.description = this.description)
                : (this.objectUpdate.description = null);
            this.timeout != null
                ? (this.objectUpdate.timeout = Number(this.timeout))
                : (this.objectUpdate.timeout = null);
            this.protocol != null
                ? (this.objectUpdate.protocol = Number(this.protocol))
                : (this.objectUpdate.protocol = null);
            this.type != null
                ? (this.objectUpdate.type = Number(this.type))
                : (this.objectUpdate.type = null);
            this.runningType != null
                ? (this.objectUpdate.runningType = Number(this.runningType))
                : (this.objectUpdate.runningType = null);
            this.maxCall != null
                ? (this.objectUpdate.maxCall = Number(this.maxCall))
                : (this.objectUpdate.maxCall = 0);
            this.retryCount != null
                ? (this.objectUpdate.retryCount = Number(this.retryCount))
                : (this.objectUpdate.retryCount = 0);
            this.delayRetryCount != null
                ? (this.objectUpdate.delayRetryCount = Number(
                    this.delayRetryCount,
                ))
                : (this.objectUpdate.delayRetryCount = null);
            this.limitForPeriod != null
                ? (this.objectUpdate.limitForPeriod = Number(
                    this.limitForPeriod,
                ))
                : (this.objectUpdate.limitForPeriod = null);
            this.limitRefreshPeriod != null
                ? (this.objectUpdate.limitRefreshPeriod = Number(
                    this.limitRefreshPeriod,
                ))
                : (this.objectUpdate.limitRefreshPeriod = null);
            this.reverseCondition != null
                ? (this.objectUpdate.reverseCondition = Number(
                    this.reverseCondition,
                ))
                : (this.objectUpdate.reverseCondition = null);
            this.dailyCount != null
                ? (this.objectUpdate.dailyCount = Number(this.dailyCount))
                : (this.objectUpdate.dailyCount = 0);
            this.weeklyCount != null
                ? (this.objectUpdate.weeklyCount = Number(this.weeklyCount))
                : (this.objectUpdate.weeklyCount = 0);
            this.retryForHttpStatusCode != null
                ? (this.objectUpdate.retryForHttpStatusCode = Number(
                    this.retryForHttpStatusCode,
                ))
                : (this.objectUpdate.retryForHttpStatusCode = null);
            this.monthlyCount != null
                ? (this.objectUpdate.monthlyCount = Number(this.monthlyCount))
                : (this.objectUpdate.monthlyCount = 0);
            this.logRequestStatus == true
                ? (this.objectUpdate.logRequestStatus = 1)
                : (this.objectUpdate.logRequestStatus = 0);
            this.cashing_status == true
                ? (this.objectUpdate.cashing_status = 1)
                : (this.objectUpdate.cashing_status = 0);
            this.logResponseStatus == true
                ? (this.objectUpdate.logResponseStatus = 1)
                : (this.objectUpdate.logResponseStatus = 0);
            this.reverseStatus == true
                ? (this.objectUpdate.reverseStatus = 1)
                : (this.objectUpdate.reverseStatus = 0);
            this.cookeSendStatus == true
                ? (this.objectUpdate.cookeSendStatus = 1)
                : (this.objectUpdate.cookeSendStatus = 0);
            this.status == true
                ? (this.objectUpdate.status = 1)
                : (this.objectUpdate.status = 0);
            this.checkedBody == true
                ? (this.objectUpdate.hasBody = 1)
                : (this.objectUpdate.hasBody = 0);
            this.dataHubStatus == true
                ? (this.objectUpdate.hasHub = 1)
                : (this.objectUpdate.hasHub = 0);
            this.hasUrlParams == true
                ? (this.objectUpdate.hasUrlParams = 1)
                : (this.objectUpdate.hasUrlParams = 0);
            this.checkedEncodingUrl == true
                ? (this.objectUpdate.hasEncodingUrl = 1)
                : (this.objectUpdate.hasEncodingUrl = 0);
            this.checkedStaticBody == true
                ? (this.objectUpdate.hasStaticBody = 1)
                : (this.objectUpdate.hasStaticBody = 0);
            this.objectUpdate.staticBody = this.staticBody;
            this.objectUpdate.callDuration = +0;
            this.hasSequence
                ? (this.objectUpdate.hasSequence = 1)
                : (this.objectUpdate.hasSequence = +0);
            debugger;
            this.moc_status == true ? this.objectUpdate.isMock = 1 : this.objectUpdate.isMock = 0
            this.moc_status==true?this.objectUpdate.mockJsonResponse=this.mockJsonResponse:this.objectUpdate.mockJsonResponse=null
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerApi(this.objectUpdate)
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
                                        },
                                    );
                                }
                            }
                            let objEncodingUrl = {
                                apiId: null,
                                name: null,
                                value: null,
                                detailId: null,
                            };
                            this.encodingUrlList.forEach(
                                (item) => {
                                    objEncodingUrl = {
                                        apiId: null,
                                        name: null,
                                        value: null,
                                        detailId: null,
                                    };
                                    objEncodingUrl.apiId = item.apiId;
                                    objEncodingUrl.name = item.name;
                                    objEncodingUrl.value = item.value;
                                    debugger;
                                    if (item.detailId != null) {
                                        debugger;
                                        objEncodingUrl.detailId = item.detailId;
                                        debugger;
                                    }
                                    this._primengProgressBarService.show();
                                    this.messagesApiFacadeService
                                        .encodedetailRegister(objEncodingUrl)
                                        .subscribe((s) => {
                                            this._primengProgressBarService.hide();
                                            this.close.emit('closeAndCreate');
                                            this.notifierService.showSuccess({
                                                detail: 'اطلاعات ثبت گردید!',
                                                life: 3000,
                                            });
                                        });
                                },
                                (error) => {
                                    this._primengProgressBarService.hide();
                                },
                            );
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
                    },
                );
        }
    }

    openHelpDialogTextarea() {
        this.helpTextareaFlag = true;
    }

    onCancel() {
        this.close.emit('close');
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
        this.cookeSendStatus
            ? (this.LblCookeSendStatus = 'فعال')
            : (this.LblCookeSendStatus = 'غیر فعال');
        this.dataHubStatus
            ? (this.LblDataHubStatus = 'فعال')
            : (this.LblDataHubStatus = 'غیر فعال');
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

    hasRepeats(str) {
        return /(.).*\1/.test(str);
    }

    validation(): boolean {
        debugger;
        let tempName;
        let alarmFlagSlash = false;
        tempName = this.name ? this.name.split('/').filter((word) => {
            if (word !== '') return word;
        }) : this.name;
        const set = new Set(tempName);

        const duplicateList = tempName ? tempName.filter((item) => {
            if (set.has(item)) {
                set.delete(item);
            } else {
                return item;
            }
        }) : tempName;
        for (let i = 0; i < duplicateList.length; i++) {
            if (duplicateList[i].includes('segment')) {
                debugger;
                alarmFlagSlash = true;
            }
        }
        console.log(duplicateList, 'dv');
        if (this.name) {
            for (let i = 0; i < this.name.length; i++) {
                console.log(this.name.charAt(i));
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
                        console.log(this.name.charAt(i + 1), 'dv');
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
        }else {
            return true;
        }
    }
}
