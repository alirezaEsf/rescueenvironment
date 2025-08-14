import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ApiGatewayConstants } from '../../../../../../constants/ApiGatewayConstants';
import { TableModule } from 'primeng/table';
import { BreadcrumbsComponent } from '../../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Panel } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Tooltip } from 'primeng/tooltip';
import { MoreChar19Pipe } from '../../../../../../../shared/pipes/moreChar19.pipe';
import { ModuleTypePipe } from '../../../../../../../shared/pipes/moduleType.pipe';
import { HistoryMoreCharPipe } from '../../../../../../../shared/pipes/historyMoreChar.pipe';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { IsApprovalPipe } from '../../../../../../../shared/pipes/isApproval.pipe';
import { StatusPipe } from '../../../../../../../shared/pipes/status.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { MediatorsJsonComponent } from '../../../../../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../../../../../mediators/mediators.component';
import { NodeChangeListComponent } from '../../../../../node-change-list/node-change-list.component';
import { Dialog } from 'primeng/dialog';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { HeaderEndpointRegisterComponent } from '../../../../../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../../../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import { ToastService } from '../../../../../../../shared/services/ToastService';
import { FuseLoadingService } from '../../../../../../../../../@fuse/services/loading';
import { ApiGatewayService } from '../../../../../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../../../../../services/messages-api-facade.service';
import { Fieldset } from 'primeng/fieldset';
import { TieredMenu } from 'primeng/tieredmenu';
import { ProducedNodeComponent } from '../../produced-node/produced-node.component';
import { RequiredNodeComponent } from '../../required-node/required-node.component';
import { Listbox } from 'primeng/listbox';
import { detailTypePipe } from '../../../../../../../shared/pipes/detail-type.pipe';
import { MorChar13Pipe } from '../../../../../../../shared/pipes/morChar13.pipe';
import { MorChar55Pipe } from '../../../../../../../shared/pipes/morChar55.pipe';
import { MorChar32Pipe } from '../../../../../../../shared/pipes/morChar32.pipe';
import { MessagesCategoryPipe } from '../../../../../../../shared/pipes/messagesCategory.pipe';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-sequence-register',
    templateUrl: './sequence-register.component.html',
    styleUrls: ['./sequence-register.component.scss'],
    providers: [ConfirmationService],
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
        Fieldset,
        TieredMenu,
        ProducedNodeComponent,
        RequiredNodeComponent,
        Listbox,
        detailTypePipe,
        MorChar13Pipe,
        MorChar55Pipe,
        MorChar32Pipe,
        MessagesCategoryPipe,
        Toast,
    ],
})
export class SequenceRegisterComponent implements OnInit {

    constructor(
        private notifierService: ToastService,
        private transloco :TranslocoService,
        private apiGatewayService: ApiGatewayService,
        private confirmationService: ConfirmationService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService
    ) {}
    @Input() inputSequenceRegister
    @Output() close = new EventEmitter<string>();
    responseObjSequence=null
    messagesListCusFirst
    messagesListCusTemp
    titleMessageCus
    codeMessageCus
    textMessageCus
    textENMessageCus
    tableIdMessageCus
    typeMessageCus
    titleApiDe
    apiIdDe
    apiIdOrg
    apiTitleOrg
    apiNameOrg
    moduleTitleOrg
    partyTitleOrg
    apiTitle
    nameApiDe
    moduleTitleDe
    moduleTitle
    clientNameDe
    clientName
    partyTitle
    apiId
    priority
    firstSequnceId
    sequnceIdOrg
    secondSequnceId
    firstApiSequnceId
    secondApiSequnceId
    messageId4XXFirst: number = null
    messageId4XXSecond: number = null
    messageId4XXThird: number = null
    messageId5XXFirst: number = null
    messageId5XXSecond: number = null
    messageId5XXThird: number = null
    messageIdForAfterProcess: number = null
    producedNodeFlag: boolean = false
    requiredNodeFlag: boolean = false
    runAsyncFirst: boolean = false
    runAsyncSecond: boolean = false
    runAsyncThird: boolean = false
    preventSecond: boolean = true
    preventThird: boolean = true
    message400Flag: boolean = false
    message500Flag: boolean = false
    messageCusFlag: boolean = false
    disableCusMessage: boolean = true
    partyIdFirst
    moduleIdFirst
    apiIdFirst
    apiTitleFirst
    apiNameFirst
    moduleTitleFirst
    partyTitleFirst
    partyIdSecond
    partyTitleSecond
    moduleIdSecond
    moduleTitleSecond
    apiIdSecond
    apiTitleSecond
    apiNameSecond
    partyIdThird
    partyTitleThird
    moduleIdThird
    moduleTitleThird
    apiIdThird
    apiTitleThird
    apiNameThird
    partyListOptionsFirst = [{title: '-', partyId: null}]
    moduleListOptionsFirst = [{moduleTitle: '-', moduleId: null}]
    apiListOptionsFirst = [{title: '-', apiId: null}]
    partyListOptionsSecond = [{title: '-', partyId: null}]
    moduleListOptionsSecond = [{moduleTitle: '-', moduleId: null}]
    apiListOptionsSecond = [{title: '-', apiId: null}]
    partyListOptionsThird = [{title: '-', partyId: null}]
    moduleListOptionsThird = [{moduleTitle: '-', moduleId: null}]
    apiListOptionsThird = [{title: '-', apiId: null}]
    statusCodeOptions400 = ApiGatewayConstants.statusCode
    statusCodeOptions500 = ApiGatewayConstants.statusCode
    statusCodeOptionsCus = ApiGatewayConstants.statusCode
    categoryMessages400 = ApiGatewayConstants.categoryMessages;
    categoryMessages500 = ApiGatewayConstants.categoryMessages;
    categoryMessagesCus = ApiGatewayConstants.categoryMessages;
    typeMessages400 = ApiGatewayConstants.typeMessages;
    typeMessages500 = ApiGatewayConstants.typeMessages;
    typeMessagesCus = ApiGatewayConstants.typeMessages;
    typeMessage400
    typeMessage500
    first400: number = 0;
    first500: number = 0;
    firstCus: number = 0;
    rows400: number = 10;
    rows500: number = 10;
    rowsCus: number = 10;
    messagesList400First = []
    messagesList400Second = []
    messagesList400Third = []
    messagesList400Temp = []
    messagesList500First = []
    messagesList500Second = []
    messagesList500Third = []
    messagesList500Temp = []
    messageId: number = null
    codeMessage400: string = '400'
    codeMessage500: string = '500'
    codeMessageDe
    messageIdDe
    titleMessageDe
    tableIdDe
    tableIdMessage400
    tableIdMessage500
    apiDto
    titleMessage400
    titleMessage500
    textMessage400
    textMessage500
    textENMessage400
    textENMessage500
    producedListFirst = []
    producedListSecond = []
    producedListThird = []
    matchedList = []
    requiredListFirst = []
    requiredListSecond = []
    requiredListThird = []
    requiredNode
    producedNode
    pointerMatch = null
    title: string = ''
    status: boolean = null
    afterApiFirst: number = null
    afterApiSecond: number = null
    afterApiThird: number = null
    registerTemp = {
        code: '',
        title: '',
        text: '',
        textEN: '',
        type: null,
        tableId: null,
    };
    objSequence = {
        parentId: null,
        apiId: null,
        actionType: null,
        runAsync: null,
        orderId: null,
        title: "",
        messageId4XX: null,
        messageId5XX: null,
        messageIdForAfterProcess: null,
        status: null
    }
    objMatch = {
        producerId: null,
        requiredId: null,
        sequenceId: null,
    }
    afterApiOptionsFirst = [
        {name: '-', code: null},
        {name: 'سرویس اصلی', code: 1},
    ]

    afterApiOptionsSecond = [
        {name: '-', code: null},
        {name: 'سرویس اصلی', code: 1},
        {name: 'سرویس اول', code: 2},
    ]
    afterApiOptionsThird = [
        {name: '-', code: null},
        {name: 'سرویس اصلی', code: 1},
        {name: 'سرویس اول', code: 2},
        {name: 'سرویس دوم', code: 3},
    ]
    tooltipCusBtn = "در صورت اولویت اجرای After فعال خواهد شد"
    icon500_valFirst
    iconCus_valFirst
    icon500_valSecond
    icon500_valThird
    icon400_valFirst
    icon400_valSecond
    icon400_valThird


    actionTypeOptionsFirst = [
        {name: '-', code: null},
        {name: 'Before', code: 1},
        {name: 'After', code: 2},
    ]
    actionTypeOptionsSecond = [
        {name: '-', code: null},
        {name: 'Before', code: 1},
        {name: 'After', code: 2},
    ]
    actionTypeOptionsThird = [
        {name: '-', code: null},
        {name: 'After', code: 2},
    ]
    priorityOptions = [
        {name: '-', code: 0},
        {name: 'سرویس در اولویت اول', code: 1},
        {name: 'سرویس در اولویت دوم', code: 2},
        {name: 'سرویس در اولویت سوم', code: 3},
    ]
    dialogApiFlag: boolean = false
    dialogFirstMatchFlag: boolean = false
    dialogSecondMatchFlag: boolean = false
    dialogThirdMatchFlag: boolean = false
    paginationLabel=this.transloco.translate('label.pagination.table');
    helpFlag: boolean = false
    beforeFlag: boolean = false
    registerFlag: boolean = false
    nextFlag: boolean = true
    clientHidden: boolean = true
    afterApiDisableFirst: boolean = true
    afterApiDisableSecond: boolean = true
    afterApiDisableThird: boolean = true
    firstApi: boolean = false
    secondApi: boolean = false
    thirdApi: boolean = false
    widthTitleApi
    first: number = 0;
    rows: number = 10;
    selectApiFlag: boolean = false
    matchListFirst = []
    matchListSecond = []
    matchListThird = []
    actionTypeFirst: number = null
    actionTypeSecond: number = null
    actionTypeThird: number = null
    thirdPart: boolean = false
    secondPart: boolean = false
    itemsFirst
    itemsDialog
    tempItem: number = null
    tempItemDialog: number = null
    clientBase
    moduleBase
    accessBase
    detailsBreadObject = []
    apiTitleProduced: string = ''
    apiIdProduced: number = null
    apiIdRequired: number = null
    apiTitleRequired: string = ''
    countRequired: number = null
    countProduced: number = null
    apiNumber400
    apiNumberCus
    apiNumber500

    onClose(e) {
        if (this.clientBase) {
            this.detailsBreadObject = this.chooseBread('clientBase')
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        } else if (this.moduleBase) {
            this.detailsBreadObject = this.chooseBread('moduleBase')
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        } else if (this.accessBase) {
            this.detailsBreadObject = this.chooseBread('accessBase')
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        } else if (this.partyTitle != undefined && this.partyTitle != "") {
            this.detailsBreadObject = this.chooseBread('partyBase')
            this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
        }
        this.producedNodeFlag = false
        this.requiredNodeFlag = false
    }

    // ---------------------------------------------
    messageClearCus(apiNumberCus) {
        this.titleMessageCus = ""
        this.textMessageCus = ""
        this.textENMessageCus = ""
        this.tableIdMessageCus = ""
        this.typeMessageCus = ""
        this.messageId = null
        this.messageIdDe = null
        this.messageIdDe = ""
        this.codeMessageDe = ""
        this.titleMessageDe = ""
        this.tableIdDe = ""
        switch (apiNumberCus) {
            case 1:
                this.messageIdForAfterProcess = null
                this.iconCus_valFirst = ''
                this.messageSearchCus(1)
                break
        }
    }

    messageSearchCus(apiNumberCus) {
        this._primengProgressBarService.show()
        this.messagesApiFacadeService.messagesearch(
            this.codeMessageCus, this.titleMessageCus, this.tableIdMessageCus,
            this.typeMessageCus
        ).subscribe(response => {
            this._primengProgressBarService.hide()
            switch (apiNumberCus) {
                case 1:
                    debugger
                    this.messagesListCusFirst = []
                    if (Array.isArray(response)) {
                        this.messagesListCusFirst = response
                        this.messagesListCusTemp = response
                    } else {
                        this.messagesListCusFirst.push(response)
                        this.messagesListCusTemp.push(response)
                    }
                    break
            }
        }, error => {
            this._primengProgressBarService.hide()
        })
    }

    openMessageCus(apiNumberCus) {
        debugger
        switch (apiNumberCus) {
            case 1:
                debugger
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.messagesearch(
                    this.codeMessageCus, this.titleMessageCus, this.tableIdMessageCus, this.typeMessageCus
                ).subscribe(response => {
                    debugger
                    this._primengProgressBarService.hide()
                    if (Array.isArray(response)) {
                        this.messagesListCusFirst = response
                        this.messagesListCusTemp = response
                    } else {
                        this.messagesListCusFirst.push(response)
                        this.messagesListCusTemp.push(response)
                    }
                    debugger
                    let temp = this
                    if (this.messageIdForAfterProcess) {
                        this.messagesListCusFirst = this.messagesListCusFirst.filter(function (x) {

                            return x.messageId === temp.messageIdForAfterProcess;
                        });
                    }
                    debugger
                    this.messagesListCusTemp = this.messagesListCusFirst
                    this.messageCusFlag = true
                    this.apiNumberCus = 1
                }, error => {
                    this._primengProgressBarService.hide()
                })
                break

        }

    }

    onRegisterMessageCus(apiNumberCus) {
        debugger
        if (this.validationMessageCus()) {
            this.messageId = null
            this.registerTemp.code = this.codeMessageCus;
            this.registerTemp.title = this.titleMessageCus;
            this.registerTemp.type = this.typeMessageCus;
            this.registerTemp.text = this.textMessageCus;
            this.registerTemp.textEN = this.textENMessageCus;
            this.registerTemp.tableId = this.tableIdMessageCus;
            this._primengProgressBarService.show()
            this.messagesApiFacadeService.registerMessage(this.registerTemp).subscribe(
                a => {
                    this._primengProgressBarService.hide()
                    this.notifierService.showSuccess({detail: "پیام سفارشی جدید ثبت و انتخاب گردید!", life: 3000});
                    this.codeMessageDe = a.code
                    this.messageIdDe = a.messageId
                    this.titleMessageDe = a.title
                    this.tableIdDe = a.tableId
                    this.messageId = a.messageId
                    this.messageCusFlag = false
                    switch (apiNumberCus) {
                        case 1:
                            debugger
                            this.messageIdForAfterProcess = this.messageIdDe
                            this.messagesListCusFirst = []
                            this._primengProgressBarService.show()
                            this.messagesApiFacadeService.messagesearch(
                                this.codeMessageCus, this.titleMessageCus, this.tableIdMessageCus,
                                this.typeMessageCus
                            ).subscribe(response => {
                                this._primengProgressBarService.hide()
                                if (Array.isArray(response)) {
                                    this.messagesListCusFirst = response
                                    this.messagesListCusTemp = response
                                } else {
                                    this.messagesListCusFirst.push(response)
                                    this.messagesListCusTemp.push(response)
                                }
                                this.iconCus_valFirst = "pi pi-check"
                                let temp = this
                                this.messagesListCusFirst = this.messagesListCusFirst.filter(function (x) {
                                    return x.messageId === temp.messageIdForAfterProcess;
                                });
                                this.messagesListCusTemp = this.messagesListCusFirst
                                this.notifierService.showSuccess({
                                    detail: "پیام سفارشی انتخاب گردید!",
                                    life: 3000
                                });
                            }, error => {
                                this._primengProgressBarService.hide()
                            })
                            break
                    }
                },
                error => {
                    this._primengProgressBarService.hide()
                }
            );


        }


    }

    validationMessageCus(): boolean {
        if (!this.titleMessage500) {
            this.notifierService.showError({detail: "لطفا عنوان پیام را وارد کنید!", life: 3000});
            return false;
        } else if (!this.textMessage500) {
            this.notifierService.showError({detail: "لطفا پیام(فارسی) را وارد کنید!", life: 3000});
            return false;
        } else if (!this.tableIdMessage500) {
            this.notifierService.showError({detail: "لطفا بخش پیام را وارد کنید!", life: 3000});
            return false;
        } else if (!this.typeMessage500) {
            this.notifierService.showError({detail: "لطفا نوع پیام را وارد کنید!", life: 3000});
            return false;
        } else {
            return true
        }
    }

    selectedMessageCus(message, apiNumberCus) {
        debugger
        this.codeMessageDe = message.code
        this.messageIdDe = message.messageId
        this.titleMessageDe = message.title
        this.tableIdDe = message.tableId
        this.messageId = message.messageId

        switch (apiNumberCus) {
            case 1:
                debugger
                this.iconCus_valFirst = "pi pi-check"
                this.messageIdForAfterProcess = message.messageId
                this.messagesListCusFirst = this.messagesListCusFirst.filter(function (x) {

                    return x.messageId === message.messageId;
                });
                this.messagesListCusTemp = this.messagesListCusFirst
                this.notifierService.showSuccess({detail: "پیام سفارشی انتخاب گردید!", life: 3000});
                break

        }
    }

    // -----------------------------------------------

    selectedMessage500(message, apiNumber500) {
        debugger
        this.codeMessageDe = message.code
        this.messageIdDe = message.messageId
        this.titleMessageDe = message.title
        this.tableIdDe = message.tableId
        this.messageId = message.messageId

        switch (apiNumber500) {
            case 1:
                debugger
                this.icon500_valFirst = "pi pi-check"
                this.messageId5XXFirst = message.messageId
                this.messagesList500First = this.messagesList500First.filter(function (x) {

                    return x.messageId === message.messageId;
                });
                this.messagesList500Temp = this.messagesList500First
                this.notifierService.showSuccess({detail: "پیام 500 برای  سرویس اول انتخاب گردید!", life: 3000});
                break
            case 2:
                debugger
                this.icon500_valSecond = "pi pi-check"
                this.messageId5XXSecond = message.messageId
                this.messagesList500Second = this.messagesList500Second.filter(function (x) {

                    return x.messageId === message.messageId;
                });
                this.messagesList500Temp = this.messagesList500Second
                this.notifierService.showSuccess({detail: "پیام 500 برای  سرویس دوم انتخاب گردید!", life: 3000});
                break
            case 3:
                debugger
                this.icon500_valThird = "pi pi-check"
                this.messageId5XXThird = message.messageId
                this.messagesList500Third = this.messagesList500Third.filter(function (x) {

                    return x.messageId === message.messageId;
                });
                this.messagesList500Temp = this.messagesList500Third
                this.notifierService.showSuccess({detail: "پیام 500 برای  سرویس سوم انتخاب گردید!", life: 3000});
                break
        }
    }

    selectedMessage400(message, apiNumber400) {

        this.codeMessageDe = message.code
        this.messageIdDe = message.messageId
        this.titleMessageDe = message.title
        this.tableIdDe = message.tableId
        this.messageId = message.messageId

        switch (apiNumber400) {
            case 1:
                this.icon400_valFirst = "pi pi-check"
                this.messageId4XXFirst = message.messageId
                this.messagesList400First = this.messagesList400First.filter(function (x) {
                    return x.messageId === message.messageId;

                });
                this.messagesList400Temp = this.messagesList400First
                this.notifierService.showSuccess({detail: "پیام 400 برای  سرویس اول انتخاب گردید!", life: 3000});
                break
            case 2:
                this.icon400_valSecond = "pi pi-check"
                this.messageId4XXSecond = message.messageId
                this.messagesList400Second = this.messagesList400Second.filter(function (x) {

                    return x.messageId === message.messageId;

                });
                this.messagesList400Temp = this.messagesList400Second
                this.notifierService.showSuccess({detail: "پیام 400 برای  سرویس دوم انتخاب گردید!", life: 3000});

                break
            case 3:
                this.icon400_valThird = "pi pi-check"
                this.messageId4XXThird = message.messageId
                this.messagesList400Third = this.messagesList400Third.filter(function (x) {

                    return x.messageId === message.messageId;

                });
                this.messagesList400Temp = this.messagesList400Third
                this.notifierService.showSuccess({detail: "پیام 400 برای  سرویس سوم انتخاب گردید!", life: 3000});

                break
        }
    }

