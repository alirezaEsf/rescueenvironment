import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';



import {ActivatedRoute} from "@angular/router";
import { FuseLoadingService } from '../../../../../@fuse/services/loading';
import { ToastService } from '../../../shared/services/ToastService';
import { ApiGatewayService } from '../../services/api-gateway.service';
import { MessagesApiFacadeService } from '../../services/messages-api-facade.service';
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
import { NgIf, NgStyle } from '@angular/common';
import { IsApprovalPipe } from '../../../shared/pipes/isApproval.pipe';
import { StatusPipe } from '../../../shared/pipes/status.pipe';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { MediatorsJsonComponent } from '../mediators/mediators-json/mediators-json.component';
import { MediatorsComponent } from '../mediators/mediators.component';
import { NodeChangeListComponent } from '../node-change-list/node-change-list.component';
import { Dialog } from 'primeng/dialog';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { Toast } from 'primeng/toast';

@Component({
    selector: 'app-mediators-list-root',
    templateUrl: './mediators-list-root.component.html',
    styleUrls: ['./mediators-list-root.component.scss'],
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
        NgIf,
        Toast,
    ],
})
export class MediatorsListRootComponent implements OnInit {
    @Output() close = new EventEmitter<string>();
    @Input() inputMediators;
    detApiTitle;
    widthApiTitle;
    detApiName;
    widthApiName;
    detModuleType;
    widthModuleType;
    MediatorsList;
    items;
    apiId;
    tempMediator;
    jsonMediatorsFlag: boolean = false;
    xmlMediatorsFlag: boolean = false;
    nodeListFlag: boolean = false;
    flagAddNode: boolean = false;
    flagDeletedNode: boolean = false;
    tempPath = '';
    keyNode = '';
    valueNode = '';
    createMediatorFlag: boolean = true;
    countLicense = 0;
    flag = true;
    detailsBreadObject = [];
    mediatorTitle;
    mediatorDto;
    first: number = 0;
    rows: number = 10;
    itemsList = [];
    itemsListShow = [];
    paginationLabel=this.transloco.translate('label.pagination.table');
    constructor(
        private route: ActivatedRoute,
        private transloco :TranslocoService,
        private messagesApiFacadeService: MessagesApiFacadeService,
        private _primengProgressBarService: FuseLoadingService,
        private notifierService: ToastService,
        private apiGatewayService: ApiGatewayService
    ) {}

    clear() {
        this.mediatorTitle = '';
        this.search();
    }

    activationMediator(tempMediator) {
        this.countLicense = 0;
        this.MediatorsList.forEach((item) => {
            if (item.status || item.status == 1) {
                this.countLicense += 1;
            }
        });
        if (this.countLicense == 0) {
            let mediatorId = tempMediator.mediatorId;
            this._primengProgressBarService.show();
            this.messagesApiFacadeService
                .activationMediator(mediatorId)
                .subscribe(
                    (a) => {
                        this._primengProgressBarService.hide();
                        console.log('resA', a);
                        this.search();
                    },
                    (error) => {
                        this._primengProgressBarService.hide();
                    }
                );
            /* setTimeout(a => {
                 this.fetchTable(), 15
             })*/
        } else {
            this.notifierService.showError({
                detail: 'یک مدیاتور فعال برای این api وجود دارد!',
                life: 3000,
            });
        }
    }

    addNode(tempMediator) {
        this.flagAddNode = true;
        this.mediatorDto = {
            mediatorId: null,
            apiId: null,
            title: '',
            schemaName: '',
            rdate: '',
            isApproval: null,
            appDate: '',
            status: null,
        };
        this.mediatorDto = tempMediator;
    }

    deleteNode(tempMediator) {
        this.flagDeletedNode = true;
        this.mediatorDto = {
            mediatorId: null,
            apiId: null,
            title: '',
            schemaName: '',
            rdate: '',
            isApproval: null,
            appDate: '',
            status: null,
        };
        this.mediatorDto = tempMediator;
    }

