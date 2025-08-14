import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { ApiGatewayConstants } from '../../../../../constants/ApiGatewayConstants';
import { Observable } from 'rxjs';
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
    HeaderEndpointRegisterComponent,
} from '../../../../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { MatTooltip } from '@angular/material/tooltip';

import { MatIcon } from '@angular/material/icon';
import { Message } from 'primeng/message';
import { InputTextarea } from 'primeng/inputtextarea';
import { Checkbox } from 'primeng/checkbox';
import { DbEnginePipe } from '../../../../../../shared/pipes/dbEngine.pipe';
import { Steps } from 'primeng/steps';
import { ApiGatewayService } from '../../../../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../../../../services/messages-api-facade.service';
import { ToastService } from '../../../../../../shared/services/ToastService';
import { FuseLoadingService } from '../../../../../../../../@fuse/services/loading';
import { Fieldset } from 'primeng/fieldset';
import { TieredMenu } from 'primeng/tieredmenu';
import { SequenceRegisterComponent } from './sequence-register/sequence-register.component';
import { Listbox } from 'primeng/listbox';
import { MorChar13Pipe } from '../../../../../../shared/pipes/morChar13.pipe';
import { ThreeDotBreadcrumbPipe } from '../../../../../../shared/pipes/threeDotBreadcrumb.pipe';
import { MorChar55Pipe } from '../../../../../../shared/pipes/morChar55.pipe';
import { detailTypePipe } from '../../../../../../shared/pipes/detail-type.pipe';
import { MorChar32Pipe } from '../../../../../../shared/pipes/morChar32.pipe';
import { MessagesCategoryPipe } from '../../../../../../shared/pipes/messagesCategory.pipe';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-sequence',
    templateUrl: './sequence.component.html',
    styleUrls: ['./sequence.component.scss'],
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
        SequenceRegisterComponent,
        Listbox,
        MorChar13Pipe,
        ThreeDotBreadcrumbPipe,
        MorChar55Pipe,
        detailTypePipe,
        MorChar32Pipe,
        MessagesCategoryPipe,
        Toast,
    ],
})
export class SequenceComponent implements OnInit {

    constructor(
        private apiGatewayService: ApiGatewayService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private notifierService: ToastService,
        private transloco: TranslocoService,
        private confirmationService: ConfirmationService,
        private _primengProgressBarService: FuseLoadingService,
    ) {
    }
    @Output() close = new EventEmitter<string>();
    @Input() inputSequence



