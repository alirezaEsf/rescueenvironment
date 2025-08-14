import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NgClass, NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
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
import { FuseLoadingService } from '../../../../../@fuse/services/loading';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { ChangeTypeIdPipe } from '../../../shared/pipes/changeTypeId.pipe';
import { DbEnginePipe } from '../../../shared/pipes/dbEngine.pipe';
import { HistoryMoreCharPipe } from '../../../shared/pipes/historyMoreChar.pipe';
import { IsApprovalPipe } from '../../../shared/pipes/isApproval.pipe';
import { ModuleTypePipe } from '../../../shared/pipes/moduleType.pipe';
import { MoreChar19Pipe } from '../../../shared/pipes/moreChar19.pipe';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { ToastService } from '../../../shared/services/ToastService';
import { ApiGatewayService } from '../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';
import { MediatorsJsonComponent } from '../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../mediators/mediators.component';
import { HeaderEndpointRegisterComponent } from '../services-api/endpoint-management/header-endpoint-management/header-endpoint-register/header-endpoint-register.component';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-node-change-list',
    templateUrl: './node-change-list.component.html',
    styleUrls: ['./node-change-list.component.scss'],
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
        Dialog,
        TranslocoPipe,
        TranslocoDirective,
        ConfirmDialog,
        DropdownModule,
        NgIf,

        MatTooltip,

        MatIcon,
        Message,
        InputTextarea,
        NgClass,
        Checkbox,
        DbEnginePipe,
        Steps,
        ChangeTypeIdPipe,
        Toast,
    ],
})
export class NodeChangeListComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputListMedia;
    @Input() inputListMediatorApi;
    nodeTitle;
    nodesList;
    items;
    tempNode;
    detailsBreadObject = [];
    createMediatorFlag: boolean = true;
    countLicense = 0;
    nodeName = '';
    mediatorId;
    changeId;
    moduleTitle;
    apiName;
    accessBase;
    clientBase;
    clientName;
    moduleBase;
    partyBase;
    partyTitle;
    apiTitle;
    first: number = 0;
    rows: number = 10;
    paginationLabel=this.transloco.translate('label.pagination.table');

    constructor(
        private route: ActivatedRoute,
        private transloco :TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private notifierService: ToastService,
        private _primengProgressBarService: FuseLoadingService,
        private apiGatewayService: ApiGatewayService
    ) {}

    chooseBread(caseBase: string) {
        switch (caseBase) {
            case 'moduleBase':
                return [
                    {
                        index: 0,
                        label_index0: 'صفحه اصلی',
                        img_index0: 'assets/icons/home.png',
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
                        label_index3: 'لیست مدیاتور ها',
                        rout_index3: '',
                        isActive3: false,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiTitle + ')',
                    },
                    {
                        index: 4,
                        label_index4: 'لیست نود های مرتبط',
                        rout_index4: '',
                        isActive4: true,
                        img_index4: 'assets/icons/node.png',
                        label_Detail_index4: '(' + this.nodeName + ')',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'partyBase':
                return [
                    {
                        index: 0,
                        label_index0: 'صفحه اصلی',
                        img_index0: 'assets/icons/home.png',
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
                        label_index4: 'لیست مدیاتور ها',
                        rout_index4: '',
                        isActive4: false,
                        img_index4: 'assets/icons/mediators.png',
                        label_Detail_index4: '(' + this.apiTitle + ')',
                    },
                    {
                        index: 5,
                        label_index5: 'لیست نود های مرتبط',
                        rout_index5: '',
                        isActive5: true,
                        img_index5: 'assets/icons/node.png',
                        label_Detail_index5: '(' + this.nodeName + ')',
                    },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'accessBase':
                return [
                    {
                        index: 0,
                        label_index0: 'صفحه اصلی',
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'لیست دسترسی',
                        rout_index1: '/api-gateway/access-list',
                        isActive1: false,
                        img_index1: 'assets/icons/access.png',
                    },
                    {
                        index: 2,
                        label_index2: 'سرویس',
                        rout_index2: null,
                        isActive2: false,
                        img_index2: 'assets/icons/api.png',
                        label_Detail_index2: '(' + this.moduleTitle + ')',
                    },
                    {
                        index: 3,
                        label_index3: 'لیست مدیاتور ها',
                        rout_index3: '',
                        isActive3: false,
                        img_index3: 'assets/icons/mediators.png',
                        label_Detail_index3: '(' + this.apiTitle + ')',
                    },
                    {
                        index: 4,
                        label_index4: 'لیست نود های مرتبط',
                        rout_index4: '',
                        isActive4: true,
                        img_index4: 'assets/icons/node.png',
                        label_Detail_index4: '(' + this.nodeName + ')',
                    },
                    { label_index5: null, label_Detail_index5: null },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'clientBase':
                return [
                    {
                        index: 0,
                        label_index0: 'صفحه اصلی',
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'کلاینت',
                        rout_index1: '/client',
                        isActive1: false,
                        img_index1: 'assets/icons/client.png',
                    },
                    {
                        index: 2,
                        label_index2: 'لیست دسترسی',
                        rout_index2: '/api-gateway/access-list',
                        isActive2: false,
                        img_index2: 'assets/icons/access.png',
                        label_Detail_index2: '(' + this.clientName + ')',
                    },
                    {
                        index: 3,
                        label_index3: 'سرویس',
                        rout_index3: null,
                        isActive3: false,
                        label_Detail_index3: '(' + this.clientName + ')',
                        img_index3: 'assets/icons/api.png',
                    },
                    {
                        index: 4,
                        label_index4: 'لیست مدیاتور ها',
                        rout_index4: '',
                        isActive4: false,
                        img_index4: 'assets/icons/mediators.png',
                        label_Detail_index4: '(' + this.apiTitle + ')',
                    },
                    {
                        index: 5,
                        label_index5: 'لیست نود های مرتبط',
                        rout_index5: '',
                        isActive5: true,
                        img_index5: 'assets/icons/node.png',
                        label_Detail_index5: '(' + this.nodeName + ')',
                    },
                    { label_index6: null, label_Detail_index6: null },
                ];
            case 'mediatorBase':
                return [
                    {
                        index: 0,
                        label_index0: 'صفحه اصلی',
                        img_index0: 'assets/icons/home.png',
                        rout_index0: '/home',
                        isActive0: false,
                    },
                    {
                        index: 1,
                        label_index1: 'لیست مدیاتور ها',
                        rout_index1: '',
                        isActive1: false,
                        img_index1: 'assets/icons/mediators.png',
                    },
                    {
                        index: 2,
                        label_index2: 'لیست نود های مرتبط',
                        rout_index2: '',
                        isActive2: true,
                        img_index2: 'assets/icons/node.png',
                        label_Detail_index2: '(' + this.nodeName + ')',
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
            console.log(element);
            if (element) element.scrollIntoView(true);
        });
    }

    ngOnInit(): void {
        this.scrollTop();
        if (this.inputListMedia != undefined) {
            this.mediatorId = this.inputListMedia.mediatorId;
            this.nodeName = this.inputListMedia.title;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .findbymediatorid(this.mediatorId)
                .subscribe(
                    (b) => {
                        this._primengProgressBarService.hide();
                        if (Array.isArray(b)) {
                            this.nodesList = b;
                        } else {
                            this.nodesList.push(b);
                        }
                        this.nodesList.map((x) =>
                            x.status === 1
                                ? (x.status = true)
                                : (x.status = false)
                        );
                        for (let k = 0; k < this.nodesList.length; k++) {
                            this.nodesList[k] = Object.assign(
                                this.nodesList[k],
                                { row: k + 1 }
                            );
                        }
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            this.detailsBreadObject = this.chooseBread('mediatorBase');
            this.apiGatewayService.updateApprovalDetailsBreadObject(
                this.detailsBreadObject
            );
        } else if (this.inputListMediatorApi != undefined) {
            this.accessBase = this.inputListMediatorApi.accessBase;
            this.moduleBase = this.inputListMediatorApi.moduleBase;
            this.partyBase = this.inputListMediatorApi.partyBase;
            this.clientBase = this.inputListMediatorApi.clientBase;
            this.moduleTitle = this.inputListMediatorApi.moduleTitle;
            this.clientName = this.inputListMediatorApi.clientName;
            this.partyTitle = this.inputListMediatorApi.partyTitle;
            this.mediatorId = this.inputListMediatorApi.mediatorId;
            this.nodeName = this.inputListMediatorApi.title;
            this.apiTitle = this.inputListMediatorApi.apiTitle;
            this.search();
            if (this.accessBase) {
                this.detailsBreadObject = this.chooseBread('accessBase');
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
            } else if (this.clientBase) {
                this.detailsBreadObject = this.chooseBread('clientBase');
                this.apiGatewayService.updateApprovalDetailsBreadObject(
                    this.detailsBreadObject
                );
            }
        }

        this.items = [
            {
                items: [
                    {
                        label: 'فعالسازی نود',
                        icon: '',
                        command: () => {
                            this.activationNode(this.tempNode);
                        },
                    },
                    {
                        label: 'غیرفعالسازی نود',
                        icon: '',
                        command: () => {
                            this.deactivationNode(this.tempNode);
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
    }

    deactivationNode(tempMediatorchang) {
        this.changeId = tempMediatorchang.changeId;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .deactiveMediatorchange(this.changeId)
            .subscribe(
                (b) => {
                    this._primengProgressBarService.hide();
                    console.log('resB', b);

                    this.search();
                },
                (error) => {
                    this._primengProgressBarService.hide();
                    this.search();
                }
            );
        /* setTimeout(a => {
             this.fetchTable(), 2
         })*/
    }

    activationNode(tempMediatorchang) {
        this.countLicense = 0;
        this.nodesList.forEach((item) => {
            if (item.status || item.status == 1) {
                this.countLicense += 1;
            }
        });

        let changeId = tempMediatorchang.changeId;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService.activeMediatorchange(changeId).subscribe(
            (a) => {
                console.log('resA', a);
                this._primengProgressBarService.hide();
                this.search();
            },
            (error) => {
                this._primengProgressBarService.hide();
                this.search();
            }
        );
        /* setTimeout(a => {
             this.fetchTable(), 15
         })*/
    }

    onKeydown(event) {
        let self = this;
        if (event.key === 'Enter') {
            self.search();
        }
    }

    search() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .findbymediatorid(this.mediatorId)
            .subscribe(
                (b) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(b)) {
                        this.nodesList = b;
                    } else {
                        this.nodesList.push(b);
                    }
                    this.nodesList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    for (let k = 0; k < this.nodesList.length; k++) {
                        this.nodesList[k] = Object.assign(this.nodesList[k], {
                            row: k + 1,
                        });
                    }
                    this.createMediatorFlag = this.disabelCheck();
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    disabelCheck(): boolean {
        this.countLicense = 0;
        this.nodesList.forEach((item) => {
            if (item.status) {
                this.countLicense += 1;
            }
        });
        if (this.countLicense == 0) {
            return false;
        } else {
            return true;
        }
    }

    clear() {}

    BeforeButton() {
        this.close.emit('close');
    }

    setRecord(nodes) {
        this.tempNode = nodes;
    }
}
