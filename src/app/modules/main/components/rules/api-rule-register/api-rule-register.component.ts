import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiGatewayConstants } from '../../../constants/ApiGatewayConstants';

import { ActivatedRoute } from '@angular/router';
import { FuseLoadingService } from '../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../shared/services/ToastService';
import { ApiGatewayService } from '../../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextarea } from 'primeng/inputtextarea';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { TableIdPipe } from '../../../../shared/pipes/tableId.pipe';
import { Dialog } from 'primeng/dialog';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../shared/pipes/moreChar19.pipe';
import { MessagesCategoryPipe } from '../../../../shared/pipes/messagesCategory.pipe';
import { NgIf, NgOptimizedImage } from '@angular/common';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Toast } from 'primeng/toast';
import { Textarea } from 'primeng/textarea';
import { KeyFilter } from 'primeng/keyfilter';

@Component({
    selector: 'app-api-rule-register',
    templateUrl: './api-rule-register.component.html',
    standalone: true,
    styleUrls: ['./api-rule-register.component.scss'],
    imports: [
        Panel,
        FormsModule,
        InputText,
        DropdownModule,
        InputTextarea,
        MatTooltip,
        TranslocoPipe,
        ButtonDirective,
        TableIdPipe,
        TranslocoDirective,
        Dialog,
        Card,
        TableModule,
        Tooltip,
        MoreChar19Pipe,
        MessagesCategoryPipe,
        NgIf,
        NgOptimizedImage,
        BreadcrumbsComponent,
        Toast,
        Textarea,
        KeyFilter,
    ],
})
export class ApiRuleRegisterComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    dialogMessageFlag = false;
    disableFlag = true;
    name;
    ruleTemplate=null;
    status;
    cust_alphanumEn: RegExp = ApiGatewayConstants.cust_alphanumEn;
    cust_alphanumFa: RegExp = ApiGatewayConstants.cust_alphanumFa;
    generalErrorCodesOptions = ApiGatewayConstants.generalErrorCodes;
    ruleTemplateOptions = ApiGatewayConstants.ruleTemplate;
    httpsstatusOptions = ApiGatewayConstants.httpsstatus;
    generalErrorCodes=null;
    errorText;
    httpsstatus;
    removeMessage = false;
    widthTitle;
    widthTableId;
    widthText;
    widthMessageId;
    rigesterRulObject = {
        ruleTemplate: null,
        errorText: '',
        httpsstatus: '',
        name: '',
        messageId: null,
    };

    codeMessage;
    titleMessage;
    tableIdMessage;
    typeMessage;
    textMessage;
    textENMessage;
    messageId;
    title;
    tableId;
    text;
    messageDetailFlag = false;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    messagesList = [];
    registerTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    first: number = 0;
    rows: number = 10;
    detailsBreadObject = [];
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private transloco:TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private _primengProgressBarService: FuseLoadingService,
        private notifierService: ToastService
    ) {}
    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'rulesBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('menu.basicInfo'),
                        img_index0: 'assets/icons/bulletin.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('menu.rule'),
                        rout_index1: '/rule',
                        isActive1: false,
                        img_index1: 'assets/icons/rule.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('registerRule.header.registerRule'),
                        rout_index2: '/registerRule',
                        isActive2: true,
                        img_index2: 'assets/icons/save.png',
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

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {

        this.scrollTop();
        this.tableIdMessage = '7';
        this.status = true;
        if (this.title != undefined) {
            if (this.title.length > 22) {
                this.widthTitle = 100;
            }
        }
        if (this.tableId != undefined) {
            if (this.tableId.length > 22) {
                this.widthTableId = 100;
            }
        }
        if (this.text != undefined) {
            if (this.text.length > 22) {
                this.widthText = 100;
            }
        }
        if (this.messageId != undefined) {
            if (this.messageId.length > 22) {
                this.widthMessageId = 100;
            }
        }
        this.detailsBreadObject = this.chooseBread('rulesBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
    }

    deleteMessage() {
        this.removeMessage = true;
        this.title = null;
        this.text = null;
        this.tableId = null;
        this.messageId = null;
        this.generalErrorCodes = null;
        this.disableFlag = true;
    }

    onKeydown(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.onRegister();
        }
    }

    onKeydownSearch(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.search();
        }
    }

    onCancel() {
        this.close.emit('close');
    }

    onRegister() {
        if (this.validation()) {
            this.rigesterRulObject.ruleTemplate = this.ruleTemplate;
            this.rigesterRulObject.name = this.name;
            this.rigesterRulObject.errorText = this.errorText;
            this.rigesterRulObject.httpsstatus = this.generalErrorCodes;
            if (!this.removeMessage) {
                this.rigesterRulObject.messageId = this.messageId;
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerRule(this.rigesterRulObject)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.close.emit('closeAndCreate');
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    showMessage() {
        if (this.generalErrorCodes) {
            this.dialogMessageFlag = true;
            this.messagesList = [];
            this.search();
        } else {
            this.notifierService.showError({
                detail: this.transloco.translate('registerRule.message.choosePublicErrorCode'),
                life: 3000,
            });
        }
    }

    selectedMessage(message) {
        this.messageId = '';
        this.messageDetailFlag = true;
        this.dialogMessageFlag = false;
        this.messagesList = [];
        this.messageId = message.messageId;
        this.title = message.title;
        this.text = message.text;
        this.tableId = message.tableId;
    }

    onRegisterMessage() {
        if (this.validationMessage()) {
            this.messagesList = [];
            this.messageId = '';
            this.registerTemp.code = this.codeMessage;
            this.registerTemp.title = this.titleMessage;
            this.registerTemp.type = this.typeMessage;
            this.registerTemp.text = this.textMessage;
            this.registerTemp.textEN = this.textENMessage;
            this.registerTemp.tableId = this.tableIdMessage;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerMessage(this.registerTemp)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.messageId = a.messageId;
                        this.title = a.title;
                        this.text = a.text;
                        this.tableId = a.tableId;
                        this.search();
                        this.messageDetailFlag = true;
                        this.dialogMessageFlag = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    search() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .messagesearch(
                this.generalErrorCodes,
                this.titleMessage,
                this.tableIdMessage,
                this.typeMessage
            )
            .subscribe(
                (response) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(response)) {
                        this.messagesList = response;
                    } else {
                        this.messagesList.push(response);
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    clear() {
        this.titleMessage = '';
        this.tableIdMessage = '';
        this.typeMessage = '';
        this.textMessage = '';
        this.textENMessage = '';
        this.search();
    }

    validation(): boolean {
        if (!this.name) {
            this.notifierService.showError({
                detail:this.transloco.translate('registerRule.message.enterApiRule'),
                life: 3000,
            });
            return false;
        } else if (!this.generalErrorCodes) {
            this.notifierService.showError({
                detail:this.transloco.translate('registerRule.message.enterRuleTemplateOrPublicErrorCode'),
                life: 3000,
            });
            return false;
        }
        else if (!this.errorText) {
            this.notifierService.showError({
                detail:this.transloco.translate('registerRule.message.enterErrorText'),
                life: 3000,
            });
            return false;
        }
        /*else if (this.generalErrorCodes && !this.messageId) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerRule.message.enterSelectDesiredMessage'),
                life: 3000,
            });
            return false;
        }*/
        else {
            return true;
        }
    }

    validationMessage(): boolean {
        if (!this.codeMessage) {
            this.notifierService.showError({
                detail:this.transloco.translate('registerRule.message.enterCodeMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.titleMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerRule.message.enterTitleMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.textMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerRule.message.enterFaMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.tableIdMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerRule.message.enterTableId'),
                life: 3000,
            });
            return false;
        } else if (!this.typeMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerRule.message.enterTypeMessages'),
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    onchangeGeneralErrorCodes() {
        if (
            this.generalErrorCodes != '' &&
            this.generalErrorCodes != undefined &&
            this.generalErrorCodes != null
        ) {
            this.disableFlag = false;
            this.codeMessage = this.generalErrorCodes;
        } else {
            this.deleteMessage();
            this.disableFlag = true;
        }
    }
}
