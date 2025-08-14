import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiGatewayConstants} from "../../../constants/ApiGatewayConstants";
import {MessagesApiFacadeService} from "../../../services/messages-api-facade.service";
import {ApiGatewayService} from "../../../services/api-gateway.service";
import {ActivatedRoute} from "@angular/router";

import { TranslocoService } from '@ngneat/transloco';
import { FuseLoadingService } from '../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../shared/services/ToastService';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-rule-client',
    templateUrl: './rule-client.component.html',
    standalone: true,
    styleUrls: ['./rule-client.component.scss'],
    imports: [
        Toast,
    ],
})
export class RuleClientComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputRuleClient;
    @Input() inputClientApi;
    clientId
    dialogMessageFlag = false
    messageDetailFlag = false
    takhsisFlag = false
    messagesList = []
    ruleList = []
    codeMessage
    titleMessage
    tableIdMessage
    typeMessage
    textMessage
    textENMessage
    messageId
    name
    title
    text
    clientRuleSearchFlag = false
    updateFlag = false
    rulConditionFlag = false
    moduleType

    ruleDto
    detailsBreadObject = []
    clientEndpointBase
    moduleBase
    moduleTitle
    destinationHost
    partyTitle
    apiName
    clientName
    tempRule
    items
    statusCodeOptions = ApiGatewayConstants.statusCode
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    widthTableId
    widthText
    statusCode
    tableId
    code
    clientKey
    mobileNo
    partyBase
    clientBase
    accessBase
    widthClientName
    widthClientKey
    widthMobileNo
    first: number = 0;
    rows: number = 10;
    first2: number = 0;
    rows2: number = 10;
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private transloco :TranslocoService,
        private notifierService: ToastService
    ) {
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'clientBase':
                return [
                    {
                        index: 0,
                        label_index0: "صفحه اصلی",
                        img_index0: "assets/icons/home.png",
                        rout_index0: '/home',
                        isActive0: false
                    },
                    {
                        index: 1, label_index1: "کلاینت", rout_index1: "", isActive1: false,
                        img_index1: "assets/icons/client.png"
                    }, {
                        index: 2, label_index2: "قواعد کلاینت", rout_index2: null, isActive2: true,
                        label_Detail_index2: '(' + this.clientName + ')',
                        img_index2: "assets/icons/rulesClient.png"
                    }, {label_index3: null, label_Detail_index3: null},
                    {label_index4: null, label_Detail_index4: null},
                    {label_index5: null, label_Detail_index5: null},
                    {label_index6: null, label_Detail_index6: null}
                ]
            case 'clientEndpointBase':
                return [
                    {
                        index: 0,
                        label_index0: "صفحه اصلی",
                        img_index0: "assets/icons/home.png",
                        rout_index0: '/home',
                        isActive0: false
                    },
                    {
                        index: 1, label_index1: "کلاینت", rout_index1: "", isActive1: false,
                        img_index1: "assets/icons/client.png"
                    },
                    {
                        index: 2, label_index2: "سرویس", rout_index2: null, isActive2: false,
                        label_Detail_index2: '(' + this.clientName + ')',
                        img_index2: "assets/icons/api.png"
                    },
                    {
                        index: 3, label_index3: "کلاینت", rout_index3: null, isActive3: false,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: "assets/icons/client.png"
                    }, {
                        index: 4, label_index4: "قواعد کلاینت", rout_index4: null, isActive4: true,
                        label_Detail_index4: '(' + this.clientName + ')',
                        img_index4: "assets/icons/rulesClient.png"
                    }, {label_index5: null, label_Detail_index5: null},
                    {label_index6: null, label_Detail_index6: null},
                ]
            case 'moduleBase':
                return [
                    {
                        index: 0,
                        label_index0: "صفحه اصلی",
                        img_index0: "assets/icons/home.png",
                        rout_index0: '/home',
                        isActive0: false
                    },
                    {
                        index: 1, label_index1: "ماژول", rout_index1: '/api-gateway/home/party/module',
                        isActive1: false, img_index1: "assets/icons/module.png"
                    },
                    {
                        index: 2, label_index2: "سرویس", rout_index2: null, isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: "assets/icons/api.png"
                    },
                    {
                        index: 3, label_index3: "کلاینت", rout_index3: null, isActive3: false,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: "assets/icons/client.png"
                    }, {
                        index: 4, label_index4: "قواعد کلاینت", rout_index4: null, isActive4: true,
                        label_Detail_index4: '(' + this.clientName + ')',
                        img_index4: "assets/icons/rulesClient.png"
                    }, {label_index5: null, label_Detail_index5: null},
                    {label_index6: null, label_Detail_index6: null},
                ]
            case 'partyBase':
                return [
                    {
                        index: 0,
                        label_index0: "صفحه اصلی",
                        img_index0: "assets/icons/home.png",
                        rout_index0: '/home',
                        isActive0: false
                    },
                    {
                        index: 1, label_index1: "سازمان", rout_index1: '/party', isActive1: false,
                        img_index1: "assets/icons/party.png"
                    },
                    {
                        index: 2, label_index2: "ماژول",
                        rout_index2: '/api-gateway/home/party/module',
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        isActive2: false, img_index2: "assets/icons/module.png"
                    },
                    {
                        index: 3, label_index3: "سرویس", rout_index3: null, isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: "assets/icons/api.png"
                    },
                    {
                        index: 4, label_index4: "کلاینت", rout_index4: null, isActive4: false,
                        label_Detail_index4: '(' + this.apiName + ')',
                        img_index4: "assets/icons/client.png"
                    }, {
                        index: 5, label_index5: "قواعد کلاینت", rout_index5: null, isActive5: true,
                        label_Detail_index5: '(' + this.clientName + ')',
                        img_index5: "assets/icons/rulesClient.png"
                    }, {label_index6: null, label_Detail_index6: null}

                ]
            case 'accessBase':
                return [
                    {
                        index: 0,
                        label_index0: "صفحه اصلی",
                        img_index0: "assets/icons/home.png",
                        rout_index0: '/home',
                        isActive0: false
                    },
                    {
                        index: 1, label_index1: "لیست دسترسی", rout_index1: '/api-gateway/access-list',
                        isActive1: false, img_index1: "assets/icons/access.png"
                    },
                    {
                        index: 2, label_index2: "سرویس", rout_index2: null, isActive2: false,
                        label_Detail_index2: '(' + this.clientName + ')',
                        img_index2: "assets/icons/api.png"
                    },
                    {
                        index: 3, label_index3: "کلاینت", rout_index3: null, isActive3: false,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: "assets/icons/client.png"
                    }, {
                        index: 4, label_index4: "قواعد کلاینت", rout_index4: null, isActive4: true,
                        label_Detail_index4: '(' + this.clientName + ')',
                        img_index4: "assets/icons/rulesClient.png"
                    }, {label_index5: null, label_Detail_index5: null},
                    {label_index6: null, label_Detail_index6: null}
                ]
            default:
                return null
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
        if (this.inputRuleClient != undefined) {

            this.clientId = this.inputRuleClient.clientId
            this.clientName = this.inputRuleClient.name
            this.clientKey = this.inputRuleClient.apikey
            this.mobileNo = this.inputRuleClient.mobileNo
            this.detailsBreadObject = this.chooseBread('clientBase')
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        } else if (this.inputClientApi != undefined) {

            this.clientId = this.inputClientApi.clientId
            this.clientName = this.inputClientApi.name
            this.clientKey = this.inputClientApi.apikey
            this.mobileNo = this.inputClientApi.mobileNo
            this.partyBase = this.inputClientApi.partyBase
            this.accessBase = this.inputClientApi.accessBase
            this.moduleBase = this.inputClientApi.moduleBase
            this.clientBase = this.inputClientApi.clientBase
            this.moduleTitle = this.inputClientApi.moduleTitle
            this.partyTitle = this.inputClientApi.partyTitle
            this.apiName = this.inputClientApi.apiName

            this.destinationHost = this.inputClientApi.destinationHost
            if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            if (this.moduleBase) {

                this.detailsBreadObject = this.chooseBread('moduleBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            if (this.partyBase) {

                this.detailsBreadObject = this.chooseBread('partyBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }

            if (this.clientBase) {

                this.clientEndpointBase = true
                this.detailsBreadObject = this.chooseBread('clientEndpointBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }

        }
       // this.primengConfig.ripple = true;
        this.items = [
            {
                items: [
                    {
                        label: 'تعیین شرایط قاعده (Conditions)',
                        icon: '',
                        command: () => {
                            this.showRuleCondition(this.tempRule);
                        }
                    },
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
                        command: () => {
                            this.showUpdate(this.tempRule);
                        }
                    }]
            },
            {
                label: '____________________________',
                items: [{
                    label: this.transloco.translate('contextMenu.cancel'),

                }]
            }
        ];
        this.clientName.length > 22 ? this.widthClientName = 100 : this.widthClientName = 50
        this.clientKey.length > 22 ? this.widthClientKey = 100 : this.widthClientKey = 50
        this.mobileNo.length > 22 ? this.widthMobileNo = 100 : this.widthMobileNo = 50
        this.fetchClientRules();


    }

    showSearchRules() {
        this.ruleDto = {
            ruleTemplate: null,
            errorText: '',
            httpsstatus: '',
            name: '',
            messageId: null,
            ruleId: null,
            ruleBase: null,
            clientId: null
        }
        if (this.inputRuleClient != undefined) {
            this.ruleDto = this.inputRuleClient
            this.ruleDto.ruleBase = true
        } else if (this.inputClientApi != undefined) {
            this.ruleDto = this.inputClientApi
            this.ruleDto.ruleBase = false
        }
        this.clientRuleSearchFlag = true
    }

    onKeydownSearch(event) {
        let self = this
        if (event.key === "Enter") {
            self.fetchClientRules();
        }
    }

    selectedMessage(message) {
        this.messageId = ""
        this.messageDetailFlag = true
        this.dialogMessageFlag = false;
        this.messagesList = []
        this.messageId = message.messageId
        this.text = message.text
        this.title = message.title
        this.tableId = message.tableId
        this.code = message.code
        this.takhsisFlag = true
    }

    showRuleCondition(rule: any) {

        this.ruleDto = {
            ruleTemplate: null,
            errorText: '',
            httpsstatus: '',
            name: '',
            messageId: null,
            ruleId: null,
            ruleClientBase: null,
            clientId: null,
            clientBase: null,
            partyBase: null,
            accessBase: null,
            moduleBase: null,
            partyTitle: null,
            moduleTitle: null,
            destinationHost: null,
            clientName: null,
            ruleName: null,
            clientEndpointBase: null,
            apiName: null
        }

        this.ruleDto = rule
        this.apiGatewayService.updateApprovalRuleId(rule.ruleId)
        this.ruleDto.ruleClientBase = true
        this.ruleDto.clientBase = this.clientBase
        this.ruleDto.partyBase = this.partyBase
        this.ruleDto.accessBase = this.accessBase
        this.ruleDto.moduleBase = this.moduleBase
        this.ruleDto.clientEndpointBase = this.clientEndpointBase
        this.ruleDto.partyTitle = this.partyTitle
        this.ruleDto.moduleTitle = this.moduleTitle
        this.ruleDto.destinationHost = this.destinationHost
        this.ruleDto.clientName = this.clientName
        this.ruleDto.apiName = this.apiName
        this.ruleDto.ruleName = rule.name
        this.ruleDto.ruleId = rule.ruleId
        this.rulConditionFlag = true

    }

    fetchClientRules() {
        if (this.inputRuleClient != undefined) {
            this.clientId = this.inputRuleClient.clientId
        }
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.findbyclientid(this.clientId).subscribe(a => {
            this._primengProgressBarService.hide();
            if (Array.isArray(a)) {
                this.ruleList = a
            } else {
                this.ruleList.push(a)

            }
            this.ruleList.map(x => (x.status === 1 ? x.status = true : x.status = false))
            for (let k = 0; k < this.ruleList.length; k++) {
                this.ruleList[k] = Object.assign(this.ruleList[k], {row: (k + 1)})
            }
        },error =>{
            this._primengProgressBarService.hide()
        })
    }

    showMessage() {
        if (this.statusCode) {
            this.dialogMessageFlag = true;
            this.messageSearch()
            this.codeMessage = this.statusCode
            this.messagesList = []
        } else {
            this.notifierService.showError({detail: "لطفا ابتدا کد وضعیت را انتخاب کنید!", life: 3000});
        }

    }

    clear() {
        this.name = ""
        this.statusCode = ""
        this.messageId = ""
        this.title = ""
        this.codeMessage = ""
        this.titleMessage = ""
        this.textMessage = ""
        this.textENMessage = ""
        this.tableIdMessage = ""
        this.typeMessage = ""
        this.fetchClientRules()
    }

    showUpdate(rule: any) {
        this.ruleDto = {
            ruleTemplate: null,
            errorText: '',
            status: null,
            httpsstatus: '',
            name: '',
            messageId: null,
            apiId: null,
            ruleId: null
        }
        this.ruleDto = rule;
        this.updateFlag = true
    }

    onClose(event) {
        this.scrollTop()
        if (this.inputRuleClient != undefined) {

            this.clientId = this.inputRuleClient.clientId
            this.clientName = this.inputRuleClient.name
            this.clientKey = this.inputRuleClient.apikey
            this.mobileNo = this.inputRuleClient.mobileNo
            this.detailsBreadObject = this.chooseBread('clientBase')
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        } else if (this.inputClientApi != undefined) {

            this.clientId = this.inputClientApi.clientId
            this.clientName = this.inputClientApi.name
            this.clientKey = this.inputClientApi.apikey
            this.mobileNo = this.inputClientApi.mobileNo
            this.partyBase = this.inputClientApi.partyBase
            this.accessBase = this.inputClientApi.accessBase
            this.moduleBase = this.inputClientApi.moduleBase
            this.moduleTitle = this.inputClientApi.moduleTitle
            this.partyTitle = this.inputClientApi.partyTitle

            this.destinationHost = this.inputClientApi.destinationHost
            if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
            if (this.partyBase) {

                this.detailsBreadObject = this.chooseBread('partyBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }

        }
        if (event == 'close') {
            this.clientRuleSearchFlag = false;
            this.updateFlag = false;
            this.rulConditionFlag = false;
        } else if (event == 'closeAndCreate') {
            this.clientRuleSearchFlag = false;
            this.updateFlag = false;
            this.rulConditionFlag = false;
            this.fetchClientRules();
        }
    }

    messageSearch() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.messagesearch(
            this.statusCode, this.titleMessage, this.tableIdMessage, this.typeMessage
        ).subscribe(response => {
            this._primengProgressBarService.hide();
            if (Array.isArray(response)) {
                this.messagesList = response
            } else {
                this.messagesList.push(response)
            }
        },error =>{
            this._primengProgressBarService.hide()
        })
    }

    setRecord(rule) {
        this.tempRule = rule
    }

    BeforeButton() {
        this.close.emit('close');
    }
}
