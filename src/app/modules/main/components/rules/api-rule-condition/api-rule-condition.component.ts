import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { MessagesApiFacadeService } from '../../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../../services/api-gateway.service';
import { FuseLoadingService } from '../../../../../../@fuse/services/loading';
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
import { ThreeDotDetailsPipe } from '../../../../shared/pipes/threeDotDetails.pipe';
import { RuleTemplatePipe } from '../../../../shared/pipes/ruleTemplate.pipe';
import { ConditionTypePipe } from '../../../../shared/pipes/conditionType.pipe';
import { ConditionPipe } from '../../../../shared/pipes/condition.pipe';
import { ConditionFieldTypePipe } from '../../../../shared/pipes/conditionFieldType.pipe';
import { ApiRuleConditionRegisterComponent } from './api-rule-condition-register/api-rule-condition-register.component';
import { ApiRuleConditionUpdateComponent } from './api-rule-condition-update/api-rule-condition-update.component';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-api-rule-condition',
    templateUrl: './api-rule-condition.component.html',
    styleUrls: ['./api-rule-condition.component.scss'],

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
        /*Menu,*/
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
        ThreeDotDetailsPipe,
        RuleTemplatePipe,
        ConditionTypePipe,
        ConditionPipe,
        ConditionFieldTypePipe,
        ApiRuleConditionRegisterComponent,
        ApiRuleConditionUpdateComponent,
        Toast,
    ],

})
export class ApiRuleConditionComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputCondition;
    @Input() inputClientCondition;
    @Input() inputApiRule;
    ruleName;
    hideApi;
    ruleClientBase;
    clientBase;
    partyBase;
    moduleBase;
    accessBase;
    httpsstatus;
    ruleTemplate;
    apiName;
    ruleConditionsList = [];
    registerFlag = false;
    updateFlag = false;
    conditionDto;
    detailsBreadObject = [];
    partyTitle;
    moduleTitle;
    destinationHost;
    apiTitle;
    ruleId;
    clientName;
    widthRuleName;
    widtHttpsstatus;
    widthRuleTemplate;
    widtApiName;
    first: number = 0;
    rows: number = 10;
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private transloco :TranslocoService,
        private _primengProgressBarService: FuseLoadingService
    ) {}

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'rulesBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('menu.basicInfo'),
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                        label_Detail_index0:null
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('menu.rule'),
                        rout_index1: '/rule',
                        isActive1: false,
                        img_index1: 'assets/icons/rule.png',
                        label_Detail_index1:null
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('menu.rule.rulesCondition'),
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.ruleName + ')',
                        img_index2: 'assets/icons/rules condition.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'ruleClientBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('menu.basicInfo'),
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,label_Detail_index0:null
                    },
                    {
                        index: 1,
                        label_index1:  this.transloco.translate('menu.clients'),
                        rout_index1: '',
                        isActive1: false,
                        img_index1: 'assets/icons/client.png',
                        label_Detail_index1:null
                    },
                    {
                        index: 2,
                        label_index2:  this.transloco.translate('menu.clients.rule'),
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.clientName + ')',
                        img_index2: 'assets/icons/rulesClient.png',
                    },
                    {
                        index: 3,
                        label_index3: this.transloco.translate('menu.rule.rulesCondition'),
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.ruleName + ')',
                        img_index3: 'assets/icons/rules condition.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'clientBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('menu.basicInfo'),
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                        label_Detail_index0:null
                    },
                    {
                        index: 1,
                        label_index1:  this.transloco.translate('menu.clients'),
                        rout_index1: '',
                        isActive1: false,
                        img_index1: 'assets/icons/client.png',
                        label_Detail_index1:null
                    },
                    {
                        index: 2,
                        label_index2:  this.transloco.translate('menu.accessList'),
                        rout_index2: '/api-gateway/access-list',
                        isActive2: false,
                        img_index2: 'assets/icons/access.png',
                        label_Detail_index2: '(' + this.clientName + ')',
                    },
                    {
                        index: 3,
                        label_index3:this.transloco.translate('menu.module.api'),
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '('+this.transloco.translate('menu.accessList')+')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: this.transloco.translate('menu.oneRule'),
                        rout_index4: null,
                        isActive4: false,
                        label_Detail_index4: '(' + this.apiName + ')',
                        img_index4: 'assets/icons/rule.png',
                    },
                    {
                        index: 5,
                        label_index5: this.transloco.translate('menu.rule.rulesCondition'),
                        rout_index5: null,
                        isActive5: true,
                        label_Detail_index5: '(' + this.ruleName + ')',
                        img_index5: 'assets/icons/rules condition.png',
                    },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'moduleBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1:  this.transloco.translate('menu.module'),
                        rout_index1: '/api-gateway/home/party/module',
                        isActive1: false,
                        img_index1: 'assets/icons/module.png',
                        label_Detail_index1:null
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('menu.module'),
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3:this.transloco.translate('menu.oneRule'),
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: 'assets/icons/rule.png',
                    },
                    {
                        index: 4,
                        label_index4: this.transloco.translate('menu.rule.rulesCondition'),
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.ruleName + ')',
                        img_index4: 'assets/icons/rulesClient.png',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'partyBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('breadcrumbs.serviceRecipients'),
                        img_index0: 'assets/icons/team.png',
                        rout_index0: '/home',
                        isActive0: false,
                        label_Detail_index0:null
                    },
                    {
                        index: 1,
                        label_index1:  this.transloco.translate('menu.party'),
                        rout_index1: '/party',
                        isActive1: false,
                        img_index1: 'assets/icons/party.png',
                        label_Detail_index1:null
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('menu.module'),
                        rout_index2: '/api-gateway/home/party/module',
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        isActive2: false,
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3:this.transloco.translate('menu.module.api'),
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4:this.transloco.translate('menu.rule'),
                        rout_index4: null,
                        isActive4: false,
                        label_Detail_index4: '(' + this.apiName + ')',
                        img_index4: 'assets/icons/rule.png',
                    },
                    {
                        index: 5,
                        label_index5: this.transloco.translate('menu.rule.rulesCondition'),
                        rout_index5: null,
                        isActive5: true,
                        label_Detail_index5: '(' + this.ruleName + ')',
                        img_index5: 'assets/icons/rules condition.png',
                    },
                    { label_Detail_index6: null, index: 6 },
                ];
            case 'accessBase':
                return [

                    {
                        index: 0,
                        label_index0: this.transloco.translate('menu.accessList'),
                        rout_index0: '/api-gateway/access-list',
                        isActive0: false,
                        img_index0: 'assets/icons/access.png',
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('menu.module.api'),
                        rout_index1: null,
                        isActive1: false,
                        label_Detail_index1: '(' + this.clientName + ')',
                        img_index1: 'assets/icons/api.png',
                    },
                    {
                        index: 2,
                        label_index2: this.transloco.translate('menu.clients'),
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.apiName + ')',
                        img_index2: 'assets/icons/client.png',
                    },
                    {
                        index: 3,
                        label_index3:this.transloco.translate('menu.clients.rule'),
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.clientName + ')',
                        img_index3: 'assets/icons/rulesClient.png',
                    },
                    {
                        index: 4,
                        label_index4: this.transloco.translate('menu.rule.rulesCondition'),
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.ruleName + ')',
                        img_index4: 'assets/icons/rules condition.png',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'clientEndpointBase':
                return [
                    {
                        index: 0,
                        label_index0: this.transloco.translate('menu.basicInfo'),
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: this.transloco.translate('menu.clients'),
                        rout_index1: '',
                        isActive1: false,
                        img_index1: 'assets/icons/client.png',
                    },
                    {
                        index: 2,
                        label_index2:this.transloco.translate('menu.module.api'),
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.clientName + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: this.transloco.translate('menu.clients'),
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.apiName + ')',
                        img_index3: 'assets/icons/client.png',
                    },
                    {
                        index: 4,
                        label_index4: this.transloco.translate('menu.clients.rule'),
                        rout_index4: null,
                        isActive4: false,
                        label_Detail_index4: '(' + this.clientName + ')',
                        img_index4: 'assets/icons/rulesClient.png',
                    },
                    {
                        index: 5,
                        label_index5: this.transloco.translate('menu.rule.rulesCondition'),
                        rout_index5: null,
                        isActive5: true,
                        label_Detail_index5: '(' + this.ruleName + ')',
                        img_index5: 'assets/icons/rules condition.png',
                    },
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
        debugger
        this.scrollTop();
        debugger
        if (this.inputCondition != undefined) {
            this.hideApi = true;
            this.ruleName = this.inputCondition.name;
            this.httpsstatus = this.inputCondition.httpsstatus;
            this.partyTitle = this.inputCondition.partyTitle;
            this.moduleTitle = this.inputCondition.moduleTitle;
            this.apiTitle = this.inputCondition.apiTitle;
            this.ruleTemplate = this.inputCondition.ruleTemplate;
            this.ruleId = this.inputCondition.ruleId;
            this.apiName = this.inputCondition.apiName;
            this.detailsBreadObject = this.chooseBread('rulesBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        else if (this.inputApiRule != undefined) {
            debugger
            debugger
            debugger
            this.hideApi = false;
            this.partyBase = this.inputApiRule.partyBase;
            this.clientBase = this.inputApiRule.clientBase;
            this.accessBase = this.inputApiRule.accessBase;
            this.moduleBase = this.inputApiRule.moduleBase;
            this.ruleName = this.inputApiRule.name;
            this.partyTitle = this.inputApiRule.partyTitle;
            this.moduleTitle = this.inputApiRule.moduleTitle;
            this.destinationHost = this.inputApiRule.destinationHost;
            this.clientName = this.inputApiRule.clientName;
            this.httpsstatus = this.inputApiRule.httpsstatus;
            this.ruleTemplate = this.inputApiRule.ruleTemplate;
            this.ruleClientBase = this.inputApiRule.ruleClientBase;
            this.apiName = this.inputApiRule.apiName;
            this.ruleId = this.inputApiRule.ruleId;
            if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        } else if (this.inputClientCondition != undefined) {
            debugger
            this.clientName = this.inputClientCondition.name;
            this.ruleName = this.inputClientCondition.name;
            this.clientBase = this.inputClientCondition.clientBase;

            this.partyBase = this.inputClientCondition.partyBase;

            this.accessBase = this.inputClientCondition.accessBase;
            this.moduleBase = this.inputClientCondition.moduleBase;
            this.partyTitle = this.inputClientCondition.partyTitle;
            this.moduleTitle = this.inputClientCondition.moduleTitle;
            this.destinationHost = this.inputClientCondition.destinationHost;
            this.clientName = this.inputClientCondition.clientName;
            this.ruleName = this.inputClientCondition.ruleName;
            this.httpsstatus = this.inputClientCondition.httpsstatus;
            this.ruleTemplate = this.inputClientCondition.ruleTemplate;
            this.ruleClientBase = this.inputClientCondition.ruleClientBase;
            this.apiName = this.inputClientCondition.apiName;
            this.ruleId = this.inputClientCondition.ruleId;
            if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
            else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
            else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
            else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
            else if (this.ruleClientBase) {
                this.detailsBreadObject = this.chooseBread('ruleClientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
            if (this.clientBase) {
                this.detailsBreadObject =
                    this.chooseBread('clientEndpointBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        }

        debugger
        this._primengProgressBarService.show();
        this.apiGatewayService.currentApprovalStageApiName.subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                this.apiName = a;
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
        if (this.inputCondition!=undefined){
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.getbyruleid(this.inputCondition.ruleId).subscribe((a) => {
                    debugger
                    this._primengProgressBarService.hide();
                    if (Array.isArray(a)) {
                        this.ruleConditionsList = a;
                    } else {
                        this.ruleConditionsList.push(a);
                    }
                    this.ruleConditionsList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    for (let k = 0; k < this.ruleConditionsList.length; k++) {
                        this.ruleConditionsList[k] = Object.assign(
                            this.ruleConditionsList[k],
                            { row: k + 1 }
                        );
                        /*(this.partyList[k].row = (k+1))*/
                    }
                },
                (error) => {  this._primengProgressBarService.hide();
                });

        }

        if (this.ruleName != undefined) {
            this.ruleName.length > 22
                ? (this.widthRuleName = 100)
                : (this.widthRuleName = 50);
        }
        if (this.ruleTemplate != undefined) {
            this.ruleTemplate.length > 22
                ? (this.widthRuleTemplate = 100)
                : (this.widthRuleTemplate = 50);
        }
        if (this.httpsstatus != undefined) {
            this.httpsstatus.length > 22
                ? (this.widtHttpsstatus = 100)
                : (this.widtHttpsstatus = 50);
        }
    }

    showAdd() {
        this.conditionDto = {
            ruleId: null,
            ruleCondition: null,
            conditionValue: '',
            conditionType: null,
            conditionName: '',
            conditionFieldType: null,
            messageId: null,
            status: null,
            ruleConditionId: null,
            detailsBreadObject : null,
            moduleBase : null,
            clientBase : null,
            accessBase : null,
            partyBase : null,
            ruleBase : null,

        };
        debugger
        if (this.inputApiRule!=undefined){
            this.conditionDto.ruleBase = this.inputApiRule?.ruleBase;
            this.conditionDto.moduleBase = this.inputApiRule?.moduleBase;
            this.conditionDto.clientBase = this.inputApiRule?.clientBase;
            this.conditionDto.accessBase = this.inputApiRule?.accessBase;
            this.conditionDto.partyBase = this.inputApiRule?.partyBase;
        }
        if (this.inputCondition!=undefined){
            this.conditionDto.partyBase = this.inputCondition?.partyBase;
            this.conditionDto.ruleBase = this.inputCondition?.ruleBase;
            this.conditionDto.moduleBase = this.inputCondition?.moduleBase;
            this.conditionDto.clientBase = this.inputCondition?.clientBase;
            this.conditionDto.accessBase = this.inputCondition?.accessBase;
        }
        if (this.inputClientCondition!=undefined){
            this.conditionDto.partyBase = this.inputClientCondition?.partyBase;
            this.conditionDto.ruleBase = this.inputClientCondition?.ruleBase;
            this.conditionDto.moduleBase = this.inputClientCondition?.moduleBase;
            this.conditionDto.clientBase = this.inputClientCondition?.clientBase;
            this.conditionDto.accessBase = this.inputClientCondition?.accessBase;
        }

        this.conditionDto.detailsBreadObject= this.detailsBreadObject
        debugger
        this.registerFlag = true;
    }

    BeforeButton() {
        this.close.emit('close');
    }

    onClose(event) {
        this.scrollTop();

        if (this.accessBase) {
            this.detailsBreadObject = this.chooseBread('accessBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else if (this.clientBase) {
            this.detailsBreadObject = this.chooseBread('clientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else if (this.moduleBase) {
            this.detailsBreadObject = this.chooseBread('moduleBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else if (this.partyBase) {
            this.detailsBreadObject = this.chooseBread('partyBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else if (this.ruleClientBase) {
            this.detailsBreadObject = this.chooseBread('ruleClientBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
        if (event == 'close') {
            this.registerFlag = false;
            this.updateFlag = false;
        } else if (event == 'closeAndCreate') {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService.getbyruleid(this.ruleId).subscribe(
                (a) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(a)) {
                        this.ruleConditionsList = a;
                    } else {
                        this.ruleConditionsList.push(a);
                    }
                    this.ruleConditionsList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    for (let k = 0; k < this.ruleConditionsList.length; k++) {
                        this.ruleConditionsList[k] = Object.assign(
                            this.ruleConditionsList[k],
                            { row: k + 1 }
                        );
                        /*(this.partyList[k].row = (k+1))*/
                    }
                    this.registerFlag = false;
                    this.updateFlag = false;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
        }
        this.detailsBreadObject[3].index3 =3
        this.detailsBreadObject[3].label_index3 =null
        this.detailsBreadObject[3].img_index3 = null
        this.detailsBreadObject[3].rout_index3 =null
        this.detailsBreadObject[3].isActive3 =false
        this.detailsBreadObject[3].isActive2 =true
        this.detailsBreadObject[3].label_Detail_index3 =null
    }

    showUpdate(condition) {
        this.conditionDto = {
            ruleId: null,
            ruleCondition: null,
            conditionValue: '',
            conditionType: null,
            conditionName: '',
            conditionFieldType: null,
            messageId: null,
            status: null,
            ruleConditionId: null,
            detailsBreadObject : null,
        };

        this.conditionDto = condition;
        this.conditionDto.detailsBreadObject= this.detailsBreadObject
        if (this.inputApiRule!=undefined){
            this.conditionDto.ruleBase = this.inputApiRule?.ruleBase;
            this.conditionDto.moduleBase = this.inputApiRule?.moduleBase;
            this.conditionDto.clientBase = this.inputApiRule?.clientBase;
            this.conditionDto.accessBase = this.inputApiRule?.accessBase;
            this.conditionDto.partyBase = this.inputApiRule?.partyBase;
        }
        if (this.inputCondition!=undefined){
            this.conditionDto.partyBase = this.inputCondition?.partyBase;
            this.conditionDto.ruleBase = this.inputCondition?.ruleBase;
            this.conditionDto.moduleBase = this.inputCondition?.moduleBase;
            this.conditionDto.clientBase = this.inputCondition?.clientBase;
            this.conditionDto.accessBase = this.inputCondition?.accessBase;
        }
        if (this.inputClientCondition!=undefined){
            this.conditionDto.partyBase = this.inputClientCondition?.partyBase;
            this.conditionDto.ruleBase = this.inputClientCondition?.ruleBase;
            this.conditionDto.moduleBase = this.inputClientCondition?.moduleBase;
            this.conditionDto.clientBase = this.inputClientCondition?.clientBase;
            this.conditionDto.accessBase = this.inputClientCondition?.accessBase;
        }
        this.updateFlag = true;
    }
}
