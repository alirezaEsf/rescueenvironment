import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { ModuleTypePipe } from '../../../shared/pipes/moduleType.pipe';
import { HistoryMoreCharPipe } from '../../../shared/pipes/historyMoreChar.pipe';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { IsApprovalPipe } from '../../../shared/pipes/isApproval.pipe';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { MediatorsJsonComponent } from '../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../mediators/mediators.component';
import { NodeChangeListComponent } from '../node-change-list/node-change-list.component';
import { Dialog } from 'primeng/dialog';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import {
    HeaderEndpointRegisterComponent
} from '../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import { FormatRulePipe } from '../../../shared/pipes/FormatRule.pipe';
import { ApiRuleRegisterComponent } from './api-rule-register/api-rule-register.component';
import { ApiRuleUpdateComponent } from './api-rule-update/api-rule-update.component';
import { ApiRuleConditionComponent } from './api-rule-condition/api-rule-condition.component';
import { Card } from 'primeng/card';
import { MessagesCategoryPipe } from '../../../shared/pipes/messagesCategory.pipe';
import { FuseLoadingService } from '../../../../../@fuse/services/loading';
import { ToastService } from '../../../shared/services/ToastService';
import { ApiGatewayService } from '../../services/api-gateway.service';
import { ApiGatewayConstants } from '../../constants/ApiGatewayConstants';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';
import { PrimeNG } from 'primeng/config';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.scss'],
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
        FormatRulePipe,
        ApiRuleRegisterComponent,
        ApiRuleUpdateComponent,
        ApiRuleConditionComponent,
        Card,
        MessagesCategoryPipe,
        Toast,
    ],
})
export class RulesComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputRule;
    dialogMessageFlag = false;
    messageDetailFlag = false;
    takhsisFlag = false;
    messagesList = [];
    ruleList = [];
    codeMessage;
    titleMessage;
    tableIdMessage;
    typeMessage;
    textMessage;
    textENMessage;
    messageId;
    name;
    title;
    text;
    addFlag = false;
    updateFlag = false;
    rulConditionFlag = false;
    moduleType;
    registerTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    ruleDto;
    detailsBreadObject = [];
    moduleBase;
    moduleTitle;
    partyTitle;
    clientName;
    tempRule;
    items;
    widthName;
    widthTitle;
    statusCodeOptions = ApiGatewayConstants.statusCode;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    widthCode;
    widthTableId;
    widthText;
    statusCode=null;
    tableId;
    code;
    first: number = 0;
    rows: number = 10;
    first2: number = 0;
    rows2: number = 10;
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private primeng: PrimeNG,
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
                        isActive1: true,
                        img_index1: 'assets/icons/rule.png',
                    },
                    { label_index2: null, label_Detail_index2: null },
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
        this.detailsBreadObject = this.chooseBread('rulesBase');
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );

        this.primeng.ripple.set(true);
        this.items = [
            {
                items: [
                    {
                        label:this.transloco.translate('contextMenu.Conditions'),
                        icon: '',
                        command: () => {
                            this.showRuleCondition(this.tempRule);
                        },
                    },
                    {
                        label:this.transloco.translate('contextMenu.Edit'),
                        command: () => {
                            this.showUpdate(this.tempRule);
                        },
                    },
                ],
            },
            {
                label: '____________________________',
                items: [
                    {
                        label:this.transloco.translate('contextMenu.cancel'),
                    },
                ],
            },
        ];
        this.search();
        if (this.inputRule != undefined) {
            this.name = this.inputRule.name;
            this.title = this.inputRule.title;
            this.moduleTitle = this.inputRule.moduleTitle;
            this.partyTitle = this.inputRule.partyTitle;
            this.clientName = this.inputRule.clientName;
        }
        if (this.code) {
            this.code.length > 22
                ? (this.widthCode = 100)
                : (this.widthCode = 50);
        }
        if (this.name) {
            this.name.length > 22
                ? (this.widthName = 100)
                : (this.widthName = 50);
        }
        if (this.title) {
            this.title.length > 22
                ? (this.widthTitle = 100)
                : (this.widthTitle = 50);
        }
    }

    showAdd() {
        this.addFlag = true;
    }

    onKeydownSearch(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.search();
        }
    }

    onKeydownSearchMessage(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.messageSearch();
        }
    }

    selectedMessage(message) {
        this.messageId = '';
        this.messageDetailFlag = true;
        this.dialogMessageFlag = false;
        this.messagesList = [];
        this.messageId = message.messageId;
        this.text = message.text;
        this.title = message.title;
        this.tableId = message.tableId;
        this.code = message.code;
        this.takhsisFlag = true;
        this.search();
    }

    selectedRule() {}

    showRuleCondition(rule: any) {
        debugger
        this.ruleDto = {
            ruleTemplate: null,
            errorText: '',
            httpsstatus: '',
            name: '',
            messageId: null,
            ruleId: null,
            ruleBase: null,
        };
        debugger
        this.ruleDto = rule;
        this.ruleDto.ruleBase = true;
        this.apiGatewayService.updateApprovalRuleId(rule.ruleId);
        this.rulConditionFlag = true;
    }

    search() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .rulesearch(this.name, this.statusCode, this.messageId)
            .subscribe(
                (a) => {
                    this._primengProgressBarService.hide();
                    this.ruleList = Array.isArray(a) ? a : [a];
                    this.ruleList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    for (let k = 0; k < this.ruleList.length; k++) {
                        this.ruleList[k] = Object.assign(this.ruleList[k], {
                            row: k + 1,
                        });
                    }
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    clear() {
        this.name = '';
        this.statusCode = '';
        this.messageId = '';
        this.title = '';
        this.codeMessage = '';
        this.titleMessage = '';
        this.textMessage = '';
        this.textENMessage = '';
        this.tableIdMessage = '';
        this.typeMessage = '';
        this.search();
    }

    validationMessage(): boolean {
        if (!this.codeMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate('rule.dialog.message.chooseCodeMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.titleMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate('rule.dialog.message.chooseTitleMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.textMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate('rule.dialog.message.chooseFaMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.tableIdMessage) {
            this.notifierService.showError({
                detail:  this.transloco.translate('rule.dialog.message.chooseTableId'),
                life: 3000,
            });
            return false;
        } else if (!this.typeMessage) {
            this.notifierService.showError({
                detail:  this.transloco.translate('rule.dialog.message.chooseTypeMessages'),
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

                        this.dialogMessageFlag = false;
                        this.search();
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
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
            ruleId: null,
        };
        this.ruleDto = rule;
        this.updateFlag = true;
    }

    onClose(event) {
        this.scrollTop();
        this.detailsBreadObject = [
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
                isActive1: true,
                img_index1: 'assets/icons/rule.png',
            },
            { label_index2: null, label_Detail_index2: null },
            { label_index3: null, label_Detail_index3: null },
            { label_index4: null, label_Detail_index4: null },
            { label_index5: null, label_Detail_index5: null },
            { label_index6: null, label_Detail_index6: null },
        ];
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );

        if (event == 'close') {
            this.addFlag = false;
            this.updateFlag = false;
            this.rulConditionFlag = false;
        } else if (event == 'closeAndCreate') {
            this.addFlag = false;
            this.updateFlag = false;
            this.rulConditionFlag = false;
            this.search();
        }
    }

    messageSearch() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .messagesearch(
                this.statusCode,
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

    setRecord(rule) {
        this.tempRule = rule;
    }

    BeforeButton() {
        this.close.emit('close');
    }
}