    validationMessage400(): boolean {
        if (!this.titleMessage400) {
            this.notifierService.showError({detail: "لطفا عنوان پیام را وارد کنید!", life: 3000});
            return false;
        } else if (!this.textMessage400) {
            this.notifierService.showError({detail: "لطفا پیام(فارسی) را وارد کنید!", life: 3000});
            return false;
        } else if (!this.tableIdMessage400) {
            this.notifierService.showError({detail: "لطفا بخش پیام را وارد کنید!", life: 3000});
            return false;
        } else if (!this.typeMessage400) {
            this.notifierService.showError({detail: "لطفا نوع پیام را وارد کنید!", life: 3000});
            return false;
        } else {
            return true
        }
    }

    validationMessage500(): boolean {
        if (!this.titleMessage500) {
            this.notifierService.showError({detail: "لطفا عنوان پیام را وارد کنید!", life: 3000});
            return false;
        } else if (!this.textMessage500) {
            this.notifierService.showError({detail: "لطفا پیام(فارسی) را وارد کنید!", life: 3000});
            return false;
        } else if (!this.tableIdMessage500) {
            this.notifierService.showError({detail: "لطفا بخش پیام را وارد کنید!", life: 3000});
            return false;
        } else if (!this.typeMessage500) {
            this.notifierService.showError({detail: "لطفا نوع پیام را وارد کنید!", life: 3000});
            return false;
        } else {
            return true
        }
    }

    onRegisterMessage400(apiNumber400) {
        if (this.validationMessage400()) {

            this.messageId = null
            this.registerTemp.code = this.codeMessage400;
            this.registerTemp.title = this.titleMessage400;
            this.registerTemp.type = this.typeMessage400;
            this.registerTemp.text = this.textMessage400;
            this.registerTemp.textEN = this.textENMessage400;
            this.registerTemp.tableId = this.tableIdMessage400;
            this._primengProgressBarService.show()
            this.messagesApiFacadeService.registerMessage(this.registerTemp).subscribe(
                a => {
                    this._primengProgressBarService.hide()
                    this.notifierService.showSuccess({detail: "پیام جدید ثبت و انتخاب گردید!", life: 3000});
                    this.codeMessageDe = a.code
                    this.messageIdDe = a.messageId
                    this.titleMessageDe = a.title
                    this.tableIdDe = a.tableId
                    this.messageId = a.messageId
                    this.message400Flag = false
                    switch (apiNumber400) {
                        case 1:
                            this.messageId4XXFirst = this.messageIdDe
                            this.messagesList400First = []
                            this._primengProgressBarService.show()
                            this.messagesApiFacadeService.messagesearch(
                                this.codeMessage400, this.titleMessage400, this.tableIdMessage400, this.typeMessage400
                            ).subscribe(response => {
                                this._primengProgressBarService.hide()
                                debugger
                                if (Array.isArray(response)) {
                                    this.messagesList400First = response
                                    this.messagesList400Temp = response
                                } else {
                                    this.messagesList400First.push(response)
                                    this.messagesList400Temp.push(response)
                                }

                                let temp = this
                                this.messagesList400First = this.messagesList400First.filter(function (x) {
                                    return x.messageId === temp.messageId4XXFirst;

                                });
                                this.messagesList400Temp = this.messagesList400First
                                this.icon400_valFirst = "pi pi-check"
                                this.notifierService.showSuccess({
                                    detail: "پیام 400 برای  سرویس اول انتخاب گردید!",
                                    life: 3000
                                });
                            }, error => {
                                this._primengProgressBarService.hide()
                            })
                            break
                        case 2:
                            this.messageId4XXSecond = this.messageIdDe
                            this.messagesList400Second = []
                            this._primengProgressBarService.show()
                            this.messagesApiFacadeService.messagesearch(
                                this.codeMessage400, this.titleMessage400, this.tableIdMessage400, this.typeMessage400
                            ).subscribe(response => {
                                this._primengProgressBarService.hide()
                                if (Array.isArray(response)) {
                                    this.messagesList400Temp = response
                                    this.messagesList400Second = response
                                } else {
                                    this.messagesList400Second.push(response)
                                    this.messagesList400Temp.push(response)

                                }
                                let temp = this
                                this.messagesList400Second = this.messagesList400Second.filter(function (x) {
                                    return x.messageId === temp.messageId4XXSecond;

                                });
                                this.messagesList400Temp = this.messagesList400Second
                                this.icon400_valSecond = "pi pi-check"
                                this.notifierService.showSuccess({
                                    detail: "پیام 400 برای  سرویس دوم انتخاب گردید!",
                                    life: 3000
                                });

                            }, error => {
                                this._primengProgressBarService.hide()
                            })

                            break
                        case 3:
                            this.messageId4XXThird = this.messageIdDe
                            this.messagesList400Third = []
                            this._primengProgressBarService.show()
                            this.messagesApiFacadeService.messagesearch(
                                this.codeMessage400, this.titleMessage400, this.tableIdMessage400, this.typeMessage400
                            ).subscribe(response => {
                                this._primengProgressBarService.hide()
                                if (Array.isArray(response)) {
                                    this.messagesList400Temp = response
                                    this.messagesList400Third = response
                                } else {
                                    this.messagesList400Third.push(response)
                                    this.messagesList400Temp.push(response)

                                }
                                let temp = this
                                this.messagesList400Third = this.messagesList400Third.filter(function (x) {
                                    return x.messageId === temp.messageId4XXThird;

                                });
                                this.messagesList400Temp = this.messagesList400Third
                                this.icon400_valThird = "pi pi-check"
                                this.notifierService.showSuccess({
                                    detail: "پیام 400 برای  سرویس سوم انتخاب گردید!",
                                    life: 3000
                                });

                            }, error => {
                                this._primengProgressBarService.hide()
                            })

                            break
                    }

                },
                error => {
                    this._primengProgressBarService.hide()
                }
            );


        }


    }

    onRegisterMessage500(apiNumber500) {
        debugger
        if (this.validationMessage500()) {

            this.messageId = null
            this.registerTemp.code = this.codeMessage500;
            this.registerTemp.title = this.titleMessage500;
            this.registerTemp.type = this.typeMessage500;
            this.registerTemp.text = this.textMessage500;
            this.registerTemp.textEN = this.textENMessage500;
            this.registerTemp.tableId = this.tableIdMessage500;
            this._primengProgressBarService.show()
            this.messagesApiFacadeService.registerMessage(this.registerTemp).subscribe(
                a => {
                    this._primengProgressBarService.hide()
                    this.notifierService.showSuccess({detail: "پیام جدید ثبت و انتخاب گردید!", life: 3000});
                    this.codeMessageDe = a.code
                    this.messageIdDe = a.messageId
                    this.titleMessageDe = a.title
                    this.tableIdDe = a.tableId
                    this.messageId = a.messageId
                    this.message500Flag = false
                    switch (apiNumber500) {
                        case 1:
                            debugger
                            this.messageId5XXFirst = this.messageIdDe
                            this.messagesList500First = []
                            this._primengProgressBarService.show()
                            this.messagesApiFacadeService.messagesearch(
                                this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                this.typeMessage500
                            ).subscribe(response => {
                                this._primengProgressBarService.hide()
                                if (Array.isArray(response)) {
                                    this.messagesList500First = response
                                    this.messagesList500Temp = response
                                } else {
                                    this.messagesList500First.push(response)
                                    this.messagesList500Temp.push(response)
                                }
                                this.icon500_valFirst = "pi pi-check"
                                let temp = this
                                this.messagesList500First = this.messagesList500First.filter(function (x) {
                                    return x.messageId === temp.messageId5XXFirst;
                                });
                                this.messagesList500Temp = this.messagesList500First
                                this.notifierService.showSuccess({
                                    detail: "پیام 500 برای  سرویس اول انتخاب گردید!",
                                    life: 3000
                                });

                            }, error => {
                                this._primengProgressBarService.hide()
                            })

                            break
                        case 2:
                            this.messagesList500Second = []
                            this.messageId5XXSecond = this.messageIdDe
                            this._primengProgressBarService.show()
                            this.messagesApiFacadeService.messagesearch(
                                this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                this.typeMessage500
                            ).subscribe(response => {
                                this._primengProgressBarService.hide()
                                if (Array.isArray(response)) {
                                    this.messagesList500Second = response
                                    this.messagesList500Temp = response
                                } else {
                                    this.messagesList500Second.push(response)
                                    this.messagesList500Temp.push(response)
                                }
                                this.icon500_valSecond = "pi pi-check"
                                let temp = this
                                this.messagesList500Second = this.messagesList500Second.filter(function (x) {
                                    return x.messageId === temp.messageId5XXSecond;
                                });
                                this.messagesList500Temp = this.messagesList500Second
                                this.notifierService.showSuccess({
                                    detail: "پیام 500 برای  سرویس دوم انتخاب گردید!",
                                    life: 3000
                                });

                            }, error => {
                                this._primengProgressBarService.hide()
                            })

                            break
                        case 3:
                            this.messagesList500Third = []
                            this.messageId5XXThird = this.messageIdDe
                            this._primengProgressBarService.show()
                            this.messagesApiFacadeService.messagesearch(
                                this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                this.typeMessage500
                            ).subscribe(response => {
                                this._primengProgressBarService.hide()
                                if (Array.isArray(response)) {
                                    this.messagesList500Third = response
                                    this.messagesList500Temp = response
                                } else {
                                    this.messagesList500Third.push(response)
                                    this.messagesList500Temp.push(response)
                                }
                                this.icon500_valThird = "pi pi-check"
                                let temp = this
                                this.messagesList500Third = this.messagesList500Third.filter(function (x) {
                                    return x.messageId === temp.messageId5XXThird;
                                });
                                this.messagesList500Temp = this.messagesList500Third
                                this.notifierService.showSuccess({
                                    detail: "پیام 500 برای  سرویس سوم انتخاب گردید!",
                                    life: 3000
                                });

                            }, error => {
                                this._primengProgressBarService.hide()
                            })
                            break
                    }

                },
                error => {
                    this._primengProgressBarService.hide()
                }
            );


        }


    }

    messageClear400(apiNumber) {
        this.titleMessage400 = ""
        this.textMessage400 = ""
        this.textENMessage400 = ""
        this.tableIdMessage400 = ""
        this.typeMessage400 = ""
        this.messageId = null
        this.messageIdDe = null
        this.messageIdDe = ""
        this.codeMessageDe = ""
        this.titleMessageDe = ""
        this.tableIdDe = ""
        switch (apiNumber) {
            case 1:
                this.messageId4XXFirst = null
                this.icon400_valFirst = ''
                this.messageSearch400(1)
                break
            case 2:
                this.messageId4XXSecond = null
                this.icon400_valSecond = ''
                this.messageSearch400(2)
                break
            case 3:
                this.messageId4XXThird = null
                this.icon400_valThird = ''
                this.messageSearch400(3)
                break
        }


    }

    messageClear500(apiNumber) {
        this.titleMessage500 = ""
        this.textMessage500 = ""
        this.textENMessage500 = ""
        this.tableIdMessage500 = ""
        this.typeMessage500 = ""
        this.messageId = null
        this.messageIdDe = null
        this.messageIdDe = ""
        this.codeMessageDe = ""
        this.titleMessageDe = ""
        this.tableIdDe = ""
        switch (apiNumber) {
            case 1:
                this.messageId5XXFirst = null
                this.icon500_valFirst = ''
                this.messageSearch500(1)
                break
            case 2:
                this.messageId5XXSecond = null
                this.icon500_valSecond = ''
                this.messageSearch500(2)
                break
            case 3:
                this.messageId5XXThird = null
                this.icon500_valThird = ''
                this.messageSearch500(3)
                break
        }
    }

    onKeydownSearch(event) {
        let self = this
        if (event.key === "Enter") {
            self.messageSearch400(this.apiNumber400);
        }
    }

    messageSearch400(apiNumber) {
        this._primengProgressBarService.show()
        this.messagesApiFacadeService.messagesearch(
            this.codeMessage400, this.titleMessage400, this.tableIdMessage400, this.typeMessage400
        ).subscribe(response => {
            this._primengProgressBarService.hide()
            switch (apiNumber) {
                case 1:
                    debugger
                    if (Array.isArray(response)) {
                        this.messagesList400First = response
                        this.messagesList400Temp = response
                    } else {
                        this.messagesList400First.push(response)
                        this.messagesList400Temp.push(response)
                    }
                    break
                case 2:
                    debugger
                    if (Array.isArray(response)) {
                        this.messagesList400Temp = response
                        this.messagesList400Second = response
                    } else {
                        this.messagesList400Second.push(response)
                        this.messagesList400Temp.push(response)

                    }
                    break
                case 3:
                    debugger
                    if (Array.isArray(response)) {
                        this.messagesList400Temp = response
                        this.messagesList400Third = response
                    } else {
                        this.messagesList400Third.push(response)
                        this.messagesList400Temp.push(response)

                    }
                    break
            }

        }, error => {
            this._primengProgressBarService.hide()
        })
    }

    messageSearch500(apiNumber) {
        this._primengProgressBarService.show()
        this.messagesApiFacadeService.messagesearch(
            this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
            this.typeMessage500
        ).subscribe(response => {
            this._primengProgressBarService.hide()
            switch (apiNumber) {
                case 1:
                    debugger
                    this.messagesList500First = []
                    if (Array.isArray(response)) {
                        this.messagesList500First = response
                        this.messagesList500Temp = response
                    } else {
                        this.messagesList500First.push(response)
                        this.messagesList500Temp.push(response)
                    }
                    break
                case 2:
                    this.messagesList500Second = []
                    if (Array.isArray(response)) {
                        this.messagesList500Second = response
                        this.messagesList500Temp = response
                    } else {
                        this.messagesList500Second.push(response)
                        this.messagesList500Temp.push(response)
                    }
                    break
                case 3:
                    this.messagesList500Third = []
                    if (Array.isArray(response)) {
                        this.messagesList500Third = response
                        this.messagesList500Temp = response
                    } else {
                        this.messagesList500Third.push(response)
                        this.messagesList500Temp.push(response)
                    }
                    break
            }
        }, error => {
            this._primengProgressBarService.hide()
        })
    }

    OnchangePartyFirst(event) {
        this.matchListFirst = []
        this.apiIdFirst = null
        this.apiListOptionsFirst = [{title: '-', apiId: null}]
        if (event.value != null) {
            this.partyListOptionsFirst.forEach(s => {
                if (s.partyId == event.value) {
                    this.partyTitleFirst = s.title
                    this.partyIdFirst = s.partyId
                }
            })
            this._primengProgressBarService.show()
            this.messagesApiFacadeService.moduleSearchByPartyId(event.value).subscribe(m => {
                this._primengProgressBarService.hide()
                this.moduleListOptionsFirst = []
                this.moduleListOptionsFirst.push(...m)
                this.moduleListOptionsFirst.unshift({moduleTitle: '-', moduleId: null});
                this.moduleListOptionsFirst = this.moduleListOptionsFirst.sort()
            }, error => {
                this._primengProgressBarService.hide()
            })
        } else {
            this.partyIdFirst = null
            this.partyTitleFirst = null
            this.moduleIdFirst = null
            this.moduleListOptionsFirst = [{moduleTitle: '-', moduleId: null}]
            this.apiIdFirst = null
            this.apiListOptionsFirst = [{title: '-', apiId: null}]
        }
        /*  this.partyListOptionsFirst.forEach(s => {
             /!* if (s.partyId == event.value) {
                  this.registerObj.partyTitle = s.title
                  this.registerObj.partyId = s.partyId
              }*!/
          })*/
    }

    OnchangeModuleFirst(event) {
        this.matchListFirst = []
        if (event.value != null) {
            this.moduleListOptionsFirst.forEach(s => {
                if (s.moduleId == event.value) {
                    this.moduleTitleFirst = s.moduleTitle
                    this.moduleIdFirst = s.moduleId
                }
            })
            this._primengProgressBarService.show()
            this.messagesApiFacadeService.apibymoduleid(this.moduleIdFirst, 0, 10000).subscribe(a => {
                this._primengProgressBarService.hide()
                this.apiListOptionsFirst = []
                this.apiListOptionsFirst.push(...a)
                this.apiListOptionsFirst.unshift({title: '-', apiId: null})
                this.apiListOptionsFirst = this.apiListOptionsFirst.sort()
            }, error => {
                this._primengProgressBarService.hide()
            })
        } else {
            this.apiIdFirst = null
            this.moduleTitleFirst = null
            this.moduleIdFirst = null
            this.apiListOptionsFirst = [{title: '-', apiId: null}]
        }
    }

    OnchangeApiFirst(event) {
        this.matchListFirst = []
        if (event.value != null) {
            this.apiListOptionsFirst.forEach(s => {
                if (s.apiId == event.value) {
                    this.apiTitleFirst = s.title
                    this.apiIdFirst = s.apiId
                }
            })

        } else {
            this.apiNameFirst = null
            this.apiTitleFirst = null
            this.apiIdFirst = null
        }

    }

    onChangeActionTypeFirst(event) {
        this.matchListFirst = []
        if (event.value == 2) {
            this.disableCusMessage = false
            this.partyIdSecond = null
            this.moduleListOptionsSecond = [{moduleTitle: '-', moduleId: null}]
            this.moduleIdSecond = null
            this.apiListOptionsSecond = [{title: '-', apiId: null}]
            this.apiIdSecond = null
            this.actionTypeSecond = null
            this.matchListSecond = []
            this.partyIdThird = null
            this.moduleListOptionsThird = [{moduleTitle: '-', moduleId: null}]
            this.moduleIdThird = null
            this.apiListOptionsThird = [{title: '-', apiId: null}]
            this.apiIdThird = null
            this.actionTypeThird = null
            this.matchListThird = []
            this.thirdPart = true
            this.secondPart = true
            this.afterApiDisableFirst = false
            this.runAsyncFirst = true
            this.runAsyncSecond = false
            this.runAsyncThird = false
            this.afterApiDisableSecond = true
            this.afterApiDisableThird = true
            this.afterApiSecond = null
            this.afterApiThird = null
        } else {
            this.runAsyncFirst = false
            this.thirdPart = false
            this.secondPart = false
            this.afterApiDisableFirst = true
            this.afterApiFirst = null
            this.disableCusMessage = true
        }
    }

    onChangeActionTypeSecond(event) {
        this.matchListSecond = []
        if (event.value == 2) {
            this.partyIdThird = null
            this.moduleListOptionsThird = [{moduleTitle: '-', moduleId: null}]
            this.moduleIdThird = null
            this.apiListOptionsThird = [{title: '-', apiId: null}]
            this.apiIdThird = null
            this.actionTypeThird = null
            this.matchListThird = []
            this.thirdPart = true
            this.afterApiDisableSecond = false
            this.runAsyncSecond = true
            this.runAsyncThird = false
            this.afterApiDisableThird = true
            this.afterApiThird = null
        } else {
            this.runAsyncSecond = false
            this.thirdPart = false
            this.afterApiDisableSecond = true
            this.afterApiSecond = null
        }
    }