    getsequenceflowlistbyapiidTemp = null
    requiredNode
    producedNode
    apiListOptions = []
    sequenceList = []
    apiId: number = null
    addFlag: boolean = false
    sequenceFlag: boolean = false
    clientBase: boolean = false
    moduleBase: boolean = false
    accessBase: boolean = false
    detailsBreadObject = []
    first: number = 0;
    rows: number = 10;
    sequenceDto
    apiTitle: string = ''
    partyTitle: string = ''
    partyIdOrg: string = ''
    partyTitleOrg: string = ''
    moduleTitle: string = ''
    clientName: string = ''
    title: string = ''
    sequnceId: number = null
    partyListOptionsFirst = [{title: '-', partyId: null}]
    moduleListOptionsFirst = [{moduleTitle: '-', moduleId: null}]
    apiListOptionsFirst = [{title: '-', apiId: null}]
    partyListOptionsSecond = [{title: '-', partyId: null}]
    moduleListOptionsSecond = [{moduleTitle: '-', moduleId: null}]
    apiListOptionsSecond = [{title: '-', apiId: null}]
    partyListOptionsThird = [{title: '-', partyId: null}]
    moduleListOptionsThird = [{moduleTitle: '-', moduleId: null}]
    apiListOptionsThird = [{title: '-', apiId: null}]
    paginationLabel=this.transloco.translate('label.pagination.table');
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
        {name: 'Before', code: 1},
        {name: 'After', code: 2},
    ]
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
    afterApiFirst: number = null
    afterApiSecond: number = null
    afterApiThird: number = null
    actionTypeFirst: number = null
    actionTypeSecond: number = null
    actionTypeThird: number = null
    matchListFirst = []
    matchListSecond = []
    matchListThird = []
    producedListFirst = []
    producedListSecond = []
    producedListThird = []
    requiredListFirst = []
    requiredListSecond = []
    requiredListThird = []
    messagesList400First = []
    messagesList400Second = []
    messagesList400Third = []
    messagesList400Temp = []
    messagesList500First = []
    messagesList500Second = []
    messagesList500Third = []
    messagesList500Temp = []
    partyIdFirst
    moduleIdFirst
    moduleIdOrg
    moduleTitleOrg
    countProduced: number = null
    apiIdFirst
    apiIdOrg
    sequnceIdOrg
    apiTitleOrg
    apiTitleFirst
    runAsyncFirst: boolean = false
    runAsyncSecond: boolean = false
    runAsyncThird: boolean = false
    dialogThirdMatchFlag: boolean = false
    dialogSecondMatchFlag: boolean = false
    dialogFirstMatchFlag: boolean = false
    message400Flag: boolean = false
    message500Flag: boolean = false
    messageCusFlag: boolean = false
    apiTitleProduced: string = ''
    apiTitleRequired: string = ''
    apiIdProduced: number = null
    apiIdRequired: number = null
    apiNameFirst
    apiIdDe
    titleApiDe
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
    tempItem: number = null
    countRequired: number = null
    apiNumber400
    apiNumber500
    apiNumberCus

    icon400_valFirst = ""
    icon500_valFirst = ""
    iconCus_valFirst = ""
    icon400_valSecond = ""
    icon500_valSecond = ""
    icon400_valThird = ""
    icon500_valThird = ""
    rows400: number = 10;
    rows500: number = 10;
    rowsCus: number = 10;
    totalRecords: number = 0;
    first400: number = 0;
    first500: number = 0;
    firstCus: number = 0;
    statusCodeOptions400 = ApiGatewayConstants.statusCode
    statusCodeOptions500 = ApiGatewayConstants.statusCode
    statusCodeOptionsCus = ApiGatewayConstants.statusCode
    thirdPart: boolean = false
    secondPart: boolean = false
    objSequence = {
        parentId: null,
        sequnceId: null,
        apiId: null,
        actionType: null,
        runAsync: null,
        orderId: null,
        title: "",
        status: null
    }
    itemsFirst = [
        {
            label: 'نود های متصل (Matched)',
            icon: '',
            command: () => {
                this.showMatchNodes(this.tempItem);
            }
        },
        {
            label: '______________________',
            items: [{
                label: 'انصراف',

            }]
        }
    ]
    messageId4XXFirst: number = null
    messageId4XXSecond: number = null
    messageId4XXThird: number = null
    messageId5XXFirst: number = null
    messageIdForAfterProcess: number = null
    messageId5XXSecond: number = null
    messageId5XXThird: number = null
    codeMessage400: string = '400'
    codeMessage500: string = '500'
    titleMessage500
    titleMessage400
    textMessage400
    textENMessage400
    tableIdMessage400
    typeMessage400
    textMessageCus
    textMessage500
    textENMessage500
    textENMessageCus
    tableIdMessage500
    typeMessage500
    codeMessageDe
    messageIdDe
    titleMessageDe
    tableIdDe
    messageId
    categoryMessages400 = ApiGatewayConstants.categoryMessages;
    categoryMessages500 = ApiGatewayConstants.categoryMessages;
    categoryMessagesCus = ApiGatewayConstants.categoryMessages;
    typeMessages400 = ApiGatewayConstants.typeMessages;
    typeMessages500 = ApiGatewayConstants.typeMessages;
    typeMessagesCus = ApiGatewayConstants.typeMessages;
    codeMessageCus
    titleMessageCus
    tableIdMessageCus
    typeMessageCus
    messagesListCusFirst
    messagesListCusTemp
    //مدیریت جریان پردازشی
    showMatchNodes(item) {
        debugger
        if (this.actionTypeFirst == 2 && this.runAsyncFirst) {
            this.notifierService.showError({detail: 'سرویس Async بوده و دارای نود متصل (match) نمی باشد!'});

        } else {
            switch (item) {
                case 1:
                    if (this.matchListFirst.length > 0) {
                        if (this.actionTypeFirst == 1) {
                            this._primengProgressBarService.show()
                            this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdFirst).subscribe(l => {
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
                                this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdOrg).subscribe(e => {
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
                                    this.apiIdRequired = this.apiIdOrg
                                    this.requiredListFirst = [...this.requiredListFirst];
                                    for (let k = 0; k < this.requiredListFirst.length; k++) {
                                        countRequired++
                                    }
                                    this.countRequired = countRequired
                                    this.dialogFirstMatchFlag = true
                                },error => {
                                    this._primengProgressBarService.hide()
                                })
                            },error => {
                                this._primengProgressBarService.hide()
                            })
                        } else if (this.actionTypeFirst == 2) {
                            this._primengProgressBarService.show()
                            this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdOrg).subscribe(s => {
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
                                this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdFirst).subscribe(e => {
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
                                    this.apiIdRequired = this.apiIdOrg
                                    this.requiredListFirst = [...this.requiredListFirst];
                                    for (let k = 0; k < this.requiredListFirst.length; k++) {
                                        countRequired++
                                    }
                                    this.countRequired = countRequired
                                    this.dialogFirstMatchFlag = true
                                },error => {
                                    this._primengProgressBarService.hide()
                                })
                            },error => {
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
                                this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdOrg).subscribe(e => {
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
                                    this.apiIdRequired = this.apiIdOrg
                                    this.requiredListFirst = [...this.requiredListFirst];
                                    for (let k = 0; k < this.requiredListFirst.length; k++) {
                                        countRequired++
                                    }
                                    this.countRequired = countRequired
                                    this.dialogFirstMatchFlag = true
                                },error => {
                                    this._primengProgressBarService.hide()
                                })


                            },error => {
                                this._primengProgressBarService.hide()
                            })
                        } else if (this.actionTypeFirst == 2) {
                            this._primengProgressBarService.show()
                            this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdOrg).subscribe(s => {
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
                                this.apiIdProduced = this.apiIdOrg
                                this.producedListFirst = [...this.producedListFirst];

                                for (let k = 0; k < this.producedListFirst.length; k++) {
                                    countProduced++
                                }
                                this.countProduced = countProduced
                                this._primengProgressBarService.show()
                                this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdFirst).subscribe(e => {
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
                                },error => {
                                    this._primengProgressBarService.hide()
                                })
                            },error => {
                                this._primengProgressBarService.hide()
                            })
                        } else {
                            this.notifierService.showError({detail: 'لطفا اولویت اجرا را انتخاب کنید'});
                        }
                    }

                    break;
                case 2:
                    debugger
                    if (this.matchListSecond.length > 0) {
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
                                this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdFirst).subscribe(e => {
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
                                    this.apiIdRequired = this.apiIdOrg
                                    this.requiredListSecond = [...this.requiredListSecond];
                                    for (let k = 0; k < this.requiredListSecond.length; k++) {
                                        countRequired++
                                    }
                                    this.countRequired = countRequired
                                    this.dialogSecondMatchFlag = true
                                },error => {
                                    this._primengProgressBarService.hide()
                                })
                            },error => {
                                this._primengProgressBarService.hide()
                            })

                        } else if (this.actionTypeSecond == 2) {
                            if (this.afterApiSecond == 1) {
                                this._primengProgressBarService.show()
                                this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdOrg).subscribe(o => {
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

                                    this.apiTitleProduced = this.titleApiDe
                                    this.apiIdProduced = this.apiIdOrg
                                    this.producedListSecond = [...this.producedListSecond];
                                    for (let k = 0; k < this.producedListSecond.length; k++) {
                                        countProduced++
                                    }
                                    this.countProduced = countProduced
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdSecond).subscribe(e => {
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

                                        this.apiTitleRequired = this.apiTitleSecond
                                        this.apiIdRequired = this.apiIdSecond
                                        this.requiredListSecond = [...this.requiredListSecond];
                                        for (let k = 0; k < this.requiredListSecond.length; k++) {
                                            countRequired++
                                        }
                                        this.countRequired = countRequired
                                        this.dialogSecondMatchFlag = true
                                    },error => {
                                        this._primengProgressBarService.hide()
                                    })
                                },error => {
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
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdSecond).subscribe(e => {
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
                                        this.apiIdRequired = this.apiIdOrg
                                        this.requiredListSecond = [...this.requiredListSecond];
                                        for (let k = 0; k < this.requiredListSecond.length; k++) {
                                            countRequired++
                                        }
                                        this.countRequired = countRequired
                                        this.dialogSecondMatchFlag = true
                                    },error => {
                                        this._primengProgressBarService.hide()
                                    })
                                },error => {
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
                                this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdFirst).subscribe(e => {
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
                                },error => {
                                    this._primengProgressBarService.hide()
                                })
                            },error => {
                                this._primengProgressBarService.hide()
                            })
                        } else if (this.actionTypeSecond == 2) {
                            if (this.afterApiSecond == 1) {
                                this._primengProgressBarService.show()
                                this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdOrg).subscribe(s => {
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
                                    this.apiIdProduced = this.apiIdOrg
                                    this.producedListSecond = [...this.producedListSecond];

                                    for (let k = 0; k < this.producedListSecond.length; k++) {
                                        countProduced++
                                    }
                                    this.countProduced = countProduced
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdSecond).subscribe(e => {
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
                                        this.apiTitleRequired = this.apiTitleSecond
                                        this.apiIdRequired = this.apiIdSecond
                                        this.requiredListSecond = [...this.requiredListSecond];
                                        for (let k = 0; k < this.requiredListSecond.length; k++) {
                                            countRequired++
                                        }
                                        this.countRequired = countRequired
                                        this.dialogSecondMatchFlag = true
                                    },error => {
                                        this._primengProgressBarService.hide()
                                    })
                                },error => {
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
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdSecond).subscribe(e => {
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
                                        this.apiTitleRequired = this.apiTitleSecond
                                        this.apiIdRequired = this.apiIdSecond
                                        this.requiredListSecond = [...this.requiredListSecond];
                                        for (let k = 0; k < this.requiredListSecond.length; k++) {
                                            countRequired++
                                        }
                                        this.countRequired = countRequired
                                        this.dialogSecondMatchFlag = true
                                    },error => {
                                        this._primengProgressBarService.hide()
                                    })
                                },error => {
                                    this._primengProgressBarService.hide()
                                })
                            }
                        } else {
                            this.notifierService.showError({detail: 'لطفا اولویت اجرا را انتخاب کنید'});
                        }
                    }

                    break;
                case 3:
                    if (this.matchListThird.length > 0) {
                        if (this.actionTypeThird == 2) {
                            if (this.afterApiThird == 1) {
                                debugger
                                this._primengProgressBarService.show()
                                this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdOrg).subscribe(s => {
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
                                    this.apiIdProduced = this.apiIdOrg
                                    this.producedListThird = [...this.producedListThird];
                                    this.dialogThirdMatchFlag = true
                                    for (let k = 0; k < this.producedListThird.length; k++) {
                                        countProduced++
                                    }
                                    this.countProduced = countProduced
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdThird).subscribe(e => {
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
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
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
                                    },error => {
                                        this._primengProgressBarService.hide()
                                    })
                                },error => {
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
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdThird).subscribe(e => {
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
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
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
                                    },error => {
                                        this._primengProgressBarService.hide()
                                    })
                                },error => {
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
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdThird).subscribe(e => {
                                        debugger
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
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
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
                                    })
                                },error => {
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
                                this.messagesApiFacadeService.getapiproducednodebyapiid(this.apiIdOrg).subscribe(s => {
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
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdThird).subscribe(e => {
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
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
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
                                    },error => {
                                        this._primengProgressBarService.hide()
                                    })
                                    this.apiTitleProduced = this.titleApiDe
                                    this.apiIdProduced = this.apiIdOrg
                                    this.producedListThird = [...this.producedListThird];

                                },error => {
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
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdThird).subscribe(e => {
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
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
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
                                    },error => {
                                        this._primengProgressBarService.hide()
                                    })

                                    this.apiTitleProduced = this.apiTitleFirst
                                    this.apiIdProduced = this.apiIdFirst
                                    this.producedListThird = [...this.producedListThird];

                                },error => {
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
                                    this.messagesApiFacadeService.getapirequirednodebyapiid(this.apiIdThird).subscribe(e => {
                                        debugger
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
                                                    row: (k + 1), apiTitle: this.apiTitle, moduleTitle: this.moduleTitle
                                                    , partyTitle: this.partyTitle
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
                                    })

                                    this.apiTitleProduced = this.apiTitleSecond
                                    this.apiIdProduced = this.apiIdSecond
                                    this.producedListThird = [...this.producedListThird];

                                },error => {
                                    this._primengProgressBarService.hide()
                                })
                            }
                        } else {
                            this.notifierService.showError({detail: 'لطفا اولویت اجرا را انتخاب کنید'});
                        }
                    }

                    break
            }
        }

    }

    closeMatchNodesFirst() {
        this.dialogFirstMatchFlag = false
    }

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'accessBase':
                return [
                    {index: 0,  label_index0: "صفحه اصلی" ,img_index0: "assets/icons/home.png" , rout_index0: '/home', isActive0: false},
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
                    {index: 0,  label_index0: "صفحه اصلی" ,img_index0: "assets/icons/home.png" , rout_index0: '/home', isActive0: false},
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
                    {index: 0,  label_index0: "صفحه اصلی" ,img_index0: "assets/icons/home.png" , rout_index0: '/home', isActive0: false},
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
                    {index: 0,  label_index0: "صفحه اصلی" ,img_index0: "assets/icons/home.png" , rout_index0: '/home', isActive0: false},
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
    messageClearCus(apiNumber) {
        this.titleMessageCus = ""
        this.textMessageCus = ""
        this.textENMessageCus = ""
        this.tableIdMessageCus = ""
        this.typeMessageCus= ""
        this.messageId = null
        this.messageIdDe = null
        this.messageIdDe = ""
        this.codeMessageDe = ""
        this.titleMessageDe = ""
        this.tableIdDe = ""
        switch (apiNumber) {
            case 1:
                this.messageIdForAfterProcess = null
                this.iconCus_valFirst = ''
                this.messageSearchCus(1)
                break

        }
    }

    onRegisterMessage400(apiNumber400) {
        if (this.validationMessage400()) {
            let registerTemp = {
                code: '',
                title: '',
                text: '',
                textEN: '',
                type: null,
                tableId: null,
            };
            this.messageId = null
            registerTemp.code = this.codeMessage400;
            registerTemp.title = this.titleMessage400;
            registerTemp.type = this.typeMessage400;
            registerTemp.text = this.textMessage400;
            registerTemp.textEN = this.textENMessage400;
            registerTemp.tableId = this.tableIdMessage400;
            this._primengProgressBarService.show()
            this.messagesApiFacadeService.registerMessage(registerTemp).subscribe(a => {
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
                                this.notifierService.showSuccess({detail: "پیام 400 برای  سرویس اول انتخاب گردید!", life: 3000});
                            },error => {
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
                                this.notifierService.showSuccess({detail: "پیام 400 برای  سرویس دوم انتخاب گردید!", life: 3000});

                            },error => {
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
                                this.notifierService.showSuccess({detail: "پیام 400 برای  سرویس سوم انتخاب گردید!", life: 3000});

                            },error => {
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
            let registerTemp = {
                code: '',
                title: '',
                text: '',
                textEN: '',
                type: null,
                tableId: null,
            };

            registerTemp.code = this.codeMessage500;
            registerTemp.title = this.titleMessage500;
            registerTemp.type = this.typeMessage500;
            registerTemp.text = this.textMessage500;
            registerTemp.textEN = this.textENMessage500;
            registerTemp.tableId = this.tableIdMessage500;
            this._primengProgressBarService.show()

            this.messagesApiFacadeService.registerMessage(registerTemp).subscribe(a => {
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
                                this.notifierService.showSuccess({detail: "پیام 500 برای  سرویس اول انتخاب گردید!", life: 3000});

                            },error => {
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
                                this.notifierService.showSuccess({detail: "پیام 500 برای  سرویس دوم انتخاب گردید!", life: 3000});

                            },error => {
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
                                this.notifierService.showSuccess({detail: "پیام 500 برای  سرویس سوم انتخاب گردید!", life: 3000});

                            },error => {
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
    onRegisterMessageCus(apiNumberCus) {
        debugger
        if (this.validationMessageCus()) {
            let registerTemp = {
                code: '',
                title: '',
                text: '',
                textEN: '',
                type: null,
                tableId: null,
            };

            registerTemp.code = this.codeMessageCus;
            registerTemp.title = this.titleMessageCus;
            registerTemp.type = this.typeMessageCus;
            registerTemp.text = this.textMessageCus;
            registerTemp.textEN = this.textENMessageCus;
            registerTemp.tableId = this.tableIdMessageCus;
            this._primengProgressBarService.show()
            this.messagesApiFacadeService.registerMessage(registerTemp).subscribe(a => {
                    this._primengProgressBarService.hide()
                    this.notifierService.showSuccess({detail: "پیام جدید ثبت و انتخاب گردید!", life: 3000});
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
                                this.notifierService.showSuccess({detail: "پیام سفارشی انتخاب گردید!", life: 3000});

                            },error => {
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

    BeforeButton() {
        this.close.emit('close');
    }

    deactivate() {
        this.objSequence = {
            sequnceId: null,
            parentId: null,
            apiId: null,
            actionType: null,
            runAsync: null,
            orderId: null,
            title: "",
            status: null
        }

        this.objSequence.sequnceId = this.sequnceIdOrg
        this.objSequence.parentId = (-1)
        this.objSequence.actionType = (-1)
        this.objSequence.apiId = this.apiIdOrg
        this.objSequence.title = this.title
        this.objSequence.status = 0
        this.objSequence.runAsync = 0
        this.objSequence.orderId = 0
        this._primengProgressBarService.show()
        this.messagesApiFacadeService.sequenceFlowRegister(this.objSequence).subscribe(p => {
            this._primengProgressBarService.hide()
            this.sequenceFlag = false
        },error => {
            this._primengProgressBarService.hide()
        })


    }

    parentMethod(sequnceId) {
        debugger
        this._primengProgressBarService.show()
        this.messagesApiFacadeService.getapisequencebyparentid(sequnceId).subscribe(parentObj => {
            debugger
            this._primengProgressBarService.hide()
            switch (parentObj.orderId) {
                case 0:
                    debugger
                    break;
                case 1:
                    //   this.afterApiFirst=1
                    debugger
                    this._primengProgressBarService.show()
                    this.messagesApiFacadeService.apibyid(parentObj.apiId).subscribe(firstApi => {
                        debugger
                        this._primengProgressBarService.hide()
                        this.apiListOptionsFirst.push(firstApi)
                        this.apiIdFirst = firstApi.apiId
                        this.apiTitleFirst = firstApi.title
                        parentObj.runAsync == 1 ? this.runAsyncFirst = true : this.runAsyncFirst = false
                        this.actionTypeFirst = parentObj.actionType
                        //   this.actionTypeOptionsFirst = e.actionType
                        // this.apiIdSecond = e.parentId
                        this._primengProgressBarService.show()
                        this.messagesApiFacadeService.moduleFindbyapiid(this.inputSequence.apiId).subscribe(firstModule => {
                            this._primengProgressBarService.hide()
                            this.moduleIdFirst = firstModule.moduleId
                            this.moduleTitleFirst = firstModule.moduleTitle
                            this.moduleListOptionsFirst.push(firstModule)
                            this._primengProgressBarService.show()
                            this.messagesApiFacadeService.partyFindbymoduleid(firstModule.moduleId).subscribe(firstParty => {
                                this._primengProgressBarService.hide()
                                this.partyIdFirst = firstParty.partyId
                                this.partyTitleFirst = firstParty.title
                                this.partyListOptionsFirst.push(firstParty)
                                this._primengProgressBarService.show()
                                this.messagesApiFacadeService.getapisequencebyparentid(parentObj.parentId).subscribe(SecondParent => {
                                    this._primengProgressBarService.hide()
                                    this.apiListOptionsFirst.push(SecondParent)
                                    this.apiIdFirst = SecondParent.apiId
                                    this.apiTitleFirst = SecondParent.title
                                    parentObj.runAsync == 1 ? this.runAsyncFirst = true : this.runAsyncFirst = false
                                    this.actionTypeFirst = parentObj.actionType

                                    //   this.actionTypeOptionsFirst = e.actionType
                                    // this.apiIdSecond = e.parentId
                                    debugger
                                    if (parentObj.parentId != null) {
                                        debugger
                                        this.parentMethod(parentObj.sequnceId)
                                    }


                                },error => {
                                    this._primengProgressBarService.hide()
                                })
                            },error => {
                                this._primengProgressBarService.hide()
                            })
                        },error => {
                            this._primengProgressBarService.hide()
                        })

                    },error => {
                        this._primengProgressBarService.hide()
                    })
                    debugger
                    break;
                case 2:
                    // this.afterApiFirst=2
                    debugger
                    this._primengProgressBarService.show()
                    this.messagesApiFacadeService.apibyid(parentObj.apiId).subscribe(SecondApi => {
                        debugger
                        this._primengProgressBarService.hide()
                        this.apiListOptionsSecond.push(SecondApi)
                        this.apiIdSecond = SecondApi.apiId
                        this.apiTitleSecond = SecondApi.title
                        parentObj.runAsync == 1 ? this.runAsyncSecond = true : this.runAsyncSecond = false
                        this.actionTypeSecond = parentObj.actionType
                        //   this.actionTypeOptionsSecond = e.actionType
                        // this.apiIdSecond = e.parentId
                        this._primengProgressBarService.show()
                        this.messagesApiFacadeService.moduleFindbyapiid(SecondApi.apiId).subscribe(SecondModule => {
                            this._primengProgressBarService.hide()
                            this.moduleIdSecond = SecondModule.moduleId
                            this.moduleTitleSecond = SecondModule.moduleTitle
                            this.moduleListOptionsSecond.push(SecondModule)
                            this._primengProgressBarService.show()
                            this.messagesApiFacadeService.partyFindbymoduleid(SecondModule.moduleId).subscribe(secondParty => {
                                this._primengProgressBarService.hide()
                                this.partyIdSecond = secondParty.partyId
                                this.partyTitleSecond = secondParty.title
                                this.partyListOptionsSecond.push(secondParty)
                                this._primengProgressBarService.show()
                                this.messagesApiFacadeService.getapisequencebyparentid(parentObj.parentId).subscribe(secondParent => {
                                    this._primengProgressBarService.hide()
                                    this.apiListOptionsSecond.push(secondParent)
                                    this.apiIdSecond = secondParent.apiId
                                    this.apiTitleSecond = secondParent.title
                                    parentObj.runAsync == 1 ? this.runAsyncSecond = true : this.runAsyncSecond = false
                                    this.actionTypeSecond = parentObj.actionType
                                    //   this.actionTypeOptionsFirst = e.actionType
                                    // this.apiIdSecond = e.parentId
                                    debugger
                                    if (parentObj.parentId != null) {
                                        debugger
                                        this.parentMethod(parentObj.sequnceId)
                                    }


                                },error => {
                                    this._primengProgressBarService.hide()
                                })


                            },error => {
                                this._primengProgressBarService.hide()
                            })
                        },error => {
                            this._primengProgressBarService.hide()
                        })

                    },error => {
                        this._primengProgressBarService.hide()
                    })
                    break;
                case 3:
                    // this.afterApiFirst=3
                    debugger
                    this._primengProgressBarService.show()
                    this.messagesApiFacadeService.apibyid(parentObj.apiId).subscribe(ThirdApi => {
                        debugger
                        this._primengProgressBarService.hide()
                        this.apiListOptionsThird.push(ThirdApi)
                        this.apiIdThird = ThirdApi.apiId
                        this.apiTitleThird = ThirdApi.title
                        parentObj.runAsync == 1 ? this.runAsyncThird = true : this.runAsyncThird = false
                        this.actionTypeThird = parentObj.actionType
                        //   this.actionTypeOptionsSecond = e.actionType
                        // this.apiIdSecond = e.parentId
                        this._primengProgressBarService.show()
                        this.messagesApiFacadeService.moduleFindbyapiid(ThirdApi.apiId).subscribe(ThirdModule => {
                            this._primengProgressBarService.hide()
                            this.moduleIdThird = ThirdModule.moduleId
                            this.moduleTitleThird = ThirdModule.moduleTitle
                            this.moduleListOptionsThird.push(ThirdModule)
                            this._primengProgressBarService.show()
                            this.messagesApiFacadeService.partyFindbymoduleid(ThirdModule.moduleId).subscribe(ThirdParty => {
                                this._primengProgressBarService.hide()
                                this.partyIdThird = ThirdParty.partyId
                                this.partyTitleThird = ThirdParty.title
                                this.partyListOptionsThird.push(ThirdParty)
                                if (parentObj.parentId != null) {
                                    debugger
                                    this.parentMethod(parentObj.sequnceId)
                                }
                            },error => {
                                this._primengProgressBarService.hide()
                            })
                        },error => {
                            this._primengProgressBarService.hide()
                        })

                    },error => {
                        this._primengProgressBarService.hide()
                    })
                    break
            }
        },error => {
            this._primengProgressBarService.hide()
        })
    }

    setRecord(numberApi: number) {

        this.tempItem = numberApi
    }

    messageSearch400(apiNumber): Observable<any> {

        debugger
        let res: any
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
            res = response
        },error => {
            this._primengProgressBarService.hide()
        })
        return res
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
        },error => {
            this._primengProgressBarService.hide()
        })
    }
    messageSearchCus(apiNumber) {
        this._primengProgressBarService.show()
        this.messagesApiFacadeService.messagesearch(
            this.codeMessageCus, this.titleMessageCus, this.tableIdMessageCus,
            this.typeMessageCus
        ).subscribe(response => {
            this._primengProgressBarService.hide()
            switch (apiNumber) {
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
        },error => {
            this._primengProgressBarService.hide()
        })
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
                            if (this.messagesList500First.length > 1) {
                                let temp = this
                                this.messagesList500First = this.messagesList500First.filter(function (x) {

                                    return x.messageId === temp.messageId5XXFirst;
                                });
                            }
                            if (this.messagesList500First.length == 0) {
                                this.messagesList500First = response
                            }
                            this.messagesList500Temp = this.messagesList500First


                            this.message500Flag = true
                            this.apiNumber500 = 1
                    }
                },error => {
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
                    if (this.messagesList500Second.length > 1) {
                        let temp = this
                        this.messagesList500Second = this.messagesList500Second.filter(function (x) {

                            return x.messageId === temp.messageId5XXSecond;
                        });
                    }
                    if (this.messagesList500Second.length == 0) {
                        this.messagesList500Second = response
                    }
                    this.messagesList500Temp = this.messagesList500Second


                    this.message500Flag = true
                    this.apiNumber500 = 2
                },error => {
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
                    this.messagesList500Third = []
                    if (Array.isArray(response)) {
                        this.messagesList500Third = response
                        this.messagesList500Temp = response
                    } else {
                        this.messagesList500Third.push(response)
                        this.messagesList500Temp.push(response)
                    }
                    if (this.messagesList500Third.length > 1) {
                        let temp = this
                        this.messagesList500Third = this.messagesList500Third.filter(function (x) {

                            return x.messageId === temp.messageId5XXThird;
                        });
                    }
                    if (this.messagesList400Third.length == 0) {
                        this.messagesList500Third = response
                    }
                    this.messagesList500Temp = this.messagesList500Third


                    this.message500Flag = true
                    this.apiNumber500 = 3
                },error => {
                    this._primengProgressBarService.hide()
                })
                break

        }
    }
    openMessageCus(apiNumber) {
        debugger
        switch (apiNumber) {
            case 1:
                debugger
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.messagesearch(
                    this.codeMessageCus, this.titleMessageCus, this.tableIdMessageCus,
                    this.typeMessageCus
                ).subscribe(response => {
                    this._primengProgressBarService.hide()
                    switch (apiNumber) {
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
                            if (this.messagesListCusFirst.length > 1) {
                                let temp = this
                                this.messagesListCusFirst = this.messagesListCusFirst.filter(function (x) {
                                    debugger
                                    return x.messageId === temp.messageIdForAfterProcess;
                                });
                            }
                            if (this.messagesListCusFirst.length == 0) {
                                this.messagesListCusFirst = response
                            }
                            this.messagesListCusTemp = this.messagesListCusFirst


                            this.messageCusFlag = true
                            this.apiNumberCus = 1
                    }
                },error => {
                    this._primengProgressBarService.hide()
                })
                break

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
                    if (this.messagesList400First.length > 1) {
                        this.messagesList400First = this.messagesList400First.filter(function (x) {

                            return x.messageId === temp.messageId4XXFirst;

                        });
                    }
                    if (this.messagesList400First.length == 0) {
                        this.messagesList400First = response
                    }
                    debugger
                    this.messagesList400Temp = this.messagesList400First
                    this.message400Flag = true
                    this.apiNumber400 = 1
                },error => {
                    this._primengProgressBarService.hide()
                })
                break
            case 2:
                this._primengProgressBarService.show()
                debugger
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
                    if (this.messagesList400Second.length > 1) {
                        let temp = this
                        this.messagesList400Second = this.messagesList400Second.filter(function (x) {

                            return x.messageId === temp.messageId4XXSecond;
                        });
                    }
                    if (this.messagesList400Second.length == 0) {
                        this.messagesList400Second = response
                    }
                    this.messagesList400Temp = this.messagesList400Second
                    this.message400Flag = true
                    this.apiNumber400 = 2
                },error => {
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
                    if (this.messagesList400Third.length > 1) {
                        let temp = this
                        this.messagesList400Third = this.messagesList400Third.filter(function (x) {

                            return x.messageId === temp.messageId4XXThird;
                        });
                    }
                    if (this.messagesList400Third.length == 0) {
                        this.messagesList400Third = response
                    }
                    this.messagesList400Temp = this.messagesList400Third

                    this.message400Flag = true
                    this.apiNumber400 = 3
                },error => {
                    this._primengProgressBarService.hide()
                })
                break
        }

    }

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
                let objSequenceFirst = {
                    parentId: null,
                    apiId: null,
                    actionType: null,
                    runAsync: null,
                    orderId: null,
                    title: "",
                    messageId4XX: null,
                    messageId5XX: null,
                    sequnceId: null,
                    status: null
                }
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.getsequenceflowlistbyapiid(this.apiIdOrg).subscribe(v => {
                    debugger
                    this._primengProgressBarService.hide()
                    this.getsequenceflowlistbyapiidTemp = v

                    objSequenceFirst.parentId = this.getsequenceflowlistbyapiidTemp[1].parentId
                    objSequenceFirst.apiId = this.getsequenceflowlistbyapiidTemp[1].apiId
                    objSequenceFirst.actionType = this.getsequenceflowlistbyapiidTemp[1].actionType
                    objSequenceFirst.runAsync = this.getsequenceflowlistbyapiidTemp[1].runAsync
                    objSequenceFirst.orderId = this.getsequenceflowlistbyapiidTemp[1].orderId
                    objSequenceFirst.title = this.getsequenceflowlistbyapiidTemp[1].title
                    objSequenceFirst.messageId4XX = this.getsequenceflowlistbyapiidTemp[1].messageId4XX
                    objSequenceFirst.messageId5XX = this.messageId5XXFirst
                    objSequenceFirst.status = this.getsequenceflowlistbyapiidTemp[1].status
                    objSequenceFirst.sequnceId = this.getsequenceflowlistbyapiidTemp[1].sequnceId
                    debugger
                    this._primengProgressBarService.show()
                    this.messagesApiFacadeService.sequenceFlowRegister(objSequenceFirst).subscribe(p => {
                        debugger
                        this._primengProgressBarService.hide()
                        this.notifierService.showSuccess({detail: "پیام 500 برای  سرویس اول انتخاب گردید!", life: 3000});
                    },error => {
                        this._primengProgressBarService.hide()
                    })
                },error => {
                    this._primengProgressBarService.hide()
                })
                break
            case 2:
                debugger
                this.icon500_valSecond = "pi pi-check"
                this.messageId5XXSecond = message.messageId
                this.messagesList500Second = this.messagesList500Second.filter(function (x) {

                    return x.messageId === message.messageId;
                });
                this.messagesList500Temp = this.messagesList500Second
                let objSequenceSecond = {
                    parentId: null,
                    apiId: null,
                    actionType: null,
                    runAsync: null,
                    orderId: null,
                    title: "",
                    messageId4XX: null,
                    messageId5XX: null,
                    sequnceId: null,
                    status: null
                }
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.getsequenceflowlistbyapiid(this.apiIdOrg).subscribe(v => {
                    debugger
                    this._primengProgressBarService.hide()
                    this.getsequenceflowlistbyapiidTemp = v
                    objSequenceSecond.parentId = this.getsequenceflowlistbyapiidTemp[2].parentId
                    objSequenceSecond.apiId = this.getsequenceflowlistbyapiidTemp[2].apiId
                    objSequenceSecond.actionType = this.getsequenceflowlistbyapiidTemp[2].actionType
                    objSequenceSecond.runAsync = this.getsequenceflowlistbyapiidTemp[2].runAsync
                    objSequenceSecond.orderId = this.getsequenceflowlistbyapiidTemp[2].orderId
                    objSequenceSecond.title = this.getsequenceflowlistbyapiidTemp[2].title
                    objSequenceSecond.messageId4XX = this.getsequenceflowlistbyapiidTemp[2].messageId4XX
                    objSequenceSecond.messageId5XX = this.messageId5XXSecond
                    objSequenceSecond.status = this.getsequenceflowlistbyapiidTemp[2].status
                    objSequenceSecond.sequnceId = this.getsequenceflowlistbyapiidTemp[2].sequnceId
                    debugger
                    this._primengProgressBarService.show()
                    this.messagesApiFacadeService.sequenceFlowRegister(objSequenceSecond).subscribe(p => {
                        debugger
                        this._primengProgressBarService.hide()
                        this.notifierService.showSuccess({detail: "پیام 500 برای  سرویس دوم انتخاب گردید!", life: 3000});
                    },error => {
                        this._primengProgressBarService.hide()
                    })
                },error => {
                    this._primengProgressBarService.hide()
                })
                break
            case 3:
                debugger
                this.icon500_valThird = "pi pi-check"
                this.messageId5XXThird = message.messageId
                this.messagesList500Third = this.messagesList500Third.filter(function (x) {

                    return x.messageId === message.messageId;
                });
                this.messagesList500Temp = this.messagesList500Third
                let objSequenceThird = {
                    parentId: null,
                    apiId: null,
                    actionType: null,
                    runAsync: null,
                    orderId: null,
                    title: "",
                    messageId4XX: null,
                    messageId5XX: null,
                    sequnceId: null,
                    status: null
                }
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.getsequenceflowlistbyapiid(this.apiIdOrg).subscribe(v => {
                    debugger
                    this._primengProgressBarService.hide()
                    this.getsequenceflowlistbyapiidTemp = v
                    objSequenceThird.parentId = this.getsequenceflowlistbyapiidTemp[3].parentId
                    objSequenceThird.apiId = this.getsequenceflowlistbyapiidTemp[3].apiId
                    objSequenceThird.actionType = this.getsequenceflowlistbyapiidTemp[3].actionType
                    objSequenceThird.runAsync = this.getsequenceflowlistbyapiidTemp[3].runAsync
                    objSequenceThird.orderId = this.getsequenceflowlistbyapiidTemp[3].orderId
                    objSequenceThird.title = this.getsequenceflowlistbyapiidTemp[3].title
                    objSequenceThird.messageId4XX = this.getsequenceflowlistbyapiidTemp[3].messageId4XX
                    objSequenceThird.messageId5XX = this.messageId5XXThird
                    objSequenceThird.status = this.getsequenceflowlistbyapiidTemp[3].status
                    objSequenceThird.sequnceId = this.getsequenceflowlistbyapiidTemp[3].sequnceId
                    debugger
                    this._primengProgressBarService.show()
                    this.messagesApiFacadeService.sequenceFlowRegister(objSequenceThird).subscribe(p => {
                        debugger
                        this._primengProgressBarService.hide()
                        this.notifierService.showSuccess({detail: "پیام 500 برای  سرویس سوم انتخاب گردید!", life: 3000});
                    },error => {
                        this._primengProgressBarService.hide()
                    })
                },error => {
                    this._primengProgressBarService.hide()
                })
                break
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
                let objSequenceFirst = {
                    parentId: null,
                    apiId: null,
                    actionType: null,
                    runAsync: null,
                    orderId: null,
                    title: "",
                    messageId4XX: null,
                    messageId5XX: null,
                    messageIdForAfterProcess: null,
                    sequnceId: null,
                    status: null
                }
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.getsequenceflowlistbyapiid(this.apiIdOrg).subscribe(v => {
                    debugger
                    this._primengProgressBarService.hide()
                    this.getsequenceflowlistbyapiidTemp = v

                    objSequenceFirst.parentId = this.getsequenceflowlistbyapiidTemp[1].parentId
                    objSequenceFirst.apiId = this.getsequenceflowlistbyapiidTemp[1].apiId
                    objSequenceFirst.actionType = this.getsequenceflowlistbyapiidTemp[1].actionType
                    objSequenceFirst.runAsync = this.getsequenceflowlistbyapiidTemp[1].runAsync
                    objSequenceFirst.orderId = this.getsequenceflowlistbyapiidTemp[1].orderId
                    objSequenceFirst.title = this.getsequenceflowlistbyapiidTemp[1].title
                    objSequenceFirst.messageId4XX = this.getsequenceflowlistbyapiidTemp[1].messageId4XX
                    objSequenceFirst.messageId5XX = this.messageId5XXFirst
                    objSequenceFirst.messageIdForAfterProcess = this.messageIdForAfterProcess
                    objSequenceFirst.status = this.getsequenceflowlistbyapiidTemp[1].status
                    objSequenceFirst.sequnceId = this.getsequenceflowlistbyapiidTemp[1].sequnceId
                    debugger
                    this._primengProgressBarService.show()
                    this.messagesApiFacadeService.sequenceFlowRegister(objSequenceFirst).subscribe(p => {
                        debugger
                        this._primengProgressBarService.hide()
                        this.notifierService.showSuccess({detail: "پیام سفارشی انتخاب گردید!", life: 3000});
                    },error => {
                        this._primengProgressBarService.hide()
                    })
                },error => {
                    this._primengProgressBarService.hide()
                })
                break

        }
    }

    selectedMessage400(message, apiNumber400) {
        debugger
        this.codeMessageDe = message.code
        this.messageIdDe = message.messageId
        this.titleMessageDe = message.title
        this.tableIdDe = message.tableId
        this.messageId = message.messageId

        switch (apiNumber400) {
            case 1:
                this.icon400_valFirst = "pi pi-check"
                this.messageId4XXFirst = message.messageId
                debugger
                this.messagesList400First = this.messagesList400First.filter(function (x) {
                    return x.messageId === message.messageId;

                });
                this.messagesList400Temp = this.messagesList400First

                let objSequenceFirst = {
                    parentId: null,
                    apiId: null,
                    actionType: null,
                    runAsync: null,
                    orderId: null,
                    title: "",
                    messageId4XX: null,
                    messageId5XX: null,
                    status: null
                }
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.getsequenceflowlistbyapiid(this.apiIdOrg).subscribe(v => {
                    debugger
                    this._primengProgressBarService.hide()
                    this.getsequenceflowlistbyapiidTemp = v
                    objSequenceFirst.parentId = this.getsequenceflowlistbyapiidTemp[1].parentId
                    objSequenceFirst.apiId = this.getsequenceflowlistbyapiidTemp[1].apiId
                    objSequenceFirst.actionType = this.getsequenceflowlistbyapiidTemp[1].actionType
                    objSequenceFirst.runAsync = this.getsequenceflowlistbyapiidTemp[1].runAsync
                    objSequenceFirst.orderId = this.getsequenceflowlistbyapiidTemp[1].orderId
                    objSequenceFirst.title = this.getsequenceflowlistbyapiidTemp[1].title
                    objSequenceFirst.messageId4XX = this.messageId4XXFirst
                    objSequenceFirst.messageId5XX = this.getsequenceflowlistbyapiidTemp[1].messageId5XX
                    objSequenceFirst.status = this.getsequenceflowlistbyapiidTemp[1].status
                    this._primengProgressBarService.show()
                    this.messagesApiFacadeService.sequenceFlowRegister(objSequenceFirst).subscribe(p => {
                        debugger
                        this._primengProgressBarService.hide()
                        this.notifierService.showSuccess({detail: "پیام 400 برای  سرویس اول انتخاب گردید!", life: 3000});
                    },error => {
                        this._primengProgressBarService.hide()
                    })
                },error => {
                    this._primengProgressBarService.hide()
                })
                break
            case 2:
                this.icon400_valSecond = "pi pi-check"
                this.messageId4XXSecond = message.messageId
                debugger
                this.messagesList400Second = this.messagesList400Second.filter(function (x) {

                    return x.messageId === message.messageId;

                });
                this.messagesList400Temp = this.messagesList400Second
                let registerTempSecond = {
                    code: '',
                    title: '',
                    text: '',
                    textEN: '',
                    type: null,
                    tableId: null,
                    messageId: null,
                };
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.getsequenceflowlistbyapiid(this.apiIdOrg).subscribe(v => {
                    debugger
                    this._primengProgressBarService.hide()
                    this.getsequenceflowlistbyapiidTemp = v
                    this.messagesList400Second[0].messageId != null && this.messagesList400Second[0].messageId != undefined ?
                        registerTempSecond.messageId = this.messagesList400Second[0].messageId : null
                    registerTempSecond.code = this.messagesList400Second[0].code;
                    registerTempSecond.title = this.messagesList400Second[0].title;
                    registerTempSecond.type = this.messagesList400Second[0].type;
                    registerTempSecond.text = this.messagesList400Second[0].text;
                    registerTempSecond.textEN = this.messagesList400Second[0].textEN
                    registerTempSecond.tableId = this.messagesList400Second[0].tableId
                    this._primengProgressBarService.show()
                    this.messagesApiFacadeService.sequenceFlowRegister(registerTempSecond).subscribe(p => {
                        debugger
                        this._primengProgressBarService.hide()
                        this.notifierService.showSuccess({detail: "پیام 400 برای  سرویس دوم انتخاب گردید!", life: 3000});
                    },error => {
                        this._primengProgressBarService.hide()
                    })
                },error => {
                    this._primengProgressBarService.hide()
                })

                break
            case 3:
                this.icon400_valThird = "pi pi-check"
                this.messageId4XXThird = message.messageId
                debugger
                this.messagesList400Third = this.messagesList400Third.filter(function (x) {

                    return x.messageId === message.messageId;

                });
                this.messagesList400Temp = this.messagesList400Third
                let registerTempThird = {
                    code: '',
                    title: '',
                    text: '',
                    textEN: '',
                    type: null,
                    tableId: null,
                    messageId: null,
                };
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.getsequenceflowlistbyapiid(this.apiIdOrg).subscribe(v => {
                    debugger
                    this._primengProgressBarService.hide()
                    this.getsequenceflowlistbyapiidTemp = v
                    this.messagesList400Third[0].messageId != null && this.messagesList400Third[0].messageId != undefined ?
                        registerTempThird.messageId = this.messagesList400Third[0].messageId : null
                    registerTempThird.code = this.messagesList400Third[0].code;
                    registerTempThird.title = this.messagesList400Third[0].title;
                    registerTempThird.type = this.messagesList400Third[0].type;
                    registerTempThird.text = this.messagesList400Third[0].text;
                    registerTempThird.textEN = this.messagesList400Third[0].textEN
                    registerTempThird.tableId = this.messagesList400Third[0].tableId
                    this._primengProgressBarService.show()
                    this.messagesApiFacadeService.sequenceFlowRegister(registerTempThird).subscribe(p => {
                        debugger
                        this._primengProgressBarService.hide()
                        this.notifierService.showSuccess({detail: "پیام 400 برای  سرویس سوم انتخاب گردید!", life: 3000});
                    },error => {
                        this._primengProgressBarService.hide()
                    })
                },error => {
                    this._primengProgressBarService.hide()
                })

                break
        }
    }

    ngOnInit(): void {
        debugger
        if (this.inputSequence != undefined) {
            this.sequenceDto = this.inputSequence
            console.log('pp.inputSequence',this.inputSequence)
            this.clientName = this.inputSequence.clientName
            this.apiTitle = this.inputSequence.title
            this.partyTitle = this.inputSequence.partyTitle
            this.moduleTitle = this.inputSequence.moduleTitle
            this.apiId = this.inputSequence.apiId
            this.clientBase = this.inputSequence.clientBase
            this.moduleBase = this.inputSequence.moduleBase
            this.accessBase = this.inputSequence.accessBase
            this.clientBase = this.inputSequence.clientBase
            this._primengProgressBarService.show()
            this.apiGatewayService.currentApprovalStageApiIdSeq.subscribe(u => {
                console.log(u)
                this._primengProgressBarService.hide()
                this.apiIdOrg = u
                debugger
                this._primengProgressBarService.show()
                this.messagesApiFacadeService.getsequenceflowlistbyapiid(u).subscribe(v => {
                    debugger
                    this._primengProgressBarService.hide()
                    if (v != undefined) {
                        debugger
                        if (v[0] != undefined) {
                            debugger
                            this.title = v[0].title
                            this.apiTitleOrg = v[0].apiTitle
                            this.apiIdOrg = v[0].apiId
                            this.sequnceIdOrg = v[0].sequnceId

                            if (v[0].status == 1) {

                                debugger
                                this._primengProgressBarService.show()
                                this.messagesApiFacadeService.moduleFindbyapiid(u).subscribe(w => {
                                    debugger
                                    this._primengProgressBarService.hide()
                                    debugger
                                    this.moduleIdOrg = w.moduleId
                                    this.moduleTitleOrg = w.moduleTitle
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.partyFindbymoduleid(w.moduleId).subscribe(u => {
                                        debugger
                                        this._primengProgressBarService.hide()
                                        this.partyIdOrg = u.partyId
                                        this.partyTitleOrg = u.title
                                        debugger
                                        if (v[1] != undefined) {
                                            debugger
                                            this._primengProgressBarService.show()
                                            this.messagesApiFacadeService.getmatchnodebysequenceid(v[1].sequnceId).subscribe(j => {
                                                debugger
                                                this._primengProgressBarService.hide()
                                                this.matchListFirst = j

                                                this.apiListOptionsFirst = [
                                                    {title: v[1].apiTitle, apiId: v[1].apiId}
                                                ]
                                                this.apiTitleFirst = v[1].apiTitle
                                                this.apiIdFirst = v[1].apiId
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

                                                    if (this.messagesList400First.length > 1) {
                                                        debugger
                                                        let temp = this
                                                        this.messagesList400First = this.messagesList400First.filter(function (x) {

                                                            return x.messageId === v[1].messageId4XX;

                                                        });
                                                    }
                                                    debugger
                                                    this.messagesList400Temp = this.messagesList400First
                                                    this.apiNumber400 = 1
                                                    this.actionTypeFirst = v[1].actionType
                                                    v[1].runAsync == 1 ? this.runAsyncFirst = true : this.runAsyncFirst = false
                                                    if (v[1].actionType == 2) {
                                                        this.afterApiFirst = 1
                                                    }
                                                },error =>{
                                                    this._primengProgressBarService.hide()
                                                })
                                                this._primengProgressBarService.show()
                                                this.messagesApiFacadeService.messagesearch(
                                                    this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                                    this.typeMessage500
                                                ).subscribe(response => {
                                                    this._primengProgressBarService.hide()
                                                    debugger
                                                    this.messagesList500First = []
                                                    if (Array.isArray(response)) {
                                                        this.messagesList500First = response
                                                        this.messagesList500Temp = response
                                                    } else {
                                                        this.messagesList500First.push(response)
                                                        this.messagesList500Temp.push(response)
                                                    }
                                                    if (this.messagesList500First.length > 1) {
                                                        let temp = this
                                                        this.messagesList500First = this.messagesList500First.filter(function (x) {


                                                            return x.messageId === temp.messageId5XXFirst;
                                                        });
                                                    }
                                                    this.messagesList500Temp = this.messagesList500First


                                                    this.apiNumber500 = 1

                                                },error => {
                                                    this._primengProgressBarService.hide()
                                                })
                                                this._primengProgressBarService.show()
                                                this.messagesApiFacadeService.messagesearch(
                                                    this.codeMessageCus, this.titleMessageCus, this.tableIdMessageCus,
                                                    this.typeMessageCus
                                                ).subscribe(response => {
                                                    this._primengProgressBarService.hide()
                                                    debugger
                                                    this.messagesListCusFirst = []
                                                    if (Array.isArray(response)) {
                                                        this.messagesListCusFirst = response
                                                        this.messagesListCusTemp = response
                                                    } else {
                                                        this.messagesListCusFirst.push(response)
                                                        this.messagesListCusTemp.push(response)
                                                    }
                                                    if (this.messagesListCusFirst.length > 1) {
                                                        let temp = this
                                                        this.messagesListCusFirst = this.messagesListCusFirst.filter(function (x) {

                                                            return x.messageId === temp.messageIdForAfterProcess;
                                                        });
                                                    }
                                                    this.messagesListCusTemp = this.messagesListCusFirst


                                                    this.apiNumberCus = 1

                                                },error =>{
                                                    this._primengProgressBarService.hide()
                                                })
                                                if (v[1].messageId4XX != undefined && v[1].messageId4XX != 0) {
                                                    debugger
                                                    this.icon400_valFirst = "pi pi-check"
                                                    this.messageId4XXFirst = v[1].messageId4XX
                                                }
                                                if (v[1].messageId5XX != undefined && v[1].messageId5XX != 0) {
                                                    debugger
                                                    this.icon500_valFirst = "pi pi-check"
                                                    this.messageId5XXFirst = v[1].messageId5XX
                                                }

                                                debugger
                                                if (v[1].messageIdForAfter != undefined && v[1].messageIdForAfter != 0) {
                                                    this.iconCus_valFirst = "pi pi-check"
                                                    debugger
                                                    this.messageIdForAfterProcess = v[1].messageIdForAfter
                                                }
                                                // this.messagesApiFacadeService.apibyid( v[1].apiId).subscribe(o => {
                                                //     debugger
                                                //     this.apiIdFirst = o.apiId
                                                //     this.apiTitleFirst = o.title
                                                this._primengProgressBarService.show()
                                                this.messagesApiFacadeService.moduleFindbyapiid(v[1].apiId).subscribe(i => {
                                                    debugger
                                                    this._primengProgressBarService.hide()
                                                    this.moduleListOptionsFirst = [
                                                        {moduleTitle: i.moduleTitle, moduleId: i.moduleId}
                                                    ]
                                                    this.moduleIdFirst = i.moduleId
                                                    this.moduleTitleFirst = i.moduleTitle
                                                    this._primengProgressBarService.show()
                                                    this.messagesApiFacadeService.partyFindbymoduleid(i.moduleId).subscribe(y => {
                                                        debugger
                                                        this._primengProgressBarService.hide()
                                                        this.partyListOptionsFirst = [{title: y.title, partyId: y.partyId}]
                                                        this.partyIdFirst = y.partyId
                                                        this.partyTitleFirst = y.title

                                                        if (v[2] != undefined) {
                                                            this.apiListOptionsSecond = [
                                                                {title: v[2].apiTitle, apiId: v[2].apiId}]
                                                            this.apiTitleSecond = v[2].apiTitle
                                                            this.apiIdSecond = v[2].apiId

                                                            this.actionTypeSecond = v[2].actionType
                                                            v[2].runAsync == 1 ? this.runAsyncSecond = true : this.runAsyncSecond = false
                                                            if (v[2].actionType == 2) {
                                                                this.afterApiSecond = 2
                                                            }
                                                            if (v[2].messageId4XX != undefined && v[2].messageId4XX != 0) {
                                                                this.icon400_valSecond = "pi pi-check"
                                                                this.messageId4XXSecond = v[2].messageId4XX
                                                            }
                                                            if (v[2].messageId5XX != undefined && v[2].messageId5XX != 0) {
                                                                this.icon500_valSecond = "pi pi-check"
                                                                this.messageId5XXSecond = v[2].messageId5XX
                                                            }
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
                                                                if (this.messagesList500Second.length > 1) {
                                                                    let temp = this
                                                                    this.messagesList500Second = this.messagesList500Second.filter(function (x) {

                                                                        return x.messageId === temp.messageId5XXSecond;
                                                                    });
                                                                }
                                                                this.messagesList500Temp = this.messagesList500Second
                                                                this.apiNumber500 = 2
                                                            },error => {
                                                                this._primengProgressBarService.hide()
                                                            })
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
                                                                if (this.messagesList400Second.length > 1) {
                                                                    let temp = this
                                                                    this.messagesList400Second = this.messagesList400Second.filter(function (x) {

                                                                        return x.messageId === temp.messageId4XXSecond;
                                                                    });
                                                                }
                                                                this.messagesList400Temp = this.messagesList400Second
                                                                this.apiNumber400 = 2
                                                            },error => {
                                                                this._primengProgressBarService.hide()
                                                            })
                                                            this._primengProgressBarService.show()
                                                            this.messagesApiFacadeService.moduleFindbyapiid(v[2].apiId).subscribe(r => {
                                                                debugger
                                                                this._primengProgressBarService.hide()
                                                                this.moduleListOptionsSecond = [
                                                                    {moduleTitle: r.moduleTitle, moduleId: r.moduleId}
                                                                ]
                                                                this.moduleIdFirst = r.moduleId
                                                                this.moduleTitleFirst = r.moduleTitle
                                                                this._primengProgressBarService.show()
                                                                this.messagesApiFacadeService.partyFindbymoduleid(r.moduleId).subscribe(q => {
                                                                    debugger
                                                                    this._primengProgressBarService.hide()
                                                                    this.partyListOptionsSecond = [{title: q.title, partyId: q.partyId}]
                                                                    this.partyIdFirst = q.partyId
                                                                    this.partyTitleFirst = q.title

                                                                    if (v[3] != undefined) {
                                                                        this.apiListOptionsThird = [
                                                                            {title: v[3].apiTitle, apiId: v[3].apiId}
                                                                        ]
                                                                        this.apiTitleThird = v[3].apiTitle
                                                                        this.apiIdThird = v[3].apiId

                                                                        this.actionTypeThird = v[3].actionType
                                                                        v[3].runAsync == 1 ? this.runAsyncThird = true : this.runAsyncThird = false
                                                                        if (v[3].actionType == 2) {
                                                                            this.afterApiThird = 3
                                                                        }
                                                                        if (v[3].messageId4XX != undefined && v[3].messageId4XX != 0) {
                                                                            this.icon400_valThird = "pi pi-check"
                                                                            this.messageId4XXThird = v[3].messageId4XX
                                                                        }
                                                                        if (v[3].messageId5XX != undefined && v[3].messageId5XX != 0) {
                                                                            this.icon500_valThird = "pi pi-check"
                                                                            this.messageId5XXThird = v[3].messageId5XX
                                                                        }
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
                                                                            if (this.messagesList400Third.length > 1) {
                                                                                let temp = this
                                                                                this.messagesList400Third = this.messagesList400Third.filter(function (x) {

                                                                                    return x.messageId === temp.messageId4XXThird;
                                                                                });
                                                                            }
                                                                            this.messagesList400Temp = this.messagesList400Third
                                                                            this.apiNumber400 = 3
                                                                        },error => {
                                                                            this._primengProgressBarService.hide()
                                                                        })
                                                                        this._primengProgressBarService.show()
                                                                        this.messagesApiFacadeService.messagesearch(
                                                                            this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                                                            this.typeMessage500
                                                                        ).subscribe(response => {
                                                                            this._primengProgressBarService.hide()
                                                                            this.messagesList500Third = []
                                                                            if (Array.isArray(response)) {
                                                                                this.messagesList500Third = response
                                                                                this.messagesList500Temp = response
                                                                            } else {
                                                                                this.messagesList500Third.push(response)
                                                                                this.messagesList500Temp.push(response)
                                                                            }
                                                                            if (this.messagesList500Third.length > 1) {
                                                                                let temp = this
                                                                                this.messagesList500Third = this.messagesList500Third.filter(function (x) {

                                                                                    return x.messageId === temp.messageId5XXThird;
                                                                                });
                                                                            }
                                                                            this.messagesList500Temp = this.messagesList500Third
                                                                            this.apiNumber500 = 3
                                                                        },error => {
                                                                            this._primengProgressBarService.hide()
                                                                        })

                                                                        this._primengProgressBarService.show()
                                                                        this.messagesApiFacadeService.moduleFindbyapiid(v[3].apiId).subscribe(g => {
                                                                            debugger
                                                                            this._primengProgressBarService.hide()
                                                                            this.moduleListOptionsThird = [
                                                                                {moduleTitle: g.moduleTitle, moduleId: g.moduleId}
                                                                            ]
                                                                            this.moduleIdThird = g.moduleId
                                                                            this.moduleTitleThird = g.moduleTitle
                                                                            this._primengProgressBarService.show()
                                                                            this.messagesApiFacadeService.partyFindbymoduleid(g.moduleId).subscribe(j => {
                                                                                debugger
                                                                                this._primengProgressBarService.hide()
                                                                                this.partyListOptionsThird = [{title: j.title, partyId: j.partyId}]
                                                                                this.partyIdThird = j.partyId
                                                                                this.partyTitleThird = j.title
                                                                            },error => {
                                                                                this._primengProgressBarService.hide()
                                                                            })
                                                                        },error => {
                                                                            this._primengProgressBarService.hide()
                                                                        })
                                                                    }
                                                                },error => {
                                                                    this._primengProgressBarService.hide()
                                                                })
                                                            },error => {
                                                                this._primengProgressBarService.hide()
                                                            })
                                                        }
                                                    },error => {
                                                        this._primengProgressBarService.hide()
                                                    })
                                                },error => {
                                                    this._primengProgressBarService.hide()
                                                })
                                            },error => {
                                                this._primengProgressBarService.hide()
                                            })
                                        }
                                    },error => {
                                        this._primengProgressBarService.hide()
                                    })
                                },error => {
                                    this._primengProgressBarService.hide()
                                })
                                // })

                                this.sequenceFlag = true

                                debugger
                            } else {
                                this.sequenceFlag = false
                            }
                        }
                    }


                }, error => {
                    debugger
                    this._primengProgressBarService.hide()
                    console.log(error, 'error')
                    this.sequenceFlag = false
                })
            },error => {
                this._primengProgressBarService.hide()
            })


            if (this.clientBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('clientBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.moduleBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('moduleBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.accessBase) {
                debugger
                this.detailsBreadObject = this.chooseBread('accessBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            } else if (this.partyTitle != undefined && this.partyTitle != "") {
                debugger
                this.detailsBreadObject = this.chooseBread('partyBase')
                this.apiGatewayService.updateApprovalDetailsBreadObject(this.detailsBreadObject);
            }
        }

    }

    confirm() {
        this.confirmationService.confirm({
            message: 'آیا از غیرفعالسازی این جزیان پردازشی اطمینان دارید؟',
            accept: () => {
                this.deactivate()
                //Actual logic to perform a confirmation
            }
        });
    }

    onClose(e): void {
        debugger

        console.log(e,'this.responseObjSequence')
        if (e != 'close') {
            debugger
            debugger
            debugger
            if (e!=undefined){
                debugger
                debugger
                debugger

                this.clientName = e.clientName
                this.apiTitle = e.title
                this.partyTitle = e.partyTitle
                this.moduleTitle = e.moduleTitle
                this.apiId = e.apiIdOrg
                this.apiIdOrg = e.apiIdOrg
                console.log("apiIdOrgپرنت2",this.apiIdOrg)
                this.clientBase = e.clientBase
                this.moduleBase = e.moduleBase
                this.accessBase = e.accessBase
                this.clientBase = e.clientBase
                this.apiGatewayService.currentApprovalStageApiIdSeq.subscribe(u => {
                    debugger
                    console.log(u,'currentApprovalStageApiIdSeq')
                    debugger
                    this._primengProgressBarService.show()
                    debugger
                    this.messagesApiFacadeService.getsequenceflowlistbyapiid(u).subscribe(v => {
                        debugger
                        this._primengProgressBarService.hide()
                        if (v != undefined) {
                            if (v[0] != undefined) {
                                this.title = v[0].title
                                this.apiTitleOrg = v[0].apiTitle
                                this.apiIdOrg = v[0].apiId
                                console.log("پرنت1",this.apiIdOrg)
                                this.sequnceIdOrg = v[0].sequnceId
                                if (v[0].status == 1) {
                                    debugger
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.moduleFindbyapiid(u).subscribe(w => {
                                        debugger
                                        this._primengProgressBarService.hide()
                                        debugger
                                        this.moduleIdOrg = w.moduleId
                                        this.moduleTitleOrg = w.moduleTitle
                                        this._primengProgressBarService.show()
                                        this.messagesApiFacadeService.partyFindbymoduleid(w.moduleId).subscribe(u => {
                                            debugger
                                            this._primengProgressBarService.hide()
                                            this.partyIdOrg = u.partyId
                                            this.partyTitleOrg = u.title
                                            debugger
                                            if (v[1] != undefined) {
                                                debugger
                                                this._primengProgressBarService.show()
                                                this.messagesApiFacadeService.getmatchnodebysequenceid(v[1].sequnceId).subscribe(j => {
                                                    debugger
                                                    this._primengProgressBarService.hide()
                                                    this.matchListFirst = j

                                                    this.apiListOptionsFirst = [
                                                        {title: v[1].apiTitle, apiId: v[1].apiId}
                                                    ]
                                                    this.apiTitleFirst = v[1].apiTitle
                                                    this.apiIdFirst = v[1].apiId
                                                    console.log("v[1].apiIdپرنت2",v[1].apiId)
                                                    if (v[1].messageId4XX != undefined && v[1].messageId4XX != 0) {
                                                        this.icon400_valFirst = "pi pi-check"
                                                        this.messageId4XXFirst = v[1].messageId4XX
                                                    }
                                                    if (v[1].messageId5XX != undefined && v[1].messageId5XX != 0) {
                                                        this.icon500_valFirst = "pi pi-check"
                                                        this.messageId5XXFirst = v[1].messageId5XX
                                                    }
                                                    debugger
                                                    if (v[1].messageIdForAfter != undefined && v[1].messageIdForAfter != 0) {
                                                        this.iconCus_valFirst = "pi pi-check"
                                                        debugger
                                                        this.messageIdForAfterProcess = v[1].messageIdForAfter
                                                    }
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

                                                        if (this.messagesList400First.length > 1) {
                                                            debugger
                                                            let temp = this
                                                            this.messagesList400First = this.messagesList400First.filter(function (x) {

                                                                return x.messageId === temp.messageId4XXFirst;
                                                            });
                                                        }
                                                        debugger
                                                        this.messagesList400Temp = this.messagesList400First
                                                        this.apiNumber400 = 1
                                                        this.actionTypeFirst = v[1].actionType
                                                        v[1].runAsync == 1 ? this.runAsyncFirst = true : this.runAsyncFirst = false
                                                        if (v[1].actionType == 2) {
                                                            this.afterApiFirst = 1
                                                        }
                                                    },error => {
                                                        this._primengProgressBarService.hide()
                                                    })
                                                    this._primengProgressBarService.show()
                                                    this.messagesApiFacadeService.messagesearch(
                                                        this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                                        this.typeMessage500
                                                    ).subscribe(response => {
                                                        this._primengProgressBarService.hide()
                                                        debugger
                                                        this.messagesList500First = []
                                                        if (Array.isArray(response)) {
                                                            this.messagesList500First = response
                                                            this.messagesList500Temp = response
                                                        } else {
                                                            this.messagesList500First.push(response)
                                                            this.messagesList500Temp.push(response)
                                                        }
                                                        if (this.messagesList500First.length > 1) {
                                                            let temp = this
                                                            this.messagesList500First = this.messagesList500First.filter(function (x) {

                                                                return x.messageId === temp.messageId5XXFirst;
                                                            });
                                                        }
                                                        this.messagesList500Temp = this.messagesList500First


                                                        this.apiNumber500 = 1

                                                    },error => {
                                                        this._primengProgressBarService.hide()
                                                    })
                                                    this._primengProgressBarService.show()
                                                    this.messagesApiFacadeService.moduleFindbyapiid(v[1].apiId).subscribe(i => {
                                                        debugger
                                                        this._primengProgressBarService.hide()
                                                        this.moduleListOptionsFirst = [
                                                            {moduleTitle: i.moduleTitle, moduleId: i.moduleId}
                                                        ]
                                                        this.moduleIdFirst = i.moduleId
                                                        this.moduleTitleFirst = i.moduleTitle
                                                        this._primengProgressBarService.show()
                                                        this.messagesApiFacadeService.partyFindbymoduleid(i.moduleId).subscribe(y => {
                                                            debugger
                                                            this._primengProgressBarService.hide()
                                                            this.partyListOptionsFirst = [{title: y.title, partyId: y.partyId}]
                                                            this.partyIdFirst = y.partyId
                                                            this.partyTitleFirst = y.title

                                                            if (v[2] != undefined) {
                                                                this.apiListOptionsSecond = [
                                                                    {title: v[2].apiTitle, apiId: v[2].apiId}]
                                                                this.apiTitleSecond = v[2].apiTitle
                                                                this.apiIdSecond = v[2].apiId

                                                                this.actionTypeSecond = v[2].actionType
                                                                v[2].runAsync == 1 ? this.runAsyncSecond = true : this.runAsyncSecond = false
                                                                if (v[2].actionType == 2) {
                                                                    this.afterApiSecond = 2
                                                                }
                                                                if (v[2].messageId4XX != undefined && v[2].messageId4XX != 0) {
                                                                    this.icon400_valSecond = "pi pi-check"
                                                                    this.messageId4XXSecond = v[2].messageId4XX
                                                                }
                                                                if (v[2].messageId5XX != undefined && v[2].messageId5XX != 0) {
                                                                    this.icon500_valSecond = "pi pi-check"
                                                                    this.messageId5XXSecond = v[2].messageId5XX
                                                                }
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
                                                                    if (this.messagesList500Second.length > 1) {
                                                                        let temp = this
                                                                        this.messagesList500Second = this.messagesList500Second.filter(function (x) {

                                                                            return x.messageId === temp.messageId5XXSecond;
                                                                        });
                                                                    }
                                                                    this.messagesList500Temp = this.messagesList500Second
                                                                    this.apiNumber500 = 2
                                                                },error => {
                                                                    this._primengProgressBarService.hide()
                                                                })
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
                                                                    if (this.messagesList400Second.length > 1) {
                                                                        let temp = this
                                                                        this.messagesList400Second = this.messagesList400Second.filter(function (x) {

                                                                            return x.messageId === temp.messageId4XXSecond;
                                                                        });
                                                                    }
                                                                    this.messagesList400Temp = this.messagesList400Second
                                                                    this.apiNumber400 = 2
                                                                },error => {
                                                                    this._primengProgressBarService.hide()
                                                                })
                                                                this._primengProgressBarService.show()
                                                                this.messagesApiFacadeService.moduleFindbyapiid(v[2].apiId).subscribe(r => {
                                                                    debugger
                                                                    this._primengProgressBarService.hide()
                                                                    this.moduleListOptionsSecond = [
                                                                        {moduleTitle: r.moduleTitle, moduleId: r.moduleId}
                                                                    ]
                                                                    this.moduleIdFirst = r.moduleId
                                                                    this.moduleTitleFirst = r.moduleTitle
                                                                    this._primengProgressBarService.show()
                                                                    this.messagesApiFacadeService.partyFindbymoduleid(r.moduleId).subscribe(q => {
                                                                        debugger
                                                                        this._primengProgressBarService.hide()
                                                                        this.partyListOptionsSecond = [{title: q.title, partyId: q.partyId}]
                                                                        this.partyIdFirst = q.partyId
                                                                        this.partyTitleFirst = q.title

                                                                        if (v[3] != undefined) {
                                                                            this.apiListOptionsThird = [
                                                                                {title: v[3].apiTitle, apiId: v[3].apiId}
                                                                            ]
                                                                            this.apiTitleThird = v[3].apiTitle
                                                                            this.apiIdThird = v[3].apiId

                                                                            this.actionTypeThird = v[3].actionType
                                                                            v[3].runAsync == 1 ? this.runAsyncThird = true : this.runAsyncThird = false
                                                                            if (v[3].actionType == 2) {
                                                                                this.afterApiThird = 3
                                                                            }
                                                                            if (v[3].messageId4XX != undefined && v[3].messageId4XX != 0) {
                                                                                this.icon400_valThird = "pi pi-check"
                                                                                this.messageId4XXThird = v[3].messageId4XX
                                                                            }
                                                                            if (v[3].messageId5XX != undefined && v[3].messageId5XX != 0) {
                                                                                this.icon500_valThird = "pi pi-check"
                                                                                this.messageId5XXThird = v[3].messageId5XX
                                                                            }
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
                                                                                if (this.messagesList400Third.length > 1) {
                                                                                    let temp = this
                                                                                    this.messagesList400Third = this.messagesList400Third.filter(function (x) {

                                                                                        return x.messageId === temp.messageId4XXThird;
                                                                                    });
                                                                                }
                                                                                this.messagesList400Temp = this.messagesList400Third
                                                                                this.apiNumber400 = 3
                                                                            },error => {
                                                                                this._primengProgressBarService.hide()
                                                                            })
                                                                            this._primengProgressBarService.show()
                                                                            this.messagesApiFacadeService.messagesearch(
                                                                                this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                                                                this.typeMessage500
                                                                            ).subscribe(response => {
                                                                                this._primengProgressBarService.hide()
                                                                                this.messagesList500Third = []
                                                                                if (Array.isArray(response)) {
                                                                                    this.messagesList500Third = response
                                                                                    this.messagesList500Temp = response
                                                                                } else {
                                                                                    this.messagesList500Third.push(response)
                                                                                    this.messagesList500Temp.push(response)
                                                                                }
                                                                                if (this.messagesList500Third.length > 1) {
                                                                                    let temp = this
                                                                                    this.messagesList500Third = this.messagesList500Third.filter(function (x) {

                                                                                        return x.messageId === temp.messageId5XXThird;
                                                                                    });
                                                                                }
                                                                                this.messagesList500Temp = this.messagesList500Third
                                                                                this.apiNumber500 = 3
                                                                            },error => {
                                                                                this._primengProgressBarService.hide()
                                                                            })
                                                                            this._primengProgressBarService.show()
                                                                            this.messagesApiFacadeService.moduleFindbyapiid(v[3].apiId).subscribe(g => {
                                                                                debugger
                                                                                this._primengProgressBarService.hide()
                                                                                this.moduleListOptionsThird = [
                                                                                    {moduleTitle: g.moduleTitle, moduleId: g.moduleId}
                                                                                ]
                                                                                this.moduleIdThird = g.moduleId
                                                                                this.moduleTitleThird = g.moduleTitle
                                                                                this._primengProgressBarService.show()
                                                                                this.messagesApiFacadeService.partyFindbymoduleid(g.moduleId).subscribe(j => {
                                                                                    this._primengProgressBarService.hide()
                                                                                    this.partyListOptionsThird = [{title: j.title, partyId: j.partyId}]
                                                                                    this.partyIdThird = j.partyId
                                                                                    this.partyTitleThird = j.title
                                                                                },error => {
                                                                                    this._primengProgressBarService.hide()
                                                                                })
                                                                            },error => {
                                                                                this._primengProgressBarService.hide()
                                                                            })
                                                                        }
                                                                    },error => {
                                                                        this._primengProgressBarService.hide()
                                                                    })
                                                                },error => {
                                                                    this._primengProgressBarService.hide()
                                                                })
                                                            }
                                                        },error => {
                                                            this._primengProgressBarService.hide()
                                                        })
                                                    },error => {
                                                        this._primengProgressBarService.hide()
                                                    })
                                                },error => {
                                                    this._primengProgressBarService.hide()
                                                })
                                            }
                                        },error => {
                                            this._primengProgressBarService.hide()
                                        })
                                    },error => {
                                        this._primengProgressBarService.hide()
                                    })
                                    this.sequenceFlag = true
                                    debugger
                                } else {
                                    this.sequenceFlag = false
                                }
                            }
                        }


                    }, error => {
                        debugger
                        this._primengProgressBarService.hide()
                        console.log(error, 'error')
                        this.sequenceFlag = false
                    })

                })
            }

            else if (this.inputSequence != undefined) {
                //  this.sequenceDto = this.inputSequence
                this.clientName = this.inputSequence.clientName
                this.apiTitle = this.inputSequence.title
                this.partyTitle = this.inputSequence.partyTitle
                this.moduleTitle = this.inputSequence.moduleTitle
                this.apiId = this.inputSequence.apiIdOrg
                console.log("apiIdپرنت2",this.apiId)
                this.apiIdOrg = this.inputSequence.apiIdOrg
                console.log("apiIdOrgپرنت2",this.apiIdOrg)
                this.clientBase = this.inputSequence.clientBase
                this.moduleBase = this.inputSequence.moduleBase
                this.accessBase = this.inputSequence.accessBase
                this.clientBase = this.inputSequence.clientBase
                this.apiGatewayService.currentApprovalStageApiIdSeq.subscribe(u => {
                    debugger
                    console.log(u,'currentApprovalStageApiIdSeq')
                    debugger
                    this._primengProgressBarService.show()
                    this.messagesApiFacadeService.getsequenceflowlistbyapiid(u).subscribe(v => {
                        debugger
                        this._primengProgressBarService.hide()
                        if (v != undefined) {
                            if (v[0] != undefined) {
                                this.title = v[0].title
                                this.apiTitleOrg = v[0].apiTitle
                                this.apiIdOrg = v[0].apiId
                                console.log("پرنت1",this.apiIdOrg)
                                this.sequnceIdOrg = v[0].sequnceId
                                if (v[0].status == 1) {
                                    debugger
                                    this._primengProgressBarService.show()
                                    this.messagesApiFacadeService.moduleFindbyapiid(u).subscribe(w => {
                                        debugger
                                        this._primengProgressBarService.hide()
                                        debugger
                                        this.moduleIdOrg = w.moduleId
                                        this.moduleTitleOrg = w.moduleTitle
                                        this._primengProgressBarService.show()
                                        this.messagesApiFacadeService.partyFindbymoduleid(w.moduleId).subscribe(u => {
                                            debugger
                                            this._primengProgressBarService.hide()
                                            this.partyIdOrg = u.partyId
                                            this.partyTitleOrg = u.title
                                            debugger
                                            if (v[1] != undefined) {
                                                debugger
                                                this._primengProgressBarService.show()
                                                this.messagesApiFacadeService.getmatchnodebysequenceid(v[1].sequnceId).subscribe(j => {
                                                    debugger
                                                    this._primengProgressBarService.hide()
                                                    this.matchListFirst = j

                                                    this.apiListOptionsFirst = [
                                                        {title: v[1].apiTitle, apiId: v[1].apiId}
                                                    ]
                                                    this.apiTitleFirst = v[1].apiTitle
                                                    this.apiIdFirst = v[1].apiId
                                                    console.log("v[1].apiIdپرنت2",v[1].apiId)
                                                    if (v[1].messageId4XX != undefined && v[1].messageId4XX != 0) {
                                                        this.icon400_valFirst = "pi pi-check"
                                                        this.messageId4XXFirst = v[1].messageId4XX
                                                    }
                                                    if (v[1].messageId5XX != undefined && v[1].messageId5XX != 0) {
                                                        this.icon500_valFirst = "pi pi-check"
                                                        this.messageId5XXFirst = v[1].messageId5XX
                                                    }
                                                    debugger
                                                    if (v[1].messageIdForAfter != undefined && v[1].messageIdForAfter != 0) {
                                                        this.iconCus_valFirst = "pi pi-check"
                                                        debugger
                                                        this.messageIdForAfterProcess = v[1].messageIdForAfter
                                                    }
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

                                                        if (this.messagesList400First.length > 1) {
                                                            debugger
                                                            let temp = this
                                                            this.messagesList400First = this.messagesList400First.filter(function (x) {

                                                                return x.messageId === temp.messageId4XXFirst;
                                                            });
                                                        }
                                                        debugger
                                                        this.messagesList400Temp = this.messagesList400First
                                                        this.apiNumber400 = 1
                                                        this.actionTypeFirst = v[1].actionType
                                                        v[1].runAsync == 1 ? this.runAsyncFirst = true : this.runAsyncFirst = false
                                                        if (v[1].actionType == 2) {
                                                            this.afterApiFirst = 1
                                                        }
                                                    },error => {
                                                        this._primengProgressBarService.hide()
                                                    })
                                                    this._primengProgressBarService.show()
                                                    this.messagesApiFacadeService.messagesearch(
                                                        this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                                        this.typeMessage500
                                                    ).subscribe(response => {
                                                        this._primengProgressBarService.hide()
                                                        debugger
                                                        this.messagesList500First = []
                                                        if (Array.isArray(response)) {
                                                            this.messagesList500First = response
                                                            this.messagesList500Temp = response
                                                        } else {
                                                            this.messagesList500First.push(response)
                                                            this.messagesList500Temp.push(response)
                                                        }
                                                        if (this.messagesList500First.length > 1) {
                                                            let temp = this
                                                            this.messagesList500First = this.messagesList500First.filter(function (x) {

                                                                return x.messageId === temp.messageId5XXFirst;
                                                            });
                                                        }
                                                        this.messagesList500Temp = this.messagesList500First


                                                        this.apiNumber500 = 1

                                                    },error => {
                                                        this._primengProgressBarService.hide()
                                                    })
                                                    this._primengProgressBarService.show()
                                                    this.messagesApiFacadeService.moduleFindbyapiid(v[1].apiId).subscribe(i => {
                                                        debugger
                                                        this._primengProgressBarService.hide()
                                                        this.moduleListOptionsFirst = [
                                                            {moduleTitle: i.moduleTitle, moduleId: i.moduleId}
                                                        ]
                                                        this.moduleIdFirst = i.moduleId
                                                        this.moduleTitleFirst = i.moduleTitle
                                                        this._primengProgressBarService.show()
                                                        this.messagesApiFacadeService.partyFindbymoduleid(i.moduleId).subscribe(y => {
                                                            debugger
                                                            this._primengProgressBarService.hide()
                                                            this.partyListOptionsFirst = [{title: y.title, partyId: y.partyId}]
                                                            this.partyIdFirst = y.partyId
                                                            this.partyTitleFirst = y.title

                                                            if (v[2] != undefined) {
                                                                this.apiListOptionsSecond = [
                                                                    {title: v[2].apiTitle, apiId: v[2].apiId}]
                                                                this.apiTitleSecond = v[2].apiTitle
                                                                this.apiIdSecond = v[2].apiId

                                                                this.actionTypeSecond = v[2].actionType
                                                                v[2].runAsync == 1 ? this.runAsyncSecond = true : this.runAsyncSecond = false
                                                                if (v[2].actionType == 2) {
                                                                    this.afterApiSecond = 2
                                                                }
                                                                if (v[2].messageId4XX != undefined && v[2].messageId4XX != 0) {
                                                                    this.icon400_valSecond = "pi pi-check"
                                                                    this.messageId4XXSecond = v[2].messageId4XX
                                                                }
                                                                if (v[2].messageId5XX != undefined && v[2].messageId5XX != 0) {
                                                                    this.icon500_valSecond = "pi pi-check"
                                                                    this.messageId5XXSecond = v[2].messageId5XX
                                                                }
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
                                                                    if (this.messagesList500Second.length > 1) {
                                                                        let temp = this
                                                                        this.messagesList500Second = this.messagesList500Second.filter(function (x) {

                                                                            return x.messageId === temp.messageId5XXSecond;
                                                                        });
                                                                    }
                                                                    this.messagesList500Temp = this.messagesList500Second
                                                                    this.apiNumber500 = 2
                                                                },error => {
                                                                    this._primengProgressBarService.hide()
                                                                })
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
                                                                    if (this.messagesList400Second.length > 1) {
                                                                        let temp = this
                                                                        this.messagesList400Second = this.messagesList400Second.filter(function (x) {

                                                                            return x.messageId === temp.messageId4XXSecond;
                                                                        });
                                                                    }
                                                                    this.messagesList400Temp = this.messagesList400Second
                                                                    this.apiNumber400 = 2
                                                                },error => {
                                                                    this._primengProgressBarService.hide()
                                                                })
                                                                this._primengProgressBarService.show()
                                                                this.messagesApiFacadeService.moduleFindbyapiid(v[2].apiId).subscribe(r => {
                                                                    debugger
                                                                    this._primengProgressBarService.hide()
                                                                    this.moduleListOptionsSecond = [
                                                                        {moduleTitle: r.moduleTitle, moduleId: r.moduleId}
                                                                    ]
                                                                    this.moduleIdFirst = r.moduleId
                                                                    this.moduleTitleFirst = r.moduleTitle
                                                                    this._primengProgressBarService.show()
                                                                    this.messagesApiFacadeService.partyFindbymoduleid(r.moduleId).subscribe(q => {
                                                                        debugger
                                                                        this._primengProgressBarService.hide()
                                                                        this.partyListOptionsSecond = [{title: q.title, partyId: q.partyId}]
                                                                        this.partyIdFirst = q.partyId
                                                                        this.partyTitleFirst = q.title

                                                                        if (v[3] != undefined) {
                                                                            this.apiListOptionsThird = [
                                                                                {title: v[3].apiTitle, apiId: v[3].apiId}
                                                                            ]
                                                                            this.apiTitleThird = v[3].apiTitle
                                                                            this.apiIdThird = v[3].apiId

                                                                            this.actionTypeThird = v[3].actionType
                                                                            v[3].runAsync == 1 ? this.runAsyncThird = true : this.runAsyncThird = false
                                                                            if (v[3].actionType == 2) {
                                                                                this.afterApiThird = 3
                                                                            }
                                                                            if (v[3].messageId4XX != undefined && v[3].messageId4XX != 0) {
                                                                                this.icon400_valThird = "pi pi-check"
                                                                                this.messageId4XXThird = v[3].messageId4XX
                                                                            }
                                                                            if (v[3].messageId5XX != undefined && v[3].messageId5XX != 0) {
                                                                                this.icon500_valThird = "pi pi-check"
                                                                                this.messageId5XXThird = v[3].messageId5XX
                                                                            }
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
                                                                                if (this.messagesList400Third.length > 1) {
                                                                                    let temp = this
                                                                                    this.messagesList400Third = this.messagesList400Third.filter(function (x) {

                                                                                        return x.messageId === temp.messageId4XXThird;
                                                                                    });
                                                                                }
                                                                                this.messagesList400Temp = this.messagesList400Third
                                                                                this.apiNumber400 = 3
                                                                            },error => {
                                                                                this._primengProgressBarService.hide()
                                                                            })
                                                                            this._primengProgressBarService.show()
                                                                            this.messagesApiFacadeService.messagesearch(
                                                                                this.codeMessage500, this.titleMessage500, this.tableIdMessage500,
                                                                                this.typeMessage500
                                                                            ).subscribe(response => {
                                                                                this._primengProgressBarService.hide()
                                                                                this.messagesList500Third = []
                                                                                if (Array.isArray(response)) {
                                                                                    this.messagesList500Third = response
                                                                                    this.messagesList500Temp = response
                                                                                } else {
                                                                                    this.messagesList500Third.push(response)
                                                                                    this.messagesList500Temp.push(response)
                                                                                }
                                                                                if (this.messagesList500Third.length > 1) {
                                                                                    let temp = this
                                                                                    this.messagesList500Third = this.messagesList500Third.filter(function (x) {

                                                                                        return x.messageId === temp.messageId5XXThird;
                                                                                    });
                                                                                }
                                                                                this.messagesList500Temp = this.messagesList500Third
                                                                                this.apiNumber500 = 3
                                                                            },error => {
                                                                                this._primengProgressBarService.hide()
                                                                            })
                                                                            this._primengProgressBarService.show()
                                                                            this.messagesApiFacadeService.moduleFindbyapiid(v[3].apiId).subscribe(g => {
                                                                                debugger
                                                                                this._primengProgressBarService.hide()
                                                                                this.moduleListOptionsThird = [
                                                                                    {moduleTitle: g.moduleTitle, moduleId: g.moduleId}
                                                                                ]
                                                                                this.moduleIdThird = g.moduleId
                                                                                this.moduleTitleThird = g.moduleTitle
                                                                                this._primengProgressBarService.show()
                                                                                this.messagesApiFacadeService.partyFindbymoduleid(g.moduleId).subscribe(j => {
                                                                                    this._primengProgressBarService.hide()
                                                                                    this.partyListOptionsThird = [{title: j.title, partyId: j.partyId}]
                                                                                    this.partyIdThird = j.partyId
                                                                                    this.partyTitleThird = j.title
                                                                                },error => {
                                                                                    this._primengProgressBarService.hide()
                                                                                })
                                                                            },error => {
                                                                                this._primengProgressBarService.hide()
                                                                            })
                                                                        }
                                                                    },error => {
                                                                        this._primengProgressBarService.hide()
                                                                    })
                                                                },error => {
                                                                    this._primengProgressBarService.hide()
                                                                })
                                                            }
                                                        },error => {
                                                            this._primengProgressBarService.hide()
                                                        })
                                                    },error => {
                                                        this._primengProgressBarService.hide()
                                                    })
                                                },error => {
                                                    this._primengProgressBarService.hide()
                                                })
                                            }
                                        },error => {
                                            this._primengProgressBarService.hide()
                                        })
                                    },error => {
                                        this._primengProgressBarService.hide()
                                    })
                                    this.sequenceFlag = true
                                    debugger
                                } else {
                                    this.sequenceFlag = false
                                }
                            }
                        }


                    }, error => {
                        debugger
                        this._primengProgressBarService.hide()
                        console.log(error, 'error')
                        this.sequenceFlag = false
                    })

                })

            }
            this.addFlag = false
        } else {
            this.addFlag = false
        }


    }

    search() {
    }

    clear() {
    }

    showAdd() {
        if (this.sequenceFlag) {
            this.notifierService.showError({detail: 'جریان پردازشی فعال وجود دارد'})
        } else {
            this.addFlag = true
            if (this.inputSequence != undefined)
                this.sequenceDto.apiTitleOrg = this.inputSequence.title
            this.sequenceDto.apiIdOrg = this.inputSequence.apiIdOrg
            this.sequenceDto.apiId = this.inputSequence.apiId
            this.sequenceDto.apiNameOrg = this.inputSequence.apiName
            this.sequenceDto.moduleTitleOrg = this.inputSequence.moduleTitle
            this.sequenceDto.partyTitleOrg = this.inputSequence.partyTitle
        }
    }


}
