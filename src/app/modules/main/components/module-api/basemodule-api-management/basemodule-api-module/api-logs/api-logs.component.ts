import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetailListApiLog } from './detailListApiLog';

import { NgClass, NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

import { InputText } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { Menu } from 'primeng/menu';
import { Message } from 'primeng/message';
import { Panel } from 'primeng/panel';
import { Ripple } from 'primeng/ripple';
import { Steps } from 'primeng/steps';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { FuseLoadingService } from '../../../../../../../../@fuse/services/loading';
import { BreadcrumbsComponent } from '../../../../../../shared/components/breadcrumbs/breadcrumbs.component';
import { DbEnginePipe } from '../../../../../../shared/pipes/dbEngine.pipe';
import { HistoryMoreCharPipe } from '../../../../../../shared/pipes/historyMoreChar.pipe';
import { IsApprovalPipe } from '../../../../../../shared/pipes/isApproval.pipe';
import { ModuleTypePipe } from '../../../../../../shared/pipes/moduleType.pipe';
import { MoreChar19Pipe } from '../../../../../../shared/pipes/moreChar19.pipe';
import { StatusPipe } from '../../../../../../shared/pipes/status.pipe';
import { ToastService } from '../../../../../../shared/services/ToastService';
import { ApiGatewayService } from '../../../../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../../../../services/messages-api-facade.service';
import { MediatorsJsonComponent } from '../../../../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../../../../mediators/mediators.component';
import { NodeChangeListComponent } from '../../../../node-change-list/node-change-list.component';
import { HeaderEndpointRegisterComponent } from '../../../../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { CastToDateTimePipe } from '../../../../../../shared/pipes/cast-to-date-time.pipe';
import { SuccessfulPipe } from '../../../../../../shared/pipes/successful.pipe';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-api-logs',
    templateUrl: './api-logs.component.html',
    styleUrls: ['./api-logs.component.scss'],
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
        CastToDateTimePipe,
        SuccessfulPipe,
        Toast,
    ],
    providers: [DialogService, MessageService, DynamicDialogRef],
})
export class ApiLogsComponent implements OnInit {
    @Input() inputLog;
    @Output() close = new EventEmitter<string>();

    clientListOptions = [{ name: '-', clientId: null }];
    clientId = null;
    onlyFromdate = '';
    fromdate = '';
    todate = '';
    onlyTodate = '';
    onlyToTime = '';
    onlyFromTime = '';
    tblFlag = false;
    logList = [];
    logBase = false;
    detailsBreadObject = [];
    apiId;
    clientName;
    apiTitle;
    moduleTitle;
    partyTitle;
    partyBase;
    accessBase;
    moduleBase;
    clientBase;
    first = 0;
    rows = 10;
    pagesizeOptions = [
        { name: 10, code: 10 },
        { name: 50, code: 50 },
        { name: 100, code: 100 },
        { name: 200, code: 200 },
    ];
    pageno: number = 0;
    pagesize = 10;
    pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
    loading: boolean;

    constructor(
        private route: ActivatedRoute,
        private transloco: TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService,
        private notifierService: ToastService,
        private dialogService: DialogService,
        private messageService: MessageService,

        private ref: DynamicDialogRef
    ) {}

    OnchangePageno(e) {
        this.pageno = 0;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + 1;
        this.search(this.pagesize, this.pageno);
    }

    previousPageStatement(): void {
        this.pageno -= 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(this.pagesize, this.pageno);
    }

    nextPageStatement(): void {
        this.pageno += 1;
        this.pageDescription =this.transloco.translate('hardCode.page') + ': ' + (this.pageno + 1);
        this.search(this.pagesize, this.pageno);
    }

    scrollTop() {
        this.route.fragment.subscribe((f) => {
            const element = document.querySelector('#' + f);
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();

        this.search(this.pagesize, this.pageno);
        if (this.inputLog != undefined) {
            this.clientName = this.inputLog.clientName;
            this.apiTitle = this.inputLog.title;
            this.moduleTitle = this.inputLog.moduleTitle;
            this.partyTitle = this.inputLog.partyTitle;
            this.clientBase = this.inputLog.clientBase;
            this.moduleBase = this.inputLog.moduleBase;
            this.accessBase = this.inputLog.accessBase;
            this.partyBase = this.inputLog.partyBase;
            if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
            } else if (this.moduleBase) {
                this.detailsBreadObject = this.chooseBread('moduleBase');
            } else if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
            } else if (this.partyBase) {
                this.detailsBreadObject = this.chooseBread('partyBase');
            }
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        }
    }