    deactivationMediator(tempMediator) {
        let mediatorId = tempMediator.mediatorId;
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .deactivationMediator(mediatorId)
            .subscribe(
                (b) => {
                    this._primengProgressBarService.hide();
                    console.log('resB', b);
                    this.search();
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
    }

    nodesMediator(tempMediator) {
        this.mediatorDto = {
            apiName: '',
            apiTitle: '',
            moduleTitle: '',
            title: '',
            schemaName: '',
            rdate: '',
            appDate: '',
            moduleTypeId: null,
            mediatorId: null,
            apiId: null,
            isApproval: null,
            status: null,
            childNodeName: null,
            childNnodeValue: null,
            childChangeTypeId: null,
            childSchemaName: null,
            childNodeStatus: null,
            mediatorBase: null,
        };
        this.mediatorDto = tempMediator;
        this.mediatorDto.mediatorBase = true;
        this.nodeListFlag = true;
    }

    disabelCheck(): boolean {
        this.countLicense = 0;
        this.MediatorsList.forEach((item) => {
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

    search() {
        this._primengProgressBarService.show();
        this.messagesApiFacadeService
            .findAllMediator(this.mediatorTitle)
            .subscribe(
                (a) => {
                    this._primengProgressBarService.hide();
                    if (Array.isArray(a)) {
                        this.MediatorsList = a;
                    } else {
                        this.MediatorsList.push(a);
                    }
                    this.MediatorsList = a;
                    this.MediatorsList.map((x) =>
                        x.status === 1 ? (x.status = true) : (x.status = false)
                    );
                    this.MediatorsList.map((x) =>
                        x.isApproval === 1
                            ? (x.isApproval = true)
                            : (x.isApproval = false)
                    );
                    for (let k = 0; k < this.MediatorsList.length; k++) {
                        this.MediatorsList[k] = Object.assign(
                            this.MediatorsList[k],
                            { row: k + 1 }
                        );
                        /*(this.partyList[k].row = (k+1))*/
                    }

                    this.createMediatorFlag = this.disabelCheck();
                },
                (error) => {
                    this._primengProgressBarService.hide();
                }
            );
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
        this.detailsBreadObject = [
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
                isActive1: true,
                img_index1: 'assets/icons/mediators.png',
            },
            { label_index2: null },
            { label_index3: null },
            { label_index4: null },
            { label_index5: null },
        ];
        this.apiGatewayService.updateApprovalDetailsBreadObject(
            this.detailsBreadObject
        );
        // this.apiId = +this.inputMediators.apiId
        this.items = [
            {
                items: [
                    {
                        label: 'فعالسازی مدیاتور',
                        icon: '',
                        command: () => {
                            this.activationMediator(this.tempMediator);
                        },
                    },
                    {
                        label: 'غیرفعالسازی مدیاتور',
                        icon: '',
                        command: () => {
                            this.deactivationMediator(this.tempMediator);
                        },
                    },
                    {
                        label: 'نود های مرتبط',
                        icon: '',
                        command: () => {
                            this.nodesMediator(this.tempMediator);
                        },
                    },
                    {
                        label: 'افزودن نود به خروجی',
                        icon: '',
                        command: () => {
                            this.addNode(this.tempMediator);
                        },
                    },
                    {
                        label: 'حذف نود از خروجی',
                        icon: '',
                        command: () => {
                            this.deleteNode(this.tempMediator);
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
        if (this.inputMediators != undefined) {
            this.detApiTitle = this.inputMediators.title;
            this.detApiName = this.inputMediators.name;
            this.detModuleType = this.inputMediators.moduleType;
            this.detApiTitle.length > 22
                ? (this.widthApiTitle = 100)
                : (this.widthApiTitle = 50);
            this.detApiName.length > 22
                ? (this.widthApiName = 100)
                : (this.widthApiName = 50);
            this.detModuleType.length > 22
                ? (this.widthModuleType = 100)
                : (this.widthModuleType = 50);
        }
        this.search();
    }

    BeforeButton() {
        this.close.emit('close');
    }

    validation(): boolean {
        if (this.createMediatorFlag) {
            this.notifierService.showError({
                detail: 'یک مدیاتور فعال برای این api وجود دارد!',
                life: 3000,
            });
            return false;
        } else {
            return true;
        }
    }

    createMediator() {
        if (this.validation())
            if (this.inputMediators != undefined) {
                if (this.inputMediators.moduleType == 1) {
                    this.jsonMediatorsFlag = true;
                } else if (this.inputMediators.moduleType == 2) {
                    this.xmlMediatorsFlag = true;
                }
            }
    }

    onKeydown(event) {
        /* let self = this
         if (event.key === "Enter") {
             self.search();
         }*/
    }

    onClosePopup() {
        this.flagAddNode = false;
        this.flagDeletedNode = false;
    }

    registerNode(flagAddDelete: number) {
        if (this.validationNode(flagAddDelete)) {
            if (flagAddDelete == 1) {
                let mediatorChangeObject = {
                    nodeName: '',
                    nodeValue: '',
                    changeTypeId: null,
                    schemaName: null,
                    mediatorId: null,
                    status: null,
                };
                mediatorChangeObject.mediatorId = this.mediatorDto.mediatorId;

                mediatorChangeObject.nodeName = this.keyNode;
                mediatorChangeObject.nodeValue = this.valueNode;
                mediatorChangeObject.schemaName = this.tempPath;
                mediatorChangeObject.status = 1;
                mediatorChangeObject.changeTypeId = 1;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .registerMediatorChange(mediatorChangeObject)
                    .subscribe(
                        (g) => {
                            this._primengProgressBarService.hide();
                            this.search();
                            this.flagAddNode = false;
                            this.keyNode = '';
                            this.valueNode = '';
                            this.tempPath = '';
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );
            } else if (flagAddDelete == 2) {
                let mediatorChangeObject = {
                    nodeName: '',
                    nodeValue: '',
                    changeTypeId: null,
                    schemaName: null,
                    mediatorId: null,
                    status: null,
                };
                mediatorChangeObject.mediatorId = this.mediatorDto.mediatorId;
                mediatorChangeObject.nodeName = this.keyNode;
                mediatorChangeObject.schemaName = this.tempPath;
                mediatorChangeObject.status = 1;
                mediatorChangeObject.changeTypeId = 2;
                this._primengProgressBarService.show();
                this.messagesApiFacadeService
                    .registerMediatorChange(mediatorChangeObject)
                    .subscribe(
                        (g) => {
                            this._primengProgressBarService.hide();
                            this.search();
                            this.flagDeletedNode = false;
                            this.keyNode = '';
                            this.valueNode = '';
                            this.tempPath = '';
                        },
                        (error) => {
                            this._primengProgressBarService.hide();
                        }
                    );
            }
        }
    }

    validationNode(flagAddDelete): boolean {
        if (!this.keyNode) {
            this.notifierService.showError({
                detail: 'لطفا کلید را وارد نمائید!',
                life: 3000,
            });
            return false;
        } else if (!this.tempPath && flagAddDelete == 1) {
            this.notifierService.showError({
                detail: 'لطفا مسیر نود را وارد نمائید!',
                life: 3000,
            });

            return false;
        } else {
            return true;
        }
    }

    onClose(e) {
        this.scrollTop();
        if (e == 'close') {
            this.search();
            this.jsonMediatorsFlag = false;
            this.nodeListFlag = false;
            this.xmlMediatorsFlag = false;
        }
    }

    setRecord(mediator) {
        this.tempMediator = mediator;
    }
}
