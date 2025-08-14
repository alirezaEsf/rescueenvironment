import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiGatewayConstants} from "../../../../constants/ApiGatewayConstants";
import {ActivatedRoute} from "@angular/router";
import { MessagesApiFacadeService } from '../../../../services/messages-api-facade.service';
import { ApiGatewayService } from '../../../../services/api-gateway.service';
import { FuseLoadingService } from '../../../../../../../@fuse/services/loading';
import { ToastService } from '../../../../../shared/services/ToastService';
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
import { MessagesCategoryPipe } from '../../../../../shared/pipes/messagesCategory.pipe';
import { Card } from 'primeng/card';
import { TableIdPipe } from '../../../../../shared/pipes/tableId.pipe';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { KeyFilter } from 'primeng/keyfilter';

@Component({
    selector: 'app-api-rule-condition-update',
    templateUrl: './api-rule-condition-update.component.html',
    styleUrls: ['./api-rule-condition-update.component.scss'],
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
        MessagesCategoryPipe,
        Card,
        TableIdPipe,
        ToggleSwitch,
        Toast,
        KeyFilter,
    ],
})
export class ApiRuleConditionUpdateComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputUpdate;
    cust_alphanumEn: RegExp = ApiGatewayConstants.cust_alphanumEn;
    cust_alphanumFa: RegExp = ApiGatewayConstants.cust_alphanumFa;
    conditionTypeOptions = ApiGatewayConstants.conditionType;
    conditionFieldTypeOptions = ApiGatewayConstants.conditionFieldType;
    ruleConditionOptions = ApiGatewayConstants.conditions;
    functiontypeOptions = ApiGatewayConstants.functionType;
    conditionType;
    conditionName;
    conditionFieldType;
    conditionValue;
    messageId;
    status;
    conditionValuePKeyFilter:string|RegExp=null
    removeMessage = false;
    messageDetailFlag = false;
    ruleCondition;
    dialogMessageFlag = false;
    messagesList = [];
    title;
    tableId;
    text;
    codeMessage;
    titleMessage;
    tableIdMessage;
    typeMessage;
    textMessage;
    textENMessage;
    functionType: number = null;
    categoryMessages = ApiGatewayConstants.categoryMessages;
    typeMessages = ApiGatewayConstants.typeMessages;
    widthTitle;
    widthMessageId;
    widthTableId;
    widthText;
    registerMessageTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    updateRulConditionObject = {
        ruleId: null,
        ruleCondition: null,
        conditionValue: '',
        conditionType: null,
        conditionName: '',
        conditionFieldType: null,
        messageId: null,
        status: null,
        ruleConditionId: null,
        functionType: null,
    };
    first: number = 0;
    rows: number = 10;
    paginationLabel=this.transloco.translate('label.pagination.table');
    detailsBreadObject=[]
    constructor(
        private route: ActivatedRoute,
        private transloco :TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private apiGatewayService: ApiGatewayService,
        private _primengProgressBarService: FuseLoadingService,
        private notifierService: ToastService
    ) {}

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            if (element) element.scrollIntoView(true);
        });
    }
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
    ngOnInit(): void {
        debugger
        console.log('detailsBreadObject',this.inputUpdate.detailsBreadObject);
        this.scrollTop();
        this.conditionName = this.inputUpdate.conditionName;
        this.conditionValue = this.inputUpdate.conditionValue;
        this.messageId = this.inputUpdate.messageId;
        this.inputUpdate.status == 1 ? (this.status = true) : (this.status = false);

        this.inputUpdate.conditionFieldType != undefined
            ? (this.conditionFieldType =    this.inputUpdate.conditionFieldType.toString())
            : (this.conditionFieldType = this.inputUpdate.conditionFieldType);

        this.inputUpdate.ruleCondition != undefined
            ? (this.ruleCondition = this.inputUpdate.ruleCondition.toString())
            : (this.ruleCondition = this.inputUpdate.ruleCondition);

        this.inputUpdate.conditionType != undefined
            ? (this.conditionType = this.inputUpdate.conditionType.toString())
            : (this.conditionType = this.inputUpdate.conditionType);

        this.inputUpdate.functionType != undefined
            ? (this.functionType = this.inputUpdate.functionType.toString())
            : (this.functionType = this.inputUpdate.functionType);

        if (this.inputUpdate.messageId !== null) {
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .getbymessageId(this.inputUpdate.messageId)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        this.titleMessage = a.title;
                        ////console.log(a.tableId)
                        this.textMessage = a.text;
                        this.textMessage = a.textEN;
                        a.tableId != undefined
                            ? (this.tableIdMessage = a.tableId.toString())
                            : (this.tableIdMessage = a.tableId);

                        a.code != undefined
                            ? (this.codeMessage = a.code.toString())
                            : (this.codeMessage = a.code);

                        a.type != undefined
                            ? (this.typeMessage = a.type.toString())
                            : (this.typeMessage = a.type);

                        a.text != undefined
                            ? (this.title = a.text.toString())
                            : (this.title = a.text);
                        a.tableId != undefined
                            ? (this.tableId = a.tableId.toString())
                            : (this.tableId = a.tableId);
                        a.text != undefined
                            ? (this.text = a.text.toString())
                            : (this.text = a.text);
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


        debugger
        if(this.inputUpdate!=undefined){
            debugger
            if (this.inputUpdate?.ruleBase) {
                debugger
                this.detailsBreadObject=this.inputUpdate.detailsBreadObject
                this.detailsBreadObject[3].index3 =3
                this.detailsBreadObject[3].label_index3 =this.transloco.translate('editCondition.header.editConditionRule')
                this.detailsBreadObject[3].img_index3 = 'assets/icons/update.png'
                this.detailsBreadObject[3].rout_index3 ='/updete'
                this.detailsBreadObject[3].isActive3 =true
                this.detailsBreadObject[3].isActive2 =true
                this.detailsBreadObject[3].label_Detail_index3 =null
            }else {
             /*   this.detailsBreadObject=this.inputUpdate.detailsBreadObject
                this.detailsBreadObject[6].index6 =6
                this.detailsBreadObject[6].label_index6 =this.transloco.translate('editCondition.header.editConditionRule')
                this.detailsBreadObject[6].img_index6 = 'assets/icons/update.png'
                this.detailsBreadObject[6].rout_index6 ='/save'
                this.detailsBreadObject[6].isActive6 =true
                this.detailsBreadObject[6].isActive5 =true
                this.detailsBreadObject[6].label_Detail_index6 =null*/
                //غیر قواعد
            }
        }


        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
    }

    showMessage() {
        this.dialogMessageFlag = true;
        this.messagesList = [];
        this.search();
    }

    deleteMessage() {
        this.removeMessage = true;
        this.title = null;
        this.text = null;
        this.tableId = null;
        this.messageId = null;
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
            this.apiGatewayService.currentApprovalStageRuleId.subscribe((a) => {
                this.updateRulConditionObject.ruleId = a;
            });
            this.updateRulConditionObject.ruleConditionId =
                this.inputUpdate.ruleConditionId;

            this.updateRulConditionObject.ruleCondition = this.ruleCondition;
            this.updateRulConditionObject.conditionValue = this.conditionValue;
            this.updateRulConditionObject.conditionType = this.conditionType;
            this.updateRulConditionObject.conditionName = this.conditionName;
            this.updateRulConditionObject.conditionFieldType =
                this.conditionFieldType;
            this.functionType != null
                ? (this.updateRulConditionObject.functionType = Number(
                      this.functionType
                  ))
                : (this.updateRulConditionObject.functionType = null);
            this.status == true
                ? (this.updateRulConditionObject.status = 1)
                : (this.updateRulConditionObject.status = 2);
            this.updateRulConditionObject.messageId = null;
            if (!this.removeMessage) {
                this.messageId != null
                    ? (this.updateRulConditionObject.messageId = this.messageId)
                    : (this.updateRulConditionObject.messageId = null);
            }
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .registerRuleCondition(this.updateRulConditionObject)
                .subscribe((a) => {
                    this._primengProgressBarService.hide();
                    this.close.emit('closeAndCreate');
                });
        }
    }

    search() {
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

    onRegisterMessage() {
        if (this.validationMessage()) {
            this.messageId = '';
            this.messagesList = [];

            this.registerMessageTemp.code = this.codeMessage;
            this.registerMessageTemp.title = this.titleMessage;
            this.registerMessageTemp.type = this.typeMessage;
            this.registerMessageTemp.text = this.textMessage;
            this.registerMessageTemp.textEN = this.textENMessage;
            this.registerMessageTemp.tableId = this.tableIdMessage;
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

    clear() {
        this.codeMessage = '';
        this.titleMessage = '';
        this.tableIdMessage = '';
        this.typeMessage = '';
        this.textMessage = '';
        this.textENMessage = '';
        this.search();
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

    validationMessage(): boolean {
        if (!this.codeMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate('editCondition.message.enterCodeMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.titleMessage) {
            this.notifierService.showError({
                detail:this.transloco.translate('editCondition.message.enterTitleMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.textMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate('editCondition.message.enterFaMessage'),
                life: 3000,
            });
            return false;
        } else if (!this.tableIdMessage) {
            this.notifierService.showError({
                detail: this.transloco.translate('editCondition.message.enterTableId'),
                life: 3000,
            });
            return false;
        } else if (!this.typeMessage) {
            this.notifierService.showError({
                detail:this.transloco.translate('editCondition.message.enterTypeMessages'),
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    validation(): boolean {
        if (!this.conditionType) {
            this.notifierService.showError({
                detail: this.transloco.translate('editCondition.message.enterConditionType'),
                life: 3000,
            });
            return false;
        } else if (!this.conditionName) {
            this.notifierService.showError({
                detail: this.transloco.translate('editCondition.message.enterConditionName'),
                life: 3000,
            });
            return false;
        } else if (!this.conditionFieldType) {
            this.notifierService.showError({
                detail:this.transloco.translate('editCondition.message.enterConditionFieldType'),
                life: 3000,
            });
            return false;
        } else if (!this.conditionValue) {
            this.notifierService.showError({
                detail: this.transloco.translate('editCondition.message.enterConditionValue'),
                life: 3000,
            });
            return false;
        } else if (!this.ruleCondition) {
            this.notifierService.showError({
                detail: this.transloco.translate('editCondition.message.enterRuleCondition'),
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }
}