    BeforeButton() {
        this.close.emit('close');
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
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        label_Detail_index2: '(لیست دسترسی)',
                        img_index2: 'assets/icons/api.png',
                    },
                    {
                        index: 3,
                        label_index3: 'لاگ های سرویس',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/log.png',
                    },

                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
                break;
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
                        img_index1: 'assets/icons/module.png',
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
                        label_index3: 'لاگ های سرویس',
                        rout_index3: null,
                        isActive3: true,
                        label_Detail_index3: '(' + this.apiTitle + ')',
                        img_index3: 'assets/icons/log.png',
                    },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
                break;
            case 'accessBase':
                return [

                    {
                        index: 0,
                        label_index0: 'لیست دسترسی',
                        rout_index0: '/api-gateway/access-list',
                        isActive0: false,
                        img_index0: 'assets/icons/access.png',
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
                        label_index2: 'لاگ های سرویس',
                        rout_index2: null,
                        isActive2: true,
                        label_Detail_index2: '(' + this.apiTitle + ')',
                        img_index2: 'assets/icons/log.png',
                    },
                    { label_index3: null, label_Detail_index3: null },
                    { label_index4: null, label_Detail_index4: null },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
                break;
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
                        rout_index2: '/module',
                        isActive2: false,
                        label_Detail_index2: '(' + this.partyTitle + ')',
                        img_index2: 'assets/icons/module.png',
                    },
                    {
                        index: 3,
                        label_index3: 'سرویس',
                        rout_index3: '/api',
                        isActive3: false,
                        label_Detail_index3: '(' + this.moduleTitle + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: 'لاگ های سرویس',
                        rout_index4: null,
                        isActive4: true,
                        label_Detail_index4: '(' + this.apiTitle + ')',
                        img_index4: 'assets/icons/log.png',
                    },
                    { label_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
                break;
            default:
                return null;
        }
    }

    show(log) {
        this.apiGatewayService.updateApprovalRequestlogid(log.REQUESTID);
        this.ref = this.dialogService.open(DetailListApiLog, {
            header: 'جزئیات لاگ',
            width: '60%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
            closable: true
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }

    search(pagesize, pageno) {
        let startRow: number;
        pageno != 0 ? (startRow = pageno * pagesize) : (startRow = 0);
        if (this.inputLog != undefined) {
            this.apiId = this.inputLog.apiId;
        }
        this.onlyTodate = this.onlyTodate.replace(/[/]/g, '');
        this.onlyTodate = this.onlyTodate.replace(/[' ']/g, '');
        this.onlyToTime = this.onlyToTime.replace(/[:]/g, '');
        this.onlyToTime = this.onlyToTime.replace(/[.]/g, '');
        this.onlyFromdate = this.onlyFromdate.replace(/[/]/g, '');
        this.onlyFromdate = this.onlyFromdate.replace(/[' ']/g, '');
        this.onlyFromTime = this.onlyFromTime.replace(/[:]/g, '');
        this.onlyFromTime = this.onlyFromTime.replace(/[.]/g, '');

        this.todate = this.onlyTodate + this.onlyToTime;
        if (this.todate.length < 14) {
            this.todate = this.todate + '59999';
        }
        this.fromdate = this.onlyFromdate + this.onlyFromTime;
        if (this.fromdate.length < 14) {
            this.fromdate = this.fromdate + '00000';
        }
        debugger;
        this.loading = true;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .requestlogsgetbyapiid(this.apiId, this.pageno, this.pagesize)
            .subscribe(
                (b) => {
                    this._primengProgressBarService.hide();
                    this.logList = b;
                    this.logList.map((x) =>
                        x.STATUS === 1 ? (x.STATUS = true) : (x.STATUS = false)
                    );
                    this.tblFlag = true;
                    for (let k = 0; k < this.logList.length; k++) {
                        this.logList[k] = Object.assign(this.logList[k], {
                            expanded: false,
                        });
                    }
                    if (pageno != 0 && pageno != 1) {
                        debugger;
                        for (let u = 0; u < this.logList.length; u++) {
                            this.logList[u] = Object.assign(this.logList[u], {
                                row: u + startRow + 1,
                            });
                            debugger;
                        }
                    } else if (pageno == 1) {
                        debugger;
                        for (let u = 0; u < this.logList.length; u++) {
                            this.logList[u] = Object.assign(this.logList[u], {
                                row: u + pagesize + 1,
                            });
                            debugger;
                        }
                    } else {
                        for (let u = 0; u < this.logList.length; u++) {
                            this.logList[u] = Object.assign(this.logList[u], {
                                row: u + 1,
                            });
                            debugger;
                        }
                    }
                    this.loading = false;
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    onKeydown(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.search(this.pagesize, this.pageno);
        }
    }

    clear() {
        this.onlyFromdate = '';
        this.onlyFromTime = '';
        this.onlyTodate = '';
        this.onlyToTime = '';
        this.clientId = null;
    }

    expandTheRow(row: any): void {
        row.expanded = !row.expanded;
    }

    expandTheRowEvent(event: any): void {
        event.data.expanded = !event.data.expanded;
    }
}
