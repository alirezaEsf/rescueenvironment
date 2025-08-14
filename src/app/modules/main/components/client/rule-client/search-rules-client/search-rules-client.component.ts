import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessagesApiFacadeService} from "../../../../services/messages-api-facade.service";
import {ApiGatewayService} from "../../../../services/api-gateway.service";
import {ApiGatewayConstants} from "../../../../constants/ApiGatewayConstants";
import {ActivatedRoute} from "@angular/router";
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { FuseLoadingService } from '../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../shared/services/ToastService';
import { ButtonDirective } from 'primeng/button';
import { MatTooltip } from '@angular/material/tooltip';
import { Dialog } from 'primeng/dialog';
import { MoreChar19Pipe } from '../../../../../shared/pipes/moreChar19.pipe';
import { Tooltip } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-search-rules-client',
    templateUrl: './search-rules-client.component.html',
    standalone: true,
    styleUrls: ['./search-rules-client.component.scss'],
    imports: [
        ButtonDirective,
        MatTooltip,
        TranslocoPipe,
        Dialog,
        MoreChar19Pipe,
        Tooltip,
        TableModule,
    ],
})
export class SearchRulesClientComponent implements OnInit {
    @Input() inputRuleClient;
    @Output() close = new EventEmitter<string>();
    name
    statusCode
    titleMessage
    tableIdMessage
    typeMessage
    codeMessage
    textMessage
    textENMessage
    statusCodeOptions = ApiGatewayConstants.statusCode
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    messagesList = []
    ruleList = []
    messageId
    title
    tableId
    code
    text
    widthTitle
    dialogMessageFlag = false
    tableFlag = false
    ruleSelected = false
    clientId: number
    clientRuleDto = {
        ruleId: 0,
        clientId: 0
    }
    registerTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    ruleName
    ruleId
    first: number = 0;
    rows: number = 10;
    first2: number = 0;
    rows2: number = 10;
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private transloco :TranslocoService,
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private notifierService: ToastService
    ) {
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
        this.ruleSelected = false
        this.ruleName = ''
        this.ruleId = ''
        this.search()
    }

    validationMessage(): boolean {
        if (!this.codeMessage) {
            this.notifierService.showError({detail: "لطفا کد پیام را وارد کنید!", life: 3000});
            return false;
        } else if (!this.titleMessage) {
            this.notifierService.showError({detail: "لطفا عنوان پیام را وارد کنید!", life: 3000});
            return false;
        } else if (!this.textMessage) {
            this.notifierService.showError({detail: "لطفا پیام(فارسی) را وارد کنید!", life: 3000});
            return false;
        } else if (!this.tableIdMessage) {
            this.notifierService.showError({detail: "لطفا بخش پیام را وارد کنید!", life: 3000});
            return false;
        } else if (!this.typeMessage) {
            this.notifierService.showError({detail: "لطفا نوع پیام را وارد کنید!", life: 3000});
            return false;
        } else {
            return true
        }
    }

    onRegisterMessage() {
        if (this.validationMessage()) {
            this.messagesList = []
            this.messageId = ""
            this.registerTemp.code = this.codeMessage;
            this.registerTemp.title = this.titleMessage;
            this.registerTemp.type = this.typeMessage;
            this.registerTemp.text = this.textMessage;
            this.registerTemp.textEN = this.textENMessage;

            this.registerTemp.tableId = this.tableIdMessage;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.registerMessage(this.registerTemp).subscribe(a => {
                this._primengProgressBarService.hide();
                this.messageId = a.messageId
                this.title = a.title
                this.text = a.text

                this.dialogMessageFlag = false;
            },error =>{
                this._primengProgressBarService.hide()
            })
        }
    }

    selectedMessage(message) {
        this.messageId = ""
        this.dialogMessageFlag = false;
        this.messagesList = []
        this.messageId = message.messageId
        this.text = message.text
        this.title = message.title
        this.tableId = message.tableId
        this.code = message.code
        this.search()
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

    deleteMessage() {
        this.messageId = ''
        this.text = ''
        this.title = ''
        this.tableId = ''
        this.code = ''
        this.statusCode = ''
        this.search()
    }

    onKeydownSearch(event) {
        let self = this
        if (event.key === "Enter") {
            self.messageSearch();
        }
    }

    search() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.rulesearch(this.name, this.statusCode, this.messageId).subscribe(a => {
            this._primengProgressBarService.hide()
            ;
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
            this.tableFlag = true
        },error => {
            this._primengProgressBarService.hide();
        })
    }

    selectedRule(roule) {

        this.clientRuleDto = {
            ruleId: 0,
            clientId: 0
        }
        this.clientRuleDto.ruleId = roule.ruleId
        this.clientRuleDto.clientId = this.clientId
        this.notifierService.showSuccess({detail: "قاعده مورد نظر انتخاب گردید!", life: 3000});
        this.ruleName = roule.name
        this.ruleId = roule.ruleId
        this.tableFlag = false
        this.ruleSelected = true
    }

    onRegister() {
        if (this.ruleSelected) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.registerClientRule(this.clientRuleDto).subscribe(res => {
                this._primengProgressBarService.hide();
                this.notifierService.showSuccess({detail: "قاعده مورد نظر ثبت گردید!", life: 3000});
                this.close.emit('closeAndCreate')
                this.clientRuleDto = {
                    ruleId: 0,
                    clientId: 0
                }
            },error =>{
                this._primengProgressBarService.hide()
            })
        } else {
            this.notifierService.showError({detail: "لطفا قاعده را انتخاب کنید!", life: 3000});

        }

    }

    onCancel() {
        this.close.emit('close');
    }
}
