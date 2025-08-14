import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiGatewayConstants} from "../../../constants/ApiGatewayConstants";

import {ActivatedRoute} from "@angular/router";
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../shared/pipes/moreChar19.pipe';
import { ModuleTypePipe } from '../../../../shared/pipes/moduleType.pipe';
import { HistoryMoreCharPipe } from '../../../../shared/pipes/historyMoreChar.pipe';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { IsApprovalPipe } from '../../../../shared/pipes/isApproval.pipe';
import { StatusPipe } from '../../../../shared/pipes/status.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { MediatorsJsonComponent } from '../../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../../mediators/mediators.component';
import { NodeChangeListComponent } from '../../node-change-list/node-change-list.component';
import { Dialog } from 'primeng/dialog';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import {
    HeaderEndpointRegisterComponent
} from '../../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import { FuseLoadingService } from '../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../shared/services/ToastService';
import { TableIdPipe } from '../../../../shared/pipes/tableId.pipe';
import { Card } from 'primeng/card';
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../../services/api-gateway.service';
import { Toast } from 'primeng/toast';
import { Textarea } from 'primeng/textarea';
import { KeyFilter } from 'primeng/keyfilter';


@Component({
    selector: 'app-api-rule-update',
    templateUrl: './api-rule-update.component.html',
    styleUrls: ['./api-rule-update.component.scss'],
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


        /* NgStyle,
        ModuleTypePipe,
        *   HistoryMoreCharPipe,*/
        IsApprovalPipe,
        StatusPipe,
        Menu,
        Ripple,
        /* MediatorsJsonComponent,*/
        MediatorsComponent,
        NodeChangeListComponent,
        Dialog,
        TranslocoPipe,
        /*   TranslocoDirective,*/
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
        TableIdPipe,
        Card,
        Toast,
        Textarea,
        KeyFilter,
    ],
})
export class ApiRuleUpdateComponent implements OnInit {
    @Input() inputUpdate;
    @Output() close = new EventEmitter<string>();
    dialogMessageFlag = false;
    disableFlag = true;
    removeMessage = false;
    name;
    ruleTemplate;
    generalErrorCodes = null;
    generalErrorCodesOptions = ApiGatewayConstants.generalErrorCodes;
    ruleTemplateOptions = ApiGatewayConstants.ruleTemplate;
    httpsstatusOptions = ApiGatewayConstants.httpsstatus;
    cust_alphanumEn: RegExp = ApiGatewayConstants.cust_alphanumEn;
    cust_alphanumFa: RegExp = ApiGatewayConstants.cust_alphanumFa;
    errorText;
    httpsstatus;
    status;
    typeMessage;
    messagesList = [];
    messageId;
    title;
    tableId;
    text;
    codeMessage;
    titleMessage;
    textMessage;
    textENMessage;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    tableIdMessage;
    registerTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    updateRulObject = {
        ruleTemplate: null,
        errorText: '',
        httpsstatus: '',
        name: '',
        messageId: null,
        ruleId: null,
    };
    widthTitle;
    widthTableId;
    widthText;
    widthMessageId;
    first: number = 0;
    rows: number = 10;
    detailsBreadObject = [];
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private _primengProgressBarService: FuseLoadingService,
        private transloco :TranslocoService,
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
                        label_index2: this.transloco.translate('editRule.header.editRule'),
                        rout_index2: '/registerRule',
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
    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();
        if (this.inputUpdate.messageId !== null) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .getbymessageId(this.inputUpdate.messageId)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        a.code != undefined
                            ? (this.generalErrorCodes = a.code.toString())
                            : (this.generalErrorCodes = a.code);
                        a.code != undefined
                            ? (this.codeMessage = a.code.toString())
                            : (this.codeMessage = a.code);
                        a.title != undefined
                            ? (this.titleMessage = a.title.toString())
                            : (this.titleMessage = a.title);
                        a.tableId != undefined
                            ? (this.tableIdMessage = a.tableId.toString())
                            : (this.tableIdMessage = a.tableId);
                        a.text != undefined
                            ? (this.textMessage = a.text.toString())
                            : (this.textMessage = a.text);
                        a.textEN != undefined
                            ? (this.textENMessage = a.textEN.toString())
                            : (this.textENMessage = a.textEN);
                        a.type != undefined
                            ? (this.typeMessage = a.type.toString())
                            : (this.typeMessage = a.type);
                        a.text != undefined
                            ? (this.title = a.text.toString())
                            : (this.title = a.text);
                        a.text != undefined
                            ? (this.text = a.text.toString())
                            : (this.text = a.text);
                        a.tableId != undefined
                            ? (this.tableId = a.tableId.toString())
                            : (this.tableId = a.tableId);
                        if (this.generalErrorCodes != null) {
                            this.disableFlag = false;
                        } else {
                            this.disableFlag = true;
                        }
                        if (this.title.length != undefined) {
                            if (this.title.length > 22) {
                                this.widthTitle = 100;
                            }
                        }
                        if (this.tableId.length != undefined) {
                            if (this.tableId.length > 22) {
                                this.widthTableId = 100;
                            }
                        }
                        if (this.text.length != undefined) {
                            if (this.text.length > 22) {
                                this.widthText = 100;
                            }
                        }
                        if (this.messageId.length != undefined) {
                            if (this.messageId.length > 22) {
                                this.widthMessageId = 100;
                            }
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
        this.generalErrorCodes = this.inputUpdate.generalErrorCodes;
        this.name = this.inputUpdate.name;
        this.ruleTemplate = this.inputUpdate.ruleTemplate.toString();
        this.errorText = this.inputUpdate.errorText;
        this.httpsstatus = this.inputUpdate.httpsstatus;
        this.messageId = this.inputUpdate.messageId;
        this.inputUpdate.status == 1
            ? (this.status = true)
            : (this.status = false);
        this.detailsBreadObject = this.chooseBread('rulesBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
    }

    showMessage() {
        if (this.generalErrorCodes) {
            this.dialogMessageFlag = true;
            this.messagesList = [];
            this.search();
        } else {
            this.notifierService.showError({
                detail: this.transloco.translate('editRule.message.choosePublicErrorCode'),
                life: 3000,
            });
        }
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

    onCancel() {
        this.close.emit('close');
    }

    onKeydown(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.onUpdate();
        }
    }

    onKeydownSearch(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.search();
        }
    }