    onChangeActionTypeThird(event) {
        this.matchListThird = []
        if (event.value == 2) {
            this.afterApiDisableThird = false
            this.runAsyncThird = true
        } else {
            this.runAsyncThird = false
            this.afterApiDisableThird = true
            this.afterApiThird = null
        }
    }

    OnchangePartySecond(event) {
        this.matchListSecond = []
        if (event.value != null) {
            this.apiIdSecond = null
            this.apiListOptionsSecond = [{title: '-', apiId: null}]
            this.partyListOptionsSecond.forEach(s => {
                if (s.partyId == event.value) {
                    this.partyTitleSecond = s.title
                    this.partyIdSecond = s.partyId
                }
            })
            this._primengProgressBarService.show()
            this.messagesApiFacadeService.moduleSearchByPartyId(event.value).subscribe(w => {
                this._primengProgressBarService.hide()
                this.moduleListOptionsSecond = []
                this.moduleListOptionsSecond.push(...w)
                this.moduleListOptionsSecond.unshift({moduleTitle: '-', moduleId: null});
                this.moduleListOptionsSecond = this.moduleListOptionsSecond.sort()
            }, error => {
                this._primengProgressBarService.hide()
            })
            /*  this.partyListOptionsFirst.forEach(s => {
                  /!* if (s.partyId == event.value) {
                       this.registerObj.partyTitle = s.title
                       this.registerObj.partyId = s.partyId
                   }*!/
              })*/
        } else {
            this.moduleIdSecond = null
            this.partyTitleSecond = null
            this.partyIdSecond = null
            this.moduleListOptionsSecond = [{moduleTitle: '-', moduleId: null}]
            this.apiIdSecond = null
            this.apiListOptionsSecond = [{title: '-', apiId: null}]
        }
    }

    OnchangeModuleSecond(event) {
        this.matchListSecond = []
        if (event.value != null) {
            this.moduleListOptionsSecond.forEach(s => {
                if (s.moduleId == event.value) {
                    this.moduleTitleSecond = s.moduleTitle
                    this.moduleIdSecond = s.moduleId
                }
            })
            this._primengProgressBarService.show()
            this.messagesApiFacadeService.apibymoduleid(this.moduleIdSecond, 0, 10000).subscribe(x => {
                this._primengProgressBarService.hide()
                this.apiListOptionsSecond = []
                this.apiListOptionsSecond.push(...x)
                this.apiListOptionsSecond.unshift({title: '-', apiId: null})
                this.apiListOptionsSecond = this.apiListOptionsSecond.sort()
            }, error => {
                this._primengProgressBarService.hide()
            })
        } else {
            this.apiIdSecond = null
            this.apiListOptionsSecond = [{title: '-', apiId: null}]
        }
    }

    OnchangeApiSecond(event) {
        this.matchListSecond = []
        if (event.value != null) {
            this.apiListOptionsSecond.forEach(s => {
                if (s.apiId == event.value) {
                    this.apiTitleSecond = s.title
                    this.apiIdSecond = s.apiId
                }
            })

        } else {
            this.apiNameSecond = null
            this.apiTitleSecond = null
            this.apiIdSecond = null
        }
    }

    OnchangePartyThird(event) {
        this.matchListThird = []
        if (event.value != null) {
            this.apiIdThird = null
            this.apiListOptionsThird = [{title: '-', apiId: null}]
            this.partyListOptionsThird.forEach(s => {
                if (s.partyId == event.value) {
                    this.partyTitleThird = s.title
                    this.partyIdThird = s.partyId
                }
            })
            this._primengProgressBarService.show()
            this.messagesApiFacadeService.moduleSearchByPartyId(event.value).subscribe(e => {
                this._primengProgressBarService.hide()
                this.moduleListOptionsThird = []
                this.moduleListOptionsThird.push(...e)
                this.moduleListOptionsThird.unshift({moduleTitle: '-', moduleId: null});
                this.moduleListOptionsThird = this.moduleListOptionsThird.sort()
            }, error => {
                this._primengProgressBarService.hide()
            })
        } else {
            this.moduleIdThird = null
            this.partyTitleThird = null
            this.partyIdThird = null
            this.moduleListOptionsThird = [{moduleTitle: '-', moduleId: null}]
            this.apiIdThird = null
            this.apiListOptionsThird = [{title: '-', apiId: null}]
        }
    }

    OnchangeModuleThird(event) {
        this.matchListThird = []
        if (event.value != null) {
            this.moduleListOptionsThird.forEach(s => {
                if (s.moduleId == event.value) {
                    this.moduleTitleThird = s.moduleTitle
                    this.moduleIdThird = s.moduleId
                }
            })
            this._primengProgressBarService.show()
            this.messagesApiFacadeService.apibymoduleid(this.moduleIdThird, 0, 10000).subscribe(x => {
                this._primengProgressBarService.hide()
                this.apiListOptionsThird = []
                this.apiListOptionsThird.push(...x)
                this.apiListOptionsThird.unshift({title: '-', apiId: null})
                this.apiListOptionsThird = this.apiListOptionsThird.sort()
            }, error => {
                this._primengProgressBarService.hide()
            })
        } else {
            this.apiIdThird = null
            this.moduleTitleThird = null
            this.moduleIdThird = null
            this.apiListOptionsThird = [{title: '-', apiId: null}]
        }
    }

    OnchangeApiThird(event) {
        this.matchListThird = []
        if (event.value != null) {
            this.apiListOptionsThird.forEach(s => {
                if (s.apiId == event.value) {
                    this.apiTitleThird = s.title
                    this.apiIdThird = s.apiId
                }
            })

        } else {
            this.apiNameThird = null
            this.apiTitleThird = null
            this.apiIdThird = null
        }
    }

    showProducedNode(item) {
        switch (item) {
            case 1:
                if (this.actionTypeFirst == 1) {
                    this.apiDto.apiId = this.apiIdFirst
                    this.apiDto.title = this.apiTitleFirst
                    this.apiDto.name = this.apiNameFirst
                    this.apiDto.moduleTitle = this.moduleTitleFirst
                    this.apiDto.moduleId = this.moduleIdFirst
                    this.apiDto.partyTitle = this.partyTitleFirst
                    this.apiDto.partyId = this.partyIdFirst
                } else if (this.actionTypeFirst == 2) {
                    this.apiDto.apiId = this.apiIdOrg
                    this.apiDto.title = this.apiTitleOrg
                    this.apiDto.name = this.apiNameOrg
                    this.apiDto.moduleTitle = this.moduleTitleOrg
                    this.apiDto.partyTitle = this.partyTitleOrg
                }
                this.producedNodeFlag = true
                break;
            case 2:
                this.apiDto.apiId = this.apiIdSecond
                this.apiDto.moduleId = this.moduleIdSecond
                this.apiDto.title = this.apiTitleSecond
                this.apiDto.name = this.apiNameSecond
                this.apiDto.moduleTitle = this.moduleTitleSecond
                this.apiDto.partyTitle = this.partyTitleSecond
                this.apiDto.partyId = this.partyIdSecond
                this.producedNodeFlag = true
                break;
            case 3:
                this.apiDto.apiId = this.apiIdThird
                this.apiDto.moduleId = this.moduleIdThird
                this.apiDto.title = this.apiTitleThird
                this.apiDto.name = this.apiNameThird
                this.apiDto.moduleTitle = this.moduleTitleThird
                this.apiDto.partyTitle = this.partyTitleThird
                this.apiDto.partyId = this.partyIdThird
                this.producedNodeFlag = true
                break;
        }
    }

    showRequiredNode(item) {
        switch (item) {
            case 1:
                if (this.actionTypeFirst == 1) {
                    this.apiDto.apiId = this.apiIdOrg
                    this.apiDto.title = this.apiTitleOrg
                    this.apiDto.name = this.apiNameOrg
                    this.apiDto.moduleTitle = this.moduleTitleOrg
                    this.apiDto.partyTitle = this.partyTitleOrg
                } else if (this.actionTypeFirst == 2) {
                    this.apiDto.apiId = this.apiIdFirst
                    this.apiDto.title = this.apiTitleFirst
                    this.apiDto.name = this.apiNameFirst
                    this.apiDto.moduleTitle = this.moduleTitleFirst
                    this.apiDto.moduleId = this.moduleIdFirst
                    this.apiDto.partyTitle = this.partyTitleFirst
                    this.apiDto.partyId = this.partyIdFirst

                }


                this.requiredNodeFlag = true
                break;
            case 2:

                this.apiDto.apiId = this.apiIdSecond
                this.apiDto.moduleId = this.moduleIdSecond
                this.apiDto.title = this.apiTitleSecond
                this.apiDto.name = this.apiNameSecond
                this.apiDto.moduleTitle = this.moduleTitleSecond
                this.apiDto.partyTitle = this.partyTitleSecond
                this.apiDto.partyId = this.partyIdSecond
                this.requiredNodeFlag = true
                break;
            case 3:
                this.apiDto.apiId = this.apiIdThird
                this.apiDto.moduleId = this.moduleIdThird
                this.apiDto.title = this.apiTitleThird
                this.apiDto.name = this.apiNameThird
                this.apiDto.moduleTitle = this.moduleTitleThird
                this.apiDto.partyTitle = this.partyTitleThird
                this.apiDto.partyId = this.partyIdThird
                this.requiredNodeFlag = true
                break;

        }

    }

    validationFirstApi(): boolean {
        debugger
        if (!this.partyIdFirst) {
            this.notifierService.showError({detail: "لطفا مشتری را برای سرویس اول انتخاب کنید!", life: 3000});
            return false;
        } else if (!this.moduleIdFirst) {
            this.notifierService.showError({detail: "لطفا ماژول را برای سرویس اول انتخاب کنید!", life: 3000});
            return false;
        } else if (!this.moduleIdFirst) {
            this.notifierService.showError({detail: "لطفا سرویس را برای سرویس اول انتخاب کنید!", life: 3000});
            return false;
        } else if (!this.apiIdFirst) {
            this.notifierService.showError({detail: "لطفا سرویس را برای سرویس اول انتخاب کنید!", life: 3000});
            return false;
        } else if (!this.actionTypeFirst) {
            this.notifierService.showError({detail: "لطفا اولویت اجرا را برای سرویس اول انتخاب کنید!", life: 3000});
            return false;

        }/* else if (this.actionTypeFirst == 2 && !this.afterApiFirst) {
            this.notifierService.showError({detail: "لطفا سرویس بعدی را برای سرویس اول انتخاب کنید!", life: 3000});
            return false;
        }*/ else if (this.apiIdFirst == this.apiIdOrg) {
            this.notifierService.showError({detail: "انتخاب سرویس تکراری برای سرویس اول امکان پذیر نیست!", life: 3000});
            return false;
        } else {
            return true
        }
    }

    validationSecondApi(): boolean {
        debugger
        if (!this.partyIdSecond) {
            this.notifierService.showError({detail: "لطفا مشتری را برای سرویس دوم انتخاب کنید!", life: 3000});
            return false;
        } else if (!this.moduleIdSecond) {
            this.notifierService.showError({detail: "لطفا ماژول را برای سرویس دوم انتخاب کنید!", life: 3000});
            return false;
        } else if (!this.moduleIdSecond) {
            this.notifierService.showError({detail: "لطفا سرویس را برای سرویس دوم انتخاب کنید!", life: 3000});
            return false;
        } else if (!this.apiIdSecond) {
            this.notifierService.showError({detail: "لطفا سرویس را برای سرویس دوم انتخاب کنید!", life: 3000});
            return false;
        } else if (!this.actionTypeSecond) {
            this.notifierService.showError({detail: "لطفا اولویت اجرا را برای سرویس دوم انتخاب کنید!", life: 3000});
            return false;
        } else if (this.actionTypeSecond == 1 && (this.apiIdFirst == this.apiIdSecond)) {
            this.notifierService.showError({detail: "انتخاب سرویس تکراری برای سرویس دوم امکان پذیر نیست!", life: 3000});
            return false;
        } else if (this.actionTypeSecond == 2 && !this.afterApiSecond) {
            this.notifierService.showError({detail: "لطفا سرویس بعدی را برای سرویس دوم انتخاب کنید!", life: 3000});
            return false;
        } else if (this.actionTypeSecond == 2 && (this.apiIdOrg == this.apiIdSecond)) {
            this.notifierService.showError({detail: "انتخاب سرویس تکراری برای سرویس دوم امکان پذیر نیست!", life: 3000});
            return false;
        } else if (!this.apiIdFirst) {
            this.notifierService.showError({detail: "لطفا سرویس اول را وارد کنید!", life: 3000});
            return false;
        } else if (this.actionTypeSecond == 2 && this.preventSecond) {
            this.notifierService.showError({
                detail: "اتصال نود ها برای سرویس دوم در حالت Async امکان پذیر نمی باشد!",
                life: 3000
            });
            return false;
        } else {
            return true
        }
    }

    validationThirdApi(): boolean {
        debugger
        if (!this.partyIdThird) {
            this.notifierService.showError({detail: "لطفا مشتری را برای سرویس سوم انتخاب کنید!", life: 3000});
            return false;
        } else if (!this.moduleIdThird) {
            this.notifierService.showError({detail: "لطفا ماژول را برای سرویس سوم انتخاب کنید!", life: 3000});
            return false;
        } else if (!this.moduleIdThird) {
            this.notifierService.showError({detail: "لطفا سرویس را برای سرویس سوم انتخاب کنید!", life: 3000});
            return false;
        } else if (!this.apiIdThird) {
            this.notifierService.showError({detail: "لطفا سرویس را برای سرویس سوم انتخاب کنید!", life: 3000});
            return false;
        } else if (!this.actionTypeThird) {
            this.notifierService.showError({detail: "لطفا اولویت اجرا را برای سرویس سوم انتخاب کنید!", life: 3000});
            return false;
        } else if (this.actionTypeSecond == 1 && (this.apiIdSecond == this.apiIdThird)) {
            this.notifierService.showError({detail: "انتخاب سرویس تکراری برای سرویس سوم امکان پذیر نیست!", life: 3000});
            return false;
        } else if (this.actionTypeThird == 2 && !this.afterApiThird) {
            this.notifierService.showError({detail: "لطفا سرویس بعدی را برای سرویس سوم انتخاب کنید!", life: 3000});
            return false;
        } else if (this.actionTypeThird == 2 && (this.apiIdOrg == this.apiIdThird)) {
            this.notifierService.showError({detail: "انتخاب سرویس تکراری برای سرویس سوم امکان پذیر نیست!", life: 3000});
            return false;
        } else if (!this.apiIdSecond) {
            this.notifierService.showError({detail: "لطفا سرویس دوم را وارد کنید!", life: 3000});
            return false;
        } else if (this.actionTypeThird == 2 && this.preventThird) {
            this.notifierService.showError({
                detail: "اتصال نود ها برای سرویس سوم در حالت Async امکان پذیر نمی باشد!",
                life: 3000
            });
            return false;
        } else {
            return true
        }
    }

    openMessage400(apiNumber) {
        switch (apiNumber) {
            case 1:
                debugger
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.messagesearch(
                    this.codeMessage400, this.titleMessage400, this.tableIdMessage400, this.typeMessage400
                ).subscribe(response => {
                    this._primengProgressBarService.hide()
                    debugger
                    if (Array.isArray(response)) {
                        this.messagesList400First = response
                        this.messagesList400Temp = response
                    } else {
                        this.messagesList400First.push(response)
                        this.messagesList400Temp.push(response)
                    }
                    debugger
                    let temp = this
                    if (this.messageId4XXFirst) {
                        this.messagesList400First = this.messagesList400First.filter(function (x) {
                            return x.messageId === temp.messageId4XXFirst;
                        });
                    }
                    debugger
                    this.messagesList400Temp = this.messagesList400First
                    this.message400Flag = true
                    this.apiNumber400 = 1
                }, error => {
                    this._primengProgressBarService.hide()
                })
                break
            case 2:

                debugger
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.messagesearch(
                    this.codeMessage400, this.titleMessage400, this.tableIdMessage400, this.typeMessage400
                ).subscribe(response => {
                    this._primengProgressBarService.hide()
                    if (Array.isArray(response)) {
                        this.messagesList400Temp = response
                        this.messagesList400Second = response
                    } else {
                        this.messagesList400Second.push(response)
                        this.messagesList400Temp.push(response)

                    }
                    debugger
                    if (this.messageId4XXSecond) {
                        let temp = this
                        this.messagesList400Second = this.messagesList400Second.filter(function (x) {

                            return x.messageId === temp.messageId4XXSecond;
                        });
                    }
                    this.messagesList400Temp = this.messagesList400Second
                    this.message400Flag = true
                    this.apiNumber400 = 2
                }, error => {
                    this._primengProgressBarService.hide()
                })
                break
            case 3:
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.messagesearch(
                    this.codeMessage400, this.titleMessage400, this.tableIdMessage400, this.typeMessage400
                ).subscribe(response => {
                    this._primengProgressBarService.hide()
                    if (Array.isArray(response)) {
                        this.messagesList400Temp = response
                        this.messagesList400Third = response
                    } else {
                        this.messagesList400Third.push(response)
                        this.messagesList400Temp.push(response)

                    }
                    debugger
                    if (this.messageId4XXThird) {
                        let temp = this
                        this.messagesList400Third = this.messagesList400Third.filter(function (x) {

                            return x.messageId === temp.messageId4XXThird;
                        });
                    }
                    this.messagesList400Temp = this.messagesList400Third

                    this.message400Flag = true
                    this.apiNumber400 = 3
                }, error => {
                    this._primengProgressBarService.hide()
                })
                break
        }

    }

    openMessage500(apiNumber) {
        debugger
        switch (apiNumber) {
            case 1:
                debugger
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.messagesearch(
                    this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                    this.typeMessage500
                ).subscribe(response => {
                    this._primengProgressBarService.hide()
                    switch (apiNumber) {
                        case 1:
                            debugger
                            this.messagesList500First = []
                            if (Array.isArray(response)) {
                                this.messagesList500First = response
                                this.messagesList500Temp = response
                            } else {
                                this.messagesList500First.push(response)
                                this.messagesList500Temp.push(response)
                            }
                            if (this.messageId5XXFirst) {
                                let temp = this
                                this.messagesList500First = this.messagesList500First.filter(function (x) {

                                    return x.messageId === temp.messageId5XXFirst;
                                });
                            }
                            this.messagesList500Temp = this.messagesList500First


                            this.message500Flag = true
                            this.apiNumber500 = 1
                    }
                }, error => {
                    this._primengProgressBarService.hide()
                })
                break
            case 2:
                debugger
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.messagesearch(
                    this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                    this.typeMessage500
                ).subscribe(response => {
                    this._primengProgressBarService.hide()
                    this.messagesList500Second = []
                    if (Array.isArray(response)) {
                        this.messagesList500Second = response
                        this.messagesList500Temp = response
                    } else {
                        this.messagesList500Second.push(response)
                        this.messagesList500Temp.push(response)
                    }
                    if (this.messageId5XXSecond) {
                        let temp = this
                        this.messagesList500Second = this.messagesList500Second.filter(function (x) {

                            return x.messageId === temp.messageId5XXSecond;
                        });
                    }
                    this.messagesList500Temp = this.messagesList500Second


                    this.message500Flag = true
                    this.apiNumber500 = 2
                }, error => {
                    this._primengProgressBarService.hide()
                })

                break
            case 3:
                debugger
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.messagesearch(
                    this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                    this.typeMessage500
                ).subscribe(response => {
                    this._primengProgressBarService.hide()
                    this.messagesList500Second = []
                    if (Array.isArray(response)) {
                        this.messagesList500Second = response
                        this.messagesList500Temp = response
                    } else {
                        this.messagesList500Second.push(response)
                        this.messagesList500Temp.push(response)
                    }
                    if (this.messageId5XXThird) {
                        let temp = this
                        this.messagesList500Third = this.messagesList500Third.filter(function (x) {

                            return x.messageId === temp.messageId5XXThird;
                        });
                    }
                    this.messagesList500Temp = this.messagesList500Third


                    this.message500Flag = true
                    this.apiNumber500 = 3
                }, error => {
                    this._primengProgressBarService.hide()
                })
                break
        }
    }

