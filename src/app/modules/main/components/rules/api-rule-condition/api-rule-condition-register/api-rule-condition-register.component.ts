import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {ApiGatewayConstants} from "../../../../constants/ApiGatewayConstants";
import {ActivatedRoute} from "@angular/router";
import { FuseLoadingService } from '../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../shared/services/ToastService';
import { ApiGatewayService } from '../../../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../../../services/messages-api-facade.service';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../../shared/pipes/moreChar19.pipe';
import { ModuleTypePipe } from '../../../../../shared/pipes/moduleType.pipe';
import { HistoryMoreCharPipe } from '../../../../../shared/pipes/historyMoreChar.pipe';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { IsApprovalPipe } from '../../../../../shared/pipes/isApproval.pipe';
import { StatusPipe } from '../../../../../shared/pipes/status.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { MediatorsJsonComponent } from '../../../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../../../mediators/mediators.component';
import { NodeChangeListComponent } from '../../../node-change-list/node-change-list.component';
import { Dialog } from 'primeng/dialog';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import {
    HeaderEndpointRegisterComponent
} from '../../../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import { TableIdPipe } from '../../../../../shared/pipes/tableId.pipe';
import { MessagesCategoryPipe } from '../../../../../shared/pipes/messagesCategory.pipe';
import { Card } from 'primeng/card';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { KeyFilter } from 'primeng/keyfilter';