    onUpdate() {
        if (this.validation()) {
            this.updateRulObject.ruleId = this.inputUpdate.ruleId;
            this.updateRulObject.ruleTemplate = this.ruleTemplate;
            this.updateRulObject.name = this.name;
            this.updateRulObject.errorText = this.errorText;
            this.updateRulObject.httpsstatus = this.generalErrorCodes;
            this.updateRulObject.messageId = null;
            if (!this.removeMessage) {
                this.updateRulObject.messageId = this.messageId;
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerRule(this.updateRulObject)
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
                        this.dialogMessageFlag = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    validationMessage(): boolean {
        if (!this.codeMessage) {
            this.notifierService.showError({
                detail:this.transloco.translate('editRule.message.enterCodeMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.titleMessage) {
            this.notifierService.showError({
                detail:this.transloco.translate('editRule.message.enterTitleMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.textMessage) {
            this.notifierService.showError({
                detail:this.transloco.translate('editRule.message.enterFaMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.tableIdMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate('editRule.message.enterTableId'),
                life: 3000,
            });
            return false;
        } else if (!this.typeMessage) {
            this.notifierService.showError({
                detail:  this.transloco.translate('editRule.message.enterTypeMessages'),
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    selectedMessage(message) {
        this.messageId = '';
        this.dialogMessageFlag = false;
        this.messagesList = [];
        this.messageId = message.messageId;
        this.title = message.title;
        this.text = message.text;
        this.tableId = message.tableId;
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
                detail:  this.transloco.translate('editRule.message.enterApiRule'),
                life: 3000,
            });
            return false;
        } else if (!this.generalErrorCodes) {
            this.notifierService.showError({
                detail:this.transloco.translate('editRule.message.enterRuleTemplateOrPublicErrorCode'),
                life: 3000,
            });
            return false;
        } else if (!this.errorText) {
            this.notifierService.showError({
                detail:this.transloco.translate('editRule.message.enterErrorText'),
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
            this.generalErrorCodes != undefined
        ) {
            this.disableFlag = false;
            this.codeMessage = this.generalErrorCodes;
            this.messageId = '';
        } else {
            this.deleteMessage();
            this.disableFlag = true;
        }
    }
}