    clear(apiItem) {
        switch (apiItem) {
            case 1:
                this.partyIdFirst = null
                this.moduleIdFirst = null
                this.moduleListOptionsFirst = [{moduleTitle: '-', moduleId: null}]
                this.apiListOptionsFirst = [{title: '-', apiId: null}]
                this.actionTypeFirst = null
                this.matchListFirst = null
                this.afterApiFirst = null
                this.afterApiDisableFirst = true
                this.afterApiDisableSecond = true
                this.afterApiDisableThird = true
                this.partyIdSecond = null
                this.moduleIdSecond = null
                this.moduleListOptionsSecond = [{moduleTitle: '-', moduleId: null}]
                this.apiListOptionsSecond = [{title: '-', apiId: null}]
                this.actionTypeSecond = null
                this.matchListSecond = null
                this.partyIdThird = null
                this.moduleIdThird = null
                this.moduleListOptionsThird = [{moduleTitle: '-', moduleId: null}]
                this.apiListOptionsThird = [{title: '-', apiId: null}]
                this.actionTypeThird = null
                this.matchListThird = null
                this.icon400_valFirst = ""
                this.icon500_valFirst = ""
                this.iconCus_valFirst = ""
                this.icon400_valSecond = ""
                this.icon500_valSecond = ""
                this.icon400_valThird = ""
                this.icon500_valThird = ""
                this.messageId4XXFirst = null
                this.messageId5XXFirst = null
                this.messageId4XXSecond = null
                this.messageId5XXSecond = null
                this.messageId4XXThird = null
                this.messageId5XXThird = null
                break
            case 2:
                this.partyIdSecond = null
                this.moduleIdSecond = null
                this.moduleListOptionsSecond = [{moduleTitle: '-', moduleId: null}]
                this.apiListOptionsSecond = [{title: '-', apiId: null}]
                this.actionTypeSecond = null
                this.matchListSecond = null
                this.afterApiSecond = null
                this.afterApiDisableSecond = true
                this.afterApiThird = null
                this.afterApiDisableThird = true
                this.partyIdThird = null
                this.moduleIdThird = null
                this.moduleListOptionsThird = [{moduleTitle: '-', moduleId: null}]
                this.apiListOptionsThird = [{title: '-', apiId: null}]
                this.actionTypeThird = null
                this.matchListThird = null
                this.icon400_valSecond = ""
                this.icon500_valSecond = ""
                this.icon400_valThird = ""
                this.icon500_valThird = ""
                this.messageId4XXSecond = null
                this.messageId5XXSecond = null
                this.messageId4XXThird = null
                this.messageId5XXThird = null
                break
            case 3:
                this.partyIdThird = null
                this.moduleIdThird = null
                this.moduleListOptionsThird = [{moduleTitle: '-', moduleId: null}]
                this.apiListOptionsThird = [{title: '-', apiId: null}]
                this.actionTypeThird = null
                this.matchListThird = null
                this.afterApiThird = null
                this.afterApiDisableThird = true
                this.icon400_valThird = ""
                this.icon500_valThird = ""
                this.messageId4XXThird = null
                this.messageId5XXThird = null
                break
        }
    }

    onchangeRunAsyncFirst(e) {
        if (e.value) {
            if (this.matchListFirst.length > 0) {
                this.notifierService.showError({detail: 'سرویس اول در Async نمیتواند دارای نود متصل (match) باشد'});

            }
        }
    }