@Component({
    selector: 'app-api-rule-condition-register',
    templateUrl: './api-rule-condition-register.component.html',
    styleUrls: ['./api-rule-condition-register.component.scss'],
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
        TableIdPipe,
        MessagesCategoryPipe,
        Card,
        ToggleSwitch,
        Toast,
        KeyFilter,
    ],
})
export class ApiRuleConditionRegisterComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputreg;
    cust_alphanumEn: RegExp = ApiGatewayConstants.cust_alphanumEn;
    cust_alphanumFa: RegExp = ApiGatewayConstants.cust_alphanumFa;
    conditionTypeOptions = ApiGatewayConstants.conditionType;
    conditionFieldTypeOptions = ApiGatewayConstants.conditionFieldType;
    ruleConditionOptions = ApiGatewayConstants.conditions;
    functionTypeOptions = ApiGatewayConstants.functionType;
    functionType: number = null;
    conditionType: string = null;
    conditionName: string = null;
    conditionFieldType: string = null;
    conditionValue: string = null;
    conditionValuePKeyFilter:string|RegExp=null
    messageId: number = null;
    status;
    messageDetailFlag = false;
    ruleCondition: number = null;
    dialogMessageFlag = false;
    messagesList = [];
    title;
    tableId;
    text;
    codeMessage: string = null;
    titleMessage: string = null;
    tableIdMessage: string = null;
    typeMessage: string = null;
    textMessage: string = null;
    textENMessage: string = null;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    widthTitle;
    widthTableId;
    widthText;
    widthMessageId;
    removeMessage = false;
    registerMessageTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
        messageId: null,
    };
    registerRulConditionObject = {
        ruleId: null,
        ruleCondition: null,
        conditionValue: '',
        conditionType: null,
        conditionName: '',
        conditionFieldType: null,
        messageId: null,
        status: null,
        functionType: null,
    };
    first: number = 0;
    rows: number = 10;
    paginationLabel=this.transloco.translate('label.pagination.table');
    detailsBreadObject=[]
    constructor(
        private route: ActivatedRoute,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private transloco :TranslocoService,
        private apiGatewayService: ApiGatewayService,
        private _primengProgressBarService: FuseLoadingService,
        private notifierService: ToastService
    ) {}
    getKeyFilterRegex(e) {debugger
        if (e.value == 1) {
            debugger
            // فقط حروف (اعداد غیر مجاز)
            this.conditionValue=''
            this.conditionValuePKeyFilter=  'int';

        } else if (e.value == 2) {
            debugger
            // فقط اعداد
            this.conditionValue=''
            this.conditionValuePKeyFilter= '^[^0-9]*$';

        } else {
            // همه چیز مجاز باشد
            this.conditionValuePKeyFilter=  '.*';
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
        this.tableIdMessage = '8';
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
            if (this.messageId.toString().length > 22) {
                this.widthMessageId = 100;
            }
        }

        if(this.inputreg!=undefined){
              debugger
            if (this.inputreg?.ruleBase) {
                this.detailsBreadObject=this.inputreg.detailsBreadObject
            /*    this.detailsBreadObject=this.inputreg.detailsBreadObject
                this.detailsBreadObject[3].index3 =3
                this.detailsBreadObject[3].label_index3 =this.transloco.translate('registerCondition.header.editConditionRule')
                this.detailsBreadObject[3].img_index3 = 'assets/icons/save.png'
                this.detailsBreadObject[3].rout_index3 ='/save'
                this.detailsBreadObject[3].isActive3 =true
                this.detailsBreadObject[3].isActive2 =true
                this.detailsBreadObject[3].label_Detail_index3 =null*/
            }else {
               /* this.detailsBreadObject=this.inputreg.detailsBreadObject
                this.detailsBreadObject[6].index6 =6
                this.detailsBreadObject[6].label_index6 =this.transloco.translate('registerCondition.header.editConditionRule')
                this.detailsBreadObject[6].img_index6 = 'assets/icons/save.png'
                this.detailsBreadObject[6].rout_index6 ='/save'
                this.detailsBreadObject[6].isActive6 =true
                this.detailsBreadObject[6].isActive5 =true
                this.detailsBreadObject[6].label_Detail_index6 =null*/
                //غیر قواعد
            }
        }

    }

    deleteMessage() {
        this.removeMessage = true;
        this.title = null;
        this.text = null;
        this.tableId = null;
        this.messageId = null;
    }

    showMessage() {
        debugger
        this.dialogMessageFlag = true;
        this.messagesList = [];
        this.search();
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

    selectedMessage(message) {
        this.messageId = null;
        this.messageDetailFlag = true;
        this.dialogMessageFlag = false;
        this.messagesList = [];

        this.messageId = message.messageId;
        this.title = message.title;
        this.text = message.text;
        this.tableId = message.tableId;
    }

    onCancel() {
        this.close.emit('close');
    }

    search() {
        debugger
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .messagesearch(
                this.codeMessage,
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
        this.codeMessage = '';
        this.titleMessage = '';
        this.tableIdMessage = '';
        this.typeMessage = '';
        this.textMessage = '';
        this.textENMessage = '';
        this.search();
    }

    onRegisterMessage() {
        if (this.validationMessage()) {
            this.messagesList = [];
            this.registerMessageTemp.code = this.codeMessage;
            this.registerMessageTemp.title = this.titleMessage;
            this.registerMessageTemp.type = this.typeMessage;
            this.registerMessageTemp.text = this.textMessage;
            this.registerMessageTemp.textEN = this.textENMessage;
            this.registerMessageTemp.tableId = this.tableIdMessage;
            if (!this.removeMessage) {
                this.messageId != null
                    ? (this.registerMessageTemp.messageId = this.messageId)
                    : (this.registerMessageTemp.messageId = null);
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerMessage(this.registerMessageTemp)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.messageId = a.messageId;
                        this.title = a.title;
                        this.text = a.text;
                        this.tableId = a.tableId;
                        this.messageDetailFlag = true;
                        this.dialogMessageFlag = false;
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
        }
    }

    onRegister() {
        if (this.validation()) {
            this.apiGatewayService.currentApprovalStageRuleId.subscribe((a) => {
                this.registerRulConditionObject.ruleId = a;

                ////console.log("ruleId")
                ////console.log(this.registerRulConditionObject.ruleId)
                ////console.log(a)
            });

            this.messageId !== null
                ? (this.registerRulConditionObject.messageId = this.messageId)
                : (this.registerRulConditionObject.messageId = null);
            this.registerRulConditionObject.ruleCondition = this.ruleCondition;
            this.functionType != null
                ? (this.registerRulConditionObject.functionType = Number(
                      this.functionType
                  ))
                : (this.registerRulConditionObject.functionType = null);
            this.registerRulConditionObject.conditionValue =
                this.conditionValue;
            this.registerRulConditionObject.conditionType = this.conditionType;
            this.registerRulConditionObject.conditionName = this.conditionName;
            this.registerRulConditionObject.conditionFieldType =
                this.conditionFieldType;
            this.status == true
                ? (this.registerRulConditionObject.status = 1)
                : (this.registerRulConditionObject.status = 2);
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerRuleCondition(this.registerRulConditionObject)
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

    validation(): boolean {
        if (!this.conditionType) {
            this.notifierService.showError({
                detail:this.transloco.translate('registerCondition.message.enterConditionType'),
                life: 3000,
            });
            return false;
        } else if (!this.conditionName) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerCondition.message.enterConditionName'),
                life: 3000,
            });
            return false;
        } else if (!this.conditionFieldType) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerCondition.message.enterConditionFieldType'),
                life: 3000,
            });
            return false;
        } else if (!this.conditionValue) {
            this.notifierService.showError({
                detail: this.transloco.translate('registerCondition.message.enterConditionValue'),
                life: 3000,
            });
            return false;
        } else if (!this.ruleCondition) {
            this.notifierService.showError({
                detail:  this.transloco.translate('registerCondition.message.enterRuleCondition'),
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
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
                detail:this.transloco.translate('rule.dialog.message.chooseTitleMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.textMessage) {
            this.notifierService.showError({
                detail:this.transloco.translate('rule.dialog.message.chooseFaMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.tableIdMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate('rule.dialog.message.chooseTableId'),
                life: 3000,
            });
            return false;
        } else if (!this.typeMessage) {
            this.notifierService.showError({
                detail:this.transloco.translate('rule.dialog.message.chooseTypeMessages'),
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }
}
