import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ApiGatewayConstants } from '../../constants/ApiGatewayConstants';
import { AccessDto } from '../../models/accessDto';

import { NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import {
    TranslocoDirective,
    TranslocoPipe,
    TranslocoService,
} from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { PrimeNG } from 'primeng/config';
import { Menu } from 'primeng/menu';
import { FuseLoadingService } from '../../../../../@fuse/services/loading';
import { ToastService } from '../../../shared/services/ToastService';
import { ApiGatewayService } from '../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';

import { FormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { Fieldset } from 'primeng/fieldset';
import { InputText } from 'primeng/inputtext';
import { KeyFilter } from 'primeng/keyfilter';
import { Panel } from 'primeng/panel';
import { Ripple } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { FormatRulePipe } from '../../../shared/pipes/FormatRule.pipe';
import { MessagesCategoryPipe } from '../../../shared/pipes/messagesCategory.pipe';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { ThreeDotDetailsPipe } from '../../../shared/pipes/threeDotDetails.pipe';
import { AccessDataSaveService } from '../../../shared/services/access-data-save.service';
import { BasemoduleApiModuleComponent } from '../module-api/basemodule-api-management/basemodule-api-module/basemodule-api-module.component';
import { ClientApiManagementComponent } from '../services-api/endpoint-management/client-api-management/client-api-management.component';
import { EndpointManagementComponent } from '../services-api/endpoint-management/endpoint-management.component';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-access-list',
    templateUrl: './access-list.component.html',
    styleUrls: ['./access-list.component.scss'],
    imports: [
        MatTabGroup,
        MatTab,
        NgForOf,
        MatTabLabel,
        MatIcon,
        ButtonDirective,
        NgClass,
        Menu,
        RouterOutlet,
        BreadcrumbsComponent,
        Panel,
        NgIf,
        TranslocoDirective,
        DropdownModule,
        FormsModule,
        TranslocoPipe,
        TableModule,
        Tooltip,
        MoreChar19Pipe,
        NgStyle,
        Ripple,
        MatTooltip,
        Dialog,
        Fieldset,
        ThreeDotDetailsPipe,
        FormatRulePipe,
        MessagesCategoryPipe,
        Checkbox,
        StatusPipe,
        KeyFilter,
        InputText,
        EndpointManagementComponent,
        BasemoduleApiModuleComponent,
        ClientApiManagementComponent,
        Toast,
    ],
    standalone: true,
})
export class AccessListComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() InputClient
    dialogApiFlag
    //  selectedProduct3: apiAtt;
    partyListOptions = [{title: '-', partyId: null}]
    clientListOptions = [
        {
            name: '-', partyId: null, allowedAccountno: null, apikey: null, clientId: null,
            digitalPublickey: null, mobileNo: null, organizationCode: null, publicKey: null,
            status: null
        }
    ]
    moduleListOptions = [{moduleTitle: '-', moduleId: null}]
    partyId = null
    clientId: number = null
    moduleId = null
    clientNameFlag = false
    apiModuleFlag = false
    endpointFlag = false
    clientFlag = false
    loading = false
    accessList = [];
    items
    itemsApi
    tempAccess
    tempApi
    accessDto: AccessDto;
    DirectBaseAccess = true
    detailsBreadObject
    accessBase = null
    clientBase = null
    first: number = 0;
    rows: number = 10;
    first2: number = 0;
    rows2: number = 10;
    apiAttachList = []
    dailyCount: number = 0;
    weeklyCount: number = 0;
    monthlyCount: number = 0;
    tempAttach: any
    tempAttachRoule: any
    limitApi = false
    index1 = true
    index2 = false
    index3 = false
    index4 = false
    index5 = false
    index6 = false
    showListFlag = false
    checkedAllApi: boolean = false
    checkedMultiApi: boolean = false
    registerFlag = false
    nextDisableFlag = true
    nextFlag = true
    beforeFlag = true
    beforeDisableFlag = true
    clientName
    apiAttachLimitList = []
    widthTitleApi
    widthNameApi
    widthRetryCountApi
    widthMaxCallApi
    widthDailyCountApi
    widthWeeklyCountApi
    widthMonthlyCountApi
    ruleName
    apiTitle
    apiName
    ruleList
    codeMessage
    titleMessage
    textMessage
    textENMessage
    tableIdMessage
    typeMessage
    messagesList = []
    selectedMessageList: any[]
    statusCodeOptions = ApiGatewayConstants.statusCode
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    paginationLabel=this.translate.translate('label.pagination.table');
    widthTitleMessage
    widthMessageId
    widthCodeMessage
    widthMessageTitle
    widthHttpsstatus
    widthRuleTemplate
    widthruleName
    tableIdDe
    messageTitleDe
    httpsstatusDe
    ruleTemplateDe
    ruleNameDe
    codeMessageDe
    messageIdDe
    titleMessageDe
    titleApiDe
    nameApiDe
    retryCountApiDe
    maxCallApiDe
    apiId: number = null
    dailyCountApiDe: number = 0
    weeklyCountApiDe: number = 0
    monthlyCountApiDe: number = 0
    selectedApi: any[]
    selectedRuleList: any
    ruleId: number = null
    messageId: number = null
    updateClientId: number = null
    updateModuleId: number = null
    selectApiFlag: boolean = false
    headerDialog = ''
    registerTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    flagSelectAll = false
    headerIndex5 = 'گام آخر - بررسی اطلاعات ثبتی و ثبت نهایی'

    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private primeng: PrimeNG,
        private apiGatewayService: ApiGatewayService,
        private router: Router,
        private notifierService: ToastService,
        private translate: TranslocoService,
        private accessDataSaveService: AccessDataSaveService
    ) {
    }

    onRowSelect(event) {
        if (this.apiAttachList.length == this.selectedApi.length) {
            this.checkedAllApi = true
        }
        if (this.selectedApi.indexOf(event.data) === -1) this.selectedApi.push(event.data);
        this.nextDisableFlag = !(this.selectedApi.length >= 1);
        this.checkedMultiApi = this.selectedApi.length > 1
    }

    onRowUnselect(event) {
        this.selectedApi = this.selectedApi.filter(x => {
            return x.apiId != event.data.apiId;
        })
        if (this.apiAttachList.length != this.selectedApi.length) {
            this.checkedAllApi = false
        }
        this.nextDisableFlag = !(this.selectedApi.length >= 1);
        this.checkedMultiApi = this.selectedApi.length > 1
    }


    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'accessBase':
                return [
                    {
                        index: 0, label_index0: "لیست دسترسی",
                        rout_index0: "", isActive0: true,
                        img_index0: "assets/icons/access.png",
                        label_Detail_index0: null
                    },
                    {label_index1: null, label_Detail_index1: null},
                    {label_index2: null, label_Detail_index2: null}, {label_index3: null, label_Detail_index3: null},
                    {label_index4: null, label_Detail_index4: null}, {label_index5: null, label_Detail_index5: null},
                    {label_index6: null, label_Detail_index6: null}
                ]
            case 'clientBase':
                return [

                    {
                        index: 0, label_index0: "کلاینت", rout_index0: "", isActive0: false,
                        img_index0: "assets/icons/client.png"
                    },
                    {
                        index: 1, label_index1: "لیست دسترسی", rout_index1: "", isActive1: true,
                        img_index1: "assets/icons/access.png", label_Detail_index1: '(' + this.clientName + ')'
                    },
                    {label_index2: null, label_Detail_index2: null},
                    {label_index3: null, label_Detail_index3: null},
                    {label_index4: null, label_Detail_index4: null},
                    {label_index5: null, label_Detail_index5: null},
                    {label_index6: null, label_Detail_index6: null}
                ]
            default:
                return null
        }
    }

    clearRules() {
        this.ruleName = ""
        this.ruleNameDe = ""
        this.ruleTemplateDe = ""
        this.httpsstatusDe = ""
        this.ruleId = null
        this.searchRules()
    }

    onKeydownSearch(event) {
        let self = this
        if (event.key === "Enter") {
            self.messageSearch();
        }
    }

    messageClear() {
        this.codeMessage = ""
        this.titleMessage = ""
        this.textMessage = ""
        this.textENMessage = ""
        this.tableIdMessage = ""
        this.typeMessage = ""
        this.messageId = null
        this.messageIdDe = null
        this.messageIdDe = ""
        this.codeMessageDe = ""
        this.titleMessageDe = ""
        this.tableIdDe = ""
        this.messageSearch()
    }

    messageSearch() {
        this.messagesApiFacadeService.messagesearch(
            this.codeMessage, this.titleMessage, this.tableIdMessage, this.typeMessage
        ).subscribe(response => {
            if (Array.isArray(response)) {
                this.messagesList = response
            } else {
                this.messagesList.push(response)
            }
        },error =>{
            this._primengProgressBarService.hide()
        })
    }

    searchRules() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.rulesearch(this.ruleName).subscribe(a => {
            this._primengProgressBarService.hide();
            if (Array.isArray(a)) {
                this.ruleList = a
            } else {
                this.ruleList.push(a)

            }
            this.ruleList.map(x => (x.status === 1 ? x.status = true : x.status = false))
            for (let k = 0; k < this.ruleList.length; k++) {
                this.ruleList[k] = Object.assign(this.ruleList[k], {row: (k + 1)})
                /*(this.partyList[k].row = (k+1))*/
            }
        },error =>{
            this._primengProgressBarService.hide()
        })
    }

    OnchangeParty(event) {
        debugger
        // this.moduleListOptions = [{moduleTitle: '-', moduleId: null}]
        if (event.value != null) {
            debugger
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.moduleSearchByPartyId(event.value).subscribe(m => {
                debugger
                this._primengProgressBarService.hide();
                // this.moduleListOptions.push(...m)
                this.moduleListOptions=m
                this.moduleListOptions.unshift({moduleTitle: '-', moduleId: null});
                console.log('a',m);
                // this.moduleListOptions = this.moduleListOptions.sort()
                this.search()
            },error =>{
                debugger
                this._primengProgressBarService.hide()
            })
        } else {
            debugger
            this.moduleId = null
            this.search()
        }

    }

    scrollTop() {
        this.route.fragment.subscribe(f => {
            const element = document.querySelector("#" + f)
            if (element) element.scrollIntoView(true)
        })
    }

    ngOnInit(): void {
        this.scrollTop()
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.fetchallparty().subscribe(a => {
            this._primengProgressBarService.hide();
            this.partyListOptions.push(...a)
            this.partyListOptions = this.partyListOptions.sort()
        },error =>{
            this._primengProgressBarService.hide()
        })

        /*this.messagesApiFacadeService.fetchallmodule().subscribe(c => {
            this.moduleListOptions.push(...c)
            this.moduleListOptions = this.moduleListOptions.sort()
        })*/

        this.primeng.ripple.set( true) ;

        this.items = [
            {
                items: [

                    {
                        label: 'سرویس های ماژول ',
                        icon: '',
                        command: () => {

                            this.showApiOrEndpoint(this.tempAccess, 1);
                        }
                    }, {
                        label: 'اندپوینت های ماژول',
                        icon: '',
                        command: () => {

                            this.showApiOrEndpoint(this.tempAccess, 2);
                        }
                    },
                    {
                        label: 'ویرایش',
                        icon: '',
                        command: () => {
                            this.updateAccess(this.tempAccess);
                        }
                    },
                ]
            },
            {
                label: '____________________________',
                items: [{
                    label: 'انصراف',

                }]
            }
        ];

        if (this.InputClient != undefined) {
            this.clientName = this.InputClient.name
            this.clientBase = this.InputClient.clientBase
            this.showListFlag = true
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.fetchallclient().subscribe(b => {
                this._primengProgressBarService.hide();
                this.clientListOptions.push(...b)
                this.clientListOptions = this.clientListOptions.sort()
                if (this.InputClient.clientFlag) {
                    for (let i = 0; i < this.clientListOptions.length; i++) {
                        if (this.InputClient.clientId == this.clientListOptions[i].clientId) {


                            this.clientId = this.clientListOptions[i].clientId
                            this.clientNameFlag = true
                            this.search();

                            // this.router.navigate(['api-gateway/access-list']);
                        }
                    }

                }
            },error =>{
                this._primengProgressBarService.hide()
            })
            this.detailsBreadObject = this.chooseBread('clientBase')
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        } else {
            this.showListFlag = false
            this.clientNameFlag = false
            this.accessBase = true
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.fetchallclient().subscribe(b => {
                this._primengProgressBarService.hide();
                this.clientListOptions.push(...b)
            },error =>{
                this._primengProgressBarService.hide()
            })
            this.detailsBreadObject = this.chooseBread('accessBase')
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            this.search();
        }

    }

    validationMessage(): boolean {
        if (!this.codeMessage) {
            this.notifierService.showError({
                detail: this.translate.translate('accessList.message.enterMessageCode'),
                life: 3000
            });
            return false;
        } else if (!this.titleMessage) {
            this.notifierService.showError({
                detail: this.translate.translate('accessList.message.enterMessageTitle'),
                life: 3000
            });
            return false;
        } else if (!this.textMessage) {
            this.notifierService.showError({
                detail: this.translate.translate('accessList.message.enterFaMessage'),
                life: 3000
            });
            return false;
        } else if (!this.tableIdMessage) {
            this.notifierService.showError({
                detail: this.translate.translate('accessList.message.enterTableId'),
                life: 3000
            });
            return false;
        } else if (!this.typeMessage) {
            this.notifierService.showError({
                detail: this.translate.translate('accessList.message.enterMessageType'),
                life: 3000
            });
            return false;
        } else {
            return true
        }
    }

    onRegisterMessage() {
        if (this.validationMessage()) {
            this.messagesList = []
            this.messageId = null
            this.registerTemp.code = this.codeMessage;
            this.registerTemp.title = this.titleMessage;
            this.registerTemp.type = this.typeMessage;
            this.registerTemp.text = this.textMessage;
            this.registerTemp.textEN = this.textENMessage;
            this.registerTemp.tableId = this.tableIdMessage;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.registerMessage(this.registerTemp).subscribe(
                a => {
                    this._primengProgressBarService.hide();
                    this.nextDisableFlag = false
                    this.notifierService.showSuccess({
                        detail: this.translate.translate('accessList.message.registerNewMessage'),
                        life: 3000
                    });
                    this.codeMessageDe = a.code
                    this.messageIdDe = a.messageId
                    this.titleMessageDe = a.title
                    this.tableIdDe = a.tableId
                    this.messageId = a.messageId
                    this.messageSearch()
                },
                error => {
                    this._primengProgressBarService.hide();
                }
            );


        }


    }

    onClose(event: any) {
        this.scrollTop()
        this.apiModuleFlag = false;
        this.endpointFlag = false;
        this.clientFlag = false;
        if (event == 'closeAndCreate' || event == 'doubleClose' || event == 'close') {
            this.search();
        }
        if (this.InputClient != undefined) {
            this.detailsBreadObject = this.chooseBread('clientBase')
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        } else {
            this.detailsBreadObject = this.chooseBread('accessBase')
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }

    }

    updateAccess(access) {
        this.headerDialog = 'ویرایش دسترسی'
        this.apiAttachList = []
        this.selectApiFlag = true
        this.nextDisableFlag = false
        this.apiId = access.apiId


        this.searchRules()
        this.messageSearch()
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.apibyid(access.apiId).subscribe(k => {
            this._primengProgressBarService.hide();
            this.selectedApi=[]
            if (Array.isArray(k)) {
                this.selectedApi = k
                this.apiAttachList=k
            } else {
                this.selectedApi.push(k)
                this.apiAttachList.push(k)
            }
            this.titleApiDe = this.selectedApi[0].title
            this.nameApiDe = this.selectedApi[0].name
            this.retryCountApiDe = this.selectedApi[0].retryCount
            this.maxCallApiDe = this.selectedApi[0].maxCall
            this.apiId = this.selectedApi[0].apiId
            this.updateClientId = access.clientId
            this.updateModuleId = access.moduleId
            this.dailyCount = access.dailyCount
            this.weeklyCount = access.weeklyCount
            this.monthlyCount = access.monthlyCount
            this.beforeFlag = false
            this.nextFlag = true
            this.index1 = true
            this.index2 = false
            this.index3 = false
            this.index4 = false
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.getclientapibyclientidandapiid(access.clientId, access.apiId).subscribe(r => {
                this._primengProgressBarService.hide();
                this.selectedRuleList = []
                if (r.ruleId != null) {
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService.getByRuleId(r.ruleId).subscribe(a => {
                        this._primengProgressBarService.hide();
                        if (Array.isArray(a)) {
                            this.selectedRuleList = a
                        } else {
                            this.selectedRuleList.push(a)
                        }
                        this.selectedRuleList.map(x => (x.status === 1 ? x.status = true : x.status = false))
                        for (let k = 0; k < this.selectedRuleList.length; k++) {
                            this.selectedRuleList[k] = Object.assign(this.selectedRuleList[k], {row: (k + 1)})
                            /*(this.partyList[k].row = (k+1))*/
                        }
                        this.ruleNameDe = this.selectedRuleList[0].name
                        this.ruleId = this.selectedRuleList[0].ruleId
                        this.ruleTemplateDe = this.selectedRuleList[0].ruleTemplate
                        this.messageId = this.selectedRuleList[0].messageId
                        this.httpsstatusDe = this.selectedRuleList[0].httpsstatus

                        if (r.messageId != null) {
                            this._primengProgressBarService.show();
                            this.messagesApiFacadeService.getbymessageId(r.messageId).subscribe(l => {
                                this._primengProgressBarService.hide();
                                this.dialogApiFlag = true
                                this.selectedMessageList = []
                                if (Array.isArray(l)) {
                                    this.selectedMessageList = l
                                } else {
                                    this.selectedMessageList.push(l)
                                }
                                this.messageIdDe = this.selectedMessageList[0].messageId
                                this.codeMessageDe = this.selectedMessageList[0].code
                                this.titleMessageDe = this.selectedMessageList[0].title
                                this.tableIdDe = this.selectedMessageList[0].tableId
                            },error =>{
                                this._primengProgressBarService.hide()
                            })
                        } else {
                            this.dialogApiFlag = true
                        }
                    },error =>{
                        this._primengProgressBarService.hide()
                    })
                } else if (r.messageId != null) {
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService.getbymessageId(r.messageId).subscribe(l => {
                        this._primengProgressBarService.hide();
                        this.dialogApiFlag = true
                        this.selectedMessageList = []
                        if (Array.isArray(l)) {
                            this.selectedMessageList = l
                        } else {
                            this.selectedMessageList.push(l)
                        }
                        this.messageIdDe = this.selectedMessageList[0].messageId
                        this.codeMessageDe = this.selectedMessageList[0].code
                        this.titleMessageDe = this.selectedMessageList[0].title
                        this.tableIdDe = this.selectedMessageList[0].tableId
                    },error =>{
                        this._primengProgressBarService.hide()
                    })
                } else {
                    this.dialogApiFlag = true
                }

            },error =>{
                this._primengProgressBarService.hide()
            })

            //  this.messageSearch()

        },error =>{
            this._primengProgressBarService.hide()
        })




    }

    onKeydown(event) {
        let mySelf = this
        if (event.key === "Enter") {
            mySelf.search();
        }
    }

    setRecord(access) {

        this.tempAccess = access
    }

    showApiOrEndpoint(access, flag) {
        this.accessDto = {
            partyId: null,
            endpointId: null,
            moduleId: null,
            partyName: "",
            moduleTitle: "",
            clientName: "",
            accessBase: null,
            clientBase: null
        };
        this.accessDto = access
        this.accessDto.moduleId = access.moduleId
        this.accessDto.accessBase = this.accessBase
        this.accessDto.clientBase = this.clientBase
        this.accessDataSaveService.shareData = this.accessDto;
        if (flag == 1) {
            this.accessDto.apiBase = true
            this.apiModuleFlag = true;
        } else if (flag == 2) {
            this.endpointFlag = true
            this.accessDto.endpointBase = true
        }
    }

    search() {
        this.loading=true
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.quickaccess(this.partyId, this.moduleId, this.clientId).subscribe(a => {
            this._primengProgressBarService.hide();
            this.accessList = a;
            this.loading=false
            if (Array.isArray(a)) {
                this.accessList = a
            } else {
                this.accessList.push(a)
            }
            for (let k = 0; k < this.accessList.length; k++) {
                this.accessList[k] = Object.assign(this.accessList[k], {row: (k + 1)})
            }
        },error =>{
            this._primengProgressBarService.hide()
        })
    }

    clear() {
        this.partyId = null
        this.moduleListOptions = [{moduleTitle: '-', moduleId: null}]
        this.clientId = null
        this.moduleId = null
        this.accessList = [];
        this.clientNameFlag = false
        this.search();
    }


    addApiSelect() {
        this.headerDialog = 'ایجاد دسترسی'
        this.beforeFlag = false
        this.nextFlag = true
        this.index1 = true
        this.index2 = false
        this.index3 = false
        this.index4 = false
        this.selectApiFlag = false
        this.codeMessage = null
        this.tableIdMessage = null
        this.typeMessage = null
        this.titleMessage = ''
        this.textMessage = ''
        this.textENMessage = ''
        this.searchRules()
        this.messageSearch()
        if (this.validation()) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.apibymoduleidhasntclient(this.moduleId, this.clientId).subscribe(c => {
                this._primengProgressBarService.hide();
                if (Array.isArray(c)) {
                    this.apiAttachList = c
                } else {
                    this.apiAttachList.push(c)
                }
                for (let k = 0; k < this.apiAttachList.length; k++) {
                    this.apiAttachList[k] = Object.assign(this.apiAttachList[k], {row: (k + 1)})
                }
                if (c.length == 0) {

                    this.notifierService.showError({
                        detail: this.translate.translate('accessList.message.notFoundApi'),
                        life: 3000
                    });
                } else {

                    this.dialogApiFlag = true
                }

            }, error => {
                this._primengProgressBarService.hide();
            })
        }
    }

    onCancel() {
        this.dialogApiFlag = false
        this.beforeFlag = false
        this.registerFlag = false
        this.nextFlag = true
        this.index1 = true
        this.index2 = false
        this.index3 = false
        this.index4 = false
        this.index5 = false
        this.index6 = false
        this.clearRules()
        this.messageClear()
        this.clearFinalVar()
    }

    clearFinalVar() {
        this.dailyCount = 0;
        this.weeklyCount = 0;
        this.monthlyCount = 0;
        this.tableIdDe = ""
        this.messageTitleDe = ""
        this.httpsstatusDe = ""
        this.ruleTemplateDe = ""
        this.ruleNameDe = ""
        this.codeMessageDe = ""
        this.messageIdDe = ""
        this.titleMessageDe = ""
        this.titleApiDe = ""
        this.nameApiDe = ""
        this.retryCountApiDe = ""
        this.maxCallApiDe = ""
        this.dailyCountApiDe = 0
        this.weeklyCountApiDe = 0
        this.monthlyCountApiDe = 0
        this.messageId = null
        this.apiId = null
        this.ruleId = null
        this.updateClientId = null
        this.typeMessage = null
        this.tableIdMessage = null
        this.codeMessage = null
        this.titleMessage = ''
        this.textMessage = ''
        this.textENMessage = ''
        this.checkedAllApi = false
    }

    flagChange() {
        this.beforeFlag = false
        this.registerFlag = false
        this.nextFlag = true
        this.index1 = true
        this.index2 = false
        this.index3 = false
        this.index4 = false
        this.index5 = false
        this.index6 = false
        this.clearRules()
        this.clearFinalVar()
    }

    selectAllApi() {
        if (this.checkedAllApi) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.apibymoduleidhasntclient(this.moduleId, this.clientId).subscribe(
                c => {
                    this._primengProgressBarService.hide();
                    this.apiAttachList = []
                    if (Array.isArray(c)) {
                        this.apiAttachList = c
                    } else {
                        this.apiAttachList.push(c)
                    }
                    for (let k = 0; k < this.apiAttachList.length; k++) {
                        this.apiAttachList[k] = Object.assign(this.apiAttachList[k], {row: (k + 1)})
                    }
                    for (let p = 0; p < this.apiAttachList.length; p++) {
                        this.apiAttachList[p]
                    }
                    this.selectApiFlag = true
                    this.nextDisableFlag = false
                    this.selectedApi = this.apiAttachList
                },

                error => {
                    this._primengProgressBarService.hide();
                })

        } else {
            this.selectApiFlag = false
            this.nextDisableFlag = true

            this.selectedApi = []
        }

        /*this.tempAttach = api
        // this.apiListFlag = false
        this.titleApiDe = this.tempAttach.title
        this.nameApiDe = this.tempAttach.name
        this.retryCountApiDe = this.tempAttach.retryCount
        this.maxCallApiDe = this.tempAttach.maxCall
        this.apiId = this.tempAttach.apiId
        this.apiAttachList = this.apiAttachList.filter(function (x) {

            return x.apiId === api.apiId;
        });

        this.notifierService.showSuccess({detail:this.translate.translate( "accessList.message.selectedApi"), life: 3000});
        this.nextDisableFlag = false*/
    }

    selectApi(api) {
        this.tempAttach = api
        // this.apiListFlag = false
        this.titleApiDe = this.tempAttach.title
        this.nameApiDe = this.tempAttach.name
        this.retryCountApiDe = this.tempAttach.retryCount
        this.maxCallApiDe = this.tempAttach.maxCall
        this.apiId = this.tempAttach.apiId
        this.apiAttachList = this.apiAttachList.filter(function (x) {

            return x.apiId === api.apiId;
        });

        this.notifierService.showSuccess({
            detail: this.translate.translate("accessList.message.selectedApi"),
            life: 3000
        });
        this.nextDisableFlag = false
    }

    selectedRule(event) {
        this.ruleId = event.data.ruleId
        this.ruleNameDe = event.data.name
        this.ruleTemplateDe = event.data.ruleTemplate
        this.httpsstatusDe = event.data.httpsstatus
        this.httpsstatusDe = event.data.httpsstatus
        this.messageTitleDe = event.data.messageTitle
        this.nextDisableFlag = false
        /*  this.ruleList = this.ruleList.filter(function (x) {

              return x.ruleId === event.data.ruleId;
          });*/
        this.notifierService.showSuccess({
            detail: this.translate.translate('accessList.message.selectedRule'),
            life: 3000
        });
    }

    fakeRegister() {
        if (!this.checkedAllApi) {
            this.nextDisableFlag = false
            this.dailyCountApiDe = this.dailyCount
            this.weeklyCountApiDe = this.weeklyCount
            this.monthlyCountApiDe = this.monthlyCount
            this.notifierService.showSuccess({
                detail: this.translate.translate('accessList.message.limited'),
                life: 3000
            });

        } else {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.apibymoduleidhasntclient(this.moduleId, this.clientId).subscribe(
                c => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(c)) {
                        this.apiAttachLimitList = c
                    } else {
                        this.apiAttachLimitList.push(c)
                    }
                    for (let k = 0; k < this.apiAttachLimitList.length; k++) {
                        this.apiAttachLimitList[k] = Object.assign(this.apiAttachLimitList[k], {row: (k + 1)})
                        this.apiAttachLimitList[k].dailyCount = this.dailyCount
                        this.apiAttachLimitList[k].weeklyCount = this.weeklyCount
                        this.apiAttachLimitList[k].monthlyCount = this.monthlyCount
                    }
                },
                error => {
                    this._primengProgressBarService.hide();
                }
            )
            // apiAttachLimitList
            this.nextDisableFlag = false
            this.notifierService.showSuccess({
                detail: this.translate.translate('محدودیت برای سرویس های منتخب اعمال گردید '),
                life: 3000
            });
        }
        // if (this.title.length > 22) {
        //     this.widthTitle = 100
        // }
    }

    nextPageApi() {
        /* this.index1 = false
         this.index2 = false
         this.index3 = false*/
        if (this.index1 == true) {
            this.beforeFlag = true
            this.nextFlag = true
            this.index1 = false
            this.index2 = true
            this.registerFlag = false
            this.nextDisableFlag = true
        } else if (this.index2 == true) {
            this.beforeFlag = true
            this.index2 = false
            this.index1 = false
            this.nextFlag = true
            this.index3 = true
            this.registerFlag = false
        } else if (this.index3 == true) {
            this.beforeFlag = true
            this.index3 = false
            this.index2 = false
            this.index1 = false
            this.nextFlag = true
            this.index4 = true
            this.registerFlag = false
        } else if (this.index4 == true && !(this.checkedAllApi || this.checkedMultiApi)) {
            this.beforeFlag = true
            this.index4 = false
            this.index3 = false
            this.index2 = false
            this.index1 = false
            this.nextFlag = false
            this.index5 = true
            this.registerFlag = true
            this.headerIndex5 = ''

        } else if (this.index4 == true && (this.checkedAllApi || this.checkedMultiApi)) {
            this.beforeFlag = true
            this.index4 = false
            this.index3 = false
            this.index2 = false
            this.index1 = false
            this.nextFlag = true
            this.index6 = true
            this.registerFlag = false
        } else if (this.index6) {
            this.beforeFlag = true
            this.index4 = false
            this.index3 = false
            this.index2 = false
            this.index1 = false
            this.nextFlag = false
            this.index6 = false
            this.index5 = true
            this.registerFlag = true
        }
    }

    onRegisterAttachment() {
        let tempObj = {
            clientId: null,
            apiId: null,
            dailyCount: null,
            weeklyCount: null,
            monthlyCount: null,
            ruleId: null,
            messageId: null
        }
        if (!this.checkedAllApi && !this.checkedMultiApi) {
            this.dialogApiFlag = false
            this.index4 = false
            this.index5 = false
            this.index6 = false
            this.index3 = false
            this.index2 = false
            this.index1 = true
            this.registerFlag = false
            this.nextFlag = true
            this.nextDisableFlag = true
            this.dailyCountApiDe = this.dailyCount
            this.weeklyCountApiDe = this.weeklyCount
            this.monthlyCountApiDe = this.monthlyCount
            if (this.updateClientId == null || this.updateClientId == undefined) {
                tempObj.clientId = this.clientId
                tempObj.apiId = this.selectedApi[0].apiId
                tempObj.dailyCount = this.dailyCountApiDe
                tempObj.weeklyCount = this.weeklyCountApiDe
                tempObj.monthlyCount = this.monthlyCountApiDe
                tempObj.ruleId = this.ruleId
                tempObj.messageId = this.messageId
            } else {
                tempObj.clientId = this.updateClientId
                tempObj.apiId = this.apiId
                tempObj.dailyCount = this.dailyCountApiDe
                tempObj.weeklyCount = this.weeklyCountApiDe
                tempObj.monthlyCount = this.monthlyCountApiDe
                tempObj.ruleId = this.ruleId
                tempObj.messageId = this.messageIdDe
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.clientAttachApi(tempObj).subscribe(d => {
                this._primengProgressBarService.hide();
                this.search()
                this.clearFinalVar()

            },error => {
                this._primengProgressBarService.hide();
            })
        } else if (this.checkedAllApi && !this.checkedMultiApi) {
            this.dialogApiFlag = false
            if (this.updateClientId == null || this.updateClientId == undefined) {
                for (let k = 0; k < this.apiAttachLimitList.length; k++) {
                    tempObj.clientId = this.clientId
                    tempObj.apiId = this.apiAttachLimitList[k].apiId
                    tempObj.dailyCount = this.dailyCount
                    tempObj.weeklyCount = this.weeklyCount
                    tempObj.monthlyCount = this.monthlyCount
                    tempObj.ruleId = this.ruleId
                    tempObj.messageId = this.messageId
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService.clientAttachApi(tempObj).subscribe(d => {
                        this._primengProgressBarService.hide();
                        this.search()
                        this.clearFinalVar()

                    },error => {
                        this._primengProgressBarService.hide();
                    })
                }
            } else {
                for (let k = 0; k < this.apiAttachLimitList.length; k++) {
                    tempObj.clientId = this.updateClientId
                    tempObj.apiId = this.apiAttachLimitList[k].apiId
                    tempObj.dailyCount = this.dailyCount
                    tempObj.weeklyCount = this.weeklyCount
                    tempObj.monthlyCount = this.monthlyCount
                    tempObj.ruleId = this.ruleId
                    tempObj.messageId = this.messageIdDe
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService.clientAttachApi(tempObj).subscribe(d => {
                        this._primengProgressBarService.hide();
                        this.search()
                        this.clearFinalVar()

                    },error => {
                        this._primengProgressBarService.hide();
                    })
                }
            }

        } else if (this.checkedMultiApi) {
            //------------
            this.dialogApiFlag = false
            if (this.updateClientId == null || this.updateClientId == undefined) {
                for (let k = 0; k < this.selectedApi.length; k++) {
                    tempObj.clientId = this.clientId
                    tempObj.apiId = this.selectedApi[k].apiId
                    tempObj.dailyCount = this.dailyCount
                    tempObj.weeklyCount = this.weeklyCount
                    tempObj.monthlyCount = this.monthlyCount
                    tempObj.ruleId = this.ruleId
                    tempObj.messageId = this.messageId
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService.clientAttachApi(tempObj).subscribe(d => {
                        this._primengProgressBarService.hide();
                        this.search()
                        this.clearFinalVar()

                    },error => {
                        this._primengProgressBarService.hide();
                    })
                }
            } else {
                for (let k = 0; k < this.selectedApi.length; k++) {

                    tempObj.clientId = this.updateClientId
                    tempObj.apiId = this.selectedApi[k].apiId
                    tempObj.dailyCount = this.dailyCount
                    tempObj.weeklyCount = this.weeklyCount
                    tempObj.monthlyCount = this.monthlyCount
                    tempObj.ruleId = this.ruleId
                    tempObj.messageId = this.messageIdDe
                    this._primengProgressBarService.show();
                    this.messagesApiFacadeService.clientAttachApi(tempObj).subscribe(d => {
                        this._primengProgressBarService.hide();
                        this.search()
                        this.clearFinalVar()

                    },error => {
                        this._primengProgressBarService.hide();
                    })
                }
            }

            //------------
        }
    }

    beforePageApi() {

        /* this.index1 = false
         this.index2 = false
         this.index3 = false*/
        if (this.index5 == true && !(this.checkedAllApi || this.checkedMultiApi)) {
            this.beforeFlag = true
            this.nextFlag = true
            this.index4 = true
            this.index5 = false
            this.registerFlag = false
        } else if ((this.index5 == true && (this.checkedAllApi || this.checkedMultiApi))) {
            this.beforeFlag = true
            this.nextFlag = true
            this.index6 = true
            this.index5 = false
            this.registerFlag = false
        } else if ((this.index6 == true && (this.checkedAllApi || this.checkedMultiApi))) {
            this.beforeFlag = true
            this.nextFlag = true
            this.index6 = false
            this.index4 = true
            this.registerFlag = false
        } else if (this.index4 == true) {
            this.beforeFlag = true
            this.nextFlag = true
            this.index3 = true
            this.index4 = false
            this.registerFlag = false
        } else if (this.index3 == true) {
            this.beforeFlag = true
            this.nextFlag = true
            this.index2 = true
            this.index3 = false
            this.registerFlag = false
            this.nextDisableFlag = this.selectedApi.length < 0
        } else if (this.index2 == true) {
            this.beforeFlag = false
            this.index2 = false
            this.nextFlag = true
            this.index1 = true
            this.registerFlag = false
            this.nextDisableFlag = this.selectedApi.length < 0
        }
    }

    selectedMessage(event) {

        this.codeMessageDe = event.data.code
        this.messageIdDe = event.data.messageId
        this.titleMessageDe = event.data.title
        this.tableIdDe = event.data.tableId
        this.messageId = event.data.messageId
        /* this.messagesList = this.messagesList.filter(function (x) {

             return x.messageId === event.data.messageId;
         });*/
        this.notifierService.showSuccess({
            detail: this.translate.translate('accessList.message.selectMessage'),
            life: 3000
        });
        this.nextDisableFlag = false
    }

    validation(): boolean {
        if (!this.clientId) {
            this.notifierService.showError({
                detail: this.translate.translate('accessList.message.enterClientName'),
                life: 3000
            });
            return false;
        } else if (!this.partyId) {
            this.notifierService.showError({
                detail: this.translate.translate('accessList.message.enterPartyName'),
                life: 3000
            });
            return false;
        } else if (!this.moduleId) {
            this.notifierService.showError({
                detail: this.translate.translate('accessList.message.enterModuleTitle'),
                life: 3000
            });
            return false;
        } else {
            return true;
        }
    }

    BeforeButtonDialog() {
        this.limitApi = false
    }

    BeforeButton() {
        this.close.emit('close');
    }

}