    showMatchNodes(item) {
        debugger
        this.producedNode = null
        this.requiredNode = null
        this.pointerMatch = item
        if (this.actionTypeFirst == 2 && this.runAsyncFirst) {
            debugger
            this.notifierService.showError({detail: 'سرویس Async بوده و نمی تواند دارای نود متصل (match) باشد!'});

        } else {
            debugger
            switch (item) {
                case 1:
                    debugger
                    if (this.validationFirstApi()) {
                        this.apiDto.apiId = this.apiIdFirst
                        if (this.matchListFirst.length > 0) {
                            if (this.actionTypeFirst == 1) {
                                this._primengProgressBarService.show()
                                this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdFirst).subscribe(l => {
                                    debugger
                                    this._primengProgressBarService.hide()
                                    let countProduced: number = 0
                                    this.producedListFirst = []
                                    if (Array.isArray(l)) {
                                        this.producedListFirst = l
                                    } else {
                                        this.producedListFirst.push(...l)
                                    }
                                    for (let k = 0; k < this.producedListFirst.length; k++) {
                                        if ('row' in this.producedListFirst) {
                                        } else {
                                            this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                                row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                , partyTitle: this.partyTitle
                                            })
                                        }
                                    }
                                    const filteredPro = this.producedListFirst.filter(proItem => {
                                        return !this.matchListFirst.some(tempMatchItem => tempMatchItem.producedId === proItem.producedId);
                                    });

                                    this.producedListFirst = []
                                    this.producedListFirst = filteredPro

                                    this.apiTitleProduced = this.apiTitleFirst
                                    this.apiIdProduced = this.apiIdFirst
                                    this.producedListFirst = [...this.producedListFirst];
                                    for (let k = 0; k < this.producedListFirst.length; k++) {
                                        countProduced++
                                    }
                                    this.countProduced = countProduced
                                    this._primengProgressBarService.show()
                                    debugger
                                    debugger
                                    debugger
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdOrg).subscribe(e => {
                                        debugger
                                        debugger
                                        debugger
                                        this._primengProgressBarService.hide()
                                        let countRequired: number = 0
                                        this.requiredListFirst = []
                                        if (Array.isArray(e)) {
                                            this.requiredListFirst = e
                                        } else {
                                            this.requiredListFirst.push(...e)
                                        }
                                        for (let k = 0; k < this.requiredListFirst.length; k++) {
                                            if ('row' in this.requiredListFirst) {
                                            } else {
                                                this.requiredListFirst[k] = Object.assign(this.requiredListFirst[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }

                                        }
                                        const filteredReq = this.requiredListFirst.filter(reqItem => {
                                            return !this.matchListFirst.some(tempMatchItem => tempMatchItem.requiredId === reqItem.requiredId);
                                        });
                                        this.requiredListFirst = []
                                        this.requiredListFirst = filteredReq


                                        this.apiTitleRequired = this.titleApiDe
                                        this.apiIdRequired = this.apiIdDe
                                        this.requiredListFirst = [...this.requiredListFirst];
                                        for (let k = 0; k < this.requiredListFirst.length; k++) {
                                            countRequired++
                                        }
                                        this.countRequired = countRequired
                                        this.dialogFirstMatchFlag = true
                                    }, error => {
                                        this._primengProgressBarService.hide()
                                    })

                                }, error => {
                                    this._primengProgressBarService.hide()
                                })
                            }
                            else if (this.actionTypeFirst == 2) {
                                this._primengProgressBarService.show()
                                this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdOrg).subscribe(s => {
                                    debugger
                                    this._primengProgressBarService.hide()
                                    let countProduced: number = 0
                                    this.producedListFirst = []
                                    if (Array.isArray(s)) {
                                        this.producedListFirst = s
                                    } else {
                                        this.producedListFirst.push(...s)
                                    }
                                    for (let k = 0; k < this.producedListFirst.length; k++) {
                                        if ('row' in this.producedListFirst) {
                                        } else {
                                            this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                                row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                , partyTitle: this.partyTitle
                                            })
                                        }
                                    }
                                    const filteredPro = this.producedListFirst.filter(proItem => {
                                        return !this.matchListFirst.some(tempMatchItem => tempMatchItem.producedId === proItem.producedId);
                                    });

                                    this.producedListFirst = []
                                    this.producedListFirst = filteredPro

                                    this.apiTitleProduced = this.apiTitleFirst
                                    this.apiIdProduced = this.apiIdFirst
                                    this.producedListFirst = [...this.producedListFirst];
                                    for (let k = 0; k < this.producedListFirst.length; k++) {
                                        countProduced++
                                    }
                                    this.countProduced = countProduced
                                    this._primengProgressBarService.show()
                                    debugger
                                    debugger
                                    debugger
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdFirst).subscribe(e => {
                                        debugger
                                        debugger
                                        debugger
                                        this._primengProgressBarService.hide()
                                        let countRequired: number = 0
                                        this.requiredListFirst = []
                                        if (Array.isArray(e)) {
                                            this.requiredListFirst = e
                                        } else {
                                            this.requiredListFirst.push(...e)
                                        }
                                        for (let k = 0; k < this.requiredListFirst.length; k++) {
                                            if ('row' in this.requiredListFirst) {
                                            } else {
                                                this.requiredListFirst[k] = Object.assign(this.requiredListFirst[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }

                                        }
                                        const filteredReq = this.requiredListFirst.filter(reqItem => {
                                            return !this.matchListFirst.some(tempMatchItem => tempMatchItem.requiredId === reqItem.requiredId);
                                        });
                                        this.requiredListFirst = []
                                        this.requiredListFirst = filteredReq

                                        this.apiTitleRequired = this.titleApiDe
                                        this.apiIdRequired = this.apiIdDe
                                        this.requiredListFirst = [...this.requiredListFirst];
                                        for (let k = 0; k < this.requiredListFirst.length; k++) {
                                            countRequired++
                                        }
                                        this.countRequired = countRequired
                                        this.dialogFirstMatchFlag = true
                                    }, error => {
                                        this._primengProgressBarService.hide()
                                    })
                                }, error => {
                                    this._primengProgressBarService.hide()
                                })
                            } else {
                                this.notifierService.showError({detail: 'لطفا اولویت اجرا را انتخاب کنید'});
                            }

                        } else {
                            if (this.actionTypeFirst == 1) {
                                this._primengProgressBarService.show()
                                this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdFirst).subscribe(l => {
                                    this._primengProgressBarService.hide()
                                    debugger
                                    let countProduced: number = 0
                                    this.producedListFirst = []
                                    if (Array.isArray(l)) {
                                        this.producedListFirst = l
                                    } else {
                                        this.producedListFirst.push(...l)
                                    }
                                    for (let k = 0; k < this.producedListFirst.length; k++) {
                                        if ('row' in this.producedListFirst) {
                                        } else {
                                            this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                                row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                , partyTitle: this.partyTitle
                                            })
                                        }
                                    }
                                    this.apiTitleProduced = this.apiTitleFirst
                                    this.apiIdProduced = this.apiIdFirst
                                    this.producedListFirst = [...this.producedListFirst];
                                    for (let k = 0; k < this.producedListFirst.length; k++) {
                                        countProduced++
                                    }
                                    this.countProduced = countProduced
                                    this._primengProgressBarService.show()
                                    debugger
                                    debugger
                                    debugger
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdOrg).subscribe(e => {
                                        debugger
                                        debugger
                                        debugger
                                        this._primengProgressBarService.hide()
                                        let countRequired: number = 0
                                        this.requiredListFirst = []
                                        if (Array.isArray(e)) {
                                            this.requiredListFirst = e
                                        } else {
                                            this.requiredListFirst.push(...e)
                                        }
                                        for (let k = 0; k < this.requiredListFirst.length; k++) {
                                            if ('row' in this.requiredListFirst) {
                                            } else {
                                                this.requiredListFirst[k] = Object.assign(this.requiredListFirst[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }
                                        }
                                        this.apiTitleRequired = this.titleApiDe
                                        this.apiIdRequired = this.apiIdDe
                                        this.requiredListFirst = [...this.requiredListFirst];
                                        for (let k = 0; k < this.requiredListFirst.length; k++) {
                                            countRequired++
                                        }
                                        this.countRequired = countRequired
                                        this.dialogFirstMatchFlag = true
                                    }, error => {
                                        this._primengProgressBarService.hide()
                                    })


                                }, error => {
                                    this._primengProgressBarService.hide()
                                })
                            }
                            else if (this.actionTypeFirst == 2) {
                                debugger
                                this._primengProgressBarService.show()
                                this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdDe).subscribe(s => {
                                    this._primengProgressBarService.hide()
                                    let countProduced: number = 0
                                    this.producedListFirst = []
                                    if (Array.isArray(s)) {
                                        this.producedListFirst = s
                                    } else {
                                        this.producedListFirst.push(...s)
                                    }
                                    for (let k = 0; k < this.producedListFirst.length; k++) {
                                        if ('row' in this.producedListFirst) {
                                        } else {
                                            this.producedListFirst[k] = Object.assign(this.producedListFirst[k], {
                                                row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                , partyTitle: this.partyTitle
                                            })
                                        }
                                    }
                                    this.apiTitleProduced = this.titleApiDe
                                    this.apiIdProduced = this.apiIdDe
                                    this.producedListFirst = [...this.producedListFirst];

                                    for (let k = 0; k < this.producedListFirst.length; k++) {
                                        countProduced++
                                    }
                                    this.countProduced = countProduced
                                    this._primengProgressBarService.show()
                                    debugger
                                    debugger
                                    debugger
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdFirst).subscribe(e => {
                                        debugger
                                        debugger
                                        debugger
                                        this._primengProgressBarService.hide()
                                        let countRequired: number = 0
                                        this.requiredListFirst = []
                                        if (Array.isArray(e)) {
                                            this.requiredListFirst = e
                                        } else {
                                            this.requiredListFirst.push(...e)
                                        }
                                        for (let k = 0; k < this.requiredListFirst.length; k++) {
                                            if ('row' in this.requiredListFirst) {
                                            } else {
                                                this.requiredListFirst[k] = Object.assign(this.requiredListFirst[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }
                                        }
                                        this.apiTitleRequired = this.apiTitleFirst
                                        this.apiIdRequired = this.apiIdFirst
                                        this.requiredListFirst = [...this.requiredListFirst];

                                        for (let k = 0; k < this.requiredListFirst.length; k++) {
                                            countRequired++
                                        }
                                        this.countRequired = countRequired
                                        this.dialogFirstMatchFlag = true
                                    }, error => {
                                        this._primengProgressBarService.hide()
                                    })
                                }, error => {
                                    this._primengProgressBarService.hide()
                                })
                            } else {
                                this.notifierService.showError({detail: 'لطفا اولویت اجرا را انتخاب کنید'});
                            }
                        }
                    }
                    break;
                case 2:
                    debugger
                    if (this.validationSecondApi()) {
                        this.apiDto.apiId = this.apiIdSecond
                        if (this.matchListSecond.length > 0) {
                            if (this.actionTypeSecond == 1) {
                                this._primengProgressBarService.show()
                                this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdSecond).subscribe(l => {
                                    this._primengProgressBarService.hide()
                                    debugger
                                    let countProduced: number = 0
                                    this.producedListSecond = []
                                    if (Array.isArray(l)) {
                                        this.producedListSecond = l
                                    } else {
                                        this.producedListSecond.push(...l)
                                    }
                                    for (let k = 0; k < this.producedListSecond.length; k++) {
                                        if ('row' in this.producedListSecond) {
                                        } else {
                                            this.producedListSecond[k] = Object.assign(this.producedListSecond[k], {
                                                row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                , partyTitle: this.partyTitle
                                            })
                                        }
                                    }
                                    const filteredPro = this.producedListSecond.filter(proItem => {
                                        return !this.matchListSecond.some(tempMatchItem => tempMatchItem.producedId === proItem.producedId);
                                    });

                                    this.producedListSecond = []
                                    this.producedListSecond = filteredPro

                                    this.apiTitleProduced = this.apiTitleSecond
                                    this.apiIdProduced = this.apiIdSecond
                                    this.producedListSecond = [...this.producedListSecond];
                                    for (let k = 0; k < this.producedListFirst.length; k++) {
                                        countProduced++
                                    }
                                    this.countProduced = countProduced
                                    this._primengProgressBarService.show()
                                    debugger
                                    debugger
                                    debugger
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdFirst).subscribe(e => {
                                        debugger
                                        debugger
                                        debugger
                                        this._primengProgressBarService.hide()
                                        let countRequired: number = 0
                                        this.requiredListSecond = []
                                        if (Array.isArray(e)) {
                                            this.requiredListSecond = e
                                        } else {
                                            this.requiredListSecond.push(...e)
                                        }
                                        for (let k = 0; k < this.requiredListSecond.length; k++) {
                                            if ('row' in this.requiredListSecond) {
                                            } else {
                                                this.requiredListSecond[k] = Object.assign(this.requiredListSecond[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }
                                        }
                                        const filteredReq = this.requiredListSecond.filter(reqItem => {
                                            return !this.matchListSecond.some(tempMatchItem => tempMatchItem.requiredId === reqItem.requiredId);
                                        });
                                        this.requiredListSecond = []
                                        this.requiredListSecond = filteredReq

                                        this.apiTitleRequired = this.titleApiDe
                                        this.apiIdRequired = this.apiIdDe
                                        this.requiredListSecond = [...this.requiredListSecond];
                                        for (let k = 0; k < this.requiredListSecond.length; k++) {
                                            countRequired++
                                        }
                                        this.countRequired = countRequired
                                        this.dialogSecondMatchFlag = true
                                    }, error => {
                                        this._primengProgressBarService.hide()
                                    })
                                }, error => {
                                    this._primengProgressBarService.hide()
                                })

                            } else if (this.actionTypeSecond == 2) {
                                if (this.afterApiSecond == 1) {
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdDe).subscribe(o => {
                                        this._primengProgressBarService.hide()
                                        debugger
                                        let countProduced: number = 0
                                        this.producedListSecond = []
                                        if (Array.isArray(o)) {
                                            this.producedListSecond = o
                                        } else {
                                            this.producedListSecond.push(...o)
                                        }
                                        for (let k = 0; k < this.producedListSecond.length; k++) {
                                            if ('row' in this.producedListSecond) {
                                            } else {
                                                this.producedListSecond[k] = Object.assign(this.producedListSecond[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }
                                        }
                                        const filteredPro = this.producedListSecond.filter(proItem => {
                                            return !this.matchListSecond.some(tempMatchItem => tempMatchItem.producedId === proItem.producedId);
                                        });

                                        this.producedListSecond = []
                                        this.producedListSecond = filteredPro

                                        this.apiTitleProduced = this.titleApiDe
                                        this.apiIdProduced = this.apiIdDe
                                        this.producedListSecond = [...this.producedListSecond];
                                        for (let k = 0; k < this.producedListSecond.length; k++) {
                                            countProduced++
                                        }
                                        this.countProduced = countProduced
                                        this._primengProgressBarService.show()
                                        debugger
                                        debugger
                                        debugger
                                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdSecond).subscribe(e => {
                                            debugger
                                            debugger
                                            debugger
                                            this._primengProgressBarService.hide()
                                            let countRequired: number = 0
                                            this.requiredListSecond = []
                                            if (Array.isArray(e)) {
                                                this.requiredListSecond = e
                                            } else {
                                                this.requiredListSecond.push(...e)
                                            }
                                            for (let k = 0; k < this.requiredListSecond.length; k++) {
                                                if ('row' in this.requiredListSecond) {
                                                } else {
                                                    this.requiredListSecond[k] = Object.assign(this.requiredListSecond[k], {
                                                        row: (k + 1),
                                                        apiTitle: this.apiTitle,
                                                        moduleTitle: this.moduleTitle
                                                        ,
                                                        partyTitle: this.partyTitle
                                                    })
                                                }
                                            }
                                            const filteredReq = this.requiredListSecond.filter(reqItem => {
                                                return !this.matchListSecond.some(tempMatchItem => tempMatchItem.requiredId === reqItem.requiredId);
                                            });
                                            this.requiredListSecond = []
                                            this.requiredListSecond = filteredReq

                                            this.apiTitleRequired = this.apiTitleSecond
                                            this.apiIdRequired = this.apiIdSecond
                                            this.requiredListSecond = [...this.requiredListSecond];
                                            for (let k = 0; k < this.requiredListSecond.length; k++) {
                                                countRequired++
                                            }
                                            this.countRequired = countRequired
                                            this.dialogSecondMatchFlag = true
                                        }, error => {
                                            this._primengProgressBarService.hide()
                                        })
                                    }, error => {
                                        this._primengProgressBarService.hide()
                                    })


                                } else if (this.afterApiSecond == 2) {
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdFirst).subscribe(o => {
                                        debugger
                                        this._primengProgressBarService.hide()
                                        let countProduced: number = 0
                                        this.producedListSecond = []
                                        if (Array.isArray(o)) {
                                            this.producedListSecond = o
                                        } else {
                                            this.producedListSecond.push(...o)
                                        }
                                        for (let k = 0; k < this.producedListSecond.length; k++) {
                                            if ('row' in this.producedListSecond) {
                                            } else {
                                                this.producedListSecond[k] = Object.assign(this.producedListSecond[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }
                                        }
                                        const filteredPro = this.producedListSecond.filter(proItem => {
                                            return !this.matchListSecond.some(tempMatchItem => tempMatchItem.producedId === proItem.producedId);
                                        });

                                        this.producedListSecond = []
                                        this.producedListSecond = filteredPro

                                        this.apiTitleProduced = this.apiTitleSecond
                                        this.apiIdProduced = this.apiIdSecond
                                        this.producedListSecond = [...this.producedListSecond];
                                        for (let k = 0; k < this.producedListSecond.length; k++) {
                                            countProduced++
                                        }
                                        this.countProduced = countProduced
                                        this._primengProgressBarService.show()
                                        debugger
                                        debugger
                                        debugger
                                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdSecond).subscribe(e => {
                                            debugger
                                            debugger
                                            debugger
                                            this._primengProgressBarService.hide()
                                            let countRequired: number = 0
                                            this.requiredListSecond = []
                                            if (Array.isArray(e)) {
                                                this.requiredListSecond = e
                                            } else {
                                                this.requiredListSecond.push(...e)
                                            }
                                            for (let k = 0; k < this.requiredListSecond.length; k++) {
                                                if ('row' in this.requiredListSecond) {
                                                } else {
                                                    this.requiredListSecond[k] = Object.assign(this.requiredListSecond[k], {
                                                        row: (k + 1),
                                                        apiTitle: this.apiTitle,
                                                        moduleTitle: this.moduleTitle
                                                        ,
                                                        partyTitle: this.partyTitle
                                                    })
                                                }
                                            }
                                            const filteredReq = this.requiredListSecond.filter(reqItem => {
                                                return !this.matchListSecond.some(tempMatchItem => tempMatchItem.requiredId === reqItem.requiredId);
                                            });
                                            this.requiredListSecond = []
                                            this.requiredListSecond = filteredReq

                                            this.apiTitleRequired = this.titleApiDe
                                            this.apiIdRequired = this.apiIdDe
                                            this.requiredListSecond = [...this.requiredListSecond];
                                            for (let k = 0; k < this.requiredListSecond.length; k++) {
                                                countRequired++
                                            }
                                            this.countRequired = countRequired
                                            this.dialogSecondMatchFlag = true
                                        }, error => {
                                            this._primengProgressBarService.hide()
                                        })
                                    }, error => {
                                        this._primengProgressBarService.hide()
                                    })
                                }
                            } else {
                                this.notifierService.showError({detail: 'لطفا اولویت اجرا را انتخاب کنید'});
                            }
                        } else {
                            if (this.actionTypeSecond == 1) {
                                this._primengProgressBarService.show()
                                this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdSecond).subscribe(l => {
                                    debugger
                                    this._primengProgressBarService.hide()
                                    let countProduced: number = 0
                                    this.producedListSecond = []
                                    if (Array.isArray(l)) {
                                        this.producedListSecond = l
                                    } else {
                                        this.producedListSecond.push(...l)
                                    }
                                    for (let k = 0; k < this.producedListSecond.length; k++) {
                                        if ('row' in this.producedListSecond) {
                                        } else {
                                            this.producedListSecond[k] = Object.assign(this.producedListSecond[k], {
                                                row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                , partyTitle: this.partyTitle
                                            })
                                        }
                                    }
                                    this.apiTitleProduced = this.apiTitleSecond
                                    this.apiIdProduced = this.apiIdSecond
                                    this.producedListSecond = [...this.producedListSecond];

                                    for (let k = 0; k < this.producedListSecond.length; k++) {
                                        countProduced++
                                    }
                                    this.countProduced = countProduced
                                    this._primengProgressBarService.show()
                                    debugger
                                    debugger
                                    debugger
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdFirst).subscribe(e => {
                                        debugger
                                        debugger
                                        debugger
                                        this._primengProgressBarService.hide()
                                        debugger
                                        let countRequired: number = 0
                                        this.requiredListSecond = []
                                        if (Array.isArray(e)) {
                                            this.requiredListSecond = e
                                        } else {
                                            this.requiredListSecond.push(...e)
                                        }
                                        for (let k = 0; k < this.requiredListSecond.length; k++) {
                                            if ('row' in this.requiredListSecond) {
                                            } else {
                                                this.requiredListSecond[k] = Object.assign(this.requiredListSecond[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }
                                        }
                                        debugger
                                        debugger
                                        debugger
                                        this.apiTitleRequired = this.apiTitleFirst
                                        this.apiIdRequired = this.apiIdFirst
                                        this.requiredListSecond = [...this.requiredListSecond];

                                        for (let k = 0; k < this.requiredListSecond.length; k++) {
                                            countRequired++
                                        }
                                        this.countRequired = countRequired
                                        this.dialogSecondMatchFlag = true
                                    }, error => {
                                        this._primengProgressBarService.hide()
                                    })
                                }, error => {
                                    this._primengProgressBarService.hide()
                                })
                            } else if (this.actionTypeSecond == 2) {
                                if (this.afterApiSecond == 1) {
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdDe).subscribe(s => {
                                        debugger
                                        this._primengProgressBarService.hide()
                                        let countProduced: number = 0
                                        this.producedListSecond = []
                                        if (Array.isArray(s)) {
                                            this.producedListSecond = s
                                        } else {
                                            this.producedListSecond.push(...s)
                                        }
                                        for (let k = 0; k < this.producedListSecond.length; k++) {
                                            if ('row' in this.producedListSecond) {
                                            } else {
                                                this.producedListSecond[k] = Object.assign(this.producedListSecond[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }
                                        }
                                        this.apiTitleProduced = this.titleApiDe
                                        this.apiIdProduced = this.apiIdDe
                                        this.producedListSecond = [...this.producedListSecond];

                                        for (let k = 0; k < this.producedListSecond.length; k++) {
                                            countProduced++
                                        }
                                        this.countProduced = countProduced
                                        this._primengProgressBarService.show()
                                        debugger
                                        debugger
                                        debugger
                                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdSecond).subscribe(e => {
                                            debugger
                                            debugger
                                            debugger
                                            this._primengProgressBarService.hide()
                                            let countRequired: number = 0
                                            this.requiredListSecond = []
                                            if (Array.isArray(e)) {
                                                this.requiredListSecond = e
                                            } else {
                                                this.requiredListSecond.push(...e)
                                            }
                                            for (let k = 0; k < this.requiredListSecond.length; k++) {
                                                if ('row' in this.requiredListSecond) {
                                                } else {
                                                    this.requiredListSecond[k] = Object.assign(this.requiredListSecond[k], {
                                                        row: (k + 1),
                                                        apiTitle: this.apiTitle,
                                                        moduleTitle: this.moduleTitle
                                                        ,
                                                        partyTitle: this.partyTitle
                                                    })
                                                }
                                            }
                                            this.apiTitleRequired = this.apiTitleSecond
                                            this.apiIdRequired = this.apiIdSecond
                                            this.requiredListSecond = [...this.requiredListSecond];
                                            for (let k = 0; k < this.requiredListSecond.length; k++) {
                                                countRequired++
                                            }
                                            this.countRequired = countRequired
                                            this.dialogSecondMatchFlag = true
                                        }, error => {
                                            this._primengProgressBarService.hide()
                                        })
                                    }, error => {
                                        this._primengProgressBarService.hide()
                                    })
                                } else if (this.afterApiSecond == 2) {
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdFirst).subscribe(s => {
                                        debugger
                                        this._primengProgressBarService.hide()
                                        let countProduced: number = 0
                                        this.producedListSecond = []
                                        if (Array.isArray(s)) {
                                            this.producedListSecond = s
                                        } else {
                                            this.producedListSecond.push(...s)
                                        }
                                        for (let k = 0; k < this.producedListSecond.length; k++) {
                                            if ('row' in this.producedListSecond) {
                                            } else {
                                                this.producedListSecond[k] = Object.assign(this.producedListSecond[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }
                                        }
                                        this.apiTitleProduced = this.apiTitleFirst
                                        this.apiIdProduced = this.apiIdFirst
                                        this.producedListSecond = [...this.producedListSecond];

                                        for (let k = 0; k < this.producedListSecond.length; k++) {
                                            countProduced++
                                        }
                                        this.countProduced = countProduced
                                        this._primengProgressBarService.show()
                                        debugger
                                        debugger
                                        debugger
                                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdSecond).subscribe(e => {
                                            debugger
                                            debugger
                                            debugger
                                            this._primengProgressBarService.hide()
                                            debugger
                                            let countRequired: number = 0
                                            this.requiredListSecond = []
                                            if (Array.isArray(e)) {
                                                this.requiredListSecond = e
                                            } else {
                                                this.requiredListSecond.push(...e)
                                            }
                                            for (let k = 0; k < this.requiredListSecond.length; k++) {
                                                if ('row' in this.requiredListSecond) {
                                                } else {
                                                    this.requiredListSecond[k] = Object.assign(this.requiredListSecond[k], {
                                                        row: (k + 1),
                                                        apiTitle: this.apiTitle,
                                                        moduleTitle: this.moduleTitle
                                                        ,
                                                        partyTitle: this.partyTitle
                                                    })
                                                }
                                            }
                                            this.apiTitleRequired = this.apiTitleSecond
                                            this.apiIdRequired = this.apiIdSecond
                                            this.requiredListSecond = [...this.requiredListSecond];
                                            for (let k = 0; k < this.requiredListSecond.length; k++) {
                                                countRequired++
                                            }
                                            this.countRequired = countRequired
                                            this.dialogSecondMatchFlag = true
                                        }, error => {
                                            this._primengProgressBarService.hide()
                                        })
                                    }, error => {
                                        this._primengProgressBarService.hide()
                                    })
                                }
                            } else {
                                this.notifierService.showError({detail: 'لطفا اولویت اجرا را انتخاب کنید'});
                            }
                        }
                    }
                    break;
                case 3:
                    debugger
                    if (this.validationThirdApi()) {
                        this.apiDto.apiId = this.apiIdThird
                        if (this.matchListThird.length > 0) {
                            if (this.actionTypeThird == 2) {
                                if (this.afterApiThird == 1) {
                                    debugger
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdDe).subscribe(s => {
                                        debugger
                                        this._primengProgressBarService.hide()
                                        let countProduced: number = 0
                                        this.producedListThird = []
                                        if (Array.isArray(s)) {
                                            this.producedListThird = s
                                        } else {
                                            this.producedListThird.push(...s)
                                        }
                                        for (let k = 0; k < this.producedListThird.length; k++) {
                                            if ('row' in this.producedListThird) {
                                            } else {
                                                this.producedListThird[k] = Object.assign(this.producedListThird[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }
                                        }
                                        const filteredPro = this.producedListThird.filter(proItem => {
                                            return !this.matchListThird.some(tempMatchItem => tempMatchItem.requiredId === proItem.requiredId);
                                        });
                                        this.producedListThird = []
                                        this.producedListThird = filteredPro

                                        this.apiTitleProduced = this.titleApiDe
                                        this.apiIdProduced = this.apiIdDe
                                        this.producedListThird = [...this.producedListThird];
                                        this.dialogThirdMatchFlag = true
                                        for (let k = 0; k < this.producedListThird.length; k++) {
                                            countProduced++
                                        }
                                        this.countProduced = countProduced
                                        this._primengProgressBarService.show()
                                        debugger
                                        debugger
                                        debugger
                                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdThird).subscribe(e => {
                                            debugger
                                            debugger
                                            debugger
                                            this._primengProgressBarService.hide()
                                            let countRequired: number = 0
                                            this.requiredListThird = []
                                            if (Array.isArray(e)) {
                                                this.requiredListThird = e
                                            } else {
                                                this.requiredListThird.push(...e)
                                            }
                                            for (let k = 0; k < this.requiredListThird.length; k++) {
                                                if ('row' in this.requiredListThird) {
                                                } else {
                                                    this.requiredListThird[k] = Object.assign(this.requiredListThird[k], {
                                                        row: (k + 1),
                                                        apiTitle: this.apiTitle,
                                                        moduleTitle: this.moduleTitle
                                                        ,
                                                        partyTitle: this.partyTitle
                                                    })
                                                }
                                            }

                                            const filteredReq = this.requiredListThird.filter(reqItem => {
                                                return !this.matchListThird.some(tempMatchItem => tempMatchItem.requiredId === reqItem.requiredId);
                                            });
                                            this.requiredListThird = []
                                            this.requiredListThird = filteredReq

                                            this.apiTitleRequired = this.apiTitleThird
                                            this.apiIdRequired = this.apiIdThird
                                            this.requiredListThird = [...this.requiredListThird];
                                            for (let k = 0; k < this.requiredListThird.length; k++) {
                                                countRequired++
                                            }
                                            this.countRequired = countRequired
                                        }, error => {
                                            this._primengProgressBarService.hide()
                                        })
                                    }, error => {
                                        this._primengProgressBarService.hide()
                                    })
                                } else if (this.afterApiThird == 2) {
                                    debugger
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdFirst).subscribe(s => {
                                        debugger
                                        this._primengProgressBarService.hide()
                                        let countProduced: number = 0
                                        this.producedListThird = []
                                        if (Array.isArray(s)) {
                                            this.producedListThird = s
                                        } else {
                                            this.producedListThird.push(...s)
                                        }
                                        for (let k = 0; k < this.producedListThird.length; k++) {
                                            if ('row' in this.producedListThird) {
                                            } else {
                                                this.producedListThird[k] = Object.assign(this.producedListThird[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }
                                        }
                                        const filteredPro = this.producedListThird.filter(proItem => {
                                            return !this.matchListThird.some(tempMatchItem => tempMatchItem.requiredId === proItem.requiredId);
                                        });
                                        this.producedListThird = []
                                        this.producedListThird = filteredPro

                                        this.apiTitleProduced = this.apiTitleFirst
                                        this.apiIdProduced = this.apiIdFirst
                                        this.producedListThird = [...this.producedListThird];
                                        this.dialogThirdMatchFlag = true
                                        for (let k = 0; k < this.producedListThird.length; k++) {
                                            countProduced++
                                        }
                                        this.countProduced = countProduced
                                        this._primengProgressBarService.show()
                                        debugger
                                        debugger
                                        debugger
                                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdThird).subscribe(e => {
                                            debugger
                                            debugger
                                            debugger
                                            this._primengProgressBarService.hide()
                                            let countRequired: number = 0
                                            this.requiredListThird = []
                                            if (Array.isArray(e)) {
                                                this.requiredListThird = e
                                            } else {
                                                this.requiredListThird.push(...e)
                                            }
                                            for (let k = 0; k < this.requiredListThird.length; k++) {
                                                if ('row' in this.requiredListThird) {
                                                } else {
                                                    this.requiredListThird[k] = Object.assign(this.requiredListThird[k], {
                                                        row: (k + 1),
                                                        apiTitle: this.apiTitle,
                                                        moduleTitle: this.moduleTitle
                                                        ,
                                                        partyTitle: this.partyTitle
                                                    })
                                                }
                                            }

                                            const filteredReq = this.requiredListThird.filter(reqItem => {
                                                return !this.matchListThird.some(tempMatchItem => tempMatchItem.requiredId === reqItem.requiredId);
                                            });
                                            this.requiredListThird = []
                                            this.requiredListThird = filteredReq

                                            this.apiTitleRequired = this.apiTitleThird
                                            this.apiIdRequired = this.apiIdThird
                                            this.requiredListThird = [...this.requiredListThird];
                                            for (let k = 0; k < this.requiredListThird.length; k++) {
                                                countRequired++
                                            }
                                            this.countRequired = countRequired
                                        }, error => {

                                            this._primengProgressBarService.hide()
                                        })
                                    }, error => {

                                        this._primengProgressBarService.hide()
                                    })
                                } else if (this.afterApiThird == 3) {
                                    debugger
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdSecond).subscribe(s => {
                                        debugger
                                        this._primengProgressBarService.hide()
                                        let countProduced: number = 0
                                        this.producedListThird = []
                                        if (Array.isArray(s)) {
                                            this.producedListThird = s
                                        } else {
                                            this.producedListThird.push(...s)
                                        }
                                        for (let k = 0; k < this.producedListThird.length; k++) {
                                            if ('row' in this.producedListThird) {
                                            } else {
                                                this.producedListThird[k] = Object.assign(this.producedListThird[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }
                                        }
                                        const filteredPro = this.producedListThird.filter(proItem => {
                                            return !this.matchListThird.some(tempMatchItem => tempMatchItem.requiredId === proItem.requiredId);
                                        });
                                        this.producedListThird = []
                                        this.producedListThird = filteredPro

                                        this.apiTitleProduced = this.apiTitleSecond
                                        this.apiIdProduced = this.apiIdSecond
                                        this.producedListThird = [...this.producedListThird];
                                        this.dialogThirdMatchFlag = true
                                        for (let k = 0; k < this.producedListThird.length; k++) {
                                            countProduced++
                                        }
                                        this.countProduced = countProduced
                                        this._primengProgressBarService.show()
                                        debugger
                                        debugger
                                        debugger
                                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdThird).subscribe(e => {
                                            debugger
                                            debugger
                                            debugger
                                            this._primengProgressBarService.hide()
                                            let countRequired: number = 0
                                            this.requiredListThird = []
                                            if (Array.isArray(e)) {
                                                this.requiredListThird = e
                                            } else {
                                                this.requiredListThird.push(...e)
                                            }
                                            for (let k = 0; k < this.requiredListThird.length; k++) {
                                                if ('row' in this.requiredListThird) {
                                                } else {
                                                    this.requiredListThird[k] = Object.assign(this.requiredListThird[k], {
                                                        row: (k + 1),
                                                        apiTitle: this.apiTitle,
                                                        moduleTitle: this.moduleTitle
                                                        ,
                                                        partyTitle: this.partyTitle
                                                    })
                                                }
                                            }

                                            const filteredReq = this.requiredListThird.filter(reqItem => {
                                                return !this.matchListThird.some(tempMatchItem => tempMatchItem.requiredId === reqItem.requiredId);
                                            });
                                            this.requiredListThird = []
                                            this.requiredListThird = filteredReq

                                            this.apiTitleRequired = this.apiTitleThird
                                            this.apiIdRequired = this.apiIdThird
                                            this.requiredListThird = [...this.requiredListThird];
                                            for (let k = 0; k < this.requiredListThird.length; k++) {
                                                countRequired++
                                            }
                                            this.countRequired = countRequired
                                        }, error => {
                                            this._primengProgressBarService.hide()
                                        })
                                    }, error => {
                                        this._primengProgressBarService.hide()
                                    })
                                }

                            } else {
                                this.notifierService.showError({detail: 'لطفا اولویت اجرا را انتخاب کنید'});
                            }
                        } else {
                            if (this.actionTypeThird == 2) {
                                if (this.afterApiThird == 1) {
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdDe).subscribe(s => {
                                        debugger
                                        this._primengProgressBarService.hide()
                                        let countProduced: number = 0
                                        this.producedListThird = []
                                        if (Array.isArray(s)) {
                                            this.producedListThird = s
                                        } else {
                                            this.producedListThird.push(...s)
                                        }
                                        for (let k = 0; k < this.producedListThird.length; k++) {
                                            if ('row' in this.producedListThird) {
                                            } else {
                                                this.producedListThird[k] = Object.assign(this.producedListThird[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }
                                        }
                                        for (let k = 0; k < this.producedListThird.length; k++) {
                                            countProduced++
                                        }
                                        this.countProduced = countProduced
                                        this._primengProgressBarService.show()
                                        debugger
                                        debugger
                                        debugger
                                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdThird).subscribe(e => {
                                            debugger
                                            debugger
                                            debugger
                                            this._primengProgressBarService.hide()
                                            let countRequired: number = 0
                                            this.requiredListThird = []
                                            if (Array.isArray(e)) {
                                                this.requiredListThird = e
                                            } else {
                                                this.requiredListThird.push(...e)
                                            }
                                            for (let k = 0; k < this.requiredListThird.length; k++) {
                                                if ('row' in this.requiredListThird) {
                                                } else {
                                                    this.requiredListThird[k] = Object.assign(this.requiredListThird[k], {
                                                        row: (k + 1),
                                                        apiTitle: this.apiTitle,
                                                        moduleTitle: this.moduleTitle
                                                        ,
                                                        partyTitle: this.partyTitle
                                                    })
                                                }
                                            }
                                            this.apiTitleRequired = this.apiTitleThird
                                            this.apiIdRequired = this.apiIdThird
                                            this.requiredListThird = [...this.requiredListThird];
                                            for (let k = 0; k < this.requiredListThird.length; k++) {
                                                countRequired++
                                            }
                                            this.countRequired = countRequired
                                            this.dialogThirdMatchFlag = true
                                        }, error => {
                                            this._primengProgressBarService.hide()
                                        })

                                        this.apiTitleProduced = this.titleApiDe
                                        this.apiIdProduced = this.apiIdDe
                                        this.producedListThird = [...this.producedListThird];

                                    }, error => {
                                        this._primengProgressBarService.hide()
                                    })
                                } else if (this.afterApiThird == 2) {
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdFirst).subscribe(s => {
                                        debugger
                                        this._primengProgressBarService.hide()
                                        let countProduced: number = 0
                                        this.producedListThird = []
                                        if (Array.isArray(s)) {
                                            this.producedListThird = s
                                        } else {
                                            this.producedListThird.push(...s)
                                        }
                                        for (let k = 0; k < this.producedListThird.length; k++) {
                                            if ('row' in this.producedListThird) {
                                            } else {
                                                this.producedListThird[k] = Object.assign(this.producedListThird[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }
                                        }
                                        for (let k = 0; k < this.producedListThird.length; k++) {
                                            countProduced++
                                        }
                                        this.countProduced = countProduced
                                        this._primengProgressBarService.show()
                                        debugger
                                        debugger
                                        debugger
                                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdThird).subscribe(e => {
                                            debugger
                                            debugger
                                            debugger
                                            this._primengProgressBarService.hide()
                                            let countRequired: number = 0
                                            this.requiredListThird = []
                                            if (Array.isArray(e)) {
                                                this.requiredListThird = e
                                            } else {
                                                this.requiredListThird.push(...e)
                                            }
                                            for (let k = 0; k < this.requiredListThird.length; k++) {
                                                if ('row' in this.requiredListThird) {
                                                } else {
                                                    this.requiredListThird[k] = Object.assign(this.requiredListThird[k], {
                                                        row: (k + 1),
                                                        apiTitle: this.apiTitle,
                                                        moduleTitle: this.moduleTitle
                                                        ,
                                                        partyTitle: this.partyTitle
                                                    })
                                                }
                                            }
                                            this.apiTitleRequired = this.apiTitleThird
                                            this.apiIdRequired = this.apiIdThird
                                            this.requiredListThird = [...this.requiredListThird];
                                            for (let k = 0; k < this.requiredListThird.length; k++) {
                                                countRequired++
                                            }
                                            this.countRequired = countRequired
                                            this.dialogThirdMatchFlag = true
                                        }, error => {
                                            this._primengProgressBarService.hide()
                                        })

                                        this.apiTitleProduced = this.apiTitleFirst
                                        this.apiIdProduced = this.apiIdFirst
                                        this.producedListThird = [...this.producedListThird];

                                    }, error => {
                                        this._primengProgressBarService.hide()
                                    })
                                } else if (this.afterApiThird == 3) {
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdSecond).subscribe(s => {
                                        debugger
                                        this._primengProgressBarService.hide()
                                        let countProduced: number = 0
                                        this.producedListThird = []
                                        if (Array.isArray(s)) {
                                            this.producedListThird = s
                                        } else {
                                            this.producedListThird.push(...s)
                                        }
                                        for (let k = 0; k < this.producedListThird.length; k++) {
                                            if ('row' in this.producedListThird) {
                                            } else {
                                                this.producedListThird[k] = Object.assign(this.producedListThird[k], {
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
                                                })
                                            }
                                        }
                                        for (let k = 0; k < this.producedListThird.length; k++) {
                                            countProduced++
                                        }
                                        this.countProduced = countProduced
                                        this._primengProgressBarService.show()
                                        debugger
                                        debugger
                                        debugger
                                        this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdThird).subscribe(e => {
                                            debugger
                                            debugger
                                            debugger
                                            this._primengProgressBarService.hide()
                                            let countRequired: number = 0
                                            this.requiredListThird = []
                                            if (Array.isArray(e)) {
                                                this.requiredListThird = e
                                            } else {
                                                this.requiredListThird.push(...e)
                                            }
                                            for (let k = 0; k < this.requiredListThird.length; k++) {
                                                if ('row' in this.requiredListThird) {
                                                } else {
                                                    this.requiredListThird[k] = Object.assign(this.requiredListThird[k], {
                                                        row: (k + 1),
                                                        apiTitle: this.apiTitle,
                                                        moduleTitle: this.moduleTitle
                                                        ,
                                                        partyTitle: this.partyTitle
                                                    })
                                                }
                                            }
                                            this.apiTitleRequired = this.apiTitleThird
                                            this.apiIdRequired = this.apiIdThird
                                            this.requiredListThird = [...this.requiredListThird];
                                            for (let k = 0; k < this.requiredListThird.length; k++) {
                                                countRequired++
                                            }
                                            this.countRequired = countRequired
                                            this.dialogThirdMatchFlag = true
                                        }, error => {
                                            this._primengProgressBarService.hide()
                                        })

                                        this.apiTitleProduced = this.apiTitleSecond
                                        this.apiIdProduced = this.apiIdSecond
                                        this.producedListThird = [...this.producedListThird];

                                    }, error => {
                                        this._primengProgressBarService.hide()
                                    })
                                }
                            } else {
                                this.notifierService.showError({detail: 'لطفا اولویت اجرا را انتخاب کنید'});
                            }
                        }
                    }
                    break
            }
        }

    }

    onchangeAsyncSecond() {
        if (this.actionTypeSecond == 2) {
            if (!this.runAsyncSecond) {
                this.afterApiOptionsSecond = [
                    {name: '-', code: null},
                    {name: 'سرویس اصلی', code: 1},
                ]
                this.preventSecond = false
            } else if (this.runAsyncSecond) {
                this.afterApiOptionsSecond = [
                    {name: '-', code: null},
                    {name: 'سرویس اصلی', code: 1},
                    {name: 'سرویس اول', code: 2},
                ]
                this.preventSecond = true
            }
        }


    }

    onchangeAsyncThird() {
        if (this.actionTypeThird == 2) {
            if (!this.runAsyncThird) {
                this.afterApiOptionsThird = [
                    {name: '-', code: null},
                    {name: 'سرویس اصلی', code: 1},
                ]
                this.preventThird = false
            } else if (this.runAsyncThird) {
                this.afterApiOptionsThird = [
                    {name: '-', code: null},
                    {name: 'سرویس اصلی', code: 1},
                    {name: 'سرویس اول', code: 2},
                    {name: 'سرویس دوم', code: 3},
                ]
                this.preventThird = true
            }
        }
    }

    closeMatchNodesFirst() {
        this.dialogFirstMatchFlag = false
    }

    closeMatchNodesSecond() {
        this.dialogSecondMatchFlag = false
    }

    closeMatchNodesThird() {
        this.dialogThirdMatchFlag = false
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
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
                        index: 1, label_index1: "لیست دسترسی", rout_index1: "", isActive1: false,
                        img_index1: "assets/icons/access.png",
                        label_Detail_index1: null
                    },
                    {
                        index: 2, label_index2: "سرویس", rout_index2: null, isActive2: false,
                        label_Detail_index2: '(' + this.clientName + ')',
                        img_index2: "assets/icons/api.png"
                    },
                    {
                        index: 3, label_index3: "مدیریت جریان پردازشی", rout_index3: null, isActive3: true,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: "assets/icons/flow.png"
                    }, {label_index4: null}, {label_index5: null},
                    {label_index6: null, label_Detail_index6: null}
                ]
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
                        index: 1, label_index1: "کلاینت", rout_index1: '/client', isActive1: false,
                        img_index1: "assets/icons/client.png"
                    },
                    {
                        index: 2, label_index2: "لیست دسترسی", rout_index2: null, isActive2: false,
                        img_index2: "assets/icons/access.png",
                        label_Detail_index2: '(' + this.clientName + ')'
                    },
                    {
                        index: 3, label_index3: "سرویس", rout_index3: null, isActive3: false,
                        label_Detail_index3: '(لیست دسترسی)',
                        img_index3: "assets/icons/api.png"
                    },
                    {
                        index: 4, label_index4: "مدیریت جریان پردازشی", rout_index4: null, isActive4: true,
                        label_Detail_index4: '(' + this.apiTitle + ')',
                        img_index4: "assets/icons/flow.png"
                    }, {label_index5: null}, {label_index6: null}
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
                        index: 1, label_index1: "ماژول", rout_index1: '/module', isActive1: false,
                        img_index1: "assets/icons/module.png"
                    },
                    {
                        index: 2, label_index2: "سرویس", rout_index2: null, isActive2: false,
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                        img_index2: "assets/icons/api.png"
                    },
                    {
                        index: 3, label_index3: "مدیریت جریان پردازشی", rout_index3: null, isActive3: true,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: "assets/icons/flow.png"
                    }, {label_index4: null}, {label_index5: null}, {label_index6: null}
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
                        index: 2, label_index2: "ماژول", rout_index2: '',
                        isActive2: false, label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: "assets/icons/module.png"
                    },
                    {
                        index: 3, label_index3: "سرویس", rout_index3: null, isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: "assets/icons/api.png"
                    },
                    {
                        index: 4, label_index4: "مدیریت جریان پردازشی", rout_index4: null, isActive4: true,
                        label_Detail_index4: '(' + this.apiTitle + ')',
                        img_index4: "assets/icons/flow.png"
                    }, {label_index5: null}, {label_index6: null}]
            default:
                return null
        }
    }

    matchingFirst() {
        debugger
        let producedId: number = null
        let requiredId: number = null
        let nodeNameProduced: string = null
        let nodePlaceProduced: string = null
        let nodePathProduced: string = null
        let nodePlaceRrequired: string = null
        let nodeNameRrequired: string = null
        let nodePathRrequired: string = null

        if (this.producedNode.producedId != undefined && this.producedNode != null) {
            this.producedListFirst.forEach(s => {
                if (s.producedId == this.producedNode.producedId) {
                    producedId = s.producedId
                    nodeNameProduced = s.nodeName
                    nodePlaceProduced = s.nodePlace
                    nodePathProduced = s.nodePath

                }
            })
        } else {
            this.notifierService.showError({detail: 'برای اتصال نود ها باید نود تولید شده انتخاب شده باشد!'})
        }

        if (this.requiredNode.requiredId != undefined && this.requiredNode != null) {
            this.requiredListFirst.forEach(s => {
                if (s.requiredId == this.requiredNode.requiredId) {

                    requiredId = s.requiredId
                    nodeNameRrequired = s.nodeName
                    nodePlaceRrequired = s.nodePlace
                    nodePathRrequired = s.nodePath

                }
            })
        } else {
            this.notifierService.showError({detail: 'برای اتصال نود ها باید نود مورد نیاز انتخاب شده باشد!'})
        }


        if (this.producedNode != undefined
            && this.requiredNode != undefined
            && this.requiredNode != null
            && this.producedNode != null
        ) {
            let countRequired: number = 0
            let countProduced: number = 0
            debugger
            this.matchListFirst.push({
                firstApi: this.apiTitleProduced,
                firstApiId: this.apiIdProduced,
                secondApi: this.apiTitleRequired,
                secondApiId: this.apiIdRequired,
                nodeNameRequired: nodeNameRrequired,
                nodeNameProduced: nodeNameProduced,
                nodePlaceProduced: nodePlaceProduced,
                nodePlaceRrequired: nodePlaceRrequired,
                nodePathRrequired: nodePathRrequired,
                nodePathProduced: nodePathProduced,
                requiredId: this.requiredNode.requiredId,
                producedId: this.producedNode.producedId,
                actionType: this.actionTypeFirst
            })
            let itemIndexProduced = this.producedListFirst.indexOf(this.producedNode);
            let tempProducedList = this.producedListFirst
            this.producedListFirst = [...tempProducedList];
            this.producedListFirst.splice(itemIndexProduced, 1);

            for (let k = 0; k < this.producedListFirst.length; k++) {
                countProduced++
            }
            this.countProduced = countProduced
            let itemIndexRequired = this.requiredListFirst.indexOf(this.requiredNode);
            let tempRequiredList = this.requiredListFirst
            this.requiredListFirst = [...tempRequiredList];
            this.requiredListFirst.splice(itemIndexRequired, 1);
            for (let k = 0; k < this.requiredListFirst.length; k++) {
                countRequired++
            }
            this.countRequired = countRequired
            for (let k = 0; k < this.matchListFirst.length; k++) {
                if ('row' in this.matchListFirst) {
                } else {
                    this.matchListFirst[k] = Object.assign(this.matchListFirst[k], {
                        row: (k + 1),
                    })
                }
            }

        } else {
            this.notifierService.showError({detail: 'برای اتصال نود ها باید نود مورد نیاز و نود های تولید شده انتخاب شده باشد!'})

        }
        this.requiredNode = null
        this.producedNode = null
    }

    matchingSecond() {
        let producedId: number = null
        let requiredId: number = null
        let nodeNameProduced: string = null
        let nodePlaceProduced: string = null
        let nodePathProduced: string = null
        let nodePlaceRrequired: string = null
        let nodeNameRrequired: string = null
        let nodePathRrequired: string = null
        if (this.producedNode.producedId != undefined && this.producedNode != null) {
            this.producedListSecond.forEach(s => {
                if (s.producedId == this.producedNode.producedId) {

                    producedId = s.producedId
                    nodeNameProduced = s.nodeName
                    nodePlaceProduced = s.nodePlace
                    nodePathProduced = s.nodePath

                }
            })
        } else {
            this.notifierService.showError({detail: 'برای اتصال نود ها باید نود تولید شده انتخاب شده باشد!'})
        }

        if (this.requiredNode.requiredId != undefined && this.requiredNode != null) {
            this.requiredListSecond.forEach(s => {
                if (s.requiredId == this.requiredNode.requiredId) {

                    requiredId = s.requiredId
                    nodeNameRrequired = s.nodeName
                    nodePlaceRrequired = s.nodePlace
                    nodePathRrequired = s.nodePath

                }
            })
        } else {
            this.notifierService.showError({detail: 'برای اتصال نود ها باید نود مورد نیاز انتخاب شده باشد!'})
        }
        if (this.producedNode != undefined
            && this.requiredNode != undefined
            && this.requiredNode != null
            && this.producedNode != null
        ) {
            let countRequired: number = 0
            let countProduced: number = 0
            this.matchListSecond.push({
                firstApi: this.apiTitleProduced,
                producedId: this.producedNode.producedId,
                nodeNameProduced: nodeNameProduced,
                secondApi: this.apiTitleRequired,
                requiredId: this.requiredNode.requiredId,
                nodeNameRequired: nodeNameRrequired,
                nodePlaceRequired: nodeNameRrequired,
                nodePlaceProduced: nodePlaceProduced
            })
            let itemIndexProduced = this.producedListSecond.indexOf(this.producedNode);
            let tempProducedList = this.producedListSecond
            this.producedListSecond = [...tempProducedList];
            this.producedListSecond.splice(itemIndexProduced, 1);
            for (let k = 0; k < this.producedListSecond.length; k++) {
                countProduced++
            }
            this.countProduced = countProduced

            let itemIndexRequired = this.requiredListSecond.indexOf(this.requiredNode);
            let tempRequiredList = this.requiredListSecond
            this.requiredListSecond = [...tempRequiredList];
            this.requiredListSecond.splice(itemIndexRequired, 1);
            for (let k = 0; k < this.requiredListSecond.length; k++) {
                countRequired++
            }
            this.countRequired = countRequired
            for (let k = 0; k < this.matchListSecond.length; k++) {
                if ('row' in this.matchListSecond) {
                } else {
                    this.matchListSecond[k] = Object.assign(this.matchListSecond[k], {
                        row: (k + 1),
                    })
                }
            }
        } else {
            this.notifierService.showError({detail: 'برای اتصال نود ها باید نود مورد نیاز و نود های تولید شده انتخاب شده باشد!'})

        }
        this.requiredNode = null
        this.producedNode = null

    }

    matchingThird() {
        debugger
        let producedId: number = null
        let requiredId: number = null
        let nodeNameProduced: string = null
        let nodePlaceProduced: string = null
        let nodePathProduced: string = null
        let nodePlaceRrequired: string = null
        let nodeNameRrequired: string = null
        let nodePathRrequired: string = null
        debugger
        if (this.producedNode.producedId != undefined && this.producedNode != null) {
            this.producedListThird.forEach(s => {
                if (s.producedId == this.producedNode.producedId) {
                    producedId = s.producedId
                    nodeNameProduced = s.nodeName
                    nodePlaceProduced = s.nodePlace
                    nodePathProduced = s.nodePath
                }
            })
        } else {
            this.notifierService.showError({detail: 'برای اتصال نود ها باید نود تولید شده انتخاب شده باشد!'})
        }
        debugger
        if (this.requiredNode.requiredId != undefined && this.requiredNode != null) {
            this.requiredListThird.forEach(s => {
                if (s.requiredId == this.requiredNode.requiredId) {

                    requiredId = s.requiredId
                    nodeNameRrequired = s.nodeName
                    nodePlaceRrequired = s.nodePlace
                    nodePathRrequired = s.nodePath

                }
            })
        } else {
            this.notifierService.showError({detail: 'برای اتصال نود ها باید نود مورد نیاز انتخاب شده باشد!'})
        }
        if (this.producedNode != undefined
            && this.requiredNode != undefined
            && this.requiredNode != null
            && this.producedNode != null
        ) {
            let countRequired: number = 0
            let countProduced: number = 0
            debugger
            this.matchListThird.push({
                firstApi: this.apiTitleProduced,
                producedId: this.producedNode.producedId,
                nodeNameProduced: nodeNameProduced,
                secondApi: this.apiTitleRequired,
                requiredId: this.requiredNode.requiredId,
                nodeNameRequired: nodeNameRrequired,
                nodePlaceRequired: nodeNameRrequired,
                nodePlaceProduced: nodePlaceProduced
            })
            debugger
            let itemIndexProduced = this.producedListThird.indexOf(this.producedNode);
            let tempProducedList = this.producedListThird
            this.producedListThird = [...tempProducedList];
            this.producedListThird.splice(itemIndexProduced, 1);
            for (let k = 0; k < this.producedListThird.length; k++) {
                countProduced++
            }
            this.countProduced = countProduced

            let itemIndexRequired = this.requiredListThird.indexOf(this.requiredNode);
            let tempRequiredList = this.requiredListThird
            this.requiredListThird = [...tempRequiredList];
            this.requiredListThird.splice(itemIndexRequired, 1);
            for (let k = 0; k < this.requiredListThird.length; k++) {
                countRequired++
            }
            this.countRequired = countRequired
            for (let k = 0; k < this.matchListThird.length; k++) {
                if ('row' in this.matchListThird) {
                } else {
                    this.matchListThird[k] = Object.assign(this.matchListThird[k], {
                        row: (k + 1),
                    })
                }
            }
        } else {
            this.notifierService.showError({detail: 'برای اتصال نود ها باید نود مورد نیاز و نود های تولید شده انتخاب شده باشد!'})

        }
        this.requiredNode = null
        this.producedNode = null

    }

    deleteMatch(match) {
        debugger

        switch (this.pointerMatch) {

            case 1:
                let countProduced1: number = 0
                let countRequired1: number = 0
                this.producedListFirst = [...this.producedListFirst, {
                    producedId: match.producedId,
                    nodeName: match.nodeNameProduced,
                    nodePlace: match.nodePlaceProduced
                }];
                this.requiredListFirst = [...this.requiredListFirst, {
                    requiredId: match.requiredId,
                    nodePlace: match.nodePlaceRequired,
                    nodeName: match.nodeNameRequired
                }];

                for (let i = 0; i < this.matchListFirst.length; i++) {
                    if (this.matchListFirst[i].row == match.row) {
                        this.matchListFirst.splice(i, 1);
                        break;
                    }
                }
                for (let k = 0; k < this.producedListFirst.length; k++) {
                    countProduced1++
                }
                this.countProduced = countProduced1
                for (let k = 0; k < this.requiredListFirst.length; k++) {
                    countRequired1++
                }
                this.countRequired = countRequired1
                break;
            case 2:
                let countProduced2: number = 0
                let countRequired2: number = 0
                this.producedListSecond = [...this.requiredListSecond, {
                    producedId: match.producedId,
                    nodeName: match.nodeNameProduced,
                    nodePlace: match.nodePlaceProduced
                }];
                this.requiredListSecond = [...this.requiredListSecond, {
                    requiredId: match.requiredId,
                    nodePlace: match.nodePlaceRequired,
                    nodeName: match.nodeNameRequired
                }];
                for (let i = 0; i < this.matchListSecond.length; i++) {
                    if (this.matchListSecond[i].row == match.row) {
                        this.matchListSecond.splice(i, 1);
                        break;
                    }
                }
                for (let k = 0; k < this.producedListSecond.length; k++) {
                    countProduced2++
                }
                this.countProduced = countProduced2
                for (let k = 0; k < this.requiredListSecond.length; k++) {
                    countRequired2++
                }
                this.countRequired = countRequired2

                break;
            case 3:
                debugger
                let countProduced3: number = 0
                let countRequired3: number = 0
                this.producedListThird = [...this.producedListThird, {
                    producedId: match.producedId,
                    nodeName: match.nodeNameProduced,
                    nodePlace: match.nodePlaceProduced
                }];
                this.requiredListThird = [...this.requiredListThird, {
                    requiredId: match.requiredId,
                    nodePlace: match.nodePlaceRequired,
                    nodeName: match.nodeNameRequired
                }];
                for (let i = 0; i < this.matchListThird.length; i++) {
                    if (this.matchListThird[i].row == match.row) {
                        this.matchListThird.splice(i, 1);
                        break;
                    }
                }
                for (let k = 0; k < this.producedListThird.length; k++) {
                    countProduced3++
                }
                this.countProduced = countProduced3
                for (let k = 0; k < this.requiredListThird.length; k++) {
                    countRequired3++
                }
                this.countRequired = countRequired3
                break
        }
    }

    ngOnInit(): void {
        console.log('inputSequenceRegister',this.inputSequenceRegister)
        this.itemsFirst = [
            {
                label: 'اتصال نود های تولید شده و نود های مورد نیاز',
                icon: '',
                command: () => {
                    this.showMatchNodes(this.tempItem);
                }
            },
            {
                label: 'نود های تولید شده',
                icon: '',
                command: () => {
                    this.showProducedNode(this.tempItem);
                }
            },
            {
                label: 'نود های مورد نیاز',
                icon: '',
                command: () => {
                    this.showRequiredNode(this.tempItem);
                }
            },

            {
                label: '________________________',

            },
            {
                label: 'انصراف',
                /*items: [{
                    label: 'انصراف',

                }]*/
            }
        ];
        this.itemsDialog = [
            {
                label: 'حذف از لیست اتصال نود ها',
                icon: '',
                command: () => {
                    this.deleteMatch(this.tempItemDialog);
                }
            },

            {
                label: '______________________',
                items: [{
                    label: 'انصراف',

                }]
            }
        ];
        this._primengProgressBarService.show()
        this.messagesApiFacadeService.fetchallparty().subscribe(a => {
            this._primengProgressBarService.hide()
            this.partyListOptionsFirst.push(...a)
            this.partyListOptionsSecond.push(...a)
            this.partyListOptionsThird.push(...a)
            this.partyListOptionsFirst = this.partyListOptionsFirst.sort()
            this.partyListOptionsSecond = this.partyListOptionsSecond.sort()
            this.partyListOptionsThird = this.partyListOptionsThird.sort()
        }, error => {
            this._primengProgressBarService.hide()
        })
        this.apiDto = this.inputSequenceRegister
        this.apiDto.sequenceBase = true
        this._primengProgressBarService.show()
        this.apiGatewayService.currentApprovalStageApiIdSeq.subscribe(u => {
            this._primengProgressBarService.hide()
            debugger
            this.apiIdOrg=u
            console.log("تغییر1",this.apiIdOrg)
        }, error => {
            this._primengProgressBarService.hide()
        })
        if (this.inputSequenceRegister != undefined) {
            this.nameApiDe = this.inputSequenceRegister.name
            this.titleApiDe = this.inputSequenceRegister.title
            this.apiIdDe = this.inputSequenceRegister.apiId
            this.apiTitleOrg = this.inputSequenceRegister.apiTitleOrg
            this.inputSequenceRegister.apiIdOrg? this.apiIdOrg = this.inputSequenceRegister.apiIdOrg:this.apiIdOrg
            console.log("تغییر2",this.apiIdOrg)
            this.apiNameOrg = this.inputSequenceRegister.apiNameOrg
            this.partyTitleOrg = this.inputSequenceRegister.partyTitleOrg
            this.moduleTitleOrg = this.inputSequenceRegister.moduleTitleOrg
            debugger
            this.apiTitle = this.inputSequenceRegister.title
            this.moduleTitleDe = this.inputSequenceRegister.moduleTitle
            this.moduleTitle = this.inputSequenceRegister.moduleTitle
            this.clientNameDe = this.inputSequenceRegister.clientName
            this.clientName = this.inputSequenceRegister.clientName
            this.partyTitle = this.inputSequenceRegister.partyTitle
            this.clientBase = this.inputSequenceRegister.clientBase
            this.moduleBase = this.inputSequenceRegister.moduleBase
            this.accessBase = this.inputSequenceRegister.accessBase
            if (this.inputSequenceRegister.clientId != null) {
                this.clientHidden = false
            } else {
                this.clientHidden = true
            }
            if (this.clientBase) {

                this.detailsBreadObject = this.chooseBread('clientBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.moduleBase) {

                this.detailsBreadObject = this.chooseBread('moduleBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.accessBase) {

                this.detailsBreadObject = this.chooseBread('accessBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.partyTitle != undefined && this.partyTitle != "") {

                this.detailsBreadObject = this.chooseBread('partyBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
        }
        /* this.messagesApiFacadeService.apibymoduleidhasntclient(this.moduleId, this.clientId).subscribe(c => {
             if (Array.isArray(c)) {
                 this.apiAttachList = c
             } else {
                 this.apiAttachList.push(c)
             }
             for (let k = 0; k < this.apiAttachList.length; k++) {
                 this.apiAttachList[k] = Object.assign(this.apiAttachList[k], {row: (k + 1)})
             }
             console.log(this.apiAttachList, 'apiAttachList')

             if (c.length == 0) {

                 this.notifierService.showError({detail: "هیچ سرویسی برای ماژول منتخب وجود ندارد!", life: 3000});
             } else {

                 this.dialogApiFlag = true
             }

         }, error => {

         })*/
    }

    setRecord(numberApi: number) {

        this.tempItem = numberApi
    }

    setRecordSecond(numberApi: number) {

        this.tempItem = numberApi
    }

    setRecordThird(numberApi: number) {

        this.tempItem = numberApi
    }

    setRecordDialogFirst(numberApi: number) {
        this.tempItemDialog = numberApi
    }

    setRecordDialogSecond(numberApi: number) {
        this.tempItemDialog = numberApi
    }

    setRecordDialogThird(numberApi: number) {
        this.tempItemDialog = numberApi
    }

    onCancelDialog() {
        this.dialogApiFlag = false
    }

    onCancel(): void {
        this.close.emit('close');
    }

    validationRegisterSequence(): boolean {
        debugger
        if (!this.title) {
            this.notifierService.showError({detail: "لطفا عنوان جریان پردازشی وارد کنید!", life: 3000});
            return false;
        }
        if (!this.partyIdFirst) {
            this.notifierService.showError({
                detail: "لطفا سازمان را برای سرویس اول را برای سرویس اول وارد کنید!",
                life: 3000
            });
            return false;
        } else if (!this.moduleIdFirst) {
            this.notifierService.showError({
                detail: "لطفا ماژول را برای سرویس اول را برای سرویس اول وارد کنید!",
                life: 3000
            });
            return false;
        } else if (!this.apiIdFirst) {
            this.notifierService.showError({
                detail: "لطفا سرویس را برای سرویس اول را برای سرویس اول وارد کنید!",
                life: 3000
            });
            return false;
        } else if (!this.actionTypeFirst) {
            this.notifierService.showError({detail: "لطفا اولویت اجرا را برای سرویس اول وارد کنید!", life: 3000});
            return false;
        } /*else if ((this.actionTypeFirst == 2) && (!this.afterApiFirst)) {
            this.notifierService.showError({detail: "لطفا (اجرای سرویس پس از) را برای سرویس اول وارد کنید!", life: 3000});
            return false;
        }*/ else if ((this.actionTypeFirst == 1) && (this.matchListFirst.length == 0)) {
            this.notifierService.showError({
                detail: "لطفا نود های متصل (Matched) را برای سرویس اول وارد کنید!",
                life: 3000
            });
            return false;
        } else if ((this.actionTypeFirst == 2) && (this.afterApiFirst == 1) && (this.matchListFirst.length == 0) && (this.runAsyncFirst == false)) {
            this.notifierService.showError({
                detail: "لطفا نود های متصل (Matched) را برای سرویس اول وارد کنید!",
                life: 3000
            });
            return false;
        } else if ((this.apiIdSecond) && (!this.actionTypeSecond)) {
            this.notifierService.showError({detail: "لطفا اولویت اجرا را برای سرویس دوم وارد کنید!", life: 3000});
            return false;
        } else if ((this.actionTypeSecond == 2) && (!this.afterApiSecond)) {
            this.notifierService.showError({
                detail: "لطفا (اجرای سرویس پس از) را برای سرویس دوم وارد کنید!",
                life: 3000
            });
            return false;
        } else if (this.apiIdSecond && (this.matchListSecond.length == 0) && (this.actionTypeSecond == 1)) {
            this.notifierService.showError({
                detail: "لطفا نود های متصل (Matched) را برای سرویس دوم وارد کنید!",
                life: 3000
            });
            return false;
        } else if ((this.actionTypeSecond == 2) && (this.afterApiSecond == 1) && (this.runAsyncSecond == false) && (this.matchListSecond.length == 0)) {
            this.notifierService.showError({
                detail: "لطفا نود های متصل (Matched) را برای سرویس دوم وارد کنید!",
                life: 3000
            });
            return false;
        } else if ((this.apiIdThird) && (!this.actionTypeThird)) {
            this.notifierService.showError({detail: "لطفا اولویت اجرا را برای سرویس سوم وارد کنید!", life: 3000});
            return false;
        } else if ((this.actionTypeThird == 2) && (!this.afterApiThird)) {
            this.notifierService.showError({
                detail: "لطفا (اجرای سرویس پس از) را برای سرویس سوم وارد کنید!",
                life: 3000
            });
            return false;
        } else if (this.apiIdThird && (this.matchListThird.length == 0) && (this.actionTypeThird == 1)) {
            this.notifierService.showError({
                detail: "لطفا نود های متصل (Matched) را برای سرویس سوم وارد کنید!",
                life: 3000
            });
            return false;
        } else if ((this.actionTypeThird == 2) && (this.afterApiThird == 1) && (this.runAsyncThird == false) && (this.matchListThird.length == 0)) {
            this.notifierService.showError({
                detail: "لطفا نود های متصل (Matched) را برای سرویس سوم وارد کنید!",
                life: 3000
            });
            return false;
        } else if (!this.runAsyncFirst && this.matchListFirst.length == 0) {
            this.notifierService.showError({
                detail: "لطفا نود های متصل (Matched) را برای سرویس اول وارد کنید!",
                life: 3000
            });
            return false;
        } else if (this.runAsyncFirst && this.matchListFirst.length > 0) {
            this.notifierService.showError({detail: 'سرویس اول در Async نمیتواند دارای نود متصل (match) باشد'});
        } else {
            return true
        }
    }

    onRegister(): void {
        debugger
        this.objMatch = {
            producerId: null,
            requiredId: null,
            sequenceId: null
        }

        this.objSequence = {
            parentId: null,
            apiId: null,
            actionType: null,
            runAsync: null,
            orderId: null,
            title: "",
            messageId4XX: null,
            messageId5XX: null,
            messageIdForAfterProcess: null,
            status: null
        }
        if (this.validationRegisterSequence()) {
            //سرویس اصلی
            this.objSequence.parentId = (-1)
            this.objSequence.actionType = (-1)
            this.objSequence.apiId = this.apiIdOrg
            this.objSequence.title = this.title
            this.objSequence.status = 1
            this.objSequence.runAsync = 0
            this.objSequence.orderId = -1
            debugger
            this._primengProgressBarService.show()
            this.messagesApiFacadeService.sequenceFlowRegister(this.objSequence).subscribe(p => {
                debugger
                this._primengProgressBarService.hide()
                this.objSequence = {
                    parentId: null,
                    apiId: null,
                    actionType: null,
                    runAsync: null,
                    orderId: null,
                    title: "",
                    messageId4XX: null,
                    messageId5XX: null,
                    messageIdForAfterProcess: null,
                    status: null
                }
//سرویس اول
                this.sequnceIdOrg = p.sequnceId
                this.objSequence.parentId = p.sequnceId
                this.firstSequnceId = p.sequnceId
                this.objSequence.actionType = this.actionTypeFirst
                this.objSequence.apiId = this.apiIdFirst
                this.objSequence.title = this.title
                this.objSequence.messageId4XX = this.messageId4XXFirst
                this.objSequence.messageId5XX = this.messageId5XXFirst
                this.objSequence.messageIdForAfterProcess = this.messageIdForAfterProcess
                this.objSequence.orderId = 1
                this.runAsyncFirst == true ? this.objSequence.runAsync = 1 : this.objSequence.runAsync = 0
                this.objSequence.status = 1

                debugger
                if (this.apiIdFirst) {
                    if (this.actionTypeFirst == 2) {
                        debugger
                        this.firstRegister()
                    } else if (this.actionTypeFirst == 1) {
                        if (this.matchListFirst.length > 0) {
                            debugger
                            this.firstRegister()
                        } else {
                            this.notifierService.showError({
                                detail: "نود های موردنیاز و تولید شده سرویس اول به سرویس دیگری متصل نشده است!",
                                life: 3000
                            });
                        }
                    }
                } else {
                    debugger
                    if (this.moduleIdFirst) {
                        this.notifierService.showError({
                            detail: "لطفا سرویس را برای سرویس اول انتخاب کنید",
                            life: 3000
                        });
                    } else {
                        if (this.partyIdFirst) {
                            this.notifierService.showError({
                                detail: "لطفا ماژول را برای سرویس اول انتخاب کنید!",
                                life: 3000
                            });
                        } else {
                            this.notifierService.showError({
                                detail: "لطفا مشتری را برای سرویس اول انتخاب کنید!",
                                life: 3000
                            });
                        }
                    }
                }

            }, error => {
                this._primengProgressBarService.hide()
            })
        }

    }

    firstRegister() {
        debugger
        //سرویس اول
        this._primengProgressBarService.show()
        this.messagesApiFacadeService.sequenceFlowRegister(this.objSequence).subscribe(i => {
            debugger
            this._primengProgressBarService.hide()
            this.objMatch = {
                producerId: null,
                sequenceId: null,
                requiredId: null
            }

            this.secondSequnceId = i.sequnceId
            this.firstApiSequnceId = i.sequnceId
            this.responseObjSequence=i
            this.responseObjSequence.clientName=this.clientName
            this.responseObjSequence.apiTitle=this.apiTitle
            this.responseObjSequence.partyTitle=this.partyTitle
            this.responseObjSequence.moduleTitle=this.moduleTitle
            this.responseObjSequence.apiIdOrg=this.apiIdOrg
            this.responseObjSequence.firstApi=this.firstApi
            this.responseObjSequence.clientBase=this.clientBase
            this.responseObjSequence.moduleBase=this.moduleBase
            this.responseObjSequence.accessBase=this.accessBase
            // this.clientName = e.clientName
            // this.apiTitle = e.title
            // this.partyTitle = e.partyTitle
            // this.moduleTitle = e.moduleTitle
            // this.apiId = e.apiIdOrg
            // this.apiIdOrg = e.apiIdOrg
            // console.log("apiIdOrgپرنت2",this.apiIdOrg)
            // this.clientBase = e.clientBase
            // this.moduleBase = e.moduleBase
            // this.accessBase = e.accessBase
            // this.clientBase = e.clientBase
            if (this.actionTypeFirst == 1 || (this.actionTypeFirst == 2
                // && this.afterApiFirst == 1
                && this.runAsyncFirst == false
            )) {
                debugger
                this.matchListFirst.forEach(item => {
                    this.objMatch.producerId = item.producedId
                    this.objMatch.requiredId = item.requiredId
                    this.objMatch.sequenceId = this.secondSequnceId
                    debugger

                    //مچینگ سرویس اصلی و اول
                    this._primengProgressBarService.show()
                    this.messagesApiFacadeService.matchdependnode(this.objMatch).subscribe(b => {
                        debugger
                        this._primengProgressBarService.hide()
                        this.objSequence = {
                            parentId: null,
                            apiId: null,
                            actionType: null,
                            runAsync: null,
                            orderId: null,
                            title: "",
                            messageId4XX: null,
                            messageId5XX: null,
                            messageIdForAfterProcess: null,
                            status: null
                        }
                        if (this.apiIdSecond) {
                            //after سرویس دوم با اولی
                            if (this.actionTypeSecond == 2 && this.afterApiSecond == 2) {
                                debugger
                                this.firstSequnceId = null
                                this.secondSequnceId = null
                                this.firstSequnceId = i.sequnceId
                                this.objSequence.parentId = i.sequnceId
                                this.objSequence.actionType = this.actionTypeSecond
                                this.objSequence.apiId = this.apiIdSecond
                                this.objSequence.title = this.title
                                this.objSequence.status = 1
                                this.objSequence.messageId4XX = this.messageId4XXSecond
                                this.objSequence.messageId5XX = this.messageId5XXSecond
                                this.objSequence.messageIdForAfterProcess = this.messageIdForAfterProcess
                                this.objSequence.orderId = 2
                                debugger
                                this.runAsyncSecond == true ? this.objSequence.runAsync = 1 : this.objSequence.runAsync = 0
                            }
                            //سرویس دوم با اصلی با مچینگ
                            else if (this.actionTypeSecond == 2 && this.afterApiSecond == 1) {
                                debugger
                                this.firstSequnceId = null
                                this.secondSequnceId = null
                                this.firstSequnceId = this.sequnceIdOrg
                                this.objSequence.parentId = this.sequnceIdOrg
                                this.objSequence.actionType = this.actionTypeSecond
                                this.objSequence.apiId = this.apiIdSecond
                                this.objSequence.title = this.title
                                this.objSequence.status = 1
                                this.objSequence.messageId4XX = this.messageId4XXSecond
                                this.objSequence.messageId5XX = this.messageId5XXSecond
                                this.objSequence.messageIdForAfterProcess = this.messageIdForAfterProcess
                                this.objSequence.orderId = 2
                                debugger
                                this.runAsyncSecond == true ? this.objSequence.runAsync = 1 : this.objSequence.runAsync = 0
                            }
                            //سرویس دوم با اولی befor
                            else if (this.actionTypeSecond == 1) {
                                debugger
                                this.firstSequnceId = null
                                this.secondSequnceId = null
                                this.firstSequnceId = this.firstApiSequnceId
                                this.objSequence.parentId = this.firstSequnceId
                                this.objSequence.actionType = this.actionTypeSecond
                                this.objSequence.apiId = this.apiIdSecond
                                this.objSequence.title = this.title
                                this.objSequence.status = 1
                                this.objSequence.messageId4XX = this.messageId4XXSecond
                                this.objSequence.messageId5XX = this.messageId5XXSecond
                                this.objSequence.messageIdForAfterProcess = this.messageIdForAfterProcess
                                this.objSequence.orderId = 2
                                debugger
                                this.runAsyncSecond == true ? this.objSequence.runAsync = 1 : this.objSequence.runAsync = 0
                            }
                            debugger
                            if (this.apiIdSecond) {
                                if (this.actionTypeFirst == 2) {
                                    debugger
                                    this.secondRegister()
                                } else if (this.actionTypeFirst == 1) {
                                    if (this.matchListFirst.length > 0) {
                                        this.secondRegister()
                                    } else {
                                        this.notifierService.showError({
                                            detail: "نود های موردنیاز و تولید شده سرویس اول به سرویس دیگری متصل نشده است!",
                                            life: 3000
                                        });
                                    }
                                }

                            }
                            else {
                                this.close.emit(this.responseObjSequence);
                                this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

                            }
                        } else {
                            this.close.emit(this.responseObjSequence);
                            this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

                        }
                    }, error => {
                        this._primengProgressBarService.hide()
                    })
                })
            } else if ((this.actionTypeFirst == 2 && this.afterApiFirst == 1 && this.runAsyncFirst)) {
                if (this.matchListFirst.length > 0) {
                    this.notifierService.showError({
                        detail: "سرویس اول که به صورت After و Async تعریف شده و نمی تواند دارای نود های متصل (Matched) باشد!",
                        life: 3000
                    });
                } else {
                    debugger
                    this.objSequence = {
                        parentId: null,
                        apiId: null,
                        actionType: null,
                        runAsync: null,
                        orderId: null,
                        title: "",
                        messageId4XX: null,
                        messageId5XX: null,
                        messageIdForAfterProcess: null,
                        status: null
                    }
                    //سرویس دومی با اولی بدون مچ
                    this.firstSequnceId = null
                    this.secondSequnceId = null
                    this.firstSequnceId = i.sequnceId
                    this.objSequence.parentId = i.sequnceId
                    this.objSequence.actionType = this.actionTypeSecond
                    this.objSequence.apiId = this.apiIdSecond
                    this.objSequence.title = this.title
                    this.objSequence.status = 1
                    this.objSequence.messageId4XX = this.messageId4XXSecond
                    this.objSequence.messageId5XX = this.messageId5XXSecond
                    this.objSequence.messageIdForAfterProcess = this.messageIdForAfterProcess
                    this.objSequence.orderId = 2
                    debugger
                    this.runAsyncSecond == true ? this.objSequence.runAsync = 1 : this.objSequence.runAsync = 0
                    debugger
                    if (this.apiIdSecond) {
                        if (this.actionTypeFirst == 2) {
                            this.secondRegister()
                        } else if (this.actionTypeFirst == 1) {
                            if (this.matchListFirst.length > 0) {
                                this.secondRegister()
                            } else {
                                this.notifierService.showError({
                                    detail: "نود های موردنیاز و تولید شده سرویس اول به سرویس دیگری متصل نشده است!",
                                    life: 3000
                                });
                            }
                        }

                    } else {
                        this.close.emit(this.responseObjSequence);
                        this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

                    }
                }
            } else {
                this.close.emit(this.responseObjSequence);
                this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

            }
        }, error => {
            this._primengProgressBarService.hide()
        })
    }

    secondRegister() {
        debugger
        debugger
        debugger
//سرویس دوم
        this._primengProgressBarService.show()
        this.messagesApiFacadeService.sequenceFlowRegister(this.objSequence).subscribe(o => {
            debugger
            this._primengProgressBarService.hide()
            this.objMatch = {
                producerId: null,
                sequenceId: null,
                requiredId: null
            }
            debugger
            this.secondSequnceId = o.sequnceId
            if (this.actionTypeSecond == 1 || (this.actionTypeSecond == 2 && this.afterApiSecond == 1 && this.runAsyncSecond == false)) {
                debugger
                if (this.matchListSecond.length > 0) {
                    this.matchListSecond.forEach(item => {
                        this.objMatch.producerId = item.producedId
                        this.objMatch.requiredId = item.requiredId
                        this.objMatch.sequenceId = this.secondSequnceId
                        debugger
                        debugger
                        //مچینگ دومی
                        this._primengProgressBarService.show()
                        this.messagesApiFacadeService.matchdependnode(this.objMatch).subscribe(s => {
                            debugger
                            this._primengProgressBarService.hide()
                            this.objSequence = {
                                parentId: null,
                                apiId: null,
                                actionType: null,
                                orderId: null,
                                runAsync: null,
                                title: "",
                                messageId4XX: null,
                                messageId5XX: null,
                                messageIdForAfterProcess: null,
                                status: null
                            }
                            if (this.apiIdThird) {
                                // سرویس سوم با سرویس اصلی بامچینگ
                                if (this.actionTypeThird == 2 && this.afterApiThird == 1) {
                                    debugger
                                    this.firstSequnceId = this.sequnceIdOrg
                                    this.objSequence.parentId = this.sequnceIdOrg
                                    this.objSequence.actionType = this.actionTypeThird
                                    this.objSequence.apiId = this.apiIdThird
                                    this.objSequence.title = this.title
                                    this.objSequence.status = 1
                                    this.objSequence.messageId4XX = this.messageId4XXThird
                                    this.objSequence.messageId5XX = this.messageId5XXThird
                                    this.objSequence.messageIdForAfterProcess = this.messageIdForAfterProcess
                                    this.objSequence.orderId = 3
                                    this.runAsyncThird == true ? this.objSequence.runAsync = 1 : this.objSequence.runAsync = 0

                                    if (this.apiIdThird) {
                                        if (this.actionTypeFirst == 2) {
                                            this.thirdRegister()
                                        } else if (this.actionTypeFirst == 1) {
                                            debugger
                                            if (this.matchListFirst.length > 0) {
                                                this.thirdRegister()
                                            } else {
                                                this.notifierService.showError({
                                                    detail: "نود های موردنیاز و تولید شده سرویس اول به سرویس دیگری متصل نشده است!",
                                                    life: 3000
                                                });
                                            }
                                        }
                                    } else {
                                        this.close.emit(this.apiIdDe);
                                        this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

                                    }
                                }
                                // سرویس سوم با سرویس اول بدون مچ
                                else if (this.actionTypeThird == 2 && this.afterApiThird == 2) {
                                    debugger

                                    this.firstSequnceId = this.firstApiSequnceId
                                    this.objSequence.parentId = this.firstApiSequnceId
                                    this.objSequence.actionType = this.actionTypeThird
                                    this.objSequence.apiId = this.apiIdThird
                                    this.objSequence.title = this.title
                                    this.objSequence.status = 1
                                    this.objSequence.messageId4XX = this.messageId4XXThird
                                    this.objSequence.messageId5XX = this.messageId5XXThird
                                    this.objSequence.orderId = 3
                                    this.runAsyncThird == true ? this.objSequence.runAsync = 1 : this.objSequence.runAsync = 0
                                    if (this.apiIdThird) {
                                        this.thirdRegister()
                                    } else {
                                        this.close.emit(this.apiIdDe);
                                        this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

                                    }
                                }
                                //  سرویس سوم با سرویس دوم بدون مچ
                                else if (this.actionTypeThird == 2 && this.afterApiThird == 3) {
                                    debugger

                                    this.firstSequnceId = null
                                    this.secondSequnceId = null
                                    this.firstSequnceId = o.sequnceId
                                    this.objSequence.parentId = o.sequnceId
                                    this.objSequence.actionType = this.actionTypeThird
                                    this.objSequence.apiId = this.apiIdThird
                                    this.objSequence.title = this.title
                                    this.objSequence.status = 1
                                    this.objSequence.messageId4XX = this.messageId4XXThird
                                    this.objSequence.messageId5XX = this.messageId5XXThird
                                    this.objSequence.orderId = 3
                                    this.runAsyncThird == true ? this.objSequence.runAsync = 1 : this.objSequence.runAsync = 0
                                    debugger
                                    if (this.apiIdThird) {
                                        if (this.actionTypeFirst == 2) {
                                            this.thirdRegister()
                                        } else if (this.actionTypeFirst == 1) {
                                            debugger
                                            if (this.matchListFirst.length > 0) {
                                                this.thirdRegister()
                                            } else {
                                                this.notifierService.showError({
                                                    detail: "نود های موردنیاز و تولید شده سرویس اول به سرویس دیگری متصل نشده است!",
                                                    life: 3000
                                                });
                                            }
                                        }
                                    } else {
                                        this.close.emit(this.apiIdDe);
                                        this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

                                    }
                                }
                            } else {
                                this.close.emit(this.apiIdDe);
                                this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

                            }
                        },error => {
                            this._primengProgressBarService.hide()
                        })
                    })
                } else {
                    this.notifierService.showError({
                        detail: "نود های موردنیاز و تولید شده سرویس دوم به سرویس دیگری متصل نشده است!",
                        life: 3000
                    });
                }

            } else if ((this.actionTypeSecond == 2 && this.runAsyncSecond && this.afterApiSecond == 1)) {
                debugger

                if (this.matchListSecond.length > 0) {
                    this.notifierService.showError({
                        detail: "سرویس دوم که به صورت After و Async تعریف شده و نمی تواند دارای نود های متصل (Matched) باشد!",
                        life: 3000
                    });
                } else {
                    debugger

                    this.objSequence = {
                        parentId: null,
                        apiId: null,
                        actionType: null,
                        orderId: null,
                        runAsync: null,
                        title: "",
                        messageId4XX: null,
                        messageId5XX: null,
                        messageIdForAfterProcess: null,
                        status: null
                    }
                    //سرویس سومی با اصلی با مچینگ
                    if (this.actionTypeThird == 2 && this.afterApiThird == 1) {
                        debugger

                        this.firstSequnceId = null
                        this.secondSequnceId = null
                        this.firstSequnceId = this.sequnceIdOrg
                        this.objSequence.parentId = this.sequnceIdOrg
                        this.objSequence.actionType = this.actionTypeThird
                        this.objSequence.apiId = this.apiIdThird
                        this.objSequence.title = this.title
                        this.objSequence.status = 1
                        this.objSequence.messageId4XX = this.messageId4XXThird
                        this.objSequence.messageId5XX = this.messageId5XXThird
                        this.objSequence.orderId = 3
                        this.runAsyncThird == true ? this.objSequence.runAsync = 1 : this.objSequence.runAsync = 0
                        if (this.apiIdThird) {
                            if (this.actionTypeFirst == 2) {
                                this.thirdRegister()
                            } else if (this.actionTypeFirst == 1) {
                                debugger
                                if (this.matchListFirst.length > 0) {
                                    this.thirdRegister()
                                } else {
                                    this.notifierService.showError({
                                        detail: "نود های موردنیاز و تولید شده سرویس اول به سرویس دیگری متصل نشده است!",
                                        life: 3000
                                    });
                                }
                            }
                        } else {
                            this.close.emit(this.apiIdDe);
                            this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

                        }
                    }
                    //سرویس سومی با اولی بدون مچینگ
                    else if (this.actionTypeThird == 2 && this.afterApiThird == 2) {
                        debugger

                        this.firstSequnceId = null
                        this.secondSequnceId = null
                        this.firstSequnceId = this.firstApiSequnceId
                        this.objSequence.parentId = this.firstApiSequnceId
                        this.objSequence.actionType = this.actionTypeThird
                        this.objSequence.apiId = this.apiIdThird
                        this.objSequence.title = this.title
                        this.objSequence.status = 1
                        this.objSequence.messageId4XX = this.messageId4XXThird
                        this.objSequence.messageId5XX = this.messageId5XXThird
                        this.objSequence.orderId = 3
                        this.runAsyncThird == true ? this.objSequence.runAsync = 1 : this.objSequence.runAsync = 0
                        if (this.apiIdThird) {
                            if (this.actionTypeFirst == 2) {
                                this.thirdRegister()
                            } else if (this.actionTypeFirst == 1) {
                                debugger
                                if (this.matchListFirst.length > 0) {
                                    this.thirdRegister()
                                } else {
                                    this.notifierService.showError({
                                        detail: "نود های موردنیاز و تولید شده سرویس اول به سرویس دیگری متصل نشده است!",
                                        life: 3000
                                    });
                                }
                            }
                        } else {
                            this.close.emit(this.apiIdDe);
                            this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

                        }
                    }
                    //سرویس سومی با دومی بدون مچینگ
                    else if (this.actionTypeThird == 2 && this.afterApiThird == 3) {
                        debugger

                        this.firstSequnceId = null
                        this.secondSequnceId = null
                        this.firstSequnceId = o.sequnceId
                        this.objSequence.parentId = o.sequnceId
                        this.objSequence.actionType = this.actionTypeThird
                        this.objSequence.apiId = this.apiIdThird
                        this.objSequence.title = this.title
                        this.objSequence.status = 1
                        this.objSequence.messageId4XX = this.messageId4XXThird
                        this.objSequence.messageId5XX = this.messageId5XXThird
                        this.objSequence.orderId = 3
                        this.runAsyncThird == true ? this.objSequence.runAsync = 1 : this.objSequence.runAsync = 0
                        if (this.apiIdThird) {
                            if (this.actionTypeFirst == 2) {
                                this.thirdRegister()
                            } else if (this.actionTypeFirst == 1) {
                                debugger
                                if (this.matchListFirst.length > 0) {
                                    this.thirdRegister()
                                } else {
                                    this.notifierService.showError({
                                        detail: "نود های موردنیاز و تولید شده سرویس اول به سرویس دیگری متصل نشده است!",
                                        life: 3000
                                    });
                                }
                            }
                        } else {
                            this.close.emit(this.apiIdDe);
                            this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

                        }
                    }
                    debugger
                    if (this.apiIdThird) {
                        if (this.actionTypeFirst == 2) {
                            this.thirdRegister()
                        } else if (this.actionTypeFirst == 1) {
                            debugger
                            if (this.matchListFirst.length > 0) {
                                this.thirdRegister()
                            } else {
                                this.notifierService.showError({
                                    detail: "نود های موردنیاز و تولید شده سرویس اول به سرویس دیگری متصل نشده است!",
                                    life: 3000
                                });
                            }
                        }
                    } else {
                        this.close.emit(this.apiIdDe);
                        this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

                    }
                }
            } else if ((this.actionTypeSecond == 2 && this.runAsyncSecond && this.afterApiSecond == 2)) {

                this.objSequence = {
                    parentId: null,
                    apiId: null,
                    actionType: null,
                    orderId: null,
                    runAsync: null,
                    title: "",
                    messageId4XX: null,
                    messageId5XX: null,
                    messageIdForAfterProcess: null,
                    status: null
                }
            } else {
                this.close.emit(this.apiIdDe);
                this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

            }
        },error => {
            this._primengProgressBarService.hide()
        })
    }

    thirdRegister() {
        debugger
        this._primengProgressBarService.show()
        this.messagesApiFacadeService.sequenceFlowRegister(this.objSequence).subscribe(r => {
            debugger
            this._primengProgressBarService.hide()
            this.objMatch = {
                producerId: null,
                sequenceId: null,
                requiredId: null
            }

            if (this.actionTypeThird == 1 || (this.actionTypeThird == 2 && this.afterApiThird == 1 && this.runAsyncThird == false)) {
                if (this.matchListThird.length > 0) {
                    this.matchListThird.forEach(item => {
                        this.objMatch.producerId = item.producedId
                        this.objMatch.requiredId = item.requiredId
                        debugger
                        this._primengProgressBarService.show()
                        this.messagesApiFacadeService.matchdependnode(this.objMatch).subscribe(s => {
                            debugger
                            this._primengProgressBarService.hide()
                            this.close.emit(this.apiIdDe);
                            this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

                        },error =>
                        {
                            this._primengProgressBarService.hide()
                        })
                    })
                } else {
                    debugger
                    this.notifierService.showError({
                        detail: "نود های موردنیاز و تولید شده سرویس سوم به سرویس دیگری متصل نشده است!",
                        life: 3000
                    });
                }
            } else if (this.actionTypeThird == 2 && this.afterApiThird == 1 && this.runAsyncThird) {
                if (this.matchListThird.length > 0) {
                    this.notifierService.showError({
                        detail: "سرویس سوم که به صورت After و Async تعریف شده و نمی تواند دارای نود های متصل (Matched) باشد!",
                        life: 3000
                    });
                } else {
                    this.close.emit(this.apiIdDe);
                    this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

                }
            } else {
                debugger
                this.close.emit(this.apiIdDe);
                this.notifierService.showSuccess({detail: "اطلاعات ثبت گردید!", life: 3000});

            }
        },error => {
            this._primengProgressBarService.hide()
        })
    }

}

