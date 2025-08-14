import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AccessDto } from '../../models/accessDto';

import { NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import {
    TranslocoDirective,
    TranslocoPipe,
    TranslocoService,
} from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { Menu } from 'primeng/menu';
import { Panel } from 'primeng/panel';
import { Ripple } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { FuseLoadingService } from '../../../../../@fuse/services/loading';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { FormatRulePipe } from '../../../shared/pipes/FormatRule.pipe';
import { MessagesCategoryPipe } from '../../../shared/pipes/messagesCategory.pipe';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { ThreeDotDetailsPipe } from '../../../shared/pipes/threeDotDetails.pipe';
import { AccessDataSaveService } from '../../../shared/services/access-data-save.service';
import { ToastService } from '../../../shared/services/ToastService';
import { ApiGatewayConstants } from '../../constants/ApiGatewayConstants';
import { ApiGatewayService } from '../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';
import { BasemoduleApiModuleComponent } from '../module-api/basemodule-api-management/basemodule-api-module/basemodule-api-module.component';
import { ClientApiManagementComponent } from '../services-api/endpoint-management/client-api-management/client-api-management.component';
import { EndpointManagementComponent } from '../services-api/endpoint-management/endpoint-management.component';
import { Fieldset } from 'primeng/fieldset';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-access-list',
    templateUrl: './access-list.component.html',
    standalone: true,
    imports: [
        BreadcrumbsComponent,
        Panel,
        NgIf,
        TranslocoPipe,
        TranslocoDirective,
        DropdownModule,
        FormsModule,
        ButtonDirective,
        TableModule,
        Tooltip,
        MoreChar19Pipe,
        NgStyle,
        Ripple,
        Menu,
        MatTooltip,
        EndpointManagementComponent,
        BasemoduleApiModuleComponent,
        ClientApiManagementComponent,
        Dialog,
        ThreeDotDetailsPipe,
        FormatRulePipe,
        MessagesCategoryPipe,
        StatusPipe,
        KeyFilter,
        InputText,
        Fieldset,
        Toast,
    ],
    styleUrls: ['./access-list.component.scss'],
})
export class AccessListComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() InputClient;
    dialogApiFlag;
    partyListOptions = [{ title: '-', partyId: null }];
    clientListOptions = [
        {
            name: '-',
            partyId: null,
            allowedAccountno: null,
            apikey: null,
            clientId: null,
            digitalPublickey: null,
            mobileNo: null,
            organizationCode: null,
            publicKey: null,
            status: null,
        },
    ];
    moduleListOptions = [{ moduleTitle: '-', partyId: null }];
    partyId = null;
    clientId: number = null;
    moduleId = null;
    clientNameFlag = false;
    apiModuleFlag = false;
    endpointFlag = false;
    clientFlag = false;
    accessList = [];
    items;
    itemsApi;
    tempAccess;
    tempApi;
    accessDto: AccessDto;
    DirectBaseAccess = true;
    detailsBreadObject;
    accessBase = null;
    clientBase = null;
    first: number = 0;
    rows: number = 10;
    first2: number = 0;
    rows2: number = 10;
    apiAttachList = [];
    dailyCount: number = 0;
    weeklyCount: number = 0;
    monthlyCount: number = 0;
    tempAttach: any;
    tempAttachRoule: any;
    limitApi = false;
    index1 = true;
    index2 = false;
    index3 = false;
    index4 = false;
    index5 = false;
    showListFlag = false;
    registerFlag = false;
    nextDisableFlag = true;
    nextFlag = true;
    beforeFlag = true;
    beforeDisableFlag = true;
    clientName;

    widthTitleApi;
    widthNameApi;
    widthRetryCountApi;
    widthMaxCallApi;
    widthDailyCountApi;
    widthWeeklyCountApi;
    widthMonthlyCountApi;
    ruleName;
    apiTitle;
    apiName;
    ruleList;
    codeMessage;
    titleMessage;
    textMessage;
    textENMessage;
    tableIdMessage;
    typeMessage;
    messagesList = [];
    statusCodeOptions = ApiGatewayConstants.statusCode;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;

    widthTitleMessage;
    widthMessageId;
    widthCodeMessage;
    widthMessageTitle;
    widthHttpsstatus;
    widthRuleTemplate;
    widthruleName;
    tableIdDe;
    messageTitleDe;
    httpsstatusDe;
    ruleTemplateDe;
    ruleNameDe;
    codeMessageDe;
    messageIdDe;
    titleMessageDe;
    titleApiDe;
    nameApiDe;
    retryCountApiDe;
    maxCallApiDe;
    apiId: number = null;
    dailyCountApiDe: number = 0;
    weeklyCountApiDe: number = 0;
    monthlyCountApiDe: number = 0;

    ruleId: number = null;
    messageId: number = null;
    updateClientId: number = null;
    updateModuleId: number = null;
    selectApiFlag: boolean = false;
    headerDialog = '';
    registerTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private primeng: PrimeNG,
        private apiGatewayService: ApiGatewayService,
        private router: Router,
        private notifierService: ToastService,
         private transloco :TranslocoService,
        private accessDataSaveService: AccessDataSaveService
    ) {}

    chooseBread(caseBase: string) {
        switch (caseBase) {
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
                        rout_index1: '',
                        isActive1: true,
                        img_index1: 'assets/icons/access.png',
                        label_Detail_index1: null,
                    },
                    { label_index2: null, label_Detail_index2: null },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
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
                        rout_index1: '',
                        isActive1: false,
                        img_index1: 'assets/icons/client.png',
                    },
                    {
                        index: 2,
                        label_index2: 'لیست دسترسی',
                        rout_index2: '',
                        isActive2: true,
                        img_index2: 'assets/icons/access.png',
                        label_Detail_index2: '(' + this.clientName + ')',
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

    clearRules() {
        this.ruleName = '';
        this.ruleNameDe = '';
        this.ruleTemplateDe = '';
        this.httpsstatusDe = '';
        this.ruleId = null;
        this.searchRules();
    }

    onKeydownSearch(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.messageSearch();
        }
    }

    messageClear() {
        this.codeMessage = '';
        this.titleMessage = '';
        this.textMessage = '';
        this.textENMessage = '';
        this.tableIdMessage = '';
        this.typeMessage = '';
        this.messageId = null;
        this.messageIdDe = null;
        this.messageIdDe = '';
        this.codeMessageDe = '';
        this.titleMessageDe = '';
        this.tableIdDe = '';
        this.messageSearch();
    }

    messageSearch() {
        this.messagesApiFacadeService
            .messagesearch(
                this.codeMessage,
                this.titleMessage,
                this.tableIdMessage,
                this.typeMessage
            )
            .subscribe((response) => {
                if (Array.isArray(response)) {
                    this.messagesList = response;
                } else {
                    this.messagesList.push(response);
                }
            });
    }

    searchRules() {
        this.messagesApiFacadeService
            .rulesearch(this.ruleName)
            .subscribe((a) => {
                if (Array.isArray(a)) {
                    this.ruleList = a;
                } else {
                    this.ruleList.push(a);
                }
                this.ruleList.map((x) =>
                    x.status === 1 ? (x.status = true) : (x.status = false)
                );
                for (let k = 0; k < this.ruleList.length; k++) {
                    this.ruleList[k] = Object.assign(this.ruleList[k], {
                        row: k + 1,
                    });
                    /*(this.partyList[k].row = (k+1))*/
                }
            });
    }

    OnchangeParty(event) {
        this.moduleListOptions = [{ moduleTitle: '-', partyId: null }];
        if (event.value != null) {
            this.messagesApiFacadeService
                .moduleSearchByPartyId(event.value)
                .subscribe((m) => {
                    this.moduleListOptions.push(...m);
                    this.moduleListOptions = this.moduleListOptions.sort();
                    this.search();
                });
        } else {
            this.moduleId = null;
            this.search();
        }
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();
        this.messagesApiFacadeService.fetchallparty().subscribe((a) => {
            this.partyListOptions.push(...a);
            this.partyListOptions = this.partyListOptions.sort();
        });

        /*this.messagesApiFacadeService.fetchallmodule().subscribe(c => {
            this.moduleListOptions.push(...c)
            this.moduleListOptions = this.moduleListOptions.sort()
        })*/

        this.primeng.ripple.set(true);

        this.items = [
            {
                items: [
                    {
                        label: 'سرویس های ماژول ',
                        icon: '',
                        command: () => {
                            this.showApiOrEndpoint(this.tempAccess, 1);
                        },
                    },
                    {
                        label: 'اندپوینت های ماژول',
                        icon: '',
                        command: () => {
                            this.showApiOrEndpoint(this.tempAccess, 2);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
                        icon: '',
                        command: () => {
                            this.updateAccess(this.tempAccess);
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

        if (this.InputClient != undefined) {
            this.clientName = this.InputClient.name;
            this.clientBase = this.InputClient.clientBase;
            this.showListFlag = true;
            this.messagesApiFacadeService.fetchallclient().subscribe((b) => {
                this.clientListOptions.push(...b);
                this.clientListOptions = this.clientListOptions.sort();
                if (this.InputClient.clientFlag) {
                    for (let i = 0; i < this.clientListOptions.length; i++) {
                        if (
                            this.InputClient.clientId ==
                            this.clientListOptions[i].clientId
                        ) {
                            this.clientId = this.clientListOptions[i].clientId;
                            this.clientNameFlag = true;
                            this.search();

                            // this.router.navigate(['api-gateway/access-list']);
                        }
                    }
                }
            });
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else {
            this.showListFlag = false;
            this.clientNameFlag = false;
            this.accessBase = true;

            this.messagesApiFacadeService.fetchallclient().subscribe((b) => {
                this.clientListOptions.push(...b);
                console.log('clientListOptions', this.clientListOptions);
            });
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
            this.search();
        }
    }

    validationMessage(): boolean {
        if (!this.codeMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate(
                    'accessList.message.enterMessageCode'
                ),
                life: 3000,
            });
            return false;
        } else if (!this.titleMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate(
                    'accessList.message.enterMessageTitle'
                ),
                life: 3000,
            });
            return false;
        } else if (!this.textMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate(
                    'accessList.message.enterFaMessage'
                ),
                life: 3000,
            });
            return false;
        } else if (!this.tableIdMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate(
                    'accessList.message.enterTableId'
                ),
                life: 3000,
            });
            return false;
        } else if (!this.typeMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate(
                    'accessList.message.enterMessageType'
                ),
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    onRegisterMessage() {
        if (this.validationMessage()) {
            this.messagesList = [];
            this.messageId = null;
            this.registerTemp.code = this.codeMessage;
            this.registerTemp.title = this.titleMessage;
            this.registerTemp.type = this.typeMessage;
            this.registerTemp.text = this.textMessage;
            this.registerTemp.textEN = this.textENMessage;
            this.registerTemp.tableId = this.tableIdMessage;
            this.messagesApiFacadeService
                .registerMessage(this.registerTemp)
                .subscribe(
                    (a) => {
                        this.nextDisableFlag = false;
                        this.notifierService.showSuccess({
                            detail: this.transloco.translate(
                                'accessList.message.registerNewMessage'
                            ),
                            life: 3000,
                        });
                        this.codeMessageDe = a.code;
                        this.messageIdDe = a.messageId;
                        this.titleMessageDe = a.title;
                        this.tableIdDe = a.tableId;
                        this.messageId = a.messageId;
                        this.messageSearch();
                    },
                    (error) => {}
                );
        }
    }

    onClose(event: any) {
        this.scrollTop();
        this.apiModuleFlag = false;
        this.endpointFlag = false;
        this.clientFlag = false;
        if (
            event == 'closeAndCreate' ||
            event == 'doubleClose' ||
            event == 'close'
        ) {
            this.search();
        }
        if (this.InputClient != undefined) {
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else {
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
    }

    updateAccess(access) {
        this.headerDialog = 'ویرایش دسترسی';
        this.apiAttachList = [];
        this.selectApiFlag = true;
        this.nextDisableFlag = false;
        this.apiId = access.apiId;
        this.messagesApiFacadeService.apibyid(access.apiId).subscribe((k) => {
            if (Array.isArray(k)) {
                this.apiAttachList[0] = k;
            } else {
                this.apiAttachList.push(k);
            }
            this.titleApiDe = this.apiAttachList[0].title;
            this.nameApiDe = this.apiAttachList[0].name;
            this.retryCountApiDe = this.apiAttachList[0].retryCount;
            this.maxCallApiDe = this.apiAttachList[0].maxCall;
            this.apiId = this.apiAttachList[0].apiId;
            this.updateClientId = access.clientId;
            this.updateModuleId = access.moduleId;
            this.dailyCount = access.dailyCount;
            this.weeklyCount = access.weeklyCount;
            this.monthlyCount = access.monthlyCount;
            this.beforeFlag = false;
            this.nextFlag = true;
            this.index1 = true;
            this.index2 = false;
            this.index3 = false;
            this.index4 = false;
            this.messagesApiFacadeService
                .getclientapibyclientidandapiid(access.clientId, access.apiId)
                .subscribe((r) => {
                    this.ruleList = [];
                    if (r.ruleId != null) {
                        this.messagesApiFacadeService
                            .getByRuleId(r.ruleId)
                            .subscribe((a) => {
                                if (Array.isArray(a)) {
                                    this.ruleList = a;
                                } else {
                                    this.ruleList.push(a);
                                }
                                this.ruleList.map((x) =>
                                    x.status === 1
                                        ? (x.status = true)
                                        : (x.status = false)
                                );
                                for (let k = 0; k < this.ruleList.length; k++) {
                                    this.ruleList[k] = Object.assign(
                                        this.ruleList[k],
                                        { row: k + 1 }
                                    );
                                    /*(this.partyList[k].row = (k+1))*/
                                }
                                this.ruleNameDe = this.ruleList[0].name;
                                this.ruleId = this.ruleList[0].ruleId;
                                this.ruleTemplateDe =
                                    this.ruleList[0].ruleTemplate;
                                this.messageId = this.ruleList[0].messageId;
                                this.httpsstatusDe =
                                    this.ruleList[0].httpsstatus;

                                if (r.messageId != null) {
                                    this.messagesApiFacadeService
                                        .getbymessageId(r.messageId)
                                        .subscribe((l) => {
                                            this.dialogApiFlag = true;
                                            this.messagesList = [];
                                            if (Array.isArray(l)) {
                                                this.messagesList = l;
                                            } else {
                                                this.messagesList.push(l);
                                            }
                                            this.messageIdDe =
                                                this.messagesList[0].messageId;
                                            this.codeMessageDe =
                                                this.messagesList[0].code;
                                            this.titleMessageDe =
                                                this.messagesList[0].title;
                                            this.tableIdDe =
                                                this.messagesList[0].tableId;
                                        });
                                } else {
                                    this.dialogApiFlag = true;
                                }
                            });
                    } else if (r.messageId != null) {
                        this.messagesApiFacadeService
                            .getbymessageId(r.messageId)
                            .subscribe((l) => {
                                this.dialogApiFlag = true;
                                this.messagesList = [];
                                if (Array.isArray(l)) {
                                    this.messagesList = l;
                                } else {
                                    this.messagesList.push(l);
                                }
                                this.messageIdDe =
                                    this.messagesList[0].messageId;
                                this.codeMessageDe = this.messagesList[0].code;
                                this.titleMessageDe =
                                    this.messagesList[0].title;
                                this.tableIdDe = this.messagesList[0].tableId;
                            });
                    } else {
                        this.dialogApiFlag = true;
                    }
                });

            //  this.messageSearch()
        });

        /* this.messagesApiFacadeService.apibymoduleidhasntclient(this.updateModuleId, this.updateClientId).subscribe(c => {
             if (Array.isArray(c)) {
                 this.apiAttachList = c
             } else {
                 this.apiAttachList.push(c)
             }
             for (let k = 0; k < this.apiAttachList.length; k++) {
                 this.apiAttachList[k] = Object.assign(this.apiAttachList[k], {row: (k + 1)})
             }
             console.log(this.apiAttachList, 'apiAttachList')

             if (c.length == 0) {
                 this.notifierService.showError({detail: "هیچ سرویسی برای ماژول منتخب وجود ندارد!", life: 3000});
             } else {

                 this.dialogApiFlag = true
             }

         }, error => {

         })*/
    }

    onKeydown(event) {
        let mySelf = this;
        if (event.key === 'Enter') {
            mySelf.search();
        }
    }

    setRecord(access) {
        this.tempAccess = access;
    }

    showApiOrEndpoint(access, flag) {
        this.accessDto = {
            partyId: null,
            endpointId: null,
            moduleId: null,
            partyName: '',
            moduleTitle: '',
            clientName: '',
            accessBase: null,
            clientBase: null,
        };
        this.accessDto = access;
        this.accessDto.moduleId = access.moduleId;
        this.accessDto.accessBase = this.accessBase;
        this.accessDto.clientBase = this.clientBase;
        this.accessDataSaveService.shareData = this.accessDto;
        if (flag == 1) {
            this.accessDto.apiBase = true;
            this.apiModuleFlag = true;
        } else if (flag == 2) {
            this.endpointFlag = true;
            this.accessDto.endpointBase = true;
        }
    }

    search() {
        this.messagesApiFacadeService
            .quickaccess(this.partyId, this.moduleId, this.clientId)
            .subscribe((a) => {
                this.accessList = a;
                if (Array.isArray(a)) {
                    this.accessList = a;
                } else {
                    this.accessList.push(a);
                }
                for (let k = 0; k < this.accessList.length; k++) {
                    this.accessList[k] = Object.assign(this.accessList[k], {
                        row: k + 1,
                    });
                }
            });
    }

    clear() {
        this.partyId = null;
        this.moduleListOptions = [{ moduleTitle: '-', partyId: null }];
        this.clientId = null;
        this.moduleId = null;
        this.accessList = [];
        this.clientNameFlag = false;
        this.search();
    }

    addApiSelect() {
        this.headerDialog = 'ایجاد دسترسی';
        this.beforeFlag = false;
        this.nextFlag = true;
        this.index1 = true;
        this.index2 = false;
        this.index3 = false;
        this.index4 = false;
        this.selectApiFlag = false;
        this.codeMessage = null;
        this.tableIdMessage = null;
        this.typeMessage = null;
        this.titleMessage = '';
        this.textMessage = '';
        this.textENMessage = '';
        this.searchRules();
        this.messageSearch();
        if (this.validation()) {
            this.messagesApiFacadeService
                .apibymoduleidhasntclient(this.moduleId, this.clientId)
                .subscribe(
                    (c) => {
                        if (Array.isArray(c)) {
                            this.apiAttachList = c;
                        } else {
                            this.apiAttachList.push(c);
                        }
                        for (let k = 0; k < this.apiAttachList.length; k++) {
                            this.apiAttachList[k] = Object.assign(
                                this.apiAttachList[k],
                                { row: k + 1 }
                            );
                        }
                        if (c.length == 0) {
                            this.notifierService.showError({
                                detail: this.transloco.translate(
                                    'accessList.message.notFoundApi'
                                ),
                                life: 3000,
                            });
                        } else {
                            this.dialogApiFlag = true;
                        }
                    },
                    (error) => {}
                );
        }
    }

    onCancel() {
        this.dialogApiFlag = false;
        this.beforeFlag = false;
        this.registerFlag = false;
        this.nextFlag = true;
        this.index1 = true;
        this.index2 = false;
        this.index3 = false;
        this.index4 = false;
        this.index5 = false;
        this.clearRules();
        this.messageClear();
        this.clearFinalVar();
    }

    clearFinalVar() {
        this.dailyCount = 0;
        this.weeklyCount = 0;
        this.monthlyCount = 0;
        this.tableIdDe = '';
        this.messageTitleDe = '';
        this.httpsstatusDe = '';
        this.ruleTemplateDe = '';
        this.ruleNameDe = '';
        this.codeMessageDe = '';
        this.messageIdDe = '';
        this.titleMessageDe = '';
        this.titleApiDe = '';
        this.nameApiDe = '';
        this.retryCountApiDe = '';
        this.maxCallApiDe = '';
        this.dailyCountApiDe = 0;
        this.weeklyCountApiDe = 0;
        this.monthlyCountApiDe = 0;
        this.messageId = null;
        this.apiId = null;
        this.ruleId = null;
        this.updateClientId = null;
        this.typeMessage = null;
        this.tableIdMessage = null;
        this.codeMessage = null;
        this.titleMessage = '';
        this.textMessage = '';
        this.textENMessage = '';
    }

    flagChange() {
        this.beforeFlag = false;
        this.registerFlag = false;
        this.nextFlag = true;
        this.index1 = true;
        this.index2 = false;
        this.index3 = false;
        this.index4 = false;
        this.index5 = false;
        this.clearRules();
        this.clearFinalVar();
    }

    selectApi(api) {
        this.tempAttach = api;
        // this.apiListFlag = false
        this.titleApiDe = this.tempAttach.title;
        this.nameApiDe = this.tempAttach.name;
        this.retryCountApiDe = this.tempAttach.retryCount;
        this.maxCallApiDe = this.tempAttach.maxCall;
        this.apiId = this.tempAttach.apiId;
        this.apiAttachList = this.apiAttachList.filter(function (x) {
            return x.apiId === api.apiId;
        });

        this.notifierService.showSuccess({
            detail: this.transloco.translate('accessList.message.selectedApi'),
            life: 3000,
        });
        this.nextDisableFlag = false;
    }

    selectedRule(roule) {
        this.ruleId = roule.ruleId;
        this.ruleNameDe = roule.name;
        this.ruleTemplateDe = roule.ruleTemplate;
        this.httpsstatusDe = roule.httpsstatus;
        this.httpsstatusDe = roule.httpsstatus;
        this.messageTitleDe = roule.messageTitle;
        this.nextDisableFlag = false;
        this.ruleList = this.ruleList.filter(function (x) {
            return x.ruleId === roule.ruleId;
        });
        /* for (let i = 0; this.ruleList.length > i; i++) {

             if (this.ruleList[i].ruleId != roule.ruleId) {

                 if (i > -1) {
                     this.ruleList = this.ruleList.splice(i, 1);
                 }
             }
         }*/
        this.notifierService.showSuccess({
            detail: this.transloco.translate('accessList.message.selectedRule'),
            life: 3000,
        });
    }

    fakeRegister() {
        this.nextDisableFlag = false;
        this.dailyCountApiDe = this.dailyCount;
        this.weeklyCountApiDe = this.weeklyCount;
        this.monthlyCountApiDe = this.monthlyCount;
        this.notifierService.showSuccess({
            detail: this.transloco.translate('accessList.message.limited'),
            life: 3000,
        });
        // if (this.title.length > 22) {
        //     this.widthTitle = 100
        // }
    }

    nextPageApi() {
        /* this.index1 = false
         this.index2 = false
         this.index3 = false*/
        if (this.index1 == true) {
            this.beforeFlag = true;
            this.nextFlag = true;
            this.index1 = false;
            this.index2 = true;
            this.registerFlag = false;
            this.nextDisableFlag = true;
        } else if (this.index2 == true) {
            this.beforeFlag = true;
            this.index2 = false;
            this.index1 = false;
            this.nextFlag = true;
            this.index3 = true;
            this.registerFlag = false;
        } else if (this.index3 == true) {
            this.beforeFlag = true;
            this.index3 = false;
            this.index2 = false;
            this.index1 = false;
            this.nextFlag = true;
            this.index4 = true;
            this.registerFlag = false;
        } else if (this.index4 == true) {
            this.beforeFlag = true;
            this.index4 = false;
            this.index3 = false;
            this.index2 = false;
            this.index1 = false;
            this.nextFlag = false;
            this.index5 = true;
            this.registerFlag = true;
        }
    }

    onRegisterAttachment() {
        this.dialogApiFlag = false;
        this.index4 = false;
        this.index5 = false;
        this.index3 = false;
        this.index2 = false;
        this.index1 = true;
        this.registerFlag = false;
        this.nextFlag = true;
        this.nextDisableFlag = true;
        let tempObj = {
            clientId: null,
            apiId: null,
            dailyCount: null,
            weeklyCount: null,
            monthlyCount: null,
            ruleId: null,
            messageId: null,
        };
        if (this.updateClientId == null || this.updateClientId == undefined) {
            tempObj.clientId = this.clientId;
            tempObj.apiId = this.apiId;
            tempObj.dailyCount = this.dailyCountApiDe;
            tempObj.weeklyCount = this.weeklyCountApiDe;
            tempObj.monthlyCount = this.monthlyCountApiDe;
            tempObj.ruleId = this.ruleId;
            tempObj.messageId = this.messageId;
        } else {
            tempObj.clientId = this.updateClientId;
            tempObj.apiId = this.apiId;
            tempObj.dailyCount = this.dailyCountApiDe;
            tempObj.weeklyCount = this.weeklyCountApiDe;
            tempObj.monthlyCount = this.monthlyCountApiDe;
            tempObj.ruleId = this.ruleId;
            tempObj.messageId = this.messageIdDe;
        }
        this.messagesApiFacadeService
            .clientAttachApi(tempObj)
            .subscribe((d) => {
                this.search();
                this.clearFinalVar();
            });
    }

    beforePageApi() {
        /* this.index1 = false
         this.index2 = false
         this.index3 = false*/
        if (this.index5 == true) {
            this.beforeFlag = true;
            this.nextFlag = true;
            this.index4 = true;
            this.index5 = false;
            this.registerFlag = false;
        } else if (this.index4 == true) {
            this.beforeFlag = true;
            this.nextFlag = true;
            this.index3 = true;
            this.index4 = false;
            this.registerFlag = false;
        } else if (this.index3 == true) {
            this.beforeFlag = true;
            this.nextFlag = true;
            this.index2 = true;
            this.index3 = false;
            this.registerFlag = false;
            this.nextDisableFlag = true;
        } else if (this.index2 == true) {
            this.beforeFlag = false;
            this.index2 = false;
            this.nextFlag = true;
            this.index1 = true;
            this.registerFlag = false;
            this.selectApiFlag == true
                ? (this.nextDisableFlag = false)
                : (this.nextDisableFlag = true);
        }
    }

    selectedMessage(message) {
        this.codeMessageDe = message.code;
        this.messageIdDe = message.messageId;
        this.titleMessageDe = message.title;
        this.tableIdDe = message.tableId;
        this.messageId = message.messageId;
        this.messagesList = this.messagesList.filter(function (x) {
            return x.messageId === message.messageId;
        });
        this.notifierService.showSuccess({
            detail: this.transloco.translate(
                'accessList.message.selectMessage'
            ),
            life: 3000,
        });
        this.nextDisableFlag = false;
    }

    validation(): boolean {
        if (!this.clientId) {
            this.notifierService.showError({
                detail: this.transloco.translate(
                    'accessList.message.enterClientName'
                ),
                life: 3000,
            });
            return false;
        } else if (!this.partyId) {
            this.notifierService.showError({
                detail: this.transloco.translate(
                    'accessList.message.enterPartyName'
                ),
                life: 3000,
            });
            return false;
        } else if (!this.moduleId) {
            this.notifierService.showError({
                detail: this.transloco.translate(
                    'accessList.message.enterModuleTitle'
                ),
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    BeforeButtonDialog() {
        this.limitApi = false;
    }

    BeforeButton() {
        this.close.emit('close');
    }

    protected readonly String = String;
    widthTableId: any;
}
