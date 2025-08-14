import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
import { FuseLoadingService } from '../../../../../../../../@fuse/services/loading';
import { MessagesApiFacadeService } from '../../../../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../../../../services/api-gateway.service';
import { ToastService } from '../../../../../../shared/services/ToastService';
import { PrimeNG } from 'primeng/config';
import { FormatRulePipe } from '../../../../../../shared/pipes/FormatRule.pipe';
import { ApiRuleRegisterComponent } from '../../../../rules/api-rule-register/api-rule-register.component';
import { ApiRuleUpdateComponent } from '../../../../rules/api-rule-update/api-rule-update.component';
import { ApiRuleConditionComponent } from '../../../../rules/api-rule-condition/api-rule-condition.component';
import { Card } from 'primeng/card';
import { RuleTemplatePipe } from '../../../../../../shared/pipes/ruleTemplate.pipe';
import { Toast } from 'primeng/toast';


@Component({
    selector: 'app-api-rule',
    templateUrl: './api-rule.component.html',
    styleUrls: ['./api-rule.component.scss'],
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
        RuleTemplatePipe,
        Toast,
    ],
})
export class ApiRuleComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputApiRule;
    name;
    title;
    addFlag = false;
    updateFlag = false;
    rulConditionFlag = false;
    moduleType;
    rulList = [];
    ruleDto;
    detailsBreadObject = [];
    moduleBase;
    accessBase;
    partyBase;
    moduleTitle;
    partyTitle;
    clientName;
    clientBase;
    apiId;
    tempRule;
    items;
    widthName;
    widthTitle;
    ruleAttachList;
    dialogRuleFlag;
    ruleName;
    attachFlag = false;
    ruleTemp = {
        apiId: null,
        ruleId: null,
    };
    first: number = 0;
    rows: number = 10;
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private _primengProgressBarService: FuseLoadingService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private primeng: PrimeNG,
        private transloco :TranslocoService,
        private notifierService: ToastService
    ) {}

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    chooseBread(caseBase: any) {
        switch (caseBase) {
            case 'clientBase':
                return [
                    {
                        index: 0,
                        label_index0: 'کلاینت',
                        rout_index0: '/client',
                        isActive0: false,
                        img_index0: 'assets/icons/client.png',
                    },
                    {
                        index: 1,
                        label_index1: 'لیست دسترسی',
                        rout_index1: '/api-gateway/access-list',
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                        label_Detail_index1: '(' + this.clientName + ')',
                    },
                    {
                        index: 4,
                        label_index4: 'سرویس',
                        rout_index4: null,
                        isActive4: false,
                        label_Detail_index4: '(لیست دسترسی)',
                        img_index4: 'assets/icons/api.png',
                    },
                    {
                        index: 5,
                        label_index5: 'قواعد',
                        rout_index5: null,
                        isActive5: true,
                        label_Detail_index5: '(' + this.title + ')',
                        img_index5: 'assets/icons/rule.png',
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
                        label_index1: 'ماژول',
                        rout_index1: '/module',
                        isActive1: false,
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'قواعد',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.title + ')',
                        img_index3: 'assets/icons/rule.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'accessBase':
                return [

                    {
                        index: 0,
                        label_index0: 'لیست دسترسی',
                        rout_index0: '/api-gateway/access-list',
                        isActive0: false,
                        img_index0: 'assets/icons/access.png',
                        label_Detail_index0: '(' + this.clientName + ')',
                    },
                    {
                        index: 1,
                        label_index1: 'سرویس',
                        rout_index1: null,
                        isActive1: false,
                        img_index1: 'assets/icons/api.png',
                        label_Detail_index1: '(' + this.moduleTitle + ')',
                    },
                    {
                        index: 2,
                        label_index2: 'قواعد',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.title + ')',
                        img_index2: 'assets/icons/rule.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
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
                    },
                    {
                        index: 1,
                        label_index1: 'سازمان',
                        rout_index1: '/party',
                        isActive1: false,
                        img_index1: 'assets/icons/party.png',
                    },
                    {
                        index: 2,
                        label_index2: 'ماژول',
                        rout_index2: '',
                        isActive2: false,
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3: 'سرویس',
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: 'قواعد',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.title + ')',
                        img_index4: 'assets/icons/rule.png',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            default:
                return null;
        }
    }

    ngOnInit(): void {
        debugger
        debugger
        debugger
        this.scrollTop();
        if (this.inputApiRule != undefined) {
            debugger
            this.name = this.inputApiRule.name;
            this.title = this.inputApiRule.title;
            this.moduleTitle = this.inputApiRule.moduleTitle;
            this.partyTitle = this.inputApiRule.partyTitle;
            this.clientName = this.inputApiRule.clientName;
            this.clientBase = this.inputApiRule.clientBase;
            this.moduleBase = this.inputApiRule.moduleBase;
            this.accessBase = this.inputApiRule.accessBase;
            this.partyBase = this.inputApiRule.partyBase;
            this.inputApiRule.clientBase;
            this.apiId = this.inputApiRule.apiId;
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        }
        this.primeng.ripple.set(true);
        this.items = [
            {
                items: [
                    {
                        label: 'شرایط قاعده سرویس',
                        icon: '',
                        command: () => {
                            this.showRuleCondition(this.tempRule);
                        },
                    },
                    {
                        label: this.transloco.translate('contextMenu.Edit'),
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
                        label: this.transloco.translate('contextMenu.cancel'),
                    },
                ],
            },
        ];
        this.searchRule(this.apiId);

        if (this.name.length > 22) {
            this.widthName = 100;
        }
        if (this.title.length > 22) {
            this.widthTitle = 100;
        }
    }

    clear() {
        this.ruleName = '';
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.rulesearch().subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                this.ruleAttachList = a;
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    showRules() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.rulesearch(this.ruleName).subscribe(
            (c) => {
                this._primengProgressBarService.hide();
                this.ruleAttachList = c;
                this.dialogRuleFlag = true;
            },
            (error) => {
                this._primengProgressBarService.hide();
            }
        );
    }

    selectedRule(rule) {
        this.ruleTemp = {
            apiId: null,
            ruleId: null,
        };
        this.ruleName = '';
        this.ruleTemp.apiId = this.apiId;
        this.ruleTemp.ruleId = rule.ruleId;

        console.log(rule, 'rule');
        console.log(this.rulList, 'this.rulList');
        console.log(this.rulList.length, 'this.rulList.length');
        if (this.rulList.length == 0) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerRuleAttach(this.ruleTemp)
                .subscribe(
                    (l) => {
                        this._primengProgressBarService.hide();
                        this.dialogRuleFlag = false;

                        this.searchRule(this.apiId);
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        } else {
            this.dialogRuleFlag = false;
            this.notifierService.showError({
                detail: 'یک قاعده متصل به سرویس مورد نظر وجود دارد!',
                life: 3000,
            });
        }
        /*     for (let i = 0; i < this.rulList.length; i++) {
                 if (this.clientList[i].clientId == client.clientId) {
                     this.dubFlag = false
                 }
             }
             if (this.dubFlag) {
                 this.clientList.push(this.clientTemp)
             } else {
                 this.notifierService.showError({detail: "این کلاینت قبلا به لیست اتصال اضافه شده است!", life: 3000});
             }*/
        /*
            this.clientTemp.allowedAccountno = client.allowedAccountno
            this.clientTemp.clientId = client.clientId
            this.clientTemp.digitalPublickey = client.digitalPublickey
            this.clientTemp.mobileNo = client.mobileNo
            this.clientTemp.name = client.name
            this.clientTemp.organizationCode = client.organizationCode
            this.clientTemp.publicKey = client.publicKey
            this.clientTemp.status = client.status
            this.messagesApiFacadeService.randomapikey().subscribe(f => {
                this.clientTemp.apikey = f
                for (let i = 0; i < this.clientList.length; i++) {
                    if (this.clientList[i].clientId == client.clientId) {
                        this.dubFlag = false
                    }
                }
                if (this.dubFlag) {
                    this.clientList.push(this.clientTemp)
                } else {
                    this.notifierService.showError({detail: "این کلاینت قبلا به لیست اتصال اضافه شده است!", life: 3000});
                }

                //console.log(this.clientList, 'bad')
            })*/
    }

    showRuleCondition(rule: any) {
        debugger

        this.ruleDto = {
            ruleTemplate: null,
            errorText: '',
            status: null,
            httpsstatus: '',
            name: '',
            messageId: null,
            apiId: null,
            ruleId: null,
            moduleBase: null,
            partyTitle: null,
            moduleTitle: null,
            apiTitle: null,
            clientName: null,
            clientBase: null,
            accessBase: null,
            partyBase: null,
            apiName: null,
            ruleBase: null,
        };

        this.apiGatewayService.updateApprovalRuleId(rule.ruleId);
        this.ruleDto = rule;
        this.ruleDto.partyTitle = this.partyTitle;
        this.ruleDto.moduleTitle = this.moduleTitle;
        this.ruleDto.apiTitle = this.title;
        this.ruleDto.clientName = this.clientName;
        this.ruleDto.apiName = this.name;

        this.ruleDto.ruleBase = true;
        this.ruleDto.moduleBase = this.inputApiRule.moduleBase;
        this.ruleDto.clientBase = this.inputApiRule.clientBase;
        this.ruleDto.accessBase = this.inputApiRule.accessBase;
        this.ruleDto.partyBase = this.inputApiRule.partyBase;
        this.rulConditionFlag = true;
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
        if (this.inputApiRule != undefined) {
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            } else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        }
        if (event == 'close') {
            this.addFlag = false;
            this.updateFlag = false;
            this.rulConditionFlag = false;
        } else if (event == 'closeAndCreate') {
            this.addFlag = false;
            this.updateFlag = false;
            this.rulConditionFlag = false;
            this.searchRule(this.apiId);
        }
    }

    searchRule(apiId) {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.ruleFindByApiid(apiId).subscribe(
            (a) => {
                this._primengProgressBarService.hide();
                if (Array.isArray(a)) {
                    this.rulList = a;
                } else {
                    this.rulList.push(a);
                }
                this.rulList.map((x) =>
                    x.status === 1 ? (x.status = true) : (x.status = false)
                );
                for (let k = 0; k < this.rulList.length; k++) {
                    this.rulList[k] = Object.assign(this.rulList[k], {
                        row: k + 1,
                    });
                    /*(this.partyList[k].row = (k+1))*/
                }
                if (this.rulList.length != 0) {
                    this.attachFlag = true;
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
